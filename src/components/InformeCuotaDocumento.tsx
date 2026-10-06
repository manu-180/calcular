import type { ReactNode } from "react";
import { CANASTA_CRIANZA_FUENTE } from "@/data/canasta-crianza";
import { formatARS, formatPctFijo } from "@/lib/formato";
import { fechaLarga } from "@/lib/hoy";
import type { Datos } from "@/lib/prefill/cuota";
import { fuenteInforme } from "@/components/InformeCuotaFuente";
import {
  MESES_EVOLUCION,
  escolaridadTramo,
  nombreTramo,
  type Informe,
} from "@/app/informes/cuota-alimentaria/_modelo";

export type NombresInforme = { hijos: string[]; paga: string; otro: string };

export const NOMBRES_VACIOS: NombresInforme = { hijos: [], paga: "", otro: "" };

const FUENTES = [
  {
    texto: "INDEC — Valorización mensual de la canasta de crianza, serie por tramo de edad",
    url: CANASTA_CRIANZA_FUENTE.url,
    consultado: CANASTA_CRIANZA_FUENTE.consultadoEl,
  },
  {
    texto: "Código Civil y Comercial de la Nación, arts. 658 a 670 (Ley 26.994), InfoLEG",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/235000-239999/235975/norma.htm",
    consultado: "2026-10-06",
  },
  {
    texto: "Ley 26.589 de mediación prejudicial obligatoria, art. 31 (alimentos), InfoLEG",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/165000-169999/166999/norma.htm",
    consultado: "2026-10-06",
  },
  {
    texto: "Ministerio de Economía — «¿Para qué sirve el Índice Crianza?», análisis de 22 resoluciones judiciales (2023)",
    url: "https://argentina.gob.ar/sites/default/files/2023/11/informe_fallos_nov_2023.pdf",
    consultado: "2026-10-06",
  },
];

const ars = (n: number) => formatARS(n, 0);

const pct = (n: number) => formatPctFijo(n, 1);

function variacion(n: number | null): string {
  if (n === null) return "—";
  return `${n > 0 ? "+" : ""}${pct(n)}`;
}

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

export function InformeCuotaDocumento({
  datos,
  informe,
  nombres = NOMBRES_VACIOS,
  numero,
  emitido,
  muestra = false,
}: {
  datos: Datos;
  informe: Informe;
  nombres?: NombresInforme;
  /** Número de informe (el id del pago). Sin número, es una vista previa. */
  numero?: string | null;
  /** Fecha de emisión, AAAA-MM-DD. La vista previa de la landing no la lleva: es estática y
   *  mostraría la fecha del build. */
  emitido?: string | null;
  /** Vista previa en la landing: lo marca como ejemplo. */
  muestra?: boolean;
}) {
  const { r, mes } = informe;
  const nPaga = nombres.paga.trim();
  const nOtro = nombres.otro.trim();
  const paga = nPaga || "Quien paga la cuota";
  const pagaTxt = nPaga || "quien paga la cuota";
  const otro = nOtro || "El otro progenitor";
  const otroTxt = nOtro || "el otro progenitor";
  const hijoNombre = (i: number) => nombres.hijos[i]?.trim() || `Hijo ${i + 1}`;
  const unHijo = datos.hijos.length === 1;
  const pctPaga = r.participacion === null ? null : Math.round(r.participacion * 100);
  // En la landing el documento vive dentro de una página con su propio h1.
  const Titulo = muestra ? "p" : "h1";

  return (
    <article
      className={`${fuenteInforme.variable} inf-doc relative bg-white text-zinc-800 [print-color-adjust:exact] [-webkit-print-color-adjust:exact]`}
      aria-label="Informe de cuota alimentaria"
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
        </dl>
      </div>

      <header className="mt-8 print:mt-6">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">
          Informe de referencia
        </p>
        <Titulo className={`${SERIF} mt-2 text-[2.1rem] font-normal leading-[1.05] tracking-[-0.02em] text-zinc-900 [font-variation-settings:'opsz'_72] sm:text-[2.6rem] print:text-[26pt]`}>
          Cuota alimentaria
        </Titulo>
        <p className={`${SERIF} mt-1.5 text-lg italic text-zinc-600 print:text-[12pt]`}>
          Costo de crianza según el INDEC y reparto entre progenitores
        </p>
      </header>

      {/* ── La cifra ── */}
      <div className="inf-seccion mt-7 grid gap-px overflow-hidden rounded-xl bg-zinc-200 ring-1 ring-zinc-200 sm:grid-cols-[1.35fr_1fr]">
        <div className="bg-emerald-50/70 p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">
            {r.cuotaEstimada !== null ? "Cuota de referencia" : "Costo mensual a cubrir"}
          </p>
          <p className={`${SERIF} mt-2 text-[2.6rem] leading-none tracking-[-0.02em] text-zinc-900 tabular-nums print:text-[30pt]`}>
            {ars(r.cuotaEstimada ?? r.costoTotal)}
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            {r.cuotaEstimada !== null ? (
              <>
                por mes · el {pct(r.pctIngreso ?? 0)} del ingreso neto de {pagaTxt}
              </>
            ) : (
              <>por mes, entre los dos progenitores</>
            )}
          </p>
        </div>
        <dl className="grid content-start gap-3 bg-white p-5 text-sm sm:p-6">
          <div>
            <dt className="text-xs text-zinc-500">Costo total de crianza</dt>
            <dd className="font-medium tabular-nums text-zinc-900">{ars(r.costoTotal)} por mes</dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">{pctPaga !== null ? `Le corresponde a ${pagaTxt}` : "Si los dos ganaran parecido"}</dt>
            <dd className="font-medium tabular-nums text-zinc-900">
              {pctPaga !== null ? `${pctPaga}% del costo` : `${ars(r.refMitad)} cada uno`}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">Dato oficial</dt>
            <dd className="text-zinc-900">Canasta de crianza INDEC, {mes.etiqueta}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 space-y-7 print:mt-6 print:space-y-5">
        {/* ── 1. El caso ── */}
        <Seccion n={1} titulo="Los datos del caso">
          <dl className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-xs text-zinc-500">{unHijo ? "Hijo" : `Hijos (${datos.hijos.length})`}</dt>
              <dd>
                <ul className="mt-0.5 flex flex-wrap gap-x-5 gap-y-1">
                  {datos.hijos.map((t, i) => (
                    <li key={i} className="text-zinc-900">
                      {hijoNombre(i)} <span className="text-zinc-500">· {nombreTramo(t).toLowerCase()}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">Ingreso neto mensual de {pagaTxt}</dt>
              <dd className="tabular-nums text-zinc-900">{ars(datos.ingreso)}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">Ingreso neto mensual de {otroTxt}</dt>
              <dd className="tabular-nums text-zinc-900">{datos.otro === null ? "No informado" : ars(datos.otro)}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-zinc-500">Cuidado cotidiano</dt>
              <dd className="text-zinc-900">
                {datos.compartido
                  ? "Compartido, con residencia alternada"
                  : `Lo lleva ${otroTxt}, con quien viven ${unHijo ? "el hijo" : "los hijos"}`}
              </dd>
            </div>
          </dl>
          <p className="text-xs text-zinc-500">
            Ingreso neto: lo que queda en mano por mes, después de descuentos. Los montos y nombres los
            cargó quien emitió este informe.
          </p>
        </Seccion>

        {/* ── 2. El costo ── */}
        <Seccion n={2} titulo={`Cuánto cuesta criar ${unHijo ? "a ese hijo" : `a esos ${datos.hijos.length} hijos`} por mes`}>
          <p>
            El INDEC mide todos los meses cuánto cuesta mantener y cuidar a un chico, por tramo de edad.
            Tiene dos partes: los <strong className="font-semibold text-zinc-900">bienes y servicios</strong>{" "}
            (comida, ropa, salud, educación, transporte, vivienda) y el{" "}
            <strong className="font-semibold text-zinc-900">cuidado</strong>, que es el tiempo de crianza
            valuado en plata.
          </p>
          <div className="-mx-1 overflow-x-auto px-1">
            <table className="inf-tabla w-full min-w-[30rem] border-collapse text-sm print:min-w-0 print:text-[9.5pt]">
              <thead>
                <tr className="border-b border-zinc-300 text-left text-xs text-zinc-500">
                  <th scope="col" className="py-2 pr-3 font-medium">Hijo</th>
                  <th scope="col" className="py-2 pr-3 text-right font-medium">Bienes y servicios</th>
                  <th scope="col" className="py-2 pr-3 text-right font-medium">Cuidado</th>
                  <th scope="col" className="py-2 text-right font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {r.detalle.map((d, i) => {
                  const sinDato = d.tramo === "mayor-12";
                  return (
                    <tr key={i} className="border-b border-zinc-100 align-top">
                      <th scope="row" className="py-2 pr-3 text-left font-normal">
                        <span className="text-zinc-900">{hijoNombre(i)}</span>
                        <span className="block text-xs text-zinc-500">
                          {nombreTramo(d.tramo)} · {escolaridadTramo(d.tramo).toLowerCase()}
                        </span>
                      </th>
                      {sinDato ? (
                        <td colSpan={3} className="py-2 text-right text-xs text-zinc-500">
                          Sin dato oficial: no se suma
                        </td>
                      ) : (
                        <>
                          <td className="py-2 pr-3 text-right tabular-nums">{ars(d.bienes)}</td>
                          <td className="py-2 pr-3 text-right tabular-nums">{ars(d.cuidado)}</td>
                          <td className="py-2 text-right font-medium tabular-nums text-zinc-900">{ars(d.total)}</td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-zinc-800">
                  <th scope="row" className="py-2.5 pr-3 text-left font-semibold text-zinc-900">Total por mes</th>
                  <td className="py-2.5 pr-3 text-right font-medium tabular-nums">{ars(r.costoBienes)}</td>
                  <td className="py-2.5 pr-3 text-right font-medium tabular-nums">{ars(r.costoCuidado)}</td>
                  <td className="py-2.5 text-right font-semibold tabular-nums text-zinc-900">{ars(r.costoTotal)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          {r.hijosSinTramoOficial > 0 ? (
            <p className="rounded-lg bg-amber-50 px-3.5 py-2.5 text-sm text-amber-900 print:border print:border-amber-200">
              {r.hijosSinTramoOficial === 1 ? "Un hijo tiene" : `${r.hijosSinTramoOficial} hijos tienen`} 13 años o
              más. La canasta del INDEC llega hasta los 12 y no inventamos un número: el costo real es más alto
              que el de esta tabla. El tramo de 6 a 12 años sirve como piso de referencia.
            </p>
          ) : null}
          <p className="text-xs text-zinc-500">
            Fuente: INDEC, canasta de crianza de {mes.etiqueta}, el último mes publicado al emitir este informe.
            Es un promedio del Gran Buenos Aires.
          </p>
        </Seccion>

        {/* ── 3. El reparto ── */}
        <Seccion n={3} titulo="Cómo se reparte ese costo entre los dos">
          <p>
            La ley pone la manutención a cargo de los dos progenitores, aunque los chicos vivan con uno, y la
            hace proporcional a las posibilidades económicas de cada uno (arts. 658 y 659 del Código Civil y
            Comercial). Por eso el costo se reparte según lo que gana cada uno, y no mitad y mitad.
          </p>

          {r.cuotaEstimada !== null && pctPaga !== null && informe.aporteDelOtro !== null ? (
            <>
              <div className="inf-seccion rounded-xl border border-zinc-200 p-4">
                <div className="flex justify-between gap-4 text-xs text-zinc-500">
                  <span>{paga} · {pctPaga}%</span>
                  <span>{otro} · {100 - pctPaga}%</span>
                </div>
                <div className="mt-2 flex h-2.5 overflow-hidden rounded-full bg-zinc-200" aria-hidden>
                  <div className="h-full bg-emerald-700" style={{ width: `${pctPaga}%` }} />
                </div>
                <table className="mt-4 w-full border-collapse text-sm print:text-[9.5pt]">
                  <thead>
                    <tr className="border-b border-zinc-300 text-left text-xs text-zinc-500">
                      <th scope="col" className="py-2 pr-3 font-medium">Progenitor</th>
                      <th scope="col" className="py-2 pr-3 text-right font-medium">Ingreso neto</th>
                      <th scope="col" className="py-2 text-right font-medium">Parte del costo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-100">
                      <th scope="row" className="py-2 pr-3 text-left font-normal text-zinc-900">{paga}</th>
                      <td className="py-2 pr-3 text-right tabular-nums">{ars(datos.ingreso)}</td>
                      <td className="py-2 text-right font-semibold tabular-nums text-zinc-900">{ars(r.cuotaEstimada)}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="py-2 pr-3 text-left font-normal text-zinc-900">{otro}</th>
                      <td className="py-2 pr-3 text-right tabular-nums">{ars(datos.otro ?? 0)}</td>
                      <td className="py-2 text-right tabular-nums">{ars(informe.aporteDelOtro)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                A {pagaTxt} le corresponde aportar{" "}
                <strong className="font-semibold text-zinc-900">{ars(r.cuotaEstimada)} por mes</strong>, el{" "}
                {pct(r.pctIngreso ?? 0)} de su ingreso neto.
              </p>
            </>
          ) : (
            <div className="rounded-xl border border-zinc-200 p-4">
              <p>
                Sin el ingreso de {otroTxt} no se puede repartir
                por capacidad económica. Dos referencias para ubicarse:
              </p>
              <ul className="mt-2 space-y-1.5">
                <li>
                  Si los dos ganaran parecido, a cada uno le tocaría{" "}
                  <strong className="font-semibold text-zinc-900">{ars(r.refMitad)}</strong> por mes.
                </li>
                <li>
                  Si {otroTxt} no tuviera ingresos, el costo
                  completo quedaría de un solo lado: <strong className="font-semibold text-zinc-900">{ars(r.refTotal)}</strong>.
                </li>
              </ul>
            </div>
          )}

          <p>
            {datos.compartido ? (
              <>
                Con cuidado compartido, cada uno presta la mitad del cuidado cotidiano, valuado en{" "}
                {ars(r.aporteEnEspecieDelOtro)} por mes para cada uno. Si los ingresos no son equivalentes, quien
                gana más pasa una cuota para que {unHijo ? "el hijo tenga" : "los hijos tengan"} el mismo nivel de
                vida en las dos casas (art. 666).
              </>
            ) : (
              <>
                El cuidado del día a día también es un aporte: la ley le reconoce valor económico (art. 660). Según
                el INDEC, ese cuidado vale {ars(r.aporteEnEspecieDelOtro)} por mes, y lo presta {otroTxt} en especie.
              </>
            )}
          </p>
        </Seccion>

        {/* ── 4. La actualización ── */}
        <Seccion n={4} titulo="Cómo se actualiza">
          <p>
            Los precios se mueven todos los meses, y la canasta del INDEC con ellos. Así cambió este mismo caso
            en los últimos {Math.min(MESES_EVOLUCION, informe.evolucion.length)} meses publicados, con los mismos
            ingresos:
          </p>
          <div className="-mx-1 overflow-x-auto px-1">
            <table className="inf-tabla w-full min-w-[30rem] border-collapse text-sm print:min-w-0 print:text-[9.5pt]">
              <thead>
                <tr className="border-b border-zinc-300 text-left text-xs text-zinc-500">
                  <th scope="col" className="py-2 pr-3 font-medium">Mes</th>
                  <th scope="col" className="py-2 pr-3 text-right font-medium">Costo de crianza</th>
                  <th scope="col" className="py-2 pr-3 text-right font-medium">
                    {r.cuotaEstimada !== null ? "Cuota de referencia" : "Mitad del costo"}
                  </th>
                  <th scope="col" className="py-2 pr-3 text-right font-medium">Canasta</th>
                  <th scope="col" className="py-2 text-right font-medium">Inflación</th>
                </tr>
              </thead>
              <tbody>
                {informe.evolucion.map((f) => {
                  const actual = f.periodo === mes.periodo;
                  return (
                    <tr key={f.periodo} className={`border-b border-zinc-100 ${actual ? "bg-emerald-50/60" : ""}`}>
                      <th scope="row" className="py-2 pr-3 text-left font-normal capitalize text-zinc-900">
                        {f.etiqueta}
                      </th>
                      <td className="py-2 pr-3 text-right tabular-nums">{ars(f.costoTotal)}</td>
                      <td className={`py-2 pr-3 text-right tabular-nums ${actual ? "font-semibold text-zinc-900" : ""}`}>
                        {ars(f.referencia)}
                      </td>
                      <td className="py-2 pr-3 text-right tabular-nums">{variacion(f.varCanasta)}</td>
                      <td className="py-2 text-right tabular-nums text-zinc-500">{variacion(f.varIPC)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-500">
            Canasta: cuánto subió el costo de crianza de este caso contra el mes anterior. Inflación: el IPC
            nacional del INDEC de ese mes.
            {informe.varPeriodo !== null ? ` En el período, el costo subió ${pct(informe.varPeriodo)}.` : ""}
          </p>
          <div className="inf-seccion rounded-xl bg-zinc-50 p-4 ring-1 ring-zinc-200">
            <p className="font-medium text-zinc-900">Para que la cuota no quede atrasada</p>
            <p className="mt-1">
              Conviene que el acuerdo diga cómo se actualiza. Una forma usada es atarla a la canasta de crianza
              del INDEC:
            </p>
            <p className={`${SERIF} mt-2 text-[1.05rem] text-zinc-900`}>
              cuota nueva = cuota acordada × (canasta del mes nuevo ÷ canasta del mes del acuerdo)
            </p>
            <p className="mt-2">
              Con el IPC la cuenta es la misma, usando el índice de precios. Qué índice se usa y cada cuánto se
              actualiza lo definen el acuerdo o la sentencia.
            </p>
          </div>
        </Seccion>

        {/* ── 5. Lo que falta ── */}
        <Seccion n={5} titulo="Lo que este cálculo no ve, y conviene llevar">
          <p>
            La canasta es un promedio. Cada familia tiene gastos que ninguna tabla mide, y en una mediación o ante
            un juez se miran aparte. Para esa charla sirve tener a mano:
          </p>
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              "Comprobantes de los gastos de todos los meses: colegio, cuota de salud, alquiler, actividades.",
              "Los gastos extraordinarios por separado: tratamientos, inicio de clases, viajes.",
              "Recibos de sueldo o constancias de ingresos de los dos progenitores.",
              "Una propuesta de cómo se actualiza la cuota y qué día del mes se paga.",
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <Casilla />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Seccion>

        {/* ── 6. Glosario ── */}
        <Seccion n={6} titulo="Palabras que vas a escuchar">
          <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 print:grid-cols-2 print:text-[9.5pt]">
            {[
              ["Alimentos", "Todo lo que un hijo necesita para vivir: comida, casa, salud, educación, ropa, esparcimiento. Se deben hasta los 21 años, o 25 si estudia y eso le impide mantenerse (arts. 658, 659 y 663)."],
              ["Alimentante", "El progenitor que paga la cuota en dinero."],
              ["Canasta de crianza", "Medición mensual del INDEC de lo que cuesta criar a un chico, por tramo de edad, hasta los 12 años."],
              ["Cuidado personal", "El día a día del hijo. Tiene valor económico y cuenta como aporte de quien lo lleva (art. 660)."],
              ["Mediación", "Charla previa al juicio con una persona neutral. En la Ciudad de Buenos Aires es obligatoria para reclamar alimentos (Ley 26.589, art. 31); cada provincia tiene su propio régimen."],
              ["Alimentos provisorios", "Los que puede fijar un juez mientras dura el juicio, para que los chicos no esperen."],
              ["Interpelación", "Un reclamo formal, por ejemplo una carta documento. Los alimentos se deben desde ese reclamo si se inicia la demanda dentro de los seis meses (art. 669)."],
            ].map(([t, d]) => (
              <div key={t}>
                <dt className="font-semibold text-zinc-900">{t}</dt>
                <dd className="mt-0.5 text-zinc-600">{d}</dd>
              </div>
            ))}
          </dl>
        </Seccion>

        {/* ── Nota legal y fuentes ── */}
        <section className="inf-seccion rounded-xl border border-zinc-300 p-5 print:p-4">
          <h2 className={`${SERIF} text-lg font-medium text-zinc-900`}>Qué es y qué no es este informe</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 print:text-[9.5pt]">
            Es una referencia de cálculo hecha con datos oficiales, para llegar a una conversación con un número
            fundado. No es asesoramiento legal ni una cuota fijada: el monto lo acuerdan los progenitores y, si no
            hay acuerdo, lo decide un juez según las necesidades de los hijos y la capacidad económica real de
            cada uno. Antes de firmar un acuerdo, consultá con un abogado de familia o con la defensoría oficial
            de tu jurisdicción, que en muchos lugares atiende sin costo.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 print:text-[9.5pt]">
            La canasta de crianza no es un mínimo legal, pero los juzgados la usan como referencia: un relevamiento
            del Ministerio de Economía encontró 22 resoluciones de 11 jurisdicciones que la tomaron para fijar o
            actualizar cuotas.
          </p>
          <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Fuentes</h3>
          <ol className="mt-2 space-y-1.5 text-xs leading-relaxed text-zinc-600">
            {FUENTES.map((f, i) => (
              <li key={f.url} className="flex gap-2">
                <span className="tabular-nums text-zinc-400">{i + 1}.</span>
                <span>
                  {f.texto}. <span className="break-all text-zinc-500">{f.url}</span> · consultado el{" "}
                  {fechaLarga(f.consultado)}.
                </span>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <p className="mt-8 border-t border-zinc-200 pt-3 text-[0.6875rem] leading-relaxed text-zinc-400 print:mt-6">
        CalculAR · calcular.ar{numero ? ` · Informe N.º ${numero}` : ""} · Elaborado con datos públicos del INDEC y
        normas oficiales.
      </p>
    </article>
  );
}
