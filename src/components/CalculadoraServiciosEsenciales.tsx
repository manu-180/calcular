"use client";

import { useMemo, useState } from "react";
import {
  ACTIVIDADES,
  ETIQUETAS_CATEGORIA,
  PISOS,
  type Categoria,
} from "@/data/servicios-esenciales";
import { calcularServiciosEsenciales } from "@/lib/servicios-esenciales";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const COLOR_CATEGORIA: Record<Categoria, string> = {
  esencial: "bg-rose-100 text-rose-900",
  trascendental: "bg-amber-100 text-amber-900",
  seguridad: "bg-zinc-900 text-white",
  "no-listada": "bg-zinc-100 text-zinc-700",
};

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const GRUPOS: { categoria: Categoria; titulo: string }[] = [
  { categoria: "esencial", titulo: "Servicios esenciales en sentido estricto (75%)" },
  { categoria: "trascendental", titulo: "Actividades de importancia trascendental (50%)" },
  { categoria: "seguridad", titulo: "Fuerzas de seguridad (100%)" },
  { categoria: "no-listada", titulo: "Salieron de la enumeración el 6/3/2026 (sin piso legal)" },
];

function fechaLarga(iso: string): string {
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1, d)).toLocaleDateString("es-AR", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function CalculadoraServiciosEsenciales() {
  const [actividadId, setActividadId] = useState("salud");
  const [dotacion, setDotacion] = useState("40");
  const [fecha, setFecha] = useState("2026-09-01");
  const [conProrroga, setConProrroga] = useState(false);

  const res = useMemo(
    () =>
      calcularServiciosEsenciales({
        actividadId,
        dotacion: Number(dotacion) || 0,
        fechaNotificacionISO: fecha,
        conProrroga,
      }),
    [actividadId, dotacion, fecha, conProrroga],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="actividad" className="block text-sm font-semibold text-zinc-800">
            Actividad
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Las dos listas del artículo 24 vigente, más las actividades que el texto anterior
            enumeraba y el nuevo dejó afuera.
          </p>
          <select
            id="actividad"
            value={actividadId}
            onChange={(e) => setActividadId(e.target.value)}
            className={claseInput}
          >
            {GRUPOS.map((g) => (
              <optgroup key={g.categoria} label={g.titulo}>
                {ACTIVIDADES.filter((a) => a.categoria === g.categoria).map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.etiqueta}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="dotacion" className="block text-sm font-semibold text-zinc-800">
            Trabajadores de la dotación afectada
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Los que estarían alcanzados por la medida en ese servicio.
          </p>
          <input
            id="dotacion"
            type="number"
            min={1}
            inputMode="numeric"
            value={dotacion}
            onChange={(e) => setDotacion(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="fecha" className="block text-sm font-semibold text-zinc-800">
            Día en que la autoridad toma conocimiento del conflicto
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El que abre la conciliación obligatoria (art. 2° de la Ley 14.786).
          </p>
          <input
            id="fecha"
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className={claseInput}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={conProrroga}
              onChange={(e) => setConProrroga(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>
              El conciliador prorrogó la instancia por cinco días más (art. 11, segunda oración).
            </span>
          </label>
        </div>
      </div>

      {res && (
        <div className="mt-6 space-y-5 border-t border-zinc-200 pt-6">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${COLOR_CATEGORIA[res.categoria]}`}
            >
              {ETIQUETAS_CATEGORIA[res.categoria]}
            </span>
            {res.cambioDeCategoria && (
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-900">
                cambió el 6/3/2026: antes {ETIQUETAS_CATEGORIA[res.actividad.categoriaAntes]} (
                {PISOS[res.actividad.categoriaAntes]}%)
              </span>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Cobertura mínima
              </p>
              <p className="mt-1 text-3xl font-bold text-zinc-900">{res.piso}%</p>
              <p className="mt-1 text-xs text-zinc-600">
                {res.piso === 0
                  ? "La ley no le fija piso a esta actividad."
                  : "De la prestación normal del servicio."}
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Mínimo de guardia
              </p>
              <p className="mt-1 text-3xl font-bold text-zinc-900">{res.minimoDeGuardia}</p>
              <p className="mt-1 text-xs text-zinc-600">
                Trabajadores sobre los {Number(dotacion) || 0} afectados, redondeando hacia arriba.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                Pueden adherir
              </p>
              <p className="mt-1 text-3xl font-bold text-zinc-900">{res.puedenAdherir}</p>
              <p className="mt-1 text-xs text-zinc-600">Sin perforar el piso de cobertura.</p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-800">
              Cronograma del procedimiento
            </h3>
            <p className="mt-1 text-xs text-zinc-500">
              La columna «corridos» es la lectura literal del artículo 11; la de «hábiles» es la
              cuenta de la práctica administrativa. La ley escribe «quince días» sin calificarlos.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full min-w-[34rem] text-sm">
                <thead>
                  <tr className="border-b border-zinc-300 text-left">
                    <th className="py-2 pr-3 font-medium text-zinc-600">Hito</th>
                    <th className="py-2 px-3 font-medium text-zinc-600">Si son corridos</th>
                    <th className="py-2 pl-3 font-medium text-zinc-600">Si son hábiles</th>
                  </tr>
                </thead>
                <tbody>
                  {res.cronograma.map((h) => (
                    <tr key={h.titulo} className="border-b border-zinc-200 align-top">
                      <td className="py-2 pr-3">
                        <span className="font-medium text-zinc-800">{h.titulo}</span>
                        <span className="block text-xs text-zinc-500">{h.norma}</span>
                      </td>
                      <td className="py-2 px-3 text-zinc-900">{fechaLarga(h.fechaCorridos)}</td>
                      <td className="py-2 pl-3 text-zinc-700">
                        {h.fechaHabiles ? fechaLarga(h.fechaHabiles) : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {res.habilesIncompleto && (
              <p className="mt-2 text-xs text-amber-800">
                El calendario de feriados todavía no está publicado para todo ese período, así que
                la columna de días hábiles queda vacía. La cuenta de días corridos no depende del
                calendario.
              </p>
            )}
          </div>

          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Qué cambió para esta actividad el 6 de marzo de 2026
            </p>
            <p className="mt-1 text-sm text-zinc-600">{res.actividad.cambio}</p>
          </div>

          <div className="space-y-2">
            {res.avisos.map((a) => (
              <p
                key={a.texto}
                className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}
              >
                {a.texto}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
