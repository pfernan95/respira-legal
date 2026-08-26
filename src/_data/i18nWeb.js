/**
 * Site chrome in both languages.
 *
 * The Spanish site is not being translated — it is being JOINED. 164 routes
 * are indexed and taking real Search traffic, so every existing URL, title and
 * canonical stays exactly where it is; English is a new tree under /en/.
 *
 * That is also why this is a lookup rather than a build-time locale switch:
 * both languages are generated in the same run, into the same output, and a
 * page declares which one it is with `lang` in its front matter. Anything
 * without `lang` is Spanish, which is every page that existed before.
 */
export default {
  es: {
    htmlLang: "es",
    ogLocale: "es_ES",
    home: "/",
    nav: { home: "Inicio", support: "/soporte", supportLabel: "Soporte", download: "Descargar" },
    footer: {
      privacy: { href: "/privacidad", label: "Privacidad" },
      terms: { href: "/condiciones", label: "Condiciones" },
      support: { href: "/soporte", label: "Soporte" },
      del: { href: "/delete-account", label: "Eliminar cuenta" },
      contact: "Contacto",
      sourcesLead: "Datos de",
      sourcesMid: "(modelo CAMS de Copernicus).",
      calendars: "Calendarios basados en la",
      reaName: "Red Española de Aerobiología (REA)",
      disclaimer:
        "Respira es una herramienta informativa. No sustituye el diagnóstico ni la consulta de un profesional médico.",
      switchLabel: "English",
    },
    badge: {
      // Apple's own artwork, self-hosted. Their guidelines require the badge
      // they supply, not a re-creation, and it has to link to the App Store.
      src: "/assets/app-store-badge-es.svg",
      alt: "Consíguelo en el App Store",
      aria: "Descargar Respira en el App Store",
      lead: "Gratis para iPhone y iPad",
    },
    legalNav: "Legal",
    mainNav: "Principal",
  },
  en: {
    htmlLang: "en",
    ogLocale: "en_US",
    home: "/en/",
    nav: { home: "Home", support: "/en/support", supportLabel: "Support", download: "Download" },
    footer: {
      privacy: { href: "/en/privacy", label: "Privacy" },
      terms: { href: "/en/terms", label: "Terms" },
      support: { href: "/en/support", label: "Support" },
      del: { href: "/en/delete-account", label: "Delete account" },
      contact: "Contact",
      sourcesLead: "Data from",
      sourcesMid: "(Copernicus CAMS model) and the",
      calendars: "Google Pollen API in the United States. Calendars based on the",
      reaName: "Spanish Aerobiology Network (REA)",
      disclaimer:
        "Respira is an informational tool. It does not replace diagnosis or advice from a medical professional.",
      switchLabel: "Español",
    },
    badge: {
      src: "/assets/app-store-badge-en.svg",
      alt: "Download on the App Store",
      aria: "Download Respira on the App Store",
      lead: "Free for iPhone and iPad",
    },
    legalNav: "Legal",
    mainNav: "Main",
  },
};
