(function () {
    const translations = {
        bs: {
            "nav.about": "O NAMA",
            "nav.contact": "KONTAKT",

            "hero.title": 'Sport, umjetnost i edukacija - <span class="accent">napokon povezani.</span>',
            "hero.subtitle": "Upravljajte prisustvom, materijalima i timovima brzo i jednostavno.",
            "hero.description": "All Mighty Sync je moderno rješenje za privatne škole i klubove koji žele povećati produktivnost i imati potpunu kontrolu nad svojim aktivnostima - sve iz jedne aplikacije.",
            "hero.comingSoon": "USKORO NA:",

            "store.google.small": "Preuzmi na",
            "store.google.big": "Google Play",
            "store.apple.small": "Preuzmi na",
            "store.apple.big": "App Store",
            "store.tooltip": "Ili se prijavite za demo",

            "about.title": "O NAMA",
            "about.p1": "All Mighty Sync je digitalna platforma koja pojednostavljuje upravljanje privatnim školama i klubovima - od komunikacije i rasporeda do evidencije i administracije. Umjesto više nepovezanih alata, sve se nalazi na jednom mjestu, jasno i pregledno.",
            "about.p2": "Pomažemo vlasnicima, nastavnicima i roditeljima da uštede vrijeme, smanje stres i imaju potpunu kontrolu nad svakodnevnim radom - kako bi se mogli fokusirati na ono što je najvažnije: razvoj djece i kvalitet nastave.",

            "team.edis.role": "CPO & CO-FOUNDER",
            "team.anja.role": "CEO & CO-FOUNDER",

            "contact.title": "Imate li pitanja?",
            "contact.subtitle": "Kontaktirajte nas!",
            "contact.lead": "Drago nam je čuti od vas. Pošaljite nam poruku i odgovorit ćemo u najkraćem mogućem roku.",
            "contact.emailLabel": "Email:",
            "contact.phoneLabel": "Telefon:",
            "contact.locationLabel": "Lokacija:",
            "contact.locationValue": "Sarajevo, Bosna i Hercegovina",

            "form.firstName": "Ime",
            "form.lastName": "Prezime",
            "form.email": "Email",
            "form.message": "Vaša poruka...",
            "form.submit": "POŠALJI",

            "footer.copyright": "© 2026 All Mighty Sync. Sva prava zadržana."
        },

        en: {
            "nav.about": "ABOUT",
            "nav.contact": "CONTACT",

            "hero.title": 'Sport, art and education - <span class="accent">finally connected.</span>',
            "hero.subtitle": "Manage attendance, materials and teams quickly and easily.",
            "hero.description": "All Mighty Sync is a modern solution for private schools and clubs that want to increase productivity and have full control over their activities - all in one app.",
            "hero.comingSoon": "COMING SOON:",

            "store.google.small": "Download via",
            "store.google.big": "Google Play",
            "store.apple.small": "Download via",
            "store.apple.big": "App Store",
            "store.tooltip": "Or sign up for a demo",

            "about.title": "ABOUT US",
            "about.p1": "All Mighty Sync is a digital platform that simplifies the management of private schools and clubs - from communication and schedules to records and administration. Instead of multiple disconnected tools, everything is in one place, clear and easy to manage.",
            "about.p2": "We help owners, teachers and parents save time, reduce stress and maintain full control over daily operations - so they can focus on what matters most: children's development and the quality of teaching.",

            "team.edis.role": "CPO & CO-FOUNDER",
            "team.anja.role": "CEO & CO-FOUNDER",

            "contact.title": "Do you have any questions?",
            "contact.subtitle": "Contact us!",
            "contact.lead": "We are happy to hear from you. Send us a message and we will reply as soon as possible.",
            "contact.emailLabel": "Email:",
            "contact.phoneLabel": "Phone:",
            "contact.locationLabel": "Location:",
            "contact.locationValue": "Sarajevo, Bosnia and Herzegovina",

            "form.firstName": "First name",
            "form.lastName": "Last name",
            "form.email": "Email",
            "form.message": "Your message...",
            "form.submit": "SEND",

            "footer.copyright": "© 2026 All Mighty Sync. All rights reserved."
        },

        de: {
            "nav.about": "ÜBER UNS",
            "nav.contact": "KONTAKT",

            "hero.title": 'Sport, Kunst und Bildung - <span class="accent">endlich verbunden.</span>',
            "hero.subtitle": "Verwalten Sie Anwesenheit, Materialien und Teams schnell und einfach.",
            "hero.description": "All Mighty Sync ist eine moderne Lösung für private Schulen und Clubs, die ihre Produktivität steigern und die volle Kontrolle über ihre Aktivitäten haben möchten - alles in einer App.",
            "hero.comingSoon": "BALD VERFÜGBAR AUF:",

            "store.google.small": "Laden im",
            "store.google.big": "Google Play",
            "store.apple.small": "Laden im",
            "store.apple.big": "App Store",
            "store.tooltip": "Oder melden Sie sich für eine Demo an",

            "about.title": "ÜBER UNS",
            "about.p1": "All Mighty Sync ist eine digitale Plattform, die die Verwaltung privater Schulen und Clubs vereinfacht - von Kommunikation und Terminplänen bis hin zu Anwesenheit und Administration. Statt mehrerer getrennter Tools befindet sich alles an einem Ort, klar und übersichtlich.",
            "about.p2": "Wir helfen Eigentümern, Lehrkräften und Eltern, Zeit zu sparen, Stress zu reduzieren und die volle Kontrolle über den Alltag zu behalten - damit sie sich auf das Wesentliche konzentrieren können: die Entwicklung der Kinder und die Qualität des Unterrichts.",

            "team.edis.role": "CPO & CO-FOUNDER",
            "team.anja.role": "CEO & CO-FOUNDER",

            "contact.title": "Haben Sie Fragen?",
            "contact.subtitle": "Kontaktieren Sie uns!",
            "contact.lead": "Wir freuen uns, von Ihnen zu hören. Senden Sie uns eine Nachricht und wir antworten so schnell wie möglich.",
            "contact.emailLabel": "E-Mail:",
            "contact.phoneLabel": "Telefon:",
            "contact.locationLabel": "Standort:",
            "contact.locationValue": "Sarajevo, Bosnien und Herzegowina",

            "form.firstName": "Vorname",
            "form.lastName": "Nachname",
            "form.email": "E-Mail",
            "form.message": "Ihre Nachricht...",
            "form.submit": "SENDEN",

            "footer.copyright": "© 2026 All Mighty Sync. Alle Rechte vorbehalten."
        }
    };

    function applyLanguage(lang) {
        const dict = translations[lang];
        if (!dict) return;

        document.documentElement.lang = lang;

        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const key = el.getAttribute("data-i18n");
            if (dict[key] !== undefined) {
                el.textContent = dict[key];
            }
        });

        document.querySelectorAll("[data-i18n-html]").forEach((el) => {
            const key = el.getAttribute("data-i18n-html");
            if (dict[key] !== undefined) {
                el.innerHTML = dict[key];
            }
        });

        document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
            const key = el.getAttribute("data-i18n-placeholder");
            if (dict[key] !== undefined) {
                el.setAttribute("placeholder", dict[key]);
            }
        });

        document.querySelectorAll(".lang-btn").forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.lang === lang);
        });

        localStorage.setItem("amsync-lang", lang);
    }

    document.querySelectorAll(".lang-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            applyLanguage(this.dataset.lang);
        });
    });

    const savedLang = localStorage.getItem("amsync-lang") || "bs";
    applyLanguage(savedLang);
})();