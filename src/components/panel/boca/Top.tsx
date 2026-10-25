import type { BocaDatos } from "@/lib/panel/tipos";
import { diaCorto, numero } from "@/lib/panel/formato";
import { IcoLogro } from "../iconos";
import { Bloque, Pais, VacioBoca, canal } from "./comun";

export function Top({ boca, mercado }: { boca: BocaDatos; mercado: string | null }) {
  const tope = Math.max(1, ...boca.top.map((t) => t.llegadas));
  return (
    <Bloque
      titulo="Los compartidos que más trajeron"
      significa="Cada fila es un link compartido una vez. El código es al azar y no dice nada de quién lo compartió."
    >
      {boca.top.length === 0 ? (
        <VacioBoca titulo="Ningún link trajo gente todavía" icono={<IcoLogro className="size-4" />}>
          Cuando alguien entre por un link compartido, acá aparece cuál fue, por dónde se mandó y a cuántos trajo.
        </VacioBoca>
      ) : (
        <ol className="divide-y divide-zinc-100">
          {boca.top.map((t) => (
            <li key={t.ref} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-[15px] font-medium text-zinc-900">{t.titulo}</span>
                  <code className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] text-zinc-600">{t.ref}</code>
                </p>
                <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-zinc-600">
                  <span>{canal(t.canal)}</span>
                  {t.fecha ? <span>· compartido el {diaCorto(t.fecha)}</span> : null}
                  {mercado ? null : (
                    <>
                      <span aria-hidden>·</span>
                      <Pais mercado={t.mercado} />
                    </>
                  )}
                </p>
                <span className="mt-2 block h-1.5 rounded-full bg-zinc-100" aria-hidden>
                  <span
                    className="panel-barra block h-full rounded-full bg-indigo-500"
                    style={{ clipPath: `inset(0 ${100 - Math.max(2, (t.llegadas / tope) * 100)}% 0 0 round 999px)` }}
                  />
                </span>
              </div>
              <div className="w-20 shrink-0 text-right">
                <p className="text-xl font-semibold tracking-[-0.02em] tabular-nums text-zinc-900">{numero(t.llegadas)}</p>
                <p className="text-xs tabular-nums text-zinc-600">
                  {t.llegadas === 1 ? "llegada" : "llegadas"} · {numero(t.nuevas)} nuevas
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </Bloque>
  );
}
