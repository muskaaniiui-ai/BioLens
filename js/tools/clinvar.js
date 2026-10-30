/* ClinVar variant page and submissions. Example data is illustrative. */
(function () {
  const F = H.F, top = () => H.top('ClinVar', 'NCBI · Clinical variation', ['Advanced', 'Help'], '#2b5797');
  const stars = n => `<span class="rp-star">${'★'.repeat(n)}${'☆'.repeat(4 - n)}</span>`;
  BL.add({
    id: 'clinvar', name: 'ClinVar', icon: '🩺', color: '#2b5797', cat: 'Function & disease', url: 'ncbi.nlm.nih.gov/clinvar/variation/12347',
    question: 'Is this DNA variant harmful, and how strong is the evidence?', about: 'ClinVar variant pathogenic benign VUS review status stars HGVS submissions condition clinical significance',
    windows: [
      {
        id: 'variant', title: 'Variant page', icon: '🧬', url: 'ncbi.nlm.nih.gov/clinvar/variation/12347',
        html: () => `${top()}<div class="rp-pad">${F('v_name', '<h2>NM_000546.6(TP53):c.524G>A (p.Arg175His)</h2>', { cls: '' })}<span class="rp-mut">VCV000012347 · example entry</span>
          ${H.kv([['Germline classification', H.pill('Pathogenic', 'r') + '(36 submissions)', 'v_class'], ['Review status', stars(3) + ' criteria provided, multiple submitters, no conflicts', 'v_stars'], ['Condition(s)', 'Li-Fraumeni syndrome', 'v_cond'],
            ['Variant type', 'single nucleotide variant', 'v_type'], ['Molecular consequence', 'missense variant', 'v_cons'], ['Genomic location', 'chr17:7675088 (GRCh38) · cytogenetic 17p13.1', 'v_loc'], ['Allele frequency', 'Not observed in gnomAD', 'v_freq'], ['HGVS', 'NC_000017.11:g.7675088C>T · NM_000546.6:c.524G>A · NP_000537.3:p.Arg175His', 'v_hgvs']])}
          <div class="rp-box">${F('v_sub', '<h4>Summary of submissions</h4><div style="height:16px;border-radius:8px;overflow:hidden;display:flex"><span style="width:94%;background:#dc2626"></span><span style="width:3%;background:#f59e0b"></span><span style="width:3%;background:#94a3b8"></span></div><span class="rp-mut">94% pathogenic · 3% VUS · 3% other</span>', { cls: '' })}</div></div>`,
        f: {
          v_name: ['Variant name (HGVS)', 'The standard name of the change: transcript, gene, DNA change (c.) and protein change (p.).', 'c.524G>A: at coding position 524, G is replaced by A. p.Arg175His: at protein position 175, arginine becomes histidine. The transcript NM_000546.6 defines the numbering.', null, 'Without the transcript version, positions can differ.', 'Always quote the full HGVS with transcript.'],
          v_class: ['Germline classification', 'The overall interpretation: Pathogenic, Likely pathogenic, Uncertain significance (VUS), Likely benign or Benign.', 'It follows ACMG/AMP guidelines, which combine population frequency, computational predictions, functional data and segregation in families.', 'Pathogenic/Benign with strong review status.', 'VUS means insufficient evidence: do not treat as harmful.', 'Read the evidence in the submissions.', 'Conflicting classifications are shown as “Conflicting classifications of pathogenicity”.'],
          v_stars: ['Review status (stars)', 'How well supported the classification is: 0-4 stars.', '0 stars = no criteria; 1 = a single submitter with criteria; 2 = multiple submitters, no conflicts; 3 = reviewed by an expert panel; 4 = practice guideline. Stars measure confidence in the classification, not severity.', 'Three or more stars.', 'Zero or one star = weak evidence.', 'Never ignore stars when citing a classification.'],
          v_cond: ['Condition(s)', 'The disease(s) for which the classification applies.', 'A variant may be pathogenic for one condition and benign for another. Classification is per condition.', null, null, 'Open the condition page in MedGen.'],
          v_type: ['Variant type', 'The kind of DNA change: SNV, deletion, insertion, duplication, copy-number change.', null, null, null, null],
          v_cons: ['Molecular consequence', 'Predicted effect on the gene product: missense, nonsense, frameshift, splice site, synonymous…', 'Loss-of-function types (nonsense, frameshift) are more likely pathogenic than synonymous changes.', null, 'A missense variant can be benign or pathogenic: you need other evidence.', null],
          v_loc: ['Genomic location', 'Chromosome and position in both GRCh38 and GRCh37, plus the cytogenetic band.', 'Match the build used by your pipeline.', null, 'Build mismatch is a common error.', null],
          v_freq: ['Population frequency', 'How common the variant is in healthy populations, mostly from gnomAD.', 'A variant that causes a rare severe disease should be absent or extremely rare. Frequencies above ~1% argue for benign.', 'Absent or ≪0.01%.', 'Common in controls: unlikely pathogenic.', 'Check the popmax frequency.'],
          v_hgvs: ['HGVS expressions', 'The same variant written on several reference sequences: genome (g.), transcript (c.) and protein (p.).', 'They describe the same change on different molecules. Use the one that fits your experiment.', null, null, 'Copy the correct one for your report.'],
          v_sub: ['Submissions summary', 'The bar shows how the submitters classified the variant.', 'Mostly red means agreement on pathogenic. Disagreement (many colours) is a reason to read individual submissions.', 'Agreement among labs.', 'Mixed colours signal conflict.', 'Go to the submissions window.'],
        },
      },
      {
        id: 'submissions', title: 'Submissions', icon: '📑', url: 'ncbi.nlm.nih.gov/clinvar/variation/12347#clinical-assertions',
        html: () => `${top()}<div class="rp-pad"><h2>Clinical assertions (submissions)</h2>
          ${H.tbl([['Submission (SCV)', 's_scv'], ['Submitter', 's_sub'], ['Classification', 's_class'], ['Review status', 's_rev'], ['Condition', 's_cond'], ['Last evaluated', 's_date'], ['Method / evidence', 's_meth']], [
            ['<span class="rp-link">SCV000185001</span>', 'GeneDx', H.pill('Pathogenic', 'r'), stars(1) + ' criteria provided', 'Li-Fraumeni syndrome', 'Mar 2025', 'clinical testing; ACMG criteria PS3, PM1'],
            ['<span class="rp-link">SCV000212345</span>', 'ClinGen TP53 Variant Curation Expert Panel', H.pill('Pathogenic', 'r'), stars(3) + ' reviewed by expert panel', 'Li-Fraumeni syndrome', 'Jun 2024', 'curation; functional assay + hotspot'],
            ['<span class="rp-link">SCV000300777</span>', 'Example Lab', H.pill('Uncertain significance', 'o'), stars(1) + ' criteria provided', 'not specified', 'Jan 2019', 'literature only'],
            ['<span class="rp-link">SCV000400111</span>', 'Research Study X', H.pill('Pathogenic', 'r'), stars(0) + ' no assertion criteria', 'Hereditary cancer', 'Nov 2016', 'research']])}
          ${F('s_note', '<div class="rp-box"><b>Reading tip:</b> expert-panel submissions override individual lab submissions in the overall classification.</div>', { cls: '' })}</div>`,
        f: {
          s_scv: ['SCV accession', 'The unique ID of one submitter’s classification (SCV…). Versions track revisions.', 'The variant has one VCV and many SCVs: each lab’s opinion. RCV groups them by condition.', null, null, 'Cite SCV for a specific lab’s claim.'],
          s_sub: ['Submitter', 'The lab, clinic, database or expert panel that made the call.', 'Prefer expert panels (ClinGen VCEPs) and accredited clinical labs; research-only submitters weigh less.', 'ClinGen expert panels.', null, null],
          s_class: ['Submitted classification', 'What this submitter concluded: pathogenic, VUS, benign…', 'Disagreement between submitters is normal; look at review status and dates before trusting a single call.', 'Several independent pathogenic calls.', 'A lone VUS next to pathogenic calls usually reflects older, less evidence.', 'Prefer newer calls from expert panels.'],
          s_rev: ['Review status per submission', 'The stars for that submission: whether criteria were provided and whether an expert panel reviewed it.', '0 = no criteria; 1 = criteria provided; 3 = expert panel. This is the best quick quality filter.', null, 'Zero stars: treat as opinion.', null],
          s_cond: ['Condition', 'The disease the submitter evaluated.', '“not specified” means a general assertion without a defined disease.', null, null, null],
          s_date: ['Last evaluated', 'When the submitter last reviewed the evidence.', 'Old evaluations may predate newer data; interpretation evolves (VUS often reclassify).', 'Recent dates.', 'Very old assertions.', 'Check dates before citing.'],
          s_meth: ['Method & evidence', 'The kind of evidence used: clinical testing, literature, functional assays, ACMG criteria codes.', 'Criteria codes such as PS3 (functional studies) and PM1 (hotspot) show exactly why the call was made.', null, null, 'Search a code to learn what it means.'],
          s_note: ['Aggregate rule', 'ClinVar summarises many submissions into one classification using their review status.', 'An expert panel classification outranks the rest; otherwise multiple concordant submissions earn a higher star rating.', null, null, null],
        },
      },
    ],
  });
})();
