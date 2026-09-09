"use client";

import { useMemo, useState } from "react";
import {
  calcularSucesion,
  resolverPluriempleo,
  type EmpleoPluriempleo,
  type EstadoPrevio,
  type QuienPaga,
} from "@/lib/pluriempleo-art";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50 text-emerald-950",
  atencion: "border-amber-200 bg-amber-50 text-amber-950",
  bloqueante: "border-rose-200 bg-rose-50 text-rose-950",
} as const;

const PAGOS: Record<QuienPaga, { titulo: string; detalle: string }> = {
  "ultima-art-solo-incremental": {
    titulo: "La última ART paga sólo la incapacidad incremental",
    detalle: "Es la regla general cuando la incapacidad previa era definitiva y no cambia la modalidad de pago.",
  },
  "ultima-art-integral-exclusivo": {
    titulo: "La última ART paga la incapacidad integral a su exclusivo cargo",
    detalle: "Aplica cuando la incapacidad previa era definitiva y la prestación integral tiene otra modalidad de pago.",
  },
  "concurren-proporcionalmente": {
    titulo: "Las ART concurren proporcionalmente",
    detalle: "Aplica cuando el trabajador se encontraba en situación de incapacidad provisoria.",
  },
};

const pesos = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 2,
});

const porcentaje = new Intl.NumberFormat("es-AR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const empleoInicial = (indice: number): EmpleoPluriempleo => ({
  nombre: `Empleo ${indice}`,
  remuneracionMesAnterior: 0,
  ingresoBase: 0,
  presenciaAgenteRiesgo: false,
  trabajabaAlMomento: false,
});

export function CalculadoraPluriempleoArt() {
  const [pestana, setPestana] = useState<"cobertura" | "sucesion">("cobertura");
  const [empleos, setEmpleos] = useState<EmpleoPluriempleo[]>([
    empleoInicial(1),
    empleoInicial(2),
  ]);
  const [atribuibleAMasDeUnEmpleo, setAtribuibleAMasDeUnEmpleo] = useState(false);
  const [incapacidadesPrevias, setIncapacidadesPrevias] = useState<number[]>([30]);
  const [incapacidadUltima, setIncapacidadUltima] = useState(20);
  const [estadoPrevio, setEstadoPrevio] = useState<EstadoPrevio>(
    "definitiva-misma-modalidad",
  );
  const [porcentajeTablaConjunta, setPorcentajeTablaConjunta] = useState("");

  const resultadoPluriempleo = useMemo(
    () => resolverPluriempleo({ empleos, atribuibleAMasDeUnEmpleo }),
    [atribuibleAMasDeUnEmpleo, empleos],
  );
  const resultadoSucesion = useMemo(
    () =>
      calcularSucesion({
        incapacidadesPrevias,
        incapacidadUltima,
        estadoPrevio,
        porcentajeTablaConjunta:
          porcentajeTablaConjunta === "" ? undefined : Number(porcentajeTablaConjunta),
      }),
    [estadoPrevio, incapacidadUltima, incapacidadesPrevias, porcentajeTablaConjunta],
  );

  function actualizarEmpleo<K extends keyof EmpleoPluriempleo>(
    indice: number,
    campo: K,
    valor: EmpleoPluriempleo[K],
  ) {
    setEmpleos((actuales) =>
      actuales.map((empleo, posicion) =>
        posicion === indice ? { ...empleo, [campo]: valor } : empleo,
      ),
    );
  }

  function actualizarIncapacidadPrevia(indice: number, valor: number) {
    setIncapacidadesPrevias((actuales) =>
      actuales.map((incapacidad, posicion) => (posicion === indice ? valor : incapacidad)),
    );
  }

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div
        role="tablist"
        aria-label="Calculadoras de pluriempleo y sucesión de siniestros"
        className="grid gap-2 rounded-xl bg-zinc-100 p-1 sm:grid-cols-2"
      >
        <button
          type="button"
          role="tab"
          aria-selected={pestana === "cobertura"}
          onClick={() => setPestana("cobertura")}
          className={
            "rounded-lg px-3 py-2.5 text-sm font-semibold transition " +
            (pestana === "cobertura"
              ? "bg-white text-emerald-800 shadow-sm"
              : "text-zinc-600 hover:text-zinc-900")
          }
        >
          ¿Qué ART me cubre?
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={pestana === "sucesion"}
          onClick={() => setPestana("sucesion")}
          className={
            "rounded-lg px-3 py-2.5 text-sm font-semibold transition " +
            (pestana === "sucesion"
              ? "bg-white text-emerald-800 shadow-sm"
              : "text-zinc-600 hover:text-zinc-900")
          }
        >
          Segundo accidente: ¿cuánto paga la última ART?
        </button>
      </div>

      {pestana === "cobertura" ? (
        <div role="tabpanel" className="mt-6">
          <label className="flex items-start gap-2 rounded-xl border border-violet-200 bg-violet-50/60 p-4 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={atribuibleAMasDeUnEmpleo}
              onChange={(ev) => setAtribuibleAMasDeUnEmpleo(ev.target.checked)}
              className="mt-1"
            />
            <span>
              El accidente o la enfermedad es <strong>atribuible a más de un empleo</strong>
              <span className="mt-1 block text-xs text-zinc-500">
                En ese caso decide la mayor remuneración sujeta a cotización del mes anterior, no el ingreso base.
              </span>
            </span>
          </label>

          <div className="mt-5 space-y-4">
            {empleos.map((empleo, indice) => (
              <fieldset key={indice} className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4">
                <legend className="px-1 text-sm font-bold text-zinc-900">Empleo {indice + 1}</legend>
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="block text-sm font-medium text-zinc-800">
                    Nombre
                    <input
                      type="text"
                      value={empleo.nombre}
                      onChange={(ev) => actualizarEmpleo(indice, "nombre", ev.target.value)}
                      className={claseInput}
                    />
                  </label>
                  <label className="block text-sm font-medium text-zinc-800">
                    Remuneración del mes anterior
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={empleo.remuneracionMesAnterior}
                      onChange={(ev) =>
                        actualizarEmpleo(indice, "remuneracionMesAnterior", Number(ev.target.value))
                      }
                      className={claseInput}
                    />
                    <span className="mt-1.5 block text-xs text-zinc-500">Sujeta a cotización.</span>
                  </label>
                  <label className="block text-sm font-medium text-zinc-800">
                    Ingreso base
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={empleo.ingresoBase}
                      onChange={(ev) =>
                        actualizarEmpleo(indice, "ingresoBase", Number(ev.target.value))
                      }
                      className={claseInput}
                    />
                  </label>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <label className="flex items-start gap-2 text-sm text-zinc-700">
                    <input
                      type="checkbox"
                      checked={empleo.presenciaAgenteRiesgo}
                      onChange={(ev) =>
                        actualizarEmpleo(indice, "presenciaAgenteRiesgo", ev.target.checked)
                      }
                      className="mt-1"
                    />
                    La actividad implica la presencia del agente de riesgo
                  </label>
                  <label className="flex items-start gap-2 text-sm text-zinc-700">
                    <input
                      type="checkbox"
                      checked={empleo.trabajabaAlMomento}
                      onChange={(ev) =>
                        actualizarEmpleo(indice, "trabajabaAlMomento", ev.target.checked)
                      }
                      className="mt-1"
                    />
                    Trabajaba en este empleo cuando ocurrió el accidente
                  </label>
                </div>
                {empleos.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setEmpleos((actuales) => actuales.filter((_, i) => i !== indice))}
                    className="mt-4 text-xs font-semibold text-rose-700 hover:underline"
                  >
                    Quitar empleo
                  </button>
                )}
              </fieldset>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setEmpleos((actuales) => [...actuales, empleoInicial(actuales.length + 1)])}
            className="mt-4 rounded-lg border border-emerald-300 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
          >
            Agregar empleo
          </button>

          <div className="mt-6 rounded-xl border border-emerald-300 bg-emerald-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">ART obligada</p>
            <p className="mt-0.5 text-lg font-bold text-zinc-900">
              {resultadoPluriempleo.responsable
                ? `La ART de ${resultadoPluriempleo.responsable.nombre}`
                : "No se puede determinar con estos datos"}
            </p>
          </div>

          <dl className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Base total</dt>
              <dd className="mt-1 text-lg font-bold text-zinc-900">{pesos.format(resultadoPluriempleo.baseTotal)}</dd>
              <p className="mt-1 text-xs text-zinc-500">
                {resultadoPluriempleo.empleosQueAportanBase.length === 0
                  ? "Ningún empleo alcanzado"
                  : resultadoPluriempleo.empleosQueAportanBase.map((item) => item.nombre).join(" + ")}
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Repetición</dt>
              <dd className="mt-1 text-sm font-bold text-zinc-900">
                {resultadoPluriempleo.repeticion.length
                  ? resultadoPluriempleo.repeticion.map((item) => `ART de ${item.nombre}`).join(", ")
                  : "No determinada"}
              </dd>
              <p className="mt-1 text-xs text-zinc-500">El reparto entre ART no reduce lo que cobra el trabajador.</p>
            </div>
          </dl>

          <ul className="mt-4 space-y-2">
            {resultadoPluriempleo.avisos.map((aviso, indice) => (
              <li key={indice} className={"rounded-lg border px-3 py-2 text-sm leading-relaxed " + TONOS[aviso.tono]}>
                {aviso.texto}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div role="tabpanel" className="mt-6">
          <fieldset>
            <legend className="text-sm font-semibold text-zinc-900">Incapacidades anteriores, en orden cronológico</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {incapacidadesPrevias.map((incapacidad, indice) => (
                <div key={indice} className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4">
                  <label className="block text-sm font-medium text-zinc-800">
                    Incapacidad previa {indice + 1} (%)
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={incapacidad}
                      onChange={(ev) => actualizarIncapacidadPrevia(indice, Number(ev.target.value))}
                      className={claseInput}
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setIncapacidadesPrevias((actuales) => actuales.filter((_, i) => i !== indice))}
                    className="mt-3 text-xs font-semibold text-rose-700 hover:underline"
                  >
                    Quitar incapacidad
                  </button>
                </div>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={() => setIncapacidadesPrevias((actuales) => [...actuales, 0])}
            className="mt-4 rounded-lg border border-emerald-300 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
          >
            Agregar incapacidad previa
          </button>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <label className="block text-sm font-medium text-zinc-800">
              Incapacidad de la última contingencia (%)
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={incapacidadUltima}
                onChange={(ev) => setIncapacidadUltima(Number(ev.target.value))}
                className={claseInput}
              />
            </label>
            <label className="block text-sm font-medium text-zinc-800">
              Estado de la incapacidad previa
              <select
                value={estadoPrevio}
                onChange={(ev) => setEstadoPrevio(ev.target.value as EstadoPrevio)}
                className={claseInput}
              >
                <option value="definitiva-misma-modalidad">Definitiva · misma modalidad de pago</option>
                <option value="definitiva-otra-modalidad">Definitiva · cambia la modalidad de pago</option>
                <option value="provisoria">Provisoria</option>
              </select>
            </label>
            <label className="block text-sm font-medium text-zinc-800">
              Porcentaje conjunto de la tabla (%)
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={porcentajeTablaConjunta}
                onChange={(ev) => setPorcentajeTablaConjunta(ev.target.value)}
                placeholder="Opcional"
                className={claseInput}
              />
              <span className="mt-1.5 block text-xs text-zinc-500">Ingresalo sólo si surge de la tabla aplicable. No se estima.</span>
            </label>
          </div>

          <div className="mt-6 rounded-xl border border-emerald-300 bg-emerald-50/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Resultado</p>
            <p className="mt-0.5 text-lg font-bold text-zinc-900">{PAGOS[resultadoSucesion.quienPaga].titulo}</p>
            <p className="mt-1 text-sm text-zinc-700">{PAGOS[resultadoSucesion.quienPaga].detalle}</p>
          </div>

          <dl className="mt-3 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Incapacidad previa</dt>
              <dd className="mt-1 text-lg font-bold text-zinc-900">{porcentaje.format(resultadoSucesion.incapacidadPrevia)} %</dd>
            </div>
            <div className="rounded-xl border border-violet-200 bg-violet-50/60 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-violet-700">Incapacidad integral</dt>
              <dd className="mt-1 text-lg font-bold text-zinc-900">{porcentaje.format(resultadoSucesion.incapacidadIntegral)} %</dd>
              <p className="mt-1 text-xs text-zinc-500">
                {resultadoSucesion.origenIntegral === "tabla-conjunta" ? "Tabla conjunta informada" : "Capacidad restante"}
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
              <dt className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Incapacidad incremental</dt>
              <dd className="mt-1 text-lg font-bold text-zinc-900">{porcentaje.format(resultadoSucesion.incapacidadIncremental)} puntos</dd>
              <p className="mt-1 text-xs text-zinc-500">También es la siniestralidad imputada al último empleador.</p>
            </div>
          </dl>

          <p className="mt-4 rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-relaxed text-zinc-700">
            <strong>Prestaciones en especie:</strong> {resultadoSucesion.prestacionesEnEspecie}
          </p>

          <ul className="mt-4 space-y-2">
            {resultadoSucesion.avisos.map((aviso, indice) => (
              <li key={indice} className={"rounded-lg border px-3 py-2 text-sm leading-relaxed " + TONOS[aviso.tono]}>
                {aviso.texto}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
