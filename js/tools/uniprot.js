/* UniProtKB entry page. Example data is illustrative (modelled on P04637). */
(function () {
  const F = H.F, top = () => H.top('UniProt', 'UniProtKB', ['BLAST', 'Align', 'Peptide search', 'ID mapping'], '#1c4f82');
  const side = (act) => `<div class="rp-row" style="gap:6px;margin-bottom:8px">${['Function', 'Names & Taxonomy', 'Subcellular Location', 'Disease & Variants', 'PTM/Processing', 'Expression', 'Interaction', 'Structure', 'Family & Domains', 'Sequence & Isoforms'].map((s, i) => `<span class="rp-pill ${i === act ? 'g' : ''}">${s}</span>`).join('')}</div>`;
  const head = (act, live) => { const F = live ? H.F : (k, i, o) => { const t = (o && o.tag) || 'div'; return `<${t} class="${(o && o.cls) || ''}">${i}</${t}>`; }; return `${top()}<div class="rp-pad"><h2>P04637 · P53_HUMAN</h2><div>${F('u_review', H.pill('★ UniProtKB reviewed (Swiss-Prot)', 'g'), { tag: 'span' })}${F('u_score', '<span class="rp-star">★★★★★</span> <span class="rp-mut">Annotation score 5/5</span>', { tag: 'span' })}</div>
    ${F('u_names', '<b>Cellular tumor antigen p53</b> · Gene <i>TP53</i> · <i>Homo sapiens</i> (Human)', { cls: 'rp-box' })}
    <div class="rp-tabs"><span class="on">Entry</span><span>Variant viewer</span><span>Feature viewer</span><span>Publications</span><span>External links</span><span>History</span></div>${side(act)}`; };
  BL.add({
    id: 'uniprot', name: 'UniProt', icon: '🧪', color: '#1c4f82', cat: 'Sequence & gene databases', url: 'uniprot.org/uniprotkb/P04637/entry',
    question: 'What does this protein do, where, and how is it built?', about: 'UniProtKB protein entry function Swiss-Prot reviewed annotation score GO domains disease isoforms',
    windows: [
      {
        id: 'function', title: 'Header & function', icon: '⚡', url: 'uniprot.org/uniprotkb/P04637/entry#function',
        html: () => `${head(0, true)}<div class="rp-box"><h4>Function</h4>${F('u_func', 'Multifunctional transcription factor that induces cell cycle arrest, DNA repair or apoptosis upon binding to its target DNA sequence. Acts as a tumor suppressor in many tumor types; induces growth arrest or apoptosis depending on the physiological circumstances and cell type. <span class="rp-pill p">ECO:0000269 · PubMed:12345</span>', { cls: '' })}
          <br>${F('u_cofactor', '<b>Cofactor:</b> Zn<sup>2+</sup> <span class="rp-mut">Binds 1 zinc ion per subunit.</span>', { cls: '' })}<br><br>${F('u_go', '<b>GO · Molecular function</b> ' + H.pill('DNA-binding transcription factor activity') + H.pill('protein binding') + H.pill('zinc ion binding') + '<br><b>GO · Biological process</b> ' + H.pill('apoptotic process') + H.pill('cell cycle arrest') + H.pill('DNA damage response'), { cls: '' })}</div></div>`,
        f: {
          u_review: ['Reviewed vs unreviewed', 'Whether a human curator read the literature and checked this entry (Swiss-Prot, gold star) or software filled it in (TrEMBL).', 'Reviewed entries are among the most trusted protein annotations worldwide. Unreviewed ones are useful first guesses but should not be cited as fact.', 'Reviewed (Swiss-Prot).', 'Unreviewed (TrEMBL): verify.', 'Prefer reviewed entries for functional claims.'],
          u_score: ['Annotation score', 'UniProt’s 1 to 5 rating of how much and how good the annotation is.', '5 = rich, experimentally supported; 1 = little more than a sequence. It measures documentation, not whether the biology is right.', '4-5.', '1-2: weak annotation.', 'Check it before trusting a function.', 'Computed from the amount and evidence of annotation, with experimental evidence weighing more.'],
          u_names: ['Names & organism', 'The recommended protein name, the gene name and the species.', 'The same gene in another species is a different UniProt entry (an ortholog). Entry name P53_HUMAN = protein_SPECIES.', null, 'Check the organism matches your target.', 'Open “Names & Taxonomy” for synonyms.'],
          u_func: ['Function text', 'A curated summary of what the protein does, written from published evidence.', 'Each statement is backed by evidence codes (ECO) and PubMed IDs. ECO:0000269 = experimental evidence in a paper; ECO:0000250 = similarity to another species; ECO:0000501 = automatic.', 'Specific verbs and experimental evidence.', '“Probable” or “Putative” means unproven.', 'Click the evidence tags on the real page to read the paper.', 'Evidence codes make UniProt annotation machine-readable and auditable.'],
          u_cofactor: ['Cofactor', 'A non-protein helper (metal or small molecule) the protein needs to work: here zinc.', 'Cofactors explain why a protein loses function in a metal-free buffer. Zinc here helps hold the DNA-binding domain’s shape.', null, null, 'Remember to add the cofactor in your assays.'],
          u_go: ['Gene Ontology (GO) terms', 'Standard labels for molecular function, biological process and cellular component.', 'GO terms let you compare proteins and run enrichment analyses. Each has an evidence code: experimental vs electronically inferred.', 'Terms with experimental evidence (EXP, IDA).', 'IEA = inferred electronically, the weakest.', 'Use GO for pathway-style summaries.'],
        },
      },
      {
        id: 'location', title: 'Location & disease', icon: '🏥', url: 'uniprot.org/uniprotkb/P04637/entry#subcellular_location',
        html: () => `${head(2)}<div class="rp-box"><h4>Subcellular location</h4>${F('l_loc', H.pill('Nucleus') + H.pill('Cytoplasm') + H.pill('Mitochondrion matrix') + '<div class="rp-mut" style="margin-top:4px">Nucleus; upon stress, translocates to mitochondria.</div>', { cls: '' })}</div>
          <div class="rp-box"><h4>Involvement in disease</h4>${F('l_disease', '<b>Li-Fraumeni syndrome (LFS)</b> ' + H.pill('Disease', 'r') + '<br><span class="rp-mut">Autosomal dominant. Predisposes to cancers at an early age. The disease is caused by variants affecting the gene represented in this entry.</span>', { cls: '' })}</div>
          <div class="rp-box"><h4>Natural variants (selection)</h4>${H.tbl([['Position', 'l_pos'], ['Change', 'l_change'], ['Description', 'l_desc']], [['175', 'R→H', 'In LFS; hotspot mutation; loss of DNA binding'], ['248', 'R→Q', 'In LFS; hotspot mutation'], ['72', 'P→R', 'Common polymorphism; no disease']])}</div></div>`,
        f: {
          l_loc: ['Subcellular location', 'Where in the cell the protein is found.', 'Locations are compartments; the note says p53 normally lives in the nucleus but moves to mitochondria under stress. Multiple locations are common.', null, null, 'Use location to choose an antibody stain or compartment markers.'],
          l_disease: ['Involvement in disease', 'Diseases linked to variants of this protein, with the inheritance pattern.', 'The wording is careful: variants cause the disease, the normal protein does not. An OMIM number is given on the real page.', 'Curated disease links.', null, 'Open Variant viewer to see where mutations occur.'],
          l_pos: ['Variant position', 'The amino-acid position in the canonical sequence where the change occurs.', 'Hotspots (175, 248, 273 for p53) are positions mutated again and again in cancer.', null, 'Numbering refers to the canonical isoform only.', 'Map positions onto the domains.'],
          l_change: ['Amino-acid change', 'The substitution in one-letter code: R→H means arginine becomes histidine.', 'Charge-changing and structure-breaking substitutions in conserved positions are the most damaging.', null, null, 'Look up the change in ClinVar.'],
          l_desc: ['Variant description', 'What is known about the effect: disease association, functional effect or “polymorphism”.', 'Polymorphisms are common harmless differences; disease variants are rare and damaging.', null, 'A variant with no description has unknown effect (VUS).', 'Check the original paper.'],
        },
      },
      {
        id: 'domains', title: 'Family & domains', icon: '🧱', url: 'uniprot.org/uniprotkb/P04637/entry#family_and_domains',
        html: () => `${head(8)}<div class="rp-box"><h4>Features (Feature viewer)</h4>${F('d_track', H.track([{ s: 1, e: 42, c: '#6366f1', t: 'TAD1' }, { s: 64, e: 92, c: '#06b6d4', t: 'Pro-rich' }, { s: 102, e: 292, c: '#10b981', t: 'DNA-binding domain' }, { s: 305, e: 322, c: '#f59e0b', t: 'NLS' }, { s: 325, e: 356, c: '#ec4899', t: 'Tetramerisation' }, { s: 364, e: 393, c: '#8b5cf6', t: 'Regulatory' }], 393), { cls: '' })}
          ${F('d_ruler', '<div class="rp-row rp-mut" style="justify-content:space-between;font-size:11px;border-top:2px solid #334"><span>1</span><span>100</span><span>200</span><span>300</span><span>393</span></div>', { cls: '' })}</div>
          <div class="rp-box"><h4>Family & domain databases</h4>${F('d_family', '<b>Sequence similarities:</b> Belongs to the p53 family.', { cls: '' })}<br>${F('d_xrefs', 'InterPro: IPR002117 · Pfam: PF00870 · PROSITE: PS00348 · SMART: SM00000', { cls: '' })}</div>
          <div class="rp-box"><h4>Regions</h4>${H.tbl([['Type', 'd_type'], ['Position', 'd_posn'], ['Description', 'd_desc']], [['Region', '1-42', 'Transcription activation (acidic)'], ['DNA binding', '102-292', 'Core domain'], ['Region', '325-356', 'Tetramerization']])}</div></div>`,
        f: {
          d_track: ['Feature track', 'A map of the protein sequence with its domains, regions and motifs drawn to scale.', 'Each coloured bar is a segment with a start and end. The DNA-binding domain (102-292) is the largest and carries most cancer mutations.', 'Known domains covering the sequence.', 'Large unannotated stretches may be disordered or unstudied.', 'Compare with the BLAST graphic summary: partial hits often match one domain.'],
          d_ruler: ['Sequence ruler', 'Residue positions of the canonical sequence.', 'All coordinates in the entry (variants, PTMs, domains) use this numbering.', null, null, null],
          d_family: ['Family classification', 'The protein family the entry belongs to: “Belongs to the p53 family”.', 'Family membership is inferred from sequence similarity. It tells you that relatives (p63, p73) probably share domain architecture.', null, null, 'Search the family in InterPro.'],
          d_xrefs: ['Family & domain cross-references', 'IDs of this protein’s domain signatures in InterPro, Pfam, PROSITE, SMART and others.', 'Each database predicts domains by a different method. InterPro merges them into one entry (IPR…).', null, 'Different databases may disagree on boundaries.', 'Open InterPro to see all signatures together.'],
          d_type: ['Feature type', 'The kind of annotated segment: Region, Domain, DNA binding, Motif, Active site, Binding site…', 'Types come from a controlled vocabulary so features can be compared across proteins.', null, null, null],
          d_posn: ['Position range', 'Start-end residues of the segment.', 'Use it to find which mutation falls in which domain.', null, null, null],
          d_desc: ['Feature description', 'Plain-language label plus evidence tags.', null, null, null, null],
        },
      },
      {
        id: 'structure', title: 'Structure & interactions', icon: '🔮', url: 'uniprot.org/uniprotkb/P04637/entry#structure',
        html: () => `${head(7)}<div class="rp-box"><h4>3D structure</h4>${F('s_pdb', 'Experimental structures: <b>≈ 300 entries</b> in PDB · methods: X-ray, NMR, EM ' + '<span class="rp-link">View in PDBe-KB</span>', { cls: '' })}<br>${F('s_af', '<b>AlphaFold</b> predicted model: <span class="rp-link">AF-P04637-F1</span> ' + H.pill('mean pLDDT 71', 'o'), { cls: '' })}</div>
          <div class="rp-box"><h4>Interaction</h4>${F('s_sub', '<b>Subunit:</b> Forms homotetramers. Interacts with MDM2, CCAR2, HIPK2 …', { cls: '' })}<br><br>${H.tbl([['Interactor', 's_int'], ['IntAct', 's_ia'], ['# Experiments', 's_exp']], [['MDM2 (Q00987)', 'EBI-389668', 52], ['SIRT1 (Q96EB6)', 'EBI-1802965', 14]])}</div></div>`,
        f: {
          s_pdb: ['Experimental structures (PDB)', 'How many 3D structures of this protein have been solved by experiment and where to open them.', 'Many entries mean the protein is well studied. Each covers a different region, ligand or mutation, so pick one that contains the domain you care about.', null, 'Structures often cover only a fragment.', 'Compare resolution (Å) of different entries.'],
          s_af: ['AlphaFold model', 'A computer-predicted structure covering the full sequence.', 'Useful when no experimental structure exists or where it covers only part. Always check confidence (pLDDT) before interpreting.', 'High pLDDT regions are reliable.', 'Low pLDDT = disordered; do not trust shape.', 'Open the AlphaFold tool in BioLens to learn pLDDT and PAE.'],
          s_sub: ['Subunit / complex', 'Whether the protein works alone or in a complex: here homotetramer (four copies of itself).', 'Quaternary structure matters for function: p53 acts as a tetramer, which is why its tetramerisation domain is important.', null, null, 'Check with the PDB biological assembly.'],
          s_int: ['Binary interactions', 'Partners seen in experiments, with accession.', 'These come from curated sources such as IntAct. More experiments mean stronger evidence.', null, 'Two-hybrid-only evidence can include false positives.', 'Visualise partners in STRING.'],
          s_ia: ['IntAct ID', 'The interaction record ID in the IntAct database.', 'Follow it to see the experimental method and the paper.', null, null, null],
          s_exp: ['Number of experiments', 'How many independent experiments reported the interaction.', 'A key confidence indicator: 52 experiments for p53-MDM2 vs 1 for a poorly supported partner.', 'Many experiments.', 'A single experiment may be a false positive.', null],
        },
      },
      {
        id: 'sequence', title: 'Sequence & isoforms', icon: '🔤', url: 'uniprot.org/uniprotkb/P04637/entry#sequences',
        html: () => `${head(9)}<div class="rp-box"><h4>Sequence</h4>${F('q_info', H.kv([['Length', '393'], ['Mass (Da)', '43,653'], ['Last updated', '2026-01-10 · v5'], ['Checksum', 'AD5C149FD8106131']]), { cls: '' })}
          ${F('q_fasta', '<span class="rp-link">FASTA (canonical)</span> &nbsp; <span class="rp-link">Copy</span> &nbsp; <span class="rp-link">BLAST</span> &nbsp; <span class="rp-link">Add to basket</span>', { tag: 'div' })}
          <div class="rp-pre" style="margin-top:6px">${F('q_seq', '         10         20         30         40         50         60\nMEEPQSDPSV EPPLSQETFS DLWKLLPENN VLSDLLIDAW EPLPRCCDPQ RSPSTPRLTP', { tag: 'span', cls: 'ln' })}</div></div>
          <div class="rp-box"><h4>Sequence & isoforms</h4>${H.tbl([['Isoform', 'q_iso'], ['Identifier', 'q_id'], ['Length', 'q_len'], ['Differences', 'q_diff']], [['1 (canonical)', 'P04637-1', 393, 'None'], ['2', 'P04637-2', 341, 'Missing 1-52 (alternative start)']])}</div>
          ${F('q_conf', '<div class="rp-box"><h4>Sequence conflicts</h4>Position 134: F → L (in Ref. 4; ·authors’ sequence error)</div>', { cls: '' })}</div>`,
        f: {
          q_info: ['Sequence information', 'Length (393 aa), calculated mass (43,653 Da), last update and a checksum.', 'Mass is computed from the sequence, not measured; compare it with the band on your gel (modifications add mass). The checksum (CRC64) detects any change in the sequence.', null, 'Mass on a gel can be larger due to modifications.', 'Cite the version/date of the entry.'],
          q_fasta: ['FASTA, copy, BLAST', 'One-click actions: download or copy the sequence, run BLAST on it or add it to a basket for alignment.', 'The fastest way to start a BLAST or an alignment of this protein with its relatives.', null, null, 'Select several entries and use Align to compare them (Clustal Omega).'],
          q_seq: ['The sequence block', 'The amino-acid sequence of the canonical isoform in groups of ten, with position numbers.', 'Numbers above are the position of the last residue in each ten-block. All features in the entry refer to this numbering.', null, null, 'Use it to locate a mutation.'],
          q_iso: ['Isoforms', 'Protein versions produced by alternative splicing or alternative promoters.', 'Isoform 1 is “canonical” and used for numbering; other isoforms are described by their differences.', null, 'A variant position may not exist in a shorter isoform.', 'Say which isoform you mean.'],
          q_id: ['Isoform identifier', 'The ID of each isoform, formatted as accession-number: P04637-2.', null, null, null, null],
          q_len: ['Length', 'Length of each isoform.', 'Shorter isoforms may lack domains (e.g. an N-terminal activation domain).', null, null, null],
          q_diff: ['Differences from canonical', 'A short description of what differs: missing segments, alternative start, substitutions.', null, null, null, null],
          q_conf: ['Sequence conflicts', 'Positions where different studies reported a different residue.', 'Usually sequencing errors in older papers. The canonical sequence is the curated consensus.', null, null, null],
        },
      },
    ],
  });
})();
