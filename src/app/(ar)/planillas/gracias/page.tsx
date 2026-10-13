import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createHash } from "node:crypto";
import Link from "next/link";
import {
  PRODUCTO,
  PRODUCTOS,
  checkoutIdDeReferencia,
  habilitaDescarga,
  obtenerPago,
  productoDePago,
  rutaEntrega,
  type MpPayment,
  type Producto,
  type ProductoSlug,
} from "@/lib/mp";
import { datosDelPago } from "@/lib/prefill/servidor";
import { ConversionGoogleAds } from "@/components/ConversionGoogleAds";
import { CONVERSION_COMPRA_PLANILLA } from "@/lib/ads";
import { COMPLEMENTO } from "@/lib/afinidad";
import { cookies } from "next/headers";
import { COOKIE_PISTA } from "@/lib/sesion-cliente";
import { usuarioActual } from "@/lib/auth/sesion";
import { CUENTAS_ACTIVAS } from "@/lib/funciones";

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
  } catch (e) {
    console.error("[gracias] verificación MP falló", paymentId, e);
    pago = null;
  }

  // Qué producto se compró sale del pago, no de la URL: el mismo /gracias sirve a todo el
  // catálogo y nadie puede pedir otro archivo cambiando un query param.
  const producto: Producto = (pago ? productoDePago(pago) : null) ?? PRODUCTO;

  if (pago && habilitaDescarga(pago, producto)) {
    if (pago.payer?.email) await capturarEmailComprador(pago.payer.email, producto.slug);
    return (
      <Marco titulo="Listo, tu pago se acreditó" tono="ok" icono="check">
        <ConversionGoogleAds
          sendTo={CONVERSION_COMPRA_PLANILLA}
          value={producto.precio}
          transactionId={idTransaccionParaAds(paymentId)}
        />
        {producto.entrega === "informe" ? (
          <>
            <p className="text-zinc-600">
              Compraste el <strong>{producto.tituloCorto}</strong>.{" "}
              {datosDelPago(pago, producto) !== null
                ? "Ya está armado con los datos que cargaste en la calculadora."
                : "Lo abrís con el botón de abajo, cargás tus datos y se arma al instante."}{" "}
              {pago.payer?.email
                ? "También te mandamos el enlace por email: guardalo y lo abrís cuando lo necesites."
                : "Guardá este enlace: no vence y lo podés abrir las veces que quieras."}
            </p>
            <a
              href={rutaEntrega(producto, paymentId)}
              className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Ver mi informe
              <svg className="size-4" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 10h12M11.5 5.5 16 10l-4.5 4.5" />
              </svg>
            </a>
            <p className="text-center text-xs text-zinc-500">
              Se abre en el navegador, desde la compu o el celular.
            </p>
          </>
        ) : (
          <>
            <p className="text-zinc-600">
              Compraste la <strong>{producto.tituloCorto}</strong>. Descargala acá abajo.{" "}
              {pago.payer?.email
                ? "También te la mandamos por email con el enlace permanente: guardá ese mail, porque es por ahí que te van a llegar las actualizaciones del año."
                : "Guardá este enlace: no vence, y cada vez que actualicemos la planilla te descarga la versión nueva."}
            </p>
            <a
              href={rutaEntrega(producto, paymentId)}
              className="mt-2 block rounded-lg bg-emerald-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Descargar la planilla (.xlsx)
            </a>
            <p className="text-center text-xs text-zinc-500">
              Funciona en Google Sheets y en Microsoft Excel, sin instalar nada.
            </p>
          </>
        )}
        {CUENTAS_ACTIVAS ? (
          <GuardarEnCuenta
            checkoutId={checkoutIdDeReferencia(pago.external_reference)}
            emailCompra={pago.payer?.email ?? null}
            informe={producto.entrega === "informe"}
          />
        ) : null}
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
          {producto.entrega === "informe" ? "¿No se abre el informe?" : "¿No baja el archivo?"} Volvé a tocar el botón o entrá de nuevo a este
          enlace desde el mismo dispositivo. Si seguís sin poder,{" "}
          <Link href="/contacto" className="font-semibold text-emerald-700 underline">
            escribinos
          </Link>{" "}
          y te lo enviamos por email.
        </div>
        <Complemento de={producto.slug} />
      </Marco>
    );
  }

  const status = pago?.status;
  if (status === "pending" || status === "in_process") {
    return (
      <Marco titulo="Tu pago está en proceso" tono="espera" icono="clock">
        <p className="text-zinc-600">
          Cuando MercadoPago confirme el pago (suele tardar unos minutos), te
          mandamos {producto.entrega === "informe" ? "el informe" : "la planilla"} por email. No hace falta que pagues de nuevo.
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
          {producto.entrega === "informe" ? "Volver al informe" : "Volver a la planilla"}
        </Link>
        <Link href="/contacto" className="text-center text-sm font-semibold text-emerald-700 underline">
          Escribinos
        </Link>
      </div>
    </Marco>
  );
}

// La pista (cookie no sensible) decide si vale la pena preguntarle a Supabase por la sesión: el
// comprador sin cuenta, que es casi todos, no paga ese viaje.
async function GuardarEnCuenta({
  checkoutId,
  emailCompra,
  informe,
}: {
  checkoutId: string | null;
  emailCompra: string | null;
  informe: boolean;
}) {
  const conPista = (await cookies()).get(COOKIE_PISTA)?.value === "1";
  const usuario = conPista ? await usuarioActual() : null;

  if (usuario) {
    const mismoMail = !!emailCompra && emailCompra.trim().toLowerCase() === usuario.email;
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-sm leading-relaxed text-emerald-900">
        <p className="font-semibold">
          {mismoMail && usuario.verificado
            ? informe ? "Ya lo tenés en tu cuenta" : "Ya la tenés en tu cuenta"
            : informe ? "Sumalo a tu cuenta" : "Sumala a tu cuenta"}
        </p>
        <p className="mt-1 text-emerald-900/80">
          {mismoMail && usuario.verificado
            ? informe
              ? "Cuando lo necesites, lo abrís desde Mi cuenta."
              : "Cuando la necesites, la bajás desde Mi cuenta, siempre en su última versión."
            : mismoMail
              ? `Confirmá tu mail desde Mi cuenta y ${informe ? "el informe" : "la planilla"} aparece ahí solo${informe ? "" : "a"}.`
              : `${informe ? "Lo" : "La"} compraste con otro mail que el de tu cuenta. Escribinos y ${informe ? "lo" : "la"} sumamos.`}
        </p>
        <Link
          href={mismoMail ? "/cuenta" : "/contacto"}
          className="mt-3 inline-flex font-semibold text-emerald-800 underline decoration-emerald-800/30 underline-offset-4 hover:decoration-emerald-800"
        >
          {mismoMail ? "Ir a Mi cuenta →" : "Escribinos →"}
        </Link>
      </div>
    );
  }

  const registro = checkoutId ? `/registro?compra=${checkoutId}` : "/registro";
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm leading-relaxed text-zinc-600">
      <p className="font-semibold text-zinc-900">{informe ? "Guardalo en tu cuenta" : "Guardala en tu cuenta"}</p>
      <p className="mt-1">
        {informe
          ? "Creá tu cuenta gratis con el mismo mail de la compra y el informe queda guardado. Si algún día perdés el mail, lo abrís desde ahí."
          : "Creá tu cuenta gratis con el mismo mail de la compra y la planilla queda guardada, siempre en su última versión. Si algún día perdés el mail, la bajás desde ahí."}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Link
          href={registro}
          className="inline-flex h-10 items-center rounded-full bg-zinc-900 px-4 font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.18)] transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-zinc-800"
        >
          Crear mi cuenta
        </Link>
        <Link href="/login?next=%2Fcuenta" className="font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-600">
          Ya tengo cuenta
        </Link>
      </div>
    </div>
  );
}

function Complemento({ de }: { de: ProductoSlug }) {
  const c = COMPLEMENTO[de];
  const p = PRODUCTOS[c.para];
  return (
    <section
      aria-labelledby="complemento-titulo"
      className="rounded-[1.25rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/[0.06]"
    >
      <div className="rounded-[calc(1.25rem-0.375rem)] bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Para completar</p>
        <h2 id="complemento-titulo" className="mt-1.5 text-base font-semibold text-zinc-900">
          {c.titulo}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-zinc-600">{c.texto}</p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-zinc-600">
            <span className="font-semibold tabular-nums text-zinc-900">${p.precio.toLocaleString("es-AR")}</span>, con
            la misma devolución de 7 días.
          </p>
          <Link
            href={`/planillas/comprar?p=${p.slug}`}
            rel="nofollow"
            data-evento="cta_compra"
            data-producto={p.slug}
            data-ubicacion="gracias-complemento"
            className="group inline-flex min-h-11 items-center gap-2 rounded-xl bg-zinc-900 py-1 pr-1 pl-4 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform] duration-200 ease-[var(--ease-snappy)] hover:bg-zinc-800 active:scale-[0.98]"
          >
            Sumarlo
            <span
              aria-hidden
              className="grid size-8 place-items-center rounded-lg bg-white/15 transition-transform duration-200 ease-[var(--ease-snappy)] group-hover:translate-x-0.5"
            >
              <svg viewBox="0 0 20 20" fill="none" className="size-4">
                <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>
        <Link
          href={`${p.rutaLanding}?desde=gracias`}
          data-evento="cta_compra"
          data-producto={p.slug}
          data-ubicacion="gracias-complemento-landing"
          className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-emerald-700 underline decoration-emerald-300 underline-offset-4 transition-colors hover:text-emerald-900"
        >
          Ver qué trae
        </Link>
      </div>
    </section>
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
