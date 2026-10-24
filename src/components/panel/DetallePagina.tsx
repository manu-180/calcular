"use client";

import type { FilaPagina, PanelDatos, Rango } from "@/lib/panel/tipos";
import { hrefInterno, periodo, compacto, deCada100, duracion, numero, plural } from "@/lib/panel/formato";
import { EmbudoTarjeta } from "./Embudos";
import { Grafico } from "./Grafico";
import { IcoCerrar, IcoExterno } from "./iconos";
import { kpiDe, tituloDeProducto, ultimoEsParcial } from "./meta";

export function DetallePagina({
  fila,
  datos,
  rango,
  onCerrar,
  enHoja = false,
}: {
  fila: FilaPagina;
  datos: PanelDatos;
  rango: Rango;
  onCerrar?: () => void;
  enHoja?: boolean;
}) {
  const tiempos = kpiDe(datos, "usos").serie.map((p) => p.t);
  const puntos = fila.serieUsos.map((v, i) => ({ t: tiempos[i] ?? tiempos[tiempos.length - 1] ?? datos.hasta, v }));
  const embudo = fila.producto ? datos.embudos.find((e) => e.producto === fila.producto) : undefined;
  const texto = `De ${plural(fila.visitantes, "persona que entró", "personas que entraron")} ${periodo(rango)}, ${
    fila.usos === 1 ? "1 la usó" : `${numero(fila.usos)} la usaron`
  } (${deCada100(fila.tasaUso)}).${
    fila.usos > 0 ? ` La mitad se queda más de ${duracion(fila.tiempoMedianoMs)}.` : ""
  }`;

  const datosClave = [
    { t: "Visitas", v: numero(fila.vistas) },
    { t: "Personas", v: numero(fila.visitantes) },
    { t: "La usaron", v: numero(fila.usos) },
    { t: "Tiempo típico", v: fila.usos > 0 ? duracion(fila.tiempoMedianoMs) : "—" },
    { t: "La compartieron", v: numero(fila.compartidos) },
    { t: "Quisieron comprar", v: numero(fila.interesCompra) },
  ];

  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {!enHoja ? <h3 className="text-lg font-semibold tracking-[-0.01em] text-zinc-900">{fila.titulo}</h3> : null}
          <a
            href={hrefInterno(fila.path) ?? "/"}
            target="_blank"
            rel="noopener"
            className="group mt-0.5 inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-emerald-800"
          >
            <span className="break-all">calcular.ar{fila.path}</span>
            <IcoExterno className="size-3.5 shrink-0 transition-transform duration-200 ease-fluid group-hover:-translate-y-px group-hover:translate-x-px" />
            <span className="sr-only">(abrir la calculadora en otra pestaña)</span>
          </a>
        </div>
        {onCerrar && !enHoja ? (
          <button
            type="button"
            onClick={onCerrar}
            className="-mr-2 -mt-1 grid size-10 shrink-0 place-items-center rounded-full text-zinc-600 transition-[transform,background-color] duration-150 hover:bg-zinc-100 active:scale-95"
          >
            <IcoCerrar />
            <span className="sr-only">Cerrar el detalle</span>
          </button>
        ) : null}
      </div>

      <p className="mt-3 max-w-[68ch] text-[15px] leading-relaxed text-zinc-700">{texto}</p>

      <dl className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-zinc-900/[0.06] ring-1 ring-inset ring-zinc-900/[0.06] sm:grid-cols-3">
        {datosClave.map((d) => (
          <div key={d.t} className="bg-white px-4 py-3">
            <dt className="text-xs text-zinc-600">{d.t}</dt>
            <dd className="mt-0.5 text-lg font-semibold tabular-nums text-zinc-900">{d.v}</dd>
          </div>
        ))}
      </dl>

      {puntos.length > 1 ? (
        <div className="mt-5">
          <h4 className="mb-2 text-sm font-semibold text-zinc-900">Usos {periodo(rango)}</h4>
          <Grafico
            key={`${fila.path}-${datos.rango}`}
            puntos={puntos}
            granularidad={datos.granularidad}
            formatoEje={compacto}
            formatoValor={(n) => plural(n, "uso", "usos")}
            titulo={`Usos de ${fila.titulo}`}
            resumen={texto}
            parcial={ultimoEsParcial(datos)}
            alto={enHoja ? 180 : 200}
          />
        </div>
      ) : null}

      <div className="mt-5 rounded-2xl bg-zinc-50/70 p-4 ring-1 ring-inset ring-zinc-900/[0.05]">
        {fila.producto && embudo ? (
          <>
            <h4 className="text-sm font-semibold text-zinc-900">Ofrece la {tituloDeProducto(datos, fila.producto)}</h4>
            <p className="mt-1 text-sm leading-relaxed text-zinc-600">
              Desde esta calculadora, {fila.interesCompra === 1 ? "1 persona quiso" : `${numero(fila.interesCompra)} quisieron`}{" "}
              comprar, {numero(fila.checkouts)} {fila.checkouts === 1 ? "fue" : "fueron"} a pagar y{" "}
              {fila.ventas === 1 ? "1 compró" : `${numero(fila.ventas)} compraron`}.
            </p>
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-zinc-600">El embudo de esa planilla, en todo el sitio</p>
              <EmbudoTarjeta embudo={embudo} compacto />
            </div>
          </>
        ) : (
          <>
            <h4 className="text-sm font-semibold text-zinc-900">No ofrece ninguna planilla</h4>
            <p className="mt-1 text-sm leading-relaxed text-zinc-600">
              {fila.usos > 0
                ? `Con ${plural(fila.usos, "uso", "usos")} ${periodo(rango)}, es un lugar para pensar qué se le podría ofrecer.`
                : "Por ahora no tiene uso suficiente como para ofrecer algo."}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
