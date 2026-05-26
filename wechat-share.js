(function () {
  const share = window.BAOMA_SHARE || {};
  const defaults = {
    title: "宝妈闪约｜一键约护，极速上门",
    desc: "医院临床陪护、星级月嫂、上门催乳、产后恢复、母婴商城，一站式安心坐月子服务。",
    link: window.location.href.split("#")[0],
    imgUrl: new URL("./public/share-cover.svg", window.location.href).href
  };
  const shareData = { ...defaults, ...share };
  const isWeChat = /MicroMessenger/i.test(navigator.userAgent);

  function setMeta(name, content, attr = "name") {
    let node = document.querySelector(`meta[${attr}="${name}"]`);
    if (!node) {
      node = document.createElement("meta");
      node.setAttribute(attr, name);
      document.head.appendChild(node);
    }
    node.setAttribute("content", content);
  }

  function updateMeta() {
    document.title = shareData.title;
    setMeta("description", shareData.desc);
    setMeta("og:title", shareData.title, "property");
    setMeta("og:description", shareData.desc, "property");
    setMeta("og:image", shareData.imgUrl, "property");
    setMeta("og:url", shareData.link, "property");
    setMeta("twitter:card", "summary_large_image");
  }

  function showGuide() {
    const text = isWeChat ? "请点击微信右上角“...”选择发送给朋友或分享到朋友圈。" : "当前浏览器支持时会优先调起系统分享；也可以复制链接发送给微信好友。";
    if (navigator.share && !isWeChat) {
      navigator.share({ title: shareData.title, text: shareData.desc, url: shareData.link }).catch(() => copyLink(text));
      return;
    }
    copyLink(text);
  }

  async function copyLink(text) {
    try {
      await navigator.clipboard?.writeText?.(shareData.link);
      window.dispatchEvent(new CustomEvent("baoma:share-tip", { detail: `${text} 链接已复制。` }));
    } catch {
      window.dispatchEvent(new CustomEvent("baoma:share-tip", { detail: text }));
    }
  }

  async function configureWeChatShare() {
    if (!isWeChat || !window.wx) return;
    try {
      const api = window.BAOMA_WECHAT_SIGNATURE_API || "/api/wechat-signature";
      const signatureUrl = window.location.href.split("#")[0];
      const res = await fetch(`${api}?url=${encodeURIComponent(signatureUrl)}`, { credentials: "include" });
      if (!res.ok) throw new Error("signature api failed");
      const sign = await res.json();
      window.wx.config({
        debug: Boolean(sign.debug),
        appId: sign.appId,
        timestamp: sign.timestamp,
        nonceStr: sign.nonceStr,
        signature: sign.signature,
        jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "getLocation"]
      });
      window.wx.ready(() => {
        window.wx.updateAppMessageShareData({
          title: shareData.title,
          desc: shareData.desc,
          link: shareData.link,
          imgUrl: shareData.imgUrl
        });
        window.wx.updateTimelineShareData({
          title: shareData.title,
          link: shareData.link,
          imgUrl: shareData.imgUrl
        });
        window.BAOMA_WECHAT_READY = true;
        window.dispatchEvent(new CustomEvent("baoma:wechat-ready"));
      });
      window.wx.error((err) => {
        console.warn("WeChat JS-SDK config failed", err);
        window.dispatchEvent(new CustomEvent("baoma:wechat-error", { detail: err }));
      });
    } catch (error) {
      console.warn("WeChat share uses default browser fallback", error);
    }
  }

  updateMeta();
  window.BAOMA_SHARE_DATA = shareData;
  window.showBaomaShareGuide = showGuide;
  window.configureBaomaWeChatShare = configureWeChatShare;
  document.addEventListener("DOMContentLoaded", configureWeChatShare);
})();
