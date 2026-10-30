/* GenBank / NCBI Nucleotide record. Example data is illustrative (an mRNA record in the style of NM_000546). */
(function () {
  const F = H.F, top = () => H.top('NCBI', 'Nucleotide', ['GenBank ▾', 'Send to ▾', 'Change region shown'], '#20558a');
  const L = (k, t) => F(k, t, { tag: 'span', cls: 'ln' });
  const seq = 'gagctagcca ctccggagtt cagctagcaa gcatggagga gccccagagc gaccccagcg tggagccccc tctgagtcag gaaacatttt cagacctatg gaaactactt cctgaaaaca acgttctgtc';
  BL.add({
    id: 'genbank', name: 'GenBank', icon: '📄', color: '#20558a', cat: 'Sequence & gene databases', url: 'ncbi.nlm.nih.gov/nuccore/NM_000546.6',
    question: 'What is the complete annotated record of this sequence?', about: 'GenBank nucleotide record flat file LOCUS FEATURES CDS accession version RefSeq',
    windows: [
      {
        id: 'header', title: 'Record header', icon: '🏷️', url: 'ncbi.nlm.nih.gov/nuccore/NM_000546.6?report=genbank',
        html: () => `${top()}<div class="rp-pad"><h4>GenBank view</h4><div class="rp-pre">
${L('h_locus', 'LOCUS       NM_000546              2512 bp    mRNA    linear   PRI 05-AUG-2026')}
${L('h_def', 'DEFINITION  Homo sapiens tumor protein p53 (TP53), transcript variant 1, mRNA.')}
${L('h_acc', 'ACCESSION   NM_000546')}
${L('h_ver', 'VERSION     NM_000546.6')}
${L('h_kw', 'KEYWORDS    RefSeq; MANE Select.')}
${L('h_src', 'SOURCE      Homo sapiens (human)')}
${L('h_org', '  ORGANISM  Homo sapiens\n            Eukaryota; Metazoa; Chordata; Craniata; Vertebrata; Euteleostomi;\n            Mammalia; Eutheria; Euarchontoglires; Primates; Haplorrhini;\n            Catarrhini; Hominidae; Homo.')}
${L('h_ref', 'REFERENCE   1  (bases 1 to 2512)\n  AUTHORS   Example,A. and Student,B.\n  TITLE     An illustrative reference about the tumor suppressor p53\n  JOURNAL   Example Journal 12, 345-356 (2026)\n   PUBMED   00000000')}
${L('h_comment', 'COMMENT     REVIEWED REFSEQ: This record has been curated by NCBI staff.\n            The reference sequence was derived from AB082923.1.\n            On Aug 5, 2026 this sequence version replaced NM_000546.5.\n            Summary: ... COMPLETENESS: complete on the 3\' end.')}</div></div>`,
        f: {
          h_locus: ['LOCUS line', 'The record’s ID card in one line: name, length, molecule type, topology, GenBank division and last-modified date.', 'Here: 2,512 bases (bp) of mRNA, linear, in division PRI (primates). “DNA” records may say circular for plasmids and mitochondria.', 'Length and type match what you expect.', 'mRNA has no introns; genomic DNA does. Check which you have.', 'Compare the length with the ORIGIN sequence.', 'Fields are fixed-width columns in the original flat-file specification.'],
          h_def: ['DEFINITION', 'A one-line description of the sequence, written by submitter or curators.', 'Read for “complete cds”, “partial”, “transcript variant”, “mRNA”, “genomic”, so you know what the record contains.', '“complete cds” means the whole coding region is present.', '“partial” means a piece is missing.', 'Scroll to FEATURES to see where the parts are.'],
          h_acc: ['ACCESSION', 'The permanent ID of the record. Cite this, not the title.', 'Prefix reveals the type: NM_ curated mRNA, NR_ non-coding RNA, NC_ chromosome, NP_ protein, XM_/XP_ predicted. Plain letters+digits come from submitters.', 'RefSeq (NM_/NP_) is curated and non-redundant.', 'Old accessions can be withdrawn or replaced.', 'Look at the version just below.'],
          h_ver: ['VERSION', 'The accession PLUS a version number. The number after the dot grows whenever the sequence changes.', 'NM_000546.6 is a different sequence from NM_000546.5. Always cite the full version in papers and scripts.', 'Latest version.', 'An old version may contain errors fixed later.', 'The COMMENT section tells what changed.'],
          h_kw: ['KEYWORDS', 'Tags describing the record, such as RefSeq or MANE Select.', 'MANE Select marks the single transcript chosen as the standard reference for a human gene by NCBI and Ensembl together.', 'MANE Select = the one to use by default.', null, 'Use MANE Select transcripts for variant reporting.'],
          h_src: ['SOURCE', 'The organism the sequence came from, with its common name.', 'Check that it is the species you think.', null, 'Different species or strain from what you expected.', 'Follow the lineage below.'],
          h_org: ['ORGANISM & lineage', 'The scientific name and the full taxonomic lineage from the broadest group to the species.', 'Read left to right: Eukaryota → … → Primates → Homo. Handy for filtering by taxonomy.', null, null, 'Use lineage to find orthologs in related species.'],
          h_ref: ['REFERENCE', 'Publications connected to the record: authors, title, journal and a PubMed ID.', '“bases 1 to 2512” shows which part of the sequence the paper described. Follow the PubMed ID for the experimental evidence.', 'Primary papers = evidence behind the annotation.', null, 'Open the PubMed link to read how it was determined.'],
          h_comment: ['COMMENT', 'Free-text notes from curators: RefSeq status, which sequences were used, what changed, completeness.', 'The first line gives the RefSeq status: REVIEWED (curated), VALIDATED, PREDICTED or INFERRED, from most to least trustworthy.', 'REVIEWED RefSeq = best quality.', 'PREDICTED = computer-generated.', 'Read what changed since the previous version.'],
        },
      },
      {
        id: 'features', title: 'Features & sequence', icon: '🧩', url: 'ncbi.nlm.nih.gov/nuccore/NM_000546.6?report=genbank#features',
        html: () => `${top()}<div class="rp-pad"><div class="rp-pre">
${L('f_head', 'FEATURES             Location/Qualifiers')}
${L('f_source', '     source          1..2512\n                     /organism="Homo sapiens"\n                     /mol_type="mRNA"\n                     /db_xref="taxon:9606"\n                     /chromosome="17"')}
${L('f_gene', '     gene            1..2512\n                     /gene="TP53"\n                     /gene_synonym="BCC7; LFS1; P53; TRP53"\n                     /db_xref="GeneID:7157"')}
${L('f_exon', '     exon            1..134\n                     /gene="TP53"\n                     /inference="alignment:Splign"')}
${L('f_cds', '     CDS             143..1324')}
${L('q_gene', '                     /gene="TP53"')}
${L('q_codon', '                     /codon_start=1')}
${L('q_product', '                     /product="cellular tumor antigen p53 isoform a"')}
${L('q_protid', '                     /protein_id="NP_000537.3"')}
${L('q_trans', '                     /translation="MEEPQSDPSVEPPLSQETFSDLWKLLPENNVLSDLLIDAWEPLPR\n                     CCDPQRSPSTPRLTPGSAPVLLGQD…"')}
${L('q_xref', '                     /db_xref="CCDS:CCDS11118.1"\n                     /db_xref="HGNC:HGNC:11998"')}
${L('f_polya', '     polyA_site      2512')}
${L('f_origin', 'ORIGIN')}
${L('f_nums', '        1 ' + seq.slice(0, 66) + '\n       61 ' + seq.slice(66, 131))}
${L('f_end', '//')}</div></div>`,
        f: {
          f_head: ['FEATURES table', 'The annotated map of the sequence: genes, exons, coding regions, UTRs and more, each with coordinates.', 'Left column = feature type. Right = location (start..end, 1-based). Below each feature are qualifiers that start with “/”.', 'Many well-annotated features.', 'A record with only “source” has no annotation.', 'Click the individual features below.'],
          f_source: ['source feature', 'Covers the entire record and stores where the sequence came from.', 'Qualifiers hold organism, molecule type, strain, tissue, chromosome and a taxon cross-reference.', null, null, 'Look at the gene feature.'],
          f_gene: ['gene feature', 'Marks the region of the gene and gives its official symbol and old names.', '/gene is the symbol; /gene_synonym lists aliases (use them when searching old papers); /db_xref GeneID:7157 links to the NCBI Gene entry.', null, null, 'Follow GeneID to NCBI Gene.'],
          f_exon: ['exon feature', 'A block that is kept in the mature mRNA.', 'In genomic records exons are separated by introns; in an mRNA record the exons are joined, so each “exon” is a segment of the transcript.', null, null, 'Exon boundaries explain splice variants.'],
          f_cds: ['CDS: the coding sequence', 'The part that is translated into protein: from the start codon (143) to the stop codon (1324). The most important feature.', 'Positions are on the record, so the 5′ UTR is bases 1-142 and the 3′ UTR begins after 1324. “complement(…)” would mean the opposite strand; “join(…)” means pieces (exons) are spliced.', 'Starts at ATG, ends at a stop codon.', '“<1” or “>” in the location means the CDS is incomplete.', 'Send the CDS to ORF/translation tools.', 'Length 1182 = 393 codons × 3 + stop; check divisibility by 3.'],
          q_gene: ['/gene', 'Symbol of the gene this CDS belongs to.', null, null, null, null],
          q_codon: ['/codon_start', 'Which of the three reading frames translation begins in (1, 2 or 3).', 'Normally 1. A value of 2 or 3 means the first bases are the leftover of an incomplete codon (a partial 5′ end).', '1', '2 or 3 = partial 5′ end', null],
          q_product: ['/product', 'The name of the protein made by this CDS.', 'The isoform label matters: transcript variants can make different isoforms of the same gene.', null, null, 'Compare isoforms in UniProt.'],
          q_protid: ['/protein_id', 'The accession of the protein record created from this CDS (NP_000537.3).', 'Use it to open the protein page or look the protein up in UniProt and BLAST.', null, null, 'Copy it into UniProt.'],
          q_trans: ['/translation', 'The amino-acid sequence of the protein predicted from the CDS, in one-letter code.', 'Paste it straight into protein BLAST. It is shortened here for display.', 'Starts with M.', 'X means ambiguous bases in the DNA.', 'Run it through BLASTp.', 'Generated by translating the CDS with the genetic code in /transl_table (default 1).'],
          q_xref: ['/db_xref', 'Cross-references linking this record to other databases (CCDS, HGNC, Ensembl…).', 'CCDS marks a consensus coding sequence agreed by several annotation groups. These IDs let different tools talk to each other.', null, null, 'Follow HGNC to the official gene nomenclature.'],
          f_polya: ['polyA_site', 'The position where the poly-A tail begins in the mature mRNA.', 'The tail is not encoded in the genome. This marks where cleavage occurred.', null, null, null],
          f_origin: ['ORIGIN', 'Marks the start of the sequence itself.', 'Everything after ORIGIN until // is the nucleotide sequence.', null, null, 'Copy it to the DNA tools for ORFs and motifs.'],
          f_nums: ['The sequence block', 'Bases in lower case, 60 per line in groups of 10, with the position of the line’s first base on the left.', 'Numbers on the left match the feature coordinates, so base 143 is the first base of the CDS (an ATG).', 'Total length equals the LOCUS length.', null, 'Count to base 143 to find the start codon.'],
          f_end: ['// (end of record)', 'The two slashes close the record.', 'Anything below belongs to the next record in a multi-record file.', null, null, null],
        },
      },
      {
        id: 'viewer', title: 'Graphics view', icon: '🗺️', url: 'ncbi.nlm.nih.gov/nuccore/NM_000546.6?report=graph',
        html: () => `${top()}<div class="rp-pad"><h2>NM_000546.6 <span class="rp-mut" style="font-size:12px">Homo sapiens tumor protein p53 (TP53), transcript variant 1, mRNA</span></h2>
          <div class="rp-row">${F('s_send', '<span class="rp-link">Send to: ▾</span>', { tag: 'span' })}${F('s_fasta', '<span class="rp-link">FASTA</span> &nbsp; <span class="rp-link">GenBank</span> &nbsp; <span class="rp-link">Graphics</span>', { tag: 'span' })}${F('s_tools', '<span class="rp-link">Tools ▾</span> &nbsp; <span class="rp-link">Tracks ▾</span> &nbsp; <span class="rp-link">Download ▾</span>', { tag: 'span' })}</div>
          <div class="rp-box">${F('s_ruler', '<div class="rp-row rp-mut" style="justify-content:space-between;font-size:11px;border-bottom:2px solid #334"><span>1</span><span>500</span><span>1,000</span><span>1,500</span><span>2,000</span><span>2,512</span></div>', { cls: '' })}
            <div style="font-size:10.5px;margin-top:6px" class="rp-mut">Genes</div>${F('s_gene', H.track([{ s: 1, e: 2512, c: '#3b82f6', t: 'TP53 ➜' }], 2512), { cls: '' })}
            <div style="font-size:10.5px" class="rp-mut">mRNA</div>${F('s_mrna', H.track([{ s: 1, e: 2512, c: '#6366f1', t: 'NM_000546.6' }], 2512), { cls: '' })}
            <div style="font-size:10.5px" class="rp-mut">CDS</div>${F('s_cds', H.track([{ s: 143, e: 1324, c: '#10b981', t: 'NP_000537.3 · 393 aa' }], 2512), { cls: '' })}
            <div style="font-size:10.5px" class="rp-mut">Exons</div>${F('s_exons', H.row([{ s: 1, e: 134, c: '#f59e0b' }, { s: 135, e: 330, c: '#f59e0b' }, { s: 331, e: 540, c: '#f59e0b' }, { s: 541, e: 800, c: '#f59e0b' }, { s: 801, e: 1100, c: '#f59e0b' }, { s: 1101, e: 1500, c: '#f59e0b' }, { s: 1501, e: 2512, c: '#f59e0b' }].slice(0, 7), 2512), { cls: '' })}</div></div>`,
        f: {
          s_send: ['“Send to” menu', 'Exports the record or a region to a file, clipboard, the Sequence Viewer, or a collection.', 'Choose “Complete Record”/“Coding Sequences” and a format (FASTA nucleotide, FASTA protein, GenBank). It is the quickest way to get the CDS or protein sequence.', 'Use “Coding Sequences → FASTA Protein” to get the translation.', null, 'Remember to pick the right format for your next tool.'],
          s_fasta: ['Display format links', 'Switch the same record between FASTA (just the sequence), GenBank (annotated flat file) and Graphics (this view).', 'FASTA is what BLAST and alignment tools want; GenBank is for reading annotation.', null, null, 'Use FASTA when pasting into another tool.'],
          s_tools: ['Tools & tracks', 'Menus to highlight a region, change zoom, add or remove tracks (genes, variation, conservation).', 'Add tracks to overlay other data on the same coordinates, e.g. SNPs or alignments.', null, null, 'Turn on variation tracks to see known SNPs on a gene.'],
          s_ruler: ['Ruler / coordinates', 'The position scale of the whole record (1 to 2,512).', 'All tracks use this scale, so you can read start and end positions by looking straight down.', null, null, 'Zoom to see individual bases.'],
          s_gene: ['Gene track', 'A bar showing the gene and its direction (arrow).', 'An mRNA record covers the whole gene; on genomic records introns appear as thin lines between exons.', null, null, 'The arrow shows the strand.'],
          s_mrna: ['mRNA track', 'The transcript record itself, from the cap site to the poly-A site.', 'On a genomic record, several mRNAs are stacked (one per transcript variant) so you can compare splicing.', null, null, 'Compare variants by their exon patterns.'],
          s_cds: ['CDS track', 'The protein-coding part, with the protein accession and length.', 'It starts after the 5′ UTR (143) and ends before the 3′ UTR (1324). The UTRs are the unfilled parts of the mRNA bar.', 'A clean single CDS.', null, 'Click it to open the protein.'],
          s_exons: ['Exon track', 'The pieces that make up the mature transcript.', 'In the real viewer, exon edges show where the gene’s introns were spliced out of the primary transcript.', null, null, 'Count exons to understand gene structure.'],
        },
      },
    ],
  });
})();
