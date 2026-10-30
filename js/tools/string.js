/* STRING protein-protein association networks. Example data is illustrative. */
(function () {
  const F = H.F, top = () => H.top('STRING', 'Protein-protein association networks', ['Search', 'Download', 'Help'], '#3b82c4');
  const nodes = { TP53: [330, 130], MDM2: [150, 70], CDKN1A: [520, 60], ATM: [110, 200], BAX: [540, 200], CHEK2: [250, 250], EP300: [420, 255], BRCA1: [330, 20] };
  const edges = [['TP53', 'MDM2', '#ff69b4,#4682b4'], ['TP53', 'CDKN1A', '#ff69b4,#4682b4,#006400'], ['TP53', 'ATM', '#ff69b4,#4682b4'], ['TP53', 'BAX', '#006400,#4682b4'], ['TP53', 'CHEK2', '#ff69b4'], ['TP53', 'EP300', '#4682b4'], ['TP53', 'BRCA1', '#006400'], ['ATM', 'CHEK2', '#ff69b4,#4682b4'], ['MDM2', 'CDKN1A', '#006400'], ['CHEK2', 'BRCA1', '#4682b4']];
  const net = () => {
    let s = ''; edges.forEach(([a, b, c], i) => { c.split(',').forEach((col, j) => { const [x1, y1] = nodes[a], [x2, y2] = nodes[b]; s += `<line x1="${x1}" y1="${y1 + j * 2.5}" x2="${x2}" y2="${y2 + j * 2.5}" stroke="${col}" stroke-width="2" opacity=".85"/>`; }); });
    Object.entries(nodes).forEach(([n, [x, y]]) => { s += `<circle cx="${x}" cy="${y}" r="${n === 'TP53' ? 24 : 17}" fill="${n === 'TP53' ? '#ef4444' : '#60a5fa'}" stroke="#fff" stroke-width="2"/><text x="${x}" y="${y + 4}" font-size="${n === 'TP53' ? 12 : 10}" text-anchor="middle" fill="#fff" font-weight="700">${n}</text>`; });
    return `<div class="rp-rel" style="height:290px"><svg width="100%" height="290" viewBox="0 0 650 290" preserveAspectRatio="xMinYMin meet">${s}</svg>
      ${H.hot('n_query', 190 * 1.0 + 140, 100, 60, 60)}${H.hot('n_partner', 100, 40, 70, 60)}${H.hot('n_edge_exp', 220, 105, 90, 40)}${H.hot('n_edge_txt', 400, 15, 100, 28)}</div>`;
  };
  BL.add({
    id: 'string', name: 'STRING', icon: '🕸️', color: '#3b82c4', cat: 'Function & disease', url: 'string-db.org/network/9606.ENSP00000269305',
    question: 'Which proteins work with this one, and how strong is the evidence?', about: 'STRING protein interaction network functional association enrichment confidence score evidence channels',
    windows: [
      {
        id: 'network', title: 'Network view', icon: '🕸️', url: 'string-db.org/network/9606.ENSP00000269305',
        html: () => `${top()}<div class="rp-pad"><h2>Protein network: TP53 <span class="rp-mut" style="font-size:12px">Homo sapiens</span></h2>
          ${H.tabs(['Viewers', 'Settings', 'Analysis', 'Exports', 'Clusters', 'Legend'], 0)}
          <div class="rp-row"><div class="rp-grow rp-box">${net()}</div><div style="width:200px">
            ${F('n_legend', '<div class="rp-box" style="font-size:11px"><b>Known interactions</b><br><span style="color:#4682b4">■</span> from curated databases<br><span style="color:#ff69b4">■</span> experimentally determined<br><b>Predicted</b><br><span style="color:#2e8b57">■</span> gene neighborhood<br><span style="color:#d4a017">■</span> gene fusions<br><span style="color:#00008b">■</span> co-occurrence<br><b>Others</b><br><span style="color:#006400">■</span> textmining<br><span style="color:#111">■</span> co-expression<br><span style="color:#8a2be2">■</span> homology</div>', { cls: '' })}</div></div>
          ${F('n_settings', '<div class="rp-box"><b>Settings:</b> network type ' + H.inp('full STRING network ▾') + ' &nbsp; required confidence ' + H.inp('medium (0.400) ▾') + ' &nbsp; max interactors ' + H.inp('no more than 10 ▾') + '</div>', { cls: '' })}
          ${F('n_stats', '<div class="rp-box"><b>Network Stats</b> · number of nodes: 8 · number of edges: 10 · average node degree: 2.5 · PPI enrichment p-value: &lt; 1.0e-16</div>', { cls: '' })}</div>`,
        f: {
          n_query: ['Your query protein (red)', 'The protein you searched is the red node in the middle. Its partners surround it.', 'Node size/colour code the query vs. the first shell of interactors. Nodes are proteins, not genes; “TP53” means the p53 protein.', null, null, 'Click a node on the real site to open its protein page.'],
          n_partner: ['Interaction partner (blue node)', 'A protein predicted or known to be functionally associated with the query.', 'Association means they contribute to the same function: they may bind physically or just work in the same pathway.', 'Well-known partners (MDM2 for p53).', 'Association ≠ physical binding.', 'Check which evidence types support each edge.'],
          n_edge_exp: ['Edge colour = evidence', 'The line between two nodes can have several colours; each colour is a kind of evidence.', 'Pink = experiments; blue = curated databases; green = text mining. Several colours on one edge mean multiple independent evidence types, so a stronger association.', 'Multi-coloured thick edges.', 'A single green edge can come from the two names simply being mentioned together.', 'Look at the experiment-based evidence first.'],
          n_edge_txt: ['Text-mining edge', 'A green edge comes from proteins mentioned together in the scientific literature (PubMed).', 'It is the weakest evidence type: co-mention does not imply interaction. Valuable for discovering literature, risky as proof.', null, 'Text-mining-only edges are often false.', 'Open the evidence viewer to read the papers.'],
          n_legend: ['Evidence legend', 'The colour key for the eight channels of evidence: curated databases, experiments, neighbourhood, fusion, co-occurrence, text mining, co-expression, homology.', 'STRING combines the channels into one score between 0 and 1 for each pair.', null, null, 'Switch off channels you distrust in Settings.'],
          n_settings: ['Settings: confidence & size', 'Controls which edges appear and how many interactors are added.', 'Required confidence: low 0.15, medium 0.4, high 0.7, highest 0.9. Higher thresholds show fewer, more reliable edges.', 'High confidence (0.7) for confident networks.', 'Low confidence floods the network with weak edges.', 'Start at 0.7 and relax only if needed.', 'The combined score assumes channel independence, using a probabilistic union with prior correction.'],
          n_stats: ['Network statistics', 'Counts of nodes and edges, average degree and the PPI enrichment p-value.', 'The PPI enrichment p-value asks whether the proteins have more interactions among themselves than a random set of the same size. A tiny p-value means the set is functionally connected.', 'p < 0.05, ideally ≪ 0.001.', 'High p-value: the proteins are not more connected than random.', 'Use it to test your own gene lists.'],
        },
      },
      {
        id: 'enrichment', title: 'Functional enrichment', icon: '📊', url: 'string-db.org/cgi/network?task=analysis#enrichment',
        html: () => `${top()}<div class="rp-pad">${H.tabs(['Viewers', 'Settings', 'Analysis', 'Exports', 'Clusters', 'Legend'], 2)}<h2>Functional enrichments in your network</h2>
          ${F('e_ppi', '<div class="rp-box">PPI enrichment p-value: <b>&lt; 1.0e-16</b></div>', { cls: '' })}
          <h4>Biological Process (Gene Ontology)</h4>${H.tbl([['GO term', 'e_term'], ['Observed gene count', 'e_obs'], ['Background gene count', 'e_bg'], ['Strength', 'e_str'], ['Signal', 'e_sig'], ['False discovery rate', 'e_fdr']], [
            ['GO:0006977 · DNA damage response, signal transduction by p53 class mediator', '6 of 8', 85, '2.25', '2.14', '3.3e-12'], ['GO:0006974 · Cellular response to DNA damage stimulus', '7 of 8', 780, '1.35', '1.80', '8.8e-10'], ['GO:0008283 · Cell population proliferation', '4 of 8', 1900, '0.78', '0.70', '0.0024']])}</div>`,
        f: {
          e_ppi: ['PPI enrichment', 'Tests whether your proteins interact with each other more than random proteins would.', 'A very small p-value tells you the set is not a random collection: it forms a connected module.', 'p < 1e-3.', 'p > 0.05: no evidence of a functional module.', 'Report it with your network.'],
          e_term: ['Enriched term', 'A GO term (or KEGG, Reactome…) that is over-represented among your proteins.', 'The ID plus label describes a biological process. Read the most specific terms for the clearest meaning.', null, 'Very general terms are rarely informative.', 'Use the specific terms in your interpretation.'],
          e_obs: ['Observed gene count', 'How many proteins of your network belong to the term (“6 of 8”).', 'The numerator of the enrichment test.', null, null, null],
          e_bg: ['Background gene count', 'How many proteins in the whole genome belong to the term.', 'Small terms with high observed counts are more impressive than huge terms.', null, null, null],
          e_str: ['Strength', 'log10(observed / expected): how big the enrichment is.', '2.25 means about 180-fold more than expected by chance. It is an effect size and a more intuitive measure than p-value.', 'Above 1.', null, 'Rank terms by strength and FDR.'],
          e_sig: ['Signal', 'A weighted combination of the observed/expected ratio and the significance.', 'It helps pick the terms that are both large and strongly enriched.', null, null, null],
          e_fdr: ['False discovery rate (FDR)', 'The p-value corrected for testing thousands of terms at once.', 'Because many terms are tested, raw p-values would give many false positives. Terms with FDR below 0.05 are considered significant.', 'FDR < 0.05.', 'Do not use uncorrected p-values.', 'Report FDR, not raw p.'],
        },
      },
    ],
  });
})();
