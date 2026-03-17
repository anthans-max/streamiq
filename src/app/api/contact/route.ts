import { NextRequest } from "next/server";
import { Resend } from "resend";

// Demo leads — representative sample of what real submissions look like.
// No database is connected; submissions are logged to the console only.
const DEMO_LEADS = [
  { name: "Maya Chen", organization: "Meridian Health", role: "Chief Data Officer", interest: "Predictive analytics, patient outcomes" },
  { name: "James Okafor", organization: "Northlight Media", role: "VP Product", interest: "Content recommendation engine" },
  { name: "Sofia Reyes", organization: "Atlas Logistics", role: "Head of Engineering", interest: "Demand forecasting, route optimization" },
  { name: "Daniel Park", organization: "Vantage Capital", role: "CTO", interest: "Portfolio risk modeling, anomaly detection" },
  { name: "Priya Nair", organization: "Bloom Retail Group", role: "Director of Analytics", interest: "Customer churn, LTV prediction" },
];

export async function POST(req: NextRequest) {
  const form = await req.json();
  const { name, org, role, interest, message } = form;

  // Log submission (no database in demo mode).
  console.log("[contact] New submission:", { name, org, role, interest, message });
  console.log("[contact] Demo leads sample:", DEMO_LEADS[0]);

  // ── Send email notification via Resend (optional) ─────────────────────────
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
      console.error("Resend error:", err);
    }
  }

  return Response.json({ success: true });
}
