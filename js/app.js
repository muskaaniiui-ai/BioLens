/* BioLens site: router + Home / About / Dashboard / Glossary / Contact */
(function () {
  const $ = BL.$, $$ = BL.$$, view = $('#view');
  const TEAM = { name: 'Team BioLens', institution: 'International Islamic University Islamabad · Department of Bioinformatics', email: 'muskaan.iiui@gmail.com',
    members: [['Muskan Bibi', 'Project lead · interface & animation'], ['Manahil Fida Raja', 'Content · tool replicas'], ['Memoona Muhkam', 'Biology review · explanations']] };
  const PATHS = [
    ['From a raw sequence to its function', '🧬', ['genbank', 'blast', 'uniprot', 'interpro']],
    ['From a gene to a disease', '🏥', ['ncbigene', 'ensembl', 'clinvar', 'genecards']],
    ['From a protein to its 3D shape', '🔮', ['uniprot', 'alphafold', 'swissmodel', 'pdb']],
    ['Compare sequences & partners', '🔗', ['blast', 'clustal', 'string']]];
  let timers = [];
  const later = (f, ms) => { const t = setTimeout(f, ms); timers.push(t); return t; };
  const every = (f, ms) => { const t = setInterval(f, ms); timers.push(t); return t; };

  /* ---------- router ---------- */
  function route() {
    timers.forEach(clearTimeout); timers.forEach(clearInterval); timers = [];
    const parts = (location.hash.replace(/^#\/?/, '') || 'home').split('/'), r = parts[0];
    if (r !== 'tool') BL.leaveTool();
    $$('#links a').forEach(a => a.classList.toggle('on', a.dataset.r.split(',').includes(r)));
    $('#links').classList.remove('open');
    if (r === 'tool') { BL.openTool(parts[1], parts[2]); window.scrollTo({ top: 0 }); return; }
    const pages = { home, about, dashboard, glossary, contact };
    view.style.animation = 'none'; void view.offsetWidth; view.style.animation = '';
    view.innerHTML = (pages[r] || home)(); window.scrollTo({ top: 0 });
    (({ home: initHome, dashboard: initDash, glossary: initGloss, contact: initContact })[r] || (() => { }))();
    initReveal();
  }
  window.addEventListener('hashchange', route);
  $('#burger').onclick = () => $('#links').classList.toggle('open');

  function initReveal() {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
    $$('.reveal').forEach(e => io.observe(e));
  }
  const countUp = el => { const to = +el.dataset.to, t0 = performance.now(); const f = t => { const p = Math.min((t - t0) / 1400, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + (el.dataset.plus ? '+' : ''); if (p < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); };
  const toolLink = id => { const t = BL.byId[id]; return t ? `<a href="#/tool/${id}">${t.icon} ${t.name}</a>` : ''; };
  const pathHTML = p => `<div class="card reveal"><h4>${p[1]} ${p[0]}</h4><div class="path">${p[2].map(toolLink).filter(Boolean).join('<span>→</span>')}</div></div>`;

  /* ---------- HOME ---------- */
  function home() {
    const c = BL.counts();
    return `<div class="wrap"><section class="hero"><div>
      <span class="eyebrow">Interactive learning · bioinformatics tools</span>
      <h1>Learn to read the tools. <span class="grad">Click. See. Understand.</span></h1>
      <p class="lead">BioLens opens realistic replicas of BLAST, UniProt, AlphaFold and more. Click any part of the result and a friendly cloud explains what it shows, how to read it and what to watch out for. No data to upload; just learn.</p>
      <div class="cta"><a class="btn pri" href="#/dashboard">🚀 Open the dashboard</a><a class="btn" href="#/tool/blast">🎯 Try BLAST now</a><a class="btn" href="#/about">Why we built it</a></div>
      <div class="stats"><div class="stat"><b class="cu" data-to="${c.tools}">0</b><span>tools</span></div><div class="stat"><b class="cu" data-to="${c.windows}">0</b><span>interactive windows</span></div><div class="stat"><b class="cu" data-to="${c.features}" data-plus="1">0</b><span>explained features</span></div></div>
    </div>
    <div class="mini-wrap" id="mw"><div class="mini"><div class="mb"><i></i><i></i><i></i><span>blast.ncbi.nlm.nih.gov/Blast.cgi</span></div><div class="mh">BLAST® » blastp results</div>
      <table><thead><tr><th>Description</th><th id="m1">Query Cover</th><th id="m2">E value</th><th id="m3">Per. Ident</th></tr></thead><tbody>
      <tr><td>p53 [Homo sapiens]</td><td>100%</td><td>0.0</td><td>100.0%</td></tr><tr><td>p53 [Mus musculus]</td><td>99%</td><td>0.0</td><td>77.1%</td></tr>
      <tr><td>hypothetical [fish]</td><td>11%</td><td>6e-10</td><td>84.0%</td></tr></tbody></table>
      <svg class="cur" id="cur" viewBox="0 0 24 24" style="left:20px;top:150px"><path d="M4 2l16 9-7 2 4 8-3 1-4-8-6 5z" fill="#111" stroke="#fff" stroke-width="1.5"/></svg></div>
      <div class="bubble R hb" id="hb" style="position:absolute;bottom:0;width:300px"></div></div></section>
    <div class="marq"><div class="tr">${BL.tools.concat(BL.tools).map(t => `<span class="chip">${t.icon} ${t.name}</span>`).join('')}</div></div>
    <section class="sec"><div class="sec-h reveal"><span class="eyebrow">How you learn</span><h2>Three clicks to understanding</h2><p>Every tool follows the same simple loop.</p></div>
      <div class="grid g3 steps">
        <div class="card step reveal"><h4>Pick a tool</h4><p>Choose BLAST, UniProt, AlphaFold, ClinVar… from the dashboard. Its real-looking interface opens with an animation.</p></div>
        <div class="card step reveal"><h4>Click a numbered part</h4><p>Every marker is a feature of the real page: a column, a score, a track, a button. The part glows and an arrow points to your cloud.</p></div>
        <div class="card step reveal"><h4>Read the cloud</h4><p>It explains what it shows, how to read it, good signs, warnings and the next step. Click another part and it opens on the other side to compare.</p></div></div></section>
    <section class="sec"><div class="sec-h reveal"><span class="eyebrow">What makes it different</span><h2>Built for students, faithful to the tools</h2></div>
      <div class="grid g3">${[['🪟', 'Several windows per tool', 'BLAST alone has nine: program choice, parameters, descriptions, graphic summary, alignments, taxonomy, tree and more.'], ['☁️', 'Clouds on both sides', 'Compare two features at once: E-value on the left, identity on the right.'], ['🧭', 'Guided tours', 'Press Start tour and BioLens walks you through every part in order.'], ['✅', 'Progress tracking', 'Markers turn green when you explore them. Finish a tool and earn a trophy.'], ['🎓', 'Simple or expert', 'Switch on Expert notes for the statistics under the hood.'], ['📚', 'Built-in glossary', 'Every technical term in plain English, searchable.']]
        .map((x, i) => `<div class="card reveal" style="transition-delay:${i * 60}ms"><div class="ic">${x[0]}</div><h4>${x[1]}</h4><p>${x[2]}</p></div>`).join('')}</div></section>
    <section class="sec"><div class="sec-h reveal"><span class="eyebrow">Learning paths</span><h2>Follow the story of a gene</h2><p>Real research moves from tool to tool. Pick a path and learn them in order.</p></div><div class="grid g2">${PATHS.map(pathHTML).join('')}</div></section>
    <section class="sec"><div class="card reveal" style="text-align:center;padding:2.6rem"><h2>Ready to look inside the tools?</h2><p style="margin:.6rem 0 1.4rem">It opens in your browser. No sign-up, nothing to install.</p><a class="btn pri" href="#/dashboard">Open the dashboard →</a></div></section></div>`;
  }

  function initHome() {
    $$('.cu').forEach(countUp);
    const steps = [['m2', 'R', 'E value', 'The chance of finding a match this good <b>by pure luck</b>. Smaller is better. 0.0 means impossible by chance.'],
      ['m1', 'L', 'Query Cover', 'How much of <b>your</b> sequence lines up. The hypothetical fish hit only covers 11%.'],
      ['m3', 'R', 'Per. Ident', 'Share of identical letters. High identity on a tiny piece is not impressive.']];
    let i = 0; const mw = $('#mw'), hb = $('#hb'), cur = $('#cur'), mini = $('.mini');
    const tick = () => {
      if (!$('#mw')) return; const [id, side, title, txt] = steps[i % steps.length]; i++;
      $$('.mini th').forEach(t => t.classList.remove('hot')); const th = $('#' + id), r = th.getBoundingClientRect(), m = mini.getBoundingClientRect();
      cur.style.left = (r.left - m.left + r.width / 2 - 4) + 'px'; cur.style.top = (r.top - m.top + r.height / 2 - 2) + 'px';
      later(() => { th.classList.add('hot'); hb.className = `bubble ${side} hb`; hb.style.left = side === 'R' ? 'auto' : '0'; hb.style.right = side === 'R' ? '0' : 'auto';
        hb.innerHTML = `<div class="cloud-bg"><div class="cb-body"></div></div><div class="cloud-text"><h3>${title}</h3><div class="s"><p>${txt}</p></div></div>`;
        BL.cloudify(hb); void hb.offsetWidth; hb.classList.add('show'); }, 950);
    };
    later(tick, 1200); every(tick, 5200);
  }

  /* ---------- ABOUT ---------- */
  function about() {
    return `<div class="wrap"><section class="sec reveal" style="padding-bottom:1rem"><span class="eyebrow">About BioLens</span><h1 style="font-size:2.8rem;margin:.8rem 0">Why we built <span class="grad">BioLens</span></h1>
      <div class="prose"><p>Bioinformatics tools give correct answers in dense, technical layouts. A new student opens a BLAST result and sees a wall of numbers: <i>E-value, query cover, bit score, max score vs total score…</i> Which ones matter? Which are traps?</p>
      <div class="quote">“I could run the tool. I just couldn’t read what it told me.”</div>
      <p>Textbooks explain concepts, and tutorials show clicks, but few resources explain the <b>actual output page</b>: this column, that colour, this number. BioLens fills that gap.</p></div></section>
    <section class="sec"><div class="sec-h reveal"><span class="eyebrow">The story</span><h2>How the idea came</h2></div><div class="timeline prose">
      <div class="t reveal"><h4>1 · The confusion</h4><p>Watching classmates paste a sequence into BLAST, copy the first hit and move on, never checking coverage or E-value.</p></div>
      <div class="t reveal"><h4>2 · The gap</h4><p>Every tool has documentation, but it lives in separate manuals, in a different style, away from the results you are looking at.</p></div>
      <div class="t reveal"><h4>3 · The idea</h4><p>What if the explanation lived <b>on</b> the result? Open a replica of the real page, click a part, and get a short explanation exactly where you are looking.</p></div>
      <div class="t reveal"><h4>4 · BioLens</h4><p>Many tools, many windows, animated clouds and arrows, tours and progress tracking: a learning space for anyone who analyses sequences.</p></div></div></section>
    <section class="sec"><div class="grid g2"><div class="card reveal"><div class="ic">🔭</div><h4>Our vision</h4><p>A world where every student can open any bioinformatics result and understand it with confidence. Where interpreting data is a skill taught as carefully as running the tool.</p></div>
      <div class="card reveal"><div class="ic">🎯</div><h4>Our mission</h4><p>Turn the most-used bioinformatics tools into interactive, visual lessons that explain what every feature shows, how to read it, and what mistakes to avoid.</p></div></div></section>
    <section class="sec"><div class="sec-h reveal"><span class="eyebrow">How it works</span><h2>The anatomy of a lesson</h2></div>
      <div class="grid g4">${[['🪟', 'A replica window', 'The tool’s interface in the middle of the screen, with the same sections and labels as the real site.'], ['🔢', 'Numbered markers', 'Each marker is one feature. Hover shows a dashed outline; click opens its explanation.'], ['☁️', 'A cloud on the left or right', 'The explanation appears beside the window. Click another feature and it opens on the other side so two can be compared.'], ['➡️', 'An animated arrow', 'A flowing arrow links the cloud to the exact feature so you never lose track of what is being explained.']]
        .map(x => `<div class="card reveal"><div class="ic">${x[0]}</div><h4>${x[1]}</h4><p>${x[2]}</p></div>`).join('')}</div></section>
    <section class="sec"><div class="sec-h reveal"><span class="eyebrow">Principles</span><h2>What we promise</h2></div><div class="grid g3">
      ${[['🧪', 'Faithful', 'Replicas use the real section names, columns and workflows of each tool.'], ['🧠', 'Plain English first', 'Simple explanation first; statistics and formulas in optional Expert notes.'], ['🚦', 'Honest', 'We say what a result does NOT prove, and list classic mistakes for every tool.']]
        .map(x => `<div class="card reveal"><div class="ic">${x[0]}</div><h4>${x[1]}</h4><p>${x[2]}</p></div>`).join('')}</div>
      <div class="note reveal" style="margin-top:1.2rem"><b>Please note:</b> BioLens is for learning. The replicas are simplified, all values are illustrative examples, and the real sites change over time. Always confirm real results with the original tools and the literature. It is not for clinical decisions.</div></section>
    <section class="sec"><div class="sec-h reveal"><span class="eyebrow">Team</span><h2>${TEAM.name}</h2><p>${TEAM.institution}</p></div><div class="grid g3">${TEAM.members.map(m => `<div class="card reveal"><div class="ic">🧑‍💻</div><h4>${m[0]}</h4><p>${m[1]}</p></div>`).join('')}</div></section>
    <section class="sec"><div class="sec-h reveal"><span class="eyebrow">What’s next</span><h2>Roadmap</h2></div><div class="grid g3">
      ${[['More tools', 'Primer-BLAST, KEGG, Reactome, Galaxy, IGV and genome browsers.'], ['Quizzes per tool', 'Test yourself on what each window shows.'], ['Teacher mode', 'Share a tool and a reading task with a class.']].map(x => `<div class="card reveal"><h4>${x[0]}</h4><p>${x[1]}</p></div>`).join('')}</div></section></div>`;
  }

  /* ---------- DASHBOARD ---------- */
  function dashboard() {
    const cats = ['All', ...new Set(BL.tools.map(t => t.cat))], last = BL.byId[localStorage.getItem('biolens_last')];
    return `<div class="wrap"><section class="sec" style="padding-bottom:0"><span class="eyebrow">Dashboard</span><h1 style="font-size:2.4rem;margin:.7rem 0 .3rem">Which tool do you want to <span class="grad">learn</span>?</h1>
      <p class="lead" style="max-width:44rem">Choose a tool. Its interface opens, and every part is clickable. Nothing to upload; just explore.</p>
      ${last ? `<p style="margin-top:1rem"><a class="btn sm" href="#/tool/${last.id}">↩ Continue where you left off: ${last.icon} ${last.name}</a></p>` : ''}
      <div class="dash-top"><div class="search"><input id="q" placeholder="Search tools (e.g. alignment, structure, disease)…" autocomplete="off"></div><div class="filters" id="fl">${cats.map((c, i) => `<button class="${i ? '' : 'on'}" data-c="${c}">${c}</button>`).join('')}</div></div></section>
      <div class="grid g3" id="tg"></div>
      <section class="sec"><div class="sec-h"><span class="eyebrow">Learning paths</span><h2>Not sure where to start?</h2></div><div class="grid g2">${PATHS.map(pathHTML).join('')}</div></section></div>`;
  }
  function initDash() {
    const grid = $('#tg'); let cat = 'All', q = '';
    const draw = () => {
      const list = BL.tools.filter(t => (cat === 'All' || t.cat === cat) && (t.name + t.cat + t.question + t.about).toLowerCase().includes(q));
      grid.innerHTML = list.length ? list.map((t, i) => { const p = BL.toolProgress(t), pct = p.total ? Math.round(p.done / p.total * 100) : 0;
        return `<div class="card tool-card" data-id="${t.id}" style="--tc:${t.color};--i:${i}"><div class="top"><div class="ico">${t.icon}</div><div><div class="cat">${t.cat}</div><h3>${t.name}</h3></div></div>
        <div class="q">${t.question}</div><div class="meta"><span class="chip">🪟 ${t.windows.length} windows</span><span class="chip">🔢 ${t.windows.reduce((a, w) => a + Object.keys(w.f).length, 0)} features</span></div>
        <div class="pg"><i style="width:${pct}%"></i></div><div class="go"><span>${pct ? pct + '% explored' : 'Not started'}</span><b>Open →</b></div></div>`; }).join('') : '<div class="empty" style="grid-column:1/-1">No tool matches that search.</div>';
      $$('.tool-card', grid).forEach(c => { c.onclick = () => { c.style.transform = 'scale(.97)'; location.hash = '#/tool/' + c.dataset.id; };
        c.onmousemove = e => { const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top; c.style.setProperty('--mx', x + 'px'); c.style.setProperty('--my', y + 'px'); c.style.transform = `perspective(900px) rotateX(${(y / r.height - .5) * -6}deg) rotateY(${(x / r.width - .5) * 6}deg) translateY(-5px)`; };
        c.onmouseleave = () => c.style.transform = ''; });
    };
    $('#q').oninput = e => { q = e.target.value.toLowerCase(); draw(); };
    $$('#fl button').forEach(b => b.onclick = () => { cat = b.dataset.c; $$('#fl button').forEach(x => x.classList.toggle('on', x === b)); draw(); });
    draw();
  }

  /* ---------- GLOSSARY ---------- */
  function glossary() {
    return `<div class="wrap"><section class="sec"><span class="eyebrow">Glossary</span><h1 style="font-size:2.4rem;margin:.7rem 0">Every term, in <span class="grad">plain English</span></h1>
      <div class="dash-top"><div class="search"><input id="gq" placeholder="Search terms…" autocomplete="off"></div><div class="filters" id="gf"></div></div><div class="grid g2" id="gl"></div></section></div>`;
  }
  function initGloss() {
    const cats = ['All', ...new Set(BL.glossary.map(g => g[1]))]; let cat = 'All', q = '';
    $('#gf').innerHTML = cats.map((c, i) => `<button class="${i ? '' : 'on'}" data-c="${c}">${c}</button>`).join('');
    const draw = () => { $('#gl').innerHTML = BL.glossary.filter(g => (cat === 'All' || g[1] === cat) && (g[0] + g[2]).toLowerCase().includes(q)).sort((a, b) => a[0].localeCompare(b[0]))
      .map(g => `<div class="gl-item"><h4>${g[0]} <span class="chip" style="font-size:.65rem">${g[1]}</span></h4><p>${g[2]}</p></div>`).join('') || '<div class="empty">Nothing found.</div>'; };
    $('#gq').oninput = e => { q = e.target.value.toLowerCase(); draw(); };
    $$('#gf button').forEach(b => b.onclick = () => { cat = b.dataset.c; $$('#gf button').forEach(x => x.classList.toggle('on', x === b)); draw(); });
    draw();
  }

  /* ---------- CONTACT ---------- */
  function contact() {
  return `<div class="wrap"><section class="sec"><span class="eyebrow">Contact</span><h1 style="font-size:2.4rem;margin:.7rem 0">Questions, ideas, <span class="grad">a tool we should add?</span></h1>
    <div class="grid g2" style="margin-top:1.4rem">
      <form class="form card" id="cf">
        <input id="cn" placeholder="Your name" required>
        <input id="ce" type="email" placeholder="Your email" required>
        <select id="ct">
          <option>Feedback</option>
          <option>Request a new tool</option>
          <option>Found a mistake</option>
          <option>Collaboration</option>
        </select>
        <textarea id="cm" rows="6" placeholder="Your message" required></textarea>
        <button class="btn pri" type="submit">Send message ✉️</button>
        <p id="cf-status" role="status" aria-live="polite" style="margin-top:.8rem"></p>
      </form>

      <div>
        <div class="card">
          <div class="ic">✉️</div>
          <h4>Email</h4>
          <p><a href="mailto:${TEAM.email}">${TEAM.email}</a></p>
        </div>
        <div class="card" style="margin-top:1rem">
          <div class="ic">🏛️</div>
          <h4>${TEAM.name}</h4>
          <p>${TEAM.institution}</p>
        </div>
        <div class="card" style="margin-top:1rem">
          <h4>Your progress</h4>
          <p>Progress is saved only in this browser.</p>
          <p style="margin-top:.7rem">
            <button class="btn sm" id="rp">Reset my progress</button>
          </p>
        </div>
      </div>
    </div>

    <div class="sec-h" style="margin-top:2.4rem"><h2>FAQ</h2></div>
    <details>
      <summary>Is this the real BLAST / UniProt website?</summary>
      <p>No. These are simplified replicas for learning, with example data. They use the same sections and labels so you recognise the real pages.</p>
    </details>
    <details>
      <summary>Do I need to upload my data?</summary>
      <p>No. BioLens never asks for sequences. It is purely for learning how to read outputs.</p>
    </details>
    <details>
      <summary>Can I trust the numbers shown?</summary>
      <p>They are illustrative. The explanations (what a column means, how to judge it) follow the tools’ documentation, but always check the originals for real work.</p>
    </details>
    <details>
      <summary>How do I add a new tool?</summary>
      <p>Copy a file in <code>js/tools/</code>, change the HTML and the explanations, and add its script tag to <code>index.html</code>. See the README.</p>
    </details>
  </section></div>`;
}
  function initContact() {
  const form = $('#cf');
  const button = form.querySelector('button[type="submit"]');
  const status = $('#cf-status');

  form.onsubmit = async e => {
    e.preventDefault();

    const name = $('#cn').value.trim();
    const email = $('#ce').value.trim();
    const category = $('#ct').value;
    const message = $('#cm').value.trim();

    if (!name || !email || !message) {
      BL.toast('Please complete all fields.');
      return;
    }

    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('_replyto', email);
    formData.append('category', category);
    formData.append('message', message);
    formData.append('_subject', 'New BioLens Feedback: ' + category);

    button.disabled = true;
    button.textContent = 'Sending...';
    status.textContent = '';

    try {
      const response = await fetch(
        'https://formspree.io/f/xeaaldog',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      if (response.ok) {
        form.reset();
        status.textContent = '✓ Message sent successfully! Thank you for contacting BioLens.';
        status.style.color = '#16a34a';
        BL.toast('Feedback sent successfully!');
      } else {
        throw new Error('Submission failed');
      }

    } catch (error) {
      status.textContent = 'Unable to send your message. Please try again later.';
      status.style.color = '#dc2626';
      BL.toast('Message could not be sent.');
    } finally {
      button.disabled = false;
      button.textContent = 'Send message ✉️';
    }
  };

  $('#rp').onclick = () => {
    BL.resetProgress();
    BL.toast('Progress reset');
  };
}
  route();
})();
