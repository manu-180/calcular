"use client";

import { useMemo, useState } from "react";
import { CONSULTADO_EL } from "@/data/convenio-vencido";
import {
  CLAUSULAS,
  evaluarPrelacion,
  evaluarUltraactividad,
} from "@/lib/convenio-vencido";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const fechaLarga = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function Casillero({
  id,
  checked,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-start gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-sm text-zinc-700"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 accent-emerald-600"
      />
      <span>{children}</span>
    </label>
  );
}

export function CalculadoraConvenioVencido() {
  const [modo, setModo] = useState<"ultraactividad" | "prelacion">("ultraactividad");

  const [clave, setClave] = useState("escala");
  const [fecha, setFecha] = useState(CONSULTADO_EL);
  const [acuerdo, setAcuerdo] = useState(false);
  const [convenioNuevo, setConvenioNuevo] = useState(false);

  const [fechaPrel, setFechaPrel] = useState(CONSULTADO_EL);
  const [menorPosterior, setMenorPosterior] = useState(true);
  const [menorFavorable, setMenorFavorable] = useState(false);

  const ultra = useMemo(
    () => evaluarUltraactividad(clave, fecha, acuerdo, convenioNuevo),
    [clave, fecha, acuerdo, convenioNuevo],
  );
  const prel = useMemo(
    () => evaluarPrelacion(fechaPrel, menorPosterior, menorFavorable),
    [fechaPrel, menorPosterior, menorFavorable],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Qué querés resolver">
        {(
          [
            ["ultraactividad", "Mi convenio venció"],
            ["prelacion", "Me alcanzan dos convenios"],
          ] as const
        ).map(([id, etiqueta]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={modo === id}
            onClick={() => setModo(id)}
            className={`rounded-lg px-3.5 py-2 text-sm font-semibold transition ${
              modo === id
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            {etiqueta}
          </button>
        ))}
      </div>

      {modo === "ultraactividad" ? (
        <>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="clausula" className="block text-sm font-semibold text-zinc-800">
                Qué cláusula del convenio te interesa
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">
                Encuadrada con el criterio del art. 6, no con una clasificación propia.
              </p>
              <select
                id="clausula"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                className={claseInput}
              >
                {CLAUSULAS.map((c) => (
                  <option key={c.clave} value={c.clave}>
                    {c.etiqueta}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="fecha-ultra" className="block text-sm font-semibold text-zinc-800">
                Fecha que querés analizar
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">Decide qué redacción del art. 6 rige.</p>
              <input
                id="fecha-ultra"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className={claseInput}
              />
            </div>

            <div className="space-y-2 sm:pt-7">
              <Casillero id="acuerdo" checked={acuerdo} onChange={setAcuerdo}>
                Hay un <strong>acuerdo de partes</strong> que prorroga las cláusulas
              </Casillero>
              <Casillero id="convenio-nuevo" checked={convenioNuevo} onChange={setConvenioNuevo}>
                Ya entró en vigencia un <strong>convenio nuevo</strong>
              </Casillero>
            </div>
          </div>

          {ultra === null ? (
            <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-900">
              Cargá una fecha válida.
            </p>
          ) : (
            <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm text-zinc-600">
                {ultra.clausula.etiqueta} · {ultra.clausula.tipo === "normativa" ? "cláusula normativa" : "cláusula obligacional"}
              </p>
              <p
                className={`mt-1 text-3xl font-bold tracking-tight ${
                  ultra.sobrevive ? "text-emerald-700" : "text-rose-700"
                }`}
              >
                {ultra.sobrevive ? "Sigue aplicándose" : "No sigue aplicándose"}
              </p>
              <p className="mt-1 text-sm text-zinc-600">{ultra.clausula.porQue}</p>
              {ultra.condicion && !ultra.sobrevive && (
                <p className="mt-2 text-sm text-zinc-700">
                  Lo único que la sostendría: <strong>{ultra.condicion}</strong>.
                </p>
              )}

              <div className="mt-5 space-y-2">
                {ultra.avisos.map((a, i) => (
                  <p key={i} className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}>
                    {a.texto}
                  </p>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="fecha-prel" className="block text-sm font-semibold text-zinc-800">
                Fecha que querés analizar
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">
                El 6/3/2026 parte la serie en dos reglas incompatibles.
              </p>
              <input
                id="fecha-prel"
                type="date"
                value={fechaPrel}
                onChange={(e) => setFechaPrel(e.target.value)}
                className={claseInput}
              />
            </div>

            <div className="space-y-2 sm:pt-7">
              <Casillero id="menor-posterior" checked={menorPosterior} onChange={setMenorPosterior}>
                El convenio de <strong>ámbito menor</strong> (empresa) es el{" "}
                <strong>más nuevo</strong> de los dos
              </Casillero>
              <Casillero id="menor-favorable" checked={menorFavorable} onChange={setMenorFavorable}>
                El de ámbito menor es <strong>más favorable</strong> al trabajador
              </Casillero>
            </div>
          </div>

          {prel === null ? (
            <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-900">
              Cargá una fecha válida.
            </p>
          ) : (
            <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
              <p className="text-sm text-zinc-600">Al {fechaLarga(prel.fechaIso)} prevalece</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-emerald-700">
                {prel.prevalece === "menor"
                  ? "El convenio de ámbito menor"
                  : prel.prevalece === "mayor"
                    ? "El convenio de ámbito mayor"
                    : "No lo resuelve el art. 19"}
              </p>
              <p className="mt-1 text-sm text-zinc-600">{prel.regla}</p>

              <div className="mt-5 rounded-xl border border-zinc-300 bg-white p-4">
                <p className="text-sm font-semibold text-zinc-800">Con la otra redacción</p>
                <p className="mt-1 text-sm text-zinc-700">{prel.contraste}</p>
              </div>

              <div className="mt-5 space-y-2">
                {prel.avisos.map((a, i) => (
                  <p key={i} className={`rounded-xl border px-4 py-3 text-sm ${TONOS[a.tono]}`}>
                    {a.texto}
                  </p>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
