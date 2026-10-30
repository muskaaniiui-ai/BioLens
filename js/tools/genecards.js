/* GeneCards. Example data is illustrative. */
(function () {
  const F = H.F, top = () => H.top('GeneCards', 'The Human Gene Database', ['Search', 'Tools', 'Downloads', 'Help'], '#0f766e');
  const nav = (a) => `<div class="rp-row" style="gap:5px;margin:6px 0">${['Summary', 'Genomics', 'Proteins', 'Domains', 'Function', 'Disorders', 'Expression', 'Pathways', 'Compounds', 'Publications'].map(s => `<span class="rp-pill ${s === a ? 'g' : ''}">${s}</span>`).join('')}</div>`;
  BL.add({
    id: 'genecards', name: 'GeneCards', icon: '🗂️', color: '#0f766e', cat: 'Function & disease', url: 'genecards.org/cgi-bin/carddisp.pl?gene=TP53',
    question: 'What is known about this human gene, gathered from many databases?', about: 'GeneCards human gene database GIFtS aliases summaries disorders expression pathways compounds aggregator',
    windows: [
      {
        id: 'summary', title: 'Gene card summary', icon: '📇', url: 'genecards.org/cgi-bin/carddisp.pl?gene=TP53',
        html: () => `${top()}<div class="rp-pad"><h2>TP53 Gene <span class="rp-mut" style="font-size:12px">· Tumor Protein P53</span></h2>${nav('Summary')}
          <div class="rp-row">${F('c_gifts', H.pill('GIFtS: 63', 'g'), { tag: 'span', style: 'padding-right:22px' })}${F('c_cat', H.pill('Protein Coding') + H.pill('Disease-associated'), { tag: 'span', style: 'padding-right:22px' })}${F('c_gcid', '<span class="rp-mono">GCID: GC17M007661</span>', { tag: 'span', style: 'padding-right:22px' })}</div>
          ${F('c_alias', '<div class="rp-box"><h4>Aliases for TP53 Gene</h4>Tumor Protein P53 · Cellular Tumor Antigen P53 · P53 · LFS1 · TRP53 · BCC7</div>', { cls: '' })}
          ${F('c_sum', '<div class="rp-box"><h4>Summaries for TP53 Gene</h4><b>Entrez Gene:</b> This gene encodes a tumor suppressor protein…<br><b>UniProtKB:</b> Acts as a tumor suppressor in many tumor types…<br><b>GeneCards:</b> TP53 (Tumor Protein P53) is a Protein Coding gene. Diseases associated with TP53 include Li-Fraumeni Syndrome. Among its related pathways are Cell cycle and p53 signaling. An important paralog of this gene is TP63.</div>', { cls: '' })}</div>`,
        f: {
          c_gifts: ['GIFtS score', 'GeneCards Inferred Functionality Score: a number that grows with the amount of annotation available for a gene.', 'High GIFtS = very well studied; low = little known. It measures how much is known, not how important the gene is.', 'High values: plenty of data to work with.', 'A low score does not mean the gene is unimportant, only understudied.', 'Use it to choose genes with rich evidence.'],
          c_cat: ['Gene categories', 'Quick labels: Protein Coding, RNA gene, Pseudogene, Disease-associated…', 'They help you check that the gene type matches your expectation.', null, null, null],
          c_gcid: ['GCID', 'The GeneCards stable identifier of the card.', 'Encodes the chromosome and position: GC17M007661 = chromosome 17 near 7.66 Mb. Use it like an accession.', null, null, null],
          c_alias: ['Aliases', 'All names the gene has been called, collected from many sources.', 'Search the literature with all aliases to avoid missing old papers.', null, 'Some aliases are shared with other genes.', null],
          c_sum: ['Summaries from several sources', 'Short descriptions from Entrez Gene, UniProtKB, and GeneCards’ own auto-generated text, shown together.', 'Where independent summaries agree you can be confident. The GeneCards paragraph is machine-generated from other databases.', 'Agreement across sources.', 'The last paragraph is automatic and is not a primary source.', 'Go to the original source for important claims.'],
        },
      },
      {
        id: 'disorders', title: 'Disorders & expression', icon: '🏥', url: 'genecards.org/cgi-bin/carddisp.pl?gene=TP53#disorders',
        html: () => `${top()}<div class="rp-pad">${nav('Disorders')}<div class="rp-box"><h4>Disorders / diseases for TP53</h4>
          ${H.tbl([['Disorder', 'd_name'], ['Score', 'd_score'], ['Source', 'd_src']], [['Li-Fraumeni syndrome', '93.1', 'OMIM, ClinVar, Orphanet'], ['Colorectal cancer', '32.0', 'GWAS, text mining'], ['Breast cancer', '28.4', 'text mining']])}</div>
          <div class="rp-box"><h4>Expression</h4>${F('d_expr', 'RNA tissue specificity: Low tissue specificity ' + H.track([{ s: 1, e: 70, c: '#14b8a6', t: 'lymph node' }], 100) + H.track([{ s: 1, e: 55, c: '#14b8a6', t: 'appendix' }], 100) + H.track([{ s: 1, e: 25, c: '#14b8a6', t: 'liver' }], 100), { cls: '' })}</div>
          <div class="rp-box"><h4>Pathways</h4>${F('d_path', H.tbl(['Pathway', 'SuperPath score'], [['Cell cycle', '12.8'], ['p53 signaling pathway', '11.5']]), { cls: '' })}</div>
          ${F('d_comp', '<div class="rp-box"><h4>Compounds</h4>Nutlin-3, Idasanutlin, APR-246 · <span class="rp-mut">drug-target associations from DrugBank/TTD</span></div>', { cls: '' })}</div>`,
        f: {
          d_name: ['Disorders list', 'Diseases linked to the gene, from OMIM, ClinVar, Orphanet, GWAS and text mining.', 'Ranked by a combined relevance score. The source column tells you how each association was obtained.', null, null, 'Prioritise those backed by curated sources.'],
          d_score: ['Relevance score', 'A number combining evidence from multiple sources: the higher, the stronger or more frequent the association.', 'It is a ranking score, NOT a probability or a risk estimate. Different sources are weighted differently.', 'High score from curated sources.', 'Low-scoring text-mined links are often noise.', 'Check ClinVar/OMIM for evidence.'],
          d_src: ['Evidence source', 'Where the gene-disease link comes from.', 'Curated clinical databases (OMIM, ClinVar) beat text mining or GWAS associations for causality.', null, 'Text mining can mention genes in an unrelated sentence.', 'Prefer OMIM and ClinVar.'],
          d_expr: ['Expression', 'Where the gene is active, from the Human Protein Atlas/GTEx: bars show relative RNA level in tissues.', '“Low tissue specificity” means broad expression. Compare with the tissue of your experiment.', null, 'RNA level is not protein level.', null],
          d_path: ['Pathways', 'Biological pathways that include the gene, from KEGG, Reactome and others, with a SuperPath score.', 'SuperPaths merge similar pathways from different databases to reduce redundancy.', null, null, 'Open the pathway in Reactome/KEGG.'],
          d_comp: ['Compounds', 'Drugs and chemicals reported to target the gene or its product.', 'Useful for drug repurposing. Experimental compounds may never have been tested clinically.', null, 'Presence in a list does not mean approved use.', null],
        },
      },
      {
        id: 'genomics', title: 'Genomics & proteins', icon: '🧬', url: 'genecards.org/cgi-bin/carddisp.pl?gene=TP53#genomics',
        html: () => `${top()}<div class="rp-pad">${nav('Genomics')}<div class="rp-box"><h4>Genomics for TP53</h4>
          ${H.kv([['Chromosome / Cytoband', '17p13.1', 'g_loc'], ['Genomic location', 'chr17:7,661,779-7,687,550 (GRCh38)', 'g_coord'], ['Gene size', '25.8 kb · 11 exons', 'g_size'], ['GeneHancer regulatory elements', '12 enhancers/promoters', 'g_gh']])}</div>
          <div class="rp-box"><h4>Proteins for TP53</h4>${F('g_prot', '<b>UniProtKB:</b> P04637 · <b>Domains:</b> p53 DNA-binding, tetramerisation · <b>Isoforms:</b> 12 · <b>Subcellular location:</b> nucleus, cytoplasm', { cls: '' })}</div>
          ${F('g_orth', '<div class="rp-box"><h4>Orthologs and paralogs</h4>Orthologs: mouse Trp53, rat Tp53, zebrafish tp53 · Paralogs: TP63, TP73</div>', { cls: '' })}</div>`,
        f: {
          g_loc: ['Cytoband', 'Chromosome and band of the gene.', '17p13.1: chromosome 17, short arm, band 13.1.', null, null, null],
          g_coord: ['Genomic coordinates', 'Start-end position on the reference assembly.', 'Always note the assembly: coordinates in GRCh37 are different.', null, 'Mixing assemblies shifts positions.', null],
          g_size: ['Gene size & exon count', 'Length in kilobases and number of exons.', 'Compact genes are easier to sequence; large genes have many exons and more room for variants.', null, null, null],
          g_gh: ['GeneHancer elements', 'Number of regulatory regions linked to the gene (enhancers and promoters).', 'Many linked elements suggest complex, tissue-specific control. They are predictions from integrated data.', null, 'Predicted links, not all validated.', 'Variants in these regions can change expression.'],
          g_prot: ['Proteins section', 'Protein-level information imported from UniProt: accession, domains, isoforms and location.', 'GeneCards does not curate it itself; it displays UniProt’s data. Use UniProt for details.', null, null, 'Go to the UniProt tool for the primary source.'],
          g_orth: ['Orthologs & paralogs', 'The same gene in other species (orthologs) and related genes in the human genome (paralogs).', 'Orthologs support model-organism studies; paralogs may compensate for the gene if it is lost.', null, null, 'Look at TP63/TP73 for redundancy.'],
        },
      },
    ],
  });
})();
