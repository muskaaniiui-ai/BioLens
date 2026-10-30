/* Helpers for writing replica pages quickly. F() marks a clickable feature: data-f="key". */
window.H = {
  F(k, inner, o) { o = o || {}; const t = o.tag || 'div'; return `<${t} class="${o.cls || ''}" data-f="${k}"${o.style ? ` style="${o.style}"` : ''}>${inner}</${t}>`; },
  hot(k, l, t, w, h) { return `<div class="hot" data-f="${k}" style="left:${l}px;top:${t}px;width:${w}px;height:${h}px"></div>`; },
  top(name, sub, links, brand) { return `<div class="rp-top" style="${brand ? '--b:' + brand : ''}"><span>${name}</span><small>${sub || ''}</small><span class="sp"></span>${(links || []).map(l => `<a>${l}</a>`).join('')}</div>`; },
  nav(links) { return `<div class="rp-nav">${links.map(l => `<a>${l}</a>`).join('')}</div>`; },
  tabs(list, active) { return `<div class="rp-tabs">${list.map((t, i) => `<span class="${i === active ? 'on' : ''}">${t}</span>`).join('')}</div>`; },
  tbl(heads, rows, cls) {
    let h = `<table class="rp-tbl ${cls || ''}"><thead><tr>` + heads.map(x => Array.isArray(x) ? `<th data-f="${x[1]}">${x[0]}</th>` : `<th>${x}</th>`).join('') + '</tr></thead><tbody>';
    rows.forEach(r => { const arr = Array.isArray(r); const c = arr ? r : r.c; h += `<tr${!arr && r.k ? ` data-f="${r.k}"` : ''}>` + c.map(x => `<td>${x}</td>`).join('') + '</tr>'; });
    return h + '</tbody></table>';
  },
  kv(rows) { return '<div class="rp-kv">' + rows.map(r => `<div>${r[0]}</div><div${r[2] ? ` data-f="${r[2]}"` : ''}>${r[1]}</div>`).join('') + '</div>'; },
  pill: (t, c) => `<span class="rp-pill ${c || ''}">${t}</span>`,
  bar: (p, c) => `<span class="rp-bar"><i style="width:${p}%;${c ? 'background:' + c : ''}"></i></span>`,
  btn: (t, c) => `<span class="rp-btn ${c || ''}">${t}</span>`,
  inp: (t, w) => `<span class="rp-in ${w ? 'w' : ''}">${t}</span>`,
  chk: (t, off) => `<span class="rp-chk ${off ? 'off' : ''}">${t}</span>`,
  track(items, total) { return items.map(i => `<div class="rp-track"><i style="left:${(i.s - 1) / total * 100}%;width:${Math.max((i.e - i.s + 1) / total * 100, 1.5)}%;background:${i.c || '#6366f1'}">${i.t || ''}</i></div>`).join(''); },
  row(items, total) { return '<div class="rp-track">' + items.map(i => `<i style="left:${(i.s - 1) / total * 100}%;width:${Math.max((i.e - i.s + 1) / total * 100, 1.5)}%;background:${i.c || '#6366f1'}">${i.t || ''}</i>`).join('') + '</div>'; },
  cons: { I: 'ILVM', L: 'ILVM', V: 'ILVM', M: 'ILVM', F: 'FYW', Y: 'FYW', W: 'FYW', K: 'KRH', R: 'KRH', H: 'KRH', D: 'DE', E: 'DE', S: 'ST', T: 'ST', N: 'NQ', Q: 'NQ', A: 'AG', G: 'AG' },
  mid(q, s) { return [...q].map((a, i) => a === s[i] ? '|' : (H.cons[a] && H.cons[a].includes(s[i]) ? '+' : ' ')).join(''); },
  /* BLAST-style alignment block, 60 columns per row. keys = {q,m,s,n} feature keys */
  aln(q, s, qs, ss, keys) {
    keys = keys || {}; const m = H.mid(q, s); let out = '<div class="rp-pre rp-aln">';
    const f = (k, t) => k ? `<span class="ln" data-f="${k}">${t}</span>` : `<span class="ln">${t}</span>`;
    for (let i = 0; i < q.length; i += 60) {
      const qc = q.slice(i, i + 60), sc = s.slice(i, i + 60), mc = m.slice(i, i + 60);
      const pad = (n) => String(n).padStart(4);
      const sh = [...sc].map((c, j) => c !== qc[j] ? `<span class="mm">${c}</span>` : c).join('');
      out += f(keys.q, `Query  ${pad(qs + i)}  ${qc}  ${qs + i + qc.length - 1}`) + f(keys.m, `${' '.repeat(13)}${mc}`) + f(keys.s, `Sbjct  ${pad(ss + i)}  ${sh}  ${ss + i + sc.length - 1}`) + '\n';
    }
    return out + '</div>';
  },
  mutate(seq, subs) { const a = [...seq]; Object.keys(subs).forEach(i => a[+i] = subs[i]); return a.join(''); },
};
