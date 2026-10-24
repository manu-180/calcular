"use client";

import type { KpiClave, PanelDatos, Rango } from "@/lib/panel/tipos";
import { contra } from "@/lib/panel/formato";
import { Delta } from "./Delta";
import { DetalleKpi } from "./DetalleKpi";
import { Desplegable } from "./Desplegable";
import { META_KPI, TARJETAS, kpiDe, metaKpi, ultimoEsParcial } from "./meta";
import { NumeroAnimado } from "./NumeroAnimado";
import { Sparkline } from "./Sparkline";
import { Bandeja, Seccion, TARJETA } from "./ui";

const ID_DETALLE = "kpi-detalle";

export function Kpis({
  datos,
  rango,
  ancho,
  abierto,
  ultimoAbierto,
  onAbrir,
  onCerrar,
  onAncla,
}: {
  datos: PanelDatos;
  rango: Rango;
  ancho: boolean;
  abierto: KpiClave | null;
  ultimoAbierto: KpiClave | null;
  onAbrir: (clave: KpiClave) => void;
  onCerrar: () => void;
  onAncla: (href: string) => void;
}) {
  const ingresos = kpiDe(datos, "ingresos");
  const parcial = ultimoEsParcial(datos);
  return (
    <Seccion
      id="kpis"
      indice={2}
      titulo="Los números"
      bajada={`Tocá una tarjeta para ver el detalle. Las flechas comparan con ${contra(rango)}.`}
    >
      <Bandeja>
        <ul className="grid grid-cols-2 gap-1.5 md:grid-cols-3">
          {TARJETAS.map((clave) => {
            const k = kpiDe(datos, clave);
            const meta = META_KPI[clave];
            const activo = abierto === clave;
            return (
              <li key={clave} className="flex">
                <button
                  type="button"
                  aria-expanded={ancho ? activo : undefined}
                  aria-controls={ancho ? ID_DETALLE : undefined}
                  aria-haspopup={ancho ? undefined : "dialog"}
                  onClick={() => (activo ? onCerrar() : onAbrir(clave))}
                  className={`${TARJETA} group flex w-full flex-col border p-4 text-left transition-[transform,box-shadow,border-color,background-color] duration-200 ease-fluid hover:-translate-y-0.5 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_4px_rgba(0,0,0,0.05),0_14px_32px_-14px_rgba(0,0,0,0.22)] active:translate-y-0 active:scale-[0.985] sm:p-5 ${
                    activo ? "border-emerald-600/60 bg-emerald-50/30" : "border-transparent"
                  }`}
                >
                  <span className="flex min-h-[2.5em] items-start gap-2 text-[13px] font-medium leading-snug text-zinc-600 sm:min-h-0">
                    <meta.Icono
                      className={`mt-px size-4 shrink-0 transition-colors duration-200 ${activo ? "text-emerald-700" : "text-zinc-500"}`}
                    />
                    {meta.etiqueta}
                  </span>
                  <NumeroAnimado
                    valor={k.valor}
                    formato={meta.formato}
                    className="mt-2.5 block text-[1.625rem] font-semibold leading-none tracking-[-0.03em] tabular-nums text-zinc-900 sm:text-[2.125rem]"
                  />
                  {clave === "ventas" ? (
                    <span className="mt-1.5 block text-sm text-zinc-600">
                      <NumeroAnimado valor={ingresos.valor} formato={metaKpi("ingresos", datos).formato} className="font-medium tabular-nums text-zinc-800" />{" "}
                      cobrados
                    </span>
                  ) : null}
                  <span className="mt-auto block pt-3">
                    <Delta valor={k.valor} anterior={k.anterior} rango={rango} />
                  </span>
                  <span className="mt-3 block">
                    <Sparkline valores={k.serie.map((p) => p.v)} activo={activo} parcial={parcial} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {ancho ? (
          <Desplegable abierto={abierto !== null} id={ID_DETALLE}>
            <div className="pt-1.5">
              <div className={TARJETA}>
                {ultimoAbierto ? (
                  <div key={ultimoAbierto} className="panel-entra">
                    <DetalleKpi
                      clave={ultimoAbierto}
                      datos={datos}
                      rango={rango}
                      onCerrar={onCerrar}
                      onAncla={onAncla}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </Desplegable>
        ) : null}
      </Bandeja>
    </Seccion>
  );
}
