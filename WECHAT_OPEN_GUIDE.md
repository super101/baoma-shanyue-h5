# 微信打开与分享流程

## 已实现

本仓库根目录就是可发布的静态 H5 页面。GitHub Pages 启用后会得到：

```text
https://super101.github.io/baoma-shanyue-h5/
```

把这个 HTTPS 链接发到微信聊天，用户点击即可在微信内置浏览器打开。

## 普通微信分享

不需要公众号配置。用户在微信内打开页面后，点击右上角 `...`，选择：

- 发送给朋友
- 分享到朋友圈
- 收藏
- 复制链接

页面已配置：

- `<title>`
- `description`
- Open Graph 分享信息
- 分享封面图 `public/share-cover.svg`
- 页面内“分享”按钮，引导用户使用微信右上角菜单

## 自定义微信分享卡片

如果要稳定控制分享标题、描述、缩略图，需要公众号 JS-SDK：

1. 准备已认证公众号。
2. 在公众号后台设置 JS 接口安全域名。
3. 按微信要求放置域名校验文件。
4. 部署服务端签名接口 `/api/wechat-signature`。
5. 服务端用公众号 `AppId` / `AppSecret` 获取 `access_token`。
6. 服务端获取并缓存 `jsapi_ticket`。
7. 服务端按当前页面 URL 生成签名。
8. 前端 `wx.config` 成功后调用：
   - `wx.updateAppMessageShareData`
   - `wx.updateTimelineShareData`

注意：公众号密钥不能放进前端页面或 GitHub Pages，只能放服务端。

## 常见限制

- 本地 HTML 文件直接发微信通常只是附件，不是网页。
- 必须上传到 HTTPS 地址，微信才能像网页一样打开。
- GitHub Pages 可以用于普通分享；如果要配置公众号 JS 接口安全域名，建议使用自己的域名绑定 Pages 或部署到自有服务器。
