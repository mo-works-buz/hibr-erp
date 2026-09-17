/* Hibr Press — print overrides: invoices & receipts print in two copies (customer / company) */
(function () {
  const copyLabel = (i) => isAr() ? (i === 0 ? 'نسخة العميل' : 'نسخة الشركة') : (i === 0 ? 'Customer copy' : 'Company copy');
  const copyBadge = (i) => `<div style="text-align:end;margin:-6px 0 8px"><span style="display:inline-block;border:1.5px solid var(--brown);color:var(--brown);border-radius:6px;padding:2px 12px;font-size:12px;font-weight:700;letter-spacing:.04em">${copyLabel(i)}</span></div>`;
  const twoCopies = (html) => `${copyBadge(0)}${html}<div style="page-break-after:always"></div>${copyBadge(1)}${html}`;

  window.printDoc = async function (key, id) {
    const D = DOCS[key];
    const doc = await q(sb.from(D.table).select(`*, ${D.party}s(name,name_en,phone,email,address,cr_number,contact_person)`).eq('id', id).single());
    const items = await q(sb.from(D.items).select('*').eq(D.fk, id).order('sort'));
    const p = doc[D.party + 's'] || {};
    const isJob = key === 'job_orders', isInv = key === 'invoices';
    let extra = '';
    if (isInv) {
      const rc = await q(sb.from('receipts').select('number,date,amount,method,reference').eq('invoice_id', id).order('date'));
      if (doc.job_order_id) { const j = await q(sb.from('job_orders').select('number').eq('id', doc.job_order_id).single()); extra += `<div><b>${T('job_order')}</b><span class="mono">${esc(j.number)}</span></div>`; }
      if (rc.length) extra += `<div style="grid-column:1/-1"><b>${T('receipts')}</b>${rc.map(r => `<span class="mono">${esc(r.number)}</span> ${fmtD(r.date)} — ${fmt(r.amount)} (${T(r.method)}${r.reference ? ' ' + esc(r.reference) : ''})`).join(' · ')}</div>`;
    }
    const specs = isJob ? [['size', doc.size], ['paper', doc.paper], ['colors', doc.colors], ['sides', doc.sides], ['finishing', doc.finishing], ['quantity', doc.quantity]].filter(x => x[1]).map(x => `<div><b>${T(x[0])}</b>${esc(x[1])}</div>`).join('') : '';
    const total = doc.total ?? doc.sale_total ?? 0;
    const body = `${docHeader(D.printTitle, doc.number)}
    <div class="meta">
      <div><b>${T(D.party)}</b>${esc(nm(p))}</div><div><b>${T('date')}</b>${fmtD(doc.date)}</div>
      ${p.contact_person ? `<div><b>${T('contact_person')}</b>${esc(p.contact_person)}</div>` : ''}${doc.due_date ? `<div><b>${T('due_date')}</b>${fmtD(doc.due_date)}</div>` : ''}
      ${p.phone ? `<div><b>${T('phone')}</b><span class="mono">${esc(p.phone)}</span></div>` : ''}${doc.valid_until ? `<div><b>${T('valid_until')}</b>${fmtD(doc.valid_until)}</div>` : ''}
      ${p.email ? `<div><b>${T('email')}</b><span class="mono">${esc(p.email)}</span></div>` : ''}${p.cr_number ? `<div><b>${T('cr_number')}</b>${esc(p.cr_number)}</div>` : ''}
      ${p.address ? `<div style="grid-column:1/-1"><b>${T('address')}</b>${esc(p.address)}</div>` : ''}
      <div style="grid-column:1/-1"><b>${T('subject')}</b>${esc(doc.subject || doc.title || doc.description || '')}</div>${specs}${extra}
      ${isInv ? `<div><b>${T('status')}</b>${T(doc.status === 'paid' ? 'paid_s' : doc.status)}</div>` : ''}
    </div>
    <table><thead><tr><th style="width:30px">#</th><th>${T('description')}</th><th>${T('specs')}</th><th class="num">${T('qty')}</th><th class="num">${T('unit_price')}</th><th class="num">${T('total')}</th></tr></thead><tbody>${items.map((it, i) => `<tr><td>${i + 1}</td><td>${esc(it.description)}</td><td>${esc(it.specs || '')}</td><td class="num">${Number(it.qty).toLocaleString()}</td><td class="num">${fmt(it.unit_price)}</td><td class="num">${fmt(it.total)}</td></tr>`).join('')}</tbody></table>
    <table class="tot"><tr><td>${T('subtotal')}</td><td class="num">${fmt(doc.subtotal ?? total)}</td></tr>${doc.discount ? `<tr><td>${T('discount')}</td><td class="num">-${fmt(doc.discount)}</td></tr>` : ''}<tr class="g"><td>${T('total')} (${T('kwd')})</td><td class="num">${fmt(total)}</td></tr>${doc.paid ? `<tr><td>${T('paid')}</td><td class="num">${fmt(doc.paid)}</td></tr><tr><td>${T('balance')}</td><td class="num">${fmt(total - doc.paid)}</td></tr>` : ''}</table>
    ${doc.status === 'paid' ? `<div class="stamp">${T('paid_s')}</div>` : ''}
    ${doc.notes ? `<p style="margin-top:10px"><b>${T('notes')}:</b> ${esc(doc.notes)}</p>` : ''}
    <div class="sig"><div>${isAr() ? 'المستلم' : 'Received by'}</div><div>${esc(isAr() ? COMPANY.name_ar : COMPANY.name_en)}</div></div>${docFooter()}`;
    printHTML(isInv ? twoCopies(body) : body);
  };

  window.printReceipt = async function (id) {
    const r = await q(sb.from('receipts').select('*, customers(name,name_en,phone), invoices(number,total,paid)').eq('id', id).single());
    const body = `${docHeader('receipt', r.number)}<div class="meta"><div><b>${T('date')}</b>${fmtD(r.date)}</div><div><b>${T('method')}</b>${T(r.method)} ${r.reference ? '— ' + esc(r.reference) : ''}</div></div>
     <table><tr><td style="width:30%"><b>${T('received_from')}</b></td><td>${esc(nm(r.customers))} ${r.customers?.phone ? '<span class="mono">' + esc(r.customers.phone) + '</span>' : ''}</td></tr><tr><td><b>${T('the_sum_of')}</b></td><td><b>${fmt(r.amount)} ${T('kwd')}</b></td></tr><tr><td><b>${T('for')}</b></td><td>${r.invoices ? T('invoice') + ' <span class="mono">' + esc(r.invoices.number) + '</span> — ' + T('balance') + ': ' + fmt(r.invoices.total - r.invoices.paid) : T('deposit')} ${esc(r.notes || '')}</td></tr></table>
     <div class="sig"><div>${T('received_by')}</div><div>${T('signature')}</div></div>${docFooter()}`;
    printHTML(twoCopies(body));
  };
})();
