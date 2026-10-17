"use client";

import { useState } from "react";
import type { EmbudoProducto, PanelDatos } from "@/lib/panel/tipos";
import { deCada100, importe, numero } from "@/lib/panel/formato";
import { NOMBRE_PASO, fraseEmbudo, pasosEmbudo } from "./meta";
import { Bandeja, Chip, Seccion, TARJETA } from "./ui";

const ORDEN = ["vio_oferta", "abrio_compra", "fue_a_pagar", "pago"] as const;

const VISIBLES = 6;

export function Embudos({ datos }: { datos: PanelDatos }) {
  const [todos, setTodos] = useState(false);
  const embudos = [...datos.embudos].sort(
    (a, b) => pasosEmbudo(b.pasos).vio - pasosEmbudo(a.pasos).vio || b.ingresosUsd - a.ingresosUsd || b.ingresos - a.ingresos,
  );
  const mostrados = todos ? embudos : embudos.slice(0, VISIBLES);
  const total = embudos.reduce(
    (acc, e) => {
      const p = pasosEmbudo(e.pasos);
      return { vio: acc.vio + p.vio, abrio: acc.abrio + p.abrio, fue: acc.fue + p.fue, pago: acc.pago + p.pago };
    },
    { vio: 0, abrio: 0, fue: 0, pago: 0 },
  );
  return (
    <Seccion
      id="embudo"
      indice={3}
      titulo="Embudo de compra"
      bajada="Cuántos llegan a cada paso y dónde se quedan en el camino."
    >
      <Bandeja>
        <p className={`${TARJETA} px-5 py-4 text-[15px] leading-relaxed text-zinc-800`}>
          <span className="font-semibold text-zinc-900">Todos los productos juntos: </span>
          {fraseEmbudo(total)}
        </p>
        <ul className="mt-1.5 grid gap-1.5 md:grid-cols-2">
          {mostrados.map((e) => (
            <li key={e.producto} className={`${TARJETA} p-5`}>
              <EmbudoTarjeta embudo={e} />
            </li>
          ))}
        </ul>
        {embudos.length > VISIBLES ? (
          <div className="mt-1.5 flex justify-center">
            <button
              type="button"
              onClick={() => setTodos((t) => !t)}
              className="h-10 rounded-full px-4 text-sm font-medium text-zinc-700 transition-[background-color,transform] duration-200 hover:bg-white/70 active:scale-[0.97]"
            >
              {todos ? "Mostrar menos" : `Ver los ${numero(embudos.length)} productos`}
            </button>
          </div>
        ) : null}
      </Bandeja>
    </Seccion>
  );
}

export function EmbudoTarjeta({ embudo, compacto = false }: { embudo: EmbudoProducto; compacto?: boolean }) {
  const p = pasosEmbudo(embudo.pasos);
  const valores = [p.vio, p.abrio, p.fue, p.pago];
  const tope = Math.max(1, ...valores);
  const tasas = [1, 2, 3].map((i) => (valores[i - 1] > 0 ? valores[i] / valores[i - 1] : null));
  const candidatos = [2, 3].filter((i) => valores[i - 1] >= 3 && (tasas[i - 1] ?? 1) < 0.5);
  const peor = candidatos.length
    ? candidatos.reduce((a, b) => ((tasas[a - 1] ?? 1) <= (tasas[b - 1] ?? 1) ? a : b))
    : null;

  return (
    <div>
      {!compacto ? (
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold text-zinc-900">{embudo.titulo}</h3>
            <p className="mt-0.5 text-sm text-zinc-600">
              {embudo.ingresos > 0 ? `${importe(embudo.ingresos, embudo.moneda)} cobrados` : "Sin ventas en este período"}
            </p>
          </div>
          <span className="shrink-0 text-sm font-medium tabular-nums text-zinc-700">{embudo.precio > 0 ? importe(embudo.precio, embudo.moneda) : null}</span>
        </div>
      ) : null}
      <ol className={compacto ? "" : "mt-4"}>
        {ORDEN.map((paso, i) => (
          <li key={paso}>
            {i > 0 ? (
              <p className="flex items-center gap-2 py-1.5 pl-0.5 text-xs text-zinc-600">
                <span aria-hidden className="text-zinc-400">
                  ↓
                </span>
                {tasas[i - 1] === null ? "—" : tasas[i - 1] === 0 ? "no pasó nadie" : `pasan ${deCada100(tasas[i - 1] ?? 0)}`}
                {peor === i ? <Chip tono="ambar">acá se caen más</Chip> : null}
              </p>
            ) : null}
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="text-zinc-800">{NOMBRE_PASO[paso]}</span>
              <span className="font-semibold tabular-nums text-zinc-900">{numero(valores[i])}</span>
            </div>
            <div className="mt-1.5 h-2 rounded-full bg-zinc-100" aria-hidden>
              <div
                className={`panel-barra h-full rounded-full ${i === 3 ? "bg-emerald-700" : "bg-emerald-500"}`}
                style={{
                  clipPath: `inset(0 ${valores[i] > 0 ? 100 - Math.max(1.5, (valores[i] / tope) * 100) : 100}% 0 0 round 999px)`,
                }}
              />
            </div>
          </li>
        ))}
      </ol>
      {!compacto ? <p className="mt-4 text-sm leading-relaxed text-zinc-600">{fraseEmbudo(p)}</p> : null}
    </div>
  );
}
