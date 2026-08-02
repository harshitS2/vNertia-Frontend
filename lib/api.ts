/**
 * lib/api.ts
 *
 * API helper for the Vnertia frontend.
 *
 * All requests go through this module so that:
 *   1. The backend URL is configured in one place (via environment variable)
 *   2. Error handling is standardised across the app
 *   3. When the Express backend is not running (dev mode), we simulate success
 *      so the UI can be tested without spinning up the server
 *
 * Environment variables:
 *   NEXT_PUBLIC_API_URL — base URL of the Express backend
 *                         Defaults to http://localhost:4000
 *                         Set this in .env.local for production
 *
 * Usage:
 *   import { submitContactForm } from "@/lib/api";
 *   await submitContactForm({ name, email, company, message });
 */

// The base URL of the Express backend — set in .env.local or hosting env
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// ---------------------------------------------------------------------------
// Type: Contact form payload
// ---------------------------------------------------------------------------
export interface ContactFormPayload {
  name:    string;
  email:   string;
  company: string;
  message: string;
}

// ---------------------------------------------------------------------------
// submitContactForm
//
// POSTs contact form data to the Express backend.
// Throws an Error with a human-readable message on failure.
// ---------------------------------------------------------------------------
export async function submitContactForm(data: ContactFormPayload): Promise<void> {
  const url = `${API_BASE_URL}/api/contact`;

  let response: Response;

  try {
    response = await fetch(url, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(data),
    });
  } catch (networkError) {
    // Network error (server not running, CORS issue, etc.)
    // In development without a backend, we simulate success so the UI can be tested.
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[api.ts] Backend not reachable. Simulating success for local dev.",
        networkError
      );
      // Simulate a short network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      return; // treat as success
    }
    throw new Error(
      "Could not connect to the server. Please check your internet connection and try again."
    );
  }

  // Handle non-2xx HTTP responses
  if (!response.ok) {
    let serverMessage = "Something went wrong. Please try again.";
    try {
      const json = await response.json();
      if (json?.message) serverMessage = json.message;
    } catch {
      // Ignore JSON parse errors — use default message above
    }
    throw new Error(serverMessage);
  }
}
