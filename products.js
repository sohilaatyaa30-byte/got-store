// رقم الواتساب لاستلام الطلبات بالصيغة الدولية بدون + (مثال: 2010xxxxxxxx). سيبيه فاضي دلوقتي.
// WhatsApp number for orders, international format, no + . Leave empty for now.
const WHATSAPP_NUMBER = "";

// طرق الدفع - شغّلي/اقفلي أي طريقة (true/false)
// Payment methods - turn each on/off
const PAYMENT = {
  cod: true,                       // الدفع كاش عند الاستلام
  wallet: true,                    // تحويل على محفظة إلكترونية
  card: true,                      // فيزا / كارت
  // أرقام المحافظ: حطي الرقم الحقيقي بدل الفاضي. المحفظة اللي رقمها فاضي مش هتظهر
  wallets: [
    { id: "vodafone", ar: "فودافون كاش", en: "Vodafone Cash", number: "" },
    { id: "instapay", ar: "إنستا باي",   en: "InstaPay",      number: "" },
    { id: "etisalat", ar: "اتصالات كاش", en: "Etisalat Cash", number: "" },
    { id: "orange",   ar: "أورنج كاش",   en: "Orange Cash",   number: "" }
  ],
  // لينك دفع بالكارت من مزوّد دفع (Paymob / Kashier / Fawry ...). فاضي = البائعة تبعت اللينك للعميل على واتساب
  // Card payment link from a payment provider. Empty = seller sends the link on WhatsApp
  cardLink: ""
};

// الألوان المتاحة: ضيفي أو شيلي أي لون (id لازم يكون مميز)
// Available colors: add or remove any (id must be unique)
const COLORS = [
  { id: "black", ar: "أسود", en: "Black", hex: "#2a2623" },
  { id: "white", ar: "كريمي", en: "Cream", hex: "#eadfce" },
  { id: "beige", ar: "بيج", en: "Beige", hex: "#cdb99a" },
  { id: "grey", ar: "توبي", en: "Taupe", hex: "#9a8576" },
  { id: "red", ar: "روست", en: "Rust", hex: "#8f5238" },
  { id: "pink", ar: "جملي", en: "Camel", hex: "#b58b5c" },
  { id: "lilac", ar: "شوكولاتة", en: "Chocolate", hex: "#5e4030" },
  { id: "blue", ar: "إسبريسو", en: "Espresso", hex: "#3b2a22" },
  { id: "green", ar: "خاكي", en: "Khaki", hex: "#7d7457" },
  { id: "mustard", ar: "رملي", en: "Sand", hex: "#d6c3a0" }
];

// colors: الألوان المتاحة للمنتج (أول لون هو الأساسي)
// deco: "" سادة | "flower" برنت ورد | "text" برنت GOT
// photos (اختياري): صورة حقيقية لكل لون، مثال: photos: { black: "images/black.jpg" }
const PRODUCTS = [
  { id: 1, ar: "هودي بيسك",        en: "Basic Hoodie",        price: 650, cat: "basic", deco: "",       fits: ["regular", "boxy"], colors: ["black", "beige", "white", "grey", "red", "green", "lilac", "mustard"], photos: {} },
  { id: 2, ar: "هودي برنت ورد",    en: "Floral Print Hoodie", price: 750, cat: "print", deco: "flower", fits: ["regular", "boxy"], colors: ["pink", "white", "lilac", "beige", "mustard", "blue"], photos: {} },
  { id: 3, ar: "هودي برنت ستريت",  en: "Street Print Hoodie", price: 780, cat: "print", deco: "text",   fits: ["regular", "boxy"], colors: ["blue", "black", "grey", "red", "green", "white"], photos: {} },
  { id: 4, ar: "هودي أوفر سايز",    en: "Oversized Hoodie",    price: 720, cat: "basic", deco: "",       fits: ["boxy", "regular"], colors: ["beige", "grey", "black", "lilac", "green"], photos: {} },
  { id: 5, ar: "هودي كلاسيك",       en: "Classic Hoodie",      price: 600, cat: "basic", deco: "",       fits: ["regular", "boxy"], colors: ["grey", "white", "blue", "red", "black"], photos: {} },
  { id: 6, ar: "هودي ورد أوفر",     en: "Oversized Floral",    price: 790, cat: "print", deco: "flower", fits: ["boxy", "regular"], colors: ["white", "lilac", "pink", "green"], photos: {} },
  { id: 7, ar: "هودي ستريت أوفر",   en: "Oversized Street",    price: 820, cat: "print", deco: "text",   fits: ["boxy", "regular"], colors: ["black", "red", "beige", "blue"], photos: {} },
  { id: 8, ar: "هودي يونيسكس",      en: "Unisex Hoodie",       price: 690, cat: "basic", deco: "",       fits: ["regular", "boxy"], colors: ["green", "mustard", "grey", "pink", "black"], photos: {} }
];
// المقاسات (Fit): regular عادي | boxy بوكس فيت. لكل منتج fits: ["regular","boxy"] أو ["regular"] بس
const FITS = {
  regular: { ar: "عادي",       en: "Regular" },
  boxy:    { ar: "بوكس فيت",   en: "Boxy fit" }
};
const SIZES = ["S", "M", "L", "XL"];
