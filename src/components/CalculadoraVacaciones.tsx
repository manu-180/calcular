"use client";

import { useEffect, useMemo, useState } from "react";
import { calcularVacaciones } from "@/lib/vacaciones";
import { formatARS, parseMonto } from "@/lib/formato";
import { ANIO_VACACIONES } from "@/data/vacaciones";
import type { DatosOferta } from "@/lib/oferta";
import { prefill } from "@/lib/prefill/vacaciones";
import { olvidarDatosCompra, recordarDatosCompra } from "@/lib/prefill/cliente";
import { OfertaVacaciones } from "@/components/vacaciones/OfertaVacaciones";
import { hojaVacaciones } from "@/components/vacaciones/previa";
import {
  cronograma,
  fechaConDia,
  inicioSugerido,
} from "@/components/vacaciones/cronograma";

// La fecha de hoy en la Argentina, para el plazo del aviso. Sólo se usa con un resultado en pantalla
// (después de que la persona cargó algo), así que nunca entra en el HTML del server.
function hoyAR(): string {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/Argentina/Buenos_Aires" });
}

function textoAntiguedad(antiguedad: { anios: number; meses: number }): string {
  const partes: string[] = [];
  if (antiguedad.anios > 0)
    partes.push(`${antiguedad.anios} ${antiguedad.anios === 1 ? "año" : "años"}`);
  if (antiguedad.meses > 0)
    partes.push(`${antiguedad.meses} ${antiguedad.meses === 1 ? "mes" : "meses"}`);
  return partes.length ? partes.join(" y ") : "menos de un mes";
}

export function CalculadoraVacaciones({ oferta }: { oferta?: DatosOferta }) {
  const [sueldoInput, setSueldoInput] = useState("");
  const [inicioISO, setInicioISO] = useState("");
  const [tocado, setTocado] = useState(false);
  const [ingresoISO, setIngresoISO] = useState("");
  const [tomaParcial, setTomaParcial] = useState(false);
  const [diasParcialesInput, setDiasParcialesInput] = useState("");

  const sueldo = useMemo(() => parseMonto(sueldoInput), [sueldoInput]);
  const diasParciales = Number(diasParcialesInput);

  const ingresoFuturo = ingresoISO > `${ANIO_VACACIONES}-12-31`;

  const resultado = useMemo(
    () =>
      sueldo > 0 && ingresoISO && !ingresoFuturo
        ? calcularVacaciones({
            sueldo,
            ingresoISO,
            diasATomar:
              tomaParcial && Number.isFinite(diasParciales) && diasParciales > 0
                ? Math.floor(diasParciales)
                : undefined,
          })
        : null,
    [sueldo, ingresoISO, ingresoFuturo, tomaParcial, diasParciales]
  );

  const inicioOk = /^\d{4}-\d{2}-\d{2}$/.test(inicioISO) && inicioISO >= `${ANIO_VACACIONES}-01-01` && inicioISO <= `${ANIO_VACACIONES + 1}-12-31`;
  const fechas = useMemo(
    () =>
      resultado && resultado.diasTomados > 0 && inicioOk
        ? cronograma({ dias: resultado.dias, diasTramo: resultado.diasTomados, inicioISO, hoyISO: hoyAR() })
        : null,
    [resultado, inicioOk, inicioISO]
  );

  // Lo que se ve acá viaja con la compra y se escribe en la planilla. Sin fecha de inicio cargada,
  // la planilla sale con la primera que todavía se puede avisar a tiempo (y se cambia en la celda).
  const datosCompra = useMemo(() => {
    if (!resultado || resultado.dias === 0) return null;
    return prefill.validar({
      ingresoISO,
      sueldo,
      diasTramo: resultado.diasTomados < resultado.dias ? resultado.diasTomados : 0,
      inicioISO: inicioOk ? inicioISO : inicioSugerido(hoyAR()),
    });
  }, [resultado, ingresoISO, sueldo, inicioOk, inicioISO]);

  // Sólo después de que la persona tocó algo; un caso que la planilla no aceptaría borra el anterior.
  useEffect(() => {
    if (!tocado) return;
    if (datosCompra) recordarDatosCompra("planilla-vacaciones", datosCompra);
    else olvidarDatosCompra("planilla-vacaciones");
  }, [tocado, datosCompra]);

  const previa = useMemo(
    () => (oferta && datosCompra ? hojaVacaciones(oferta.archivo, datosCompra, hoyAR()) : null),
    [oferta, datosCompra]
  );

  return (
    <div className="space-y-6">
      <div onChange={() => setTocado(true)} className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="space-y-5">
          <div>
            <label htmlFor="sueldo-mensual" className="block text-sm font-semibold text-zinc-800">
              ¿Cuál es tu sueldo bruto mensual?
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              El sueldo que percibís al momento de tomarte las vacaciones, en bruto (antes de
              descuentos), incluyendo adicionales habituales.
            </p>
            <div className="relative mt-2">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
                $
              </span>
              <input
                id="sueldo-mensual"
                inputMode="numeric"
                placeholder="Ej: 1.500.000"
                value={sueldoInput}
                onChange={(e) => setSueldoInput(e.target.value)}
                className="w-full rounded-lg border border-zinc-300 py-2.5 pl-7 pr-3 text-lg font-medium text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>

          <div>
            <label htmlFor="fecha-ingreso" className="block text-sm font-semibold text-zinc-800">
              ¿Cuándo entraste a este trabajo?
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              La antigüedad se mide al 31 de diciembre de {ANIO_VACACIONES} y define cuántos días te
              corresponden.
            </p>
            <input
              id="fecha-ingreso"
              type="date"
              value={ingresoISO}
              onChange={(e) => setIngresoISO(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 sm:max-w-xs"
            />
          </div>

          <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={tomaParcial}
              onChange={(e) => setTomaParcial(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-emerald-600"
            />
            <span>
              Me tomo solo una parte
              <span className="block text-xs text-zinc-500">
                Desde 2026 podés fraccionar las vacaciones en tramos de al menos 7 días, de común
                acuerdo con tu empleador.
              </span>
            </span>
          </label>

          {tomaParcial && (
            <div>
              <label htmlFor="dias-a-tomar" className="block text-sm font-semibold text-zinc-800">
                ¿Cuántos días te tomás?
              </label>
              <input
                id="dias-a-tomar"
                type="number"
                min={1}
                inputMode="numeric"
                placeholder="Ej: 7"
                value={diasParcialesInput}
                onChange={(e) => setDiasParcialesInput(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 sm:max-w-xs"
              />
            </div>
          )}

          <div>
            <label htmlFor="fecha-inicio" className="block text-sm font-semibold text-zinc-800">
              ¿Cuándo empiezan? <span className="font-normal text-zinc-500">(opcional)</span>
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              Con la fecha de inicio te decimos hasta qué día son, cuándo se vuelve a trabajar y hasta cuándo tiene que
              llegar el aviso por escrito.
            </p>
            <input
              id="fecha-inicio"
              type="date"
              value={inicioISO}
              onChange={(e) => setInicioISO(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 sm:max-w-xs"
            />
          </div>
        </div>

        {ingresoFuturo && (
          <div className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
            <p className="font-semibold">La fecha de ingreso es posterior a {ANIO_VACACIONES}</p>
            <p className="mt-1">
              Esta calculadora estima las vacaciones que corresponden por el año{" "}
              {ANIO_VACACIONES}. Revisá la fecha de ingreso.
            </p>
          </div>
        )}

        {resultado && (
          <div className="mt-6 border-t border-zinc-100 pt-5" aria-live="polite">
            {resultado.dias === 0 ? (
              <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-900">
                <p className="font-semibold">Todavía no llegás a un día completo de vacaciones</p>
                <p className="mt-1">
                  Como entraste hace poco, te corresponde 1 día de descanso por cada 20 días de
                  trabajo efectivo (art. 153 LCT). Con
                  {" "}{resultado.diasHabilesTrabajados ?? 0} días hábiles estimados hasta el 31/12,
                  aún no se completa el primer día. Sumás el primero a los 20 días de trabajo.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-zinc-500">Te corresponden</p>
                    <p className="text-3xl font-bold text-emerald-700 sm:text-4xl">
                      {resultado.dias} días corridos
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      Antigüedad al 31/12/{ANIO_VACACIONES}: {textoAntiguedad(resultado.antiguedad)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-zinc-500">
                      Cobrás por {resultado.diasTomados === resultado.dias ? "esos" : "los"}{" "}
                      {resultado.diasTomados} días
                    </p>
                    <p className="text-2xl font-bold text-zinc-900 sm:text-3xl">
                      {formatARS(resultado.retribucion, 0)}
                    </p>
                    <p className="mt-1 text-xs font-medium text-emerald-700">
                      +{formatARS(resultado.plus, 0)} de plus vacacional
                    </p>
                  </div>
                </div>

                {resultado.modo === "proporcional" && (
                  <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">
                    Como entraste durante {ANIO_VACACIONES} y no llegás a medio año trabajado, te
                    corresponde 1 día de descanso por cada 20 de trabajo efectivo (art. 153 LCT):
                    estimamos {resultado.diasHabilesTrabajados} días hábiles hasta el 31/12 →{" "}
                    {resultado.dias} {resultado.dias === 1 ? "día" : "días"} de vacaciones.
                  </p>
                )}

                {fechas && <FechasVacaciones fechas={fechas} />}

                <dl className="space-y-1.5 rounded-lg bg-zinc-50 p-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-zinc-600">Valor del día de vacaciones (sueldo ÷ 25)</dt>
                    <dd className="font-medium text-zinc-900">
                      {formatARS(resultado.valorDiaVacaciones)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-zinc-600">Valor del día trabajado (sueldo ÷ 30)</dt>
                    <dd className="font-medium text-zinc-900">
                      {formatARS(resultado.valorDiaNormal)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-zinc-600">Días que cobrás</dt>
                    <dd className="font-medium text-zinc-900">{resultado.diasTomados}</dd>
                  </div>
                  <div className="flex justify-between border-t border-zinc-200 pt-1.5">
                    <dt className="font-semibold text-zinc-800">Retribución bruta</dt>
                    <dd className="font-semibold text-zinc-900">
                      {formatARS(resultado.retribucion)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-zinc-600">Plus vacacional incluido</dt>
                    <dd className="font-medium text-emerald-700">+{formatARS(resultado.plus)}</dd>
                  </div>
                </dl>

                <p className="text-xs text-zinc-400">
                  La retribución de las vacaciones se paga antes de que empieces a gozarlas (art.
                  155 LCT) y es bruta: tiene los mismos descuentos que un sueldo normal. El cálculo
                  aplica a trabajos con sueldo mensual; con remuneraciones variables se usa el
                  promedio (art. 155 inc. c).
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {previa && oferta && <OfertaVacaciones producto={oferta} previa={previa} />}
    </div>
  );
}

function FechasVacaciones({ fechas }: { fechas: ReturnType<typeof cronograma> }) {
  const e = fechas.estado;
  if (e.tipo === "no-es-lunes") {
    const propuesta = e.sugerido;
    return (
      <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
        <span className="font-semibold">Las vacaciones empiezan un lunes</span> (o el día hábil siguiente, si ese lunes es
        feriado), salvo que se trabaje en días inhábiles (art. 151 LCT). La fecha más cercana después de la que elegiste es
        el {fechaConDia(propuesta)}.
      </p>
    );
  }
  const filas: [string, string][] = [
    ["Desde", fechaConDia(fechas.inicio)],
    ["Hasta", fechaConDia(fechas.fin)],
    ["Vuelta al trabajo", fechaConDia(fechas.vuelve)],
    ["Aviso por escrito, hasta el", fechaConDia(fechas.avisarAntesDe)],
  ];
  const aviso =
    e.tipo === "tramo-corto"
      ? "Si se parten, cada tramo tiene que ser de 7 días o más (art. 154 LCT)."
      : e.tipo === "fuera-de-periodo"
        ? "Esas fechas quedan fuera del período del 1 de octubre al 30 de abril: se pueden tomar, pero sólo de común acuerdo (art. 154 LCT)."
        : e.tipo === "aviso-vencido"
          ? "Ya pasó el plazo de 30 días para avisar. Se pueden tomar igual si las dos partes están de acuerdo con la fecha."
          : null;
  return (
    <div className="rounded-lg border border-zinc-200 p-4 text-sm">
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5">
        {filas.map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs text-zinc-500">{k}</dt>
            <dd className="font-medium text-zinc-900 first-letter:uppercase">{v}</dd>
          </div>
        ))}
      </dl>
      {aviso && <p className="mt-3 rounded-md bg-amber-50 px-3 py-2 text-amber-900">{aviso}</p>}
    </div>
  );
}
