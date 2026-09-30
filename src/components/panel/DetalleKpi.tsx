"use client";

import { useState, type ReactNode } from "react";
import type { KpiClave, PanelDatos, Rango } from "@/lib/panel/tipos";
import {
  PERIODO,
  deCada100,
  diaConSemana,
  duracion,
  ejeKpi,
  franjaHoraria,
  nombreDispositivo,
  nombrePais,
  numero,
  pesos,
  plural,
} from "@/lib/panel/formato";
import { Barras, type FilaBarra } from "./Barras";
import { ListaCompras } from "./Compras";
import { DeltaTexto } from "./Delta";
import { Grafico } from "./Grafico";
import { IcoCerrar, IcoFlechaDerecha } from "./iconos";
import { META_KPI, kpiDe, pasosEmbudo, ultimoEsParcial } from "./meta";
import { filasFuentes, filasReparto } from "./Origen";

function resumen(clave: KpiClave, datos: PanelDatos, rango: Rango): string {
  const k = kpiDe(datos, clave);
  const periodo = PERIODO[rango];
  const mejor = k.serie.reduce<{ t: string; v: number } | null>((m, p) => (!m || p.v > m.v ? p : m), null);
  const cuando =
    mejor && mejor.v > 0 && k.serie.length > 1
      ? datos.granularidad === "hora"
        ? ` El mejor horario fue ${franjaHoraria(mejor.t)}.`
        : ` El mejor día fue el ${diaConSemana(mejor.t)}.`
      : "";
  const interes = kpiDe(datos, "interes").valor;
  const checkouts = kpiDe(datos, "checkouts").valor;
  const ingresos = kpiDe(datos, "ingresos").valor;
  switch (clave) {
    case "visitantes":
      return `Entraron ${plural(k.valor, "persona", "personas")} ${periodo}.${cuando}`;
    case "usos":
      return `Usaron una calculadora ${k.valor === 1 ? "1 vez" : `${numero(k.valor)} veces`} ${periodo}.${cuando}`;
    case "tiempo":
      return k.valor > 0
        ? `La mitad de las personas pasa más de ${duracion(k.valor)} usando la calculadora.`
        : "Todavía no hay usos para medir el tiempo.";
    case "interes":
      return `${k.valor === 1 ? "1 persona quiso" : `${numero(k.valor)} personas quisieron`} comprar una planilla ${periodo}.`;
    case "checkouts":
      return `${k.valor === 1 ? "1 persona llegó" : `${numero(k.valor)} personas llegaron`} a la pantalla de pago ${periodo}.${
        interes > 0 ? ` Son ${deCada100(k.valor / interes)} de las que quisieron comprar.` : ""
      }`;
    case "ventas":
    case "ingresos": {
      const ventas = kpiDe(datos, "ventas").valor;
      if (ventas === 0)
        return `No hubo ventas ${periodo}.${
          checkouts > 0 ? ` ${checkouts === 1 ? "1 persona fue" : `${numero(checkouts)} personas fueron`} a pagar y no terminó.` : ""
        }`;
      return `${plural(ventas, "venta", "ventas")} ${periodo}, por ${pesos(ingresos)}.${
        checkouts > 0 ? ` Pagaron ${deCada100(ventas / checkouts)} de los que fueron a pagar.` : ""
      }`;
    }
  }
}

function Bloque({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-zinc-50/70 p-4 ring-1 ring-inset ring-zinc-900/[0.05]">
      <h4 className="text-sm font-semibold text-zinc-900">{titulo}</h4>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function VerTodas({ texto, onClick }: { texto: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-800 hover:text-emerald-900"
    >
      {texto}
      <IcoFlechaDerecha className="size-3.5 transition-transform duration-200 ease-fluid group-hover:translate-x-0.5" />
    </button>
  );
}

function Desglose({
  clave,
  datos,
  onAncla,
}: {
  clave: KpiClave;
  datos: PanelDatos;
  onAncla: (href: string) => void;
}) {
  const productos = datos.embudos.map((e) => ({ e, p: pasosEmbudo(e.pasos) }));
  switch (clave) {
    case "visitantes":
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <Bloque titulo="Cómo llegaron">
            <Barras filas={filasFuentes(datos, 5)} />
          </Bloque>
          <div className="grid gap-3">
            <Bloque titulo="Desde qué">
              <Barras filas={filasReparto(datos.dispositivos, nombreDispositivo)} />
            </Bloque>
            <Bloque titulo="Desde dónde">
              <Barras filas={filasReparto(datos.paises, nombrePais, 3)} />
            </Bloque>
          </div>
        </div>
      );
    case "usos": {
      const filas: FilaBarra[] = [...datos.paginas]
        .sort((a, b) => b.usos - a.usos)
        .slice(0, 8)
        .map((p) => ({
          clave: p.path,
          etiqueta: p.titulo,
          valor: p.usos,
          texto: numero(p.usos),
          nota: `la usan ${deCada100(p.tasaUso)} de los que entran`,
        }));
      return (
        <Bloque titulo="Las más usadas">
          <Barras filas={filas} />
          <VerTodas texto="Ver todas las calculadoras" onClick={() => onAncla("#calculadoras")} />
        </Bloque>
      );
    }
    case "tiempo": {
      const piso = Math.max(5, (datos.paginas[0]?.usos ?? 0) * 0.02);
      const filas: FilaBarra[] = datos.paginas
        .filter((p) => p.usos >= piso)
        .sort((a, b) => b.tiempoMedianoMs - a.tiempoMedianoMs)
        .slice(0, 8)
        .map((p) => ({
          clave: p.path,
          etiqueta: p.titulo,
          valor: p.tiempoMedianoMs,
          texto: duracion(p.tiempoMedianoMs),
          nota: plural(p.usos, "uso", "usos"),
        }));
      return (
        <Bloque titulo="Donde más se quedan">
          <Barras filas={filas} />
          <VerTodas texto="Ver todas las calculadoras" onClick={() => onAncla("#calculadoras")} />
        </Bloque>
      );
    }
    case "interes": {
      const paginas: FilaBarra[] = datos.paginas
        .filter((p) => p.interesCompra > 0)
        .sort((a, b) => b.interesCompra - a.interesCompra)
        .slice(0, 5)
        .map((p) => ({ clave: p.path, etiqueta: p.titulo, valor: p.interesCompra, texto: numero(p.interesCompra) }));
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <Bloque titulo="Qué planilla quisieron">
            <Barras
              filas={productos.map(({ e, p }) => ({
                clave: e.producto,
                etiqueta: e.titulo,
                valor: p.abrio,
                texto: numero(p.abrio),
                nota: p.vio ? `de ${numero(p.vio)} que vieron la oferta` : undefined,
              }))}
            />
          </Bloque>
          <Bloque titulo="Desde qué calculadora">
            {paginas.length ? <Barras filas={paginas} /> : <p className="text-sm text-zinc-600">Sin datos todavía.</p>}
          </Bloque>
        </div>
      );
    }
    case "checkouts":
      return (
        <Bloque titulo="Qué planilla fueron a pagar">
          <Barras
            filas={productos.map(({ e, p }) => ({
              clave: e.producto,
              etiqueta: e.titulo,
              valor: p.fue,
              texto: numero(p.fue),
              nota: p.abrio ? `de ${numero(p.abrio)} que abrieron la compra` : undefined,
            }))}
          />
          <VerTodas texto="Ver el embudo completo" onClick={() => onAncla("#embudo")} />
        </Bloque>
      );
    case "ventas":
    case "ingresos":
      return (
        <div className="grid gap-3 md:grid-cols-2">
          <Bloque titulo="Qué se vendió">
            <Barras
              filas={productos.map(({ e, p }) => ({
                clave: e.producto,
                etiqueta: e.titulo,
                valor: e.ingresos,
                texto: pesos(e.ingresos),
                nota: `${plural(p.pago, "venta", "ventas")}${p.fue ? ` de ${numero(p.fue)} que fueron a pagar` : ""}`,
              }))}
            />
          </Bloque>
          <Bloque titulo="Últimas compras">
            {datos.compras.length ? (
              <ListaCompras datos={datos} compras={datos.compras.slice(0, 4)} />
            ) : (
              <p className="text-sm text-zinc-600">No hubo compras en este período.</p>
            )}
          </Bloque>
        </div>
      );
  }
}

export function DetalleKpi({
  clave,
  datos,
  rango,
  onCerrar,
  onAncla,
  enHoja = false,
}: {
  clave: KpiClave;
  datos: PanelDatos;
  rango: Rango;
  onCerrar?: () => void;
  onAncla: (href: string) => void;
  enHoja?: boolean;
}) {
  const [verPlata, setVerPlata] = useState(false);
  const serieClave: KpiClave = clave === "ventas" && verPlata ? "ingresos" : clave;
  const meta = META_KPI[clave];
  const k = kpiDe(datos, clave);
  const serie = kpiDe(datos, serieClave);
  const texto = resumen(clave, datos, rango);

  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {!enHoja ? (
            <p className="flex items-center gap-2 text-sm font-medium text-zinc-600">
              <meta.Icono className="size-4 text-emerald-700" />
              {meta.etiqueta}
            </p>
          ) : null}
          <p className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span className="text-3xl font-semibold tracking-[-0.03em] text-zinc-900">
              {clave === "tiempo" ? duracion(k.valor) : numero(k.valor)}
            </span>
            <DeltaTexto valor={k.valor} anterior={k.anterior} rango={rango} />
          </p>
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
      <p className="mt-2 max-w-[68ch] text-[15px] leading-relaxed text-zinc-700 [text-wrap:pretty]">{texto}</p>

      {clave === "ventas" ? (
        <div role="group" aria-label="Qué mostrar en el gráfico" className="mt-4 inline-flex rounded-full bg-zinc-100 p-1 text-sm">
          {[
            { v: false, t: "Ventas" },
            { v: true, t: "Plata" },
          ].map((o) => (
            <button
              key={o.t}
              type="button"
              aria-pressed={verPlata === o.v}
              onClick={() => setVerPlata(o.v)}
              className={`h-8 rounded-full px-3.5 font-medium transition-[background-color,color,box-shadow] duration-200 ${
                verPlata === o.v ? "bg-white text-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.08)]" : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              {o.t}
            </button>
          ))}
        </div>
      ) : null}

      <div className="mt-4">
        <Grafico
          key={`${serieClave}-${datos.rango}`}
          puntos={serie.serie}
          granularidad={datos.granularidad}
          formatoEje={(n) => ejeKpi(serieClave, n)}
          formatoValor={(n) => META_KPI[serieClave].valor(n)}
          titulo={`${META_KPI[serieClave].etiqueta}, ${PERIODO[rango]}`}
          resumen={texto}
          parcial={ultimoEsParcial(datos)}
          forma={clave === "ventas" ? "columnas" : "linea"}
          alto={enHoja ? 200 : 240}
        />
      </div>

      <div className="mt-5">
        <Desglose clave={clave} datos={datos} onAncla={onAncla} />
      </div>
    </div>
  );
}
