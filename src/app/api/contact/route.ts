import { NextRequest } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const form = await req.json();
  const { name, org, role, interest, message } = form;

  // ── Save lead to Supabase ─────────────────────────────────────────────────
  const { error: dbError } = await supabase.from("leads").insert([
    {
      name,
      organization: org,
      role,
      interest,
      message,
      created_at: new Date().toISOString(),
    },
  ]);

  if (dbError) {
    console.error("Supabase insert error:", dbError);
    return Response.json({ success: false, error: "db" }, { status: 500 });
  }

  // ── Send email notification via Resend ────────────────────────────────────
  if (process.env.RESEND_API_KEY && process.env.RESEND_TO_EMAIL) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
        to: process.env.RESEND_TO_EMAIL,
        subject: `New StreamIQ inquiry from ${name} at ${org}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; color: #1a1a1a;">
            <h2 style="color: #c9a84c; margin-bottom: 20px;">New Consultation Request — StreamIQ</h2>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666; width: 130px; font-weight: bold;">Name</td>
                <td style="padding: 10px 0;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666; font-weight: bold;">Organization</td>
                <td style="padding: 10px 0;">${org}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666; font-weight: bold;">Role</td>
                <td style="padding: 10px 0;">${role}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; color: #666; font-weight: bold;">Interest</td>
                <td style="padding: 10px 0;">${interest}</td>
              </tr>
            </table>
            <div style="padding: 16px; background: #f9f9f9; border-left: 3px solid #c9a84c; border-radius: 2px;">
              <strong style="color: #333;">Message</strong>
              <p style="margin-top: 8px; color: #555; line-height: 1.6;">${message}</p>
            </div>
            <p style="margin-top: 24px; font-size: 12px; color: #999;">
              Submitted ${new Date().toLocaleString()} · via StreamIQ by Lotus AI
            </p>
          </div>
        `,
      });
    } catch (err) {
      // Email failure is non-critical — lead is already saved; log and continue.
      console.error("Resend error:", err);
    }
  }

  return Response.json({ success: true });
}
