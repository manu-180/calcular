import type { PanelDatos, Rango } from "@/lib/panel/tipos";
import { PERIODO, numero } from "@/lib/panel/formato";
import { Barras } from "./Barras";
import { IcoAlerta } from "./iconos";
import { Bandeja, Seccion, TARJETA, Vacio } from "./ui";

export function Busquedas({ datos, rango }: { datos: PanelDatos; rango: Rango }) {
  const sinResultado = datos.busquedas.filter((b) => b.sinResultados).sort((a, b) => b.n - a.n);
  const conResultado = datos.busquedas.filter((b) => !b.sinResultados).sort((a, b) => b.n - a.n).slice(0, 8);
  const vez = (n: number) => (n === 1 ? "1 vez" : `${numero(n)} veces`);
  return (
    <Seccion id="busquedas" indice={5} titulo="Qué buscan" bajada="Lo que escriben en el buscador del sitio.">
      <Bandeja>
        {!datos.busquedas.length ? (
          <div className={TARJETA}>
            <Vacio>Nadie usó el buscador {PERIODO[rango]}.</Vacio>
          </div>
        ) : (
          <>
            {sinResultado.length ? (
              <div className={`${TARJETA} p-5`}>
                <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                  <span className="grid size-6 place-items-center rounded-full bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-700/15">
                    <IcoAlerta className="size-3.5" />
                  </span>
                  Buscaron y no encontraron
                </h3>
                <p className="mt-1 text-sm text-zinc-600">
                  Es demanda sin atender: gente pidiendo algo que el sitio todavía no tiene.
                </p>
                <ul className="mt-3 divide-y divide-zinc-100">
                  {sinResultado.map((b) => (
                    <li key={b.q} className="flex items-baseline justify-between gap-3 py-2 text-sm last:pb-0">
                      <span className="min-w-0 font-medium text-zinc-900">«{b.q}»</span>
                      <span className="shrink-0 tabular-nums text-zinc-700">{vez(b.n)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {conResultado.length ? (
              <div className={`${TARJETA} p-5 ${sinResultado.length ? "mt-1.5" : ""}`}>
                <h3 className="text-sm font-semibold text-zinc-900">Lo más buscado</h3>
                <div className="mt-3">
                  <Barras
                    filas={conResultado.map((b) => ({ clave: b.q, etiqueta: `«${b.q}»`, valor: b.n, texto: vez(b.n) }))}
                  />
                </div>
              </div>
            ) : null}
          </>
        )}
      </Bandeja>
    </Seccion>
  );
}
