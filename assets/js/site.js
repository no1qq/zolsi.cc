(function () {
  var root = document.documentElement;

  var toggle = document.querySelector('.nav-toggle');
  var list = document.getElementById('primary-nav');

  if (toggle && list) {
    var mq = window.matchMedia('(min-width: 64em)');
    toggle.hidden = false;

    var setCollapsed = function (collapsed) {
      list.setAttribute('data-collapsed', collapsed ? 'true' : 'false');
      toggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    };

    var sync = function () {
      if (mq.matches) {
        list.setAttribute('data-collapsed', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        setCollapsed(true);
      }
    };

    sync();
    mq.addEventListener('change', sync);

    toggle.addEventListener('click', function () {
      setCollapsed(list.getAttribute('data-collapsed') !== 'true');
    });

    list.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mq.matches) {
        setCollapsed(true);
        toggle.focus();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !mq.matches && document.activeElement === toggle) {
        setCollapsed(true);
      }
    });
  }

  var sizes = ['normal', 'large', 'xlarge'];
  var buttons = Array.prototype.slice.call(document.querySelectorAll('[data-size]'));

  if (buttons.length) {
    var apply = function (size, save) {
      if (sizes.indexOf(size) === -1) size = 'normal';
      if (size === 'normal') {
        root.removeAttribute('data-text');
      } else {
        root.setAttribute('data-text', size);
      }
      buttons.forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-size') === size ? 'true' : 'false');
      });
      if (save) {
        try {
          localStorage.setItem('zolsi-text', size);
        } catch (err) {}
      }
    };

    var stored = 'normal';
    try {
      stored = localStorage.getItem('zolsi-text') || 'normal';
    } catch (err) {}

    apply(stored, false);

    buttons.forEach(function (b) {
      b.addEventListener('click', function () {
        apply(b.getAttribute('data-size'), true);
      });
    });
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var faqItems = document.querySelectorAll('.faq details');

  var EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';
  var OPEN_MS = 320;
  var CLOSE_MS = 260;

  Array.prototype.forEach.call(faqItems, function (item) {
    var summary = item.querySelector('summary');
    var body = item.querySelector('.faq-body');
    if (!summary || !body) return;

    var timer = null;
    var busy = false;

    var clear = function () {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      body.removeEventListener('transitionend', onEnd);
    };

    function onEnd(e) {
      if (e && (e.target !== body || e.propertyName !== 'height')) return;
      clear();
      if (item.hasAttribute('data-closing')) {
        item.open = false;
        item.removeAttribute('data-closing');
      }
      body.style.transition = '';
      body.style.height = '';
      body.style.overflow = '';
      busy = false;
    }

    var run = function (from, to, ms) {
      body.style.overflow = 'hidden';
      body.style.transition = 'none';
      body.style.height = from + 'px';
      void body.offsetHeight;
      body.style.transition = 'height ' + ms + 'ms ' + EASE;
      body.style.height = to + 'px';
      body.addEventListener('transitionend', onEnd);
      timer = setTimeout(onEnd, ms + 120);
    };

    var fullHeight = function () {
      var prev = body.style.height;
      body.style.transition = 'none';
      body.style.height = 'auto';
      var h = body.offsetHeight;
      body.style.height = prev;
      return h;
    };

    summary.addEventListener('click', function (e) {
      if (reduceMotion.matches) return;
      e.preventDefault();
      clear();

      var current = busy
        ? parseFloat(window.getComputedStyle(body).height) || 0
        : item.open
          ? body.offsetHeight
          : 0;
      busy = true;

      if (item.open && !item.hasAttribute('data-closing')) {
        item.setAttribute('data-closing', '');
        run(current, 0, CLOSE_MS);
      } else {
        item.removeAttribute('data-closing');
        item.open = true;
        run(current, fullHeight(), OPEN_MS);
      }
    });
  });

  var reveals = document.querySelectorAll('.reveal');
  var motionOk = !reduceMotion.matches;

  if (reveals.length && motionOk && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    Array.prototype.forEach.call(reveals, function (el) {
      io.observe(el);
    });
  } else {
    Array.prototype.forEach.call(reveals, function (el) {
      el.classList.add('is-in');
    });
  }
})();
