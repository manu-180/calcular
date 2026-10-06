"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ESCALA_VIGENTE,
  JORNADA,
  VIGENCIA,
  ZONA_DESFAVORABLE,
} from "@/data/casas-particulares";
import { calcularCasasParticulares, categoriaPorId, type Modalidad } from "@/lib/casas-particulares";
import { formatARS } from "@/lib/formato";
import { OfertaPlanilla } from "@/components/OfertaPlanilla";
import { hojaCasas } from "@/components/oferta/hojas";
import { prefill } from "@/lib/prefill/casas";
import { olvidarDatosCompra, recordarDatosCompra } from "@/lib/prefill/cliente";
import type { DatosOferta } from "@/lib/oferta";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

export function CalculadoraCasasParticulares({ oferta }: { oferta?: DatosOferta }) {
  const [categoriaId, setCategoriaId] = useState("tareas-generales");
  const [modalidad, setModalidad] = useState<Modalidad>("con-retiro");
  const [horasSemanales, setHorasSemanales] = useState(24);
  const [zona, setZona] = useState(false);
  const [extrasComunes, setExtrasComunes] = useState("");
  const [extrasFinde, setExtrasFinde] = useState("");
  const [tocado, setTocado] = useState(false);

  const categoria = categoriaPorId(categoriaId);
  const soloSinRetiro = categoria?.horaConRetiro === null;
  const modalidadEfectiva: Modalidad = soloSinRetiro ? "sin-retiro" : modalidad;

  const res = useMemo(
    () =>
      calcularCasasParticulares({
        categoriaId,
        modalidad: modalidadEfectiva,
        horasSemanales,
        zonaDesfavorable: zona,
        horasExtrasComunes: Number(extrasComunes) || 0,
        horasExtrasFinDeSemana: Number(extrasFinde) || 0,
      }),
    [categoriaId, modalidadEfectiva, horasSemanales, zona, extrasComunes, extrasFinde],
  );

  // Lo mismo que se ve acá viaja con la compra y se escribe en la planilla que se descarga. El mes
  // es el de la escala que esta página liquida (el vigente al build).
  const datosCompra = useMemo(
    () =>
      res
        ? prefill.validar({
            mesId: VIGENCIA.mesId,
            categoriaId,
            modalidad: modalidadEfectiva,
            horasSemanales,
            zonaDesfavorable: zona,
            extrasComunes: Number(extrasComunes) || 0,
            extrasFinDeSemana: Number(extrasFinde) || 0,
          })
        : null,
    [res, categoriaId, modalidadEfectiva, horasSemanales, zona, extrasComunes, extrasFinde],
  );
  // Sólo después de que la persona tocó algo: los valores por defecto no son «tus datos», y la
  // compra no tiene por qué salir con ellos. Un caso que la planilla no aceptaría borra el anterior.
  useEffect(() => {
    if (!tocado) return;
    if (datosCompra) recordarDatosCompra("planilla-casas-particulares", datosCompra);
    else olvidarDatosCompra("planilla-casas-particulares");
  }, [tocado, datosCompra]);
  const previa = useMemo(
    () => (oferta && datosCompra ? hojaCasas(oferta.archivo, datosCompra) : null),
    [oferta, datosCompra],
  );

  return (
    <div className="space-y-6">
      <div onChange={() => setTocado(true)} className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="cat" className="block text-sm font-semibold text-zinc-800">
              ¿Qué tareas hace?
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              Si hace tareas de más de una categoría, corresponde la principal que desempeñe con
              habitualidad.
            </p>
            <select
              id="cat"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            >
              {ESCALA_VIGENTE.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
            {categoria && <p className="mt-2 text-xs text-zinc-500">{categoria.tareas}</p>}
          </div>

          <div>
            <span className="block text-sm font-semibold text-zinc-800">Modalidad</span>
            <p className="mt-0.5 text-xs text-zinc-500">
              «Sin retiro» es cuando vive en la casa donde trabaja.
            </p>
            <div className="mt-2 flex gap-2">
              {(["con-retiro", "sin-retiro"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  disabled={soloSinRetiro && m === "con-retiro"}
                  onClick={() => {
                    setModalidad(m);
                    setTocado(true);
                  }}
                  className={`flex-1 rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                    modalidadEfectiva === m
                      ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                      : "border-zinc-300 bg-white text-zinc-600 hover:border-zinc-400"
                  } ${soloSinRetiro && m === "con-retiro" ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  {m === "con-retiro" ? "Con retiro" : "Sin retiro"}
                </button>
              ))}
            </div>
            {soloSinRetiro && (
              <p className="mt-1.5 text-xs text-amber-700">
                La categoría de caseros existe sólo sin retiro: por definición vive en la vivienda que
                cuida.
              </p>
            )}
          </div>

          <div>
            <label htmlFor="hs" className="block text-sm font-semibold text-zinc-800">
              Horas por semana: <span className="font-bold text-emerald-700">{horasSemanales}</span>
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              La jornada máxima son {JORNADA.horasSemanales} horas semanales y{" "}
              {JORNADA.horasDiarias} diarias (art. 14).
            </p>
            <input
              id="hs"
              type="range"
              min={1}
              max={JORNADA.horasSemanales}
              value={horasSemanales}
              onChange={(e) => setHorasSemanales(Number(e.target.value))}
              className="mt-3 w-full accent-emerald-600"
            />
            <div className="flex justify-between text-xs text-zinc-400">
              <span>1 h</span>
              <span>{JORNADA.horasSemanales} h (jornada completa)</span>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3">
              <input
                type="checkbox"
                checked={zona}
                onChange={(e) => setZona(e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-emerald-600"
              />
              <span className="text-sm text-zinc-700">
                <strong className="text-zinc-900">Trabaja en zona desfavorable</strong>{" "}
                <span className="text-zinc-500">
                  ({ZONA_DESFAVORABLE.provincias.join(", ")} o el partido de{" "}
                  {ZONA_DESFAVORABLE.partidoBonaerense}): suma {ZONA_DESFAVORABLE.porcentaje}%.
                </span>
              </span>
            </label>
          </div>

          <div>
            <label htmlFor="ex1" className="block text-sm font-semibold text-zinc-800">
              Horas extras del mes <span className="font-normal text-zinc-400">(día común)</span>
            </label>
            <input
              id="ex1"
              inputMode="numeric"
              placeholder="0"
              value={extrasComunes}
              onChange={(e) => setExtrasComunes(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label htmlFor="ex2" className="block text-sm font-semibold text-zinc-800">
              Horas extras <span className="font-normal text-zinc-400">(sáb. 13h+, dom. o feriado)</span>
            </label>
            <input
              id="ex2"
              inputMode="numeric"
              placeholder="0"
              value={extrasFinde}
              onChange={(e) => setExtrasFinde(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        {res && (
          <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-sm text-zinc-600">
              Mínimo legal del mes · {VIGENCIA.vigenteEn}
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
              {formatARS(res.total, 0)}
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              {res.categoria.nombre} · {res.modalidad === "con-retiro" ? "con retiro" : "sin retiro"} ·{" "}
              {horasSemanales} h por semana
            </p>

            <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                <dt className="text-zinc-600">Valor hora</dt>
                <dd className="font-medium text-zinc-900">{formatARS(res.valorHora, 2)}</dd>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                <dt className="text-zinc-600">Horas del mes</dt>
                <dd className="font-medium text-zinc-900">{res.horasMensuales.toFixed(1)} h</dd>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                <dt className="text-zinc-600">Por las horas trabajadas</dt>
                <dd className="font-medium text-zinc-900">{formatARS(res.porHoras, 0)}</dd>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                <dt className="text-zinc-600">Mínimo mensual (jornada completa)</dt>
                <dd className="font-medium text-zinc-900">{formatARS(res.minimoMensual, 0)}</dd>
              </div>
              {res.extrasComunes > 0 && (
                <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                  <dt className="text-zinc-600">Extras al 50%</dt>
                  <dd className="font-medium text-zinc-900">{formatARS(res.extrasComunes, 0)}</dd>
                </div>
              )}
              {res.extrasFinDeSemana > 0 && (
                <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                  <dt className="text-zinc-600">Extras al 100%</dt>
                  <dd className="font-medium text-zinc-900">{formatARS(res.extrasFinDeSemana, 0)}</dd>
                </div>
              )}
              {res.adicionalZona > 0 && (
                <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                  <dt className="text-zinc-600">Incluye zona desfavorable</dt>
                  <dd className="font-medium text-emerald-700">+{formatARS(res.adicionalZona, 0)}</dd>
                </div>
              )}
              <div className="flex justify-between border-b border-zinc-200 pb-1.5 sm:col-span-2">
                <dt className="text-zinc-600">Aguinaldo que genera este mes (si es el mayor del semestre)</dt>
                <dd className="font-semibold text-zinc-900">{formatARS(res.aguinaldoEstimado, 0)}</dd>
              </div>
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
              Escala oficial de la {VIGENCIA.resolucion} ({VIGENCIA.boletinOficial}), vigente desde{" "}
              {VIGENCIA.desde}. Las horas mensuales salen de multiplicar las semanales por 52/12, el
              promedio real de semanas por mes.
            </p>
          </div>
        )}
      </div>

      {oferta && previa && (
        <OfertaPlanilla
          producto={oferta}
          desde="empleada-domestica"
          hoja={previa.hoja}
          titulo="El sueldo, el recibo y lo de ARCA, en una planilla"
          bajada={
            <>
              Además de los {formatARS(previa.resumen.bruto, 0)} de sueldo, este mes le pagás{" "}
              <strong className="font-semibold text-zinc-800">{formatARS(previa.resumen.arca, 0)} a ARCA</strong>: el
              costo total es de {formatARS(previa.resumen.costo, 0)}. La planilla te llega con este caso ya cargado
              y te arma el recibo para firmar.
            </>
          }
          incluye={[
            {
              titulo: "Recibo de sueldo listo para imprimir",
              texto: "Se completa solo con el mes liquidado. Lo imprimís por duplicado y cada parte firma su copia.",
            },
            {
              titulo: "Lo que le pagás a ARCA, cada mes",
              texto:
                previa.resumen.faltaObraSocial > 0
                  ? `Aportes, contribuciones y ART según sus horas. Con menos de 16 por semana, también cuánto falta para que tenga obra social (en este caso, ${formatARS(previa.resumen.faltaObraSocial, 0)}).`
                  : "Aportes, contribuciones y ART según las horas que trabaja, y el costo total del mes.",
            },
            {
              titulo: "Aguinaldo y vacaciones del año",
              texto: "Anotás lo que pagaste cada mes y te calcula el aguinaldo de junio y diciembre y los días de vacaciones.",
            },
          ]}
        />
      )}
    </div>
  );
}
