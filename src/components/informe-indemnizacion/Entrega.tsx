"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import { parseMonto } from "@/lib/formato";
import { datosDeLaCalculadora, prefill, type Datos } from "@/lib/prefill/indemnizacion";
import { armarInforme, comparar, type ClaveRubro } from "@/app/informes/indemnizacion/_modelo";
import { InformeIndemnizacionDocumento } from "@/components/informe-indemnizacion/Documento";

const MAX_NOMBRE = 60;

// La hoja impresa tiene que ser sólo el informe: sin header, footer, anuncios ni widgets del sitio.
// Mismo bloque que el informe de cuota alimentaria; depende del layout raíz
// (body > div.flex > header/main/footer): si ese layout cambia, revisar la impresión de los dos.
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
  return s.replace(/[<>\u0000-\u001f\u007f]/g, "").slice(0, MAX_NOMBRE);
}

function montoInicial(n: number | null | undefined): string {
  return typeof n === "number" ? n.toLocaleString("es-AR", { maximumFractionDigits: 2 }) : "";
}

function montoOpcional(s: string): number | null {
  return s.trim() === "" ? null : parseMonto(s);
}

export function InformeIndemnizacionEntrega({
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
  const [sueldoInput, setSueldoInput] = useState(montoInicial(inicial?.sueldo));
  const [ingresoISO, setIngresoISO] = useState(inicial?.ingreso ?? "");
  const [despidoISO, setDespidoISO] = useState(inicial?.despido ?? "");
  const [preaviso, setPreaviso] = useState(inicial?.preaviso ?? false);
  const [conoceTope, setConoceTope] = useState(inicial ? inicial.tope !== null : false);
  const [topeInput, setTopeInput] = useState(montoInicial(inicial?.tope));
  const [sueldoMesInput, setSueldoMesInput] = useState("");
  const [trabajador, setTrabajador] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [ofrecido, setOfrecido] = useState<Partial<Record<ClaveRubro, string>>>({});
  const [totalOfrecido, setTotalOfrecido] = useState("");

  const datos = useMemo(
    () =>
      prefill.validar(
        datosDeLaCalculadora({
          sueldo: parseMonto(sueldoInput),
          ingresoISO,
          despidoISO,
          preavisoOtorgado: preaviso,
          conoceTope,
          topeInput,
        }),
      ),
    [sueldoInput, ingresoISO, despidoISO, preaviso, conoceTope, topeInput],
  );
  const sueldoMes = montoOpcional(sueldoMesInput);
  const informe = useMemo(
    () => (datos ? armarInforme(datos, { sueldoMes: sueldoMes ?? undefined }) : null),
    [datos, sueldoMes],
  );
  const comparacion = useMemo(() => {
    if (!informe) return null;
    const o: Partial<Record<ClaveRubro, number | null>> = {};
    for (const [k, v] of Object.entries(ofrecido)) o[k as ClaveRubro] = montoOpcional(v ?? "");
    return comparar(informe, o, montoOpcional(totalOfrecido));
  }, [informe, ofrecido, totalOfrecido]);

  const fechasInvertidas = Boolean(ingresoISO && despidoISO && despidoISO <= ingresoISO);
  const falta = !parseMonto(sueldoInput)
    ? "Falta tu mejor sueldo bruto mensual"
    : !ingresoISO || !despidoISO
      ? "Faltan las fechas de ingreso y de despido"
      : fechasInvertidas
        ? "La fecha de despido tiene que ser posterior a la de ingreso"
        : "Revisá los datos";

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
                ? "Revisalo con calma. Si ya te pasaron un número, cargalo en «Editar datos» y el informe compara rubro por rubro. Todo se recalcula al instante."
                : "No nos llegaron los datos de la calculadora, o les falta algo. Cargalos acá abajo: con el sueldo y las dos fechas alcanza."}
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
            En la ventana que se abre, elegí «Guardar como PDF». Si arriba o abajo de la hoja aparece la dirección de esta
            página, destildá «Encabezados y pies de página». En el celular, el PDF queda en tus descargas para mostrarlo
            donde vayas.
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
        <div className="space-y-6 rounded-[calc(1.5rem-0.375rem)] bg-white p-5 shadow-[var(--shadow-apoyo)] sm:p-6">
          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="mb-3 text-sm font-semibold text-zinc-900">El cálculo</legend>
            <Campo id="sueldo" etiqueta="Mejor sueldo bruto mensual del último año" ayuda="Sin aguinaldo ni premios que no se paguen todos los meses.">
              <Monto id="sueldo" valor={sueldoInput} onChange={setSueldoInput} placeholder="Ej: 1.500.000" />
            </Campo>
            <Campo id="sueldo-mes" etiqueta="Sueldo del mes del despido" ayuda="Opcional. Sólo para los días trabajados, si fue distinto del mejor sueldo.">
              <Monto id="sueldo-mes" valor={sueldoMesInput} onChange={setSueldoMesInput} placeholder="Igual al anterior" />
            </Campo>
            <Campo id="ingreso" etiqueta="Fecha de ingreso">
              <input id="ingreso" type="date" value={ingresoISO} onChange={(e) => setIngresoISO(e.target.value)} className={INPUT} />
            </Campo>
            <Campo id="despido" etiqueta="Fecha del despido">
              <input id="despido" type="date" value={despidoISO} onChange={(e) => setDespidoISO(e.target.value)} className={INPUT} />
            </Campo>
            <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
              <input type="checkbox" checked={preaviso} onChange={(e) => setPreaviso(e.target.checked)} className="mt-0.5 size-4 accent-emerald-600" />
              <span>
                Me dieron preaviso y lo trabajé
                <span className="block text-xs text-zinc-500">Si no, se calcula el preaviso que te deben.</span>
              </span>
            </label>
            <div className="space-y-3">
              <label className="flex cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
                <input type="checkbox" checked={conoceTope} onChange={(e) => setConoceTope(e.target.checked)} className="mt-0.5 size-4 accent-emerald-600" />
                <span>
                  Conozco el tope de mi convenio
                  <span className="block text-xs text-zinc-500">Tres veces el sueldo promedio del convenio.</span>
                </span>
              </label>
              {conoceTope ? (
                <Campo id="tope" etiqueta="Tope indemnizatorio">
                  <Monto id="tope" valor={topeInput} onChange={setTopeInput} placeholder="Ej: 1.200.000" />
                </Campo>
              ) : null}
            </div>
          </fieldset>

          <div className="border-t border-zinc-100 pt-5">
          <fieldset className="grid gap-4 md:grid-cols-2">
            <legend className="mb-3 text-sm font-semibold text-zinc-900">Para el encabezado (opcional)</legend>
            <Campo id="trabajador" etiqueta="Tu nombre">
              <input id="trabajador" value={trabajador} maxLength={MAX_NOMBRE} autoComplete="off" onChange={(e) => setTrabajador(limpiarNombre(e.target.value))} className={INPUT} />
            </Campo>
            <Campo id="empresa" etiqueta="La empresa">
              <input id="empresa" value={empresa} maxLength={MAX_NOMBRE} autoComplete="off" onChange={(e) => setEmpresa(limpiarNombre(e.target.value))} className={INPUT} />
            </Campo>
          </fieldset>
          </div>

          {informe ? (
            <div className="border-t border-zinc-100 pt-5">
            <fieldset>
              <legend className="text-sm font-semibold text-zinc-900">Lo que te ofrecen (opcional)</legend>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                Cargá los rubros que te pasaron, o sólo el total si es lo único que tenés. Lo que dejes vacío no se compara.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {informe.rubros.map((r) => (
                  <Campo key={r.clave} id={`of-${r.clave}`} etiqueta={r.nombre}>
                    <Monto
                      id={`of-${r.clave}`}
                      valor={ofrecido[r.clave] ?? ""}
                      onChange={(v) => setOfrecido((p) => ({ ...p, [r.clave]: v }))}
                      placeholder="Sin dato"
                    />
                  </Campo>
                ))}
              </div>
              <div className="mt-4 border-t border-dashed border-zinc-200 pt-4 sm:max-w-[calc(50%-0.375rem)]">
                <Campo id="of-total" etiqueta="O sólo el total que te ofrecen" ayuda="Se usa si no cargaste ningún rubro.">
                  <Monto id="of-total" valor={totalOfrecido} onChange={setTotalOfrecido} placeholder="Sin dato" />
                </Campo>
              </div>
            </fieldset>
            </div>
          ) : null}

          <p className="rounded-xl bg-zinc-50 px-4 py-3 text-xs leading-relaxed text-zinc-600">
            Lo que cambies acá vale para esta impresión y no se guarda en ningún lado: tu nombre, el de la empresa y lo que
            te ofrecen no salen de este navegador. Si volvés a abrir el enlace de tu compra, el informe arranca otra vez con
            los datos de la calculadora.
          </p>
        </div>
      </section>

      {/* ── La hoja ── */}
      <div className="rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5 print:rounded-none print:bg-transparent print:p-0 print:ring-0">
        <div className="rounded-[calc(1.75rem-0.375rem)] bg-white px-5 py-8 shadow-[var(--shadow-alzada)] sm:px-10 sm:py-12 md:px-14 print:rounded-none print:p-0 print:shadow-none">
          {informe && datos ? (
            <InformeIndemnizacionDocumento
              datos={datos}
              informe={informe}
              comparacion={comparacion}
              personales={{ trabajador, empresa }}
              numero={numero}
              emitido={emitido}
            />
          ) : (
            <div className="grid min-h-[22rem] place-items-center text-center">
              <div className="max-w-sm">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">Informe N.º {numero}</p>
                <p className="mt-3 text-lg font-semibold text-zinc-800">{falta}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  Cargalo arriba y el informe se arma solo, con el texto vigente de la Ley de Contrato de Trabajo.
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
