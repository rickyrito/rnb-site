/* Consentimento de cookies. Enquanto não houver uma escolha guardada,
   o site fica bloqueado por um diálogo modal (fundo esbatido, sem
   fechar em clique fora ou Esc). Qualquer decisão — aceitar, rejeitar
   ou guardar preferências — persiste a escolha neste dispositivo e
   desbloqueia o site. */

const COOKIE_STORAGE_KEY = "nathalia-cookie-consent";

function readCookieConsent() {
  try {
    const raw = localStorage.getItem(COOKIE_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCookieConsent(consent) {
  try {
    localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(consent));
  } catch {
    // modo privado: aplica-se na mesma, só não fica guardado para a próxima visita
  }
}

function applyCookieConsent(consent) {
  const frame = document.getElementById("mapFrame");
  const placeholder = document.getElementById("mapPlaceholder");
  if (!frame) return;

  if (consent && consent.maps) {
    if (!frame.getAttribute("src") && frame.dataset.src) frame.src = frame.dataset.src;
    if (placeholder) placeholder.style.display = "none";
  } else if (placeholder) {
    placeholder.style.display = "";
  }
}

(function initCookieConsent() {
  const modal = document.getElementById("cookieModal");
  const policyModal = document.getElementById("cookiePolicyModal");
  if (!modal) return;

  const closeBtn = document.getElementById("cookieClose");
  const rejectBtn = document.getElementById("cookieRejectAll");
  const acceptBtn = document.getElementById("cookieAcceptAll");
  const saveBtn = document.getElementById("cookieSave");
  const toggleMaps = document.getElementById("cookieToggleMaps");
  const prefsTrigger = document.getElementById("cookiePrefsTrigger");
  const mapEnableBtn = document.getElementById("mapEnableBtn");
  const policyLink = document.getElementById("cookiePolicyLink");
  const policyClose = document.getElementById("cookiePolicyClose");

  window.A11yDialog.trap(modal);
  if (policyModal) window.A11yDialog.trap(policyModal);

  let blocking = false;

  const focusDefault = () => {
    const target = blocking ? acceptBtn : closeBtn;
    if (target) target.focus();
  };

  const openPrefs = (blockNav) => {
    blocking = blockNav;
    const existing = readCookieConsent();
    toggleMaps.checked = !!(existing && existing.maps);

    const alreadyOpen = modal.classList.contains("is-open") ||
      (policyModal && policyModal.classList.contains("is-open"));
    if (!alreadyOpen) window.A11yDialog.remember();

    if (policyModal) policyModal.classList.remove("is-open");
    modal.classList.add("is-open");
    modal.classList.toggle("is-blocking", blocking);
    document.body.style.overflow = "hidden";
    setTimeout(focusDefault, 50);
  };

  const persist = (maps) => {
    const consent = { maps: !!maps, ts: Date.now() };
    writeCookieConsent(consent);
    applyCookieConsent(consent);
    modal.classList.remove("is-open", "is-blocking");
    document.body.style.overflow = "";
    blocking = false;
    window.A11yDialog.restore();
  };

  const closePolicy = () => {
    if (!policyModal) return;
    policyModal.classList.remove("is-open");
    modal.classList.add("is-open");
    setTimeout(focusDefault, 50);
  };

  acceptBtn.addEventListener("click", () => persist(true));
  rejectBtn.addEventListener("click", () => persist(false));
  saveBtn.addEventListener("click", () => persist(toggleMaps.checked));
  closeBtn.addEventListener("click", () => persist(toggleMaps.checked));

  modal.addEventListener("click", (event) => {
    if (event.target === modal && !blocking) persist(toggleMaps.checked);
  });

  if (prefsTrigger) prefsTrigger.addEventListener("click", () => openPrefs(false));
  if (mapEnableBtn) mapEnableBtn.addEventListener("click", () => persist(true));

  if (policyLink && policyModal) {
    policyLink.addEventListener("click", (event) => {
      event.preventDefault();
      modal.classList.remove("is-open");
      policyModal.classList.add("is-open");
      setTimeout(() => policyClose && policyClose.focus(), 50);
    });
  }

  if (policyModal && policyClose) {
    policyClose.addEventListener("click", closePolicy);
    policyModal.addEventListener("click", (event) => {
      if (event.target === policyModal) closePolicy();
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (policyModal && policyModal.classList.contains("is-open")) {
      closePolicy();
    } else if (modal.classList.contains("is-open") && !blocking) {
      persist(toggleMaps.checked);
    }
  });

  const existing = readCookieConsent();
  if (existing) {
    applyCookieConsent(existing);
    toggleMaps.checked = !!existing.maps;
  } else {
    openPrefs(true);
  }
})();
