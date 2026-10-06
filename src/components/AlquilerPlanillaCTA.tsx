import Link from "next/link";
import { formatARS, formatPct } from "@/lib/formato";
import { nombrePeriodo, sumarMeses, ULTIMO_PERIODO, type Periodo, type ResultadoAlquiler } from "@/lib/inflacion";
import { PLANILLA_ALQ } from "@/lib/prefill/alquileres";

export type OfertaAlquileres = { precio: number; rutaLanding: string };

// Oferta de la planilla paga, debajo del resultado de /inflacion/alquiler (la calculadora más
// usada del sitio). La vista previa usa LOS NÚMEROS QUE LA PERSONA ACABA DE CARGAR: no es una
// planilla genérica, es su contrato adentro de la planilla. Y es verdad: el prefill
// (src/lib/prefill/alquileres.ts) lo precarga en «Contrato 1» del archivo que compra.
//
// Precio y ruta llegan por props desde la página (server): src/lib/mp.ts lee el disco y no puede
// entrar al bundle del navegador.
export function AlquilerPlanillaCTA({
  oferta,
  resultado,
  inicio,
  cadaMeses,
  cargado,
}: {
  oferta: OfertaAlquileres;
  resultado: ResultadoAlquiler;
  inicio: Periodo;
  cadaMeses: number;
  /** El prefill lo acepta: un contrato más largo que la planilla sale en blanco. */
  cargado: boolean;
}) {
  const ultimo = resultado.ajustes.at(-1);
  const mesRecibo = sumarMeses(ULTIMO_PERIODO, 1);
  const filas: { etiqueta: string; valor: string; tono: "dato" | "resultado" | "total" }[] = [
    { etiqueta: "Inicio · ajuste", valor: `${nombrePeriodo(inicio)} · cada ${cadaMeses} ${cadaMeses === 1 ? "mes" : "meses"}`, tono: "dato" },
    { etiqueta: "Alquiler hoy", valor: formatARS(resultado.alquilerVigente, 0), tono: "total" },
    {
      etiqueta: "Próximo ajuste",
      valor: resultado.proximo ? nombrePeriodo(resultado.proximo.periodoEfecto) : "—",
      tono: "resultado",
    },
    {
      etiqueta: "Aviso al inquilino",
      valor: ultimo ? `+${formatPct(ultimo.variacionPct, 1)} desde ${nombrePeriodo(ultimo.periodoEfecto)}` : "Se arma con el primer ajuste",
      tono: "resultado",
    },
    { etiqueta: `Recibo de ${nombrePeriodo(mesRecibo)}`, valor: "Listo para imprimir", tono: "resultado" },
  ];

  return (
    <section
      data-oferta="planilla-alquileres"
      aria-labelledby="oferta-alquileres-titulo"
      className="rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/[0.06]"
    >
      <div className="grid gap-6 rounded-[calc(1.75rem-0.375rem)] bg-white p-5 shadow-alzada sm:p-7 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-8">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.09em] text-emerald-800 ring-1 ring-emerald-100">
            <span aria-hidden className="size-1.5 rounded-full bg-emerald-500" />
            Para propietarios
          </p>
          <h2 id="oferta-alquileres-titulo" className="mt-3 text-titular font-bold text-zinc-900">
            ¿Alquilás una o varias propiedades?
          </h2>
          <p className="mt-2 text-[15px] leading-relaxed text-zinc-600">
            Llevá todos tus contratos en una planilla que te avisa cuándo y cuánto aumentar, con el
            IPC oficial ya cargado. Te arma el recibo de cada mes y el mensaje para tu inquilino
            con la cuenta.
          </p>
          <ul className="mt-4 space-y-1.5 text-sm text-zinc-700">
            {["Hasta 6 contratos en un mismo tablero", "Recibo y aviso de aumento listos", "El IPC al día todos los meses, sin pagar de nuevo"].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden className="mt-0.5 size-4 shrink-0 text-emerald-600">
                  <path d="M4.5 10.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            <Link
              href={`${oferta.rutaLanding}?desde=alquiler`}
              data-evento="cta_compra"
              data-producto="planilla-alquileres"
              data-ubicacion="calculadora-resultado"
              className="group inline-flex min-h-12 items-center justify-between gap-3 rounded-full bg-emerald-600 py-1.5 pl-6 pr-1.5 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform,box-shadow] duration-300 ease-[var(--ease-snappy)] hover:bg-emerald-700 hover:shadow-[0_8px_20px_-10px_rgba(0,0,0,0.3)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 active:scale-[0.98]"
            >
              Ver la planilla
              <span
                aria-hidden
                className="grid size-9 place-items-center rounded-full bg-white/15 transition-transform duration-300 ease-[var(--ease-snappy)] group-hover:translate-x-0.5 group-hover:-translate-y-px"
              >
                <svg viewBox="0 0 20 20" fill="none" className="size-4">
                  <path d="M7 13l6-6M8 7h5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
            <p className="text-sm text-zinc-600">
              <span className="font-semibold tabular-nums text-zinc-900">${oferta.precio.toLocaleString("es-AR")}</span> pago
              único · devolución dentro de los 7 días
            </p>
          </div>
        </div>

        <figure className="overflow-hidden rounded-2xl ring-1 ring-zinc-200">
          <figcaption className="flex items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-2.5">
            <span className="text-xs font-semibold text-zinc-800">{cargado ? "Tu contrato, ya cargado" : "Tu contrato"}</span>
            <span className="text-[11px] text-zinc-500">vista previa</span>
          </figcaption>
          <table className="w-full text-sm">
            <tbody>
              {filas.map((f) => (
                <tr
                  key={f.etiqueta}
                  className={
                    f.tono === "total"
                      ? "bg-emerald-50 font-semibold text-zinc-900"
                      : f.tono === "dato"
                        ? "bg-amber-50/60 text-zinc-700"
                        : "bg-white text-zinc-700"
                  }
                >
                  <th scope="row" className="border-b border-zinc-100 px-4 py-2 text-left font-normal text-zinc-600">
                    {f.etiqueta}
                  </th>
                  <td className="border-b border-zinc-100 px-4 py-2 text-right tabular-nums">{f.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-px overflow-hidden bg-zinc-200 text-[11px] font-medium text-zinc-600" aria-hidden>
            {["Mis contratos", "Contrato 1", "Recibo", "Aviso"].map((h, i) => (
              <span key={h} className={`min-w-0 flex-1 truncate px-2 py-1.5 text-center ${i === 1 ? "bg-white text-emerald-700" : "bg-zinc-50"}`}>
                {h}
              </span>
            ))}
          </div>
        </figure>

        <p className="text-xs text-zinc-500 md:col-span-2">
          {cargado
            ? "Si la comprás ahora, este contrato viene cargado en la planilla."
            : `Este contrato empezó hace más de ${PLANILLA_ALQ.duracionMax / 12} años, más de lo que abarca la planilla: te llega lista para que cargues el contrato actual.`}{" "}
          Pagás con MercadoPago y te llega al mail al instante.
        </p>
      </div>
    </section>
  );
}
