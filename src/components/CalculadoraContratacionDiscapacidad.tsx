"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ALICUOTAS_ART19,
  type AlicuotaArt19,
  DETRACCION_MENSUAL,
  EXENCION_ANIOS,
} from "@/data/contratacion-discapacidad";
import { calcular } from "@/lib/contratacion-discapacidad";
import { formatARS } from "@/lib/formato";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

export function CalculadoraContratacionDiscapacidad() {
  const [bruto, setBruto] = useState("1.200.000");
  const [tipo, setTipo] = useState<AlicuotaArt19>("b");

  const res = useMemo(
    () => calcular({ bruto: Number(bruto.replace(/[^\d]/g, "")), tipo }),
    [bruto, tipo],
  );

  const porcentaje = (res.alicuota * 100).toLocaleString("es-AR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="disc-bruto" className="block text-sm font-semibold text-zinc-800">
            Remuneración bruta mensual
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            El sueldo del puesto, antes de descuentos. Es la base sobre la que se calculan las
            contribuciones.
          </p>
          <input
            id="disc-bruto"
            inputMode="numeric"
            value={bruto}
            onChange={(e) => setBruto(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="disc-tipo" className="block text-sm font-semibold text-zinc-800">
            Alícuota que le corresponde al empleador
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Las dos del art. 19 de la Ley 27.541. La mayoría de las empresas está en el 18%.
          </p>
          <select
            id="disc-tipo"
            value={tipo}
            onChange={(e) => setTipo(e.target.value as AlicuotaArt19)}
            className={claseInput}
          >
            {ALICUOTAS_ART19.map((a) => (
              <option key={a.id} value={a.id}>
                {a.titulo} —{" "}
                {a.id === "a" ? "Servicios o Comercio sobre mediana tramo 2" : "los demás"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
          <p className="text-sm font-semibold text-emerald-900">
            Ahorro en los {EXENCION_ANIOS} años del beneficio
          </p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {formatARS(res.ahorroTotal, 0)}
          </p>
          <p className="mt-1 text-sm text-emerald-900/80">
            {formatARS(res.ahorroMensual, 0)} por mes y {formatARS(res.ahorroAnual, 0)} por año
            (incluye el aguinaldo, cuya base lleva media detracción). A sueldo constante: si el
            sueldo sube, el ahorro sube con él.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm font-semibold text-zinc-700">Cómo sale ese número, por mes</p>
          <ul className="mt-2 space-y-1.5 text-sm text-zinc-700">
            <li className="flex justify-between gap-3">
              <span>Bruto</span>
              <span className="tabular-nums">{formatARS(res.bruto, 0)}</span>
            </li>
            <li className="flex justify-between gap-3">
              <span>− detracción del art. 22</span>
              <span className="tabular-nums">− {formatARS(DETRACCION_MENSUAL, 2)}</span>
            </li>
            <li className="flex justify-between gap-3 border-t border-zinc-200 pt-1.5">
              <span>Base imponible</span>
              <span className="tabular-nums">{formatARS(res.baseMensual, 0)}</span>
            </li>
            <li className="flex justify-between gap-3">
              <span>Contribución del art. 19 ({porcentaje}%)</span>
              <span className="tabular-nums">{formatARS(res.contribucionMensual, 0)}</span>
            </li>
            <li className="flex justify-between gap-3 font-semibold text-emerald-900">
              <span>Se paga con la exención del 50%</span>
              <span className="tabular-nums">{formatARS(res.contribucionConBeneficio, 0)}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
          <p className="text-sm font-semibold text-amber-900">Lo que el beneficio NO baja</p>
          <p className="mt-1 text-sm text-amber-900/90">
            La obra social sigue entera: {formatARS(res.obraSocialMensual, 0)} por mes (6%, art. 16
            inc. a de la Ley 23.660). Tampoco toca la cuota de la ART ni el seguro colectivo de
            vida. El titular «50% de las contribuciones patronales» se refiere a los cuatro
            subsistemas del art. 87, no a todo lo que paga el empleador.
          </p>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4">
          <p className="text-sm font-semibold text-zinc-700">Y además, en Ganancias</p>
          <p className="mt-1 text-sm text-zinc-600">
            El art. 23 de la Ley 22.431 permite deducir el <strong>70% de las retribuciones</strong>{" "}
            del personal con discapacidad: con este sueldo son{" "}
            <strong>{formatARS(res.deduccionGananciasAnual, 0)}</strong> de deducción por año. No es
            el impuesto ahorrado (eso depende de la alícuota que le toque a la empresa): es la base
            que se resta. Y es acumulable: el propio art. 87 lo declara «independiente».
          </p>
        </div>
      </div>

      <p className="mt-4 text-xs text-zinc-500">
        Los porcentajes salen del art. 19 de la Ley 27.541 y del art. 87 de la Ley 24.013 en su
        texto vigente; la detracción, del art. 22 de la Ley 27.541. Acá no se estima ninguno. Para
        el costo laboral completo de un sueldo está la{" "}
        <Link href="/descuentos-del-sueldo" className="text-emerald-700 hover:underline">
          calculadora de aportes y contribuciones
        </Link>
        .
      </p>
    </div>
  );
}
