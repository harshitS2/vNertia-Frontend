import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, company } = body;

    // Validate required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 }
      );
    }
    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        { success: false, error: "Email is required." },
        { status: 400 }
      );
    }
    if (!subject || typeof subject !== "string" || !subject.trim()) {
      return NextResponse.json(
        { success: false, error: "Subject is required." },
        { status: 400 }
      );
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Message is required." },
        { status: 400 }
      );
    }

    // Read environment variables (supports both standard and NEXT_PUBLIC prefixes)
    const serviceId =
      process.env.EMAILJS_SERVICE_ID ||
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ||
      "";
    const templateId =
      process.env.EMAILJS_TEMPLATE_ID ||
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ||
      "";
    const publicKey =
      process.env.EMAILJS_PUBLIC_KEY ||
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ||
      "";
    const privateKey =
      process.env.EMAILJS_PRIVATE_KEY ||
      process.env.EMAILJS_ACCESS_TOKEN ||
      process.env.NEXT_PUBLIC_EMAILJS_PRIVATE_KEY ||
      "";

    // Handle development fallback if keys are missing
    if (!serviceId || !templateId || !publicKey) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[API /api/contact] EmailJS credentials not found in environment. Simulating email dispatch for development."
        );
        return NextResponse.json({
          success: true,
          message: "Simulated dispatch in development mode.",
        });
      }

      return NextResponse.json(
        {
          success: false,
          error:
            "Email service is not configured on the server. Please set the EmailJS environment variables in your Vercel project settings.",
        },
        { status: 500 }
      );
    }

    // Prepare EmailJS REST payload
    const emailPayload: Record<string, unknown> = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
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
      },
    };

    if (privateKey) {
      emailPayload.accessToken = privateKey;
    }

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[EmailJS REST API Error]:", response.status, errorText);
      return NextResponse.json(
        {
          success: false,
          error: errorText || `EmailJS returned HTTP status ${response.status}`,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[/api/contact] Internal Error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred while sending your message.",
      },
      { status: 500 }
    );
  }
}
