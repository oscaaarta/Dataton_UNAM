/* =====================================================================
   Scroll storytelling · escenas vectoriales originales + modelo logit
   Todas las ilustraciones son SVG generadas aquí (sin fotografías ni
   recursos de terceros). Las cantidades dibujadas usan datos del
   documento; lo que es ilustrativo se indica en el texto de cada escena.
   ===================================================================== */
(function () {
  'use strict';
  const D = window.DATA, G = window.gsap, ST = window.ScrollTrigger;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const nf = (v, d = 1) => v.toLocaleString('es-MX', { minimumFractionDigits: d, maximumFractionDigits: d });
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const conn = navigator.connection || {};
  const LOW = RM || conn.saveData || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2) || (navigator.deviceMemory && navigator.deviceMemory <= 2);
  const HEAD = "Montserrat, 'Segoe UI', sans-serif", BODY = "'Source Sans 3', 'Segoe UI', sans-serif";
  const K = { night: '#071629', deep: '#102D4F', gold: '#D6AC55', sky: '#62C8F5', on: '#EAF0F8', on2: '#A9BBD1', on3: '#91A6BF', red: '#E9826F', teal: '#3FC1A0' };
  if (G && ST) G.registerPlugin(ST);

  /* ---------- defs compartidas (gradientes) ---------- */
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  defs.setAttribute('width', '0'); defs.setAttribute('height', '0'); defs.setAttribute('aria-hidden', 'true');
  defs.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  defs.innerHTML = `<defs>
    <linearGradient id="gBody" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2A5582"/><stop offset=".55" stop-color="#14304F"/><stop offset="1" stop-color="#0A1B32"/></linearGradient>
    <linearGradient id="gScreen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FAFCFE"/><stop offset="1" stop-color="#DFE8F3"/></linearGradient>
    <linearGradient id="gScreenD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#163659"/><stop offset="1" stop-color="#0B1F38"/></linearGradient>
    <linearGradient id="gGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F3D58F"/><stop offset="1" stop-color="#B8862A"/></linearGradient>
    <linearGradient id="gSky" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#B5E9FF"/><stop offset="1" stop-color="#3A9BDC"/></linearGradient>
    <linearGradient id="gBox" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E8C27A"/><stop offset="1" stop-color="#9E6E24"/></linearGradient>
    <linearGradient id="gBoxS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#B98A3E"/><stop offset="1" stop-color="#7A5419"/></linearGradient>
    <linearGradient id="gCard" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#25507E"/><stop offset="1" stop-color="#112C4C"/></linearGradient>
    <linearGradient id="gFig" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7FD3F7"/><stop offset="1" stop-color="#2A6E9E"/></linearGradient>
    <linearGradient id="gFigG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F3D58F"/><stop offset="1" stop-color="#B8862A"/></linearGradient>
    <radialGradient id="gGlow"><stop offset="0" stop-color="#62C8F5" stop-opacity=".32"/><stop offset="1" stop-color="#62C8F5" stop-opacity="0"/></radialGradient>
    <radialGradient id="gGlowG"><stop offset="0" stop-color="#D6AC55" stop-opacity=".38"/><stop offset="1" stop-color="#D6AC55" stop-opacity="0"/></radialGradient>
    <pattern id="pHatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="currentColor" stroke-width="2"/></pattern>
    <symbol id="pfig" viewBox="0 0 20 44"><circle cx="10" cy="6.5" r="5.6"/><path d="M2 44 V20.5 Q2 14 8.5 14 H11.5 Q18 14 18 20.5 V44 Z"/></symbol>
  </defs>`;
  document.body.prepend(defs);

  /* ---------- primitivas de dibujo ---------- */
  function phone(x, y, w, h, inner = '', cls = '') {
    const r = w * .15, b = w * .045;
    return `<g class="${cls}" transform="translate(${x},${y})">
      <rect x="-6" y="10" width="${w + 12}" height="${h}" rx="${r}" fill="#020a16" opacity=".45"/>
      <rect width="${w}" height="${h}" rx="${r}" fill="url(#gBody)"/>
      <rect x=".8" y=".8" width="${w - 1.6}" height="${h - 1.6}" rx="${r - 1}" fill="none" stroke="#9BE0FF" stroke-opacity=".28" stroke-width="1.2"/>
      <rect x="${b}" y="${b}" width="${w - 2 * b}" height="${h - 2 * b}" rx="${r * .78}" fill="url(#gScreen)"/>
      <rect x="${w * .37}" y="${b + 5}" width="${w * .26}" height="${w * .055}" rx="${w * .03}" fill="#0B1D35"/>
      <g transform="translate(${b},${b})">${inner}</g></g>`;
  }
  const rr = (x, y, w, h, r, f, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${f}" ${extra}/>`;
  const tx = (x, y, s, size, fill, weight = 600, anchor = 'start', fam = BODY, extra = '') => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}" font-family="${fam}" ${extra}>${s}</text>`;
  function box(x, y, s, cls = '') { // paquete isométrico
    return `<g class="${cls}" transform="translate(${x},${y}) scale(${s})">
      <path d="M0 14 L28 0 L56 14 L28 28 Z" fill="#F0CF8C"/><path d="M0 14 L28 28 L28 62 L0 48 Z" fill="url(#gBox)"/><path d="M56 14 L28 28 L28 62 L56 48 Z" fill="url(#gBoxS)"/>
      <path d="M14 7 L42 21 L42 30" stroke="#7A5419" stroke-width="3" fill="none" opacity=".55"/></g>`;
  }
  function card(x, y, w, h, cls = '', inner = '') {
    return `<g class="${cls}" transform="translate(${x},${y})"><rect width="${w}" height="${h}" rx="12" fill="url(#gCard)" stroke="#9BE0FF" stroke-opacity=".22"/>${inner}</g>`;
  }
  function waves(x, y, s, cls = '', col = K.sky) {
    return `<g class="${cls}" transform="translate(${x},${y}) scale(${s})" fill="none" stroke="${col}" stroke-linecap="round" stroke-width="3">
      <path d="M-18 -6 Q0 -22 18 -6" opacity=".9"/><path d="M-30 -16 Q0 -42 30 -16" opacity=".6"/><path d="M-42 -26 Q0 -62 42 -26" opacity=".35"/><circle cx="0" cy="4" r="4" fill="${col}" stroke="none"/></g>`;
  }
  function shield(x, y, s, cls = '', fill = 'url(#gGold)') {
    return `<g class="${cls}" transform="translate(${x},${y}) scale(${s})"><path d="M0 -50 L40 -36 V2 Q40 36 0 54 Q-40 36 -40 2 V-36 Z" fill="${fill}"/>
      <path d="M0 -40 L31 -29 V2 Q31 28 0 43 Q-31 28 -31 2 V-29 Z" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>
      <path d="M-15 2 L-4 13 L17 -10" fill="none" stroke="#071629" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  }
  function qr(x, y, size, seed = 7, cls = '') {
    const n = 21, c = size / n; let s = seed, out = '';
    const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const inF = (i, j) => (i < 7 && j < 7) || (i > n - 8 && j < 7) || (i < 7 && j > n - 8);
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) if (!inF(i, j) && rnd() > .55) out += `<rect x="${i * c}" y="${j * c}" width="${c}" height="${c}"/>`;
    const f = (i, j) => `<rect x="${i * c}" y="${j * c}" width="${7 * c}" height="${7 * c}" rx="${c}"/><rect x="${(i + 1) * c}" y="${(j + 1) * c}" width="${5 * c}" height="${5 * c}" fill="#fff" rx="${c * .6}"/><rect x="${(i + 2) * c}" y="${(j + 2) * c}" width="${3 * c}" height="${3 * c}" rx="${c * .5}"/>`;
    return `<g class="${cls}" transform="translate(${x},${y})" fill="#0D2137"><rect x="${-c}" y="${-c}" width="${size + 2 * c}" height="${size + 2 * c}" rx="${c * 1.5}" fill="#fff"/>${out}${f(0, 0)}${f(n - 7, 0)}${f(0, n - 7)}<rect x="${size / 2 - 2.5 * c}" y="${size / 2 - 2.5 * c}" width="${5 * c}" height="${5 * c}" rx="${c}" fill="#D6AC55"/></g>`;
  }
  // figura editorial (adulto); variantes por altura y cabello
  // figura editorial: cabeza separada por cuello, torso de hombros redondeados, piernas; cabello como silueta
  function person(x, base, h, opt = {}) {
    const hr = h * .1, w = h * .3, top = base - h, hy = top + hr, shY = top + hr * 2 + h * .045, waist = base - h * .42, r2 = w * .34, col = opt.fill || 'url(#gFig)';
    const lw = w * .4, gap = w * .07;
    let s = `<g class="${opt.cls || ''}" ${opt.attr || ''}>`;
    s += `<ellipse cx="${x}" cy="${base + 1}" rx="${w * .8}" ry="${h * .03}" fill="#000" opacity=".3"/>`;
    if (opt.hair === 'long') s += `<path d="M${x - hr * 1.15} ${hy} Q${x - hr * 1.25} ${top - hr * .15} ${x} ${top - hr * .12} Q${x + hr * 1.25} ${top - hr * .15} ${x + hr * 1.15} ${hy} L${x + hr * 1.2} ${shY + h * .05} Q${x} ${shY + h * .09} ${x - hr * 1.2} ${shY + h * .05} Z" fill="#0C2440"/>`;
    s += `<path d="M${x - w / 2} ${waist} V${shY + r2} Q${x - w / 2} ${shY} ${x - w / 2 + r2} ${shY} H${x + w / 2 - r2} Q${x + w / 2} ${shY} ${x + w / 2} ${shY + r2} V${waist} Q${x + w / 2} ${waist + h * .03} ${x + w * .42} ${waist + h * .03} H${x - w * .42} Q${x - w / 2} ${waist + h * .03} ${x - w / 2} ${waist} Z" fill="${col}"/>`;
    s += `<rect x="${x - gap / 2 - lw}" y="${waist}" width="${lw}" height="${base - waist}" rx="${lw * .45}" fill="${col}" opacity=".88"/><rect x="${x + gap / 2}" y="${waist}" width="${lw}" height="${base - waist}" rx="${lw * .45}" fill="${col}" opacity=".88"/>`;
    s += `<rect x="${x - hr * .38}" y="${hy + hr * .7}" width="${hr * .76}" height="${shY - hy - hr * .55}" rx="${hr * .3}" fill="${col}" opacity=".8"/>`;
    s += `<circle cx="${x}" cy="${hy}" r="${hr}" fill="${col}"/>`;
    const cres = c => `<path d="M${x - hr * .98} ${hy - hr * .05} A${hr} ${hr} 0 0 1 ${x + hr * .98} ${hy - hr * .05} Q${x + hr * .15} ${hy - hr * 1.3} ${x - hr * .98} ${hy - hr * .05} Z" fill="${c}"/>`;
    if (opt.hair === 'short' || opt.hair === 'long') s += cres('#0C2440');
    if (opt.hair === 'gray') s += cres('#D7E1EE');
    if (opt.phone) s += `<g class="${opt.phoneCls || ''}"><rect x="${x + w * .36}" y="${shY + h * .17}" width="${w * .3}" height="${w * .5}" rx="${w * .07}" fill="url(#gGold)"/><rect x="${x + w * .4}" y="${shY + h * .185}" width="${w * .22}" height="${w * .36}" rx="${w * .04}" fill="#071629" opacity=".55"/></g>`;
    return s + '</g>';
  }

  /* ---------- proyección de México ---------- */
  function mxProject(bx, by, bw, bh) {
    const F = (window.MX_GEO || { features: [] }).features, lon0 = -117.3, lon1 = -86.6, lat0 = 32.8, lat1 = 14.4, ky = 1 / Math.cos(23 * Math.PI / 180);
    const sc = Math.min(bw / (lon1 - lon0), bh / ((lat0 - lat1) * ky));
    const ox = bx + (bw - sc * (lon1 - lon0)) / 2, oy = by + (bh - sc * (lat0 - lat1) * ky) / 2;
    const P = (c) => [ox + (c[0] - lon0) * sc, oy + (lat0 - c[1]) * sc * ky];
    const out = {};
    F.forEach(f => {
      const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
      let d = '', best = null, bl = 0;
      polys.forEach(p => { p.forEach(ring => { d += 'M' + ring.map(c => P(c).map(v => v.toFixed(1)).join(' ')).join('L') + 'Z'; }); if (p[0].length > bl) { bl = p[0].length; best = p[0]; } });
      let sx = 0, sy = 0; best.forEach(c => { const q = P(c); sx += q[0]; sy += q[1]; });
      out[f.properties.name] = { d, c: [sx / best.length, sy / best.length] };
    });
    return out;
  }
  const lerpCol = (stops, t) => {
    t = Math.max(0, Math.min(1, t)); const n = stops.length - 1, i = Math.min(n - 1, Math.floor(t * n)), k = t * n - i;
    const a = stops[i].match(/\w\w/g).map(h => parseInt(h, 16)), b = stops[i + 1].match(/\w\w/g).map(h => parseInt(h, 16));
    return '#' + a.map((v, j) => Math.round(v + (b[j] - v) * k).toString(16).padStart(2, '0')).join('');
  };

  /* =====================================================================
     ESCENAS
     Cada escena: n pasos; svg(); build(tl, q, at). at(i) = momento en que
     inicia la transición hacia el paso i (el paso i queda completo en T(i)).
     ===================================================================== */
  const SCENES = {};

  /* 01 · El comercio electrónico crece */
  SCENES.commerce = {
    svg() {
      const ui = (w, h) => rr(10, 34, w - 20, 16, 5, '#102D4F') + tx(18, 46, 'Tienda', 9, '#fff', 700, 'start', HEAD) +
        [0, 1, 2, 3].map(i => { const cx = 10 + (i % 2) * ((w - 26) / 2 + 6), cy = 60 + Math.floor(i / 2) * 92; return rr(cx, cy, (w - 26) / 2, 84, 8, '#fff', 'stroke="#DCE5F0"') + rr(cx + 6, cy + 6, (w - 26) / 2 - 12, 48, 6, ['#F3E1B9', '#D7ECF8', '#E7E1F6', '#D5F0E6'][i]) + rr(cx + 6, cy + 60, 40, 6, 3, '#9AAABD') + rr(cx + 6, cy + 71, 26, 6, 3, '#D6AC55'); }).join('') +
        rr(10, h - 50, w - 20, 34, 10, '#D6AC55') + rr(w / 2 - 28, h - 37, 56, 8, 4, '#071629');
      const V = D.vabcoel.total, mx = Math.max(...V);
      const bars = V.map((v, i) => `<rect class="vb" x="${470 + i * 24}" y="${470 - v / mx * 250}" width="16" height="${v / mx * 250}" rx="4" fill="${i === 7 ? K.gold : i === 11 ? K.sky : '#2C6A99'}"/>`).join('');
      return `<circle cx="400" cy="300" r="260" fill="url(#gGlow)" class="glow"/>
        <g class="ph">${phone(300, 70, 200, 410, ui(182, 392))}</g>
        ${box(150, 330, 1.25, 'it it1')}${box(560, 120, .95, 'it it2')}${box(590, 380, 1.1, 'it it3')}
        ${card(120, 120, 150, 92, 'it it4', rr(14, 16, 60, 8, 4, '#9BE0FF') + rr(14, 32, 100, 6, 3, '#4E7BA6') + `<polyline points="14,78 44,66 70,70 96,50 126,34" fill="none" stroke="${K.gold}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`)}
        ${waves(400, 52, .9, 'it it5')}
        ${card(540, 250, 130, 70, 'it it6', `<circle cx="24" cy="35" r="12" fill="${K.gold}"/><path d="M18 35 l5 5 9-10" stroke="#071629" stroke-width="3" fill="none" stroke-linecap="round"/>` + rr(46, 26, 66, 7, 3, '#9BE0FF') + rr(46, 39, 44, 6, 3, '#4E7BA6'))}
        <g class="bars">${bars}<line class="bl" x1="462" x2="762" y1="470" y2="470" stroke="#9BE0FF" stroke-opacity=".3"/>
          ${tx(470, 500, '2013', 13, K.on2, 600, 'start', BODY, 'class="bl"')}${tx(758, 500, '2024', 13, K.on2, 600, 'end', BODY, 'class="bl"')}
          ${tx(470, 196, '1.80 billones de pesos de 2018', 15, K.on, 700, 'start', HEAD, 'class="bl"')}</g>`;
    },
    build(tl, q, at) {
      G.set(q('.it'), { opacity: 0, scale: .6, transformOrigin: '50% 50%' }); G.set(q('.vb'), { scaleY: 0, transformOrigin: '50% 100%' }); G.set(q('.bl'), { opacity: 0 });
      G.set(q('.ph'), { opacity: 0, y: 40 }); G.set(q('.glow'), { opacity: 0, scale: .7, transformOrigin: '50% 50%' });
      tl.to(q('.glow'), { opacity: 1, scale: 1, duration: .6 }, .05).to(q('.ph'), { opacity: 1, y: 0, duration: .55 }, .05);
      tl.to(q('.it'), { opacity: 1, scale: 1, duration: .45, stagger: .05 }, at(1));
      tl.to(q('.it'), { opacity: 0, scale: .4, x: (i) => [-60, 60, 80, -80, 0, 80][i], duration: .4, stagger: .02 }, at(2))
        .to(q('.ph'), { x: -200, scale: .78, transformOrigin: '50% 50%', duration: .5 }, at(2))
        .to(q('.vb'), { scaleY: 1, duration: .45, stagger: .025 }, at(2) + .1).to(q('.bl'), { opacity: 1, duration: .25 }, at(2) + .35);
    }
  };

  /* 02 · México se digitaliza de forma desigual */
  SCENES.territory = {
    svg() {
      const M = mxProject(30, 40, 740, 520), names = Object.keys(M), top5 = ['México', 'Ciudad de México', 'Jalisco', 'Nuevo León', 'Veracruz'];
      const pen = D.penetration, links = [];
      names.forEach(a => { names.map(b => ({ b, d: Math.hypot(M[a].c[0] - M[b].c[0], M[a].c[1] - M[b].c[1]) })).filter(o => o.b !== a).sort((u, v) => u.d - v.d).slice(0, 3).forEach(o => { if (!links.some(l => l[0] === o.b && l[1] === a)) links.push([a, o.b]); }); });
      const lab = (n, v, dx, dy, cls) => `<g class="${cls}"><line x1="${M[n].c[0]}" y1="${M[n].c[1]}" x2="${M[n].c[0] + dx}" y2="${M[n].c[1] + dy}" stroke="${K.on2}" stroke-opacity=".6"/>${tx(M[n].c[0] + dx + (dx < 0 ? -4 : 4), M[n].c[1] + dy + 4, `${n} · ${v}`, 14, K.on, 700, dx < 0 ? 'end' : 'start', HEAD)}</g>`;
      return `<g class="st">${names.map(n => `<path class="sp" data-n="${n}" data-pen="${pen[n]}" d="${M[n].d}" fill="#12304F" stroke="#9BE0FF" stroke-opacity=".22" stroke-width=".8"/>`).join('')}</g>
        <g class="lk">${links.map(l => `<line x1="${M[l[0]].c[0]}" y1="${M[l[0]].c[1]}" x2="${M[l[1]].c[0]}" y2="${M[l[1]].c[1]}" stroke="${K.sky}" stroke-opacity=".35" stroke-width="1" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>`).join('')}</g>
        <g>${names.map(n => { const b = D.buyers[n][9]; return `<circle class="dt ${top5.includes(n) ? 'big' : ''}" cx="${M[n].c[0]}" cy="${M[n].c[1]}" r="${2.5 + Math.sqrt(b / 5.2e6) * 15}" fill="${top5.includes(n) ? K.gold : K.sky}" fill-opacity=".85"/>`; }).join('')}</g>
        ${lab('México', '5.20 M', 120, 40, 'l5')}${lab('Ciudad de México', '3.93 M', 130, 90, 'l5')}${lab('Jalisco', '2.83 M', -80, 70, 'l5')}${lab('Nuevo León', '2.51 M', 70, -50, 'l5')}${lab('Veracruz', '2.08 M', 110, -10, 'l5')}
        ${lab('Chiapas', '7.2%', -30, 72, 'lp')}${lab('Oaxaca', '10.0%', -40, 70, 'lp')}${lab('Guerrero', '11.4%', -90, 50, 'lp')}${lab('Colima', '31.1%', -90, 40, 'lp')}`;
    },
    build(tl, q, at) {
      const ramp = ['#14324F', '#1F6E8C', '#4FB6C9', '#D9F6EE'];
      G.set(q('.sp'), { opacity: 0 }); G.set(q('.dt'), { scale: 0, transformOrigin: '50% 50%' }); G.set(q('.l5, .lp'), { opacity: 0 });
      tl.to(q('.sp'), { opacity: 1, duration: .4, stagger: .008 }, .05).to(q('.dt'), { scale: .55, duration: .35, stagger: .006 }, .25);
      tl.to(q('.lk line'), { attr: { 'stroke-dashoffset': 0 }, duration: .45, stagger: .004 }, at(1)).to(q('.dt.big'), { scale: 1, duration: .4 }, at(1)).to(q('.l5'), { opacity: 1, duration: .3, stagger: .05 }, at(1) + .15);
      q('.sp').forEach(p => tl.to(p, { attr: { fill: lerpCol(ramp, (+p.dataset.pen - 7) / 24) }, duration: .4 }, at(2)));
      tl.to(q('.l5'), { opacity: 0, duration: .2 }, at(2)).to(q('.dt'), { scale: .25, duration: .3 }, at(2)).to(q('.lk line'), { attr: { 'stroke-opacity': .1 }, duration: .3 }, at(2)).to(q('.lp'), { opacity: 1, duration: .3, stagger: .05 }, at(2) + .2);
    }
  };

  /* 03 · El comprador digital */
  SCENES.buyers = {
    svg() {
      const E = D.profile.edad, X = i => 92 + i * 102, base = 480;
      const hs = [120, 156, 160, 158, 154, 150, 146], hair = ['short', 'long', 'short', 'long', 'short', 'gray', 'gray'];
      let s = `<circle cx="400" cy="300" r="280" fill="url(#gGlow)" opacity=".6"/><line x1="40" x2="760" y1="${base + 4}" y2="${base + 4}" stroke="#9BE0FF" stroke-opacity=".2"/>`;
      // columnas detrás de cada figura: altura proporcional a la tasa de compra (0–60%)
      E.forEach((g, i) => {
        const hot = i === 1 || i === 2, bh = g.tasa / 60 * 360;
        s += `<rect class="tb" x="${X(i) - 34}" y="${base - bh}" width="68" height="${bh}" rx="10" fill="${hot ? K.gold : K.sky}" fill-opacity="${hot ? .22 : .12}" stroke="${hot ? K.gold : K.sky}" stroke-opacity=".45"/>`;
        s += tx(X(i), Math.min(base - bh, base - hs[i]) - 12, nf(g.tasa) + "%", 17, hot ? K.gold : K.on, 800, 'middle', HEAD, 'class="tv"');
      });
      E.forEach((g, i) => {
        const hot = i === 1 || i === 2;
        s += person(X(i), base, hs[i], { cls: 'pf pf' + i, hair: hair[i], phone: true, phoneCls: 'pph', fill: hot ? 'url(#gFigG)' : 'url(#gFig)' });
        s += tx(X(i), base + 30, g.g, 14, K.on2, 600, 'middle', BODY, 'class="tl"');
      });
      return s;
    },
    build(tl, q, at) {
      G.set(q('.pf'), { opacity: 0, y: 30 }); G.set(q('.pph'), { opacity: 0 }); G.set(q('.tb'), { scaleY: 0, transformOrigin: '50% 100%' }); G.set(q('.tv, .tl'), { opacity: 0 });
      tl.to(q('.pf'), { opacity: 1, y: 0, duration: .35, stagger: .06 }, .05).to(q('.tl'), { opacity: 1, duration: .2 }, .4);
      tl.to(q('.tb'), { scaleY: 1, duration: .4, stagger: .04 }, at(1)).to(q('.tv'), { opacity: 1, duration: .25, stagger: .04 }, at(1) + .2);
      tl.to(q('.pph'), { opacity: 1, duration: .3, stagger: .03 }, at(2)).to(q('.tb, .tv'), { opacity: .25, duration: .3 }, at(2));
    }
  };

  /* 04 · Qué compramos por internet */
  SCENES.goods = {
    svg() {
      // categorías reales (ENDUTIH) con su valor 2025 y 2021
      const C = [['Ropa', 74.4, 68.0, 'shirt'], ['Hogar', 50.6, 38.5, 'home'], ['Higiene y belleza', 46.4, 31.0, 'bottle'], ['Transporte', 38.2, 31.9, 'car'], ['Alimentos', 37.5, 34.7, 'food'], ['Computadoras', 7.7, 8.0, 'laptop']];
      const icon = {
        shirt: `<path d="M-26 -22 L-10 -30 Q0 -22 10 -30 L26 -22 L34 -6 L22 0 L20 30 L-20 30 L-22 0 L-34 -6 Z" fill="url(#gSky)"/><path d="M-10 -30 Q0 -18 10 -30" stroke="#0B1D35" stroke-width="2" fill="none" opacity=".4"/>`,
        home: `<path d="M-30 -2 L0 -30 L30 -2" fill="none" stroke="url(#gGold)" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/><rect x="-22" y="-4" width="44" height="34" rx="4" fill="url(#gGold)"/><rect x="-6" y="10" width="12" height="20" rx="2" fill="#071629" opacity=".5"/>`,
        bottle: `<rect x="-8" y="-34" width="16" height="12" rx="3" fill="#E7E1F6"/><rect x="-18" y="-24" width="36" height="56" rx="12" fill="#B8A4F0"/><rect x="-11" y="-6" width="22" height="18" rx="4" fill="#fff" opacity=".7"/>`,
        car: `<path d="M-34 10 L-30 -6 Q-28 -14 -18 -16 L18 -16 Q28 -14 30 -6 L34 10 Q34 18 26 18 L-26 18 Q-34 18 -34 10 Z" fill="url(#gSky)"/><rect x="-20" y="-12" width="40" height="12" rx="3" fill="#0B1D35" opacity=".45"/><circle cx="-20" cy="18" r="7" fill="#0B1D35"/><circle cx="20" cy="18" r="7" fill="#0B1D35"/>`,
        food: `<path d="M-24 -14 L24 -14 L20 30 L-20 30 Z" fill="#D5F0E6"/><path d="M-12 -14 Q-12 -30 0 -30 Q12 -30 12 -14" fill="none" stroke="#3FC1A0" stroke-width="4"/><circle cx="-6" cy="6" r="7" fill="#3FC1A0"/><circle cx="8" cy="12" r="6" fill="#E9826F"/>`,
        laptop: `<rect x="-26" y="-24" width="52" height="34" rx="4" fill="#163659" stroke="#9BE0FF" stroke-opacity=".5"/><rect x="-21" y="-19" width="42" height="24" rx="2" fill="#62C8F5" opacity=".55"/><path d="M-34 14 H34 L30 22 H-30 Z" fill="#9BE0FF"/>`
      };
      const orbit = [[180, 150], [620, 140], [650, 330], [600, 500], [180, 480], [130, 320]];
      let s = `<circle cx="400" cy="300" r="250" fill="url(#gGlow)" opacity=".7"/><g class="ph">${phone(315, 110, 170, 360, rr(10, 30, 150, 14, 4, '#102D4F') + rr(10, 56, 150, 120, 10, '#E7EEF7') + `<circle cx="85" cy="116" r="30" fill="url(#gGold)"/>` + rr(10, 190, 100, 10, 5, '#9AAABD') + rr(10, 208, 60, 10, 5, '#D6AC55') + rr(10, 300, 150, 30, 9, '#102D4F'))}</g>`;
      C.forEach((c, i) => {
        const bx = 120 + i * 112, bh = c[1] / 80 * 300, b21 = c[2] / 80 * 300;
        s += `<g class="ob" data-ox="${orbit[i][0]}" data-oy="${orbit[i][1]}" data-bx="${bx}" data-by="${150}" transform="translate(${orbit[i][0]},${orbit[i][1]})"><circle r="44" fill="#102D4F" stroke="#9BE0FF" stroke-opacity=".25"/>${icon[c[3]]}</g>`;
        s += `<rect class="gb" x="${bx - 26}" y="${530 - bh}" width="52" height="${bh}" rx="6" fill="${i === 5 ? '#5C7491' : '#3A9BDC'}"/>`;
        s += `<line class="g21" x1="${bx - 34}" x2="${bx + 34}" y1="${530 - b21}" y2="${530 - b21}" stroke="${K.gold}" stroke-width="3" stroke-linecap="round"/>`;
        s += tx(bx, 530 - bh - 12, nf(c[1]) + '%', 17, K.on, 800, 'middle', HEAD, 'class="gv"');
        s += tx(bx, 556, c[0], 13, K.on2, 600, 'middle', BODY, 'class="gl"');
      });
      return s;
    },
    build(tl, q, at) {
      const obs = q('.ob');
      G.set(obs, { opacity: 0, scale: .4, transformOrigin: '50% 50%' }); G.set(q('.gb'), { scaleY: 0, transformOrigin: '50% 100%' }); G.set(q('.gv, .gl, .g21'), { opacity: 0 }); G.set(q('.ph'), { opacity: 0, y: 30 });
      tl.to(q('.ph'), { opacity: 1, y: 0, duration: .45 }, .05).to(obs, { opacity: 1, scale: 1, duration: .4, stagger: .05 }, .2);
      tl.to(q('.ph'), { opacity: 0, scale: .7, transformOrigin: '50% 50%', duration: .35 }, at(1));
      obs.forEach((o, i) => tl.to(o, { x: +o.dataset.bx, y: +o.dataset.by, scale: .85, duration: .45 }, at(1) + i * .02));
      tl.to(q('.gb'), { scaleY: 1, duration: .4, stagger: .04 }, at(1) + .15).to(q('.gv, .gl'), { opacity: 1, duration: .25 }, at(1) + .35);
      tl.to(q('.g21'), { opacity: 1, duration: .3, stagger: .03 }, at(2));
    }
  };

  /* 05 · La desconfianza */
  SCENES.trust = {
    svg() {
      const scr = (w, h) => rr(10, 30, w - 20, 14, 4, '#102D4F') + tx(14, 60, 'Pagar pedido', 12, '#0D2137', 800, 'start', HEAD) +
        ['Número de tarjeta', 'Vencimiento', 'Código de seguridad', 'Nombre del titular', 'Código por SMS'].map((l, i) => tx(14, 86 + i * 46, l, 9, '#52657C', 600) + `<rect class="fld" x="12" y="${92 + i * 46}" width="${w - 24}" height="24" rx="6" fill="#fff" stroke="#C9D5E4" stroke-width="1.5"/>`).join('') +
        rr(12, h - 54, w - 24, 34, 10, '#9AAABD');
      return `<circle cx="400" cy="300" r="250" fill="url(#gGlow)" opacity=".55"/>
        <g class="ph">${phone(300, 70, 200, 420, scr(182, 402))}</g>
        <g class="un">
          <g class="u1" transform="translate(120,150)"><rect width="160" height="100" rx="12" fill="url(#gCard)" stroke="#9BE0FF" stroke-opacity=".3" stroke-dasharray="6 5"/>${rr(16, 20, 32, 22, 5, '#D6AC55')}${tx(16, 76, '•••• •••• •••• ••••', 16, K.on2, 700, 'start', HEAD)}</g>
          <g class="u2" transform="translate(600,170)"><path d="M-22 0 V-18 Q-22 -42 0 -42 Q22 -42 22 -18" fill="none" stroke="${K.on2}" stroke-width="7" stroke-dasharray="4 6" stroke-linecap="round"/><rect x="-32" y="-4" width="64" height="52" rx="10" fill="none" stroke="${K.on2}" stroke-width="3" stroke-dasharray="6 5"/></g>
          <g class="u3"><circle cx="610" cy="370" r="26" fill="none" stroke="${K.gold}" stroke-opacity=".7" stroke-width="2"/>${tx(610, 380, '?', 28, K.gold, 800, 'middle', HEAD)}</g>
          <g class="u4"><circle cx="160" cy="420" r="20" fill="none" stroke="${K.gold}" stroke-opacity=".5" stroke-width="2"/>${tx(160, 428, '?', 22, K.gold, 800, 'middle', HEAD)}</g>
          <circle class="u5" cx="400" cy="280" r="235" fill="none" stroke="${K.sky}" stroke-opacity=".25" stroke-dasharray="2 10"/>
        </g>
        <g class="br">${[['Prefiere comprar en persona', 34.4], ['No sabe cómo hacerlo', 18.3], ['Desconfía de la seguridad (datos/tarjetas)', 8.2]].map((b, i) => { const w = b[1] / 40 * 380; return rr(330, 180 + i * 90, w, 40, 8, i === 2 ? K.red : i === 1 ? K.gold : '#5C7491', 'class="bb"') + tx(330, 170 + i * 90, b[0], 15, K.on2, 600) + tx(340 + w, 208 + i * 90, nf(b[1]) + '%', 20, K.on, 800, 'start', HEAD); }).join('')}
          ${tx(330, 470, '% de usuarios de internet que no compraron en línea, 2025', 13, K.on3, 600)}</g>`;
    },
    build(tl, q, at) {
      G.set(q('.un > *'), { opacity: 0, scale: .8, transformOrigin: '50% 50%' }); G.set(q('.br'), { opacity: 0 }); G.set(q('.bb'), { scaleX: 0, transformOrigin: '0% 50%' }); G.set(q('.ph'), { opacity: 0, y: 30 });
      tl.to(q('.ph'), { opacity: 1, y: 0, duration: .45 }, .05);
      tl.to(q('.fld'), { attr: { stroke: K.gold }, duration: .15, stagger: .07 }, at(1)).to(q('.un > *'), { opacity: 1, scale: 1, duration: .4, stagger: .06 }, at(1) + .1);
      tl.to(q('.un > *'), { opacity: 0, scale: 1.15, duration: .35, stagger: .03 }, at(2)).to(q('.ph'), { x: -230, scale: .72, opacity: .55, transformOrigin: '50% 50%', duration: .45 }, at(2))
        .to(q('.br'), { opacity: 1, duration: .25 }, at(2) + .15).to(q('.bb'), { scaleX: 1, duration: .4, stagger: .07 }, at(2) + .2);
    }
  };

  /* 06 · La infraestructura de CoDi */
  SCENES.codi = {
    svg() {
      const shop = (w, h) => tx(w / 2, 50, 'Comercio', 11, '#0D2137', 800, 'middle', HEAD) + qr(w / 2 - 52, 70, 104, 11) + tx(w / 2, 214, '$1,249.00', 14, '#0D2137', 800, 'middle', HEAD) + `<g class="okL" opacity="0"><circle cx="${w / 2}" cy="${h - 70}" r="22" fill="#3FC1A0"/><path d="M${w / 2 - 9} ${h - 70} l6 7 13-15" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
      const bank = (w, h) => rr(0, 0, w, 64, 0, '#102D4F') + tx(12, 46, 'Mi banco', 11, '#fff', 800, 'start', HEAD) +
        `<g class="req" opacity="0">${rr(10, 80, w - 20, 116, 10, '#fff', 'stroke="#DCE5F0"')}${tx(20, 102, 'Solicitud de cobro', 9, '#52657C', 600)}${tx(20, 126, 'Comercio', 11, '#0D2137', 800, 'start', HEAD)}${tx(20, 152, '$1,249.00', 15, '#0D2137', 800, 'start', HEAD)}${rr(20, 166, w - 40, 18, 9, '#D6AC55')}</g>` +
        `<g class="okR" opacity="0"><circle cx="${w / 2}" cy="${h - 70}" r="22" fill="#3FC1A0"/><path d="M${w / 2 - 9} ${h - 70} l6 7 13-15" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
      return `<circle cx="400" cy="300" r="260" fill="url(#gGlow)" opacity=".5"/>
        <path class="rail" d="M240 300 C 320 200, 480 200, 560 300" fill="none" stroke="${K.sky}" stroke-opacity=".35" stroke-width="2" stroke-dasharray="4 8"/>
        <path class="rail2" d="M560 300 C 500 420, 300 420, 240 300" fill="none" stroke="${K.gold}" stroke-opacity=".35" stroke-width="2" stroke-dasharray="4 8"/>
        <g class="pL">${phone(90, 120, 150, 330, shop(136, 316))}</g>
        <g class="pR">${phone(560, 120, 150, 330, bank(136, 316))}</g>
        <g class="spei"><circle cx="400" cy="400" r="40" fill="#102D4F" stroke="${K.gold}" stroke-width="2"/>${tx(400, 397, 'SPEI', 15, K.on, 800, 'middle', HEAD)}${tx(400, 414, 'Banxico', 11, K.on2, 600, 'middle')}</g>
        <circle class="pt" cx="240" cy="300" r="7" fill="${K.sky}"/><circle class="pt2" cx="560" cy="300" r="7" fill="${K.gold}"/>`;
    },
    build(tl, q, at) {
      G.set(q('.pL, .pR'), { opacity: 0, y: 30 }); G.set(q('.spei'), { opacity: 0, scale: .6, transformOrigin: '50% 50%' }); G.set(q('.pt, .pt2, .rail, .rail2'), { opacity: 0 });
      tl.to(q('.pL'), { opacity: 1, y: 0, duration: .4 }, .05).to(q('.pR'), { opacity: 1, y: 0, duration: .4 }, .2);
      // solicitud: del QR al teléfono del cliente
      const p1 = [[240, 300], [300, 240], [360, 222], [440, 222], [500, 240], [560, 300]];
      tl.to(q('.rail'), { opacity: 1, duration: .15 }, at(1)).to(q('.pt'), { opacity: 1, duration: .05 }, at(1));
      p1.forEach((p, i) => i && tl.to(q('.pt'), { attr: { cx: p[0], cy: p[1] }, duration: .08, ease: 'none' }, at(1) + .05 + i * .07));
      tl.to(q('.req'), { opacity: 1, duration: .2 }, at(1) + .45).to(q('.pt'), { opacity: 0, duration: .05 }, at(1) + .45);
      // autorización: del cliente a SPEI y al comercio
      const p2 = [[560, 300], [520, 360], [440, 395], [400, 400], [360, 395], [280, 360], [240, 300]];
      tl.to(q('.okR'), { opacity: 1, duration: .15 }, at(2)).to(q('.spei'), { opacity: 1, scale: 1, duration: .25 }, at(2)).to(q('.rail2, .pt2'), { opacity: 1, duration: .1 }, at(2) + .1);
      p2.forEach((p, i) => i && tl.to(q('.pt2'), { attr: { cx: p[0], cy: p[1] }, duration: .06, ease: 'none' }, at(2) + .12 + i * .05));
      tl.to(q('.okL'), { opacity: 1, duration: .15 }, at(2) + .5).to(q('.pt2'), { opacity: 0, duration: .05 }, at(2) + .5);
    }
  };

  /* 07a · Modelo logit, escena 1: 100 personas, 1.85 usan CoDi */
  SCENES.logitPop = {
    svg() {
      let s = '<clipPath id="cpPart"><rect x="0" y="0" width="0" height="0" id="cpRect"/></clipPath>';
      let r = 1;
      for (let i = 0; i < 100; i++) {
        r = (r * 9301 + 49297) % 233280; const rx = 60 + (r / 233280) * 680; r = (r * 9301 + 49297) % 233280; const ry = 60 + (r / 233280) * 430;
        const gx = 140 + (i % 20) * 26, gy = 150 + Math.floor(i / 20) * 62;
        s += `<use class="pp ${i === 0 ? 'u' : i === 1 ? 'u2' : 'n'}" href="#pfig" x="0" y="0" width="20" height="44" data-rx="${rx}" data-ry="${ry}" data-gx="${gx}" data-gy="${gy}" transform="translate(${rx},${ry})" fill="#3E7FB0"/>`;
      }
      s += `<use class="gold1" href="#pfig" width="20" height="44" transform="translate(140,150)" fill="${K.gold}"/>`;
      s += `<g clip-path="url(#cpPart)"><use class="gold2" href="#pfig" width="20" height="44" transform="translate(166,150)" fill="${K.gold}"/></g>`;
      s += `<g class="kpi">${tx(400, 80, '1.85%', 54, K.gold, 800, 'middle', HEAD)}${tx(400, 112, 'usa CoDi en la muestra (n = 57,677)', 16, K.on2, 600, 'middle')}</g>`;
      s += `<g class="leg">${tx(140, 480, "Cada figura = 1% de la muestra. Dorado: proporción que usa CoDi (1 figura completa + 85% de otra).", 13, K.on3, 600)}</g>`;
      // vista previa de factores
      const xs = v => 400 + v * 80, rows = D.logit.rows;
      s += `<g class="pre"><line x1="400" x2="400" y1="150" y2="470" stroke="${K.on2}" stroke-width="1.5"/>${tx(404, 142, '0', 12, K.on3, 600)}
        ${rows.map((r, i) => `<g class="pr"><circle cx="${xs(r.me)}" cy="${180 + i * 64}" r="9" fill="${r.me < 0 ? K.red : K.sky}"/>${tx(r.me < 0 ? xs(r.me) - 16 : xs(r.me) + 16, 185 + i * 64, r.short, 15, K.on, 700, r.me < 0 ? 'end' : 'start', HEAD)}</g>`).join('')}</g>`;
      return s;
    },
    build(tl, q, at, svg) {
      const pp = q('.pp');
      G.set(pp, { opacity: 0 }); G.set(q('.gold1, .gold2, .kpi, .leg, .pre'), { opacity: 0 }); G.set(q('.pr'), { opacity: 0, x: -20 });
      const cp = svg.querySelector('#cpRect'); G.set(cp, { attr: { x: 166, y: 150, width: 20 * .85, height: 44 } });
      tl.to(pp, { opacity: .85, duration: .4, stagger: .003 }, .05);
      pp.forEach((p, i) => tl.to(p, { x: +p.dataset.gx, y: +p.dataset.gy, duration: .45, ease: "power2.inOut" }, at(1) + (i % 20) * .006));
      tl.to(q('.gold1, .gold2'), { opacity: 1, duration: .2 }, at(1) + .4).to(q('.kpi, .leg'), { opacity: 1, duration: .25 }, at(1) + .4);
      tl.to(q('.pp.n'), { opacity: .12, duration: .35 }, at(2)).to(q('.pp.u, .pp.u2'), { opacity: .2, duration: .2 }, at(2));
      tl.to(q('.pp, .gold1, .gold2, .leg'), { opacity: 0, duration: .3 }, at(3)).to(q('.kpi'), { y: -20, opacity: .35, duration: .3 }, at(3))
        .to(q('.pre'), { opacity: 1, duration: .2 }, at(3) + .15).to(q('.pr'), { opacity: 1, x: 0, duration: .3, stagger: .06 }, at(3) + .2);
    }
  };

  /* 07c · Modelo logit, escena 3: de los resultados a los ejes */
  SCENES.logitAxes = {
    svg() {
      const xs = v => 400 + v * 80, rows = D.logit.rows, node = { 0: 0, 1: 1, 4: 1, 2: 2, 3: 2 };
      const N = [[170, 300, 'Confianza', K.gold], [400, 300, 'Conocimiento', K.sky], [630, 300, 'Inclusión financiera', K.teal]];
      let s = `<line class="z" x1="400" x2="400" y1="120" y2="470" stroke="${K.on2}" stroke-width="1.5"/>`;
      N.forEach((n, i) => s += `<g class="nd nd${i}"><circle cx="${n[0]}" cy="${n[1]}" r="72" fill="#0E2442" stroke="${n[3]}" stroke-width="2"/>${n[2].split(' ').map((w, k, arr) => tx(n[0], n[1] + 6 + (k - (arr.length - 1) / 2) * 20, w, 16, K.on, 800, 'middle', HEAD)).join('')}<line class="dn" x1="${n[0]}" x2="${n[0]}" y1="${n[1] + 72}" y2="530" stroke="${n[3]}" stroke-width="2" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/></g>`);
      rows.forEach((r, i) => s += `<circle class="cd" data-tx="${N[node[i]][0] + (i === 4 ? 30 : i === 3 ? -30 : i === 1 ? -30 : 0)}" data-ty="${N[node[i]][1] - 72}" cx="${xs(r.me)}" cy="${150 + i * 70}" r="9" fill="${r.me < 0 ? K.red : K.sky}"/>` + tx(r.me < 0 ? xs(r.me) - 16 : xs(r.me) + 16, 155 + i * 70, r.short, 15, K.on, 700, r.me < 0 ? 'end' : 'start', HEAD, 'class="cl"'));
      s += `<g class="link"><path d="M242 300 H328 M472 300 H558" stroke="${K.gold}" stroke-width="2" stroke-dasharray="4 6"/></g>`;
      s += tx(400, 572, 'Interpretación de asociaciones estimadas; no demuestra causalidad', 13, K.on3, 600, 'middle', BODY, 'class="nt"');
      return s;
    },
    build(tl, q, at) {
      G.set(q('.nd, .link, .nt'), { opacity: 0 }); G.set(q('.cd, .cl'), { opacity: 0 });
      tl.to(q('.cd, .cl'), { opacity: 1, duration: .3, stagger: .03 }, .05);
      tl.to(q('.cl, .z'), { opacity: 0, duration: .2 }, at(1));
      q('.cd').forEach((c, i) => tl.to(c, { attr: { cx: c.dataset.tx, cy: c.dataset.ty }, duration: .45, ease: 'power2.inOut' }, at(1) + i * .03));
      tl.to(q('.nd'), { opacity: 1, duration: .3, stagger: .08 }, at(1) + .2).to(q('.link'), { opacity: 1, duration: .2 }, at(1) + .4);
      tl.to(q('.dn'), { attr: { 'stroke-dashoffset': 0 }, duration: .45, stagger: .05 }, at(2)).to(q('.nt'), { opacity: 1, duration: .2 }, at(2) + .1);
    }
  };

  /* 08 · Los tres ejes */
  SCENES.axes = {
    svg() {
      const M = mxProject(470, 150, 300, 230), south = ['Chiapas', 'Oaxaca', 'Guerrero', 'Veracruz', 'Puebla', 'Michoacán', 'Tabasco', 'Yucatán'];
      const trust = `<g class="ax ax0">${shield(400, 260, 2.2)}
        ${card(130, 150, 170, 60, '', tx(16, 26, 'Límite de pago', 12, K.on2, 600) + tx(16, 46, '$2,000', 16, K.on, 800, 'start', HEAD) + `<rect x="118" y="20" width="36" height="20" rx="10" fill="${K.gold}"/><circle cx="144" cy="30" r="7" fill="#071629"/>`)}
        ${card(500, 160, 170, 60, '', `<path d="M24 22 q0 -8 8 -8 q8 0 8 8 v10 l4 4 h-24 l4 -4 z" fill="${K.sky}"/>` + tx(54, 30, 'Aviso por', 12, K.on2, 600) + tx(54, 46, 'cada operación', 12, K.on, 700))}
        ${card(300, 420, 200, 56, '', `<circle cx="28" cy="28" r="14" fill="none" stroke="${K.gold}" stroke-width="2"/><path d="M21 28 l5 5 9-10" stroke="${K.gold}" stroke-width="2.5" fill="none"/>` + tx(52, 33, 'Sello CoDi en comercios', 13, K.on, 700))}</g>`;
      const pathPts = [[150, 440], [240, 380], [330, 400], [420, 330], [510, 330], [600, 250]];
      const know = `<g class="ax ax1"><path d="M${pathPts.map(p => p.join(' ')).join(' L')}" fill="none" stroke="${K.sky}" stroke-opacity=".5" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round"/>
        ${pathPts.map((p, i) => `<circle cx="${p[0]}" cy="${p[1]}" r="14" fill="${i === 5 ? K.gold : '#102D4F'}" stroke="${K.sky}" stroke-width="2"/>${tx(p[0], p[1] + 5, i + 1, 13, i === 5 ? '#071629' : K.on, 800, 'middle', HEAD)}`).join('')}
        ${person(150, 410, 110, { hair: 'long', phone: true, cls: 'walker' })}
        ${qr(540, 120, 90, 5)}<path d="M200 170 q60 -40 120 0 q60 -40 120 0 v90 q-60 -40 -120 0 q-60 -40 -120 0 z" fill="url(#gSky)" opacity=".85"/><path d="M320 170 v90" stroke="#071629" stroke-width="2" opacity=".5"/></g>`;
      const incl = `<g class="ax ax2"><g transform="translate(110,190)"><path d="M0 70 L110 10 L220 70 Z" fill="url(#gGold)"/>${[30, 75, 120, 165].map(x => rr(x, 80, 24, 110, 4, '#2A5582')).join('')}${rr(-10, 190, 240, 22, 4, '#2A5582')}${rr(10, 70, 200, 12, 3, '#E8C27A')}</g>
        ${Object.keys(M).map(n => `<path d="${M[n].d}" fill="${south.includes(n) ? '#1F6E8C' : '#12304F'}" stroke="#9BE0FF" stroke-opacity=".2" stroke-width=".6"/>`).join('')}
        ${south.map(n => `<g class="pin" transform="translate(${M[n].c[0]},${M[n].c[1]})"><path d="M0 0 C -8 -10 -10 -16 -10 -20 A10 10 0 1 1 10 -20 C 10 -16 8 -10 0 0 Z" fill="${K.gold}"/><circle cy="-20" r="4" fill="#071629"/></g>`).join('')}</g>`;
      const tri = `<g class="tri">${[[200, 'Confianza', K.gold], [400, 'Conocimiento', K.sky], [600, 'Inclusión financiera', K.teal]].map(t => `<circle cx="${t[0]}" cy="300" r="56" fill="#0E2442" stroke="${t[2]}" stroke-width="2"/>${tx(t[0], 306, t[1], 14, K.on, 800, 'middle', HEAD)}`).join('')}<path d="M256 300 H344 M456 300 H544" stroke="${K.gold}" stroke-width="2" stroke-dasharray="4 6"/></g>`;
      return `<circle cx="400" cy="300" r="260" fill="url(#gGlowG)" opacity=".5"/>${trust}${know}${incl}${tri}`;
    },
    build(tl, q, at) {
      G.set(q('.ax1, .ax2, .tri'), { opacity: 0 }); G.set(q('.ax0'), { opacity: 0, scale: .9, transformOrigin: '50% 50%' }); G.set(q('.pin'), { opacity: 0, y: -10 });
      tl.to(q('.ax0'), { opacity: 1, scale: 1, duration: .45 }, .05);
      tl.to(q('.ax0'), { opacity: 0, x: -60, duration: .3 }, at(1)).fromTo(q('.ax1'), { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: .35 }, at(1) + .15)
        .fromTo(q('.walker'), { x: 0, y: 0 }, { x: 360, y: -84, duration: .4 }, at(1) + .35);
      tl.to(q('.ax1'), { opacity: 0, x: -60, duration: .3 }, at(2)).fromTo(q('.ax2'), { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: .35 }, at(2) + .15).to(q('.pin'), { opacity: 1, y: 0, duration: .25, stagger: .03 }, at(2) + .3);
      tl.to(q('.ax2'), { opacity: 0, duration: .3 }, at(3)).to(q('.tri'), { opacity: 1, duration: .35 }, at(3) + .15);
    }
  };

  /* 09 · Piloto y escalamiento (propuesta) */
  SCENES.pilot = {
    svg() {
      const M = mxProject(40, 30, 720, 500), col = ['#D6AC55', '#62C8F5', '#3FC1A0', '#E9826F'];
      let s = Object.keys(M).map(n => { const ph = D.phaseOf(n); return `<path class="ms ph${ph}" d="${M[n].d}" fill="#12304F" stroke="#9BE0FF" stroke-opacity=".2" stroke-width=".8"/>`; }).join('');
      [1, 2, 3].forEach(ph => { s += `<g class="ol ol${ph}" style="color:${col[ph]}">${Object.keys(M).filter(n => D.phaseOf(n) === ph).map(n => `<path d="${M[n].d}" fill="url(#pHatch)" fill-opacity=".35" stroke="${col[ph]}" stroke-width="1.6" stroke-dasharray="5 4"/>`).join('')}</g>`; });
      const nl = M['Nuevo León'];
      s += `<path class="nl" d="${nl.d}" fill="${K.gold}" stroke="#fff" stroke-width="1.2"/><circle class="ring" cx="${nl.c[0]}" cy="${nl.c[1]}" r="40" fill="none" stroke="${K.gold}" stroke-width="2"/>`;
      s += `<g class="nll">${tx(nl.c[0] + 60, nl.c[1] - 30, 'Nuevo León', 20, K.on, 800, 'start', HEAD)}${tx(nl.c[0] + 60, nl.c[1] - 8, 'Piloto propuesto · años 0–2', 14, K.gold, 700)}</g>`;
      s += `<g class="lg">${['Fase 1 · años 2–4', 'Fase 2 · años 4–6', 'Fase 3 · años 6–8'].map((t, i) => `<g class="lgi lg${i + 1}"><rect x="40" y="${470 + i * 26}" width="18" height="14" rx="3" fill="none" stroke="${col[i + 1]}" stroke-dasharray="4 3" stroke-width="2"/>${tx(66, 482 + i * 26, t + ' · contemplada en la propuesta', 13, K.on2, 600)}</g>`).join('')}</g>`;
      return s;
    },
    build(tl, q, at) {
      G.set(q('.ms'), { opacity: 0 }); G.set(q('.ol, .lgi, .nll'), { opacity: 0 }); G.set(q('.nl'), { opacity: 0, scale: .6, transformOrigin: '50% 50%' }); G.set(q('.ring'), { opacity: 0, scale: .4, transformOrigin: '50% 50%' });
      tl.to(q('.ms'), { opacity: 1, duration: .35, stagger: .006 }, .05).to(q('.nl'), { opacity: 1, scale: 1, duration: .35 }, .3).to(q('.ring'), { opacity: 1, scale: 1.4, duration: .4 }, .35).to(q('.ring'), { opacity: 0, duration: .2 }, .6).to(q('.nll'), { opacity: 1, duration: .2 }, .4);
      [1, 2, 3].forEach(ph => { tl.to(q('.ol' + ph + ', .lg' + ph), { opacity: 1, duration: .35 }, at(ph)); if (ph > 1) tl.to(q('.ol' + (ph - 1)), { opacity: .35, duration: .3 }, at(ph)); });
    }
  };

  /* =====================================================================
     MOTOR: monta escenas y las conecta al scroll (reversible, scrub)
     ===================================================================== */
  function mount(root) {
    const sc = SCENES[root.dataset.scene]; if (!sc) return;
    const stage = $('.story-stage', root), steps = $$('.step', root), n = steps.length;
    const holder = document.createElement('div'); holder.className = 'stage-art';
    holder.innerHTML = `<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">${sc.svg()}</svg>`;
    stage.appendChild(holder);
    const svg = $('svg', holder);
    if (!G) { root.classList.add('story-static'); return; }
    const q = G.utils.selector(svg), T0 = .7, at = i => T0 + i - .62;
    const tl = G.timeline({ paused: true, defaults: { ease: 'power2.out' } });
    sc.build(tl, q, at, svg);
    tl.to({}, { duration: Math.max(0, T0 + n - 1 - tl.duration()) }); // asegura la duración total
    const total = T0 + n - 1, prog = i => (T0 + i) / total;
    const mark = i => steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
    if (LOW) {
      // modo discreto: cada paso salta a su estado sin desplazamiento animado
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const i = steps.indexOf(e.target); mark(i); RM ? tl.progress(prog(i)) : tl.tweenTo(T0 + i, { duration: .5 }); } }), { rootMargin: '-45% 0px -45% 0px' });
      steps.forEach(s => io.observe(s)); tl.progress(prog(0)); return;
    }
    // Motor por posición de los pasos: el tiempo de la escena se calcula según qué paso de texto
    // está en el centro de la pantalla. Funciona con cualquier altura de paso, al subir y al bajar,
    // y converge al estado correcto aunque el desplazamiento sea muy rápido.
    let active = false, raf = 0, lastT = -1;
    function target() {
      const vc = innerHeight * .5, cs = steps.map(s => { const r = s.getBoundingClientRect(); return r.top + r.height / 2; });
      if (vc <= cs[0]) return T0 * Math.max(0, Math.min(1, 1 - (cs[0] - vc) / (innerHeight * .55)));
      for (let i = 0; i < n - 1; i++) if (vc <= cs[i + 1]) return T0 + i + (vc - cs[i]) / (cs[i + 1] - cs[i]);
      return total;
    }
    function update() {
      raf = 0; const T = target();
      if (Math.abs(T - lastT) < .001) return; lastT = T;
      mark(Math.max(0, Math.min(n - 1, Math.round(T - T0))));
      G.to(tl, { time: Math.min(T, tl.duration()), duration: .45, ease: 'power2.out', overwrite: true });
    }
    const onScroll = () => { if (active && !raf) raf = requestAnimationFrame(update); };
    new IntersectionObserver(es => { active = es[0].isIntersecting; if (active) onScroll(); }, { rootMargin: '25% 0px 25% 0px' }).observe(root);
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll);
  }
  // montaje diferido: cada escena se construye al acercarse a la pantalla (reduce el trabajo inicial)
  if ('IntersectionObserver' in window) {
    const mio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { mio.unobserve(e.target); mount(e.target); } }), { rootMargin: '120% 0px 120% 0px' });
    $$('.story[data-scene]').forEach(el => mio.observe(el));
  } else $$('.story[data-scene]').forEach(mount);

  /* =====================================================================
     MODELO LOGIT · escena 2: gráfico de efectos marginales interactivo
     ===================================================================== */
  const ILLU = {
    0: `<circle cx="200" cy="150" r="120" fill="url(#gGlow)"/>${phone(140, 30, 120, 250, rr(8, 40, 96, 70, 8, '#fff', 'stroke="#DCE5F0"') + tx(16, 62, 'Solicitud de pago', 8, '#52657C', 600) + tx(16, 84, '$1,249.00', 12, '#0D2137', 800, 'start', HEAD) + rr(16, 92, 50, 8, 4, '#D6AC55'))}${shield(290, 170, 1.05)}<circle cx="290" cy="170" r="80" fill="none" stroke="${K.gold}" stroke-opacity=".4" stroke-dasharray="3 7"/>`,
    1: `<circle cx="200" cy="150" r="120" fill="url(#gGlow)"/>${phone(140, 30, 120, 250, ['Escanear', 'Transferir', 'Descargar', 'Configurar'].map((t, i) => rr(8, 36 + i * 42, 96, 32, 8, '#fff', 'stroke="#DCE5F0"') + `<circle cx="24" cy="${52 + i * 42}" r="8" fill="${i < 3 ? K.gold : '#C9D5E4'}"/>` + (i < 3 ? `<path d="M20 ${52 + i * 42} l3 3 6-6" stroke="#071629" stroke-width="2" fill="none"/>` : '') + tx(38, 56 + i * 42, t, 9, '#0D2137', 700)).join(''))}${[0, 1, 2].map(i => `<circle cx="${300 + i * 22}" cy="${120 - i * 26}" r="${8 + i * 2}" fill="${K.sky}" opacity="${.4 + i * .2}"/>`).join('')}`,
    2: `<circle cx="200" cy="150" r="120" fill="url(#gGlow)"/>${phone(150, 40, 110, 230, rr(8, 40, 86, 120, 10, '#E7EEF7') + `<circle cx="51" cy="100" r="24" fill="url(#gSky)"/>`)}${waves(205, 30, .8, '', K.gold)}<g stroke="${K.sky}" stroke-opacity=".5" fill="none"><path d="M260 150 Q320 120 350 160"/><path d="M140 150 Q80 120 50 160"/></g><circle cx="350" cy="160" r="9" fill="${K.sky}"/><circle cx="50" cy="160" r="9" fill="${K.sky}"/>`,
    3: `<circle cx="200" cy="150" r="120" fill="url(#gGlow)"/>${phone(140, 30, 120, 250, rr(0, 0, 104, 54, 0, '#102D4F') + tx(10, 38, 'Mi banco', 9, '#fff', 800, 'start', HEAD) + rr(8, 64, 88, 52, 10, 'url(#gCard)') + tx(16, 86, 'Saldo', 8, '#A9BBD1', 600) + rr(16, 94, 50, 10, 5, '#D6AC55') + [0, 1, 2, 3].map(i => rr(8 + (i % 2) * 46, 126 + Math.floor(i / 2) * 46, 42, 38, 8, i === 0 ? '#102D4F' : '#fff', 'stroke="#DCE5F0"')).join('') + tx(29, 150, 'CoDi', 9, '#D6AC55', 800, 'middle', HEAD))}`,
    4: `<circle cx="200" cy="160" r="130" fill="url(#gGlow)"/>${person(110, 270, 150, { hair: 'long', phone: true })}${person(200, 270, 170, { hair: 'short', phone: true })}${person(290, 270, 160, { hair: 'gray' })}<line x1="60" x2="340" y1="274" y2="274" stroke="#9BE0FF" stroke-opacity=".25"/>`
  };
  (function logitInteractive() {
    const host = $('#coefSvg'); if (!host) return;
    const L = D.logit, tip = $('#coefTip'), illu = $('#coefIllu');
    let sel = 0;
    illu.innerHTML = L.rows.map((r, i) => `<svg class="il" data-i="${i}" viewBox="0 0 400 300" aria-hidden="true">${ILLU[i]}</svg>`).join('');
    const fmt = r => `${r.me > 0 ? '+' : '−'}${nf(Math.abs(r.me), r.me === -0.013 ? 3 : 2)}`;
    function render() {
      const W = Math.max(300, host.clientWidth || 620), mob = W < 560;
      const left = mob ? 14 : 210, right = mob ? 16 : 28, rowH = mob ? 112 : 76, top = 40, H = top + rowH * L.rows.length + 40;
      const xmin = -3, xmax = 6, x = v => left + (v - xmin) / (xmax - xmin) * (W - left - right);
      let s = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="listbox" aria-label="Efectos marginales; usa flechas para cambiar de variable" tabindex="-1">`;
      s += `<rect x="${x(xmin)}" y="${top - 18}" width="${x(0) - x(xmin)}" height="${H - top - 22}" fill="${K.red}" opacity=".05"/><rect x="${x(0)}" y="${top - 18}" width="${x(xmax) - x(0)}" height="${H - top - 22}" fill="${K.sky}" opacity=".05"/>`;
      s += tx(x(0) - 8, top - 24, mob ? '← negativa' : '← asociación negativa', 12, K.red, 700, 'end') + tx(x(0) + 8, top - 24, mob ? 'positiva →' : 'asociación positiva →', 12, K.sky, 700);
      for (let g = xmin; g <= xmax; g++) s += `<line x1="${x(g)}" x2="${x(g)}" y1="${top - 14}" y2="${H - 34}" stroke="${g === 0 ? K.on : 'rgba(169,187,209,.12)'}" stroke-width="${g === 0 ? 1.6 : 1}"/>` + tx(x(g), H - 14, (g > 0 ? '+' : '') + g, 12, K.on3, 600, 'middle');
      L.rows.forEach((r, i) => {
        const rowTop = top + rowH * i, cy = mob ? rowTop + 82 : rowTop + rowH / 2, col = r.me < 0 ? K.red : K.sky, on = i === sel;
        const lx = mob ? 14 : left - 18, ly = mob ? rowTop + 24 : cy - 3;
        s += `<g class="row${on ? ' on' : ''}" data-i="${i}" tabindex="${on ? 0 : -1}" role="option" aria-selected="${on}">`;
        s += `<rect class="bg" x="0" y="${rowTop + 4}" width="${W}" height="${rowH - 8}" rx="12" fill="${on ? 'rgba(214,172,85,.1)' : 'transparent'}" stroke="${on ? 'rgba(214,172,85,.45)' : 'none'}"/>`;
        s += tx(lx, ly, r.short, 15, on ? K.gold : K.on, 800, mob ? 'start' : 'end', HEAD, 'class="nm"') + tx(lx, ly + 18, r.unit, 12, K.on3, 500, mob ? 'start' : 'end');
        if (r.lo != null) s += `<g class="ci"><line x1="${x(r.lo)}" x2="${x(r.hi)}" y1="${cy}" y2="${cy}" stroke="${K.on}" stroke-width="2"/><line x1="${x(r.lo)}" x2="${x(r.lo)}" y1="${cy - 7}" y2="${cy + 7}" stroke="${K.on}" stroke-width="2"/><line x1="${x(r.hi)}" x2="${x(r.hi)}" y1="${cy - 7}" y2="${cy + 7}" stroke="${K.on}" stroke-width="2"/></g>`;
        else s += tx(x(r.me) + (r.me < 0 ? -14 : 14), cy + (mob ? 22 : 24), 'IC no reportado', 11, K.on3, 500, r.me < 0 ? 'end' : 'start', BODY, 'font-style="italic"');
        s += `<line class="stem" x1="${x(0)}" x2="${x(r.me)}" y1="${cy}" y2="${cy}" stroke="${col}" stroke-width="${on ? 6 : 4}" stroke-linecap="round" opacity=".45"/>`;
        s += `<circle class="dot" cx="${x(r.me)}" cy="${cy}" r="${on ? 11 : 8}" fill="${col}" stroke="${K.night}" stroke-width="3"/>`;
        const vt = `${fmt(r)} ${r.sig}`;
        s += mob ? tx(W - 10, ly, vt, 15, col, 800, 'end', HEAD) : tx(x(r.me) + (r.me < 0 ? -16 : 16), cy - 12, vt, 14, col, 800, r.me < 0 ? 'end' : 'start', HEAD);
        s += `</g>`;
      });
      host.innerHTML = s + '</svg>';
      const rows = $$('.row', host);
      rows.forEach(g => {
        const i = +g.dataset.i;
        g.addEventListener('click', () => select(i, true));
        g.addEventListener('pointermove', e => { if (e.pointerType !== 'mouse') return; const r = L.rows[i]; tip.innerHTML = `<b>${r.short}</b> · ${fmt(r)} pp<br>${r.read.split('. ')[0]}.`; tip.style.left = (e.clientX + 16) + 'px'; tip.style.top = (e.clientY + 16) + 'px'; tip.hidden = false; });
        g.addEventListener('pointerleave', () => { tip.hidden = true; });
        g.addEventListener('keydown', e => {
          if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); select((sel + 1) % L.rows.length, true); }
          if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); select((sel + L.rows.length - 1) % L.rows.length, true); }
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(i, true); }
        });
      });
    }
    function detail() {
      const r = L.rows[sel], col = r.me < 0 ? K.red : K.sky;
      $('#coefDetail').innerHTML = `<div class="cd-k">${r.k}</div><div class="cd-me" style="color:${col}">${fmt(r)}<small> pp</small></div>
        <dl><dt>Unidad</dt><dd>${r.unit}</dd><dt>IC 95%</dt><dd>${r.ci || 'No reportado'}</dd><dt>Significancia</dt><dd>${r.sig === '***' ? 'p < 0.01' : 'p < 0.05'}</dd></dl>
        <p>${r.read}</p><div class="caution">${r.caution}</div>`;
      $$('.il', illu).forEach(s => s.classList.toggle('on', +s.dataset.i === sel));
    }
    function paint() {
      $$('.row', host).forEach(g => { const i = +g.dataset.i, on = i === sel;
        g.classList.toggle('on', on); g.setAttribute('aria-selected', on); g.setAttribute('tabindex', on ? 0 : -1);
        const bg = $('.bg', g); bg.setAttribute('fill', on ? 'rgba(214,172,85,.1)' : 'transparent'); bg.setAttribute('stroke', on ? 'rgba(214,172,85,.45)' : 'none');
        $('.nm', g).setAttribute('fill', on ? K.gold : K.on); $('.stem', g).setAttribute('stroke-width', on ? 6 : 4); $('.dot', g).setAttribute('r', on ? 11 : 8); });
    }
    function select(i, focus) { sel = i; if ($('.row', host)) paint(); else render(); detail(); mag && mag(i); if (focus) { const g = $(`.row[data-i="${i}"]`, host); g && g.focus({ preventScroll: true }); } }
    let mag = null;
    // módulo editorial: comparación de magnitudes (pp) — no es predicción individual
    (function magnitude() {
      const box = $('#magViz'); if (!box) return;
      const readings = [
        { k: 'Desconfianza', v: -1.28, note: 'Frente al uso promedio de 1.85%, equivale a una probabilidad cerca de 70% menor.' },
        { k: '1 habilidad digital adicional', v: 0.34, note: 'Efecto individual pequeño.' },
        { k: '10 habilidades de diferencia', v: 3.4, note: 'Lectura acumulada (0.34 × 10): casi el doble del uso promedio. Supone que el efecto se acumula linealmente.' },
        { k: 'Usa smartphone', v: 3.09, note: 'Supera el uso promedio; es el efecto menos preciso (IC 95%: 0.6 a 5.6 pp).' },
        { k: 'Usa banca móvil', v: 2.12, note: 'Supera el uso promedio: contar con banca móvil más que duplica la probabilidad.' },
        { k: '1 año más de edad', v: -0.013, note: 'El efecto más pequeño del modelo.' },
        { k: '30 años de diferencia', v: -0.39, note: 'Lectura acumulada (−0.013 × 30 ≈ −0.4 pp): alrededor de una quinta parte del uso promedio.' }
      ];
      const map = { 0: [0], 1: [1, 2], 2: [3], 3: [4], 4: [5, 6] };
      const max = 3.5;
      box.innerHTML = `<div class="mag-row ref"><span class="mag-k">Uso promedio de CoDi en la muestra</span><span class="mag-t"><i style="width:${1.85 / max * 100}%"></i></span><span class="mag-v">1.85%</span></div>` +
        readings.map((r, i) => `<div class="mag-row" data-i="${i}"><span class="mag-k">${r.k}</span><span class="mag-t"><i class="${r.v < 0 ? 'neg' : ''}" style="width:${Math.abs(r.v) / max * 100}%"></i></span><span class="mag-v">${r.v > 0 ? '+' : '−'}${nf(Math.abs(r.v), Math.abs(r.v) < .1 ? 3 : 2)} pp</span></div>`).join('') +
        `<p class="mag-note" id="magNote"></p>`;
      mag = (i) => { const on = map[i]; $$('.mag-row[data-i]', box).forEach(r => r.classList.toggle('on', on.includes(+r.dataset.i))); $('#magNote').textContent = on.map(j => readings[j].note).join(' '); };
    })();
    // entrada animada por variable
    select(0, false); // el gráfico existe siempre; solo la entrada se anima al hacerse visible
    function enter() {
      if (!G || RM) return;
      G.from($$('.stem', host), { attr: { x2: (i, el) => el.getAttribute('x1') }, duration: .9, stagger: .12, ease: 'power3.out' });
      G.from($$('.dot', host), { scale: 0, transformOrigin: '50% 50%', duration: .5, stagger: .12, delay: .35, ease: 'back.out(2)' });
      G.from($$('.ci', host), { opacity: 0, duration: .5, stagger: .12, delay: .5 });
    }
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { io.disconnect(); const r = host.getBoundingClientRect(); if (r.top > innerHeight * .2) enter(); } }, { rootMargin: '0px 0px -15% 0px' });
    io.observe(host);
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { if (host.innerHTML) { render(); } }, 150); });
  })();

  /* =====================================================================
     10 · cierre: conexiones que convergen hacia el lema
     ===================================================================== */
  (function closing() {
    const svg = $('#closingArt'); if (!svg) return;
    let s = '', r = 3;
    for (let i = 0; i < 46; i++) {
      r = (r * 9301 + 49297) % 233280; const a = (r / 233280) * Math.PI * 2; r = (r * 9301 + 49297) % 233280; const d = 520 + (r / 233280) * 260;
      const x0 = 800 + Math.cos(a) * d, y0 = 450 + Math.sin(a) * d * .7, c = i % 3 === 0 ? K.gold : i % 3 === 1 ? K.sky : '#2C6A99';
      s += `<path class="cv" d="M${x0.toFixed(0)} ${y0.toFixed(0)} Q ${(800 + x0) / 2 + Math.sin(a) * 120} ${(450 + y0) / 2 - Math.cos(a) * 120} 800 450" fill="none" stroke="${c}" stroke-width="${i % 3 === 0 ? 1.6 : 1}" stroke-opacity=".55" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>`;
      s += `<circle class="cn" cx="${x0.toFixed(0)}" cy="${y0.toFixed(0)}" r="${i % 3 === 0 ? 3.5 : 2.5}" fill="${c}"/>`;
    }
    s += `<circle class="core" cx="800" cy="450" r="160" fill="url(#gGlowG)"/>`;
    svg.innerHTML = s;
    if (!G || !ST || LOW) { $$('.cv', svg).forEach(p => p.setAttribute('stroke-dashoffset', 0)); return; }
    const tl = G.timeline({ scrollTrigger: { trigger: '.closing', start: 'top 85%', end: 'center center', scrub: .8 } });
    tl.from($$('.cn', svg), { opacity: 0, duration: .3, stagger: .005 }, 0).to($$('.cv', svg), { attr: { 'stroke-dashoffset': 0 }, duration: .8, stagger: .006, ease: 'power1.inOut' }, .1).from($('.core', svg), { opacity: 0, scale: .4, transformOrigin: '50% 50%', duration: .5 }, .6);
  })();

  /* refresco de ScrollTrigger cuando cambian alturas (gráficas diferidas) */
  if (ST && 'ResizeObserver' in window) { let t; new ResizeObserver(() => { clearTimeout(t); t = setTimeout(() => ST.refresh(), 200); }).observe(document.body); }
})();
