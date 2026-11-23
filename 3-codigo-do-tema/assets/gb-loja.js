/* Holdwellco: comportamento das seções gb-*. Sem dependências. Compatível com o editor do tema (shopify:section:load e unload). */
(function () {
  if (window.__gbLoja) return;
  window.__gbLoja = true;

  var cleanups = new WeakMap();

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function openDrawer(resp, trigger) {
    var drawer = document.querySelector('cart-drawer');
    if (!drawer) return false;
    if (resp && resp.sections && typeof drawer.renderContents === 'function') {
      drawer.classList.remove('is-empty');
      drawer.renderContents(resp);
      return true;
    }
    if (typeof drawer.open === 'function') { drawer.open(trigger); return true; }
    return false;
  }

  /* ---------- cabeçalho: o carrinho abre a gaveta do tema, se existir ---------- */
  function initCabecalho(root) {
    var link = $('[data-gb-cart]', root);
    var menu = $('[data-gb-menu]', root);
    if (!link && !menu) return function () {};
    var ctrl = new AbortController();
    if (menu) {
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.open) { menu.open = false; $('summary', menu).focus(); }
      }, { signal: ctrl.signal });
    }
    if (!link) return function () { ctrl.abort(); };
    link.addEventListener('click', function (e) {
      var drawer = document.querySelector('cart-drawer');
      if (drawer && typeof drawer.open === 'function') {
        e.preventDefault();
        drawer.open(link);
      }
    }, { signal: ctrl.signal });
    return function () { ctrl.abort(); };
  }

  function refreshCount() {
    fetch(((window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/') + 'cart.js', { headers: { 'Accept': 'application/json' } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (c) {
        if (!c) return;
        $$('[data-gb-cart-count]').forEach(function (el) {
          el.textContent = c.item_count;
          el.hidden = !c.item_count;
        });
      })
      .catch(function () {});
  }

  /* ---------- produto: galeria, variante, kits, adicional e carrinho ---------- */
  function initCompra(root) {
    var dataEl = $('[data-gb-data]', root);
    if (!dataEl) return function () {};
    var data;
    try { data = JSON.parse(dataEl.textContent); } catch (e) { return function () {}; }

    var ctrl = new AbortController();
    var on = function (el, ev, fn, opt) { if (el) el.addEventListener(ev, fn, Object.assign({ signal: ctrl.signal }, opt || {})); };

    var form = $('[data-gb-form]', root);
    var idInput = $('[data-gb-variant-id]', root);
    var addBtn = $('[data-gb-add]', root);
    var bar = $('[data-gb-bar]', root);
    var msg = $('[data-gb-msg]', root);
    var slides = $$('[data-gb-slide]', root);
    var thumbs = $$('[data-gb-thumb]', root);
    var cards = $$('[data-gb-q]', root);
    var variantBtns = $$('[data-gb-vid]', root);
    var addon = $('[data-gb-addon]', root);
    var addonSel = $('[data-gb-addon-var]', root);

    var byId = {};
    data.variantes.forEach(function (v) { byId[v.id] = v; });
    var state = { vid: Number(idInput ? idInput.value : data.variantes[0].id), q: 1, addon: false, avid: data.adicional ? data.adicional.id : 0, busy: false };
    if (data.kits && data.inicial) state.q = Number(data.inicial);
    /* link de um cartão de kit (?qty=2 ou 3): só vale com os kits ligados */
    function qtyFromUrl() {
      var m = /[?&]qty=([123])(?:&|#|$)/.exec(window.location.search + '&');
      return m ? Number(m[1]) : 0;
    }
    if (data.kits && qtyFromUrl()) state.q = qtyFromUrl();
    function adonCents() {
      if (!data.adicional) return 0;
      var vs = data.adicional.variantes || [];
      for (var i = 0; i < vs.length; i++) { if (vs[i].id === state.avid) return vs[i].cents; }
      return data.adicional.cents;
    }

    function fmt(c) {
      try {
        return new Intl.NumberFormat(data.locale || undefined, { style: 'currency', currency: data.moeda || 'USD' }).format(c / 100);
      } catch (e) { return '$' + (c / 100).toFixed(2); }
    }
    function setText(sel, text) { $$(sel, root).forEach(function (el) { el.textContent = text; }); }
    function showMsg(text) { if (msg) { msg.textContent = text || ''; msg.hidden = !text; } }

    /* preço do kit: mesma conta do Liquid, em centavos. Só vale com o desconto automático da loja ligado (kits_confirmados). */
    function tier(unit, q) {
      var pct = 0;
      if (data.kits) { pct = q === 3 ? data.pct3 : (q === 2 ? data.pct2 : 0); }
      return Math.round(unit * q * (100 - pct) / 100);
    }
    function current() { return byId[state.vid] || data.variantes[0]; }

    function render() {
      var v = current();
      var unit = v.cents;
      if (idInput) idInput.value = v.id;
      setText('[data-gb-preco]', fmt(unit));
      [1, 2, 3].forEach(function (n) {
        var t = tier(unit, n);
        setText('[data-gb-cp="' + n + '"]', fmt(t));
        setText('[data-gb-ce="' + n + '"]', fmt(Math.round(t / n)));
      });
      var total = tier(unit, state.q) + (state.addon && data.adicional ? adonCents() : 0);
      var ok = !!v.disponivel;
      [addBtn, $('[data-gb-add-bar]', root)].forEach(function (b) { if (b) { b.disabled = !ok; b.setAttribute('aria-disabled', ok ? 'false' : 'true'); } });
      setText('[data-gb-label]', ok ? data.textos.botao : data.textos.esgotado);
      $$('[data-gb-total-wrap]', root).forEach(function (w) { w.hidden = !ok; });
      setText('[data-gb-total]', fmt(total));
      cards.forEach(function (c) {
        var is = Number(c.getAttribute('data-gb-q')) === state.q;
        c.setAttribute('aria-checked', is ? 'true' : 'false');
        c.tabIndex = is ? 0 : -1;
      });
      variantBtns.forEach(function (b) {
        var is = Number(b.getAttribute('data-gb-vid')) === state.vid;
        b.setAttribute('aria-checked', is ? 'true' : 'false');
        b.tabIndex = is ? 0 : -1;
      });
      if (addon) addon.setAttribute('aria-checked', state.addon ? 'true' : 'false');
      if (data.adicional && data.adicional.variantes) {
        var vsA = data.adicional.variantes;
        for (var k = 0; k < vsA.length; k++) {
          if (vsA[k].id === state.avid) { setText('[data-gb-addon-price]', fmt(vsA[k].cents)); setText('[data-gb-addon-vt]', vsA[k].titulo); }
        }
      }
      var conta = '';
      if (state.q === 1) { conta = data.textos.conta1 || ''; }
      else if (data.kits) {
        var save = unit * state.q - tier(unit, state.q);
        conta = data.textos.economia + ' ' + fmt(save) + (data.textos.guia ? ', ' + data.textos.guia : '');
      }
      setText('[data-gb-conta]', conta);
      showMsg('');
    }

    function showSlide(i) {
      slides.forEach(function (s, n) { s.classList.toggle('is-on', n === i); });
      thumbs.forEach(function (t, n) { t.setAttribute('aria-pressed', n === i ? 'true' : 'false'); });
    }
    thumbs.forEach(function (t, n) { on(t, 'click', function () { showSlide(n); }); });

    function arrows(e, items, apply) {
      var dir = (e.key === 'ArrowRight' || e.key === 'ArrowDown') ? 1 : ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') ? -1 : 0);
      if (!dir) return;
      e.preventDefault();
      var i = items.indexOf(e.currentTarget);
      var next = items[(i + dir + items.length) % items.length];
      apply(next);
      next.focus();
    }
    cards.forEach(function (c) {
      on(c, 'click', function () { state.q = Number(c.getAttribute('data-gb-q')); render(); });
      on(c, 'keydown', function (e) { arrows(e, cards, function (n) { state.q = Number(n.getAttribute('data-gb-q')); render(); }); });
    });
    variantBtns.forEach(function (b) {
      on(b, 'click', function () { state.vid = Number(b.getAttribute('data-gb-vid')); render(); });
      on(b, 'keydown', function (e) { arrows(e, variantBtns, function (n) { state.vid = Number(n.getAttribute('data-gb-vid')); render(); }); });
    });
    on(addon, 'click', function () { state.addon = !state.addon; render(); });
    on(addonSel, 'change', function () { state.avid = Number(addonSel.value); render(); });
    /* cartão de kit (seção de kits): marca a quantidade na compra. Sem kits ligados, não muda nada. */
    $$('[data-gb-kit]', document).forEach(function (a) {
      on(a, 'click', function (e) {
        if (!data.kits) return;
        e.preventDefault();
        state.q = Number(a.getAttribute('data-gb-kit'));
        render();
        root.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    /* barra fixa no celular: aparece quando o botão principal sai da tela por cima */
    var io = null;
    if (bar && addBtn && 'IntersectionObserver' in window) {
      var footer = document.querySelector('.gb-rodape');
      io = new IntersectionObserver(function (entries) {
        var e = entries[0];
        var show = !e.isIntersecting && e.boundingClientRect.top < 0;
        if (show && footer && footer.getBoundingClientRect().top < window.innerHeight) show = false;
        bar.classList.toggle('is-on', show);
      });
      io.observe(addBtn);
    }

    /* carrinho: um add.js com todas as unidades; depois abre a gaveta do tema ou vai ao carrinho */
    function add(e) {
      if (e) e.preventDefault();
      var v = current();
      if (state.busy || !v.disponivel) return;
      var items = [{ id: v.id, quantity: state.q }];
      if (state.addon && data.adicional) items.push({ id: state.avid || data.adicional.id, quantity: 1 });
      state.busy = true;
      if (addBtn) addBtn.setAttribute('aria-busy', 'true');
      showMsg('');
      fetch(data.cartAdd, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ items: items, sections: 'cart-drawer,cart-icon-bubble', sections_url: window.location.pathname })
      }).then(function (r) {
        return r.json().then(function (j) { if (!r.ok) throw new Error(j.description || j.message || 'error'); return j; });
      }).then(function (j) {
        state.busy = false;
        if (addBtn) addBtn.removeAttribute('aria-busy');
        refreshCount();
        if (!openDrawer(j, addBtn)) window.location.href = data.cart;
      }).catch(function (err) {
        state.busy = false;
        if (addBtn) addBtn.removeAttribute('aria-busy');
        showMsg(err && err.message && err.message !== 'error' ? err.message : data.textos.erro);
      });
    }
    on(form, 'submit', add);
    on($('[data-gb-add-bar]', root), 'click', function () { add(); });

    render();

    return function () {
      ctrl.abort();
      if (io) io.disconnect();
    };
  }

  var inits = { compra: initCompra, cabecalho: initCabecalho };

  function start(scope) {
    var all = $$('[data-gb-section]', scope);
    if (scope.matches && scope.matches('[data-gb-section]')) all.push(scope);
    all.forEach(function (el) {
      var fn = inits[el.getAttribute('data-gb-section')];
      if (!fn || cleanups.has(el)) return;
      cleanups.set(el, fn(el));
    });
  }
  function stop(scope) {
    var all = $$('[data-gb-section]', scope);
    if (scope.matches && scope.matches('[data-gb-section]')) all.push(scope);
    all.forEach(function (el) {
      var c = cleanups.get(el);
      if (c) { c(); cleanups.delete(el); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { start(document); });
  else start(document);
  document.addEventListener('shopify:section:load', function (e) { start(e.target); });
  document.addEventListener('shopify:section:unload', function (e) { stop(e.target); });
})();
