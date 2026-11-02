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
  const HEAD = "'Source Sans 3', 'Segoe UI', sans-serif", BODY = "'Source Sans 3', 'Segoe UI', sans-serif";
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
  window.SVGKIT = { phone, rr, tx, person, shield, qr, waves, card, mxProject, K, HEAD, BODY };
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

  /* 08 · Los tres ejes: tres ilustraciones que aparecen y se conectan en una sola estrategia */
  SCENES.axes = {
    svg() {
      const col = [K.gold, K.sky, K.teal];
      // Eje 1: celular con solicitud de cobro y escudo
      const req = rr(8, 46, 104, 92, 10, '#fff', 'stroke="#DCE5F0"') + tx(18, 66, 'Solicitud CoDi', 9, '#52657C', 700) + tx(18, 88, 'Tienda ejemplo', 10, '#0D2137', 700) + tx(18, 112, '$849.00', 17, '#0D2137', 800, 'start', HEAD) + rr(18, 120, 60, 8, 4, K.gold)
        + rr(8, 150, 104, 34, 17, '#102D4F') + tx(60, 172, 'Autorizar con NIP', 9, '#fff', 700, 'middle') + rr(8, 196, 104, 30, 8, '#E7F6EF') + tx(18, 215, '✓ Sin datos de tarjeta', 8.5, '#178F72', 700);
      const trust = `<g class="ax ax0">${phone(92, 120, 120, 250, req)}${shield(232, 330, .82)}
        <circle cx="232" cy="330" r="66" fill="none" stroke="${K.gold}" stroke-opacity=".35" stroke-dasharray="3 7"/>
        <g class="bell">${card(26, 168, 66, 46, '', `<path d="M22 30 q0 -11 11 -11 q11 0 11 11 v6 l4 4 h-30 l4 -4 z" fill="${K.sky}"/><circle cx="33" cy="42" r="3" fill="${K.sky}"/>`)}</g></g>`;
      // Eje 2: persona aprendiendo en una tienda (mostrador, QR informativo y promotor)
      const know = `<g class="ax ax1"><rect x="300" y="330" width="210" height="62" rx="8" fill="url(#gCard)" stroke="#9BE0FF" stroke-opacity=".25"/><rect x="300" y="322" width="210" height="12" rx="4" fill="#2A5582"/>
        <g transform="translate(438,232)"><rect x="-8" y="-8" width="72" height="96" rx="8" fill="#0E2442" stroke="${K.sky}" stroke-opacity=".5"/>${qr(4, 4, 48, 11)}${tx(28, 78, '¿Qué es CoDi?', 8.5, K.on, 700, 'middle')}</g>
        ${person(352, 392, 150, { hair: 'long', phone: true, cls: 'learner' })}${person(478, 392, 132, { hair: 'short', fill: 'url(#gFigG)' })}
        <g class="bubble"><rect x="282" y="180" width="128" height="40" rx="12" fill="#fff"/><path d="M330 220 l8 12 l6 -12 z" fill="#fff"/>${tx(346, 205, 'CoDi en 2 pasos', 11, '#0D2137', 800, 'middle', HEAD)}</g></g>`;
      // Eje 3: red del Banco del Bienestar por entidad (datos del directorio)
      const M = mxProject(548, 150, 236, 200), cnt = D.bbByState || {}, mx = Math.max(1, ...Object.values(cnt));
      const incl = `<g class="ax ax2">${Object.keys(M).map(n => `<path d="${M[n].d}" fill="#12304F" stroke="#9BE0FF" stroke-opacity=".22" stroke-width=".6"/>`).join('')}
        ${Object.keys(M).filter(n => cnt[n]).map(n => `<circle class="bb" cx="${M[n].c[0].toFixed(1)}" cy="${M[n].c[1].toFixed(1)}" r="${(2.2 + Math.sqrt(cnt[n] / mx) * 11).toFixed(1)}" fill="${K.teal}" fill-opacity=".55" stroke="${K.teal}" stroke-width="1"/>`).join('')}
        <g transform="translate(560,320)"><path d="M0 30 L40 8 L80 30 Z" fill="url(#gGold)"/>${[8, 26, 44, 62].map(x => rr(x, 34, 10, 34, 2, '#2A5582')).join('')}${rr(-4, 68, 88, 8, 3, '#2A5582')}</g></g>`;
      const lab = [[152, 'Confianza'], [405, 'Conocimiento'], [666, 'Inclusión financiera']].map((l, i) => `<g class="lab lab${i}">${tx(l[0], 440, l[1], 17, K.on, 800, 'middle', HEAD)}<rect x="${l[0] - 26}" y="450" width="52" height="3" rx="1.5" fill="${col[i]}"/>${tx(l[0], 474, ['Banco de México · CONDUSEF', 'ANTAD y cadenas', 'Banco del Bienestar · Sec. del Bienestar'][i], 11, K.on3, 600, 'middle')}</g>`).join('');
      const link = `<g class="lk">${[[152, 492], [405, 492], [666, 492]].map((p, i) => `<path class="lp" d="M${p[0]} ${p[1]} Q ${(p[0] + 405) / 2} ${560} 405 548" fill="none" stroke="${col[i]}" stroke-width="2" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>`).join('')}
        <path class="lp" d="M226 300 Q 262 270 296 300" fill="none" stroke="${K.gold}" stroke-width="2" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/><path class="lp" d="M516 300 Q 534 270 552 300" fill="none" stroke="${K.gold}" stroke-width="2" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
        <g class="core"><circle cx="405" cy="556" r="26" fill="#0E2442" stroke="${K.gold}" stroke-width="2"/>${tx(405, 561, 'CoDi', 13, K.gold, 800, 'middle', HEAD)}</g></g>`;
      return `<circle cx="405" cy="300" r="270" fill="url(#gGlowG)" opacity=".35"/>${trust}${know}${incl}${lab}${link}`;
    },
    build(tl, q, at) {
      G.set(q('.ax, .lab'), { opacity: 0 }); G.set(q('.ax0'), { y: 20 }); G.set(q('.ax1'), { y: 20 }); G.set(q('.ax2'), { y: 20 });
      G.set(q('.bb'), { scale: 0, transformOrigin: '50% 50%', transformBox: 'fill-box' }); G.set(q('.core'), { opacity: 0, scale: .5, transformOrigin: '50% 50%', transformBox: 'fill-box' });
      G.set(q('.bubble'), { opacity: 0, y: 8 });
      tl.to(q('.ax0, .lab0'), { opacity: 1, y: 0, duration: .45 }, .05);
      tl.to(q('.ax0, .lab0'), { opacity: .4, duration: .3 }, at(1)).to(q('.ax1, .lab1'), { opacity: 1, y: 0, duration: .4 }, at(1) + .1).to(q('.bubble'), { opacity: 1, y: 0, duration: .25 }, at(1) + .4);
      tl.to(q('.ax1, .lab1'), { opacity: .4, duration: .3 }, at(2)).to(q('.ax2, .lab2'), { opacity: 1, y: 0, duration: .4 }, at(2) + .1).to(q('.bb'), { scale: 1, duration: .3, stagger: .012 }, at(2) + .3);
      tl.to(q('.ax, .lab'), { opacity: 1, duration: .3 }, at(3)).to(q('.lp'), { attr: { 'stroke-dashoffset': 0 }, duration: .45, stagger: .06 }, at(3) + .1).to(q('.core'), { opacity: 1, scale: 1, duration: .3 }, at(3) + .45);
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
  const STACK = matchMedia('(max-width: 900px) and (orientation: portrait)');
  function mount(root) {
    const sc = SCENES[root.dataset.scene]; if (!sc) return;
    const stage = $('.story-stage', root), steps = $$('.step', root), n = steps.length;
    const holder = document.createElement('div'); holder.className = 'stage-art';
    holder.innerHTML = `<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">${sc.svg()}</svg>`;
    stage.appendChild(holder);
    // banda opaca del mismo color que la sección (composición de celular)
    const sec = root.closest('section'); if (sec) stage.style.setProperty('--stage-bg', getComputedStyle(sec).backgroundColor);
    const svg = $('svg', holder);
    if (!G) { root.classList.add('story-static'); return; }
    const q = G.utils.selector(svg), T0 = .7, at = i => T0 + i - .62;
    const tl = G.timeline({ paused: true, defaults: { ease: 'power2.out' } });
    sc.build(tl, q, at, svg);
    tl.to({}, { duration: Math.max(0, T0 + n - 1 - tl.duration()) }); // asegura la duración total
    const total = T0 + n - 1, prog = i => (T0 + i) / total;
    const mark = i => steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
    const cards = steps.map(s => $('.step-card', s));
    let stackedOn = false;
    if (LOW) {
      let fr = 0; const onS = () => { if (!fr) fr = requestAnimationFrame(() => { fr = 0; frame(); }); };
      addEventListener('scroll', onS, { passive: true }); addEventListener('resize', onS);
      if ('ResizeObserver' in window) new ResizeObserver(onS).observe(document.body);
      // modo discreto: cada paso salta a su estado sin desplazamiento animado
      const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const i = steps.indexOf(e.target); mark(i); RM ? tl.progress(prog(i)) : tl.tweenTo(T0 + i, { duration: .5 }); } }), { rootMargin: '-45% 0px -45% 0px' });
      steps.forEach(s => io.observe(s)); tl.progress(prog(0)); return;
    }
    // Motor por posición de los pasos: el tiempo de la escena se calcula según qué paso de texto
    // está en el centro de la pantalla. Funciona con cualquier altura de paso, al subir y al bajar,
    // y converge al estado correcto aunque el desplazamiento sea muy rápido.
    let active = false, raf = 0, lastT = -1;
    function target() {
      // en celular vertical el texto se lee debajo de la ilustración fija: el centro es el del carril de lectura
      const vc = STACK.matches ? (stage.getBoundingClientRect().bottom + innerHeight) / 2 : innerHeight * .5, cs = steps.map(s => { const r = s.getBoundingClientRect(); return r.top + r.height / 2; });
      if (vc <= cs[0]) return T0 * Math.max(0, Math.min(1, 1 - (cs[0] - vc) / (innerHeight * .55)));
      for (let i = 0; i < n - 1; i++) if (vc <= cs[i + 1]) return T0 + i + (vc - cs[i]) / (cs[i + 1] - cs[i]);
      return total;
    }
    // celular vertical: la banda de la ilustración se marca como fija (cubre lo que pasa bajo la barra
    // translúcida) y cada tarjeta se desvanece al deslizarse bajo la banda, para que no queden renglones sueltos
    function frame() {
      if (!STACK.matches) { if (stackedOn) { stackedOn = false; stage.classList.remove('stuck'); cards.forEach(c => c && (c.style.opacity = '')); } return; }
      stackedOn = true;
      const sr = stage.getBoundingClientRect(), bar = 56;
      // tolerancia: en pantallas Retina la posición fija puede quedar en medio píxel
      const stuck = sr.top <= bar + 3 && sr.bottom > bar; stage.classList.toggle('stuck', stuck);
      cards.forEach(c => { if (!c) return; const r = c.getBoundingClientRect();
        const zone = innerHeight - sr.bottom, cl = v => Math.max(0, Math.min(1, v));
        // tarjeta que cabe en el carril: se desvanece al acercarse su borde superior a la banda (nunca queda partida);
        // tarjeta más alta que el carril: se desvanece al final, para no ocultar lo que aún no se lee
        const o = !stuck ? 1 : r.height <= zone * .9 ? cl((r.top - sr.bottom + 10) / 60) : (r.top < sr.bottom ? cl((r.bottom - sr.bottom) / 120) : 1);
        c.style.opacity = o === 1 ? '' : o.toFixed(3); });
    }
    function update() {
      raf = 0; frame(); const T = target();
      if (Math.abs(T - lastT) < .001) return; lastT = T;
      mark(Math.max(0, Math.min(n - 1, Math.round(T - T0))));
      G.to(tl, { time: Math.min(T, tl.duration()), duration: .45, ease: 'power2.out', overwrite: true });
    }
    const onScroll = () => { if (active && !raf) raf = requestAnimationFrame(update); };
    new IntersectionObserver(es => { active = es[0].isIntersecting; if (active) onScroll(); }, { rootMargin: '25% 0px 25% 0px' }).observe(root);
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll);
    // si una gráfica diferida cambia la altura de la página, el contenido se desplaza sin evento de scroll
    if ('ResizeObserver' in window) new ResizeObserver(onScroll).observe(document.body);
  }
  // montaje diferido: cada escena se construye al acercarse a la pantalla (reduce el trabajo inicial)
  if ('IntersectionObserver' in window) {
    const mio = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { mio.unobserve(e.target); mount(e.target); } }), { rootMargin: '120% 0px 120% 0px' });
    $$('.story[data-scene]').forEach(el => mio.observe(el));
  } else $$('.story[data-scene]').forEach(mount);

  /* =====================================================================
     MODELO LOGIT · ilustraciones por variable (usadas por el laboratorio)
     ===================================================================== */
  const ILLU = {
    0: `<circle cx="200" cy="150" r="120" fill="url(#gGlow)"/>${phone(140, 30, 120, 250, rr(8, 40, 96, 70, 8, '#fff', 'stroke="#DCE5F0"') + tx(16, 62, 'Solicitud de pago', 8, '#52657C', 600) + tx(16, 84, '$1,249.00', 12, '#0D2137', 800, 'start', HEAD) + rr(16, 92, 50, 8, 4, '#D6AC55'))}${shield(290, 170, 1.05)}<circle cx="290" cy="170" r="80" fill="none" stroke="${K.gold}" stroke-opacity=".4" stroke-dasharray="3 7"/>`,
    1: `<circle cx="200" cy="150" r="120" fill="url(#gGlow)"/>${phone(140, 30, 120, 250, ['Escanear', 'Transferir', 'Descargar', 'Configurar'].map((t, i) => rr(8, 36 + i * 42, 96, 32, 8, '#fff', 'stroke="#DCE5F0"') + `<circle cx="24" cy="${52 + i * 42}" r="8" fill="${i < 3 ? K.gold : '#C9D5E4'}"/>` + (i < 3 ? `<path d="M20 ${52 + i * 42} l3 3 6-6" stroke="#071629" stroke-width="2" fill="none"/>` : '') + tx(38, 56 + i * 42, t, 9, '#0D2137', 700)).join(''))}${[0, 1, 2].map(i => `<circle cx="${300 + i * 22}" cy="${120 - i * 26}" r="${8 + i * 2}" fill="${K.sky}" opacity="${.4 + i * .2}"/>`).join('')}`,
    2: `<circle cx="200" cy="150" r="120" fill="url(#gGlow)"/>${phone(150, 40, 110, 230, rr(8, 40, 86, 120, 10, '#E7EEF7') + `<circle cx="51" cy="100" r="24" fill="url(#gSky)"/>`)}${waves(205, 30, .8, '', K.gold)}<g stroke="${K.sky}" stroke-opacity=".5" fill="none"><path d="M260 150 Q320 120 350 160"/><path d="M140 150 Q80 120 50 160"/></g><circle cx="350" cy="160" r="9" fill="${K.sky}"/><circle cx="50" cy="160" r="9" fill="${K.sky}"/>`,
    3: `<circle cx="200" cy="150" r="120" fill="url(#gGlow)"/>${phone(140, 30, 120, 250, rr(0, 0, 104, 54, 0, '#102D4F') + tx(10, 38, 'Mi banco', 9, '#fff', 800, 'start', HEAD) + rr(8, 64, 88, 52, 10, 'url(#gCard)') + tx(16, 86, 'Saldo', 8, '#A9BBD1', 600) + rr(16, 94, 50, 10, 5, '#D6AC55') + [0, 1, 2, 3].map(i => rr(8 + (i % 2) * 46, 126 + Math.floor(i / 2) * 46, 42, 38, 8, i === 0 ? '#102D4F' : '#fff', 'stroke="#DCE5F0"')).join('') + tx(29, 150, 'CoDi', 9, '#D6AC55', 800, 'middle', HEAD))}`,
    4: `<circle cx="200" cy="160" r="130" fill="url(#gGlow)"/>${person(110, 270, 150, { hair: 'long', phone: true })}${person(200, 270, 170, { hair: 'short', phone: true })}${person(290, 270, 160, { hair: 'gray' })}<line x1="60" x2="340" y1="274" y2="274" stroke="#9BE0FF" stroke-opacity=".25"/>`
  };
  /* =====================================================================
     MODELO LOGIT · escena 2: «Construye el modelo» (laboratorio interactivo)
     Recupera la interactividad de «Digitalízate con CoDi.html» (variables que
     se activan una a una, efecto por variable y lectura acumulada de las
     continuas) con las cifras de la especificación final. IMPORTANTE: no se
     re-estima nada. Los cinco efectos son siempre los del modelo completo
     (svy: logit uso_codi desconfianza n_habilidades smartphone banca_movil
     edad; margins, dydx(*)). Agregar o quitar solo muestra u oculta.
     ===================================================================== */
  (function logitLab() {
    const root = $('#logitLab'); if (!root) return;
    const L = D.logit, N = L.rows.length, MEAN = L.mean;
    const VARS = [
      { ic: '!', kind: 'bin', name: 'Desconfianza', sub: 'en la seguridad de pagos o datos', axis: 'Eje 1 · Confianza',
        lead: 'Quien desconfía de la seguridad al comprar en línea, o ya tuvo un problema con sus pagos o datos, tiene una probabilidad 1.28 pp menor de usar CoDi.',
        rel: 'Frente a un uso promedio de 1.85%, es una probabilidad cerca de 70% menor.' },
      { ic: '14', kind: 'cont', name: 'Habilidades digitales', sub: 'número de habilidades (0 a 14)', axis: 'Eje 2 · Conocimiento',
        lead: 'Es el determinante con mayor solidez estadística: cada habilidad digital adicional se asocia con +0.34 pp.',
        acc: { min: 0, max: 14, def: 10, lbl: n => `${n} ${n === 1 ? 'habilidad' : 'habilidades'} de diferencia`, ref: 'La investigación lo ilustra con 10 habilidades: +3.4 pp, casi el doble del uso promedio.' } },
      { ic: '<svg width="12" height="18" viewBox="0 0 12 18"><rect x="1" y="1" width="10" height="16" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="6" cy="14" r="1.1" fill="currentColor"/></svg>', kind: 'bin', name: 'Teléfono inteligente', sub: 'lo usa (sí / no)', axis: 'Eje 3 · Inclusión financiera',
        lead: 'Usar teléfono inteligente se asocia con +3.09 pp: por sí solo supera el uso promedio.',
        rel: 'Es el efecto menos preciso del modelo (IC 95%: 0.6 a 5.6 pp): leerlo como dirección, no como magnitud exacta.' },
      { ic: '$', kind: 'bin', name: 'Banca móvil', sub: 'la usa (sí / no)', axis: 'Eje 3 · Inclusión financiera',
        lead: 'Usar banca móvil se asocia con +2.12 pp, más que el uso promedio.',
        rel: 'Aquí se rompe la cadena: 86.5% usa smartphone, pero solo 32.6% usa banca en línea o móvil.' },
      { ic: '+1', kind: 'cont', name: 'Edad', sub: 'años cumplidos', axis: 'Ejes 2 y 3 · Acompañamiento',
        lead: 'Es el efecto más pequeño del modelo: −0.013 pp por cada año de edad.',
        acc: { min: 0, max: 50, def: 30, lbl: n => `${n} ${n === 1 ? 'año' : 'años'} de diferencia`, ref: 'La investigación lo ilustra con 30 años: cerca de −0.4 pp, alrededor de una quinta parte del uso promedio.' } }
    ];
    const inc = new Set(); let cur = null, busy = false;
    const acc = VARS.map(v => v.acc ? v.acc.def : 0);
    const col = r => r.me < 0 ? K.red : K.sky;
    const fmt = (v, d) => `${v > 0 ? '+' : v < 0 ? '−' : ''}${nf(Math.abs(v), d)}`;
    const fme = r => fmt(r.me, Math.abs(r.me) < .1 ? 3 : 2);
    const varsEl = $('#llabVars'), wires = $('#llabWires'), diag = $('#llabDiagram'), yEl = $('#llabY'), card = $('#llabCard'), plot = $('#llabPlot');

    /* ---------- nodos (botones de variables) ---------- */
    varsEl.innerHTML = L.rows.map((r, i) => `<li><button type="button" class="llab-v" data-i="${i}" aria-pressed="false" style="--c:${col(r)}">
      <span class="lv-ic" aria-hidden="true">${VARS[i].ic}</span>
      <span class="lv-t"><b>${VARS[i].name}</b><small>${VARS[i].sub}</small></span>
      <span class="lv-me num"><span class="lv-val">${fme(r)} pp <i>${r.sig}</i></span><span class="lv-add">Agregar</span></span>
      <span class="lv-tg" aria-hidden="true"></span></button></li>`).join('');
    const btns = $$('.llab-v', varsEl);
    btns.forEach(b => b.addEventListener('click', () => toggle(+b.dataset.i)));

    /* ---------- conexiones ---------- */
    const NS = 'http://www.w3.org/2000/svg';
    const paths = L.rows.map((r, i) => {
      const g = document.createElementNS(NS, 'g');
      g.innerHTML = `<path class="w-ghost"/><path class="w-live" pathLength="1" stroke="${col(r)}"/><circle class="w-pulse" r="4.5" fill="${col(r)}" opacity="0"><animateMotion dur="0.75s" begin="indefinite" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines=".4 0 .2 1"/></circle>`;
      wires.appendChild(g); return g;
    });
    function layout() {
      const d = diag.getBoundingClientRect(); if (!d.width) return;
      const y = yEl.getBoundingClientRect(), ty = y.top - d.top + y.height / 2, tx0 = y.left - d.left + 2;
      wires.setAttribute('viewBox', `0 0 ${d.width} ${d.height}`);
      btns.forEach((b, i) => {
        const r = b.getBoundingClientRect(), x1 = r.right - d.left, y1 = r.top - d.top + r.height / 2;
        const x2 = tx0, y2 = ty + (i - (N - 1) / 2) * Math.min(12, y.height / 9), k = (x2 - x1) * .55;
        const dd = `M${x1.toFixed(1)} ${y1.toFixed(1)} C${(x1 + k).toFixed(1)} ${y1.toFixed(1)} ${(x2 - k).toFixed(1)} ${y2.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
        $$('path', paths[i]).forEach(p => p.setAttribute('d', dd));
        $('animateMotion', paths[i]).setAttribute('path', dd);
      });
    }
    if ('ResizeObserver' in window) new ResizeObserver(() => { layout(); }).observe(diag); else addEventListener('resize', layout);

    /* ---------- gráfico de efectos (filas fijas: no hay saltos de altura) ---------- */
    let plotW = 0;
    function geom() {
      const W = Math.max(280, plot.clientWidth || 620), mob = W < 560;
      const left = mob ? 14 : 200, right = mob ? 16 : 28, rowH = mob ? 104 : 70, top = 40, H = top + rowH * N + 40;
      const x = v => left + (v + 3) / 9 * (W - left - right);
      return { W, H, mob, left, rowH, top, x };
    }
    function drawPlot() {
      const { W, H, mob, left, rowH, top, x } = geom(); plotW = W;
      let s = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="group" aria-label="Efectos marginales de las variables agregadas">`;
      s += `<rect x="${x(-3)}" y="${top - 18}" width="${x(0) - x(-3)}" height="${H - top - 22}" fill="${K.red}" opacity=".05"/><rect x="${x(0)}" y="${top - 18}" width="${x(6) - x(0)}" height="${H - top - 22}" fill="${K.sky}" opacity=".05"/>`;
      s += tx(x(0) - 8, top - 24, mob ? '← negativa' : '← asociación negativa', 12, K.red, 700, 'end') + tx(x(0) + 8, top - 24, mob ? 'positiva →' : 'asociación positiva →', 12, K.sky, 700);
      for (let g = -3; g <= 6; g++) s += `<line x1="${x(g)}" x2="${x(g)}" y1="${top - 14}" y2="${H - 34}" stroke="${g === 0 ? K.on : 'rgba(169,187,209,.12)'}" stroke-width="${g === 0 ? 1.6 : 1}"/>` + tx(x(g), H - 14, (g > 0 ? '+' : g < 0 ? '−' : '') + Math.abs(g), 12, K.on3, 600, 'middle');
      L.rows.forEach((r, i) => {
        const on = inc.has(i), sel = i === cur, rt = top + rowH * i, cy = mob ? rt + 76 : rt + rowH / 2, c = col(r);
        const lx = mob ? 14 : left - 18, ly = mob ? rt + 24 : cy - 3, an = mob ? 'start' : 'end';
        s += `<g class="lr${on ? ' on' : ''}${sel ? ' sel' : ''}" data-i="${i}" tabindex="0" role="button" aria-label="${VARS[i].name}: ${on ? `${fme(r)} puntos porcentuales; ver interpretación` : 'sin agregar; agregar al modelo'}">`;
        s += `<rect class="bg" x="0" y="${rt + 4}" width="${W}" height="${rowH - 8}" rx="12" fill="${sel ? 'rgba(214,172,85,.1)' : 'transparent'}" stroke="${sel ? 'rgba(214,172,85,.45)' : 'none'}"/>`;
        s += tx(lx, ly, VARS[i].name, 15, on ? (sel ? K.gold : K.on) : K.on3, 800, an, HEAD) + tx(lx, ly + 18, on ? L.rows[i].unit : 'Sin agregar · toca para incluir', 12, K.on3, 500, an);
        if (on) {
          if (r.lo != null) s += `<g class="ci"><line x1="${x(r.lo)}" x2="${x(r.hi)}" y1="${cy}" y2="${cy}" stroke="${K.on}" stroke-width="2"/><line x1="${x(r.lo)}" x2="${x(r.lo)}" y1="${cy - 7}" y2="${cy + 7}" stroke="${K.on}" stroke-width="2"/><line x1="${x(r.hi)}" x2="${x(r.hi)}" y1="${cy - 7}" y2="${cy + 7}" stroke="${K.on}" stroke-width="2"/></g>`;
          else s += `<text class="ci" x="${x(r.me) + (r.me < 0 ? -14 : 14)}" y="${cy + 22}" font-size="11" fill="${K.on3}" text-anchor="${r.me < 0 ? 'end' : 'start'}" font-style="italic">IC no reportado</text>`;
          s += `<line class="stem" x1="${x(0)}" x2="${x(r.me)}" y1="${cy}" y2="${cy}" stroke="${c}" stroke-width="${sel ? 6 : 4}" stroke-linecap="round" opacity=".5"/>`;
          s += `<circle class="dot" cx="${x(r.me)}" cy="${cy}" r="${sel ? 11 : 8}" fill="${c}" stroke="${K.night}" stroke-width="3"/>`;
          const vt = `${fme(r)} ${r.sig}`;
          s += mob ? tx(W - 10, ly, vt, 15, c, 800, 'end', HEAD, 'class="vl"') : tx(x(r.me) + (r.me < 0 ? -16 : 16), cy - 12, vt, 14, c, 800, r.me < 0 ? 'end' : 'start', HEAD, 'class="vl"');
        } else s += `<circle cx="${x(0)}" cy="${cy}" r="5" fill="none" stroke="${K.on3}" stroke-dasharray="2 3" opacity=".7"/>`;
        s += '</g>';
      });
      plot.innerHTML = s + '</svg>';
      $$('.lr', plot).forEach(g => {
        const i = +g.dataset.i, act = () => inc.has(i) ? focus(i) : toggle(i);
        g.addEventListener('click', act);
        g.addEventListener('keydown', e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); }
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); const n = $(`.lr[data-i="${(i + (e.key === 'ArrowDown' ? 1 : N - 1)) % N}"]`, plot); n && n.focus(); }
        });
      });
    }
    function growRow(i) {
      const g = $(`.lr[data-i="${i}"]`, plot); if (!g || !G || RM) return;
      const st = $('.stem', g);
      G.from(st, { attr: { x2: st.getAttribute('x1') }, duration: .8, ease: 'power3.out' });
      G.from($('.dot', g), { scale: 0, transformOrigin: '50% 50%', duration: .5, delay: .3, ease: 'back.out(2)' });
      G.from($$('.ci, .vl', g), { opacity: 0, duration: .4, delay: .45 });
    }

    /* ---------- tarjeta de interpretación ---------- */
    function drawCard() {
      const chips = inc.size ? `<div class="lc-chips" role="group" aria-label="Variables en el modelo">${[...inc].sort().map(i => `<button type="button" data-i="${i}" aria-pressed="${i === cur}" style="--c:${col(L.rows[i])}">${VARS[i].name}</button>`).join('')}</div>` : '';
      if (cur == null) {
        card.innerHTML = `<span class="lc-k">Variable dependiente</span><h4>Uso de CoDi</h4>
          <p>Vale 1 si la persona pagó con CoDi y 0 si no. En la muestra solo <b class="num">${nf(MEAN, 2)}%</b> lo ha usado: menos de 2 de cada 100.</p>
          <ol class="lc-how"><li>Agrega un factor desde la izquierda.</li><li>Mira hacia dónde empuja: <span style="color:${K.sky}">derecha, más uso</span>; <span style="color:${K.red}">izquierda, menos</span>.</li><li>Lee qué significa y qué no.</li></ol>${chips}`;
      } else {
        const r = L.rows[cur], v = VARS[cur], c = col(r);
        const n = v.acc ? acc[cur] : 1, eff = r.me * n, sc = 5;
        const accUI = v.acc ? `<div class="lc-acc"><label for="llabAcc">${v.acc.lbl(n)}</label><input type="range" id="llabAcc" min="${v.acc.min}" max="${v.acc.max}" step="1" value="${n}" aria-valuetext="${v.acc.lbl(n)}"><p class="lc-ref">${v.acc.ref}</p></div>` : '';
        const effLbl = v.acc ? `${v.acc.lbl(n)}` : 'Diferencia asociada';
        card.innerHTML = `${chips}<svg class="lc-ill" viewBox="0 0 400 300" aria-hidden="true">${ILLU[cur]}</svg>
          <span class="lc-k">${v.kind === 'bin' ? 'Variable binaria' : 'Variable continua'} · orienta ${v.axis}</span>
          <h4>${r.k}</h4>
          <div class="lc-me num" style="color:${c}">${fme(r)}<small> pp ${r.sig}</small></div>
          <dl><dt>Unidad</dt><dd>${r.unit}</dd><dt>IC 95%</dt><dd>${r.ci || 'No reportado en la investigación'}</dd><dt>Significancia</dt><dd>${r.sig === '***' ? 'p < 0.01' : 'p < 0.05'}</dd></dl>
          <p>${v.lead}</p>
          <div class="lc-cmp" role="img" aria-label="Comparación con el uso promedio de ${nf(MEAN, 2)}%">
            <div><span>Uso promedio</span><span class="t"><i style="width:${MEAN / sc * 100}%;background:${K.gold}"></i></span><b class="num">${nf(MEAN, 2)}%</b></div>
            <div><span id="llabEffK">${effLbl}</span><span class="t"><i id="llabEffBar" style="width:${Math.min(100, Math.abs(eff) / sc * 100)}%;background:${c}"></i></span><b class="num" id="llabEffV" style="color:${c}">${fmt(eff, Math.abs(eff) < .1 ? 3 : 2)} pp</b></div>
          </div>
          ${accUI}
          ${v.rel ? `<p class="lc-rel">${v.rel}</p>` : ''}
          <p class="lc-caution">${r.caution}</p>`;
        const sl = $('#llabAcc', card);
        if (sl) sl.addEventListener('input', () => {
          const k = +sl.value; acc[cur] = k; const e = r.me * k;
          $('label', card.querySelector('.lc-acc')).textContent = v.acc.lbl(k); sl.setAttribute('aria-valuetext', v.acc.lbl(k));
          $('#llabEffK').textContent = v.acc.lbl(k);
          $('#llabEffBar').style.width = Math.min(100, Math.abs(e) / sc * 100) + '%';
          $('#llabEffV').textContent = `${fmt(e, Math.abs(e) < .1 ? 3 : 2)} pp`;
        });
      }
      $$('.lc-chips button', card).forEach(b => b.addEventListener('click', () => focus(+b.dataset.i)));
      if (G && !RM) G.fromTo(card.children, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .35, stagger: .03, ease: 'power2.out', clearProps: 'all' });
    }

    /* ---------- estado ---------- */
    function status() {
      const k = inc.size;
      $('#llabCount').textContent = `${k} de ${N}`;
      $('#llabRing').style.strokeDashoffset = 100 - k / N * 100;
      yEl.classList.toggle('full', k === N);
      $('#llabReset').disabled = k === 0;
      $('#llabAll').disabled = k === N;
      const miss = L.rows.map((r, i) => i).filter(i => !inc.has(i)).map(i => VARS[i].name.toLowerCase());
      $('#llabStatus').textContent = k === 0 ? 'Elige una variable para empezar.'
        : k === N ? `Modelo completo: las cinco variables de la especificación final (n = ${L.n.toLocaleString('es-MX')}; AUC ${L.auc}; pseudo R² ${L.r2}).`
        : `${k} de ${N} a la vista. Falta${miss.length > 1 ? 'n' : ''}: ${miss.join(', ')}.`;
      btns.forEach((b, i) => { const on = inc.has(i); b.setAttribute('aria-pressed', on); b.classList.toggle('on', on); b.classList.toggle('sel', i === cur);
        b.setAttribute('aria-label', `${VARS[i].name}: ${on ? `en el modelo, ${fme(L.rows[i])} puntos porcentuales. Pulsa para quitar` : 'pulsa para agregar al modelo'}`); });
      paths.forEach((g, i) => $('.w-live', g).classList.toggle('on', inc.has(i)));
    }
    function pulse(i) {
      if (RM || LOW) return;
      const c = $('.w-pulse', paths[i]), m = $('animateMotion', paths[i]);
      if (!m.beginElement) return;
      c.setAttribute('opacity', 1); try { m.beginElement(); } catch (e) { /* SMIL no disponible */ }
      setTimeout(() => { c.setAttribute('opacity', 0); yEl.classList.remove('hit'); void yEl.offsetWidth; yEl.classList.add('hit'); }, 760);
    }
    function add(i, quiet) { if (inc.has(i)) return; inc.add(i); if (!quiet) cur = i; status(); drawPlot(); growRow(i); pulse(i); if (!quiet) drawCard(); }
    function remove(i) {
      inc.delete(i); if (cur === i) cur = inc.size ? [...inc].pop() : null;
      const g = $(`.lr[data-i="${i}"]`, plot), done = () => { status(); drawPlot(); drawCard(); };
      if (g && G && !RM) { const st = $('.stem', g); G.to(st, { attr: { x2: st.getAttribute('x1') }, duration: .3, ease: 'power2.in' }); G.to($$('.dot, .ci, .vl', g), { opacity: 0, duration: .25, onComplete: done }); }
      else done();
    }
    function toggle(i) { if (busy) return; inc.has(i) ? remove(i) : add(i); }
    function focus(i) { cur = i; status(); drawPlot(); drawCard(); }
    function full() {
      if (busy) return;
      const miss = L.rows.map((r, i) => i).filter(i => !inc.has(i));
      if (!miss.length) return;
      if (RM) { miss.forEach(i => inc.add(i)); cur = 0; status(); drawPlot(); drawCard(); return; }
      busy = true; root.classList.add('busy');
      miss.forEach((i, k) => setTimeout(() => {
        add(i, true);
        if (k === miss.length - 1) { busy = false; root.classList.remove('busy'); cur = cur == null || !inc.has(cur) ? 0 : cur; status(); drawPlot(); drawCard(); }
      }, k * 260));
    }
    function reset() { if (busy) return; inc.clear(); cur = null; VARS.forEach((v, i) => { acc[i] = v.acc ? v.acc.def : 0; }); status(); drawPlot(); drawCard(); }
    $('#llabAll').addEventListener('click', full);
    $('#llabReset').addEventListener('click', reset);
    window.LLAB = { full, reset };

    status(); drawPlot(); drawCard(); layout();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { const W = Math.max(280, plot.clientWidth || 620); if (W !== plotW) drawPlot(); layout(); }, 150); });
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
