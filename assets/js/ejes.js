/* =====================================================================
   Propuesta · experiencias interactivas de los tres ejes
   - Eje 1: maqueta de app bancaria con 6 pantallas (existe hoy / propuesta).
   - Eje 2: recorrido de aprendizaje sobre una misma escena que se transforma.
   - Eje 3: recorrido de acompañamiento en sucursal.
   - Puente del modelo logit a los ejes (Sección 8).
   Todo es ilustrativo: comercios, bancos y montos son ficticios.
   ===================================================================== */
(function () {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const KIT = window.SVGKIT; if (!KIT) return;
  const { phone, rr, tx, person, shield, qr, K, HEAD } = KIT;
  // construcción diferida: reduce el DOM y el trabajo de estilo en la carga inicial
  function whenNear(el, fn) {
    if (!el) return; if (!('IntersectionObserver' in window)) return fn();
    const io = new IntersectionObserver(es => { if (es.some(e => e.isIntersecting)) { io.disconnect(); fn(); } }, { rootMargin: '150% 0px 150% 0px' });
    io.observe(el.closest('.axis-panel') || el);
  }

  /* ---------------------------------------------------------------
     Selector genérico de pasos (accesible: tablist + flechas)
     --------------------------------------------------------------- */
  function stepper({ list, explain, prev, next, fill, steps, onChange }) {
    let cur = 0;
    list.innerHTML = steps.map((s, i) => `<li role="presentation"><button type="button" role="tab" id="${list.id}-t${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}" data-i="${i}"><span class="sn num">${i + 1}</span><span class="sl">${s.k}</span>${s.tag ? `<span class="${s.tag === 'ex' ? 'tag-ex' : s.tag === 'pr' ? 'tag-pr' : 'tag-mx'}">${s.tag === 'ex' ? 'Existe hoy' : s.tag === 'pr' ? 'Propuesta' : 'Existe + propuesta'}</span>` : ''}</button></li>`).join('');
    const btns = $$('button', list);
    function go(i, focus) {
      cur = (i + steps.length) % steps.length;
      btns.forEach((b, k) => { const on = k === cur; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; b.classList.toggle('done', k < cur); });
      const s = steps[cur];
      explain.innerHTML = `<h4>${s.t}</h4><p>${s.d}</p>`;
      if (fill) fill.style.transform = `scaleX(${(cur + 1) / steps.length})`;
      if (prev) prev.disabled = cur === 0;
      if (next) next.textContent = cur === steps.length - 1 ? 'Volver al inicio' : 'Siguiente paso';
      onChange(cur);
      if (focus) btns[cur].focus();
    }
    btns.forEach(b => b.addEventListener('click', () => go(+b.dataset.i)));
    list.addEventListener('keydown', e => {
      if (['ArrowRight', 'ArrowDown'].includes(e.key)) { e.preventDefault(); go(cur + 1, true); }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) { e.preventDefault(); go(cur - 1, true); }
    });
    if (prev) prev.addEventListener('click', () => go(cur - 1));
    if (next) next.addEventListener('click', () => go(cur === steps.length - 1 ? 0 : cur + 1));
    go(0);
    return { go, get cur() { return cur; } };
  }
  // escena SVG con grupos por paso; el fondo permanece y cada paso se superpone
  function sceneArt(el, bg, groups) {
    el.innerHTML = `<svg viewBox="0 0 800 470" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">${bg}${groups.map((g, i) => `<g class="st" data-i="${i}">${g}</g>`).join('')}</svg>`;
    const gs = $$('.st', el);
    return i => gs.forEach((g, k) => g.classList.toggle('on', k === i));
  }

  /* ---------------------------------------------------------------
     EJE 1 · CONFIANZA: maqueta de app con 6 pantallas
     --------------------------------------------------------------- */
  whenNear($('#tpScreen'), function trust() {
    const scr = $('#tpScreen'); if (!scr) return;
    const top = (t, s) => `<div class="tp-top"><b>${t}</b><span>${s}</span></div>`;
    const S = [
      { k: 'CoDi en el inicio', tag: 'pr', t: 'CoDi a no más de dos toques',
        d: 'En la pantalla principal de cualquier banco, en el mismo lugar y con el mismo diseño. Hoy suele estar escondido en menús secundarios y cada banco lo presenta distinto.',
        html: top('Mi banco', 'Inicio') + `<div class="tp-bal"><span>Cuenta de ahorro</span><b class="num">$4,820.50</b></div><div class="tp-grid"><div class="tp-codi"><b>CoDi</b><span>Pagar</span></div><div>Transferir</div><div>Tarjetas</div><div>Más</div></div><div class="tp-hint">1 toque: abrir CoDi · 2 toques: pagar</div>` },
      { k: 'Solicitud de cobro', tag: 'ex', t: 'El comercio y el monto, a la vista',
        d: 'Al escanear el QR en tienda o elegir CoDi en la pasarela digital llega una solicitud con el nombre del comercio y el monto exacto. Así funciona CoDi hoy.',
        html: top('Solicitud CoDi', 'Pendiente') + `<div class="tp-req"><span>Comercio</span><b>Tienda ejemplo</b><span>Monto</span><b class="tp-amt num">$849.00</b><span>Concepto</span><b>Pedido 0001</b><span>Comisión</span><b>$0.00</b></div><div class="tp-btns"><span class="tp-b2">Rechazar</span><span class="tp-b1">Revisar y autorizar</span></div>` },
      { k: 'Autorización segura', tag: 'ex', t: 'Se autoriza con tu NIP, sin datos de tarjeta',
        d: 'El pago se confirma con el NIP o la contraseña del banco. No se captura ni se comparte el número de tarjeta, y el SPEI liquida en segundos.',
        html: top('Autorizar pago', 'Tienda ejemplo · $849.00') + `<div class="tp-pin"><i class="f"></i><i class="f"></i><i class="f"></i><i></i></div><div class="tp-keys">${[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, '⌫'].map(k => `<span>${k}</span>`).join('')}</div><div class="tp-note ok">✓ Datos de tarjeta compartidos: ninguno</div>` },
      { k: 'Aviso de operación', tag: 'mx', t: 'Confirmación inmediata y aviso por cada pago',
        d: 'La confirmación del pago ya existe. La propuesta agrega un aviso por cada operación realizada, para detectar de inmediato un cargo que no reconozcas.',
        html: `<div class="tp-push"><b>Mi banco · ahora</b><span>Pagaste $849.00 a Tienda ejemplo con CoDi. ¿No fuiste tú? Repórtalo aquí.</span></div>` + top('Pago confirmado', 'Liquidado vía SPEI') + `<div class="tp-okmark">✓</div><div class="tp-req"><span>Monto</span><b class="num">$849.00</b><span>Referencia</span><b class="num">EJEMPLO-0001</b></div>` },
      { k: 'Límites configurables', tag: 'pr', t: 'Tú decides cuánto puedes pagar',
        d: 'Función propuesta: cada persona fija su propio límite diario para pagos con CoDi y puede cambiarlo cuando quiera desde la app.',
        html: top('Seguridad CoDi', 'Configuración') + `<div class="tp-lim"><span>Límite diario de pagos</span><b class="num">$2,000</b><div class="tp-slider"><i></i></div><div class="tp-scale num"><span>$0</span><span>$10,000</span></div></div><div class="tp-row"><span>Aviso por cada operación</span><span class="toggle" role="img" aria-label="activado"></span></div><div class="tp-row"><span>Pagos en línea con CoDi</span><span class="toggle" role="img" aria-label="activado"></span></div>` },
      { k: 'Información de seguridad', tag: 'pr', t: 'Señales visibles y respaldo institucional',
        d: 'La app recuerda no compartir códigos y pagar solo con QR del estándar CoDi. Banxico otorga un sello a los comercios que lo ofrecen y CONDUSEF atiende quejas cuando algo sale mal.',
        html: top('Paga seguro', 'Recomendaciones') + `<ul class="tp-tips"><li>Nunca compartas tus códigos ni tu NIP.</li><li>Paga solo con QR del estándar CoDi.</li><li>Revisa comercio y monto antes de autorizar.</li></ul><div class="tp-seal"><b>Paga con CoDi en línea</b><span>es rápido, seguro y sin comisiones</span></div><div class="tp-note">¿Un problema? Atención a usuarios: CONDUSEF</div>` }
    ];
    scr.innerHTML = S.map((s, i) => `<div class="scr tp-scr" data-s="${i}">${s.html}<div class="illus">Maqueta ilustrativa · sin operaciones reales</div></div>`).join('');
    const scrs = $$('.tp-scr', scr);
    const st = stepper({ list: $('#tpActions'), explain: $('#tpExplain'), steps: S,
      onChange: i => { scrs.forEach((s, k) => { const on = k === i; s.classList.toggle('on', on); s.setAttribute('aria-hidden', String(!on)); }); $('#tpCount').textContent = `${i + 1} / ${S.length}`; } });
    $('.tp-prev').addEventListener('click', () => st.go(st.cur - 1));
    $('.tp-next').addEventListener('click', () => st.go(st.cur + 1));
    // deslizar sobre el teléfono en pantallas táctiles
    let x0 = null; const ph = $('.tp-phone');
    ph.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    ph.addEventListener('touchend', e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) st.go(st.cur + (dx < 0 ? 1 : -1)); x0 = null; }, { passive: true });
  });

  /* ---------------------------------------------------------------
     EJE 2 · CONOCIMIENTO: de desconocer CoDi a usarlo con confianza
     --------------------------------------------------------------- */
  whenNear($('#learnArt'), function learn() {
    const art = $('#learnArt'); if (!art) return;
    const floor = `<rect x="0" y="0" width="800" height="470" rx="18" fill="#0B1F38"/><g opacity=".35">${[0, 1, 2].map(r => rr(470, 70 + r * 70, 290, 8, 3, '#2A5582') + [0, 1, 2, 3, 4, 5].map(c => rr(480 + c * 46, 40 + r * 70, 30, 30, 4, c % 2 ? '#1F4A75' : '#2A5582')).join('')).join('')}</g><line x1="30" x2="770" y1="410" y2="410" stroke="#9BE0FF" stroke-opacity=".2"/>`;
    const counter = rr(380, 330, 300, 80, 10, 'url(#gCard)', 'stroke="#9BE0FF" stroke-opacity=".25"') + rr(380, 322, 300, 12, 4, '#2A5582');
    const me = (x, opt = {}) => person(x, 410, 160, Object.assign({ hair: 'long', phone: true }, opt));
    const promoter = x => person(x, 410, 150, { hair: 'short', fill: 'url(#gFigG)' });
    const bubble = (x, y, w, t) => `<rect x="${x}" y="${y}" width="${w}" height="42" rx="12" fill="#fff"/><path d="M${x + 30} ${y + 42} l8 12 l6 -12 z" fill="#fff"/>${tx(x + w / 2, y + 27, t, 13, '#0D2137', 800, 'middle', HEAD)}`;
    const G = [
      // 1 campaña
      `<g><rect x="120" y="60" width="340" height="150" rx="14" fill="url(#gCard)" stroke="${K.gold}" stroke-opacity=".6"/>${tx(150, 112, 'Paga con CoDi', 30, K.on, 800, 'start', HEAD)}${tx(150, 146, 'más rápido y más seguro', 18, K.gold, 700)}${tx(150, 180, 'Campaña en redes, anuncios y espectaculares', 12, K.on3, 600)}<rect x="270" y="210" width="12" height="80" fill="#2A5582"/></g>${me(220, { phone: false })}<g transform="translate(590,150)">${phone(0, 0, 90, 180, rr(6, 30, 70, 60, 8, '#102D4F') + tx(41, 66, 'CoDi', 12, K.gold, 800, 'middle', HEAD) + rr(6, 98, 70, 8, 4, '#C9D5E4') + rr(6, 112, 50, 8, 4, '#C9D5E4'))}</g>`,
      // 2 QR informativo
      `${counter}<g transform="translate(560,210)"><rect x="-10" y="-10" width="96" height="124" rx="10" fill="#0E2442" stroke="${K.sky}" stroke-opacity=".6"/>${qr(6, 4, 64, 13)}${tx(38, 98, '¿Qué es CoDi?', 11, K.on, 800, 'middle', HEAD)}</g>${me(470)}<path d="M500 300 Q 530 270 556 258" stroke="${K.sky}" stroke-width="2" stroke-dasharray="3 5" fill="none"/><g class="lt">${tx(120, 120, 'Escanea y conoce', 22, K.on, 800, 'start', HEAD)}${tx(120, 150, 'qué es CoDi y cómo pagar,', 15, K.on2, 600)}${tx(120, 172, 'en tienda o en línea', 15, K.on2, 600)}</g>`,
      // 3 promotor
      `${counter}${me(330)}${promoter(470)}<g>${bubble(400, 150, 190, 'CoDi en 2 pasos')}</g><g class="lt">${tx(90, 120, 'Un promotor', 22, K.on, 800, 'start', HEAD)}${tx(90, 150, 'resuelve dudas a quien', 15, K.on2, 600)}${tx(90, 172, 'prefiere la tienda', 15, K.on2, 600)}</g>`,
      // 4 la app del banco
      `<g transform="translate(300,40)">${phone(0, 0, 170, 360, rr(0, 0, 154, 64, 0, '#102D4F') + tx(14, 44, 'Mi banco', 14, '#fff', 800, 'start', HEAD) + [0, 1, 2, 3].map(i => rr(12 + (i % 2) * 70, 84 + Math.floor(i / 2) * 64, 60, 54, 10, i === 0 ? '#102D4F' : '#fff', 'stroke="#DCE5F0"')).join('') + tx(42, 116, 'CoDi', 13, K.gold, 800, 'middle', HEAD) + rr(12, 224, 130, 30, 8, '#EEF3F9') + tx(77, 244, '1 Escanea · 2 NIP', 11, '#0D2137', 700, 'middle'))}</g><circle cx="342" cy="164" r="40" fill="none" stroke="${K.gold}" stroke-width="3"/>${me(140)}<g class="lt">${tx(530, 150, 'Aprende dónde', 22, K.on, 800, 'start', HEAD)}${tx(530, 178, 'está CoDi en su app', 15, K.on2, 600)}${tx(530, 200, 'y cómo confirmar', 15, K.on2, 600)}</g>`,
      // 5 primer pago acompañado
      `${counter}<g transform="translate(560,226)">${qr(0, 0, 70, 21)}</g>${tx(595, 316, '$249.00', 13, K.on, 800, 'middle', HEAD)}${me(430)}${promoter(320)}<g transform="translate(470,170)"><circle r="30" fill="${K.teal}"/><path d="M-13 1 l9 9 l17 -19" stroke="#071629" stroke-width="6" fill="none" stroke-linecap="round"/></g><g><rect x="60" y="80" width="300" height="60" rx="30" fill="${K.gold}"/>${tx(210, 119, 'Incentivo de bienvenida', 22, '#071629', 800, 'middle', HEAD)}</g>`,
      // 6 compra en línea
      `<g transform="translate(250,70)"><rect width="330" height="215" rx="12" fill="#1A3556" stroke="#9BE0FF" stroke-opacity=".3"/><rect x="12" y="12" width="306" height="191" rx="6" fill="#F7F9FC"/>${tx(28, 40, 'Elige cómo pagar', 14, '#0D2137', 800, 'start', HEAD)}${['Tarjeta de crédito o débito', 'Transferencia bancaria', 'CoDi'].map((t, i) => rr(28, 54 + i * 40, 170, 32, 8, '#fff', `stroke="${i === 2 ? '#102D4F' : '#E1E7EF'}" stroke-width="${i === 2 ? 2 : 1}"`) + `<circle cx="44" cy="${70 + i * 40}" r="6" fill="${i === 2 ? '#102D4F' : 'none'}" stroke="#9AA8BA" stroke-width="2"/>` + tx(58, 74 + i * 40, t, 10, '#0D2137', 600)).join('')}${qr(222, 70, 80, 31)}${tx(262, 178, 'QR con monto', 10, '#52657C', 700, 'middle')}</g><path d="M210 285 h410 l30 26 h-470 z" fill="#2A5582"/>${me(120)}`
    ];
    const show = sceneArt(art, floor, G);
    const steps = [
      { k: 'Campaña', t: '1 · Conoce CoDi por la campaña', d: 'Redes sociales, anuncios y espectaculares con un solo mensaje fácil de recordar: «Paga con CoDi, más rápido y más seguro». Complementa la campaña de Banco de México.' },
      { k: 'QR informativo', t: '2 · Escanea el QR informativo en la tienda', d: 'En cada mostrador, un QR explica qué es CoDi y cómo pagar con él, en tienda o en línea. La página registra los escaneos para medir el alcance.' },
      { k: 'Promotor', t: '3 · Recibe orientación de un promotor', d: 'Promotores capacitados ofrecen la alternativa a quienes todavía prefieren comprar en persona y explican el proceso con más detalle.' },
      { k: 'En la app', t: '4 · Aprende a pagar desde su app bancaria', d: 'Encuentra CoDi en la app de su banco: escanea o recibe la solicitud de cobro y confirma con su NIP, sin capturar datos de tarjeta.' },
      { k: 'Primer pago', t: '5 · Hace su primer pago acompañado', d: 'El primer pago ocurre con acompañamiento, en un espacio que ya conoce y prefiere. Para que probar no cueste nada, las tiendas pueden ofrecer un incentivo de bienvenida.' },
      { k: 'Compra en línea', t: '6 · Reconoce CoDi al comprar en línea', d: 'En la pasarela digital de la tienda elige CoDi en lugar de tarjeta o transferencia: se genera un QR con el monto que autoriza desde su banco.' }
    ];
    stepper({ list: $('#learnSteps'), explain: $('#learnExplain'), prev: $('#learnPrev'), next: $('#learnNext'), fill: $('#lmFill'), steps, onChange: show });
  });

  /* ---------------------------------------------------------------
     EJE 3 · INCLUSIÓN: acompañamiento voluntario en sucursal
     --------------------------------------------------------------- */
  whenNear($('#inclArt'), function include() {
    const art = $('#inclArt'); if (!art) return;
    const bg = `<rect x="0" y="0" width="800" height="470" rx="18" fill="#0B1F38"/><line x1="30" x2="770" y1="410" y2="410" stroke="#9BE0FF" stroke-opacity=".2"/>`;
    const branch = (x, s = 1) => `<g transform="translate(${x},${410 - 220 * s}) scale(${s})"><path d="M0 70 L130 0 L260 70 Z" fill="url(#gGold)"/>${rr(10, 70, 240, 14, 3, '#E8C27A')}${[30, 80, 130, 180].map(x2 => rr(x2, 92, 26, 110, 4, '#2A5582')).join('')}${rr(-10, 202, 280, 18, 4, '#2A5582')}${tx(130, 56, 'Sucursal', 15, '#071629', 800, 'middle', HEAD)}</g>`;
    const me = (x, opt = {}) => person(x, 410, 160, Object.assign({ hair: 'gray' }, opt));
    const guide = x => person(x, 410, 150, { hair: 'short', fill: 'url(#gFigG)' });
    const lead = (a, b, c) => `<g class="lt">${tx(70, 110, a, 22, K.on, 800, 'start', HEAD)}${tx(70, 140, b, 15, K.on2, 600)}${c ? tx(70, 162, c, 15, K.on2, 600) : ''}</g>`;
    const bigPhone = inner => `<g transform="translate(420,40)">${phone(0, 0, 170, 360, inner)}</g>`;
    const G = [
      `${branch(440)}${me(330)}${lead('Acude a su sucursal', 'en días de pago o cuando', 'lo necesite')}`,
      `<g>${rr(420, 300, 260, 18, 4, '#2A5582')}${rr(440, 318, 14, 92, 3, '#2A5582')}${rr(646, 318, 14, 92, 3, '#2A5582')}</g>${me(380, { phone: false })}${guide(600)}<g><rect x="430" y="150" width="260" height="44" rx="12" fill="#fff"/><path d="M560 194 l8 12 l6 -12 z" fill="#fff"/>${tx(560, 178, '¿Cómo funciona tu cuenta?', 13, '#0D2137', 800, 'middle', HEAD)}</g>${lead('Orientación financiera', 'con Servidores de la Nación', 'y personal de la sucursal')}`,
      `${bigPhone(rr(0, 0, 154, 64, 0, '#102D4F') + tx(14, 44, 'Mi banco', 14, '#fff', 800, 'start', HEAD) + rr(12, 80, 130, 70, 12, 'url(#gCard)') + tx(24, 104, 'Saldo', 11, '#A9BBD1', 600) + tx(24, 134, '$1,250.00', 18, '#fff', 800, 'start', HEAD) + [0, 1, 2].map(i => rr(12, 166 + i * 44, 130, 34, 8, '#fff', 'stroke="#DCE5F0"')).join('') + tx(24, 188, 'Movimientos', 11, '#0D2137', 600) + tx(24, 232, 'Transferir', 11, '#0D2137', 600) + tx(24, 276, 'Ayuda', 11, '#0D2137', 600))}${me(300)}${lead('Aprende a usar', 'la app de su cuenta')}`,
      `${bigPhone(rr(0, 0, 154, 64, 0, '#102D4F') + tx(14, 44, 'Mi banco', 14, '#fff', 800, 'start', HEAD) + rr(12, 84, 130, 90, 14, '#102D4F', `stroke="${K.gold}" stroke-width="2"`) + tx(77, 126, 'CoDi', 22, K.gold, 800, 'middle', HEAD) + tx(77, 150, 'Activación asistida', 10, '#fff', 600, 'middle') + rr(12, 188, 130, 30, 8, '#EEF3F9') + tx(77, 208, 'Límite y avisos', 11, '#0D2137', 700, 'middle'))}${shield(660, 230, .9)}${me(300)}${lead('Conoce y activa CoDi', 'con límites de pago', 'y aviso por operación')}`,
      `${bigPhone(rr(0, 0, 154, 64, 0, '#102D4F') + tx(14, 44, 'Práctica guiada', 13, '#fff', 800, 'start', HEAD) + rr(12, 84, 130, 110, 12, '#fff', 'stroke="#DCE5F0"') + tx(24, 108, 'Operación de prueba', 10, '#52657C', 700) + tx(24, 138, 'Simulada', 18, '#0D2137', 800, 'start', HEAD) + tx(24, 162, 'No mueve dinero', 10, '#178F72', 700) + rr(12, 206, 130, 34, 17, '#102D4F') + tx(77, 228, 'Confirmar con NIP', 10, '#fff', 700, 'middle'))}${me(300)}${guide(200)}<g><rect x="610" y="90" width="150" height="40" rx="20" fill="${K.teal}"/>${tx(685, 116, 'Voluntaria', 15, '#071629', 800, 'middle', HEAD)}</g>${lead('Una operación simulada', 'siempre voluntaria y sin', 'relación con apoyos')}`,
      `<g transform="translate(470,120)">${[[0, 0, 'Pagar con CoDi'], [0, 70, 'Límite propio'], [0, 140, 'Aviso por pago'], [0, 210, 'Dónde reportar']].map(r => rr(r[0], r[1], 230, 54, 12, 'url(#gCard)', 'stroke="#9BE0FF" stroke-opacity=".3"') + `<circle cx="${r[0] + 28}" cy="${r[1] + 27}" r="12" fill="${K.teal}"/><path d="M${r[0] + 22} ${r[1] + 27} l5 5 l9 -10" stroke="#071629" stroke-width="3" fill="none"/>` + tx(r[0] + 52, r[1] + 33, r[2], 15, K.on, 700)).join('')}</g>${me(330, { phone: true })}${lead('Tiene herramientas', 'para pagar en digital', 'con confianza')}`
    ];
    const show = sceneArt(art, bg, G);
    const steps = [
      { k: 'Llega a la sucursal', t: '1 · Una persona acude a su sucursal', d: 'La red del Banco del Bienestar es la puerta de entrada: llega a localidades donde la banca comercial no tiene presencia. Los días de pago de pensiones y programas es cuando más gente acude.' },
      { k: 'Orientación', t: '2 · Recibe orientación financiera', d: 'Servidores de la Nación y personal de la sucursal explican cómo funciona la cuenta de ahorro, para que la liquidez no se retire de inmediato en efectivo.' },
      { k: 'Usa la app', t: '3 · Aprende a usar la app bancaria', d: 'El reto no es abrir una cuenta, sino enseñar a usar la que ya se tiene: consultar saldo, movimientos y pedir ayuda desde el teléfono.' },
      { k: 'Conoce CoDi', t: '4 · Conoce y activa CoDi de forma asistida', d: 'Con apoyo de Banco de México (Eje 1), la app habilita la activación asistida de CoDi con límites de pago y un aviso por cada operación.' },
      { k: 'Práctica voluntaria', t: '5 · Hace una operación simulada y voluntaria', d: 'Una práctica guiada que no mueve dinero. La activación es siempre voluntaria y nunca está condicionada a la entrega de ningún apoyo social.' },
      { k: 'Herramientas', t: '6 · Sale con herramientas para pagar en digital', d: 'Sabe pagar con CoDi, fijar su límite, reconocer avisos y dónde reportar un problema. La primera experiencia guiada busca reducir el desconocimiento y la desconfianza.' }
    ];
    stepper({ list: $('#inclSteps'), explain: $('#inclExplain'), prev: $('#inclPrev'), next: $('#inclNext'), fill: $('#imFill'), steps, onChange: show });
  });

  /* ---------------------------------------------------------------
     Puente: resultados del logit → ejes
     --------------------------------------------------------------- */
  (function bridge() {
    const box = $('#bridgeMap'); if (!box) return;
    const rows = $$('.bm-row', box);
    rows.forEach(r => { const b = $('.bm-btn', r);
      b.addEventListener('click', () => { const open = b.getAttribute('aria-expanded') !== 'true';
        rows.forEach(x => { $('.bm-btn', x).setAttribute('aria-expanded', 'false'); x.classList.remove('open'); });
        if (open) { b.setAttribute('aria-expanded', 'true'); r.classList.add('open'); } }); });
    if (RM || !('IntersectionObserver' in window)) { box.classList.add('in'); return; }
    const io = new IntersectionObserver(es => { if (es[0].isIntersecting) { box.classList.add('in'); io.disconnect(); } }, { rootMargin: '0px 0px -15% 0px' });
    io.observe(box);
  })();
})();
