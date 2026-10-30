/* SWISS-MODEL homology modelling. Example data is illustrative. */
(function () {
  const F = H.F, top = () => H.top('SWISS-MODEL', 'Homology modelling workspace · SIB', ['Start', 'Repository', 'Documentation', 'Help'], '#7c2d12');
  BL.add({
    id: 'swissmodel', name: 'SWISS-MODEL', icon: '🧱', color: '#9a3412', cat: 'Protein structure', url: 'swissmodel.expasy.org/interactive',
    question: 'Can I build a 3D model by homology, and is it good?', about: 'SWISS-MODEL homology modelling template sequence identity coverage GMQE QMEAN oligomeric state',
    windows: [
      {
        id: 'templates', title: 'Template search', icon: '🔍', url: 'swissmodel.expasy.org/interactive/xyz123/templates/',
        html: () => `${top()}<div class="rp-pad"><h2>Template Search Results</h2>
          ${F('t_info', '<div class="rp-box">Target: <b>TP53_HUMAN</b> (393 residues) · Templates found: <b>1,284</b> · Selected: <b>3</b> ' + H.btn('Build Models') + '</div>', { cls: '' })}
          ${H.tbl([['Template', 't_id'], ['Seq Identity', 't_ident'], ['Oligo-state', 't_oligo'], ['Found by', 't_found'], ['Method', 't_method'], ['Resolution', 't_res'], ['Seq Similarity', 't_sim'], ['Coverage', 't_cov'], ['Description', 't_desc']], [
            ['<span class="rp-link">1tup.1.A</span>', '98.2%', 'homo-tetramer', 'HHblits', 'X-ray', '2.2 Å', '0.60', '0.45', 'Cellular tumor antigen p53'],
            ['<span class="rp-link">2ocj.1.A</span>', '97.9%', 'homo-tetramer', 'BLAST', 'X-ray', '1.9 Å', '0.60', '0.45', 'Cellular tumor antigen p53'],
            ['<span class="rp-link">3zme.1.A</span>', '41.0%', 'monomer', 'HHblits', 'X-ray', '2.6 Å', '0.43', '0.31', 'Tumor protein 63']])}</div>`,
        f: {
          t_info: ['Search summary', 'Which target was searched, how many templates were found and which are selected for modelling.', 'SWISS-MODEL searches the PDB for structures of similar sequences (templates) using BLAST and HHblits, then lets you pick which to build models from.', null, null, 'Select the best 1-3 templates, then press Build Models.'],
          t_id: ['Template ID', 'PDB ID . assembly . chain, e.g. 1tup.1.A (PDB 1TUP, biological assembly 1, chain A).', 'The assembly number matters: it decides whether the model is built as a monomer or an oligomer.', null, null, 'Click it to inspect the template.'],
          t_ident: ['Sequence identity', 'How identical your target is to the template over the aligned region.', 'The most important predictor of model accuracy. >50% means a reliable backbone and mostly correct side chains; 30-50% fair; <30% treat with great caution.', 'Above 50%.', 'Below 30%: the model may be wrong.', 'Prefer templates with the highest identity AND coverage.'],
          t_oligo: ['Oligomeric state', 'How many chains assemble in the template: monomer, homo-dimer, homo-tetramer…', 'It suggests the quaternary structure of your protein. Modelling the right assembly matters when the interface is part of the function.', null, 'The template state may not hold for your protein.', 'Check literature on how your protein works.'],
          t_found: ['Found by', 'The method that detected the template: BLAST (sequence), HHblits (profile, more sensitive).', 'HHblits can find more distant templates that BLAST misses.', null, null, null],
          t_method: ['Experimental method', 'How the template structure was determined (X-ray, NMR, EM).', 'Quality of the template limits quality of the model.', null, null, null],
          t_res: ['Resolution', 'Level of detail in the template’s experimental data (Å).', 'Lower is better; 2 Å is good.', 'Below 2.5 Å.', 'Above 3.5 Å.', null],
          t_sim: ['Sequence similarity', 'A score (0-1) combining identity and chemically similar substitutions.', 'It is a better measure than identity for distant templates.', null, null, null],
          t_cov: ['Coverage', 'Fraction of your target sequence covered by the template (0-1).', '0.45 means 45%: only the DNA-binding core can be modelled; the rest has no template.', 'Close to 1 for whole-protein models.', 'Low coverage models one domain only.', 'Combine several templates if domains differ.'],
          t_desc: ['Template description', 'The name of the template protein.', 'A template of the same protein is better than a family member.', null, null, null],
        },
      },
      {
        id: 'model', title: 'Model quality', icon: '📈', url: 'swissmodel.expasy.org/interactive/xyz123/models/01',
        html: () => `${top()}<div class="rp-pad"><h2>Model 01</h2>
          ${H.kv([['Built with', 'ProMod3 3.3.0', 'm_built'], ['Template', '1tup.1.A', 'm_tmpl'], ['Sequence identity', '98.20%', 'm_ident'], ['Coverage', '0.45', 'm_cov'], ['Oligo-state', 'homo-tetramer (QSQE 0.82)', 'm_qsqe'], ['Ligands', '3 × ZN', 'm_lig']])}
          <div class="rp-box"><h4>Model quality</h4><div class="rp-row">${F('m_gmqe', 'GMQE <b>0.78</b>', { cls: 'rp-pill g' })}${F('m_qmean', 'QMEANDisCo Global <b>0.80 ± 0.05</b>', { cls: 'rp-pill g' })}</div></div>
          <div class="rp-box">${F('m_local', '<h4>Local quality estimate</h4>' + H.row([{ s: 1, e: 14, c: '#ef4444' }, { s: 15, e: 160, c: '#22c55e' }, { s: 161, e: 175, c: '#f59e0b' }, { s: 176, e: 200, c: '#22c55e' }], 200) + '<div class="rp-mut" style="font-size:11px">residues → · green = reliable, red = unreliable</div>', { cls: '' })}</div>
          ${F('m_z', '<div class="rp-box"><h4>Comparison with non-redundant set of PDB structures</h4><div style="height:14px;border-radius:7px;background:linear-gradient(90deg,#ef4444,#f59e0b,#22c55e,#f59e0b,#ef4444);position:relative"><span style="position:absolute;left:52%;top:-4px;width:6px;height:22px;background:#111"></span></div><span class="rp-mut">QMEAN Z-score ≈ −0.3 → typical of experimental structures of this size</span></div>', { cls: '' })}</div>`,
        f: {
          m_built: ['Modelling engine', 'The software used to build the model (ProMod3).', 'It copies the template backbone, rebuilds side chains and models loops.', null, null, null],
          m_tmpl: ['Template used', 'The experimental structure the model was built from.', 'Model quality is capped by the template: check its resolution and the alignment.', null, null, null],
          m_ident: ['Sequence identity', 'Identity between target and template.', 'The basic accuracy predictor: 98% means the model is almost a copy of an experimental structure.', 'Above 50%.', 'Below 30%.', null],
          m_cov: ['Coverage', 'Fraction of your sequence that was modelled.', 'The rest has no template; do not assume it is disordered, just unmodelled.', null, 'Low coverage = partial model.', null],
          m_qsqe: ['Oligo-state & QSQE', 'The assembly predicted for the model and QSQE (Quaternary Structure Quality Estimate, 0-1) of how reliable the assembly is.', 'A tetramer with QSQE 0.82 is a confident assembly because the template and sequence both support it.', 'Above 0.7.', 'Below 0.5: the assembly is doubtful.', null],
          m_lig: ['Ligands transferred', 'Ions and small molecules copied from the template when the binding residues are conserved.', 'Shown only if the environment is conserved.', null, null, null],
          m_gmqe: ['GMQE', 'Global Model Quality Estimation (0-1): the expected quality BEFORE building, from alignment and template quality, scaled by coverage.', 'Higher is better. It lets you rank candidate models for the same target.', 'Above 0.7.', 'Below 0.5.', 'Use it to choose among models.'],
          m_qmean: ['QMEAN / QMEANDisCo', 'Quality score of the finished model: how much it resembles real experimental structures.', 'QMEANDisCo Global in 0-1 (higher is better) with an error margin; the older QMEAN Z-score is around 0 for good models and strongly negative (< −4) for bad ones.', 'QMEANDisCo above 0.7.', 'Below 0.6, or QMEAN Z < −4.', 'Check the local plot to see which regions are weak.'],
          m_local: ['Local quality plot', 'Estimated reliability per residue along the sequence.', 'Models are rarely uniform: cores are accurate and loops or termini are not. Use this to decide which parts to trust.', 'Green regions.', 'Red/orange regions: do not analyse atomic details there.', 'Do not interpret red loops in structural arguments.'],
          m_z: ['Comparison with PDB', 'Where the model’s QMEAN score lies among experimental structures of similar size.', 'A black bar inside the green zone means the model is as good as typical experiments; at the edges, worse than typical.', 'In the middle band.', 'Far to either end.', null],
        },
      },
    ],
  });
})();
