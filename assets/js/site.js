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

  if (faqItems.length && typeof Element.prototype.animate === 'function') {
    Array.prototype.forEach.call(faqItems, function (item) {
      var summary = item.querySelector('summary');
      var body = item.querySelector('.faq-body');
      if (!summary || !body) return;
      var running = null;

      var settle = function () {
        body.style.overflow = '';
        running = null;
      };

      summary.addEventListener('click', function (e) {
        if (reduceMotion.matches) return;
        e.preventDefault();

        if (running) {
          running.cancel();
          running = null;
        }

        body.style.overflow = 'hidden';

        if (item.open) {
          var from = body.offsetHeight;
          running = body.animate(
            [
              { height: from + 'px', opacity: 1 },
              { height: '0px', opacity: 0 }
            ],
            { duration: 260, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
          );
          running.onfinish = function () {
            item.open = false;
            settle();
          };
          running.oncancel = settle;
        } else {
          item.open = true;
          var to = body.offsetHeight;
          running = body.animate(
            [
              { height: '0px', opacity: 0 },
              { height: to + 'px', opacity: 1 }
            ],
            { duration: 320, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
          );
          running.onfinish = settle;
          running.oncancel = settle;
        }
      });
    });
  }

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
