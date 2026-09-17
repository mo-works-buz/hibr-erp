/* ============================================================
   HIBR PRESS ERP — مطبعة حبر — front-end (vanilla JS + Supabase)
   ============================================================ */
const sb = supabase.createClient(HIBR_CONFIG.supabaseUrl, HIBR_CONFIG.supabaseKey);
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const root = $('#root');
const LOGO = 'data:image/jpeg;base64,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';
let LANG = localStorage.getItem('hibr_lang') || 'ar';
let USER = null, PROFILE = null, COMPANY = {};
const cache = {};

/* ---------------- i18n ---------------- */
const I18N = {
  ar: {
    app: 'مطبعة حبر', sub: 'النظام المحاسبي', dashboard: 'لوحة التحكم', sales: 'المبيعات', customers: 'العملاء', quotations: 'عروض الأسعار', job_orders: 'أوامر الشغل', invoices: 'الفواتير', receipts: 'سندات القبض', contracts: 'العقود',
    purchases: 'المشتريات', suppliers: 'الموردين', bills: 'فواتير الموردين', supplier_payments: 'سندات الصرف', expenses: 'المصاريف', inventory: 'المخزون', items: 'الأصناف والخدمات', stock_moves: 'حركات المخزون',
    hr: 'الموظفين والرواتب', employees: 'الموظفين', advances: 'السلف', leaves: 'الإجازات', payroll: 'الرواتب', accounting: 'المحاسبة', journal: 'القيود اليومية', accounts: 'دليل الحسابات', assets: 'الأصول الثابتة', reports: 'التقارير',
    settings: 'الإعدادات', company: 'بيانات الشركة', users: 'المستخدمين', reminders: 'التنبيهات', logout: 'خروج', add: 'إضافة', edit: 'تعديل', delete: 'حذف', save: 'حفظ', cancel: 'إلغاء', close: 'إغلاق', print: 'طباعة', search: 'بحث...', actions: 'إجراءات', confirm_delete: 'هل أنت متأكد من الحذف؟', saved: 'تم الحفظ', deleted: 'تم الحذف', error: 'خطأ', none: 'لا توجد بيانات', total: 'الإجمالي', subtotal: 'المجموع', discount: 'الخصم', paid: 'المدفوع', balance: 'المتبقي', date: 'التاريخ', due_date: 'تاريخ الاستحقاق', status: 'الحالة', number: 'الرقم', customer: 'العميل', supplier: 'المورد', description: 'الوصف', specs: 'المواصفات', qty: 'الكمية', unit_price: 'سعر الوحدة', amount: 'المبلغ', method: 'طريقة الدفع', reference: 'المرجع', notes: 'ملاحظات', name: 'الاسم', name_en: 'الاسم بالإنجليزي', phone: 'الهاتف', email: 'البريد', address: 'العنوان', contact_person: 'الشخص المسؤول', cr_number: 'السجل التجاري', payment_terms_days: 'مدة السداد (يوم)', credit_limit: 'حد الائتمان', active: 'نشط', type: 'النوع', category: 'التصنيف',
    cash: 'نقدي', bank: 'تحويل بنكي', knet: 'كي نت', cheque: 'شيك', other: 'أخرى', kwd: 'د.ك', login: 'تسجيل الدخول', signup: 'إنشاء حساب', password: 'كلمة المرور', full_name: 'الاسم الكامل', forgot: 'نسيت كلمة المرور؟', inactive_user: 'حسابك غير مفعّل — تواصل مع المدير لتفعيله.', welcome: 'أهلاً', role: 'الصلاحية', manager: 'مدير', accountant: 'محاسب', staff: 'موظف', company_name: 'اسم الشركة', invoice_terms: 'شروط الفاتورة', bank_name: 'البنك', iban: 'IBAN', licence: 'ترخيص', add_item: 'إضافة بند', subject: 'الموضوع', valid_until: 'صالح حتى', title: 'العنوان', size: 'المقاس', paper: 'الورق', colors: 'الألوان', sides: 'الوجوه', finishing: 'التشطيب', quantity: 'الكمية', assigned_to: 'المسؤول', costs: 'التكاليف', cost_type: 'نوع التكلفة', unit_cost: 'تكلفة الوحدة', profit: 'الربح', margin: 'الهامش', revenue: 'الإيراد', cost: 'التكلفة', convert_to_job: 'تحويل لأمر شغل', create_invoice: 'إنشاء فاتورة', add_receipt: 'تسجيل دفعة', issue: 'إصدار', kind: 'النوع', deposit: 'عربون / دفعة مقدمة', against_invoice: 'سداد فاتورة', invoice: 'فاتورة', start_date: 'بداية العقد', end_date: 'نهاية العقد', billing_cycle: 'دورة الفوترة', monthly: 'شهري', quarterly: 'ربع سنوي', yearly: 'سنوي', one_time: 'مرة واحدة', next_invoice_date: 'تاريخ الفاتورة القادمة', auto_invoice: 'فوترة تلقائية', generate_invoice: 'إصدار فاتورة العقد', terms: 'الشروط', attachments: 'المرفقات', upload: 'رفع ملف', sku: 'الكود', unit: 'الوحدة', sale_price: 'سعر البيع', cost_price: 'سعر التكلفة', qty_on_hand: 'الرصيد', reorder_level: 'حد إعادة الطلب', service: 'خدمة', material: 'خامة', product: 'منتج', reason: 'السبب', in: 'وارد', out: 'صادر',
    nationality: 'الجنسية', civil_id: 'الرقم المدني', passport_no: 'رقم الجواز', job_title: 'الوظيفة', hire_date: 'تاريخ التعيين', termination_date: 'تاريخ انتهاء الخدمة', basic_salary: 'الراتب الأساسي', allowances: 'البدلات', residency_no: 'رقم الإقامة', residency_expiry: 'انتهاء الإقامة', health_insurance_expiry: 'انتهاء التأمين الصحي', annual_leave_days: 'رصيد الإجازة السنوية', eosb: 'مكافأة نهاية الخدمة (تقديرية)', monthly_deduction: 'الاستقطاع الشهري', remaining: 'المتبقي', employee: 'الموظف', annual: 'سنوية', sick: 'مرضية', unpaid: 'بدون راتب', emergency: 'طارئة', days: 'الأيام', approved: 'معتمدة', period: 'الشهر', generate_payroll: 'تجهيز مسير الرواتب', pay_payroll: 'اعتماد وصرف الرواتب', overtime: 'إضافي', bonus: 'مكافأة', unpaid_leave_deduction: 'خصم إجازة بدون راتب', advance_deduction: 'استقطاع سلفة', other_deduction: 'خصومات أخرى', gross: 'الإجمالي', deductions: 'الخصومات', net: 'الصافي', payslip: 'قسيمة راتب', draft: 'مسودة', paid_s: 'مصروف', issued: 'صادرة', partial: 'مدفوعة جزئياً', overdue: 'متأخرة', cancelled: 'ملغاة', sent: 'مرسل', accepted: 'مقبول', rejected: 'مرفوض', expired: 'منتهي', converted: 'محوّل', open: 'مفتوحة', new: 'جديد', design: 'تصميم', proof_approved: 'اعتماد البروفة', printing: 'طباعة', finishing_s: 'تشطيب', ready: 'جاهز', delivered: 'تم التسليم', on_leave: 'إجازة', terminated: 'منتهي الخدمة',
    pnl: 'قائمة الدخل', balance_sheet: 'الميزانية العمومية', cashflow: 'التدفق النقدي', trial_balance: 'ميزان المراجعة', customer_statement: 'كشف حساب عميل', ar_aging: 'أعمار الذمم', job_profit: 'ربحية أوامر الشغل', supplier_balances: 'أرصدة الموردين', expenses_by_cat: 'المصاريف حسب التصنيف', from: 'من', to: 'إلى', run: 'عرض', account: 'الحساب', debit: 'مدين', credit: 'دائن', memo: 'البيان', income: 'الإيرادات', expense: 'المصروفات', net_profit: 'صافي الربح', asset: 'الأصول', liability: 'الالتزامات', equity: 'حقوق الملكية', purchase_date: 'تاريخ الشراء', salvage: 'القيمة التخريدية', useful_life_years: 'العمر الإنتاجي (سنوات)', run_depreciation: 'تسجيل إهلاك الشهر', serial_no: 'الرقم التسلسلي', location: 'الموقع', receivables: 'ذمم العملاء', payables: 'ذمم الموردين', month_sales: 'مبيعات الشهر', month_expenses: 'مصاريف الشهر', open_jobs: 'أوامر شغل مفتوحة', overdue_invoices: 'فواتير متأخرة', cash_balance: 'النقدية', sales_12m: 'المبيعات والمصاريف — 12 شهر', alerts: 'تنبيهات', contracts_due: 'عقود مستحقة الفوترة', due: 'الاستحقاق', done: 'منجز', add_user: 'إضافة مستخدم مسموح', allowed_note: 'أضف بريد الموظف هنا أولاً ثم يسجّل حسابه من صفحة الدخول.', current: 'حالي', d30: '1-30 يوم', d60: '31-60', d90: '61-90', over90: '+90', print_statement: 'طباعة الكشف', language: 'English', receipt: 'سند قبض', payment_voucher: 'سند صرف', received_from: 'استلمنا من', paid_to: 'دفعنا إلى', the_sum_of: 'مبلغ وقدره', for: 'وذلك عن', signature: 'التوقيع', received_by: 'المستلم', quotation: 'عرض سعر', job_order: 'أمر شغل', tax_note: 'الكويت — لا تطبق ضريبة القيمة المضافة', thanks: 'شكراً لتعاملكم معنا', bill_to: 'الفاتورة إلى', ship_to: 'تسليم', general: 'عام', add_cost: 'إضافة تكلفة', labor: 'عمالة', machine: 'ماكينة', outsourcing: 'شغل خارجي', ink: 'حبر', paper_c: 'ورق', filter_status: 'كل الحالات', all: 'الكل', supplier_ref: 'رقم فاتورة المورد', expense_account: 'حساب المصروف', job: 'أمر الشغل', add_to_stock: 'إضافة للمخزون', export: 'تصدير Excel', sign_out_confirm: 'تسجيل الخروج؟', code: 'الكود', view: 'عرض', mark_done: 'إنهاء', year: 'السنة', month: 'الشهر', no_employees: 'لا يوجد موظفين نشطين', payroll_paid: 'تم صرف الرواتب وقيدها', dep_done: 'تم تسجيل الإهلاك', min_pass: 'كلمة المرور 6 أحرف على الأقل', check_email: 'تم إرسال رابط إعادة التعيين إلى بريدك', capital: 'رأس المال', opening: 'رصيد افتتاحي', add_journal: 'قيد يدوي', lines: 'البنود', add_line: 'إضافة سطر', not_balanced: 'القيد غير متوازن', ok: 'تم'
  },
  en: {
    app: 'Hibr Press', sub: 'Accounting System', dashboard: 'Dashboard', sales: 'Sales', customers: 'Customers', quotations: 'Quotations', job_orders: 'Job Orders', invoices: 'Invoices', receipts: 'Receipts', contracts: 'Contracts', purchases: 'Purchases', suppliers: 'Suppliers', bills: 'Supplier Bills', supplier_payments: 'Supplier Payments', expenses: 'Expenses', inventory: 'Inventory', items: 'Items & Services', stock_moves: 'Stock Moves', hr: 'HR & Payroll', employees: 'Employees', advances: 'Advances', leaves: 'Leaves', payroll: 'Payroll', accounting: 'Accounting', journal: 'Journal', accounts: 'Chart of Accounts', assets: 'Fixed Assets', reports: 'Reports', settings: 'Settings', company: 'Company', users: 'Users', reminders: 'Reminders', logout: 'Logout', add: 'Add', edit: 'Edit', delete: 'Delete', save: 'Save', cancel: 'Cancel', close: 'Close', print: 'Print', search: 'Search...', actions: 'Actions', confirm_delete: 'Delete this record?', saved: 'Saved', deleted: 'Deleted', error: 'Error', none: 'No data', total: 'Total', subtotal: 'Subtotal', discount: 'Discount', paid: 'Paid', balance: 'Balance', date: 'Date', due_date: 'Due date', status: 'Status', number: 'No.', customer: 'Customer', supplier: 'Supplier', description: 'Description', specs: 'Specs', qty: 'Qty', unit_price: 'Unit price', amount: 'Amount', method: 'Method', reference: 'Reference', notes: 'Notes', name: 'Name', name_en: 'Name (EN)', phone: 'Phone', email: 'Email', address: 'Address', contact_person: 'Contact person', cr_number: 'CR number', payment_terms_days: 'Payment terms (days)', credit_limit: 'Credit limit', active: 'Active', type: 'Type', category: 'Category', cash: 'Cash', bank: 'Bank transfer', knet: 'K-Net', cheque: 'Cheque', other: 'Other', kwd: 'KWD', login: 'Sign in', signup: 'Create account', password: 'Password', full_name: 'Full name', forgot: 'Forgot password?', inactive_user: 'Your account is not active — ask the manager to activate it.', welcome: 'Welcome', role: 'Role', manager: 'Manager', accountant: 'Accountant', staff: 'Staff', company_name: 'Company name', invoice_terms: 'Invoice terms', bank_name: 'Bank', iban: 'IBAN', licence: 'Licence', add_item: 'Add line', subject: 'Subject', valid_until: 'Valid until', title: 'Title', size: 'Size', paper: 'Paper', colors: 'Colors', sides: 'Sides', finishing: 'Finishing', quantity: 'Quantity', assigned_to: 'Assigned to', costs: 'Costs', cost_type: 'Cost type', unit_cost: 'Unit cost', profit: 'Profit', margin: 'Margin', revenue: 'Revenue', cost: 'Cost', convert_to_job: 'Convert to job order', create_invoice: 'Create invoice', add_receipt: 'Record payment', issue: 'Issue', kind: 'Kind', deposit: 'Deposit / advance', against_invoice: 'Invoice payment', invoice: 'Invoice', start_date: 'Start', end_date: 'End', billing_cycle: 'Billing cycle', monthly: 'Monthly', quarterly: 'Quarterly', yearly: 'Yearly', one_time: 'One time', next_invoice_date: 'Next invoice date', auto_invoice: 'Auto invoice', generate_invoice: 'Generate contract invoice', terms: 'Terms', attachments: 'Attachments', upload: 'Upload', sku: 'SKU', unit: 'Unit', sale_price: 'Sale price', cost_price: 'Cost price', qty_on_hand: 'On hand', reorder_level: 'Reorder level', service: 'Service', material: 'Material', product: 'Product', reason: 'Reason', in: 'In', out: 'Out', nationality: 'Nationality', civil_id: 'Civil ID', passport_no: 'Passport', job_title: 'Job title', hire_date: 'Hire date', termination_date: 'Termination date', basic_salary: 'Basic salary', allowances: 'Allowances', residency_no: 'Residency no.', residency_expiry: 'Residency expiry', health_insurance_expiry: 'Health insurance expiry', annual_leave_days: 'Annual leave days', eosb: 'End of service (estimate)', monthly_deduction: 'Monthly deduction', remaining: 'Remaining', employee: 'Employee', annual: 'Annual', sick: 'Sick', unpaid: 'Unpaid', emergency: 'Emergency', days: 'Days', approved: 'Approved', period: 'Month', generate_payroll: 'Generate payroll', pay_payroll: 'Approve & pay', overtime: 'Overtime', bonus: 'Bonus', unpaid_leave_deduction: 'Unpaid leave', advance_deduction: 'Advance', other_deduction: 'Other deductions', gross: 'Gross', deductions: 'Deductions', net: 'Net', payslip: 'Payslip', draft: 'Draft', paid_s: 'Paid', issued: 'Issued', partial: 'Partial', overdue: 'Overdue', cancelled: 'Cancelled', sent: 'Sent', accepted: 'Accepted', rejected: 'Rejected', expired: 'Expired', converted: 'Converted', open: 'Open', new: 'New', design: 'Design', proof_approved: 'Proof approved', printing: 'Printing', finishing_s: 'Finishing', ready: 'Ready', delivered: 'Delivered', on_leave: 'On leave', terminated: 'Terminated', pnl: 'Profit & Loss', balance_sheet: 'Balance Sheet', cashflow: 'Cash Flow', trial_balance: 'Trial Balance', customer_statement: 'Customer Statement', ar_aging: 'AR Aging', job_profit: 'Job Profitability', supplier_balances: 'Supplier Balances', expenses_by_cat: 'Expenses by Category', from: 'From', to: 'To', run: 'Run', account: 'Account', debit: 'Debit', credit: 'Credit', memo: 'Memo', income: 'Income', expense: 'Expenses', net_profit: 'Net profit', asset: 'Assets', liability: 'Liabilities', equity: 'Equity', purchase_date: 'Purchase date', salvage: 'Salvage value', useful_life_years: 'Useful life (years)', run_depreciation: 'Post monthly depreciation', serial_no: 'Serial no.', location: 'Location', receivables: 'Receivables', payables: 'Payables', month_sales: 'Sales this month', month_expenses: 'Expenses this month', open_jobs: 'Open jobs', overdue_invoices: 'Overdue invoices', cash_balance: 'Cash & bank', sales_12m: 'Sales vs expenses — 12 months', alerts: 'Alerts', contracts_due: 'Contracts due for invoicing', due: 'Due', done: 'Done', add_user: 'Add allowed user', allowed_note: 'Add the employee email here first, then they sign up from the login page.', current: 'Current', d30: '1-30 days', d60: '31-60', d90: '61-90', over90: '90+', print_statement: 'Print statement', language: 'عربي', receipt: 'Receipt Voucher', payment_voucher: 'Payment Voucher', received_from: 'Received from', paid_to: 'Paid to', the_sum_of: 'The sum of', for: 'Being', signature: 'Signature', received_by: 'Received by', quotation: 'Quotation', job_order: 'Job Order', tax_note: 'Kuwait — no VAT applicable', thanks: 'Thank you for your business', bill_to: 'Bill to', ship_to: 'Deliver to', general: 'General', add_cost: 'Add cost', labor: 'Labor', machine: 'Machine', outsourcing: 'Outsourcing', ink: 'Ink', paper_c: 'Paper', filter_status: 'All statuses', all: 'All', supplier_ref: 'Supplier invoice no.', expense_account: 'Expense account', job: 'Job order', add_to_stock: 'Add to stock', export: 'Export Excel', sign_out_confirm: 'Sign out?', code: 'Code', view: 'View', mark_done: 'Mark done', year: 'Year', month: 'Month', no_employees: 'No active employees', payroll_paid: 'Payroll paid and posted', dep_done: 'Depreciation posted', min_pass: 'Password must be at least 6 characters', check_email: 'Reset link sent to your email', capital: 'Capital', opening: 'Opening balance', add_journal: 'Manual entry', lines: 'Lines', add_line: 'Add line', not_balanced: 'Entry not balanced', ok: 'OK'
  }
};
const T = k => (I18N[LANG][k] ?? I18N.en[k] ?? k);
const isAr = () => LANG === 'ar';

/* ---------------- utils ---------------- */
const fmt = n => (Number(n || 0)).toLocaleString('en-US', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
const fmtD = d => d ? String(d).slice(0, 10).split('-').reverse().join('/') : '';
const today = () => new Date().toISOString().slice(0, 10);
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Math.random().toString(36).slice(2, 9);
function toast(msg, bad) { const t = $('#toast'); t.textContent = msg; t.className = bad ? 'bad' : ''; t.style.display = 'block'; clearTimeout(t._t); t._t = setTimeout(() => t.style.display = 'none', bad ? 5000 : 2500); }
function err(e) { console.error(e); toast((e?.message || e) + '', true); }
const badgeCls = s => ({ paid: 'ok', delivered: 'ok', accepted: 'ok', active: 'ok', ready: 'ok', approved: 'ok', issued: 'info', open: 'info', sent: 'info', printing: 'info', partial: 'warn', overdue: 'bad', cancelled: 'bad', rejected: 'bad', expired: 'bad', terminated: 'bad', draft: '', new: '' }[s] || '');
const statusBadge = s => `<span class="badge ${badgeCls(s)}">${esc(T(s === 'paid' ? 'paid_s' : s === 'finishing' ? 'finishing_s' : s))}</span>`;

/* ---------------- data helpers ---------------- */
async function q(p) { const { data, error } = await p; if (error) throw error; return data; }
async function loadCache(name, force) {
  if (cache[name] && !force) return cache[name];
  const map = {
    customers: () => sb.from('customers').select('id,name,name_en,phone,payment_terms_days').order('name'),
    suppliers: () => sb.from('suppliers').select('id,name,name_en').order('name'),
    items: () => sb.from('items').select('id,name,name_en,sale_price,cost_price,unit,kind,income_account').eq('active', true).order('name'),
    employees: () => sb.from('employees').select('id,name,name_en,basic_salary,allowances,hire_date,status').order('name'),
    accounts: () => sb.from('accounts').select('code,name_ar,name_en,type,is_header').eq('active', true).order('code'),
    expense_categories: () => sb.from('expense_categories').select('*').order('id'),
    profiles: () => sb.from('profiles').select('id,full_name,email,role,active'),
    contracts: () => sb.from('contracts').select('id,title,number,customer_id').order('title'),
    invoices_open: () => sb.from('invoices').select('id,number,customer_id,total,paid,status').in('status', ['issued', 'partial', 'overdue']).order('date', { ascending: false }),
    bills_open: () => sb.from('bills').select('id,number,supplier_id,total,paid,status').in('status', ['open', 'partial']).order('date', { ascending: false }),
    job_orders: () => sb.from('job_orders').select('id,number,title,customer_id').order('date', { ascending: false }).limit(300),
  };
  cache[name] = await q(map[name]()); return cache[name];
}
const nm = (row, k = 'name') => row ? ((!isAr() && row[k + '_en']) ? row[k + '_en'] : (row[k] ?? row.name_ar ?? row.name_en ?? '')) : '';
const accName = a => a ? `${a.code} — ${isAr() ? a.name_ar : a.name_en}` : '';
function lookupName(list, id, key = 'id') { const r = (cache[list] || []).find(x => x[key] === id); return r ? (r.title || r.number || nm(r)) : ''; }
async function rpc(fn, args) { return q(sb.rpc(fn, args || {})); }

/* ---------------- UI primitives ---------------- */
function modal(html, opts = {}) {
  const bg = document.createElement('div'); bg.className = 'modal-bg';
  bg.innerHTML = `<div class="modal ${opts.sm ? 'sm' : ''}">${html}</div>`;
  document.body.appendChild(bg);
  bg.addEventListener('click', e => { if (e.target === bg && !opts.locked) bg.remove(); });
  bg.close = () => bg.remove();
  $$('.close-modal', bg).forEach(b => b.onclick = bg.close);
  return bg;
}
function confirmDlg(msg) { return new Promise(res => { const m = modal(`<h2>${esc(msg)}</h2><div class="actions"><button class="btn sec close-modal">${T('cancel')}</button><button class="btn danger" id="yes">${T('ok')}</button></div>`, { sm: true }); $('#yes', m).onclick = () => { m.close(); res(true); }; m.addEventListener('click', e => { if (e.target === m) res(false); }); }); }
function field(f, val) {
  const v = val ?? f.default ?? '';
  const req = f.required ? 'required' : '';
  const cls = f.full ? 'full' : '';
  let inp = '';
  if (f.type === 'select') inp = `<select class="in" name="${f.key}" ${req}>${(f.options || []).map(o => `<option value="${esc(o.v)}" ${String(o.v) === String(v) ? 'selected' : ''}>${esc(o.l)}</option>`).join('')}</select>`;
  else if (f.type === 'lookup') { const list = cache[f.lookup] || []; inp = `<select class="in" name="${f.key}" ${req}><option value="">—</option>${list.map(o => `<option value="${o[f.lookupKey || 'id']}" ${String(o[f.lookupKey || 'id']) === String(v) ? 'selected' : ''}>${esc(f.lookupLabel ? f.lookupLabel(o) : (o.title || o.number || nm(o)))}</option>`).join('')}</select>`; }
  else if (f.type === 'textarea') inp = `<textarea class="in" name="${f.key}">${esc(v)}</textarea>`;
  else if (f.type === 'bool') return `<div class="chk ${cls}"><input type="checkbox" name="${f.key}" id="f_${f.key}" ${v === true || v === 'true' ? 'checked' : ''}><label for="f_${f.key}">${esc(T(f.label || f.key))}</label></div>`;
  else inp = `<input class="in" type="${f.type || 'text'}" name="${f.key}" value="${esc(v)}" ${req} ${f.type === 'number' ? 'step="0.001"' : ''} ${f.readonly ? 'readonly' : ''}>`;
  return `<div class="${cls}"><label class="f">${esc(T(f.label || f.key))}${f.required ? ' *' : ''}</label>${inp}</div>`;
}
function readForm(formEl, fields) {
  const o = {};
  for (const f of fields) {
    const el = formEl.querySelector(`[name="${f.key}"]`); if (!el) continue;
    if (f.type === 'bool') o[f.key] = el.checked;
    else if (f.type === 'number') o[f.key] = el.value === '' ? (f.nullable ? null : 0) : Number(el.value);
    else o[f.key] = el.value === '' ? null : el.value;
  }
  return o;
}
function table(cols, rows, opts = {}) {
  if (!rows.length) return `<div class="empty">${T('none')}</div>`;
  return `<div class="tbl-wrap"><table><thead><tr>${cols.map(c => `<th class="${c.num ? 'num' : ''}">${esc(c.l)}</th>`).join('')}${opts.actions ? `<th></th>` : ''}</tr></thead><tbody>${rows.map(r => `<tr class="${opts.onRow ? 'clickable' : ''}" data-id="${r.id ?? ''}">${cols.map(c => `<td class="${c.num ? 'num' : ''}">${c.f ? c.f(r) : esc(r[c.k] ?? '')}</td>`).join('')}${opts.actions ? `<td class="num">${opts.actions(r)}</td>` : ''}</tr>`).join('')}</tbody>${opts.foot ? `<tfoot>${opts.foot}</tfoot>` : ''}</table></div>`;
}
function exportCSV(cols, rows, name) {
  const lines = [cols.map(c => c.l).join(',')].concat(rows.map(r => cols.map(c => `"${String(c.f ? c.f(r).replace(/<[^>]+>/g, '') : (r[c.k] ?? '')).replace(/"/g, '""')}"`).join(',')));
  const blob = new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name + '.csv'; a.click();
}
function printHTML(html) { $('#printArea').innerHTML = `<div class="doc" dir="${isAr() ? 'rtl' : 'ltr'}">${html}</div>`; setTimeout(() => window.print(), 200); }
function docHeader(titleKey, number) {
  const c = COMPANY;
  return `<div class="hd"><div><img src="${LOGO}"><div style="margin-top:6px"><h2>${esc(T(titleKey))} <span class="mono" style="font-size:15px">${esc(number || '')}</span></h2></div></div>
  <div class="co"><b>${esc(isAr() ? c.name_ar : c.name_en)}</b>${esc(isAr() ? c.name_en : c.name_ar)}<br>${esc(isAr() ? c.address_ar : c.address_en)}<br>${T('cr_number')}: ${esc(c.cr)} · ${T('licence')}: ${esc(c.moi_licence)}<br>${esc(c.phone || '')} ${c.email ? '· ' + esc(c.email) : ''}</div></div>`;
}
function docFooter() { const c = COMPANY; return `<div class="ft"><div>${esc(isAr() ? (c.invoice_terms_ar || '') : (c.invoice_terms_en || ''))}<br>${T('tax_note')}</div><div style="text-align:end">${c.bank_name ? `${T('bank_name')}: ${esc(c.bank_name)}<br>IBAN: <span class="mono">${esc(c.iban || '')}</span>` : ''}<br>${T('thanks')}</div></div>`; }

/* ---------------- attachments ---------------- */
async function attachmentsPanel(refType, refId) {
  if (!refId) return '';
  const list = await q(sb.from('attachments').select('*').eq('ref_type', refType).eq('ref_id', refId).order('created_at'));
  return `<div class="full card" id="attBox"><h3>${T('attachments')}</h3>
    <div>${list.map(a => `<div class="row"><a href="#" class="link att-open" data-path="${esc(a.storage_path)}">${esc(a.file_name)}</a> <span class="muted">${(a.size / 1024).toFixed(0)} KB</span> <button class="btn sm danger att-del" data-id="${a.id}" data-path="${esc(a.storage_path)}">✕</button></div>`).join('') || `<span class="muted">${T('none')}</span>`}</div>
    <div class="row" style="margin-top:8px"><input type="file" id="attFile" class="in" style="width:auto"><button class="btn sm sec" id="attUp">${T('upload')}</button></div></div>`;
}
function wireAttachments(container, refType, refId, refresh) {
  const up = $('#attUp', container); if (!up) return;
  up.onclick = async () => {
    const f = $('#attFile', container).files[0]; if (!f) return;
    try {
      const path = `${refType}/${refId}/${Date.now()}_${f.name.replace(/[^\w.\-؀-ۿ]/g, '_')}`;
      await q(sb.storage.from('attachments').upload(path, f));
      await q(sb.from('attachments').insert({ ref_type: refType, ref_id: refId, file_name: f.name, storage_path: path, mime: f.type, size: f.size }));
      toast(T('saved')); refresh();
    } catch (e) { err(e); }
  };
  $$('.att-open', container).forEach(a => a.onclick = async e => { e.preventDefault(); try { const d = await q(sb.storage.from('attachments').createSignedUrl(a.dataset.path, 600)); window.open(d.signedUrl, '_blank'); } catch (x) { err(x); } });
  $$('.att-del', container).forEach(b => b.onclick = async () => { if (!await confirmDlg(T('confirm_delete'))) return; try { await sb.storage.from('attachments').remove([b.dataset.path]); await q(sb.from('attachments').delete().eq('id', b.dataset.id)); refresh(); } catch (e) { err(e); } });
}

/* ---------------- generic CRUD module ---------------- */
async function crudPage(M) {
  const el = $('#page'); let rows = []; let search = ''; let filt = {};
  for (const c of (M.caches || [])) await loadCache(c);
  async function load() {
    let qq = sb.from(M.table).select(M.select || '*');
    if (M.order) qq = qq.order(M.order.col, { ascending: !!M.order.asc }); else qq = qq.order('created_at', { ascending: false });
    if (M.limit) qq = qq.limit(M.limit);
    rows = await q(qq); render();
  }
  function filtered() {
    let r = rows;
    if (search) { const s = search.toLowerCase(); r = r.filter(x => JSON.stringify(x).toLowerCase().includes(s) || (M.searchExtra && M.searchExtra(x).toLowerCase().includes(s))); }
    for (const [k, v] of Object.entries(filt)) if (v) r = r.filter(x => String(x[k]) === v);
    return r;
  }
  function render() {
    const fr = filtered();
    el.innerHTML = `<header class="top"><h1>${T(M.title)}</h1><div class="tools">
      ${M.filters ? M.filters.map(f => `<select class="in flt" data-k="${f.key}"><option value="">${esc(f.all || T('filter_status'))}</option>${f.options.map(o => `<option value="${o.v}" ${filt[f.key] === o.v ? 'selected' : ''}>${esc(o.l)}</option>`).join('')}</select>`).join('') : ''}
      <input class="in" id="srch" placeholder="${T('search')}" value="${esc(search)}" style="width:200px">
      <button class="btn sec" id="exp">${T('export')}</button>
      ${M.extraTools ? M.extraTools() : ''}
      ${M.readonly ? '' : `<button class="btn" id="addBtn">＋ ${T('add')}</button>`}</div></header>
      ${M.summary ? M.summary(fr) : ''}
      ${table(M.cols, fr, { onRow: true, actions: r => `${(M.rowActions ? M.rowActions(r) : '')}<button class="btn sm sec ed" data-id="${r.id}">${M.readonly ? T('view') : T('edit')}</button>${M.noDelete ? '' : `<button class="btn sm danger del" data-id="${r.id}">✕</button>`}` })}`;
    $('#srch').oninput = e => { search = e.target.value; render(); $('#srch').focus(); const v = $('#srch'); v.setSelectionRange(v.value.length, v.value.length); };
    $$('.flt').forEach(s => s.onchange = () => { filt[s.dataset.k] = s.value; render(); });
    $('#exp').onclick = () => exportCSV(M.cols, fr, M.title);
    if ($('#addBtn')) $('#addBtn').onclick = () => openForm(null);
    $$('.ed').forEach(b => b.onclick = e => { e.stopPropagation(); openForm(rows.find(r => r.id === b.dataset.id)); });
    $$('.del').forEach(b => b.onclick = async e => { e.stopPropagation(); if (!await confirmDlg(T('confirm_delete'))) return; try { await q(sb.from(M.table).delete().eq('id', b.dataset.id)); toast(T('deleted')); Object.keys(cache).forEach(k => { if ((M.caches || []).includes(k) || k === M.table) delete cache[k]; }); load(); } catch (x) { err(x); } });
    $$('tr.clickable').forEach(tr => tr.onclick = () => { const r = rows.find(x => x.id === tr.dataset.id); if (M.onRow) M.onRow(r, load); else openForm(r); });
    if (M.afterRender) M.afterRender(fr, load);
    if (M.extraToolsWire) M.extraToolsWire(load);
  }
  async function openForm(row) {
    if (M.customForm) return M.customForm(row, load);
    const fields = typeof M.fields === 'function' ? M.fields(row) : M.fields;
    const att = M.attachments && row ? await attachmentsPanel(M.attachments, row.id) : '';
    const m = modal(`<h2>${row ? T('edit') : T('add')} — ${T(M.title)} <button class="btn sm sec close-modal">✕</button></h2><form id="frm" class="form">${fields.map(f => field(f, row?.[f.key])).join('')}${att}${M.formExtra ? M.formExtra(row) : ''}</form>
      <div class="actions">${row && M.formActions ? M.formActions(row) : ''}<button class="btn sec close-modal">${T('cancel')}</button>${M.readonly ? '' : `<button class="btn" id="saveBtn">${T('save')}</button>`}</div>`);
    if (att) { const rw = async () => { $('#attBox', m).outerHTML = await attachmentsPanel(M.attachments, row.id); wireAttachments(m, M.attachments, row.id, rw); }; wireAttachments(m, M.attachments, row.id, rw); }
    if (M.formWire) M.formWire(m, row, load);
    if ($('#saveBtn', m)) $('#saveBtn', m).onclick = async () => {
      const frm = $('#frm', m); if (!frm.reportValidity()) return;
      let o = readForm(frm, fields); if (M.beforeSave) o = await M.beforeSave(o, row);
      try {
        if (row) await q(sb.from(M.table).update(o).eq('id', row.id));
        else { if (M.numberKind) o.number = await rpc('next_number', { p_kind: M.numberKind }); await q(sb.from(M.table).insert(o)); }
        toast(T('saved')); m.close(); Object.keys(cache).forEach(k => { if ((M.caches || []).includes(k) || k === M.table) delete cache[k]; }); load(); if (M.afterSave) M.afterSave();
      } catch (e) { err(e); }
    };
  }
  await load();
}
const METHOD_OPTS = () => ['cash', 'bank', 'knet', 'cheque', 'other'].map(v => ({ v, l: T(v) }));
const methodField = { key: 'method', type: 'select', options: METHOD_OPTS(), default: 'cash' };

/* ============================================================
   MODULE DEFINITIONS (simple CRUD)
   ============================================================ */
const MODULES = {};
MODULES.customers = () => ({
  title: 'customers', table: 'customers', order: { col: 'name', asc: true },
  cols: [{ l: T('name'), k: 'name' }, { l: T('phone'), k: 'phone' }, { l: T('contact_person'), k: 'contact_person' }, { l: T('type'), f: r => T(r.type) }, { l: T('payment_terms_days'), k: 'payment_terms_days', num: true }, { l: T('active'), f: r => r.active ? '✓' : '✕' }],
  fields: [{ key: 'name', required: true }, { key: 'name_en' }, { key: 'type', type: 'select', options: [{ v: 'company', l: isAr() ? 'شركة' : 'Company' }, { v: 'individual', l: isAr() ? 'فرد' : 'Individual' }, { v: 'government', l: isAr() ? 'جهة حكومية' : 'Government' }] }, { key: 'contact_person' }, { key: 'phone' }, { key: 'email', type: 'email' }, { key: 'cr_number' }, { key: 'payment_terms_days', type: 'number', default: 30 }, { key: 'credit_limit', type: 'number' }, { key: 'address', full: true }, { key: 'notes', type: 'textarea', full: true }, { key: 'active', type: 'bool', default: true }],
  formActions: r => `<button class="btn sec" onclick="showCustomerStatement('${r.id}')">${T('customer_statement')}</button>`,
  afterSave: () => delete cache.customers
});
MODULES.suppliers = () => ({
  title: 'suppliers', table: 'suppliers', order: { col: 'name', asc: true },
  cols: [{ l: T('name'), k: 'name' }, { l: T('category'), k: 'category' }, { l: T('phone'), k: 'phone' }, { l: T('contact_person'), k: 'contact_person' }, { l: T('payment_terms_days'), k: 'payment_terms_days', num: true }],
  fields: [{ key: 'name', required: true }, { key: 'name_en' }, { key: 'category' }, { key: 'contact_person' }, { key: 'phone' }, { key: 'email', type: 'email' }, { key: 'cr_number' }, { key: 'payment_terms_days', type: 'number', default: 30 }, { key: 'address', full: true }, { key: 'notes', type: 'textarea', full: true }, { key: 'active', type: 'bool', default: true }],
  afterSave: () => delete cache.suppliers
});
MODULES.items = () => ({
  title: 'items', table: 'items', order: { col: 'name', asc: true }, caches: ['accounts'],
  cols: [{ l: T('sku'), k: 'sku' }, { l: T('name'), k: 'name' }, { l: T('type'), f: r => T(r.kind) }, { l: T('unit'), k: 'unit' }, { l: T('sale_price'), f: r => fmt(r.sale_price), num: true }, { l: T('cost_price'), f: r => fmt(r.cost_price), num: true }, { l: T('qty_on_hand'), f: r => r.kind === 'service' ? '—' : `<span class="${r.qty_on_hand <= r.reorder_level && r.reorder_level > 0 ? 'badge bad' : ''}">${fmt(r.qty_on_hand)}</span>`, num: true }],
  fields: [{ key: 'sku' }, { key: 'name', required: true }, { key: 'name_en' }, { key: 'kind', type: 'select', options: ['service', 'material', 'product'].map(v => ({ v, l: T(v) })) }, { key: 'unit', default: 'pcs' }, { key: 'sale_price', type: 'number' }, { key: 'cost_price', type: 'number' }, { key: 'reorder_level', type: 'number' }, { key: 'income_account', type: 'lookup', lookup: 'accounts', lookupKey: 'code', lookupLabel: accName, default: '4100' }, { key: 'expense_account', type: 'lookup', lookup: 'accounts', lookupKey: 'code', lookupLabel: accName, default: '5100' }, { key: 'active', type: 'bool', default: true }],
  afterSave: () => delete cache.items
});
MODULES.stock_moves = () => ({
  title: 'stock_moves', table: 'stock_moves', caches: ['items'], order: { col: 'date' },
  cols: [{ l: T('date'), f: r => fmtD(r.date) }, { l: T('items'), f: r => esc(lookupName('items', r.item_id)) }, { l: T('qty'), f: r => `<span class="${r.qty < 0 ? 'badge bad' : 'badge ok'}">${fmt(r.qty)}</span>`, num: true }, { l: T('unit_cost'), f: r => fmt(r.unit_cost), num: true }, { l: T('reason'), k: 'reason' }],
  fields: [{ key: 'date', type: 'date', default: today(), required: true }, { key: 'item_id', label: 'items', type: 'lookup', lookup: 'items', required: true }, { key: 'qty', type: 'number', required: true }, { key: 'unit_cost', type: 'number' }, { key: 'reason', full: true }],
  afterSave: () => delete cache.items
});
MODULES.expenses = () => ({
  title: 'expenses', table: 'expenses', caches: ['expense_categories', 'suppliers', 'job_orders', 'accounts'], numberKind: 'expense', attachments: 'expense', order: { col: 'date' },
  filters: [{ key: 'category_id', all: T('category'), options: (cache.expense_categories || []).map(c => ({ v: String(c.id), l: isAr() ? c.name_ar : c.name_en })) }],
  cols: [{ l: T('number'), k: 'number' }, { l: T('date'), f: r => fmtD(r.date) }, { l: T('category'), f: r => { const c = (cache.expense_categories || []).find(x => x.id === r.category_id); return c ? esc(isAr() ? c.name_ar : c.name_en) : ''; } }, { l: T('description'), k: 'description' }, { l: T('supplier'), f: r => esc(lookupName('suppliers', r.supplier_id)) }, { l: T('method'), f: r => T(r.method) }, { l: T('amount'), f: r => fmt(r.amount), num: true }],
  summary: rows => `<div class="kpis"><div class="kpi"><div class="l">${T('total')}</div><div class="v">${fmt(rows.reduce((a, r) => a + Number(r.amount), 0))} <small>${T('kwd')}</small></div></div></div>`,
  fields: [{ key: 'date', type: 'date', default: today(), required: true }, { key: 'category_id', label: 'category', type: 'lookup', lookup: 'expense_categories', lookupLabel: c => isAr() ? c.name_ar : c.name_en, required: true }, { key: 'amount', type: 'number', required: true }, methodField, { key: 'supplier_id', label: 'supplier', type: 'lookup', lookup: 'suppliers' }, { key: 'job_order_id', label: 'job', type: 'lookup', lookup: 'job_orders', lookupLabel: j => `${j.number} — ${j.title}` }, { key: 'reference' }, { key: 'description', required: true, full: true }, { key: 'notes', type: 'textarea', full: true }],
  beforeSave: o => { o.category_id = o.category_id ? Number(o.category_id) : null; return o; }
});
MODULES.employees = () => ({
  title: 'employees', table: 'employees', order: { col: 'name', asc: true },
  cols: [{ l: T('code'), k: 'code' }, { l: T('name'), k: 'name' }, { l: T('job_title'), k: 'job_title' }, { l: T('nationality'), k: 'nationality' }, { l: T('hire_date'), f: r => fmtD(r.hire_date) }, { l: T('basic_salary'), f: r => fmt(Number(r.basic_salary) + Number(r.allowances || 0)), num: true }, { l: T('residency_expiry'), f: r => { const d = r.residency_expiry; const soon = d && (new Date(d) - new Date()) < 60 * 864e5; return `<span class="${soon ? 'badge bad' : ''}">${fmtD(d)}</span>`; } }, { l: T('status'), f: r => statusBadge(r.status) }],
  fields: [{ key: 'code' }, { key: 'name', required: true }, { key: 'name_en' }, { key: 'nationality' }, { key: 'civil_id' }, { key: 'passport_no' }, { key: 'job_title' }, { key: 'phone' }, { key: 'email', type: 'email' }, { key: 'hire_date', type: 'date', required: true }, { key: 'basic_salary', type: 'number', required: true }, { key: 'allowances', type: 'number' }, { key: 'residency_no' }, { key: 'residency_expiry', type: 'date' }, { key: 'health_insurance_expiry', type: 'date' }, { key: 'bank_name' }, { key: 'iban' }, { key: 'annual_leave_days', type: 'number', default: 30 }, { key: 'status', type: 'select', options: ['active', 'on_leave', 'terminated'].map(v => ({ v, l: T(v) })) }, { key: 'termination_date', type: 'date' }, { key: 'notes', type: 'textarea', full: true }],
  formExtra: r => r ? `<div class="full muted" id="eosbBox"></div>` : '',
  formWire: async (m, r) => { if (!r) return; try { const v = await rpc('eosb_estimate', { p_employee: r.id }); $('#eosbBox', m).innerHTML = `${T('eosb')}: <b>${fmt(v)} ${T('kwd')}</b> — ${isAr() ? 'حسب قانون العمل الكويتي 6/2010 (15 يوم/سنة لأول 5 سنوات ثم شهر/سنة، بحد أقصى راتب 18 شهر)' : 'per Kuwait Labour Law 6/2010 (15 days/yr first 5 yrs, then 30 days/yr, capped at 18 months)'}`; } catch (e) { } },
  attachments: 'employee', afterSave: () => delete cache.employees
});
MODULES.advances = () => ({
  title: 'advances', table: 'employee_advances', caches: ['employees'], order: { col: 'date' },
  cols: [{ l: T('date'), f: r => fmtD(r.date) }, { l: T('employee'), f: r => esc(lookupName('employees', r.employee_id)) }, { l: T('amount'), f: r => fmt(r.amount), num: true }, { l: T('monthly_deduction'), f: r => fmt(r.monthly_deduction), num: true }, { l: T('remaining'), f: r => fmt(r.remaining), num: true }, { l: T('method'), f: r => T(r.method) }],
  fields: [{ key: 'date', type: 'date', default: today(), required: true }, { key: 'employee_id', label: 'employee', type: 'lookup', lookup: 'employees', required: true }, { key: 'amount', type: 'number', required: true }, { key: 'monthly_deduction', type: 'number', required: true }, methodField, { key: 'notes', type: 'textarea', full: true }],
  beforeSave: (o, row) => { if (!row) o.remaining = o.amount; return o; }
});
MODULES.leaves = () => ({
  title: 'leaves', table: 'leaves', caches: ['employees'], order: { col: 'start_date' },
  cols: [{ l: T('employee'), f: r => esc(lookupName('employees', r.employee_id)) }, { l: T('type'), f: r => T(r.type) }, { l: T('start_date'), f: r => fmtD(r.start_date) }, { l: T('end_date'), f: r => fmtD(r.end_date) }, { l: T('days'), k: 'days', num: true }, { l: T('approved'), f: r => r.approved ? '✓' : '✕' }],
  fields: [{ key: 'employee_id', label: 'employee', type: 'lookup', lookup: 'employees', required: true }, { key: 'type', type: 'select', options: ['annual', 'sick', 'unpaid', 'emergency', 'other'].map(v => ({ v, l: T(v) })) }, { key: 'start_date', type: 'date', required: true }, { key: 'end_date', type: 'date', required: true }, { key: 'approved', type: 'bool', default: true }, { key: 'notes', type: 'textarea', full: true }]
});
MODULES.assets = () => ({
  title: 'assets', table: 'assets', caches: ['accounts', 'suppliers'], order: { col: 'purchase_date' },
  extraTools: () => `<button class="btn sec" id="depBtn">${T('run_depreciation')}</button>`,
  extraToolsWire: load => { $('#depBtn').onclick = async () => { const p = prompt(isAr() ? 'الشهر (YYYY-MM)' : 'Period (YYYY-MM)', today().slice(0, 7)); if (!p) return; try { const v = await rpc('run_depreciation', { p_period: p + '-01' }); toast(`${T('dep_done')}: ${fmt(v)}`); } catch (e) { err(e); } }; },
  cols: [{ l: T('name'), k: 'name' }, { l: T('account'), f: r => esc(accName((cache.accounts || []).find(a => a.code === r.account_code))) }, { l: T('purchase_date'), f: r => fmtD(r.purchase_date) }, { l: T('cost'), f: r => fmt(r.cost), num: true }, { l: T('useful_life_years'), k: 'useful_life_years', num: true }, { l: T('status'), f: r => statusBadge(r.status) }],
  fields: [{ key: 'name', required: true }, { key: 'name_en' }, { key: 'account_code', label: 'account', type: 'lookup', lookup: 'accounts', lookupKey: 'code', lookupLabel: accName, default: '1510', required: true }, { key: 'purchase_date', type: 'date', required: true, default: today() }, { key: 'cost', type: 'number', required: true }, { key: 'salvage', type: 'number' }, { key: 'useful_life_years', type: 'number', default: 5, required: true }, { key: 'supplier_id', label: 'supplier', type: 'lookup', lookup: 'suppliers' }, { key: 'serial_no' }, { key: 'location' }, { key: 'status', type: 'select', options: [{ v: 'active', l: T('active') }, { v: 'disposed', l: isAr() ? 'مستبعد' : 'Disposed' }] }, { key: 'notes', type: 'textarea', full: true }],
  attachments: 'asset'
});
MODULES.reminders = () => ({
  title: 'reminders', table: 'reminders', order: { col: 'due_date', asc: true },
  cols: [{ l: T('due'), f: r => fmtD(r.due_date) }, { l: T('title'), k: 'title' }, { l: T('kind'), k: 'kind' }, { l: T('done'), f: r => r.done ? '✓' : '' }],
  fields: [{ key: 'title', required: true, full: true }, { key: 'due_date', type: 'date', required: true }, { key: 'kind', type: 'select', options: [{ v: 'general', l: T('general') }, { v: 'licence', l: T('licence') }, { v: 'contract', l: T('contracts') }, { v: 'residency', l: T('residency_no') }] }, { key: 'done', type: 'bool' }, { key: 'notes', type: 'textarea', full: true }]
});
MODULES.accounts = () => ({
  title: 'accounts', table: 'accounts', order: { col: 'code', asc: true }, noDelete: true,
  cols: [{ l: T('code'), k: 'code' }, { l: T('name'), f: r => `${r.is_header ? '<b>' : '&nbsp;&nbsp;&nbsp;'}${esc(isAr() ? r.name_ar : r.name_en)}${r.is_header ? '</b>' : ''}` }, { l: T('type'), f: r => T(r.type) }],
  fields: [{ key: 'code', required: true }, { key: 'name_ar', label: 'name', required: true }, { key: 'name_en', required: true }, { key: 'type', type: 'select', options: ['asset', 'liability', 'equity', 'income', 'expense'].map(v => ({ v, l: T(v) })) }, { key: 'parent' }, { key: 'is_header', type: 'bool' }, { key: 'active', type: 'bool', default: true }],
  onRow: (r, load) => { if (!r.is_header) showLedger(r.code); },
  afterSave: () => delete cache.accounts
});
MODULES.journal = () => ({
  title: 'journal', table: 'journal_entries', select: '*, journal_lines(*)', order: { col: 'date' }, limit: 500, caches: ['accounts'], readonly: false, noDelete: false,
  extraTools: () => `<button class="btn sec" id="manualJE">${T('add_journal')}</button>`,
  extraToolsWire: load => { $('#manualJE').onclick = () => manualJournal(load); $('#addBtn')?.remove(); },
  cols: [{ l: T('number'), k: 'number' }, { l: T('date'), f: r => fmtD(r.date) }, { l: T('memo'), k: 'memo' }, { l: T('type'), k: 'source_type' }, { l: T('debit'), f: r => fmt(r.journal_lines.reduce((a, l) => a + Number(l.debit), 0)), num: true }],
  customForm: (r) => { if (!r) return manualJournal(); modal(`<h2>${esc(r.number)} — ${fmtD(r.date)} <button class="btn sm sec close-modal">✕</button></h2><p class="muted">${esc(r.memo || '')}</p>${table([{ l: T('account'), f: l => esc(accName((cache.accounts || []).find(a => a.code === l.account_code))) }, { l: T('description'), k: 'description' }, { l: T('debit'), f: l => fmt(l.debit), num: true }, { l: T('credit'), f: l => fmt(l.credit), num: true }], r.journal_lines)}`); }
});
async function manualJournal(reload) {
  await loadCache('accounts');
  const accs = cache.accounts.filter(a => !a.is_header);
  const lineRow = () => `<tr><td><select class="in acc">${accs.map(a => `<option value="${a.code}">${esc(accName(a))}</option>`).join('')}</select></td><td><input class="in desc"></td><td><input class="in dr" type="number" step="0.001" value="0"></td><td><input class="in cr" type="number" step="0.001" value="0"></td><td><button class="btn sm danger rm">✕</button></td></tr>`;
  const m = modal(`<h2>${T('add_journal')} <button class="btn sm sec close-modal">✕</button></h2><div class="form"><div><label class="f">${T('date')}</label><input class="in" type="date" id="jdate" value="${today()}"></div><div class="full"><label class="f">${T('memo')}</label><input class="in" id="jmemo"></div></div>
   <table class="items" style="margin-top:10px"><thead><tr><th>${T('account')}</th><th>${T('description')}</th><th class="num">${T('debit')}</th><th class="num">${T('credit')}</th><th></th></tr></thead><tbody id="jl">${lineRow()}${lineRow()}</tbody></table>
   <div class="row" style="margin-top:8px"><button class="btn sm sec" id="addL">＋ ${T('add_line')}</button><span class="grow"></span><b id="jt"></b></div>
   <div class="actions"><button class="btn sec close-modal">${T('cancel')}</button><button class="btn" id="jsave">${T('save')}</button></div>`);
  const recalc = () => { let d = 0, c = 0; $$('#jl tr', m).forEach(tr => { d += Number($('.dr', tr).value || 0); c += Number($('.cr', tr).value || 0); }); $('#jt', m).innerHTML = `${T('debit')} ${fmt(d)} / ${T('credit')} ${fmt(c)} ${Math.abs(d - c) > 0.0005 ? `<span class="badge bad">${T('not_balanced')}</span>` : '<span class="badge ok">✓</span>'}`; };
  m.addEventListener('input', recalc); m.addEventListener('click', e => { if (e.target.classList.contains('rm')) { e.target.closest('tr').remove(); recalc(); } });
  $('#addL', m).onclick = () => { $('#jl', m).insertAdjacentHTML('beforeend', lineRow()); };
  $('#jsave', m).onclick = async () => {
    const lines = $$('#jl tr', m).map(tr => ({ account: $('.acc', tr).value, description: $('.desc', tr).value, debit: Number($('.dr', tr).value || 0), credit: Number($('.cr', tr).value || 0) })).filter(l => l.debit || l.credit);
    try { await rpc('post_journal', { p_date: $('#jdate', m).value, p_memo: $('#jmemo', m).value, p_source_type: 'manual', p_source_id: crypto.randomUUID(), p_lines: lines }); toast(T('saved')); m.close(); if (reload) reload(); } catch (e) { err(e); }
  };
  recalc();
}
async function showLedger(code) {
  const rows = await q(sb.from('journal_lines').select('*, journal_entries!inner(number,date,memo)').eq('account_code', code).order('journal_entries(date)'));
  let bal = 0; const a = (cache.accounts || []).find(x => x.code === code);
  const dr = a && ['asset', 'expense'].includes(a.type);
  const withBal = rows.map(l => { bal += dr ? (l.debit - l.credit) : (l.credit - l.debit); return { ...l, bal }; });
  modal(`<h2>${esc(accName(a))} <button class="btn sm sec close-modal">✕</button></h2>${table([{ l: T('date'), f: l => fmtD(l.journal_entries.date) }, { l: T('number'), f: l => esc(l.journal_entries.number) }, { l: T('memo'), f: l => esc(l.description || l.journal_entries.memo || '') }, { l: T('debit'), f: l => fmt(l.debit), num: true }, { l: T('credit'), f: l => fmt(l.credit), num: true }, { l: T('balance'), f: l => fmt(l.bal), num: true }], withBal)}`);
}

/* ---- receipts (customer payments) ---- */
MODULES.receipts = () => ({
  title: 'receipts', table: 'receipts', caches: ['customers', 'invoices_open'], numberKind: 'receipt', order: { col: 'date' },
  cols: [{ l: T('number'), k: 'number' }, { l: T('date'), f: r => fmtD(r.date) }, { l: T('customer'), f: r => esc(lookupName('customers', r.customer_id)) }, { l: T('kind'), f: r => r.kind === 'deposit' ? T('deposit') : T('against_invoice') }, { l: T('invoice'), f: r => esc(r.invoice_id ? (lookupName('invoices_open', r.invoice_id) || '✓') : '') }, { l: T('method'), f: r => T(r.method) }, { l: T('amount'), f: r => fmt(r.amount), num: true }],
  summary: rows => `<div class="kpis"><div class="kpi"><div class="l">${T('total')}</div><div class="v">${fmt(rows.reduce((a, r) => a + Number(r.amount), 0))} <small>${T('kwd')}</small></div></div></div>`,
  fields: r => [{ key: 'date', type: 'date', default: today(), required: true }, { key: 'customer_id', label: 'customer', type: 'lookup', lookup: 'customers', required: true }, { key: 'kind', type: 'select', options: [{ v: 'invoice', l: T('against_invoice') }, { v: 'deposit', l: T('deposit') }] }, { key: 'invoice_id', label: 'invoice', type: 'lookup', lookup: 'invoices_open', lookupLabel: i => `${i.number} — ${lookupName('customers', i.customer_id)} — ${fmt(i.total - i.paid)}` }, { key: 'amount', type: 'number', required: true }, methodField, { key: 'reference' }, { key: 'notes', type: 'textarea', full: true }],
  formWire: (m) => { const inv = m.querySelector('[name=invoice_id]'), cust = m.querySelector('[name=customer_id]'), amt = m.querySelector('[name=amount]'); inv.onchange = () => { const i = cache.invoices_open.find(x => x.id === inv.value); if (i) { cust.value = i.customer_id; if (!Number(amt.value)) amt.value = (i.total - i.paid).toFixed(3); } }; },
  rowActions: r => `<button class="btn sm sec" onclick="printReceipt('${r.id}')">${T('print')}</button>`,
  afterSave: () => { delete cache.invoices_open; }
});
async function printReceipt(id) {
  const r = await q(sb.from('receipts').select('*, customers(name,name_en), invoices(number)').eq('id', id).single());
  printHTML(`${docHeader('receipt', r.number)}<div class="meta"><div><b>${T('date')}</b>${fmtD(r.date)}</div><div><b>${T('method')}</b>${T(r.method)} ${r.reference ? '— ' + esc(r.reference) : ''}</div></div>
   <table><tr><td style="width:30%"><b>${T('received_from')}</b></td><td>${esc(nm(r.customers))}</td></tr><tr><td><b>${T('the_sum_of')}</b></td><td><b>${fmt(r.amount)} ${T('kwd')}</b></td></tr><tr><td><b>${T('for')}</b></td><td>${r.invoices ? T('invoice') + ' ' + esc(r.invoices.number) : T('deposit')} ${esc(r.notes || '')}</td></tr></table>
   <div class="sig"><div>${T('received_by')}</div><div>${T('signature')}</div></div>${docFooter()}`);
}
/* ---- supplier payments ---- */
MODULES.supplier_payments = () => ({
  title: 'supplier_payments', table: 'supplier_payments', caches: ['suppliers', 'bills_open'], numberKind: 'supplier_payment', order: { col: 'date' },
  cols: [{ l: T('number'), k: 'number' }, { l: T('date'), f: r => fmtD(r.date) }, { l: T('supplier'), f: r => esc(lookupName('suppliers', r.supplier_id)) }, { l: T('bills'), f: r => esc(r.bill_id ? (lookupName('bills_open', r.bill_id) || '✓') : '') }, { l: T('method'), f: r => T(r.method) }, { l: T('amount'), f: r => fmt(r.amount), num: true }],
  fields: [{ key: 'date', type: 'date', default: today(), required: true }, { key: 'supplier_id', label: 'supplier', type: 'lookup', lookup: 'suppliers', required: true }, { key: 'bill_id', label: 'bills', type: 'lookup', lookup: 'bills_open', lookupLabel: b => `${b.number} — ${lookupName('suppliers', b.supplier_id)} — ${fmt(b.total - b.paid)}` }, { key: 'amount', type: 'number', required: true }, methodField, { key: 'reference' }, { key: 'notes', type: 'textarea', full: true }],
  formWire: (m) => { const b = m.querySelector('[name=bill_id]'), s = m.querySelector('[name=supplier_id]'), amt = m.querySelector('[name=amount]'); b.onchange = () => { const i = cache.bills_open.find(x => x.id === b.value); if (i) { s.value = i.supplier_id; if (!Number(amt.value)) amt.value = (i.total - i.paid).toFixed(3); } }; },
  rowActions: r => `<button class="btn sm sec" onclick="printPayment('${r.id}')">${T('print')}</button>`,
  afterSave: () => { delete cache.bills_open; }
});
async function printPayment(id) {
  const r = await q(sb.from('supplier_payments').select('*, suppliers(name,name_en), bills(number)').eq('id', id).single());
  printHTML(`${docHeader('payment_voucher', r.number)}<div class="meta"><div><b>${T('date')}</b>${fmtD(r.date)}</div><div><b>${T('method')}</b>${T(r.method)} ${r.reference ? '— ' + esc(r.reference) : ''}</div></div>
   <table><tr><td style="width:30%"><b>${T('paid_to')}</b></td><td>${esc(nm(r.suppliers))}</td></tr><tr><td><b>${T('the_sum_of')}</b></td><td><b>${fmt(r.amount)} ${T('kwd')}</b></td></tr><tr><td><b>${T('for')}</b></td><td>${r.bills ? esc(r.bills.number) : ''} ${esc(r.notes || '')}</td></tr></table>
   <div class="sig"><div>${T('received_by')}</div><div>${T('signature')}</div></div>${docFooter()}`);
}
/* ---- contracts ---- */
MODULES.contracts = () => ({
  title: 'contracts', table: 'contracts', caches: ['customers'], numberKind: 'contract', attachments: 'contract', order: { col: 'end_date', asc: true },
  filters: [{ key: 'status', options: ['draft', 'active', 'expired', 'cancelled'].map(v => ({ v, l: T(v) })) }],
  cols: [{ l: T('number'), k: 'number' }, { l: T('title'), k: 'title' }, { l: T('customer'), f: r => esc(lookupName('customers', r.customer_id)) }, { l: T('billing_cycle'), f: r => T(r.billing_cycle) }, { l: T('amount'), f: r => fmt(r.amount), num: true }, { l: T('start_date'), f: r => fmtD(r.start_date) }, { l: T('end_date'), f: r => { const soon = (new Date(r.end_date) - new Date()) < 60 * 864e5; return `<span class="${soon && r.status === 'active' ? 'badge warn' : ''}">${fmtD(r.end_date)}</span>`; } }, { l: T('next_invoice_date'), f: r => fmtD(r.next_invoice_date) }, { l: T('status'), f: r => statusBadge(r.status) }],
  fields: [{ key: 'title', required: true, full: true }, { key: 'customer_id', label: 'customer', type: 'lookup', lookup: 'customers', required: true }, { key: 'billing_cycle', type: 'select', options: ['monthly', 'quarterly', 'yearly', 'one_time'].map(v => ({ v, l: T(v) })) }, { key: 'amount', type: 'number', required: true }, { key: 'start_date', type: 'date', required: true, default: today() }, { key: 'end_date', type: 'date', required: true, default: addDays(today(), 365) }, { key: 'next_invoice_date', type: 'date', default: today() }, { key: 'status', type: 'select', options: ['draft', 'active', 'expired', 'cancelled'].map(v => ({ v, l: T(v) })), default: 'active' }, { key: 'auto_invoice', type: 'bool', default: true }, { key: 'terms', type: 'textarea', full: true }],
  formActions: r => `<button class="btn ok" onclick="contractInvoice('${r.id}')">${T('generate_invoice')}</button>`,
  afterSave: () => delete cache.contracts
});
async function contractInvoice(id) { try { const inv = await rpc('invoice_from_contract', { p_contract: id }); toast(T('saved')); $$('.modal-bg').forEach(m => m.remove()); go('invoices'); setTimeout(() => openDoc('invoices', inv), 400); } catch (e) { err(e); } }

/* ============================================================
   DOCUMENTS with line items: quotations / job_orders / invoices / bills
   ============================================================ */
const DOCS = {
  quotations: { table: 'quotations', items: 'quotation_items', fk: 'quotation_id', numberKind: 'quotation', party: 'customer', title: 'quotations', printTitle: 'quotation', statuses: ['draft', 'sent', 'accepted', 'rejected', 'expired', 'converted'], hasDiscount: true },
  job_orders: { table: 'job_orders', items: 'job_order_items', fk: 'job_order_id', numberKind: 'job_order', party: 'customer', title: 'job_orders', printTitle: 'job_order', statuses: ['new', 'design', 'proof_approved', 'printing', 'finishing', 'ready', 'delivered', 'cancelled'], totalCol: 'sale_total' },
  invoices: { table: 'invoices', items: 'invoice_items', fk: 'invoice_id', numberKind: 'invoice', party: 'customer', title: 'invoices', printTitle: 'invoice', statuses: ['draft', 'issued', 'partial', 'paid', 'overdue', 'cancelled'], hasDiscount: true },
  bills: { table: 'bills', items: 'bill_items', fk: 'bill_id', numberKind: 'bill', party: 'supplier', title: 'bills', printTitle: 'bills', statuses: ['draft', 'open', 'partial', 'paid', 'cancelled'] },
};
async function docPage(key) {
  const D = DOCS[key]; const el = $('#page'); let rows = [], search = '', st = '';
  await loadCache('customers'); await loadCache('suppliers'); await loadCache('items');
  async function load() { rows = await q(sb.from(D.table).select('*').order('date', { ascending: false }).order('created_at', { ascending: false }).limit(500)); render(); }
  function render() {
    let fr = rows; if (st) fr = fr.filter(r => r.status === st);
    if (search) { const s = search.toLowerCase(); fr = fr.filter(r => (JSON.stringify(r) + lookupName(D.party + 's', r[D.party + '_id'])).toLowerCase().includes(s)); }
    const partyCol = { l: T(D.party), f: r => esc(lookupName(D.party + 's', r[D.party + '_id'])) };
    const cols = [{ l: T('number'), k: 'number' }, { l: T('date'), f: r => fmtD(r.date) }, partyCol, { l: T('subject'), f: r => esc(r.subject || r.title || r.description || '') }];
    if (key === 'job_orders') cols.push({ l: T('due_date'), f: r => fmtD(r.due_date) }, { l: T('revenue'), f: r => fmt(r.sale_total), num: true }, { l: T('cost'), f: r => fmt(r.cost_total), num: true }, { l: T('profit'), f: r => `<span class="${r.sale_total - r.cost_total < 0 ? 'badge bad' : ''}">${fmt(r.sale_total - r.cost_total)}</span>`, num: true });
    else { cols.push({ l: T('total'), f: r => fmt(r.total), num: true }); if (key === 'invoices' || key === 'bills') cols.push({ l: T('paid'), f: r => fmt(r.paid), num: true }, { l: T('balance'), f: r => fmt(r.total - r.paid), num: true }); }
    cols.push({ l: T('status'), f: r => statusBadge(r.status) });
    const tot = fr.reduce((a, r) => a + Number(r.total ?? r.sale_total ?? 0), 0), bal = fr.reduce((a, r) => a + Number((r.total ?? 0) - (r.paid ?? 0)), 0);
    el.innerHTML = `<header class="top"><h1>${T(D.title)}</h1><div class="tools"><select class="in" id="stf"><option value="">${T('filter_status')}</option>${D.statuses.map(s => `<option value="${s}" ${st === s ? 'selected' : ''}>${T(s === 'paid' ? 'paid_s' : s === 'finishing' ? 'finishing_s' : s)}</option>`).join('')}</select><input class="in" id="srch" placeholder="${T('search')}" value="${esc(search)}" style="width:200px"><button class="btn sec" id="exp">${T('export')}</button><button class="btn" id="addBtn">＋ ${T('add')}</button></div></header>
      <div class="kpis"><div class="kpi"><div class="l">${T('total')}</div><div class="v">${fmt(tot)} <small>${T('kwd')}</small></div></div>${(key === 'invoices' || key === 'bills') ? `<div class="kpi"><div class="l">${T('balance')}</div><div class="v">${fmt(bal)} <small>${T('kwd')}</small></div></div>` : ''}<div class="kpi"><div class="l">#</div><div class="v">${fr.length}</div></div></div>
      ${table(cols, fr, { onRow: true, actions: r => `<button class="btn sm sec pr" data-id="${r.id}">${T('print')}</button>` })}`;
    $('#stf').onchange = e => { st = e.target.value; render(); };
    $('#srch').oninput = e => { search = e.target.value; render(); const v = $('#srch'); v.focus(); v.setSelectionRange(v.value.length, v.value.length); };
    $('#exp').onclick = () => exportCSV(cols, fr, D.title);
    $('#addBtn').onclick = () => openDoc(key, null, load);
    $$('tr.clickable').forEach(tr => tr.onclick = () => openDoc(key, tr.dataset.id, load));
    $$('.pr').forEach(b => b.onclick = e => { e.stopPropagation(); printDoc(key, b.dataset.id); });
  }
  await load();
}
async function openDoc(key, id, reload) {
  const D = DOCS[key]; reload = reload || (() => go(key));
  await loadCache('customers'); await loadCache('suppliers'); await loadCache('items'); await loadCache('accounts'); if (key === 'job_orders') { await loadCache('profiles'); await loadCache('suppliers'); }
  let doc = id ? await q(sb.from(D.table).select('*').eq('id', id).single()) : null;
  let items = id ? await q(sb.from(D.items).select('*').eq(D.fk, id).order('sort')) : [];
  let costs = (key === 'job_orders' && id) ? await q(sb.from('job_costs').select('*').eq('job_order_id', id).order('date')) : [];
  if (!items.length && !id) items = [{ description: '', qty: 1, unit_price: 0 }];
  const partyList = cache[D.party + 's'];
  const partyOpts = partyList.map(p => `<option value="${p.id}" ${doc?.[D.party + '_id'] === p.id ? 'selected' : ''}>${esc(nm(p))}</option>`).join('');
  const isJob = key === 'job_orders', isInv = key === 'invoices', isBill = key === 'bills';
  const stOpts = D.statuses.map(s => `<option value="${s}" ${(doc?.status || D.statuses[0]) === s ? 'selected' : ''}>${T(s === 'paid' ? 'paid_s' : s === 'finishing' ? 'finishing_s' : s)}</option>`).join('');
  const itemRow = (it = {}) => `<tr><td style="width:24%"><input class="in i-desc" list="itemsDL" value="${esc(it.description || '')}" placeholder="${T('description')}"></td><td><input class="in i-specs" value="${esc(it.specs || '')}" placeholder="${T('specs')}"></td><td style="width:90px"><input class="in i-qty" type="number" step="0.001" value="${it.qty ?? 1}"></td><td style="width:110px"><input class="in i-price" type="number" step="0.001" value="${it.unit_price ?? 0}"></td><td class="num i-total" style="width:110px">${fmt((it.qty ?? 1) * (it.unit_price ?? 0))}</td><td style="width:34px"><button class="btn sm danger rm">✕</button></td></tr>`;
  const costRow = (c = {}) => `<tr><td><select class="in c-type">${['paper', 'ink', 'outsourcing', 'labor', 'machine', 'other'].map(v => `<option value="${v}" ${c.cost_type === v ? 'selected' : ''}>${T(v === 'paper' ? 'paper_c' : v)}</option>`).join('')}</select></td><td><input class="in c-desc" value="${esc(c.description || '')}"></td><td style="width:90px"><input class="in c-qty" type="number" step="0.001" value="${c.qty ?? 1}"></td><td style="width:110px"><input class="in c-cost" type="number" step="0.001" value="${c.unit_cost ?? 0}"></td><td class="num c-total" style="width:110px">${fmt((c.qty ?? 1) * (c.unit_cost ?? 0))}</td><td style="width:34px"><button class="btn sm danger rmc">✕</button></td></tr>`;
  const head = `
    <div class="form">
      <div><label class="f">${T('number')}</label><input class="in" value="${esc(doc?.number || (isAr() ? 'تلقائي' : 'auto'))}" readonly></div>
      <div><label class="f">${T(D.party)} *</label><select class="in" id="d-party" required><option value="">—</option>${partyOpts}</select></div>
      <div><label class="f">${T('date')}</label><input class="in" type="date" id="d-date" value="${doc?.date || today()}"></div>
      ${isJob ? `<div><label class="f">${T('due_date')}</label><input class="in" type="date" id="d-due" value="${doc?.due_date || ''}"></div>` : (key === 'quotations' ? `<div><label class="f">${T('valid_until')}</label><input class="in" type="date" id="d-due" value="${doc?.valid_until || addDays(today(), 15)}"></div>` : `<div><label class="f">${T('due_date')}</label><input class="in" type="date" id="d-due" value="${doc?.due_date || addDays(today(), 30)}"></div>`)}
      <div><label class="f">${T('status')}</label><select class="in" id="d-status">${stOpts}</select></div>
      ${isBill ? `<div><label class="f">${T('supplier_ref')}</label><input class="in" id="d-ref" value="${esc(doc?.supplier_ref || '')}"></div><div><label class="f">${T('expense_account')}</label><select class="in" id="d-acc">${cache.accounts.filter(a => a.type === 'expense' && !a.is_header).map(a => `<option value="${a.code}" ${(doc?.expense_account || '5100') === a.code ? 'selected' : ''}>${esc(accName(a))}</option>`).join('')}</select></div>` : ''}
      ${isJob ? `<div><label class="f">${T('assigned_to')}</label><select class="in" id="d-assigned"><option value="">—</option>${cache.profiles.map(p => `<option value="${p.id}" ${doc?.assigned_to === p.id ? 'selected' : ''}>${esc(p.full_name || p.email)}</option>`).join('')}</select></div>` : ''}
      <div class="full"><label class="f">${isJob ? T('title') : T('subject')}${isJob ? ' *' : ''}</label><input class="in" id="d-subject" value="${esc(doc?.subject || doc?.title || doc?.description || '')}"></div>
      ${isJob ? `<div><label class="f">${T('size')}</label><input class="in" id="j-size" value="${esc(doc?.size || '')}" placeholder="A4 / 9×5.5 cm"></div><div><label class="f">${T('paper')}</label><input class="in" id="j-paper" value="${esc(doc?.paper || '')}" placeholder="300gsm matte"></div><div><label class="f">${T('colors')}</label><input class="in" id="j-colors" value="${esc(doc?.colors || '')}" placeholder="CMYK"></div><div><label class="f">${T('sides')}</label><input class="in" id="j-sides" value="${esc(doc?.sides || '')}" placeholder="1 / 2"></div><div><label class="f">${T('finishing')}</label><input class="in" id="j-fin" value="${esc(doc?.finishing || '')}" placeholder="Lamination / UV / Die cut"></div><div><label class="f">${T('quantity')}</label><input class="in" id="j-qty" type="number" value="${doc?.quantity ?? ''}"></div>` : ''}
    </div>
    <h3 style="margin:14px 0 6px;color:var(--brown)">${T('lines')}</h3>
    <datalist id="itemsDL">${cache.items.map(i => `<option value="${esc(nm(i))}" data-price="${i.sale_price}" data-cost="${i.cost_price}"></option>`).join('')}</datalist>
    <table class="items"><thead><tr><th>${T('description')}</th><th>${T('specs')}</th><th class="num">${T('qty')}</th><th class="num">${T('unit_price')}</th><th class="num">${T('total')}</th><th></th></tr></thead><tbody id="ibody">${items.map(itemRow).join('')}</tbody></table>
    <div class="row" style="margin-top:6px"><button class="btn sm sec" id="addItem">＋ ${T('add_item')}</button></div>
    <div class="totals"><table><tr><td>${T('subtotal')}</td><td class="num" id="t-sub">0.000</td></tr>${D.hasDiscount ? `<tr><td>${T('discount')}</td><td class="num"><input class="in" type="number" step="0.001" id="d-disc" value="${doc?.discount ?? 0}" style="width:120px"></td></tr>` : ''}<tr class="grand"><td>${T('total')}</td><td class="num" id="t-total">0.000</td></tr>${(isInv || isBill) && doc ? `<tr><td>${T('paid')}</td><td class="num">${fmt(doc.paid)}</td></tr><tr><td>${T('balance')}</td><td class="num">${fmt(doc.total - doc.paid)}</td></tr>` : ''}</table></div>
    ${isJob ? `<h3 style="margin:14px 0 6px;color:var(--brown)">${T('costs')} <span class="muted" style="font-weight:400;font-size:12px">(Job costing)</span></h3><table class="items"><thead><tr><th>${T('cost_type')}</th><th>${T('description')}</th><th class="num">${T('qty')}</th><th class="num">${T('unit_cost')}</th><th class="num">${T('total')}</th><th></th></tr></thead><tbody id="cbody">${costs.map(costRow).join('')}</tbody></table><div class="row" style="margin-top:6px"><button class="btn sm sec" id="addCost">＋ ${T('add_cost')}</button><span class="grow"></span><b id="c-summary"></b></div>` : ''}
    <div class="form" style="margin-top:12px"><div class="full"><label class="f">${T('notes')}</label><textarea class="in" id="d-notes">${esc(doc?.notes || '')}</textarea></div></div>
    <div id="attSlot"></div>`;
  const actions = `${doc ? `<button class="btn sec" id="d-print">${T('print')}</button>` : ''}
    ${doc && key === 'quotations' && doc.status !== 'converted' ? `<button class="btn ok" id="d-tojob">${T('convert_to_job')}</button>` : ''}
    ${doc && isJob && !doc.invoice_id ? `<button class="btn ok" id="d-toinv">${T('create_invoice')}</button>` : ''}${doc && isJob && doc.invoice_id ? `<button class="btn sec" id="d-openinv">${T('invoice')}</button>` : ''}
    ${doc && isInv && !['paid', 'cancelled', 'draft'].includes(doc.status) ? `<button class="btn warn" id="d-pay">${T('add_receipt')}</button>` : ''}
    ${doc && isBill && !['paid', 'cancelled', 'draft'].includes(doc.status) ? `<button class="btn warn" id="d-pay">${T('supplier_payments')}</button>` : ''}
    ${doc ? `<button class="btn danger" id="d-del">${T('delete')}</button>` : ''}
    <button class="btn sec close-modal">${T('close')}</button><button class="btn" id="d-save">${T('save')}</button>`;
  const m = modal(`<h2>${T(D.title)} ${doc ? '<span class="mono">' + esc(doc.number) + '</span>' : ''} <button class="btn sm sec close-modal">✕</button></h2>${head}<div class="actions">${actions}</div>`);
  if (doc) { const att = await attachmentsPanel(key, doc.id); $('#attSlot', m).innerHTML = att; const rw = async () => { $('#attBox', m).outerHTML = await attachmentsPanel(key, doc.id); wireAttachments(m, key, doc.id, rw); }; wireAttachments(m, key, doc.id, rw); }
  const recalc = () => {
    let sub = 0; $$('#ibody tr', m).forEach(tr => { const t = Number($('.i-qty', tr).value || 0) * Number($('.i-price', tr).value || 0); $('.i-total', tr).textContent = fmt(t); sub += t; });
    const disc = D.hasDiscount ? Number($('#d-disc', m).value || 0) : 0; $('#t-sub', m).textContent = fmt(sub); $('#t-total', m).textContent = fmt(sub - disc);
    if (isJob) { let c = 0; $$('#cbody tr', m).forEach(tr => { const t = Number($('.c-qty', tr).value || 0) * Number($('.c-cost', tr).value || 0); $('.c-total', tr).textContent = fmt(t); c += t; }); const p = sub - c; $('#c-summary', m).innerHTML = `${T('cost')}: ${fmt(c)} — ${T('profit')}: <span class="${p < 0 ? 'badge bad' : 'badge ok'}">${fmt(p)} (${sub ? (p / sub * 100).toFixed(1) : 0}%)</span>`; }
  };
  m.addEventListener('input', e => { if (e.target.classList.contains('i-desc')) { const o = [...$('#itemsDL', m).options].find(o => o.value === e.target.value); if (o) { const tr = e.target.closest('tr'); if (!Number($('.i-price', tr).value)) $('.i-price', tr).value = isBill ? o.dataset.cost : o.dataset.price; } } recalc(); });
  m.addEventListener('click', e => { if (e.target.classList.contains('rm') || e.target.classList.contains('rmc')) { e.target.closest('tr').remove(); recalc(); } });
  $('#addItem', m).onclick = () => { $('#ibody', m).insertAdjacentHTML('beforeend', itemRow()); };
  if (isJob) $('#addCost', m).onclick = () => { $('#cbody', m).insertAdjacentHTML('beforeend', costRow()); };
  recalc();
  const collect = () => {
    const o = { date: $('#d-date', m).value, status: $('#d-status', m).value, notes: $('#d-notes', m).value || null };
    o[D.party + '_id'] = $('#d-party', m).value || null;
    const its = $$('#ibody tr', m).map((tr, i) => ({ description: $('.i-desc', tr).value, specs: $('.i-specs', tr).value || null, qty: Number($('.i-qty', tr).value || 0), unit_price: Number($('.i-price', tr).value || 0), total: Number($('.i-qty', tr).value || 0) * Number($('.i-price', tr).value || 0), sort: i })).filter(x => x.description);
    const sub = its.reduce((a, x) => a + x.total, 0);
    if (isJob) { Object.assign(o, { title: $('#d-subject', m).value, due_date: $('#d-due', m).value || null, size: $('#j-size', m).value || null, paper: $('#j-paper', m).value || null, colors: $('#j-colors', m).value || null, sides: $('#j-sides', m).value || null, finishing: $('#j-fin', m).value || null, quantity: $('#j-qty', m).value || null, assigned_to: $('#d-assigned', m).value || null, sale_total: sub }); }
    else if (isBill) { Object.assign(o, { description: $('#d-subject', m).value || null, due_date: $('#d-due', m).value || null, supplier_ref: $('#d-ref', m).value || null, expense_account: $('#d-acc', m).value, total: sub }); }
    else { const disc = Number($('#d-disc', m).value || 0); Object.assign(o, { subject: $('#d-subject', m).value || null, subtotal: sub, discount: disc, total: sub - disc }); if (key === 'quotations') o.valid_until = $('#d-due', m).value || null; else o.due_date = $('#d-due', m).value || null; }
    const cs = isJob ? $$('#cbody tr', m).map(tr => ({ cost_type: $('.c-type', tr).value, description: $('.c-desc', tr).value || null, qty: Number($('.c-qty', tr).value || 0), unit_cost: Number($('.c-cost', tr).value || 0), total: Number($('.c-qty', tr).value || 0) * Number($('.c-cost', tr).value || 0) })) : [];
    return { o, its, cs };
  };
  async function save() {
    const { o, its, cs } = collect();
    if (!o[D.party + '_id'] && key !== 'quotations') { toast(T(D.party) + ' *', true); return null; }
    if (isJob && !o.title) { toast(T('title') + ' *', true); return null; }
    try {
      let did = doc?.id;
      if (did) { await q(sb.from(D.table).update(o).eq('id', did)); }
      else { o.number = await rpc('next_number', { p_kind: D.numberKind }); const r = await q(sb.from(D.table).insert(o).select('id').single()); did = r.id; }
      await q(sb.from(D.items).delete().eq(D.fk, did)); if (its.length) await q(sb.from(D.items).insert(its.map(x => ({ ...x, [D.fk]: did }))));
      if (isJob) { await q(sb.from('job_costs').delete().eq('job_order_id', did)); if (cs.length) await q(sb.from('job_costs').insert(cs.map(x => ({ ...x, job_order_id: did })))); }
      if (isInv || isBill) { await q(sb.from(D.table).update({ total: o.total }).eq('id', did)); }
      toast(T('saved')); delete cache.invoices_open; delete cache.bills_open; delete cache.job_orders; return did;
    } catch (e) { err(e); return null; }
  }
  $('#d-save', m).onclick = async () => { const did = await save(); if (did) { m.close(); reload(); } };
  if ($('#d-print', m)) $('#d-print', m).onclick = async () => { const did = await save(); if (did) printDoc(key, did); };
  if ($('#d-del', m)) $('#d-del', m).onclick = async () => { if (!await confirmDlg(T('confirm_delete'))) return; try { await q(sb.from(D.table).delete().eq('id', doc.id)); toast(T('deleted')); m.close(); reload(); } catch (e) { err(e); } };
  if ($('#d-tojob', m)) $('#d-tojob', m).onclick = async () => { if (!await save()) return; try { const j = await rpc('quote_to_job', { p_quote: doc.id }); m.close(); go('job_orders'); setTimeout(() => openDoc('job_orders', j), 400); } catch (e) { err(e); } };
  if ($('#d-toinv', m)) $('#d-toinv', m).onclick = async () => { if (!await save()) return; try { const inv = await rpc('job_to_invoice', { p_job: doc.id }); m.close(); go('invoices'); setTimeout(() => openDoc('invoices', inv), 400); } catch (e) { err(e); } };
  if ($('#d-openinv', m)) $('#d-openinv', m).onclick = () => { m.close(); go('invoices'); setTimeout(() => openDoc('invoices', doc.invoice_id), 400); };
  if ($('#d-pay', m)) $('#d-pay', m).onclick = () => quickPay(key, doc, () => { m.close(); reload(); });
}
async function quickPay(key, doc, done) {
  const isInv = key === 'invoices'; const bal = doc.total - doc.paid;
  const m = modal(`<h2>${isInv ? T('add_receipt') : T('supplier_payments')} — ${esc(doc.number)} <button class="btn sm sec close-modal">✕</button></h2><form id="pf" class="form">${field({ key: 'date', type: 'date', required: true }, today())}${field({ key: 'amount', type: 'number', required: true }, bal.toFixed(3))}${field(methodField, 'cash')}${field({ key: 'reference' }, '')}${field({ key: 'notes', type: 'textarea', full: true }, '')}</form><div class="actions"><button class="btn sec close-modal">${T('cancel')}</button><button class="btn" id="ps">${T('save')}</button></div>`, { sm: true });
  $('#ps', m).onclick = async () => {
    const o = readForm($('#pf', m), [{ key: 'date' }, { key: 'amount', type: 'number' }, { key: 'method' }, { key: 'reference' }, { key: 'notes' }]);
    try {
      if (isInv) { o.number = await rpc('next_number', { p_kind: 'receipt' }); await q(sb.from('receipts').insert({ ...o, customer_id: doc.customer_id, invoice_id: doc.id, kind: 'invoice' })); }
      else { o.number = await rpc('next_number', { p_kind: 'supplier_payment' }); await q(sb.from('supplier_payments').insert({ ...o, supplier_id: doc.supplier_id, bill_id: doc.id })); }
      toast(T('saved')); m.close(); delete cache.invoices_open; delete cache.bills_open; done();
    } catch (e) { err(e); }
  };
}
async function printDoc(key, id) {
  const D = DOCS[key];
  const doc = await q(sb.from(D.table).select(`*, ${D.party}s(name,name_en,phone,address,cr_number,contact_person)`).eq('id', id).single());
  const items = await q(sb.from(D.items).select('*').eq(D.fk, id).order('sort'));
  const p = doc[D.party + 's'] || {};
  const isJob = key === 'job_orders';
  const specs = isJob ? [['size', doc.size], ['paper', doc.paper], ['colors', doc.colors], ['sides', doc.sides], ['finishing', doc.finishing], ['quantity', doc.quantity]].filter(x => x[1]).map(x => `<div><b>${T(x[0])}</b>${esc(x[1])}</div>`).join('') : '';
  const total = doc.total ?? doc.sale_total ?? 0;
  printHTML(`${docHeader(D.printTitle, doc.number)}
    <div class="meta"><div><b>${T(D.party)}</b>${esc(nm(p))}</div><div><b>${T('date')}</b>${fmtD(doc.date)}</div>${p.phone ? `<div><b>${T('phone')}</b><span class="mono">${esc(p.phone)}</span></div>` : ''}${doc.due_date ? `<div><b>${T('due_date')}</b>${fmtD(doc.due_date)}</div>` : ''}${doc.valid_until ? `<div><b>${T('valid_until')}</b>${fmtD(doc.valid_until)}</div>` : ''}${p.address ? `<div><b>${T('address')}</b>${esc(p.address)}</div>` : ''}${p.cr_number ? `<div><b>${T('cr_number')}</b>${esc(p.cr_number)}</div>` : ''}<div><b>${T('subject')}</b>${esc(doc.subject || doc.title || doc.description || '')}</div>${specs}</div>
    <table><thead><tr><th style="width:30px">#</th><th>${T('description')}</th><th>${T('specs')}</th><th class="num">${T('qty')}</th><th class="num">${T('unit_price')}</th><th class="num">${T('total')}</th></tr></thead><tbody>${items.map((it, i) => `<tr><td>${i + 1}</td><td>${esc(it.description)}</td><td>${esc(it.specs || '')}</td><td class="num">${Number(it.qty).toLocaleString()}</td><td class="num">${fmt(it.unit_price)}</td><td class="num">${fmt(it.total)}</td></tr>`).join('')}</tbody></table>
    <table class="tot"><tr><td>${T('subtotal')}</td><td class="num">${fmt(doc.subtotal ?? total)}</td></tr>${doc.discount ? `<tr><td>${T('discount')}</td><td class="num">-${fmt(doc.discount)}</td></tr>` : ''}<tr class="g"><td>${T('total')} (${T('kwd')})</td><td class="num">${fmt(total)}</td></tr>${doc.paid ? `<tr><td>${T('paid')}</td><td class="num">${fmt(doc.paid)}</td></tr><tr><td>${T('balance')}</td><td class="num">${fmt(total - doc.paid)}</td></tr>` : ''}</table>
    ${doc.status === 'paid' ? `<div class="stamp">${T('paid_s')}</div>` : ''}
    ${doc.notes ? `<p style="margin-top:10px"><b>${T('notes')}:</b> ${esc(doc.notes)}</p>` : ''}
    <div class="sig"><div>${isAr() ? 'المستلم' : 'Received by'}</div><div>${esc(isAr() ? COMPANY.name_ar : COMPANY.name_en)}</div></div>${docFooter()}`);
}

/* ============================================================
   PAYROLL
   ============================================================ */
async function payrollPage() {
  const el = $('#page'); await loadCache('employees');
  let period = today().slice(0, 7);
  async function render() {
    const run = (await q(sb.from('payroll_runs').select('*').eq('period', period + '-01')))[0];
    const slips = run ? await q(sb.from('payslips').select('*').eq('run_id', run.id)) : [];
    const editable = run && run.status === 'draft';
    el.innerHTML = `<header class="top"><h1>${T('payroll')}</h1><div class="tools"><input class="in" type="month" id="per" value="${period}"><button class="btn sec" id="gen" ${run && !editable ? 'disabled' : ''}>${T('generate_payroll')}</button>${run ? `<button class="btn sec" id="prAll">${T('print')}</button>` : ''}${editable ? `<button class="btn ok" id="pay">${T('pay_payroll')}</button>` : ''}</div></header>
      ${run ? `<div class="kpis"><div class="kpi"><div class="l">${T('status')}</div><div class="v">${statusBadge(run.status === 'paid' ? 'paid' : run.status)}</div></div><div class="kpi"><div class="l">${T('gross')}</div><div class="v">${fmt(run.total_gross)}</div></div><div class="kpi"><div class="l">${T('deductions')}</div><div class="v">${fmt(run.total_deductions)}</div></div><div class="kpi"><div class="l">${T('net')}</div><div class="v">${fmt(run.total_net)} <small>${T('kwd')}</small></div></div>${run.paid_date ? `<div class="kpi"><div class="l">${T('date')}</div><div class="v" style="font-size:16px">${fmtD(run.paid_date)} · ${T(run.method)}</div></div>` : ''}</div>` : `<div class="empty">${isAr() ? 'اختر الشهر واضغط "تجهيز مسير الرواتب"' : 'Pick a month and click "Generate payroll"'}</div>`}
      ${run ? table([{ l: T('employee'), f: s => esc(lookupName('employees', s.employee_id)) }, { l: T('basic_salary'), f: s => fmt(s.basic), num: true }, { l: T('allowances'), f: s => fmt(s.allowances), num: true }, { l: T('overtime'), f: s => editable ? `<input class="in ed" data-k="overtime" data-id="${s.id}" type="number" step="0.001" value="${s.overtime}" style="width:100px">` : fmt(s.overtime), num: true }, { l: T('bonus'), f: s => editable ? `<input class="in ed" data-k="bonus" data-id="${s.id}" type="number" step="0.001" value="${s.bonus}" style="width:100px">` : fmt(s.bonus), num: true }, { l: T('unpaid_leave_deduction'), f: s => `${fmt(s.unpaid_leave_deduction)} <small class="muted">(${s.unpaid_leave_days}d)</small>`, num: true }, { l: T('advance_deduction'), f: s => fmt(s.advance_deduction), num: true }, { l: T('other_deduction'), f: s => editable ? `<input class="in ed" data-k="other_deduction" data-id="${s.id}" type="number" step="0.001" value="${s.other_deduction}" style="width:100px">` : fmt(s.other_deduction), num: true }, { l: T('gross'), f: s => fmt(s.gross), num: true }, { l: T('net'), f: s => `<b>${fmt(s.net)}</b>`, num: true }], slips, { actions: s => `<button class="btn sm sec" onclick="printPayslip('${s.id}')">${T('payslip')}</button>` }) : ''}`;
    $('#per').onchange = e => { period = e.target.value; render(); };
    $('#gen').onclick = async () => { try { await rpc('generate_payroll', { p_period: period + '-01' }); toast(T('ok')); render(); } catch (e) { err(e); } };
    $$('.ed').forEach(i => i.onchange = async () => { try { await q(sb.from('payslips').update({ [i.dataset.k]: Number(i.value || 0) }).eq('id', i.dataset.id)); render(); } catch (e) { err(e); } });
    if ($('#pay')) $('#pay').onclick = async () => {
      const m = modal(`<h2>${T('pay_payroll')}</h2><form class="form" id="pp">${field({ key: 'date', type: 'date' }, today())}${field({ key: 'method', type: 'select', options: METHOD_OPTS() }, 'bank')}</form><div class="actions"><button class="btn sec close-modal">${T('cancel')}</button><button class="btn ok" id="ok">${T('ok')}</button></div>`, { sm: true });
      $('#ok', m).onclick = async () => { try { await rpc('pay_payroll', { p_run: run.id, p_date: $('[name=date]', m).value, p_method: $('[name=method]', m).value }); toast(T('payroll_paid')); m.close(); render(); } catch (e) { err(e); } };
    };
    if ($('#prAll')) $('#prAll').onclick = async () => { const html = (await Promise.all(slips.map(s => payslipHTML(s, run)))).join('<div style="page-break-after:always"></div>'); printHTML(html); };
  }
  await render();
}
async function payslipHTML(s, run) {
  const e = await q(sb.from('employees').select('*').eq('id', s.employee_id).single());
  return `${docHeader('payslip', s.number)}<div class="meta"><div><b>${T('employee')}</b>${esc(e.name)} ${e.name_en ? '/ ' + esc(e.name_en) : ''}</div><div><b>${T('period')}</b>${run.period.slice(0, 7)}</div><div><b>${T('job_title')}</b>${esc(e.job_title || '')}</div><div><b>${T('civil_id')}</b><span class="mono">${esc(e.civil_id || '')}</span></div><div><b>${T('hire_date')}</b>${fmtD(e.hire_date)}</div><div><b>${T('bank_name')}</b>${esc(e.bank_name || '')} <span class="mono">${esc(e.iban || '')}</span></div></div>
   <table><thead><tr><th>${T('description')}</th><th class="num">${T('amount')}</th></tr></thead><tbody><tr><td>${T('basic_salary')}</td><td class="num">${fmt(s.basic)}</td></tr><tr><td>${T('allowances')}</td><td class="num">${fmt(s.allowances)}</td></tr>${s.overtime > 0 ? `<tr><td>${T('overtime')}</td><td class="num">${fmt(s.overtime)}</td></tr>` : ''}${s.bonus > 0 ? `<tr><td>${T('bonus')}</td><td class="num">${fmt(s.bonus)}</td></tr>` : ''}<tr class="sec"><td>${T('gross')}</td><td class="num">${fmt(s.gross)}</td></tr>${s.unpaid_leave_deduction > 0 ? `<tr><td>${T('unpaid_leave_deduction')} (${s.unpaid_leave_days} ${T('days')})</td><td class="num">-${fmt(s.unpaid_leave_deduction)}</td></tr>` : ''}${s.advance_deduction > 0 ? `<tr><td>${T('advance_deduction')}</td><td class="num">-${fmt(s.advance_deduction)}</td></tr>` : ''}${s.other_deduction > 0 ? `<tr><td>${T('other_deduction')}</td><td class="num">-${fmt(s.other_deduction)}</td></tr>` : ''}<tr class="sec"><td>${T('net')} (${T('kwd')})</td><td class="num"><b>${fmt(s.net)}</b></td></tr></tbody></table>
   ${run.paid_date ? `<p>${T('date')}: ${fmtD(run.paid_date)} — ${T(run.method)}</p>` : ''}<div class="sig"><div>${T('employee')}</div><div>${esc(isAr() ? COMPANY.name_ar : COMPANY.name_en)}</div></div>`;
}
async function printPayslip(id) { const s = await q(sb.from('payslips').select('*').eq('id', id).single()); const run = await q(sb.from('payroll_runs').select('*').eq('id', s.run_id).single()); printHTML(await payslipHTML(s, run)); }

/* ============================================================
   REPORTS
   ============================================================ */
async function reportsPage() {
  const el = $('#page'); await loadCache('customers'); await loadCache('accounts'); await loadCache('expense_categories');
  const y = new Date().getFullYear();
  const R = ['pnl', 'balance_sheet', 'cashflow', 'trial_balance', 'ar_aging', 'customer_statement', 'job_profit', 'supplier_balances', 'expenses_by_cat'];
  let cur = 'pnl', from = `${y}-01-01`, to = today(), cust = '';
  let lastHTML = '';
  el.innerHTML = `<header class="top"><h1>${T('reports')}</h1><div class="tools"><button class="btn sec" id="prn">${T('print')}</button></div></header><div class="tabs" id="rtabs">${R.map(r => `<button data-r="${r}" class="${r === cur ? 'active' : ''}">${T(r)}</button>`).join('')}</div>
    <div class="filters"><div><label class="f">${T('from')}</label><input class="in" type="date" id="rf" value="${from}"></div><div><label class="f">${T('to')}</label><input class="in" type="date" id="rt" value="${to}"></div><div id="custSlot"><label class="f">${T('customer')}</label><select class="in" id="rc"><option value="">—</option>${cache.customers.map(c => `<option value="${c.id}">${esc(nm(c))}</option>`).join('')}</select></div><button class="btn" id="rrun">${T('run')}</button></div><div id="rout"></div>`;
  $$('#rtabs button').forEach(b => b.onclick = () => { cur = b.dataset.r; $$('#rtabs button').forEach(x => x.classList.toggle('active', x === b)); $('#custSlot').style.display = cur === 'customer_statement' ? '' : 'none'; run(); });
  $('#custSlot').style.display = 'none';
  $('#rrun').onclick = run; $('#prn').onclick = () => printHTML(`${docHeader(cur, '')}<p class="muted">${fmtD(from)} — ${fmtD(to)}</p><div class="rep">${lastHTML}</div>`);
  async function run() {
    from = $('#rf').value; to = $('#rt').value; cust = $('#rc').value; const out = $('#rout'); out.innerHTML = '...';
    try {
      let html = '';
      if (cur === 'pnl') {
        const rows = await rpc('pnl', { p_from: from, p_to: to }); const inc = rows.filter(r => r.type === 'income'), exp = rows.filter(r => r.type === 'expense');
        const si = inc.reduce((a, r) => a + Number(r.amount), 0), se = exp.reduce((a, r) => a + Number(r.amount), 0);
        const sec = (t, rs, s) => `<tr class="sec"><td colspan="2">${t}</td></tr>${rs.map(r => `<tr><td>${r.code} — ${esc(isAr() ? r.name_ar : r.name_en)}</td><td class="num">${fmt(r.amount)}</td></tr>`).join('')}<tr><td><b>${T('total')} ${t}</b></td><td class="num"><b>${fmt(s)}</b></td></tr>`;
        html = `<div class="tbl-wrap"><table>${sec(T('income'), inc, si)}${sec(T('expense'), exp, se)}<tr class="sec"><td><b>${T('net_profit')}</b></td><td class="num"><b style="color:${si - se >= 0 ? 'var(--ok)' : 'var(--bad)'}">${fmt(si - se)}</b></td></tr></table></div>`;
      } else if (cur === 'balance_sheet') {
        const rows = await rpc('balance_sheet', { p_to: to });
        const grp = t => rows.filter(r => r.type === t); const sum = rs => rs.reduce((a, r) => a + Number(r.amount), 0);
        const sec = (t, rs) => `<tr class="sec"><td colspan="2">${t}</td></tr>${rs.map(r => `<tr><td>${r.code} — ${esc(isAr() ? r.name_ar : r.name_en)}</td><td class="num">${fmt(r.amount)}</td></tr>`).join('')}<tr><td><b>${T('total')} ${t}</b></td><td class="num"><b>${fmt(sum(rs))}</b></td></tr>`;
        html = `<div class="tbl-wrap"><table>${sec(T('asset'), grp('asset'))}${sec(T('liability'), grp('liability'))}${sec(T('equity'), grp('equity'))}<tr class="sec"><td>${T('liability')} + ${T('equity')}</td><td class="num"><b>${fmt(sum(grp('liability')) + sum(grp('equity')))}</b></td></tr></table></div>`;
      } else if (cur === 'cashflow') {
        const rows = await rpc('cashflow', { p_from: from, p_to: to });
        html = table([{ l: T('month'), k: 'month' }, { l: T('in'), f: r => fmt(r.cash_in), num: true }, { l: T('out'), f: r => fmt(r.cash_out), num: true }, { l: T('net'), f: r => fmt(r.net), num: true }], rows);
      } else if (cur === 'trial_balance') {
        const rows = (await q(sb.from('v_account_balances').select('*').order('code'))).filter(r => Number(r.debit) || Number(r.credit));
        html = table([{ l: T('code'), k: 'code' }, { l: T('account'), f: r => esc(isAr() ? r.name_ar : r.name_en) }, { l: T('debit'), f: r => fmt(r.debit), num: true }, { l: T('credit'), f: r => fmt(r.credit), num: true }, { l: T('balance'), f: r => fmt(r.balance), num: true }], rows, { foot: `<tr><th></th><th>${T('total')}</th><th class="num">${fmt(rows.reduce((a, r) => a + Number(r.debit), 0))}</th><th class="num">${fmt(rows.reduce((a, r) => a + Number(r.credit), 0))}</th><th></th></tr>` });
      } else if (cur === 'ar_aging') {
        const rows = await rpc('ar_aging');
        html = table([{ l: T('customer'), k: 'customer' }, { l: T('current'), f: r => fmt(r.current_amt), num: true }, { l: T('d30'), f: r => fmt(r.d30), num: true }, { l: T('d60'), f: r => fmt(r.d60), num: true }, { l: T('d90'), f: r => fmt(r.d90), num: true }, { l: T('over90'), f: r => fmt(r.over90), num: true }, { l: T('total'), f: r => `<b>${fmt(r.total)}</b>`, num: true }], rows);
      } else if (cur === 'customer_statement') {
        if (!cust) { out.innerHTML = `<div class="empty">${T('customer')}</div>`; return; }
        html = await statementHTML(cust, from, to);
      } else if (cur === 'job_profit') {
        const rows = await q(sb.from('v_job_profit').select('*').gte('date', from).lte('date', to).order('date', { ascending: false }));
        html = table([{ l: T('number'), k: 'number' }, { l: T('date'), f: r => fmtD(r.date) }, { l: T('customer'), k: 'customer' }, { l: T('title'), k: 'title' }, { l: T('revenue'), f: r => fmt(r.revenue), num: true }, { l: T('cost'), f: r => fmt(r.cost), num: true }, { l: T('profit'), f: r => `<span class="${r.profit < 0 ? 'badge bad' : ''}">${fmt(r.profit)}</span>`, num: true }, { l: T('margin'), f: r => r.margin_pct + '%', num: true }], rows, { foot: `<tr><th colspan="4">${T('total')}</th><th class="num">${fmt(rows.reduce((a, r) => a + Number(r.revenue), 0))}</th><th class="num">${fmt(rows.reduce((a, r) => a + Number(r.cost), 0))}</th><th class="num">${fmt(rows.reduce((a, r) => a + Number(r.profit), 0))}</th><th></th></tr>` });
      } else if (cur === 'supplier_balances') {
        const rows = await q(sb.from('v_supplier_balances').select('*').order('outstanding', { ascending: false }));
        html = table([{ l: T('supplier'), k: 'name' }, { l: T('bills'), f: r => fmt(r.billed), num: true }, { l: T('paid'), f: r => fmt(r.paid), num: true }, { l: T('balance'), f: r => `<b>${fmt(r.outstanding)}</b>`, num: true }], rows);
      } else if (cur === 'expenses_by_cat') {
        const rows = await q(sb.from('expenses').select('category_id,amount,account_code').gte('date', from).lte('date', to));
        const bills = await q(sb.from('bills').select('expense_account,total').gte('date', from).lte('date', to).not('status', 'in', '("draft","cancelled")'));
        const agg = {}; rows.forEach(r => { const c = cache.expense_categories.find(x => x.id === r.category_id); const k = c ? (isAr() ? c.name_ar : c.name_en) : T('other'); agg[k] = (agg[k] || 0) + Number(r.amount); });
        bills.forEach(b => { const a = cache.accounts.find(x => x.code === b.expense_account); const k = (a ? (isAr() ? a.name_ar : a.name_en) : '') + ' (' + T('bills') + ')'; agg[k] = (agg[k] || 0) + Number(b.total); });
        const list = Object.entries(agg).map(([k, v]) => ({ k, v })).sort((a, b) => b.v - a.v); const tot = list.reduce((a, r) => a + r.v, 0);
        html = table([{ l: T('category'), k: 'k' }, { l: T('amount'), f: r => fmt(r.v), num: true }, { l: '%', f: r => tot ? (r.v / tot * 100).toFixed(1) + '%' : '', num: true }], list, { foot: `<tr><th>${T('total')}</th><th class="num">${fmt(tot)}</th><th></th></tr>` });
      }
      lastHTML = html; out.innerHTML = html;
    } catch (e) { err(e); out.innerHTML = ''; }
  }
  run();
}
async function statementHTML(cust, from, to) {
  const rows = await rpc('customer_statement', { p_customer: cust, p_from: from, p_to: to });
  let bal = 0; const c = cache.customers.find(x => x.id === cust);
  const withBal = rows.map(r => { bal += Number(r.debit) - Number(r.credit); return { ...r, bal }; });
  return `<h3 style="margin:6px 0">${esc(nm(c))} — ${fmtD(from)} → ${fmtD(to)}</h3>` + table([{ l: T('date'), f: r => fmtD(r.date) }, { l: T('number'), k: 'doc' }, { l: T('description'), k: 'description' }, { l: T('debit'), f: r => fmt(r.debit), num: true }, { l: T('credit'), f: r => fmt(r.credit), num: true }, { l: T('balance'), f: r => fmt(r.bal), num: true }], withBal, { foot: `<tr><th colspan="3">${T('balance')}</th><th class="num">${fmt(rows.reduce((a, r) => a + Number(r.debit), 0))}</th><th class="num">${fmt(rows.reduce((a, r) => a + Number(r.credit), 0))}</th><th class="num">${fmt(bal)}</th></tr>` });
}
async function showCustomerStatement(id) { await loadCache('customers'); const y = new Date().getFullYear(); const html = await statementHTML(id, `${y}-01-01`, today()); const m = modal(`<h2>${T('customer_statement')} <button class="btn sm sec close-modal">✕</button></h2>${html}<div class="actions"><button class="btn" id="ps">${T('print_statement')}</button></div>`); $('#ps', m).onclick = () => printHTML(`${docHeader('customer_statement', '')}<div class="rep">${html}</div>${docFooter()}`); }

/* ============================================================
   DASHBOARD
   ============================================================ */
async function dashboardPage() {
  const el = $('#page'); const d = await rpc('dashboard');
  const months = []; for (let i = 11; i >= 0; i--) { const x = new Date(); x.setMonth(x.getMonth() - i); months.push(x.toISOString().slice(0, 7)); }
  const s = Object.fromEntries((d.sales_12m || []).map(x => [x.m, Number(x.v)])), e = Object.fromEntries((d.expenses_12m || []).map(x => [x.m, Number(x.v)]));
  const mx = Math.max(1, ...months.map(m => Math.max(s[m] || 0, e[m] || 0)));
  const kpi = (l, v, unit = true) => `<div class="kpi"><div class="l">${l}</div><div class="v">${unit ? fmt(v) : v} ${unit ? `<small>${T('kwd')}</small>` : ''}</div></div>`;
  el.innerHTML = `<header class="top"><h1>${T('dashboard')}</h1><div class="muted">${fmtD(today())}</div></header>
   <div class="kpis">${kpi(T('cash_balance'), d.cash)}${kpi(T('receivables'), d.receivables)}${kpi(T('payables'), d.payables)}${kpi(T('month_sales'), d.month_sales)}${kpi(T('month_expenses'), d.month_expenses)}${kpi(T('open_jobs'), d.open_jobs, false)}${kpi(T('overdue_invoices'), d.overdue_invoices, false)}</div>
   <div class="two"><div class="card"><h3>${T('sales_12m')}</h3><div class="bars">${months.map(m => `<div class="b" title="${m}: ${fmt(s[m] || 0)} / ${fmt(e[m] || 0)}"><div style="display:flex;gap:2px;width:100%;align-items:flex-end;height:110px"><i style="height:${(s[m] || 0) / mx * 100}%"></i><i class="e" style="height:${(e[m] || 0) / mx * 100}%"></i></div><span>${m.slice(5)}</span></div>`).join('')}</div><div class="muted" style="font-size:12px;margin-top:6px"><span style="color:var(--amber)">■</span> ${T('income')} &nbsp; <span style="color:var(--olive)">■</span> ${T('expense')}</div></div>
   <div><div class="card"><h3>${T('alerts')}</h3>${(d.reminders || []).length ? `<ul style="padding-inline-start:18px">${d.reminders.map(r => `<li><span class="badge ${new Date(r.due) < new Date() ? 'bad' : 'warn'}">${fmtD(r.due)}</span> ${esc(r.title)}</li>`).join('')}</ul>` : `<div class="muted">${T('none')}</div>`}</div>
   <div class="card"><h3>${T('contracts_due')}</h3>${(d.contracts_due || []).length ? d.contracts_due.map(c => `<div class="row" style="margin-bottom:6px"><span class="grow">${esc(c.title)} — ${fmtD(c.next)} — <b>${fmt(c.amount)}</b></span><button class="btn sm ok" onclick="contractInvoice('${c.id}')">${T('generate_invoice')}</button></div>`).join('') : `<div class="muted">${T('none')}</div>`}</div></div></div>
   <div class="row" style="margin-top:8px"><button class="btn" onclick="go('quotations')">＋ ${T('quotations')}</button><button class="btn" onclick="go('job_orders')">＋ ${T('job_orders')}</button><button class="btn" onclick="go('invoices')">＋ ${T('invoices')}</button><button class="btn sec" onclick="go('expenses')">＋ ${T('expenses')}</button><button class="btn sec" onclick="go('receipts')">＋ ${T('receipts')}</button></div>`;
}

/* ============================================================
   SETTINGS: company, users
   ============================================================ */
async function companyPage() {
  const el = $('#page'); const row = await q(sb.from('settings').select('*').eq('key', 'company').single()); const c = row.value;
  const F = [{ key: 'name_ar', label: 'company_name' }, { key: 'name_en', label: 'name_en' }, { key: 'address_ar', label: 'address', full: true }, { key: 'address_en', label: 'address', full: true }, { key: 'cr', label: 'cr_number' }, { key: 'moi_licence', label: 'licence' }, { key: 'industrial_licence' }, { key: 'phone' }, { key: 'email' }, { key: 'bank_name' }, { key: 'iban' }, { key: 'invoice_terms_ar', label: 'invoice_terms', type: 'textarea', full: true }, { key: 'invoice_terms_en', label: 'invoice_terms', type: 'textarea', full: true }];
  el.innerHTML = `<header class="top"><h1>${T('company')}</h1><button class="btn" id="sv">${T('save')}</button></header><div class="card"><form id="cf" class="form">${F.map(f => field(f, c[f.key])).join('')}</form></div>`;
  $('#sv').onclick = async () => { const o = readForm($('#cf'), F); try { await q(sb.from('settings').update({ value: { ...c, ...o } }).eq('key', 'company')); COMPANY = { ...c, ...o }; toast(T('saved')); } catch (e) { err(e); } };
}
async function usersPage() {
  const el = $('#page');
  const profiles = await q(sb.from('profiles').select('*').order('created_at')); const allowed = await q(sb.from('allowed_users').select('*').order('created_at'));
  const roles = ['manager', 'accountant', 'staff'];
  el.innerHTML = `<header class="top"><h1>${T('users')}</h1><button class="btn" id="addU">＋ ${T('add_user')}</button></header><p class="muted" style="margin-bottom:10px">${T('allowed_note')}</p>
   <div class="card"><h3>${T('users')}</h3>${table([{ l: T('name'), k: 'full_name' }, { l: T('email'), k: 'email' }, { l: T('role'), f: p => `<select class="in rl" data-id="${p.id}">${roles.map(r => `<option value="${r}" ${p.role === r ? 'selected' : ''}>${T(r)}</option>`).join('')}</select>` }, { l: T('active'), f: p => `<input type="checkbox" class="ac" data-id="${p.id}" ${p.active ? 'checked' : ''} ${p.id === USER.id ? 'disabled' : ''}>` }], profiles)}</div>
   <div class="card"><h3>${T('add_user')}</h3>${table([{ l: T('email'), k: 'email' }, { l: T('name'), k: 'full_name' }, { l: T('role'), f: a => T(a.role) }], allowed, { actions: a => `<button class="btn sm danger dl" data-e="${esc(a.email)}">✕</button>` })}</div>`;
  $$('.rl').forEach(s => s.onchange = async () => { try { await q(sb.from('profiles').update({ role: s.value }).eq('id', s.dataset.id)); toast(T('saved')); } catch (e) { err(e); } });
  $$('.ac').forEach(s => s.onchange = async () => { try { await q(sb.from('profiles').update({ active: s.checked }).eq('id', s.dataset.id)); toast(T('saved')); } catch (e) { err(e); } });
  $$('.dl').forEach(b => b.onclick = async () => { await q(sb.from('allowed_users').delete().eq('email', b.dataset.e)); usersPage(); });
  $('#addU').onclick = () => { const m = modal(`<h2>${T('add_user')}</h2><form class="form" id="uf">${field({ key: 'email', type: 'email', required: true }, '')}${field({ key: 'full_name' }, '')}${field({ key: 'role', type: 'select', options: roles.map(r => ({ v: r, l: T(r) })) }, 'staff')}</form><div class="actions"><button class="btn sec close-modal">${T('cancel')}</button><button class="btn" id="us">${T('save')}</button></div>`, { sm: true }); $('#us', m).onclick = async () => { const o = readForm($('#uf', m), [{ key: 'email' }, { key: 'full_name' }, { key: 'role' }]); try { await q(sb.from('allowed_users').upsert({ ...o, email: o.email.toLowerCase() })); m.close(); usersPage(); } catch (e) { err(e); } }; };
}

/* ============================================================
   NAV / ROUTER / AUTH
   ============================================================ */
const NAV = [
  { grp: 'dashboard', items: [['dashboard', 'dashboard']] },
  { grp: 'sales', items: [['customers', 'customers'], ['quotations', 'quotations'], ['job_orders', 'job_orders'], ['invoices', 'invoices'], ['receipts', 'receipts'], ['contracts', 'contracts']] },
  { grp: 'purchases', items: [['suppliers', 'suppliers'], ['bills', 'bills', 'finance'], ['supplier_payments', 'supplier_payments', 'finance'], ['expenses', 'expenses', 'finance']] },
  { grp: 'inventory', items: [['items', 'items'], ['stock_moves', 'stock_moves']] },
  { grp: 'hr', items: [['employees', 'employees', 'finance'], ['advances', 'advances', 'finance'], ['leaves', 'leaves', 'finance'], ['payroll', 'payroll', 'finance']] },
  { grp: 'accounting', items: [['reports', 'reports', 'finance'], ['journal', 'journal', 'finance'], ['accounts', 'accounts', 'finance'], ['assets', 'assets', 'finance']] },
  { grp: 'settings', items: [['company', 'company', 'manager'], ['users', 'users', 'manager'], ['reminders', 'reminders']] },
];
const canSee = need => !need || (need === 'finance' && ['manager', 'accountant'].includes(PROFILE.role)) || (need === 'manager' && PROFILE.role === 'manager');
function shell() {
  document.documentElement.lang = LANG; document.documentElement.dir = isAr() ? 'rtl' : 'ltr';
  root.innerHTML = `<div id="app"><aside id="side"><div class="brand"><img src="${LOGO}"><div><b>${T('app')}</b><small>${T('sub')}</small></div></div>
    ${NAV.map(g => { const its = g.items.filter(i => canSee(i[2])); return its.length ? `<div class="grp">${T(g.grp)}</div>${its.map(i => `<button class="nav" data-p="${i[0]}">${T(i[1])}</button>`).join('')}` : ''; }).join('')}
    <div class="grp"></div><button class="nav" id="langBtn">🌐 ${T('language')}</button><button class="nav" id="outBtn">⏻ ${T('logout')} <small style="opacity:.7">(${esc(PROFILE.full_name || PROFILE.email)})</small></button></aside>
    <main><button id="menuBtn" class="btn sec sm" style="margin-bottom:10px">☰</button><div id="page"></div></main></div>`;
  $$('.nav[data-p]').forEach(b => b.onclick = () => go(b.dataset.p));
  $('#langBtn').onclick = () => { LANG = isAr() ? 'en' : 'ar'; localStorage.setItem('hibr_lang', LANG); shell(); go(location.hash.slice(1) || 'dashboard'); };
  $('#outBtn').onclick = async () => { if (await confirmDlg(T('sign_out_confirm'))) { await sb.auth.signOut(); location.reload(); } };
  $('#menuBtn').onclick = () => $('#side').classList.toggle('open');
}
const PAGES = { dashboard: dashboardPage, payroll: payrollPage, reports: reportsPage, company: companyPage, users: usersPage };
async function go(p) {
  if (!PAGES[p] && !MODULES[p] && !DOCS[p]) p = 'dashboard';
  location.hash = p; $$('.nav[data-p]').forEach(b => b.classList.toggle('active', b.dataset.p === p)); $('#side')?.classList.remove('open');
  $('#page').innerHTML = `<div class="empty">…</div>`;
  try { if (PAGES[p]) await PAGES[p](); else if (DOCS[p]) await docPage(p); else { const pre = MODULES[p](); for (const c of (pre.caches || [])) await loadCache(c); await crudPage(MODULES[p]()); } } catch (e) { err(e); }
}
function authScreen(msg) {
  document.documentElement.dir = isAr() ? 'rtl' : 'ltr';
  root.innerHTML = `<div class="auth"><div class="box"><img src="${LOGO}"><h1>${T('app')} — ${T('sub')}</h1>${msg ? `<p class="badge bad" style="margin-bottom:10px">${esc(msg)}</p>` : ''}
    <div class="tabs" style="justify-content:center"><button class="active" id="tl">${T('login')}</button><button id="ts">${T('signup')}</button></div>
    <input class="in" id="nm" placeholder="${T('full_name')}" style="display:none"><input class="in" id="em" type="email" placeholder="${T('email')}" dir="ltr"><input class="in" id="pw" type="password" placeholder="${T('password')}" dir="ltr">
    <button class="btn" id="goBtn">${T('login')}</button><p><a href="#" id="fg">${T('forgot')}</a> · <a href="#" id="lg">${T('language')}</a></p></div></div>`;
  let mode = 'login';
  $('#tl').onclick = () => { mode = 'login'; $('#tl').classList.add('active'); $('#ts').classList.remove('active'); $('#nm').style.display = 'none'; $('#goBtn').textContent = T('login'); };
  $('#ts').onclick = () => { mode = 'signup'; $('#ts').classList.add('active'); $('#tl').classList.remove('active'); $('#nm').style.display = ''; $('#goBtn').textContent = T('signup'); };
  $('#lg').onclick = e => { e.preventDefault(); LANG = isAr() ? 'en' : 'ar'; localStorage.setItem('hibr_lang', LANG); authScreen(); };
  $('#fg').onclick = async e => { e.preventDefault(); const em = $('#em').value; if (!em) return; const { error } = await sb.auth.resetPasswordForEmail(em, { redirectTo: location.origin + location.pathname }); if (error) err(error); else toast(T('check_email')); };
  $('#pw').onkeydown = e => { if (e.key === 'Enter') $('#goBtn').click(); };
  $('#goBtn').onclick = async () => {
    const email = $('#em').value.trim(), password = $('#pw').value; if (password.length < 6) return toast(T('min_pass'), true);
    $('#goBtn').disabled = true;
    try {
      if (mode === 'signup') { const { error } = await sb.auth.signUp({ email, password, options: { data: { full_name: $('#nm').value } } }); if (error) throw error; }
      else { const { error } = await sb.auth.signInWithPassword({ email, password }); if (error) throw error; }
      await boot();
    } catch (e) { err(e); $('#goBtn').disabled = false; }
  };
}
async function boot() {
  const { data: { session } } = await sb.auth.getSession();
  if (!session) return authScreen();
  USER = session.user;
  // password recovery flow
  if (location.hash.includes('type=recovery')) { const np = prompt(isAr() ? 'كلمة المرور الجديدة' : 'New password'); if (np) { await sb.auth.updateUser({ password: np }); location.hash = ''; } }
  const { data: p } = await sb.from('profiles').select('*').eq('id', USER.id).single();
  if (!p || !p.active) { await sb.auth.signOut(); return authScreen(T('inactive_user')); }
  PROFILE = p;
  const s = await q(sb.from('settings').select('value').eq('key', 'company').single()); COMPANY = s.value;
  shell(); go(location.hash.slice(1) || 'dashboard');
}
window.addEventListener('hashchange', () => { const p = location.hash.slice(1); if (PROFILE && p && !p.includes('=') && (PAGES[p] || MODULES[p] || DOCS[p])) { const active = $('.nav.active')?.dataset.p; if (active !== p) go(p); } });
boot();
