(function () {
  var root = document.documentElement;

  var toggle = document.querySelector(".nav-toggle");
  var list = document.getElementById("primary-nav");

  if (toggle && list) {
    var mq = window.matchMedia("(min-width: 64em)");
    toggle.hidden = false;

    var setCollapsed = function (collapsed) {
      list.setAttribute("data-collapsed", collapsed ? "true" : "false");
      toggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
    };

    var sync = function () {
      if (mq.matches) {
        list.setAttribute("data-collapsed", "false");
        toggle.setAttribute("aria-expanded", "false");
      } else {
        setCollapsed(true);
      }
    };

    sync();
    mq.addEventListener("change", sync);

    toggle.addEventListener("click", function () {
      setCollapsed(list.getAttribute("data-collapsed") !== "true");
    });

    list.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !mq.matches) {
        setCollapsed(true);
        toggle.focus();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (
        e.key === "Escape" &&
        !mq.matches &&
        document.activeElement === toggle
      ) {
        setCollapsed(true);
      }
    });
  }

  var sizes = ["normal", "large", "xlarge"];
  var sizeSelect = document.getElementById("text-size");

  if (sizeSelect) {
    var apply = function (size, save) {
      if (sizes.indexOf(size) === -1) size = "normal";
      if (size === "normal") {
        root.removeAttribute("data-text");
      } else {
        root.setAttribute("data-text", size);
      }
      if (sizeSelect.value !== size) sizeSelect.value = size;
      if (save) {
        try {
          localStorage.setItem("zolsi-text", size);
        } catch (err) {}
      }
    };

    var stored = "normal";
    try {
      stored = localStorage.getItem("zolsi-text") || "normal";
    } catch (err) {}

    apply(stored, false);

    sizeSelect.addEventListener("change", function () {
      apply(sizeSelect.value, true);
    });
  }

  var reveals = document.querySelectorAll(".reveal");
  var motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reveals.length && motionOk && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    Array.prototype.forEach.call(reveals, function (el) {
      var items = el.querySelectorAll(".path, .entry, .faq details");
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        item.style.animationDelay = i * 60 + "ms";
        item.addEventListener("animationend", function (e) {
          if (e.animationName === "fade-up") {
            this.style.animation = "none";
            this.style.opacity = "1";
          }
        });
      }
      io.observe(el);
    });
  } else {
    Array.prototype.forEach.call(reveals, function (el) {
      el.classList.add("is-in");
    });
  }
  
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      document.body.style.animation = "none";
      void document.body.offsetWidth;
      document.body.style.animation = "page-fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards";
    }
  });

  window.switchLanguage = function (lang) {
    try { localStorage.setItem("zolsi-lang", lang); } catch(e) {}
    var currentPath = window.location.pathname;
    currentPath = currentPath.replace(/^\/(es|de)\//, "/");
    if (lang === "en") {
      window.location.href = currentPath;
    } else {
      window.location.href = "/" + lang + (currentPath === "/" ? "" : currentPath);
    }
  };

  try {
    var storedLang = localStorage.getItem("zolsi-lang");
    if (!storedLang && !window.location.pathname.match(/^\/(es|de)(\/|$)/)) {
      var browserLang = navigator.language.split("-")[0];
      if (browserLang === "es" || browserLang === "de") {
        localStorage.setItem("zolsi-lang", browserLang);
        var currentPath = window.location.pathname;
        window.location.href = "/" + browserLang + (currentPath === "/" ? "" : currentPath);
      }
    }
  } catch(e) {}

  var langSelect = document.getElementById("lang-select");
  if (langSelect) {
    var currentPath = window.location.pathname;
    var currentLang = "en";
    if (currentPath.startsWith("/es/")) currentLang = "es";
    if (currentPath.startsWith("/de/")) currentLang = "de";
    if (langSelect.value !== currentLang) langSelect.value = currentLang;
  }
})();
