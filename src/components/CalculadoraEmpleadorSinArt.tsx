"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calcularResponsable, type Entrada, type Responsable } from "@/lib/empleador-sin-art";
import {
  MESES_ESPECIE_TRAS_EXTINCION,
  PRESTACIONES_EN_ESPECIE,
} from "@/data/empleador-sin-art";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50 text-emerald-950",
  atencion: "border-amber-200 bg-amber-50 text-amber-950",
  bloqueante: "border-rose-200 bg-rose-50 text-rose-950",
} as const;

const MARCO: Record<Responsable, string> = {
  art: "border-emerald-300 bg-emerald-50/70",
  "art-parcial": "border-amber-300 bg-amber-50/70",
  empleador: "border-rose-300 bg-rose-50/70",
  "fondo-de-garantia": "border-violet-300 bg-violet-50/70",
};

const QUIEN: Record<Responsable, string> = {
  art: "La ART",
  "art-parcial": "La ART, pero sólo la atención médica",
  empleador: "El empleador, con su propio patrimonio",
  "fondo-de-garantia": "El Fondo de Garantía de la SRT",
};

function Si({ activo }: { activo: boolean }) {
  return (
    <span
      className={`inline-block rounded px-1.5 py-0.5 text-[11px] font-semibold ${activo ? "bg-emerald-100 text-emerald-900" : "bg-zinc-100 text-zinc-500"}`}
    >
      {activo ? "sí" : "no"}
    </span>
  );
}

export function CalculadoraEmpleadorSinArt() {
  const [afiliadoAlgunaVez, setAfiliado] = useState(true);
  const [contratoExtinguido, setExtinguido] = useState(false);
  const [mesesDesdeExtincion, setMeses] = useState(1);
  const [trabajadorDeclarado, setDeclarado] = useState(false);
  const [cuotasAlDia, setAlDia] = useState(false);
  const [insuficienciaDeclarada, setInsuficiencia] = useState(false);

  const entrada: Entrada = useMemo(
    () => ({
      afiliadoAlgunaVez,
      contratoExtinguido,
      mesesDesdeExtincion,
      trabajadorDeclarado,
      cuotasAlDia,
      insuficienciaDeclarada,
    }),
    [
      afiliadoAlgunaVez,
      contratoExtinguido,
      mesesDesdeExtincion,
      trabajadorDeclarado,
      cuotasAlDia,
      insuficienciaDeclarada,
    ],
  );
  const res = useMemo(() => calcularResponsable(entrada), [entrada]);

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <fieldset className="space-y-3">
        <legend className="text-sm font-semibold text-zinc-900">
          ¿Cómo estaba la situación cuando pasó el accidente?
        </legend>

        <label className="flex items-start gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={afiliadoAlgunaVez}
            onChange={(ev) => setAfiliado(ev.target.checked)}
            className="mt-1"
          />
          <span>
            La empresa <strong>tiene o tuvo</strong> una ART contratada
            <span className="block text-xs text-zinc-500">
              Si nunca contrató ninguna, dejalo sin marcar.
            </span>
          </span>
        </label>

        {afiliadoAlgunaVez && (
          <label className="flex items-start gap-2 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={contratoExtinguido}
              onChange={(ev) => setExtinguido(ev.target.checked)}
              className="mt-1"
            />
            <span>
              La ART <strong>extinguió el contrato</strong> por falta de pago
              <span className="block text-xs text-zinc-500">
                Es un acto de la aseguradora, no la simple mora: mientras el contrato viva, la deuda
                es entre ellos.
              </span>
            </span>
          </label>
        )}

        {afiliadoAlgunaVez && contratoExtinguido && (
          <div className="pl-6">
            <label htmlFor="meses" className="block text-sm font-medium text-zinc-800">
              ¿Cuántos meses pasaron entre la extinción y el accidente?
            </label>
            <input
              id="meses"
              type="number"
              min={0}
              max={120}
              value={mesesDesdeExtincion}
              onChange={(ev) => setMeses(Math.max(0, Number(ev.target.value) || 0))}
              className={`${claseInput} max-w-[12rem]`}
            />
            <p className="mt-1.5 text-xs text-zinc-500">
              La ley deja {MESES_ESPECIE_TRAS_EXTINCION} meses de cobertura médica después de la
              extinción.
            </p>
          </div>
        )}

        {afiliadoAlgunaVez && (
          <>
            <label className="flex items-start gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={trabajadorDeclarado}
                onChange={(ev) => setDeclarado(ev.target.checked)}
                className="mt-1"
              />
              <span>
                El trabajador estaba <strong>declarado</strong> (en blanco)
              </span>
            </label>
            <label className="flex items-start gap-2 text-sm text-zinc-700">
              <input
                type="checkbox"
                checked={cuotasAlDia}
                onChange={(ev) => setAlDia(ev.target.checked)}
                className="mt-1"
              />
              <span>
                La empresa estaba <strong>al día</strong> con las cuotas de la ART
              </span>
            </label>
          </>
        )}

        <label className="flex items-start gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={insuficienciaDeclarada}
            onChange={(ev) => setInsuficiencia(ev.target.checked)}
            className="mt-1"
          />
          <span>
            Un juez <strong>declaró la insuficiencia patrimonial</strong> del empleador
            <span className="block text-xs text-zinc-500">
              Sólo importa cuando el obligado a responder es el empleador.
            </span>
          </span>
        </label>
      </fieldset>

      <div className={`mt-6 rounded-xl border p-4 ${MARCO[res.responsable]}`}>
        <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">Responde</p>
        <p className="mt-0.5 text-lg font-bold text-zinc-900">{QUIEN[res.responsable]}</p>
        <p className="mt-2 text-sm font-semibold text-zinc-900">{res.titulo}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-zinc-700">{res.detalle}</p>
        {res.repeticion && (
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">{res.repeticion}</p>
        )}
        <p className="mt-2.5 text-xs font-medium text-emerald-700">{res.norma}</p>
      </div>

      {res.alcance === "solo-en-especie" && (
        <div className="mt-3 rounded-xl border border-amber-200 bg-white p-4">
          <p className="text-sm font-semibold text-zinc-900">
            Qué entra en «prestaciones en especie»
          </p>
          <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
            {PRESTACIONES_EN_ESPECIE.map((p) => (
              <li key={p} className="text-sm text-zinc-700">
                · {p}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-zinc-500">
            La indemnización en plata <strong>no</strong> está en esta lista: por eso el alcance es
            parcial.
          </p>
        </div>
      )}

      {res.avisos.length > 0 && (
        <ul className="mt-4 space-y-2">
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

      <div className="mt-5 rounded-lg border border-zinc-200 bg-zinc-50/60 px-3 py-2 text-xs text-zinc-600">
        Tu caso, en una línea: ART contratada <Si activo={afiliadoAlgunaVez} /> · contrato
        extinguido <Si activo={contratoExtinguido} /> · trabajador declarado{" "}
        <Si activo={trabajadorDeclarado} /> · cuotas al día <Si activo={cuotasAlDia} />
      </div>

      <p className="mt-4 border-t border-zinc-200 pt-4 text-xs leading-relaxed text-zinc-500">
        Esto dice <strong>quién responde</strong>, no cuánto: los montos y los pisos están en{" "}
        <Link href="/indemnizacion-art" className="text-emerald-700 underline">
          la calculadora de indemnización por accidente
        </Link>
        , y los plazos del trámite previo, en{" "}
        <Link href="/comision-medica" className="text-emerald-700 underline">
          la comisión médica
        </Link>
        .
      </p>
    </div>
  );
}
