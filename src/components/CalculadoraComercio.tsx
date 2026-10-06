"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { periodoDeMes, vigenteEn } from "@/lib/hoy";
import {
  CATEGORIAS_COMERCIO,
  JORNADAS_COMERCIO,
  MESES_COMERCIO,
  type JornadaComercioId,
} from "@/data/convenios/comercio";
import { calcularComercio } from "@/lib/convenios";
import { formatARS, parseDecimal } from "@/lib/formato";
import { CompartirWhatsApp } from "@/components/CompartirWhatsApp";
import { OfertaPlanilla } from "@/components/OfertaPlanilla";
import { hojaComercio } from "@/components/oferta/hojas";
import { prefill } from "@/lib/prefill/comercio";
import { olvidarDatosCompra, recordarDatosCompra } from "@/lib/prefill/cliente";
import type { DatosOferta } from "@/lib/oferta";

const GRUPOS = [...new Set(CATEGORIAS_COMERCIO.map((c) => c.grupo))];

export function CalculadoraComercio({ oferta }: { oferta?: DatosOferta }) {
  const [mesId, setMesId] = useState(() => vigenteEn(MESES_COMERCIO, periodoDeMes).id);
  const [categoriaId, setCategoriaId] = useState("vendedor-b");
  const [aniosStr, setAniosStr] = useState("");
  const [jornadaId, setJornadaId] = useState<JornadaComercioId>("8");
  const [presentismo, setPresentismo] = useState(true);
  const [tocado, setTocado] = useState(false);

  const anios = useMemo(() => {
    if (aniosStr.trim() === "") return 0;
    return Math.floor(parseDecimal(aniosStr));
  }, [aniosStr]);

  const jornada =
    JORNADAS_COMERCIO.find((j) => j.id === jornadaId) ?? JORNADAS_COMERCIO[0];
  const mes = MESES_COMERCIO.find((m) => m.id === mesId);
  const categoria = CATEGORIAS_COMERCIO.find((c) => c.id === categoriaId);

  const resultado = useMemo(
    () =>
      calcularComercio({
        mesId,
        categoriaId,
        aniosAntiguedad: anios,
        jornadaFactor: jornada.factor,
        conPresentismo: presentismo,
      }),
    [mesId, categoriaId, anios, jornada, presentismo]
  );

  // Lo mismo que se ve acá viaja con la compra y se escribe en la planilla que se descarga.
  const datosCompra = useMemo(
    () =>
      resultado
        ? prefill.validar({ mesId, categoriaId, anios, jornadaId, presentismo })
        : null,
    [resultado, mesId, categoriaId, anios, jornadaId, presentismo]
  );
  // Sólo después de que la persona tocó algo: los valores por defecto no son «tus datos», y la
  // compra no tiene por qué salir con ellos. Un caso que la planilla no aceptaría borra el anterior.
  useEffect(() => {
    if (!tocado) return;
    if (datosCompra) recordarDatosCompra("planilla-comercio", datosCompra);
    else olvidarDatosCompra("planilla-comercio");
  }, [tocado, datosCompra]);
  const previa = useMemo(
    () => (oferta && datosCompra ? hojaComercio(oferta.archivo, datosCompra) : null),
    [oferta, datosCompra]
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
      await navigator.clipboard.writeText(`Empleados de Comercio · ${categoria?.nombre} · ${mes?.etiqueta}
Bruto: ${formatARS(resultado.bruto, 0)}
En mano (estimado): ${formatARS(resultado.neto, 0)}
Escala oficial CCT 130/75 — https://calcular.ar/convenios/comercio`);
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
    <div className="space-y-6">
      <div onChange={() => setTocado(true)} className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="comercio-mes" className="block text-sm font-semibold text-zinc-800">
              Mes a liquidar
            </label>
            <select
              id="comercio-mes"
              value={mesId}
              onChange={(e) => setMesId(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            >
              {MESES_COMERCIO.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.etiqueta}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="comercio-categoria"
              className="block text-sm font-semibold text-zinc-800"
            >
              Tu categoría del convenio
            </label>
            <select
              id="comercio-categoria"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            >
              {GRUPOS.map((grupo) => (
                <optgroup key={grupo} label={grupo}>
                  {CATEGORIAS_COMERCIO.filter((c) => c.grupo === grupo).map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            <p className="mt-1 text-xs text-zinc-500">
              Si no la sabés, figura en tu recibo de sueldo. La más común en locales es Vendedor B.
            </p>
          </div>

          <div>
            <label
              htmlFor="comercio-antiguedad"
              className="block text-sm font-semibold text-zinc-800"
            >
              Años de antigüedad
            </label>
            <input
              id="comercio-antiguedad"
              inputMode="numeric"
              placeholder="0"
              value={aniosStr}
              onChange={(e) => setAniosStr(e.target.value)}
              className="mt-2 w-full rounded-lg border border-zinc-300 py-2.5 px-3 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            />
            <p className="mt-1 text-xs text-zinc-500">
              Años cumplidos en el empleo: suman 1% del sueldo por cada uno (art. 24).
            </p>
          </div>

          <div>
            <label
              htmlFor="comercio-jornada"
              className="block text-sm font-semibold text-zinc-800"
            >
              Jornada
            </label>
            <select
              id="comercio-jornada"
              value={jornadaId}
              onChange={(e) => setJornadaId(e.target.value as JornadaComercioId)}
              className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
            >
              {JORNADAS_COMERCIO.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.etiqueta}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={presentismo}
            onChange={(e) => setPresentismo(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-emerald-600"
          />
          <span>
            Cobro presentismo (asistencia y puntualidad)
            <span className="block text-xs text-zinc-500">
              Es 1/12 del sueldo (8,33%). Se pierde con más de una ausencia injustificada en el
              mes; enfermedad, vacaciones y licencias legales no cuentan.
            </span>
          </span>
        </label>

        {resultado && mes && categoria && (
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
                    Bruto de {categoria.nombre} · {mes.etiqueta}
                  </p>
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
                  <dt className="text-zinc-600">Básico convencional</dt>
                  <dd className="font-medium text-zinc-900">{formatARS(resultado.basico, 0)}</dd>
                </div>
                {resultado.noRemunerativo > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-zinc-600">Sumas no remunerativas</dt>
                    <dd className="font-medium text-zinc-900">
                      {formatARS(resultado.noRemunerativo, 0)}
                    </dd>
                  </div>
                )}
                {resultado.antiguedadTotal > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-zinc-600">
                      Antigüedad ({anios} {anios === 1 ? "año" : "años"} · 1% por año)
                    </dt>
                    <dd className="font-medium text-zinc-900">
                      {formatARS(resultado.antiguedadTotal, 0)}
                    </dd>
                  </div>
                )}
                {resultado.presentismoTotal > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-zinc-600">Presentismo (8,33%)</dt>
                    <dd className="font-medium text-zinc-900">
                      {formatARS(resultado.presentismoTotal, 0)}
                    </dd>
                  </div>
                )}
                {resultado.asignacionExtraordinaria > 0 && (
                  <div className="flex justify-between">
                    <dt className="text-zinc-600">
                      Asignación extraordinaria por única vez
                      <span className="block text-xs text-zinc-500">
                        No suma antigüedad ni presentismo
                      </span>
                    </dt>
                    <dd className="font-medium text-zinc-900">
                      {formatARS(resultado.asignacionExtraordinaria, 0)}
                    </dd>
                  </div>
                )}
                <div className="flex justify-between border-t border-zinc-200 pt-1.5">
                  <dt className="font-semibold text-zinc-800">Total bruto</dt>
                  <dd className="font-semibold text-zinc-900">{formatARS(resultado.bruto, 0)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-zinc-600">Descuentos estimados (aportes)</dt>
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

              {mes.advertencia && (
                <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
                  {mes.advertencia}
                </p>
              )}

              <p className="text-xs text-zinc-400">
                Estimación según la escala oficial de FAECYS y el acuerdo vigente: el convenio es
                un piso, tu sueldo puede ser mayor. El neto descuenta 17% de aportes sobre lo
                remunerativo y 3% (obra social) sobre lo no remunerativo; no incluye cuota
                sindical ni impuesto a las Ganancias.
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
                  mensaje={`Sueldo de ${categoria.nombre} (Empleados de Comercio) en ${mes.etiqueta.toLowerCase()}: ${formatARS(resultado.bruto, 0)} bruto, ≈ ${formatARS(resultado.neto, 0)} en mano. Escala oficial CCT 130/75:`}
                  path="/convenios/comercio"
                  campania="convenios-comercio"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {oferta && previa && datosCompra && categoria && (
        <OfertaPlanilla
          producto={oferta}
          desde="cta-comercio"
          hoja={previa.hoja}
          titulo="Tu liquidación, lista en Excel"
          bajada={
            <>
              La planilla te llega con <strong className="font-semibold text-zinc-800">{categoria.nombre}</strong>,{" "}
              {datosCompra.anios} {datosCompra.anios === 1 ? "año" : "años"} de antigüedad y{" "}
              {jornada.etiqueta.toLowerCase()} ya cargados. El mes que viene elegís el mes nuevo y la liquidación
              sale sola.
            </>
          }
          incluye={[
            {
              titulo: "Tus datos, ya cargados",
              texto: "Categoría, mes, antigüedad, jornada y presentismo, en las mismas celdas que ves acá.",
            },
            {
              titulo: "Toda la escala oficial de FAECYS",
              texto: `Las ${CATEGORIAS_COMERCIO.length} categorías de ${MESES_COMERCIO[0].etiqueta.toLowerCase()} a ${MESES_COMERCIO.at(-1)!.etiqueta.toLowerCase()}, con las sumas no remunerativas de cada mes.`,
            },
            {
              titulo: "Aguinaldo y actualizaciones",
              texto: "Una hoja para el aguinaldo, y cuando FAECYS publica una escala nueva te llega la planilla al día, sin pagar de nuevo.",
            },
          ]}
        />
      )}
    </div>
  );
}
