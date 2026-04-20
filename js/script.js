(function () {
  const SUPABASE_URL = "https://piacdaivqfdmwqjpttsj.supabase.co/functions/v1/contact";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpYWNkYWl2cWZkbXdxanB0dHNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MTE3ODEsImV4cCI6MjA5MTk4Nzc4MX0.mq4gWz7Cc1GnloJzNL6CXE-6L2uno85UPEWW15TlGC4";

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
      const res = await fetch(SUPABASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: "Bearer " + SUPABASE_ANON_KEY,
        },
        body: JSON.stringify(payload),
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
      form.reset();
    } catch (err) {
      console.error("Contact form error:", err);
      showMessage(
          "error",
          (err && err.message) || ui.error
      );
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
})();