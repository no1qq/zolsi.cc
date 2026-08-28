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
  var sizeSelect = document.getElementById('text-size');
  var sizeButtons = Array.prototype.slice.call(
    document.querySelectorAll('.textsize-seg button')
  );

  if (sizeSelect || sizeButtons.length) {
    var apply = function (size, save) {
      if (sizes.indexOf(size) === -1) size = 'normal';
      if (size === 'normal') {
        root.removeAttribute('data-text');
      } else {
        root.setAttribute('data-text', size);
      }
      if (sizeSelect && sizeSelect.value !== size) sizeSelect.value = size;
      sizeButtons.forEach(function (b) {
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

    if (sizeSelect) {
      sizeSelect.addEventListener('change', function () {
        apply(sizeSelect.value, true);
      });
    }

    sizeButtons.forEach(function (b) {
      b.addEventListener('click', function () {
        apply(b.getAttribute('data-size'), true);
      });
    });
  }

  var reveals = document.querySelectorAll('.reveal');
  var motionOk = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
