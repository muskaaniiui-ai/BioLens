/* BLAST (NCBI web BLAST). Example data is illustrative. */
(function () {
  const F = H.F, top = () => H.top('BLAST<sup>®</sup>', 'Basic Local Alignment Search Tool', ['Home', 'Recent Results', 'Saved Strategies', 'Help']);
  const Q = 'MEEPQSDPSVEPPLSQETFSDLWKLLPENNVLSDLLIDAWEPLPRCCDPQRSPSTPRLTPGSAPVLLGQD'.slice(0, 60);
  const mut = (s, ids) => [...s].map((a, i) => ids.includes(i) ? ((H.cons[a] || 'A').replace(a, '')[0] || 'A') : a).join('');
  const mouse = mut(Q, [4, 5, 9, 12, 17, 21, 26, 33, 38, 44, 51]);
  const p63 = mut(Q, [1, 2, 4, 6, 8, 10, 13, 15, 17, 19, 22, 25, 28, 31, 34, 37, 40, 43, 47, 50, 53, 56]).split('').map((c, i) => (i >= 30 && i < 33) ? '-' : c).join('');
  const rows = [
    ['cellular tumor antigen p53 isoform a [Homo sapiens]', 'Homo sapiens', 818, 818, '100%', '0.0', '100.00%', 393, 'NP_000537.3'],
    ['cellular tumor antigen p53 [Mus musculus]', 'Mus musculus', 584, 584, '99%', '0.0', '77.08%', 390, 'NP_035770.2'],
    ['cellular tumor antigen p53 [Danio rerio]', 'Danio rerio', 335, 335, '93%', '4e-114', '49.20%', 373, 'NP_571402.1'],
    ['tumor protein 63 isoform alpha [Homo sapiens]', 'Homo sapiens', 190, 190, '55%', '2e-52', '38.20%', 680, 'NP_003713.3'],
    ['hypothetical protein [Oncorhynchus mykiss]', 'Oncorhynchus mykiss', 72, 72, '11%', '6e-10', '84.00%', 210, 'XP_021441812.1']];
  const colors = { r: '#ef4444', p: '#d946ef', g: '#22c55e', b: '#3b82f6', k: '#9ca3af' };

  /* ---- tree ---- */
  function tree() {
    const T = { len: 0, c: [{ n: 'tumor protein 63 [Homo sapiens]', len: .5 }, { len: .06, c: [{ n: 'p53 [Danio rerio]', len: .35 }, { len: .05, c: [{ n: 'p53 [Xenopus laevis]', len: .28 }, { len: .04, c: [{ n: 'p53 [Gallus gallus]', len: .2 }, { len: .05, c: [{ len: .06, c: [{ n: 'p53 [Mus musculus]', len: .07 }, { n: 'p53 [Rattus norvegicus]', len: .06 }] }, { len: .03, c: [{ n: 'QUERY p53 [Homo sapiens]', len: .01, q: 1 }, { n: 'p53 [Pan troglodytes]', len: .01 }] }] }] }] }] }] };
    let leaf = 0, svg = '', hot = {}, maxX = 0; const S = 430, Y0 = 34, DY = 30;
    (function go(n, x) { n.x = x + n.len * S; if (!n.c) { n.y = Y0 + leaf++ * DY; maxX = Math.max(maxX, n.x); return; } n.c.forEach(c => go(c, n.x)); n.y = (n.c[0].y + n.c[n.c.length - 1].y) / 2; })(T, 30);
    (function draw(n, px, py) {
      svg += `<line x1="${px}" y1="${n.y}" x2="${n.x}" y2="${n.y}" stroke="${n.q ? '#ef4444' : '#334155'}" stroke-width="${n.q ? 2.5 : 1.6}"/>`;
      if (n.c) { svg += `<line x1="${n.x}" y1="${n.c[0].y}" x2="${n.x}" y2="${n.c[n.c.length - 1].y}" stroke="#334155" stroke-width="1.6"/>`; n.c.forEach(c => draw(c, n.x, n.y)); }
      else { svg += `<circle cx="${n.x}" cy="${n.y}" r="${n.q ? 5 : 3.2}" fill="${n.q ? '#ef4444' : '#0f4c81'}"/><text x="${n.x + 9}" y="${n.y + 4}" font-size="11.5" fill="${n.q ? '#b91c1c' : '#1f2d3d'}" font-weight="${n.q ? 700 : 400}">${n.n}</text>`; }
    })(T, 30, T.y);
    const m = T.c[1].c[1].c[1].c[1].c[1].c; // mammal subtree
    const mx = m[0].x - 70;
    svg += `<line x1="30" y1="${Y0 + 8 * DY + 8}" x2="${30 + .1 * S}" y2="${Y0 + 8 * DY + 8}" stroke="#0f4c81" stroke-width="2"/><text x="${30 + .1 * S + 8}" y="${Y0 + 8 * DY + 12}" font-size="11" fill="#475569">0.1</text>`;
    const h = Y0 + 9 * DY + 14;
    return `<div class="rp-rel" style="height:${h}px"><svg width="100%" height="${h}" viewBox="0 0 800 ${h}" preserveAspectRatio="xMinYMin meet">${svg}</svg>
      ${H.hot('tr_query', 480 * 1, Y0 + 7 * DY - 10, 300, 22)}${H.hot('tr_mammal', 340, Y0 + 3 * DY - 12, 230, 4 * DY - 4)}${H.hot('tr_scale', 24, Y0 + 8 * DY - 2, 110, 24)}${H.hot('tr_root', 16, Y0 - 12, 120, 3 * DY)}</div>`;
  }

  /* ---- graphic summary ---- */
  const bars = [['r', 0, 100], ['r', 0, 100], ['p', 1, 99], ['p', 1, 98], ['p', 0, 96], ['g', 2, 94], ['g', 3, 90], ['b', 14, 70], ['k', 44, 56], ['k', 70, 82], ['k', 88, 99]];
  const gbars = (from, to) => bars.slice(from, to).map(b => `<div class="ln"><i style="left:${b[1]}%;width:${b[2] - b[1]}%;background:${colors[b[0]]}"></i></div>`).join('');

  BL.add({
    id: 'blast', name: 'BLAST', icon: '🎯', color: '#20558a', cat: 'Search & alignment', url: 'blast.ncbi.nlm.nih.gov',
    question: 'What is my sequence similar to?', about: 'NCBI Basic Local Alignment Search Tool finds regions of similarity between your sequence and a database. similarity search homology alignment',
    windows: [
      /* ============ 1. choose program ============ */
      {
        id: 'program', title: 'Choose a program', icon: '🧭', url: 'blast.ncbi.nlm.nih.gov/Blast.cgi',
        html: () => `${top()}${H.nav(['BLAST', 'Home', 'Recent Results', 'Saved Strategies', 'Help'])}<div class="rp-pad"><h2>Basic Local Alignment Search Tool</h2>
          <p class="rp-mut">BLAST finds regions of similarity between biological sequences. The program compares nucleotide or protein sequences to sequence databases and calculates the statistical significance.</p>
          <h4 style="margin-top:14px">Web BLAST</h4><div class="rp-row">
          ${F('p_blastn', '<b>Nucleotide BLAST</b><br><span class="rp-link">blastn</span><br>Search a <i>nucleotide</i> database using a <i>nucleotide</i> query', { cls: 'rp-box rp-grow' })}
          ${F('p_blastp', '<b>Protein BLAST</b><br><span class="rp-link">blastp</span><br>Search a <i>protein</i> database using a <i>protein</i> query', { cls: 'rp-box rp-grow' })}</div><div class="rp-row">
          ${F('p_blastx', '<b>blastx</b><br>Search protein database using a translated nucleotide query', { cls: 'rp-box rp-grow' })}
          ${F('p_tblastn', '<b>tblastn</b><br>Search translated nucleotide database using a protein query', { cls: 'rp-box rp-grow' })}
          ${F('p_tblastx', '<b>tblastx</b><br>Search translated nucleotide database using a translated nucleotide query', { cls: 'rp-box rp-grow' })}</div>
          <div class="rp-box">${F('p_rid', 'Retrieve results for an RID: ' + H.inp('XB1A2C3D014') + ' ' + H.btn('View'), { tag: 'span' })}</div></div>`,
        f: {
          p_blastn: ['Nucleotide BLAST (blastn)', 'Compares a DNA/RNA query against a nucleotide database.', 'Use it to find the same gene in other species, check contamination, or identify a DNA fragment. The default “megablast” option is for very similar sequences.', 'Best for highly similar DNA (same species or close relatives).', 'DNA diverges fast, so distant relatives are often missed. Use blastp for those.', 'Unsure of species? Start with blastn, then confirm with the protein.'],
          p_blastp: ['Protein BLAST (blastp)', 'Compares an amino-acid query with a protein database.', 'Proteins stay similar much longer than DNA, so blastp finds more distant relatives and gives more informative hit names.', 'More sensitive than blastn for evolutionary relatives.', 'Needs a protein sequence; a DNA query here makes no sense.', 'Have a CDS? Translate it first (see the ORF tools) then use blastp.'],
          p_blastx: ['blastx', 'Translates your DNA query in all six frames and searches a protein database.', 'Perfect when you have a nucleotide sequence of unknown reading frame, such as a sequencing read or transcript fragment.', 'Finds protein-coding genes without you picking the frame.', 'Slower, and the alignment is shown in protein coordinates.', 'Great for RNA-seq contigs and new genomes.'],
          p_tblastn: ['tblastn', 'Takes a protein query and searches a nucleotide database translated in six frames.', 'Used to find genes encoding a protein in unannotated DNA such as a new genome or ESTs.', 'Locates unannotated genes.', 'Hits are in nucleotide coordinates; check the frame.', 'Query = protein you know, database = DNA you do not.'],
          p_tblastx: ['tblastx', 'Translates BOTH query and database in six frames and compares protein to protein.', 'Detects very distant coding similarity when neither side has an annotation.', 'Most sensitive way to compare coding DNA.', 'Very slow and noisy; only for special cases.', 'Rarely needed as a beginner.'],
          p_rid: ['Request ID (RID)', 'A code for your search. Results are stored on NCBI’s servers for about 36 hours.', 'Paste an RID to reopen a result without rerunning the search, or share it with a colleague.', 'Bookmark the result URL; it contains the RID.', 'After ~36 hours the RID expires and the search must be repeated.', 'Save the output (XML, text) if you need it later.'],
        },
      },
      /* ============ 2. query & database ============ */
      {
        id: 'query', title: 'Query & database', icon: '✍️', url: 'blast.ncbi.nlm.nih.gov/Blast.cgi?PROGRAM=blastp',
        html: () => `${top()}<div class="rp-pad"><h2>Standard Protein BLAST <span class="rp-mut" style="font-size:12px">blastn · blastp · blastx · tblastn · tblastx</span></h2>
          <div class="rp-box"><h4>Enter Query Sequence</h4>${F('q_seq', H.inp('>NP_000537.3 cellular tumor antigen p53\nMEEPQSDPSVEPPLSQETFSDLWKLLPENNVLSDLLIDAWEPLPRCCDPQRSPSTPRLTPGSAPVLLGQD…', 1))}
            <div class="rp-row" style="margin-top:6px">${F('q_upload', 'Or, upload file ' + H.btn('Choose file', 'o'), { tag: 'span' })}${F('q_range', 'Query subrange: From ' + H.inp('') + ' To ' + H.inp(''), { tag: 'span' })}</div>
            <div style="margin-top:6px">${F('q_title', 'Job Title ' + H.inp('NP_000537.3 vs nr', 0), { tag: 'span' })} &nbsp; ${F('q_align2', H.chk('Align two or more sequences', 1), { tag: 'span' })}</div></div>
          <div class="rp-box"><h4>Choose Search Set</h4>${F('q_db', 'Database &nbsp;' + H.inp('Non-redundant protein sequences (nr) ▾'), { tag: 'span' })}<br><br>
            ${F('q_org', 'Organism (optional) ' + H.inp('Homo sapiens (taxid:9606)') + ' ' + H.chk('Exclude', 1), { tag: 'span' })}<br><br>${F('q_excl', H.chk('Models (XM/XP)', 1) + ' &nbsp; ' + H.chk('Uncultured/environmental sample sequences', 1), { tag: 'span' })}<br><br>
            ${F('q_entrez', 'Entrez Query ' + H.inp('(optional) e.g. kinase[Title]'), { tag: 'span' })}</div>
          <div class="rp-box"><h4>Program Selection</h4>${F('q_algo', H.chk('blastp (protein-protein BLAST)') + '<br>' + H.chk('PSI-BLAST (Position-Specific Iterated BLAST)', 1) + '<br>' + H.chk('PHI-BLAST (Pattern Hit Initiated BLAST)', 1) + '<br>' + H.chk('DELTA-BLAST (Domain Enhanced Lookup Time Accelerated BLAST)', 1), { tag: 'span' })}</div>
          <div class="rp-row">${F('q_btn', H.btn('BLAST') + ' ' + H.chk('Show results in a new window', 1), { tag: 'span' })}${F('q_params', '<span class="rp-link">▸ Algorithm parameters</span>', { tag: 'span' })}</div></div>`,
        f: {
          q_seq: ['Enter Query Sequence', 'The box for your sequence: raw letters, FASTA (a > header line plus sequence) or an accession number such as NP_000537.3.', 'An accession makes BLAST fetch the sequence itself, so the hit list will show your own record as a 100% match. Raw sequence is anonymous.', 'FASTA with a clear header keeps your results organised.', 'Numbers, spaces and stray symbols can be rejected. Mixing DNA with protein programs gives errors or nonsense.', 'Paste protein for blastp, DNA for blastn.'],
          q_upload: ['Upload file', 'Instead of pasting, load a FASTA file from your computer.', 'Multi-FASTA files run every sequence as its own search.', null, null, 'Use for batches of sequences.'],
          q_range: ['Query subrange', 'Limits the search to part of your query (From / To positions).', 'Useful when only one region matters, such as a domain, or when a long sequence includes a vector or tag you want to ignore.', 'Isolates the part you care about.', 'Positions are 1-based and inclusive.', 'Searching a 5 kb sequence? Run it in pieces for cleaner hits.'],
          q_title: ['Job Title', 'A label that appears on the results page and in Recent Results.', 'It does not change the search at all; it only helps you find the job later.', null, null, 'Name it after the gene or sample.'],
          q_align2: ['Align two or more sequences', 'Switches to a pairwise mode: BLAST compares your query to a second sequence you provide instead of a database.', 'Use this to ask “how similar are these two specific proteins?”, a quick check without building a database.', 'Direct, fast comparison of two sequences.', 'Not a multiple alignment; for many sequences use Clustal Omega.', 'For more than two sequences open the Clustal Omega tool.'],
          q_db: ['Database', 'The collection of sequences your query is compared against.', 'nr is the largest and gives the widest coverage; Swiss-Prot is small but expert-curated; PDB contains only proteins with 3D structures; refseq_protein is curated and non-redundant.', 'Swiss-Prot gives high-quality names; nr gives breadth.', 'A huge database can bury a real hit among chance matches; a tiny one can miss relatives.', 'Want a trusted function? Use Swiss-Prot. Want every relative? Use nr.', 'Database size enters the E-value formula, which is why the same alignment has a smaller E-value in a smaller database.'],
          q_org: ['Organism', 'Restricts (or excludes) hits to one organism or taxonomic group by name or taxid.', 'Type a name and pick a suggestion. Use it to find a gene in your species, or tick “Exclude” to remove it and see only relatives.', 'Great for finding orthologs in a specific species.', 'Misses relatives outside the group.', 'Exclude your own species to discover distant relatives.'],
          q_excl: ['Exclude models / uncultured', 'Removes computer-predicted records (XM/XP) and sequences from unculturable or environmental samples.', 'Predicted records can echo errors; environmental ones have vague names.', 'Cleaner, more trustworthy hit list.', 'Newly sequenced species may only have predicted entries.', 'Tick both when you want confident, named hits.'],
          q_entrez: ['Entrez Query', 'A text filter using NCBI Entrez syntax, e.g. kinase[Title] or 2020:2024[PDAT].', 'The search runs against the whole database but only hits matching the filter are shown.', null, 'Spelling or field-tag errors return nothing.', 'Powerful but optional; skip while learning.'],
          q_algo: ['Program selection (algorithm)', 'Chooses how the protein search works: blastp (standard), PSI-BLAST (iterative), PHI-BLAST (needs a pattern) or DELTA-BLAST (domain-aware).', 'blastp is fine for close relatives. PSI-BLAST builds a profile from hits and re-searches, finding much more distant family members. DELTA-BLAST uses conserved-domain information.', 'PSI/DELTA find remote homologs.', 'PSI-BLAST can drift: one false hit added to the profile pollutes later rounds.', 'Start with blastp; try DELTA-BLAST when blastp finds nothing.'],
          q_btn: ['BLAST button', 'Submits the job to NCBI’s servers. You are given a Request ID (RID) and a waiting page that refreshes itself.', 'The search runs on NCBI computers, so it takes from seconds to minutes depending on load and database.', 'Results open in the same or a new window.', 'The page must stay open or be revisited by RID.', 'Bookmark the waiting page while a long search runs.'],
          q_params: ['Algorithm parameters', 'Expands the advanced settings: thresholds, word size, scoring matrix, filters.', 'Defaults suit most searches. Open it when you search for short peptides, very distant relatives or repeats.', null, 'Random tweaking can make results meaningless.', 'See the next window for each parameter.'],
        },
      },
      /* ============ 3. algorithm parameters ============ */
      {
        id: 'params', title: 'Algorithm parameters', icon: '⚙️', url: 'blast.ncbi.nlm.nih.gov/Blast.cgi#params',
        html: () => `${top()}<div class="rp-pad"><h2>Algorithm parameters</h2>
          <div class="rp-box"><h4>General Parameters</h4>
            ${F('a_max', 'Max target sequences ' + H.inp('100 ▾') + ' <span class="rp-mut">Select the maximum number of aligned sequences to display</span>', { tag: 'div' })}<br>
            ${F('a_short', H.chk('Automatically adjust parameters for short input sequences'), { tag: 'div' })}<br>
            ${F('a_expect', 'Expect threshold ' + H.inp('0.05'), { tag: 'div' })}<br>
            ${F('a_word', 'Word size ' + H.inp('5 ▾'), { tag: 'div' })}<br>
            ${F('a_range', 'Max matches in a query range ' + H.inp('0'), { tag: 'div' })}</div>
          <div class="rp-box"><h4>Scoring Parameters</h4>
            ${F('a_matrix', 'Matrix ' + H.inp('BLOSUM62 ▾'), { tag: 'div' })}<br>${F('a_gap', 'Gap Costs ' + H.inp('Existence: 11, Extension: 1 ▾'), { tag: 'div' })}<br>
            ${F('a_comp', 'Compositional adjustments ' + H.inp('Conditional compositional score matrix adjustment ▾'), { tag: 'div' })}</div>
          <div class="rp-box"><h4>Filters and Masking</h4>${F('a_filter', H.chk('Low complexity regions'), { tag: 'div' })}<br>${F('a_mask', H.chk('Mask for lookup table only') + ' &nbsp; ' + H.chk('Mask lower case letters', 1), { tag: 'div' })}</div></div>`,
        f: {
          a_max: ['Max target sequences', 'How many hits BLAST keeps and shows (10 to 5000).', 'More hits means a deeper look at the family; fewer makes the page faster. If your best matches are all at the bottom, increase it.', 'Raise it to see a whole family or when hits are ties.', 'Large values slow the page and can include noise.', 'Default 100 is fine; use 500 for family studies.'],
          a_short: ['Short input sequences', 'Automatically switches word size, E-value threshold and matrix for queries under about 30 residues.', 'Short peptides can never reach a small E-value with default settings, so BLAST relaxes them to give you something to see.', 'Needed for primers and peptides.', 'It is automatic and only triggers for short sequences.', 'Searching a primer or peptide? Leave this ticked.'],
          a_expect: ['Expect threshold', 'The largest E-value you accept. Hits worse than this are hidden.', 'Default 0.05 is permissive. Lower it to 1e-5 or 1e-10 to see only convincing hits; raise it to 10+ to catch very weak, short matches.', 'Lower = fewer, more reliable hits.', 'High values flood the page with random matches.', 'For reports, use 1e-5 or stricter.', 'E = m·n·2^(−S′): the threshold compares against this value.'],
          a_word: ['Word size', 'Length of the exact “seed” match BLAST needs before extending an alignment.', 'Small words (2-3 for protein) are sensitive but slow; large words are fast but miss distant relatives. For DNA, megablast uses 28; blastn 11.', 'Smaller word size finds more distant matches.', 'Too small = slow and noisy; too large = missed hits.', 'Short queries: reduce the word size.', 'BLAST scans for words scoring above a threshold T against the query, then extends them (two-hit method).'],
          a_range: ['Max matches in a query range', 'Limits how many hits can pile up on the same region of the query.', 'Prevents a very common domain from filling the hit list so you can still see hits for other parts of your sequence.', 'Reveals hits for the rest of a multi-domain query.', null, 'Leave 0 (off) unless one region dominates.'],
          a_matrix: ['Scoring matrix', 'A table giving a score for every amino-acid pair: identical, similar, or different.', 'BLOSUM62 suits typical searches. BLOSUM80/PAM30 favour close relatives; BLOSUM45/PAM250 favour distant ones.', 'Higher BLOSUM number = for closer relatives.', 'A wrong matrix changes scores and E-values.', 'Look for relatives far away? Try BLOSUM45.', 'Entries are log-odds: log(observed pair frequency / expected by chance) in half-bit units.'],
          a_gap: ['Gap costs', 'The penalty for opening a gap (insertion/deletion) and for each extra position.', '11,1 is the standard for BLOSUM62. Higher penalties give tighter alignments with few gaps; lower ones allow more insertions.', null, 'Gap costs must be a valid pair for the chosen matrix.', 'Keep the default unless you know why.'],
          a_comp: ['Compositional adjustments', 'Corrects the scoring for proteins with unusual amino-acid content (for example rich in one residue).', 'Without it, two proteins that merely share a biased composition look related. The adjustment lowers such false positives.', 'Fewer misleading hits for biased proteins.', 'Can slightly lower scores of true hits.', 'Leave on.'],
          a_filter: ['Low complexity filter', 'Masks repetitive stretches such as QQQQQQ or AAAAAA (shown as XXXXXX in the query).', 'Repeats match each other everywhere and create misleading hits. Masked regions are ignored during the search.', 'Avoids false hits from repeats.', 'Real repeat-rich proteins lose information.', 'Turn off only if the repeat is your question.'],
          a_mask: ['Mask options', '“Lookup table only” hides repeats from the seeding stage but still allows extension through them; “lower case” masks lower-case letters you typed.', 'Soft masking gives a good balance: repeats cannot start a hit but can be part of one.', null, null, 'Use lower-case in your query to hide a region yourself.'],
        },
      },
      /* ============ 4. descriptions ============ */
      {
        id: 'desc', title: 'Descriptions', icon: '📋', url: 'blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Get&RID=XB1A2C3D014',
        html: () => `${top()}<div class="rp-pad"><h2>Cellular tumor antigen p53 <span class="rp-mut" style="font-size:12px">(NP_000537.3)</span></h2>
          ${F('r_summary', H.kv([['Job title', 'NP_000537.3 vs nr'], ['RID', 'XB1A2C3D014 (Expires in 36 hours)'], ['Program', 'BLASTP 2.16.0+'], ['Database', 'nr'], ['Query ID', 'NP_000537.3'], ['Molecule type', 'amino acid'], ['Query Length', '393']]), { cls: '' })}
          ${H.tabs(['Descriptions', 'Graphic Summary', 'Alignments', 'Taxonomy'], 0)}
          ${F('r_filter', '<b>Filter Results</b> &nbsp; Organism ' + H.inp('') + ' &nbsp; Percent Identity ' + H.inp('') + ' E value ' + H.inp('') + ' Query Coverage ' + H.inp('') + ' ' + H.btn('Filter', 'o'), { cls: 'rp-box' })}
          <div class="rp-row" style="margin:6px 0">${F('r_tools', '<span class="rp-link">Download ▾</span> &nbsp; <span class="rp-link">Select columns ▾</span> &nbsp; <span class="rp-link">Show 100 ▾</span> &nbsp; <span class="rp-link">Distance tree of results</span> &nbsp; <span class="rp-link">MSA Viewer</span>', { tag: 'span' })}</div>
          ${H.tbl([F('r_sel', 'Select', { tag: 'span' }), ['Description', 'c_desc'], ['Scientific Name', 'c_org'], ['Max Score', 'c_max'], ['Total Score', 'c_total'], ['Query Cover', 'c_cover'], ['E value', 'c_e'], ['Per. Ident', 'c_ident'], ['Acc. Len', 'c_len'], ['Accession', 'c_acc']],
            rows.map((r, i) => ({ k: 'row' + (i + 1), c: [H.chk('', 1), `<span class="rp-link">${r[0]}</span>`, r[1], r[2], r[3], r[4], r[5], r[6], r[7], `<span class="rp-link">${r[8]}</span>`] })))}</div>`,
        f: {
          r_summary: ['Search summary box', 'The header facts of your job: program version, database, query ID, molecule type and query length.', 'It tells you exactly what was searched. The RID lets you reopen the job; query length is the denominator for “Query Cover”.', 'Check the program and database match your intention.', 'The RID expires after 36 hours.', 'Always note program and database in lab notes and reports.'],
          r_filter: ['Filter Results', 'Narrow the table by organism, percent identity, E-value or query coverage.', 'Typing 70 in Percent Identity keeps only hits ≥70%. Organism accepts a name or taxon to focus on one group.', 'Quick way to find a hit in a specific species.', 'Filtering hides hits, so state your filters when you report results.', 'Try Query Coverage ≥80 and Percent Identity ≥60 to find likely orthologs.'],
          r_tools: ['Download, columns, tree, MSA', 'Tools for the table: export hits, choose which columns show, view a distance tree or open the MSA viewer.', 'Download offers text, XML, CSV and HTML. “Select columns” can add Taxid or Common Name. The tree and MSA viewer give a visual of relationships.', 'Download XML to re-load results in other tools.', null, 'Download the “Hit Table (csv)” for spreadsheets.'],
          r_sel: ['Select checkboxes', 'Tick hits to download, align (MSA Viewer) or build a tree from only those.', 'Select all gets everything, or hand-pick sequences you trust.', null, null, 'Tick only well-named hits before opening the tree.'],
          c_desc: ['Description', 'The name of the matching database record, with the organism in brackets.', 'This is a label somebody gave to the SUBJECT, not a claim about your query. Computer-made names are weaker than experimentally named ones.', 'Specific names like “cellular tumor antigen p53”.', '“hypothetical”, “predicted” or “uncharacterized” were assigned automatically.', 'Skim for the first hit with a specific name.'],
          c_org: ['Scientific Name', 'The species the hit comes from.', 'Same species may mean the same gene or a paralog; other species suggest orthologs. Closer relatives should usually rank above distant ones.', 'A taxonomy order that makes biological sense.', 'An unexpected top organism may mean contamination.', 'Compare it with the organism you expected.'],
          c_max: ['Max Score', 'The bit score of the single best alignment segment between your query and this hit.', 'Higher is better and, being in bits, is comparable between searches. Roughly, every 1 bit less doubles the chance of a random match.', 'Above ~80 for proteins is rarely accidental; above 200 is very strong.', 'Below ~50 can be noise in a big database.', 'Rank by score; judge significance with E-value.', 'S = (λ·S_raw − ln K)/ln 2, where λ and K depend on the matrix and gap costs.'],
          c_total: ['Total Score', 'Sum of the scores of ALL aligned segments for this hit (not just the best).', 'When Total is higher than Max, the hit matched in several separate pieces, like a multi-domain protein or a gene with exons.', 'Total ≈ Max means one clean alignment.', 'Total ≫ Max can mean repeats or fragmented matches.', 'Compare Max and Total for every hit.'],
          c_cover: ['Query Cover', 'The percentage of YOUR query that lines up with this hit.', 'It is the second pillar next to identity. 100% means the whole query aligned; 11% means only a small stretch matched.', 'Above 80% explains most of your sequence.', 'Below 40% is a domain or repeat match, not the whole gene.', 'Always read cover together with identity.'],
          c_e: ['E value', 'The number of hits this good you would expect by chance in a database this size. The key number.', 'Smaller is better. 0.0 means effectively impossible by chance; 1e-50 is strong; 1 means you would see it once per search by luck.', 'Below 1e-10: clearly real. 1e-5 is the usual cut-off.', 'Above 0.05: noise. Between 1e-5 and 0.05: borderline.', 'Filter out anything above 1e-5.', 'E = m·n·2^(−S′): the same alignment has a larger E in a bigger database (n) or for a longer query (m).'],
          c_ident: ['Per. Ident (percent identity)', 'The share of aligned positions with exactly the same letter.', 'Roughly: >90% same gene/species; 40-90% homolog; 25-40% distant relative for protein (twilight zone).', 'High identity AND high coverage.', 'High identity over a tiny region is not impressive; low identity can still be a true protein homolog.', 'Open the Alignments tab to see where mismatches fall.', 'Computed as identical positions ÷ alignment length, so gaps and coverage are not included.'],
          c_len: ['Acc. Len', 'Total length of the matching database sequence, not of the alignment.', 'A subject much longer than your query means you matched only a part of a larger protein; similar length suggests a full-length match.', 'Similar to the query length.', 'Very different lengths hint at fusions or fragments.', 'Compare with the Query Length in the summary box.'],
          c_acc: ['Accession', 'The stable ID of the hit. Click it on the real site to open its record.', 'Prefixes tell the type: NP_/NM_ curated RefSeq, XP_/XM_ predicted RefSeq, plain letters+digits are submitter records.', 'NP_ (curated) is safest to cite.', 'XP_ entries are model predictions.', 'Copy it into UniProt or GenBank to read the full record.'],
          row1: ['Row 1: the query itself', 'A perfect hit: 100% identity over 100% of the query with E = 0.0.', 'When your query is a database sequence, the top hit is itself. This confirms the search worked but tells you nothing new.', 'Confirms what your sequence IS.', null, 'Look further down for relatives.'],
          row2: ['Row 2: a strong ortholog', '77% identical across 99% of the query with E = 0.0: the same protein in another species.', 'High coverage and a convincing E-value mean this is a true homolog. Likely the same function.', 'Excellent evidence of an ortholog.', null, 'Compare the species in your pathway of interest.'],
          row3: ['Row 3: a distant ortholog', '49% identity but 93% cover and E = 4e-114: a confident, more distant relative.', 'Identity is lower than the mouse hit but the E-value is still decisive because the match is long. Moderate identity over a long region beats high identity over a short one.', 'Long alignment gives statistical power.', null, 'Evolutionary distance rises as identity falls.'],
          row4: ['Row 4: a paralog (family member)', '38% identity over 55% of the query, E = 2e-52: a related gene of the same family, not the same gene.', 'p63 shares the DNA-binding domain with p53 but differs elsewhere. Same family; different gene.', 'Reveals the protein family.', 'Do not call it the same gene.', 'Check conserved domains in InterPro.'],
          row5: ['Row 5: the identity-vs-coverage trap', '84% identity but only 11% coverage with a weak E-value, and a vague name.', 'A tiny segment matches very well, so identity looks great, but the whole-sequence picture is poor. A classic beginner mistake is to pick this hit for its identity.', 'Teaches why you must read three columns together.', 'High identity alone is misleading.', 'Rank by E-value and coverage first, identity last.'],
        },
      },
      /* ============ 5. graphic summary ============ */
      {
        id: 'graphic', title: 'Graphic Summary', icon: '📊', url: 'blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Get&RID=XB1A2C3D014#graphic',
        html: () => `${top()}<div class="rp-pad">${H.tabs(['Descriptions', 'Graphic Summary', 'Alignments', 'Taxonomy'], 1)}
          ${F('g_legend', '<b>Color key for alignment scores</b> &nbsp; <span class="rp-pill" style="background:#9ca3af;color:#fff">&lt;40</span><span class="rp-pill" style="background:#3b82f6;color:#fff">40-50</span><span class="rp-pill" style="background:#22c55e;color:#fff">50-80</span><span class="rp-pill" style="background:#d946ef;color:#fff">80-200</span><span class="rp-pill" style="background:#ef4444;color:#fff">≥200</span>', { cls: 'rp-box' })}
          <div class="rp-box"><h4>Distribution of the top 11 Blast Hits on 11 subject sequences</h4>
          ${F('g_cdd', '<div class="rp-mut" style="font-size:11px">Putative conserved domains have been detected, click on the image below for detailed results.</div>' + H.track([{ s: 94, e: 289, c: '#8b5cf6', t: 'P53 DNA-binding domain' }, { s: 319, e: 358, c: '#06b6d4', t: 'P53_tetramer' }], 393), { cls: '' })}
          ${F('g_ruler', '<div class="rp-row rp-mut" style="justify-content:space-between;font-size:11px;border-top:2px solid #334;margin-top:4px"><span>1</span><span>100</span><span>200</span><span>300</span><span>393</span></div>', { cls: '' })}
          <div class="rp-gs">${F('g_full', gbars(0, 7), { cls: '' })}${F('g_part', gbars(7, 11), { cls: '' })}</div></div>
          ${F('g_tip', '<div class="rp-box" style="max-width:380px"><b class="rp-link">NP_035770.2</b> cellular tumor antigen p53 [Mus musculus]<br><span class="rp-mut">Score = 584 · Query range 1-390</span></div>', { cls: '' })}</div>`,
        f: {
          g_legend: ['Colour key for alignment scores', 'Five bands of bit score: grey (<40), blue (40-50), green (50-80), pink (80-200) and red (≥200).', 'Each bar in the picture takes its colour from the best alignment score of that hit. Red means very strong, grey means weak.', 'Lots of red/pink across the page.', 'Only grey and blue bars mean you found nothing convincing.', 'Look at the colour first, then at the length.'],
          g_cdd: ['Conserved domains bar', 'A strip above the ruler marking known protein domains that NCBI’s Conserved Domain Database found in your query.', 'Here, p53’s DNA-binding domain and its tetramerisation domain are marked. Hits whose bars span these regions share the domain.', 'Tells you which parts are functional modules.', 'Domains are predictions based on profiles.', 'Click it on the real site to open CD-Search.'],
          g_ruler: ['Query ruler', 'The numbered scale for YOUR sequence: position 1 on the left to the last residue on the right.', 'It is the coordinate system for every bar below: a bar starting at 100 begins at residue 100 of your query.', null, null, 'Use it to read which part of the query matches.'],
          g_full: ['Full-length bars (red / pink)', 'Each horizontal bar is one hit placed along your query. These stretch almost end to end.', 'A bar that runs the whole width covers the whole query, usually a true ortholog. They are sorted from best to worst.', 'Long, red bars = a conserved gene across species.', null, 'Count them: many species means high conservation.'],
          g_part: ['Short bars (green / blue / grey)', 'Hits that match only a piece of your query.', 'Short bars come from shared domains or repeats. Colour tells strength; length tells how much of the query is covered; position tells which part.', null, 'A bar with high score but short length is a domain-only match.', 'Hover on the real site to see the hit name.'],
          g_tip: ['Mouse-over tooltip', 'Hover over any bar on the real page and a box shows the hit name, score and query range.', 'It lets you identify which table row a bar belongs to without leaving the picture. Click the bar to jump to its alignment.', null, null, 'Hover over the shortest bar to see what it is.'],
        },
      },
      /* ============ 6. alignments ============ */
      {
        id: 'align', title: 'Alignments', icon: '🔬', url: 'blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Get&RID=XB1A2C3D014#alignments',
        html: () => `${top()}<div class="rp-pad">${H.tabs(['Descriptions', 'Graphic Summary', 'Alignments', 'Taxonomy'], 2)}
          ${F('al_view', '<span class="rp-link">Download ▾</span> &nbsp; Alignment view: ' + H.inp('Pairwise ▾') + ' &nbsp; <span class="rp-link">Sort by: Max score ▾</span>', { cls: 'rp-box' })}
          ${F('al_title', '<b>cellular tumor antigen p53 [Mus musculus]</b>', { cls: '' })}<div class="rp-mut">Sequence ID: <span class="rp-link">NP_035770.2</span> &nbsp; Length: 390 &nbsp; Number of Matches: 1</div>
          ${F('al_range', '<span class="rp-link">Range 1: 1 to 390</span> &nbsp; <span class="rp-link">GenPept</span> <span class="rp-link">Graphics</span>', { cls: '' })}
          <table class="rp-tbl" style="margin:4px 0"><tr>${F('al_score', 'Score<br><b>584 bits(1505)</b>', { tag: 'td' })}${F('al_expect', 'Expect<br><b>0.0</b>', { tag: 'td' })}${F('al_method', 'Method<br><b>Compositional matrix adjust.</b>', { tag: 'td' })}
          ${F('al_ident', 'Identities<br><b>299/390(77%)</b>', { tag: 'td' })}${F('al_pos', 'Positives<br><b>336/390(86%)</b>', { tag: 'td' })}${F('al_gaps', 'Gaps<br><b>2/390(0%)</b>', { tag: 'td' })}</tr></table>
          ${H.aln(Q, mouse, 1, 1, { q: 'al_q', m: 'al_m', s: 'al_s' })}
          ${F('al_next', '<span class="rp-link">▼ Next Match</span> &nbsp; <span class="rp-link">▲ Previous Match</span> &nbsp; <span class="rp-link">Related Information</span>', { cls: '' })}
          <hr style="border:0;border-top:1px dashed #cbd5e1;margin:12px 0"><b>tumor protein 63 isoform alpha [Homo sapiens]</b> <span class="rp-mut">Range 1: 90 to 149</span>
          <table class="rp-tbl" style="margin:4px 0"><tr><td>Score<br><b>190 bits(482)</b></td><td>Expect<br><b>2e-52</b></td><td>Identities<br><b>23/60(38%)</b></td><td>Positives<br><b>35/60(58%)</b></td>${F('al_gapx', 'Gaps<br><b>3/60(5%)</b>', { tag: 'td' })}</tr></table>
          ${H.aln(Q, p63, 90, 90, { s: 'al_gapline' })}</div>`,
        f: {
          al_view: ['Alignment view & sort', 'Controls for how alignments are displayed (pairwise, query-anchored, tabular…) and the order.', 'Pairwise shows query over subject. Query-anchored with identities aligns all hits to the query so you can scan for conserved columns.', null, null, 'Use “Query-anchored with dots for identities” to find variable positions across many hits.'],
          al_title: ['Hit title & ID', 'The name, accession and length of the database sequence this alignment belongs to.', '“Number of Matches” tells how many separate segments (ranges) align with this subject.', null, null, 'Click the ID on the real page to open the full record.'],
          al_range: ['Range', 'Which stretch of the subject this alignment covers, plus links to GenPept and graphics.', 'A hit can have several ranges, each with its own score; long proteins often match in pieces.', 'One long range covering the subject.', 'Many short ranges mean fragmented similarity.', 'Compare the range with “Acc. Len” in the table.'],
          al_score: ['Score (bits and raw)', 'The bit score and, in brackets, the raw score of this alignment.', 'The bit score is the normalised, comparable value; the raw score is just the sum of matrix scores for the aligned pairs, minus gap penalties.', 'More bits = better alignment.', null, 'Quote the bit score in reports.', 'Raw scores depend on the matrix; bits remove that dependency.'],
          al_expect: ['Expect (E-value)', 'The E-value of this particular alignment.', 'Same meaning as in the table: how many equally good alignments you would expect by chance. Smaller means more convincing.', 'Below 1e-5.', 'Above 0.05 is noise.', 'Check that it agrees with the Descriptions table.'],
          al_method: ['Method', 'The statistics method used, normally “Compositional matrix adjust.”', 'It confirms that the scoring was corrected for amino-acid composition so biased proteins do not look falsely similar.', null, null, 'Nothing to do; it is information.'],
          al_ident: ['Identities', 'Count and percent of aligned positions with the identical residue.', 'The fraction is identical ÷ alignment length: 299 of 390 = 77%. It is the same as “Per. Ident” in the table.', 'Compare with the number of positives.', 'High identity over a short range is not strong evidence.', 'Zoom into the alignment to see where identity is lost.'],
          al_pos: ['Positives', 'Aligned pairs that are identical OR chemically similar (they have a positive score in the matrix).', 'It is always ≥ identities. A big gap between positives and identities means many similar-but-different substitutions, typical of true homologs.', 'Positives well above identities hint at real homology.', null, 'Look for “+” signs in the middle line.'],
          al_gaps: ['Gaps', 'Number of positions where one sequence has an insertion or deletion relative to the other.', 'Few gaps mean the two sequences have a similar shape; many gaps mean they differ by insertions or deletions.', 'Few or no gaps.', 'Many gaps in a short stretch weaken a hit.', 'Compare gap counts between hits.'],
          al_q: ['Query line', 'Your sequence, with the position number on both ends.', 'Numbers at the left and right are residue positions in the query. Lines are broken at 60 characters for display.', null, 'Masked low-complexity regions appear as X.', 'Read down the three lines together.'],
          al_m: ['Midline (match line)', 'Symbols between the sequences: | or the letter for identical, + for similar, blank for different.', 'Reading the midline gives you a quick “texture” of similarity: long runs of letters/| indicate conserved regions; blanks show divergence.', 'Long unbroken identical runs.', null, 'Look for conserved blocks: they usually mark functional sites.'],
          al_s: ['Subject (Sbjct) line', 'The database sequence, aligned to your query. Mismatches are highlighted red here for teaching.', 'Hyphens (-) are gaps. Numbers show where in the subject the segment starts and ends.', null, null, 'A mismatch inside a conserved block might matter functionally.'],
          al_next: ['Next / previous match', 'Navigation between ranges and related information links.', 'Jump to the next alignment or the previous one without scrolling.', null, null, 'Handy for hits with many ranges.'],
          al_gapx: ['Gaps in a weaker alignment', '3 of 60 positions are gaps, which is a distant, family-level match.', 'The more diverged two sequences are, the more indels the aligner inserts.', null, 'Gap-rich alignments are less trustworthy at those positions.', 'Compare with the 0-2 gaps in the mouse hit.'],
          al_gapline: ['Gap characters (-)', 'A dash means the aligner inserted a gap in that sequence, an insertion/deletion event.', 'Gaps keep the rest of the sequence in register. The midline is blank there.', null, 'Gaps usually fall in loops, not in the structural core.', 'Count the gaps and see where they sit.'],
        },
      },
      /* ============ 7. taxonomy ============ */
      {
        id: 'tax', title: 'Taxonomy', icon: '🌳', url: 'blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Get&RID=XB1A2C3D014#taxonomy',
        html: () => `${top()}<div class="rp-pad">${H.tabs(['Descriptions', 'Graphic Summary', 'Alignments', 'Taxonomy'], 3)}
          ${F('t_reports', '<span class="rp-pill">Lineage Report</span> <span class="rp-pill g">Organism Report</span> <span class="rp-pill">Taxonomy Report</span>', { cls: 'rp-box' })}
          ${H.tbl([['Organism', 't_org'], ['Blast Name', 't_bname'], ['Score', 't_score'], ['Number of Hits', 't_hits'], ['Description', 't_desc']], [
            ['<b>Eukaryota</b>', '', '', 11, 'eukaryotes'],
            ['&nbsp;&nbsp;&nbsp;<b>Metazoa</b>', 'animals', '', 10, ''],
            ['&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Primates', 'primates', '', 4, ''],
            ['&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Homo sapiens', 'primates', 818, 2, 'cellular tumor antigen p53; tumor protein 63'],
            ['&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rodentia', 'rodents', 584, 2, 'cellular tumor antigen p53'],
            ['&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Actinopterygii', 'bony fishes', 335, 2, 'cellular tumor antigen p53; hypothetical protein']])}</div>`,
        f: {
          t_reports: ['Report types', 'Three ways to view the same data: Lineage (a tree), Organism (a list ranked by score) and Taxonomy (grouped by broad class).', 'Switch between them to answer different questions: “which species?” or “which groups?”.', null, null, 'Use Lineage to see how hits spread across the tree of life.'],
          t_org: ['Organism & lineage indentation', 'Names of species and groups, indented to show how they nest: Eukaryota → Metazoa → Primates → Homo sapiens.', 'Indentation = taxonomy level. It shows at a glance whether your hits are only mammals or spread over many kingdoms.', 'A wide spread suggests an ancient, conserved gene.', null, 'Collapsing groups quickly shows the dominant lineage.'],
          t_bname: ['Blast Name', 'A friendly, common group name such as “primates”, “rodents” or “bony fishes”.', 'Easier to read than formal Latin names and used for grouping the results.', null, null, 'Use it to describe results in plain words.'],
          t_score: ['Score', 'The best (maximum) alignment score among the hits from that organism or group.', 'Shows how close the closest member of each group is to your query.', 'High scores in distant groups = highly conserved gene.', null, 'Compare mammals with fish to see conservation.'],
          t_hits: ['Number of Hits', 'How many database hits belong to this organism or group.', 'A group with many hits often has many isoforms or many sequenced genomes, not necessarily more relatedness.', null, 'Bias: well-sequenced species have more entries.', 'Do not read it as evolutionary closeness.'],
          t_desc: ['Description', 'Short names of the top hits inside that group.', 'It tells you what the group’s proteins are called, a useful sanity check that they all describe the same gene.', null, null, 'Spot paralogs, such as p63 alongside p53.'],
        },
      },
      /* ============ 8. distance tree ============ */
      {
        id: 'tree', title: 'Distance tree', icon: '🌲', url: 'blast.ncbi.nlm.nih.gov/blast_tree_view.cgi?RID=XB1A2C3D014',
        html: () => `${top()}<div class="rp-pad"><h2>Distance tree of results</h2>
          ${F('tr_controls', 'Tree method ' + H.inp('Fast Minimum Evolution ▾') + ' &nbsp; Max Seq Difference ' + H.inp('0.85') + ' &nbsp; Labels ' + H.inp('Sequence title ▾') + ' &nbsp; ' + H.btn('Redraw', 'o'), { cls: 'rp-box' })}
          ${tree()}</div>`,
        f: {
          tr_controls: ['Tree controls', 'Pick the algorithm, the maximum allowed sequence difference and how leaves are labelled.', 'Fast Minimum Evolution and Neighbor Joining build trees from pairwise distances. “Max Seq Difference” drops sequences too divergent to place reliably.', 'Defaults are fine for a first look.', 'Quick trees are an overview, not a publication-grade phylogeny.', 'For a real analysis, align with Clustal Omega and use a dedicated tree program.'],
          tr_query: ['Your query (red)', 'The query sequence is highlighted so you can see where it sits among the hits.', 'Its closest neighbours are the most similar sequences. Here it sits with chimpanzee.', null, null, 'Look at its sister branch for its nearest relative.'],
          tr_mammal: ['A clade (a branch group)', 'Sequences that share a common ancestor node group together: here mammals form one block.', 'Everything to the right of a node descended from it. Close clusters = recent common ancestor.', 'A clade matching known taxonomy is reassuring.', 'Odd groupings may reveal duplicates or mislabelled sequences.', 'Check which species fall in your query’s clade.'],
          tr_scale: ['Scale bar', 'A bar showing how many substitutions per site a given branch length represents (here 0.1).', 'Longer branches mean more change. The bar converts drawing length into evolutionary distance.', null, null, 'Compare branch lengths using this bar.'],
          tr_root: ['Root & the outgroup', 'The left side of the tree. The most distant sequence (p63, a paralog) branches first and acts as an outgroup.', 'The outgroup anchors the direction of evolution: everything else is more closely related to each other than to it.', 'Gene-family members make a good outgroup.', 'Mid-point placement of the root is an assumption.', 'Understand that the tree is unrooted unless an outgroup is chosen.'],
        },
      },
      /* ============ 9. search summary ============ */
      {
        id: 'summary', title: 'Search summary', icon: '🧮', url: 'blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Get&RID=XB1A2C3D014#summary',
        html: () => `${top()}<div class="rp-pad"><h2>Search Summary</h2>
          ${F('s_params', '<h4>Search Parameters</h4>' + H.kv([['Program', 'blastp'], ['Word size', '5'], ['Expect value', '0.05'], ['Hitlist size', '100'], ['Gapcosts', '11,1'], ['Matrix', 'BLOSUM62'], ['Filter string', 'F'], ['Genetic Code', '1']]), { cls: 'rp-box' })}
          ${F('s_db', '<h4>Database</h4>' + H.kv([['Posted date', 'Oct 2, 2026 4:12 AM'], ['Number of letters', '212,456,789,102'], ['Number of sequences', '598,213,044']]), { cls: 'rp-box' })}
          ${F('s_stats', '<h4>Karlin-Altschul statistics</h4>' + H.kv([['Lambda', '0.3176'], ['K', '0.134'], ['H', '0.401']]), { cls: 'rp-box' })}
          ${F('s_space', '<h4>Results statistics</h4>' + H.kv([['Effective search space', '4.2e+13'], ['Effective search space used', '4.2e+13'], ['Neighboring words threshold', '11']]), { cls: 'rp-box' })}</div>`,
        f: {
          s_params: ['Search parameters', 'The exact settings used for this run: program, word size, E-value threshold, gap costs, matrix, filter.', 'This is the “methods” section of the search. To reproduce or compare results you need these values.', 'Copy them into your lab notebook.', 'Different parameters give different E-values; do not compare searches with different settings blindly.', 'Cite them in reports (e.g. BLASTP, BLOSUM62, E<1e-5).'],
          s_db: ['Database statistics', 'When the database was built and how big it is (letters and sequences).', 'Databases change daily; the date tells you what was searched. The number of letters is the “n” in the E-value formula.', 'Note the posted date when reporting results.', 'The same search later may find new hits.', 'Always report the database release or date.', 'A bigger database means a larger effective search space and therefore larger E-values for the same score.'],
          s_stats: ['Karlin-Altschul statistics', 'Lambda (λ), K and H: constants that convert raw scores to bit scores and E-values.', 'λ scales the scoring system; K corrects for the search; H is the information per aligned pair. They depend on the matrix and gap costs, not on your query.', null, null, 'Experts use them to recompute E-values.', 'Bit score S = (λS − ln K)/ln 2; E = m·n·2^−S.'],
          s_space: ['Effective search space', 'The product of effective query length and effective database length: the “size of the haystack”.', 'E-value grows in proportion to this number, so it explains why E-values differ between databases.', null, null, 'A smaller search space gives smaller E-values.'],
        },
      },
    ],
  });
})();
