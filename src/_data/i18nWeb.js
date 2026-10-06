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
    // Android visitors see this instead of the App Store badge (base.njk).
    // One-purpose consent: a single email when Respira reaches Google Play.
    // Changing the consent wording means bumping `consentVersion` too.
    waitlist: {
      consentVersion: "2026-10-06-es",
      button: "Avísame cuando salga en Android",
      title: "Respira para Android",
      lead: "Por ahora Respira solo está en iPhone y iPad. Déjanos tu email y te escribimos una sola vez, el día que salga en Android.",
      emailLabel: "Tu email",
      consent: "Quiero que Respira me escriba una sola vez, cuando la app salga en Android. Puedo pedir que borren mi email en cualquier momento.",
      privacy: "Política de privacidad",
      submit: "Apuntarme",
      close: "Cerrar",
      ok: "Hecho. Te escribiremos una sola vez, el día que salga en Android.",
      errorEmail: "Revisa el email, parece que falta algo.",
      errorConsent: "Marca la casilla para que podamos escribirte.",
      errorServer: "No se ha podido guardar. Inténtalo de nuevo en un momento.",
    },
    legalNav: "Legal",
    mainNav: "Principal",
    cookieBanner: {
      text: "Usamos analítica anónima para saber qué páginas funcionan y de dónde llega la gente. No se activa hasta que la aceptas.",
      more: "Política de privacidad",
      accept: "Aceptar",
      reject: "Rechazar",
    },
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
    waitlist: {
      consentVersion: "2026-10-06-en",
      button: "Notify me when it's on Android",
      title: "Respira for Android",
      lead: "Respira is on iPhone and iPad for now. Leave your email and we will write to you once, on the day it comes to Android.",
      emailLabel: "Your email",
      consent: "I want Respira to email me once, when the app comes to Android. I can ask for my email to be deleted at any time.",
      privacy: "Privacy policy",
      submit: "Notify me",
      close: "Close",
      ok: "Done. We will write to you once, on the day it comes to Android.",
      errorEmail: "Check the email, something seems to be missing.",
      errorConsent: "Tick the box so we can write to you.",
      errorServer: "That didn't save. Please try again in a moment.",
    },
    legalNav: "Legal",
    mainNav: "Main",
    cookieBanner: {
      text: "We use anonymous analytics to see which pages work and where visitors come from. It doesn't run until you accept it.",
      more: "Privacy policy",
      accept: "Accept",
      reject: "Reject",
    },
  },
};
