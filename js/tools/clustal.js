/* Clustal Omega (EMBL-EBI): multiple sequence alignment. Example data is illustrative. */
(function () {
  const F = H.F, top = () => H.top('EMBL-EBI', 'Job Dispatcher · Clustal Omega', ['Tools', 'Help & Documentation', 'Feedback'], '#1f6f8b');
  const Q = 'MEEPQSDPSVEPPLSQETFSDLWKLLPENNVLSDLLIDAWEPLPRCCDPQRSPSTPRLTPGSAPVLLGQD'.slice(0, 56);
  const mut = (s, ids) => [...s].map((a, i) => ids.includes(i) ? ((H.cons[a] || 'A').replace(a, '')[0] || 'A') : a).join('');
  const names = ['sp|P04637|P53_HUMAN', 'sp|P02340|P53_MOUSE', 'sp|P10361|P53_RAT', 'sp|P07193|P53_CHICK', 'sp|P07193|P53_XENLA', 'sp|P79734|P53_DANRE'];
  const seqs = [Q, mut(Q, [4, 9, 21, 33, 44]), mut(Q, [4, 9, 12, 21, 33, 45]), mut(Q, [2, 4, 9, 12, 18, 21, 26, 33, 40, 44]), mut(Q, [2, 4, 7, 9, 12, 14, 18, 21, 26, 29, 33, 37, 40, 44, 50]), mut(Q, [1, 2, 4, 7, 9, 12, 14, 16, 18, 21, 24, 26, 29, 33, 37, 40, 44, 47, 50, 53])]
    .map((s, i) => i === 3 ? s.slice(0, 20) + '--' + s.slice(22) : i === 5 ? s.slice(0, 30) + '---' + s.slice(33) : s);
  const col = { A: '#80a0f0', V: '#80a0f0', L: '#80a0f0', I: '#80a0f0', M: '#80a0f0', F: '#80a0f0', W: '#80a0f0', C: '#f08080', K: '#f01505', R: '#f01505', D: '#c048c0', E: '#c048c0', S: '#15c015', T: '#15c015', N: '#15c015', Q: '#15c015', G: '#f09048', P: '#c0c000', H: '#15a4a4', Y: '#15a4a4', '-': '#fff' };
  const msa = () => {
    let o = '<div class="rp-msa">'; const n = seqs[0].length, cons = [];
    for (let i = 0; i < n; i++) { const c = seqs.map(s => s[i]); const u = [...new Set(c)]; cons.push(u.length === 1 ? '*' : (!c.includes('-') && u.every(x => H.cons[x] && H.cons[x] === H.cons[u[0]]) ? ':' : (!c.includes('-') && u.length <= 3 ? '.' : ' '))); }
    seqs.forEach((s, r) => { o += `<div ${r === 0 ? 'data-f="m_names"' : ''}>` + `<span style="width:150px;text-align:left;color:#334">${names[r].padEnd(20)}</span>` + [...s].map(c => `<span style="background:${col[c] || '#fff'};color:${c === '-' ? '#334' : '#fff'}">${c}</span>`).join('') + ` <span style="width:auto;color:#667"> ${s.replace(/-/g, '').length}</span></div>`; });
    o += `<div style="margin-top:2px"><span style="width:150px"></span>${cons.map(c => `<span style="color:#0f4c81;font-weight:700">${c}</span>`).join('')}</div></div>`;
    return o;
  };
  const matrix = () => {
    const v = [[100, 91.07, 89.29, 78.57, 66.07, 55.36], [91.07, 100, 94.64, 76.79, 64.29, 53.57], [89.29, 94.64, 100, 75.0, 62.5, 51.79], [78.57, 76.79, 75.0, 100, 69.64, 57.14], [66.07, 64.29, 62.5, 69.64, 100, 60.71], [55.36, 53.57, 51.79, 57.14, 60.71, 100]];
    const c = x => `background:hsl(${Math.round(x * 1.2)},70%,${96 - x * .35}%)`;
    return `<table class="rp-tbl"><tr><th></th>${names.map((_, i) => `<th>${i + 1}</th>`).join('')}</tr>` + v.map((r, i) => `<tr><td><b>${i + 1}: ${names[i].split('|')[2]}</b></td>${r.map((x, j) => {
      const k = i === j ? 'p_diag' : (i === 0 && j === 1 ? 'p_high' : (i === 0 && j === 5 ? 'p_low' : ''));
      return `<td ${k ? `data-f="${k}"` : ''} style="${c(x)};text-align:center">${x.toFixed(2)}</td>`; }).join('')}</tr>`).join('') + '</table>';
  };
  BL.add({
    id: 'clustal', name: 'Clustal Omega', icon: '🧵', color: '#1f6f8b', cat: 'Search & alignment', url: 'ebi.ac.uk/jdispatcher/msa/clustalo',
    question: 'How do several sequences line up, and what is conserved?', about: 'Clustal Omega multiple sequence alignment MSA conservation guide tree percent identity',
    windows: [
      {
        id: 'input', title: 'Input form', icon: '📝', url: 'ebi.ac.uk/jdispatcher/msa/clustalo',
        html: () => `${top()}<div class="rp-pad"><h2>Clustal Omega</h2><p class="rp-mut">Multiple Sequence Alignment</p>
          <div class="rp-box"><h4>Step 1 · Enter your input sequences</h4>${F('c_type', 'Enter or paste a set of ' + H.chk('PROTEIN') + ' ' + H.chk('DNA', 1) + ' ' + H.chk('RNA', 1) + ' sequences in any supported format:', { tag: 'div' })}<br>
            ${F('c_seq', H.inp('>sp|P04637|P53_HUMAN\nMEEPQSDPSVEPPLSQETFSDLWKLL…\n>sp|P02340|P53_MOUSE\nMEESQSELNIDPPLSQETFSELWNLL…\n>sp|P10361|P53_RAT …', 1))}</div>
          <div class="rp-box"><h4>Step 2 · Set your parameters</h4>
            ${F('c_format', 'OUTPUT FORMAT ' + H.inp('ClustalW with character counts ▾'), { tag: 'div' })}<br>${F('c_dealign', 'DEALIGN INPUT SEQUENCES ' + H.inp('no ▾'), { tag: 'div' })}<br>
            ${F('c_mbed', 'MBED-LIKE CLUSTERING GUIDE-TREE ' + H.inp('yes ▾') + ' &nbsp; MBED-LIKE CLUSTERING ITERATION ' + H.inp('yes ▾'), { tag: 'div' })}<br>
            ${F('c_iter', 'NUMBER OF COMBINED ITERATIONS ' + H.inp('default(0) ▾') + ' MAX GUIDE TREE ITERATIONS ' + H.inp('default ▾'), { tag: 'div' })}<br>${F('c_order', 'ORDER ' + H.inp('aligned ▾'), { tag: 'div' })}</div>
          <div class="rp-box"><h4>Step 3 · Submit your job</h4>${F('c_submit', 'Be notified by email (optional) ' + H.inp('') + ' ' + H.btn('Submit'), { tag: 'span' })}</div></div>`,
        f: {
          c_type: ['Sequence type', 'Tells Clustal whether you are aligning protein, DNA or RNA.', 'The type decides the scoring system. Protein alignments use substitution matrices that reflect chemistry; DNA alignments only score matches.', 'Correct type = meaningful scores.', 'The wrong type gives nonsense or an error.', 'Align coding sequences as PROTEIN, then back-translate for better accuracy.'],
          c_seq: ['Your input sequences', 'Paste at least three sequences in FASTA format (a > name line, then the letters).', 'Every > header becomes the row label in the result. Short, unique names make the alignment readable.', 'Sequences from the same family/gene.', 'Unrelated sequences produce a meaningless alignment full of gaps.', 'Include the sequences you want to compare, plus an outgroup if you will build a tree.'],
          c_format: ['Output format', 'How the alignment is written: ClustalW (readable), FASTA, Pearson, PHYLIP, MSF, Mega, and others.', 'Pick ClustalW to read it yourself, or the format your next program needs (e.g. FASTA or PHYLIP for tree-building).', 'ClustalW with counts is good for reading.', null, 'Using Jalview or MEGA? Choose their native format.'],
          c_dealign: ['Dealign input sequences', 'If yes, existing gaps in your input are removed first and everything is realigned from scratch.', 'Needed if you paste sequences that were already aligned with another method.', null, 'Old gaps otherwise bias the new alignment.', 'Leave “no” for plain sequences.'],
          c_mbed: ['mBed-like clustering', 'Speeds up building the guide tree and iterating, so thousands of sequences can be aligned.', 'Clustal builds a quick tree of the sequences first and uses it to decide the alignment order (“guide tree”). mBed makes that step fast.', 'Fast even for large sets.', 'Slightly less exact than full distance matrices for small sets.', 'Keep defaults for ordinary sets.', 'Sequences are embedded as distances to a few seed sequences, then clustered by k-means.'],
          c_iter: ['Iterations', 'How many times the alignment is refined after the first pass.', 'More iterations can improve accuracy at the cost of time.', null, 'Extra iterations rarely change easy alignments.', 'Increase when the alignment of a difficult family looks ragged.'],
          c_order: ['Order of rows', '“Aligned” orders rows by similarity (guide-tree order); “input” keeps the order you pasted.', 'Aligned order places similar sequences next to each other, which makes the conserved blocks easier to see.', null, null, 'Use “input” if you have a meaningful order such as species list.'],
          c_submit: ['Submit', 'Sends the job to EBI servers. You can leave an email to be notified when long jobs finish.', 'Small jobs take seconds. A job ID in the address bar lets you return to the result later.', null, 'Results are kept only for a limited time (about a week).', 'Download the alignment file to keep it.'],
        },
      },
      {
        id: 'aln', title: 'Alignment', icon: '🧬', url: 'ebi.ac.uk/jdispatcher/msa/clustalo/summary?jobId=clustalo-R20261026',
        html: () => `${top()}<div class="rp-pad">${H.tabs(['Alignments', 'Result Summary', 'Guide Tree', 'Phylogenetic Tree', 'Percent Identity Matrix', 'Submission Details'], 0)}
          ${F('m_tools', '<span class="rp-link">Download Alignment File</span> &nbsp; <span class="rp-link">Show Colors</span> &nbsp; <span class="rp-link">Send to Simple Phylogeny</span> &nbsp; <span class="rp-link">Open in Jalview</span>', { cls: 'rp-box' })}
          <div class="rp-rel" style="overflow:auto">${msa()}</div>
          ${H.hot('m_colour', 160, 0, 260, 90)}${H.hot('m_cons', 160, 94, 260, 26)}${H.hot('m_gap', 288, 56, 36, 76)}</div>`,
        f: {
          m_tools: ['Result toolbar', 'Actions on the finished alignment: download, toggle colours, build a tree or open it in Jalview.', 'Send it to Simple Phylogeny to make a tree from this alignment, or Jalview for editing and annotation.', 'Download in several formats.', null, 'Always download; results expire.'],
          m_names: ['Sequence names', 'The labels on the left come from your FASTA headers: here UniProt accession and entry name.', 'Numbers on the right give the number of residues (without gaps) up to the end of that row.', null, null, 'Keep the names meaningful before you submit.'],
          m_colour: ['Residue colours', 'Each amino acid is coloured by chemistry (ClustalX scheme): blue hydrophobic, red positive, magenta negative, green polar, orange glycine, yellow proline, cyan aromatic/His.', 'Vertical stripes of one colour mean a position kept chemically similar across species, which is a clue to function or structure.', 'Same colour down a column means conservation.', 'Columns with many different colours are variable.', 'Look for colour-consistent blocks: likely functional regions.'],
          m_cons: ['Consensus line', 'Symbols under the alignment summarise each column: * identical in all sequences; : strongly similar; . weakly similar; blank different.', 'Count the * to measure conservation. Runs of * often mark active sites or domain cores.', 'Long runs of * are highly conserved regions.', 'Blank stretches are variable or alignment-ambiguous.', 'Check mutations you care about: is the position * or blank?', '":" and "." represent groups with Gonnet PAM250 score >0.5 and ≤0.5.'],
          m_gap: ['Gaps (-)', 'Dashes where a sequence has no residue aligned to the others (an insertion or deletion).', 'Gaps cluster in loops and unstructured regions; core regions rarely contain gaps.', null, 'Many gaps in a conserved region suggest a misalignment or an incomplete sequence.', 'Gaps that line up across several species are real indels.'],
        },
      },
      {
        id: 'tree', title: 'Identity matrix', icon: '🔢', url: 'ebi.ac.uk/jdispatcher/msa/clustalo/summary?jobId=clustalo-R20261026#pim',
        html: () => `${top()}<div class="rp-pad">${H.tabs(['Alignments', 'Result Summary', 'Guide Tree', 'Phylogenetic Tree', 'Percent Identity Matrix', 'Submission Details'], 4)}
          ${F('p_hdr', '<h4>Percent Identity Matrix (created by Clustal2.1)</h4>', { cls: '' })}${matrix()}
          ${F('p_note', '<span class="rp-mut">Values are pairwise percent identity over aligned positions. Colour added for teaching.</span>', { cls: '' })}</div>`,
        f: {
          p_hdr: ['Percent identity matrix', 'A table comparing every sequence with every other: the percent of identical residues in the pairwise comparison.', 'It is symmetric; row i vs column j equals row j vs column i. It summarises the alignment as numbers.', null, null, 'Use it to pick the closest or most distant pair.'],
          p_diag: ['Diagonal = 100%', 'Each sequence compared to itself is 100% identical.', 'It is just a reference line; ignore it.', null, null, null],
          p_high: ['A close pair', 'Human and mouse p53 are 91% identical: a short evolutionary distance.', 'Read across a row: the highest off-diagonal value is that sequence’s nearest neighbour.', 'High values within a clade.', null, 'Closest pair often shares a function.'],
          p_low: ['A distant pair', 'Human vs zebrafish: 55% identity, the most divergent pair here.', 'Falling identity with taxonomic distance is expected. A distant pair that is still above 30% for proteins is likely homologous.', null, 'Below ~25% the alignment becomes unreliable.', 'Compare with known species divergence times.'],
          p_note: ['How it is calculated', 'Identity is counted over aligned columns of each pair and divided by the alignment length.', 'Different programs divide by different lengths (aligned positions vs. shorter sequence), so values can differ slightly between tools.', null, 'Gaps are handled differently by different programs.', 'Quote the tool and version.'],
        },
      },
    ],
  });
})();
