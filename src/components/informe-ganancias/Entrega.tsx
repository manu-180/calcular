"use client";

import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { parseMonto } from "@/lib/formato";
import { datosDeLaCalculadora, type Datos } from "@/lib/prefill/ganancias";
import { GASTOS_VACIOS, armarInforme, type Gastos } from "@/app/informes/ganancias/_modelo";
import { InformeGananciasDocumento } from "@/components/informe-ganancias/Documento";

// La hoja impresa tiene que ser sólo el informe. Mismos selectores que el informe de cuota: dependen
// del layout raíz (body > div.flex > header/main/footer); si ese layout cambia, revisar la impresión.
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

type CamposGastos = {
  alquiler: string;
  titular: boolean;
  domestica: string;
  horas: string;
  prepaga: string;
  educacion: string;
  honorarios: string;
  vida: string;
  retiro: string;
  donaciones: string;
  hipotecario: boolean;
};

const CAMPOS_VACIOS: CamposGastos = {
  alquiler: "",
  titular: false,
  domestica: "",
  horas: String(GASTOS_VACIOS.domesticaHoras),
  prepaga: "",
  educacion: "",
  honorarios: "",
  vida: "",
  retiro: "",
  donaciones: "",
  hipotecario: false,
};

function gastosDe(c: CamposGastos): Gastos {
  const horas = parseMonto(c.horas);
  return {
    alquilerMensual: parseMonto(c.alquiler),
    titularInmueble: c.titular,
    domesticaMensual: parseMonto(c.domestica),
    domesticaHoras: horas > 0 ? Math.min(horas, 168) : GASTOS_VACIOS.domesticaHoras,
    prepagaMensual: parseMonto(c.prepaga),
    honorariosAnual: parseMonto(c.honorarios),
    educacionMensual: parseMonto(c.educacion),
    seguroVidaMensual: parseMonto(c.vida),
    seguroRetiroMensual: parseMonto(c.retiro),
    donacionesAnual: parseMonto(c.donaciones),
    hipotecario: c.hipotecario,
  };
}

// Lo que paga se guarda en ESTE navegador para que no tenga que volver a escribirlo si reabre el
// enlace. Nunca sale de acá: no viaja con el pago ni a ningún servidor.
const claveGastos = (numero: string) => `ca:informe-ganancias:gastos:${numero}`;

function leerGastos(numero: string): CamposGastos | null {
  try {
    const crudo = localStorage.getItem(claveGastos(numero));
    if (!crudo) return null;
    const o = JSON.parse(crudo) as Partial<CamposGastos>;
    const r: CamposGastos = { ...CAMPOS_VACIOS };
    for (const k of Object.keys(CAMPOS_VACIOS) as (keyof CamposGastos)[]) {
      const v = o[k];
      if (typeof v === typeof CAMPOS_VACIOS[k]) (r as Record<string, unknown>)[k] = typeof v === "string" ? v.slice(0, 18) : v;
    }
    return r;
  } catch {
    return null;
  }
}

function montoInicial(n: number | undefined): string {
  return typeof n === "number" && n > 0 ? n.toLocaleString("es-AR", { maximumFractionDigits: 2 }) : "";
}

export function InformeGananciasEntrega({
  inicial,
  numero,
  emitido,
}: {
  inicial: Datos | null;
  numero: string;
  emitido: string;
}) {
  const panelSueldo = useId();
  const panelGastos = useId();
  const [editandoSueldo, setEditandoSueldo] = useState(inicial === null);
  const [viendoGastos, setViendoGastos] = useState(true);

  const [brutoInput, setBrutoInput] = useState(montoInicial(inicial?.bruto));
  const [conyuge, setConyuge] = useState(inicial?.conyuge ?? false);
  const [hijosInput, setHijosInput] = useState(inicial && inicial.hijos > 0 ? String(inicial.hijos) : "");
  const [sindicalInput, setSindicalInput] = useState(
    inicial && inicial.sindical > 0 ? (inicial.sindical * 100).toLocaleString("es-AR", { maximumFractionDigits: 2 }) : "",
  );
  const [otrasInput, setOtrasInput] = useState(montoInicial(inicial?.otras));

  const [g, setG] = useState<CamposGastos>(CAMPOS_VACIOS);
  const [cargado, setCargado] = useState(false);
  useEffect(() => {
    const guardado = leerGastos(numero);
    if (guardado) setG(guardado);
    setCargado(true);
  }, [numero]);
  useEffect(() => {
    if (!cargado) return;
    try {
      localStorage.setItem(claveGastos(numero), JSON.stringify(g));
    } catch {}
  }, [cargado, numero, g]);

  const set = <K extends keyof CamposGastos>(k: K, v: CamposGastos[K]) => setG((p) => ({ ...p, [k]: v }));

  const datos = useMemo(
    () => datosDeLaCalculadora({ brutoInput, conyuge, hijosInput, sindicalInput, otrasInput }),
    [brutoInput, conyuge, hijosInput, sindicalInput, otrasInput],
  );
  const gastos = useMemo(() => gastosDe(g), [g]);
  const informe = useMemo(() => armarInforme(datos, gastos), [datos, gastos]);
  const listo = informe !== null && informe.paga;

  return (
    <div className="space-y-6">
      <style>{CSS_IMPRESION}</style>

      {/* ── Barra de acciones ── */}
      <div className="print:hidden">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">Informe N.º {numero}</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900 sm:text-[1.75rem]">
              {listo ? "Tu informe está listo" : "Completá tu sueldo y armamos el informe"}
            </p>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-zinc-600">
              {listo
                ? "Cargá abajo lo que pagás de alquiler, prepaga, colegio o médicos: el informe calcula al instante cuánto te devuelve cada cosa. Después descargalo."
                : "No nos llegaron los datos de la calculadora, o les falta algo. Con tu sueldo bruto alcanza para empezar."}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setEditandoSueldo((v) => !v)}
              aria-expanded={editandoSueldo}
              aria-controls={panelSueldo}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 text-sm font-semibold text-zinc-800 transition-[background-color,border-color,transform] duration-200 ease-[var(--ease-snappy)] hover:border-zinc-400 hover:bg-zinc-50 active:scale-[0.98]"
            >
              <svg viewBox="0 0 20 20" fill="none" aria-hidden className="size-4">
                <path d="M3.5 13.8V16.5h2.7l8-8-2.7-2.7-8 8ZM13.2 4.1l2.7 2.7" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
              {editandoSueldo ? "Cerrar sueldo" : "Editar sueldo"}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              disabled={!listo}
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
        {listo ? (
          <p className="mt-3 text-xs leading-relaxed text-zinc-500">
            En la ventana que se abre, elegí «Guardar como PDF». Si aparece la dirección de esta página arriba o abajo de la
            hoja, destildá «Encabezados y pies de página».
          </p>
        ) : null}
      </div>

      {/* ── Sueldo ── */}
      <Panel id={panelSueldo} oculto={!editandoSueldo} etiqueta="Tu sueldo">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Campo id="g-bruto" etiqueta="Sueldo bruto mensual" ayuda="El total antes de descuentos de tu recibo.">
            <Monto id="g-bruto" valor={brutoInput} onChange={setBrutoInput} placeholder="Ej: 4.500.000" />
          </Campo>
          <Campo id="g-hijos" etiqueta="Hijos menores de 18 a cargo">
            <input id="g-hijos" inputMode="numeric" value={hijosInput} maxLength={2} onChange={(e) => setHijosInput(e.target.value)} placeholder="0" className={INPUT} />
          </Campo>
          <Campo id="g-sindical" etiqueta="Cuota sindical (%)" ayuda="Si no estás afiliado, dejalo vacío.">
            <input id="g-sindical" inputMode="decimal" value={sindicalInput} maxLength={5} onChange={(e) => setSindicalInput(e.target.value)} placeholder="0" className={INPUT} />
          </Campo>
          <Campo id="g-otras" etiqueta="Deducciones que ya declarás, por mes" ayuda="Lo que ya cargaste en el SiRADIG. No lo repitas abajo.">
            <Monto id="g-otras" valor={otrasInput} onChange={setOtrasInput} placeholder="0" />
          </Campo>
          <Tilde etiqueta="Cónyuge o conviviente a cargo" ayuda="Sin ingresos anuales arriba de la ganancia no imponible." valor={conyuge} onChange={setConyuge} />
        </div>
      </Panel>

      {/* ── Lo que pagás ── */}
      {informe !== null && informe.paga ? (
        <section className="rounded-[1.5rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5 print:hidden">
          <div className="rounded-[calc(1.5rem-0.375rem)] bg-white p-5 shadow-[var(--shadow-apoyo)] sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-zinc-900">Lo que pagás</h2>
                <p className="mt-0.5 max-w-xl text-sm text-zinc-600">
                  Sólo lo que tenga factura o comprobante. Dejá vacío lo que no pagás.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViendoGastos((v) => !v)}
                aria-expanded={viendoGastos}
                aria-controls={panelGastos}
                className="min-h-11 rounded-full px-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
              >
                {viendoGastos ? "Ocultar" : "Mostrar"}
              </button>
            </div>
            <div id={panelGastos} hidden={!viendoGastos} className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <Grupo titulo="Vivienda">
                <Campo id="g-alq" etiqueta="Alquiler, por mes">
                  <Monto id="g-alq" valor={g.alquiler} onChange={(v) => set("alquiler", v)} placeholder="0" />
                </Campo>
                <Tilde etiqueta="Soy titular de algún inmueble" ayuda="Aunque sea una parte: si lo sos, el alquiler no se deduce." valor={g.titular} onChange={(v) => set("titular", v)} />
                <Tilde etiqueta="Pago intereses de un crédito hipotecario" valor={g.hipotecario} onChange={(v) => set("hipotecario", v)} />
              </Grupo>
              <Grupo titulo="Salud">
                <Campo id="g-pre" etiqueta="Prepaga, por mes" ayuda="Tuya y de tu familia a cargo.">
                  <Monto id="g-pre" valor={g.prepaga} onChange={(v) => set("prepaga", v)} placeholder="0" />
                </Campo>
                <Campo id="g-hon" etiqueta="Médicos y terapias, en el año" ayuda="Lo facturado que la prepaga no te reintegró.">
                  <Monto id="g-hon" valor={g.honorarios} onChange={(v) => set("honorarios", v)} placeholder="0" />
                </Campo>
              </Grupo>
              <Grupo titulo="Familia y casa">
                <Campo id="g-edu" etiqueta="Colegio, jardín y útiles, por mes">
                  <Monto id="g-edu" valor={g.educacion} onChange={(v) => set("educacion", v)} placeholder="0" />
                </Campo>
                <Campo id="g-dom" etiqueta="Sueldo de tu empleada, por mes" ayuda="Lo que le pagás en mano; la relación tiene que estar registrada.">
                  <Monto id="g-dom" valor={g.domestica} onChange={(v) => set("domestica", v)} placeholder="0" />
                </Campo>
                {parseMonto(g.domestica) > 0 ? (
                  <Campo id="g-horas" etiqueta="Horas por semana que te trabaja">
                    <input id="g-horas" inputMode="numeric" value={g.horas} maxLength={3} onChange={(e) => set("horas", e.target.value)} className={INPUT} />
                  </Campo>
                ) : null}
              </Grupo>
              <Grupo titulo="Seguros y donaciones">
                <Campo id="g-vida" etiqueta="Seguro de vida, por mes">
                  <Monto id="g-vida" valor={g.vida} onChange={(v) => set("vida", v)} placeholder="0" />
                </Campo>
                <Campo id="g-ret" etiqueta="Seguro de retiro, por mes">
                  <Monto id="g-ret" valor={g.retiro} onChange={(v) => set("retiro", v)} placeholder="0" />
                </Campo>
                <Campo id="g-don" etiqueta="Donaciones, en el año" ayuda="A entidades exentas, por banco.">
                  <Monto id="g-don" valor={g.donaciones} onChange={(v) => set("donaciones", v)} placeholder="0" />
                </Campo>
              </Grupo>
            </div>
            <p className="mt-5 rounded-xl bg-zinc-50 px-4 py-3 text-xs leading-relaxed text-zinc-600">
              Estos montos quedan guardados sólo en este navegador, para que no tengas que escribirlos de nuevo. No los
              mandamos a ningún lado.
            </p>
          </div>
        </section>
      ) : null}

      {/* ── La hoja ── */}
      <div className="rounded-[1.75rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5 print:rounded-none print:bg-transparent print:p-0 print:ring-0">
        <div className="rounded-[calc(1.75rem-0.375rem)] bg-white px-5 py-8 shadow-[var(--shadow-alzada)] sm:px-10 sm:py-12 md:px-14 print:rounded-none print:p-0 print:shadow-none">
          {listo && informe ? (
            <InformeGananciasDocumento informe={informe} numero={numero} emitido={emitido} />
          ) : (
            <div className="grid min-h-[22rem] place-items-center text-center">
              <div className="max-w-sm">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">Informe N.º {numero}</p>
                <p className="mt-3 text-lg font-semibold text-zinc-800">
                  {informe === null ? "Falta tu sueldo bruto" : "Con estos datos no te retienen Ganancias"}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {informe === null
                    ? "Cargalo arriba y el informe se arma solo, con la escala y las deducciones vigentes de ARCA."
                    : "Tus deducciones personales cubren todo lo que ganás en el año, así que no hay impuesto que bajar. Revisá el sueldo bruto; si está bien y compraste el informe, respondé el mail de la compra y te devolvemos el dinero."}
                </p>
                {!editandoSueldo ? (
                  <button
                    type="button"
                    onClick={() => setEditandoSueldo(true)}
                    className="mt-4 inline-flex min-h-11 items-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white transition-transform duration-200 active:scale-[0.98]"
                  >
                    Revisar el sueldo
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

function Panel({ id, oculto, etiqueta, children }: { id: string; oculto: boolean; etiqueta: string; children: ReactNode }) {
  return (
    <section id={id} hidden={oculto} aria-label={etiqueta} className="rounded-[1.5rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5 print:hidden">
      <div className="rounded-[calc(1.5rem-0.375rem)] bg-white p-5 shadow-[var(--shadow-apoyo)] sm:p-6">
        <h2 className="mb-4 text-base font-semibold text-zinc-900">{etiqueta}</h2>
        {children}
      </div>
    </section>
  );
}

function Grupo({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">{titulo}</legend>
      {children}
    </fieldset>
  );
}

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

function Tilde({ etiqueta, ayuda, valor, onChange }: { etiqueta: string; ayuda?: string; valor: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex min-h-11 cursor-pointer items-start gap-2.5 text-sm text-zinc-700">
      <input type="checkbox" checked={valor} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 size-4 accent-emerald-600" />
      <span>
        {etiqueta}
        {ayuda ? <span className="block text-xs text-zinc-500">{ayuda}</span> : null}
      </span>
    </label>
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
