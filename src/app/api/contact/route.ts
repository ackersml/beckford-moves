import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "no-reply@seanbeckford.site";

    if (apiKey && toEmail) {
      const resend = new Resend(apiKey);
      await resend.emails.send({
        from: fromEmail,
        to: [toEmail],
        replyTo: email,
        subject: `New contact form submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      });
    } else {
      console.log("Contact submission (no email provider configured):", { name, email, message });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}


