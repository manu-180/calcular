"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { JORNADA_LEGAL_SEMANAL, VIGENCIA_REFORMA } from "@/data/tiempo-parcial";
import { calcularTiempoParcial } from "@/lib/tiempo-parcial";
import { formatARS, errorMonto, primerError, errorCantidad, parseMonto, parseDecimal } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const numero = (n: number, dec = 1) =>
  n.toLocaleString("es-AR", { maximumFractionDigits: dec });

export function CalculadoraTiempoParcial() {
  const [sueldoCompleto, setSueldoCompleto] = useState("1200000");
  const [jornada, setJornada] = useState("48");
  const [pactadas, setPactadas] = useState("24");
  const [supComunes, setSupComunes] = useState("0");
  const [supAgravadas, setSupAgravadas] = useState("0");

  const error = primerError({
    "Sueldo de jornada completa": errorMonto(sueldoCompleto),
    "Jornada completa": errorCantidad(jornada),
    "Horas semanales que trabajás": errorCantidad(pactadas),
    "Horas suplementarias de días comunes": errorCantidad(supComunes),
    "Horas suplementarias agravadas": errorCantidad(supAgravadas),
  });

  const res = useMemo(
    () =>
      calcularTiempoParcial({
        sueldoJornadaCompleta: parseMonto(sueldoCompleto),
        jornadaActividad: parseDecimal(jornada),
        horasPactadas: parseDecimal(pactadas),
        suplementariasComunes: parseDecimal(supComunes),
        suplementariasAgravadas: parseDecimal(supAgravadas),
      }),
    [sueldoCompleto, jornada, pactadas, supComunes, supAgravadas],
  );

  const haySuplementarias =
    parseDecimal(supComunes) + parseDecimal(supAgravadas) > 0;

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="sueldoCompleto" className="block text-sm font-semibold text-zinc-800">
            Sueldo bruto mensual de un trabajador de jornada COMPLETA de tu categoría
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El del convenio o la ley para el mismo puesto, a jornada entera. Es el número contra el
            que el inciso 1 mide tu proporcional, y del que sale el aporte de obra social.
          </p>
          <input
            id="sueldoCompleto"
            inputMode="numeric"
            value={sueldoCompleto}
            onChange={(e) => setSueldoCompleto(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="jornada" className="block text-sm font-semibold text-zinc-800">
            Jornada completa de tu actividad (horas por semana)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            La legal son {JORNADA_LEGAL_SEMANAL}; tu convenio puede fijar menos.
          </p>
          <input
            id="jornada"
            inputMode="numeric"
            value={jornada}
            onChange={(e) => setJornada(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="pactadas" className="block text-sm font-semibold text-zinc-800">
            Horas semanales que trabajás vos
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">Las pactadas en el contrato.</p>
          <input
            id="pactadas"
            inputMode="numeric"
            value={pactadas}
            onChange={(e) => setPactadas(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="supComunes" className="block text-sm font-semibold text-zinc-800">
            Horas suplementarias del mes, días comunes
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Las que hiciste por encima de tu jornada pactada, de lunes a sábado hasta las 13.
          </p>
          <input
            id="supComunes"
            inputMode="numeric"
            value={supComunes}
            onChange={(e) => setSupComunes(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="supAgravadas" className="block text-sm font-semibold text-zinc-800">
            Horas suplementarias del mes, sábado tarde / domingo / feriado
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Sábado después de las 13, domingo y feriados: el art. 201 les pone el 100%.
          </p>
          <input
            id="supAgravadas"
            inputMode="numeric"
            value={supAgravadas}
            onChange={(e) => setSupAgravadas(e.target.value)}
            className={claseInput}
          />
        </div>
      </div>

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : (
        <>
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">
            Lo mínimo que te tienen que pagar por mes (bruto), con {numero(res.proporcion * 100, 1)}% de
            la jornada
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.brutoConRecargo, 2)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {formatARS(res.sueldoProporcional, 2)} de sueldo proporcional
            {haySuplementarias ? (
              <>
                {" "}
                + {formatARS(res.suplementariasConRecargo, 2)} de horas suplementarias con el recargo
                del artículo 201 (a valor simple serían {formatARS(res.suplementariasSimples, 2)}).
              </>
            ) : (
              <>. Neto estimado: {formatARS(res.neto, 2)}.</>
            )}
          </p>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[34rem] text-sm">
              <tbody>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">Valor de tu hora</span>
                    <span className="block text-xs text-zinc-500">
                      sueldo de jornada completa ÷ {numero(res.horasMensualesJornada)} horas al mes
                      (jornada semanal × 52/12). Si tu convenio fija otro divisor, mandan sus reglas.
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {formatARS(res.valorHora, 2)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Piso legal del sueldo (art. 92 ter, inc. 1)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      la proporcional de un trabajador de tiempo completo de tu categoría: no puede ser
                      menos
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {formatARS(res.sueldoProporcional, 2)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Horas suplementarias que todavía podés hacer
                    </span>
                    <span className="block text-xs text-zinc-500">
                      lo que falta para tocar la jornada legal de {JORNADA_LEGAL_SEMANAL} horas
                      semanales, que es el único techo del inciso 2
                    </span>
                  </td>
                  <td className="py-2 text-right font-semibold text-zinc-900">
                    {numero(res.margenSuplementarias)} h/mes
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">Aporte jubilatorio + PAMI (14%)</span>
                    <span className="block text-xs text-zinc-500">
                      en proporción a lo que cobrás (inc. 3)
                    </span>
                  </td>
                  <td className="py-2 text-right text-zinc-700">
                    −{formatARS(res.aportes.jubilacion + res.aportes.pami, 2)}
                  </td>
                </tr>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Aporte de obra social (3%), el que no se prorratea
                    </span>
                    <span className="block text-xs text-zinc-500">
                      el inciso 4 lo calcula sobre el sueldo de un trabajador de tiempo completo. Si se
                      prorrateara como el resto sería {formatARS(res.aportes.obraSocialSiFueraProporcional, 2)}
                      : la diferencia es{" "}
                      {formatARS(
                        res.aportes.obraSocial - res.aportes.obraSocialSiFueraProporcional,
                        2,
                      )}{" "}
                      por mes.
                    </span>
                  </td>
                  <td className="py-2 text-right text-zinc-700">
                    −{formatARS(res.aportes.obraSocial, 2)}
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">Neto estimado del mes</span>
                    <span className="block text-xs text-zinc-500">
                      los descuentos se llevan el {numero(res.pesoAportes * 100)}% del bruto (a jornada
                      completa serían 17%)
                    </span>
                  </td>
                  <td className="py-2 text-right text-lg font-bold text-zinc-900">
                    {formatARS(res.neto, 2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-5 rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Con el texto anterior a la reforma, ¿qué te correspondía?
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              El tope viejo eran {numero(res.anterior.topeSemanalViejo)} horas semanales (dos tercios
              de la jornada).{" "}
              {res.anterior.superabaDosTercios ? (
                <>
                  Tu jornada lo supera: hasta el 5 de marzo de 2026 te correspondía el sueldo de{" "}
                  <strong>jornada completa</strong>, {formatARS(res.anterior.sueldoQueCorrespondia, 2)}{" "}
                  — {formatARS(res.anterior.diferencia, 2)} más por mes que hoy.
                </>
              ) : (
                <>
                  Tu jornada está por debajo, así que en tu caso el sueldo proporcional es el mismo con
                  los dos textos. Lo que sí cambia son las horas suplementarias: antes estaban
                  prohibidas.
                </>
              )}
            </p>
          </div>

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
            Estimación orientativa sobre el texto vigente desde el {VIGENCIA_REFORMA}, no una
            liquidación: no incluye adicionales del convenio, antigüedad, presentismo ni Ganancias.
            Para el recibo completo está{" "}
            <Link href="/sueldo-neto" className="font-medium text-emerald-700 hover:underline">
              la calculadora de sueldo neto
            </Link>
            , y para el aguinaldo proporcional,{" "}
            <Link href="/aguinaldo" className="font-medium text-emerald-700 hover:underline">
              la de aguinaldo
            </Link>
            .
          </p>
        </div>
        </>
      )}
    </div>
  );
}
