const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const tabButtons = document.querySelectorAll("[data-tab]");
const tabPanels = document.querySelectorAll("[data-panel]");
const formModeButtons = document.querySelectorAll("[data-form-mode]");
const projectFields = document.querySelector("[data-project-fields]");
const rfqTriggers = document.querySelectorAll("[data-rfq-trigger]");
const rfqForm = document.querySelector("[data-rfq-form]");
const formStatus = document.querySelector("[data-form-status]");
const simpleForms = document.querySelectorAll("[data-simple-form]");
const buyerPath = document.querySelector("[data-buyer-path]");

const buyerPathCopy = {
  floor: {
    title: "Start with floor tile programs",
    text: "Compare waterproof vinyl, marble, wood look, black-and-white, and hexagon series.",
    href: "/products/peel-and-stick-floor-tiles/",
    label: "View floor tile options"
  },
  wall: {
    title: "Build a wall tile line",
    text: "Review 3D, stone-look, vinyl, backsplash, bathroom wall, and decorative wall options.",
    href: "/products/peel-and-stick-wall-tiles/",
    label: "View wall tile options"
  },
  label: {
    title: "Prepare a private-label program",
    text: "Share target market, quantity, packaging format, barcode needs, and launch timeline.",
    href: "/contact/",
    label: "Talk to sales"
  },
  sample: {
    title: "Request samples before bulk order",
    text: "Check surface finish, adhesive, thickness, color consistency, packaging, and claims.",
    href: "/contact/#sample-request",
    label: "Request samples"
  }
};

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  header.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    header.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });

    tabPanels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === target);
    });
  });
});

formModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const showProjectFields = button.dataset.formMode === "project";

    formModeButtons.forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    projectFields?.classList.toggle("active", showProjectFields);
  });
});

rfqTriggers.forEach((button) => {
  button.addEventListener("click", () => {
    const productSelect = rfqForm?.querySelector('[name="productInterest"]');
    const supportSelect = rfqForm?.querySelector('[name="neededSupport"]');
    const message = rfqForm?.querySelector('[name="message"]');

    if (productSelect) {
      productSelect.value = button.dataset.rfqTrigger;
    }

    if (supportSelect) {
      supportSelect.value = "Samples and quotation";
    }

    if (message && !message.value) {
      message.value = `Please send sample options, quotation, MOQ, lead time, packaging options, and available test reports for ${button.dataset.rfqTrigger}.`;
    }

    const contactTarget = document.querySelector("#contact") || document.querySelector("#quick-inquiry") || document.querySelector("[data-rfq-form]");
    contactTarget?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

function validateField(field) {
  const valid = field.checkValidity();
  field.classList.toggle("invalid", !valid);
  return valid;
}

function getFormPayload(form, subjectPrefix) {
  const formData = new FormData(form);
  const fields = {};

  formData.forEach((value, key) => {
    if (value instanceof File) {
      if (value.name) {
        fields[key] = `${value.name} (file upload placeholder)`;
      }
      return;
    }

    if (String(value).trim()) {
      fields[key] = String(value).trim();
    }
  });

  const product = formData.get("productInterest") || formData.get("product") || formData.get("buyerType") || "Peel and stick tile inquiry";
  return {
    subject: `${subjectPrefix}: ${product}`,
    formType: subjectPrefix,
    page: window.location.href,
    fields
  };
}

async function submitInquiry(form, status, subjectPrefix) {
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton?.textContent;

  if (status) {
    status.textContent = "Sending your inquiry...";
    status.classList.remove("success");
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  }

  try {
    const response = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getFormPayload(form, subjectPrefix))
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(result.error || "Submission failed.");
    }

    if (status) {
      status.textContent = "Thanks. Your inquiry has been sent. Our sales team will reply within 24 hours.";
      status.classList.add("success");
    }

    form.reset();
    return true;
  } catch (error) {
    if (status) {
      status.textContent = "The inquiry service is temporarily unavailable. Please email admin@jantodechome.com or try again later.";
      status.classList.remove("success");
    }
    return false;
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  }
}

rfqForm?.querySelectorAll("input, select, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    if (field.classList.contains("invalid")) {
      validateField(field);
    }
  });
});

rfqForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const fields = Array.from(rfqForm.querySelectorAll("input, select, textarea"));
  const invalidField = fields.find((field) => !validateField(field));

  if (invalidField) {
    formStatus.textContent = "Please complete the required fields so our sales team can reply accurately.";
    formStatus.classList.remove("success");
    invalidField.focus();
    return;
  }

  submitInquiry(rfqForm, formStatus, "Website quote request").then((sent) => {
    if (!sent) return;
    projectFields?.classList.remove("active");
    formModeButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.formMode === "quick");
    });
  });
});

simpleForms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector(".form-status");
    const invalidField = Array.from(form.querySelectorAll("input, select, textarea")).find((field) => !validateField(field));

    if (invalidField) {
      if (status) {
        status.textContent = "Please complete the required contact fields.";
        status.classList.remove("success");
      }
      invalidField.focus();
      return;
    }

    const buttonText = form.querySelector("button")?.textContent?.trim() || "Website inquiry";
    submitInquiry(form, status, buttonText);
  });
});

buyerPath?.querySelectorAll("[data-buyer-choice]").forEach((button) => {
  button.addEventListener("click", () => {
    const choice = buyerPathCopy[button.dataset.buyerChoice];
    if (!choice) return;

    buyerPath.querySelectorAll("[data-buyer-choice]").forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    buyerPath.querySelector("[data-buyer-title]").textContent = choice.title;
    buyerPath.querySelector("[data-buyer-text]").textContent = choice.text;

    const link = buyerPath.querySelector("[data-buyer-link]");
    link.href = choice.href;
    link.textContent = choice.label;
  });
});
