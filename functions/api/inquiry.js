const defaultToEmail = "admin@jantodechome.com";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function labelFromKey(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function buildEmailContent(payload) {
  const fields = payload.fields || {};
  const rows = Object.entries(fields)
    .filter(([, value]) => String(value || "").trim())
    .map(([key, value]) => {
      const label = escapeHtml(labelFromKey(key));
      const text = escapeHtml(value);
      return `<tr><th align="left" style="padding:8px;border-bottom:1px solid #e5e7eb;">${label}</th><td style="padding:8px;border-bottom:1px solid #e5e7eb;">${text}</td></tr>`;
    })
    .join("");

  const text = [
    `Form type: ${payload.formType || "Website inquiry"}`,
    `Page: ${payload.page || ""}`,
    "",
    ...Object.entries(fields).map(([key, value]) => `${labelFromKey(key)}: ${value}`)
  ].join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#17211f;">
      <h2>New website inquiry from Jantodec Home</h2>
      <p><strong>Form type:</strong> ${escapeHtml(payload.formType || "Website inquiry")}</p>
      <p><strong>Page:</strong> ${escapeHtml(payload.page || "")}</p>
      <table cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;max-width:760px;">
        ${rows || `<tr><td style="padding:8px;">No fields submitted.</td></tr>`}
      </table>
    </div>
  `;

  return { html, text };
}

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY) {
    return jsonResponse({ error: "Email service is not configured." }, 500);
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const fields = payload.fields || {};
  if (!fields.email || !fields.name) {
    return jsonResponse({ error: "Name and email are required." }, 400);
  }

  const toEmail = env.INQUIRY_TO_EMAIL || defaultToEmail;
  const fromEmail = env.INQUIRY_FROM_EMAIL || "Jantodec Home <onboarding@resend.dev>";
  const subject = payload.subject || "New Jantodec Home website inquiry";
  const replyTo = fields.email;
  const content = buildEmailContent(payload);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: replyTo,
      subject,
      html: content.html,
      text: content.text
    })
  });

  if (!response.ok) {
    const message = await response.text();
    return jsonResponse({ error: "Email provider failed.", detail: message }, 502);
  }

  return jsonResponse({ ok: true });
}
