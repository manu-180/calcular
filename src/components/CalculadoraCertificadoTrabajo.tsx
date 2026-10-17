"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  MULTIPLICADOR_MULTA,
  PLAZO_ENTREGA_DIAS_HABILES,
  VIGENCIA_BASES,
  VIGENCIA_REFORMA,
} from "@/data/certificado-trabajo";
import { calcularCertificado, formatFechaLarga } from "@/lib/certificado-trabajo";
import { formatARS, errorMonto, primerError, parseMonto } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

/** Hasta que el navegador nos diga qué día es, ningún paso se marca como futuro. */
const HOY_DESCONOCIDO = "9999-12-31";

const ROTULO_REGIMEN = {
  vigente: {
    titulo: "Régimen vigente",
    detalle: `art. 80 sustituido por la Ley 27.802 (extinciones desde el ${VIGENCIA_REFORMA})`,
    clase: "border-emerald-200 bg-emerald-50 text-emerald-900",
  },
  transicion: {
    titulo: "Zona gris",
    detalle: `entre el ${VIGENCIA_BASES} y el día anterior al ${VIGENCIA_REFORMA}`,
    clase: "border-amber-200 bg-amber-50 text-amber-900",
  },
  anterior: {
    titulo: "Régimen anterior",
    detalle: `extinciones hasta el 8 de julio de 2024, con la indemnización de ${MULTIPLICADOR_MULTA} remuneraciones`,
    clase: "border-zinc-200 bg-zinc-100 text-zinc-800",
  },
} as const;

export function CalculadoraCertificadoTrabajo() {
  const [fechaExtincion, setFechaExtincion] = useState("2026-06-30");
  const [remuneracion, setRemuneracion] = useState("1200000");
  const [huboRequerimiento, setHuboRequerimiento] = useState(false);
  const [fechaRequerimiento, setFechaRequerimiento] = useState("");
  const [hoy, setHoy] = useState(HOY_DESCONOCIDO);

  useEffect(() => {
    setHoy(new Date().toISOString().slice(0, 10));
  }, []);

  const error = primerError({
    "Mejor remuneración": errorMonto(remuneracion),
  });

  const res = useMemo(
    () =>
      calcularCertificado({
        fechaExtincion,
        mejorRemuneracion: parseMonto(remuneracion),
        fechaRequerimiento: huboRequerimiento ? fechaRequerimiento : undefined,
        hoy,
      }),
    [fechaExtincion, remuneracion, huboRequerimiento, fechaRequerimiento, hoy],
  );

  const rotulo = res ? ROTULO_REGIMEN[res.regimen] : null;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fechaExtincion" className="block text-sm font-semibold text-zinc-800">
            Fecha en que terminó el contrato
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El último día de la relación laboral, sea por despido, renuncia o acuerdo. Es el dato
            que decide qué norma se aplica.
          </p>
          <input
            id="fechaExtincion"
            type="date"
            value={fechaExtincion}
            onChange={(e) => setFechaExtincion(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="remuneracion" className="block text-sm font-semibold text-zinc-800">
            Mejor remuneración mensual, normal y habitual
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La mejor de las mensuales del último año (o del tiempo trabajado, si fue menor). No es
            un promedio.
          </p>
          <input
            id="remuneracion"
            inputMode="numeric"
            value={remuneracion}
            onChange={(e) => setRemuneracion(e.target.value)}
            className={claseInput}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
            <input
              type="checkbox"
              checked={huboRequerimiento}
              onChange={(e) => setHuboRequerimiento(e.target.checked)}
              className="mt-1 h-4 w-4 accent-emerald-600"
            />
            <span className="text-sm text-zinc-700">
              <span className="font-semibold text-zinc-900">
                Le mandé una intimación fehaciente al empleador
              </span>
              <span className="block text-xs text-zinc-500">
                Carta documento o telegrama laboral. Sólo cuenta en los regímenes anteriores al{" "}
                {VIGENCIA_REFORMA}: es lo que hacía nacer la indemnización.
              </span>
            </span>
          </label>

          {huboRequerimiento && (
            <div className="mt-3">
              <label
                htmlFor="fechaRequerimiento"
                className="block text-sm font-semibold text-zinc-800"
              >
                Fecha en que el empleador la recibió
              </label>
              <input
                id="fechaRequerimiento"
                type="date"
                value={fechaRequerimiento}
                onChange={(e) => setFechaRequerimiento(e.target.value)}
                className={claseInput}
              />
            </div>
          )}
        </div>
      </div>

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : !res && (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Cargá una fecha de extinción válida para ver qué régimen se aplica.
        </p>
      )}

      {!error && res && rotulo && (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <span
            className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${rotulo.clase}`}
          >
            {rotulo.titulo} · {rotulo.detalle}
          </span>

          {res.regimen === "vigente" ? (
            <>
              <p className="mt-4 text-sm text-zinc-600">
                Último día para entregarte los certificados ({PLAZO_ENTREGA_DIAS_HABILES} días
                hábiles)
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
                {res.plazoEntrega ? formatFechaLarga(res.plazoEntrega.vence) : "—"}
              </p>
              {res.plazoEntrega && (
                <p className="mt-1 text-sm text-zinc-600">
                  {res.plazoEntrega.diasCorridos} días corridos desde la extinción, salteando{" "}
                  {res.plazoEntrega.salteados.length} día(s) no hábil(es).{" "}
                  <span className="font-medium text-zinc-800">
                    No hay multa con importe fijado por la ley:
                  </span>{" "}
                  el texto nuevo del artículo 80 no la tiene.
                </p>
              )}
            </>
          ) : (
            <>
              <p className="mt-4 text-sm text-zinc-600">
                Indemnización del párrafo derogado ({MULTIPLICADOR_MULTA} × la mejor remuneración)
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
                {formatARS(res.montoIndemnizacion, 2)}
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                {res.procedencia === "discutida"
                  ? "Importe de referencia: para esta fecha de extinción, que la sanción siga vigente está discutido en tribunales."
                  : "Para esta fecha de extinción regía el párrafo que agregó el art. 45 de la Ley 25.345, con los requisitos de intimación del cronograma."}
              </p>
            </>
          )}

          <ol className="mt-5 space-y-3">
            {res.cronograma.map((p, i) => (
              <li
                key={`${p.fecha}-${i}`}
                className={`rounded-lg border p-3 ${
                  p.futuro ? "border-zinc-200 bg-white" : "border-zinc-300 bg-zinc-100/70"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <span className="text-sm font-semibold text-zinc-900">{p.titulo}</span>
                  <span className="text-xs font-medium text-zinc-500">
                    {formatFechaLarga(p.fecha)}
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-600">{p.detalle}</p>
                <p className="mt-1 text-[11px] uppercase tracking-wide text-zinc-400">{p.norma}</p>
              </li>
            ))}
          </ol>

          {res.plazoEntrega && res.plazoEntrega.salteados.length > 0 && (
            <details className="ca-acordeon mt-4 rounded-lg border border-zinc-200 bg-white p-3">
              <summary className="cursor-pointer text-sm font-semibold text-zinc-800">
                Los {res.plazoEntrega.salteados.length} días que el plazo salteó
              </summary>
              <ul className="mt-2 grid gap-1 text-xs text-zinc-600 sm:grid-cols-2">
                {res.plazoEntrega.salteados.map((d) => (
                  <li key={d.fecha}>
                    <span className="font-medium text-zinc-800">
                      {formatFechaLarga(d.fecha, false)}
                    </span>{" "}
                    — {d.motivo}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-zinc-500">
                Sólo feriados nacionales y días no laborables de la Ley 27.399. Si en tu provincia
                hubo un feriado local dentro del tramo, el vencimiento se corre un día más.
              </p>
            </details>
          )}

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
            Orientativo, no es asesoramiento legal ni una liquidación. Si lo que estás calculando es
            un despido completo, está{" "}
            <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
              la calculadora de indemnización
            </Link>
            , y para actualizar un crédito laboral ya reconocido,{" "}
            <Link
              href="/actualizacion-creditos-laborales"
              className="font-medium text-emerald-700 hover:underline"
            >
              la de actualización de créditos
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
