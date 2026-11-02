/* Datatón INEGI 2026 · Estrategia CoDi — lógica de la experiencia */
(function () {
  'use strict';
  const D = window.DATA;
  const doc = document.documentElement;
  doc.classList.add('js');
  const RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const nf = (v, d = 1) => v == null ? '—' : v.toLocaleString('es-MX', { minimumFractionDigits: d, maximumFractionDigits: d });
  const nInt = v => Math.round(v).toLocaleString('es-MX');
  const mill = v => nf(v / 1e6, 2) + ' M';
  const isMobile = () => window.innerWidth <= 768;

  /* ---------- paleta ---------- */
  const C = {
    night: '#071629', deep: '#102D4F', gold: '#D6AC55', sky: '#62C8F5', paper: '#F6F8FC',
    onNight: '#EAF0F8', onNight2: '#A9BBD1', onNight3: '#91A6BF', ink: '#0D2137', ink2: '#435770',
    c1: '#3A9BDC', c2: '#BE8A28', c3: '#9474E0', c4: '#2FA98A', c5: '#D9604C',
    c1l: '#1F7FC4', c2l: '#B07C1E', c3l: '#7A5BD0', c4l: '#178F72', c5l: '#C24A36'
  };
  const FONT = "'Source Sans 3', 'Segoe UI', system-ui, sans-serif";
  const HEAD = "'Montserrat', 'Segoe UI', system-ui, sans-serif";
  function theme(dark) {
    return dark
      ? { text: C.onNight, text2: C.onNight2, axis: 'rgba(169,187,209,.35)', grid: 'rgba(169,187,209,.12)', tipBg: '#0E2442', tipBorder: 'rgba(169,187,209,.25)', bg: C.night }
      : { text: C.ink, text2: C.ink2, axis: 'rgba(13,33,55,.3)', grid: 'rgba(13,33,55,.08)', tipBg: '#FFFFFF', tipBorder: 'rgba(13,33,55,.15)', bg: C.paper };
  }
  function tip(t, extra) {
    return Object.assign({
      backgroundColor: t.tipBg, borderColor: t.tipBorder, borderWidth: 1, padding: [10, 14], confine: true,
      textStyle: { color: t.text, fontFamily: FONT, fontSize: 13 }, extraCssText: 'border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.25);'
    }, extra || {});
  }
  function axisCat(t, data, extra) {
    return Object.assign({ type: 'category', data, axisLine: { lineStyle: { color: t.axis } }, axisTick: { show: false },
      axisLabel: { color: t.text2, fontFamily: FONT, fontSize: 12 } }, extra || {});
  }
  function axisVal(t, extra) {
    return Object.assign({ type: 'value', splitLine: { lineStyle: { color: t.grid } }, axisLine: { show: false },
      axisLabel: { color: t.text2, fontFamily: FONT, fontSize: 12 } }, extra || {});
  }

  /* ---------- registro de gráficas + resize ---------- */
  // ECharts se carga de forma diferida (no bloquea la primera pantalla). Mientras no exista,
  // chart() devuelve un sustituto que guarda los manejadores de eventos y los aplica después.
  const charts = new Map(), stubs = new Map();
  let ecPromise = null;
  function ensureEC() {
    if (window.echarts) return Promise.resolve();
    if (!ecPromise) ecPromise = new Promise((res, rej) => {
      const s = document.createElement('script'); s.src = 'assets/vendor/echarts.min.js'; s.async = true;
      s.onload = () => { if (window.MX_GEO) echarts.registerMap('mx', window.MX_GEO); res(); };
      s.onerror = () => { ecPromise = null; rej(new Error('echarts')); };
      document.head.appendChild(s);
    });
    return ecPromise;
  }
  function chart(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    if (!window.echarts) {
      ensureEC();
      if (!stubs.has(id)) stubs.set(id, { _on: [], on(...a) { this._on.push(a); }, setOption() {}, resize() {}, getOption() { return {}; } });
      return stubs.get(id);
    }
    let c = charts.get(id);
    if (!c) {
      c = echarts.init(el, null, { renderer: 'canvas' });
      charts.set(id, c);
      const st0 = stubs.get(id); if (st0) { st0._on.forEach(a => c.on(...a)); stubs.delete(id); }
      if ('ResizeObserver' in window) new ResizeObserver(() => c.resize()).observe(el);
    }
    return c;
  }
  // precarga en reposo, después del evento load, para que esté lista antes de llegar a la primera gráfica
  addEventListener('load', () => { const go = () => ensureEC().catch(() => {}); 'requestIdleCallback' in window ? requestIdleCallback(go, { timeout: 2500 }) : setTimeout(go, 1200); });
  window.addEventListener('resize', () => charts.forEach(c => c.resize()));
  // inicializa cuando el contenedor entra en pantalla (anima la entrada)
  const pending = [];
  function onVisible(el, fn, margin = '0px 0px -5% 0px') {
    if (!el) return;
    if (!('IntersectionObserver' in window)) return ensureEC().then(fn, () => fn());
    const job = { el, done: false, run() { if (this.done) return; this.done = true; io.disconnect(); ensureEC().then(fn, () => fn()); } };
    const io = new IntersectionObserver((es) => { es.forEach(e => { if (e.isIntersecting) job.run(); }); }, { rootMargin: margin });
    io.observe(el); pending.push(job);
  }
  // respaldo: si un desplazamiento muy rápido salta un elemento, se inicializa al detenerse
  let st;
  addEventListener('scroll', () => { clearTimeout(st); st = setTimeout(() => {
    pending.forEach(j => { if (j.done) return; const r = j.el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) j.run(); });
  }, 140); }, { passive: true });
  const anim = { animation: !RM, animationDuration: 900, animationEasing: 'cubicOut', animationDurationUpdate: 600 };


  /* =====================================================================
     NAV
     ===================================================================== */
  const prog = $('.progress');
  const tocLinks = $$('.toc a');
  const tocBtn = $('.toc-btn'), toc = $('#toc');
  tocBtn.addEventListener('click', () => { const o = toc.classList.toggle('open'); tocBtn.setAttribute('aria-expanded', o); });
  tocLinks.forEach(a => a.addEventListener('click', () => { toc.classList.remove('open'); tocBtn.setAttribute('aria-expanded', 'false'); }));
  function onScroll() {
    const h = doc.scrollHeight - innerHeight;
    prog.style.transform = 'scaleX(' + (h > 0 ? scrollY / h : 0) + ')';
    let cur = null;
    $$('section.chapter[id]').forEach(s => { if (s.getBoundingClientRect().top < innerHeight * .4) cur = s.id; });
    tocLinks.forEach(a => { const on = a.getAttribute('href') === '#' + cur; a.classList.toggle('active', on); if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // reveals
  if ('IntersectionObserver' in window && !RM) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    $$('.rv').forEach(el => io.observe(el));
  } else $$('.rv').forEach(el => el.classList.add('in'));

  /* =====================================================================
     HERO: red de comercio digital (canvas) + 100 pesos
     ===================================================================== */
  (function network() {
    const cv = $('#netCanvas'); if (!cv) return;
    const ctx = cv.getContext('2d');
    // centroides aproximados de las 32 entidades a partir de las geometrías
    const pts = [];
    (window.MX_GEO ? window.MX_GEO.features : []).forEach(f => {
      let sx = 0, sy = 0, n = 0;
      const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
      let best = null, bl = 0; polys.forEach(p => { if (p[0].length > bl) { bl = p[0].length; best = p[0]; } });
      best.forEach(c => { sx += c[0]; sy += c[1]; n++; });
      const b = D.buyers[f.properties.name];
      pts.push({ lon: sx / n, lat: sy / n, w: b ? b[b.length - 1] : 3e5 });
    });
    let W, H, P = [], links = [], t0 = performance.now(), pulses = [];
    function layout() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = cv.clientWidth; H = cv.clientHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const mob = W < 900;
      const bx = mob ? [W * .05, W * .95] : [W * .42, W * .98], by = mob ? [H * .52, H * .98] : [H * .12, H * .92];
      const lonR = [-117.5, -86.5], latR = [14.3, 32.8];
      const sc = Math.min((bx[1] - bx[0]) / (lonR[1] - lonR[0]), (by[1] - by[0]) / ((latR[1] - latR[0]) * 1.08));
      const ox = bx[0] + ((bx[1] - bx[0]) - sc * (lonR[1] - lonR[0])) / 2, oy = by[0];
      P = pts.map(p => ({ x: ox + (p.lon - lonR[0]) * sc, y: oy + (latR[1] - p.lat) * sc * 1.08, r: 1.5 + Math.sqrt(p.w / 5.2e6) * 5.5 }));
      links = [];
      P.forEach((a, i) => {
        const d = P.map((b, j) => ({ j, d: Math.hypot(a.x - b.x, a.y - b.y) })).filter(o => o.j !== i).sort((u, v) => u.d - v.d).slice(0, 3);
        d.forEach(o => { if (!links.some(l => (l[0] === o.j && l[1] === i))) links.push([i, o.j]); });
      });
    }
    function frame(now) {
      ctx.clearRect(0, 0, W, H);
      const t = (now - t0) / 1000;
      ctx.lineWidth = 1;
      links.forEach(([i, j]) => { const a = P[i], b = P[j]; ctx.strokeStyle = 'rgba(98,200,245,0.13)'; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); });
      if (!RM && Math.random() < 0.08 && pulses.length < 18) pulses.push({ l: links[Math.floor(Math.random() * links.length)], s: now, dir: Math.random() < .5 });
      pulses = pulses.filter(p => now - p.s < 1600);
      pulses.forEach(p => {
        const k = (now - p.s) / 1600, a = P[p.l[p.dir ? 0 : 1]], b = P[p.l[p.dir ? 1 : 0]];
        const x = a.x + (b.x - a.x) * k, y = a.y + (b.y - a.y) * k;
        ctx.fillStyle = 'rgba(214,172,85,' + (1 - k) + ')'; ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 7); ctx.fill();
      });
      P.forEach((p, i) => {
        const g = RM ? 0 : Math.sin(t * 1.2 + i) * .6;
        ctx.fillStyle = 'rgba(98,200,245,0.85)'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r + g * .3, 0, 7); ctx.fill();
        ctx.strokeStyle = 'rgba(98,200,245,0.18)'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r + 5 + g, 0, 7); ctx.stroke();
      });
      if (!RM && visible) requestAnimationFrame(frame);
    }
    let visible = true;
    layout(); requestAnimationFrame(frame);
    addEventListener('resize', () => { layout(); if (RM) frame(performance.now()); });
    new IntersectionObserver(es => { const v = es[0].isIntersecting; if (v && !visible) { visible = true; requestAnimationFrame(frame); } visible = v; }).observe(cv);
  })();

  (function pesos() {
    const box = $('#coins'); if (!box) return;
    for (let i = 0; i < 100; i++) { const c = document.createElement('i'); c.className = 'coin'; box.appendChild(c); }
    const coins = $$('.coin', box), V = D.vabcoel, scrub = $('#scrub');
    function set(i) {
      const p = V.pib[i];
      coins.forEach((c, k) => {
        c.classList.remove('on', 'half'); c.style.removeProperty('--fill');
        if (k + 1 <= Math.floor(p)) c.classList.add('on');
        else if (k < p) { c.classList.add('half'); c.style.setProperty('--fill', Math.round((p - k) * 100) + '%'); }
      });
      $('#pesosPct').textContent = nf(p, 2);
      $('#pesosYear').textContent = V.yearLabels[i];
      $('#pesosVab').textContent = nInt(V.total[i]);
      $('#pesosG').textContent = V.gV[i] == null ? '—' : (V.gV[i] > 0 ? '+' : '') + nf(V.gV[i]) + '%';
      scrub.value = i; scrub.setAttribute('aria-valuetext', V.yearLabels[i] + ': ' + nf(p, 2) + '% del PIB');
    }
    scrub.addEventListener('input', () => { stop(); set(+scrub.value); });
    let timer = null; const btn = $('#playBtn');
    function stop() { clearInterval(timer); timer = null; btn.textContent = 'Reproducir 2013–2024'; }
    function play() {
      if (timer) return stop();
      let i = 0; set(0); btn.textContent = 'Pausar';
      timer = setInterval(() => { i++; if (i > 11) return stop(); set(i); }, RM ? 400 : 650);
    }
    btn.addEventListener('click', play);
    set(11);
    // secuencia de entrada: crece de 2013 a 2024 una sola vez
    if (!RM) setTimeout(play, 900);
    if (window.gsap && !RM) {
            gsap.from('.hero .kicker, .hero .lead, .hero-cta, .team', { y: 20, opacity: 0, duration: .9, stagger: .08, delay: .15, ease: 'power3.out' });
      gsap.from('.pesos', { y: 30, opacity: 0, duration: 1, delay: .3, ease: 'power3.out' });
    }
  })();

  /* =====================================================================
     SECCIÓN 1
     ===================================================================== */
  onVisible($('#chVab'), () => {
    const t = theme(true), V = D.vabcoel;
    chart('chVab').setOption(Object.assign({
      grid: { left: 8, right: 8, top: 40, bottom: 4, containLabel: true },
      tooltip: tip(t, { trigger: 'axis', axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(98,200,245,.06)' } },
        formatter: p => `<b>${V.yearLabels[p[0].dataIndex]}</b><br>${nInt(p[0].value)} millones de pesos de 2018<br><span style="color:${t.text2}">${nf(V.pib[p[0].dataIndex], 2)}% del PIB</span>` }),
      xAxis: axisCat(t, V.yearLabels, { axisLabel: { color: t.text2, fontSize: 11, interval: isMobile() ? 1 : 0 } }),
      yAxis: axisVal(t, { axisLabel: { color: t.text2, formatter: v => v === 0 ? '0' : nf(v / 1e6, 1) }, name: 'billones de pesos', nameGap: 14, nameTextStyle: { color: t.text2, fontSize: 11, align: 'left', padding: [0, 0, 0, 0] } }),
      series: [{ type: 'bar', data: V.total.map((v, i) => ({ value: v, itemStyle: { color: i === 7 ? C.gold : i === 11 ? C.sky : 'rgba(98,200,245,.45)' } })), barWidth: '58%',
        itemStyle: { borderRadius: [4, 4, 0, 0] },
        label: { show: true, position: 'top', color: t.text2, fontSize: 11, formatter: p => (p.dataIndex === 0 || p.dataIndex === 7 || p.dataIndex === 11) ? nf(p.value / 1e6, 2) : '' } }]
    }, anim));
  });
  onVisible($('#chGrowth'), () => {
    const t = theme(true), V = D.vabcoel, yl = V.yearLabels.slice(1);
    chart('chGrowth').setOption(Object.assign({
      grid: { left: 8, right: 16, top: 28, bottom: 4, containLabel: true },
      tooltip: tip(t, { trigger: 'axis', axisPointer: { type: 'line', lineStyle: { color: t.axis } }, valueFormatter: v => (v > 0 ? '+' : '') + nf(v) + '%' }),
      xAxis: axisCat(t, yl, { boundaryGap: false }),
      yAxis: axisVal(t, { axisLabel: { color: t.text2, formatter: '{value}%' } }),
      series: [
        { name: 'VABCOEL', type: 'line', data: V.gV.slice(1), symbol: 'circle', symbolSize: 8, lineStyle: { width: 2.5, color: C.sky }, itemStyle: { color: C.sky, borderColor: C.night, borderWidth: 2 },
          markPoint: { symbol: 'circle', symbolSize: 1, label: { color: C.sky, fontWeight: 700, fontFamily: HEAD, fontSize: 13, offset: [0, -14] }, data: [{ coord: ['2020', 23.3], value: '+23.3%' }] },
          markArea: { itemStyle: { color: 'rgba(214,172,85,.07)' }, label: { color: C.gold, fontSize: 11, position: 'insideBottomLeft', offset: [6, -6] }, data: [[{ name: 'Pandemia', xAxis: '2019' }, { xAxis: '2021' }]] } },
        { name: 'PIB real', type: 'line', data: V.gPIB.slice(1), symbol: 'circle', symbolSize: 8, lineStyle: { width: 2.5, color: C.gold }, itemStyle: { color: C.gold, borderColor: C.night, borderWidth: 2 },
          markPoint: { symbol: 'circle', symbolSize: 1, label: { color: C.gold, fontWeight: 700, fontFamily: HEAD, fontSize: 13, offset: [0, 16] }, data: [{ coord: ['2020', -8.4], value: '−8.4%' }] },
          markLine: { silent: true, symbol: 'none', lineStyle: { color: t.axis, type: 'solid' }, label: { show: false }, data: [{ yAxis: 0 }] } }
      ]
    }, anim));
  });
  onVisible($('#chStruct'), () => {
    const t = theme(true), V = D.vabcoel;
    const mk = (name, data, color, lbl) => ({ name, type: 'bar', stack: 's', data, barWidth: '64%', itemStyle: { color, borderColor: C.night, borderWidth: 1 },
      label: { show: lbl, position: 'inside', color: '#fff', fontSize: 10, formatter: p => (p.dataIndex === 0 || p.dataIndex === 11) ? nf(p.value) : '' }, emphasis: { focus: 'series' } });
    chart('chStruct').setOption(Object.assign({
      grid: { left: 8, right: 8, top: 10, bottom: 4, containLabel: true },
      tooltip: tip(t, { trigger: 'axis', axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(255,255,255,.04)' } }, valueFormatter: v => nf(v) + '%' }),
      xAxis: axisCat(t, V.yearLabels.map(y => y.replace('20', "'")), { axisLabel: { color: t.text2, fontSize: 11 } }),
      yAxis: axisVal(t, { max: 100, axisLabel: { color: t.text2, formatter: '{value}%' } }),
      series: [mk('Comercio al por menor', V.menor, C.c2, true), mk('Comercio al por mayor', V.mayor, C.c1, false), mk('Otros servicios', V.otros, '#3B5170', false)]
    }, anim));
  });

  /* =====================================================================
     SECCIÓN 2: mapa con tres indicadores
     ===================================================================== */
  (function territory() {
    const names = Object.keys(D.buyers);
    const tcpa = {}; names.forEach(n => { const v = D.buyers[n]; tcpa[n] = (Math.pow(v[9] / v[0], 1 / 10) - 1) * 100; });
    const natT = (Math.pow(D.buyersNational[9] / D.buyersNational[0], .1) - 1) * 100;
    let ind = 'vol', yi = 9;
    const yearCtl = $('#yearCtl'), yr = $('#yearRange'), yo = $('#yearOut');
    const cfg = {
      vol: { k: () => 'Compradores en línea, ' + D.buyerYears[yi], val: n => D.buyers[n][yi], fmt: v => mill(v), unit: 'personas',
        nat: () => mill(D.buyersNational[yi]), natK: 'Total nacional', top: 'Mayor volumen', bot: 'Menor volumen',
        color: ['#163A5E', '#2A6E9E', '#62C8F5', '#DDF4FF'],
        foot: 'Usuarios de internet de 6 años y más que compraron productos o servicios en línea. Fuente: ENDUTIH 2015–2025, INEGI. Sin dato publicado para 2019.' },
      grow: { k: () => 'Crecimiento promedio anual, 2015–2025', val: n => tcpa[n], fmt: v => nf(v) + '%', unit: '% anual',
        nat: () => nf(natT) + '%', natK: 'Promedio nacional', top: 'Crecen más rápido', bot: 'Crecen más lento',
        color: ['#2B2A4A', '#6B4E8F', '#C08A3A', '#F2D28C'],
        foot: 'Tasa de crecimiento promedio anual compuesta de compradores en línea, 2015–2025, calculada con la serie de compradores por entidad de la ENDUTIH. Fuente: INEGI.' },
      pen: { k: () => '% de la población de 6+ que compra en línea, 2025', val: n => D.penetration[n], fmt: v => nf(v) + '%', unit: '% de la población de 6 años y más',
        nat: () => '7.2–31.1%', natK: 'Rango entre entidades (Chiapas–Colima)', top: 'Mayor penetración', bot: 'Menor penetración',
        color: ['#14324F', '#1F6E8C', '#4FB6C9', '#D9F6EE'],
        foot: 'Compradores en línea entre población de 6 años y más. Fuente: INEGI, EIC 2025 y ENDUTIH 2025.' }
    };
    function draw() {
      const c = cfg[ind], t = theme(true);
      const data = names.map(n => ({ name: n, value: c.val(n) }));
      const vals = data.map(d => d.value), min = Math.min(...vals), max = Math.max(...vals);
      const ch = chart('chMap'); if (!ch) return;
      ch.setOption(Object.assign({
        tooltip: tip(t, { trigger: 'item', formatter: p => {
          if (p.value == null || isNaN(p.value)) return p.name;
          const n = p.name, b = D.buyers[n];
          return `<b style="font-family:${HEAD}">${n}</b><br>${c.k()}: <b>${c.fmt(p.value)}</b><br><span style="color:${t.text2}">Unidad: ${c.unit}</span>` +
            (ind !== 'vol' ? `<br><span style="color:${t.text2}">Compradores 2025: ${mill(b[9])}</span>` : `<br><span style="color:${t.text2}">2015: ${mill(b[0])} · TCPA ${nf(tcpa[n])}%</span>`);
        } }),
        visualMap: { type: 'continuous', min, max, calculable: false, orient: 'horizontal', left: isMobile() ? 'center' : 'right', bottom: 8, itemWidth: 10, itemHeight: isMobile() ? 180 : 220,
          text: [c.fmt(max), c.fmt(min)], textStyle: { color: t.text2, fontFamily: FONT, fontSize: 11 }, inRange: { color: c.color } },
        series: [{ type: 'map', map: 'mx', roam: false, aspectScale: 0.92, layoutCenter: ['50%', isMobile() ? '42%' : '46%'], layoutSize: isMobile() ? '112%' : '98%',
          data, itemStyle: { borderColor: 'rgba(7,22,41,.9)', borderWidth: .8 }, label: { show: false },
          emphasis: { label: { show: false }, itemStyle: { areaColor: C.gold, borderColor: '#fff', borderWidth: 1.2 } },
          select: { disabled: true } }]
      }, anim), { notMerge: false });
      // readout
      $('#mapK').textContent = c.k(); $('#mapV').textContent = c.nat(); $('#mapK2').textContent = c.natK;
      $('#mapFoot').innerHTML = '<span>' + c.foot + '</span><span>Geometrías: Natural Earth.</span>';
      // ranking
      const sorted = data.slice().sort((a, b) => b.value - a.value);
      const mx = sorted[0].value;
      const li = (d, i) => `<li><span class="i">${i}</span><span>${d.name}</span><span class="val">${c.fmt(d.value)}</span><span class="bar" style="transform:scaleX(${(d.value / mx).toFixed(3)});${ind === 'grow' ? 'background:var(--gold)' : ''}"></span></li>`;
      $('#rankTop').innerHTML = sorted.slice(0, 6).map((d, i) => li(d, i + 1)).join('');
      $('#rankBot').innerHTML = sorted.slice(-6).map((d, i) => li(d, 27 + i)).join('');
      $('#rankTitle').textContent = c.top; $('#rankTitle2').textContent = c.bot;
      yearCtl.style.visibility = ind === 'vol' ? 'visible' : 'hidden';
    }
    const ch = chart('chMap');
    if (ch) {
      ch.on('mouseover', p => { if (p.value == null) return; $('#mapK').textContent = p.name; $('#mapV').textContent = cfg[ind].fmt(p.value); $('#mapK2').textContent = cfg[ind].k(); });
      ch.on('mouseout', () => { const c = cfg[ind]; $('#mapK').textContent = c.k(); $('#mapV').textContent = c.nat(); $('#mapK2').textContent = c.natK; });
    }
    $$('#mapSeg button').forEach(b => b.addEventListener('click', () => {
      ind = b.dataset.ind; $$('#mapSeg button').forEach(x => x.setAttribute('aria-pressed', x === b)); draw();
    }));
    yr.addEventListener('input', () => { yi = +yr.value; yo.textContent = D.buyerYears[yi]; draw(); });
    onVisible($('#chMap'), draw, '0px 0px 10% 0px');
  })();

  /* =====================================================================
     SECCIÓN 3: lente del comprador
     ===================================================================== */
  (function lens() {
    const P = D.profile; let dim = 'edad', sel = { edad: 1, estrato: 3, sexo: 0, smartphone: 0, territorio: null };
    const titles = {
      edad: ['Tasa de compra por grupo de edad', 'grupo de edad'], estrato: ['Tasa de compra por estrato socioeconómico', 'estrato'],
      sexo: ['Tasa de compra por sexo', 'sexo'], smartphone: ['Tasa de compra según uso de smartphone', 'uso de smartphone'],
      territorio: ['Tasa de compra entre usuarios de internet, por entidad', 'entidad']
    };
    const sentences = {
      edad: 'Las personas de 18 a 34 años concentran cerca de la mitad de los compradores. A partir de los 45, la participación disminuye de forma progresiva.',
      estrato: 'El estrato medio bajo concentra muchos compradores por su tamaño, pero su tasa es de 33.4%; en el alto llega a 58.4%.',
      sexo: 'El sexo no distingue al comprador: la composición es prácticamente equilibrada.',
      smartphone: '99.3% de quienes compran usa smartphone. Es una asociación estrecha, no implica por sí misma una relación causal.',
      territorio: 'Entre usuarios de internet de cada entidad, Ciudad de México (47.4%), Nuevo León y Chihuahua (≈46.7%) registran las mayores tasas, sin importar el tamaño de su población.'
    };
    function readout(g) {
      $('#lensGroupK').textContent = 'Tasa de compra · ' + g.g;
      $('#lensBig').innerHTML = nf(g.tasa) + '<small>%</small>';
      $('#lensComp').textContent = g.comp == null ? '—' : nf(g.comp) + '%';
      $('#lensIdx').textContent = g.idx == null ? '—' : nf(g.idx, 2); $('#lensMetaNote').hidden = g.comp != null;
    }
    function draw() {
      const t = theme(false), lens2 = $('#chLens2'), lg = $('#lensLegend');
      $('#lensTitle').textContent = titles[dim][0];
      $('#lensSentence').textContent = sentences[dim];
      if (dim === 'territorio') {
        const arr = Object.keys(D.buyRate).map(n => ({ g: n, tasa: D.buyRate[n] })).sort((a, b) => a.tasa - b.tasa);
        $('#lensSub').textContent = '% de usuarios de internet de cada entidad que compró en línea, 2025. Azul: igual o por encima del promedio nacional (37.3%); gris: por debajo; dorado: las tres tasas más altas.';
        lens2.style.display = 'none'; lg.innerHTML = ''; $('#lens2Title').style.display = 'none';
        $('#chLens').style.height = isMobile() ? '720px' : '640px';
        const c = chart('chLens'); c.resize();
        c.setOption(Object.assign({
          grid: { left: 4, right: 40, top: 26, bottom: 4, containLabel: true },
          tooltip: tip(t, { trigger: 'item', formatter: p => `<b>${p.name}</b><br>Tasa de compra: <b>${nf(p.value)}%</b><br><span style="color:${t.text2}">Base: usuarios de internet de la entidad, 2025</span>` }),
          xAxis: axisVal(t, { max: 50, axisLabel: { color: t.text2, formatter: '{value}%' } }),
          yAxis: axisCat(t, arr.map(a => a.g), { axisLabel: { color: t.text2, fontSize: 11 } }),
          series: [{ type: 'bar', data: arr.map(a => ({ value: a.tasa, itemStyle: { color: a.tasa >= 46 ? '#B07C1E' : a.tasa >= 37.3 ? C.c1l : '#7F93AD' } })), barWidth: '62%', itemStyle: { borderRadius: [0, 4, 4, 0] },
            label: { show: true, position: 'insideRight', color: '#fff', fontSize: 11, fontWeight: 700, formatter: p => nf(p.value) },
          }]        }, anim), true);
        const top = arr[arr.length - 1]; readout({ g: top.g, tasa: top.tasa, comp: null, idx: null });
        return;
      }
      $('#chLens').style.height = ''; lens2.style.display = ''; $('#lens2Title').style.display = '';
      const G = P[dim], i0 = sel[dim], few = G.length <= 4;
      $('#lensSub').textContent = '% de usuarios de internet de cada ' + titles[dim][1] + ' que compró en línea, 2025. Línea punteada: promedio nacional de 37.3%. Selecciona una barra.';
      const c = chart('chLens'); c.resize();
      const dense = isMobile() && !few && innerWidth < 600;
      const lbl = (v, i) => dense ? (i === i0 ? { show: true, position: 'top', color: t.text } : { show: false }) : v >= 9 ? { position: 'insideBottom', color: '#fff', distance: 10 } : { position: 'top', color: t.text };
      c.setOption(Object.assign({
        grid: { left: 4, right: 12, top: 28, bottom: 4, containLabel: true },
        tooltip: tip(t, { trigger: 'item', formatter: p => { const g = G[p.dataIndex]; return `<b>${g.g}</b><br>Tasa de compra: <b>${nf(g.tasa)}%</b><br>Peso entre compradores: ${nf(g.comp)}%<br>Peso en la población: ${nf(g.pob)}%<br>Índice de representación: ${nf(g.idx, 2)}`; } }),
        xAxis: axisCat(t, G.map(g => g.g), { axisLabel: { color: t.text, fontSize: 12, fontWeight: 600, interval: 0, width: isMobile() ? Math.max(48, Math.floor((innerWidth - 80) / G.length) - 4) : 120, overflow: 'break', lineHeight: 14, formatter: v => (isMobile() && !few && innerWidth < 600) ? v.replace('–', '–\n') : v } }),
        yAxis: axisVal(t, { max: 70, axisLabel: { color: t.text2, formatter: '{value}%' } }),
        series: [{ type: 'bar', barWidth: few ? '46%' : '60%', data: G.map((g, i) => ({ value: g.tasa, itemStyle: { color: i === i0 ? '#B07C1E' : C.c1l }, label: lbl(g.tasa, i) })),
          itemStyle: { borderRadius: [4, 4, 0, 0] }, label: { show: true, fontWeight: 700, fontSize: isMobile() && !few ? 10 : 13, fontFamily: HEAD, formatter: p => nf(p.value) },
          markLine: { silent: true, symbol: 'none', z: 3, animation: false, lineStyle: { color: C.ink, type: 'dashed', width: 1.5 }, label: { show: true, position: 'insideEndTop', formatter: 'Promedio 37.3%', color: C.ink, fontSize: 11, fontWeight: 600 }, data: [{ yAxis: 37.3 }] } }]
      }, anim), true);
      lg.innerHTML = `<span><i style="background:${C.c1l}"></i>% entre compradores (composición)</span><span><i style="background:#8FA3BA"></i>% de la población de usuarios de internet</span>`;
      const c2 = chart('chLens2'); c2.resize();
      const lab2 = { show: few || !isMobile(), position: 'top', color: t.text, fontSize: isMobile() ? 10 : 11, fontWeight: 600, formatter: p => nf(p.value) };
      c2.setOption(Object.assign({
        grid: { left: 4, right: 12, top: 22, bottom: 4, containLabel: true },
        tooltip: tip(t, { trigger: 'axis', axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(13,33,55,.04)' } }, valueFormatter: v => nf(v) + '%' }),
        xAxis: axisCat(t, G.map(g => g.g), { axisLabel: { color: t.text, fontSize: 12, interval: 0, width: isMobile() ? Math.max(48, Math.floor((innerWidth - 80) / G.length) - 4) : 120, overflow: 'break', lineHeight: 14, formatter: v => (isMobile() && !few && innerWidth < 600) ? v.replace('–', '–\n') : v } }),
        yAxis: axisVal(t, { axisLabel: { color: t.text2, formatter: '{value}%' } }),
        series: [
          { name: '% entre compradores', type: 'bar', data: G.map(g => g.comp), itemStyle: { color: C.c1l, borderRadius: [3, 3, 0, 0] }, barGap: isMobile() ? '30%' : '12%', barWidth: few ? '24%' : '30%', label: lab2 },
          { name: '% de la población de usuarios de internet', type: 'bar', data: G.map(g => g.pob), itemStyle: { color: '#8FA3BA', borderRadius: [3, 3, 0, 0] }, barWidth: few ? '24%' : '30%', label: lab2 }
        ]
      }, anim), true);
      readout(G[i0]);
    }
    const c = chart('chLens');
    if (c) c.on('click', p => { if (dim === 'territorio') { readout({ g: p.name, tasa: p.value, comp: null, idx: null }); return; } sel[dim] = p.dataIndex; draw(); });
    $$('#lensSeg button').forEach(b => b.addEventListener('click', () => {
      dim = b.dataset.dim; $$('#lensSeg button').forEach(x => x.setAttribute('aria-selected', x === b)); draw();
    }));
    onVisible($('#chLens'), draw);
  })();

  /* =====================================================================
     SECCIÓN 4: bienes
     ===================================================================== */
  (function goods() {
    let yi = 4; const G = D.goods;
    function draw() {
      const t = theme(false);
      const rows = G.rows.slice().sort((a, b) => a.v[yi] - b.v[yi]);
      chart('chGoods').setOption(Object.assign({
        grid: { left: 4, right: 48, top: 8, bottom: 4, containLabel: true },
        tooltip: tip(t, { trigger: 'axis', axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(13,33,55,.04)' } },
          formatter: p => { const r = rows[p[0].dataIndex]; const d = r.v[yi] - r.v[0];
            return `<b>${r.k}</b><br>${G.years[yi]}: <b>${nf(r.v[yi])}%</b> de los compradores<br>2021: ${nf(r.v[0])}%` + (yi ? `<br>Cambio: ${d > 0 ? '+' : ''}${nf(d)} pp` : '') + `<br><span style="color:${t.text2}">Serie: ${r.v.map(nf).join(' · ')}</span>`; } }),
        xAxis: axisVal(t, { max: 80, axisLabel: { color: t.text2, formatter: '{value}%' } }),
        yAxis: axisCat(t, rows.map(r => r.k), { axisLabel: { color: t.text, fontSize: isMobile() ? 11 : 12, width: isMobile() ? 118 : 230, overflow: 'break', lineHeight: 14 } }),
        series: [
          { type: 'bar', barWidth: '58%', data: rows.map(r => ({ value: r.v[yi], itemStyle: { color: r.focus ? C.c1l : '#A9B8CB' } })), itemStyle: { borderRadius: [0, 4, 4, 0] },
            label: { show: true, position: 'right', color: t.text, fontSize: 11, fontWeight: 600, formatter: p => nf(p.value) } },
          { type: 'scatter', data: rows.map(r => r.v[0]), symbol: 'rect', symbolSize: [3, 16], itemStyle: { color: C.ink }, z: 5, silent: true, tooltip: { show: false } }
        ]
      }, anim));
    }
    $$('#goodsSeg button').forEach(b => b.addEventListener('click', () => { yi = +b.dataset.y; $$('#goodsSeg button').forEach(x => x.setAttribute('aria-pressed', x === b)); draw(); }));
    onVisible($('#chGoods'), draw);
  })();

  /* =====================================================================
     SECCIÓN 5: barreras
     ===================================================================== */
  (function barriers() {
    let v = 'no';
    const kindColor = { pref: '#5C7491', know: C.c2, trust: C.c5, pay: C.c3, other: '#5C7491' };
    const texts = {
      no: `<div class="insight" style="margin-top:0"><p>La preferencia por comprar en persona (34.4%) crece; la falta de interés baja de 24.0% a 20.3%. Hay demanda potencial frenada por otras barreras.</p></div>
        <p><b style="color:var(--gold)">Conocimiento.</b> «No sabe cómo hacerlo» sube a 18.3% (+2.7 pp): no solo el manejo de plataformas, también las formas de pagar y la complejidad de registrar tarjetas, capturar códigos y validar cargos.</p>
        <p><b style="color:#EE8B7B">Confianza.</b> La desconfianza en la seguridad de datos y tarjetas baja a 8.2%, pero sigue por encima de la desconfianza en la calidad (5.6%) o la falta de recursos (5.1%).</p>
        <p class="muted" style="font-size:var(--t-small)">Solo 3% no compra por carecer de tarjeta o banca en línea: el obstáculo de pago es la desconfianza y la complejidad, no la falta de instrumentos.</p>`,
      prob: `<div class="insight" style="margin-top:0"><p>Las entregas son el problema más frecuente (60.0%): la logística de última milla también es un reto del comercio electrónico.</p></div>
        <p><b style="color:#EE8B7B">El repunte de 2025.</b> Los problemas con la seguridad del pago bajaron de 24.9% a 15.9% entre 2022 y 2024, pero repuntaron a 17.7% en 2025; los de datos personales, de 4.6% a 6.0%.</p>
        <p class="muted" style="font-size:var(--t-small)">El riesgo percibido y la confianza intervienen en la aceptación del comercio electrónico (Pavlou, 2003). No todos los problemas son de pago: por eso la estrategia distingue logística, calidad y seguridad.</p>`
    };
    function draw() {
      const t = theme(true), c = chart('chBar');
      $('#barText').innerHTML = texts[v];
      if (v === 'no') {
        const R = D.noBuy.slice().reverse();
        $('#barTitle').textContent = 'Razones principales para no comprar por internet, 2022 y 2025';
        $('#barSub').textContent = '% de quienes no compraron. Respuesta múltiple: los porcentajes no suman 100. Barra de color: 2025; barra gris delgada: 2022.';
        $('#barDenom').textContent = 'Base: usuarios de internet que no compraron en línea en los últimos 12 meses';
        $('#barLegend').innerHTML = `<span><i style="background:${C.c2}"></i>Conocimiento</span><span><i style="background:${C.c5}"></i>Confianza</span><span><i style="background:${C.c3}"></i>Medio de pago</span><span><i style="background:#5C7491"></i>Otras</span><span><i style="background:#5D6F86;height:6px"></i>2022</span>`;
        $('#barFoot').innerHTML = '<span><b>Fuente:</b> ENDUTIH 2022–2025, INEGI.</span><span>Sin barra 2022 donde la razón no se captó de forma comparable ese año.</span>';
        c.setOption(Object.assign({
          grid: { left: 4, right: 44, top: 8, bottom: 4, containLabel: true },
          tooltip: tip(t, { trigger: 'axis', axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(255,255,255,.03)' } },
            formatter: p => { const r = R[p[0].dataIndex]; return `<b>${r.k}</b><br>2025: <b>${nf(r.b)}%</b>` + (r.a != null ? `<br>2022: ${nf(r.a)}%<br>Cambio: ${r.b - r.a > 0 ? '+' : ''}${nf(r.b - r.a)} pp` : '') + `<br><span style="color:${t.text2}">% de usuarios de internet que no compraron</span>`; } }),
          xAxis: axisVal(t, { max: 40, axisLabel: { color: t.text2, formatter: '{value}%' } }),
          yAxis: axisCat(t, R.map(r => r.k), { inverse: false, axisLabel: { color: t.text, fontSize: isMobile() ? 11 : 12, width: isMobile() ? 118 : 230, overflow: 'break', lineHeight: 15 } }),
          series: [
            { name: '2022', type: 'bar', barWidth: '22%', barGap: '18%', data: R.map(r => r.a), itemStyle: { color: '#5D6F86', borderRadius: [0, 3, 3, 0] },
              label: { show: true, position: 'right', color: t.text2, fontSize: 11, formatter: p => p.value == null ? '' : nf(p.value) } },
            { name: '2025', type: 'bar', barWidth: '40%', data: R.map(r => ({ value: r.b, itemStyle: { color: kindColor[r.kind] } })), itemStyle: { borderRadius: [0, 4, 4, 0] },
              label: { show: true, position: 'right', color: t.text, fontWeight: 700, fontSize: 13, formatter: p => nf(p.value) } }
          ]
        }, anim), true);
      } else {
        const P = D.problems;
        $('#barTitle').textContent = 'Principales problemas al comprar por internet, 2022–2025';
        $('#barSub').textContent = '% de quienes compraron en línea y tuvieron algún problema. Una persona puede reportar más de uno.';
        $('#barDenom').textContent = 'Base: personas que compraron por internet y tuvieron algún problema en los últimos 12 meses';
        const cols = [C.c1, '#5C7491', C.c4, C.c5, C.c3];
        $('#barLegend').innerHTML = P.rows.map((r, i) => `<span><i class="line" style="background:${cols[i]}"></i>${r.k}</span>`).join('');
        $('#barFoot').innerHTML = '<span><b>Fuente:</b> ENDUTIH 2022–2025, INEGI.</span><span>Otro problema (1.7% en 2025) se omite.</span>';
        c.setOption(Object.assign({
          grid: { left: 8, right: isMobile() ? 16 : 150, top: 16, bottom: 4, containLabel: true },
          tooltip: tip(t, { trigger: 'axis', axisPointer: { type: 'line', lineStyle: { color: t.axis } }, valueFormatter: v => nf(v) + '%' }),
          xAxis: axisCat(t, P.years.map(String), { boundaryGap: false }),
          yAxis: axisVal(t, { max: 70, axisLabel: { color: t.text2, formatter: '{value}%' } }),
          series: P.rows.map((r, i) => ({ name: r.k, type: 'line', data: r.v, symbol: 'circle', symbolSize: 8,
            lineStyle: { width: r.sec ? 3 : 2, color: cols[i] }, itemStyle: { color: cols[i], borderColor: C.night, borderWidth: 2 },
            endLabel: { show: !isMobile(), formatter: p => nf(p.value) + '%  ' + ({ 'Relacionado con la entrega': 'Entrega', 'Calidad del producto': 'Calidad', 'Estado del producto': 'Estado', 'Seguridad del pago': 'Seg. del pago', 'Seguridad de datos personales': 'Datos personales' })[r.k], color: t.text2, fontSize: 11 },
            label: { show: r.sec, position: r.k === 'Seguridad del pago' ? 'bottom' : 'top', color: cols[i], fontSize: 11, fontWeight: 600, formatter: p => nf(p.value) } }))
        }, anim), true);
      }
    }
    $$('#barSeg button').forEach(b => b.addEventListener('click', () => { v = b.dataset.v; $$('#barSeg button').forEach(x => x.setAttribute('aria-selected', x === b)); draw(); }));
    onVisible($('#chBar'), draw);
  })();

  /* =====================================================================
     SECCIÓN 6: explorador de segmentos
     ===================================================================== */
  (function explorer() {
    let v = 'ent';
    const regCol = { Norte: '#3A9BDC', 'Centro Norte': '#2FA98A', Centro: '#BE8A28', Sur: '#D9604C' };
    const denomNB = 'Base: usuarios de internet que no compran en línea (% que menciona cada razón)';
    const V = {
      ent: { denom: 'Base: usuarios de internet de 6 años y más · 2025', title: 'Desconfianza digital por entidad federativa, 2025',
        sub: '% de usuarios de internet que desconfían de la calidad o la seguridad de comprar, o de la seguridad de pagar, en línea. Nacional: 9.7%.',
        foot: '<span><b>Fuente:</b> ENDUTIH 2025, INEGI. Preguntas P7_22_4, P7_22_5 y P7_29=3, ponderadas.</span>',
        text: `<div><div class="tag">Dispersión</div><p>Tlaxcala (16.2%), Puebla (15.3%) y Oaxaca (15.2%) encabezan; Tamaulipas (3.4%), Chihuahua (4.5%) y Zacatecas (5.2%) registran los valores más bajos. Entre Tlaxcala y Tamaulipas hay casi cinco veces de diferencia.</p></div>
               <div><div class="tag">Lectura</div><p>El gradiente se asemeja al de las condiciones digitales, pero es una asociación, no una causa: el Centro tiene 86.6% de uso de internet y aun así la desconfianza más alta.</p></div>` },
      reg: { denom: 'Base: usuarios de internet de 6 años y más (desconfianza) · población de 6+ (internet y banca)', title: 'Desconfianza por región del Banco de México, 2025',
        sub: '% de usuarios de internet que desconfían; línea punteada: nacional 9.7%. Debajo, las condiciones digitales de cada región, en % de la población de 6 años y más.',
        foot: '<span><b>Fuente:</b> ENDUTIH 2025, INEGI. Regiones según los Reportes sobre las Economías Regionales de Banxico.</span>',
        text: `<div><div class="tag">Norte y Centro Norte</div><p>La desconfianza más baja (6.6% y 7.4%) coincide con mayor uso de internet (90.3%) y de banca móvil (38.8%) en el Norte.</p></div>
               <div><div class="tag">Centro y Sur</div><p>Superan el promedio nacional (11.9% y 10.6%). El Sur tiene menos internet (80.4%) y banca móvil (26.8%); el Centro, en cambio, tiene buena conectividad.</p></div>` },
      edad: { denom: 'Promedio de las 32 entidades · % del grupo de edad · 2025', title: 'Desconfianza en las compras en línea por grupo de edad, 2025',
        sub: 'Promedio de las 32 entidades. Aumenta con la edad y se estabiliza en un nivel alto desde los 35 años.',
        foot: '<span><b>Fuente:</b> ENDUTIH 2025, INEGI.</span>',
        text: `<div><div class="tag">Una hipótesis</div><p>Los menores casi no toman decisiones de pago, y quienes administran su propio dinero tienen más exposición a fraudes o más sensibilidad al riesgo. Es una hipótesis, no un resultado comprobado.</p></div>
               <div><div class="tag">Por entidad</div><p>Al sumar las tasas de los ocho grupos de edad, Puebla (123.5), Tlaxcala (122.8) y Oaxaca (117.4) acumulan más; Tamaulipas (28.9) y Chihuahua (37.8), menos. En los índices altos pesa sobre todo el grupo de 35 a 64 años.</p></div>` },
      sexo: { denom: denomNB, title: 'Razones para no comprar en línea, por sexo, 2025', sub: 'Las barreras son prácticamente iguales: ninguna diferencia supera 2.5 puntos.',
        foot: '<span><b>Fuente:</b> ENDUTIH 2025, INEGI.</span>',
        text: `<div><div class="tag">Sin estrategia distinta por sexo</div><p>La razón principal es la misma: preferir lo presencial (34.3% mujeres, 34.4% hombres).</p></div>
               <div><div class="tag">Matiz</div><p>Las mujeres declaran más «no sé cómo hacerlo» (+2.4 pp): conviene que los materiales paso a paso lleguen a ellas. Los hombres reportan más que no les permiten comprar (+2.1 pp).</p></div>` },
      rural: { denom: denomNB, title: 'Razones para no comprar en línea, rural y urbano, 2025', sub: 'Rural: localidades de menos de 2,500 habitantes. Urbano: 2,500 o más.',
        foot: '<span><b>Fuente:</b> ENDUTIH 2025, INEGI.</span>',
        text: `<div><div class="tag">En el campo</div><p>«No sabe cómo hacerlo» llega a 24.4%, 8 puntos más que en la ciudad: casi 1.5 veces. También pesan más la falta de recursos (+1.8) y no tener tarjeta o banca en línea (+1.6). Ahí tiene alcance el Banco del Bienestar.</p></div>
               <div><div class="tag">En la ciudad</div><p>Pesan más la preferencia presencial (35.9%) y la desconfianza. Quien conoce el procedimiento necesita razones para confiar y probar: seguridad visible y un medio que no exponga datos.</p></div>` },
      estrato: { denom: denomNB + ' · valores redondeados', title: 'Razones para no comprar en línea, por estrato socioeconómico, 2025',
        sub: 'Cada barra es el % del propio estrato que menciona la razón. Valores redondeados a enteros.',
        foot: '<span><b>Fuente:</b> ENDUTIH 2025, INEGI.</span>',
        text: `<div><div class="tag">Sube con el ingreso</div><p>La preferencia presencial pasa de cerca de 27% en el estrato bajo a casi 40% en medio alto y alto: más opciones físicas, menor costo de ir a comprar.</p></div>
               <div><div class="tag">Baja con el ingreso</div><p>«No sé cómo hacerlo» cae de 26% a 13%: la señal más nítida de un problema de adopción digital. «No le interesa» se mantiene cerca de 20% en todos los estratos.</p></div>` },
      esc: { denom: denomNB, title: 'Razón predominante para no comprar en línea, por escolaridad, 2025', sub: 'Con primaria, la razón principal es no saber cómo. Desde secundaria, preferir lo presencial, y su peso aumenta con cada nivel.',
        foot: '<span><b>Fuente:</b> ENDUTIH 2025, INEGI.</span>',
        text: `<div><div class="tag">Con más estudios</div><p>Las personas saben usar las herramientas y por eso comparan, desconfían y eligen con más criterio. El comercio electrónico tiene que ofrecer algo que supere la tienda: seguridad, rapidez y posibilidad de revisar.</p></div>
               <div><div class="tag">Con primaria</div><p>El reto es aprender el proceso: 28.9% no compra porque no sabe cómo hacerlo.</p></div>` }
    };
    function grouped(t, rows, names, cols) {
      const R = rows.slice().reverse();
      return Object.assign({
        grid: { left: isMobile() ? 116 : 212, right: 40, top: 8, bottom: 24, containLabel: false },
        tooltip: tip(t, { trigger: 'axis', axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(255,255,255,.03)' } }, valueFormatter: v => nf(v) + '%' }),
        xAxis: axisVal(t, { axisLabel: { color: t.text2, formatter: '{value}%' } }),
        yAxis: axisCat(t, R.map(r => r[0]), { axisLabel: { color: t.text, fontSize: isMobile() ? 11 : 12, width: isMobile() ? 104 : 196, overflow: 'break', lineHeight: 15 } }),
        series: names.map((n, k) => ({ name: n, type: 'bar', barGap: '10%', barWidth: names.length > 2 ? '16%' : '30%', data: R.map(r => Array.isArray(r[1]) ? r[1][k] : r[k + 1]),
          itemStyle: { color: cols[k], borderRadius: [0, 3, 3, 0] },
          label: { show: names.length <= 2, position: 'right', color: t.text2, fontSize: 10, formatter: p => nf(p.value) } }))
      }, anim);
    }
    function draw() {
      const t = theme(true), c = chart('chExp'), cfg = V[v], el = $('#chExp');
      $('#expDenom').textContent = cfg.denom; $('#expTitle').textContent = cfg.title; $('#expSub').textContent = cfg.sub;
      $('#expFoot').innerHTML = cfg.foot; $('#expText').innerHTML = cfg.text; $('#expExtra').innerHTML = ''; $('#expLegend').innerHTML = '';
      el.style.height = '';
      let opt;
      if (v === 'ent') {
        opt = Object.assign({
          tooltip: tip(t, { trigger: 'item', formatter: p => `<b>${p.name}</b><br>Desconfianza digital: <b>${nf(p.value)}%</b><br><span style="color:${t.text2}">Región ${D.region[p.name]} · Nacional 9.7%</span><br><span style="color:${t.text2}">% de usuarios de internet 6+, 2025</span>` }),
          visualMap: { min: 3, max: 17, orient: 'horizontal', left: 'center', bottom: 4, itemWidth: 10, itemHeight: 200, text: ['17%', '3%'], textStyle: { color: t.text2, fontSize: 11 }, inRange: { color: ['#1A2E48', '#5B5A55', '#B98A3A', '#F0C978'] } },
          series: [{ type: 'map', map: 'mx', aspectScale: .92, layoutCenter: ['50%', isMobile() ? '44%' : '45%'], layoutSize: isMobile() ? '100%' : '95%',
            data: Object.keys(D.distrust).map(n => ({ name: n, value: D.distrust[n] })), itemStyle: { borderColor: C.night, borderWidth: .8 },
            emphasis: { label: { show: false }, itemStyle: { areaColor: C.sky } }, select: { disabled: true } }]
        }, anim);
        el.style.height = isMobile() ? Math.round(Math.min(innerWidth * 1.05, 440)) + 'px' : '';
        $('#expExtra').innerHTML = '<div class="region-strip">' + Object.entries(D.distrustRegion).map(([k, val]) => `<div style="--rc:${regCol[k] || '#91A6BF'}"><div class="k">${k}</div><div class="v">${nf(val)}%</div></div>`).join('') + '</div>';
      } else if (v === 'reg') {
        const R = ['Norte', 'Centro Norte', 'Centro', 'Sur'];
        opt = Object.assign({
          grid: { left: 4, right: 16, top: 30, bottom: 4, containLabel: true },
          tooltip: tip(t, { trigger: 'item', formatter: p => `<b>${p.name}</b><br>Desconfianza: <b>${nf(p.value)}%</b><br><span style="color:${t.text2}">% de usuarios de internet 6+</span>` }),
          xAxis: axisCat(t, R), yAxis: axisVal(t, { max: 14, axisLabel: { color: t.text2, formatter: '{value}%' } }),
          series: [{ type: 'bar', barWidth: '46%', data: R.map(r => ({ value: D.distrustRegion[r], itemStyle: { color: regCol[r] } })), itemStyle: { borderRadius: [4, 4, 0, 0] },
            label: { show: true, position: 'top', color: t.text, fontFamily: HEAD, fontWeight: 700, fontSize: 15, formatter: p => nf(p.value) + '%' },
            markLine: { silent: true, symbol: 'none', lineStyle: { color: C.onNight2, type: 'dashed' }, label: { show: false }, data: [{ yAxis: 9.7 }] } }]
        }, anim);
        el.style.height = '360px';
        const Q = D.requisites, idx = r => Q.groups.indexOf(r);
        $('#expExtra').innerHTML = `<div class="scroll-x"><table class="data"><thead><tr><th>Región</th><th>Desconfianza</th><th>Usa internet</th><th>Usa banca en línea o móvil</th></tr></thead><tbody>` +
          ['Nacional'].concat(R).map(r => `<tr><td>${r}</td><td>${nf(D.distrustRegion[r])}%</td><td>${nf(Q.internet[idx(r)])}%</td><td>${nf(Q.banca[idx(r)])}%</td></tr>`).join('') + '</tbody></table></div>';
      } else if (v === 'edad') {
        const A = D.distrustAge;
        opt = Object.assign({
          grid: { left: 4, right: 40, top: 8, bottom: 4, containLabel: true },
          tooltip: tip(t, { trigger: 'item', formatter: p => `<b>${p.name} años</b><br>Desconfianza: <b>${nf(p.value)}%</b><br><span style="color:${t.text2}">Promedio de las 32 entidades</span>` }),
          xAxis: axisVal(t, { max: 15, axisLabel: { color: t.text2, formatter: '{value}%' } }),
          yAxis: axisCat(t, A.map(a => a[0]).reverse(), { axisLabel: { color: t.text, fontSize: 12 } }),
          series: [{ type: 'bar', barWidth: '62%', data: A.map(a => ({ value: a[1], itemStyle: { color: a[0] === '55–64' ? C.gold : C.c1 } })).reverse(), itemStyle: { borderRadius: [0, 4, 4, 0] },
            label: { show: true, position: 'right', color: t.text, fontWeight: 600, formatter: p => nf(p.value) + '%' } }]
        }, anim);
        el.style.height = '400px';
        const S = Object.entries(D.distrustAgeSum).sort((a, b) => b[1] - a[1]);
        $('#expExtra').innerHTML = `<details class="table-toggle"><summary>Índice acumulado por entidad (suma de 8 tasas por edad, no es % de personas)</summary><div class="scroll-x"><table class="data"><thead><tr><th>Entidad</th><th>Índice acumulado</th></tr></thead><tbody>` +
          S.map(s => `<tr><td>${s[0]}</td><td>${nf(s[1])}</td></tr>`).join('') + '</tbody></table></div></details>';
      } else if (v === 'sexo') {
        $('#expLegend').innerHTML = `<span><i style="background:${C.c2}"></i>Mujeres</span><span><i style="background:${C.c1}"></i>Hombres</span>`;
        opt = grouped(t, D.reasonsSex, ['Mujeres', 'Hombres'], [C.c2, C.c1]);
      } else if (v === 'rural') {
        $('#expLegend').innerHTML = `<span><i style="background:${C.c4}"></i>Rural (&lt;2,500 hab.)</span><span><i style="background:${C.c1}"></i>Urbano (2,500+ hab.)</span>`;
        opt = grouped(t, D.reasonsRural, ['Rural', 'Urbano'], [C.c4, C.c1]);
      } else if (v === 'estrato') {
        const cols = ['#2B5C8A', C.c1, '#8FC6EA', C.c2];
        $('#expLegend').innerHTML = D.reasonsStrata.groups.map((g, i) => `<span><i style="background:${cols[i]}"></i>${g}</span>`).join('');
        opt = grouped(t, D.reasonsStrata.rows, D.reasonsStrata.groups, cols);
        opt.series.forEach(s => { s.label = { show: true, position: 'right', color: t.text2, fontSize: 10, formatter: p => p.value }; });
      } else if (v === 'esc') {
        const E = D.reasonsEdu;
        $('#expLegend').innerHTML = `<span><i style="background:${C.c2}"></i>No sabe cómo hacerlo</span><span><i style="background:${C.c1}"></i>Prefiere hacerlo en persona</span>`;
        opt = Object.assign({
          grid: { left: 4, right: 12, top: 30, bottom: 4, containLabel: true },
          tooltip: tip(t, { trigger: 'item', formatter: p => `<b>${p.name}</b><br>Razón predominante: ${E[p.dataIndex][2]}<br><b>${nf(p.value)}%</b> de quienes no compran en ese nivel` }),
          xAxis: axisCat(t, E.map(e => e[0])), yAxis: axisVal(t, { max: 60, axisLabel: { color: t.text2, formatter: '{value}%' } }),
          series: [{ type: 'bar', barWidth: '50%', data: E.map(e => ({ value: e[1], itemStyle: { color: e[2].startsWith('No sabe') ? C.c2 : C.c1 } })), itemStyle: { borderRadius: [4, 4, 0, 0] },
            label: { show: true, position: 'top', color: t.text, fontFamily: HEAD, fontWeight: 700, fontSize: 14, formatter: p => nf(p.value) + '%' } }]
        }, anim);
        el.style.height = '380px';
      }
      c.resize();
      c.setOption(opt, true);
    }
    $$('#expList button').forEach(b => b.addEventListener('click', () => { v = b.dataset.v; $$('#expList button').forEach(x => x.setAttribute('aria-selected', x === b)); draw(); }));
    onVisible($('#chExp'), draw);
  })();

  /* =====================================================================
     SECCIÓN 7
     ===================================================================== */
  // contadores
  $$('.fact .v[data-count]').forEach(el => {
    const tgt = +el.dataset.count, dec = +el.dataset.dec, final = el.textContent;
    onVisible(el, () => {
      if (RM) return;
      const t0 = performance.now(), pre = final.startsWith('≈') ? '≈' : '';
      (function f(now) { const k = Math.min(1, (now - t0) / 1200), e = 1 - Math.pow(1 - k, 3);
        el.textContent = pre + nf(tgt * e, dec) + ' M'; if (k < 1) requestAnimationFrame(f); else el.textContent = final; })(t0);
    });
  });
  onVisible($('#chAltas'), () => {
    const t = theme(true), A = D.codiAltas;
    chart('chAltas').setOption(Object.assign({
      grid: { left: 4, right: 8, top: 26, bottom: 4, containLabel: true },
      tooltip: tip(t, { trigger: 'axis', axisPointer: { type: 'shadow', shadowStyle: { color: 'rgba(255,255,255,.04)' } }, formatter: p => `<b>${p[0].name}</b><br>${nf(p[0].value)} millones de cuentas validadas` + (p[0].dataIndex === 0 ? '<br>Desde el 24 de mayo' : p[0].dataIndex === 6 ? '<br>Hasta septiembre' : '') }),
      xAxis: axisCat(t, A.years), yAxis: axisVal(t, { axisLabel: { color: t.text2, formatter: '{value} M' } }),
      series: [{ type: 'bar', barWidth: '56%', data: A.v.map((v, i) => ({ value: v, itemStyle: { color: (i === 0 || i === 6) ? 'rgba(98,200,245,.4)' : C.sky } })), itemStyle: { borderRadius: [4, 4, 0, 0] },
        label: { show: true, position: 'top', color: t.text, fontWeight: 600, formatter: p => nf(p.value) } }]
    }, anim));
  });
  onVisible($('#chUso'), () => {
    const t = theme(true), U = D.codiUse;
    chart('chUso').setOption(Object.assign({
      grid: { left: 4, right: 46, top: 26, bottom: 4, containLabel: true },
      tooltip: tip(t, { trigger: 'axis', axisPointer: { type: 'line', lineStyle: { color: t.axis } }, valueFormatter: v => nf(v) + ' mil cuentas' }),
      xAxis: axisCat(t, U.years, { boundaryGap: false }), yAxis: axisVal(t, { max: 600, axisLabel: { color: t.text2 } }),
      series: [
        { name: 'Pagadores nuevos', type: 'line', data: U.pay, symbol: 'circle', symbolSize: 8, lineStyle: { width: 2.5, color: C.sky }, itemStyle: { color: C.sky, borderColor: C.deep, borderWidth: 2 },
          label: { show: true, position: 'top', distance: 8, color: C.sky, fontSize: 11, fontWeight: 700, formatter: p => (p.dataIndex === 3 || p.dataIndex === 6) ? nf(p.value) : '' } },
        { name: 'Cobradores nuevos', type: 'line', data: U.cob, symbol: 'circle', symbolSize: 8, lineStyle: { width: 2.5, color: C.gold }, itemStyle: { color: C.gold, borderColor: C.deep, borderWidth: 2 },
          label: { show: true, position: 'right', distance: 8, color: C.gold, fontSize: 11, fontWeight: 700, formatter: p => (p.dataIndex === 1 || p.dataIndex === 6) ? nf(p.value) : '' } }
      ]
    }, anim));
  });
  (function requisites() {
    const Q = D.requisites, seg = $('#reqSeg'), box = $('#gapViz');
    seg.innerHTML = Q.groups.map((g, i) => `<button type="button" aria-pressed="${i === 0}" data-i="${i}">${g}</button>`).join('');
    const rows = [['internet', 'Usa internet', 'Requisito 1: conexión'], ['smartphone', 'Usa teléfono inteligente', 'Requisito 2: dispositivo'], ['banca', 'Usa banca en línea o móvil', 'Requisito 3: app bancaria']];
    box.innerHTML = rows.map(r => `<div class="gap-row ${r[0] === 'banca' ? 'weak' : ''}"><div class="lbl">${r[1]}<small>${r[2]}</small></div><div class="gap-track"><div class="gap-fill" data-k="${r[0]}"></div></div><div class="val num" data-v="${r[0]}"></div></div>`).join('');
    let gi = 0, shown = false;
    function set() { rows.forEach(r => { const v = Q[r[0]][gi]; $(`.gap-fill[data-k="${r[0]}"]`, box).style.width = shown ? v + '%' : '0'; $(`[data-v="${r[0]}"]`, box).textContent = nf(v) + '%'; }); }
    $$('button', seg).forEach(b => b.addEventListener('click', () => { gi = +b.dataset.i; $$('button', seg).forEach(x => x.setAttribute('aria-pressed', x === b)); set(); }));
    set(); onVisible(box, () => { shown = true; set(); });
  })();
  onVisible($('#chPay'), () => {
    const t = theme(true), P = D.payMethods.slice().reverse();
    chart('chPay').setOption(Object.assign({
      grid: { left: 4, right: 40, top: 4, bottom: 4, containLabel: true },
      tooltip: tip(t, { trigger: 'item', formatter: p => `<b>${p.name}</b><br><b>${nf(p.value)}%</b> de quienes pagaron por internet, 2025` }),
      xAxis: axisVal(t, { max: 100, interval: 20, axisLabel: { color: t.text2, formatter: '{value}%' } }),
      yAxis: axisCat(t, P.map(p => p[0]), { axisLabel: { color: t.text, fontSize: 11, width: isMobile() ? 96 : 170, overflow: 'break', lineHeight: 13 } }),
      series: [{ type: 'bar', barWidth: '60%', data: P.map(p => ({ value: p[1], itemStyle: { color: p[0] === 'CoDi' ? C.gold : 'rgba(98,200,245,.55)' } })), itemStyle: { borderRadius: [0, 4, 4, 0] },
        label: { show: true, position: 'right', color: t.text, fontWeight: 600, formatter: p => nf(p.value) } }]
    }, anim));
  });
  onVisible($('#chBranches'), () => {
    const t = theme(true), B = D.branches.slice().reverse();
    chart('chBranches').setOption(Object.assign({
      grid: { left: 4, right: 50, top: 4, bottom: 4, containLabel: true },
      tooltip: tip(t, { trigger: 'item', formatter: p => `<b>${p.name}</b><br>${nInt(p.value)} sucursales, 2026` }),
      xAxis: axisVal(t, { axisLabel: { color: t.text2, formatter: v => nInt(v) } }),
      yAxis: axisCat(t, B.map(b => b[0]), { axisLabel: { color: t.text, fontSize: 11 } }),
      series: [{ type: 'bar', barWidth: '64%', data: B.map(b => ({ value: b[1], itemStyle: { color: b[0] === 'Banco del Bienestar' ? C.gold : 'rgba(98,200,245,.5)' } })), itemStyle: { borderRadius: [0, 4, 4, 0] },
        label: { show: true, position: 'right', color: t.text, fontSize: 11, formatter: p => nInt(p.value) } }]
    }, anim));
  });

  /* ---------- simulación CoDi ---------- */
  (function demo() {
    const scr = $$('#screen .scr'), steps = $$('#demoSteps li');
    let pm = null, timer = null;
    function go(i) {
      scr.forEach((s, k) => { s.classList.toggle('on', k === i); s.setAttribute('aria-hidden', k !== i); s.inert = k !== i; });
      steps.forEach((s, k) => s.classList.toggle('on', k <= i));
      clearInterval(timer);
      if (i === 1) {
        let s = 300; const el = $('#qrTimer');
        timer = setInterval(() => { s--; el.textContent = 'Tu código expira en ' + Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); if (s <= 0) clearInterval(timer); }, 1000);
      }
    }
    // QR decorativo: patrón determinista, no codifica datos
    (function qr() {
      const n = 25, cell = 6; let s = 7; const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
      let r = '';
      const finder = (x, y) => `<rect x="${x * cell}" y="${y * cell}" width="${7 * cell}" height="${7 * cell}" fill="#0D2137"/><rect x="${(x + 1) * cell}" y="${(y + 1) * cell}" width="${5 * cell}" height="${5 * cell}" fill="#fff"/><rect x="${(x + 2) * cell}" y="${(y + 2) * cell}" width="${3 * cell}" height="${3 * cell}" fill="#0D2137"/>`;
      const inF = (x, y) => (x < 8 && y < 8) || (x > n - 9 && y < 8) || (x < 8 && y > n - 9);
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!inF(x, y) && rnd() > .52) r += `<rect x="${x * cell}" y="${y * cell}" width="${cell}" height="${cell}" fill="#0D2137"/>`;
      $('#qrWrap').innerHTML = `<svg viewBox="0 0 ${n * cell} ${n * cell}" role="img" aria-label="Código QR ilustrativo, sin datos">${r}${finder(0, 0)}${finder(n - 7, 0)}${finder(0, n - 7)}<rect x="${(n / 2 - 2.5) * cell}" y="${(n / 2 - 2.5) * cell}" width="${5 * cell}" height="${5 * cell}" rx="4" fill="#D6AC55"/></svg>`;
    })();
    $$('#screen .pm').forEach(b => b.addEventListener('click', () => {
      pm = b.dataset.pm; $$('#screen .pm').forEach(x => x.classList.toggle('sel', x === b));
      $('#pmInfo').hidden = pm !== 'codi'; $('#toQR').disabled = pm !== 'codi';
      $('#toQR').textContent = pm === 'codi' ? (mode === 'qr' ? 'Generar QR CoDi' : 'Enviar solicitud de cobro') : pm ? 'En esta simulación, elige CoDi' : 'Continuar';
    }));
    let mode = 'qr';
    $$('#pmInfo .pm-mode button').forEach(b => b.addEventListener('click', () => {
      mode = b.dataset.mode; $$('#pmInfo .pm-mode button').forEach(x => x.setAttribute('aria-checked', String(x === b)));
      $('#toQR').textContent = mode === 'qr' ? 'Generar QR CoDi' : 'Enviar solicitud de cobro';
    }));
    // con «solicitud a mi celular» el cobro llega directo a la app del banco (sin QR)
    $('#toQR').addEventListener('click', () => go(mode === 'qr' ? 1 : 2));
    $('#toBank').addEventListener('click', () => go(2));
    $('#doPay').addEventListener('click', () => {
      const dots = $$('#pin i'); const btn = $('#doPay'); btn.disabled = true;
      dots.forEach((d, k) => setTimeout(() => d.classList.add('f'), RM ? 0 : 160 * (k + 1)));
      setTimeout(() => { go(3); btn.disabled = false; dots.forEach(d => d.classList.remove('f')); }, RM ? 50 : 900);
    });
    $('#restart').addEventListener('click', () => { pm = null; $$('#screen .pm').forEach(x => x.classList.remove('sel')); $('#pmInfo').hidden = true; $('#toQR').disabled = true; $('#toQR').textContent = 'Continuar'; go(0); });
    go(0);
  })();

  /* =====================================================================
     SECCIÓN 8: coefficient plot (SVG propio)
     ===================================================================== */
  /* =====================================================================
     SECCIÓN 9
     ===================================================================== */
  // ejes
  $$('.axes-tabs button').forEach(b => b.addEventListener('click', () => {
    $$('.axes-tabs button').forEach(x => x.setAttribute('aria-selected', x === b));
    $$('.axis-panel').forEach(p => p.classList.toggle('on', p.dataset.p === b.dataset.ax));
    if (b.dataset.ax === '2') { ensureEC().then(() => setTimeout(bancaMap, 30)); setTimeout(() => bbMap.start(), 40); }
  }));
  // recorrido ANTAD
  (function journey() {
    const J = $('#journey'), bs = $$('button', J), fill = $('.fill', J);
    function set(i) {
      bs.forEach((b, k) => { b.classList.toggle('done', k <= i); b.classList.toggle('cur', k === i); b.setAttribute('aria-current', k === i ? 'step' : 'false'); });
      const a = bs[0].offsetTop + 20, z = bs[i].offsetTop + 20; fill.style.height = (z - a) + 'px'; fill.style.top = a + 'px';
    }
    bs.forEach((b, i) => b.addEventListener('click', () => set(i)));
    new MutationObserver(() => set(bs.findIndex(b => b.classList.contains('cur')))).observe(J.closest('.axis-panel'), { attributes: true, attributeFilter: ['class'] });
    set(0);
  })();
  function bancaMap() {
    const el = $('#chBancaMap'); if (!el || !el.offsetWidth) return;
    const t = theme(true);
    chart('chBancaMap').setOption(Object.assign({
      tooltip: tip(t, { trigger: 'item', formatter: p => `<b>${p.name}</b><br>Usa banca en línea o móvil: <b>${nf(p.value)}%</b><br><span style="color:${t.text2}">% de la población de 6+, 2025</span>` }),
      visualMap: { min: 15, max: 50, orient: 'horizontal', left: 'center', bottom: 0, itemWidth: 10, itemHeight: 180, text: ['50%', '15%'], textStyle: { color: t.text2, fontSize: 11 }, inRange: { color: ['#4A2E2A', '#8A5A2E', '#4FB6C9', '#CDEFFB'] } },
      series: [{ type: 'map', map: 'mx', aspectScale: .92, layoutCenter: ['50%', '42%'], layoutSize: '105%', data: Object.keys(D.banca).map(n => ({ name: n, value: D.banca[n] })),
        itemStyle: { borderColor: C.night, borderWidth: .7 }, emphasis: { label: { show: false }, itemStyle: { areaColor: C.gold } }, select: { disabled: true } }]
    }, anim));
    chart('chBancaMap').resize();
  }

  // arquitectura institucional
  (function arch() {
    const svg = $('#archSvg');
    const N = [
      { id: 'bx', n: 'Banco de México', s: 'Operador de CoDi y SPEI', x: 320, y: 90, ax: 'Eje 1 · Confianza', r: [
        'Convoca el convenio entre los agentes, conforme a la Ley de Economía Digital para Pagos Digitales y Electrónicos.',
        'Establece un estándar común: CoDi a no más de dos toques, registro simplificado, límites de pago configurables y avisos contra fraudes.',
        'Otorga el sello «Paga con CoDi, es rápido, seguro y sin comisiones» a comercios ANTAD que integren CoDi.',
        'Mide nuevas cuentas validadas y primeros pagos con CoDi.'] },
      { id: 'an', n: 'ANTAD', s: 'y cadenas asociadas', x: 535, y: 215, ax: 'Eje 2 · Conocimiento', r: [
        'Convierte la infraestructura existente en hábito: es donde millones ya compran todos los días.',
        'Campaña en redes, tiendas, sitios web y espectaculares; QR informativo en cada mostrador y promotores capacitados.',
        'Integra CoDi en la pasarela digital de cada tienda asociada.',
        'Evalúa escaneos del QR, pagos con CoDi en pasarela y clientes interesados en tienda.'] },
      { id: 'bb', n: 'Banco del Bienestar', s: '3,149 sucursales', x: 480, y: 420, ax: 'Eje 3 · Inclusión financiera', r: [
        'Amplía el alcance más allá de la población ya bancarizada gracias a su red de sucursales.',
        'Promueve cuentas de ahorro para que la liquidez no se retire de inmediato en efectivo.',
        'Habilita en su app la activación asistida de CoDi, con límites de pago y aviso por operación.'] },
      { id: 'sb', n: 'Secretaría del Bienestar', s: 'Servidores de la Nación', x: 160, y: 420, ax: 'Eje 3 · Inclusión financiera', r: [
        'Acompaña en sucursales a quienes estén interesados en activar y registrar CoDi: personas adultas mayores, beneficiarios o clientes en general.',
        'El acompañamiento es siempre voluntario y no tiene relación con la entrega de apoyos sociales.',
        'Busca que una primera experiencia guiada reduzca el desconocimiento y la desconfianza.'] },
      { id: 'cf', n: 'CONDUSEF', s: 'Respaldo al usuario', x: 105, y: 215, ax: 'Eje 1 · Confianza', r: [
        'Atiende quejas relacionadas con pagos digitales, incluido CoDi.',
        'Difunde educación financiera y de seguridad digital: nunca compartir códigos, reconocer cobros falsos, línea de atención.',
        'Consolida la confianza con un respaldo institucional cuando algo sale mal.'] },
      { id: 'in', n: 'INEGI', s: 'Evidencia y evaluación', x: 320, y: 270, ax: 'Transversal · Evidencia', r: [
        'Con la ENDUTIH establece la línea base para focalizar estados según conectividad y barreras.',
        'Mide el impacto del piloto comparando grupos de tratamiento y control.',
        'Monitorea si la desconfianza y la falta de habilidades disminuyen; informa las decisiones de escalamiento.'] }
    ];
    const E = [['bx', 'an', 'Sello y estándar en pasarelas'], ['bx', 'bb', 'Estándar en la app y activación asistida'], ['bx', 'cf', 'Seguridad y respaldo al usuario'], ['an', 'in', 'Datos de QR y pasarelas'],
      ['bb', 'sb', 'Acompañamiento en sucursales'], ['bx', 'in', 'Cuentas validadas y primeros pagos'], ['in', 'sb', 'Focalización territorial'], ['in', 'bb', 'Línea base y evaluación'], ['cf', 'sb', 'Educación en seguridad digital'], ['in', 'cf', 'Indicador de seguridad (ENDUTIH)']];
    const byId = Object.fromEntries(N.map(n => [n.id, n]));
    let html = '';
    E.forEach(e => { const a = byId[e[0]], b = byId[e[1]]; html += `<path class="lk" data-a="${e[0]}" data-b="${e[1]}" d="M${a.x} ${a.y} Q ${(a.x + b.x) / 2 + (b.y - a.y) * .12} ${(a.y + b.y) / 2 - (b.x - a.x) * .12} ${b.x} ${b.y}"><title>${e[2]}</title></path>`; });
    N.forEach(n => {
      const R = n.id === 'in' ? 42 : 50;
      html += `<g class="nd" data-id="${n.id}" tabindex="0" role="button" aria-label="${n.n}: ${n.s}" transform="translate(${n.x},${n.y})">
        <circle class="c" r="${R}"/>
        <text class="in" text-anchor="middle" y="${n.n.length > 14 ? -4 : 5}">${n.n.length > 14 ? n.n.split(' ').slice(0, 2).join(' ') : n.n}</text>
        ${n.n.length > 14 ? `<text class="in" text-anchor="middle" y="12">${n.n.split(' ').slice(2).join(' ')}</text>` : ''}
        <text class="s" text-anchor="middle" y="${R + 18}">${n.s}</text></g>`;
    });
    svg.innerHTML = html;
    function sel(id) {
      const n = byId[id];
      $$('.nd', svg).forEach(g => { const on = g.dataset.id === id; g.classList.toggle('sel', on); g.setAttribute('aria-pressed', on); });
      $$('.lk', svg).forEach(p => { const hot = p.dataset.a === id || p.dataset.b === id; p.classList.toggle('hot', hot); p.classList.toggle('flow', hot && !RM); });
      const partners = E.filter(e => e[0] === id || e[1] === id).map(e => `<li><b>${byId[e[0] === id ? e[1] : e[0]].n}:</b> ${e[2].charAt(0).toLowerCase() + e[2].slice(1)}</li>`).join('');
      $('#roleCard').innerHTML = `<span class="axis-chip">${n.ax}</span><h3>${n.n}</h3><p class="muted" style="font-size:var(--t-small);margin-bottom:var(--s3)">${n.s}</p><ul>${n.r.map(x => `<li>${x}</li>`).join('')}</ul>
        <p class="fig-title" style="font-size:.9rem;margin-top:var(--s4)">Colabora con</p><ul>${partners}</ul><p class="hint">Rol propuesto en la estrategia; no describe acuerdos vigentes.</p>`;
    }
    $$('.nd', svg).forEach(g => { g.addEventListener('click', () => sel(g.dataset.id)); g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sel(g.dataset.id); } }); });
    sel('bx');
  })();

  // fases
  (function phases() {
    const PH = [
      { n: 'Piloto', y: 'Años 0–2', c: '#D6AC55', obj: 'Distinguir si los resultados obedecen al diseño de la intervención o a la infraestructura, en una entidad con condiciones de acceso casi completas.',
        bar: 'Baja adopción de banca móvil y de CoDi pese a buena conectividad.', act: 'Los tres ejes: Banxico y CONDUSEF; ANTAD en Monterrey; Banco del Bienestar en municipios del sur del estado.',
        acc: 'Homologación de apps, pasarela y QR en tiendas ANTAD, activación asistida. Módulo de aprendizaje sin fines evaluativos en pocas sucursales de un estado del Sur.',
        ind: 'Nuevas cuentas validadas y primeros pagos (Banxico); pagos en pasarela y escaneos (ANTAD); personas atendidas, tiempo de activación asistida, personal y repetición del pago.' },
      { n: 'Fase 1 · Réplica', y: 'Años 2–4', c: '#62C8F5', obj: 'Trasladar el modelo con ajustes mínimos a entidades que comparten las condiciones del piloto.',
        bar: 'Hábito de compra ya consolidado; incluye las cinco entidades con mayor uso de banca móvil.', act: 'ANTAD y sus cadenas como agente principal (Eje 2).',
        acc: 'Réplica del piloto. Estas entidades sirven como grupo de comparación durante el piloto, por lo que ingresan con línea base medida y apps ya homologadas. La Ciudad de México alcanza también municipios conurbados del Estado de México, cuyo efecto no podrá aislarse.',
        ind: 'Primer pago con CoDi, participación en pasarelas y escaneos de QR, y seguridad sin retroceso.' },
      { n: 'Fase 2 · Centro y Bajío', y: 'Años 4–6', c: '#2FA98A', obj: 'Pasar de informar a convencer y capacitar en la fase de mayor volumen (incluye Estado de México y Jalisco).',
        bar: 'Preferencia por la compra presencial; en algunas, uso de banca móvil entre los más bajos (Guanajuato 23.5%, Zacatecas 22.4%).', act: 'ANTAD con promotores; apoyo de los demás ejes.',
        acc: 'Promotores, compra en línea con pago al recoger, incentivos de bienvenida y talleres de habilidades digitales. Puede dividirse en dos tandas de un año.',
        ind: 'Mismos tres criterios, evaluados para el conjunto de entidades de la fase.' },
      { n: 'Fase 3 · Sur', y: 'Años 6–8', c: '#D9604C', obj: 'Llegar con el modelo validado a las entidades con menor proporción de compradores. Va al final por validación, no por menor prioridad.',
        bar: 'Desconocimiento del proceso y baja necesidad percibida. Chiapas y Oaxaca, únicas con menos de 80% de usuarios de internet.', act: 'Banco del Bienestar y Secretaría del Bienestar (Eje 3).',
        acc: 'Activación asistida y primer pago acompañado, con mesas de orientación ya ensayadas desde el piloto.',
        ind: 'Mismos tres criterios; aquí se evalúa el efecto sobre la población más excluida.' }
    ];
    const track = $('#phTrack'); let cur = 0;
    track.innerHTML = PH.map((p, i) => `<button role="tab" aria-selected="${i === 0}" data-i="${i}" style="--pc:${p.c}"><b>${p.n}</b><span>${p.y}</span></button>`).join('');
    const states = Object.keys(D.penetration);
    function draw() {
      const p = PH[cur], list = states.filter(s => D.phaseOf(s) === cur).sort((a, b) => D.penetration[b] - D.penetration[a]);
      $('#phInfo').innerHTML = `<dl><dt>Objetivo</dt><dd>${p.obj}</dd><dt>Entidades (${list.length})</dt><dd><div class="chips">${list.map(s => `<span>${s} · ${nf(D.penetration[s])}%</span>`).join('')}</div></dd>
        <dt>Barrera predominante</dt><dd>${p.bar}</dd><dt>Actores principales</dt><dd>${p.act}</dd><dt>Acciones</dt><dd>${p.acc}</dd><dt>Evaluación</dt><dd>${p.ind}</dd>
        <dt>Para avanzar</dt><dd>Cumplir los umbrales al mes 18. Si no se alcanzan, la siguiente fase no inicia y la actual se extiende un año con ajustes.</dd></dl>`;
      $$('button', track).forEach(b => b.setAttribute('aria-selected', +b.dataset.i === cur));
      const t = theme(true);
      chart('chPhase') && chart('chPhase').setOption(Object.assign({
        tooltip: tip(t, { trigger: 'item', formatter: q => { const ph = D.phaseOf(q.name); return `<b>${q.name}</b><br>${PH[ph].n} (${PH[ph].y})<br><span style="color:${t.text2}">${nf(D.penetration[q.name])}% de la población 6+ compra en línea</span>`; } }),
        series: [{ type: 'map', map: 'mx', aspectScale: .92, layoutCenter: ['50%', '50%'], layoutSize: '100%', select: { disabled: true },
          data: states.map(s => { const ph = D.phaseOf(s), on = ph === cur, hx = PH[ph].c; return { name: s, value: ph, itemStyle: on ? { areaColor: hx + '40', borderColor: hx, borderWidth: 1.6, borderType: 'dashed' } : { areaColor: 'rgba(169,187,209,.08)' } }; }),
          itemStyle: { borderColor: C.night, borderWidth: .8 }, emphasis: { label: { show: false }, itemStyle: { areaColor: '#fff' } } }]
      }, anim));
    }
    $$('button', track).forEach(b => b.addEventListener('click', () => { cur = +b.dataset.i; draw(); }));
    track.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { cur = (cur + (e.key === 'ArrowRight' ? 1 : 3)) % 4; draw(); $(`button[data-i="${cur}"]`, track).focus(); } });
    onVisible($('#chPhase'), draw);
  })();

  /* =====================================================================
     PILOTO: uso de CoDi por entidad (ENDUTIH 2025)
     ===================================================================== */
  (function codiState() {
    const el = $('#chCodiState'); if (!el) return;
    const regCol = { Nacional: '#91A6BF', Norte: '#3A9BDC', 'Centro Norte': '#2FA98A', Centro: '#BE8A28', Sur: '#D9604C' };
    $('#codiRegions').innerHTML = Object.entries(D.codiRegion).map(([k, v]) => `<div style="--rc:${regCol[k]}"><div class="k">${k}</div><div class="v">${nf(v)}%</div></div>`).join('');
    const sorted = Object.entries(D.codiState).sort((a, b) => b[1] - a[1]);
    const li = (s, i) => `<li${s[0] === 'Nuevo León' ? ' class="hl"' : ''}><span class="i">${i}</span><span>${s[0]}</span><span class="val">${nf(s[1])}%</span></li>`;
    $('#codiRank').innerHTML = '<li class="rank-split">Más alto</li>' + sorted.slice(0, 5).map((s, i) => li(s, i + 1)).join('') + '<li class="rank-split">Más bajo</li>' + sorted.slice(-5).map((s, i) => li(s, 28 + i)).join('');
    onVisible(el, () => {
      const t = theme(true);
      chart('chCodiState').setOption(Object.assign({
        tooltip: tip(t, { trigger: 'item', formatter: p => `<b>${p.name}</b><br>Ha usado CoDi: <b>${nf(p.value)}%</b><br><span style="color:${t.text2}">% de quienes pagan por internet, 2025 · Nacional 6.1%</span>` + ((p.name === 'Chiapas' || p.name === 'Guerrero') ? `<br><span style="color:${C.gold}">Estimación con CV mayor a 30%</span>` : '') }),
        visualMap: { min: 3, max: 13, orient: 'horizontal', left: 'center', bottom: 0, itemWidth: 10, itemHeight: 180, text: ['13%', '3%'], textStyle: { color: t.text2, fontSize: 11 }, inRange: { color: ['#163A5E', '#2A6E9E', '#62C8F5', '#E6F7FF'] } },
        series: [{ type: 'map', map: 'mx', aspectScale: .92, layoutCenter: ['50%', '45%'], layoutSize: '100%', select: { disabled: true },
          data: Object.keys(D.codiState).map(n => ({ name: n, value: D.codiState[n], itemStyle: n === 'Nuevo León' ? { borderColor: C.gold, borderWidth: 2.2 } : undefined })),
          itemStyle: { borderColor: C.night, borderWidth: .8 }, emphasis: { label: { show: false }, itemStyle: { areaColor: C.gold } } }]
      }, anim), true);
    });
  })();

  /* =====================================================================
     PROYECCIÓN 2025–2030
     ===================================================================== */
  (function projection() {
    const el = $('#chProj'); if (!el) return;
    const P = D.projection, base24 = P.obs[11];
    const SC = { alto: { n: 'Alto (Holt)', c: '#EE8B7B' }, base: { n: 'Base (promedio)', c: C.sky }, bajo: { n: 'Bajo (tendencia lineal)', c: C.gold } };
    const cats = P.labels.concat(P.fyears.map(y => y + 'e'));
    let sc = 'all', yr = 2030;
    const fmtM = v => nInt(v);
    function rows() {
      const k = yr - 2025;
      $('#projReadK').textContent = 'Escenarios para ' + yr;
      $('#projRows').innerHTML = ['alto', 'base', 'bajo'].map(s => { const v = P[s][k], g = (v / base24 - 1) * 100;
        return `<div class="pr${sc !== 'all' && sc !== s ? ' dim' : ''}" style="--pc:${SC[s].c}"><span class="pr-n">${SC[s].n}</span><span class="pr-v num">${fmtM(v)}</span><span class="pr-g num">${g >= 0 ? '+' : '−'}${nf(Math.abs(g))}%</span></div>`; }).join('');
      $$('.proj-kpis .pk[data-sc]').forEach(p => p.classList.toggle('dim', sc !== 'all' && p.dataset.sc !== sc));
    }
    function draw() {
      const t = theme(true), mob = isMobile();
      const pad = new Array(11).fill(null);
      const line = s => pad.concat([base24]).concat(P[s]);
      const on = s => sc === 'all' || sc === s;
      const yi = cats.indexOf(yr + 'e');
      const series = [
        { name: 'Observado', type: 'line', data: P.obs.concat(new Array(6).fill(null)), symbol: 'circle', symbolSize: 7, z: 5,
          lineStyle: { width: 3, color: C.onNight }, itemStyle: { color: C.onNight, borderColor: C.deep, borderWidth: 2 },
          label: { show: true, position: 'top', color: C.onNight2, fontSize: 11, formatter: p => (p.dataIndex === 0 || p.dataIndex === 7 || p.dataIndex === 11) ? nInt(p.value) : '' },
          markArea: { silent: true, itemStyle: { color: 'rgba(169,187,209,.06)' }, label: { show: true, position: 'insideTop', color: C.onNight3, fontSize: 11, formatter: 'Proyección' }, data: [[{ xAxis: '2024P' }, { xAxis: '2030e' }]] },
          markLine: { silent: true, symbol: 'none', animation: false, lineStyle: { color: 'rgba(214,172,85,.55)', type: 'solid', width: 1 }, label: { show: false }, data: [{ xAxis: yi }] } },
        { name: 'banda-bajo', type: 'line', data: line('bajo'), stack: 'band', symbol: 'none', lineStyle: { opacity: 0 }, areaStyle: { opacity: 0 }, silent: true, tooltip: { show: false } },
        { name: 'banda', type: 'line', data: line('alto').map((v, i) => v == null ? null : v - line('bajo')[i]), stack: 'band', symbol: 'none', lineStyle: { opacity: 0 }, areaStyle: { color: 'rgba(98,200,245,.08)' }, silent: true, tooltip: { show: false } }
      ].concat(['alto', 'base', 'bajo'].map(s => ({ name: SC[s].n, type: 'line', data: line(s), symbol: 'circle', symbolSize: (v, p) => p.dataIndex === yi ? 11 : 6, z: on(s) ? 4 : 2,
        lineStyle: { width: on(s) ? 2.5 : 1.5, type: 'dashed', color: SC[s].c, opacity: on(s) ? 1 : .2 }, itemStyle: { color: SC[s].c, opacity: on(s) ? 1 : .2, borderColor: C.deep, borderWidth: 1.5 },
        endLabel: { show: on(s) && !mob, formatter: p => nInt(p.value), color: SC[s].c, fontWeight: 700, fontSize: 12, fontFamily: HEAD } })));
      chart('chProj').setOption(Object.assign({
        grid: { left: 6, right: mob ? 12 : 72, top: 30, bottom: 6, containLabel: true },
        tooltip: tip(t, { trigger: 'axis', axisPointer: { type: 'line', lineStyle: { color: t.axis } },
          formatter: ps => { const vis = ps.filter(p => p.value != null && !p.seriesName.startsWith('banda')); if (!vis.length) return '';
            const yl = ps[0].axisValue; return `<b>${yl}</b>` + (yl.endsWith('e') ? ' <span style="color:' + t.text2 + '">· estimado</span>' : '') + vis.map(p => `<br><span style="color:${p.color}">●</span> ${p.seriesName}: <b>${nInt(p.value)}</b>`).join('') + `<br><span style="color:${t.text2}">Millones de pesos de 2018</span>`; } }),
        xAxis: axisCat(t, cats, { boundaryGap: false, axisLabel: { color: t.text2, fontSize: 11, interval: mob ? 2 : 0, rotate: mob ? 0 : 0 } }),
        yAxis: axisVal(t, { max: 900000, interval: 150000, axisLabel: { color: t.text2, fontSize: 11, formatter: v => v === 0 ? '0' : nf(v / 1000, 0) + ' mil' } }),
        series
      }, anim), true);
      rows();
    }
    $$('#projSeg button').forEach(b => b.addEventListener('click', () => { sc = b.dataset.sc; $$('#projSeg button').forEach(x => x.setAttribute('aria-pressed', x === b)); draw(); }));
    $('#projYear').addEventListener('input', e => { yr = +e.target.value; $('#projYearOut').textContent = yr; e.target.setAttribute('aria-valuetext', String(yr)); draw(); });
    rows();
    onVisible(el, draw);
  })();

  /* =====================================================================
     BIBLIOGRAFÍA con buscador
     ===================================================================== */
  (function bibliography() {
    const list = $('#bibList'); if (!list) return;
    const B = D.biblio, CAT = D.biblioCats;
    const norm = s => (s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
    const host = u => { try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return ''; } };
    let cat = 'all', q = '';
    const cats = $('#bibCats');
    cats.innerHTML = `<button type="button" aria-pressed="true" data-c="all">Todas <span>${B.length}</span></button>` + Object.entries(CAT).map(([k, v]) => `<button type="button" aria-pressed="false" data-c="${k}">${v} <span>${B.filter(b => b.c === k).length}</span></button>`).join('');
    function render() {
      const qq = norm(q).trim();
      const hit = B.filter(b => (cat === 'all' || b.c === cat) && (!qq || norm([b.a, b.y, b.t, b.s, b.u].join(' ')).includes(qq)));
      $('#bibCount').textContent = hit.length === B.length ? `${B.length} referencias` : `${hit.length} de ${B.length} referencias`;
      if (!hit.length) { list.innerHTML = '<p class="muted bib-empty">No hay referencias que coincidan con la búsqueda.</p>'; return; }
      list.innerHTML = Object.keys(CAT).filter(k => hit.some(b => b.c === k)).map(k => `<div class="bib-group"><h3 class="panel-title">${CAT[k]}</h3><ol>` +
        hit.filter(b => b.c === k).map(b => `<li><p><span class="bib-a">${esc(b.a)}</span> (${esc(b.y)}). <span class="bib-t">${esc(b.t)}</span>. ${esc(b.s)}.</p>` +
          (b.u ? `<a href="${esc(b.u)}" target="_blank" rel="noopener noreferrer">${esc(host(b.u))}<span class="sr-only"> (se abre en otra pestaña)</span> ↗</a>` : '<span class="hint">Sin enlace público</span>') + '</li>').join('') + '</ol></div>').join('');
    }
    $$('button', cats).forEach(b => b.addEventListener('click', () => { cat = b.dataset.c; $$('button', cats).forEach(x => x.setAttribute('aria-pressed', x === b)); render(); }));
    let tq; $('#bibQ').addEventListener('input', e => { clearTimeout(tq); tq = setTimeout(() => { q = e.target.value; render(); }, 120); });
    render();
  })();

  /* =====================================================================
     MAPA DE SUCURSALES DEL BANCO DEL BIENESTAR (Leaflet, carga diferida)
     ===================================================================== */
  const bbMap = (function () {
    let started = false, map = null, cluster = null, DATA = null, statesLayer = null, all = [];
    const loadCSS = h => new Promise(r => { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = h; l.onload = r; l.onerror = r; document.head.appendChild(l); });
    const loadJS = s => new Promise((r, j) => { const e = document.createElement('script'); e.src = s; e.onload = r; e.onerror = () => j(new Error(s)); document.head.appendChild(e); });
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
    function popup(r) {
      const ent = DATA.entidades[r[3]];
      return `<div class="bb-pop"><b>${esc(r[0])}</b><span class="bb-pop-k">Banco del Bienestar</span>
        <dl><dt>Localidad</dt><dd>${esc(r[2])}</dd><dt>Municipio</dt><dd>${esc(r[1])}</dd><dt>Entidad</dt><dd>${esc(ent)}</dd><dt>Domicilio</dt><dd>${esc(r[6])}</dd><dt>Horario</dt><dd>${esc(r[8] || DATA.meta.horarioGeneral)}</dd></dl>
        <span class="bb-pop-n">${r[7] ? 'Ubicación aproximada: la coordenada registrada tiene baja precisión.' : 'Ubicación registrada en el directorio.'}${r[9] ? ' Posible registro duplicado: otro registro del directorio tiene el mismo domicilio.' : ''} ${r[4].toFixed(5)}, ${r[5].toFixed(5)}</span></div>`;
    }
    function stats(rows, label) {
      $('#bbCount').textContent = nInt(rows.length);
      $('#bbCountK').textContent = label ? 'registros en ' + label : 'registros de sucursales en el directorio';
      $('#bbMun').textContent = nInt(new Set(rows.map(r => r[3] + '|' + r[1])).size);
    }
    function rank(sel) {
      const cnt = {}; DATA.sucursales.forEach(r => { cnt[r[3]] = (cnt[r[3]] || 0) + 1; });
      const arr = Object.entries(cnt).sort((a, b) => b[1] - a[1]); const mx = arr[0][1];
      $('#bbRank').innerHTML = arr.map(([i, n], k) => `<li><button type="button" data-e="${i}" aria-pressed="${String(+i === sel)}"><span class="i">${k + 1}</span><span>${DATA.entidades[i]}</span><span class="val">${nInt(n)}</span><span class="bar" style="transform:scaleX(${(n / mx).toFixed(3)})"></span></button></li>`).join('');
      $$('#bbRank button').forEach(b => b.addEventListener('click', () => { $('#bbEnt').value = b.dataset.e; filter(b.dataset.e); }));
      const on = $('#bbRank button[aria-pressed="true"]'), box = $('.bb-list'); if (on && box) box.scrollTop = on.offsetTop - box.offsetTop - 40; else if (box) box.scrollTop = 0;
    }
    function filter(v) {
      const sel = v === '' ? -1 : +v;
      const rows = sel < 0 ? DATA.sucursales : DATA.sucursales.filter(r => r[3] === sel);
      cluster.clearLayers(); cluster.addLayers(sel < 0 ? all : all.filter(m => m._r[3] === sel));
      const name = sel < 0 ? '' : DATA.entidades[sel];
      stats(rows, name); rank(sel);
      if (statesLayer) statesLayer.setStyle(f => ({ color: f.properties.name === name ? C.gold : 'rgba(169,187,209,.35)', weight: f.properties.name === name ? 2.2 : .8, fillColor: '#10263F', fillOpacity: f.properties.name === name ? .05 : .25 }));
      if (sel < 0) map.fitBounds([[14.4, -117.2], [32.7, -86.7]], { padding: [10, 10] });
      else map.fitBounds(L.latLngBounds(rows.map(r => [r[4], r[5]])).pad(.12), { maxZoom: 11 });
    }
    async function start() {
      if (started) { if (map) setTimeout(() => map.invalidateSize(), 60); return; }
      started = true;
      const ld = $('#bbLoading');
      try {
        await Promise.all([loadCSS('assets/vendor/leaflet/leaflet.css'), loadCSS('assets/vendor/leaflet/markercluster.css'), loadJS('assets/vendor/leaflet/leaflet.js')]);
        await loadJS('assets/vendor/leaflet/leaflet.markercluster.js');
        if (!window.BB_DATA) await loadJS('assets/data/sucursales-bienestar.js');
        DATA = window.BB_DATA;
        if (!DATA || !DATA.sucursales) throw new Error('datos de sucursales');
      } catch (e) { ld.textContent = 'No fue posible cargar el mapa. Revisa tu conexión y recarga la página.'; started = false; return; }
      const touch = matchMedia('(pointer: coarse)').matches;
      map = L.map('bbMap', { preferCanvas: true, scrollWheelZoom: false, dragging: !touch, tap: false, minZoom: 4, maxZoom: 18, zoomSnap: .5, attributionControl: true });
      const esriAttr = 'Mapa base © <a href="https://www.esri.com" target="_blank" rel="noopener">Esri</a> — Esri, HERE, Garmin, © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';
      const dark = L.layerGroup([
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', { maxZoom: 16, attribution: esriAttr }),
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', { maxZoom: 16, pane: 'overlayPane', opacity: .85 })
      ]).addTo(map);
      const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors' });
      // respaldo vectorial: si los mosaicos no cargan, las entidades siguen dando contexto
      if (window.MX_GEO) statesLayer = L.geoJSON(window.MX_GEO, { interactive: false, style: { color: 'rgba(169,187,209,.35)', weight: .8, fillColor: '#10263F', fillOpacity: .25 } }).addTo(map);
      L.control.layers({ 'Oscuro (Esri)': dark, 'Calles (OpenStreetMap)': osm }, null, { position: 'topright', collapsed: true }).addTo(map);
      cluster = L.markerClusterGroup({ chunkedLoading: true, showCoverageOnHover: false, maxClusterRadius: 48, spiderfyOnMaxZoom: true, disableClusteringAtZoom: 14,
        iconCreateFunction: c => { const n = c.getChildCount(), s = n < 10 ? 30 : n < 100 ? 38 : n < 500 ? 46 : 54;
          return L.divIcon({ html: `<span>${n}</span>`, className: 'bb-cluster', iconSize: [s, s] }); } });
      all = DATA.sucursales.map(r => { const m = L.circleMarker([r[4], r[5]], r[7] ? { radius: 6, color: C.sky, weight: 2, dashArray: '2 3', fillColor: C.night, fillOpacity: .9 } : { radius: 5.5, color: C.night, weight: 1.5, fillColor: C.gold, fillOpacity: .95 });
        m._r = r; m.bindPopup(() => popup(r), { maxWidth: innerWidth < 600 ? 236 : 280, autoPanPaddingTopLeft: [56, 72], autoPanPaddingBottomRight: [16, 24] }); return m; });
      cluster.addLayers(all); map.addLayer(cluster);
      // control para mover el mapa en pantallas táctiles sin bloquear el desplazamiento de la página
      if (touch) {
        const Ctl = L.Control.extend({ onAdd() { const b = L.DomUtil.create('button', 'bb-pan'); b.type = 'button'; b.textContent = 'Mover mapa'; b.setAttribute('aria-pressed', 'false');
          L.DomEvent.disableClickPropagation(b);
          b.addEventListener('click', () => { const on = !map.dragging.enabled(); on ? map.dragging.enable() : map.dragging.disable(); b.setAttribute('aria-pressed', String(on)); b.textContent = on ? 'Fijar mapa' : 'Mover mapa'; });
          return b; } });
        new Ctl({ position: 'bottomleft' }).addTo(map);
      }
      map.on('focus click', () => map.scrollWheelZoom.enable()); map.on('blur', () => map.scrollWheelZoom.disable());
      const sel = $('#bbEnt'); sel.innerHTML = '<option value="">Todo el país</option>' + DATA.entidades.map((e, i) => `<option value="${i}">${e}</option>`).join('');
      sel.addEventListener('change', () => filter(sel.value));
      $('#bbReset').addEventListener('click', () => { sel.value = ''; filter(''); });
      ld.remove();
      window.__bbMap = map; // referencia para pruebas automatizadas
      filter('');
      if ('ResizeObserver' in window) new ResizeObserver(() => map.invalidateSize()).observe($('#bbMap'));
    }
    return { start };
  })();
  function openAxis(i) {
    const b = $(`.axes-tabs button[data-ax="${i}"]`); if (b) b.click();
  }
  /* Navegación interna con corrección: varias secciones generan su texto y sus gráficas al hacerse
     visibles y cambian de altura mientras la página se desplaza, lo que deja un salto suave por encima
     o por debajo del destino. goTo() se desplaza y reajusta hasta que el destino queda en su lugar. */
  let navId = 0;
  function goTo(el, smooth = !RM) {
    if (!el) return; const id = ++navId, OFF = 64;
    const want = () => Math.max(0, el.getBoundingClientRect().top + scrollY - OFF);
    scrollTo({ top: want(), behavior: smooth ? 'smooth' : 'auto' });
    let tries = 0;
    (function check() {
      setTimeout(() => {
        if (id !== navId) return; // el usuario inició otra navegación
        const off = el.getBoundingClientRect().top - OFF;
        if (Math.abs(off) > 24 && tries++ < 6) { scrollTo({ top: want(), behavior: 'auto' }); check(); }
      }, tries === 0 ? (smooth ? 900 : 120) : 250);
    })();
  }
  // el usuario que desplaza con la rueda o el dedo cancela la corrección
  ['wheel', 'touchstart', 'keydown'].forEach(ev => addEventListener(ev, () => { navId++; }, { passive: true }));
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a || e.defaultPrevented) return;
    const href = a.getAttribute('href'); if (href.length < 2) return;
    const el = document.getElementById(href.slice(1)); if (!el) return;
    e.preventDefault();
    if (a.dataset.openAxis) openAxis(a.dataset.openAxis);
    if (history.pushState) history.pushState(null, '', href);
    setTimeout(() => goTo(el), a.dataset.openAxis ? 80 : 0);
  });
  if (location.hash.length > 1) {
    const el = document.getElementById(location.hash.slice(1));
    if (el) { if (location.hash === '#sucursales') openAxis('2'); setTimeout(() => goTo(el, false), 300); }
  }

  /* cierre: líneas del lema */
  if (window.gsap && window.ScrollTrigger && !RM) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from('.closing-motto span', { yPercent: 40, opacity: 0, stagger: .12, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: '.closing', start: 'top 70%' } });
    gsap.from('.versus .v', { scale: .9, opacity: 0, duration: .8, stagger: .2, ease: 'power3.out', scrollTrigger: { trigger: '.versus', start: 'top 80%' } });
  }
})();
