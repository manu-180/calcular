"use client";

import { MESES_LARGOS, periodoDe, type Periodo } from "@/lib/inflacion";

// Par de selects mes + año acotado a un rango de períodos "YYYY-MM" disponibles.
export function SelectorPeriodo({
  id,
  value,
  onChange,
  min,
  max,
}: {
  id: string;
  value: Periodo;
  onChange: (p: Periodo) => void;
  min: Periodo;
  max: Periodo;
}) {
  const [anio, mes] = value.split("-").map(Number);
  const [minAnio, minMes] = min.split("-").map(Number);
  const [maxAnio, maxMes] = max.split("-").map(Number);

  const anios: number[] = [];
  for (let a = minAnio; a <= maxAnio; a++) anios.push(a);

  const mesDesde = anio === minAnio ? minMes : 1;
  const mesHasta = anio === maxAnio ? maxMes : 12;

  function clamp(p: Periodo): Periodo {
    if (p < min) return min;
    if (p > max) return max;
    return p;
  }

  const claseSelect =
    "rounded-lg border border-zinc-300 bg-white px-2.5 py-2 text-sm text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

  return (
    <div className="flex gap-2">
      <select
        id={id}
        aria-label="Mes"
        value={mes}
        onChange={(e) => onChange(clamp(periodoDe(anio, Number(e.target.value))))}
        className={`${claseSelect} flex-1`}
      >
        {MESES_LARGOS.map((nombre, i) => {
          const m = i + 1;
          if (m < mesDesde || m > mesHasta) return null;
          return (
            <option key={m} value={m}>
              {nombre}
            </option>
          );
        })}
      </select>
      <select
        aria-label="Año"
        value={anio}
        onChange={(e) => onChange(clamp(periodoDe(Number(e.target.value), mes)))}
        className={claseSelect}
      >
        {anios.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
    </div>
  );
}
