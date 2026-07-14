// Generates the dedicated industry SEO pages (static HTML, no server).
// Run with: node build/build.js
// Output: <repo-root>/<slug>/index.html for each entry in pages-data.js

const fs = require("fs");
const path = require("path");

const pages = require("./pages-data.js");
const ROOT = path.join(__dirname, "..");
const SITE_URL = "https://allmightysync.com";

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderPage(page) {
  const url = `${SITE_URL}/${page.slug}`;
  const ogImage = `${SITE_URL}/images/og-image.png`;

  const featuresHtml = page.features
    .map(
      (f) => `
      <div class="role-card">
        <h3>${escapeHtml(f.title)}</h3>
        <p class="role-intro">${escapeHtml(f.body)}</p>
      </div>`
    )
    .join("\n");

  const faqHtml = page.faq
    .map(
      (item, i) => `
      <div class="faq-item">
        <button class="faq-q" aria-expanded="false"><span>${escapeHtml(item.q)}</span><span class="faq-icon" aria-hidden="true">+</span></button>
        <div class="faq-a"><p>${escapeHtml(item.a)}</p></div>
      </div>`
    )
    .join("\n");

  const faqJsonLd = {
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a }
    }))
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "All Mighty Sync",
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/images/icon-512.png`,
        email: "info@allmightysync.com"
      },
      {
        "@type": "WebPage",
        "@id": `${url}/#webpage`,
        url: `${url}/`,
        name: page.title,
        description: page.metaDescription,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en"
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: page.h1, item: `${url}/` }
        ]
      },
      faqJsonLd
    ]
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' https://www.googletagmanager.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data:;
    connect-src 'self' https://api.web3forms.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.google.com;
  ">

  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.metaDescription)}" />
  <link rel="canonical" href="${url}/" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="All Mighty Sync" />
  <meta property="og:url" content="${url}/" />
  <meta property="og:title" content="${escapeHtml(page.title)}" />
  <meta property="og:description" content="${escapeHtml(page.metaDescription)}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="en_US" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(page.title)}" />
  <meta name="twitter:description" content="${escapeHtml(page.metaDescription)}" />
  <meta name="twitter:image" content="${ogImage}" />

  <meta name="theme-color" content="#E88E24" />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link id="font-css" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" media="print">
  <noscript><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"></noscript>

  <link rel="icon" type="image/svg+xml" href="/images/logo.svg" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/images/icon-192.png" />
  <link rel="icon" type="image/png" sizes="512x512" href="/images/icon-512.png" />
  <link rel="manifest" href="/site.webmanifest" />

  <link rel="stylesheet" href="/css/style.css?v=25" />

  <script src="/js/ga-config.js?v=1"></script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-NR4ZNJ0D7Y"></script>

  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
</head>
<body>

<nav class="navbar">
  <div class="container">
    <a class="brand" href="/">
      <img src="/images/logo.svg" alt="All Mighty Sync" width="375" height="375" />
      <span class="brand-text">All Mighty Sync</span>
    </a>
    <div class="nav-links">
      <a href="/#features-section" data-track="feature_navigation_click" data-track-source="industry-page-nav">FEATURES</a>
      <a href="/#roles-section" data-track="audience_navigation_click" data-track-source="industry-page-nav">ROLES</a>
      <a href="/#contact-section" data-track="contact_click" data-track-source="industry-page-nav">CONTACT</a>
    </div>
  </div>
</nav>

<section class="problem-section" style="padding-top: 64px;">
  <div class="container">
    <p style="font-size: 13px; color: var(--muted); margin-bottom: 16px;"><a href="/" style="color: var(--muted);">Home</a> &rsaquo; ${escapeHtml(page.h1)}</p>
    <div class="section-label">${escapeHtml(page.introLabel)}</div>
    <h1 class="section-heading">${escapeHtml(page.h1)}</h1>
    <p class="hero-sub" style="max-width: 760px;">${escapeHtml(page.introBody)}</p>
    <a href="/#contact-section" class="btn-demo" data-track="request_demo_click" data-track-source="industry-page-intro">${escapeHtml(page.ctaButton)}</a>
  </div>
</section>

<section class="features-section fade-section" id="features-section">
  <div class="container">
    <div class="section-label">WHAT'S INCLUDED</div>
    <h2 class="section-heading">Everything you need in one platform</h2>
    <div class="roles-grid">${featuresHtml}
    </div>
  </div>
</section>

<section class="faq-section fade-section" id="faq-section">
  <div class="container">
    <h2 class="section-heading">FAQ's</h2>
    <div class="faq-list">${faqHtml}
    </div>
  </div>
</section>

<section class="final-cta fade-section">
  <div class="container">
    <h2>See All Mighty Sync in action</h2>
    <p>Request a demo and see how it fits your organization - no obligation, no setup required to talk it through.</p>
    <div class="cta-btns">
      <a href="/#contact-section" class="btn-primary btn-primary--cream" data-track="request_demo_click" data-track-source="industry-page-final-cta">${escapeHtml(page.ctaButton)}</a>
    </div>
  </div>
</section>

<footer class="footer">
  <div class="container">
    <div class="footer-cols">
      <div class="footer-col footer-col--brand">
        <div class="footer-brand-row">
          <img src="/images/logo.svg" alt="All Mighty Sync" class="footer-logo" width="375" height="375" loading="lazy" />
          <span class="footer-brand-name">All Mighty Sync</span>
        </div>
        <p class="footer-tagline">Built for extracurricular organizations. Built in Sarajevo.</p>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Product</div>
        <ul class="footer-links">
          <li><a href="/#features-section">Features</a></li>
          <li><a href="/#roles-section">Roles</a></li>
          <li><a href="/#get-started-section">Get Started</a></li>
          <li><a href="/#faq-section">FAQ</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Contact</div>
        <ul class="footer-links footer-links--plain">
          <li><a href="mailto:info@allmightysync.com">info@allmightysync.com</a></li>
          <li><a href="tel:+38761712776">+387 61 71 27 76</a></li>
          <li>Sarajevo, Bosnia and Herzegovina</li>
        </ul>
      </div>
    </div>
    <div class="footer-industries">
      <div class="footer-col-title">Industries We Serve</div>
      <div class="footer-industries-list">
        <a href="/football-club-management-software/">Football Clubs &amp; Academies</a><span>&middot;</span>
        <a href="/dance-studio-management-software/">Dance Studios</a><span>&middot;</span>
        <a href="/drama-school-management-software/">Drama Schools</a><span>&middot;</span>
        <a href="/music-school-management-software/">Music Schools</a><span>&middot;</span>
        <a href="/martial-arts-club-management-software/">Martial Arts Clubs</a><span>&middot;</span>
        <a href="/language-school-management-software/">Language Schools</a><span>&middot;</span>
        <a href="/art-school-management-software/">Art Schools</a><span>&middot;</span>
        <a href="/coding-robotics-management-software/">Coding &amp; Robotics</a><span>&middot;</span>
        <a href="/basketball-club-management-software/">Basketball Clubs</a><span>&middot;</span>
        <a href="/volleyball-club-management-software/">Volleyball Clubs</a><span>&middot;</span>
        <a href="/tennis-academy-management-software/">Tennis Academies</a><span>&middot;</span>
        <a href="/swimming-club-management-software/">Swimming Clubs</a><span>&middot;</span>
        <a href="/gymnastics-club-management-software/">Gymnastics Clubs</a><span>&middot;</span>
        <a href="/tutoring-center-management-software/">Tutoring Centers</a><span>&middot;</span>
        <a href="/after-school-activity-management-software/">After-School Programs</a><span>&middot;</span>
        <a href="/childrens-activity-center-management-software/">Children's Activity Centers</a><span>&middot;</span>
        <a href="/multi-sport-academy-management-software/">Multi-Sport Academies</a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-partners">
        <span class="partners-label">Supported by</span>
        <a href="https://f787.ba/" target="_blank" rel="noopener noreferrer">
          <div class="partner-logo-dark" id="foundation-787-logo">
            <img src="/images/foundation-787-logo.svg" alt="Foundation 787" width="142" height="142" loading="lazy" />
          </div>
        </a>
        <a href="https://www.corebridge.ba/" target="_blank" rel="noopener noreferrer">
          <div class="partner-logo-dark" id="corebridge-logo">
            <img src="/images/corebridge-logo.svg" alt="Core Bridge" width="651" height="400" loading="lazy" />
          </div>
        </a>
      </div>
      <div class="footer-bottom-right">
        <span class="copyright">&copy; 2026 All Mighty Sync. All rights reserved.</span>
        <a href="/privacy-policy/" style="font-size: 13px; color: var(--muted);">Privacy Policy</a>
      </div>
    </div>
  </div>
</footer>

<div id="consent-banner" class="consent-banner" hidden>
  <div class="consent-banner-text">
    We use analytics cookies to understand how visitors use this site. See our <a href="/privacy-policy/">Privacy Policy</a>.
  </div>
  <div class="consent-banner-actions">
    <button type="button" id="consent-reject" class="consent-btn consent-btn--reject">Reject</button>
    <button type="button" id="consent-accept" class="consent-btn consent-btn--accept">Accept</button>
  </div>
</div>

<script src="/js/consent.js?v=1" defer></script>
<script src="/js/script.js?v=17" defer></script>
</body>
</html>
`;
}

let count = 0;
for (const page of pages) {
  const dir = path.join(ROOT, page.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), renderPage(page));
  count++;
}

console.log(`Generated ${count} pages.`);
