"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ANIOS_CONSERVACION, VIGENCIA_REFORMA } from "@/data/libro-sueldos";
import {
  MATRIZ_CASOS,
  evaluarPresuncion,
  type EstadoRegistracion,
  type Exhibicion,
} from "@/lib/libro-sueldos";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  atencion: "border-amber-200 bg-amber-50/70 text-amber-900",
  bloqueante: "border-rose-200 bg-rose-50/70 text-rose-900",
} as const;

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const OPCIONES_REGISTRACION: { valor: EstadoRegistracion; label: string }[] = [
  { valor: "registrado", label: "Sí, estaba registrado y los datos eran los reales" },
  { valor: "mal_registrado", label: "Estaba registrado, pero mal (fecha de ingreso o sueldo falsos)" },
  { valor: "sin_registrar", label: "No estaba registrado (trabajo en negro)" },
];

const OPCIONES_EXHIBICION: { valor: Exhibicion; label: string }[] = [
  { valor: "no_exhibio", label: "No: no los presentó cuando se los pidieron" },
  { valor: "exhibio", label: "Sí: presentó los libros y registros" },
];

function Marca({ aplica }: { aplica: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
        aplica ? "bg-emerald-100 text-emerald-800" : "bg-zinc-200 text-zinc-600"
      }`}
    >
      {aplica ? "Sí, se dispara" : "No se dispara"}
    </span>
  );
}

export function CalculadoraLibroSueldos() {
  const [fechaHecho, setFechaHecho] = useState("2026-08-31");
  const [registracion, setRegistracion] = useState<EstadoRegistracion>("registrado");
  const [exhibicion, setExhibicion] = useState<Exhibicion>("no_exhibio");
  const [ultimoAsientoPapel, setUltimoAsientoPapel] = useState("2026-03-05");

  const res = useMemo(
    () => evaluarPresuncion({ fechaHecho, registracion, exhibicion, ultimoAsientoPapel }),
    [fechaHecho, registracion, exhibicion, ultimoAsientoPapel],
  );

  const matriz = useMemo(
    () =>
      MATRIZ_CASOS.map((c) => {
        const r = evaluarPresuncion({
          fechaHecho: "2026-08-31",
          registracion: c.registracion,
          exhibicion: c.exhibicion,
        })!;
        return { ...c, hoy: r.hoy.aplica, antes: r.antes.aplica };
      }),
    [],
  );

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fechaHecho" className="block text-sm font-semibold text-zinc-800">
            Fecha del despido o del hecho que se discute
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Decide qué texto del art. 55 se aplica: el corte es el {VIGENCIA_REFORMA}.
          </p>
          <input
            id="fechaHecho"
            type="date"
            value={fechaHecho}
            onChange={(e) => setFechaHecho(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="ultimoAsiento" className="block text-sm font-semibold text-zinc-800">
            Último asiento en el libro de papel
          </label>
          <p className="mt-0.5 text-xs text-zinc-500">
            Para el plazo de conservación de {ANIOS_CONSERVACION} años del art. 52 nuevo.
          </p>
          <input
            id="ultimoAsiento"
            type="date"
            value={ultimoAsientoPapel}
            onChange={(e) => setUltimoAsientoPapel(e.target.value)}
            className={claseInput}
          />
        </div>

        <div>
          <label htmlFor="registracion" className="block text-sm font-semibold text-zinc-800">
            ¿Estabas registrado ante ARCA?
          </label>
          <select
            id="registracion"
            value={registracion}
            onChange={(e) => setRegistracion(e.target.value as EstadoRegistracion)}
            className={claseInput}
          >
            {OPCIONES_REGISTRACION.map((o) => (
              <option key={o.valor} value={o.valor}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="exhibicion" className="block text-sm font-semibold text-zinc-800">
            ¿El empleador exhibió los libros y registros?
          </label>
          <select
            id="exhibicion"
            value={exhibicion}
            onChange={(e) => setExhibicion(e.target.value as Exhibicion)}
            className={claseInput}
          >
            {OPCIONES_EXHIBICION.map((o) => (
              <option key={o.valor} value={o.valor}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {res === null ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50/70 px-4 py-3 text-sm text-amber-900">
          Cargá una fecha válida para el hecho que se discute.
        </p>
      ) : (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-zinc-50 p-5">
          <p className="text-sm text-zinc-600">
            En tu caso, la presunción del art. 55 de la LCT
          </p>
          <p
            className={`mt-1 text-3xl font-bold tracking-tight ${
              res.aplicable.aplica ? "text-emerald-800" : "text-rose-800"
            }`}
          >
            {res.aplicable.aplica ? "se dispara a tu favor" : "no se dispara"}
          </p>
          <p className="mt-1 text-sm text-zinc-600">
            Rige el texto{" "}
            <strong>{res.esAnteriorALaReforma ? "anterior" : "vigente"}</strong> del artículo («
            {res.aplicable.epigrafe}»), porque el hecho es{" "}
            {res.esAnteriorALaReforma ? "anterior" : "posterior"} al {VIGENCIA_REFORMA}.
          </p>
          <p className="mt-2 text-sm text-zinc-700">{res.aplicable.motivo}</p>
          {res.aplicable.aplica && (
            <p className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50/70 px-3 py-2 text-sm text-emerald-900">
              Recae sobre {res.aplicable.alcance}
            </p>
          )}

          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[32rem] text-sm">
              <tbody>
                <tr className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Con el texto vigente («Omisión de registración»)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      art. 55 sustituido por el art. 22 de la Ley 27.802
                    </span>
                  </td>
                  <td className="py-2 text-right">
                    <Marca aplica={res.hoy.aplica} />
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="py-2 pr-3">
                    <span className="font-medium text-zinc-800">
                      Con el texto anterior («Omisión de su exhibición»)
                    </span>
                    <span className="block text-xs text-zinc-500">
                      el que rigió hasta el {VIGENCIA_REFORMA}
                    </span>
                  </td>
                  <td className="py-2 text-right">
                    <Marca aplica={res.antes.aplica} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {res.conservacionHasta && (
            <p className="mt-4 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-600">
              Conservación de los libros de papel: hasta el{" "}
              <strong className="text-zinc-900">{res.conservacionHasta}</strong> (
              {ANIOS_CONSERVACION} años contados desde el último asiento que cargaste). Pueden
              digitalizarse: las copias digitales «tendrán la misma validez legal que los originales
              en formato papel».
            </p>
          )}

          {res.avisos.length > 0 && (
            <ul className="mt-4 space-y-2">
              {res.avisos.map((a, i) => (
                <li key={i} className={`rounded-lg border px-3 py-2 text-sm ${TONOS[a.tono]}`}>
                  {a.texto}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-6 space-y-2">
        <h3 className="text-sm font-semibold text-zinc-800">
          Las cuatro combinaciones, y la que la reforma dio vuelta
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[32rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left">
                <th className="py-2 pr-3 font-medium text-zinc-600">Situación</th>
                <th className="py-2 text-center font-medium text-zinc-600">Texto anterior</th>
                <th className="py-2 text-center font-medium text-zinc-600">Texto vigente</th>
              </tr>
            </thead>
            <tbody>
              {matriz.map((c) => (
                <tr
                  key={c.etiqueta}
                  className={`border-b border-zinc-200 ${
                    c.hoy !== c.antes ? "bg-rose-50/60" : ""
                  }`}
                >
                  <td className="py-2 pr-3 text-zinc-800">
                    {c.etiqueta}
                    {c.hoy !== c.antes && (
                      <span className="block text-xs font-medium text-rose-700">
                        acá cambió el resultado
                      </span>
                    )}
                  </td>
                  <td className="py-2 text-center">{c.antes ? "✅" : "—"}</td>
                  <td className="py-2 text-center">{c.hoy ? "✅" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500">
          Si lo que discutís es la registración misma, mirá también{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            la calculadora de indemnización
          </Link>{" "}
          y{" "}
          <Link
            href="/certificado-de-trabajo"
            className="font-medium text-emerald-700 hover:underline"
          >
            el certificado de trabajo del art. 80
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
