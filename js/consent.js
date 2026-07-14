(function () {

  var STORAGE_KEY = "amsync-consent";
  var banner = document.getElementById("consent-banner");
  if (!banner) return;

  var acceptBtn = document.getElementById("consent-accept");
  var rejectBtn = document.getElementById("consent-reject");

  function hasChoice() {
    try {
      var v = localStorage.getItem(STORAGE_KEY);
      return v === "granted" || v === "denied";
    } catch (e) {
      return false;
    }
  }

  function setChoice(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {}
  }

  function hideBanner() {
    banner.hidden = true;
  }

  // gtag.js (~155KB from Google) is only ever requested once analytics
  // consent is actually granted - visitors who reject, or never decide,
  // don't pay for it at all. js/ga-config.js still sets up the dataLayer/
  // consent-default stub unconditionally, so queued gtag() calls made
  // before this loads are processed correctly once it does.
  var gtagScriptLoaded = false;
  function loadGtagLibrary() {
    if (gtagScriptLoaded) return;
    gtagScriptLoaded = true;
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-NR4ZNJ0D7Y";
    document.head.appendChild(script);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!hasChoice()) {
      banner.hidden = false;
    } else if (localStorage.getItem(STORAGE_KEY) === "granted") {
      loadGtagLibrary();
    }
  });

  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      setChoice("granted");
      loadGtagLibrary();
      if (typeof window.gtag === "function") {
        window.gtag("consent", "update", { analytics_storage: "granted" });
        // Consent Mode only affects future hits - the initial pageview
        // already fired under "denied" and isn't resent automatically, so
        // fire one explicitly now that consent is actually granted.
        window.gtag("event", "page_view");
      }
      hideBanner();
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", function () {
      setChoice("denied");
      hideBanner();
    });
  }

})();
