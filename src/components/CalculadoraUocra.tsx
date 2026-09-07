"use client";

import { useMemo, useState, useRef } from "react";
import {
  CATEGORIAS_UOCRA,
  MESES_UOCRA,
  UOCRA_HORAS_MES_PROMEDIO,
  ZONAS_UOCRA,
} from "@/data/convenios/uocra";
import { calcularUocra } from "@/lib/convenios";
import { formatARS, parseDecimal } from "@/lib/formato";
import { CompartirWhatsApp } from "@/components/CompartirWhatsApp";

export function CalculadoraUocra() {
  const [mesId, setMesId] = useState("junio-2026");
  const [categoriaId, setCategoriaId] = useState("oficial");
  const [zonaId, setZonaId] = useState("a");
  const [horasStr, setHorasStr] = useState("190,67");
  const [asistencia, setAsistencia] = useState(true);
  const [sindical, setSindical] = useState(true);

  const categoria = CATEGORIAS_UOCRA.find((c) => c.id === categoriaId);
  const zona = ZONAS_UOCRA.find((z) => z.id === zonaId);
  const mes = MESES_UOCRA.find((m) => m.id === mesId);

  const horas = useMemo(() => parseDecimal(horasStr), [horasStr]);

  const resultado = useMemo(
    () =>
      calcularUocra({
        mesId,
        categoriaId,
        zonaId,
        horasMes: categoria?.mensual ? UOCRA_HORAS_MES_PROMEDIO : horas,
        conAsistencia: asistencia,
        conAporteSindical: sindical,
      }),
    [mesId, categoriaId, zonaId, horas, asistencia, sindical, categoria]
  );

  // Copiar el resultado ya desglosado: quien liquida lo pega en un mail o un recibo,
  // y sacar el número a mano de la pantalla es donde se cuelan los errores de tipeo.
  const [copia, setCopia] = useState<"idle" | "ok" | "error">("idle");
  const copiaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const volverAIdle = (ms: number) => {
    if (copiaTimer.current) clearTimeout(copiaTimer.current);
    copiaTimer.current = setTimeout(() => setCopia("idle"), ms);
  };
  async function copiarResultado() {
    if (!resultado) return;
    try {
      await navigator.clipboard.writeText(`UOCRA · ${categoria?.nombre} · ${zona?.nombre} · ${mes?.etiqueta}
Bruto: ${formatARS(resultado.bruto, 0)}
En mano (estimado): ${formatARS(resultado.neto, 0)}
Escala oficial CCT 76/75 — https://calcular.ar/convenios/uocra`);
      setCopia("ok");
      volverAIdle(2000);
    } catch {
      // Sin portapapeles (contexto no seguro, permiso denegado) el botón tiene que
      // decirlo: un botón que no hace nada y no avisa se lee como roto.
      setCopia("error");
      volverAIdle(3000);
    }
  }

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="uocra-mes" className="block text-sm font-semibold text-zinc-800">
            Mes a liquidar
          </label>
          <select
            id="uocra-mes"
            value={mesId}
            onChange={(e) => setMesId(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            {MESES_UOCRA.map((m) => (
              <option key={m.id} value={m.id}>
                {m.etiqueta}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="uocra-categoria"
            className="block text-sm font-semibold text-zinc-800"
          >
            Categoría
          </label>
          <select
            id="uocra-categoria"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            {CATEGORIAS_UOCRA.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="uocra-zona" className="block text-sm font-semibold text-zinc-800">
            Zona
          </label>
          <select
            id="uocra-zona"
            value={zonaId}
            onChange={(e) => setZonaId(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
          >
            {ZONAS_UOCRA.map((z) => (
              <option key={z.id} value={z.id}>
                {z.nombre}
              </option>
            ))}
          </select>
          {zona && <p className="mt-1 text-xs text-zinc-500">{zona.provincias}.</p>}
        </div>

        {!categoria?.mensual ? (
          <div>
            <label htmlFor="uocra-horas" className="block text-sm font-semibold text-zinc-800">
              Horas trabajadas en el mes
            </label>
            <input
              id="uocra-horas"
              inputMode="decimal"
              placeholder="190,67"
              value={horasStr}
              onChange={(e) => setHorasStr(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 py-2.5 px-3 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
            <p className="mt-1 text-xs text-zinc-500">
              La jornada completa del convenio (44 hs semanales) da un mes promedio de 190,67
              hs. Ajustalo a tus horas reales.
            </p>
          </div>
        ) : (
          <div className="rounded-lg bg-zinc-50 p-3 text-xs text-zinc-600 sm:self-end">
            El sereno cobra <strong>sueldo mensual</strong> (jornada de vigilancia de 12 hs,
            art. 12 del CCT): no hace falta cargar horas.
          </div>
        )}
      </div>

      <div className="mt-5 space-y-3">
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={asistencia}
            onChange={(e) => setAsistencia(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-emerald-600"
          />
          <span>
            Asistencia perfecta (+20% del básico)
            <span className="block text-xs text-zinc-500">
              Art. 52 del CCT: se cobra por quincena con asistencia perfecta. Vacaciones,
              licencias, feriados y suspensiones por clima no la hacen perder.
            </span>
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={sindical}
            onChange={(e) => setSindical(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-emerald-600"
          />
          <span>
            Descontar aporte sindical/solidario (2%)
            <span className="block text-xs text-zinc-500">
              Los acuerdos 2026 fijan un aporte solidario del 2% para no afiliados; a los
              afiliados se lo absorbe la cuota sindical (2,5%).
            </span>
          </span>
        </label>
      </div>

      {resultado && mes && categoria && zona && (
        <div className="mt-6 border-t border-zinc-100 pt-5" aria-live="polite">
          <div className="space-y-4">
            {/* Dos tarjetas en grilla, no dos números enfrentados: a 375px el layout
                anterior apretaba las cifras contra el medio y se cortaban. */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-200/70 bg-gradient-to-br from-emerald-50 to-white p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-emerald-700/70">
                  Bruto
                </p>
                <p className="mt-1 text-[2rem] font-bold leading-none tabular-nums text-emerald-700 sm:text-[2.25rem]">
                  {formatARS(resultado.bruto, 0)}
                </p>
                <p className="mt-1.5 text-xs leading-snug text-zinc-500">
                  Bruto de {categoria.nombre} · {zona.nombre} · {mes.etiqueta}
                </p>
                {resultado.jornal !== null && (
                  <p className="mt-1 text-xs text-zinc-500">
                    Jornal horario: {formatARS(resultado.jornal, 0)}
                  </p>
                )}
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  En mano (estimado)
                </p>
                <p className="mt-1 text-[2rem] font-bold leading-none tabular-nums text-zinc-900 sm:text-[2.25rem]">
                  {formatARS(resultado.neto, 0)}
                </p>
                <p className="mt-1.5 text-xs leading-snug text-zinc-500">
                  Después de los aportes de ley
                </p>
              </div>
            </div>

            <dl className="space-y-1.5 rounded-lg bg-zinc-50 p-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-zinc-600">
                  {resultado.esMensual
                    ? "Sueldo básico mensual"
                    : `Básico (${formatARS(resultado.jornal ?? 0, 0)} × ${horasStr.trim() || "0"} hs)`}
                </dt>
                <dd className="font-medium text-zinc-900">
                  {formatARS(resultado.basicoMensual, 0)}
                </dd>
              </div>
              {resultado.asistenciaPerfecta > 0 && (
                <div className="flex justify-between">
                  <dt className="text-zinc-600">Asistencia perfecta (20%)</dt>
                  <dd className="font-medium text-zinc-900">
                    {formatARS(resultado.asistenciaPerfecta, 0)}
                  </dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-zinc-600">Suma no remunerativa del mes</dt>
                <dd className="font-medium text-zinc-900">{formatARS(resultado.snr, 0)}</dd>
              </div>
              <div className="flex justify-between border-t border-zinc-200 pt-1.5">
                <dt className="font-semibold text-zinc-800">Total bruto</dt>
                <dd className="font-semibold text-zinc-900">{formatARS(resultado.bruto, 0)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-zinc-600">Descuentos estimados</dt>
                <dd className="font-medium text-rose-700">
                  −{formatARS(resultado.descuentos, 0)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="font-semibold text-zinc-800">Neto estimado</dt>
                <dd className="font-semibold text-emerald-700">
                  {formatARS(resultado.neto, 0)}
                </dd>
              </div>
            </dl>

            <p className="text-xs text-zinc-400">
              Estimación según las tablas firmadas UOCRA-CAMARCO: el convenio es un piso. La
              SNR se paga 50% con cada quincena y solo aporta a la obra social (3%); el neto
              descuenta 17% de aportes de ley sobre lo remunerativo{sindical ? " más el 2% sindical/solidario" : ""}.
              No incluye horas extra, viáticos por distancia ni impuesto a las Ganancias.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={copiarResultado}
                aria-live="polite"
                className={`inline-flex min-h-11 items-center gap-2 rounded-lg border bg-white px-4 text-sm font-semibold outline-none transition-[background-color,border-color,transform] duration-200 active:scale-[0.98] ${
                  copia === "error"
                    ? "border-rose-300 text-rose-700"
                    : "border-zinc-300 text-zinc-700 hover:border-zinc-400 hover:bg-zinc-50"
                }`}
              >
                {copia === "ok" ? (
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-4 text-emerald-600">
                    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden className={`size-4 ${copia === "error" ? "text-rose-400" : "text-zinc-400"}`}>
                    <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M5 15V5a2 2 0 012-2h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                )}
                {copia === "ok" ? "Copiado" : copia === "error" ? "No se pudo copiar" : "Copiar resultado"}
              </button>
              <CompartirWhatsApp
                mensaje={`Sueldo UOCRA de ${categoria.nombre} (${zona.nombre}) en ${mes.etiqueta.toLowerCase()}: ${formatARS(resultado.bruto, 0)} bruto, ≈ ${formatARS(resultado.neto, 0)} en mano. Escala oficial CCT 76/75:`}
                path="/convenios/uocra"
                campania="convenios-uocra"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
