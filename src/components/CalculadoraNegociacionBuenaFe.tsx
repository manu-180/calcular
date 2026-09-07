"use client";

import { useMemo, useState } from "react";
import { REGLAS } from "@/data/negociacion-buena-fe";
import { formatARS } from "@/lib/formato";
import { calcularMulta, calcularPlazos } from "@/lib/negociacion-buena-fe";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

function fechaLarga(iso: string): string {
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1, d)).toLocaleDateString("es-AR", {
    timeZone: "UTC",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function CalculadoraNegociacionBuenaFe() {
  const [masa, setMasa] = useState("12000000");
  const [mora, setMora] = useState("0");
  const [reincidencia, setReincidencia] = useState(false);
  const [ceso, setCeso] = useState(false);
  const [notificacion, setNotificacion] = useState("2026-09-01");
  const [solicitud, setSolicitud] = useState("");

  const multa = useMemo(
    () =>
      calcularMulta({
        masaSalarial: Number(masa) || 0,
        diasDeMora: Number(mora) || 0,
        reincidencia,
        cesoEnDiez: ceso,
      }),
    [masa, mora, reincidencia, ceso],
  );

  const plazos = useMemo(
    () =>
      calcularPlazos({
        fechaNotificacionISO: notificacion,
        fechaSolicitudHomologacionISO: solicitud || undefined,
      }),
    [notificacion, solicitud],
  );

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
        <h3 className="text-base font-bold text-zinc-900">
          El techo de la multa por no negociar de buena fe
        </h3>
        <p className="mt-1 text-sm text-zinc-600">
          Art. 4° inciso e) de la Ley 23.546, en la redacción del art. 149 de la Ley 27.802.
        </p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="masa" className="block text-sm font-semibold text-zinc-800">
              Masa salarial del mes del hecho
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              Sólo la de los trabajadores comprendidos en el ámbito personal de la negociación.
            </p>
            <input
              id="masa"
              type="number"
              min={0}
              inputMode="numeric"
              value={masa}
              onChange={(e) => setMasa(e.target.value)}
              className={claseInput}
            />
          </div>

          <div>
            <label htmlFor="mora" className="block text-sm font-semibold text-zinc-800">
              Días de mora en acatar la decisión judicial
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              El importe sube {REGLAS.incrementoPorcentaje}% por cada {REGLAS.incrementoCadaDias}{" "}
              días completos.
            </p>
            <input
              id="mora"
              type="number"
              min={0}
              inputMode="numeric"
              value={mora}
              onChange={(e) => setMora(e.target.value)}
              className={claseInput}
            />
          </div>

          <label className="flex items-start gap-3 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={reincidencia}
              onChange={(e) => setReincidencia(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>
              Hay reincidencia (el máximo puede elevarse al{" "}
              {REGLAS.topeReincidenciaPorcentaje}%)
            </span>
          </label>

          <label className="flex items-start gap-3 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={ceso}
              onChange={(e) => setCeso(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
            />
            <span>
              Los actos cesaron dentro de los {REGLAS.diasParaEliminar} días que fija la sentencia
            </span>
          </label>
        </div>

        {multa && (
          <div className="mt-6 space-y-5 border-t border-zinc-200 pt-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Techo del inciso
                </p>
                <p className="mt-1 text-2xl font-bold text-zinc-900">
                  {formatARS(multa.topeImporte, 0)}
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  {multa.topePorcentaje}% de la masa salarial del mes.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Con mora, lectura simple
                </p>
                <p className="mt-1 text-2xl font-bold text-zinc-900">
                  {formatARS(multa.conMoraSimple, 0)}
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  {multa.bloquesDeMora} bloque(s) de {REGLAS.incrementoCadaDias} días, siempre sobre
                  el importe original.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Con mora, lectura compuesta
                </p>
                <p className="mt-1 text-2xl font-bold text-zinc-900">
                  {formatARS(multa.conMoraCompuesta, 0)}
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  El mismo {REGLAS.incrementoPorcentaje}%, pero sobre el importe ya incrementado.
                </p>
              </div>
            </div>

            {multa.puedeEliminarse && (
              <p className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">
                Cesados los actos en plazo, el juez puede eliminar la multa: el resultado posible es
                cero.
              </p>
            )}

            <div className="space-y-2">
              {multa.avisos.map((a) => (
                <p key={a.texto} className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}>
                  {a.texto}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
        <h3 className="text-base font-bold text-zinc-900">Los plazos de la negociación</h3>
        <p className="mt-1 text-sm text-zinc-600">
          Todos en días hábiles administrativos: lo manda el art. 8° de la misma ley, que la reforma
          no tocó.
        </p>

        <div className="mt-4 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="notificacion" className="block text-sm font-semibold text-zinc-800">
              Recepción de la notificación del art. 2°
            </label>
            <input
              id="notificacion"
              type="date"
              value={notificacion}
              onChange={(e) => setNotificacion(e.target.value)}
              className={claseInput}
            />
          </div>
          <div>
            <label htmlFor="solicitud" className="block text-sm font-semibold text-zinc-800">
              Recepción de la solicitud de homologación (opcional)
            </label>
            <input
              id="solicitud"
              type="date"
              value={solicitud}
              onChange={(e) => setSolicitud(e.target.value)}
              className={claseInput}
            />
          </div>
        </div>

        {plazos && (
          <div className="mt-5 space-y-3">
            {plazos.plazos.map((p) => (
              <div key={p.titulo} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-sm font-semibold text-zinc-800">
                  {p.titulo}
                  {p.fecha && (
                    <span className="ml-2 font-normal text-emerald-800">{fechaLarga(p.fecha)}</span>
                  )}
                </p>
                <p className="mt-1 text-xs text-zinc-500">{p.norma}</p>
                <p className="mt-1 text-sm text-zinc-600">{p.detalle}</p>
              </div>
            ))}
            {plazos.calendarioIncompleto && (
              <p className="text-xs text-amber-800">
                El calendario de feriados todavía no está publicado para todo ese período, así que
                las fechas en días hábiles no se calculan: la página prefiere no mostrar una fecha
                antes que mostrar una inventada.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
