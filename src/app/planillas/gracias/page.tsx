import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createHash } from "node:crypto";
import Link from "next/link";
import { PRODUCTO, habilitaDescarga, obtenerPago, productoDePago, type MpPayment, type Producto } from "@/lib/mp";
import { TrackEvento } from "@/components/TrackEvento";
import { ConversionGoogleAds } from "@/components/ConversionGoogleAds";
import { CONVERSION_COMPRA_PLANILLA } from "@/lib/ads";

// Transaccional: se re-verifica el pago en cada carga, nunca se cachea.
export const dynamic = "force-dynamic";

// Google sólo necesita un id estable para deduplicar la conversión; el payment_id real es la
// credencial de descarga del comprador y no sale del servidor.
const idTransaccionParaAds = (paymentId: string) =>
  createHash("sha256").update(paymentId).digest("hex").slice(0, 24);

export const metadata: Metadata = {
  title: "Gracias por tu compra",
  robots: { index: false, follow: false },
};

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

// Sumamos al comprador a la lista para mandarle las actualizaciones del año.
// Best-effort: si falla, NO rompe la entrega (la descarga es lo que importa).
// Idempotente: en un refresh, el email repetido da 409 y queda igual.
async function capturarEmailComprador(email: string, slug: string): Promise<void> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        source: `compra-${slug}`,
        unsubscribe_token: crypto.randomUUID(),
      }),
    });
  } catch {
    // tragado a propósito: la captura del email nunca bloquea la descarga
  }
}

type SearchParams = { [key: string]: string | string[] | undefined };

function leerParam(sp: SearchParams, k: string): string | undefined {
  const v = sp[k];
  return typeof v === "string" ? v : undefined;
}

export default async function GraciasPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  // MP manda payment_id; collection_id es el alias histórico (mismo valor).
  const paymentId = leerParam(sp, "payment_id") ?? leerParam(sp, "collection_id");

  if (!paymentId) {
    return <Marco titulo="No encontramos tu pago" tono="neutro" icono="?">
      <p className="text-zinc-600">
        Si ya compraste la planilla, revisá tu email: te la enviamos ahí. Si
        todavía no la compraste, podés hacerlo desde la página de la planilla.
      </p>
      <Volver />
    </Marco>;
  }

  // Re-consultamos el pago a MP. NUNCA confiamos en el ?status del redirect.
  let pago: MpPayment | null = null;
  try {
    pago = await obtenerPago(paymentId);
  } catch {
    pago = null;
  }

  // Qué producto se compró sale del pago, no de la URL: el mismo /gracias sirve a todo el
  // catálogo y nadie puede pedir otro archivo cambiando un query param.
  const producto: Producto = (pago ? productoDePago(pago) : null) ?? PRODUCTO;

  if (pago && habilitaDescarga(pago, producto)) {
    if (pago.payer?.email) await capturarEmailComprador(pago.payer.email, producto.slug);
    return (
      <Marco titulo="¡Listo! Tu pago se acreditó" tono="ok" icono="check">
        <TrackEvento
          evento="planilla_compra_completada"
          propiedades={{ producto: producto.slug, precio: producto.precio }}
        />
        <ConversionGoogleAds
          sendTo={CONVERSION_COMPRA_PLANILLA}
          value={producto.precio}
          transactionId={idTransaccionParaAds(paymentId)}
        />
        <p className="text-zinc-600">
          Compraste la <strong>{producto.tituloCorto}</strong>. Descargala acá abajo.{" "}
          {pago.payer?.email
            ? "También te la mandamos por email con el enlace permanente: guardá ese mail, porque es por ahí que te van a llegar las actualizaciones del año."
            : "Guardá este enlace: no vence, y cada vez que actualicemos la planilla te descarga la versión nueva."}
        </p>
        <a
          href={`${producto.rutaDescarga}?payment_id=${encodeURIComponent(paymentId)}`}
          className="mt-2 block rounded-lg bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Descargar la planilla (.xlsx)
        </a>
        <p className="text-center text-xs text-zinc-500">
          Funciona en Google Sheets y en Microsoft Excel, sin instalar nada.
        </p>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
          ¿No baja el archivo? Volvé a tocar el botón o entrá de nuevo a este
          enlace desde el mismo dispositivo. Si seguís sin poder,{" "}
          <Link href="/contacto" className="font-semibold text-emerald-700 underline">
            escribinos
          </Link>{" "}
          y te lo enviamos por email.
        </div>
      </Marco>
    );
  }

  const status = pago?.status;
  if (status === "pending" || status === "in_process") {
    return (
      <Marco titulo="Tu pago está en proceso" tono="espera" icono="clock">
        <p className="text-zinc-600">
          Cuando MercadoPago confirme el pago —suele ser cuestión de minutos— te
          mandamos la planilla por email. No hace falta que pagues de nuevo.
        </p>
        <Volver />
      </Marco>
    );
  }

  // Rechazado, no encontrado o error de verificación.
  return (
    <Marco titulo="No pudimos confirmar tu pago" tono="neutro" icono="x">
      <p className="text-zinc-600">
        Si el dinero salió de tu cuenta, escribinos y lo resolvemos enseguida. Si
        no, podés intentar la compra otra vez.
      </p>
      <div className="flex flex-col gap-2">
        <Link
          href={producto.rutaLanding}
          className="block rounded-lg bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Volver a la planilla
        </Link>
        <Link href="/contacto" className="text-center text-sm font-semibold text-emerald-700 underline">
          Escribinos
        </Link>
      </div>
    </Marco>
  );
}

function Volver() {
  return (
    <Link
      href="/planillas"
      className="block rounded-lg bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
    >
      Ir a la planilla
    </Link>
  );
}

function Marco({
  titulo,
  tono,
  icono,
  children,
}: {
  titulo: string;
  tono: "ok" | "espera" | "neutro";
  icono: "check" | "clock" | "x" | "?";
  children: ReactNode;
}) {
  const color =
    tono === "ok"
      ? "bg-emerald-100 text-emerald-700"
      : tono === "espera"
        ? "bg-amber-100 text-amber-700"
        : "bg-zinc-100 text-zinc-500";
  return (
    <div className="mx-auto max-w-lg py-6">
      <div className="rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
        <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${color}`}>
          <Glifo nombre={icono} />
        </div>
        <h1 className="mb-3 text-2xl font-bold tracking-tight text-zinc-900">{titulo}</h1>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
}

function Glifo({ nombre }: { nombre: "check" | "clock" | "x" | "?" }) {
  const p = "h-6 w-6";
  if (nombre === "check")
    return (
      <svg className={p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  if (nombre === "clock")
    return (
      <svg className={p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  if (nombre === "x")
    return (
      <svg className={p} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    );
  return <span className="text-xl font-bold">?</span>;
}
