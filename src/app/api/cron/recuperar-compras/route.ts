import { NextRequest, NextResponse } from "next/server";
import { cronAutorizado } from "@/lib/cron";
import { FROM, recordatorioCompraHtml, sendSingle } from "@/lib/email";
import { conArticulo } from "@/lib/mp";
import { VENTANA, elegirRecordatorios, pagosDesde, preferenciasDesde } from "@/lib/mp-recupero";

// Vercel cron, una vez por día (vercel.json). La ventana de 48→24 h de mp-recupero.ts depende
// de que corra UNA vez por día: si se cambia el horario a más seguido, cada abandono recibiría
// varios mails.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SITE = "https://calcular.ar";

export async function GET(req: NextRequest) {
  if (!cronAutorizado(req.headers)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token || !process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "faltan MP_ACCESS_TOKEN o RESEND_API_KEY" }, { status: 500 });
  }

  // `?simular=1` lista a quién se le escribiría, sin mandar nada: es la forma de probar el cron
  // en producción sin molestar a nadie.
  const simular = req.nextUrl.searchParams.get("simular") === "1";
  // Anclado a la hora en punto: si Vercel dispara el cron unos segundos antes o después que ayer,
  // la ventana 48→24 h no se corre y ninguna preferencia del borde cae en dos corridas (o en ninguna).
  const ahora = new Date(Math.floor(Date.now() / 3_600_000) * 3_600_000);
  // Los pagos se miran con un día más de margen que las preferencias: alguien pudo pagar en un
  // segundo intento hasta hoy mismo.
  const desdePrefs = new Date(ahora.getTime() - (VENTANA.desdeHoras + 2) * 3_600_000).toISOString();

  try {
    const [prefs, pagos] = await Promise.all([
      preferenciasDesde(desdePrefs, token),
      pagosDesde(desdePrefs, token),
    ]);
    const elegidos = elegirRecordatorios(prefs, pagos, ahora);

    if (simular) {
      return NextResponse.json({
        ok: true,
        simulado: true,
        preferencias: prefs.length,
        pagos: pagos.length,
        recordatorios: elegidos.map((r) => ({ producto: r.producto.slug, referencia: r.referencia })),
      });
    }

    let enviados = 0;
    for (const r of elegidos) {
      const ok = await sendSingle({
        from: FROM,
        to: [r.email],
        subject: `Te quedó pendiente ${conArticulo(r.producto)}`,
        html: recordatorioCompraHtml({
          tituloCorto: r.producto.tituloCorto,
          precio: `$${r.producto.precio.toLocaleString("es-AR")}`,
          urlRetomar: `${SITE}${r.producto.rutaLanding}?utm_source=recordatorio&utm_medium=email#comprar`,
          informe: r.producto.entrega === "informe",
        }),
      }).catch(() => false);
      if (ok) enviados++;
      else console.error("[cron/recuperar-compras] Resend rechazó el recordatorio de", r.referencia);
    }

    console.log(`[cron/recuperar-compras] ${prefs.length} preferencias · ${elegidos.length} elegidas · ${enviados} enviadas`);
    return NextResponse.json({ ok: true, preferencias: prefs.length, elegidos: elegidos.length, enviados });
  } catch (e) {
    console.error("[cron/recuperar-compras]", e);
    return NextResponse.json({ error: "falló la consulta a MercadoPago" }, { status: 502 });
  }
}
