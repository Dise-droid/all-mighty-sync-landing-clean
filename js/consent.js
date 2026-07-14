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

  document.addEventListener("DOMContentLoaded", function () {
    if (!hasChoice()) {
      banner.hidden = false;
    }
  });

  if (acceptBtn) {
    acceptBtn.addEventListener("click", function () {
      setChoice("granted");
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
