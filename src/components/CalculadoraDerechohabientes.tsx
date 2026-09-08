"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  calcularDerechohabientes,
  type Caso,
  type Persona,
  type Vinculo,
} from "@/lib/derechohabientes-art";
import {
  ANIOS_CONVIVENCIA,
  ANIOS_CONVIVENCIA_CON_HIJOS,
  EDAD_TOPE_LRT,
  EDAD_TOPE_LRT_ESTUDIANTE,
} from "@/data/derechohabientes-art";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50 text-emerald-950",
  atencion: "border-amber-200 bg-amber-50 text-amber-950",
  bloqueante: "border-rose-200 bg-rose-50 text-rose-950",
} as const;

const ETIQUETA_VINCULO: Record<Vinculo, string> = {
  conyuge: "Cónyuge",
  conviviente: "Conviviente",
  hijo: "Hijo o hija",
  padre: "Padre o madre",
  familiar: "Otro familiar a cargo",
};

const ESTADO_PILL = {
  si: "bg-emerald-100 text-emerald-900 ring-1 ring-emerald-300",
  no: "bg-zinc-100 text-zinc-600 ring-1 ring-zinc-300",
  discutido: "bg-amber-100 text-amber-900 ring-1 ring-amber-300",
} as const;

const ESTADO_TEXTO = { si: "Sí cobra", no: "No cobra", discutido: "Lo define un juez" } as const;

const ESCALON_TITULO = {
  art53: "1º escalón · los del art. 53 de la Ley 24.241",
  padres: "2º escalón · los padres, en partes iguales",
  familiares: "3º escalón · los familiares que estaban a cargo",
  "sin-derechohabientes": "Sin derechohabientes de la ART",
} as const;

let contador = 0;
function nuevaPersona(vinculo: Vinculo): Persona {
  contador += 1;
  const base: Persona = { id: `p${contador}`, nombre: ETIQUETA_VINCULO[vinculo], vinculo };
  if (vinculo === "hijo") return { ...base, edad: 15 };
  if (vinculo === "conviviente") return { ...base, aniosConvivencia: 5 };
  if (vinculo === "padre" || vinculo === "familiar") return { ...base, aCargo: true };
  return base;
}

export function CalculadoraDerechohabientes() {
  const [personas, setPersonas] = useState<Persona[]>([
    { id: "p0", nombre: "Cónyuge", vinculo: "conyuge" },
    { id: "p1", nombre: "Hijo o hija", vinculo: "hijo", edad: 15 },
  ]);
  const [causanteSeparadoOSoltero, setSeparado] = useState(false);
  const [conyugeDeclaradoCulpable, setCulpable] = useState(false);
  const [huboAlimentosOCausa, setAlimentos] = useState(false);

  const caso: Caso = useMemo(
    () => ({ personas, causanteSeparadoOSoltero, conyugeDeclaradoCulpable, huboAlimentosOCausa }),
    [personas, causanteSeparadoOSoltero, conyugeDeclaradoCulpable, huboAlimentosOCausa],
  );
  const res = useMemo(() => calcularDerechohabientes(caso), [caso]);

  const actualizar = (id: string, cambio: Partial<Persona>) =>
    setPersonas((prev) => prev.map((p) => (p.id === id ? { ...p, ...cambio } : p)));
  const quitar = (id: string) => setPersonas((prev) => prev.filter((p) => p.id !== id));
  const agregar = (v: Vinculo) => setPersonas((prev) => [...prev, nuevaPersona(v)]);

  const hayConyuge = personas.some((p) => p.vinculo === "conyuge");
  const hayConviviente = personas.some((p) => p.vinculo === "conviviente");

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <p className="text-sm text-zinc-600">
        Cargá el grupo familiar del trabajador fallecido. La calculadora dice, persona por persona,
        si es derechohabiente de <strong>la prestación que paga la ART</strong> (art. 18 de la Ley
        24.557) y si cobra <strong>la indemnización que paga el empleador</strong> (art. 248 de la
        LCT). Son dos listas distintas y se cobran las dos.
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {(Object.keys(ETIQUETA_VINCULO) as Vinculo[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => agregar(v)}
            className="rounded-lg border border-emerald-300 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-emerald-900 transition hover:bg-emerald-100"
          >
            + {ETIQUETA_VINCULO[v]}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {personas.length === 0 && (
          <p className="rounded-lg border border-dashed border-zinc-300 px-4 py-6 text-center text-sm text-zinc-500">
            Todavía no cargaste a nadie. Agregá al grupo familiar con los botones de arriba.
          </p>
        )}
        {personas.map((p) => (
          <div key={p.id} className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-4">
            <div className="flex items-start justify-between gap-3">
              <span className="text-sm font-semibold text-zinc-900">
                {ETIQUETA_VINCULO[p.vinculo]}
              </span>
              <button
                type="button"
                onClick={() => quitar(p.id)}
                className="rounded px-2 py-0.5 text-xs font-semibold text-zinc-500 transition hover:bg-rose-50 hover:text-rose-700"
                aria-label={`Quitar ${ETIQUETA_VINCULO[p.vinculo]}`}
              >
                Quitar
              </button>
            </div>

            {p.vinculo === "hijo" && (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor={`edad-${p.id}`} className="block text-sm font-medium text-zinc-800">
                    Edad al fallecer el trabajador
                  </label>
                  <input
                    id={`edad-${p.id}`}
                    type="number"
                    min={0}
                    max={110}
                    value={p.edad ?? 0}
                    onChange={(ev) => actualizar(p.id, { edad: Number(ev.target.value) })}
                    className={claseInput}
                  />
                </div>
                <div className="space-y-2 self-end pb-1">
                  <label className="flex items-start gap-2 text-sm text-zinc-700">
                    <input
                      type="checkbox"
                      checked={!!p.estudianteACargo}
                      onChange={(ev) => actualizar(p.id, { estudianteACargo: ev.target.checked })}
                      className="mt-1"
                    />
                    Estudiante a cargo exclusivo del trabajador
                  </label>
                  <label className="flex items-start gap-2 text-sm text-zinc-700">
                    <input
                      type="checkbox"
                      checked={!!p.incapacitado}
                      onChange={(ev) => actualizar(p.id, { incapacitado: ev.target.checked })}
                      className="mt-1"
                    />
                    Incapacitado para el trabajo
                  </label>
                  <label className="flex items-start gap-2 text-sm text-zinc-700">
                    <input
                      type="checkbox"
                      checked={!!p.cud}
                      onChange={(ev) => actualizar(p.id, { cud: ev.target.checked })}
                      className="mt-1"
                    />
                    Tiene Certificado Único de Discapacidad (CUD)
                  </label>
                  <label className="flex items-start gap-2 text-sm text-zinc-700">
                    <input
                      type="checkbox"
                      checked={!!p.gozaBeneficioPrevisional}
                      onChange={(ev) =>
                        actualizar(p.id, { gozaBeneficioPrevisional: ev.target.checked })
                      }
                      className="mt-1"
                    />
                    Ya cobra jubilación, pensión, retiro o PNC
                  </label>
                </div>
              </div>
            )}

            {p.vinculo === "conviviente" && (
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor={`conv-${p.id}`} className="block text-sm font-medium text-zinc-800">
                    Años de convivencia inmediatamente anteriores
                  </label>
                  <input
                    id={`conv-${p.id}`}
                    type="number"
                    min={0}
                    max={80}
                    value={p.aniosConvivencia ?? 0}
                    onChange={(ev) =>
                      actualizar(p.id, { aniosConvivencia: Number(ev.target.value) })
                    }
                    className={claseInput}
                  />
                </div>
                <label className="flex items-start gap-2 self-end pb-3 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    checked={!!p.hijosEnComun}
                    onChange={(ev) => actualizar(p.id, { hijosEnComun: ev.target.checked })}
                    className="mt-1"
                  />
                  Hay descendencia reconocida por ambos (baja la exigencia de {ANIOS_CONVIVENCIA} a{" "}
                  {ANIOS_CONVIVENCIA_CON_HIJOS} años)
                </label>
              </div>
            )}

            {p.vinculo === "padre" && (
              <div className="mt-3 space-y-2">
                <label className="flex items-start gap-2 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    checked={!!p.fallecido}
                    onChange={(ev) => actualizar(p.id, { fallecido: ev.target.checked })}
                    className="mt-1"
                  />
                  Ya había fallecido
                </label>
                <label className="flex items-start gap-2 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    checked={!!p.aCargo}
                    onChange={(ev) => actualizar(p.id, { aCargo: ev.target.checked })}
                    className="mt-1"
                  />
                  Estaba a cargo del trabajador (lo exige el art. 248 de la LCT)
                </label>
              </div>
            )}

            {p.vinculo === "familiar" && (
              <label className="mt-3 flex items-start gap-2 text-sm text-zinc-700">
                <input
                  type="checkbox"
                  checked={!!p.aCargo}
                  onChange={(ev) => actualizar(p.id, { aCargo: ev.target.checked })}
                  className="mt-1"
                />
                Puede acreditar que estaba a cargo del trabajador
              </label>
            )}
          </div>
        ))}
      </div>

      {(hayConviviente || hayConyuge) && (
        <fieldset className="mt-5 rounded-xl border border-zinc-200 p-4">
          <legend className="px-1 text-sm font-semibold text-zinc-900">
            La situación de la pareja
          </legend>
          <div className="space-y-2">
            <label className="flex items-start gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={causanteSeparadoOSoltero}
                onChange={(ev) => setSeparado(ev.target.checked)}
                className="mt-1"
              />
              El trabajador estaba separado (de hecho o legalmente), o era soltero, viudo o
              divorciado. <span className="text-zinc-500">Es el requisito previo que el art. 53 le
              pide al conviviente.</span>
            </label>
            <label className="flex items-start gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={conyugeDeclaradoCulpable}
                onChange={(ev) => setCulpable(ev.target.checked)}
                className="mt-1"
              />
              El cónyuge fue declarado culpable de la separación personal o del divorcio.
            </label>
            <label className="flex items-start gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={huboAlimentosOCausa}
                onChange={(ev) => setAlimentos(ev.target.checked)}
                className="mt-1"
              />
              El trabajador pagaba alimentos, se los habían demandado, o dio causa a la separación o
              al divorcio.
            </label>
          </div>
        </fieldset>
      )}

      <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
        <p className="text-sm font-semibold text-emerald-950">
          {ESCALON_TITULO[res.escalonLrt]}
        </p>
        <p className="mt-1 text-sm text-emerald-900">
          {res.titularesLrt === 0
            ? "Nadie del grupo cargado resulta derechohabiente de la prestación de la ART."
            : `${res.titularesLrt} ${res.titularesLrt === 1 ? "persona es derechohabiente" : "personas son derechohabientes"} de la ART`}
          {res.titularesLrtDiscutidos > 0
            ? `, y ${res.titularesLrtDiscutidos} más depende de una decisión judicial.`
            : "."}{" "}
          Por el art. 248, que paga el empleador,{" "}
          {res.lct.titulares === 0
            ? "no queda ningún titular"
            : `${res.lct.titulares === 1 ? "cobra 1 titular" : `cobran ${res.lct.titulares} titulares`} en partes iguales`}
          .
        </p>
      </div>

      {personas.length > 0 && (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="py-2 pr-3 font-semibold">Persona</th>
                <th className="py-2 pr-3 font-semibold">ART · art. 18</th>
                <th className="py-2 font-semibold">Empleador · art. 248</th>
              </tr>
            </thead>
            <tbody>
              {res.veredictos.map((v) => (
                <tr key={v.id} className="border-b border-zinc-100 align-top">
                  <td className="py-3 pr-3 font-medium text-zinc-900">
                    {ETIQUETA_VINCULO[v.vinculo]}
                    {v.divergente && (
                      <span className="mt-1 block text-xs font-semibold text-amber-700">
                        Cobra una y no la otra
                      </span>
                    )}
                  </td>
                  <td className="py-3 pr-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${ESTADO_PILL[v.lrt]}`}
                    >
                      {ESTADO_TEXTO[v.lrt]}
                    </span>
                    <span className="mt-1.5 block text-xs leading-relaxed text-zinc-600">
                      {v.motivoLrt}
                    </span>
                  </td>
                  <td className="py-3">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${ESTADO_PILL[v.lct]}`}
                    >
                      {ESTADO_TEXTO[v.lct]}
                    </span>
                    <span className="mt-1.5 block text-xs leading-relaxed text-zinc-600">
                      {v.motivoLct}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {res.avisos.length > 0 && (
        <ul className="mt-5 space-y-2">
          {res.avisos.map((a, i) => (
            <li
              key={i}
              className={`rounded-lg border px-3 py-2 text-sm leading-relaxed ${TONOS[a.tono]}`}
            >
              {a.texto}
            </li>
          ))}
        </ul>
      )}

      <p className="mt-5 border-t border-zinc-200 pt-4 text-xs leading-relaxed text-zinc-500">
        Esto determina <strong>quiénes</strong> son derechohabientes, no cuánto cobra cada uno: el
        monto que paga la ART lo calcula{" "}
        <Link href="/indemnizacion-art" className="text-emerald-700 underline">
          la calculadora de indemnización por accidente
        </Link>{" "}
        y el del empleador,{" "}
        <Link href="/indemnizacion-por-fallecimiento" className="text-emerald-700 underline">
          la del art. 248
        </Link>
        . El límite de edad se lee como cesa al cumplirla: un hijo de {EDAD_TOPE_LRT - 1} entra y uno
        de {EDAD_TOPE_LRT} ya no, salvo que estudie a cargo exclusivo del trabajador (ahí el corte es
        a los {EDAD_TOPE_LRT_ESTUDIANTE}) o estuviera incapacitado.
      </p>
    </div>
  );
}
