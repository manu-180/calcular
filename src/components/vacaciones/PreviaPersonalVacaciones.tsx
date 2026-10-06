"use client";

import { useMemo, useSyncExternalStore, type ReactNode } from "react";
import { HojaCalculo } from "@/components/HojaCalculo";
import { leerDatosCompra, suscribirDatosCompra } from "@/lib/prefill/cliente";
import { prefill } from "@/lib/prefill/vacaciones";
import { formatARS } from "@/lib/formato";
import { NotaMiniatura } from "./NotaMiniatura";
import { fechaConDia } from "./cronograma";
import { hojaVacaciones } from "./previa";

// En la landing, quien viene de /vacaciones ve su propio caso en vez del ejemplo: es exactamente el
// archivo que va a descargar (los datos viajan con el pago). En el server y al hidratar no hay
// localStorage, así que primero se ve el ejemplo (children) y después el caso propio.

const SLUG = "planilla-vacaciones";

function hoy(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Argentina/Buenos_Aires" });
}

function usePrevia(archivo: string) {
  const crudo = useSyncExternalStore(
    suscribirDatosCompra,
    () => JSON.stringify(leerDatosCompra(SLUG) ?? null),
    () => "null",
  );
  return useMemo(() => {
    const raw: unknown = JSON.parse(crudo);
    if (raw === null) return null;
    const d = prefill.validar(raw);
    return d ? hojaVacaciones(archivo, d, hoy()) : null;
  }, [crudo, archivo]);
}

const etiqueta = (p: NonNullable<ReturnType<typeof hojaVacaciones>>) =>
  `${p.resumen.diasTramo} días desde el ${fechaConDia(p.resumen.cronograma.inicio)} · ${formatARS(p.resumen.pagar, 0)}`;

export function PreviaPersonalVacaciones({ archivo, children }: { archivo: string; children: ReactNode }) {
  const p = usePrevia(archivo);
  if (!p) return <>{children}</>;
  const c = p.resumen.cronograma;
  return (
    <div>
      <p className="mb-3 flex items-start gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900 ring-1 ring-emerald-700/10">
        <Tilde />
        <span>
          Es tu caso: <strong className="font-semibold">{etiqueta(p)}</strong>. La planilla te llega con estos datos
          como empleado 1.
        </span>
      </p>
      <HojaCalculo hoja={p.hoja} />
      <NotaMiniatura
        className="relative mt-4 sm:mx-5 sm:-mt-4"
        dias={p.resumen.diasTramo}
        saldo={p.resumen.saldo}
        inicio={c.inicio}
        fin={c.fin}
        vuelve={c.vuelve}
        pagar={p.resumen.pagar}
      />
    </div>
  );
}

export function AvisoDatosVacaciones({ archivo }: { archivo: string }) {
  const p = usePrevia(archivo);
  if (!p) return null;
  return (
    <p className="mt-4 flex items-start gap-2 text-sm text-zinc-700">
      <Tilde />
      <span>
        Sale con tu caso ya cargado: <strong className="font-semibold text-zinc-900">{etiqueta(p)}</strong>.
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
