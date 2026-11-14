"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import type { ResultadoTutela } from "@/lib/tutela-sindical";
import { formatARS } from "@/lib/formato";
import { RUTA_LANDING_INFORME, SLUG_INFORME } from "@/app/(ar)/informes/indemnizacion/_modelo";

// La oferta de /despido-de-delegado-gremial, y por qué el producto es el informe de liquidación final.
//
// QUIÉN LA VE: un delegado, un candidato o un suplente al que echaron, o que se considera en
// despido indirecto. La calculadora de esta página ya le arma DOS montos: la indemnización común
// (que trae `calcularIndemnizacion`, el mismo motor de /indemnizacion) y el agravamiento del
// art. 52. Son de naturaleza distinta y la página lo dice: el extra del art. 52 «se reclama
// judicialmente», la liquidación común la paga la empresa.
//
// POR QUÉ ESE PRODUCTO Y NO UNA PLANILLA PROPIA DEL TEMA: el art. 52 no se liquida en una
// planilla, se pelea en un juicio con un abogado, y son sueldos por meses (una multiplicación que
// la página ya hace gratis). La liquidación común es la que tiene rubros, artículos, topes y
// plazos, la que la empresa pone sobre la mesa para firmar, y la única de las dos que se puede
// revisar antes de aceptarla. El informe es exactamente eso, y ya existe en el catálogo.
//
// EL GANCHO LO DA SU PROPIO NÚMERO: qué parte del total no depende de una sentencia. No está en
// ninguna otra parte de la página (la calculadora muestra los dos montos, nunca la proporción) y
// sale de lo que la persona cargó. Acá no hay ningún monto inventado.
//
// LO QUE NO SE PROMETE: el informe abre la liquidación común, no el art. 52. Eso se dice en la
// oferta, no se deja que lo suponga.

const PUNTOS = [
  "Cada rubro con su artículo y la cuenta a la vista",
  "Lo que te ofrecen al lado de lo que surge de la ley, con la diferencia",
  "Qué revisar antes de firmar, qué papeles pedir y tus plazos con fecha",
];

/** Qué parte del total a reclamar es la liquidación común, de 1 a 99. `null` cuando no se puede
 *  afirmar, y los dos bordes importan:
 *
 *  - Sin agravamiento del art. 52 (un suplente, un congresal, un candidato que no llegó al 5%) la
 *    liquidación común ES el total: un titular que dijera «el 100% no depende de un juez» no
 *    aporta nada y suena a relleno. Ahí va el titular sin número, que dice lo mismo mejor.
 *  - Con un mandato largo por delante, el agravamiento es muchas veces la liquidación y la
 *    proporción redondea a 0. «El 0% no depende de un juez» sería falso: la liquidación existe.
 *
 *  En los dos casos el titular sin número es correcto, así que el único trabajo de esta función es
 *  devolver `null` y no un porcentaje que mienta. */
export function parteSinJuicio(res: ResultadoTutela): number | null {
  const comun = res.base.totalGeneral;
  const total = res.totalConArt52;
  if (!(comun > 0) || !(total > 0)) return null;
  const parte = Math.round((comun / total) * 100);
  return parte > 0 && parte < 100 ? parte : null;
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

export function OfertaInformeDelegadoGremial({
  res,
  precio,
  miniatura,
}: {
  /** El resultado de la calculadora, o null mientras la persona no cargó sueldo y fechas. Sin él
   *  la oferta igual se muestra, con el titular sin cifra: si esperara el resultado, quien no
   *  completa el formulario (la mayoría) no vería nunca que hay algo a la venta, y el marcador
   *  `data-oferta` no estaría en el HTML que mira el smoke de post-deploy. */
  res: ResultadoTutela | null;
  precio: number;
  /** La primera hoja del informe, renderizada en el servidor para no traer su motor al bundle. */
  miniatura: ReactNode;
}) {
  const parte = res ? parteSinJuicio(res) : null;
  const { ref, visible } = useEntradaEnVista<HTMLElement>();

  return (
    <section
      ref={ref}
      data-oferta={SLUG_INFORME}
      data-visible={visible ? "si" : "no"}
      aria-labelledby="cta-informe-delegado"
      className="ca-oferta mt-7 rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5"
    >
      <div className="grid gap-x-8 gap-y-6 overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-white p-5 shadow-[var(--shadow-apoyo)] sm:p-7 md:grid-cols-[minmax(0,1fr)_13rem] md:items-start">
        {/* Orden en celular: titular, foto del producto, qué trae y comprar. En escritorio la foto
            pasa a la columna de la derecha y abarca las dos filas. */}
        <header className="md:col-start-1 md:row-start-1" style={{ "--i": 0 } as React.CSSProperties}>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">
            El pago que no espera una sentencia
          </p>

          {parte === null ? (
            <h2
              id="cta-informe-delegado"
              className="mt-2 text-[1.5rem] font-bold leading-[1.1] tracking-tight text-zinc-900 sm:text-[1.75rem]"
            >
              El art. 52 lo decide un juez.
              <br className="hidden sm:inline" /> La liquidación común la firmás vos.
            </h2>
          ) : (
            <>
              <p
                className="mt-2 text-[3.25rem] font-bold leading-[0.92] tracking-[-0.03em] text-zinc-900 tabular-nums sm:text-[4rem]"
                aria-hidden
              >
                {/* `key` por valor: cada corrección del sueldo o de las fechas vuelve a disparar la llegada. */}
                <span key={parte} className="ca-oferta-cifra">
                  {parte}%
                </span>
              </p>
              <h2
                id="cta-informe-delegado"
                className="mt-1.5 text-[1.0625rem] font-semibold leading-snug text-zinc-800 sm:text-lg"
              >
                <span className="sr-only">{parte}% </span>de lo que reclamás es la liquidación
                común. Esa no la decide un juez: la paga la empresa.
              </h2>
            </>
          )}

          <p className="mt-3 text-[0.9375rem] leading-relaxed text-zinc-600">
            {parte === null ? (
              <>
                El agravamiento del art. 52 se reclama ante la Justicia y puede tardar años. La
                indemnización común, en cambio, es la que la empresa te pone sobre la mesa para
                firmar.{" "}
                <strong className="font-semibold text-zinc-800">
                  Es la única de las dos que podés revisar antes de aceptarla.
                </strong>{" "}
                El informe la abre rubro por rubro: antigüedad, preaviso, integración del mes,
                aguinaldos y vacaciones. Te muestra cuáles te corresponden y de qué artículo sale
                cada uno.
              </>
            ) : (
              <>
                De los {formatARS(res!.totalConArt52, 0)} que reclamás,{" "}
                {formatARS(res!.base.totalGeneral, 0)} son la indemnización común. El resto es el
                extra del art. 52, y eso se pelea en la Justicia.{" "}
                <strong className="font-semibold text-zinc-800">
                  La liquidación común es la que se firma primero.
                </strong>{" "}
                El informe la abre rubro por rubro, con el artículo de cada uno, para que la
                revises antes.
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
              Ejemplo: 7 años y medio de antigüedad, despido a mitad de mes
            </p>
          </div>
        </div>

        <div className="md:col-start-1 md:row-start-2" style={{ "--i": 2 } as React.CSSProperties}>
          <ul className="space-y-2 text-sm text-zinc-600">
            {PUNTOS.map((p) => (
              <li key={p} className="flex gap-2">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-600">
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
              href={`${RUTA_LANDING_INFORME}?desde=delegado-gremial`}
              data-evento="cta_compra"
              data-producto={SLUG_INFORME}
              data-ubicacion="calculadora-resultado"
              className="group inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full bg-emerald-600 py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform,box-shadow] duration-200 ease-[var(--ease-snappy)] hover:-translate-y-px hover:bg-emerald-700 hover:shadow-[0_8px_20px_-10px_rgba(0,0,0,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              Ver mi liquidación
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
            Cargás tu sueldo y tus fechas en la página del informe y lo ves entero, con tus
            números, antes de pagar. El informe abre la liquidación común: el extra del art. 52 no
            entra, porque eso se reclama con un abogado.
          </p>
        </div>
      </div>
    </section>
  );
}
