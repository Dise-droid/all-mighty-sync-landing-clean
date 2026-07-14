(function () {

  /* ===== INDUSTRY-ADAPTIVE CONTENT =====
     Drives Hero / Problems / Final-CTA text based on the industry selected
     via the existing Disciplines tabs (.disc-tab / .disc-panel in
     index.html). English only for this phase - see plan for rationale.
     "default" must always match the page's byte-for-byte shipped copy. */

  var INDUSTRY_CONTENT = {
    default: {
      heroTitle: 'Put the group chat on mute! <span class="accent">All your information is now in one place.</span>',
      heroSubtitle: "All Mighty Sync is club management software that brings attendance, student development, scheduling, communication, payments and reporting into one platform - built for sports clubs, academies and activity schools.",
      problemHeading: "Running a great organization shouldn't require five different tools.",
      problemBody: "How much time does each of these separate steps take? And how much patience? Manage teachers, groups, schedules, attendance, materials, parents and finances without ten different tools.",
      ctaHeading: "Spend more time developing people. Spend less time on paperwork.",
      ctaSub: "Whether you lead a football academy, dance school, drama studio, music school or any other extracurricular organization - All Mighty Sync connects every part of your operation so you can focus on what actually matters.",
      ctaButton: "Contact"
    },
    football: {
      heroTitle: 'Stop chasing parents in the group chat! <span class="accent">Run your football academy from one platform.</span>',
      heroSubtitle: "All Mighty Sync is club management software for football clubs and academies - attendance, player development, match performance, parent communication and payments in one place.",
      problemHeading: "Running a football academy shouldn't require five different tools.",
      problemBody: "Training attendance in one app, parent updates in another, payments on paper, player progress in a notebook. Manage teams, training attendance, player development and club payments without ten different tools.",
      ctaHeading: "Spend more time developing players. Spend less time on paperwork.",
      ctaSub: "Whether you run a football academy, a youth development program or a multi-team club - All Mighty Sync connects attendance, player progression, parent communication and payments so you can focus on the game.",
      ctaButton: "Book a Football Academy Demo"
    },
    dance: {
      heroTitle: 'Stop juggling five apps for one recital! <span class="accent">Run your dance studio from one platform.</span>',
      heroSubtitle: "All Mighty Sync is club management software for dance studios and schools - attendance, choreography and rehearsal tracking, recitals, parent communication and payments in one place.",
      problemHeading: "Running a dance studio shouldn't require five different tools.",
      problemBody: "Rehearsal attendance in one app, recital planning in another, membership payments on paper, student progression in a notebook. Manage classes, rehearsals, recitals and studio payments without ten different tools.",
      ctaHeading: "Spend more time choreographing. Spend less time on paperwork.",
      ctaSub: "Whether you run a dance studio, a dance school or a performing arts program - All Mighty Sync connects attendance, choreography progression, parent communication and payments so you can focus on the art.",
      ctaButton: "Book a Dance Studio Demo"
    },
    drama: {
      heroTitle: 'Stop losing audition notes in group chats! <span class="accent">Run your drama school from one platform.</span>',
      heroSubtitle: "All Mighty Sync is club management software for drama schools and acting academies - attendance, rehearsals, auditions, student portfolios and payments in one place.",
      problemHeading: "Running a drama school shouldn't require five different tools.",
      problemBody: "Rehearsal attendance in one app, audition results in another, membership payments on paper, student portfolios in a notebook. Manage rehearsals, productions, student portfolios and payments without ten different tools.",
      ctaHeading: "Spend more time directing. Spend less time on paperwork.",
      ctaSub: "Whether you run a drama school, an acting academy or a performing arts program - All Mighty Sync connects attendance, audition history, student portfolios and payments so you can focus on the performance.",
      ctaButton: "Book a Drama School Demo"
    },
    music: {
      heroTitle: 'Stop tracking recitals in a notebook! <span class="accent">Run your music school from one platform.</span>',
      heroSubtitle: "All Mighty Sync is club management software for music schools - lesson attendance, grade and repertoire progression, parent communication and payments in one place.",
      problemHeading: "Running a music school shouldn't require five different tools.",
      problemBody: "Lesson attendance in one app, repertoire tracking in another, membership payments on paper, student progress in a notebook. Manage lessons, ensembles, student progression and payments without ten different tools.",
      ctaHeading: "Spend more time teaching music. Spend less time on paperwork.",
      ctaSub: "Whether you run a music school, teach individual lessons or lead ensembles and choirs - All Mighty Sync connects attendance, repertoire progression, parent communication and payments so you can focus on the music.",
      ctaButton: "Book a Music School Demo"
    },
    martial: {
      heroTitle: 'Stop grading belts on a spreadsheet! <span class="accent">Run your martial arts club from one platform.</span>',
      heroSubtitle: "All Mighty Sync is club management software for martial arts clubs and academies - attendance, belt progression, competition results, parent communication and payments in one place.",
      problemHeading: "Running a martial arts club shouldn't require five different tools.",
      problemBody: "Training attendance in one app, belt progression in another, membership payments on paper, competition results in a notebook. Manage classes, belt grading, competition results and club payments without ten different tools.",
      ctaHeading: "Spend more time on the mat. Spend less time on paperwork.",
      ctaSub: "Whether you run a martial arts club, a dojo or a multi-discipline academy - All Mighty Sync connects attendance, belt progression, parent communication and payments so you can focus on training.",
      ctaButton: "Book a Martial Arts Club Demo"
    },
    language: {
      heroTitle: 'Stop tracking levels across five different tools! <span class="accent">Run your language school from one platform.</span>',
      heroSubtitle: "All Mighty Sync is club management software for language schools - lesson attendance, level progression, parent communication and payments in one place.",
      problemHeading: "Running a language school shouldn't require five different tools.",
      problemBody: "Lesson attendance in one app, level tracking in another, membership payments on paper, student progress in a notebook. Manage classes, module progress, student levels and payments without ten different tools.",
      ctaHeading: "Spend more time teaching. Spend less time on paperwork.",
      ctaSub: "Whether you run a language school, a tutoring center or a skill-development program - All Mighty Sync connects attendance, level progression, parent communication and payments so you can focus on your students.",
      ctaButton: "Book a Language School Demo"
    },
    art: {
      heroTitle: 'Stop losing student work in old group chats! <span class="accent">Run your art school from one platform.</span>',
      heroSubtitle: "All Mighty Sync is club management software for art schools and creative programs - attendance, project tracking, exhibitions, parent communication and payments in one place.",
      problemHeading: "Running an art school shouldn't require five different tools.",
      problemBody: "Class attendance in one app, project tracking in another, membership payments on paper, student work in a notebook. Manage classes, creative projects, exhibitions and payments without ten different tools.",
      ctaHeading: "Spend more time creating. Spend less time on paperwork.",
      ctaSub: "Whether you run an art school, a studio or a creative education program - All Mighty Sync connects attendance, project tracking, parent communication and payments so you can focus on the work.",
      ctaButton: "Book an Art School Demo"
    },
    coding: {
      heroTitle: 'Stop tracking projects in a spreadsheet! <span class="accent">Run your robotics program from one platform.</span>',
      heroSubtitle: "All Mighty Sync is club management software for coding and robotics programs - attendance, project tracking, mentorship notes, parent communication and payments in one place.",
      problemHeading: "Running a coding or robotics program shouldn't require five different tools.",
      problemBody: "Session attendance in one app, project tracking in another, membership payments on paper, mentor notes in a notebook. Manage sessions, projects, skill progression and payments without ten different tools.",
      ctaHeading: "Spend more time mentoring. Spend less time on paperwork.",
      ctaSub: "Whether you run a robotics club, a coding school or a STEM program - All Mighty Sync connects attendance, project tracking, parent communication and payments so you can focus on building.",
      ctaButton: "Book a Robotics Program Demo"
    }
  };

  var STORAGE_KEY = "amsync-industry";
  var DEFAULT_DISC_TAB = "football";
  var currentIndustry = "default";

  function getCurrentUiLang() {
    return localStorage.getItem("amsync-lang") || "bs";
  }

  function applyIndustry(key) {
    var content = INDUSTRY_CONTENT[key] || INDUSTRY_CONTENT.default;
    currentIndustry = INDUSTRY_CONTENT[key] ? key : "default";

    if (getCurrentUiLang() !== "en") return;

    var heroTitle = document.getElementById("hero-title");
    var heroSubtitle = document.getElementById("hero-subtitle");
    var problemHeading = document.getElementById("problem-heading");
    var problemBody = document.getElementById("problem-body");
    var ctaHeading = document.getElementById("final-cta-heading");
    var ctaSub = document.getElementById("final-cta-sub");
    var ctaButton = document.getElementById("final-cta-button");

    if (heroTitle) heroTitle.innerHTML = content.heroTitle;
    if (heroSubtitle) heroSubtitle.textContent = content.heroSubtitle;
    if (problemHeading) problemHeading.textContent = content.problemHeading;
    if (problemBody) problemBody.textContent = content.problemBody;
    if (ctaHeading) ctaHeading.textContent = content.ctaHeading;
    if (ctaSub) ctaSub.textContent = content.ctaSub;
    if (ctaButton) ctaButton.textContent = content.ctaButton;
  }

  function getInitialIndustry() {
    var hashKey = (location.hash || "").replace("#", "");
    if (INDUSTRY_CONTENT[hashKey]) return { key: hashKey, source: "hash" };

    var stored = localStorage.getItem(STORAGE_KEY);
    if (INDUSTRY_CONTENT[stored]) return { key: stored, source: "storage" };

    return { key: "default", source: "default" };
  }

  function syncDiscTabs(key) {
    var tab = document.querySelector('.disc-tab[data-disc="' + key + '"]');
    var panel = document.querySelector('.disc-panel[data-disc="' + key + '"]');
    if (!tab || !panel) return;

    document.querySelectorAll(".disc-tab").forEach(function (t) { t.classList.remove("active"); });
    document.querySelectorAll(".disc-panel").forEach(function (p) { p.classList.remove("active"); });
    tab.classList.add("active");
    panel.classList.add("active");
  }

  function selectIndustry(key, options) {
    options = options || {};
    applyIndustry(key);

    if (options.persist !== false) {
      localStorage.setItem(STORAGE_KEY, currentIndustry);
    }
    if (options.updateHash !== false) {
      var newHash = currentIndustry === "default" ? "" : "#" + currentIndustry;
      if (("#" + (location.hash || "").replace("#", "")) !== (newHash || "#")) {
        history.replaceState(null, "", location.pathname + location.search + newHash);
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var initial = getInitialIndustry();
    applyIndustry(initial.key);

    if (initial.source !== "default" && initial.key !== DEFAULT_DISC_TAB) {
      syncDiscTabs(initial.key);
    }

    document.querySelectorAll(".disc-tab").forEach(function (tab) {
      tab.addEventListener("click", function () {
        selectIndustry(tab.dataset.disc);
      });
    });

    document.querySelectorAll(".lang-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setTimeout(function () { applyIndustry(currentIndustry); }, 0);
      });
    });
  });

})();
