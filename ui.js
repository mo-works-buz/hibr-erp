/* Hibr Press — mobile menu: overlay + auto-close + menu button label */
(function () {
  const _shell = shell;
  window.shell = function () {
    _shell();
    const side = $('#side'), btn = $('#menuBtn');
    let ov = $('#overlay'); if (!ov) { ov = document.createElement('div'); ov.id = 'overlay'; document.body.appendChild(ov); }
    const close = () => { side.classList.remove('open'); ov.classList.remove('show'); };
    btn.textContent = '☰ ' + (isAr() ? 'القائمة' : 'Menu');
    btn.onclick = () => { side.classList.toggle('open'); ov.classList.toggle('show', side.classList.contains('open')); };
    ov.onclick = close;
    $$('.nav', side).forEach(b => b.addEventListener('click', close));
  };
})();
