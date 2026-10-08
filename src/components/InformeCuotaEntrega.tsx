"use client";

import { useId, useMemo, useState } from "react";
import { CANASTA_CRIANZA_ULTIMO, TRAMOS_CRIANZA } from "@/data/canasta-crianza";
import { parseMonto } from "@/lib/formato";
import { MAX_HIJOS_INFORME, datosDeLaCalculadora, type Datos, type TramoHijo } from "@/lib/prefill/cuota";
import { armarInforme } from "@/app/(ar)/informes/cuota-alimentaria/_modelo";
import { InformeCuotaDocumento } from "@/components/InformeCuotaDocumento";

const OPCIONES: { valor: TramoHijo; texto: string }[] = [
  ...TRAMOS_CRIANZA.map((t) => ({ valor: t.id as TramoHijo, texto: t.nombre })),
  { valor: "mayor-12", texto: "13 años o más" },
];

const MAX_NOMBRE = 40;

// La hoja impresa tiene que ser sólo el informe: sin header, footer, anuncios ni widgets del sitio.
// Va acá y no en globals.css para que no pese en las otras 120 páginas. Los selectores dependen del
// layout raíz (body > div.flex > header/main/footer): si ese layout cambia, revisar la impresión.
const CSS_IMPRESION = `
@media print {
  @page { size: A4; margin: 15mm 14mm 16mm; }
  html, body { background: #fff !important; background-image: none !important; }
  body > :not(:has(.inf-doc)) { display: none !important; }
  body > div > :not(main) { display: none !important; }
  main#contenido { padding: 0 !important; margin: 0 !important; max-width: none !important; }
  .inf-seccion, .inf-tabla tr { break-inside: avoid; }
  .inf-titulo { break-after: avoid; }
}`;

function limpiarNombre(s: string): string {
  // Sólo texto: React ya escapa, pero un nombre con < > o controles no es un nombre.
  return s.replace(/[<>\u0000-\u001f\u007f]/g, "").slice(0, MAX_NOMBRE);
}

function montoInicial(n: number | null | undefined): string {
  return typeof n === "number" ? n.toLocaleString("es-AR", { maximumFractionDigits: 2 }) : "";
}

export function InformeCuotaEntrega({
  inicial,
  numero,
  emitido,
}: {
  inicial: Datos | null;
  numero: string;
  emitido: string;
}) {
  const panelId = useId();
  const [editando, setEditando] = useState(inicial === null);
  const [hijos, setHijos] = useState<TramoHijo[]>(inicial?.hijos ?? ["6-a-12"]);
  const [nombresHijos, setNombresHijos] = useState<string[]>(() => (inicial?.hijos ?? ["6-a-12"]).map(() => ""));
  const [ingresoInput, setIngresoInput] = useState(montoInicial(inicial?.ingreso));
  const [otroInput, setOtroInput] = useState(montoInicial(inicial?.otro));
  const [informaOtro, setInformaOtro] = useState(inicial ? inicial.otro !== null : false);
  const [compartido, setCompartido] = useState(inicial?.compartido ?? false);
  const [nombrePaga, setNombrePaga] = useState("");
  const [nombreOtro, setNombreOtro] = useState("");

  const datos = useMemo(
    () =>
      datosDeLaCalculadora({
        hijos,
        ingreso: parseMonto(ingresoInput),
        informaOtro,
        otroInput,
        cuidadoCompartido: compartido,
      }),
    [hijos, ingresoInput, informaOtro, otroInput, compartido],
  );
  const informe = useMemo(() => armarInforme(datos), [datos]);
  const todosMayores = hijos.every((t) => t === "mayor-12");

  const quitarHijo = (i: number) => {
    setHijos((p) => p.filter((_, j) => j !== i));
    setNombresHijos((p) => p.filter((_, j) => j !== i));
  };
  const agregarHijo = () => {
    setHijos((p) => [...p, "6-a-12"]);
    setNombresHijos((p) => [...p, ""]);
  };

  return (
    <div className="space-y-6">
      <style>{CSS_IMPRESION}</style>

      {/* ── Barra de acciones ── */}
      <div className="print:hidden">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Informe N.º {numero}
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-[1.75rem]">
              {informe ? "Tu informe está listo" : "Completá los datos y armamos tu informe"}
            </p>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-zinc-600">
              {informe
                ? "Revisalo con calma. Si querés, sumá los nombres o ajustá algún monto antes de descargarlo: el informe se recalcula al instante."
                : "No nos llegaron los datos de la calculadora, o les falta algo. Cargalos acá abajo: con el ingreso de quien paga la cuota alcanza para empezar."}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setEditando((v) => !v)}
              aria-expanded={editando}
              aria-controls={panelId}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-800 transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-snappy)] hover:border-zinc-400 hover:bg-zinc-50 active:scale-[0.98]"
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden className="size-4">
                <path d="M3.5 13.8V16.5h2.7l8-8-2.7-2.7-8 8ZM13.2 4.1l2.7 2.7" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
              {editando ? "Cerrar edición" : "Editar datos"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              disabled={!informe}
              className="group inline-flex min-h-11 items-center gap-2.5 rounded-full bg-emerald-600 py-1.5 pl-5 pr-1.5 text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform,box-shadow] duration-200 ease-[var(--ease-snappy)] hover:bg-emerald-700 hover:shadow-[0_8px_20px_-10px_rgba(0,0,0,0.3)] active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:shadow-none"
            >
              Descargar PDF
              <span className="grid size-8 place-items-center rounded-full bg-white/15 transition-transform duration-300 ease-[var(--ease-snappy)] group-hover:translate-y-px group-disabled:translate-y-0">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden className="size-4">
                  <path d="M10 3.5v9m0 0-3.5-3.5M10 12.5l3.5-3.5M4.5 16h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
          </div>
        </div>
        {informe ? (
          <p className="mt-3 text-xs leading-relaxed text-zinc-500">
            En la ventana que se abre, elegí «Guardar como PDF». Si arriba o abajo de la hoja aparece la dirección
            de esta página, destildá «Encabezados y pies de página».
          </p>
        ) : null}
      </div>

      {/* ── Edición ── */}
      <section
        id={panelId}
        hidden={!editando}
        aria-label="Datos del informe"
        className="rounded-[1.5rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5 print:hidden"
      >
        <div className="rounded-[calc(1.5rem-0.375rem)] bg-white p-5 shadow-[var(--shadow-apoyo)] sm:p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <fieldset className="space-y-3">
              <legend className="text-sm font-semibold text-zinc-900">Quien paga la cuota</legend>
              <Campo id="nombre-paga" etiqueta="Nombre" ayuda="Opcional. Sólo aparece en el informe impreso.">
                <input
                  id="nombre-paga"
                  value={nombrePaga}
                  maxLength={MAX_NOMBRE}
                  autoComplete="off"
                  onChange={(e) => setNombrePaga(limpiarNombre(e.target.value))}
                  className={INPUT}
                />
              </Campo>
              <Campo id="ingreso-paga" etiqueta="Ingreso neto por mes" ayuda="Lo que le queda en mano, o el promedio si es variable.">
                <Monto id="ingreso-paga" valor={ingresoInput} onChange={setIngresoInput} placeholder="Ej: 1.500.000" />
              </Campo>
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-sm font-semibold text-zinc-900">El otro progenitor</legend>
              <Campo id="nombre-otro" etiqueta="Nombre" ayuda="Opcional.">
                <input
                  id="nombre-otro"
                  value={nombreOtro}
                  maxLength={MAX_NOMBRE}
                  autoComplete="off"
                  onChange={(e) => setNombreOtro(limpiarNombre(e.target.value))}
                  className={INPUT}
                />
              </Campo>
              <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
                <input
                  type="checkbox"
                  checked={informaOtro}
                  onChange={(e) => setInformaOtro(e.target.checked)}
                  className="mt-0.5 size-4 accent-emerald-600"
                />
                Sé cuánto gana
              </label>
              {informaOtro ? (
                <Campo id="ingreso-otro" etiqueta="Ingreso neto por mes" ayuda="Si no tiene ingresos propios, poné 0.">
                  <Monto id="ingreso-otro" valor={otroInput} onChange={setOtroInput} placeholder="Ej: 900.000" />
                </Campo>
              ) : null}
            </fieldset>
          </div>

          <fieldset className="mt-6 border-t border-zinc-100 pt-5">
            <legend className="sr-only">Hijos</legend>
            <p className="text-sm font-semibold text-zinc-900" aria-hidden>
              Hijos
            </p>
            <ul className="mt-3 space-y-2.5">
              {hijos.map((t, i) => (
                <li key={i} className="grid grid-cols-[1fr_auto] gap-2 sm:grid-cols-[1fr_1fr_auto]">
                  <label className="sr-only" htmlFor={`hijo-nombre-${i}`}>
                    Nombre del hijo {i + 1} (opcional)
                  </label>
                  <input
                    id={`hijo-nombre-${i}`}
                    value={nombresHijos[i] ?? ""}
                    placeholder={`Hijo ${i + 1} (nombre opcional)`}
                    maxLength={MAX_NOMBRE}
                    autoComplete="off"
                    onChange={(e) => {
                      const v = limpiarNombre(e.target.value);
                      setNombresHijos((p) => p.map((n, j) => (j === i ? v : n)));
                    }}
                    className={`${INPUT} col-span-2 sm:col-span-1`}
                  />
                  <label className="sr-only" htmlFor={`hijo-tramo-${i}`}>
                    Edad del hijo {i + 1}
                  </label>
                  <select
                    id={`hijo-tramo-${i}`}
                    value={t}
                    onChange={(e) => {
                      const v = e.target.value as TramoHijo;
                      setHijos((p) => p.map((x, j) => (j === i ? v : x)));
                    }}
                    className={INPUT}
                  >
                    {OPCIONES.map((o) => (
                      <option key={o.valor} value={o.valor}>
                        {o.texto}
                      </option>
                    ))}
                  </select>
                  {hijos.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => quitarHijo(i)}
                      aria-label={`Quitar hijo ${i + 1}`}
                      className="min-h-11 rounded-xl border border-zinc-200 px-3 text-sm text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-800"
                    >
                      Quitar
                    </button>
                  ) : (
                    <span />
                  )}
                </li>
              ))}
            </ul>
            {hijos.length < MAX_HIJOS_INFORME ? (
              <button type="button" onClick={agregarHijo} className="mt-3 min-h-11 text-sm font-semibold text-emerald-700 hover:underline">
                + Agregar otro hijo
              </button>
            ) : null}
          </fieldset>

          <label className="mt-4 flex cursor-pointer items-start gap-2.5 border-t border-zinc-100 pt-5 text-sm text-zinc-700">
            <input
              type="checkbox"
              checked={compartido}
              onChange={(e) => setCompartido(e.target.checked)}
              className="mt-0.5 size-4 accent-emerald-600"
            />
            <span>
              El cuidado es compartido, con residencia alternada
              <span className="block text-xs text-zinc-500">
                Si no, tomamos que el día a día lo lleva el otro progenitor.
              </span>
            </span>
          </label>

          <p className="mt-5 rounded-xl bg-zinc-50 px-4 py-3 text-xs leading-relaxed text-zinc-600">
            Lo que cambies acá vale para esta impresión y no se guarda en ningún lado. Si volvés a abrir el enlace
            de tu compra, el informe arranca otra vez con los datos de la calculadora.
          </p>
        </div>
      </section>

      {/* ── La hoja ── */}
      <div className="rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5 print:rounded-none print:bg-transparent print:p-0 print:ring-0">
        <div className="rounded-[calc(1.75rem-0.375rem)] bg-white px-5 py-8 shadow-[var(--shadow-alzada)] sm:px-10 sm:py-12 md:px-14 print:rounded-none print:p-0 print:shadow-none">
          {informe ? (
            <InformeCuotaDocumento
              datos={datos}
              informe={informe}
              nombres={{ hijos: nombresHijos, paga: nombrePaga, otro: nombreOtro }}
              numero={numero}
              emitido={emitido}
            />
          ) : (
            <div className="grid min-h-[22rem] place-items-center text-center">
              <div className="max-w-sm">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  Informe N.º {numero}
                </p>
                <p className="mt-3 text-lg font-semibold text-zinc-800">
                  {todosMayores
                    ? "Para 13 años o más el INDEC no publica un costo"
                    : "Falta el ingreso de quien paga la cuota"}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {todosMayores
                    ? `La canasta de crianza llega hasta los 12 años. Si alguno de los chicos es más chico, sumalo y armamos el informe con el dato de ${CANASTA_CRIANZA_ULTIMO.etiqueta}.`
                    : `Cargalo arriba y el informe se arma solo, con la canasta de crianza de ${CANASTA_CRIANZA_ULTIMO.etiqueta}.`}
                </p>
                {!editando ? (
                  <button
                    type="button"
                    onClick={() => setEditando(true)}
                    className="mt-4 inline-flex min-h-11 items-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition-transform duration-200 active:scale-[0.98]"
                  >
                    Cargar los datos
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const INPUT =
  "min-h-11 w-full rounded-xl border border-zinc-300 bg-white px-3.5 text-[15px] text-zinc-900 outline-none transition-colors duration-150 placeholder:text-zinc-400 hover:border-zinc-400 focus:border-emerald-500";

function Campo({ id, etiqueta, ayuda, children }: { id: string; etiqueta: string; ayuda?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm text-zinc-700">
        {etiqueta}
      </label>
      <div className="mt-1">{children}</div>
      {ayuda ? <p className="mt-1 text-xs text-zinc-500">{ayuda}</p> : null}
    </div>
  );
}

function Monto({
  id,
  valor,
  onChange,
  placeholder,
}: {
  id: string;
  valor: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-zinc-400">$</span>
      <input
        id={id}
        inputMode="numeric"
        autoComplete="off"
        value={valor}
        maxLength={18}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`${INPUT} pl-7 tabular-nums`}
      />
    </div>
  );
}
