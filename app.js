const storageKey = "baoma-shanyue-state-v1";

const navItems = [
  { id: "home", icon: "首", label: "首页" },
  { id: "region", icon: "区", label: "地区" },
  { id: "search", icon: "搜", label: "搜索" },
  { id: "classroom", icon: "课", label: "孕妈课堂" },
  { id: "shop", icon: "购", label: "商城" }
];

const pageSub = {
  home: "一键约护",
  region: "就近匹配",
  search: "服务课程好物",
  classroom: "成长陪伴",
  shop: "品牌直供",
  profile: "会员中心"
};

const services = [
  { id: "hospital-normal", name: "医院临床陪护", desc: "顺产 3 天，护士级流程，病房陪护与新手妈妈指导", price: "按天预约", tags: ["顺产3天", "临床陪护", "极速到院"] },
  { id: "hospital-c", name: "剖腹产临床陪护", desc: "剖腹产 5 天，术后照护、翻身协助、饮食提醒", price: "按天预约", tags: ["剖腹产5天", "术后照护", "持证人员"] },
  { id: "yuesao", name: "月嫂月子照护", desc: "26/42/52 天住家上门，宝宝护理、宝妈恢复、科学月子餐", price: "套餐预约", tags: ["26天", "42天", "52天"] },
  { id: "lactation", name: "上门催乳", desc: "催乳师上门评估，乳腺疏通、喂养指导、回访建议", price: "500元", tags: ["催乳师", "上门服务", "一次预约"] },
  { id: "recovery", name: "全套产后恢复", desc: "产康师评估，腹直肌、骨盆、形体恢复方案", price: "1000元", tags: ["产康师", "全套恢复", "方案定制"] }
];

const cities = [
  { province: "广东", city: "广州", district: "天河区", available: 18 },
  { province: "广东", city: "深圳", district: "南山区", available: 22 },
  { province: "浙江", city: "杭州", district: "西湖区", available: 13 },
  { province: "江苏", city: "南京", district: "建邺区", available: 10 },
  { province: "四川", city: "成都", district: "高新区", available: 16 },
  { province: "上海", city: "上海", district: "浦东新区", available: 20 },
  { province: "北京", city: "北京", district: "朝阳区", available: 15 },
  { province: "湖北", city: "武汉", district: "武昌区", available: 9 }
];

const caregivers = [
  { name: "李阿姨", role: "星级月嫂", score: "4.98", distance: "2.1km", skills: "新生儿护理 / 月子餐 / 夜间照护" },
  { name: "周老师", role: "持证营养师", score: "4.96", distance: "3.4km", skills: "产后营养 / 控糖餐 / 哺乳期食谱" },
  { name: "陈老师", role: "产康师", score: "4.95", distance: "4.0km", skills: "腹直肌 / 骨盆修复 / 体态管理" },
  { name: "林老师", role: "催乳师", score: "4.97", distance: "5.2km", skills: "上门催乳 / 喂养姿势 / 堵奶急救" }
];

const courses = [
  { id: "diy", title: "DIY手工陪伴课", time: "周三 19:30", desc: "孕期放松、亲子手作、家庭陪伴感建立", price: 39 },
  { id: "art", title: "插画美育启蒙", time: "周六 10:00", desc: "温柔插画、色彩表达、宝妈情绪疗愈", price: 49 },
  { id: "bbq", title: "烧烤亲子聚会", time: "周日 16:30", desc: "亲子社群线下活动，轻松交流育儿经验", price: 89 },
  { id: "yoga", title: "孕期/产后瑜伽", time: "每天 20:00", desc: "低强度修复训练，适配孕期与产后阶段", price: 69 },
  { id: "skill", title: "母婴技能培训", time: "滚动开课", desc: "拍嗝、洗澡、抚触、月子餐基础技能", price: 129 }
];

const products = [
  { id: "bag", name: "安心待产包", category: "待产包", price: 199, desc: "入院必备，一包配齐" },
  { id: "diaper", name: "柔云纸尿裤", category: "纸尿裤", price: 129, desc: "干爽透气，品牌直供" },
  { id: "milk", name: "科学营养奶粉", category: "奶粉", price: 268, desc: "正品溯源，妈妈安心" },
  { id: "wash", name: "宝宝洗护套装", category: "洗护", price: 98, desc: "温和配方，敏感肌友好" },
  { id: "toy", name: "早教安抚玩具", category: "玩具", price: 79, desc: "柔软安全，亲子互动" }
];

const hotTags = ["月嫂", "催乳", "产后恢复", "待产包", "孕期瑜伽", "奶粉", "纸尿裤", "医院陪护"];

const baseState = {
  page: "home",
  consent: false,
  memberLevel: "安心金卡",
  selectedCity: "广州 · 天河区",
  location: null,
  searchTerm: "",
  coupons: [
    { id: "new-50", title: "新客预约券", value: 50, status: "可用" },
    { id: "mall-20", title: "商城满减券", value: 20, status: "可用" }
  ],
  appointments: [
    { id: "A2026052601", title: "月嫂月子照护", status: "待确认", time: "今天 18:30" }
  ],
  orders: [],
  cart: [],
  address: "未设置默认地址",
  lastMatched: null
};

let state = loadState();
const h5Pages = new Set([...navItems.map(item => item.id), "profile"]);
const screenStage = document.querySelector("#screenStage");
const bottomNav = document.querySelector("#bottomNav");
const pageSubNode = document.querySelector("#pageSub");
const splash = document.querySelector("#splash");
const mainApp = document.querySelector("#mainApp");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");
    return saved ? { ...clone(baseState), ...saved } : clone(baseState);
  } catch {
    return clone(baseState);
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function money(value) {
  return `¥${Number(value).toFixed(0)}`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
}

function availableCoupons() {
  return state.coupons.filter(item => item.status === "可用");
}

function cartTotal() {
  return state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function capPlugin(name) {
  return window.Capacitor?.Plugins?.[name] || null;
}

function toast(message) {
  let node = document.querySelector(".toast");
  if (!node) {
    node = document.createElement("div");
    node.className = "toast";
    document.body.appendChild(node);
  }
  node.textContent = message;
  node.classList.add("is-show");
  window.clearTimeout(toast.timer);
  toast.timer = window.setTimeout(() => node.classList.remove("is-show"), 1900);
}

function showModal({ title, body, actions = [] }) {
  let root = document.querySelector("#modalRoot");
  if (!root) {
    root = document.createElement("div");
    root.id = "modalRoot";
    document.body.appendChild(root);
  }
  root.innerHTML = `
    <div class="modal-backdrop" role="presentation"></div>
    <section class="modal-card" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
      <div class="modal-head">
        <h3>${title}</h3>
        <button class="close-btn" data-modal-close type="button" aria-label="关闭">×</button>
      </div>
      <div class="modal-body">${body}</div>
      <div class="modal-actions">
        ${actions.map((action, index) => `<button class="${action.kind || "secondary-btn"}" data-modal-action="${index}" type="button">${action.label}</button>`).join("")}
      </div>
    </section>
  `;
  root.classList.add("is-open");
  root.querySelector("[data-modal-close]").addEventListener("click", closeModal);
  root.querySelector(".modal-backdrop").addEventListener("click", closeModal);
  root.querySelectorAll("[data-modal-action]").forEach(button => {
    button.addEventListener("click", () => actions[Number(button.dataset.modalAction)]?.run?.());
  });
}

function closeModal() {
  const root = document.querySelector("#modalRoot");
  if (root) {
    root.classList.remove("is-open");
    root.innerHTML = "";
  }
}

function showConsent(next) {
  showModal({
    title: "隐私与服务授权",
    body: `
      <p>宝妈闪约 Demo 会在你主动点击时申请定位，用于自动匹配就近上门人员。预约、订单、优惠券和地址数据仅保存在本机演示环境。</p>
      <div class="summary-row"><span>定位用途</span><strong>就近人员匹配</strong></div>
      <div class="summary-row"><span>数据存储</span><strong>本机 localStorage</strong></div>
      <div class="summary-row"><span>支付说明</span><strong>仅模拟，不扣款</strong></div>
    `,
    actions: [
      { label: "暂不授权", run: () => { closeModal(); toast("仍可浏览和手动选择城市"); } },
      { label: "同意并继续", kind: "primary-btn", run: () => { state.consent = true; saveState(); closeModal(); toast("授权已开启"); next?.(); render(); } }
    ]
  });
}

function ensureConsent(next) {
  if (state.consent) next?.();
  else showConsent(next);
}

function pageFromHash() {
  const page = decodeURIComponent(window.location.hash.replace(/^#\/?/, ""));
  return h5Pages.has(page) ? page : null;
}

function go(page) {
  if (!h5Pages.has(page)) page = "home";
  state.page = page;
  saveState();
  if (window.location.hash.replace(/^#\/?/, "") !== page) {
    history.replaceState(null, "", `#${page}`);
  }
  render();
  screenStage.scrollTop = 0;
  screenStage.focus({ preventScroll: true });
}

function renderNav() {
  bottomNav.innerHTML = navItems.map(item => `
    <button class="nav-item ${state.page === item.id ? "is-active" : ""}" data-action="go" data-page="${item.id}" type="button">
      <span>${item.icon}</span><span>${item.label}</span>
    </button>
  `).join("");
}

function bookService(serviceId) {
  const service = services.find(item => item.id === serviceId) || services[0];
  showModal({
    title: `预约：${service.name}`,
    body: `
      <p>${service.desc}</p>
      <div class="summary-row"><span>当前地区</span><strong>${state.selectedCity}</strong></div>
      <div class="summary-row"><span>服务价格</span><strong>${service.price}</strong></div>
      <div class="summary-row"><span>预计响应</span><strong>15分钟内确认</strong></div>
      <div class="form-grid">
        <div class="field"><label>联系人</label><input id="bookName" value="安心妈妈" /></div>
        <div class="field"><label>上门需求</label><textarea id="bookNote">希望尽快匹配持证人员，优先安排温柔耐心、经验丰富的老师。</textarea></div>
      </div>
    `,
    actions: [
      { label: "再看看", run: closeModal },
      { label: "确认预约", kind: "primary-btn", run: () => {
        const name = document.querySelector("#bookName")?.value.trim() || "安心妈妈";
        const id = `B${Date.now().toString().slice(-8)}`;
        state.appointments.unshift({ id, title: service.name, status: "匹配中", time: "刚刚", name, city: state.selectedCity });
        if (!state.coupons.some(coupon => coupon.id === "care-30")) {
          state.coupons.unshift({ id: "care-30", title: "预约安心券", value: 30, status: "可用" });
        }
        saveState();
        closeModal();
        toast("预约已提交，系统正在匹配上门人员");
        go("profile");
      } }
    ]
  });
}

async function locateAndMatch() {
  ensureConsent(async () => {
    try {
      const geo = capPlugin("Geolocation");
      if (geo?.requestPermissions) await geo.requestPermissions();
      if (geo?.getCurrentPosition) {
        const position = await geo.getCurrentPosition({ enableHighAccuracy: true, timeout: 8000 });
        state.location = { lat: position.coords.latitude, lng: position.coords.longitude, source: "GPS" };
      } else if (window.BAOMA_WECHAT_READY && window.wx?.getLocation) {
        await new Promise((resolve, reject) => {
          window.wx.getLocation({
            type: "wgs84",
            success: (res) => {
              state.location = { lat: res.latitude, lng: res.longitude, source: "微信定位" };
              resolve();
            },
            fail: reject,
            cancel: reject
          });
        });
      } else if (navigator.geolocation) {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 });
        });
        state.location = { lat: position.coords.latitude, lng: position.coords.longitude, source: "浏览器定位" };
      } else {
        state.location = { lat: 23.129, lng: 113.264, source: "模拟定位" };
      }
    } catch {
      state.location = { lat: 23.129, lng: 113.264, source: "模拟定位" };
    }
    state.selectedCity = "广州 · 天河区";
    state.lastMatched = `已为 ${state.selectedCity} 匹配 ${caregivers.length} 位就近人员`;
    saveState();
    toast("就近人员匹配完成");
    render();
  });
}

function selectCity(index) {
  const city = cities[Number(index)] || cities[0];
  state.selectedCity = `${city.city} · ${city.district}`;
  state.lastMatched = `${city.province}${city.city}${city.district} 可预约人员 ${city.available} 位`;
  saveState();
  toast(`已切换到 ${state.selectedCity}`);
  render();
}

function runSearch(term) {
  const input = document.querySelector("#searchInput");
  const value = (term || input?.value || "").trim();
  if (!value) {
    toast("请输入服务、课程或母婴好物关键词");
    return;
  }
  state.searchTerm = value;
  saveState();
  render();
  toast(`已搜索：${value}`);
}

function searchResults() {
  const term = state.searchTerm.trim();
  if (!term) return [];
  const pool = [
    ...services.map(item => ({ type: "服务", title: item.name, desc: item.desc, action: "book", id: item.id })),
    ...courses.map(item => ({ type: "课程", title: item.title, desc: item.desc, action: "course", id: item.id })),
    ...products.map(item => ({ type: "好物", title: item.name, desc: `${item.category} · ${money(item.price)} · ${item.desc}`, action: "product", id: item.id }))
  ];
  const matches = pool.filter(item => `${item.type}${item.title}${item.desc}`.includes(term));
  return matches.length ? matches : pool.slice(0, 4);
}

function enrollCourse(courseId) {
  const course = courses.find(item => item.id === courseId) || courses[0];
  showModal({
    title: `报名：${course.title}`,
    body: `
      <p>${course.desc}</p>
      <div class="summary-row"><span>开课时间</span><strong>${course.time}</strong></div>
      <div class="summary-row"><span>课程费用</span><strong>${money(course.price)}</strong></div>
      <div class="summary-row"><span>学习方式</span><strong>线上/线下可选</strong></div>
    `,
    actions: [
      { label: "收藏课程", run: () => { closeModal(); toast("已加入学习清单"); } },
      { label: "确认报名", kind: "primary-btn", run: () => {
        state.orders.unshift({ id: `C${Date.now().toString().slice(-8)}`, title: course.title, amount: course.price, status: "已报名", type: "课程" });
        saveState();
        closeModal();
        toast("报名成功，课程订单已生成");
        go("profile");
      } }
    ]
  });
}

function addToCart(productId) {
  const product = products.find(item => item.id === productId) || products[0];
  const existing = state.cart.find(item => item.id === product.id);
  if (existing) existing.qty += 1;
  else state.cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  saveState();
  toast(`${product.name} 已加入购物车`);
  render();
}

function checkout() {
  if (!state.cart.length) {
    toast("购物车还没有商品");
    return;
  }
  const coupon = availableCoupons().find(item => item.title.includes("商城")) || availableCoupons()[0];
  const total = cartTotal();
  const discount = coupon ? coupon.value : 0;
  const payable = Math.max(1, total - discount);
  showModal({
    title: "确认商城订单",
    body: `
      ${state.cart.map(item => `<div class="summary-row"><span>${item.name} × ${item.qty}</span><strong>${money(item.price * item.qty)}</strong></div>`).join("")}
      <div class="summary-row"><span>配送地址</span><strong>${state.address}</strong></div>
      <div class="summary-row"><span>优惠抵扣</span><strong>-${money(discount)}</strong></div>
      <div class="total">模拟支付 ${money(payable)}</div>
      <p>真实微信支付需要商户号、服务端下单和支付签名。当前 H5 只演示下单与物流链路。</p>
    `,
    actions: [
      { label: "取消", run: closeModal },
      { label: "确认支付", kind: "primary-btn", run: () => {
        if (coupon) coupon.status = "已使用";
        state.orders.unshift({ id: `M${Date.now().toString().slice(-8)}`, title: `商城订单 ${state.cart.length} 件`, amount: payable, status: "待发货", type: "商品" });
        state.cart = [];
        saveState();
        closeModal();
        toast("模拟支付成功，订单已生成");
        go("profile");
      } }
    ]
  });
}

function claimCoupon(type = "service") {
  const map = {
    service: { id: `service-${Date.now().toString().slice(-5)}`, title: "上门服务立减券", value: 60 },
    shop: { id: `shop-${Date.now().toString().slice(-5)}`, title: "商城满减券", value: 20 },
    course: { id: `course-${Date.now().toString().slice(-5)}`, title: "课堂体验券", value: 15 }
  };
  state.coupons.unshift({ ...map[type], status: "可用" });
  saveState();
  toast("优惠券已领取");
  render();
}

function openLogistics(orderId) {
  const order = state.orders.find(item => item.id === orderId) || state.orders[0];
  showModal({
    title: "物流与服务进度",
    body: order ? `
      <div class="summary-row"><span>订单号</span><strong>${order.id}</strong></div>
      <div class="summary-row"><span>订单内容</span><strong>${order.title}</strong></div>
      <div class="summary-row"><span>当前状态</span><strong>${order.status}</strong></div>
      <div class="summary-row"><span>下一步</span><strong>${order.type === "商品" ? "仓库打包，预计24小时内发货" : "顾问确认服务时间"}</strong></div>
    ` : `<p>暂无订单，可先预约服务或购买母婴好物。</p>`,
    actions: [{ label: "知道了", kind: "primary-btn", run: closeModal }]
  });
}

function editAddress() {
  showModal({
    title: "收货与上门地址",
    body: `
      <div class="form-grid">
        <div class="field"><label>默认地址</label><textarea id="addressInput">${escapeHtml(state.address === "未设置默认地址" ? "广州市天河区某某小区 3 栋 1201" : state.address)}</textarea></div>
      </div>
    `,
    actions: [
      { label: "取消", run: closeModal },
      { label: "保存地址", kind: "primary-btn", run: () => {
        state.address = document.querySelector("#addressInput")?.value.trim() || "未设置默认地址";
        saveState();
        closeModal();
        toast("地址已保存");
        render();
      } }
    ]
  });
}

function customerService() {
  showModal({
    title: "在线客服",
    body: `
      <p>这里是 Demo 客服台，正式版本可接入公众号客服消息、企微、电话、IM 或工单系统。</p>
      <div class="summary-row"><span>服务时间</span><strong>08:00-23:00</strong></div>
      <div class="summary-row"><span>优先处理</span><strong>孕产应急、上门改期、订单售后</strong></div>
      <div class="form-grid"><div class="field"><label>留言</label><textarea id="serviceMsg">我想咨询月嫂月子照护和上门时间。</textarea></div></div>
    `,
    actions: [
      { label: "稍后", run: closeModal },
      { label: "提交留言", kind: "primary-btn", run: () => { closeModal(); toast("留言已提交，客服会尽快联系"); } }
    ]
  });
}

function resetDemo() {
  showModal({
    title: "重置演示数据",
    body: "将清空本机预约、订单、购物车、地址、优惠券和定位演示状态。",
    actions: [
      { label: "取消", run: closeModal },
      { label: "确认重置", kind: "primary-btn", run: () => { state = clone(baseState); saveState(); closeModal(); toast("演示数据已重置"); render(); } }
    ]
  });
}

function shareH5() {
  if (typeof window.showBaomaShareGuide === "function") {
    window.showBaomaShareGuide();
    return;
  }
  showModal({
    title: "分享宝妈闪约",
    body: `<p>请点击微信右上角“...”转发给朋友或分享到朋友圈。</p><div class="summary-row"><span>分享标题</span><strong>宝妈闪约｜一键约护</strong></div>`,
    actions: [{ label: "知道了", kind: "primary-btn", run: closeModal }]
  });
}

function renderHome() {
  return `
    <section class="page">
      <div class="hero-card ratio-16x9">
        <div class="hero-content">
          <div class="hero-top"><p class="eyebrow">极速上门 安心坐月子</p><span class="badge">${state.selectedCity}</span></div>
          <h2 class="big-title">一键极速预约</h2>
          <p>宝妈闪约，一键约护｜极速上门，安心坐月子。持证营养师、产康师、催乳师、星级月嫂在线匹配。</p>
          <div class="action-row"><button class="primary-btn" data-action="book" data-id="yuesao" type="button">立即预约</button><button class="secondary-btn" data-action="locate" type="button">就近匹配</button></div>
        </div>
      </div>
      <div class="grid-3">
        <div class="metric"><strong>${state.appointments.length}</strong><span>服务订单</span></div>
        <div class="metric"><strong>${availableCoupons().length}</strong><span>可用优惠券</span></div>
        <div class="metric"><strong>15min</strong><span>最快确认</span></div>
      </div>
      <div class="section-title"><div><h3>核心服务</h3><p>临床陪护、月嫂照护、催乳、产后恢复</p></div><button class="small-btn" data-action="coupon" data-type="service" type="button">领券</button></div>
      <div class="list">
        ${services.map(service => `
          <article class="service-card">
            <div class="service-head"><div><h3>${service.name}</h3><p>${service.desc}</p></div><span class="price">${service.price}</span></div>
            <div class="feature-tags">${service.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
            <div class="action-row"><button class="primary-btn" data-action="book" data-id="${service.id}" type="button">预约</button><button class="secondary-btn" data-action="searchTag" data-term="${service.name}" type="button">详情</button></div>
          </article>
        `).join("")}
      </div>
    </section>
  `;
}

function renderRegion() {
  const loc = state.location ? `${state.location.source} · ${state.location.lat.toFixed(3)}, ${state.location.lng.toFixed(3)}` : "尚未定位，可手动选择城市";
  return `
    <section class="page">
      <div class="hero-card ratio-16x9"><div class="hero-content"><p class="eyebrow">全国省市区县筛选</p><h2 class="big-title">自动匹配就近上门人员</h2><p>根据地区与服务需求，优先匹配附近持证营养师、产康师、催乳师和星级月嫂。</p><div class="action-row"><button class="primary-btn" data-action="locate" type="button">申请定位匹配</button><button class="secondary-btn" data-action="book" data-id="hospital-normal" type="button">预约陪护</button></div></div></div>
      <div class="region-map"><span class="region-pin pin-a"></span><span class="region-pin pin-b"></span><span class="region-pin pin-c"></span><strong>${loc}</strong></div>
      <div class="section-title"><div><h3>热门城市</h3><p>${state.lastMatched || "选择城市后自动刷新可预约人员"}</p></div></div>
      <div class="tag-row">${cities.map((city, index) => `<button class="pill-btn ${state.selectedCity === `${city.city} · ${city.district}` ? "is-active" : ""}" data-action="city" data-index="${index}" type="button">${city.province}${city.city}${city.district}</button>`).join("")}</div>
      <div class="section-title"><div><h3>就近人员</h3><p>评分、距离、技能标签快速筛选</p></div></div>
      <div class="list">${caregivers.map(person => `<div class="list-item"><div class="list-main"><strong>${person.name} · ${person.role}</strong><span>${person.skills}</span></div><button class="status green" data-action="book" data-id="yuesao" type="button">${person.score} / ${person.distance}</button></div>`).join("")}</div>
    </section>
  `;
}

function renderSearch() {
  const results = searchResults();
  return `
    <section class="page">
      <div class="search-panel">
        <div class="search-box"><input id="searchInput" value="${escapeHtml(state.searchTerm)}" placeholder="搜索服务、课程、母婴好物" aria-label="搜索关键词" /><button class="primary-btn" data-action="search" type="button">搜索</button></div>
        <div class="tag-row">${hotTags.map(tag => `<button class="pill-btn" data-action="searchTag" data-term="${tag}" type="button">${tag}</button>`).join("")}</div>
      </div>
      <div class="section-title"><div><h3>搜索结果</h3><p>${state.searchTerm ? `与「${escapeHtml(state.searchTerm)}」相关` : "输入关键词或点击热门标签"}</p></div></div>
      <div class="list">
        ${results.length ? results.map(item => `<button class="list-button list-item" data-action="${item.action}" data-id="${item.id}" type="button"><div class="list-main"><strong>${item.title}</strong><span>${item.type} · ${item.desc}</span></div><span class="status">查看</span></button>`).join("") : `<div class="empty">还没有搜索内容，试试“月嫂”“催乳”“待产包”。</div>`}
      </div>
    </section>
  `;
}

function renderClassroom() {
  return `
    <section class="page">
      <div class="hero-card ratio-16x9"><div class="hero-content"><p class="eyebrow">孕妈课堂</p><h2 class="big-title">让孕产期更轻松</h2><p>DIY手工、插画美育、烧烤亲子聚会、孕期/产后瑜伽、母婴技能培训。</p><div class="action-row"><button class="primary-btn" data-action="course" data-id="yoga" type="button">报名瑜伽</button><button class="secondary-btn" data-action="coupon" data-type="course" type="button">领体验券</button></div></div></div>
      <div class="grid-2">
        ${courses.map(course => `<article class="card"><div class="course-cover">${course.title}<br/><span class="soft-tag">${course.time}</span></div><h3>${course.title}</h3><p>${course.desc}</p><div class="action-row"><button class="primary-btn" data-action="course" data-id="${course.id}" type="button">报名</button><button class="secondary-btn" data-action="searchTag" data-term="${course.title}" type="button">了解</button></div></article>`).join("")}
      </div>
    </section>
  `;
}

function renderShop() {
  return `
    <section class="page">
      <div class="hero-card ratio-16x9"><div class="hero-content"><p class="eyebrow">母婴商城 品牌直供</p><h2 class="big-title">安心好物一站购</h2><p>母婴用品、待产包、奶粉纸尿裤洗护玩具，品牌直供，正品可追溯。</p><div class="action-row"><button class="primary-btn" data-action="coupon" data-type="shop" type="button">领取商城券</button><button class="secondary-btn" data-action="checkout" type="button">去结算</button></div></div></div>
      <div class="tag-row">${["母婴用品", "待产包", "奶粉", "纸尿裤", "洗护", "玩具"].map(tag => `<button class="pill-btn" data-action="searchTag" data-term="${tag}" type="button">${tag}</button>`).join("")}</div>
      <div class="grid-2">
        ${products.map(product => `<article class="card"><div class="product-cover">${product.category}</div><h3>${product.name}</h3><p>${product.desc}</p><div class="summary-row"><span>品牌直供</span><strong>${money(product.price)}</strong></div><button class="primary-btn" data-action="addCart" data-id="${product.id}" type="button">加入购物车</button></article>`).join("")}
      </div>
      <div class="cart-bar"><div><strong>购物车 ${state.cart.reduce((sum, item) => sum + item.qty, 0)} 件</strong><br/><span>合计 ${money(cartTotal())}</span></div><button class="primary-btn" data-action="checkout" type="button">结算</button></div>
    </section>
  `;
}

function renderProfile() {
  const couponBody = state.coupons.map(coupon => `<div class="list-item"><div class="list-main"><strong>${coupon.title}</strong><span>抵扣 ${money(coupon.value)}</span></div><span class="status ${coupon.status === "可用" ? "green" : ""}">${coupon.status}</span></div>`).join("") || `<div class="empty">暂无优惠券</div>`;
  const appointments = state.appointments.map(item => `<div class="list-item"><div class="list-main"><strong>${item.title}</strong><span>${item.id} · ${item.time} · ${item.city || state.selectedCity}</span></div><span class="status">${item.status}</span></div>`).join("") || `<div class="empty">暂无服务订单</div>`;
  const orders = state.orders.map(item => `<button class="list-button list-item" data-action="logistics" data-id="${item.id}" type="button"><div class="list-main"><strong>${item.title}</strong><span>${item.id} · ${item.type} · ${money(item.amount)}</span></div><span class="status">${item.status}</span></button>`).join("") || `<div class="empty">暂无商品/课程订单</div>`;
  return `
    <section class="page">
      <div class="profile-card"><p class="eyebrow">个人中心</p><h2>${state.memberLevel}</h2><p>会员等级、优惠券、服务/商品订单、物流、地址、在线客服统一管理。</p><div class="action-row"><button class="secondary-btn" data-action="coupon" data-type="service" type="button">领取权益</button><button class="secondary-btn" data-action="service" type="button">在线客服</button></div></div>
      <div class="section-title"><div><h3>我的优惠券</h3><p>${availableCoupons().length} 张可用</p></div></div><div class="list">${couponBody}</div>
      <div class="section-title"><div><h3>服务订单</h3><p>预约与上门进度</p></div><button class="small-btn" data-action="book" data-id="yuesao" type="button">再预约</button></div><div class="list">${appointments}</div>
      <div class="section-title"><div><h3>商品/课程订单</h3><p>点击查看物流或履约进度</p></div></div><div class="list">${orders}</div>
      <div class="section-title"><div><h3>常用功能</h3><p>地址、客服、协议与演示重置</p></div></div>
      <div class="grid-2">
        <button class="card-button" data-action="address" type="button"><div class="card"><h3>地址管理</h3><p>${state.address}</p></div></button>
        <button class="card-button" data-action="service" type="button"><div class="card"><h3>在线客服</h3><p>咨询预约、售后、改期</p></div></button>
        <button class="card-button" data-action="privacy" type="button"><div class="card"><h3>隐私协议</h3><p>${state.consent ? "已同意授权" : "查看并授权"}</p></div></button>
        <button class="card-button" data-action="reset" type="button"><div class="card"><h3>重置Demo</h3><p>清空本机演示状态</p></div></button>
      </div>
    </section>
  `;
}

const renderers = { home: renderHome, region: renderRegion, search: renderSearch, classroom: renderClassroom, shop: renderShop, profile: renderProfile };

function render() {
  pageSubNode.textContent = pageSub[state.page] || "安心服务";
  renderNav();
  screenStage.innerHTML = renderers[state.page]();
}

function boot() {
  const hashPage = pageFromHash();
  if (hashPage) state.page = hashPage;
  splash.classList.remove("is-active");
  mainApp.classList.add("is-active");
  render();
  if (!state.consent) showConsent();
}

document.querySelector("#enterApp").addEventListener("click", boot);

screenStage.addEventListener("keydown", event => {
  if (event.key === "Enter" && event.target?.id === "searchInput") runSearch();
});

document.body.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  if (action === "go") go(button.dataset.page);
  if (action === "book") bookService(button.dataset.id);
  if (action === "locate") locateAndMatch();
  if (action === "city") selectCity(button.dataset.index);
  if (action === "search") runSearch();
  if (action === "searchTag") { state.searchTerm = button.dataset.term || ""; saveState(); go("search"); runSearch(state.searchTerm); }
  if (action === "course") enrollCourse(button.dataset.id);
  if (action === "product") { addToCart(button.dataset.id); go("shop"); }
  if (action === "addCart") addToCart(button.dataset.id);
  if (action === "checkout") checkout();
  if (action === "coupon") claimCoupon(button.dataset.type);
  if (action === "logistics") openLogistics(button.dataset.id);
  if (action === "address") editAddress();
  if (action === "service") customerService();
  if (action === "privacy") showConsent();
  if (action === "reset") resetDemo();
  if (action === "share") shareH5();
});

window.addEventListener("hashchange", () => {
  const hashPage = pageFromHash();
  if (hashPage && hashPage !== state.page) {
    state.page = hashPage;
    saveState();
    render();
  }
});

window.addEventListener("baoma:share-tip", event => {
  showModal({
    title: "微信分享提示",
    body: `<p>${escapeHtml(event.detail || "请点击微信右上角菜单进行分享。")}</p><div class="share-preview"><img src="./public/share-cover.svg" alt="宝妈闪约分享封面" /><div><strong>宝妈闪约｜一键约护</strong><span>极速上门，安心坐月子</span></div></div>`,
    actions: [{ label: "知道了", kind: "primary-btn", run: closeModal }]
  });
});

window.setTimeout(() => {
  if (splash.classList.contains("is-active")) boot();
}, 2200);
