"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calcularPrescripcion, type Rama } from "@/lib/prescripcion-arca";
import { formatARS } from "@/lib/formato";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

function fechaLarga(iso: string): string {
  const [a, m, d] = iso.split("-");
  return `${Number(d)} de ${MESES[Number(m) - 1]} de ${a}`;
}

const soloNumeros = (s: string) => Number(s.replace(/[^\d]/g, ""));

export function CalculadoraPrescripcion() {
  const [rama, setRama] = useState<Rama>("impuestos");
  const [inscripto, setInscripto] = useState(true);
  const [enTermino, setEnTermino] = useState(true);
  const [anio, setAnio] = useState("2021");
  const [declarado, setDeclarado] = useState("0");
  const [determinado, setDeterminado] = useState("0");
  const [apocrifos, setApocrifos] = useState(false);

  const res = useMemo(
    () =>
      calcularPrescripcion({
        rama,
        inscripto,
        enTermino,
        anioVencimiento: soloNumeros(anio),
        declarado: soloNumeros(declarado),
        determinado: soloNumeros(determinado),
        apocrifos,
      }),
    [rama, inscripto, enTermino, anio, declarado, determinado, apocrifos],
  );

  const esImpuestos = rama === "impuestos";

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="pre-rama" className="block text-sm font-semibold text-zinc-800">
            Qué deuda
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Cada rama tiene su ley, su plazo y su umbral penal.
          </p>
          <select
            id="pre-rama"
            value={rama}
            onChange={(e) => setRama(e.target.value as Rama)}
            className={claseInput}
          >
            <option value="impuestos">Impuestos nacionales (Ley 11.683)</option>
            <option value="obra-social">Aportes y contribuciones de obra social (Ley 23.660)</option>
          </select>
        </div>

        {esImpuestos ? (
          <div>
            <label htmlFor="pre-anio" className="block text-sm font-semibold text-zinc-800">
              Año en que venció la presentación
            </label>
            <p className="mt-0.5 text-xs text-zinc-500">
              El del vencimiento general de la declaración jurada, no el del período fiscal.
            </p>
            <input
              id="pre-anio"
              inputMode="numeric"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              className={claseInput}
            />
          </div>
        ) : (
          <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-sm text-zinc-600 sm:self-end">
            La Ley 23.660 fija el plazo pero no una regla propia de inicio del cómputo, así que acá
            no se calcula una fecha: sería inventarla.
          </div>
        )}

        {esImpuestos ? (
          <div className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 sm:self-start">
            <input
              id="pre-inscripto"
              type="checkbox"
              checked={inscripto}
              onChange={(e) => setInscripto(e.target.checked)}
              className="mt-1 h-4 w-4 accent-emerald-600"
            />
            <label htmlFor="pre-inscripto" className="text-sm text-zinc-700">
              <span className="font-semibold text-zinc-800">Contribuyente inscripto</span>
              <span className="mt-0.5 block text-xs text-zinc-500">
                Si no lo está, el inciso b) fija diez años.
              </span>
            </label>
          </div>
        ) : null}

        <div className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 sm:self-start">
          <input
            id="pre-termino"
            type="checkbox"
            checked={enTermino}
            onChange={(e) => setEnTermino(e.target.checked)}
            className="mt-1 h-4 w-4 accent-emerald-600"
          />
          <label htmlFor="pre-termino" className="text-sm text-zinc-700">
            <span className="font-semibold text-zinc-800">
              Presentó en término y regularizó el saldo
            </span>
            <span className="mt-0.5 block text-xs text-zinc-500">
              Es la condición del beneficio que agregó la Ley 27.799.
            </span>
          </label>
        </div>

        <div>
          <label htmlFor="pre-declarado" className="block text-sm font-semibold text-zinc-800">
            {esImpuestos ? "Impuesto declarado" : "Aportes y contribuciones declarados"}
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">Dejá los dos en 0 si no hubo impugnación.</p>
          <input
            id="pre-declarado"
            inputMode="numeric"
            value={declarado}
            onChange={(e) => setDeclarado(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="pre-determinado" className="block text-sm font-semibold text-zinc-800">
            Lo que resulta de la impugnación
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            {esImpuestos
              ? "Por tributo y por ejercicio anual, que es como mide el umbral penal."
              : "Por mes: el umbral del art. 5° del Régimen Penal Tributario es mensual."}
          </p>
          <input
            id="pre-determinado"
            inputMode="numeric"
            value={determinado}
            onChange={(e) => setDeterminado(e.target.value)}
            className={claseInput}
          />
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 p-3 sm:col-span-2">
          <input
            id="pre-apocrifos"
            type="checkbox"
            checked={apocrifos}
            onChange={(e) => setApocrifos(e.target.checked)}
            className="mt-1 h-4 w-4 accent-emerald-600"
          />
          <label htmlFor="pre-apocrifos" className="text-sm text-zinc-700">
            <span className="font-semibold text-zinc-800">
              La impugnación se originó en facturas o documentos apócrifos
            </span>
            <span className="mt-0.5 block text-xs text-zinc-500">
              Es la condición iii): alcanza por sí sola, sin importar el monto.
            </span>
          </label>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
          <p className="text-sm font-semibold text-emerald-900">Plazo que se aplica</p>
          <p className="mt-1 text-3xl font-bold tracking-tight text-zinc-900">
            {res.plazo} {res.plazo === 1 ? "año" : "años"}
          </p>
          <p className="mt-1 text-sm text-emerald-900/80">{res.motivo}</p>
          {res.plazo !== res.plazoAnterior ? (
            <p className="mt-2 rounded-lg bg-white/70 px-3 py-2 text-sm text-emerald-900">
              Antes de la Ley 27.799 este caso prescribía a los <strong>{res.plazoAnterior} años</strong>.
            </p>
          ) : null}
        </div>

        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm font-semibold text-zinc-700">Cuándo</p>
          {res.fechaPrescripcion && res.inicioComputo ? (
            <>
              <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
                {fechaLarga(res.fechaPrescripcion)}
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                El plazo empieza el <strong>{fechaLarga(res.inicioComputo)}</strong> — el 1° de enero
                siguiente al año del vencimiento, por el artículo 57 — y corre {res.plazo} años.
              </p>
              <p
                className={`mt-2 rounded-lg px-3 py-2 text-sm ${
                  res.yaPrescribio
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border border-amber-200 bg-amber-50 text-amber-900"
                }`}
              >
                {res.yaPrescribio
                  ? "Esa fecha ya pasó: el plazo está cumplido si no hubo suspensión ni interrupción."
                  : "Todavía no se cumplió."}{" "}
                Las causales de suspensión e interrupción (arts. 65 a 67) corren la fecha y se
                verifican caso por caso.
              </p>
            </>
          ) : (
            <p className="mt-2 text-sm text-zinc-600">
              Para la deuda de obra social la ley fija el plazo pero no desde cuándo se cuenta, así
              que acá se muestra el plazo y el test de discrepancia, no una fecha.
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4">
        <p className="text-sm font-semibold text-zinc-800">
          ¿Hay discrepancia significativa? {res.hayDiscrepanciaSignificativa ? "Sí" : "No"}
        </p>
        <p className="mt-0.5 text-xs text-zinc-500">
          Alcanza con que se cumpla UNA. Umbral penal de esta rama: {formatARS(res.umbralPenal, 0)}.
        </p>
        <ul className="mt-2 space-y-2">
          {res.condiciones.map((c) => (
            <li key={c.id} className="text-sm">
              <span className={c.cumple ? "font-semibold text-rose-800" : "text-zinc-700"}>
                {c.cumple ? "✗" : "✓"} {c.titulo}
              </span>
              <span className="block text-xs text-zinc-500">{c.detalle}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 text-xs text-zinc-500">
        Los plazos y las tres condiciones salen del texto vigente de la Ley 11.683 y de la Ley
        23.660; los umbrales, del Régimen Penal Tributario con los montos que fijó la Ley 27.799.
        Acá no se estima ninguno. Para actualizar un monto adeudado está la{" "}
        <Link href="/actualizacion-creditos-laborales" className="text-emerald-700 hover:underline">
          calculadora de actualización
        </Link>
        .
      </p>
    </div>
  );
}
