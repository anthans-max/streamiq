import { NextRequest } from "next/server";
import Airtable from "airtable";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const form = await req.json();
  const { name, org, role, interest, message } = form;

  const errors: string[] = [];

  // ── Save to Airtable ──────────────────────────────────────────────────────
  if (
    process.env.AIRTABLE_API_KEY &&
    process.env.AIRTABLE_BASE_ID &&
    process.env.AIRTABLE_TABLE_NAME
  ) {
    try {
      const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
        process.env.AIRTABLE_BASE_ID
      );
      await base(process.env.AIRTABLE_TABLE_NAME).create([
        {
          fields: {
            Name: name,
            Organization: org,
            Role: role,
            Interest: interest,
            Message: message,
            Timestamp: new Date().toISOString(),
          },
        },
      ]);
    } catch (err) {
      console.error("Airtable error:", err);
      errors.push("airtable");
    }
  }

  // ── Send email via Resend ─────────────────────────────────────────────────
  if (process.env.RESEND_API_KEY && process.env.NOTIFICATION_EMAIL) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "noreply@streamiq.ai",
        to: process.env.NOTIFICATION_EMAIL,
        subject: `New StreamIQ inquiry from ${name} at ${org}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; color: #1a1a1a;">
            <h2 style="color: #c9a84c;">New Consultation Request — StreamIQ</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #666; width: 120px;"><strong>Name</strong></td><td>${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;"><strong>Organization</strong></td><td>${org}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;"><strong>Role</strong></td><td>${role}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;"><strong>Interest</strong></td><td>${interest}</td></tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: #f9f9f9; border-radius: 4px;">
              <strong>Message:</strong>
              <p style="margin-top: 8px;">${message}</p>
            </div>
            <p style="margin-top: 24px; font-size: 12px; color: #999;">Submitted ${new Date().toLocaleString()}</p>
          </div>
        `,
      });
    } catch (err) {
      console.error("Resend error:", err);
      errors.push("resend");
    }
  }

  // Return success even if integrations are not configured — the form submission
  // still counts as received from the user's perspective.
  return Response.json({ success: true, warnings: errors });
}
