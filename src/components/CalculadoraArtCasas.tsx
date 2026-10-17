"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calcularArtCasas, type Modalidad } from "@/lib/art-casas-particulares";
import { escalaVigente, vigenciaCasas } from "@/data/casas-particulares";
import { CONDICIONES, VIGENCIA_APORTES, type CondicionTrabajador } from "@/data/aportes-casas-particulares";
import { VIGENCIA_ART } from "@/data/riesgos-trabajo";
import { errorCantidad, errorMonto, parseDecimal, parseMonto, primerError } from "@/lib/formato";
import { ErrorCalculo } from "@/components/ErrorCalculo";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

function pesos(n: number): string {
  return n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50 text-emerald-950",
  atencion: "border-amber-200 bg-amber-50 text-amber-950",
  bloqueante: "border-rose-200 bg-rose-50 text-rose-950",
} as const;

export function CalculadoraArtCasas() {
  const [categoriaId, setCategoriaId] = useState("tareas-generales");
  const [modalidad, setModalidad] = useState<Modalidad>("con-retiro");
  const [horas, setHoras] = useState("20");
  const [condicion, setCondicion] = useState<CondicionTrabajador>("activo-mayor-18");
  const [edad, setEdad] = useState("40");
  const [incapacidad, setIncapacidad] = useState("30");
  const [muerte, setMuerte] = useState(false);
  const [enElTrabajo, setEnElTrabajo] = useState(true);
  const [sueldo, setSueldo] = useState("");

  const categoria = escalaVigente().find((c) => c.id === categoriaId);
  const admiteConRetiro = categoria?.mesConRetiro !== null;
  const modalidadEfectiva: Modalidad = admiteConRetiro ? modalidad : "sin-retiro";

  const error = primerError({
    "Horas semanales": errorCantidad(horas),
    "Edad": errorCantidad(edad),
    "Porcentaje de incapacidad": errorCantidad(incapacidad),
    "Sueldo mensual real": errorMonto(sueldo),
  });

  const res = useMemo(
    () =>
      calcularArtCasas({
        categoriaId,
        modalidad: modalidadEfectiva,
        horasSemanales: parseDecimal(horas),
        condicion,
        edad: parseDecimal(edad),
        incapacidad: parseDecimal(incapacidad),
        enElTrabajo,
        muerte,
        sueldoDeclarado: parseMonto(sueldo),
      }),
    [categoriaId, modalidadEfectiva, horas, condicion, edad, incapacidad, enElTrabajo, muerte, sueldo],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="ac-cat" className="block text-sm font-semibold text-zinc-800">
            Categoría
          </label>
          <select
            id="ac-cat"
            value={categoriaId}
            onChange={(ev) => setCategoriaId(ev.target.value)}
            className={claseInput}
          >
            {escalaVigente().map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre}
              </option>
            ))}
          </select>
          {categoria && <p className="mt-1 text-xs text-zinc-500">{categoria.tareas}</p>}
        </div>

        <div>
          <label htmlFor="ac-mod" className="block text-sm font-semibold text-zinc-800">
            Modalidad
          </label>
          <select
            id="ac-mod"
            value={modalidadEfectiva}
            onChange={(ev) => setModalidad(ev.target.value as Modalidad)}
            disabled={!admiteConRetiro}
            className={`${claseInput} disabled:bg-zinc-100 disabled:text-zinc-500`}
          >
            <option value="con-retiro">Con retiro</option>
            <option value="sin-retiro">Sin retiro</option>
          </select>
          {!admiteConRetiro && (
            <p className="mt-1 text-xs text-zinc-500">
              La categoría de caseros sólo existe sin retiro: por definición vive en la vivienda.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="ac-horas" className="block text-sm font-semibold text-zinc-800">
            Horas semanales
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">Define el importe de la cuota en la tabla de ARCA.</p>
          <input
            id="ac-horas"
            type="number"
            min={0}
            inputMode="numeric"
            value={horas}
            onChange={(ev) => setHoras(ev.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="ac-cond" className="block text-sm font-semibold text-zinc-800">
            Condición del trabajador
          </label>
          <select
            id="ac-cond"
            value={condicion}
            onChange={(ev) => setCondicion(ev.target.value as CondicionTrabajador)}
            className={claseInput}
          >
            {CONDICIONES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.etiqueta}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ac-sueldo" className="block text-sm font-semibold text-zinc-800">
            Sueldo mensual real <span className="font-normal text-zinc-500">(opcional)</span>
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Sólo para ver cuánto queda afuera: el reglamento liquida sobre el mínimo igual.
          </p>
          <input
            id="ac-sueldo"
            inputMode="numeric"
            value={sueldo}
            onChange={(ev) => setSueldo(ev.target.value)}
            className={claseInput}
            placeholder="Por ejemplo: 700000"
          />
        </div>

        <div>
          <label htmlFor="ac-edad" className="block text-sm font-semibold text-zinc-800">
            Edad a la primera manifestación invalidante
          </label>
          <input
            id="ac-edad"
            type="number"
            min={14}
            max={100}
            inputMode="numeric"
            value={edad}
            onChange={(ev) => setEdad(ev.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="ac-inc" className="block text-sm font-semibold text-zinc-800">
            Porcentaje de incapacidad
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">Lo determina la comisión médica, no el empleador.</p>
          <input
            id="ac-inc"
            type="number"
            min={1}
            max={100}
            inputMode="numeric"
            value={incapacidad}
            onChange={(ev) => setIncapacidad(ev.target.value)}
            disabled={muerte}
            className={`${claseInput} disabled:bg-zinc-100 disabled:text-zinc-500`}
          />
        </div>

        <div className="flex items-start gap-3 sm:pt-8">
          <input
            id="ac-muerte"
            type="checkbox"
            checked={muerte}
            onChange={(ev) => setMuerte(ev.target.checked)}
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
          />
          <label htmlFor="ac-muerte" className="text-sm text-zinc-700">
            El accidente fue <strong>fatal</strong>
            <span className="block text-xs text-zinc-500">
              En la muerte la fórmula no se multiplica por ningún porcentaje (art. 18).
            </span>
          </label>
        </div>

        <div className="flex items-start gap-3 sm:col-span-2">
          <input
            id="ac-lugar"
            type="checkbox"
            checked={enElTrabajo}
            onChange={(ev) => setEnElTrabajo(ev.target.checked)}
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
          />
          <label htmlFor="ac-lugar" className="text-sm text-zinc-700">
            Ocurrió <strong>en la casa donde trabaja</strong> o estando a disposición del empleador
            <span className="block text-xs text-zinc-500">
              Si fue in itinere, está cubierto pero sin el 20% adicional del art. 3 de la Ley 26.773.
            </span>
          </label>
        </div>
      </div>

      {error ? (
        <ErrorCalculo mensaje={error} />
      ) : res === null ? (
        <p className="mt-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Revisá los datos: la categoría, la modalidad o las horas no forman una combinación válida.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl bg-emerald-50 px-4 py-3">
            <p className="text-sm text-emerald-950">
              Base de cálculo que manda el reglamento:{" "}
              <strong>{pesos(res.baseLegal)}</strong> por mes. Es el mínimo de{" "}
              {res.categoria.nombre.toLowerCase()}{" "}
              {res.modalidad === "sin-retiro" ? "sin retiro" : "con retiro"} de la{" "}
              {vigenciaCasas().resolucion}, vigente desde {vigenciaCasas().desde}.
            </p>
          </div>

          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
              <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                Cuota de ART que paga el empleador
              </dt>
              <dd className="mt-1 text-lg font-bold text-zinc-900">
                {pesos(res.cuotaMensual)} <span className="text-sm font-normal">por mes</span>
              </dd>
              <p className="mt-1 text-xs text-zinc-500">
                Tabla de ARCA de {VIGENCIA_APORTES.mesVigente}. Se paga por adelantado, a diferencia
                del resto de los aportes.
              </p>
            </div>
            {res.sueldoDeclarado !== null && (
              <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
                <dt className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Lo que queda afuera del cálculo
                </dt>
                <dd className="mt-1 text-lg font-bold text-zinc-900">
                  {pesos(res.brecha)} <span className="text-sm font-normal">por mes</span>
                </dd>
                <p className="mt-1 text-xs text-zinc-500">
                  Diferencia entre el sueldo declarado y el mínimo de la categoría. El inciso d) no
                  la toma.
                </p>
              </div>
            )}
          </dl>

          {res.art && (
            <div className="rounded-xl border border-emerald-200 bg-white px-4 py-3">
              <p className="text-sm font-semibold text-zinc-900">
                Indemnización estimada: {pesos(res.art.total)}
              </p>
              <ul className="mt-2 space-y-1 text-sm text-zinc-600">
                <li>
                  Fórmula del régimen (53 × base × {muerte ? "1" : `${incapacidad}%`} ×{" "}
                  {res.art.coeficienteEdad.toFixed(3)}): {pesos(res.art.formula)}
                </li>
                <li>
                  Piso de la {VIGENCIA_ART.resolucion}: <strong>{pesos(res.art.piso)}</strong>
                </li>
                <li>
                  Rige el mayor de los dos:{" "}
                  <strong>
                    {res.art.mandaElPiso ? "el piso" : "la fórmula"} — {pesos(res.art.indemnizacion)}
                  </strong>
                </li>
                {res.art.compensacion > 0 && (
                  <li>
                    Compensación adicional de pago único del art. 11 ap. 4:{" "}
                    {pesos(res.art.compensacion)}
                  </li>
                )}
                {res.art.adicional20 > 0 && (
                  <li>20% del art. 3 de la Ley 26.773: {pesos(res.art.adicional20)}</li>
                )}
              </ul>
            </div>
          )}

          <ul className="space-y-2">
            {res.avisos.map((a) => (
              <li key={a.texto} className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}>
                {a.texto}
              </li>
            ))}
          </ul>

          <p className="text-sm text-zinc-600">
            El porcentaje de incapacidad lo determina la comisión médica, y ese trámite tiene sus
            propios plazos:{" "}
            <Link href="/comision-medica" className="text-emerald-700 underline">
              la instancia previa obligatoria
            </Link>
            . El detalle de la fórmula y de los pisos vive en{" "}
            <Link href="/indemnizacion-art" className="text-emerald-700 underline">
              indemnización por accidente de trabajo
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
