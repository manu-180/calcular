"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { calcularAfiliacion, type Entrada, type Estado } from "@/lib/aportes-obligatorios";
import { SITUACIONES, umbralParticipacion } from "@/data/aportes-obligatorios";

const claseInput =
  "mt-2 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-zinc-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200";

const TONOS = {
  ok: "border-emerald-200 bg-emerald-50 text-emerald-950",
  atencion: "border-amber-200 bg-amber-50 text-amber-950",
  bloqueante: "border-rose-200 bg-rose-50 text-rose-950",
} as const;

const PILL: Record<Estado, string> = {
  obligatorio: "bg-emerald-100 text-emerald-900 ring-1 ring-emerald-300",
  voluntario: "bg-sky-100 text-sky-900 ring-1 ring-sky-300",
  exceptuado: "bg-violet-100 text-violet-900 ring-1 ring-violet-300",
  "no-aplica": "bg-zinc-100 text-zinc-600 ring-1 ring-zinc-300",
};

const ETIQUETA: Record<Estado, string> = {
  obligatorio: "Aporte obligatorio",
  voluntario: "Podés entrar, es voluntario",
  exceptuado: "Exceptuado",
  "no-aplica": "No corresponde por esta puerta",
};

const GRUPOS = [
  { id: "dependencia", titulo: "En relación de dependencia" },
  { id: "autonomo", titulo: "Por mi cuenta" },
  { id: "societario", titulo: "Sociedades y cargos" },
  { id: "otros", titulo: "Otros casos" },
] as const;

function Puerta({
  titulo,
  subtitulo,
  puerta,
}: {
  titulo: string;
  subtitulo: string;
  puerta: { estado: Estado; norma: string; motivo: string };
}) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4">
      <p className="text-sm font-bold text-zinc-900">{titulo}</p>
      <p className="text-xs text-zinc-500">{subtitulo}</p>
      <span
        className={`mt-3 inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${PILL[puerta.estado]}`}
      >
        {ETIQUETA[puerta.estado]}
      </span>
      {puerta.motivo && (
        <p className="mt-2.5 text-sm leading-relaxed text-zinc-700">{puerta.motivo}</p>
      )}
      {puerta.norma && <p className="mt-1.5 text-xs font-medium text-emerald-700">{puerta.norma}</p>}
    </div>
  );
}

export function CalculadoraAportesObligatorios() {
  const [situacion, setSituacion] = useState("socio");
  const [totalSocios, setTotalSocios] = useState(2);
  const [participacion, setParticipacion] = useState(50);
  const [tipoSociedad, setTipoSociedad] = useState<Entrada["tipoSociedad"]>("srl-sa");
  const [comanditadoUnico, setComanditadoUnico] = useState(false);
  const [todosParientes, setTodosParientes] = useState(false);
  const [dirigeLaSociedad, setDirige] = useState(false);
  const [provinciaAdherida, setProvinciaAdherida] = useState(true);
  const [aniosContrato, setAniosContrato] = useState(2);
  const [yaUsoLaExcepcion, setYaUso] = useState(false);
  const [residenciaPermanente, setResidencia] = useState(false);
  const [cubiertoEnSuPais, setCubierto] = useState(true);

  const entrada: Entrada = useMemo(
    () => ({
      situacion,
      totalSocios,
      participacion,
      tipoSociedad,
      comanditadoUnico,
      todosParientes,
      dirigeLaSociedad,
      provinciaAdherida,
      aniosContrato,
      yaUsoLaExcepcion,
      residenciaPermanente,
      cubiertoEnSuPais,
    }),
    [
      situacion,
      totalSocios,
      participacion,
      tipoSociedad,
      comanditadoUnico,
      todosParientes,
      dirigeLaSociedad,
      provinciaAdherida,
      aniosContrato,
      yaUsoLaExcepcion,
      residenciaPermanente,
      cubiertoEnSuPais,
    ],
  );
  const res = useMemo(() => calcularAfiliacion(entrada), [entrada]);
  const umbral = umbralParticipacion(totalSocios);

  return (
    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <label htmlFor="situacion" className="block text-sm font-semibold text-zinc-800">
          ¿Cuál es tu situación?
        </label>
        <select
          id="situacion"
          value={situacion}
          onChange={(ev) => setSituacion(ev.target.value)}
          className={claseInput}
        >
          {GRUPOS.map((g) => (
            <optgroup key={g.id} label={g.titulo}>
              {SITUACIONES.filter((s) => s.grupo === g.id).map((s) => (
                <option key={s.id} value={s.id}>
                  {s.etiqueta}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {situacion === "socio" && (
        <fieldset className="mt-5 rounded-xl border border-zinc-200 p-4">
          <legend className="px-1 text-sm font-semibold text-zinc-900">La sociedad</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="total-socios" className="block text-sm font-medium text-zinc-800">
                ¿Cuántos socios son en total?
              </label>
              <input
                id="total-socios"
                type="number"
                min={1}
                max={500}
                value={totalSocios}
                onChange={(ev) => setTotalSocios(Math.max(1, Number(ev.target.value) || 1))}
                className={claseInput}
              />
              <p className="mt-1.5 text-xs text-zinc-500">
                El umbral de la ley es cien dividido este número:{" "}
                <strong>{umbral.toFixed(2).replace(".", ",")} %</strong>.
              </p>
            </div>
            <div>
              <label htmlFor="participacion" className="block text-sm font-medium text-zinc-800">
                Tu participación en el capital (%)
              </label>
              <input
                id="participacion"
                type="number"
                min={0}
                max={100}
                step="0.01"
                value={participacion}
                onChange={(ev) => setParticipacion(Number(ev.target.value) || 0)}
                className={claseInput}
              />
            </div>
            <div>
              <label htmlFor="tipo-sociedad" className="block text-sm font-medium text-zinc-800">
                Tipo de sociedad
              </label>
              <select
                id="tipo-sociedad"
                value={tipoSociedad}
                onChange={(ev) => setTipoSociedad(ev.target.value as Entrada["tipoSociedad"])}
                className={claseInput}
              >
                <option value="srl-sa">S.R.L., S.A. u otra regular</option>
                <option value="comandita">En comandita simple o por acciones</option>
                <option value="civil-o-de-hecho">Civil, irregular o de hecho</option>
              </select>
            </div>
            <div className="space-y-2 self-end pb-1">
              {tipoSociedad === "comandita" && (
                <label className="flex items-start gap-2 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    checked={comanditadoUnico}
                    onChange={(ev) => setComanditadoUnico(ev.target.checked)}
                    className="mt-1"
                  />
                  Soy el único socio comanditado
                </label>
              )}
              <label className="flex items-start gap-2 text-sm text-zinc-700">
                <input
                  type="checkbox"
                  checked={todosParientes}
                  onChange={(ev) => setTodosParientes(ev.target.checked)}
                  className="mt-1"
                />
                Todos los socios somos parientes hasta el 2º grado
              </label>
              <label className="flex items-start gap-2 text-sm text-zinc-700">
                <input
                  type="checkbox"
                  checked={dirigeLaSociedad}
                  onChange={(ev) => setDirige(ev.target.checked)}
                  className="mt-1"
                />
                Además dirijo, administro o conduzco la sociedad
              </label>
            </div>
          </div>
        </fieldset>
      )}

      {situacion === "publica-provincial" && (
        <label className="mt-5 flex items-start gap-2 text-sm text-zinc-700">
          <input
            type="checkbox"
            checked={provinciaAdherida}
            onChange={(ev) => setProvinciaAdherida(ev.target.checked)}
            className="mt-1"
          />
          Mi provincia o municipio firmó el convenio de adhesión al sistema nacional
        </label>
      )}

      {situacion === "contratado-exterior" && (
        <fieldset className="mt-5 rounded-xl border border-zinc-200 p-4">
          <legend className="px-1 text-sm font-semibold text-zinc-900">
            Las cuatro condiciones del art. 4º
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="anios-contrato" className="block text-sm font-medium text-zinc-800">
                Duración del contrato (años)
              </label>
              <input
                id="anios-contrato"
                type="number"
                min={0}
                max={40}
                step="0.5"
                value={aniosContrato}
                onChange={(ev) => setAniosContrato(Number(ev.target.value) || 0)}
                className={claseInput}
              />
            </div>
            <div className="space-y-2 self-end pb-1">
              <label className="flex items-start gap-2 text-sm text-zinc-700">
                <input
                  type="checkbox"
                  checked={yaUsoLaExcepcion}
                  onChange={(ev) => setYaUso(ev.target.checked)}
                  className="mt-1"
                />
                Ya usé esta excepción antes
              </label>
              <label className="flex items-start gap-2 text-sm text-zinc-700">
                <input
                  type="checkbox"
                  checked={residenciaPermanente}
                  onChange={(ev) => setResidencia(ev.target.checked)}
                  className="mt-1"
                />
                Tengo residencia permanente en la Argentina
              </label>
              <label className="flex items-start gap-2 text-sm text-zinc-700">
                <input
                  type="checkbox"
                  checked={cubiertoEnSuPais}
                  onChange={(ev) => setCubierto(ev.target.checked)}
                  className="mt-1"
                />
                Estoy cubierto por vejez, invalidez y muerte en mi país
              </label>
            </div>
          </div>
        </fieldset>
      )}

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Puerta
          titulo="Como trabajador en relación de dependencia"
          subtitulo="Inciso a) del art. 2º · inciso a) del art. 3º"
          puerta={res.dependiente}
        />
        <Puerta
          titulo="Como trabajador autónomo"
          subtitulo="Inciso b) del art. 2º · inciso b) del art. 3º"
          puerta={res.autonomo}
        />
      </div>

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

      <p className="mt-5 border-t border-zinc-200 pt-4 text-xs leading-relaxed text-zinc-500">
        Esto dice <strong>si hay obligación de aportar y por qué inciso</strong>, no cuánto se paga:
        las categorías de autónomos las fija ARCA por resolución y se mueven varias veces al año. Si
        lo que buscás es el descuento del sueldo, mirá{" "}
        <Link href="/sueldo-neto" className="text-emerald-700 underline">
          sueldo neto
        </Link>{" "}
        o{" "}
        <Link href="/descuentos-del-sueldo" className="text-emerald-700 underline">
          los descuentos del recibo
        </Link>
        .
      </p>
    </div>
  );
}
