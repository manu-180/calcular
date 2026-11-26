"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { calcularIndemnizacion } from "@/lib/indemnizacion";
import type { ResultadoRenuncia } from "@/lib/renuncia";
import { formatARS } from "@/lib/formato";
import { RUTA_LANDING_INFORME, SLUG_INFORME } from "@/app/(ar)/informes/indemnizacion/_modelo";

// La oferta de /renuncia, y por qué el producto es el informe de liquidación final.
//
// QUIÉN LA VE: alguien que está por irse, o que ya se fue, y vino a ver qué le tienen que pagar.
// La página le arma gratis la liquidación final de una renuncia del art. 240: días del mes,
// aguinaldo proporcional, vacaciones no gozadas y el SAC sobre esas vacaciones. Eso ya lo tiene.
//
// POR QUÉ ESE PRODUCTO Y NO UNA PLANILLA PROPIA DEL TEMA: cobrarle a esta persona por la cuenta
// que la página le da gratis sería venderle lo que ya tiene. La plata en juego está en otra parte,
// y es mucho más grande: en CÓMO se sale. La LCT tiene tres salidas y pagan distinto.
//
//   - Renuncia (art. 240): la liquidación final y nada más. No hay antigüedad ni preaviso, y no es
//     situación legal de desempleo, así que tampoco hay seguro.
//   - Acuerdo del art. 241: tampoco paga antigüedad, pero desde la Ley 27.802 (art. 99, que le
//     sumó el inciso i al art. 114 de la Ley 24.013) SÍ es situación legal de desempleo. Eso la
//     página ya lo explica en su propia sección.
//   - Despido indirecto (art. 246): «Cuando el trabajador hiciese denuncia del contrato de trabajo
//     fundado en justa causa, tendrá derecho a las indemnizaciones previstas en los artículos 232,
//     233 y 245». O sea lo mismo que un despido sin causa: antigüedad, preaviso e integración. Y
//     es el inciso c) del art. 114, así que también da derecho al seguro de desempleo.
//
// El art. 246 es la salida que la página NO mencionaba y la que más plata mueve: un renglón de
// antigüedad es un mes de sueldo por año trabajado. Quien renuncia lisa y llanamente cierra esa
// puerta, y la decisión se toma una sola vez. Por eso la oferta se para ahí.
//
// EL GANCHO LO DA SU PROPIO NÚMERO: cuánto suman antigüedad, preaviso e integración con SU sueldo
// y SUS fechas. No está en ninguna otra parte de la página (la calculadora de arriba, por
// definición, no los calcula: en una renuncia no corresponden) y sale de lo que la persona cargó.
// Acá no hay ningún monto inventado.
//
// LO QUE NO SE PROMETE, y se dice en la oferta en vez de dejar que lo suponga: el informe abre la
// liquidación rubro por rubro, no decide si el caso es justa causa. Eso lo define un abogado con
// las pruebas. Y el texto vigente del art. 246 no alcanza con invocarlo: el art. 66 pide «previa
// intimación y si ésta fuere desoída». Prometer la indemnización sería prometer lo que el sistema
// no hace.

const PUNTOS = [
  "Cada rubro con su artículo y la cuenta a la vista",
  "Lo que te ofrecen al lado de lo que surge de la ley, con la diferencia",
  "Qué revisar antes de firmar, qué papeles pedir y tus plazos con fecha",
];

/**
 * Lo que una renuncia NO paga y un despido indirecto sí: antigüedad (art. 245), preaviso
 * (art. 232) e integración del mes (art. 233), con sus SAC. Es `totalIndemnizatorio` del mismo
 * motor que usa /indemnizacion, para que calcular.ar no publique dos cifras para el mismo caso.
 *
 * `preavisoOtorgado` va SIEMPRE en `false`, y no es lo mismo que el preaviso que la calculadora de
 * esta página pregunta. Son dos preavisos distintos y confundirlos sería el error fácil: el de la
 * calculadora es el del art. 231 inc. a), los 15 días que debe EL TRABAJADOR que renuncia (si no
 * los da, se los pueden descontar). El de acá es el del art. 232, el que debe EL EMPLEADOR y que
 * el art. 246 manda pagar al trabajador que denuncia el contrato con justa causa. En un despido
 * indirecto el empleador nunca preavisó, así que esa indemnización corresponde.
 *
 * Devuelve `null` cuando no se puede afirmar nada, y el borde que importa es el período de prueba:
 * en los primeros 6 meses el art. 92 bis no indemniza la extinción, así que el extra es 0 de
 * verdad. Un titular que dijera «$0 es lo que la renuncia no te paga» sería absurdo; ahí la oferta
 * usa el titular sin número, que para ese caso es además el honesto.
 */
export function loQueLaRenunciaNoPaga(params: {
  sueldoMensual: number;
  ingresoISO: string;
  egresoISO: string;
}): number | null {
  const r = calcularIndemnizacion({
    ingresoISO: params.ingresoISO,
    despidoISO: params.egresoISO,
    mejorRemuneracion: params.sueldoMensual,
    preavisoOtorgado: false,
  });
  if (!r || r.enPeriodoPrueba) return null;
  return r.totalIndemnizatorio > 0 ? r.totalIndemnizatorio : null;
}

/** La entrada se dispara al entrar en pantalla y una sola vez: animarla en el primer pintado sería
 *  animar algo que nadie está mirando (la oferta nace muy por debajo del pliegue). */
function useEntradaEnVista<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setVisible(true);
        io.disconnect();
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

export function OfertaInformeRenuncia({
  res,
  sueldoMensual,
  ingresoISO,
  egresoISO,
  precio,
  miniatura,
}: {
  /** La liquidación por renuncia que la página ya calculó: el término de comparación. */
  res: ResultadoRenuncia;
  sueldoMensual: number;
  ingresoISO: string;
  egresoISO: string;
  precio: number;
  /** La primera hoja del informe, renderizada en el servidor para no traer su motor al bundle. */
  miniatura: ReactNode;
}) {
  const extra = loQueLaRenunciaNoPaga({ sueldoMensual, ingresoISO, egresoISO });
  const { ref, visible } = useEntradaEnVista<HTMLElement>();

  return (
    <section
      ref={ref}
      data-oferta={SLUG_INFORME}
      data-visible={visible ? "si" : "no"}
      aria-labelledby="cta-informe-renuncia"
      className="ca-oferta mt-7 rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5"
    >
      <div className="grid gap-x-8 gap-y-6 overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-white p-5 shadow-[var(--shadow-apoyo)] sm:p-7 md:grid-cols-[minmax(0,1fr)_13rem] md:items-start">
        {/* Orden en celular: titular, foto del producto, qué trae y comprar. En escritorio la foto
            pasa a la columna de la derecha y abarca las dos filas. */}
        <header className="md:col-start-1 md:row-start-1" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">
            La otra salida, la que sí paga antigüedad
          </p>

          {extra === null ? (
            <h2
              id="cta-informe-renuncia"
              className="mt-2 text-[1.5rem] font-bold leading-[1.1] tracking-tight text-zinc-900 sm:text-[1.75rem]"
            >
              No todas las salidas
              <br className="hidden sm:inline" /> se pagan igual.
            </h2>
          ) : (
            <>
              <p
                className="mt-2 text-[2.5rem] font-bold leading-[0.95] tracking-[-0.03em] text-zinc-900 tabular-nums sm:text-[3rem]"
                aria-hidden
              >
                {/* `key` por valor: cada corrección del sueldo o de las fechas vuelve a disparar la
                    llegada de la cifra. */}
                <span key={extra} className="ca-oferta-cifra">
                  {formatARS(extra, 0)}
                </span>
              </p>
              <h2
                id="cta-informe-renuncia"
                className="mt-1.5 text-[1.0625rem] font-semibold leading-snug text-zinc-800 sm:text-lg"
              >
                <span className="sr-only">{formatARS(extra, 0)} </span>es lo que suman antigüedad,
                preaviso e integración. Renunciando, no te los pagan.
              </h2>
            </>
          )}

          <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-600">
            {extra === null ? (
              <>
                En los primeros seis meses el art. 92 bis no indemniza la extinción, así que por
                antigüedad no hay diferencia entre irte y que te echen. Lo que sí se discute es la
                liquidación final: los días del mes, el aguinaldo, las vacaciones y el certificado
                del art. 80.{" "}
                <strong className="font-semibold text-zinc-800">
                  El informe la abre rubro por rubro
                </strong>{" "}
                y te deja los plazos con fecha, para que puedas comparar lo que te ofrecen contra lo
                que surge de la ley.
              </>
            ) : (
              <>
                Tu renuncia paga {formatARS(res.totalNetoDeDescuento, 0)}. Si en cambio tu salida la
                causó un incumplimiento de la empresa, el{" "}
                <strong className="font-semibold text-zinc-800">
                  art. 246 te da las mismas indemnizaciones que un despido sin causa
                </strong>{" "}
                (arts. 232, 233 y 245), y encima es situación legal de desempleo: también cobrás el
                seguro. El texto vigente pide antes intimar al empleador y que la intimación sea
                desoída. Es la decisión que se toma una sola vez, y conviene tomarla con los dos
                números a la vista.
              </>
            )}
          </p>
        </header>

        <div
          className="md:col-start-2 md:row-span-2 md:row-start-1"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          <div className="mx-auto w-full max-w-[13rem]">
            <div className="md:rotate-[1.5deg]">{miniatura}</div>
            <p className="mt-2.5 text-center text-[11px] leading-snug text-zinc-400 md:text-left">
              Ejemplo: 7 años y medio de antigüedad, salida a mitad de mes
            </p>
          </div>
        </div>

        <div className="md:col-start-1 md:row-start-2" style={{ "--i": 2 } as React.CSSProperties}>
          <ul className="space-y-2 text-sm text-zinc-600">
            {PUNTOS.map((p) => (
              <li key={p} className="flex gap-2">
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden
                  className="mt-0.5 size-4 shrink-0 text-emerald-600"
                >
                  <path
                    d="m4.5 10.5 3.5 3.5 7.5-8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={`${RUTA_LANDING_INFORME}?desde=renuncia`}
              data-evento="cta_compra"
              data-producto={SLUG_INFORME}
              data-ubicacion="calculadora-resultado"
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-emerald-600 py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform,box-shadow] duration-200 ease-[var(--ease-snappy)] hover:-translate-y-px hover:bg-emerald-700 hover:shadow-[0_8px_20px_-10px_rgba(0,0,0,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              Ver las dos cuentas
              <span
                aria-hidden
                className="grid size-8 place-items-center rounded-full bg-white/15 transition-transform duration-300 ease-[var(--ease-snappy)] group-hover:translate-x-0.5 motion-reduce:transition-none"
              >
                <svg viewBox="0 0 20 20" fill="none" className="size-4">
                  <path
                    d="M4.5 10h11m0 0-4-4m4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-zinc-500">
              <span className="font-semibold text-zinc-800">${precio.toLocaleString("es-AR")}</span>{" "}
              · pago único · devolución dentro de los 7 días
            </p>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-zinc-500">
            Cargás tu sueldo y tus fechas en la página del informe y lo ves entero, con tus números,
            antes de pagar. El informe abre la liquidación rubro por rubro; si tu caso es justa
            causa lo define un abogado con tus pruebas, no esta cuenta.
          </p>
        </div>
      </div>
    </section>
  );
}
