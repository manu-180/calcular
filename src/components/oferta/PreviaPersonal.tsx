"use client";

import { useMemo, useSyncExternalStore, type ReactNode } from "react";
import { HojaCalculo, type HojaPrevia } from "@/components/HojaCalculo";
import { leerDatosCompra, suscribirDatosCompra } from "@/lib/prefill/cliente";
import { prefill as prefillComercio } from "@/lib/prefill/comercio";
import { prefill as prefillUocra } from "@/lib/prefill/uocra";
import { prefill as prefillCasas } from "@/lib/prefill/casas";
import { prefill as prefillMonotributo } from "@/lib/prefill/monotributo";
import { hojaCasas, hojaComercio, hojaMonotributo, hojaUocra } from "@/components/oferta/hojas";

// La landing, cuando la persona viene de la calculadora: en vez del caso de ejemplo muestra SU
// caso, que es exactamente el archivo que va a descargar (los datos viajan con el pago). En el
// server y al hidratar no hay localStorage: se ve el ejemplo y recién después el caso propio.

export type SlugPersonalizable =
  | "planilla-comercio"
  | "planilla-uocra"
  | "planilla-casas-particulares"
  | "planilla-monotributo";

function usePrevia(producto: SlugPersonalizable, archivo: string): { hoja: HojaPrevia; etiqueta: string } | null {
  // El snapshot es texto para que useSyncExternalStore compare por valor y no re-renderice en loop.
  const crudo = useSyncExternalStore(
    suscribirDatosCompra,
    () => JSON.stringify(leerDatosCompra(producto) ?? null),
    () => "null",
  );
  return useMemo(() => {
    const raw: unknown = JSON.parse(crudo);
    if (raw === null) return null;
    // Se valida igual que en el servidor: si acá no pasa, la descarga tampoco lo usaría.
    const r =
      producto === "planilla-comercio"
        ? (() => {
            const d = prefillComercio.validar(raw);
            return d && hojaComercio(archivo, d);
          })()
        : producto === "planilla-uocra"
          ? (() => {
              const d = prefillUocra.validar(raw);
              return d && hojaUocra(archivo, d);
            })()
          : producto === "planilla-monotributo"
            ? (() => {
                const d = prefillMonotributo.validar(raw);
                return d && hojaMonotributo(archivo, d);
              })()
            : (() => {
                const d = prefillCasas.validar(raw);
                return d && hojaCasas(archivo, d);
              })();
    return r ? { hoja: r.hoja, etiqueta: r.resumen.etiqueta } : null;
  }, [crudo, producto, archivo]);
}

/** Reemplaza la vista previa de ejemplo (children) por el caso que la persona cargó. */
export function PreviaPersonal({
  producto,
  archivo,
  children,
}: {
  producto: SlugPersonalizable;
  archivo: string;
  children: ReactNode;
}) {
  const previa = usePrevia(producto, archivo);
  if (!previa) return <>{children}</>;
  return (
    <div>
      <p className="mb-3 flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900 ring-1 ring-emerald-700/10">
        <Tilde />
        <span>
          Es tu caso: <strong className="font-semibold">{previa.etiqueta}</strong>. La planilla te llega con estos
          datos ya cargados.
        </span>
      </p>
      <HojaCalculo hoja={previa.hoja} />
    </div>
  );
}

/** Aviso del hero: sólo aparece si la persona trae datos de la calculadora. */
export function AvisoDatosCargados({ producto, archivo }: { producto: SlugPersonalizable; archivo: string }) {
  const previa = usePrevia(producto, archivo);
  if (!previa) return null;
  return (
    <p className="mt-4 flex items-start gap-2 text-sm text-zinc-700">
      <Tilde />
      <span>
        Sale con tus datos ya cargados: <strong className="font-semibold text-zinc-900">{previa.etiqueta}</strong>.
      </span>
    </p>
  );
}

function Tilde() {
  return (
    <svg className="mt-0.5 size-4 shrink-0 text-emerald-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0L3.3 9.7a1 1 0 1 1 1.4-1.4l3.3 3.3 6.8-6.8a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
