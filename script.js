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

  const btnPrimary = 'inline-flex items-center justify-center px-4 py-2 font-semibold rounded-pubg-sm cursor-pointer border-none text-pubg-dark bg-pubg-accent hover:bg-pubg-accent-hover hover:text-pubg-dark transition-colors';
  const btnPrimarySm = 'inline-flex items-center justify-center py-1.5 px-3 text-[13px] font-semibold rounded-pubg-sm cursor-pointer border-none text-pubg-dark bg-pubg-accent hover:bg-pubg-accent-hover hover:text-pubg-dark transition-colors';
  const btnGhost = 'inline-flex items-center justify-center px-4 py-2 font-semibold rounded-pubg-sm cursor-pointer border-none text-[#a1a1a6] bg-transparent hover:text-[#f5f5f7] hover:bg-pubg-accent-muted transition-colors';
  const btnGhostSm = 'inline-flex items-center justify-center py-1.5 px-3 text-[13px] font-semibold rounded-pubg-sm cursor-pointer border-none text-[#a1a1a6] bg-transparent hover:text-[#f5f5f7] hover:bg-pubg-accent-muted transition-colors';
  const btnPrimaryLg = 'inline-flex items-center justify-center py-3 px-6 text-base font-semibold rounded-pubg-sm cursor-pointer border-none text-pubg-dark bg-pubg-accent hover:bg-pubg-accent-hover hover:text-pubg-dark transition-colors';
  const btnGhostLg = 'inline-flex items-center justify-center py-3 px-6 text-base font-semibold rounded-pubg-sm cursor-pointer border-none text-[#a1a1a6] bg-transparent hover:text-[#f5f5f7] hover:bg-pubg-accent-muted transition-colors';

  function viewHome() {
    return `
      <section class="py-20 px-6 pb-24 text-center bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(232,168,85,0.2),transparent_60%)]">
        <div class="max-w-[720px] mx-auto">
          <h1 class="mb-4 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-tight">
            Коды для <span class="text-pubg-accent">PUBG</span><br>
            <span class="font-normal text-[#a1a1a6]">предметы · сеты · скины</span>
          </h1>
          <p class="mb-8 text-lg text-[#a1a1a6]">
            Покупайте коды предметов, сетов одежды и скинов на оружие. Оплата в долларах, евро, рублях и криптовалюте.
          </p>
          <div class="flex gap-3 justify-center flex-wrap">
            <a href="#/catalog" class="btn btn-primary ${btnPrimaryLg}" data-route="/catalog">Смотреть каталог</a>
            <a href="#/how" class="btn btn-ghost ${btnGhostLg}" data-route="/how">Как купить</a>
          </div>
        </div>
      </section>
    `;
  }

  function viewCatalog() {
    const category = state.filterCategory;
    const filterTab = (c, label) => `
      <button type="button" class="filter-tab px-4 py-2 font-medium border-none rounded-md cursor-pointer transition-colors text-[#a1a1a6] bg-transparent hover:text-[#f5f5f7] ${category === c ? 'active' : ''}" data-category="${c}">${label}</button>`;
    const cards = PRODUCTS.map(p => {
      const show = category === 'all' || p.category === category;
      return `
      <article class="product-card bg-pubg-card border border-pubg-border rounded-pubg overflow-hidden transition-all hover:bg-pubg-card-hover hover:border-pubg-accent hover:-translate-y-0.5 hover:shadow-pubg ${show ? '' : 'hidden'}" data-category="${p.category}" data-id="${p.id}">
        <div class="aspect-[280/180] bg-pubg-darker overflow-hidden">
          <img src="${p.img}" alt="${p.title}" class="w-full h-full object-cover block">
        </div>
        <div class="p-4">
          <h3 class="mb-2 text-[1.1rem] font-semibold text-[#f5f5f7]">${p.title}</h3>
          <p class="mb-4 text-sm text-[#a1a1a6] leading-snug line-clamp-2">${p.desc}</p>
          <div class="flex items-center justify-between gap-3">
            <span class="product-price font-bold text-xl text-pubg-accent" data-usd="${p.usd}" data-eur="${p.eur}" data-rub="${p.rub}" data-btc="${p.btc}">${formatPrice(p)}</span>
            <button type="button" class="btn btn-primary ${btnPrimarySm}" data-action="add-cart" data-id="${p.id}">Купить</button>
          </div>
        </div>
      </article>
    `;
    }).join('');

    return `
      <section class="px-6 pb-6">
        <div class="max-w-[1400px] mx-auto flex items-center justify-between gap-4 flex-wrap">
          <div class="filter-tabs flex gap-1 bg-pubg-darker p-1 rounded-pubg-sm border border-pubg-border">
            ${filterTab('all', 'Всё')}
            ${filterTab('items', 'Предметы')}
            ${filterTab('outfits', 'Сеты')}
            ${filterTab('weapon-skins', 'Скины оружия')}
          </div>
          <select class="sort-select px-3 py-2 font-inherit text-[#f5f5f7] bg-pubg-darker border border-pubg-border rounded-pubg-sm cursor-pointer outline-none focus:border-pubg-accent" aria-label="Сортировка">
            <option value="popular">По популярности</option>
            <option value="price-asc">Сначала дешевле</option>
            <option value="price-desc">Сначала дороже</option>
            <option value="new">Новинки</option>
          </select>
        </div>
      </section>
      <section class="catalog px-6 pb-20" id="catalog">
        <div class="max-w-[1400px] mx-auto">
          <div class="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5" id="product-grid">${cards}</div>
        </div>
      </section>
    `;
  }

  function viewHow() {
    return `
      <section class="how py-16 px-6 pb-20 bg-pubg-darker" id="how">
        <div class="max-w-[1200px] mx-auto">
          <h2 class="section-title mb-8 text-[1.75rem] font-bold text-center">Как оплатить</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div class="payment-card p-6 bg-pubg-card border border-pubg-border rounded-pubg text-center transition-colors hover:border-pubg-accent hover:bg-pubg-card-hover">
              <span class="block mb-3 text-3xl font-bold text-pubg-accent">$</span>
              <h3 class="mb-2 text-[1.1rem] font-semibold">Доллары (USD)</h3>
              <p class="m-0 text-sm text-[#a1a1a6]">Карты Visa, Mastercard, PayPal</p>
            </div>
            <div class="payment-card p-6 bg-pubg-card border border-pubg-border rounded-pubg text-center transition-colors hover:border-pubg-accent hover:bg-pubg-card-hover">
              <span class="block mb-3 text-3xl font-bold text-pubg-accent">€</span>
              <h3 class="mb-2 text-[1.1rem] font-semibold">Евро (EUR)</h3>
              <p class="m-0 text-sm text-[#a1a1a6]">Карты и электронные кошельки</p>
            </div>
            <div class="payment-card p-6 bg-pubg-card border border-pubg-border rounded-pubg text-center transition-colors hover:border-pubg-accent hover:bg-pubg-card-hover">
              <span class="block mb-3 text-3xl font-bold text-pubg-accent">₽</span>
              <h3 class="mb-2 text-[1.1rem] font-semibold">Рубли (RUB)</h3>
              <p class="m-0 text-sm text-[#a1a1a6]">СБП, карты РФ, ЮMoney</p>
            </div>
            <div class="payment-card p-6 bg-pubg-card border border-pubg-border rounded-pubg text-center transition-colors hover:border-pubg-accent hover:bg-pubg-card-hover">
              <span class="block mb-3 text-3xl font-bold text-pubg-accent">₿</span>
              <h3 class="mb-2 text-[1.1rem] font-semibold">Криптовалюта</h3>
              <p class="m-0 text-sm text-[#a1a1a6]">BTC, ETH, USDT и другие</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  function viewCart() {
    if (state.cart.length === 0) {
      return `
        <section class="cart-view py-16 px-6 pb-20">
          <div class="max-w-[720px] mx-auto">
            <h2 class="section-title mb-8 text-[1.75rem] font-bold text-center">Корзина</h2>
            <p class="cart-empty text-center text-[#a1a1a6]">Корзина пуста. <a href="#/catalog" class="text-pubg-accent" data-route="/catalog">Перейти в каталог</a></p>
          </div>
        </section>
      `;
    }
    const items = state.cart.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
    const list = items.map(p => `
      <div class="cart-item flex items-center gap-4 p-4 bg-pubg-card border border-pubg-border rounded-pubg" data-id="${p.id}">
        <img src="${p.img}" alt="" class="cart-item-img w-16 h-16 object-cover rounded-pubg-sm">
        <div class="cart-item-info flex-1 flex flex-col gap-1">
          <strong class="text-[#f5f5f7]">${p.title}</strong>
          <span class="product-price font-bold text-pubg-accent" data-usd="${p.usd}" data-eur="${p.eur}" data-rub="${p.rub}" data-btc="${p.btc}">${formatPrice(p)}</span>
        </div>
        <button type="button" class="btn btn-ghost ${btnGhostSm}" data-action="remove-cart" data-id="${p.id}">Удалить</button>
      </div>
    `).join('');
    return `
      <section class="cart-view py-16 px-6 pb-20">
        <div class="max-w-[720px] mx-auto">
          <h2 class="section-title mb-8 text-[1.75rem] font-bold text-center">Корзина</h2>
          <div class="cart-list flex flex-col gap-3 mb-6">${list}</div>
          <p class="cart-total font-semibold text-[#a1a1a6]">Товаров: ${items.length}</p>
        </div>
      </section>
    `;
  }

  function viewLogin() {
    return `
      <section class="login-view py-16 px-6 pb-20">
        <div class="max-w-[400px] mx-auto">
          <h2 class="section-title mb-8 text-[1.75rem] font-bold text-center">Вход</h2>
          <form class="login-form flex flex-col gap-3 [&_.search]:w-full [&_.search]:box-border" data-action="login-submit">
            <input type="text" placeholder="Email или логин" class="search py-2 px-3 font-inherit text-[#f5f5f7] bg-pubg-darker border border-pubg-border rounded-pubg-sm outline-none placeholder:text-pubg-muted focus:border-pubg-accent" aria-label="Логин">
            <input type="password" placeholder="Пароль" class="search py-2 px-3 font-inherit text-[#f5f5f7] bg-pubg-darker border border-pubg-border rounded-pubg-sm outline-none placeholder:text-pubg-muted focus:border-pubg-accent" aria-label="Пароль">
            <button type="submit" class="btn btn-primary ${btnPrimary}">Войти</button>
          </form>
          <p class="login-hint mt-4 text-[13px] text-pubg-muted text-center">Демо-страница. Форма не отправляет данные.</p>
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
