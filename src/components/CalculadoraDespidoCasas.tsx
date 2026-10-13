"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  PRUEBA_DIAS_ANTERIOR_CON_RETIRO,
  PRUEBA_DIAS_ANTERIOR_SIN_RETIRO,
  PRUEBA_MESES_VIGENTE,
  PRUEBA_TOPE_MESES_ANTERIOR_CON_RETIRO,
  VIGENCIA_REFORMA,
} from "@/data/despido-casas-particulares";
import { calcularDespidoCasas, type Modalidad } from "@/lib/despido-casas-particulares";
import { formatARS, parseMonto } from "@/lib/formato";
import { OfertaPlanilla } from "@/components/OfertaPlanilla";
import { hojaCasas } from "@/components/oferta/hojas";
import { VIGENCIA as VIGENCIA_CASAS } from "@/data/casas-particulares";
import type { DatosOferta } from "@/lib/oferta";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const numero = (n: number) => n.toLocaleString("es-AR", { maximumFractionDigits: 0 });

export function CalculadoraDespidoCasas({ oferta }: { oferta?: DatosOferta }) {
  const [sueldo, setSueldo] = useState("450.000");
  const [ingreso, setIngreso] = useState("2026-03-10");
  const [egreso, setEgreso] = useState("2026-08-14");
  const [modalidad, setModalidad] = useState<Modalidad>("con-retiro");

  const res = useMemo(
    () =>
      calcularDespidoCasas({
        sueldoMensual: parseMonto(sueldo),
        ingresoISO: ingreso,
        egresoISO: egreso,
        modalidad,
      }),
    [sueldo, ingreso, egreso, modalidad],
  );

  // El despido no pide categoría ni horas, que es lo que necesita la planilla: la previa es un
  // ejemplo con la modalidad que eligió, y lo dice. Sin datos de compra: no serían los suyos.
  const previa = useMemo(
    () =>
      oferta
        ? hojaCasas(oferta.archivo, {
            mesId: VIGENCIA_CASAS.mesId,
            categoriaId: "tareas-generales",
            modalidad,
            horasSemanales: 20,
            zonaDesfavorable: false,
            extrasComunes: 0,
            extrasFinDeSemana: 0,
          })
        : null,
    [oferta, modalidad],
  );

  return (
    <div className="space-y-6">
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="sueldo" className="block text-sm font-semibold text-zinc-800">
            Remuneración mensual
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La mejor remuneración mensual, normal y habitual del último año (art. 48). Si hubo
            aumentos, va la más alta, no la última.
          </p>
          <input
            id="sueldo"
            inputMode="numeric"
            value={sueldo}
            onChange={(e) => setSueldo(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="ingreso" className="block text-sm font-semibold text-zinc-800">
            Fecha de ingreso
          </label>
          <input
            id="ingreso"
            type="date"
            value={ingreso}
            onChange={(e) => setIngreso(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="egreso" className="block text-sm font-semibold text-zinc-800">
            Último día de trabajo
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Decide qué texto del art. 7 se aplica: la reforma rige desde el {VIGENCIA_REFORMA}.
          </p>
          <input
            id="egreso"
            type="date"
            value={egreso}
            onChange={(e) => setEgreso(e.target.value)}
            className={claseInput}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="modalidad" className="block text-sm font-semibold text-zinc-800">
            Modalidad
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Con el texto vigente da igual: son {PRUEBA_MESES_VIGENTE} meses para las dos. Con el
            anterior cambiaba ({PRUEBA_DIAS_ANTERIOR_SIN_RETIRO} días sin retiro,{" "}
            {PRUEBA_DIAS_ANTERIOR_CON_RETIRO} días de trabajo con tope de{" "}
            {PRUEBA_TOPE_MESES_ANTERIOR_CON_RETIRO} meses con retiro), y por eso se pregunta.
          </p>
          <select
            id="modalidad"
            value={modalidad}
            onChange={(e) => setModalidad(e.target.value as Modalidad)}
            className={claseInput}
          >
            <option value="con-retiro">Con retiro (se va a dormir a su casa)</option>
            <option value="sin-retiro">Sin retiro (vive en la casa donde trabaja)</option>
          </select>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
        <p className="text-sm text-zinc-600">
          Liquidación final bruta, con {numero(res.mesesTrabajados)}{" "}
          {res.mesesTrabajados === 1 ? "mes" : "meses"} de antigüedad (
          {numero(res.diasTrabajadosTotales)} días)
        </p>
        <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
          {formatARS(res.totalACobrar, 2)}
        </p>
        <p className="mt-1 text-sm text-zinc-600">
          {res.dentroDePrueba !== res.dentroDePruebaOtroTexto ? (
            <>
              Con el otro texto del art. 7 este mismo caso cerraría en{" "}
              {formatARS(res.totalOtroTexto, 2)}, una diferencia de{" "}
              <strong>{formatARS(res.diferencia, 2)}</strong>. Se aplica el que corresponde a la
              fecha de egreso: la reforma no es retroactiva.
            </>
          ) : (
            <>
              Los dos textos del art. 7 dan el mismo resultado en este caso:{" "}
              {res.dentroDePrueba
                ? "el contrato terminó dentro del período de prueba en las dos versiones."
                : "el contrato ya estaba fuera del período de prueba en las dos versiones."}
            </>
          )}
        </p>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[34rem] text-sm">
            <tbody>
              <tr className="border-b border-zinc-200 align-top">
                <td className="py-2 pr-3">
                  <span className="font-medium text-zinc-800">
                    Días trabajados del último mes ({numero(res.diasDelMes)})
                  </span>
                  <span className="block text-xs text-zinc-500">
                    a razón de {formatARS(res.valorDia, 2)} por día. Es salario, se paga siempre.
                  </span>
                </td>
                <td className="py-2 text-right font-semibold text-zinc-900">
                  {formatARS(res.sueldoDelMes, 2)}
                </td>
              </tr>
              <tr className="border-b border-zinc-200 align-top">
                <td className="py-2 pr-3">
                  <span className="font-medium text-zinc-800">Aguinaldo proporcional (art. 28)</span>
                  <span className="block text-xs text-zinc-500">
                    {numero(res.sac.diasTrabajadosSemestre)} de los {numero(res.sac.diasSemestre)}{" "}
                    días del semestre. Se paga «por cualquier causa», también en período de prueba.
                  </span>
                </td>
                <td className="py-2 text-right font-semibold text-zinc-900">
                  {formatARS(res.sac.importe, 2)}
                </td>
              </tr>
              <tr className="border-b border-zinc-200 align-top">
                <td className="py-2 pr-3">
                  <span className="font-medium text-zinc-800">
                    Vacaciones proporcionales ({numero(res.vacaciones.dias)} días)
                  </span>
                  <span className="block text-xs text-zinc-500">
                    art. 30: un día por cada 20 de trabajo efectivo. Mirá la advertencia de abajo:
                    su fundamento cambió el {VIGENCIA_REFORMA}.
                  </span>
                </td>
                <td className="py-2 text-right font-semibold text-zinc-900">
                  {formatARS(res.vacaciones.importe, 2)}
                </td>
              </tr>
              <tr
                className={`border-b border-zinc-200 align-top ${
                  res.preaviso.corresponde ? "" : "text-rose-800"
                }`}
              >
                <td className="py-2 pr-3">
                  <span className="font-medium">
                    Preaviso de {numero(res.preaviso.dias)} días (art. 42 inc. b)
                  </span>
                  <span className="block text-xs opacity-80">
                    {res.preaviso.corresponde
                      ? "10 días si la antigüedad no llega al año, 30 si lo supera. Si no se dio, se paga como indemnización sustitutiva (art. 43)."
                      : "No corresponde: la extinción cayó dentro del período de prueba."}
                  </span>
                </td>
                <td className="py-2 text-right font-semibold">
                  {formatARS(res.preaviso.importe, 2)}
                </td>
              </tr>
              <tr
                className={`border-b border-zinc-200 align-top ${
                  res.integracionMes.corresponde ? "" : "text-zinc-500"
                }`}
              >
                <td className="py-2 pr-3">
                  <span className="font-medium">
                    Integración del mes de despido ({numero(res.integracionMes.dias)} días)
                  </span>
                  <span className="block text-xs opacity-80">
                    art. 44: si el despido no cae el último día del mes, se completa el mes. A
                    diferencia de la LCT, acá el régimen no la excluye en el período de prueba,
                    pero el art. 7 dice «sin indemnización alguna».
                  </span>
                </td>
                <td className="py-2 text-right font-semibold">
                  {formatARS(res.integracionMes.importe, 2)}
                </td>
              </tr>
              <tr
                className={`border-b border-zinc-200 align-top ${
                  res.antiguedad.corresponde ? "" : "text-rose-800"
                }`}
              >
                <td className="py-2 pr-3">
                  <span className="font-medium">
                    Indemnización por antigüedad ({numero(res.antiguedad.meses)}{" "}
                    {res.antiguedad.meses === 1 ? "mes" : "meses"} de sueldo, art. 48)
                  </span>
                  <span className="block text-xs opacity-80">
                    {res.antiguedad.corresponde
                      ? `Un mes por año o fracción mayor de tres meses, con piso de un mes${
                          res.antiguedad.aplicaPiso ? " (acá se aplica el piso)" : ""
                        }. Sin ningún tope: el art. 48 no lo prevé.`
                      : "No corresponde: dentro del período de prueba el art. 7 excluye toda indemnización."}
                  </span>
                </td>
                <td className="py-2 text-right font-semibold">
                  {formatARS(res.antiguedad.importe, 2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        {res.avisos.map((a) => (
          <p key={a.texto} className={`rounded-lg border px-3 py-2 text-sm ${TONOS[a.tono]}`}>
            {a.texto}
          </p>
        ))}
      </div>

      <p className="mt-4 text-xs text-zinc-500">
        Para la escala salarial vigente por categoría y modalidad está{" "}
        <Link href="/empleada-domestica" className="font-medium text-emerald-700 hover:underline">
          la calculadora de sueldo de casas particulares
        </Link>
        , y para los aportes mensuales,{" "}
        <Link
          href="/aportes-empleada-domestica"
          className="font-medium text-emerald-700 hover:underline"
        >
          la de aportes
        </Link>
        .
      </p>
    </div>

      {oferta && previa && (
        <OfertaPlanilla
          producto={oferta}
          desde="despido-empleada-domestica"
          hoja={previa.hoja}
          titulo="Si vas a tomar a otra persona, empezá en orden"
          bajada={
            <>
              La planilla de Casas Particulares calcula el sueldo de cada mes con la escala oficial, lo que le pagás a
              ARCA, el aguinaldo y las vacaciones. Y te arma el recibo para firmar, así la próxima liquidación final no
              te agarra sin papeles.
            </>
          }
          incluye={[
            {
              titulo: "Recibo de sueldo listo para imprimir",
              texto: "Se completa solo con el mes liquidado. Lo imprimís por duplicado y cada parte firma su copia.",
            },
            {
              titulo: "Lo que le pagás a ARCA, cada mes",
              texto: "Aportes, contribuciones y ART según las horas que trabaja, y el costo total del mes.",
            },
            {
              titulo: "Aguinaldo y vacaciones del año",
              texto: "Anotás lo que pagaste cada mes y te calcula el aguinaldo de junio y diciembre y los días de vacaciones.",
            },
          ]}
          notaHoja={`Ejemplo: ${previa.resumen.etiqueta}. En la tuya elegís la categoría y las horas.`}
        />
      )}
    </div>
  );
}
