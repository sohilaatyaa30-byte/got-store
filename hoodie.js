// يرسم الهودي بأي لون (SVG) - مش محتاج صور. لو عندك صور حقيقية حطيها في products.js في photos
function hoodieSVG(c, deco, fit) {
  const sh = (h, f) => "#" + [1, 3, 5].map(i => Math.max(0, Math.min(255, Math.round(parseInt(h.substr(i, 2), 16) * f))).toString(16).padStart(2, "0")).join("");
  const lum = (parseInt(c.substr(1, 2), 16) * 299 + parseInt(c.substr(3, 2), 16) * 587 + parseInt(c.substr(5, 2), 16) * 114) / 1000;
  const dark = lum < 150, light = lum > 215;
  const d = sh(c, .7), dd = sh(c, .55), l = light ? "#ffffff" : sh(c, 1.18), m = sh(c, .88);
  const ink = dark ? "#ffffff" : "#2b2623";
  const pr = dark ? "#ffffff" : (light ? "#a9805a" : "#ffffff");
  const bg1 = dark ? "#f1eadf" : "#ece4d8", bg2 = dark ? "#d9cfc0" : "#d8cebf";
  let extra = "";
  if (deco === "flower") {
    [[430, 760, 1, 10], [570, 800, 1.2, 40], [500, 890, .9, 20], [390, 920, 1.1, 60], [610, 920, 1, 5], [480, 990, 1.2, 30], [550, 710, .8, 50]].forEach(([x, y, s, r]) => {
      extra += `<g transform="translate(${x},${y}) scale(${s}) rotate(${r})" filter="url(#ink)">` +
        [0, 72, 144, 216, 288].map(a => `<ellipse cx="0" cy="-20" rx="11" ry="20" fill="${pr}" transform="rotate(${a})"/>`).join("") +
        `<circle r="8" fill="#c9a24a"/></g>`;
    });
  }
  if (deco === "text") {
    const t2 = dark ? "#e0d3bd" : sh(c, .6);
    extra = `<g filter="url(#ink)"><text x="500" y="740" font-family="Impact,Arial Black,sans-serif" font-size="150" fill="${ink}" text-anchor="middle" letter-spacing="14">GOT</text><text x="500" y="790" font-family="Arial" font-weight="700" font-size="24" fill="${t2}" text-anchor="middle" letter-spacing="14">STREETWEAR</text><rect x="400" y="805" width="200" height="3" fill="${t2}"/></g>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1250" viewBox="0 0 1000 1250"><defs>
<radialGradient id="bg" cx="50%" cy="38%" r="75%"><stop offset="0" stop-color="${bg1}"/><stop offset="1" stop-color="${bg2}"/></radialGradient>
<linearGradient id="body" x1="0" x2="1"><stop offset="0" stop-color="${d}"/><stop offset=".22" stop-color="${m}"/><stop offset=".5" stop-color="${l}"/><stop offset=".78" stop-color="${m}"/><stop offset="1" stop-color="${d}"/></linearGradient>
<linearGradient id="slL" x1="0" x2="1"><stop offset="0" stop-color="${dd}"/><stop offset=".55" stop-color="${m}"/><stop offset="1" stop-color="${d}"/></linearGradient>
<linearGradient id="slR" x1="1" x2="0"><stop offset="0" stop-color="${dd}"/><stop offset=".55" stop-color="${m}"/><stop offset="1" stop-color="${d}"/></linearGradient>
<radialGradient id="hoodin" cx="50%" cy="60%" r="60%"><stop offset="0" stop-color="${sh(c, .35)}"/><stop offset="1" stop-color="${dd}"/></radialGradient>
<linearGradient id="hood" x1="0" x2="1"><stop offset="0" stop-color="${d}"/><stop offset=".5" stop-color="${l}"/><stop offset="1" stop-color="${d}"/></linearGradient>
<linearGradient id="rib" x1="0" x2="1"><stop offset="0" stop-color="${dd}"/><stop offset=".5" stop-color="${d}"/><stop offset="1" stop-color="${dd}"/></linearGradient>
<pattern id="ribp" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="4" height="9" fill="#0000002e"/></pattern>
<filter id="fabric" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .22 0" result="g"/><feComposite in="g" in2="SourceGraphic" operator="in" result="gi"/><feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="gi"/></feMerge></filter>
<filter id="ink"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="9" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.5"/></filter>
<filter id="blur"><feGaussianBlur stdDeviation="14"/></filter><filter id="soft"><feGaussianBlur stdDeviation="5"/></filter></defs>
<rect width="1000" height="1250" fill="url(#bg)"/>
<ellipse cx="500" cy="1130" rx="330" ry="34" fill="#00000040" filter="url(#blur)"/>
<g transform="${fit === "boxy" ? "translate(500 1100) scale(1.16 .9) translate(-500 -1100)" : ""}" filter="url(#fabric)">
<path d="M330 330 C230 360 170 420 150 520 L100 930 L215 950 L265 640 L330 560Z" fill="url(#slL)"/>
<path d="M670 330 C770 360 830 420 850 520 L900 930 L785 950 L735 640 L670 560Z" fill="url(#slR)"/>
<path d="M330 330 C380 300 620 300 670 330 L735 640 L745 1065 L255 1065 L265 640Z" fill="url(#body)"/>
<path d="M96 925 L214 948 L204 1010 Q150 1030 90 1005Z" fill="url(#rib)"/><path d="M904 925 L786 948 L796 1010 Q850 1030 910 1005Z" fill="url(#rib)"/>
<path d="M96 925 L214 948 L204 1010 Q150 1030 90 1005Z" fill="url(#ribp)"/><path d="M904 925 L786 948 L796 1010 Q850 1030 910 1005Z" fill="url(#ribp)"/>
<path d="M255 1020 Q500 1048 745 1020 L748 1090 Q500 1115 252 1090Z" fill="url(#rib)"/><path d="M255 1020 Q500 1048 745 1020 L748 1090 Q500 1115 252 1090Z" fill="url(#ribp)"/>
<g fill="none" stroke="${dd}" stroke-opacity=".35" stroke-width="7" stroke-linecap="round" filter="url(#soft)"><path d="M285 700 Q330 760 300 860"/><path d="M715 700 Q670 760 700 860"/><path d="M250 560 Q200 700 190 840"/><path d="M750 560 Q800 700 810 840"/><path d="M170 520 Q215 570 250 600"/><path d="M830 520 Q785 570 750 600"/><path d="M420 980 Q440 1010 430 1030"/><path d="M590 975 Q570 1005 575 1030"/></g>
<g fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="9" stroke-linecap="round" filter="url(#soft)"><path d="M440 640 Q470 760 450 940"/><path d="M180 560 Q160 700 150 840"/><path d="M820 560 Q840 700 850 840"/></g>
<path d="M335 800 L665 800 L715 1010 L285 1010Z" fill="${m}" stroke="${dd}" stroke-opacity=".5" stroke-width="3"/>
<path d="M345 812 L655 812 L700 998 L300 998Z" fill="none" stroke="#ffffff" stroke-opacity=".35" stroke-width="2" stroke-dasharray="9 7"/>
<path d="M335 800 L285 1010" stroke="${dd}" stroke-opacity=".6" stroke-width="5"/><path d="M665 800 L715 1010" stroke="${dd}" stroke-opacity=".6" stroke-width="5"/>
<path d="M335 800 L665 800" stroke="#000" stroke-opacity=".25" stroke-width="6" filter="url(#soft)"/>
<path d="M335 345 C300 190 380 70 500 70 C620 70 700 190 665 345 C620 405 380 405 335 345Z" fill="url(#hood)"/>
<path d="M385 340 C365 230 420 150 500 150 C580 150 635 230 615 340 C580 385 420 385 385 340Z" fill="url(#hoodin)"/>
<path d="M335 345 C300 190 380 70 500 70 C620 70 700 190 665 345" fill="none" stroke="#fff" stroke-opacity=".2" stroke-width="8" filter="url(#soft)"/>
<path d="M392 372 Q500 430 608 372" fill="none" stroke="#000" stroke-opacity=".35" stroke-width="10" filter="url(#soft)"/>
<path d="M452 392 C446 450 452 500 448 560" stroke="${ink}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M548 392 C554 450 548 500 552 570" stroke="${ink}" stroke-width="9" fill="none" stroke-linecap="round"/>
<rect x="441" y="556" width="14" height="30" rx="6" fill="${ink}"/><rect x="545" y="566" width="14" height="30" rx="6" fill="${ink}"/>
<circle cx="452" cy="398" r="9" fill="#00000050"/><circle cx="548" cy="398" r="9" fill="#00000050"/>
${extra}</g></svg>`;
}
function hoodieURL(hex, deco, fit) { return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(hoodieSVG(hex, deco, fit)); }
