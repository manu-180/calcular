"use client";

import { useMemo, useState } from "react";
import {
  ALICUOTAS_GENERALES,
  ALICUOTA_RIFL_INSSJP,
  ALICUOTA_RIFL_SIPA_FNE_AAFF,
  DETRACCION_ART22,
  MESES_BENEFICIO,
} from "@/data/rifl";
import { calcularRifl } from "@/lib/rifl";
import { formatARS, parseMonto } from "@/lib/formato";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const pct = (n: number) => `${n.toLocaleString("es-AR", { maximumFractionDigits: 1 })}%`;

export function CalculadoraRifl() {
  const [bruto, setBruto] = useState("1.500.000");
  const [inciso, setInciso] = useState<"a" | "b">("b");
  const [aplicarDetraccion, setAplicarDetraccion] = useState(true);

  const alicuota = ALICUOTAS_GENERALES.find((a) => a.inciso === inciso)!;

  const res = useMemo(
    () =>
      calcularRifl({
        bruto: parseMonto(bruto),
        alicuotaGeneral: alicuota.valor,
        aplicarDetraccion,
      }),
    [bruto, alicuota.valor, aplicarDetraccion],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bruto" className="block text-sm font-semibold text-zinc-800">
            Remuneración bruta mensual del nuevo empleado
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El sueldo del recibo, antes de los aportes del trabajador. Es la base sobre la que se
            calculan las contribuciones patronales.
          </p>
          <input
            id="bruto"
            inputMode="numeric"
            value={bruto}
            onChange={(e) => setBruto(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="inciso" className="block text-sm font-semibold text-zinc-800">
            Tu alícuota del régimen general (art. 19 de la Ley 27.541)
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Es lo que pagás hoy por SIPA, Fondo Nacional de Empleo, Asignaciones Familiares e
            INSSJP, todo junto.
          </p>
          <select
            id="inciso"
            value={inciso}
            onChange={(e) => setInciso(e.target.value as "a" | "b")}
            className={claseInput}
          >
            {ALICUOTAS_GENERALES.map((a) => (
              <option key={a.inciso} value={a.inciso}>
                {a.etiqueta} — inciso {a.inciso})
              </option>
            ))}
          </select>
          <p className="mt-2 text-xs text-zinc-500">{alicuota.detalle}</p>
        </div>
      </div>

      <label className="mt-4 flex items-start gap-2 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5">
        <input
          type="checkbox"
          checked={aplicarDetraccion}
          onChange={(e) => setAplicarDetraccion(e.target.checked)}
          className="mt-0.5 h-4 w-4 accent-emerald-600"
        />
        <span className="text-sm text-zinc-700">
          Aplicar la detracción del art. 22 de la Ley 27.541 ({formatARS(DETRACCION_ART22, 2)} por
          trabajador y por mes).{" "}
          <span className="text-zinc-500">
            Es un importe fijo de 2019 que la ley no actualiza, y se aplica igual con RIFL o sin él:
            no cambia el ahorro, sólo cada importe por separado.
          </span>
        </span>
      </label>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm font-semibold text-zinc-700">Sin RIFL, por mes</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.contribucionGeneral, 2)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            {pct(res.alicuotaGeneral * 100)} sobre una base de {formatARS(res.base, 2)}.
          </p>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5">
          <p className="text-sm font-semibold text-emerald-900">Con RIFL, por mes</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-emerald-900">
            {formatARS(res.contribucionRifl, 2)}
          </p>
          <p className="mt-1 text-sm text-emerald-900/80">
            {formatARS(res.riflSipaFneAaff, 2)} del inc. a) más {formatARS(res.riflInssjp, 2)} del
            inc. b).
          </p>
        </div>

        <div className="rounded-xl border border-emerald-300 bg-white p-5">
          <p className="text-sm font-semibold text-zinc-700">Ahorro mensual</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-emerald-700">
            {formatARS(res.ahorroMensual, 2)}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            Las contribuciones de estos cuatro subsistemas bajan un{" "}
            {pct(res.reduccionPorcentual)}.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 p-5">
          <p className="text-sm font-semibold text-zinc-700">En el primer año</p>
          <p className="mt-1 text-2xl font-bold text-zinc-900">
            {formatARS(res.ahorroAnual, 0)}
          </p>
        </div>
        <div className="rounded-xl border border-emerald-300 bg-emerald-50/50 p-5">
          <p className="text-sm font-semibold text-emerald-900">
            En los {MESES_BENEFICIO} meses del beneficio
          </p>
          <p className="mt-1 text-2xl font-bold text-emerald-900">
            {formatARS(res.ahorroTotalBeneficio, 0)}
          </p>
          <p className="mt-1 text-xs text-emerald-900/70">
            A sueldo constante y sin contar el aguinaldo. Los {MESES_BENEFICIO} meses corren desde
            el mes de inicio de la relación, no desde el cierre de la ventana.
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-zinc-500">
        La comparación es sólo sobre los cuatro subsistemas que el art. 159 adecua: SIPA, Fondo
        Nacional de Empleo, Asignaciones Familiares e INSSJP. Quedan afuera —porque el RIFL no las
        toca— la contribución a la obra social (Ley 23.660), la cuota de la ART (Ley 24.557) y los
        aportes del trabajador. El {pct(ALICUOTA_RIFL_SIPA_FNE_AAFF * 100)} y el{" "}
        {pct(ALICUOTA_RIFL_INSSJP * 100)} son los dos incisos del art. 159, y las alícuotas
        adicionales de regímenes previsionales diferenciales o especiales quedan expresamente
        excluidas del tratamiento.
      </p>
    </div>
  );
}
