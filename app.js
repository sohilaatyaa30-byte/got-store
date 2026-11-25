const $ = s => document.querySelector(s);
const T = {
  ar: {
    newCol: "الكوليكشن الجديد", quick: "شوفي المنتج", brand: "جوت", ft1: "توصيل لكل مصر", ft2: "خامة قطن تقيلة", ft3: "الدفع عند الاستلام",
    navProducts: "المنتجات", navAbout: "عنّا", navContact: "تواصل",
    heroTitle: "هوديز بتدفّيك وبتميّزك",
    heroText: "خامة قطن تقيلة، تصميمات مختلفة، وتوصيل لحد باب البيت.",
    shopNow: "تسوّقي دلوقتي", all: "الكل", basic: "بيسك", print: "برنت",
    aboutText: "براند مصري للهوديز. اكتبي هنا قصة البراند بتاعك.",
    insta: "انستجرام:", cartTitle: "سلة الطلبات", total: "الإجمالي", egp: "ج.م",
    name: "الاسم", phone: "رقم الموبايل", city: "المحافظة", address: "العنوان بالتفصيل",
    checkout: "إتمام الطلب على واتساب", cod: "الدفع كاش عند الاستلام",
    payTitle: "طريقة الدفع", payCod: "كاش عند الاستلام", payWallet: "محفظة إلكترونية", payCard: "فيزا / كارت", payMethod: "طريقة الدفع",
    payNote: "هنأكد معاكي الطلب والدفع على واتساب.", walletPick: "اختاري المحفظة", walletTo: "حوّلي الإجمالي على الرقم ده وابعتي صورة التحويل على واتساب:",
    cardInfo: "هنبعتلك لينك دفع آمن بالفيزا على واتساب بعد الطلب. مبنطلبش بيانات الكارت هنا.", cardBtn: "ادفعي بالفيزا الآن", walletMiss: "اختاري المحفظة الأول", noPay: "مفيش طرق دفع متاحة", transferred: "تحويل على",
    add: "أضيفي للسلة", empty: "السلة فاضية", photo: "📷 صورة تجريبية", orderHead: "طلب جديد",
    color: "اللون", fit: "الفيت", size: "مقاس", qty: "عدد", cust: "الاسم", mob: "الموبايل", gov: "المحافظة", addr: "العنوان"
  },
  en: {
    newCol: "NEW COLLECTION", quick: "QUICK VIEW", brand: "GOT", ft1: "Delivery across Egypt", ft2: "Heavy cotton", ft3: "Cash on delivery",
    navProducts: "Products", navAbout: "About", navContact: "Contact",
    heroTitle: "Hoodies that keep you warm and stand out",
    heroText: "Heavy cotton, unique designs, delivered to your door.",
    shopNow: "Shop now", all: "All", basic: "Basic", print: "Print",
    aboutText: "An Egyptian hoodie brand. Write your brand story here.",
    insta: "Instagram:", cartTitle: "Your cart", total: "Total", egp: "EGP",
    name: "Name", phone: "Phone number", city: "City / Governorate", address: "Full address",
    checkout: "Place order on WhatsApp", cod: "Cash on delivery",
    payTitle: "Payment method", payCod: "Cash on delivery", payWallet: "E-wallet transfer", payCard: "Visa / card", payMethod: "Payment",
    payNote: "We confirm the order and payment with you on WhatsApp.", walletPick: "Choose wallet", walletTo: "Transfer the total to this number and send the transfer screenshot on WhatsApp:",
    cardInfo: "We will send you a secure card payment link on WhatsApp after the order. We never ask for card details here.", cardBtn: "Pay by card now", walletMiss: "Choose a wallet first", noPay: "No payment methods available", transferred: "Transfer via",
    add: "Add to cart", empty: "Your cart is empty", photo: "📷 Trial photo", orderHead: "New order",
    color: "Color", fit: "Fit", size: "Size", qty: "Qty", cust: "Name", mob: "Phone", gov: "City", addr: "Address"
  }
};
let lang = localStorage.getItem("lang") === "en" ? "en" : "ar";
let cat = "all";
const load = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } };
let cart = load("cart", []);
if (!Array.isArray(cart)) cart = [];
let trial = load("trialImgs", {});
// تنضيف سلة قديمة (منتجات/ألوان اتغيرت) عشان الصفحة ما تقفش
cart = cart.filter(i => i && PRODUCTS.some(p => p.id === i.id)).map(i => {
  const p = PRODUCTS.find(x => x.id === i.id);
  if (!p.colors.includes(i.color)) i.color = p.colors[0];
  if (!p.fits.includes(i.fit)) i.fit = p.fits[0];
  i.qty = Math.max(1, +i.qty || 1);
  return i;
});
const t = k => T[lang][k];
const pname = p => p[lang];
const cobj = id => COLORS.find(c => c.id === id) || COLORS[0];
const sel = {};
const colorOf = p => sel[p.id] || p.colors[0];
const fsel = {};
const fitOf = p => fsel[p.id] || p.fits[0];
const fname = f => FITS[f][lang];
const cname = id => cobj(id)[lang];
const imgOf = p => {
  const c = colorOf(p);
  return trial[p.id + "_" + c] || (p.photos && p.photos[c]) || hoodieURL(cobj(c).hex, p.deco, fitOf(p));
};

function applyLang() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach(e => e.textContent = t(e.dataset.i18n));
  document.querySelectorAll("[data-ph]").forEach(e => e.placeholder = t(e.dataset.ph));
  $("#langBtn").textContent = lang === "ar" ? "EN" : "عربي";
  localStorage.setItem("lang", lang);
  renderGrid(); renderCart(); renderPay();
}

function renderHero() {
  const order = [2, 0, 1, 2, 0].map(i => PRODUCTS[i % PRODUCTS.length]);
  $("#strip").innerHTML = order.map((p, i) => `
    <div class="panel ${i === 2 ? "mid" : ""}"><img src="${imgOf(p)}" alt=""></div>`).join("");
  const f = PRODUCTS[1 % PRODUCTS.length];
  $("#heroCard").innerHTML = `<b>${pname(f)}</b><div>${f.price} ${t("egp")}</div>
    <button class="pill sm" onclick="document.querySelector('#products').scrollIntoView()">${t("quick")}</button>`;
  $("#bigTitle").textContent = t("brand");
}

function renderGrid() {
  renderHero();
  const list = PRODUCTS.filter(p => cat === "all" || p.cat === cat);
  $("#grid").innerHTML = list.map(p => `
    <div class="card">
      <div class="img"><img src="${imgOf(p)}" alt="${pname(p)}"></div>
      <div class="meta"><h3>${pname(p)}</h3><span class="tag">${t(p.cat)}</span></div>
      <div class="price">${p.price} ${t("egp")}</div>
      <div class="swatches">${p.colors.map(c => `<button class="sw ${c === colorOf(p) ? "on" : ""}" title="${cname(c)}" style="background:${cobj(c).hex}" onclick="pick(${p.id},'${c}')"></button>`).join("")}</div>
      <div class="cname">${cname(colorOf(p))}</div>
      <div class="fits">${p.fits.map(f => `<button class="fit ${f === fitOf(p) ? "on" : ""}" onclick="pickFit(${p.id},'${f}')">${fname(f)}</button>`).join("")}</div>
      <div class="buy"><select id="size${p.id}">${SIZES.map(s => `<option>${s}</option>`).join("")}</select>
      <button class="btn" onclick="add(${p.id})">${t("add")}</button></div>
      <label class="trial">${t("photo")}
        <input type="file" accept="image/*" hidden onchange="setTrial(${p.id}, this)">
      </label>
    </div>`).join("");
}

function pickFit(id, f) { fsel[id] = f; renderGrid(); }
function pick(id, c) { sel[id] = c; renderGrid(); }

// صورة تجريبية للون المختار: بتتحفظ في المتصفح بس
function setTrial(id, input) {
  const file = input.files[0]; if (!file) return;
  const key = id + "_" + colorOf(PRODUCTS.find(p => p.id === id));
  const reader = new FileReader();
  reader.onload = () => {
    const im = new Image();
    im.onload = () => {
      const c = document.createElement("canvas"), s = Math.min(1, 600 / im.width);
      c.width = im.width * s; c.height = im.height * s;
      c.getContext("2d").drawImage(im, 0, 0, c.width, c.height);
      trial[key] = c.toDataURL("image/jpeg", 0.8);
      try { localStorage.setItem("trialImgs", JSON.stringify(trial)); } catch (e) {}
      renderGrid();
    };
    im.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function save() { localStorage.setItem("cart", JSON.stringify(cart)); renderCart(); }

function add(id) {
  const size = $("#size" + id).value;
  const pr = PRODUCTS.find(p => p.id === id);
  const color = colorOf(pr), fit = fitOf(pr);
  const found = cart.find(i => i.id === id && i.size === size && i.color === color && i.fit === fit);
  if (found) found.qty++; else cart.push({ id, size, color, fit, qty: 1 });
  save(); $("#cart").classList.remove("hidden");
}

function change(idx, d) {
  cart[idx].qty += d;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  save();
}

function renderCart() {
  let total = 0, count = 0;
  $("#items").innerHTML = cart.map((i, idx) => {
    const p = PRODUCTS.find(x => x.id === i.id);
    total += p.price * i.qty; count += i.qty;
    return `<div class="row"><span>${pname(p)} (${cname(i.color || p.colors[0])}, ${fname(i.fit || p.fits[0])}, ${i.size})</span>
      <span><button onclick="change(${idx},-1)">−</button> ${i.qty} <button onclick="change(${idx},1)">+</button></span>
      <span>${p.price * i.qty} ${t("egp")}</span></div>`;
  }).join("") || `<p>${t("empty")}</p>`;
  $("#total").textContent = total;
  $("#cartCount").textContent = count;
}

let payM = "", payW = "";
function methods() {
  const m = [];
  if (PAYMENT.cod) m.push("cod");
  if (PAYMENT.wallet && PAYMENT.wallets.some(w => w.number)) m.push("wallet");
  if (PAYMENT.card) m.push("card");
  return m;
}
function renderPay() {
  const ms = methods();
  if (!ms.includes(payM)) payM = ms[0] || "";
  const label = { cod: t("payCod"), wallet: t("payWallet"), card: t("payCard") };
  $("#payOpts").innerHTML = ms.map(m => `<label class="po ${m === payM ? "on" : ""}"><input type="radio" name="pay" value="${m}" ${m === payM ? "checked" : ""} onchange="setPay('${m}')"> ${label[m]}</label>`).join("") || t("noPay");
  let info = "";
  if (payM === "wallet") {
    const ws = PAYMENT.wallets.filter(w => w.number);
    if (!ws.some(w => w.id === payW)) payW = ws[0].id;
    info = `<div>${t("walletTo")}</div><div class="wl">${ws.map(w => `<button type="button" class="fit ${w.id === payW ? "on" : ""}" onclick="setWallet('${w.id}')">${w[lang]}</button>`).join("")}</div>
      <div class="wnum" dir="ltr">${ws.find(w => w.id === payW).number}</div>`;
  } else if (payM === "card") {
    info = `<div>${t("cardInfo")}</div>` + (PAYMENT.cardLink ? `<a class="pill" target="_blank" rel="noopener" href="${PAYMENT.cardLink}">${t("cardBtn")}</a>` : "");
  }
  $("#payInfo").innerHTML = info;
}
function setPay(m) { payM = m; renderPay(); }
function setWallet(id) { payW = id; renderPay(); }
function payText() {
  if (payM === "wallet") { const w = PAYMENT.wallets.find(x => x.id === payW); return `${t("payWallet")} (${w[lang]} ${w.number})`; }
  return { cod: t("payCod"), card: t("payCard") }[payM] || "";
}

$("#orderForm").addEventListener("submit", e => {
  e.preventDefault();
  if (!cart.length) return alert(t("empty"));
  if (!payM) return alert(t("noPay"));
  const f = new FormData(e.target);
  let total = 0;
  const lines = cart.map(i => {
    const p = PRODUCTS.find(x => x.id === i.id);
    total += p.price * i.qty;
    return `- ${pname(p)} | ${t("color")}: ${cname(i.color || p.colors[0])} | ${t("fit")}: ${fname(i.fit || p.fits[0])} | ${t("size")} ${i.size} | ${t("qty")} ${i.qty} | ${p.price * i.qty} ${t("egp")}`;
  });
  const msg = `${t("orderHead")}\n${lines.join("\n")}\n${t("total")}: ${total} ${t("egp")}\n\n${t("cust")}: ${f.get("name")}\n${t("mob")}: ${f.get("phone")}\n${t("gov")}: ${f.get("city")}\n${t("addr")}: ${f.get("address")}\n${t("payMethod")}: ${payText()}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  cart = []; save(); e.target.reset();
});

document.querySelectorAll(".f").forEach(b => b.onclick = () => {
  document.querySelectorAll(".f").forEach(x => x.classList.remove("active"));
  b.classList.add("active"); cat = b.dataset.c; renderGrid();
});
$("#langBtn").onclick = () => { lang = lang === "ar" ? "en" : "ar"; applyLang(); };
$("#cartBtn").onclick = () => $("#cart").classList.toggle("hidden");
$("#closeCart").onclick = () => $("#cart").classList.add("hidden");
$("#y").textContent = new Date().getFullYear();
applyLang();
