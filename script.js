(function () {
  var root = document.documentElement;
  var supportsIO = 'IntersectionObserver' in window;

  /* Scroll reveal: fade sections in as they scroll into view.
     Anything already on screen (or above it) at load stays put, so nothing flashes. */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (supportsIO && reveals.length) {
    var vh = window.innerHeight;
    var pending = reveals.filter(function (el) {
      if (el.getBoundingClientRect().top < vh * 0.92) {
        el.classList.add('is-in');
        return false;
      }
      return true;
    });
    root.classList.add('reveal-ready');

    var revealObserver = new IntersectionObserver(function (entries) {
      var batch = entries.filter(function (e) { return e.isIntersecting; });
      // Items arriving together (e.g. a row of cards) cascade slightly, capped so nothing waits long.
      batch.forEach(function (entry, i) {
        var el = entry.target;
        el.style.setProperty('--reveal-delay', Math.min(i, 3) * 70 + 'ms');
        el.classList.add('is-in');
        revealObserver.unobserve(el);
        el.addEventListener('transitionend', function clear() {
          el.style.removeProperty('--reveal-delay');
          el.removeEventListener('transitionend', clear);
        });
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    pending.forEach(function (el) { revealObserver.observe(el); });

    // A jump (hash link, reduced-motion scroll) can skip past cards without them ever
    // intersecting; show anything that ends up above the viewport straight away.
    var catchUp = function () {
      pending = pending.filter(function (el) {
        if (el.classList.contains('is-in')) return false;
        if (el.getBoundingClientRect().bottom < 0) {
          el.classList.add('is-in');
          revealObserver.unobserve(el);
          return false;
        }
        return true;
      });
      if (!pending.length) window.removeEventListener('scroll', onScroll);
    };
    var queued = false;
    var onScroll = function () {
      if (!queued) { queued = true; requestAnimationFrame(function () { queued = false; catchUp(); }); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Nav: mark the section currently in view. */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  if (supportsIO && links.length) {
    var byId = {};
    links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = byId[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(function (a) { a.removeAttribute('aria-current'); });
          link.setAttribute('aria-current', 'true');
        } else if (link.getAttribute('aria-current')) {
          link.removeAttribute('aria-current');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) spy.observe(section);
    });
  }

  /* Mobile back-to-top: appears once you're a screen down. */
  var toTop = document.querySelector('.to-top');
  if (toTop) {
    var ticking = false;
    var update = function () {
      toTop.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.9);
      ticking = false;
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* After jumping to the top, return keyboard focus there too. */
  document.querySelectorAll('a[href="#top"]').forEach(function (a) {
    a.addEventListener('click', function () {
      var logo = document.querySelector('.nav__logo');
      if (logo && a !== logo) logo.focus({ preventScroll: true });
    });
  });
})();
