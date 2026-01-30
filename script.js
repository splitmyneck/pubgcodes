(function () {
  'use strict';

  const CURRENCY_SYMBOLS = { USD: '$', EUR: '€', RUB: '₽', BTC: '₿' };

  const PRODUCTS = [
    { id: '1', title: 'Набор предметов «Боец»', desc: 'Код на набор из 5 случайных предметов для PUBG.', category: 'items', img: 'https://placehold.co/280x180/2d3748/e8a855?text=Item+Code', usd: '4.99', eur: '4.49', rub: '499', btc: '0.00012' },
    { id: '2', title: 'Сет «Тёмный охотник»', desc: 'Полный сет одежды: куртка, штаны, обувь, кепка.', category: 'outfits', img: 'https://placehold.co/280x180/2d3748/e8a855?text=Outfit+Set', usd: '12.99', eur: '11.99', rub: '1299', btc: '0.00031' },
    { id: '3', title: 'Скин M416 «Неон»', desc: 'Эксклюзивный скин на M416 с неоновой подсветкой.', category: 'weapon-skins', img: 'https://placehold.co/280x180/2d3748/e8a855?text=Weapon+Skin', usd: '8.49', eur: '7.99', rub: '849', btc: '0.00020' },
    { id: '4', title: 'Мега-лутбокс', desc: 'Код на мега-лутбокс с гарантированным редким предметом.', category: 'items', img: 'https://placehold.co/280x180/2d3748/e8a855?text=Loot+Box', usd: '19.99', eur: '18.49', rub: '1999', btc: '0.00048' },
    { id: '5', title: 'Сет «Элита»', desc: 'Премиум сет одежды с уникальной анимацией.', category: 'outfits', img: 'https://placehold.co/280x180/2d3748/e8a855?text=Set+Elite', usd: '24.99', eur: '22.99', rub: '2499', btc: '0.00060' },
    { id: '6', title: 'Скин AKM «Дракон»', desc: 'Легендарный скин на AKM в стиле дракона.', category: 'weapon-skins', img: 'https://placehold.co/280x180/2d3748/e8a855?text=AKM+Skin', usd: '14.99', eur: '13.99', rub: '1499', btc: '0.00036' }
  ];

  let state = {
    currency: 'USD',
    filterCategory: 'all',
    cart: []
  };

  function getRoute() {
    const hash = (window.location.hash || '#/').slice(1);
    return hash === '' ? '/' : (hash.startsWith('/') ? hash : '/' + hash);
  }

  function setRoute(path) {
    window.location.hash = path === '/' ? '' : path;
  }

  function formatPrice(p) {
    const sym = CURRENCY_SYMBOLS[state.currency] || CURRENCY_SYMBOLS.USD;
    const key = state.currency === 'BTC' ? 'btc' : state.currency.toLowerCase();
    const val = p[key];
    return (sym + (val != null ? val : p.usd));
  }

  function viewHome() {
    return `
      <section class="hero">
        <div class="hero-inner">
          <h1 class="hero-title">
            Коды для <span class="highlight">PUBG</span><br>
            <span class="hero-sub">предметы · сеты · скины</span>
          </h1>
          <p class="hero-desc">
            Покупайте коды предметов, сетов одежды и скинов на оружие. Оплата в долларах, евро, рублях и криптовалюте.
          </p>
          <div class="hero-actions">
            <a href="#/catalog" class="btn btn-primary btn-lg" data-route="/catalog">Смотреть каталог</a>
            <a href="#/how" class="btn btn-ghost btn-lg" data-route="/how">Как купить</a>
          </div>
        </div>
      </section>
    `;
  }

  function viewCatalog() {
    const category = state.filterCategory;
    const cards = PRODUCTS.map(p => {
      const show = category === 'all' || p.category === category;
      return `
      <article class="product-card ${show ? '' : 'hidden'}" data-category="${p.category}" data-id="${p.id}">
        <div class="product-image">
          <img src="${p.img}" alt="${p.title}">
        </div>
        <div class="product-body">
          <h3 class="product-title">${p.title}</h3>
          <p class="product-desc">${p.desc}</p>
          <div class="product-meta">
            <span class="product-price" data-usd="${p.usd}" data-eur="${p.eur}" data-rub="${p.rub}" data-btc="${p.btc}">${formatPrice(p)}</span>
            <button type="button" class="btn btn-primary btn-sm" data-action="add-cart" data-id="${p.id}">Купить</button>
          </div>
        </div>
      </article>
    `;
    }).join('');

    return `
      <section class="filters">
        <div class="filters-inner">
          <div class="filter-tabs">
            <button type="button" class="filter-tab ${category === 'all' ? 'active' : ''}" data-category="all">Всё</button>
            <button type="button" class="filter-tab ${category === 'items' ? 'active' : ''}" data-category="items">Предметы</button>
            <button type="button" class="filter-tab ${category === 'outfits' ? 'active' : ''}" data-category="outfits">Сеты</button>
            <button type="button" class="filter-tab ${category === 'weapon-skins' ? 'active' : ''}" data-category="weapon-skins">Скины оружия</button>
          </div>
          <select class="sort-select" aria-label="Сортировка">
            <option value="popular">По популярности</option>
            <option value="price-asc">Сначала дешевле</option>
            <option value="price-desc">Сначала дороже</option>
            <option value="new">Новинки</option>
          </select>
        </div>
      </section>
      <section class="catalog" id="catalog">
        <div class="catalog-inner">
          <div class="product-grid" id="product-grid">${cards}</div>
        </div>
      </section>
    `;
  }

  function viewHow() {
    return `
      <section class="how" id="how">
        <div class="how-inner">
          <h2 class="section-title">Как оплатить</h2>
          <div class="payment-methods">
            <div class="payment-card">
              <span class="payment-icon">$</span>
              <h3>Доллары (USD)</h3>
              <p>Карты Visa, Mastercard, PayPal</p>
            </div>
            <div class="payment-card">
              <span class="payment-icon">€</span>
              <h3>Евро (EUR)</h3>
              <p>Карты и электронные кошельки</p>
            </div>
            <div class="payment-card">
              <span class="payment-icon">₽</span>
              <h3>Рубли (RUB)</h3>
              <p>СБП, карты РФ, ЮMoney</p>
            </div>
            <div class="payment-card">
              <span class="payment-icon">₿</span>
              <h3>Криптовалюта</h3>
              <p>BTC, ETH, USDT и другие</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function viewCart() {
    if (state.cart.length === 0) {
      return `
        <section class="cart-view">
          <div class="cart-inner">
            <h2 class="section-title">Корзина</h2>
            <p class="cart-empty">Корзина пуста. <a href="#/catalog" data-route="/catalog">Перейти в каталог</a></p>
          </div>
        </section>
      `;
    }
    const items = state.cart.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    const list = items.map(p => `
      <div class="cart-item" data-id="${p.id}">
        <img src="${p.img}" alt="" class="cart-item-img">
        <div class="cart-item-info">
          <strong>${p.title}</strong>
          <span class="product-price" data-usd="${p.usd}" data-eur="${p.eur}" data-rub="${p.rub}" data-btc="${p.btc}">${formatPrice(p)}</span>
        </div>
        <button type="button" class="btn btn-ghost btn-sm" data-action="remove-cart" data-id="${p.id}">Удалить</button>
      </div>
    `).join('');
    return `
      <section class="cart-view">
        <div class="cart-inner">
          <h2 class="section-title">Корзина</h2>
          <div class="cart-list">${list}</div>
          <p class="cart-total">Товаров: ${items.length}</p>
        </div>
      </section>
    `;
  }

  function viewLogin() {
    return `
      <section class="login-view">
        <div class="login-inner">
          <h2 class="section-title">Вход</h2>
          <form class="login-form" data-action="login-submit">
            <input type="text" placeholder="Email или логин" class="search" aria-label="Логин">
            <input type="password" placeholder="Пароль" class="search" aria-label="Пароль">
            <button type="submit" class="btn btn-primary">Войти</button>
          </form>
          <p class="login-hint">Демо-страница. Форма не отправляет данные.</p>
        </div>
      </section>
    `;
  }

  const VIEWS = {
    '/': viewHome,
    '/catalog': viewCatalog,
    '/how': viewHow,
    '/cart': viewCart,
    '/login': viewLogin
  };

  const TITLES = {
    '/': 'PUBG Codes — Главная',
    '/catalog': 'PUBG Codes — Каталог',
    '/how': 'PUBG Codes — Оплата',
    '/cart': 'PUBG Codes — Корзина',
    '/login': 'PUBG Codes — Вход'
  };

  function render() {
    const route = getRoute();
    const viewFn = VIEWS[route] || VIEWS['/'];
    const app = document.getElementById('app');
    if (!app) return;

    app.innerHTML = viewFn();
    document.title = TITLES[route] || TITLES['/'];

    if (route === '/catalog') updatePrices();
    if (route === '/cart') updatePrices();
  }

  function updatePrices() {
    document.querySelectorAll('.product-price').forEach(function (el) {
      const usd = el.dataset.usd;
      const eur = el.dataset.eur;
      const rub = el.dataset.rub;
      const btc = el.dataset.btc;
      if (!usd) return;
      let value, symbol;
      switch (state.currency) {
        case 'EUR': value = eur; symbol = CURRENCY_SYMBOLS.EUR; break;
        case 'RUB': value = rub; symbol = CURRENCY_SYMBOLS.RUB; break;
        case 'BTC': value = btc; symbol = CURRENCY_SYMBOLS.BTC; break;
        default: value = usd; symbol = CURRENCY_SYMBOLS.USD;
      }
      el.textContent = symbol + value;
    });
  }

  function initRouter() {
    window.addEventListener('hashchange', render);
    window.addEventListener('load', render);
  }

  function initNav() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link || link.getAttribute('href') === '#') return;
      const href = link.getAttribute('href');
      if (href.startsWith('#/')) {
        e.preventDefault();
        setRoute(href.slice(1));
      }
    });
  }

  function initCurrency() {
    document.querySelectorAll('.currency-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.currency = this.dataset.currency;
        document.querySelectorAll('.currency-btn').forEach(function (b) {
          b.classList.toggle('active', b.dataset.currency === state.currency);
        });
        updatePrices();
      });
    });
  }

  function initAppDelegation() {
    document.getElementById('app').addEventListener('click', function (e) {
      const route = getRoute();

      const filterTab = e.target.closest('.filter-tab');
      if (filterTab && route === '/catalog') {
        e.preventDefault();
        state.filterCategory = filterTab.dataset.category;
        document.querySelectorAll('.filter-tab').forEach(function (t) {
          t.classList.toggle('active', t.dataset.category === state.filterCategory);
        });
        document.querySelectorAll('.product-card').forEach(function (card) {
          const show = state.filterCategory === 'all' || card.dataset.category === state.filterCategory;
          card.classList.toggle('hidden', !show);
        });
        return;
      }

      const addBtn = e.target.closest('[data-action="add-cart"]');
      if (addBtn) {
        e.preventDefault();
        const id = addBtn.dataset.id;
        if (id) state.cart.push(id);
        return;
      }

      const removeBtn = e.target.closest('[data-action="remove-cart"]');
      if (removeBtn) {
        e.preventDefault();
        const id = removeBtn.dataset.id;
        state.cart = state.cart.filter(x => x !== id);
        render();
        return;
      }

      const loginForm = e.target.closest('[data-action="login-submit"]');
      if (loginForm && e.target.type === 'submit') {
        e.preventDefault();
        return;
      }
    });
  }

  function init() {
    initRouter();
    initNav();
    initCurrency();
    initAppDelegation();
  }

  init();
})();
