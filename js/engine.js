/* BioLens interaction engine: replica window + numbered markers + cloud explanations + animated arrows + guided tour + progress. */
(function () {
  const BL = window.BL = {
    tools: [], byId: {}, add(t) { this.tools.push(t); this.byId[t.id] = t; },
    counts() { let w = 0, f = 0; this.tools.forEach(t => { w += t.windows.length; t.windows.forEach(x => f += Object.keys(x.f).length); }); return { tools: this.tools.length, windows: w, features: f }; },
  };
  const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  BL.$ = $; BL.$$ = $$;
  const PK = 'biolens_progress_v1'; let prog = {};
  try { prog = JSON.parse(localStorage.getItem(PK) || '{}'); } catch (e) { }
  const save = () => { try { localStorage.setItem(PK, JSON.stringify(prog)); } catch (e) { } };
  BL.toolProgress = t => ({ done: Object.values(prog[t.id] || {}).reduce((a, x) => a + x.length, 0), total: t.windows.reduce((a, w) => a + Object.keys(w.f).length, 0) });
  BL.resetProgress = () => { prog = {}; save(); };
  BL.toast = msg => { const box = $('#toast'); const d = document.createElement('div'); d.className = 'toast'; d.textContent = msg; box.appendChild(d); setTimeout(() => d.remove(), 2600); };
  const isDone = (w, k) => (prog[S.tool.id] && prog[S.tool.id][w.id] || []).includes(k);

  const S = { tool: null, win: null, slots: { L: null, R: null }, last: 'R', mode: 'alt', deep: false, order: [], els: {}, tour: -1 };
  const narrow = () => window.innerWidth <= 1180;
  const expand = d => ({ title: d[0], what: d[1], read: d[2], good: d[3], bad: d[4], tip: d[5], deep: d[6] });

  /* ---------- cloud shape: puffs around the body + thought-dots tail ---------- */
  BL.cloudify = function (b, side, ty) {
    const bg = $('.cloud-bg', b); $$('.puff,.tl', bg).forEach(n => n.remove());
    const w = b.offsetWidth, h = b.offsetHeight; let seed = (w * 13 + h * 7) | 0 || 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const add = (cx, cy, r, c) => { const i = document.createElement('i'); i.className = c || 'puff'; i.style.cssText = `left:${cx - r}px;top:${cy - r}px;width:${2 * r}px;height:${2 * r}px`; bg.appendChild(i); };
    for (let x = 22; x < w - 16;) { const r = 13 + rnd() * 9; add(x + r * .3, 3, r); x += r * 1.55; }
    for (let x = 24; x < w - 16;) { const r = 13 + rnd() * 9; add(x + r * .3, h - 3, r); x += r * 1.55; }
    for (let y = 28; y < h - 22;) { const r = 12 + rnd() * 8; add(3, y + r * .3, r); y += r * 1.55; }
    for (let y = 26; y < h - 22;) { const r = 12 + rnd() * 8; add(w - 3, y + r * .3, r); y += r * 1.55; }
    if (side) { const dir = side === 'L' ? 1 : -1, base = side === 'L' ? w : 0; [[9, 7], [23, 4.5], [34, 3]].forEach(([o, r]) => add(base + dir * o, ty, r, 'tl')); }
  };

  /* ---------- tool page ---------- */
  BL.openTool = function (id, winId) {
    const t = BL.byId[id]; if (!t) { location.hash = '#/dashboard'; return; }
    const fresh = !S.tool || S.tool.id !== id || !$('#arena');
    S.tool = t; S.win = t.windows.find(w => w.id === winId) || t.windows[0];
    if (fresh) build(); else loadWindow(false);
    localStorage.setItem('biolens_last', id);
  };

  function build() {
    const t = S.tool, idx = BL.tools.indexOf(t), next = BL.tools[(idx + 1) % BL.tools.length];
    $('#view').innerHTML = `<div class="wrap" style="--tc:${t.color}">
      <div class="thead"><a class="btn sm" href="#/dashboard">← All tools</a><div class="ico">${t.icon}</div>
        <div><h1>${t.name}</h1><div class="tag">${t.question}</div></div><div class="sp"></div>
        <div class="ring" id="ring"></div>
        <div class="ctrl"><div class="tog" id="modeTog" title="Which side the next explanation appears on"><button data-m="alt" class="on">Alternate sides</button><button data-m="smart">Nearest side</button></div>
        <div class="tog" id="deepTog"><button data-d="0" class="on">Simple</button><button data-d="1">Expert notes</button></div>
        <button class="btn pri sm" id="tourBtn">▶ Guided tour</button></div></div>
      <div class="wtabs" id="wtabs">${t.windows.map(w => `<button data-w="${w.id}">${w.icon || '🪟'} ${w.title} <em></em></button>`).join('')}<span class="ink"></span></div>
      <div class="strip" id="strip"></div>
      <div class="arena" id="arena"><div class="gut" id="gutL"></div>
        <div class="stage" id="stage"><div class="browser"><div class="bbar"><div class="dots"><i></i><i></i><i></i></div><div class="url" id="url"></div><span class="tagx">interactive replica</span></div><div id="page"></div></div>
        <div class="tips">👆 <b>Click any numbered marker</b> to open an explanation cloud. Click another and it opens on the other side so you can compare.</div></div>
        <div class="gut" id="gutR"></div>
        <svg class="arrows" id="arrows"><defs><marker id="hdL" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="#22D3EE"/></marker>
        <marker id="hdR" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="#818CF8"/></marker></defs>
        <path id="arL" stroke="#22D3EE" marker-end="url(#hdL)"/><path id="arR" stroke="#818CF8" marker-end="url(#hdR)"/>
        <circle id="dtL" r="4" fill="#22D3EE" style="display:none"><animateMotion id="moL" dur="1.8s" repeatCount="indefinite" path="M0,0"/></circle>
        <circle id="dtR" r="4" fill="#818CF8" style="display:none"><animateMotion id="moR" dur="1.8s" repeatCount="indefinite" path="M0,0"/></circle></svg></div>
      <div class="tnav"><a class="btn" href="#/dashboard">← Back to dashboard</a><a class="btn pri" href="#/tool/${next.id}">Next tool: ${next.icon} ${next.name} →</a></div></div>`;
    $$('#wtabs button').forEach(b => b.onclick = () => { location.hash = `#/tool/${S.tool.id}/${b.dataset.w}`; });
    $$('#modeTog button').forEach(b => b.onclick = () => { S.mode = b.dataset.m; $$('#modeTog button').forEach(x => x.classList.toggle('on', x === b)); BL.toast(S.mode === 'alt' ? 'Explanations will alternate left / right' : 'Explanations open on the side nearest the feature'); });
    $$('#deepTog button').forEach(b => b.onclick = () => { S.deep = b.dataset.d === '1'; $('#arena').classList.toggle('lv-deep', S.deep); $$('#deepTog button').forEach(x => x.classList.toggle('on', x === b)); relayout(); });
    $('#tourBtn').onclick = () => tourStart();
    loadWindow(true);
  }

  function loadWindow(opening) {
    const w = S.win; stopTour(true);
    S.slots = { L: null, R: null }; S.last = 'R';
    $('#gutL').innerHTML = ''; $('#gutR').innerHTML = ''; $('#arena').style.minHeight = '';
    ['arL', 'arR'].forEach(i => $('#' + i).classList.remove('on')); ['dtL', 'dtR'].forEach(i => $('#' + i).style.display = 'none');
    const st = $('#stage'); st.classList.remove('opening', 'swap'); void st.offsetWidth; st.classList.add(opening ? 'opening' : 'swap');
    $('#page').innerHTML = `<div class="rp" style="--b:${S.tool.color}">${w.html()}</div>`;
    mark(); typeURL(w.url || S.tool.url); updateChrome();
  }

  function mark() {
    const page = $('#page'), seen = new Set(); S.order = []; S.els = {}; let n = 0;
    $$('[data-f]', page).forEach(e => {
      const k = e.dataset.f; if (seen.has(k)) return; seen.add(k);
      if (!S.win.f[k]) { console.warn('[BioLens] missing explanation:', S.tool.id, S.win.id, k); return; }
      n++; e.dataset.n = n; S.order.push(k); S.els[k] = e;
      const b = document.createElement('b'); b.className = 'nb'; b.style.setProperty('--d', n); b.textContent = n;
      if (isDone(S.win, k)) b.classList.add('done');
      (e.tagName === 'TR' ? e.lastElementChild : e).appendChild(b);
    });
    S.order.forEach(k => { const w = S.win.f; });
  }

  function typeURL(u) {
    const el = $('#url'); el.classList.remove('done'); el.textContent = ''; let i = 0;
    const tm = setInterval(() => { el.textContent = 'https://' + u.slice(0, ++i); if (i >= u.length) { clearInterval(tm); el.classList.add('done'); } }, 14);
  }

  function updateChrome() {
    const t = S.tool, w = S.win, p = BL.toolProgress(t), pct = p.total ? p.done / p.total : 0, C = 2 * Math.PI * 22;
    $('#ring').innerHTML = `<svg width="56" height="56"><circle cx="28" cy="28" r="22" fill="none" stroke="#22314F" stroke-width="5"/><circle cx="28" cy="28" r="22" fill="none" stroke="url(#rg)" stroke-width="5" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}" style="transition:stroke-dashoffset .8s"/><defs><linearGradient id="rg"><stop offset="0" stop-color="#22D3EE"/><stop offset="1" stop-color="#818CF8"/></linearGradient></defs></svg><b>${Math.round(pct * 100)}%</b>`;
    $$('#wtabs button').forEach(b => {
      const win = t.windows.find(x => x.id === b.dataset.w), d = (prog[t.id] && prog[t.id][win.id] || []).length;
      b.classList.toggle('on', win === w); $('em', b).textContent = `${d}/${Object.keys(win.f).length}`;
    });
    const on = $('#wtabs button.on'), ink = $('#wtabs .ink'); if (on) { ink.style.left = on.offsetLeft + 'px'; ink.style.width = on.offsetWidth + 'px'; }
    $('#strip').innerHTML = `<span>Window <b>${t.windows.indexOf(w) + 1}</b> of ${t.windows.length}</span><span>·</span><span><b>${S.order.length}</b> clickable parts</span><span>·</span><span>Explored <b>${p.done}</b> / ${p.total} in this tool</span>`;
    $$('.nb', $('#page')).forEach(b => { const k = b.parentElement.closest('[data-f]').dataset.f; b.classList.toggle('done', isDone(w, k)); });
  }

  function markDone(k) {
    const t = S.tool, w = S.win; prog[t.id] = prog[t.id] || {}; prog[t.id][w.id] = prog[t.id][w.id] || [];
    if (prog[t.id][w.id].includes(k)) return; prog[t.id][w.id].push(k); save(); updateChrome();
    const wd = prog[t.id][w.id].length, wt = Object.keys(w.f).length, p = BL.toolProgress(t);
    if (p.done === p.total) BL.toast(`🏆 ${t.name} mastered! Every part explored.`); else if (wd === wt) BL.toast(`✅ Window complete: ${w.title}`);
  }

  /* ---------- selecting a feature ---------- */
  function pickSide(el) {
    if (narrow()) return 'R';
    if (S.mode === 'smart') {
      const sr = $('#stage').getBoundingClientRect(), r = el.getBoundingClientRect(), x = (r.left + r.width / 2 - sr.left) / sr.width;
      if (x < .42) return 'L'; if (x > .58) return 'R';
    }
    return S.last === 'L' ? 'R' : 'L';
  }

  function select(key, side) {
    const el = S.els[key]; if (!el) return;
    side = side || pickSide(el); const other = side === 'L' ? 'R' : 'L';
    if (S.slots[other] === key) { S.slots[other] = null; removeBubble(other); }
    S.slots[side] = key; S.last = side; markDone(key);
    const d = expand(S.win.f[key]), n = el.dataset.n, i = S.order.indexOf(key);
    const gut = $('#gut' + side); gut.innerHTML = '';
    const b = document.createElement('div'); b.className = 'bubble ' + side; b.dataset.key = key;
    if (narrow()) { const o = $('#gut' + other); o.innerHTML = ''; S.slots[other] = null; }
    const sec = (lab, txt) => txt ? `<div class="s"><span class="lab">${lab}</span><p>${txt}</p></div>` : '';
    b.innerHTML = `<div class="cloud-bg"><div class="cb-body"></div></div><div class="cloud-text"><button class="x" aria-label="Close">✕</button>
      <h3><span class="num">${n}</span>${d.title}</h3>${sec('What it shows', d.what)}${sec('How to read it', d.read)}
      ${d.good || d.bad ? `<div class="s gb">${d.good ? `<div class="g"><b>Good sign</b>${d.good}</div>` : ''}${d.bad ? `<div class="b"><b>Watch out</b>${d.bad}</div>` : ''}</div>` : ''}
      ${d.tip ? `<div class="s tip">💡 ${d.tip}</div>` : ''}${d.deep ? `<div class="s deep-only"><span class="lab">Under the hood</span><p>${d.deep}</p></div>` : ''}
      <div class="bnav"><button data-nav="-1">‹ prev</button><span>${i + 1} / ${S.order.length}</span><button data-nav="1">next ›</button></div></div>`;
    gut.appendChild(b);
    $('.x', b).onclick = () => { S.slots[side] = null; removeBubble(side); paint(); };
    $$('.bnav button', b).forEach(x => x.onclick = () => { const j = (i + (+x.dataset.nav) + S.order.length) % S.order.length; const k2 = S.order[j]; S.els[k2].scrollIntoView({ block: 'center', behavior: 'smooth' }); setTimeout(() => select(k2, side), 350); });
    place(side, el); b.classList.add('show'); paint(); ripple(el);
    setTimeout(() => { const r = b.getBoundingClientRect(); if (r.bottom > innerHeight - 10 || r.top < 70) b.scrollIntoView({ block: r.height > innerHeight - 100 ? 'start' : 'nearest', behavior: 'smooth' }); }, 650);
  }

  function removeBubble(side) { $('#gut' + side).innerHTML = ''; $('#ar' + side).classList.remove('on'); $('#dt' + side).style.display = 'none'; paint(); }
  function paint() {
    $$('.hl-L,.hl-R', $('#page')).forEach(e => e.classList.remove('hl-L', 'hl-R'));
    ['L', 'R'].forEach(s => { const k = S.slots[s]; if (k && S.els[k]) S.els[k].classList.add('hl-' + s); });
  }
  function ripple(el) { const r = document.createElement('span'); r.className = 'rip'; r.style.left = '24px'; r.style.top = '12px'; el.appendChild(r); setTimeout(() => r.remove(), 750); }

  function place(side, el) {
    const b = $('#gut' + side + ' .bubble'); if (!b) return; el = el || S.els[S.slots[side]];
    const gut = $('#gut' + side), arena = $('#arena');
    if (narrow()) { BL.cloudify(b); return; }
    const g = gut.getBoundingClientRect(), er = el.getBoundingClientRect();
    const cy = er.top + Math.min(er.height, 56) / 2 - g.top, h = b.offsetHeight;
    let top = Math.max(0, cy - 80);
    const need = top + h + 40; if (need > arena.offsetHeight) arena.style.minHeight = need + 'px';
    const gh = gut.getBoundingClientRect().height; if (top + h > gh) top = Math.max(0, gh - h - 10);
    b.style.top = top + 'px';
    const ty = Math.min(Math.max(cy - top, 34), h - 34);
    BL.cloudify(b, side, ty); b.dataset.ty = ty; arrow(side, el);
  }

  function arrow(side, el) {
    const b = $('#gut' + side + ' .bubble'), A = $('#arena').getBoundingClientRect(); if (!b || !el) return;
    const br = b.getBoundingClientRect(), er = el.getBoundingClientRect(), sr = $('#stage').getBoundingClientRect(), ty = +b.dataset.ty || 40;
    const x1 = (side === 'L' ? br.right + 40 : br.left - 40) - A.left, y1 = br.top + ty - A.top;
    const far = side === 'L' ? er.left - sr.left > 150 : sr.right - er.right > 150;   // distant feature: arc over the page and land on its top edge
    let d;
    if (far) {
      const x2 = er.left + Math.min(er.width / 2, 60) - A.left, y2 = er.top - A.top - 3, lift = 90 + Math.min(Math.abs(y1 - y2) * .2, 60);
      d = `M${x1},${y1} C${x1 + (side === 'L' ? 90 : -90)},${Math.min(y1, y2) - lift} ${x2},${y2 - lift} ${x2},${y2}`;
    } else {
      const x2 = (side === 'L' ? er.left - 5 : er.right + 5) - A.left, y2 = er.top + Math.min(er.height, 56) / 2 - A.top;
      const dx = Math.max(Math.abs(x2 - x1) * .5, 50) * (x2 > x1 ? 1 : -1);
      d = `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
    }
    const p = $('#ar' + side); p.setAttribute('d', d); p.classList.remove('on'); void p.getBoundingClientRect(); setTimeout(() => p.classList.add('on'), 250);
    $('#mo' + side).setAttribute('path', d); setTimeout(() => $('#dt' + side).style.display = 'block', 400);
  }

  function relayout() { ['L', 'R'].forEach(s => { const k = S.slots[s]; if (k) place(s, S.els[k]); }); }
  let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { if (S.tool && $('#arena')) { updateChrome(); relayout(); } }, 150); });

  document.addEventListener('click', e => {
    const page = $('#page'); if (!page || !page.contains(e.target)) return;
    const f = e.target.closest('[data-f]'); if (f && S.els[f.dataset.f]) select(f.dataset.f);
  });
  document.addEventListener('keydown', e => {
    if (!S.tool || !$('#arena')) return;
    if (e.key === 'Escape') { ['L', 'R'].forEach(s => { S.slots[s] = null; removeBubble(s); }); stopTour(); }
    if (S.tour >= 0 && e.key === 'ArrowRight') tourGo(1); if (S.tour >= 0 && e.key === 'ArrowLeft') tourGo(-1);
  });

  /* ---------- guided tour ---------- */
  function tourStart() {
    if (!S.order.length) return; S.mode = 'alt'; $$('#modeTog button').forEach(x => x.classList.toggle('on', x.dataset.m === 'alt'));
    S.tour = -1; const bar = document.createElement('div'); bar.className = 'tourbar'; bar.id = 'tourbar';
    bar.innerHTML = '<button class="btn sm" id="tp">‹ Prev</button><span id="tc"></span><button class="btn pri sm" id="tn">Next ›</button><button class="btn sm" id="tx">✕ End</button>';
    $('#tourbar') && $('#tourbar').remove(); document.body.appendChild(bar);
    $('#tp').onclick = () => tourGo(-1); $('#tn').onclick = () => tourGo(1); $('#tx').onclick = () => stopTour();
    tourGo(1);
  }
  function tourGo(d) {
    const n = S.order.length; S.tour = S.tour < 0 ? 0 : Math.min(Math.max(S.tour + d, 0), n - 1);
    const k = S.order[S.tour]; $('#tc').textContent = `Step ${S.tour + 1} of ${n}`; $('#tn').textContent = S.tour === n - 1 ? 'Finish ✓' : 'Next ›';
    S.els[k].scrollIntoView({ block: 'center', behavior: 'smooth' }); setTimeout(() => select(k), 380);
    if (d > 0 && S.tour === n - 1 && S.finishing) stopTour();
    S.finishing = S.tour === n - 1;
  }
  function stopTour(silent) { S.tour = -1; S.finishing = false; const b = $('#tourbar'); if (b) b.remove(); }
  BL.leaveTool = () => { stopTour(true); S.tool = null; };
})();
