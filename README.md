# 宝妈闪约 H5 微信分享版

这是从 Android APK Demo 转换出来的 H5 版本，适合部署到 HTTPS 域名后在微信内打开、转发好友或朋友圈。

## 本次转换内容

- 保留 APK 版核心页面：首页、地区、搜索、孕妈课堂、商城、个人中心。
- 保留核心交互：一键预约、城市选择、定位匹配、搜索、课程报名、商城加购/结算、优惠券、订单物流、地址、客服、隐私授权。
- 移除 Capacitor 依赖，改为纯 H5 静态页面。
- 增加微信分享按钮与分享引导。
- 增加 SEO / Open Graph / 分享封面图。
- 增加可选微信 JS-SDK 分享配置：`updateAppMessageShareData`、`updateTimelineShareData`。
- 增加服务端签名示例：`server-example/wechat-signature-server.mjs`。

## H5 微信分享上线流程

### 1. 静态 H5 页面

先把 `dist/` 部署到 HTTPS 域名，例如：

```text
https://your-domain.com/baoma/
```

普通微信转发可以直接分享这个链接。页面标题、描述和封面图已准备好，但微信是否采用封面图取决于环境和缓存。

### 2. 自定义微信分享卡片

如果要稳定自定义分享标题、描述、缩略图，需要公众号 JS-SDK：

1. 准备已认证公众号。
2. 在公众号后台配置 JS 接口安全域名。
3. 页面必须部署在该安全域名下，并使用 HTTPS。
4. 服务端用 `WECHAT_APP_ID` / `WECHAT_APP_SECRET` 获取 `access_token`。
5. 服务端获取并缓存 `jsapi_ticket`。
6. 服务端按当前页面 URL 生成 `signature`。
7. 前端调用 `/api/wechat-signature?url=<当前页面URL>` 获取签名并执行 `wx.config`。
8. `wx.ready` 后调用 `wx.updateAppMessageShareData` 和 `wx.updateTimelineShareData`。

> 注意：签名 URL 必须是当前页面完整 URL 去掉 hash `#` 后的部分。公众号密钥只能放服务端，不能写进 H5。

## 本地运行

```bash
npm run dev
```

默认地址：

```text
http://localhost:4173
```

## 构建静态文件

```bash
npm run build
```

输出目录：

```text
dist/
```

预览构建结果：

```bash
npm run preview
```

## 微信签名服务示例

```bash
# 先在你的运行环境里配置 WECHAT_APP_ID 和 WECHAT_APP_SECRET
# 再启动签名服务，密钥不要提交到前端仓库
node server-example/wechat-signature-server.mjs
```

示例接口：

```text
GET /api/wechat-signature?url=https%3A%2F%2Fyour-domain.com%2Fbaoma%2F
```

返回：

```json
{
  "appId": "...",
  "timestamp": 1710000000,
  "nonceStr": "...",
  "signature": "..."
}
```

生产环境建议把签名接口放到同域名后端，或通过 Nginx / Serverless 路由代理到同域，避免跨域和 Cookie 问题。

## 部署目录

```text
baoma-shanyue-h5/
├── index.html
├── app.js
├── styles.css
├── wechat-share.js
├── manifest.json
├── public/share-cover.svg
├── server-example/wechat-signature-server.mjs
├── scripts/build.mjs
├── scripts/serve.mjs
└── dist/
```

## 官方参考

- 微信 JS-SDK 说明文档：<https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html>
- 获取 access_token：<https://developers.weixin.qq.com/doc/offiaccount/Basic_Information/Get_access_token.html>
- 微信网页授权：<https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html>

## 已知限制

- 当前预约、支付、客服、订单等仍是 Demo 模拟流程。
- 微信自定义分享必须有公众号、安全域名和服务端签名接口。
- 本地 `http://localhost` 无法完成真实微信 JS-SDK 分享签名验证，必须用线上 HTTPS 域名测试。

## 已发布线上地址

```text
https://super101.github.io/baoma-shanyue-h5/
```

微信打开方式：复制上方链接发送到微信聊天，或使用本地生成的二维码 `artifacts/baoma-shanyue-wechat-qrcode.png` 扫码打开。
