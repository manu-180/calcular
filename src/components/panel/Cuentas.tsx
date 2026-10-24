import type { PanelDatos, Rango } from "@/lib/panel/tipos";
import { periodo, nombrePerfil, numero } from "@/lib/panel/formato";
import { Barras } from "./Barras";
import { filasReparto } from "./Origen";
import { Bandeja, Seccion, TARJETA, Vacio } from "./ui";

export function Cuentas({ datos, rango }: { datos: PanelDatos; rango: Rango }) {
  const c = datos.cuentas;
  const pctVerificadas = c.total ? Math.round((c.verificadas / c.total) * 100) : 0;
  return (
    <Seccion id="cuentas" indice={6} titulo="Cuentas" bajada="Quiénes se registraron en CalculAR.">
      <Bandeja>
        {c.total === 0 ? (
          <div className={TARJETA}>
            <Vacio>Todavía no se creó ninguna cuenta.</Vacio>
          </div>
        ) : (
          <>
            <div className={`${TARJETA} p-5`}>
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
                <div>
                  <p className="text-sm text-zinc-600">Cuentas en total</p>
                  <p className="mt-1 text-4xl font-semibold tracking-[-0.03em] text-zinc-900">{numero(c.total)}</p>
                </div>
                <p className="text-sm font-medium text-emerald-700">
                  {c.nuevas > 0 ? `+${numero(c.nuevas)} ${periodo(rango)}` : `Ninguna nueva ${periodo(rango)}`}
                </p>
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-zinc-100 pt-4 text-sm">
                <div>
                  <dt className="text-zinc-600">Confirmaron el mail</dt>
                  <dd className="mt-0.5 font-semibold tabular-nums text-zinc-900">
                    {numero(c.verificadas)} <span className="font-normal text-zinc-600">de {numero(c.total)}</span>
                  </dd>
                  <div
                    className="mt-2 h-1.5 rounded-full bg-emerald-100"
                    role="meter"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={pctVerificadas}
                    aria-label="Cuentas con el mail confirmado"
                  >
                    <div
                      className="panel-barra h-full rounded-full bg-emerald-600"
                      style={{ clipPath: `inset(0 ${100 - pctVerificadas}% 0 0 round 999px)` }}
                    />
                  </div>
                </div>
                <div>
                  <dt className="text-zinc-600">Compraron algo</dt>
                  <dd className="mt-0.5 font-semibold tabular-nums text-zinc-900">{numero(c.conCompras)}</dd>
                </div>
              </dl>
            </div>
            {c.perfiles.length ? (
              <div className={`${TARJETA} mt-1.5 p-5`}>
                <h3 className="text-sm font-semibold text-zinc-900">Para qué usan CalculAR</h3>
                <div className="mt-3">
                  <Barras filas={filasReparto(c.perfiles, nombrePerfil, 6)} />
                </div>
              </div>
            ) : null}
          </>
        )}
      </Bandeja>
    </Seccion>
  );
}
