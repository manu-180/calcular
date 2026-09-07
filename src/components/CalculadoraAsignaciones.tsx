"use client";

import { useMemo, useState } from "react";
import {
  ASIGNACIONES_VIGENTES,
  GRUPOS_MONOTRIBUTO,
  ZONAS,
  type GrupoMonotributo,
  type Zona,
} from "@/data/asignaciones";
import {
  calcularAsignaciones,
  desglose8020,
  etiquetaTramo,
  montoMonotributoHijo,
} from "@/lib/asignaciones";
import { formatARS, parseMonto } from "@/lib/formato";

const V = ASIGNACIONES_VIGENTES;

type Regimen = "suaf" | "monotributo" | "auh";

const REGIMENES: { id: Regimen; etiqueta: string; ayuda: string }[] = [
  {
    id: "suaf",
    etiqueta: "En relación de dependencia",
    ayuda: "También jubilados y pensionados del SIPA, prestación por desempleo y ART. Es el SUAF.",
  },
  {
    id: "monotributo",
    etiqueta: "Monotributista",
    ayuda: "El monto lo fija la categoría, no el ingreso del grupo familiar.",
  },
  {
    id: "auh",
    etiqueta: "AUH / embarazo",
    ayuda: "Asignación Universal por Hijo y por Embarazo para Protección Social.",
  },
];

const inputCls =
  "w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

function Numerito({
  id,
  label,
  valor,
  onChange,
  max = 12,
}: {
  id: string;
  label: string;
  valor: number;
  onChange: (n: number) => void;
  max?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-zinc-800">
        {label}
      </label>
      <input
        id={id}
        type="number"
        min={0}
        max={max}
        value={valor}
        onChange={(e) => onChange(Math.max(0, Math.min(max, Number(e.target.value) || 0)))}
        className={`mt-2 ${inputCls}`}
      />
    </div>
  );
}

function Tilde({
  id,
  label,
  detalle,
  valor,
  onChange,
}: {
  id: string;
  label: string;
  detalle?: string;
  valor: boolean;
  onChange: (b: boolean) => void;
}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer gap-2.5 rounded-lg border border-zinc-200 p-3">
      <input
        id={id}
        type="checkbox"
        checked={valor}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 accent-emerald-600"
      />
      <span>
        <span className="block text-sm font-medium text-zinc-800">{label}</span>
        {detalle && <span className="block text-xs text-zinc-500">{detalle}</span>}
      </span>
    </label>
  );
}

export function CalculadoraAsignaciones() {
  const [regimen, setRegimen] = useState<Regimen>("suaf");

  // Régimen general
  const [ingresos, setIngresos] = useState<string[]>(["", ""]);
  const [zona, setZona] = useState<Zona>("general");
  const [hijos, setHijos] = useState(1);
  const [hijosDiscapacidad, setHijosDiscapacidad] = useState(0);
  const [prenatal, setPrenatal] = useState(false);
  const [conyuge, setConyuge] = useState(false);
  const [ayudaEscolar, setAyudaEscolar] = useState(false);

  // Monotributo
  const [grupo, setGrupo] = useState<GrupoMonotributo>("A");

  // AUH
  const [zonaAuh, setZonaAuh] = useState<"general" | "zona1">("general");
  const [hijosAuh, setHijosAuh] = useState(1);
  const [hijosAuhDiscapacidad, setHijosAuhDiscapacidad] = useState(0);
  const [embarazo, setEmbarazo] = useState(false);

  const hayIngreso = ingresos.some((i) => i.trim() !== "");

  const resultado = useMemo(
    () =>
      calcularAsignaciones({
        ingresos: ingresos.map(parseMonto),
        zona,
        hijos,
        hijosDiscapacidad,
        prenatal,
        conyuge,
        ayudaEscolar,
      }),
    [ingresos, zona, hijos, hijosDiscapacidad, prenatal, conyuge, ayudaEscolar],
  );

  const auh = useMemo(() => {
    const porHijo = desglose8020(V.universales.hijo[zonaAuh]);
    const porDisc = desglose8020(V.universales.hijoDiscapacidad[zonaAuh]);
    const porEmbarazo = desglose8020(V.universales.embarazo[zonaAuh]);
    const mensual =
      porHijo.mensual * hijosAuh +
      porDisc.mensual * hijosAuhDiscapacidad +
      (embarazo ? porEmbarazo.mensual : 0);
    const retenido =
      porHijo.retenido * hijosAuh +
      porDisc.retenido * hijosAuhDiscapacidad +
      (embarazo ? porEmbarazo.retenido : 0);
    return { porHijo, porDisc, porEmbarazo, mensual, retenido };
  }, [zonaAuh, hijosAuh, hijosAuhDiscapacidad, embarazo]);

  const montoMono = montoMonotributoHijo(grupo);

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <fieldset>
        <legend className="text-sm font-semibold text-zinc-800">¿Cómo trabajás?</legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-3">
          {REGIMENES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRegimen(r.id)}
              aria-pressed={regimen === r.id}
              className={`rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition ${
                regimen === r.id
                  ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                  : "border-zinc-200 text-zinc-600 hover:border-emerald-300"
              }`}
            >
              {r.etiqueta}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-zinc-500">
          {REGIMENES.find((r) => r.id === regimen)!.ayuda}
        </p>
      </fieldset>

      {/* ------------------------------------------------------------------ SUAF */}
      {regimen === "suaf" && (
        <div className="mt-6 space-y-5 border-t border-zinc-100 pt-5">
          <div>
            <span className="block text-sm font-semibold text-zinc-800">
              Ingresos brutos mensuales del grupo familiar
            </span>
            <p className="mt-0.5 text-xs text-zinc-500">
              El bruto de cada integrante, <strong>sin</strong> horas extras, sin plus por zona
              desfavorable y sin aguinaldo: así lo calcula ANSES. Cargá también jubilaciones,
              pensiones, planes y prestación por desempleo.
            </p>
            <div className="mt-2 space-y-2">
              {ingresos.map((valor, i) => (
                <div key={i} className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-zinc-400">
                    $
                  </span>
                  <input
                    inputMode="numeric"
                    aria-label={`Ingreso bruto del integrante ${i + 1}`}
                    placeholder={i === 0 ? "Ej: 950.000" : "Ej: 620.000 (opcional)"}
                    value={valor}
                    onChange={(e) => {
                      const copia = [...ingresos];
                      copia[i] = e.target.value;
                      setIngresos(copia);
                    }}
                    className={`${inputCls} pl-7 text-lg font-medium`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setIngresos([...ingresos, ""])}
                className="rounded-lg border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-600 hover:border-emerald-300 hover:text-emerald-700"
              >
                + Agregar integrante
              </button>
              {hayIngreso && (
                <p className="text-xs text-zinc-500">
                  IGF: <strong className="text-zinc-700">{formatARS(resultado.igf, 0)}</strong>
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="zona" className="block text-sm font-semibold text-zinc-800">
              Zona
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              La que declara tu empleador ante ARCA como lugar de explotación (para jubilados, el
              domicilio). No siempre coincide con dónde vivís.
            </p>
            <select
              id="zona"
              value={zona}
              onChange={(e) => setZona(e.target.value as Zona)}
              className={`mt-2 ${inputCls} bg-white`}
            >
              {ZONAS.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.nombre}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-zinc-400">
              {ZONAS.find((z) => z.id === zona)!.detalle}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Numerito id="hijos" label="Hijos menores de 18" valor={hijos} onChange={setHijos} />
            <Numerito
              id="hijos-disc"
              label="Hijos con discapacidad"
              valor={hijosDiscapacidad}
              onChange={setHijosDiscapacidad}
            />
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <Tilde
              id="prenatal"
              label="Embarazo en curso"
              detalle="Asignación prenatal"
              valor={prenatal}
              onChange={setPrenatal}
            />
            <Tilde
              id="conyuge"
              label="Cónyuge a cargo"
              detalle="Sólo jubilados y pensionados"
              valor={conyuge}
              onChange={setConyuge}
            />
            <Tilde
              id="escolar"
              label="Ayuda escolar"
              detalle="Pago único anual"
              valor={ayudaEscolar}
              onChange={setAyudaEscolar}
            />
          </div>

          {hayIngreso && (
            <div className="space-y-4 border-t border-zinc-100 pt-5" aria-live="polite">
              <div>
                <p className="text-sm text-zinc-500">Cobrás por mes en {V.vigencia}</p>
                <p className="text-3xl font-bold text-zinc-900 sm:text-4xl">
                  {formatARS(resultado.totalMensual, 0)}
                </p>
                {resultado.totalUnico > 0 && (
                  <p className="mt-1 text-sm text-zinc-500">
                    + {formatARS(resultado.totalUnico, 0)} de ayuda escolar, una vez al año.
                  </p>
                )}
              </div>

              {resultado.exclusion === "tope-individual" && (
                <div className="rounded-xl bg-rose-50 p-4 text-rose-900">
                  <p className="font-semibold">Quedás afuera por el tope individual</p>
                  <p className="mt-1 text-sm">
                    Tu grupo suma {formatARS(resultado.igf, 0)}, por debajo del tope grupal de{" "}
                    {formatARS(V.topeIgfGrupo, 0)}. Pero hay un integrante que cobra{" "}
                    {formatARS(resultado.ingresoQueExcluye ?? 0, 0)}, y superar los{" "}
                    <strong>{formatARS(V.topeIgfIndividual, 0)}</strong> de tope individual excluye a{" "}
                    <strong>todo el grupo familiar</strong>, no sólo a esa persona. Es la regla que
                    menos se explica y la que más plata cuesta.
                  </p>
                </div>
              )}

              {resultado.exclusion === "tope-grupal" && (
                <div className="rounded-xl bg-rose-50 p-4 text-rose-900">
                  <p className="font-semibold">Quedás afuera por el tope del grupo familiar</p>
                  <p className="mt-1 text-sm">
                    El IGF de {formatARS(resultado.igf, 0)} supera el tope de{" "}
                    {formatARS(V.topeIgfGrupo, 0)} de {V.vigencia}. Revisá que no hayas incluido
                    horas extras, plus por zona ni aguinaldo: ANSES los deja afuera del cálculo y
                    pueden ser la diferencia.
                  </p>
                </div>
              )}

              {resultado.conceptos.length > 0 && (
                <div className="overflow-hidden rounded-xl border border-zinc-200">
                  <table className="w-full text-sm">
                    <tbody>
                      {resultado.conceptos.map((c) => (
                        <tr key={c.clave} className="border-b border-zinc-100 last:border-0">
                          <td className="px-4 py-3">
                            <span className="font-medium text-zinc-800">{c.nombre}</span>
                            {c.cantidad > 1 && (
                              <span className="text-zinc-500"> × {c.cantidad}</span>
                            )}
                            {c.detalle && (
                              <span className="mt-0.5 block text-xs text-zinc-500">{c.detalle}</span>
                            )}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-right font-semibold text-zinc-900">
                            {formatARS(c.total, 0)}
                            <span className="block text-xs font-normal text-zinc-400">
                              {c.frecuencia === "mensual" ? "por mes" : "pago único"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {resultado.escalon && (
                <div className="rounded-xl bg-amber-50 p-4 text-amber-900">
                  <p className="font-semibold">
                    Estás a {formatARS(resultado.escalon.margen, 0)} de un escalón
                  </p>
                  <p className="mt-1 text-sm">
                    Los tramos son escalones, no una rampa. Si el ingreso del grupo pasa de{" "}
                    <strong>{formatARS(resultado.escalon.limite, 0)}</strong>, la asignación baja de
                    golpe y perdés <strong>{formatARS(resultado.escalon.perdidaMensual, 0)}</strong>{" "}
                    por mes. O sea: un aumento de menos de{" "}
                    {formatARS(resultado.escalon.perdidaMensual, 0)} que cruce ese límite te deja
                    cobrando <strong>menos</strong> que antes.
                  </p>
                </div>
              )}

              {resultado.tramo !== null && (
                <p className="text-xs text-zinc-500">
                  Tu tramo: {etiquetaTramo(V.hijo[resultado.tramo])} ·{" "}
                  {ZONAS.find((z) => z.id === zona)!.nombre}.
                </p>
              )}

              <p className="text-xs text-zinc-400">
                Es una referencia sobre la tabla oficial del mes, no una liquidación. Lo que ANSES
                deposita puede diferir por la fecha de alta del beneficio, por altas y bajas del
                grupo familiar, por la zona declarada por el empleador y por retenciones. Para tu
                caso puntual, la fuente es ANSES.
              </p>
            </div>
          )}

          {!hayIngreso && (
            <p className="text-sm text-zinc-500">
              Cargá al menos un ingreso para ver cuánto te corresponde. En {V.vigencia} la
              asignación por hijo va de {formatARS(V.hijo[3].montos.general, 0)} a{" "}
              {formatARS(V.hijo[0].montos.general, 0)} según el ingreso del grupo.
            </p>
          )}
        </div>
      )}

      {/* ----------------------------------------------------------- Monotributo */}
      {regimen === "monotributo" && (
        <div className="mt-6 space-y-5 border-t border-zinc-100 pt-5">
          <div>
            <label htmlFor="grupo" className="block text-sm font-semibold text-zinc-800">
              Tu categoría de monotributo
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              Acá no hay ingreso del grupo familiar que valga: el monto lo fija la categoría, y tenés
              que estar al día con los pagos.
            </p>
            <select
              id="grupo"
              value={grupo}
              onChange={(e) => setGrupo(e.target.value as GrupoMonotributo)}
              className={`mt-2 ${inputCls} bg-white`}
            >
              {GRUPOS_MONOTRIBUTO.map((g) => (
                <option key={g.id} value={g.id}>
                  Categoría {g.etiqueta}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3" aria-live="polite">
            <div className="rounded-xl bg-zinc-50 p-4">
              <p className="text-sm text-zinc-600">Asignación por hijo, por mes</p>
              <p className="text-3xl font-bold text-zinc-900">
                {montoMono === null ? "No corresponde" : formatARS(montoMono, 0)}
              </p>
              {montoMono === null && (
                <p className="mt-1 text-sm text-zinc-600">
                  Las categorías I, J y K no perciben asignación por hijo ni prenatal. Sí cobran la
                  asignación por hijo con discapacidad, que no tiene tope de ingresos.
                </p>
              )}
            </div>
            <div className="rounded-xl bg-zinc-50 p-4">
              <p className="text-sm text-zinc-600">Por hijo con discapacidad, por mes</p>
              <p className="text-2xl font-bold text-zinc-900">
                {formatARS(V.monotributo.hijoDiscapacidad[grupo], 0)}
              </p>
            </div>
            <div className="rounded-xl bg-zinc-50 p-4">
              <p className="text-sm text-zinc-600">Ayuda escolar anual, por hijo</p>
              <p className="text-2xl font-bold text-zinc-900">
                {formatARS(V.monotributo.ayudaEscolarTotal, 0)}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Pago único por ciclo lectivo, contra el certificado de escolaridad.
              </p>
            </div>
          </div>
          <p className="text-xs text-zinc-400">
            Los monotributistas cobran siempre el valor general: no hay diferencia por zona. La
            asignación prenatal paga lo mismo que la de hijo.
          </p>
        </div>
      )}

      {/* ------------------------------------------------------------------- AUH */}
      {regimen === "auh" && (
        <div className="mt-6 space-y-5 border-t border-zinc-100 pt-5">
          <div>
            <label htmlFor="zona-auh" className="block text-sm font-semibold text-zinc-800">
              ¿Dónde vivís?
            </label>
            <select
              id="zona-auh"
              value={zonaAuh}
              onChange={(e) => setZonaAuh(e.target.value as "general" | "zona1")}
              className={`mt-2 ${inputCls} bg-white`}
            >
              <option value="general">Resto del país</option>
              <option value="zona1">
                La Pampa, Chubut, Neuquén, Río Negro, Santa Cruz, Tierra del Fuego o Patagones
              </option>
            </select>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Numerito id="hijos-auh" label="Hijos" valor={hijosAuh} onChange={setHijosAuh} />
            <Numerito
              id="hijos-auh-disc"
              label="Hijos con discapacidad"
              valor={hijosAuhDiscapacidad}
              onChange={setHijosAuhDiscapacidad}
            />
          </div>

          <Tilde
            id="embarazo"
            label="Asignación por embarazo"
            detalle="Desde la semana 12, con inscripción al Plan Sumar"
            valor={embarazo}
            onChange={setEmbarazo}
          />

          <div className="space-y-3 border-t border-zinc-100 pt-5" aria-live="polite">
            <div>
              <p className="text-sm text-zinc-500">Te depositan por mes</p>
              <p className="text-3xl font-bold text-zinc-900 sm:text-4xl">
                {formatARS(auh.mensual, 0)}
              </p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-4 text-emerald-900">
              <p className="font-semibold">
                Y te acumulan {formatARS(auh.retenido, 0)} más por mes
              </p>
              <p className="mt-1 text-sm">
                ANSES paga el <strong>80%</strong> todos los meses y retiene el{" "}
                <strong>20%</strong>. Ese 20% se cobra junto, una vez al año, cuando presentás la
                Libreta AUH con los controles de salud y la escolaridad al día. En un año son{" "}
                <strong>{formatARS(auh.retenido * 12, 0)}</strong>. Si no presentás la libreta, se
                pierden.
              </p>
            </div>
            <p className="text-xs text-zinc-500">
              El valor total de la AUH por hijo en {V.vigencia} es{" "}
              {formatARS(V.universales.hijo[zonaAuh], 0)} ({formatARS(auh.porHijo.mensual, 0)}{" "}
              mensuales + {formatARS(auh.porHijo.retenido, 0)} retenidos). Por hijo con
              discapacidad, {formatARS(V.universales.hijoDiscapacidad[zonaAuh], 0)}. La ayuda escolar
              anual es de {formatARS(V.universales.ayudaEscolarTotal[zonaAuh], 0)} por hijo y se
              paga completa, sin retención.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
