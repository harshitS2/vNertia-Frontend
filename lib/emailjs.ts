/**
 * lib/emailjs.ts
 *
 * Contact submission module for Next.js deployments on Vercel.
 *
 * Dispatches via the Next.js API route (/api/contact) and
 * falls back to client-side EmailJS SDK if needed.
 */

import emailjs from "@emailjs/browser";

// Environment configuration variables
export const EMAILJS_CONFIG = {
  publicKey:
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
    process.env.EMAILJS_PUBLIC_KEY ||
    "",
  serviceId:
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
    process.env.EMAILJS_SERVICE_ID ||
    "",
  templateId:
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
    process.env.EMAILJS_TEMPLATE_ID ||
    "",
};

export interface ContactEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
}

/**
 * Checks whether client EmailJS environment variables are configured.
 */
export function isEmailJSConfigured(): boolean {
  return Boolean(
    EMAILJS_CONFIG.publicKey &&
    EMAILJS_CONFIG.publicKey.trim() !== "" &&
    EMAILJS_CONFIG.publicKey !== "your_public_key_here" &&
    EMAILJS_CONFIG.serviceId &&
    EMAILJS_CONFIG.serviceId.trim() !== "" &&
    EMAILJS_CONFIG.serviceId !== "your_service_id_here" &&
    EMAILJS_CONFIG.templateId &&
    EMAILJS_CONFIG.templateId.trim() !== "" &&
    EMAILJS_CONFIG.templateId !== "your_template_id_here"
  );
}

/**
 * Sends a contact form submission.
 * First tries the Next.js server API route (/api/contact), then falls back to browser SDK.
 *
 * @throws Error with user-friendly message on failure.
 */
export async function sendContactEmail(payload: ContactEmailPayload): Promise<void> {
  const { name, email, subject, message, company } = payload;

  // Validate required payload fields
  if (!name.trim()) throw new Error("Name is required.");
  if (!email.trim()) throw new Error("Email address is required.");
  if (!subject.trim()) throw new Error("Subject is required.");
  if (!message.trim()) throw new Error("Message is required.");

  // 1. Primary: Server API route (/api/contact)
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, subject, message, company }),
    });

    if (res.ok) {
      const data = await res.json().catch(() => ({ success: true }));
      if (data.success) {
        return;
      }
    } else {
      const errData = await res.json().catch(() => null);
      if (errData?.error) {
        // If it's a validation error or known server message, surface it
        if (!errData.error.includes("not configured")) {
          throw new Error(errData.error);
        }
      }
    }
  } catch (apiErr) {
    // If it's a known error thrown above, re-throw it
    if (apiErr instanceof Error && !apiErr.message.includes("fetch")) {
      console.warn("[/api/contact error]:", apiErr.message);
    }
  }

  // 2. Fallback: Browser SDK
  const isConfigured = isEmailJSConfigured();

  if (!isConfigured) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[EmailJS] Missing or placeholder EmailJS credentials in .env.local.\n" +
        "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY, NEXT_PUBLIC_EMAILJS_SERVICE_ID, or NEXT_PUBLIC_EMAILJS_TEMPLATE_ID not configured.\n" +
        "Simulating email dispatch for local testing.",
        payload
      );
      await new Promise((resolve) => setTimeout(resolve, 800));
      return;
    }

    throw new Error(
      "Email service is not configured. Please set the EmailJS environment variables in your Vercel Project Settings."
    );
  }

  const templateParams: Record<string, string> = {
    name: name.trim(),
    email: email.trim(),
    company: company?.trim() || "Not specified",
    subject: subject.trim(),
    message: message.trim(),
    from_name: name.trim(),
    from_email: email.trim(),
    reply_to: email.trim(),
    user_name: name.trim(),
    user_email: email.trim(),
    user_subject: subject.trim(),
    user_message: message.trim(),
    sent_at: new Date().toLocaleString(),
  };

  try {
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      {
        publicKey: EMAILJS_CONFIG.publicKey,
      }
    );

    if (response.status !== 200 && response.text !== "OK") {
      throw new Error(`EmailJS responded with status ${response.status}: ${response.text}`);
    }
  } catch (error: unknown) {
    console.error("[EmailJS Error]:", error);

    if (error instanceof Error) {
      throw new Error(error.message || "Failed to send message. Please try again.");
    }

    if (typeof error === "object" && error !== null && "text" in error) {
      const errorObj = error as { text?: string; status?: number };
      throw new Error(errorObj.text || `EmailJS Error (${errorObj.status ?? "unknown"})`);
    }

    throw new Error("Unable to send your message at this time. Please try again later.");
  }
}
