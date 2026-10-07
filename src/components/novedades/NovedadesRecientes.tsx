import Link from "next/link";
import { NOVEDADES, diaYMes, fechaDe, fechaSinAnio, llegada, ultimasNovedades } from "@/lib/novedades";
import { Flecha, PuntoVivo } from "./piezas";
import s from "./novedades.module.css";

export function NovedadesRecientes({ cantidad = 4 }: { cantidad?: number }) {
  const items = ultimasNovedades(cantidad);
  if (!items.length) return null;

  return (
    <section aria-labelledby="novedades-titulo" className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700">
            <PuntoVivo />
            Novedades
          </p>
          <h2 id="novedades-titulo" className="mt-2 text-titular font-bold text-zinc-900">
            Lo último que cambió
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-pretty text-zinc-500 sm:text-right">
          Cuando sale un dato oficial nuevo, lo cargamos en las calculadoras y queda anotado.
        </p>
      </div>

      <div className="rounded-[1.5rem] border border-zinc-900/[0.05] bg-zinc-900/[0.035] p-1.5">
        <div className="overflow-hidden rounded-[calc(1.5rem-0.375rem)] bg-white shadow-apoyo">
          <ol className="divide-y divide-zinc-900/[0.06]">
            {items.map((n) => {
              const { dia, mes } = diaYMes(fechaDe(n));
              const mismoDia = llegada(n)?.mismoDia;
              const meta = [n.organismo, n.rigeDesde ? `rige desde el ${fechaSinAnio(n.rigeDesde)}` : null, mismoDia ? "en el sitio el mismo día" : null]
                .filter(Boolean)
                .join(" · ");
              return (
                <li key={n.id}>
                  <Link href={`/novedades#${n.id}`} className={`${s.fila} group flex items-center gap-4 px-4 py-3.5 sm:px-5`}>
                    <time dateTime={fechaDe(n)} className="flex w-10 shrink-0 flex-col items-center leading-none">
                      <span className="text-lg font-bold tabular-nums tracking-tight text-zinc-900">{dia}</span>
                      <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-500">{mes}</span>
                    </time>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold leading-snug text-zinc-900 text-pretty transition-colors duration-150 group-hover:text-emerald-700">
                        {n.titulo}
                      </span>
                      <span className="mt-1 block text-xs leading-snug text-zinc-500">
                        {meta.charAt(0).toUpperCase() + meta.slice(1)}
                      </span>
                    </span>
                    <Flecha className={`${s.flecha} size-4 shrink-0 text-zinc-300`} />
                  </Link>
                </li>
              );
            })}
          </ol>
          <Link
            href="/novedades"
            className={`${s.fila} group flex items-center justify-between gap-3 border-t border-zinc-900/[0.06] bg-zinc-50/60 px-4 py-3.5 text-sm sm:px-5`}
          >
            <span className="font-medium text-emerald-700">Ver todas las novedades</span>
            <span className="inline-flex items-center gap-2 text-xs tabular-nums text-zinc-500">
              <span className="max-sm:hidden">{NOVEDADES.length} cambios registrados</span>
              <Flecha className={`${s.flecha} size-3.5 text-emerald-600`} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
