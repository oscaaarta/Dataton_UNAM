/* Modo presentación al jurado: ruta breve de 6 paradas sobre el mismo contenido.
   No duplica secciones: oculta las escenas narrativas largas y guía con una barra inferior. */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STOPS = [
    { sel: '#s1 .versus', alt: '#chGrowth', t: 'Crecimiento del comercio electrónico',
      f: 'El VABCOEL pasó de 3.02% a 7.07% del PIB entre 2013 y 2024. En 2020 creció 23.3% mientras el PIB real cayó 8.4%.' },
    { sel: '#s6 .explorer', t: 'Brechas y barreras de adopción',
      f: 'Los compradores van de 7.2% de la población en Chiapas a 31.1% en Colima. Entre quienes no compran, 34.4% prefiere la tienda y 18.3% no sabe cómo; la desconfianza digital va de 3.4% (Tamaulipas) a 16.2% (Tlaxcala).' },
    { sel: '#s7 .facts', t: 'La oportunidad de CoDi',
      f: '20.6 millones de cuentas validadas, pero solo 2.7 millones de cuentas nuevas hicieron al menos un pago. 86.5% usa smartphone y solo 32.6% banca en línea o móvil.' },
    { sel: '#logitLab', on: () => window.LLAB && window.LLAB.full(), t: 'Resultados del modelo logit',
      f: 'La desconfianza se asocia con −1.28 pp en la probabilidad de usar CoDi; smartphone (+3.09 pp), banca móvil (+2.12 pp) y cada habilidad digital (+0.34 pp), con mayor probabilidad. Asociaciones, no efectos causales.' },
    { sel: '#s9 .axes-tabs', alt: '#axp0', t: 'Tres ejes de la estrategia',
      f: 'Confianza (Banco de México y CONDUSEF), conocimiento (ANTAD) e inclusión financiera (Banco del Bienestar y Secretaría del Bienestar). Todo es propuesta, no implementado.' },
    { sel: '#s9 .pilot', t: 'Piloto en Nuevo León y escalamiento',
      f: 'Piloto propuesto de 0 a 2 años y tres fases de dos años, condicionadas a resultados verificables. Ocho años es el escenario base, no un calendario garantizado.' },
    { sel: '#proyeccion .proj-layout', t: 'Proyección a 2030',
      f: 'En el escenario base, el VABCOEL del comercio al por menor pasaría de 535,538 millones de pesos en 2024 a 736,430 en 2030 (+37.5%); el rango va de +24.7% a +50.4%. Son escenarios condicionados, no pronósticos garantizados.' }
  ];
  const body = document.body, bar = $('#presenter'), seg = $('#modeSeg');
  if (!bar || !seg) return;
  let i = 0, mode = 'explore';
  const save = m => { try { localStorage.setItem('codi-mode', m); } catch (e) { /* sin almacenamiento */ } };
  const load = () => { try { return localStorage.getItem('codi-mode'); } catch (e) { return null; } };

  function go(k) {
    i = Math.max(0, Math.min(STOPS.length - 1, k));
    const s = STOPS[i], vis = e => e && e.offsetWidth > 0, el = vis($(s.sel)) ? $(s.sel) : $(s.alt);
    $$('.pm-focus').forEach(e => e.classList.remove('pm-focus'));
    if (s.on) s.on();
    if (el) {
      el.classList.add('pm-focus');
      const y = el.getBoundingClientRect().top + scrollY - Math.max(72, (innerHeight - bar.offsetHeight - Math.min(el.offsetHeight, innerHeight * .7)) / 2);
      scrollTo({ top: Math.max(0, y), behavior: RM ? 'auto' : 'smooth' });
    }
    $('#pmCount').textContent = `${i + 1} / ${STOPS.length}`;
    $('#pmTitle').textContent = s.t; $('#pmText').textContent = s.f;
    $('#pmPrev').disabled = i === 0; $('#pmNext').disabled = i === STOPS.length - 1;
    $('#pmDots').innerHTML = STOPS.map((_, k) => `<button type="button" aria-label="Parada ${k + 1}: ${STOPS[k].t}" aria-current="${k === i ? 'step' : 'false'}" data-k="${k}"></button>`).join('');
    $$('#pmDots button').forEach(b => b.addEventListener('click', () => go(+b.dataset.k)));
  }
  function setMode(m, jump, initial) {
    const changed = m !== mode || !initial; mode = m; body.classList.toggle('mode-present', m === 'present');
    $$('button', seg).forEach(b => b.setAttribute('aria-pressed', b.dataset.mode === m));
    bar.hidden = m !== 'present'; save(m);
    if (m === 'present') { if (jump) go(0); }
    else $$('.pm-focus').forEach(e => e.classList.remove('pm-focus'));
    if (!changed) return;
    if (window.ScrollTrigger) setTimeout(() => ScrollTrigger.refresh(), 60);
    dispatchEvent(new Event('resize'));
  }
  $$('button', seg).forEach(b => b.addEventListener('click', () => setMode(b.dataset.mode, true)));
  $('#pmPrev').addEventListener('click', () => go(i - 1));
  $('#pmNext').addEventListener('click', () => go(i + 1));
  $('#pmExit').addEventListener('click', () => setMode('explore', false));
  addEventListener('keydown', e => {
    if (mode !== 'present' || e.target.closest('input, select, textarea, [role="listbox"], [role="option"], .seg, .lens-list, .ph-track')) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); go(i + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); go(i - 1); }
    if (e.key === 'Escape') setMode('explore', false);
  });
  const q = new URLSearchParams(location.search).get('modo');
  const start = q === 'presentacion' ? 'present' : q === 'exploracion' ? 'explore' : (load() || 'explore');
  setMode(start, start === 'present', true);
})();
