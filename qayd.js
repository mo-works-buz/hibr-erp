/* Hibr Press — Qayd / XBRL annual financial statements export (MOCI Kuwait) */
(function () {
  Object.assign(I18N.ar, { qayd: 'قيد / XBRL', qayd_title: 'القوائم المالية السنوية — قيد (XBRL)', fiscal_year: 'السنة المالية', prepare: 'تجهيز', export_json: 'تصدير XBRL-JSON', export_xlsx: 'تصدير Excel', element: 'عنصر XBRL (IFRS)', item: 'البند', current_year: 'السنة الحالية', prior_year: 'سنة المقارنة', sofp: 'قائمة المركز المالي', sopl: 'قائمة الأرباح أو الخسائر', socf: 'قائمة التدفقات النقدية', qayd_note: 'هذا الملف يجهّز بيانات القوائم المالية موسومة بعناصر IFRS الأساسية (المستخدمة في نظام «قيد» التابع لوزارة التجارة والصناعة). مكتب التدقيق المرخّص هو من يعتمد القوائم ويرفعها على البوابة qayd.moci.gov.kw خلال 6 أشهر من نهاية السنة المالية. تأكد من ترحيل كل القيود وإقفال السنة قبل التصدير.', checks: 'فحوصات ما قبل التسليم', chk_balanced: 'الميزانية متوازنة (الأصول = الالتزامات + حقوق الملكية)', chk_drafts: 'لا توجد فواتير أو فواتير موردين بحالة مسودة خلال السنة', chk_dep: 'تم ترحيل إهلاك الأصول حتى نهاية السنة', chk_company: 'بيانات الشركة مكتملة (السجل التجاري، الترخيص، العنوان)', pass: 'سليم', fail: 'يحتاج مراجعة', entity: 'المنشأة', cr: 'السجل التجاري', period: 'الفترة', currency: 'العملة', ok_count: 'عدد الفواتير المسودة' });
  Object.assign(I18N.en, { qayd: 'Qayd / XBRL', qayd_title: 'Annual Financial Statements — Qayd (XBRL)', fiscal_year: 'Fiscal year', prepare: 'Prepare', export_json: 'Export XBRL-JSON', export_xlsx: 'Export Excel', element: 'XBRL element (IFRS)', item: 'Line item', current_year: 'Current year', prior_year: 'Comparative', sofp: 'Statement of Financial Position', sopl: 'Statement of Profit or Loss', socf: 'Statement of Cash Flows', qayd_note: 'Prepares the annual financial statements tagged with the core IFRS elements used by the MOCI "Qayd" system. A licensed auditor certifies and submits the statements on qayd.moci.gov.kw within 6 months of the fiscal year-end. Make sure all entries are posted and the year is closed before exporting.', checks: 'Pre-submission checks', chk_balanced: 'Balance sheet balances (Assets = Liabilities + Equity)', chk_drafts: 'No draft invoices or supplier bills in the year', chk_dep: 'Depreciation posted to year-end', chk_company: 'Company details complete (CR, licence, address)', pass: 'OK', fail: 'Needs review', entity: 'Entity', cr: 'CR number', period: 'Period', currency: 'Currency', ok_count: 'Draft invoices' });

  // account-code → IFRS element mapping (ifrs-full taxonomy names)
  const MAP_BS = [
    ['ifrs-full:CashAndCashEquivalents', 'النقد وما في حكمه', 'Cash and cash equivalents', ['1110', '1120', '1130']],
    ['ifrs-full:TradeAndOtherCurrentReceivables', 'ذمم مدينة تجارية وأخرى', 'Trade and other receivables', ['1200', '1600']],
    ['ifrs-full:Inventories', 'المخزون', 'Inventories', ['1300']],
    ['ifrs-full:OtherCurrentAssets', 'مصروفات مدفوعة مقدماً وأصول أخرى', 'Prepayments and other current assets', ['1400', '1410']],
    ['ifrs-full:PropertyPlantAndEquipment', 'ممتلكات وآلات ومعدات (صافي)', 'Property, plant and equipment (net)', ['1510', '1520', '1530', '1590']],
    ['ifrs-full:TradeAndOtherCurrentPayables', 'ذمم دائنة تجارية وأخرى', 'Trade and other payables', ['2100', '2300', '2500']],
    ['ifrs-full:ContractLiabilitiesCurrent', 'دفعات مقدمة من العملاء', 'Advances from customers (contract liabilities)', ['2200']],
    ['ifrs-full:NoncurrentProvisionsForEmployeeBenefits', 'مخصص مكافأة نهاية الخدمة', 'Provision for employees\' end of service benefits', ['2400']],
    ['ifrs-full:IssuedCapital', 'رأس المال', 'Share capital', ['3100']],
    ['ifrs-full:RetainedEarnings', 'الأرباح المحتجزة', 'Retained earnings', ['3200', '3900']],
  ];
  const MAP_PL = [
    ['ifrs-full:Revenue', 'الإيرادات', 'Revenue', c => c.startsWith('4')],
    ['ifrs-full:CostOfSales', 'تكلفة المبيعات', 'Cost of sales', c => c.startsWith('5')],
    ['ifrs-full:EmployeeBenefitsExpense', 'تكاليف الموظفين', 'Staff costs', c => ['6200', '6210', '6220'].includes(c)],
    ['ifrs-full:DepreciationAndAmortisationExpense', 'الإهلاك', 'Depreciation', c => c === '6850'],
    ['ifrs-full:FinanceCosts', 'تكاليف تمويل ومصاريف بنكية', 'Finance costs', c => c === '6800'],
    ['ifrs-full:OtherExpenseByNature', 'مصروفات عمومية وإدارية أخرى', 'Other general and administrative expenses', c => c.startsWith('6') && !['6200', '6210', '6220', '6850', '6800'].includes(c)],
  ];
  const sum = (rows, pred) => rows.filter(r => pred(r.code)).reduce((a, r) => a + Number(r.amount), 0);
  const r3 = n => Math.round(n * 1000) / 1000;

  async function yearData(y) {
    const from = `${y}-01-01`, to = `${y}-12-31`;
    const bs = await rpc('balance_sheet', { p_to: to });
    const pl = await rpc('pnl', { p_from: from, p_to: to });
    const bsPrev = await rpc('balance_sheet', { p_to: `${y - 1}-12-31` });
    // cash-flow classification from journal lines on cash accounts
    const jl = await q(sb.from('journal_lines').select('debit,credit,account_code,journal_entries!inner(date)').gte('journal_entries.date', from).lte('journal_entries.date', to));
    const invest = jl.filter(l => ['1510', '1520', '1530'].includes(l.account_code)).reduce((a, l) => a + Number(l.credit) - Number(l.debit), 0);
    const finance = jl.filter(l => ['3100', '3900'].includes(l.account_code)).reduce((a, l) => a + Number(l.credit) - Number(l.debit), 0);
    const cashEnd = sum(bs, c => ['1110', '1120', '1130'].includes(c)), cashStart = sum(bsPrev, c => ['1110', '1120', '1130'].includes(c));
    const net = cashEnd - cashStart, oper = net - invest - finance;
    const BS = MAP_BS.map(m => ({ el: m[0], ar: m[1], en: m[2], v: r3(sum(bs, c => m[3].includes(c))) }));
    const assets = r3(BS.filter(x => x.el.includes('Cash') || x.el.includes('Receivables') || x.el.includes('Inventories') || x.el.includes('OtherCurrentAssets') || x.el.includes('PropertyPlant')).reduce((a, x) => a + x.v, 0));
    const liab = r3(BS.filter(x => x.el.includes('Payables') || x.el.includes('ContractLiabilities') || x.el.includes('Provisions')).reduce((a, x) => a + x.v, 0));
    const equity = r3(BS.filter(x => x.el.includes('IssuedCapital') || x.el.includes('RetainedEarnings')).reduce((a, x) => a + x.v, 0));
    const PL = MAP_PL.map(m => ({ el: m[0], ar: m[1], en: m[2], v: r3(sum(pl, m[3])) }));
    const rev = PL[0].v, cos = PL[1].v, gp = r3(rev - cos), opex = r3(PL.slice(2).reduce((a, x) => a + x.v, 0)), profit = r3(gp - opex);
    return {
      year: y, from, to,
      sofp: [...BS, { el: 'ifrs-full:Assets', ar: 'إجمالي الأصول', en: 'Total assets', v: assets, tot: 1 }, { el: 'ifrs-full:Liabilities', ar: 'إجمالي الالتزامات', en: 'Total liabilities', v: liab, tot: 1 }, { el: 'ifrs-full:Equity', ar: 'إجمالي حقوق الملكية', en: 'Total equity', v: equity, tot: 1 }, { el: 'ifrs-full:EquityAndLiabilities', ar: 'إجمالي الالتزامات وحقوق الملكية', en: 'Total equity and liabilities', v: r3(liab + equity), tot: 1 }],
      sopl: [PL[0], PL[1], { el: 'ifrs-full:GrossProfit', ar: 'مجمل الربح', en: 'Gross profit', v: gp, tot: 1 }, ...PL.slice(2), { el: 'ifrs-full:ProfitLoss', ar: 'صافي ربح (خسارة) السنة', en: 'Profit (loss) for the year', v: profit, tot: 1 }],
      socf: [
        { el: 'ifrs-full:CashFlowsFromUsedInOperatingActivities', ar: 'صافي النقد من الأنشطة التشغيلية', en: 'Net cash from operating activities', v: r3(oper) },
        { el: 'ifrs-full:CashFlowsFromUsedInInvestingActivities', ar: 'صافي النقد من الأنشطة الاستثمارية', en: 'Net cash from investing activities', v: r3(invest) },
        { el: 'ifrs-full:CashFlowsFromUsedInFinancingActivities', ar: 'صافي النقد من الأنشطة التمويلية', en: 'Net cash from financing activities', v: r3(finance) },
        { el: 'ifrs-full:IncreaseDecreaseInCashAndCashEquivalents', ar: 'صافي التغير في النقد', en: 'Net increase (decrease) in cash', v: r3(net), tot: 1 },
        { el: 'ifrs-full:CashAndCashEquivalents', ar: 'النقد في بداية السنة', en: 'Cash at beginning of year', v: r3(cashStart), ctx: 'start' },
        { el: 'ifrs-full:CashAndCashEquivalents', ar: 'النقد في نهاية السنة', en: 'Cash at end of year', v: r3(cashEnd), ctx: 'end', tot: 1 }],
      balanced: Math.abs(assets - (liab + equity)) < 0.001, profit, equity
    };
  }

  async function qaydPage() {
    const el = $('#page'); const yNow = new Date().getFullYear();
    let y = yNow - (new Date().getMonth() < 6 ? 1 : 0); let cur = null, prev = null;
    el.innerHTML = `<header class="top"><h1>${T('qayd_title')}</h1><div class="tools"><select class="in" id="qy">${[0, 1, 2, 3].map(i => `<option value="${yNow - i}" ${yNow - i === y ? 'selected' : ''}>${yNow - i}</option>`).join('')}</select><button class="btn" id="qrun">${T('prepare')}</button><button class="btn sec" id="qjson" disabled>${T('export_json')}</button><button class="btn sec" id="qxlsx" disabled>${T('export_xlsx')}</button><button class="btn sec" id="qprn" disabled>${T('print')}</button></div></header>
      <div class="card"><p class="muted">${T('qayd_note')}</p></div><div id="qout"></div>`;
    const lbl = x => isAr() ? x.ar : x.en;
    const sec = (title, rows, prows) => `<div class="card"><h3>${title}</h3><div class="tbl-wrap"><table class="rep"><thead><tr><th>${T('item')}</th><th>${T('element')}</th><th class="num">${cur.year}</th><th class="num">${cur.year - 1}</th></tr></thead><tbody>${rows.map((r, i) => `<tr class="${r.tot ? 'sec' : ''}"><td>${esc(lbl(r))}</td><td class="mono muted" style="font-size:11px">${r.el}</td><td class="num">${fmt(r.v)}</td><td class="num">${fmt(prows[i]?.v || 0)}</td></tr>`).join('')}</tbody></table></div></div>`;
    async function run() {
      y = Number($('#qy').value); const out = $('#qout'); out.innerHTML = '<div class="empty">…</div>';
      try {
        cur = await yearData(y); prev = await yearData(y - 1);
        const drafts = await q(sb.from('invoices').select('id').eq('status', 'draft').gte('date', cur.from).lte('date', cur.to));
        const dbills = await q(sb.from('bills').select('id').eq('status', 'draft').gte('date', cur.from).lte('date', cur.to));
        const dep = await q(sb.from('depreciation_runs').select('period').order('period', { ascending: false }).limit(1));
        const assets = await q(sb.from('assets').select('id').limit(1));
        const c = COMPANY || {};
        const checks = [[T('chk_balanced'), cur.balanced], [`${T('chk_drafts')} (${drafts.length + dbills.length})`, drafts.length + dbills.length === 0], [T('chk_dep'), !assets.length || (dep.length && String(dep[0].period) >= `${y}-12-01`)], [T('chk_company'), !!(c.cr && c.address_ar)]];
        out.innerHTML = `<div class="card"><h3>${T('checks')}</h3><div class="kv">${checks.map(k => `<b>${k[1] ? '✅' : '⚠️'}</b><span>${k[0]} — <span class="badge ${k[1] ? 'ok' : 'warn'}">${k[1] ? T('pass') : T('fail')}</span></span>`).join('')}</div>
          <div class="kv" style="margin-top:10px"><b>${T('entity')}</b><span>${esc(c.name_ar || '')} — ${esc(c.name_en || '')}</span><b>${T('cr')}</b><span>${esc(c.cr || '—')}</span><b>${T('period')}</b><span class="mono">${cur.from} → ${cur.to}</span><b>${T('currency')}</b><span>KWD (3 decimals)</span></div></div>
          ${sec(T('sofp'), cur.sofp, prev.sofp)}${sec(T('sopl'), cur.sopl, prev.sopl)}${sec(T('socf'), cur.socf, prev.socf)}`;
        ['qjson', 'qxlsx', 'qprn'].forEach(i => $('#' + i).disabled = false);
      } catch (e) { err(e); }
    }
    $('#qrun').onclick = run;
    $('#qjson').onclick = () => {
      const c = COMPANY || {};
      const facts = {}; const add = (rows, ctx) => rows.forEach(r => { const k = r.el + (r.ctx ? '@' + r.ctx : ''); facts[k] = facts[k] || {}; facts[k][ctx] = r.v; });
      add(cur.sofp, 'current'); add(cur.sopl, 'current'); add(cur.socf, 'current'); add(prev.sofp, 'prior'); add(prev.sopl, 'prior'); add(prev.socf, 'prior');
      const doc = {
        documentInfo: { documentType: 'https://xbrl.org/2021/xbrl-json', taxonomy: 'ifrs-full (core elements) — map to MOCI Qayd taxonomy on submission', generatedBy: 'Hibr Press ERP', generatedAt: new Date().toISOString() },
        entity: { name_ar: c.name_ar, name_en: c.name_en, commercial_register: c.cr, licence: c.moi_licence, address: c.address_ar },
        contexts: { current: { period: { start: cur.from, end: cur.to } }, prior: { period: { start: prev.from, end: prev.to } } },
        unit: 'iso4217:KWD', decimals: 3,
        facts: Object.entries(facts).map(([k, v]) => ({ concept: k.split('@')[0], instant: k.includes('@start') ? 'start' : (k.includes('@end') ? 'end' : undefined), current: v.current ?? 0, prior: v.prior ?? 0 }))
      };
      const blob = new Blob([JSON.stringify(doc, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `Hibr_Press_FS_${y}_xbrl.json`; a.click();
    };
    $('#qxlsx').onclick = () => {
      const rows = []; const push = (st, cr, pr) => cr.forEach((r, i) => rows.push({ statement: st, item_ar: r.ar, item_en: r.en, element: r.el, current: r.v, prior: pr[i]?.v || 0 }));
      push(T('sofp'), cur.sofp, prev.sofp); push(T('sopl'), cur.sopl, prev.sopl); push(T('socf'), cur.socf, prev.socf);
      exportCSV([{ l: 'Statement', k: 'statement' }, { l: 'البند', k: 'item_ar' }, { l: 'Line item', k: 'item_en' }, { l: 'XBRL element', k: 'element' }, { l: String(y), k: 'current' }, { l: String(y - 1), k: 'prior' }], rows, `Hibr_Press_FS_${y}`);
    };
    const psec = (title, rows, prows) => `<h3 style="margin:14px 0 6px;color:var(--brown)">${title}</h3><table class="rep"><thead><tr><th>${T('item')}</th><th>${T('element')}</th><th class="num">${cur.year}</th><th class="num">${cur.year - 1}</th></tr></thead><tbody>${rows.map((r, i) => `<tr class="${r.tot ? 'sec' : ''}"><td>${esc(lbl(r))}</td><td class="mono" style="font-size:10px;color:#666">${r.el}</td><td class="num">${fmt(r.v)}</td><td class="num">${fmt(prows[i]?.v || 0)}</td></tr>`).join('')}</tbody></table>`;
    $('#qprn').onclick = () => printHTML(`${docHeader('qayd_title', String(y))}<p class="muted">${T('period')}: ${fmtD(cur.from)} — ${fmtD(cur.to)} · KWD</p>${psec(T('sofp'), cur.sofp, prev.sofp)}${psec(T('sopl'), cur.sopl, prev.sopl)}${psec(T('socf'), cur.socf, prev.socf)}${docFooter()}`);
    run();
  }

  const acc = NAV.find(g => g.grp === 'accounting'); if (acc && !acc.items.some(i => i[0] === 'qayd')) acc.items.splice(1, 0, ['qayd', 'qayd', 'finance']);
  PAGES.qayd = qaydPage;
})();
