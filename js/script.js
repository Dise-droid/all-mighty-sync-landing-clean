(function () {

  /* ===== NON-BLOCKING GOOGLE FONTS =====
     font-css link loads with media="print" so it doesn't block first
     render; switch it to media="all" once it's actually loaded. */
  var fontLink = document.getElementById("font-css");
  if (fontLink) {
    if (fontLink.sheet) {
      fontLink.media = "all";
    } else {
      fontLink.addEventListener("load", function () {
        fontLink.media = "all";
      });
    }
  }

  /* ===== ANALYTICS ===== */
  function trackEvent(name, params) {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", name, params || {});
  }

  document.querySelectorAll("[data-track]").forEach(function (el) {
    el.addEventListener("click", function () {
      trackEvent(el.dataset.track, { source: el.dataset.trackSource || undefined });
    });
  });

  /* ===== FAQ ACCORDION ===== */
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const item = btn.closest(".faq-item");
      const answer = item.querySelector(".faq-a");
      const icon = btn.querySelector(".faq-icon");
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      document.querySelectorAll(".faq-q").forEach(function (other) {
        if (other !== btn) {
          other.setAttribute("aria-expanded", "false");
          other.closest(".faq-item").querySelector(".faq-a").classList.remove("is-open");
          const otherIcon = other.querySelector(".faq-icon");
          if (otherIcon) otherIcon.textContent = "+";
        }
      });

      btn.setAttribute("aria-expanded", String(!isOpen));
      answer.classList.toggle("is-open", !isOpen);
      if (icon) icon.textContent = isOpen ? "+" : "−";
    });
  });

  /* ===== DISCIPLINE TABS ===== */
  document.querySelectorAll(".disc-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      const disc = tab.dataset.disc;
      document.querySelectorAll(".disc-tab").forEach(function (t) {
        t.classList.remove("active");
      });
      document.querySelectorAll(".disc-panel").forEach(function (p) {
        p.classList.remove("active");
      });
      tab.classList.add("active");
      const panel = document.querySelector(".disc-panel[data-disc='" + disc + "']");
      if (panel) panel.classList.add("active");
    });
  });

  /* ===== SCROLL FADE ===== */
  (function () {
    const sections = document.querySelectorAll(".fade-section");
    if (!sections.length) return;
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    sections.forEach(function (el) { observer.observe(el); });
  })();

  /* ===== CONTACT FORM ===== */
  const WEB3FORMS_URL = "https://api.web3forms.com/submit";
  const ACCESS_KEY = "2b7f38f6-464b-4bc6-8e69-cf667334864d";

  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn =
      form.querySelector('button[type="submit"]') || form.querySelector("button");
  const messageEl = form.querySelector(".form-message");

  function getCurrentLang() {
    return localStorage.getItem("amsync-lang") || "bs";
  }

  function getUiText(lang) {
    const texts = {
      bs: {
        sending: "ŠALJEM...",
        submit: "POŠALJI",
        success: "Hvala! Vaša poruka je uspješno poslana.",
        error: "Greška pri slanju poruke. Pokušajte ponovo."
      },
      en: {
        sending: "SENDING...",
        submit: "SEND",
        success: "Thank you! Your message has been sent successfully.",
        error: "An error occurred while sending the message. Please try again."
      },
      de: {
        sending: "WIRD GESENDET...",
        submit: "SENDEN",
        success: "Danke! Ihre Nachricht wurde erfolgreich gesendet.",
        error: "Beim Senden der Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
      }
    };

    return texts[lang] || texts.bs;
  }

  function updateSubmitButtonLabel() {
    const lang = getCurrentLang();
    const ui = getUiText(lang);

    if (!submitBtn.disabled) {
      submitBtn.textContent = ui.submit;
    }
  }

  function showMessage(type, text) {
    if (!messageEl) {
      alert(text);
      return;
    }
    messageEl.className = "form-message " + type;
    messageEl.textContent = text;
  }

  function clearMessage() {
    if (!messageEl) return;
    messageEl.className = "form-message";
    messageEl.textContent = "";
  }

  updateSubmitButtonLabel();

  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      setTimeout(updateSubmitButtonLabel, 0);
    });
  });

  let formStarted = false;
  form.addEventListener("focusin", function () {
    if (formStarted) return;
    formStarted = true;
    trackEvent("contact_form_start");
  });

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    clearMessage();

    const formData = new FormData(form);
    const payload = {
      ime: (formData.get("ime") || "").toString().trim(),
      prezime: (formData.get("prezime") || "").toString().trim(),
      email: (formData.get("email") || "").toString().trim(),
      poruka: (formData.get("poruka") || "").toString().trim(),
    };

    const lang = getCurrentLang();
    const ui = getUiText(lang);

    submitBtn.disabled = true;
    submitBtn.textContent = ui.sending;

    try {
      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "Nova poruka - All Mighty Sync",
          name: (payload.ime + " " + payload.prezime).trim(),
          email: payload.email,
          message: payload.poruka,
        }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch (_) {}

      if (!res.ok) {
        throw new Error(
            (data && (data.error || data.message)) || ("HTTP " + res.status)
        );
      }

      showMessage("success", ui.success);
      trackEvent("contact_form_submit");
      form.reset();
      formStarted = false;
    } catch (err) {
      console.error("Contact form error:", err);
      showMessage(
          "error",
          (err && err.message) || ui.error
      );
      trackEvent("contact_form_error");
    } finally {
      submitBtn.disabled = false;
      updateSubmitButtonLabel();
    }
  });

  /* Store button tooltip behavior */
  const storeButtons = document.querySelectorAll(".store-btn");
  let activeTooltip = null;
  let hideTimer = null;

  function closeAllTooltips() {
    storeButtons.forEach((btn) => btn.classList.remove("tooltip-open"));
    activeTooltip = null;

    if (hideTimer) {
      clearTimeout(hideTimer);
      hideTimer = null;
    }
  }

  storeButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const tooltip = btn.querySelector(".store-tooltip");
      if (!tooltip) return;

      const clickedTooltip = e.target.closest(".store-tooltip");

      if (clickedTooltip) {
        return;
      }

      e.preventDefault();

      const isOpen = btn.classList.contains("tooltip-open");
      closeAllTooltips();

      if (!isOpen) {
        btn.classList.add("tooltip-open");
        activeTooltip = btn;

        hideTimer = setTimeout(() => {
          if (activeTooltip === btn) {
            btn.classList.remove("tooltip-open");
            activeTooltip = null;
          }
        }, 2500);
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".store-btn")) {
      closeAllTooltips();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAllTooltips();
    }
  });

  /* ===== LAUNCH COUNTDOWN ===== */
  document.querySelectorAll(".launch-countdown").forEach(function (el) {
    const target = new Date(el.dataset.launch).getTime();
    const daysEl = el.querySelector('[data-cd="days"]');
    const hoursEl = el.querySelector('[data-cd="hours"]');
    const minutesEl = el.querySelector('[data-cd="minutes"]');
    const secondsEl = el.querySelector('[data-cd="seconds"]');

    function pad(n) {
      return String(n).padStart(2, "0");
    }

    let timer;

    function tick() {
      const diff = target - Date.now();

      if (diff <= 0) {
        el.classList.add("is-live");
        clearInterval(timer);
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      daysEl.textContent = pad(Math.floor(totalSeconds / 86400));
      hoursEl.textContent = pad(Math.floor((totalSeconds % 86400) / 3600));
      minutesEl.textContent = pad(Math.floor((totalSeconds % 3600) / 60));
      secondsEl.textContent = pad(totalSeconds % 60);
    }

    tick();
    timer = setInterval(tick, 1000);
  });
})();