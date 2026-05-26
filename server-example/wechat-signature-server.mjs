import { createHash, randomBytes } from "node:crypto";
import { createServer } from "node:http";

const appId = process.env.WECHAT_APP_ID;
const appSecret = process.env.WECHAT_APP_SECRET;
const port = Number(process.env.PORT || 8787);
let tokenCache = null;
let ticketCache = null;

function json(res, status, data) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(data));
}

async function getJson(url) {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok || data.errcode) throw new Error(data.errmsg || `request failed: ${res.status}`);
  return data;
}

async function getAccessToken() {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now + 60000) return tokenCache.value;
  const url = new URL("https://api.weixin.qq.com/cgi-bin/token");
  url.searchParams.set("grant_type", "client_credential");
  url.searchParams.set("appid", appId);
  url.searchParams.set("secret", appSecret);
  const data = await getJson(url);
  tokenCache = { value: data.access_token, expiresAt: now + Number(data.expires_in || 7200) * 1000 };
  return tokenCache.value;
}

async function getJsapiTicket() {
  const now = Date.now();
  if (ticketCache && ticketCache.expiresAt > now + 60000) return ticketCache.value;
  const token = await getAccessToken();
  const url = new URL("https://api.weixin.qq.com/cgi-bin/ticket/getticket");
  url.searchParams.set("access_token", token);
  url.searchParams.set("type", "jsapi");
  const data = await getJson(url);
  ticketCache = { value: data.ticket, expiresAt: now + Number(data.expires_in || 7200) * 1000 };
  return ticketCache.value;
}

function sign({ ticket, nonceStr, timestamp, url }) {
  const raw = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
  return createHash("sha1").update(raw).digest("hex");
}

createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url || "/", `http://localhost:${port}`);
    if (requestUrl.pathname !== "/api/wechat-signature") {
      json(res, 404, { error: "not_found" });
      return;
    }
    if (!appId || !appSecret) {
      json(res, 500, { error: "missing WECHAT_APP_ID or WECHAT_APP_SECRET" });
      return;
    }
    const pageUrl = requestUrl.searchParams.get("url");
    if (!pageUrl || !/^https?:\/\//.test(pageUrl)) {
      json(res, 400, { error: "missing url" });
      return;
    }
    const urlWithoutHash = pageUrl.split("#")[0];
    const nonceStr = randomBytes(8).toString("hex");
    const timestamp = Math.floor(Date.now() / 1000);
    const ticket = await getJsapiTicket();
    json(res, 200, {
      appId,
      timestamp,
      nonceStr,
      signature: sign({ ticket, nonceStr, timestamp, url: urlWithoutHash })
    });
  } catch (error) {
    json(res, 500, { error: error.message || "signature_failed" });
  }
}).listen(port, () => {
  console.log(`WeChat signature server listening on http://localhost:${port}`);
});
