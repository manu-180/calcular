"use client";

import { useMemo, useState } from "react";
import { APLICACION, INSTANCIAS } from "@/data/caducidad-instancia";
import { calcularCaducidad } from "@/lib/caducidad-instancia";

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

export function CalculadoraCaducidadInstancia() {
  const [instanciaId, setInstanciaId] = useState("primera");
  const [impulso, setImpulso] = useState("2026-03-10");

  const hoyISO = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const res = useMemo(
    () => calcularCaducidad({ instanciaId, ultimoImpulsoISO: impulso, hoyISO }),
    [instanciaId, impulso, hoyISO],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="instancia" className="block text-sm font-semibold text-zinc-800">
            Instancia o tipo de proceso
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">Los tres incisos del artículo 46.</p>
          <select
            id="instancia"
            value={instanciaId}
            onChange={(e) => setInstanciaId(e.target.value)}
            className={claseInput}
          >
            {INSTANCIAS.map((i) => (
              <option key={i.id} value={i.id}>
                {i.etiqueta} — {i.meses} {i.meses === 1 ? "mes" : "meses"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="impulso" className="block text-sm font-semibold text-zinc-800">
            Último acto que instó el curso del proceso
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Desde ahí corre el plazo, sin intimación previa.
          </p>
          <input
            id="impulso"
            type="date"
            value={impulso}
            onChange={(e) => setImpulso(e.target.value)}
            className={claseInput}
          />
        </div>
      </div>

      {res && (
        <div className="mt-6 space-y-5 border-t border-zinc-200 pt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-rose-700">
                Se cumple el plazo
              </p>
              <p className="mt-1 text-2xl font-bold text-zinc-900">
                {fechaLarga(res.desdeElActo)}
              </p>
              <p className="mt-1 text-xs text-zinc-600">
                {res.instancia.meses} {res.instancia.meses === 1 ? "mes" : "meses"} desde el acto
                declarado (inciso {res.instancia.inciso} del art. 46).
              </p>
              {res.diasHastaLaMasTemprana !== null && (
                <p className="mt-2 text-sm font-semibold text-rose-900">
                  {res.diasHastaLaMasTemprana >= 0
                    ? `Faltan ${res.diasHastaLaMasTemprana} días.`
                    : `El plazo se cumplió hace ${Math.abs(res.diasHastaLaMasTemprana)} días.`}
                </p>
              )}
            </div>

            {res.desdeLaVigencia ? (
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-amber-800">
                  Si se cuenta desde la aplicación de la reforma
                </p>
                <p className="mt-1 text-2xl font-bold text-zinc-900">
                  {fechaLarga(res.desdeLaVigencia)}
                </p>
                <p className="mt-1 text-xs text-zinc-600">
                  Los mismos {res.instancia.meses}{" "}
                  {res.instancia.meses === 1 ? "mes" : "meses"}, pero contados desde el{" "}
                  {APLICACION}. La ley fija la aplicación a los procesos en trámite y no fija este
                  punto de partida: son dos lecturas, no una regla y un error.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Una sola cuenta
                </p>
                <p className="mt-1 text-sm text-zinc-700">
                  El acto que declaraste es posterior al {APLICACION}, así que no hay discusión
                  sobre el punto de partida: el plazo corre desde ese acto.
                </p>
              </div>
            )}
          </div>

          <p className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600">
            {res.instancia.detalle}
          </p>

          <div className="space-y-2">
            {res.avisos.map((a) => (
              <p key={a.texto} className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}>
                {a.texto}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
