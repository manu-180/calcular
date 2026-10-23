"use client";

import type { Compra, PanelDatos, Rango } from "@/lib/panel/tipos";
import { periodo, fechaYHora, importe } from "@/lib/panel/formato";
import { useAhora } from "./hooks";
import { tituloDePagina, tituloDeProducto } from "./meta";
import { Bandeja, Chip, Seccion, TARJETA, Vacio } from "./ui";

const ESTADO: Record<Compra["estado"], { texto: string; tono: "rosa" | "ambar" } | null> = {
  aprobado: null,
  reembolsado: { texto: "Devuelta", tono: "ambar" },
  contracargo: { texto: "Contracargo", tono: "rosa" },
};

export function ListaCompras({ datos, compras }: { datos: PanelDatos; compras: Compra[] }) {
  const ahora = useAhora(datos.generado, 60_000);
  return (
    <ul className="divide-y divide-zinc-100">
      {compras.map((c) => {
        const estado = ESTADO[c.estado];
        return (
          <li key={c.id} className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-900">{tituloDeProducto(datos, c.producto)}</p>
              <p className="mt-0.5 break-all text-xs text-zinc-600">
                {c.emailEnmascarado}
                {c.desde ? <span className="break-normal"> · desde {tituloDePagina(datos, c.desde)}</span> : null}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {c.conCuenta ? <Chip tono="esmeralda">Tiene cuenta</Chip> : null}
                {estado ? <Chip tono={estado.tono}>{estado.texto}</Chip> : null}
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p
                className={`text-sm font-semibold tabular-nums ${c.estado === "aprobado" ? "text-zinc-900" : "text-zinc-500 line-through"}`}
              >
                {importe(c.monto, c.moneda)}
              </p>
              <p className="mt-0.5 text-xs tabular-nums text-zinc-600">{fechaYHora(c.fecha, ahora)}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function Compras({ datos, rango }: { datos: PanelDatos; rango: Rango }) {
  const aprobadas = datos.compras.filter((c) => c.estado === "aprobado");
  const porMoneda = new Map<string, number>();
  for (const c of aprobadas) porMoneda.set(c.moneda, (porMoneda.get(c.moneda) ?? 0) + c.monto);
  const total = [...porMoneda].map(([moneda, monto]) => importe(monto, moneda)).join(" y ");
  return (
    <Seccion
      id="compras"
      indice={6}
      titulo="Últimas compras"
      bajada={
        aprobadas.length
          ? `${aprobadas.length === 1 ? "1 compra" : `${aprobadas.length} compras`} por ${total} ${periodo(rango)}.`
          : undefined
      }
    >
      <Bandeja>
        <div className={`${TARJETA} p-5`}>
          {datos.compras.length ? (
            <ListaCompras datos={datos} compras={datos.compras.slice(0, 8)} />
          ) : (
            <Vacio>No hubo compras {periodo(rango)}. Cuando alguien pague, aparece acá.</Vacio>
          )}
        </div>
      </Bandeja>
    </Seccion>
  );
}
