import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

function buildHtml(name: string, email: string, subject: string, message: string): string {
  const escapedMessage = message
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br/>");

  const now = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "long",
    timeStyle: "short",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Portfolio Message</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header banner -->
          <tr>
            <td style="background:linear-gradient(135deg,#059669 0%,#0d9488 50%,#4f46e5 100%);padding:32px 36px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="display:inline-block;background:rgba(255,255,255,0.15);border-radius:10px;padding:8px 14px;margin-bottom:14px;">
                      <span style="color:#d1fae5;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Portfolio Contact</span>
                    </div>
                    <h1 style="margin:0 0 6px;color:#ffffff;font-size:24px;font-weight:800;line-height:1.2;">
                      New Message Received
                    </h1>
                    <p style="margin:0;color:#a7f3d0;font-size:13px;">
                      Someone reached out via Dr. Sourav Bhadwal's portfolio website
                    </p>
                  </td>
                  <td align="right" valign="top" style="padding-left:12px;">
                    <div style="width:52px;height:52px;background:rgba(255,255,255,0.2);border-radius:12px;display:flex;align-items:center;justify-content:center;text-align:center;line-height:52px;font-size:20px;font-weight:900;color:#fff;">
                      SB
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sender Info -->
          <tr>
            <td style="padding:28px 36px 0;">
              <p style="margin:0 0 16px;font-size:12px;font-weight:700;color:#6b7280;letter-spacing:0.1em;text-transform:uppercase;">Sender Details</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
                <!-- Name -->
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 18px;width:100px;font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #e5e7eb;">Name</td>
                  <td style="padding:12px 18px;font-size:14px;color:#111827;font-weight:600;border-bottom:1px solid #e5e7eb;">${name}</td>
                </tr>
                <!-- Email -->
                <tr>
                  <td style="padding:12px 18px;font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #e5e7eb;">Email</td>
                  <td style="padding:12px 18px;border-bottom:1px solid #e5e7eb;">
                    <a href="mailto:${email}" style="color:#059669;font-size:14px;font-weight:600;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <!-- Subject -->
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 18px;font-size:12px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.06em;">Subject</td>
                  <td style="padding:12px 18px;font-size:14px;color:#374151;">${subject || "<em style='color:#9ca3af;'>No subject</em>"}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message body -->
          <tr>
            <td style="padding:24px 36px 0;">
              <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#6b7280;letter-spacing:0.1em;text-transform:uppercase;">Message</p>
              <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #10b981;border-radius:0 12px 12px 0;padding:20px 22px;">
                <p style="margin:0;font-size:14px;color:#374151;line-height:1.8;">${escapedMessage}</p>
              </div>
            </td>
          </tr>

          <!-- Reply CTA -->
          <tr>
            <td style="padding:28px 36px 0;text-align:center;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || "Your message")}"
                style="display:inline-block;background:linear-gradient(135deg,#10b981,#0d9488);color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:13px 32px;border-radius:10px;letter-spacing:0.02em;">
                ↩ Reply to ${name}
              </a>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:28px 36px 0;">
              <div style="height:1px;background:linear-gradient(90deg,transparent,#e5e7eb,transparent);"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 36px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 2px;font-size:12px;color:#6b7280;">
                      📅 Received: <strong>${now} IST</strong>
                    </p>
                    <p style="margin:0;font-size:11px;color:#9ca3af;">
                      Sent via the contact form at Dr. Sourav Bhadwal's portfolio · IIT-BHU, Varanasi
                    </p>
                  </td>
                  <td align="right">
                    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:6px 12px;display:inline-block;">
                      <span style="font-size:11px;font-weight:700;color:#059669;">🌿 Remote Sensing &amp; GIS</span>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- /Card -->

        <p style="margin:20px 0 0;font-size:11px;color:#94a3b8;text-align:center;">
          This email was auto-generated. Reply to it to contact ${name} directly.
        </p>

      </td>
    </tr>
  </table>

</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Dr Sourav Bhadwal" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: subject ? `[Dr Sourav Bhadwal] ${subject}` : `[Dr Sourav Bhadwal] New message from ${name}`,
      html: buildHtml(name, email, subject, message),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
