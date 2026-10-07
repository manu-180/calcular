import type { ReactNode } from "react";
import { formatARS } from "@/lib/formato";
import { fechaLarga } from "@/lib/hoy";
import { INDEMNIZACION_FUENTES, MESES_PERIODO_PRUEBA } from "@/data/indemnizacion";
import { CERTIFICADO_FUENTES, FORMULARIO, SERVICIO_TRABAJADOR } from "@/data/certificado-trabajo";
import { DESEMPLEO_FUENTES } from "@/data/desempleo";
import type { Datos } from "@/lib/prefill/indemnizacion";
import { fuenteInforme } from "@/components/InformeCuotaFuente";
import { textoAntiguedad, type Comparacion, type Informe, type Rubro } from "@/app/informes/indemnizacion/_modelo";

export type PersonalesInforme = { trabajador: string; empresa: string };
export const PERSONALES_VACIOS: PersonalesInforme = { trabajador: "", empresa: "" };

const CONSULTA = "2026-10-06";

const FUENTES = [
  { texto: INDEMNIZACION_FUENTES.lct.nombre.replace(", arts. 231-233 y 245", "") + ", InfoLEG", url: INDEMNIZACION_FUENTES.lct.url, consultado: CONSULTA },
  { texto: INDEMNIZACION_FUENTES.ley27802.nombre, url: INDEMNIZACION_FUENTES.ley27802.url, consultado: CONSULTA },
  { texto: INDEMNIZACION_FUENTES.ligArt26.nombre, url: INDEMNIZACION_FUENTES.ligArt26.url, consultado: "2026-09-21" },
  { texto: DESEMPLEO_FUENTES.ley.nombre, url: DESEMPLEO_FUENTES.ley.url, consultado: DESEMPLEO_FUENTES.consultadoEl },
  { texto: "Ministerio de Capital Humano: Servicio de Conciliación Laboral Obligatoria (SECLO)", url: "https://www.argentina.gob.ar/trabajo/seclo", consultado: CONSULTA },
  ...CERTIFICADO_FUENTES.lista
    .filter((f) => f.url.includes("425871"))
    .map((f) => ({ texto: f.nombre, url: f.url, consultado: CERTIFICADO_FUENTES.consultadoEl })),
];

const ars = (n: number) => formatARS(n, 0);

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

function Lista({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2.5">
          <Casilla />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function Diferencia({ n }: { n: number }) {
  if (Math.abs(n) < 1) return <span className="text-zinc-500">Coincide</span>;
  return (
    <span className={n > 0 ? "font-semibold text-amber-800" : "text-zinc-600"}>
      {n > 0 ? `Faltan ${ars(n)}` : `${ars(-n)} más`}
    </span>
  );
}

function TablaRubros({ titulo, rubros, subtotal }: { titulo: string; rubros: Rubro[]; subtotal: number }) {
  if (rubros.length === 0) return null;
  return (
    <>
      <tbody>
        <tr>
          <th colSpan={3} scope="colgroup" className="pb-1 pt-4 text-left text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            {titulo}
          </th>
        </tr>
        {rubros.map((r) => (
          <tr key={r.clave} className="border-b border-zinc-100 align-top">
            <th scope="row" className="py-2 pr-3 text-left font-normal">
              <span className="text-zinc-900">{r.nombre}</span>
              <span className="block text-xs text-zinc-500">{r.norma}</span>
            </th>
            <td className="py-2 pr-3 text-xs leading-relaxed text-zinc-600 tabular-nums print:text-[8.5pt]">{r.cuenta}</td>
            <td className="py-2 text-right font-medium tabular-nums text-zinc-900">{ars(r.monto)}</td>
          </tr>
        ))}
        <tr className="border-b border-zinc-300">
          <th scope="row" colSpan={2} className="py-2 pr-3 text-left text-sm font-semibold text-zinc-800">
            Subtotal
          </th>
          <td className="py-2 text-right font-semibold tabular-nums text-zinc-900">{ars(subtotal)}</td>
        </tr>
      </tbody>
    </>
  );
}

export function InformeIndemnizacionDocumento({
  datos,
  informe,
  comparacion = null,
  personales = PERSONALES_VACIOS,
  numero,
  emitido,
  muestra = false,
}: {
  datos: Datos;
  informe: Informe;
  comparacion?: Comparacion | null;
  personales?: PersonalesInforme;
  /** Número de informe (derivado del id del pago). Sin número, es una vista previa. */
  numero?: string | null;
  /** Fecha de emisión, AAAA-MM-DD. La vista previa estática no la lleva: mostraría la del build. */
  emitido?: string | null;
  muestra?: boolean;
}) {
  const { r, g } = informe;
  const trabajador = personales.trabajador.trim();
  const empresa = personales.empresa.trim();
  const indem = informe.rubros.filter((x) => x.grupo === "indemnizacion");
  const liq = informe.rubros.filter((x) => x.grupo === "liquidacion");
  const Titulo = muestra ? "p" : "h1";
  let n = 0;
  const sig = () => ++n;

  return (
    <article
      className={`${fuenteInforme.variable} inf-doc relative bg-white text-zinc-800 [print-color-adjust:exact] [-webkit-print-color-adjust:exact]`}
      aria-label="Informe de liquidación final por despido"
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
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">Informe de referencia</p>
        <Titulo className={`${SERIF} mt-2 text-[2.1rem] font-normal leading-[1.05] tracking-[-0.02em] text-zinc-900 [font-variation-settings:'opsz'_72] sm:text-[2.6rem] print:text-[26pt]`}>
          Liquidación final por despido
        </Titulo>
        <p className={`${SERIF} mt-1.5 text-lg italic text-zinc-600 print:text-[12pt]`}>
          Rubro por rubro, con la norma y la cuenta a la vista
        </p>
      </header>

      {/* ── La cifra ── */}
      <div className="inf-seccion mt-7 grid gap-px overflow-hidden rounded-xl bg-zinc-200 ring-1 ring-zinc-200 sm:grid-cols-[1.35fr_1fr]">
        <div className="bg-emerald-50/70 p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">Lo que surge de la ley</p>
          <p className={`${SERIF} mt-2 text-[2.6rem] leading-none tracking-[-0.02em] text-zinc-900 tabular-nums print:text-[30pt]`}>
            {ars(informe.total)}
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            {r.enPeriodoPrueba
              ? "Liquidación final: el despido fue dentro del período de prueba"
              : `Indemnización ${ars(informe.totalIndemnizacion)} · liquidación final ${ars(informe.totalLiquidacion)}`}
          </p>
        </div>
        <dl className="grid content-start gap-3 bg-white p-5 text-sm sm:p-6">
          <div>
            <dt className="text-xs text-zinc-500">Antigüedad</dt>
            <dd className="font-medium text-zinc-900">
              {textoAntiguedad(r.antiguedad)}
              {!r.enPeriodoPrueba ? ` · ${r.aniosComputables} ${r.aniosComputables === 1 ? "año computable" : "años computables"}` : ""}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">Mejor remuneración mensual</dt>
            <dd className="font-medium tabular-nums text-zinc-900">{ars(r.base)}</dd>
          </div>
          {comparacion ? (
            <div>
              <dt className="text-xs text-zinc-500">Contra lo que te ofrecen</dt>
              <dd className="font-medium tabular-nums">
                <Diferencia n={comparacion.diferencia} />
              </dd>
            </div>
          ) : (
            <div>
              <dt className="text-xs text-zinc-500">Despido</dt>
              <dd className="text-zinc-900">{fechaLarga(datos.despido)}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="mt-8 space-y-7 print:mt-6 print:space-y-5">
        {/* ── El caso ── */}
        <Seccion n={sig()} titulo="Los datos del caso">
          <dl className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {trabajador ? (
              <div>
                <dt className="text-xs text-zinc-500">Trabajador/a</dt>
                <dd className="text-zinc-900">{trabajador}</dd>
              </div>
            ) : null}
            {empresa ? (
              <div>
                <dt className="text-xs text-zinc-500">Empleador</dt>
                <dd className="text-zinc-900">{empresa}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-xs text-zinc-500">Fecha de ingreso</dt>
              <dd className="text-zinc-900">{fechaLarga(datos.ingreso)}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">Fecha del despido</dt>
              <dd className="text-zinc-900">{fechaLarga(datos.despido)}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">Mejor remuneración mensual, normal y habitual</dt>
              <dd className="tabular-nums text-zinc-900">{ars(datos.sueldo)} brutos</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-500">Preaviso</dt>
              <dd className="text-zinc-900">{datos.preaviso ? "Otorgado y trabajado" : "No se otorgó"}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-xs text-zinc-500">Tope del convenio</dt>
              <dd className="text-zinc-900">
                {datos.tope === null
                  ? "No informado: el cálculo va sin tope"
                  : `${ars(datos.tope)}${r.topeAplicado ? ` · se aplica, y la base queda en ${ars(r.baseAplicada)}` : " · tu sueldo no lo supera, no se aplica"}`}
              </dd>
            </div>
          </dl>
          <p className="text-xs text-zinc-500">
            Calculado para un despido sin justa causa (o un despido indirecto, que la ley trata igual: art. 246). Los
            montos y nombres los cargó quien emitió este informe.
          </p>
        </Seccion>

        {/* ── Rubro por rubro ── */}
        <Seccion n={sig()} titulo="Rubro por rubro">
          {r.enPeriodoPrueba ? (
            <p className="rounded-lg bg-amber-50 px-3.5 py-2.5 text-sm text-amber-900 print:border print:border-amber-200">
              Con {textoAntiguedad(r.antiguedad)} de antigüedad el contrato terminó dentro del período de prueba de{" "}
              {MESES_PERIODO_PRUEBA} meses (art. 92 bis). En ese caso la ley no da indemnización por antigüedad ni
              preaviso, pero la liquidación final se debe igual. Algunos convenios estiran el período de prueba: si tu
              ingreso fue hace más de {MESES_PERIODO_PRUEBA} meses, revisá este punto con un abogado.
            </p>
          ) : (
            <p>
              Cada rubro con el artículo que lo manda y la cuenta hecha, para que lo puedas rehacer con el recibo en la
              mano. La base es tu mejor remuneración mensual, normal y habitual del último año (art. 245).
            </p>
          )}
          <div className="-mx-1 overflow-x-auto px-1">
            <table className="inf-tabla w-full min-w-[32rem] border-collapse text-sm print:min-w-0 print:text-[9.5pt]">
              <thead>
                <tr className="border-b border-zinc-300 text-left text-xs text-zinc-500">
                  <th scope="col" className="py-2 pr-3 font-medium">Rubro</th>
                  <th scope="col" className="py-2 pr-3 font-medium">Cómo se calcula</th>
                  <th scope="col" className="py-2 text-right font-medium">Monto</th>
                </tr>
              </thead>
              <TablaRubros titulo="Indemnización" rubros={indem} subtotal={informe.totalIndemnizacion} />
              <TablaRubros titulo="Liquidación final" rubros={liq} subtotal={informe.totalLiquidacion} />
              <tfoot>
                <tr className="border-t-2 border-zinc-800">
                  <th scope="row" colSpan={2} className="py-2.5 pr-3 text-left font-semibold text-zinc-900">
                    Total que surge de la ley
                  </th>
                  <td className="py-2.5 text-right font-semibold tabular-nums text-zinc-900">{ars(informe.total)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          {r.topeAplicado ? (
            <p className="text-sm">
              Tu sueldo supera el tope del convenio, así que la base de la antigüedad baja a {ars(r.baseAplicada)}. Por ley
              nunca puede quedar por debajo del 67% de tu remuneración real (art. 245, texto Ley 27.802).
            </p>
          ) : !r.enPeriodoPrueba ? (
            <p className="text-sm">
              Sin tope de convenio. Si tu convenio tiene tope y tu sueldo lo supera, la antigüedad puede bajar, pero nunca
              por debajo de {ars(r.indemnizacionMinimaConTope)}: el piso del 67% que ahora está escrito en el art. 245.
            </p>
          ) : null}
          <p className="text-xs text-zinc-500">
            Los días trabajados se calcularon con un sueldo de {ars(informe.diasMes.sueldoMes)}. Sin ese rubro, el total es{" "}
            {ars(informe.totalCalculadora)}: el mismo número que muestra la calculadora de calcular.ar.
          </p>
        </Seccion>

        {/* ── Lo que ofrecen ── */}
        <Seccion n={sig()} titulo="Lo que te ofrecen y lo que surge de la ley">
          {comparacion ? (
            <>
              <div className="-mx-1 overflow-x-auto px-1">
                <table className="inf-tabla w-full min-w-[30rem] border-collapse text-sm print:min-w-0 print:text-[9.5pt]">
                  <thead>
                    <tr className="border-b border-zinc-300 text-left text-xs text-zinc-500">
                      <th scope="col" className="py-2 pr-3 font-medium">Rubro</th>
                      <th scope="col" className="py-2 pr-3 text-right font-medium">Según la ley</th>
                      <th scope="col" className="py-2 pr-3 text-right font-medium">Te ofrecen</th>
                      <th scope="col" className="py-2 text-right font-medium">Diferencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparacion.porRubro ? (
                      comparacion.filas.map((f) => (
                        <tr key={f.clave} className="border-b border-zinc-100">
                          <th scope="row" className="py-2 pr-3 text-left font-normal text-zinc-900">{f.nombre}</th>
                          <td className="py-2 pr-3 text-right tabular-nums">{ars(f.ley)}</td>
                          <td className="py-2 pr-3 text-right tabular-nums">{f.ofrecido === null ? <span className="text-zinc-400">Sin dato</span> : ars(f.ofrecido)}</td>
                          <td className="py-2 text-right tabular-nums">{f.diferencia === null ? "—" : <Diferencia n={f.diferencia} />}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="border-b border-zinc-100">
                        <th scope="row" className="py-2 pr-3 text-left font-normal text-zinc-900">Total de la liquidación</th>
                        <td className="py-2 pr-3 text-right tabular-nums">{ars(comparacion.leyComparable)}</td>
                        <td className="py-2 pr-3 text-right tabular-nums">{ars(comparacion.ofrecidoTotal)}</td>
                        <td className="py-2 text-right tabular-nums"><Diferencia n={comparacion.diferencia} /></td>
                      </tr>
                    )}
                  </tbody>
                  {comparacion.porRubro ? (
                    <tfoot>
                      <tr className="border-t-2 border-zinc-800">
                        <th scope="row" className="py-2.5 pr-3 text-left font-semibold text-zinc-900">En los rubros comparados</th>
                        <td className="py-2.5 pr-3 text-right font-semibold tabular-nums">{ars(comparacion.leyComparable)}</td>
                        <td className="py-2.5 pr-3 text-right font-semibold tabular-nums">{ars(comparacion.ofrecidoTotal)}</td>
                        <td className="py-2.5 text-right tabular-nums"><Diferencia n={comparacion.diferencia} /></td>
                      </tr>
                    </tfoot>
                  ) : null}
                </table>
              </div>
              <p className="text-sm">
                {comparacion.diferencia >= 1
                  ? "Una diferencia no prueba por sí sola que la oferta esté mal: puede haber un sueldo distinto, un tope de convenio o un concepto que la empresa liquidó aparte. Sirve para preguntar, rubro por rubro, de dónde sale cada número."
                  : "La oferta cubre lo que surge de este cálculo en los rubros comparados. Igual conviene revisar que cada rubro figure por separado en el recibo."}
              </p>
            </>
          ) : (
            <>
              <p>
                Si ya te pasaron un número, escribilo a mano en la columna del medio y comparalo rubro por rubro. Si sólo
                te dieron un total, comparalo con el total de la sección anterior.
              </p>
              <div className="-mx-1 overflow-x-auto px-1">
                <table className="inf-tabla w-full min-w-[30rem] border-collapse text-sm print:min-w-0 print:text-[9.5pt]">
                  <thead>
                    <tr className="border-b border-zinc-300 text-left text-xs text-zinc-500">
                      <th scope="col" className="py-2 pr-3 font-medium">Rubro</th>
                      <th scope="col" className="py-2 pr-3 text-right font-medium">Según la ley</th>
                      <th scope="col" className="w-32 py-2 pr-3 text-right font-medium">Te ofrecen</th>
                      <th scope="col" className="w-28 py-2 text-right font-medium">Diferencia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {informe.rubros.map((f) => (
                      <tr key={f.clave} className="border-b border-zinc-200">
                        <th scope="row" className="py-2.5 pr-3 text-left font-normal text-zinc-900">{f.nombre}</th>
                        <td className="py-2.5 pr-3 text-right tabular-nums">{ars(f.monto)}</td>
                        <td className="py-2.5 pr-3"><span aria-hidden className="block border-b border-dotted border-zinc-400">&nbsp;</span></td>
                        <td className="py-2.5"><span aria-hidden className="block border-b border-dotted border-zinc-400">&nbsp;</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          <p className="rounded-lg bg-zinc-50 px-3.5 py-2.5 text-sm ring-1 ring-zinc-200">
            Si te pagan menos de lo que corresponde, la ley toma ese pago como entrega a cuenta del total, aunque lo
            recibas sin reservas, y podés reclamar la diferencia mientras no prescriba (art. 260 LCT).
          </p>
        </Seccion>

        {/* ── Ganancias ── */}
        <Seccion n={sig()} titulo="Qué parte puede pagar Ganancias">
          <div className="-mx-1 overflow-x-auto px-1">
            <table className="w-full min-w-[26rem] border-collapse text-sm print:min-w-0 print:text-[9.5pt]">
              <tbody>
                <tr className="border-b border-zinc-100">
                  <th scope="row" className="py-2 pr-3 text-left font-normal text-zinc-900">
                    Exento por ley
                    <span className="block text-xs text-zinc-500">Antigüedad del art. 245</span>
                  </th>
                  <td className="py-2 text-right font-medium tabular-nums text-emerald-800">{ars(g.exento)}</td>
                </tr>
                {g.noExentoPorLey > 0 ? (
                  <tr className="border-b border-zinc-100">
                    <th scope="row" className="py-2 pr-3 text-left font-normal text-zinc-900">
                      No exento por ley
                      <span className="block text-xs text-zinc-500">Preaviso y su aguinaldo: la ley lo nombra</span>
                    </th>
                    <td className="py-2 text-right font-medium tabular-nums">{ars(g.noExentoPorLey)}</td>
                  </tr>
                ) : null}
                <tr className="border-b border-zinc-100">
                  <th scope="row" className="py-2 pr-3 text-left font-normal text-zinc-900">
                    Sin exención
                    <span className="block text-xs text-zinc-500">Integración, aguinaldo y vacaciones</span>
                  </th>
                  <td className="py-2 text-right font-medium tabular-nums">{ars(g.sinExencion)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm">
            La exención está en el art. 26 inc. i) de la Ley de Ganancias y es una lista cerrada. Que un rubro no esté
            exento no quiere decir que te lo descuenten: sólo se paga si tus ingresos del año superan las deducciones
            personales. A esto se suman los días trabajados del mes, que se tratan como sueldo.
          </p>
        </Seccion>

        {/* ── Antes de firmar ── */}
        <Seccion n={sig()} titulo="Antes de firmar">
          <Lista
            items={[
              <>
                <strong className="font-semibold text-zinc-900">Que cada rubro figure por separado</strong> en el recibo,
                con su monto. Un «total liquidación» sin detalle no se puede revisar.
              </>,
              <>
                <strong className="font-semibold text-zinc-900">Que diga despido sin causa</strong> si fue eso. Si te
                piden firmar una renuncia o un «mutuo acuerdo» que no pediste, no firmes sin consultar: cambia lo que te
                corresponde.
              </>,
              <>
                <strong className="font-semibold text-zinc-900">Un acuerdo que cierre todo tiene que homologarse.</strong>{" "}
                Los acuerdos transaccionales o liberatorios sólo valen con intervención de la autoridad judicial o
                administrativa, que debe declarar que son una justa composición de los derechos (art. 15).
              </>,
              <>
                <strong className="font-semibold text-zinc-900">Lo que dice la ley no se puede achicar por contrato.</strong>{" "}
                Es nulo cualquier acuerdo que suprima o reduzca derechos de la ley, también los que surgen de la
                extinción (art. 12).
              </>,
              <>
                <strong className="font-semibold text-zinc-900">Cobrar la indemnización cierra el capítulo.</strong> Desde
                la Ley 27.802, la indemnización del art. 245 es la única reparación por el despido sin causa y su
                cobro extingue cualquier otro reclamo vinculado al despido, salvo delitos penales. Si pensás reclamar
                algo más, consultalo antes de cobrar.
              </>,
              <>Pedí copia de todo lo que firmes y guardá la comunicación del despido (telegrama, carta documento o mail).</>,
            ]}
          />
        </Seccion>

        {/* ── Papeles ── */}
        <Seccion n={sig()} titulo="Qué papeles pedir y juntar">
          <ul className="grid gap-2 sm:grid-cols-2">
            {[
              "Los recibos de sueldo del último año: de ahí sale la mejor remuneración que es la base de todo.",
              "La comunicación del despido, con la fecha y la causa que invocaron.",
              `El certificado de trabajo y la constancia de aportes (art. 80). Hoy se emite con el ${FORMULARIO} y también podés verlo en el servicio «${SERVICIO_TRABAJADOR}» de ARCA.`,
              "El recibo de la liquidación final, con cada rubro discriminado.",
              "Tu convenio colectivo, si sabés cuál es: ahí está el tope de la indemnización.",
              "Si vas al SECLO o a una conciliación: tu DNI, este informe y todo lo anterior.",
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <Casilla />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Seccion>

        {/* ── Plazos ── */}
        <Seccion n={sig()} titulo="Plazos que importan">
          <ol className="divide-y divide-zinc-100 border-y border-zinc-200">
            {informe.plazos.map((p) => (
              <li key={p.clave} className="inf-seccion grid gap-1 py-3 sm:grid-cols-[11rem_1fr] sm:gap-5">
                <div>
                  <p className="font-medium text-zinc-900">{p.titulo}</p>
                  {p.fecha ? <p className="text-sm tabular-nums text-emerald-800">hasta el {fechaLarga(p.fecha)}</p> : null}
                </div>
                <div>
                  <p className="text-sm">{p.detalle}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">{p.norma}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-xs text-zinc-500">
            Días hábiles contados de lunes a viernes, sin feriados nacionales, desde el día siguiente al despido. Un feriado
            provincial puede correr la fecha un día.
          </p>
          <p className="text-sm">
            Si no hay acuerdo y la empresa tiene domicilio en la Ciudad de Buenos Aires, antes de un juicio hay una
            instancia obligatoria y gratuita para el trabajador: el SECLO, donde vas con un abogado o con tu sindicato.
            Cada provincia tiene su propio procedimiento de conciliación.
          </p>
        </Seccion>

        {/* ── Glosario ── */}
        <Seccion n={sig()} titulo="Palabras que vas a escuchar">
          <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 print:grid-cols-2 print:text-[9.5pt]">
            {[
              ["Mejor remuneración", "El sueldo bruto mensual más alto del último año, sin aguinaldo ni premios que no se pagan todos los meses. Lo variable entra por promedio (art. 245)."],
              ["Fracción mayor de 3 meses", "Después del último año completo, si trabajaste más de 3 meses, cuenta como un año más para la antigüedad."],
              ["Tope de convenio", "La base de la antigüedad no puede superar 3 veces el sueldo promedio del convenio, pero nunca baja del 67% de tu sueldo real."],
              ["Preaviso", "El aviso anticipado del despido: 1 mes hasta 5 años de antigüedad, 2 meses si es más. Si no te lo dan, se paga (arts. 231 y 232)."],
              ["Integración del mes", "Si te despiden sin preaviso a mitad de mes, se pagan los días que faltan hasta fin de mes (art. 233)."],
              ["SAC", "El aguinaldo. Se paga la parte proporcional del semestre, y también se calcula sobre el preaviso, la integración y las vacaciones."],
              ["Homologación", "Cuando la autoridad laboral o un juez aprueba un acuerdo. Le da efecto de cosa juzgada: después no se puede discutir (art. 15)."],
              ["SECLO", "El Servicio de Conciliación Laboral Obligatoria de la Ciudad de Buenos Aires: el paso previo a un juicio laboral."],
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
            Es una referencia de cálculo hecha con la ley vigente, para llegar a una conversación con la empresa, al SECLO
            o a un abogado con la cuenta hecha y explicada. No es asesoramiento legal ni una liquidación oficial: el
            resultado depende de datos que este informe no ve (lo que dice tu recibo, tu convenio, si la causa del
            despido se discute) y, si hay juicio, lo decide un juez. Antes de firmar, consultá con un abogado
            laboralista o con tu sindicato.
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 print:text-[9.5pt]">
            Supuestos del cálculo: despido sin justa causa, contrato por tiempo indeterminado, período de prueba legal de{" "}
            {MESES_PERIODO_PRUEBA} meses, vacaciones según la escala de la ley y sueldo informado como bruto. Las multas de
            las leyes 24.013, 25.323 y 25.345 fueron derogadas por la Ley 27.742 y no se incluyen.
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
      </div>

      <p className="mt-8 border-t border-zinc-200 pt-3 text-[0.6875rem] leading-relaxed text-zinc-400 print:mt-6">
        CalculAR · calcular.ar{numero ? ` · Informe N.º ${numero}` : ""} · Elaborado con el texto vigente de la Ley de
        Contrato de Trabajo y normas oficiales.
      </p>
    </article>
  );
}
