/* Ensembl gene page, genome browser and variant table. Example data is illustrative. */
(function () {
  const F = H.F, top = () => H.top('Ensembl', 'Genome browser 115', ['BLAST/BLAT', 'BioMart', 'Tools', 'Downloads', 'Help'], '#2a2a5a');
  BL.add({
    id: 'ensembl', name: 'Ensembl', icon: '🌐', color: '#4338ca', cat: 'Genomes', url: 'ensembl.org/Homo_sapiens/Gene/Summary?g=ENSG00000141510',
    question: 'How is this gene built in the genome, and what variation does it have?', about: 'Ensembl genome browser gene transcripts MANE canonical APPRIS location view variants SIFT PolyPhen',
    windows: [
      {
        id: 'gene', title: 'Gene & transcripts', icon: '🧬', url: 'ensembl.org/Homo_sapiens/Gene/Summary?g=ENSG00000141510',
        html: () => `${top()}<div class="rp-pad"><h2>Gene: TP53 <span class="rp-mut" style="font-size:12px">ENSG00000141510</span></h2>
          ${H.kv([['Description', 'tumor protein p53 [Source:HGNC Symbol;Acc:HGNC:11998]', 'e_desc'], ['Location', 'Chromosome 17: 7,661,779-7,687,538 reverse strand', 'e_loc'], ['About this gene', 'This gene has 28 transcripts (splice variants), 143 orthologues, 3 paralogues and is a member of 1 Ensembl protein family.', 'e_about']])}
          <h4>Transcripts</h4>${H.tbl([['Name', 'e_name'], ['Transcript ID', 'e_tid'], ['bp', 'e_bp'], ['Protein', 'e_prot'], ['Biotype', 'e_bio'], ['Flags', 'e_flags']], [
            ['TP53-201', '<span class="rp-link">ENST00000269305.9</span>', '2512', '393aa', 'Protein coding', H.pill('MANE Select', 'g') + H.pill('Ensembl Canonical', 'g') + H.pill('APPRIS P1', 'p') + H.pill('TSL:1')], ['TP53-204', 'ENST00000445888.6', '2579', '393aa', 'Protein coding', H.pill('TSL:1')], ['TP53-210', 'ENST00000504290.5', '640', 'No protein', 'Retained intron', '']])}</div>`,
        f: {
          e_desc: ['Gene description & ID', 'The gene’s name, the ENSG stable ID and the source of the name (HGNC).', 'ENSG IDs are Ensembl’s stable identifiers: they stay constant between releases (the version number can change).', null, 'Do not confuse ENSG (gene), ENST (transcript), ENSP (protein), ENSE (exon).', 'Cite the Ensembl release with the ID.'],
          e_loc: ['Location & strand', 'Chromosome, start–end coordinates and strand (here reverse).', 'Coordinates refer to the current assembly (GRCh38). Reverse strand means the gene is read towards lower coordinates.', null, 'Check the assembly: GRCh37 positions differ.', 'Click to open the genome browser.'],
          e_about: ['About this gene', 'Counts of transcripts, orthologues (same gene in other species), paralogues (gene-family copies) and protein families.', 'It summarises how complex and how conserved the gene is.', null, null, 'Follow orthologues for model organisms.'],
          e_name: ['Transcript name', 'The label of each splice variant, e.g. TP53-201.', 'Names are generated from the gene symbol and a number; -201 is not “first” in any biological sense.', null, null, null],
          e_tid: ['Transcript ID (ENST)', 'Stable identifier of each transcript.', 'Use the ENST with its version when reporting variants.', null, null, 'Prefer the MANE Select transcript.'],
          e_bp: ['Length (bp)', 'Number of base pairs of the mature transcript.', null, null, null, null],
          e_prot: ['Protein length', 'Amino acids of the encoded protein, or “No protein” for non-coding transcripts.', 'Different lengths show different isoforms.', null, null, null],
          e_bio: ['Biotype', 'What kind of transcript it is: protein coding, retained intron, nonsense-mediated decay, lncRNA…', '“Nonsense mediated decay” and “retained intron” transcripts are not translated into a functional protein.', null, null, null],
          e_flags: ['Transcript flags', 'Quality labels: MANE Select, Ensembl Canonical, APPRIS principal isoform and transcript support level (TSL).', 'MANE Select is the shared NCBI/Ensembl standard; APPRIS P1 is the best-supported functional isoform; TSL:1 = strongest evidence for the transcript.', 'MANE + canonical + APPRIS P1 + TSL:1 = a very confident reference transcript.', 'TSL 4-5 or NA = weakly supported.', 'Use these flags to choose your transcript.', 'TSL is derived from mRNA/EST alignments.'],
        },
      },
      {
        id: 'location', title: 'Location view', icon: '🗺️', url: 'ensembl.org/Homo_sapiens/Location/View?r=17:7661779-7687538',
        html: () => `${top()}<div class="rp-pad"><h2>Region in detail: 17:7,661,779-7,687,538</h2>
          <div class="rp-box">${F('b_nav', '<span class="rp-link">◀ ▶ Scroll</span> &nbsp; <span class="rp-link">＋ − Zoom</span> &nbsp; <span class="rp-link">Configure this page</span> &nbsp; <span class="rp-link">Export data</span>', { tag: 'div' })}</div>
          <div class="rp-box">${F('b_ruler', '<div class="rp-row rp-mut" style="justify-content:space-between;font-size:11px;border-bottom:2px solid #334"><span>7.66 Mb</span><span>7.67 Mb</span><span>7.68 Mb</span><span>7.69 Mb</span></div>', { cls: '' })}
          <div class="rp-mut" style="font-size:10.5px;margin-top:6px">Genes (reverse strand)</div>${F('b_gene', H.track([{ s: 3, e: 97, c: '#b91c1c', t: '◀ TP53 · protein coding' }], 100), { cls: '' })}
          <div class="rp-mut" style="font-size:10.5px">Transcripts</div>${F('b_trans', H.track([{ s: 3, e: 97, c: '#1d4ed8', t: 'TP53-201 (MANE Select)' }], 100) + H.track([{ s: 6, e: 97, c: '#60a5fa', t: 'TP53-204' }], 100), { cls: '' })}
          <div class="rp-mut" style="font-size:10.5px">Exon structure</div>${F('b_exons', H.row([{ s: 3, e: 6 }, { s: 12, e: 16 }, { s: 28, e: 33 }, { s: 40, e: 45 }, { s: 52, e: 58 }, { s: 66, e: 70 }, { s: 80, e: 84 }, { s: 90, e: 97 }].map(x => ({ ...x, c: '#1d4ed8' })), 100), { cls: '' })}
          <div class="rp-mut" style="font-size:10.5px">Variants (dbSNP / ClinVar)</div>${F('b_var', '<div class="rp-track">' + [14, 31, 41, 47, 55, 61, 73, 82].map(x => `<i style="left:${x}%;width:.7%;background:${x % 2 ? '#dc2626' : '#16a34a'}"></i>`).join('') + '</div>', { cls: '' })}
          <div class="rp-mut" style="font-size:10.5px">Regulatory features</div>${F('b_reg', H.row([{ s: 1, e: 8, c: '#f59e0b', t: 'Promoter' }, { s: 55, e: 63, c: '#a855f7', t: 'Enhancer' }], 100), { cls: '' })}</div></div>`,
        f: {
          b_nav: ['Navigation & configuration', 'Buttons to scroll, zoom, configure tracks and export the displayed data.', '“Configure this page” turns tracks on and off: conservation, variants, regulatory features, other species.', null, null, 'Export to get the data behind the picture.'],
          b_ruler: ['Genomic ruler', 'The coordinate scale of the chromosome region shown.', 'It shows positions in Mb on chromosome 17. Zoom in until letters appear.', null, null, null],
          b_gene: ['Gene track', 'The gene drawn on its strand; the arrow shows the direction of transcription.', 'Red here = protein-coding genes; other colours mark non-coding genes, pseudogenes and so on. Reverse-strand genes are drawn below the ruler in Ensembl’s standard view.', null, null, null],
          b_trans: ['Transcript track', 'Each splice variant on its own line: boxes are exons, thin lines are introns.', 'Comparing lines shows alternative exons, alternative starts and ends.', 'The MANE Select transcript is highlighted.', null, 'Look for exons that exist in only one transcript.'],
          b_exons: ['Exon structure', 'Filled blocks are exons: the pieces kept in the mature mRNA.', 'Wide spaces between exons are introns removed by splicing. Coding exons are tall; untranslated parts are shorter.', null, null, null],
          b_var: ['Variation track', 'Known DNA differences: each tick is a SNP or indel from dbSNP, ClinVar and other sources.', 'Colours code the predicted consequence: red = protein-altering (missense, stop gained), green = synonymous, other colours = intronic or regulatory.', 'Clusters of red ticks mark sensitive regions.', 'A SNP in a database is not necessarily pathogenic.', 'Click a tick for its rs ID, frequency and consequences.'],
          b_reg: ['Regulatory features', 'Regions that control the gene: promoter, enhancer, CTCF sites, open chromatin.', 'Predicted from histone marks and ChIP-seq. Variants here can change expression without changing the protein.', null, 'Context-dependent: active only in some cell types.', 'Check which cell types the feature is active in.'],
        },
      },
      {
        id: 'variants', title: 'Variant table', icon: '🧮', url: 'ensembl.org/Homo_sapiens/Gene/Variation_Gene/Table?g=ENSG00000141510',
        html: () => `${top()}<div class="rp-pad"><h2>Variants in TP53</h2>
          ${F('v_filter', 'Filter by consequence: ' + H.pill('missense', 'p') + H.pill('stop gained') + H.pill('synonymous') + H.pill('intron') + ' &nbsp; Impact: ' + H.pill('HIGH', 'r') + H.pill('MODERATE', 'o'), { cls: 'rp-box' })}
          ${H.tbl([['Variant ID', 'v_id'], ['Location', 'v_loc'], ['Alleles', 'v_all'], ['Consequence', 'v_cons'], ['Amino acid', 'v_aa'], ['SIFT', 'v_sift'], ['PolyPhen', 'v_poly'], ['Clinical significance', 'v_clin']], [
            ['<span class="rp-link">rs28934578</span>', '17:7673803', 'C/T', 'missense variant', 'R/H', H.pill('deleterious (0)', 'r'), H.pill('probably damaging (1.0)', 'r'), H.pill('pathogenic', 'r')],
            ['<span class="rp-link">rs1042522</span>', '17:7676154', 'G/C', 'missense variant', 'P/R', H.pill('tolerated (0.7)', 'g'), H.pill('benign (0.0)', 'g'), H.pill('benign', 'g')],
            ['<span class="rp-link">rs121912651</span>', '17:7674220', 'C/T', 'stop gained', 'R/*', '-', '-', H.pill('pathogenic', 'r')]])}</div>`,
        f: {
          v_filter: ['Consequence & impact filters', 'Show only variants of selected types: missense, stop gained, frameshift, synonymous, intronic…', 'VEP groups consequences by impact: HIGH (stop, frameshift), MODERATE (missense), LOW (synonymous) and MODIFIER (non-coding).', 'HIGH impact variants are most likely to break the protein.', null, 'Start with HIGH and MODERATE.'],
          v_id: ['Variant ID (rs number)', 'The dbSNP identifier of the variant.', 'An rs number is a stable name for a variant, independent of the genome build.', null, null, 'Use it to search ClinVar and literature.'],
          v_loc: ['Genomic location', 'Chromosome and position of the variant in the current assembly.', 'Different assemblies give different positions for the same variant.', null, 'Check GRCh37 vs GRCh38.', null],
          v_all: ['Alleles', 'Reference allele / alternative allele: C/T means reference C, variant T.', 'The reference is what the genome assembly shows; it is not always the most common allele.', null, null, null],
          v_cons: ['Consequence', 'The predicted effect on the transcript: missense, stop gained, synonymous, splice donor…', 'Predicted by the Variant Effect Predictor (VEP) on the chosen transcript.', 'Check it on the MANE Select transcript.', 'A variant can have different consequences on different transcripts.', null],
          v_aa: ['Amino acid change', 'Reference / alternative amino acid: R/H means arginine to histidine; * is a stop.', 'Substitutions between very different amino acids are more disruptive.', null, null, null],
          v_sift: ['SIFT', 'Predicts whether a substitution affects protein function from sequence conservation. Score near 0 = deleterious, near 1 = tolerated.', 'The threshold is 0.05: below it, deleterious.', null, 'Predictions are not proof; combine them.', null],
          v_poly: ['PolyPhen', 'Predicts damage using structure and conservation: benign, possibly damaging, probably damaging (score 0-1).', 'A score close to 1 means likely damaging.', null, 'Predictors disagree on many variants.', 'Look at both SIFT and PolyPhen and ClinVar.'],
          v_clin: ['Clinical significance', 'The classification submitted to ClinVar: pathogenic, likely pathogenic, VUS, likely benign, benign.', 'This is human-reviewed evidence and outranks computer predictors; see the ClinVar tool for star ratings.', 'Pathogenic / benign with strong review status.', 'VUS = uncertain; do not act on it.', 'Open ClinVar for the evidence.'],
        },
      },
    ],
  });
})();
