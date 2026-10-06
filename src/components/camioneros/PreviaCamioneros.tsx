"use client";

import { useMemo, useSyncExternalStore, type ReactNode } from "react";
import { HojaCalculo, type HojaPrevia } from "@/components/HojaCalculo";
import { leerDatosCompra, suscribirDatosCompra } from "@/lib/prefill/cliente";
import { prefill } from "@/lib/prefill/camioneros";
import { hojaCamioneros } from "./hoja";

// La landing de la planilla, cuando la persona viene de la calculadora: muestra SU caso (el archivo que
// va a descargar) en lugar del ejemplo. En el server y al hidratar no hay localStorage: se ve el ejemplo
// y después el caso propio. Mismo contrato que oferta/PreviaPersonal, que sólo conoce tres planillas.

function usePrevia(archivo: string): { hoja: HojaPrevia; etiqueta: string } | null {
  const crudo = useSyncExternalStore(
    suscribirDatosCompra,
    () => JSON.stringify(leerDatosCompra("planilla-camioneros") ?? null),
    () => "null",
  );
  return useMemo(() => {
    const d = prefill.validar(JSON.parse(crudo));
    const r = d && hojaCamioneros(archivo, d);
    return r ? { hoja: r.hoja, etiqueta: r.resumen.etiqueta } : null;
  }, [crudo, archivo]);
}

export function PreviaCamioneros({ archivo, children }: { archivo: string; children: ReactNode }) {
  const previa = usePrevia(archivo);
  if (!previa) return <>{children}</>;
  return (
    <div>
      <p className="mb-3 flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900 ring-1 ring-emerald-700/10">
        <Tilde />
        <span>
          Es tu caso: <strong className="font-semibold">{previa.etiqueta}</strong>. La planilla te llega con estos datos
          ya cargados.
        </span>
      </p>
      <HojaCalculo hoja={previa.hoja} />
    </div>
  );
}

export function AvisoCamioneros({ archivo }: { archivo: string }) {
  const previa = usePrevia(archivo);
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
