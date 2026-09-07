"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calcularMonoOS } from "@/lib/obra-social-monotributo";
import { CATEGORIAS } from "@/data/monotributo";
import { MESES_PARA_CAMBIAR, REPARTO_MONOTRIBUTO } from "@/data/obra-social-monotributo";

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

function pesos(n: number): string {
  return n.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const HOY = new Date().toISOString().slice(0, 10);

export function CalculadoraObraSocialMonotributo() {
  const [adhesion, setAdhesion] = useState(HOY);
  const [hoy, setHoy] = useState(HOY);
  const [categoria, setCategoria] = useState("A");
  const [anterior, setAnterior] = useState(false);

  const res = useMemo(
    () =>
      calcularMonoOS({
        adhesionISO: adhesion,
        hoyISO: hoy,
        categoria,
        anteriorA26565: anterior,
      }),
    [adhesion, hoy, categoria, anterior],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="mos-adhesion" className="block text-sm font-semibold text-zinc-800">
            Fecha de alta en el monotributo
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Si te diste de baja y volviste, va la fecha del reingreso: el art. 73 reinicia el
            reloj.
          </p>
          <input
            id="mos-adhesion"
            type="date"
            value={adhesion}
            onChange={(e) => setAdhesion(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="mos-hoy" className="block text-sm font-semibold text-zinc-800">
            Fecha que querés consultar
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Por defecto es hoy. Sirve para saber si vas a estar cubierto en una fecha futura.
          </p>
          <input
            id="mos-hoy"
            type="date"
            value={hoy}
            onChange={(e) => setHoy(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="mos-cat" className="block text-sm font-semibold text-zinc-800">
            Categoría
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Define cuánto aportás a la obra social: desde la D el importe sube en cada categoría.
          </p>
          <select
            id="mos-cat"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className={claseInput}
          >
            {CATEGORIAS.map((c) => (
              <option key={c.cat} value={c.cat}>
                Categoría {c.cat} — {pesos(c.obraSocial)} de obra social
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-start gap-3 pt-1 sm:pt-8">
          <input
            id="mos-viejo"
            type="checkbox"
            checked={anterior}
            onChange={(e) => setAnterior(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-500"
          />
          <label htmlFor="mos-viejo" className="text-sm text-zinc-700">
            Estoy en el monotributo <strong>sin interrupciones desde antes de 2010</strong>
            <span className="block text-xs text-zinc-500">
              El art. 72 deja fuera del acceso progresivo a quienes adhirieron antes de la Ley
              26.565.
            </span>
          </label>
        </div>
      </div>

      {res === null ? (
        <p className="mt-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Revisá las fechas: la de alta no puede ser posterior a la que querés consultar.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl bg-emerald-50 px-4 py-3">
            <p className="text-sm font-semibold text-emerald-950">{res.veredicto}</p>
          </div>

          <ol className="space-y-3">
            {res.escalones.map((x) => (
              <li
                key={x.escalon.id}
                className={`rounded-xl border px-4 py-3 ${
                  x.abierto ? "border-emerald-200 bg-white" : "border-zinc-200 bg-zinc-50"
                }`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-semibold text-zinc-900">
                    {x.abierto ? "✓ " : "· "}
                    {x.escalon.titulo}
                  </p>
                  <p className="text-sm text-zinc-600">
                    {x.abierto ? (
                      <>desde el {fechaLarga(x.desdeISO)}</>
                    ) : (
                      <>
                        se abre el <strong>{fechaLarga(x.desdeISO)}</strong> — faltan{" "}
                        {x.diasQueFaltan} día(s)
                      </>
                    )}
                  </p>
                </div>
                <p className="mt-1 text-sm text-zinc-600">{x.escalon.resumen}.</p>
                <p className="mt-1 text-xs text-zinc-500">{x.escalon.norma}</p>
              </li>
            ))}
          </ol>

          <div className="rounded-xl border border-zinc-200 bg-white px-4 py-3">
            <p className="text-sm font-semibold text-zinc-900">
              Adónde va tu aporte de {pesos(res.aporteTitular)} por mes
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              A la obra social que elegiste le llegan{" "}
              <strong>{pesos(res.aEntidad)}</strong> ({REPARTO_MONOTRIBUTO.entidad * 100}%) y{" "}
              <strong>{pesos(res.aFondo)}</strong> ({REPARTO_MONOTRIBUTO.fondo * 100}%) van al
              Fondo Solidario de Redistribución. Es un reparto distinto del{" "}
              <Link href="/derivar-aportes-a-prepaga" className="text-emerald-700 underline">
                85/15 del trabajador en relación de dependencia
              </Link>
              .
            </p>
          </div>

          <p className="text-sm text-zinc-600">
            {res.puedeCambiar ? (
              <>
                Podés <strong>cambiar de obra social</strong>: ya pasaron los{" "}
                {MESES_PARA_CAMBIAR} meses de permanencia del art. 74 inc. c). Al cambiar, la
                obra social nueva <strong>no</strong> puede volver a aplicarte la carencia.
              </>
            ) : (
              <>
                Todavía no podés cambiar de obra social: la opción se habilita el{" "}
                <strong>{fechaLarga(res.cambioDesdeISO)}</strong>, a los {MESES_PARA_CAMBIAR}{" "}
                meses de la adhesión (art. 74 inc. c). Cuando cambies, la carencia ya cumplida no
                se vuelve a cumplir.
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
