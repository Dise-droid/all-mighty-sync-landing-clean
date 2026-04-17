(function () {
  const SUPABASE_URL = "https://piacdaivqfdmwqjpttsj.supabase.co/functions/v1/contact";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpYWNkYWl2cWZkbXdxanB0dHNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MTE3ODEsImV4cCI6MjA5MTk4Nzc4MX0.mq4gWz7Cc1GnloJzNL6CXE-6L2uno85UPEWW15TlGC4";

  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn =
      form.querySelector('button[type="submit"]') || form.querySelector("button");
  const messageEl = form.querySelector(".form-message");

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

    submitBtn.disabled = true;
    submitBtn.textContent = "ŠALJEM...";

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

      showMessage("success", "Hvala! Vaša poruka je uspješno poslana.");
      form.reset();
    } catch (err) {
      console.error("Contact form error:", err);
      showMessage(
          "error",
          (err && err.message) || "Greška pri slanju poruke. Pokušajte ponovo."
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "POŠALJI";
    }
  });
})();