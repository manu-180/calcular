import Link from "next/link";
import {
  calculadorasDe,
  diaYMes,
  fechaDe,
  fechaLargaNovedad,
  llegada,
  mesConAnio,
  porMes,
  type Novedad,
} from "@/lib/novedades";
import { IconoCheck, IconoExterno } from "./piezas";
import s from "./novedades.module.css";

function Entrada({ n, ultima }: { n: Novedad; ultima: boolean }) {
  const fecha = fechaDe(n);
  const { dia, mes } = diaYMes(fecha);
  const comoLlego = llegada(n);
  const calculadoras = calculadorasDe(n);

  return (
    <li id={n.id} className={`${s.entrada} grid scroll-mt-24 grid-cols-[2.5rem_1fr] gap-3 sm:grid-cols-[3.75rem_1fr] sm:gap-5`}>
      <div className="flex flex-col items-center pt-3">
        <time dateTime={fecha} className="flex flex-col items-center leading-none">
          <span className="text-xl font-bold tabular-nums tracking-tight text-zinc-900 sm:text-2xl">{dia}</span>
          <span className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500">{mes}</span>
        </time>
        {!ultima && <span aria-hidden className="mt-3 w-px flex-1 bg-gradient-to-b from-zinc-900/[0.12] to-zinc-900/[0.04]" />}
      </div>

      <article className={`${s.revela} mb-5 rounded-[1.25rem] border border-zinc-900/[0.05] bg-zinc-900/[0.03] p-1.5`}>
        <div className={`${s.nucleo} rounded-[calc(1.25rem-0.375rem)] bg-white p-4 shadow-apoyo sm:p-5`}>
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="rounded-full bg-zinc-900/[0.05] px-2.5 py-1 font-medium text-zinc-700">{n.organismo}</span>
            {n.tipo === "correccion" && (
              <span className="rounded-full bg-amber-100/80 px-2.5 py-1 font-medium text-amber-900">Corrección</span>
            )}
            {comoLlego?.mismoDia && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-800">
                <IconoCheck className="size-3" />
                En el sitio el mismo día
              </span>
            )}
          </div>

          <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-[-0.01em] text-zinc-950 text-pretty">
            {n.titulo}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-pretty text-zinc-600">{n.detalle}</p>

          <dl className="mt-4 grid gap-x-6 gap-y-3 border-t border-zinc-900/[0.06] pt-3.5 text-[13px] sm:grid-cols-[auto_1fr]">
            {n.rigeDesde && (
              <div>
                <dt className="text-zinc-500">Rige desde</dt>
                <dd className="mt-0.5 font-medium text-zinc-800">{fechaLargaNovedad(n.rigeDesde)}</dd>
              </div>
            )}
            <div className="min-w-0">
              <dt className="text-zinc-500">Fuente oficial</dt>
              <dd className="mt-0.5">
                <a
                  href={n.fuente.url}
                  target="_blank"
                  rel="nofollow noopener"
                  className="group/f inline-flex items-baseline gap-1.5 rounded font-medium text-zinc-800 underline decoration-zinc-300 underline-offset-2 transition-colors duration-150 hover:text-emerald-800 hover:decoration-emerald-400"
                >
                  <span>{n.fuente.nombre}</span>
                  <IconoExterno className="size-3 shrink-0 translate-y-px opacity-50 transition-opacity group-hover/f:opacity-80" />
                </a>
              </dd>
            </div>
            {comoLlego && !comoLlego.mismoDia && (
              <div className="sm:col-span-2">
                <dt className="sr-only">Cuándo llegó al sitio</dt>
                <dd className="text-zinc-500">{comoLlego.texto}</dd>
              </div>
            )}
          </dl>

          <div className="mt-4">
            <p className="text-xs font-medium text-zinc-500">Lo usan estas cuentas</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {calculadoras.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    prefetch={false}
                    className={`${s.calculadora} inline-flex min-h-9 items-center rounded-full border border-zinc-900/[0.08] bg-zinc-50 px-3 text-[13px] font-medium text-zinc-700`}
                  >
                    {c.titulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </li>
  );
}

export function LineaDeTiempo({ novedades }: { novedades: readonly Novedad[] }) {
  const meses = porMes(novedades);
  return (
    <div className="space-y-10">
      {meses.map(({ periodo, items }, i) => {
        const titulo = mesConAnio(periodo);
        return (
          <section key={periodo} aria-labelledby={`mes-${periodo}`} className="space-y-5">
            <div className="flex items-baseline justify-between gap-3 border-b border-zinc-900/[0.08] pb-3">
              <h2 id={`mes-${periodo}`} className="text-lg font-bold tracking-tight text-zinc-900">
                {titulo.charAt(0).toUpperCase() + titulo.slice(1)}
              </h2>
              <span className="text-xs tabular-nums text-zinc-500">
                {items.length} {items.length === 1 ? "cambio" : "cambios"}
              </span>
            </div>
            <ol>
              {items.map((n, j) => (
                <Entrada key={n.id} n={n} ultima={i === meses.length - 1 && j === items.length - 1} />
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
