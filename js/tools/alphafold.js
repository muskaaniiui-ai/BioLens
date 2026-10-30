/* AlphaFold Protein Structure Database. Example data is illustrative. */
(function () {
  const F = H.F, top = () => H.top('AlphaFold DB', 'Protein Structure Database · EMBL-EBI', ['Search', 'Downloads', 'FAQs', 'API'], '#0b4f6c');
  const pl = (c, t) => `<span class="rp-pill" style="background:${c};color:${c === '#ffdb13' ? '#333' : '#fff'}">${t}</span>`;
  const ribbon = `<svg viewBox="0 0 400 110" width="100%" height="110"><defs><linearGradient id="afg" x1="0" x2="1"><stop offset="0" stop-color="#ff7d45"/><stop offset=".12" stop-color="#ffdb13"/><stop offset=".25" stop-color="#65cbf3"/><stop offset=".45" stop-color="#0053d6"/><stop offset=".75" stop-color="#0053d6"/><stop offset=".85" stop-color="#65cbf3"/><stop offset="1" stop-color="#ff7d45"/></linearGradient></defs>
    <path d="M10 80 C40 10,80 120,120 50 S190 110,230 40 S300 100,330 55 S380 30,392 80" fill="none" stroke="url(#afg)" stroke-width="11" stroke-linecap="round"/></svg>`;
  const dom = i => i < 4 ? 0 : i < 10 ? 1 : 2;
  const pae = () => { let o = ''; for (let i = 0; i < 16; i++) for (let j = 0; j < 16; j++) { const same = dom(Math.floor(i * 14 / 16)) === dom(Math.floor(j * 14 / 16)); const v = same ? (dom(Math.floor(i * 14 / 16)) === 0 ? .55 : .1) : .88; o += `<i style="background:rgb(${Math.round(15 + v * 235)},${Math.round(80 + v * 165)},${Math.round(170 + v * 80)})"></i>`; } return o; };
  BL.add({
    id: 'alphafold', name: 'AlphaFold', icon: '🔮', color: '#0b4f6c', cat: 'Protein structure', url: 'alphafold.ebi.ac.uk/entry/P04637',
    question: 'What is the predicted 3D structure, and how reliable is each part?', about: 'AlphaFold predicted structure pLDDT PAE confidence disordered model download',
    windows: [
      {
        id: 'model', title: 'Model & confidence', icon: '🧊', url: 'alphafold.ebi.ac.uk/entry/P04637',
        html: () => `${top()}<div class="rp-pad"><h2>Cellular tumor antigen p53 <span class="rp-mut" style="font-size:12px">· P04637 · TP53 · Homo sapiens</span></h2>
          ${F('a_version', '<span class="rp-pill p">AF-P04637-F1</span><span class="rp-pill">Model version 4</span>', { tag: 'div' })}
          <div class="rp-box">${F('a_model', '<h4>Predicted structure</h4>' + ribbon, { cls: '' })}</div>
          ${F('a_legend', '<div class="rp-box"><h4>Model confidence (pLDDT)</h4>' + pl('#0053d6', 'Very high >90') + pl('#65cbf3', 'Confident 70-90') + pl('#ffdb13', 'Low 50-70') + pl('#ff7d45', 'Very low <50') + '</div>', { cls: '' })}
          ${F('a_global', '<div class="rp-box"><h4>Global metrics</h4>Mean pLDDT <b>71.3</b></div>', { cls: '' })}
          ${F('a_seq', '<div class="rp-box"><h4>Per-residue confidence along the sequence</h4>' + H.row([{ s: 1, e: 40, c: '#ff7d45' }, { s: 41, e: 100, c: '#ffdb13' }, { s: 101, e: 300, c: '#0053d6' }, { s: 301, e: 330, c: '#65cbf3' }, { s: 331, e: 393, c: '#ff7d45' }], 393) + '</div>', { cls: '' })}
          ${F('a_dl', '<div class="rp-row"><span class="rp-link">Download PDB file</span> <span class="rp-link">Download mmCIF file</span> <span class="rp-link">Download PAE (JSON)</span></div>', { cls: '' })}</div>`,
        f: {
          a_version: ['Model ID and version', 'The unique name of the prediction (AF-UniProtID-F1) and the database model version.', '“F1” means fragment 1: very long proteins are predicted in overlapping fragments. Newer versions may change the model, so cite it.', null, null, 'Cite the model version.'],
          a_model: ['The 3D model', 'AlphaFold’s PREDICTION of the folded protein, coloured by confidence.', 'It is a computational prediction from sequence, not an experiment. Confident regions are often close to experimental structures.', 'Mostly dark blue = trustworthy fold.', 'Orange tails and loops are not reliable.', 'Rotate and zoom in the real viewer; check colours before reading shape.'],
          a_legend: ['pLDDT colour key', 'Per-residue confidence on a 0-100 scale, shown as four colours.', 'Dark blue >90: atoms very reliable. Light blue 70-90: backbone reliable. Yellow 50-70: low. Orange <50: very low, often intrinsically disordered.', 'Above 70.', 'Below 50: do not trust the geometry.', 'Read it before interpreting any shape.', 'pLDDT estimates the local distance difference test (lDDT-Cα) the prediction would score against the true structure.'],
          a_global: ['Global confidence (mean pLDDT)', 'The average confidence over the whole chain.', 'An average hides detail: a rigid core plus long disordered tails gives a moderate mean even when the core is excellent.', 'Above 80.', 'Below 60: mostly uncertain.', 'Use the per-residue plot, not the mean.'],
          a_seq: ['Confidence along the sequence', 'A bar chart of pLDDT for every residue, coloured by band.', 'Here the central DNA-binding domain is dark blue (reliable) while both ends are orange (disordered). That matches what experiments show for p53.', 'Blue blocks = domains that fold.', 'Orange stretches = flexible, do not model them as rigid.', 'Compare with UniProt domains.'],
          a_dl: ['Downloads', 'Coordinate files (PDB, mmCIF) and the PAE matrix (JSON).', 'Coordinates open in PyMOL/ChimeraX; the B-factor column stores pLDDT. PAE is needed for domain analysis.', null, null, 'Download PAE too when you study domain arrangement.'],
        },
      },
      {
        id: 'pae', title: 'PAE plot', icon: '🟦', url: 'alphafold.ebi.ac.uk/entry/P04637#pae',
        html: () => `${top()}<div class="rp-pad"><h2>Predicted aligned error (PAE)</h2>
          <div class="rp-row" style="align-items:flex-start"><div class="rp-rel">${F('p_plot', `<div class="rp-grid" style="grid-template-columns:repeat(16,1fr);width:260px">${pae()}</div>`, { cls: '' })}</div>
          <div>${F('p_scale', '<div style="width:22px;height:160px;background:linear-gradient(#10508f,#7fb8e8,#fff);border:1px solid #cbd5e1"></div><div class="rp-mut" style="font-size:10.5px">0 Å → 30 Å</div>', { cls: '' })}</div>
          <div class="rp-grow">${F('p_read', '<div class="rp-box"><b>Expected position error (Å)</b><br>Colour at (x, y) = expected error in the position of residue x when the structure is aligned on residue y.</div>', { cls: '' })}</div></div>
          ${F('p_dl', '<div class="rp-row"><span class="rp-link">Download PAE (JSON)</span></div>', { cls: '' })}</div>`,
        f: {
          p_plot: ['The PAE matrix', 'Every pair of residues gets a colour: the expected error (Å) in their relative position.', 'The diagonal block pattern reveals domains: dark blue squares are rigid units; light patches between them mean AlphaFold is unsure how those parts are oriented relative to each other.', 'Dark squares along the diagonal.', 'Pale off-diagonal blocks: do not trust inter-domain geometry.', 'Compare with domain boundaries from UniProt.', 'PAE is asymmetric in general but usually shown averaged.'],
          p_scale: ['Colour scale (Å)', 'Dark blue ≈ 0 Å error (confident), white ≈ 30 Å (essentially unknown).', 'Errors under ~5 Å are good; above ~15 Å means the relative position is guessed.', null, null, 'Check the scale before reading colours.'],
          p_read: ['How to read it', 'The value at row y, column x is how wrong AlphaFold expects residue x to be when the model is superposed on residue y.', 'Reading rows tells you how well a part “sits” relative to the rest of the protein.', null, null, 'Use PAE to decide whether to treat the protein as one rigid body or as separate domains.'],
          p_dl: ['PAE download', 'The PAE values as a JSON file.', 'Needed by tools that cut the model into confident domains.', null, null, null],
        },
      },
    ],
  });
})();
