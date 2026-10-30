/* RCSB PDB structure pages. Example data is illustrative. */
(function () {
  const F = H.F, top = () => H.top('RCSB PDB', 'Protein Data Bank', ['Deposit', 'Search', 'Visualize', 'Analyze', 'Learn'], '#2b6c8f');
  const slider = (label, k, pos, good) => `<div class="rp-row" style="margin:6px 0"><span style="width:200px"><b>${label}</b></span>${F(k, `<div style="position:relative;width:300px;height:14px;border-radius:7px;background:linear-gradient(90deg,#dc2626,#f59e0b,#22c55e,#2563eb)"><span style="position:absolute;left:${pos}%;top:-4px;width:6px;height:22px;background:#111;border-radius:3px"></span></div>`, { tag: 'span', style: 'padding-right:22px' })}<span class="rp-mut">${good}</span></div>`;
  BL.add({
    id: 'pdb', name: 'PDB', icon: '🏛️', color: '#2b6c8f', cat: 'Protein structure', url: 'rcsb.org/structure/1TUP',
    question: 'What experimentally solved 3D structure exists, and how good is it?', about: 'RCSB Protein Data Bank structure X-ray cryo-EM NMR resolution R-free validation sliders ligand chain',
    windows: [
      {
        id: 'summary', title: 'Structure summary', icon: '📋', url: 'rcsb.org/structure/1TUP',
        html: () => `${top()}<div class="rp-pad">${F('p_id', '<h2>1TUP <span class="rp-mut" style="font-size:12px">· example entry</span></h2>', { cls: '' })}${F('p_title', '<b>TUMOR SUPPRESSOR P53 COMPLEXED WITH DNA</b>', { cls: '' })}
          <div class="rp-row" style="margin:8px 0"><div class="rp-grow rp-box" style="height:120px;background:linear-gradient(120deg,#dbeafe,#dcfce7,#fef3c7)">${F('p_view', '<div style="text-align:center;padding-top:40px"><b>3D viewer</b> · rotate, zoom, colour by chain</div>', { cls: '' })}</div></div>
          ${H.kv([['Method', 'X-RAY DIFFRACTION', 'p_method'], ['Resolution', '2.20 Å', 'p_res'], ['R-Value Free', '0.283', 'p_rfree'], ['R-Value Work', '0.230', 'p_rwork'], ['Deposited / Released', '1994 / 1995', 'p_date'], ['Organism(s)', 'Homo sapiens', 'p_org']])}
          ${H.tbl([['Entity', 'p_ent'], ['Chains', 'p_chain'], ['Sequence length', 'p_len'], ['Mutations', 'p_mut']], [['Cellular tumor antigen p53 (UniProt P04637)', 'A, B, C', '219', '0'], ['DNA (21-MER)', 'E, F', '21', '-']])}
          ${F('p_lig', '<div class="rp-box"><b>Ligands:</b> ZN (zinc ion) ×3 &nbsp; <span class="rp-link">Ligand explorer</span></div>', { cls: '' })}
          ${F('p_dl', '<div class="rp-row"><span class="rp-link">Download Files ▾</span> <span class="rp-link">PDB format</span> <span class="rp-link">PDBx/mmCIF</span> <span class="rp-link">FASTA</span></div>', { cls: '' })}</div>`,
        f: {
          p_id: ['PDB ID', 'A four-character code (digit + 3 letters/digits) that uniquely names the experimental structure.', 'Cite the ID. The same protein appears in many entries, each with its own ID, since each experiment is separate.', null, null, 'Use the ID to download coordinates.'],
          p_title: ['Structure title', 'Authors’ description of what was solved: here p53 bound to DNA.', 'The title tells you the context: which ligands, mutations or partners are in the crystal.', null, null, null],
          p_view: ['3D viewer', 'An interactive view of the molecule. Rotate, zoom, change colouring (by chain, secondary structure, residue type).', 'Use it to look at the structure; but always check resolution and validation before drawing conclusions.', null, null, 'Try colouring by B-factor to see flexible parts.'],
          p_method: ['Experimental method', 'How the structure was determined: X-ray diffraction, solution NMR, or cryo-EM.', 'X-ray gives static, crystal-packed models; NMR gives an ensemble of models in solution; cryo-EM suits big complexes. The method defines what the numbers below mean.', null, 'Crystals can distort flexible regions.', 'Choose the method relevant to your question.'],
          p_res: ['Resolution (Å)', 'The level of detail in the data. Smaller is sharper.', '<1.5 Å atomic detail; 1.5-2.5 Å high quality (good for most uses); 2.5-3.5 Å medium (backbone reliable, side chains less); >3.5 Å low. Not used for NMR.', 'Below ~2.5 Å.', 'Above 3.5 Å: positions of atoms are uncertain.', 'Pick the best resolution among available structures.'],
          p_rfree: ['R-value free', 'A cross-validated measure of how well the model fits the diffraction data (lower = better).', 'It is computed on a small set of data not used for refining the model, so it exposes over-fitting. Typical values are 0.18-0.28.', 'Below ~0.25 and close to R-work.', 'Large gap between R-free and R-work signals over-fitting.', 'Check it with resolution.'],
          p_rwork: ['R-value work', 'The fit of the model to the data that were used for refinement.', 'It is always a bit lower than R-free. The difference R-free − R-work should be small (<0.05).', null, null, null],
          p_date: ['Deposition & release', 'When the structure was submitted and made public.', 'Older structures use older methods; newer ones often have better validation.', null, null, null],
          p_org: ['Source organism', 'The species the protein comes from.', 'Check that it matches your target; sometimes proteins are made in bacteria.', null, null, null],
          p_ent: ['Macromolecules (entities)', 'The distinct molecules in the entry: protein chains, DNA, RNA.', 'Each entity lists its UniProt accession, so you can link structure to annotation.', null, null, null],
          p_chain: ['Chains', 'Letter IDs of each copy in the file (A, B, C).', 'Several chains of the same entity mean a multimeric complex or several copies in the crystal.', null, null, 'Use chain letters when selecting in viewers.'],
          p_len: ['Sequence length', 'Number of residues modelled in this entity.', 'Compare with the UniProt length: p53 is 393 aa but the structure covers only the 219-residue core domain.', null, 'Partial coverage: unmodelled regions are unknown.', null],
          p_mut: ['Mutations', 'Engineered differences from the natural sequence.', '0 = wild type. Engineered mutations improve crystals but may alter function.', null, null, null],
          p_lig: ['Ligands', 'Small molecules in the structure: ions, drugs, cofactors.', 'Here three zinc ions hold the DNA-binding domain’s fold. Ligand explorer shows contacts.', null, null, 'Great starting point for drug design.'],
          p_dl: ['Download files', 'Get the coordinates (PDB or mmCIF), sequence (FASTA) and the validation report.', 'mmCIF is the modern, complete format; legacy PDB format cannot hold very large structures.', null, null, 'Open in PyMOL or ChimeraX.'],
        },
      },
      {
        id: 'validation', title: 'Validation sliders', icon: '✅', url: 'rcsb.org/structure/1TUP#validation',
        html: () => `${top()}<div class="rp-pad"><h2>Experimental Data Snapshot &amp; Validation</h2>
          <div class="rp-box"><h4>Worldwide wwPDB validation (percentile ranks)</h4>
          ${slider('Clashscore', 'v_clash', 70, 'better than 70% of structures')}${slider('Ramachandran outliers', 'v_rama', 62, 'better than 62%')}${slider('Sidechain outliers', 'v_side', 55, 'better than 55%')}${slider('RSRZ outliers', 'v_rsrz', 80, 'better than 80%')}${slider('R-free', 'v_rfree', 50, 'about average')}</div>
          ${F('v_legend', '<div class="rp-box"><b>Slider key:</b> <span style="color:#dc2626">worse than most</span> → <span style="color:#2563eb">better than most</span>. Black bar = this entry compared with all PDB entries of similar resolution.</div>', { cls: '' })}</div>`,
        f: {
          v_clash: ['Clashscore', 'Number of serious steric overlaps between atoms per 1000 atoms. Lower is better.', 'Atoms cannot occupy the same space; clashes reveal modelling errors.', 'The black bar toward the blue end.', 'Red end = many clashes.', null],
          v_rama: ['Ramachandran outliers', 'Percent of residues with backbone angles in rarely observed conformations.', 'Backbone phi/psi angles fall in allowed regions; outliers may be errors or genuine strained residues.', 'Less than 0.5% outliers.', 'More than 2% suggests problems.', null],
          v_side: ['Sidechain outliers', 'Percent of side chains in unusual rotamer conformations.', 'Side-chain rotamers have preferred shapes; atypical ones may be mistakes.', null, null, null],
          v_rsrz: ['RSRZ outliers', 'Percent of residues whose model fits the electron density poorly.', 'Measures fit to experimental data, not just geometry. High values mean parts of the model are not supported by the data.', 'Below 5%.', 'High = parts of the model may be wrong.', 'Check the residues you care about.'],
          v_rfree: ['R-free percentile', 'How the R-free of this entry compares with others at similar resolution.', 'Percentile slider placing the structure among all those of the same resolution.', null, null, null],
          v_legend: ['How to read the sliders', 'Each slider compares this entry to the whole PDB: the further toward blue, the better the quality.', 'Percentile ranks are normalised for resolution, so comparison is fair. They give a quick quality check before trusting a structure.', 'Mostly blue = a trustworthy structure.', 'Mostly red = use caution.', 'Check validation before using a structure for docking or mutation analysis.'],
        },
      },
      {
        id: 'sequence', title: 'Sequence annotations', icon: '🔤', url: 'rcsb.org/sequence/1TUP',
        html: () => `${top()}<div class="rp-pad"><h2>Sequence annotations · Chain A</h2>
          <div class="rp-box">${F('sq_chain', '<div class="rp-row rp-mut" style="justify-content:space-between;font-size:11px;border-bottom:2px solid #334"><span>94</span><span>150</span><span>200</span><span>250</span><span>312</span></div>', { cls: '' })}
          <div class="rp-mut" style="font-size:10.5px;margin-top:6px">Secondary structure</div>${F('sq_ss', H.row([{ s: 1, e: 8, c: '#f59e0b', t: 'β' }, { s: 15, e: 24, c: '#f59e0b', t: 'β' }, { s: 40, e: 52, c: '#ef4444', t: 'α' }, { s: 70, e: 80, c: '#f59e0b', t: 'β' }, { s: 100, e: 112, c: '#ef4444', t: 'α' }, { s: 140, e: 150, c: '#f59e0b', t: 'β' }, { s: 180, e: 196, c: '#f59e0b', t: 'β' }], 219), { cls: '' })}
          <div class="rp-mut" style="font-size:10.5px">Pfam domain</div>${F('sq_dom', H.track([{ s: 1, e: 219, c: '#0ea5e9', t: 'P53 DNA-binding domain' }], 219), { cls: '' })}
          <div class="rp-mut" style="font-size:10.5px">Unobserved residues</div>${F('sq_unobs', H.row([{ s: 1, e: 6, c: '#cbd5e1' }, { s: 207, e: 219, c: '#cbd5e1' }], 219), { cls: '' })}
          <div class="rp-mut" style="font-size:10.5px">Ligand binding</div>${F('sq_lig', H.row([{ s: 69, e: 71, c: '#dc2626' }, { s: 74, e: 76, c: '#dc2626' }, { s: 138, e: 140, c: '#dc2626' }], 219), { cls: '' })}</div></div>`,
        f: {
          sq_chain: ['Residue ruler', 'Positions along the modelled chain, numbered as in the UniProt sequence.', 'Aligning structure, domains and variants on the same ruler lets you ask: which mutations lie in helices? In binding sites?', null, null, null],
          sq_ss: ['Secondary structure', 'Helices (α) and sheets (β) calculated from the 3D coordinates.', 'Because they are computed from the actual structure, they are more reliable than predictions. Gaps between are loops.', null, null, 'Hydrophobic mutations in a helix may disrupt packing.'],
          sq_dom: ['Domain (Pfam) track', 'Where known domain families match the modelled sequence.', 'Connects structure to sequence annotation: this chain is entirely the DNA-binding domain.', null, null, null],
          sq_unobs: ['Unobserved residues', 'Parts of the sequence with no coordinates, usually too flexible to see.', 'Missing density generally marks disordered termini or loops. They exist in the protein but are not in the model.', null, 'Do not assume they are absent.', null],
          sq_lig: ['Ligand-binding residues', 'Residues in contact with bound ions or small molecules.', 'Here the zinc-binding residues. Mutations at these positions often destroy fold or function.', null, null, 'Check whether disease mutations fall here.'],
        },
      },
    ],
  });
})();
