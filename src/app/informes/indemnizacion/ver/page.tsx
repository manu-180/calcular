import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { habilitaDescarga, obtenerPagoSiExiste, productoDePago, productoPorSlug, type MpPayment } from "@/lib/mp";
import { ID_PAGO, dentroDelCupoEntrega, ipDelPedido, numeroDeInforme } from "@/lib/acceso-entrega";
import { datosDelPago } from "@/lib/prefill/servidor";
import { prefill } from "@/lib/prefill/indemnizacion";
import { InformeIndemnizacionEntrega } from "@/components/informe-indemnizacion/Entrega";
import { RUTA_LANDING_INFORME, SLUG_INFORME } from "../_modelo";

// Cada carga re-verifica el pago contra MercadoPago: nunca se cachea ni se indexa.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Informe de liquidación final por despido",
  robots: { index: false, follow: false, nocache: true },
};

type SearchParams = { [key: string]: string | string[] | undefined };

function hoyArgentina(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export default async function VerInformePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const crudo = sp.payment_id ?? sp.collection_id;
  const paymentId = typeof crudo === "string" && ID_PAGO.test(crudo) ? crudo : null;

  if (!paymentId) {
    return (
      <Aviso titulo="Necesitamos el enlace de tu compra">
        <p>
          El informe se abre desde el enlace que te mandamos por mail cuando se acreditó el pago. Buscá ese
          mail de CalculAR y abrí el enlace desde ahí.
        </p>
        <Acciones />
      </Aviso>
    );
  }

  if (!(await dentroDelCupoEntrega(ipDelPedido(await headers())))) {
    console.warn("[informe-indemnizacion/ver] fuera de cupo, no se consulta MP", paymentId);
    return (
      <Aviso titulo="Demasiados intentos seguidos">
        <p>
          Esperá unos minutos y volvé a abrir el enlace. Si ya compraste, tu compra sigue en pie: no hace
          falta que pagues de nuevo.
        </p>
        <Acciones recomprar={false} />
      </Aviso>
    );
  }

  const producto = productoPorSlug(SLUG_INFORME);
  let pago: MpPayment | null = null;
  try {
    // null = MP no conoce el pago; un error (401, 429, 5xx, red) tira y se trata aparte.
    pago = await obtenerPagoSiExiste(paymentId);
  } catch (e) {
    console.error("[informe-indemnizacion/ver] no pude verificar el pago con MP", paymentId, e instanceof Error ? e.message : e);
    return (
      <Aviso titulo="No pudimos verificar el pago ahora">
        <p>
          No pudimos verificar el pago ahora, probá en unos minutos. No hace falta pagar de nuevo: este
          mismo enlace te va a mostrar el informe.
        </p>
        <Acciones recomprar={false} />
      </Aviso>
    );
  }

  if (pago && producto && habilitaDescarga(pago, producto)) {
    const inicial = prefill.validar(datosDelPago(pago, producto));
    return <InformeIndemnizacionEntrega inicial={inicial} numero={numeroDeInforme(paymentId)} emitido={hoyArgentina()} />;
  }

  console.warn(
    `[informe-indemnizacion/ver] no habilita · pago ${paymentId} · estado ${pago?.status ?? "inexistente"} · ref ${pago?.external_reference ?? "?"}`,
  );

  // Sólo si el pago pendiente es de ESTE producto: con otro, sería confirmar que el id existe.
  const esDelInforme = pago !== null && productoDePago(pago)?.slug === SLUG_INFORME;
  if (esDelInforme && (pago?.status === "pending" || pago?.status === "in_process")) {
    return (
      <Aviso titulo="Tu pago se está procesando">
        <p>
          Cuando MercadoPago lo confirme, que suele ser cuestión de minutos, este mismo enlace te muestra el
          informe. También te llega por mail. No hace falta que pagues de nuevo.
        </p>
        <Acciones recomprar={false} />
      </Aviso>
    );
  }

  // Rechazado, inexistente, de otro producto o sin poder verificar: el mismo mensaje para todos,
  // para no confirmarle a nadie qué ids existen ni de qué son.
  return (
    <Aviso titulo="No pudimos abrir este informe">
      <p>
        No logramos confirmar el pago de este enlace. Si el dinero salió de tu cuenta, escribinos y lo
        resolvemos enseguida; si la compra no llegó a completarse, podés hacerla de nuevo.
      </p>
      <Acciones />
    </Aviso>
  );
}

function Aviso({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-lg py-10">
      <div className="rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5">
        <div className="space-y-4 rounded-[calc(1.75rem-0.375rem)] bg-white p-6 text-zinc-600 shadow-[var(--shadow-apoyo)] sm:p-8">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Informe de liquidación por despido
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">{titulo}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}

/** `recomprar` = mostrar el camino a la landing. Nunca cuando el pago puede estar bien y sólo falta
 *  confirmarlo: ahí invitar a comprar es invitar a pagar dos veces. */
function Acciones({ recomprar = true }: { recomprar?: boolean }) {
  return (
    <div className="flex flex-col gap-2 pt-2 sm:flex-row">
      <Link
        href="/contacto"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-emerald-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
      >
        Escribinos
      </Link>
      {recomprar ? (
        <Link
          href={RUTA_LANDING_INFORME}
          className="inline-flex min-h-11 items-center justify-center rounded-full border border-zinc-300 px-5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-50"
        >
          Ver el informe
        </Link>
      ) : null}
    </div>
  );
}
