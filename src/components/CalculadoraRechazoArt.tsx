"use client";

import { useMemo, useState } from "react";
import { CAUSALES_RECHAZO } from "@/data/rechazo-art";
import {
  calcularRechazoArt,
  type AdondeVa,
  type CausalId,
  type Entrada,
  type Veredicto,
} from "@/lib/rechazo-art";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50 text-emerald-950",
  atencion: "border-amber-200 bg-amber-50 text-amber-950",
  bloqueante: "border-rose-200 bg-rose-50 text-rose-950",
} as const;

const MARCO: Record<Veredicto, string> = {
  "aceptado-por-silencio": "border-emerald-300 bg-emerald-50/70",
  "rechazo-en-plazo": "border-rose-300 bg-rose-50/70",
  "en-plazo-todavia": "border-amber-300 bg-amber-50/70",
};

const VEREDICTOS: Record<Veredicto, string> = {
  "aceptado-por-silencio": "La contingencia quedó aceptada por silencio",
  "rechazo-en-plazo": "El rechazo fue notificado en plazo",
  "en-plazo-todavia": "La ART todavía está en plazo",
};

const VIAS: Record<AdondeVa, { titulo: string; detalle: string }> = {
  "comision-medica": {
    titulo: "Comisión médica",
    detalle: "Corresponde para los rechazos de los incisos b) y c), con patrocinio letrado.",
  },
  "autoridad-competente": {
    titulo: "Autoridad competente",
    detalle: "La existencia de la relación laboral debe resolverse antes y no tramita ante comisión médica.",
  },
  "sin-encuadre": {
    titulo: "Sin encuadre en las causales legales",
    detalle: "El art. 6º sólo permite fundar el rechazo en sus incisos a), b) y c).",
  },
};

function hoyLocal(fecha: Date): string {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const dia = String(fecha.getDate()).padStart(2, "0");
  return anio + "-" + mes + "-" + dia;
}

function mostrarFecha(fecha: string): string {
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(fecha + "T00:00:00Z"));
}

export function CalculadoraRechazoArt() {
  const [fechaDenuncia, setFechaDenuncia] = useState("");
  const [prorrogaNotificada, setProrrogaNotificada] = useState(false);
  const [fechaProrroga, setFechaProrroga] = useState("");
  const [rechazoNotificado, setRechazoNotificado] = useState(false);
  const [fechaRechazo, setFechaRechazo] = useState("");
  const [causal, setCausal] = useState<CausalId>("c");
  const [empleadorReconoceRelacion, setEmpleadorReconoceRelacion] = useState(true);
  const hoy = hoyLocal(new Date());

  const entrada: Entrada | null = useMemo(
    () =>
      fechaDenuncia
        ? {
            fechaDenuncia,
            prorrogaNotificada,
            fechaProrroga: fechaProrroga || undefined,
            rechazoNotificado,
            fechaRechazo: fechaRechazo || undefined,
            causal,
            empleadorReconoceRelacion,
            hoy,
          }
        : null,
    [
      causal,
      empleadorReconoceRelacion,
      fechaDenuncia,
      fechaProrroga,
      fechaRechazo,
      hoy,
      prorrogaNotificada,
      rechazoNotificado,
    ],
  );
  const res = useMemo(() => (entrada ? calcularRechazoArt(entrada) : null), [entrada]);

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-zinc-800">
          ¿Cuándo recibió la denuncia la ART?
          <input
            type="date"
            value={fechaDenuncia}
            onChange={(ev) => setFechaDenuncia(ev.target.value)}
            className={claseInput}
          />
          <span className="mt-1.5 block text-xs text-zinc-500">
            El cómputo empieza el día siguiente.
          </span>
        </label>

        <label className="block text-sm font-medium text-zinc-800">
          Causal invocada en el rechazo
          <select
            value={causal}
            onChange={(ev) => setCausal(ev.target.value as CausalId)}
            className={claseInput}
          >
            {CAUSALES_RECHAZO.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id}) {item.titulo}
              </option>
            ))}
            <option value="otra">Otro motivo</option>
          </select>
        </label>
      </div>

      <fieldset className="mt-5 space-y-4">
        <legend className="text-sm font-semibold text-zinc-900">Notificaciones recibidas</legend>

        <label className="flex items-start gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={prorrogaNotificada}
            onChange={(ev) => setProrrogaNotificada(ev.target.checked)}
            className="mt-1"
          />
          <span>
            La ART notificó que usaría la <strong>prórroga</strong>
            <span className="block text-xs text-zinc-500">
              Sólo vale si la cursó dentro de los primeros 10 días hábiles administrativos.
            </span>
          </span>
        </label>

        {prorrogaNotificada && (
          <label className="block max-w-sm pl-6 text-sm font-medium text-zinc-800">
            Fecha de notificación de la prórroga
            <input
              type="date"
              value={fechaProrroga}
              onChange={(ev) => setFechaProrroga(ev.target.value)}
              className={claseInput}
            />
          </label>
        )}

        <label className="flex items-start gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={rechazoNotificado}
            onChange={(ev) => setRechazoNotificado(ev.target.checked)}
            className="mt-1"
          />
          <span>
            La ART notificó <strong>fehacientemente el rechazo</strong>
            <span className="block text-xs text-zinc-500">
              Tiene que haber sido dirigido al trabajador y al empleador.
            </span>
          </span>
        </label>

        {rechazoNotificado && (
          <label className="block max-w-sm pl-6 text-sm font-medium text-zinc-800">
            Fecha en que se cursó el rechazo
            <input
              type="date"
              value={fechaRechazo}
              onChange={(ev) => setFechaRechazo(ev.target.value)}
              className={claseInput}
            />
          </label>
        )}

        <label className="flex items-start gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={empleadorReconoceRelacion}
            onChange={(ev) => setEmpleadorReconoceRelacion(ev.target.checked)}
            className="mt-1"
          />
          <span>
            El empleador <strong>reconoce la relación laboral</strong>
          </span>
        </label>
      </fieldset>

      {!res ? (
        <div className="mt-6 rounded-xl border border-dashed border-zinc-300 bg-zinc-50/60 p-4 text-sm text-zinc-600">
          Ingresá la fecha en que la ART recibió la denuncia para calcular el plazo.
        </div>
      ) : (
        <>
          <div className={"mt-6 rounded-xl border p-4 " + MARCO[res.veredicto]}>
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Resultado</p>
            <p className="mt-0.5 text-lg font-bold text-zinc-900">{VEREDICTOS[res.veredicto]}</p>
            {res.veredicto === "en-plazo-todavia" && (
              <p className="mt-1.5 text-sm text-zinc-700">
                Faltan <strong>{res.habilesRestantes} días hábiles administrativos</strong> según el
                calendario disponible.
              </p>
            )}
          </div>

          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Vencimiento base
              </dt>
              <dd className="mt-1 text-base font-bold text-zinc-900">
                {mostrarFecha(res.vencimientoBase)}
              </dd>
              <p className="mt-1 text-xs text-zinc-500">
                10.º día hábil, inclusive{!res.calendarioCompleto ? " · fecha estimada" : ""}
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Vencimiento final
              </dt>
              <dd className="mt-1 text-base font-bold text-zinc-900">
                {mostrarFecha(res.vencimientoFinal)}
              </dd>
              <p className="mt-1 text-xs text-zinc-500">
                {res.prorrogaValida ? "Con prórroga válida" : "Sin prórroga válida"}
                {!res.calendarioCompleto ? " · fecha estimada" : ""}
              </p>
            </div>
          </dl>

          <div className="mt-3 rounded-xl border border-violet-200 bg-violet-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-violet-700">
              Adónde va el reclamo
            </p>
            <p className="mt-0.5 text-base font-bold text-zinc-900">{VIAS[res.adondeVa].titulo}</p>
            <p className="mt-1 text-sm text-zinc-700">{VIAS[res.adondeVa].detalle}</p>
            {res.exigeFundamento && (
              <p className="mt-2 text-xs font-semibold text-violet-800">
                El rechazo debe estar fundado: art. 6º bis.
              </p>
            )}
          </div>

          <ul className="mt-4 space-y-2">
            {res.avisos.map((aviso, i) => (
              <li
                key={i}
                className={"rounded-lg border px-3 py-2 text-sm leading-relaxed " + TONOS[aviso.tono]}
              >
                {aviso.texto}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
