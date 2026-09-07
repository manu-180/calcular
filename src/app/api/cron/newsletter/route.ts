import { NextRequest, NextResponse } from "next/server";
import { FROM, newsletterEmailHtml } from "@/lib/email";
import { IPC_SERIE } from "@/data/ipc-serie";
import { TNA_FALLBACK } from "@/data/plazofijo";

// Vercel cron llama este endpoint cada lunes a las 12:00 UTC (= 09:00 AR).
// Usa CRON_SECRET para autenticar. Límite: ~10s en plan gratuito.
// Env vars requeridas: SUPABASE_URL, SUPABASE_SERVICE_KEY, RESEND_API_KEY, CRON_SECRET.

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY!;
const RESEND_API = "https://api.resend.com";

// ─── helpers ─────────────────────────────────────────────────────────────────

function isoWeek(d: Date): string {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

function formatPeriod(yyyyMM: string): string {
  const [y, m] = yyyyMM.split("-");
  const months = [
    "enero","febrero","marzo","abril","mayo","junio",
    "julio","agosto","septiembre","octubre","noviembre","diciembre",
  ];
  return `${months[parseInt(m) - 1]} ${y}`;
}

async function sbFetch(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(`${SUPABASE_URL}/rest/v1${path}`, {
    ...init,
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      "Content-Type": "application/json",
      ...(init.headers as Record<string, string> ?? {}),
    },
  });
}

// ─── handler ─────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!SERVICE_KEY || !process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Env vars missing" }, { status: 500 });
  }

  const campaignId = isoWeek(new Date());

  // IPC: variación mensual del último período de la serie
  const lastIpc = IPC_SERIE[IPC_SERIE.length - 1]; // ["YYYY-MM", índice]
  const prevIpc = IPC_SERIE[IPC_SERIE.length - 2];
  const ipcPct = ((lastIpc[1] / prevIpc[1] - 1) * 100).toFixed(1);
  const ipcMes = formatPeriod(lastIpc[0]);

  // Suscriptores activos
  const subsRes = await sbFetch(
    "/subscribers?active=eq.true&select=email,unsubscribe_token"
  );
  if (!subsRes.ok) {
    return NextResponse.json({ error: "DB error: subscribers" }, { status: 500 });
  }
  const subscribers: { email: string; unsubscribe_token: string }[] =
    await subsRes.json();

  // Ya enviados esta semana (anti-duplicado)
  const sentRes = await sbFetch(
    `/email_sends?type=eq.newsletter&campaign_id=eq.${campaignId}&select=email`
  );
  const alreadySent: { email: string }[] = sentRes.ok ? await sentRes.json() : [];
  const sentSet = new Set(alreadySent.map((s) => s.email));

  const pending = subscribers.filter((s) => !sentSet.has(s.email));
  if (pending.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, campaign: campaignId });
  }

  const subject = `CalculAR: novedades de la semana | IPC ${ipcMes} ${ipcPct}%`;

  // Envío en lotes de 100 (límite de Resend batch)
  let totalSent = 0;
  for (let i = 0; i < pending.length; i += 100) {
    const chunk = pending.slice(i, i + 100);

    const messages = chunk.map((sub) => ({
      from: FROM,
      to: [sub.email],
      subject,
      html: newsletterEmailHtml({
        weekLabel: campaignId,
        ipcMes,
        ipcPct,
        tnaPct: TNA_FALLBACK.valor.toFixed(2),
        unsubToken: sub.unsubscribe_token,
      }),
      headers: {
        "List-Unsubscribe": `<https://calcular.ar/api/unsubscribe?t=${sub.unsubscribe_token}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    }));

    const resend = await fetch(`${RESEND_API}/emails/batch`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });

    if (resend.ok) {
      // Registrar envíos exitosos
      await sbFetch("/email_sends", {
        method: "POST",
        headers: { Prefer: "return=minimal" } as Record<string, string>,
        body: JSON.stringify(
          chunk.map((s) => ({
            email: s.email,
            type: "newsletter",
            campaign_id: campaignId,
          }))
        ),
      });
      totalSent += chunk.length;
    }
  }

  return NextResponse.json({ ok: true, sent: totalSent, campaign: campaignId });
}
