"use client";

import { useMemo, useSyncExternalStore, type ReactNode } from "react";
import { HojaCalculo } from "@/components/HojaCalculo";
import { previaPlazoFijo } from "@/components/plazo-fijo/hojas";
import { leerDatosCompra, suscribirDatosCompra } from "@/lib/prefill/cliente";
import { prefill } from "@/lib/prefill/plazo-fijo";
import { formatARS } from "@/lib/formato";

// Landing de la planilla: quien viene de /plazo-fijo ve su propio plazo fijo en vez del ejemplo
// (mismo patrón que oferta/PreviaPersonal). En el server y al hidratar no hay localStorage: se ve el
// ejemplo y después el caso propio.

function usePrevia(archivo: string) {
  const crudo = useSyncExternalStore(
    suscribirDatosCompra,
    () => JSON.stringify(leerDatosCompra("planilla-plazo-fijo") ?? null),
    () => "null",
  );
  return useMemo(() => {
    const raw: unknown = JSON.parse(crudo);
    if (raw === null) return null;
    const d = prefill.validar(raw);
    const p = d && previaPlazoFijo(archivo, d);
    return p && d ? { previa: p, etiqueta: `${formatARS(d.capital, 0)} a ${d.dias} días al ${d.tnaPct.toLocaleString("es-AR")}% TNA` } : null;
  }, [crudo, archivo]);
}

export function PreviaPersonalPlazoFijo({ archivo, children }: { archivo: string; children: ReactNode }) {
  const p = usePrevia(archivo);
  if (!p) return <>{children}</>;
  return (
    <div>
      <p className="mb-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900 ring-1 ring-emerald-700/10">
        Es tu plazo fijo: <strong className="font-semibold">{p.etiqueta}</strong>. La planilla te llega con estos datos ya cargados.
      </p>
      <HojaCalculo hoja={p.previa.renovacion} />
    </div>
  );
}

export function AvisoDatosPlazoFijo({ archivo }: { archivo: string }) {
  const p = usePrevia(archivo);
  if (!p) return null;
  return (
    <p className="mt-4 text-sm text-zinc-700">
      Sale con tu plazo fijo ya cargado: <strong className="font-semibold text-zinc-900">{p.etiqueta}</strong>.
    </p>
  );
}
