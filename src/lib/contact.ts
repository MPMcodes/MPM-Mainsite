// Lead/contact delivery for the site forms → Miedema support-agent POST /contact.
// The agent emails the submission to the Miedema team using the tenant's own Gmail
// identity. Email-only by design (no CRM/DB on this path). Endpoint mirrors ChatWidget.
export const CONTACT_ENDPOINT = "https://chat.miedemapropertymanagement.com/contact";

export type ContactPayload = {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
};

export async function submitContact(payload: ContactPayload): Promise<void> {
  const res = await fetch(CONTACT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email ?? "",
      phone: payload.phone ?? "",
      message: payload.message ?? "",
    }),
  });
  if (!res.ok) throw new Error(`Contact submit failed: ${res.status}`);
}
