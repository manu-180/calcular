import type { BocaDatos } from "@/lib/panel/tipos";
import { MIN_EXPOSICIONES, analizarPuente, wilson, type Intervalo } from "@/lib/panel/boca";
import { numero } from "@/lib/panel/formato";
import { IcoAlerta, IcoDato, IcoLogro } from "../iconos";
import { Bloque, Cifra } from "./comun";

const cien = (x: number) => Math.round(x * 100);

const BRAZOS = [
  { v: "con", nombre: "Con la línea", punto: "bg-indigo-500", tramo: "bg-indigo-500/25" },
  { v: "sin", nombre: "Sin la línea", punto: "bg-zinc-500", tramo: "bg-zinc-500/25" },
] as const;

function Fila({ titulo, valores, tope }: { titulo: string; valores: { tasa: number; ic: Intervalo; n: number }[]; tope: number }) {
  const pos = (x: number) => `${Math.min(100, (x / tope) * 100)}%`;
  return (
    <div>
      <p className="text-sm text-zinc-800">{titulo}</p>
      <ul className="mt-2 space-y-2">
        {valores.map((v, i) => {
          const b = BRAZOS[i];
          return (
            <li key={b.v} className="grid grid-cols-[6.5rem_minmax(0,1fr)_auto] items-center gap-3 text-xs sm:grid-cols-[7.5rem_minmax(0,1fr)_9rem]">
              <span className="text-zinc-600">{b.nombre}</span>
              <span className="relative h-3" aria-hidden>
                <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-zinc-200" />
                {v.n > 0 ? (
                  <>
                    <span className={`absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full ${b.tramo}`} style={{ left: pos(v.ic[0]), right: `calc(100% - ${pos(v.ic[1])})` }} />
                    <span className={`absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white ${b.punto}`} style={{ left: pos(v.tasa) }} />
                  </>
                ) : null}
              </span>
              <span className="text-right tabular-nums text-zinc-900">
                {v.n > 0 ? (
                  <>
                    {cien(v.tasa)} de cada 100{" "}
                    <span className="hidden text-zinc-600 sm:inline">
                      ({cien(v.ic[0])}–{cien(v.ic[1])})
                    </span>
                  </>
                ) : (
                  "—"
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function Puente({ boca }: { boca: BocaDatos }) {
  const a = analizarPuente(boca.puente);
  const brazos = [a.con, a.sin];
  const tasa = (campo: "siguieron" | "compartieron") =>
    brazos.map((b) => ({ tasa: b.exposiciones ? b[campo] / b.exposiciones : 0, ic: wilson(b[campo], b.exposiciones), n: b.exposiciones }));
  const siguieron = tasa("siguieron");
  const compartieron = tasa("compartieron");
  const tope = Math.min(1, Math.max(0.1, Math.ceil(Math.max(...[...siguieron, ...compartieron].filter((v) => v.n).map((v) => v.ic[1]), 0) * 10) / 10));
  const tonos = {
    alerta: { caja: "bg-amber-50 text-amber-900 ring-amber-700/15", Icono: IcoAlerta },
    logro: { caja: "bg-emerald-50 text-emerald-900 ring-emerald-700/15", Icono: IcoLogro },
    dato: { caja: "bg-zinc-50 text-zinc-800 ring-zinc-900/[0.06]", Icono: IcoDato },
  } as const;
  const t = tonos[a.veredicto.tono];

  return (
    <Bloque
      titulo="Prueba de la línea «¿Y en otros países?»"
      significa="Mitad de la gente ve, debajo del sueldo neto, una línea que lleva a Tu sueldo en el mundo; la otra mitad no. Sirve para saber si esa línea le saca uso a las calculadoras."
    >
      <div className={`flex items-start gap-3 rounded-2xl px-4 py-3 ring-1 ring-inset ${t.caja}`} role="status">
        <t.Icono className="mt-0.5 size-4 shrink-0" />
        <div>
          <p className="text-sm font-semibold">{a.veredicto.titulo}</p>
          <p className="mt-0.5 text-sm leading-relaxed opacity-90">{a.veredicto.detalle}</p>
        </div>
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {BRAZOS.map((b, i) => (
          <div key={b.v}>
            <dt className="sr-only">{b.nombre}: exposiciones</dt>
            <dd>
              <Cifra
                etiqueta={b.nombre}
                valor={numero(brazos[i].exposiciones)}
                nota={`vieron el resultado · ${numero(brazos[i].personas)} ${brazos[i].personas === 1 ? "persona" : "personas"}`}
              />
            </dd>
          </div>
        ))}
        <div>
          <dt className="sr-only">Tocaron la línea</dt>
          <dd>
            <Cifra
              etiqueta="Tocaron la línea"
              valor={numero(a.con.clics)}
              nota={a.con.exposiciones ? `${cien(a.clic.tasa)} de cada 100 (${cien(a.clic.ic[0])}–${cien(a.clic.ic[1])})` : "—"}
            />
          </dd>
        </div>
        <div>
          <dt className="sr-only">Exposiciones necesarias</dt>
          <dd>
            <Cifra etiqueta="Para comparar" valor={a.suficiente ? "Listo" : `${MIN_EXPOSICIONES} + ${MIN_EXPOSICIONES}`} nota={a.suficiente ? "hay muestra en los dos brazos" : "exposiciones por brazo, como mínimo"} />
          </dd>
        </div>
      </dl>

      {a.hayDatos ? (
        <div className="mt-6 space-y-5">
          <Fila titulo="Siguieron usando calculadoras en esa visita" valores={siguieron} tope={tope} />
          <Fila titulo="Compartieron el resultado" valores={compartieron} tope={tope} />
          <p className="text-xs leading-relaxed text-zinc-600">
            El punto es lo medido; la franja, dónde está casi seguro el valor real. El veredicto de arriba compara los dos brazos con su propio margen de error, no mirando si las franjas se tocan.
          </p>
        </div>
      ) : null}
    </Bloque>
  );
}
