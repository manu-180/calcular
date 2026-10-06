import type { ReactNode } from "react";
import { GANANCIAS_VIGENCIA } from "@/data/ganancias";
import { formatARS, formatPctFijo } from "@/lib/formato";
import { fechaLarga } from "@/lib/hoy";
import { fuenteInforme } from "@/components/InformeCuotaFuente";
import { FUENTES_INFORME } from "@/components/informe-ganancias/fuentes";
import {
  ANIO_FISCAL,
  FECHA_TOPE_SIRADIG,
  FICHAS,
  type Informe,
  type Oportunidad,
} from "@/app/informes/ganancias/_modelo";

const ars = (n: number) => formatARS(n, 0);
const pct = (fraccion: number, dec = 0) => formatPctFijo(fraccion * 100, dec);

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

function Dato({ etiqueta, valor, fuerte = false }: { etiqueta: string; valor: string; fuerte?: boolean }) {
  return (
    <div>
      <dt className="text-xs text-zinc-500">{etiqueta}</dt>
      <dd className={`tabular-nums ${fuerte ? "font-semibold text-zinc-900" : "text-zinc-900"}`}>{valor}</dd>
    </div>
  );
}

function TarjetaDeduccion({ o }: { o: Oportunidad }) {
  const f = FICHAS[o.id];
  const cargada = o.pagadoAnual > 0;
  return (
    <li className="inf-seccion rounded-xl border border-zinc-200 p-4 print:p-3">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-semibold text-zinc-900">{f.titulo}</h3>
        <span className="text-xs text-zinc-500">{f.norma}</span>
      </div>
      <p className="mt-1 text-sm text-zinc-600">{f.regla}</p>

      <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
        <Dato etiqueta="Máximo que podés deducir" valor={o.techo > 0 ? `${ars(o.techo)} al año` : "No te corresponde"} />
        <Dato etiqueta="Te devolvería, como mucho" valor={ars(o.ahorroTecho)} fuerte />
        {cargada ? (
          <Dato etiqueta={`Con lo que pagás (${ars(o.pagadoAnual)} al año)`} valor={`deducís ${ars(o.deducible)} · te vuelven ${ars(o.ahorro)}`} fuerte />
        ) : o.mensualParaTope !== null && o.techo > 0 ? (
          <Dato etiqueta="Llegás al máximo pagando" valor={`${ars(o.mensualParaTope)} por mes`} />
        ) : null}
      </dl>

      {cargada && o.deducible < o.pagadoAnual && o.id !== "alquiler" && o.id !== "honorarios" && o.id !== "seguroVida" ? (
        <p className="mt-2 text-xs text-zinc-500">Lo que pasa del máximo no se deduce este año.</p>
      ) : null}

      <div className="mt-3 grid gap-3 border-t border-zinc-100 pt-3 text-sm sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Qué necesitás</p>
          <ul className="mt-1.5 space-y-1">
            {f.papeles.map((p) => (
              <li key={p} className="flex gap-2">
                <Casilla />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">En el SiRADIG</p>
          <p className="mt-1.5">{f.siradig}</p>
        </div>
      </div>
    </li>
  );
}

export function InformeGananciasDocumento({
  informe,
  numero,
  emitido,
  muestra = false,
}: {
  informe: Informe;
  /** Número de informe (el id del pago). Sin número, es una vista previa. */
  numero?: string | null;
  /** AAAA-MM-DD. La vista previa no la lleva: mostraría la fecha del build. */
  emitido?: string | null;
  muestra?: boolean;
}) {
  const { datos: d, filas } = informe;
  const Titulo = muestra ? "p" : "h1";
  const conGastos = informe.filasCon !== null;
  const cargadas = informe.oportunidades.filter((o) => o.pagadoAnual > 0).sort((a, b) => b.ahorro - a.ahorro);
  const resto = informe.oportunidades
    .filter((o) => o.pagadoAnual === 0 && o.techo > 0)
    .sort((a, b) => b.ahorroTecho - a.ahorroTecho);
  const paraLaSemana = (cargadas.length > 0 ? cargadas : resto.slice(0, 3)).map((o) => FICHAS[o.id].titulo.toLowerCase());

  return (
    <article
      className={`${fuenteInforme.variable} inf-doc relative bg-white text-zinc-800 [print-color-adjust:exact] [-webkit-print-color-adjust:exact]`}
      aria-label="Informe de Ganancias 2026"
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
            <dt className="inline">Valores de ARCA del </dt>
            <dd className="inline text-zinc-800">{GANANCIAS_VIGENCIA}</dd>
          </div>
        </dl>
      </div>

      <header className="mt-8 print:mt-6">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-emerald-700">Informe personal · 4.ª categoría</p>
        <Titulo className={`${SERIF} mt-2 text-[2.1rem] font-normal leading-[1.05] tracking-[-0.02em] text-zinc-900 [font-variation-settings:'opsz'_72] sm:text-[2.6rem] print:text-[26pt]`}>
          Ganancias {ANIO_FISCAL}
        </Titulo>
        <p className={`${SERIF} mt-1.5 text-lg italic text-zinc-600 print:text-[12pt]`}>
          Cuánto vas a pagar en el año y cómo pagar menos, con la ley en la mano
        </p>
      </header>

      {/* ── La cifra ── */}
      <div className="inf-seccion mt-7 grid gap-px overflow-hidden rounded-xl bg-zinc-200 ring-1 ring-zinc-200 sm:grid-cols-[1.35fr_1fr]">
        <div className="bg-emerald-50/70 p-5 sm:p-6">
          {conGastos ? (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">Podés recuperar en el año</p>
              <p className={`${SERIF} mt-2 text-[2.6rem] leading-none tracking-[-0.02em] text-zinc-900 tabular-nums print:text-[30pt]`}>
                {ars(informe.ahorroTotal)}
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                cargando en el SiRADIG lo que ya pagás: de {ars(informe.total)} pasás a {ars(informe.totalCon)}
              </p>
            </>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">Ganancias estimado del año</p>
              <p className={`${SERIF} mt-2 text-[2.6rem] leading-none tracking-[-0.02em] text-zinc-900 tabular-nums print:text-[30pt]`}>
                {ars(informe.total)}
              </p>
              <p className="mt-2 text-sm text-zinc-600">
                el {pct(informe.tasaEfectiva, 1)} de tu sueldo bruto del año, aguinaldo incluido
              </p>
            </>
          )}
        </div>
        <dl className="grid content-start gap-3 bg-white p-5 text-sm sm:p-6">
          <div>
            <dt className="text-xs text-zinc-500">Tu tramo de la escala</dt>
            <dd className="font-medium tabular-nums text-zinc-900">{pct(informe.alicuotaMarginal)} sobre cada peso extra</dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">Si deducís $100.000 por mes</dt>
            <dd className="font-medium tabular-nums text-zinc-900">te vuelven {ars(informe.porCada100k)} en el año</dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">Retención de un mes común</dt>
            <dd className="font-medium tabular-nums text-zinc-900">
              {ars(informe.mesComun)} · junio y diciembre {ars(informe.junio)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 space-y-7 print:mt-6 print:space-y-5">
        {/* ── 1. El caso ── */}
        <Seccion n={1} titulo="Tu caso">
          <dl className="grid gap-x-8 gap-y-2.5 sm:grid-cols-3">
            <Dato etiqueta="Sueldo bruto mensual" valor={ars(d.bruto)} />
            <Dato etiqueta="Cónyuge o conviviente a cargo" valor={d.conyuge ? "Sí" : "No"} />
            <Dato etiqueta="Hijos menores de 18 a cargo" valor={String(d.hijos)} />
            <Dato etiqueta="Cuota sindical" valor={d.sindical > 0 ? pct(d.sindical, 1) : "No"} />
            <Dato etiqueta="Deducciones que ya declarás" valor={d.otras > 0 ? `${ars(d.otras)} por mes` : "Ninguna"} />
          </dl>
          <p className="text-xs text-zinc-500">
            Supuestos: el mismo sueldo todo el año, aguinaldo del 50% en junio y en diciembre, un solo empleador y
            el método acumulado de retención que usa tu empleador. Escala y deducciones de ARCA del {GANANCIAS_VIGENCIA}.
          </p>
        </Seccion>

        {/* ── 2. Mes a mes ── */}
        <Seccion n={2} titulo="Tu año, mes a mes">
          <p>
            Tu empleador no te descuenta lo mismo todos los meses: cada mes suma lo que ganaste desde enero, proyecta el
            año entero y retiene la diferencia con lo que ya te sacó. Por eso los meses con aguinaldo pegan más fuerte.
          </p>
          <div className="-mx-1 overflow-x-auto px-1">
            <table className="inf-tabla w-full min-w-[32rem] border-collapse text-sm print:min-w-0 print:text-[9pt]">
              <thead>
                <tr className="border-b border-zinc-300 text-left text-xs text-zinc-500">
                  <th scope="col" className="py-2 pr-3 font-medium">Mes</th>
                  <th scope="col" className="py-2 pr-3 text-right font-medium">Bruto</th>
                  <th scope="col" className="py-2 pr-3 text-right font-medium">Retención</th>
                  <th scope="col" className="py-2 pr-3 text-right font-medium">Acumulado</th>
                  <th scope="col" className="py-2 pr-3 text-right font-medium">Tramo</th>
                  {conGastos ? <th scope="col" className="py-2 text-right font-medium text-emerald-800">Con tus deducciones</th> : null}
                </tr>
              </thead>
              <tbody>
                {filas.map((f, i) => {
                  const sac = f.mes === 6 || f.mes === 12;
                  return (
                    <tr key={f.mes} className={`border-b border-zinc-100 ${sac ? "bg-amber-50/60" : ""}`}>
                      <th scope="row" className="py-1.5 pr-3 text-left font-normal text-zinc-900">
                        {f.nombreMes}
                        {sac ? <span className="ml-1.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800">+ aguinaldo</span> : null}
                      </th>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{ars(f.brutoMes)}</td>
                      <td className="py-1.5 pr-3 text-right font-medium tabular-nums text-zinc-900">{ars(f.retencionMes)}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums text-zinc-500">{ars(f.retencionAcumulada)}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums text-zinc-500">{pct(informe.alicuotaPorMes[i])}</td>
                      {informe.filasCon ? (
                        <td className="py-1.5 text-right tabular-nums text-emerald-800">{ars(informe.filasCon[i].retencionMes)}</td>
                      ) : null}
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-zinc-800">
                  <th scope="row" className="py-2.5 pr-3 text-left font-semibold text-zinc-900">Total del año</th>
                  <td className="py-2.5 pr-3 text-right tabular-nums">{ars(d.bruto * 13)}</td>
                  <td className="py-2.5 pr-3 text-right font-semibold tabular-nums text-zinc-900">{ars(informe.total)}</td>
                  <td />
                  <td />
                  {conGastos ? <td className="py-2.5 text-right font-semibold tabular-nums text-emerald-800">{ars(informe.totalCon)}</td> : null}
                </tr>
              </tfoot>
            </table>
          </div>
          <p>
            El aguinaldo te cuesta <strong className="font-semibold text-zinc-900">{ars(informe.costoAguinaldo)}</strong> de
            Ganancias en el año. Tramo: la alícuota de la escala que se aplica a cada peso que sumás arriba del último
            escalón. Es la que importa para saber cuánto te devuelve una deducción.
          </p>
        </Seccion>

        {/* ── 3. Deducciones ── */}
        <Seccion n={3} titulo="Deducciones que podrías estar dejando pasar">
          <p>
            Una deducción no te devuelve lo que pagaste: baja la base sobre la que se calcula el impuesto. Lo que vuelve
            depende de tu tramo. En tu caso, cada $100.000 por mes que cargás te devuelven{" "}
            <strong className="font-semibold text-zinc-900">{ars(informe.porCada100k)}</strong> en el año. Todo lo que sigue
            es legal y está en la ley de Ganancias; sólo cuenta si tenés el comprobante.
          </p>

          {cargadas.length > 0 ? (
            <>
              <h3 className="pt-1 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">Lo que ya pagás</h3>
              <ul className="space-y-3">
                {cargadas.map((o) => (
                  <TarjetaDeduccion key={o.id} o={o} />
                ))}
              </ul>
            </>
          ) : null}

          {resto.length > 0 ? (
            <>
              <h3 className="pt-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {cargadas.length > 0 ? "Otras que te pueden tocar" : "Las que te pueden tocar, de mayor a menor"}
              </h3>
              <ul className="space-y-3">
                {resto.map((o) => (
                  <TarjetaDeduccion key={o.id} o={o} />
                ))}
              </ul>
            </>
          ) : null}

          {informe.cargas.conyuge !== null || informe.cargas.hijo !== null ? (
            <div className="inf-seccion rounded-xl bg-zinc-50 p-4 ring-1 ring-zinc-200">
              <p className="font-medium text-zinc-900">Cargas de familia: revisá que estén</p>
              <ul className="mt-2 space-y-1.5 text-sm">
                {informe.cargas.conyuge !== null ? (
                  <li>
                    Cónyuge o pareja conviviente sin ingresos anuales arriba de la ganancia no imponible:{" "}
                    <strong className="font-semibold text-zinc-900">{ars(informe.cargas.conyuge)}</strong> menos de Ganancias en
                    el año.
                  </li>
                ) : null}
                {informe.cargas.hijo !== null ? (
                  <li>
                    {d.hijos > 0 ? "Un hijo más" : "Un hijo"} menor de 18 a cargo:{" "}
                    <strong className="font-semibold text-zinc-900">{ars(informe.cargas.hijo)}</strong> menos en el año, cargado
                    al 100%.
                  </li>
                ) : null}
                <li>
                  Si a los dos progenitores les retienen Ganancias, cada uno puede cargar el 50% de cada hijo o uno el 100%.
                  Necesitás el CUIL de cada carga.
                </li>
              </ul>
            </div>
          ) : null}

          <p className="text-xs text-zinc-500">
            «Te devolvería» se calcula con el mismo motor de esta proyección: el impuesto del año sin la deducción menos
            con ella. Cada tarjeta mide esa deducción sola; cargadas juntas, el total es menor que la suma porque bajás de
            tramo. Prepaga, médicos y donaciones tienen cada una su 5%, calculado sobre tu sueldo del año menos aportes.
          </p>
        </Seccion>

        {/* ── 4. SiRADIG ── */}
        <Seccion n={4} titulo="Cómo cargarlas en el SiRADIG">
          <ol className="space-y-2.5">
            {[
              ["Entrá con tu clave fiscal en arca.gob.ar", "Buscá el servicio «SiRADIG – Trabajador». Si no aparece, sumalo con el botón «Agregar» o desde el Administrador de Relaciones de Clave Fiscal."],
              ["Elegí tu nombre y el período 2026", "Creá un borrador con «Crear nuevo borrador» y entrá a «Carga de formulario». Revisá que tu empleador esté cargado y marcado como agente de retención."],
              ["Cargá cada deducción", "En «Deducciones y desgravaciones», tocá «Agregar deducciones y desgravaciones» y elegí la opción. Te pide la CUIT de quien te factura, el mes (o un rango de meses) y cada comprobante."],
              ["Revisá y enviá", "Al final del menú principal, «Vista previa». Si está todo bien, «Enviar al empleador» y confirmá con «Generar presentación»."],
              ["Chequeá que lo hayan leído", "En «Consulta de formularios enviados» ves la fecha en que tu empleador lo leyó."],
            ].map(([t, x], i) => (
              <li key={t} className="flex gap-3">
                <span className="w-5 shrink-0 pt-px text-sm tabular-nums text-emerald-700">{i + 1}.</span>
                <span>
                  <strong className="font-semibold text-zinc-900">{t}.</strong> {x}
                </span>
              </li>
            ))}
          </ol>
          <div className="inf-seccion grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 p-4">
              <p className="font-medium text-zinc-900">Hasta cuándo</p>
              <p className="mt-1 text-sm">
                Podés presentar todos los meses. Para el año {ANIO_FISCAL}, lo que cargues hasta el{" "}
                <strong className="font-semibold text-zinc-900">{fechaLarga(FECHA_TOPE_SIRADIG)}</strong> entra en la
                liquidación anual que hace tu empleador.
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200 p-4">
              <p className="font-medium text-zinc-900">Qué pasa después</p>
              <p className="mt-1 text-sm">
                Como la retención es acumulada, lo que cargás de meses anteriores corrige todo el año: tu empleador lo
                toma en las liquidaciones siguientes y, si ya te retuvo de más, la diferencia vuelve en el recibo o, a más
                tardar, en la liquidación anual.
              </p>
            </div>
          </div>
        </Seccion>

        {/* ── 5. Esta semana ── */}
        <Seccion n={5} titulo="Lo que podés hacer esta semana">
          <ul className="space-y-2">
            {[
              paraLaSemana.length > 0
                ? `Juntá los comprobantes de ${paraLaSemana.join(", ")}: facturas con CUIT, de enero hasta hoy.`
                : "Juntá los comprobantes de lo que pagás: facturas con CUIT, de enero hasta hoy.",
              "Pedí la factura que falte: al dueño del departamento, a la prepaga, a cada profesional. Sin factura no se deduce.",
              "Entrá al SiRADIG y revisá tus cargas de familia antes que nada.",
              "Cargá las deducciones mes por mes y enviá la presentación a tu empleador.",
              "Mirá tu próximo recibo: la retención de Ganancias tendría que bajar. Si no cambia, preguntale a quien liquida los sueldos si leyó tu F.572.",
            ].map((t) => (
              <li key={t} className="flex gap-2.5">
                <Casilla />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Seccion>

        {/* ── Nota y fuentes ── */}
        <section className="inf-seccion rounded-xl border border-zinc-300 p-5 print:p-4">
          <h2 className={`${SERIF} text-lg font-medium text-zinc-900`}>Qué es y qué no es este informe</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 print:text-[9.5pt]">
            Es una referencia de cálculo con la escala y las deducciones oficiales de ARCA, para que sepas qué te
            corresponde y qué cargar. No es la liquidación de tu empleador, que puede tener aumentos, bonos, horas extra
            u otro empleo que esta proyección no ve, ni reemplaza a un contador. Sólo incluye deducciones previstas en la
            ley: cada una exige su comprobante, y ARCA puede impugnar lo que se cargue sin respaldo.
          </p>
          <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Fuentes</h3>
          <ol className="mt-2 space-y-1.5 text-xs leading-relaxed text-zinc-600">
            {FUENTES_INFORME.map((f, i) => (
              <li key={f.texto} className="flex gap-2">
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
        CalculAR · calcular.ar{numero ? ` · Informe N.º ${numero}` : ""} · Elaborado con la escala y las deducciones
        publicadas por ARCA y el texto oficial de la ley.
      </p>
    </article>
  );
}
