(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;
  var languageButton = document.querySelector("[data-language-toggle]");
  var themeMenu = document.querySelector(".theme-menu");
  var savedLanguage;

  try {
    savedLanguage = localStorage.getItem("homepage-language");
  } catch (_) {}

  var language = /^(en|zh)$/.test(savedLanguage)
    ? savedLanguage
    : (navigator.language || "en").toLowerCase().startsWith("zh") ? "zh" : "en";

  function updateMetadata(lang) {
    var title = body.dataset[lang === "zh" ? "titleZh" : "titleEn"];
    var description = body.dataset[lang === "zh" ? "descriptionZh" : "descriptionEn"];
    var descriptionMeta = document.querySelector('meta[name="description"]');

    if (title) document.title = title;
    if (description && descriptionMeta) descriptionMeta.setAttribute("content", description);
  }

  function updateThemeLabels() {
    var theme = root.dataset.theme || "system";
    var labels = {
      system: { en: "Auto", zh: "自动" },
      light: { en: "Light", zh: "浅色" },
      dark: { en: "Dark", zh: "深色" }
    };

    document.querySelectorAll("[data-theme-label]").forEach(function (label) {
      label.textContent = labels[theme][label.dataset.lang || "en"];
    });

    document.querySelectorAll("[data-theme-value]").forEach(function (button) {
      button.setAttribute("aria-pressed", String(button.dataset.themeValue === theme));
    });
  }

  function applyLanguage(nextLanguage) {
    language = nextLanguage;
    root.lang = language === "zh" ? "zh-CN" : "en";

    document.querySelectorAll("[data-lang]").forEach(function (element) {
      element.hidden = element.dataset.lang !== language;
    });

    if (languageButton) {
      languageButton.querySelector("[data-language-label]").textContent = language === "en" ? "中文" : "EN";
      languageButton.setAttribute("aria-label", language === "en" ? "切换到中文" : "Switch to English");
    }

    updateMetadata(language);
    updateThemeLabels();

    try {
      localStorage.setItem("homepage-language", language);
    } catch (_) {}
  }

  if (languageButton) {
    languageButton.addEventListener("click", function () {
      applyLanguage(language === "en" ? "zh" : "en");
    });
  }

  document.querySelectorAll("[data-theme-value]").forEach(function (button) {
    button.addEventListener("click", function () {
      var theme = button.dataset.themeValue;
      root.dataset.theme = theme;
      try {
        localStorage.setItem("homepage-theme", theme);
      } catch (_) {}
      updateThemeLabels();
      if (themeMenu) themeMenu.open = false;
    });
  });

  document.querySelectorAll(".control-menu a").forEach(function (link) {
    link.addEventListener("click", function () {
      var details = link.closest("details");
      if (details) details.open = false;
    });
  });

  document.addEventListener("pointerdown", function (event) {
    document.querySelectorAll(".control-menu[open]").forEach(function (details) {
      if (!details.contains(event.target)) details.open = false;
    });
  });

  var sectionLinks = Array.from(document.querySelectorAll('a[href^="#"]'))
    .filter(function (link) { return link.getAttribute("href").length > 1; });
  var observedSections = Array.from(document.querySelectorAll(".page-section"));

  if ("IntersectionObserver" in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var target = "#" + entry.target.id;
        sectionLinks.forEach(function (link) {
          if (link.getAttribute("href") === target) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-20% 0px -68%", threshold: 0 });

    observedSections.forEach(function (section) { sectionObserver.observe(section); });
  }

  applyLanguage(language);
  updateThemeLabels();
}());
