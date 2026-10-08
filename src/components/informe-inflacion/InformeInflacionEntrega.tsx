"use client";

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { parseMonto } from "@/lib/formato";
import { nombrePeriodo, PRIMER_PERIODO, sumarMeses, ULTIMO_PERIODO, type Periodo } from "@/lib/inflacion";
import { CASOS, prefill, type Caso, type Datos } from "@/lib/prefill/inflacion";
import { SelectorPeriodo } from "@/components/SelectorPeriodo";
import { armarInforme, NOMBRE_CASO } from "@/app/(ar)/informes/inflacion/_modelo";
import { InformeInflacionDocumento } from "./InformeInflacionDocumento";
import { armarCarta, cartaEnTexto, lugarYFecha, tratoPorDefecto, vigenciaPorDefecto, type Personales, type Trato } from "./carta";

const MAX_TEXTO = 60;

// La hoja impresa tiene que ser sólo el informe: sin header, footer, anuncios ni widgets del sitio.
// Va acá y no en globals.css para que no pese en las otras páginas. Los selectores dependen del
// layout raíz (body > div.flex > header/main/footer): si ese layout cambia, revisar la impresión.
// La carta arranca en hoja nueva para poder imprimirla y mandarla sola.
const CSS_IMPRESION = `
@media print {
  @page { size: A4; margin: 15mm 14mm 16mm; }
  html, body { background: #fff !important; background-image: none !important; }
  body > :not(:has(.inf-doc)) { display: none !important; }
  body > div > :not(main) { display: none !important; }
  main#contenido { padding: 0 !important; margin: 0 !important; max-width: none !important; }
  .inf-seccion, .inf-tabla tr { break-inside: avoid; }
  .inf-titulo { break-after: avoid; }
  .inf-carta { break-before: page; border-top: 0 !important; }
}`;

function limpiar(s: string): string {
  return s.replace(/[<>\u0000-\u001f\u007f]/g, "").slice(0, MAX_TEXTO);
}

function montoInicial(n: number | null | undefined): string {
  return typeof n === "number" ? n.toLocaleString("es-AR", { maximumFractionDigits: 2 }) : "";
}

const DESDE_MAX = sumarMeses(ULTIMO_PERIODO, -1);

export function InformeInflacionEntrega({
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
  const [caso, setCaso] = useState<Caso>(inicial?.caso ?? "sueldo");
  const [montoInput, setMontoInput] = useState(montoInicial(inicial?.monto));
  const [desde, setDesde] = useState<Periodo>(inicial?.desde ?? sumarMeses(ULTIMO_PERIODO, -12));
  const [hastaUltimo, setHastaUltimo] = useState(inicial ? inicial.hasta === null : true);
  const [hastaSel, setHastaSel] = useState<Periodo>(inicial?.hasta ?? ULTIMO_PERIODO);
  const [actualInput, setActualInput] = useState(montoInicial(inicial?.actual));
  const [p, setP] = useState<Personales>(() => ({
    remitente: "",
    destinatario: "",
    concepto: "",
    vigencia: "",
    ciudad: "",
    trato: tratoPorDefecto(inicial?.caso ?? "sueldo"),
  }));
  const [copiado, setCopiado] = useState<"si" | "no" | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const datos = useMemo(() => {
    const actual = caso === "sueldo" && actualInput.trim() !== "" ? parseMonto(actualInput) : null;
    return prefill.validar({
      monto: parseMonto(montoInput),
      desde,
      hasta: hastaUltimo ? null : hastaSel,
      actual: actual && actual > 0 ? actual : null,
      caso,
    });
  }, [caso, montoInput, desde, hastaUltimo, hastaSel, actualInput]);
  const informe = useMemo(() => (datos ? armarInforme(datos) : null), [datos]);

  const cambiarCaso = (c: Caso) => {
    setCaso(c);
    setP((x) => ({ ...x, trato: tratoPorDefecto(c) }));
  };
  const campo = (k: keyof Omit<Personales, "trato">) => (v: string) => setP((x) => ({ ...x, [k]: limpiar(v) }));

  const copiar = async () => {
    if (!datos || !informe) return;
    const texto = cartaEnTexto(armarCarta(datos.caso, informe, p, emitido), lugarYFecha(p, emitido));
    let ok = false;
    try {
      await navigator.clipboard.writeText(texto);
      ok = true;
    } catch {}
    setCopiado(ok ? "si" : "no");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopiado(null), 2600);
  };

  const conConcepto = caso === "honorarios" || caso === "precio";
  const motivoVacio =
    parseMonto(montoInput) <= 0
      ? "Falta el monto que querés actualizar"
      : "El mes de origen tiene que ser anterior al de llegada";

  return (
    <div className="space-y-6">
      <style>{CSS_IMPRESION}</style>

      {/* ── Barra de acciones ── */}
      <div className="print:hidden">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">Informe N.º {numero}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-[1.75rem]">
              {informe ? "Tu informe está listo" : "Completá los datos y armamos tu informe"}
            </p>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-zinc-600">
              {informe
                ? "Sumá tu nombre y el de quien lo va a recibir para que la carta salga completa. Todo se recalcula al instante y no sale de tu navegador."
                : "No nos llegaron los datos de la calculadora, o les falta algo. Cargalos acá abajo: con el monto y el mes alcanza."}
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
              onClick={copiar}
              disabled={!informe}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-800 transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-snappy)] hover:border-zinc-400 hover:bg-zinc-50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden className="size-4">
                <rect x="6.5" y="6.5" width="9" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
                <path d="M4.5 13V5.5a2 2 0 0 1 2-2H12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              {copiado === "si" ? "Carta copiada" : "Copiar la carta"}
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
        <p aria-live="polite" className="mt-3 text-xs leading-relaxed text-zinc-500">
          {copiado === "si"
            ? "La carta está en tu portapapeles: pegala en un mail o en un mensaje."
            : copiado === "no"
              ? "Tu navegador no nos dejó copiar. Seleccioná el texto de la carta y copialo a mano."
              : informe
                ? "Para el PDF, en la ventana que se abre elegí «Guardar como PDF». Si aparece la dirección de esta página arriba o abajo de la hoja, destildá «Encabezados y pies de página»."
                : ""}
        </p>
      </div>

      {/* ── Edición ── */}
      <section
        id={panelId}
        hidden={!editando}
        aria-label="Datos del informe"
        className="rounded-[1.5rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5 print:hidden"
      >
        <div className="rounded-[calc(1.5rem-0.375rem)] bg-white p-5 shadow-[var(--shadow-apoyo)] sm:p-6">
          <fieldset>
            <legend className="text-sm font-semibold text-zinc-900">¿Para qué es?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {CASOS.map((c) => (
                <label
                  key={c}
                  className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-zinc-300 px-4 text-sm text-zinc-700 transition-colors duration-150 hover:border-zinc-400 has-[:checked]:border-emerald-600 has-[:checked]:bg-emerald-50 has-[:checked]:text-emerald-900 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-emerald-300"
                >
                  <input type="radio" name="caso" value={c} checked={caso === c} onChange={() => cambiarCaso(c)} className="sr-only" />
                  {NOMBRE_CASO[c]}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 grid gap-6 border-t border-zinc-100 pt-5 md:grid-cols-2">
            <fieldset className="space-y-3">
              <legend className="text-sm font-semibold text-zinc-900">La cuenta</legend>
              <Campo id="inf-monto" etiqueta={caso === "sueldo" ? "Sueldo de entonces" : "Monto original"}>
                <Monto id="inf-monto" valor={montoInput} onChange={setMontoInput} placeholder="Ej: 350.000" />
              </Campo>
              <Campo id="inf-desde" etiqueta="Mes en que se fijó">
                <SelectorPeriodo id="inf-desde" value={desde} onChange={setDesde} min={PRIMER_PERIODO} max={DESDE_MAX} />
              </Campo>
              <div>
                <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
                  <input
                    type="checkbox"
                    checked={hastaUltimo}
                    onChange={(e) => setHastaUltimo(e.target.checked)}
                    className="mt-0.5 size-4 accent-emerald-600"
                  />
                  <span>
                    Llevarlo al último dato del INDEC ({nombrePeriodo(ULTIMO_PERIODO)})
                    <span className="block text-xs text-zinc-500">Si lo abrís cuando salga un IPC nuevo, se actualiza solo.</span>
                  </span>
                </label>
                {!hastaUltimo ? (
                  <div className="mt-3">
                    <Campo id="inf-hasta" etiqueta="Mes de llegada">
                      <SelectorPeriodo id="inf-hasta" value={hastaSel} onChange={setHastaSel} min={PRIMER_PERIODO} max={ULTIMO_PERIODO} />
                    </Campo>
                  </div>
                ) : null}
              </div>
              {caso === "sueldo" ? (
                <Campo id="inf-actual" etiqueta="Sueldo de hoy" ayuda="Opcional. Con este dato, la carta dice cuánto perdiste.">
                  <Monto id="inf-actual" valor={actualInput} onChange={setActualInput} placeholder="Ej: 1.000.000" />
                </Campo>
              ) : null}
            </fieldset>

            <fieldset className="space-y-3">
              <legend className="text-sm font-semibold text-zinc-900">La carta</legend>
              <Campo id="inf-remitente" etiqueta="Tu nombre" ayuda="Va como firma.">
                <Texto id="inf-remitente" valor={p.remitente} onChange={campo("remitente")} />
              </Campo>
              <Campo id="inf-destinatario" etiqueta="Para quién es" ayuda="Nombre, o «Sr. Gómez», o el área.">
                <Texto id="inf-destinatario" valor={p.destinatario} onChange={campo("destinatario")} />
              </Campo>
              {conConcepto ? (
                <>
                  <Campo id="inf-concepto" etiqueta={caso === "honorarios" ? "Por qué trabajo (opcional)" : "De qué es el presupuesto (opcional)"}>
                    <Texto
                      id="inf-concepto"
                      valor={p.concepto}
                      onChange={campo("concepto")}
                      placeholder={caso === "honorarios" ? "Ej: las clases de inglés" : "Ej: la instalación eléctrica"}
                    />
                  </Campo>
                  <Campo id="inf-vigencia" etiqueta="Desde cuándo rige (opcional)">
                    <Texto id="inf-vigencia" valor={p.vigencia} onChange={campo("vigencia")} placeholder={vigenciaPorDefecto(emitido)} />
                  </Campo>
                </>
              ) : null}
              <Campo id="inf-ciudad" etiqueta="Ciudad (opcional)">
                <Texto id="inf-ciudad" valor={p.ciudad} onChange={campo("ciudad")} placeholder="Ej: Córdoba" />
              </Campo>
              <fieldset>
                <legend className="text-sm text-zinc-700">Trato</legend>
                <div className="mt-1 inline-flex rounded-full bg-zinc-100 p-1">
                  {(["usted", "vos"] as Trato[]).map((t) => (
                    <label
                      key={t}
                      className="inline-flex min-h-9 cursor-pointer items-center rounded-full px-4 text-sm text-zinc-600 transition-colors duration-150 has-[:checked]:bg-white has-[:checked]:font-semibold has-[:checked]:text-zinc-900 has-[:checked]:shadow-[var(--shadow-apoyo)] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-emerald-300"
                    >
                      <input
                        type="radio"
                        name="trato"
                        value={t}
                        checked={p.trato === t}
                        onChange={() => setP((x) => ({ ...x, trato: t }))}
                        className="sr-only"
                      />
                      {t === "usted" ? "De usted" : "De vos"}
                    </label>
                  ))}
                </div>
              </fieldset>
            </fieldset>
          </div>

          <p className="mt-5 rounded-xl bg-zinc-50 px-4 py-3 text-xs leading-relaxed text-zinc-600">
            Los nombres, la ciudad y el concepto no se guardan en ningún lado: viven en esta página y van directo a la hoja.
            Si volvés a abrir el enlace de tu compra, el informe arranca otra vez con los datos de la calculadora.
          </p>
        </div>
      </section>

      {/* ── La hoja ── */}
      <div className="rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5 print:rounded-none print:bg-transparent print:p-0 print:ring-0">
        <div className="rounded-[calc(1.75rem-0.375rem)] bg-white px-5 py-8 shadow-[var(--shadow-alzada)] sm:px-10 sm:py-12 md:px-14 print:rounded-none print:p-0 print:shadow-none">
          {datos && informe ? (
            <InformeInflacionDocumento datos={datos} informe={informe} personales={p} numero={numero} emitido={emitido} />
          ) : (
            <div className="grid min-h-[22rem] place-items-center text-center">
              <div className="max-w-sm">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">Informe N.º {numero}</p>
                <p className="mt-3 text-lg font-semibold text-zinc-800">{motivoVacio}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  Cargalo arriba y el informe se arma solo, con el IPC del INDEC hasta {nombrePeriodo(ULTIMO_PERIODO)}.
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
  "min-h-11 w-full rounded-xl border border-zinc-300 bg-white px-3.5 text-[16px] text-zinc-900 outline-none transition-colors duration-150 placeholder:text-zinc-400 hover:border-zinc-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

function Campo({ id, etiqueta, ayuda, children }: { id: string; etiqueta: string; ayuda?: string; children: ReactNode }) {
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

function Texto({ id, valor, onChange, placeholder }: { id: string; valor: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      id={id}
      value={valor}
      maxLength={MAX_TEXTO}
      autoComplete="off"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={INPUT}
    />
  );
}

function Monto({ id, valor, onChange, placeholder }: { id: string; valor: string; onChange: (v: string) => void; placeholder: string }) {
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
