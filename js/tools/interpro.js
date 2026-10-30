/* InterPro (EMBL-EBI): protein families & domains. Example data is illustrative. */
(function () {
  const F = H.F, top = () => H.top('InterPro', 'Classification of protein families', ['Search', 'Browse', 'Download', 'Help'], '#1f7a6e');
  const row = (name, db, ranges, color) => `<div class="rp-row" style="gap:6px"><span style="width:170px;font-size:11px"><b>${db}</b> ${name}</span><div class="rp-grow">${H.track(ranges.map(r => ({ s: r[0], e: r[1], c: color })), 393)}</div></div>`;
  BL.add({
    id: 'interpro', name: 'InterPro', icon: '🏷️', color: '#1f7a6e', cat: 'Families & domains', url: 'ebi.ac.uk/interpro/protein/UniProt/P04637/',
    question: 'Which families and domains does this protein contain?', about: 'InterPro Pfam SMART PROSITE PANTHER domain architecture family superfamily signatures',
    windows: [
      {
        id: 'protein', title: 'Protein page', icon: '🧬', url: 'ebi.ac.uk/interpro/protein/UniProt/P04637/',
        html: () => `${top()}<div class="rp-pad">${F('ip_head', '<h2>Cellular tumor antigen p53 <span class="rp-mut" style="font-size:12px">P04637 · Homo sapiens · 393 aa · reviewed</span></h2>', { cls: '' })}
          ${H.tabs(['Overview', 'Domain architecture', 'Structures', 'Proteomes', 'Taxonomy'], 0)}
          <div class="rp-box"><h4>Domains and repeats</h4>
          ${F('ip_legend', '<span class="rp-pill g">Family</span><span class="rp-pill">Domain</span><span class="rp-pill p">Homologous superfamily</span><span class="rp-pill o">Repeat</span><span class="rp-pill r">Site</span>', { tag: 'div' })}
          ${F('ip_arch', row('IPR002117', 'p53 family', [[1, 393]], '#16a34a') + row('IPR011615', 'p53 DNA-binding', [[94, 289]], '#2563eb') + row('IPR010991', 'p53 tetramerisation', [[319, 358]], '#2563eb') + row('IPR008967', 'p53-like TF DNA-binding', [[94, 289]], '#8b5cf6'), { cls: '' })}</div>
          <div class="rp-box"><h4>Member database matches</h4>
          ${F('ip_members', row('PF00870', 'Pfam', [[94, 289]], '#0ea5e9') + row('SM00000', 'SMART', [[94, 289]], '#f59e0b') + row('PS00348', 'PROSITE', [[148, 270]], '#14b8a6') + row('PTHR11447', 'PANTHER', [[1, 393]], '#ec4899') + row('G3DSA:2.60.40.720', 'Gene3D', [[94, 289]], '#a855f7'), { cls: '' })}</div></div>`,
        f: {
          ip_head: ['Protein header', 'Which protein is being annotated: name, UniProt accession, species, length and review status.', 'InterPro does not own the sequence: it annotates UniProt proteins, so the accession links both worlds.', null, null, 'Come from UniProt with an accession.'],
          ip_legend: ['Entry types', 'Colour-coded kinds of InterPro entries: Family, Domain, Homologous superfamily, Repeat, Site.', 'Family = the whole protein belongs to a group; Domain = a structural/functional unit; Site = specific residues (active/binding sites); Repeat = a repeated short unit.', null, null, 'Look at the type before interpreting an entry.'],
          ip_arch: ['InterPro domain architecture', 'The integrated summary: each InterPro entry (IPR…) that matches the protein, drawn along its length.', 'Green = family-level match across the whole protein; blue = domains. Overlapping entries describe the same region at different levels of generality (family → domain → superfamily).', 'Several consistent entries over the same region.', 'A domain that appears on a very short stretch may be a false positive.', 'Click an IPR to read what it means.', 'Each IPR integrates several member-database signatures that detect the same feature.'],
          ip_members: ['Member database signatures', 'The raw predictions from partner databases (Pfam, SMART, PROSITE, PANTHER, Gene3D…) that InterPro merges.', 'Each partner uses its own method (HMMs, patterns, structure-based). When several independent methods agree on a region, confidence is high.', 'Agreement across methods.', 'A single method with no support from others may be unreliable.', 'Check boundaries: they may differ by a few residues.'],
        },
      },
      {
        id: 'entry', title: 'Entry page', icon: '📘', url: 'ebi.ac.uk/interpro/entry/InterPro/IPR002117/',
        html: () => `${top()}<div class="rp-pad"><h2>p53 tumour suppressor family <span class="rp-mut" style="font-size:12px">IPR002117</span></h2>
          ${F('ie_type', H.pill('Family', 'g') + ' <span class="rp-mut">Short name: P53</span> &nbsp; ' + H.pill('Reviewed proteins: 1,800') + H.pill('Total proteins: 14,500'), { cls: '' })}
          ${F('ie_desc', '<div class="rp-box"><h4>Description</h4>The p53 family comprises tumour suppressor proteins that act as transcription factors in response to cellular stress. Members include p53, p63 and p73…</div>', { cls: '' })}
          ${F('ie_go', '<div class="rp-box"><h4>GO terms</h4>' + H.pill('DNA-binding transcription factor activity') + H.pill('apoptotic process') + H.pill('nucleus') + '</div>', { cls: '' })}
          ${F('ie_sig', '<div class="rp-box"><h4>Contributing signatures</h4>' + H.tbl(['Database', 'Signature', 'Name'], [['PRINTS', 'PR00386', 'P53 signature'], ['PANTHER', 'PTHR11447', 'CELLULAR TUMOR ANTIGEN P53'], ['Pfam', 'PF00870', 'P53 DNA-binding domain']]) + '</div>', { cls: '' })}
          ${F('ie_rel', '<div class="rp-box"><h4>Relationships</h4>Contains: IPR011615 p53 DNA-binding domain · IPR010991 p53 tetramerisation · Child of: —</div>', { cls: '' })}</div>`,
        f: {
          ie_type: ['Entry type and counts', 'The kind of entry (Family) with its short name and how many UniProt proteins match it.', 'Counts show how widespread the family is. “Reviewed” counts only expert-curated proteins.', 'Large reviewed counts mean a well-defined group.', null, null],
          ie_desc: ['Description', 'A curated text on what the family/domain is, what it does and which proteins belong to it.', 'Written by InterPro curators from literature. It is the best short explanation of the entry.', null, null, 'Read it before relying on a family label.'],
          ie_go: ['GO terms', 'Gene Ontology terms attached to the entry.', 'They are transferred to every protein that matches it, so proteins with this family inherit those functions as predictions.', null, 'Inherited terms are predictions, not proof.', null],
          ie_sig: ['Contributing signatures', 'The member-database models that define this entry: PRINTS, PANTHER, Pfam, etc.', 'An InterPro entry is a union of signatures describing the same thing. Different sources support each other.', null, null, 'Click a signature to open its original database page.'],
          ie_rel: ['Relationships (hierarchy)', 'How entries nest: parents (more general), children (more specific) and contained domains.', 'Families can contain domains; superfamilies group domains with the same fold. The hierarchy helps you move between detail levels.', null, null, 'Move up to see broader families, down for specific ones.'],
        },
      },
    ],
  });
})();
