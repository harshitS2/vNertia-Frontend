/**
 * lib/emailjs.ts
 *
 * Client-side EmailJS integration module for static Next.js deployments.
 *
 * Requirements:
 *   - Works in purely static deployments (output: "export" -> out/)
 *   - Uses official @emailjs/browser SDK
 *   - Reads public configuration from environment variables:
 *       NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
 *       NEXT_PUBLIC_EMAILJS_SERVICE_ID
 *       NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
 *   - Safe for browser execution: No private keys or database passwords used.
 */

import emailjs from "@emailjs/browser";

// Environment configuration variables
export const EMAILJS_CONFIG = {
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
};

export interface ContactEmailPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
}

/**
 * Checks whether all required EmailJS environment variables are configured.
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
 * Sends a contact form submission via EmailJS browser SDK.
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

  // Check configuration
  const isConfigured = isEmailJSConfigured();

  if (!isConfigured) {
    // Development fallback simulation
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[EmailJS] Missing or placeholder EmailJS credentials in .env.local.\n" +
        "NEXT_PUBLIC_EMAILJS_PUBLIC_KEY, NEXT_PUBLIC_EMAILJS_SERVICE_ID, or NEXT_PUBLIC_EMAILJS_TEMPLATE_ID not configured.\n" +
        "Simulating email dispatch for local testing.",
        payload
      );
      // Simulate network latency
      await new Promise((resolve) => setTimeout(resolve, 800));
      return;
    }

    throw new Error(
      "Email service is not configured. Please set the EmailJS environment variables and rebuild."
    );
  }

  // Template parameters mapped to common EmailJS variable patterns
  const templateParams: Record<string, string> = {
    // Standard names
    name: name.trim(),
    email: email.trim(),
    company: company?.trim() || "Not specified",
    subject: subject.trim(),
    message: message.trim(),

    // EmailJS alias variables
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
      // Re-throw known message
      throw new Error(error.message || "Failed to send message via EmailJS. Please try again.");
    }

    // EmailJS error objects often have a 'text' property
    if (typeof error === "object" && error !== null && "text" in error) {
      const errorObj = error as { text?: string; status?: number };
      throw new Error(errorObj.text || `EmailJS Error (${errorObj.status ?? "unknown"})`);
    }

    throw new Error("Unable to send your message at this time. Please try again later.");
  }
}
