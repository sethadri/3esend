/* ============================================================
   3E Send — App JS
   ============================================================ */

// ── Navbar: scroll state + mobile menu ──
(function () {
  const nav = document.getElementById('nav');
  if (!nav) return;

  // Scroll effect
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  const toggle = document.getElementById('navToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('menu-open');
    });
  }
})();

// ── Transfer Calculator (homepage) ──
(function () {
  const amountInput = document.getElementById('sendAmount');
  const currencySelect = document.getElementById('receiveCurrency');
  const resultAmount = document.getElementById('resultAmount');
  const resultRate = document.getElementById('resultRate');
  const currencyLabel = document.getElementById('receiveCurrencyLabel');

  if (!amountInput || !currencySelect) return;

  function calculate() {
    const amount = parseFloat(amountInput.value) || 0;
    const selected = currencySelect.options[currencySelect.selectedIndex];
    const rate = parseFloat(selected.value);
    const code = selected.dataset.code;
    const fee = 2.99;
    const received = ((amount - fee) * rate).toFixed(2);

    if (currencyLabel) currencyLabel.textContent = code;
    if (resultAmount) {
      resultAmount.textContent = amount > fee
        ? Number(received).toLocaleString('en-GB', { minimumFractionDigits: 2 }) + ' ' + code
        : '—';
    }
    if (resultRate) {
      resultRate.textContent = `Rate: 1 GBP = ${rate} ${code} · Fee: £${fee}`;
    }
  }

  amountInput.addEventListener('input', calculate);
  currencySelect.addEventListener('change', calculate);
  calculate();
})();

// ── FAQ Accordion ──
(function () {
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      // Toggle clicked
      if (!isOpen) item.classList.add('open');
    });
  });
})();

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
