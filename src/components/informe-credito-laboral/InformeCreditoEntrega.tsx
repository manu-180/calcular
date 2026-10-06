"use client";

import { useId, useMemo, useState } from "react";
import { SelectorPeriodo } from "@/components/SelectorPeriodo";
import { parseDecimal, parseMonto } from "@/lib/formato";
import { PRIMER_PERIODO, ULTIMO_PERIODO, mesesEntre, nombrePeriodo, sumarMeses, type Periodo } from "@/lib/inflacion";
import { CONCEPTOS, MAX_RUBROS, type ConceptoId, type Datos } from "@/lib/prefill/credito-laboral";
import { armarInforme } from "@/app/informes/credito-laboral/_modelo";
import { InformeCreditoDocumento, type DatosCausa } from "@/components/informe-credito-laboral/InformeCreditoDocumento";

// La hoja impresa tiene que ser sólo el informe: sin header, footer, anuncios ni widgets del sitio.
// Mismos selectores que el informe de cuota alimentaria: dependen del layout raíz
// (body > div.flex > header/main/footer). Si ese layout cambia, revisar la impresión de los dos.
const CSS_IMPRESION = `
@media print {
  @page { size: A4; margin: 14mm 13mm 15mm; }
  html, body { background: #fff !important; background-image: none !important; }
  body > :not(:has(.inf-doc)) { display: none !important; }
  body > div > :not(main) { display: none !important; }
  main#contenido { padding: 0 !important; margin: 0 !important; max-width: none !important; }
  .inf-seccion, .inf-tabla tr { break-inside: avoid; }
  .inf-titulo { break-after: avoid; }
}`;

const MAX_TEXTO = 120;
const MAX_PAGO = sumarMeses(ULTIMO_PERIODO, 6);

type RubroEditable = { concepto: ConceptoId; etiqueta: string; monto: string; desde: Periodo };

function limpiar(s: string): string {
  return s.replace(/[<>\u0000-\u001f\u007f]/g, "").slice(0, MAX_TEXTO);
}

function montoTexto(n: number): string {
  return n.toLocaleString("es-AR", { maximumFractionDigits: 2 });
}

function rubrosIniciales(inicial: Datos | null): RubroEditable[] {
  if (!inicial) return [{ concepto: "credito", etiqueta: "", monto: "", desde: sumarMeses(ULTIMO_PERIODO, -12) }];
  return inicial.rubros.map((r) => ({ concepto: r.concepto, etiqueta: "", monto: montoTexto(r.monto), desde: r.desde }));
}

export function InformeCreditoEntrega({
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
  const [rubros, setRubros] = useState<RubroEditable[]>(() => rubrosIniciales(inicial));
  const [hasta, setHasta] = useState<Periodo>(inicial?.hasta ?? ULTIMO_PERIODO);
  const [litis, setLitis] = useState(inicial && inicial.litis > 0 ? inicial.litis.toLocaleString("es-AR", { maximumFractionDigits: 2 }) : "");
  const [causa, setCausa] = useState<Omit<DatosCausa, "etiquetas">>({
    autos: "",
    expediente: "",
    juzgado: "",
    actor: "",
    demandado: "",
    letrado: "",
  });

  const datos: Datos = useMemo(
    () => ({
      rubros: rubros.map((r) => ({ concepto: r.concepto, monto: parseMonto(r.monto), desde: r.desde })),
      hasta,
      litis: Math.min(Math.max(parseDecimal(litis), 0), 20),
    }),
    [rubros, hasta, litis],
  );
  const informe = useMemo(() => armarInforme(datos), [datos]);

  const sinMonto = datos.rubros.findIndex((r) => !(r.monto > 0));
  const posterior = datos.rubros.findIndex((r) => mesesEntre(r.desde, hasta) < 0);
  const motivo =
    sinMonto >= 0
      ? `Falta el monto del rubro ${sinMonto + 1}.`
      : posterior >= 0
        ? `El rubro ${posterior + 1} se hizo exigible después del mes de pago. Revisá las dos fechas.`
        : null;

  const cambiar = (i: number, cambio: Partial<RubroEditable>) =>
    setRubros((p) => p.map((r, j) => (j === i ? { ...r, ...cambio } : r)));
  const quitar = (i: number) => setRubros((p) => p.filter((_, j) => j !== i));
  const agregar = () =>
    setRubros((p) => [...p, { concepto: "otro", etiqueta: "", monto: "", desde: p[p.length - 1]?.desde ?? hasta }]);

  return (
    <div className="space-y-6">
      <style>{CSS_IMPRESION}</style>

      {/* ── Barra de acciones ── */}
      <div className="print:hidden">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">Informe N.º {numero}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-[1.75rem]">
              {informe ? "Tu liquidación está lista" : "Completá los rubros y armamos tu liquidación"}
            </p>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-zinc-600">
              {informe
                ? "Revisala con calma. Podés sumar rubros, cambiar el mes de pago o cargar la carátula antes de descargarla: todo se recalcula al instante."
                : "No nos llegaron los datos de la calculadora, o les falta algo. Cargá al menos un rubro con su monto y el mes en que se hizo exigible."}
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
              {editando ? "Cerrar edición" : "Editar rubros y carátula"}
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
            En la ventana que se abre, elegí «Guardar como PDF». Si arriba o abajo de la hoja aparece la dirección de esta
            página, destildá «Encabezados y pies de página».
          </p>
        ) : null}
      </div>

      {/* ── Edición ── */}
      <section
        id={panelId}
        hidden={!editando}
        aria-label="Datos de la liquidación"
        className="rounded-[1.5rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5 print:hidden"
      >
        <div className="rounded-[calc(1.5rem-0.375rem)] bg-white p-5 shadow-[var(--shadow-apoyo)] sm:p-6">
          <fieldset>
            <legend className="text-sm font-semibold text-zinc-900">Rubros</legend>
            <p className="mt-0.5 text-xs text-zinc-500">
              Cada uno con su monto nominal, sin actualizar, y el mes en que se hizo exigible.
            </p>
            <ol className="mt-4 space-y-4">
              {rubros.map((r, i) => (
                <li key={i} className="rounded-xl border border-zinc-200 p-3.5 sm:p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold tabular-nums text-emerald-700">Rubro {i + 1}</p>
                    {rubros.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => quitar(i)}
                        aria-label={`Quitar el rubro ${i + 1}`}
                        className="min-h-11 rounded-lg px-2 text-sm text-zinc-500 transition-colors hover:text-zinc-900"
                      >
                        Quitar
                      </button>
                    ) : null}
                  </div>
                  <div className="mt-2 grid gap-3 sm:grid-cols-2">
                    <Campo id={`rubro-concepto-${i}`} etiqueta="Concepto">
                      <select
                        id={`rubro-concepto-${i}`}
                        value={r.concepto}
                        onChange={(e) => cambiar(i, { concepto: e.target.value as ConceptoId })}
                        className={INPUT}
                      >
                        {CONCEPTOS.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.nombre}
                          </option>
                        ))}
                      </select>
                    </Campo>
                    <Campo id={`rubro-etiqueta-${i}`} etiqueta="Nombre en el informe" ayuda="Opcional. Ej.: «Art. 245 LCT».">
                      <input
                        id={`rubro-etiqueta-${i}`}
                        value={r.etiqueta}
                        maxLength={MAX_TEXTO}
                        autoComplete="off"
                        onChange={(e) => cambiar(i, { etiqueta: limpiar(e.target.value) })}
                        className={INPUT}
                      />
                    </Campo>
                    <Campo id={`rubro-monto-${i}`} etiqueta="Monto nominal">
                      <Monto id={`rubro-monto-${i}`} valor={r.monto} onChange={(v) => cambiar(i, { monto: v })} />
                    </Campo>
                    <div>
                      <label htmlFor={`rubro-desde-${i}`} className="block text-sm text-zinc-700">
                        Exigible desde
                      </label>
                      <div className="mt-1">
                        <SelectorPeriodo
                          id={`rubro-desde-${i}`}
                          value={r.desde}
                          onChange={(p) => cambiar(i, { desde: p })}
                          min={PRIMER_PERIODO}
                          max={ULTIMO_PERIODO}
                        />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            {rubros.length < MAX_RUBROS ? (
              <button type="button" onClick={agregar} className="mt-3 min-h-11 text-sm font-semibold text-emerald-700 hover:underline">
                + Agregar otro rubro
              </button>
            ) : null}
          </fieldset>

          <div className="mt-6 grid gap-5 border-t border-zinc-100 pt-5 sm:grid-cols-2">
            <div>
              <label htmlFor="pago" className="block text-sm font-semibold text-zinc-900">
                Mes del pago
              </label>
              <p className="mt-0.5 text-xs text-zinc-500">
                Último IPC publicado: {nombrePeriodo(ULTIMO_PERIODO)}.
              </p>
              <div className="mt-2">
                <SelectorPeriodo id="pago" value={hasta} onChange={setHasta} min={PRIMER_PERIODO} max={MAX_PAGO} />
              </div>
            </div>
            <Campo id="litis" etiqueta="Pacto de cuota litis (%)" ayuda="Opcional. El art. 277 lo topea en el 20%.">
              <input id="litis" inputMode="decimal" value={litis} maxLength={5} onChange={(e) => setLitis(e.target.value)} className={INPUT} />
            </Campo>
          </div>

          <fieldset className="mt-6 border-t border-zinc-100 pt-5">
            <legend className="text-sm font-semibold text-zinc-900">Carátula</legend>
            <p className="mt-0.5 text-xs text-zinc-500">Opcional. Lo que completes aparece arriba del informe.</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {(
                [
                  ["autos", "Autos", "Ej.: Pérez, Juan c/ Empresa S.A. s/ despido"],
                  ["expediente", "Expediente N.º", ""],
                  ["juzgado", "Juzgado o tribunal", ""],
                  ["actor", "Parte actora", ""],
                  ["demandado", "Parte demandada", ""],
                  ["letrado", "Letrado/a que firma", "Aparece al pie, con espacio para firma"],
                ] as const
              ).map(([clave, etiqueta, ayuda]) => (
                <Campo key={clave} id={`causa-${clave}`} etiqueta={etiqueta} ayuda={ayuda || undefined}>
                  <input
                    id={`causa-${clave}`}
                    value={causa[clave]}
                    maxLength={MAX_TEXTO}
                    autoComplete="off"
                    onChange={(e) => setCausa((c) => ({ ...c, [clave]: limpiar(e.target.value) }))}
                    className={INPUT}
                  />
                </Campo>
              ))}
            </div>
          </fieldset>

          <p className="mt-5 rounded-xl bg-zinc-50 px-4 py-3 text-xs leading-relaxed text-zinc-600">
            La carátula y los nombres de los rubros no salen de tu navegador y no se guardan en ningún lado. Si volvés a
            abrir el enlace de tu compra, el informe arranca otra vez con los datos de la calculadora y el último IPC
            publicado.
          </p>
        </div>
      </section>

      {/* ── La hoja ── */}
      <div className="rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5 print:rounded-none print:bg-transparent print:p-0 print:ring-0">
        <div className="rounded-[calc(1.75rem-0.375rem)] bg-white px-5 py-8 shadow-[var(--shadow-alzada)] sm:px-10 sm:py-12 md:px-14 print:rounded-none print:p-0 print:shadow-none">
          {informe ? (
            <InformeCreditoDocumento
              informe={informe}
              causa={{ ...causa, etiquetas: rubros.map((r) => r.etiqueta) }}
              numero={numero}
              emitido={emitido}
            />
          ) : (
            <div className="grid min-h-[22rem] place-items-center text-center">
              <div className="max-w-sm">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">Informe N.º {numero}</p>
                <p className="mt-3 text-lg font-semibold text-zinc-800">{motivo ?? "Falta un dato para armar la liquidación"}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  Apenas cada rubro tenga su monto y su mes, la liquidación se arma sola con el IPC de{" "}
                  {nombrePeriodo(ULTIMO_PERIODO)}.
                </p>
                {!editando ? (
                  <button
                    type="button"
                    onClick={() => setEditando(true)}
                    className="mt-4 inline-flex min-h-11 items-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition-transform duration-200 active:scale-[0.98]"
                  >
                    Cargar los rubros
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

function Monto({ id, valor, onChange }: { id: string; valor: string; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-zinc-400">$</span>
      <input
        id={id}
        inputMode="decimal"
        autoComplete="off"
        value={valor}
        maxLength={20}
        placeholder="Ej.: 1.500.000"
        onChange={(e) => onChange(e.target.value)}
        className={`${INPUT} pl-7 tabular-nums`}
      />
    </div>
  );
}
