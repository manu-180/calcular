"use client";

import { useMemo, useState } from "react";
import {
  CONDICIONES,
  VIGENCIA_APORTES,
  type CondicionTrabajador,
} from "@/data/aportes-casas-particulares";
import { calcularAportes } from "@/lib/aportes-casas-particulares";
import { formatARS } from "@/lib/formato";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

export function CalculadoraAportesCasas() {
  const [horasSemanales, setHorasSemanales] = useState(12);
  const [condicion, setCondicion] = useState<CondicionTrabajador>("activo-mayor-18");
  const [cantidad, setCantidad] = useState("1");

  const cantidadNum = Math.max(1, Math.floor(Number(cantidad) || 1));

  const res = useMemo(
    () => calcularAportes({ horasSemanales, condicion, cantidadTrabajadores: cantidadNum }),
    [horasSemanales, condicion, cantidadNum],
  );

  const condicionSeleccionada = CONDICIONES.find((c) => c.id === condicion)!;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="hs" className="block text-sm font-semibold text-zinc-800">
            Horas por semana en tu casa:{" "}
            <span className="font-bold text-emerald-700">{horasSemanales}</span>
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Son las horas que te trabaja a vos. Si además trabaja en otras casas, cada empleador paga
            su propio aporte por sus propias horas.
          </p>
          <input
            id="hs"
            type="range"
            min={1}
            max={48}
            value={horasSemanales}
            onChange={(e) => setHorasSemanales(Number(e.target.value))}
            className="mt-3 w-full accent-emerald-600"
          />
          <div className="flex justify-between text-xs text-zinc-400">
            <span>1 h</span>
            <span className="text-emerald-700">16 h = el piso de derechos</span>
            <span>48 h</span>
          </div>
        </div>

        <div>
          <label htmlFor="cond" className="block text-sm font-semibold text-zinc-800">
            Situación de la persona
          </label>
          <select
            id="cond"
            value={condicion}
            onChange={(e) => setCondicion(e.target.value as CondicionTrabajador)}
            className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            {CONDICIONES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.etiqueta}
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-zinc-500">{condicionSeleccionada.detalle}</p>
        </div>

        <div>
          <label htmlFor="cant" className="block text-sm font-semibold text-zinc-800">
            ¿Cuántas personas en estas condiciones?
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El aporte es por cada trabajador, no por hogar.
          </p>
          <input
            id="cant"
            inputMode="numeric"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          />
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <p className="text-sm text-zinc-600">
          Lo que tenés que pagarle a ARCA · valores de {VIGENCIA_APORTES.mesVigente}
        </p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
          {formatARS(res.totalMensual, 2)}
        </p>
        <p className="mt-1 text-sm text-zinc-600">
          {res.rangoEtiqueta} · {res.condicionEtiqueta.toLowerCase()}
          {cantidadNum > 1
            ? ` · ${cantidadNum} personas (${formatARS(res.totalPorTrabajador, 2)} cada una)`
            : ""}
        </p>

        <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
          <div className="flex justify-between border-b border-zinc-200 pb-1.5">
            <dt className="text-zinc-600">Obra social</dt>
            <dd className="font-medium text-zinc-900">
              {res.fila.obraSocial === null ? "no corresponde" : formatARS(res.fila.obraSocial, 2)}
            </dd>
          </div>
          <div className="flex justify-between border-b border-zinc-200 pb-1.5">
            <dt className="text-zinc-600">Jubilación (SIPA)</dt>
            <dd className="font-medium text-zinc-900">
              {res.fila.sipa === null ? "no corresponde" : formatARS(res.fila.sipa, 2)}
            </dd>
          </div>
          <div className="flex justify-between border-b border-zinc-200 pb-1.5">
            <dt className="text-zinc-600">Cuota ART</dt>
            <dd className="font-medium text-zinc-900">{formatARS(res.fila.art, 2)}</dd>
          </div>
          <div className="flex justify-between border-b border-zinc-200 pb-1.5">
            <dt className="text-zinc-600">La ART, sobre el total</dt>
            <dd className="font-medium text-zinc-900">
              {res.proporcionArt.toLocaleString("es-AR", { maximumFractionDigits: 1 })}%
            </dd>
          </div>
          {res.faltaParaObraSocial > 0 && (
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Falta para tener obra social</dt>
              <dd className="font-semibold text-amber-700">
                {formatARS(res.faltaParaObraSocial, 2)}
              </dd>
            </div>
          )}
          {res.faltaParaJubilacion > 0 && (
            <div className="flex justify-between border-b border-zinc-200 pb-1.5">
              <dt className="text-zinc-600">Falta para que compute la jubilación</dt>
              <dd className="font-semibold text-amber-700">
                {formatARS(res.faltaParaJubilacion, 2)}
              </dd>
            </div>
          )}
        </dl>

        {res.avisos.length > 0 && (
          <ul className="mt-4 space-y-2">
            {res.avisos.map((a, i) => (
              <li key={i} className={`rounded-lg border px-3 py-2 text-sm ${TONOS[a.tono]}`}>
                {a.texto}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-4 text-xs text-zinc-500">
          Importes del PDF oficial de ARCA para {VIGENCIA_APORTES.mesVigente}, que se pagan en{" "}
          {VIGENCIA_APORTES.mesDeVencimiento}: los aportes van siempre a mes vencido y la ART a mes
          en curso. Esto es lo que se ingresa a ARCA y no incluye el sueldo del trabajador.
        </p>
      </div>
    </div>
  );
}
