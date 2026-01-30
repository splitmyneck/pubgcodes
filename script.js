(function () {
  'use strict';

  const CURRENCY_SYMBOLS = {
    USD: '$',
    EUR: '€',
    RUB: '₽',
    BTC: '₿'
  };

  let currentCurrency = 'USD';

  // Переключение валюты
  document.querySelectorAll('.currency-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      currentCurrency = this.dataset.currency;
      document.querySelectorAll('.currency-btn').forEach(function (b) {
        b.classList.toggle('active', b.dataset.currency === currentCurrency);
      });
      updatePrices();
    });
  });

  function updatePrices() {
    document.querySelectorAll('.product-price').forEach(function (el) {
      const usd = el.dataset.usd;
      const eur = el.dataset.eur;
      const rub = el.dataset.rub;
      const btc = el.dataset.btc;
      if (!usd) return;
      let value, symbol;
      switch (currentCurrency) {
        case 'EUR':
          value = eur;
          symbol = CURRENCY_SYMBOLS.EUR;
          break;
        case 'RUB':
          value = rub;
          symbol = CURRENCY_SYMBOLS.RUB;
          break;
        case 'BTC':
          value = btc;
          symbol = CURRENCY_SYMBOLS.BTC;
          break;
        default:
          value = usd;
          symbol = CURRENCY_SYMBOLS.USD;
      }
      el.textContent = symbol + value;
    });
  }

  // Фильтр по категориям
  document.querySelectorAll('.filter-tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      const category = this.dataset.category;
      document.querySelectorAll('.filter-tab').forEach(function (t) {
        t.classList.toggle('active', t.dataset.category === category);
      });
      document.querySelectorAll('.product-card').forEach(function (card) {
        const cardCat = card.dataset.category;
        const show = category === 'all' || cardCat === category;
        card.classList.toggle('hidden', !show);
      });
    });
  });

  // Плавный скролл по якорям
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href === '#') return;
    a.addEventListener('click', function (e) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
