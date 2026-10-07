import type { ReactNode } from "react";
import { CREDITOS_FUENTES, CREDITOS_TEXTOS, TASA_PURA_ANUAL, VIGENCIA_ART_276 } from "@/data/actualizacion-creditos";
import { IPC_DESCARGADO_EL } from "@/data/ipc-serie";
import { formatARS, formatPctFijo } from "@/lib/formato";
import { fechaLarga } from "@/lib/hoy";
import { nombrePeriodo, sumarMeses, ULTIMO_PERIODO } from "@/lib/inflacion";
import { nombreConcepto } from "@/lib/prefill/credito-laboral";
import { fuenteInforme } from "@/components/InformeCuotaFuente";
import { PISO_ART_55, type FilaCoeficiente, type Informe } from "@/app/(ar)/informes/credito-laboral/_modelo";

export type DatosCausa = {
  autos: string;
  expediente: string;
  juzgado: string;
  actor: string;
  demandado: string;
  letrado: string;
  /** Nombre libre de cada rubro, en el mismo orden que la liquidación. */
  etiquetas: string[];
};

export const CAUSA_VACIA: DatosCausa = { autos: "", expediente: "", juzgado: "", actor: "", demandado: "", letrado: "", etiquetas: [] };

const CONSULTADO = "2026-10-06";

const FUENTES = [
  {
    texto: "Ley de Contrato de Trabajo 20.744, texto actualizado, arts. 276 y 277 (InfoLEG)",
    url: CREDITOS_FUENTES.lista[0].url,
    consultado: CONSULTADO,
  },
  {
    texto: `Ley 27.802 de Modernización Laboral, arts. 54, 55 y 56 (B.O. ${VIGENCIA_ART_276}), InfoLEG`,
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/423680/norma.htm",
    consultado: CONSULTADO,
  },
  {
    texto: "INDEC: IPC Nacional, Nivel General, base diciembre 2016 = 100 (API de series de tiempo del Estado)",
    url: CREDITOS_FUENTES.lista[2].url,
    consultado: IPC_DESCARGADO_EL,
  },
];

const ars = (n: number) => formatARS(n, 2);
const coef = (n: number) => n.toLocaleString("es-AR", { minimumFractionDigits: 4, maximumFractionDigits: 4 });
const indice = (n: number) => n.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const mesCorto = (p: string) => {
  const [a, m] = p.split("-");
  return `${["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"][Number(m) - 1]} ${a}`;
};

const SERIF = "[font-family:var(--font-informe),Georgia,serif]";

function Seccion({ n, titulo, children }: { n: number; titulo: string; children: ReactNode }) {
  return (
    <section className="inf-seccion border-t border-zinc-200 pt-6 print:pt-4">
      <h2 className={`${SERIF} inf-titulo flex items-baseline gap-3 text-[1.35rem] font-medium leading-tight tracking-[-0.01em] text-zinc-900`}>
        <span className="text-sm font-normal tabular-nums text-emerald-700 [font-family:var(--font-geist-sans)]">
          {String(n).padStart(2, "0")}
        </span>
        {titulo}
      </h2>
      <div className="mt-3 space-y-3 text-[0.9375rem] leading-relaxed text-zinc-700 print:text-[10.5pt]">{children}</div>
    </section>
  );
}

function Casilla() {
  return <span aria-hidden className="mt-[0.3em] size-3.5 shrink-0 rounded-[3px] border border-zinc-400" />;
}

function TablaCoeficientes({ filas }: { filas: FilaCoeficiente[] }) {
  return (
    <table className="inf-tabla w-full border-collapse text-[0.8125rem] print:text-[8.5pt]">
      <thead>
        <tr className="border-b border-zinc-300 text-left text-[0.6875rem] text-zinc-500">
          <th scope="col" className="py-1.5 pr-2 font-medium">Mes</th>
          <th scope="col" className="py-1.5 pr-2 text-right font-medium">Índice</th>
          <th scope="col" className="py-1.5 pr-2 text-right font-medium">Var. mes</th>
          <th scope="col" className="py-1.5 text-right font-medium">Coeficiente</th>
        </tr>
      </thead>
      <tbody>
        {filas.map((f) => (
          <tr key={f.periodo} className={`border-b border-zinc-100 ${f.usado ? "bg-emerald-50/70" : ""}`}>
            <th scope="row" className="py-1 pr-2 text-left font-normal text-zinc-900">
              {mesCorto(f.periodo)}
              {f.usado ? <span className="sr-only"> (mes de exigibilidad de un rubro)</span> : null}
            </th>
            <td className="py-1 pr-2 text-right tabular-nums">{indice(f.indice)}</td>
            <td className="py-1 pr-2 text-right tabular-nums text-zinc-500">
              {f.varMensual === null ? "—" : formatPctFijo(f.varMensual, 1)}
            </td>
            <td className={`py-1 text-right tabular-nums ${f.usado ? "font-semibold text-zinc-900" : ""}`}>{coef(f.coeficiente)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function InformeCreditoDocumento({
  informe,
  causa = CAUSA_VACIA,
  numero,
  emitido,
  muestra = false,
}: {
  informe: Informe;
  causa?: DatosCausa;
  /** Número de informe (el id del pago). Sin número, es una vista previa. */
  numero?: string | null;
  /** Fecha de emisión, AAAA-MM-DD. La vista previa de la landing no la lleva: es estática. */
  emitido?: string | null;
  muestra?: boolean;
}) {
  const inf = informe;
  const Titulo = muestra ? "p" : "h1";
  const unRubro = inf.filas.length === 1;
  const etiqueta = (i: number) => causa.etiquetas[i]?.trim() || nombreConcepto(inf.filas[i].rubro.concepto);
  const caratula = [
    ["Autos", causa.autos],
    ["Expediente", causa.expediente],
    ["Juzgado o tribunal", causa.juzgado],
    ["Parte actora", causa.actor],
    ["Parte demandada", causa.demandado],
  ].filter(([, v]) => v.trim() !== "");
  const letrado = causa.letrado.trim();
  const tasaTxt = formatPctFijo(TASA_PURA_ANUAL * 100, 0);
  const actualizacion = inf.capitalActualizado - inf.capital;
  const mitad = Math.ceil(inf.coeficientes.length / 2);
  const partir = inf.coeficientes.length > 14;

  return (
    <article
      className={`${fuenteInforme.variable} inf-doc relative bg-white text-zinc-800 [print-color-adjust:exact] [-webkit-print-color-adjust:exact]`}
      aria-label="Informe de actualización de crédito laboral"
    >
      {/* ── Membrete ── */}
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div className="flex items-center gap-2.5">
          <svg viewBox="0 0 32 32" aria-hidden className="size-8 shrink-0">
            <rect width="32" height="32" rx="8" fill="#059669" />
            <rect x="8.5" y="11" width="15" height="3.6" rx="1.8" fill="#fff" />
            <rect x="8.5" y="17.4" width="15" height="3.6" rx="1.8" fill="#ecfdf5" />
          </svg>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-zinc-900">CalculAR</p>
            <p className="text-xs text-zinc-500">calcular.ar</p>
          </div>
        </div>
        <dl className="text-right text-xs leading-relaxed text-zinc-500">
          <div>
            <dt className="inline">{numero ? "Informe N.º " : ""}</dt>
            <dd className="inline font-medium tabular-nums text-zinc-800">{numero ?? (muestra ? "Ejemplo" : "Vista previa")}</dd>
          </div>
          {emitido ? (
            <div>
              <dt className="inline">Emitido el </dt>
              <dd className="inline text-zinc-800">{fechaLarga(emitido)}</dd>
            </div>
          ) : null}
          <div>
            <dt className="inline">IPC hasta </dt>
            <dd className="inline text-zinc-800">{nombrePeriodo(inf.hastaIpc)}</dd>
          </div>
        </dl>
      </div>

      <header className="mt-8 print:mt-6">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Liquidación de referencia · art. 276 LCT
        </p>
        <Titulo className={`${SERIF} mt-2 text-[2.1rem] font-normal leading-[1.05] tracking-[-0.02em] text-zinc-900 [font-variation-settings:'opsz'_72] sm:text-[2.6rem] print:text-[24pt]`}>
          Actualización de crédito laboral
        </Titulo>
        <p className={`${SERIF} mt-1.5 text-lg italic text-zinc-600 print:text-[12pt]`}>
          IPC del INDEC más {tasaTxt} anual, rubro por rubro, al {nombrePeriodo(inf.hasta)}
        </p>
      </header>

      {caratula.length > 0 ? (
        <dl className="inf-seccion mt-6 grid gap-x-8 gap-y-2 rounded-xl border border-zinc-300 p-4 text-sm sm:grid-cols-2 print:grid-cols-2 print:text-[9.5pt]">
          {caratula.map(([k, v]) => (
            <div key={k} className={k === "Autos" ? "sm:col-span-2 print:col-span-2" : ""}>
              <dt className="text-xs text-zinc-500">{k}</dt>
              <dd className="font-medium text-zinc-900">{v}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {/* ── La cifra ── */}
      <div className="inf-seccion mt-7 grid gap-px overflow-hidden rounded-xl bg-zinc-200 ring-1 ring-zinc-200 sm:grid-cols-[1.35fr_1fr] print:grid-cols-[1.35fr_1fr]">
        <div className="bg-emerald-50/70 p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">
            Crédito actualizado al {nombrePeriodo(inf.hasta)}
          </p>
          <p className={`${SERIF} mt-2 text-[2.3rem] leading-none tracking-[-0.02em] text-zinc-900 tabular-nums sm:text-[2.6rem] print:text-[28pt]`}>
            {ars(inf.total)}
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            {unRubro ? "un rubro" : `${inf.filas.length} rubros`} · {(inf.total / inf.capital).toLocaleString("es-AR", { maximumFractionDigits: 2 })}{" "}
            veces el capital histórico
          </p>
        </div>
        <dl className="grid content-start gap-3 bg-white p-5 text-sm sm:p-6">
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">Capital histórico</dt>
            <dd className="font-medium tabular-nums text-zinc-900">{ars(inf.capital)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">Actualización por IPC</dt>
            <dd className="font-medium tabular-nums text-zinc-900">{ars(actualizacion)}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-zinc-500">Interés del {tasaTxt} anual</dt>
            <dd className="font-medium tabular-nums text-zinc-900">{ars(inf.interes)}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-zinc-200 pt-2">
            <dt className="font-semibold text-zinc-900">Total</dt>
            <dd className="font-semibold tabular-nums text-zinc-900">{ars(inf.total)}</dd>
          </div>
        </dl>
      </div>

      {inf.mesesSinIpc > 0 ? (
        <p className="inf-seccion mt-4 rounded-lg bg-amber-50 px-3.5 py-2.5 text-sm text-amber-900 print:border print:border-amber-200">
          El pago se liquidó al {nombrePeriodo(inf.hasta)}, pero el INDEC publicó el IPC hasta {nombrePeriodo(ULTIMO_PERIODO)}:
          la actualización llega hasta ese mes y quedan {inf.mesesSinIpc} {inf.mesesSinIpc === 1 ? "mes" : "meses"} sin
          repotenciar. El {tasaTxt} anual sí corre hasta el mes del pago.
        </p>
      ) : null}

      <div className="mt-8 space-y-7 print:mt-6 print:space-y-5">
        {/* ── 1. Liquidación ── */}
        <Seccion n={1} titulo="Liquidación rubro por rubro">
          <p>
            Cada suma se actualiza desde el mes en que se hizo exigible hasta el mes del pago, con su propio coeficiente.
            Por eso los rubros no se suman antes de actualizar: se actualizan por separado y se suman después.
          </p>
          <div className="-mx-1 overflow-x-auto px-1">
            <table className="inf-tabla w-full min-w-[46rem] border-collapse text-sm print:min-w-0 print:text-[8.5pt]">
              <thead>
                <tr className="border-b border-zinc-300 text-left text-xs text-zinc-500 print:text-[7.5pt]">
                  <th scope="col" className="py-2 pr-2 font-medium">Rubro</th>
                  <th scope="col" className="py-2 pr-2 font-medium">Exigible</th>
                  <th scope="col" className="py-2 pr-2 text-right font-medium">Capital</th>
                  <th scope="col" className="py-2 pr-2 text-right font-medium">Coef. IPC</th>
                  <th scope="col" className="py-2 pr-2 text-right font-medium">Actualizado</th>
                  <th scope="col" className="py-2 pr-2 text-right font-medium">Meses</th>
                  <th scope="col" className="py-2 pr-2 text-right font-medium">Interés {tasaTxt}</th>
                  <th scope="col" className="py-2 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {inf.filas.map(({ rubro, r }, i) => (
                  <tr key={i} className="border-b border-zinc-100 align-top">
                    <th scope="row" className="py-2 pr-2 text-left font-normal text-zinc-900">
                      <span className="mr-1.5 tabular-nums text-zinc-400">{i + 1}.</span>
                      {etiqueta(i)}
                    </th>
                    <td className="whitespace-nowrap py-2 pr-2 tabular-nums">{mesCorto(rubro.desde)}</td>
                    <td className="py-2 pr-2 text-right tabular-nums">{ars(rubro.monto)}</td>
                    <td className="py-2 pr-2 text-right tabular-nums">{coef(r.coeficiente)}</td>
                    <td className="py-2 pr-2 text-right tabular-nums">{ars(r.capitalActualizado)}</td>
                    <td className="py-2 pr-2 text-right tabular-nums">{r.meses}</td>
                    <td className="py-2 pr-2 text-right tabular-nums">{ars(r.interesPuro)}</td>
                    <td className="py-2 text-right font-medium tabular-nums text-zinc-900">{ars(r.total)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-zinc-800">
                  <th scope="row" colSpan={2} className="py-2.5 pr-2 text-left font-semibold text-zinc-900">
                    Total
                  </th>
                  <td className="py-2.5 pr-2 text-right font-medium tabular-nums">{ars(inf.capital)}</td>
                  <td />
                  <td className="py-2.5 pr-2 text-right font-medium tabular-nums">{ars(inf.capitalActualizado)}</td>
                  <td />
                  <td className="py-2.5 pr-2 text-right font-medium tabular-nums">{ars(inf.interes)}</td>
                  <td className="py-2.5 text-right font-semibold tabular-nums text-zinc-900">{ars(inf.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="text-xs text-zinc-500">
            Coef. IPC: índice de {nombrePeriodo(inf.hastaIpc)} dividido por el índice del mes en que el rubro se hizo
            exigible. Meses: desde ese mes hasta el {nombrePeriodo(inf.hasta)}. Interés: {tasaTxt} anual simple sobre el
            capital ya actualizado.
          </p>
        </Seccion>

        {/* ── 2. Lo que cambia el número ── */}
        <Seccion n={2} titulo="Lo que hay que mirar antes de usar el número">
          <dl className="grid gap-3 sm:grid-cols-2 print:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 p-4">
              <dt className="text-xs text-zinc-500">Si el {tasaTxt} se capitalizara una vez por año</dt>
              <dd className="mt-1 font-medium tabular-nums text-zinc-900">
                {ars(inf.totalCompuesto)}{" "}
                <span className="text-xs font-normal text-zinc-500">({ars(inf.totalCompuesto - inf.total)} más)</span>
              </dd>
              <dd className="mt-1 text-xs text-zinc-500">
                La ley no dice que el interés se capitalice. Este informe usa el simple; la otra lectura queda a la vista.
              </dd>
            </div>
            {inf.costoMensualPct !== null && inf.costoMensual !== null ? (
              <div className="rounded-xl border border-zinc-200 p-4">
                <dt className="text-xs text-zinc-500">Cuánto suma cada mes más de demora</dt>
                <dd className="mt-1 font-medium tabular-nums text-zinc-900">
                  {ars(inf.costoMensual)}{" "}
                  <span className="text-xs font-normal text-zinc-500">({formatPctFijo(inf.costoMensualPct, 2)} por mes)</span>
                </dd>
                <dd className="mt-1 text-xs text-zinc-500">
                  IPC de {nombrePeriodo(ULTIMO_PERIODO)} más la doceava parte del {tasaTxt} anual. Sirve para comparar una
                  propuesta de pago de hoy con lo que valdría el crédito el mes que viene.
                </dd>
              </div>
            ) : null}
          </dl>
          {inf.litis > 0 ? (
            <div className="inf-seccion rounded-xl bg-zinc-50 p-4 ring-1 ring-zinc-200">
              <table className="w-full border-collapse text-sm print:text-[9.5pt]">
                <tbody>
                  <tr className="border-b border-zinc-200">
                    <th scope="row" className="py-1.5 text-left font-normal">Crédito actualizado</th>
                    <td className="py-1.5 text-right tabular-nums">{ars(inf.total)}</td>
                  </tr>
                  <tr className="border-b border-zinc-200">
                    <th scope="row" className="py-1.5 text-left font-normal">Pacto de cuota litis ({formatPctFijo(inf.litis, 0)})</th>
                    <td className="py-1.5 text-right tabular-nums">− {ars(inf.cuotaLitis)}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="py-1.5 text-left font-semibold text-zinc-900">Le queda al trabajador</th>
                    <td className="py-1.5 text-right font-semibold tabular-nums text-zinc-900">{ars(inf.neto)}</td>
                  </tr>
                </tbody>
              </table>
              <p className="mt-2 text-xs text-zinc-500">
                El art. 277 topea la cuota litis en el 20% del monto del proceso y exige ratificación personal y
                homologación judicial. Las costas van aparte.
              </p>
            </div>
          ) : null}
        </Seccion>

        {/* ── 3. Índices ── */}
        <Seccion n={3} titulo="Índices usados, mes a mes">
          <p>
            La serie oficial del IPC Nacional del INDEC desde el primer mes exigible hasta el último índice usado. El
            coeficiente de cada fila es el que lleva una suma debida en ese mes hasta {nombrePeriodo(inf.hastaIpc)}: sirve
            para verificar cada rubro o para sumar uno nuevo con la misma tabla. Las filas marcadas son las de esta
            liquidación.
          </p>
          {partir ? (
            <div className="grid gap-x-6 sm:grid-cols-2 print:grid-cols-2">
              <TablaCoeficientes filas={inf.coeficientes.slice(0, mitad)} />
              <TablaCoeficientes filas={inf.coeficientes.slice(mitad)} />
            </div>
          ) : (
            <TablaCoeficientes filas={inf.coeficientes} />
          )}
          <p className="text-xs text-zinc-500">
            Fuente: INDEC, IPC Nacional Nivel General (base diciembre 2016 = 100). Último dato publicado al emitir este
            informe: {nombrePeriodo(ULTIMO_PERIODO)}. Serie descargada el {fechaLarga(IPC_DESCARGADO_EL)}.
          </p>
        </Seccion>

        {/* ── 4. Método ── */}
        <Seccion n={4} titulo="Cómo se hizo la cuenta, en palabras simples">
          <p>
            Desde el {VIGENCIA_ART_276} la ley dice cómo crece una deuda laboral que no se pagó a tiempo. Son dos pasos:
          </p>
          <ol className="space-y-2">
            <li className="flex gap-3">
              <span className="w-5 shrink-0 tabular-nums text-emerald-700">1.</span>
              <span>
                <strong className="font-semibold text-zinc-900">Se recupera lo que se comió la inflación.</strong> Cada suma
                se multiplica por cuánto subieron los precios, según el INDEC, desde el mes en que te la debían.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="w-5 shrink-0 tabular-nums text-emerald-700">2.</span>
              <span>
                <strong className="font-semibold text-zinc-900">Se suma un {tasaTxt} por año de espera.</strong> Sobre el
                monto ya actualizado, por cada año que pasó hasta el pago, y proporcional por los meses.
              </span>
            </li>
          </ol>
          <p className={`${SERIF} rounded-xl bg-zinc-50 px-4 py-3 text-[1.05rem] text-zinc-900 ring-1 ring-zinc-200`}>
            total = capital × (IPC del mes final ÷ IPC del mes exigible) × (1 + {tasaTxt} × meses ÷ 12)
          </p>
          <blockquote className="border-l-2 border-emerald-600 pl-4 text-sm text-zinc-600 print:text-[9pt]">
            <p className="italic">«{CREDITOS_TEXTOS.art276}»</p>
            <p className="mt-1 text-xs text-zinc-500">
              Art. 276 de la Ley de Contrato de Trabajo, sustituido por el art. 54 de la Ley 27.802 (B.O. {VIGENCIA_ART_276}).
            </p>
          </blockquote>
          <p className="text-sm">
            Tres decisiones de lectura, dichas de frente porque mueven el número: el {tasaTxt} corre sobre el capital ya
            actualizado (la norma dice «actualizados… con más una tasa»); es interés simple, porque la ley no dice que se
            capitalice; y el IPC llega hasta el último mes publicado, mientras que el interés corre hasta el mes del pago.
          </p>
        </Seccion>

        {/* ── 5. Juicios en trámite ── */}
        <Seccion n={5} titulo={`Si el juicio ya estaba en trámite el ${VIGENCIA_ART_276}`}>
          <p>
            Para los juicios que a esa fecha no tenían sentencia definitiva, la misma ley fijó una regla especial (art. 55):
            intereses a la tasa pasiva que determine el BCRA, con un tope y un piso que salen de esta misma cuenta.
          </p>
          <div className="inf-seccion grid gap-px overflow-hidden rounded-xl bg-zinc-200 ring-1 ring-zinc-200 sm:grid-cols-2 print:grid-cols-2">
            <div className="bg-white p-4">
              <p className="text-xs text-zinc-500">Tope · IPC + {tasaTxt} anual (inc. b)</p>
              <p className="mt-1 font-semibold tabular-nums text-zinc-900">{ars(inf.total)}</p>
            </div>
            <div className="bg-white p-4">
              <p className="text-xs text-zinc-500">Piso · {formatPctFijo(PISO_ART_55 * 100, 0)} de ese cálculo (inc. c)</p>
              <p className="mt-1 font-semibold tabular-nums text-zinc-900">{ars(inf.piso55)}</p>
            </div>
          </div>
          <p className="text-sm">
            Este informe no calcula la tasa pasiva: muestra entre qué valores tiene que quedar el resultado. Es una norma
            nueva y su aplicación todavía se discute: hay lecturas doctrinarias distintas y al menos una sala de la Cámara
            Nacional de Apelaciones del Trabajo declaró inconstitucional el art. 55 en un caso concreto y aplicó el art. 276.
            Qué regla rige en cada expediente lo decide el juez de la causa.
          </p>
        </Seccion>

        {/* ── 6. Antes de presentarlo ── */}
        <Seccion n={6} titulo="Antes de presentarlo o de negociar con él">
          <ul className="grid gap-2 sm:grid-cols-2 print:grid-cols-2">
            {[
              "Confirmar que cada monto es el nominal de la fecha en que se hizo exigible, sin actualizar.",
              "Revisar el mes de exigibilidad de cada rubro: el de una indemnización suele ser el del despido.",
              "Si hubo pagos a cuenta, el informe no los descuenta: se imputan aparte, con el criterio de la causa.",
              "Volver a abrir el informe cuando el INDEC publique un mes nuevo: se rearma con el último índice.",
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <Casilla />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Seccion>

        {/* ── Nota legal y fuentes ── */}
        <section className="inf-seccion rounded-xl border border-zinc-300 p-5 print:p-4">
          <h2 className={`${SERIF} text-lg font-medium text-zinc-900`}>Qué es y qué no es este informe</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 print:text-[9.5pt]">
            Es una referencia de cálculo que aplica el texto vigente del art. 276 de la LCT con la serie oficial del INDEC.
            No es asesoramiento legal ni una liquidación aprobada: los montos y las fechas los cargó quien emitió el
            informe, y el criterio de actualización que se aplica en cada causa lo fija el juez. Si sos trabajador, consultá
            con un abogado laboralista o con el servicio de patrocinio gratuito de tu jurisdicción antes de aceptar o
            rechazar una propuesta.
          </p>
          <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Fuentes</h3>
          <ol className="mt-2 space-y-1.5 text-xs leading-relaxed text-zinc-600">
            {FUENTES.map((f, i) => (
              <li key={f.url} className="flex gap-2">
                <span className="tabular-nums text-zinc-400">{i + 1}.</span>
                <span>
                  {f.texto}. <span className="break-all text-zinc-500">{f.url}</span> · consultado el {fechaLarga(f.consultado)}.
                </span>
              </li>
            ))}
          </ol>
        </section>

        {letrado ? (
          <div className="inf-seccion flex justify-end pt-10 print:pt-12">
            <div className="w-64 border-t border-zinc-400 pt-2 text-center text-xs text-zinc-600">
              <p className="font-medium text-zinc-900">{letrado}</p>
              <p>Firma y sello</p>
            </div>
          </div>
        ) : null}
      </div>

      <p className="mt-8 border-t border-zinc-200 pt-3 text-[0.6875rem] leading-relaxed text-zinc-400 print:mt-6">
        CalculAR · calcular.ar{numero ? ` · Informe N.º ${numero}` : ""} · Elaborado con el IPC del INDEC y el texto
        oficial de la LCT. Próximo IPC esperado: {nombrePeriodo(sumarMeses(ULTIMO_PERIODO, 1))}.
      </p>
    </article>
  );
}
