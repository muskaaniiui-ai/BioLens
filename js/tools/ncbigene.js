/* NCBI Gene. Example data is illustrative. */
(function () {
  const F = H.F, top = () => H.top('NCBI', 'Gene', ['Advanced', 'Help'], '#20558a');
  BL.add({
    id: 'ncbigene', name: 'NCBI Gene', icon: '🧬', color: '#2b6cb0', cat: 'Sequence & gene databases', url: 'ncbi.nlm.nih.gov/gene/7157',
    question: 'What is this gene, where does it live, and which records belong to it?', about: 'NCBI Gene entry symbol aliases summary genomic context RefSeq expression orthologs chromosome',
    windows: [
      {
        id: 'summary', title: 'Gene summary', icon: '📇', url: 'ncbi.nlm.nih.gov/gene/7157',
        html: () => `${top()}<div class="rp-pad">${F('g_title', '<h2>TP53 tumor protein p53 [ Homo sapiens (human) ]</h2>', { cls: '' })}
          ${F('g_id', '<span class="rp-mut">Gene ID: <b>7157</b>, updated on 5-Aug-2026</span>', { cls: '' })}
          ${H.kv([['Official Symbol', 'TP53 <span class="rp-mut">provided by HGNC</span>', 'g_symbol'], ['Official Full Name', 'tumor protein p53 <span class="rp-mut">provided by HGNC</span>', 'g_full'], ['Primary source', 'HGNC:HGNC:11998', 'g_source'],
            ['See related', 'Ensembl:ENSG00000141510 · MIM:191170 · AllianceGenome:HGNC:11998', 'g_related'], ['Gene type', 'protein coding', 'g_type'], ['RefSeq status', 'REVIEWED', 'g_status'], ['Organism', 'Homo sapiens', 'g_org'],
            ['Also known as', 'P53; BCC7; LFS1; TRP53', 'g_aka'], ['Summary', 'This gene encodes a tumor suppressor protein containing transcriptional activation, DNA binding, and oligomerization domains. The encoded protein responds to diverse cellular stresses to regulate expression of target genes, inducing cell cycle arrest, apoptosis, senescence, DNA repair…', 'g_summary'],
            ['Expression', 'Ubiquitous expression in lymph node (RPKM 22.1), appendix (RPKM 19.7) and 25 other tissues', 'g_expr'], ['Orthologs', 'mouse all', 'g_orth']])}</div>`,
        f: {
          g_title: ['Gene title', 'Symbol, descriptive name and organism: TP53, tumor protein p53, Homo sapiens.', 'Because many species share gene names, the organism in brackets is essential. Mouse has Trp53, a different gene entry.', null, 'Searching a symbol without the organism can return several species.', 'Always check the organism label.'],
          g_id: ['Gene ID', 'A number that uniquely and permanently identifies this gene in NCBI (7157).', 'Symbols can change; the Gene ID does not. It is the safest key for scripts and databases.', 'Cite the ID with the symbol.', null, 'Use GeneID in pipelines.'],
          g_symbol: ['Official Symbol', 'The approved short name set by a nomenclature committee (HGNC for human).', 'Human symbols are upper-case (TP53); mouse and rat are capitalised (Trp53).', null, 'Old names appear in “Also known as”.', 'Use the official symbol in papers.'],
          g_full: ['Official Full Name', 'The approved descriptive name of the gene.', 'It summarises what the gene encodes: here the tumor protein p53.', null, null, null],
          g_source: ['Primary source', 'The authority that supplied the official symbol: HGNC for human genes.', 'Click the ID on the real site to open the HGNC gene page.', null, null, 'HGNC ID is a stable cross-reference.'],
          g_related: ['See related', 'Links to the same gene in other databases: Ensembl, OMIM (disease), Alliance Genome.', 'Each ID lets you jump to a tool with different strengths: Ensembl for genomics, OMIM for disease.', null, null, 'Follow the Ensembl ID to the Ensembl tool in BioLens.'],
          g_type: ['Gene type', 'The class of the gene: protein coding, ncRNA, rRNA, tRNA, pseudo…', 'Tells you what kind of product to expect. “Pseudo” genes are broken copies that usually are not functional.', 'protein coding for most research genes.', null, null],
          g_status: ['RefSeq status', 'How well curated the reference records of this gene are: REVIEWED, VALIDATED, PROVISIONAL, PREDICTED, INFERRED.', 'REVIEWED means NCBI curators reviewed the literature for this record; it is the best level.', 'REVIEWED / VALIDATED.', 'PREDICTED or INFERRED = computer-made.', null],
          g_org: ['Organism', 'The species the gene belongs to.', 'Click for the taxonomy page.', null, null, null],
          g_aka: ['Also known as', 'Aliases and old names used in the literature.', 'Search with these as well when looking for papers, because older studies use the old names.', null, 'Aliases may be shared by different genes.', 'Add aliases to literature searches.'],
          g_summary: ['Summary', 'A curated paragraph on what the gene does and why it matters.', 'It combines RefSeq curation and, when available, disease and pathway information. Good first read before specialised databases.', 'Rich, specific summaries indicate well-studied genes.', '“No summary available” signals little knowledge.', 'Use it as an overview, not as evidence.'],
          g_expr: ['Expression', 'In which tissues the gene’s RNA is found, from RNA-seq projects, with RPKM values.', 'RPKM/TPM are normalised read counts: higher = more RNA. “Ubiquitous” means found in many tissues.', null, 'Expression ≠ function; RNA levels are not protein levels.', 'Click through to the expression viewer.'],
          g_orth: ['Orthologs', 'Links to the same gene in other species.', 'Useful for model organisms: find the mouse or zebrafish counterpart of a human gene.', null, null, 'Use them to design animal experiments.'],
        },
      },
      {
        id: 'context', title: 'Genomic context', icon: '📍', url: 'ncbi.nlm.nih.gov/gene/7157#genomic-context',
        html: () => `${top()}<div class="rp-pad"><h2>Genomic context</h2>
          ${H.kv([['Location', '17p13.1', 'x_loc'], ['Exon count', '25', 'x_exon'], ['Annotation release', 'RS_2026_04 (GRCh38.p14)', 'x_release'], ['Assembly location', 'NC_000017.11 (7661779..7687550, complement)', 'x_assembly']])}
          <div class="rp-box"><h4>Genomic regions, transcripts, and products</h4>
          ${F('x_graph', '<div class="rp-mut" style="font-size:11px">Chromosome 17 · NC_000017.11 · 7.66 Mb</div>' + H.track([{ s: 1, e: 25, c: '#94a3b8', t: 'WRAP53' }, { s: 40, e: 100, c: '#3b82f6', t: '◀ TP53' }, { s: 115, e: 200, c: '#94a3b8', t: 'EFNB3' }], 220), { cls: '' })}
          ${F('x_tracks', '<div class="rp-track"><i style="left:18%;width:30%;background:#10b981">NM_000546.6 → NP_000537.3</i></div><div class="rp-track"><i style="left:18%;width:30%;background:#10b981;opacity:.6">NM_001126112.3 → NP_001119584.1</i></div>', { cls: '' })}</div></div>`,
        f: {
          x_loc: ['Cytogenetic location', 'The chromosome and band where the gene sits: 17p13.1.', '17 = chromosome; p = short arm (q = long arm); 13.1 = region 1, band 3, sub-band 1. Numbers rise away from the centromere.', null, null, 'Used in genetics and cytogenetics reports.'],
          x_exon: ['Exon count', 'Number of exons annotated for the gene (25, counting every transcript’s exons).', 'Different transcripts use different exon subsets. The count tells you the gene is complex.', null, 'Count per transcript can be lower.', null],
          x_release: ['Annotation release & assembly', 'Which genome build and annotation version these coordinates belong to (GRCh38).', 'Coordinates change between builds (GRCh37 vs GRCh38). Mixing builds shifts positions and breaks analyses.', 'Always note the assembly.', 'A mismatch of builds is a very common bug.', 'Report “GRCh38” with every coordinate.'],
          x_assembly: ['Assembly location', 'The exact start and end on the chromosome record NC_000017.11, plus the strand: here “complement”.', '“complement” means the gene is read from the minus strand, so the start codon has the HIGHER coordinate.', null, 'Forgetting the strand flips results.', 'Use the strand when designing primers.'],
          x_graph: ['Neighbouring genes', 'A map of the chromosome around the gene showing the genes next to it.', 'Gene neighbourhood can hint at shared regulation or functional clusters. Arrows show direction of transcription.', null, null, 'Look for overlapping genes on opposite strands.'],
          x_tracks: ['Transcripts and products', 'For each transcript variant (NM_) the protein it makes (NP_), drawn on the genome.', 'Different exon use yields different isoforms; the MANE Select one is the standard reference.', 'The MANE Select transcript is the best default.', null, 'Click a product to open the protein.'],
        },
      },
      {
        id: 'refseq', title: 'RefSeq & links', icon: '🔗', url: 'ncbi.nlm.nih.gov/gene/7157#reference-sequences',
        html: () => `${top()}<div class="rp-pad"><h2>NCBI Reference Sequences (RefSeq)</h2>
          ${H.tbl([['RNA', 'rs_nm'], ['Protein', 'rs_np'], ['Isoform', 'rs_iso'], ['Flags', 'rs_flag']], [
            ['<span class="rp-link">NM_000546.6</span>', '<span class="rp-link">NP_000537.3</span>', 'isoform a', H.pill('MANE Select', 'g')], ['<span class="rp-link">NM_001126112.3</span>', '<span class="rp-link">NP_001119584.1</span>', 'isoform a', ''], ['<span class="rp-link">NM_001126114.3</span>', '<span class="rp-link">NP_001119586.1</span>', 'isoform c', '']])}
          ${F('rs_genomic', '<div class="rp-box"><b>Genomic:</b> <span class="rp-link">NC_000017.11</span> Chromosome 17 reference GRCh38.p14 · <span class="rp-link">NG_017013.2</span> RefSeqGene</div>', { cls: '' })}
          ${F('rs_links', '<div class="rp-box"><b>Related sequences</b> · <b>Variation</b> · <b>Pathways</b> · <b>Interactions</b> · <b>Bibliography</b> · <b>General gene information</b> · <b>Homology</b></div>', { cls: '' })}</div>`,
        f: {
          rs_nm: ['RNA accession (NM_)', 'The curated mRNA reference records of the gene: one per transcript variant.', 'NM_ = curated mRNA; XM_ = predicted. The number after the dot is the version.', 'NM_ is curated.', 'XM_ is predicted.', 'Use the MANE Select NM_ in reports.'],
          rs_np: ['Protein accession (NP_)', 'The protein made from the transcript on the same row.', 'NP_ = curated protein; XP_ = predicted. Use it in BLAST, UniProt and structure tools.', null, null, 'Paste into UniProt to see the entry.'],
          rs_iso: ['Isoform', 'The protein version label: a, b, c…', 'Isoforms differ in start, end or internal exons, so they may differ in function. Isoform a is often (not always) the longest.', null, null, 'Check which isoform an experiment used.'],
          rs_flag: ['MANE Select', 'The one transcript jointly chosen by NCBI and Ensembl/EMBL-EBI as the default for the gene.', 'It makes cross-database comparison unambiguous: both databases use the same transcript and protein.', 'MANE Select = the standard.', null, 'Use MANE Select for variants (ClinVar uses it).'],
          rs_genomic: ['Genomic records', 'The chromosome record (NC_) and the RefSeqGene (NG_) that cover the gene.', 'NC_ gives genome coordinates; NG_ is a stable gene-centred coordinate system used for variant naming.', null, null, 'Use NG_ when describing mutations in clinical genetics.'],
          rs_links: ['Related links', 'Doors to other sections: related sequences, variation, pathways, interactions, publications, homology.', 'This is the hub that connects the gene to the rest of NCBI.', null, null, 'Follow “Variation” to ClinVar.'],
        },
      },
    ],
  });
})();
