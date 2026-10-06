import type { ReactNode } from "react";
import { INFLACION_FUENTES, IPC_DIA_PUBLICACION } from "@/data/inflacion";
import { IPC_DESCARGADO_EL } from "@/data/ipc-serie";
import { formatARS, formatPctFijo } from "@/lib/formato";
import { fechaLarga } from "@/lib/hoy";
import type { Datos } from "@/lib/prefill/inflacion";
import { fuenteInforme } from "@/components/InformeCuotaFuente";
import { esDeuda, mesCorto, mesTxt, NOMBRE_CASO_CORTO, type Informe } from "@/app/informes/inflacion/_modelo";
import { armarCarta, lugarYFecha, PERSONALES_VACIOS, type Personales } from "./carta";

const LEY_23928 = "https://servicios.infoleg.gob.ar/infolegInternet/anexos/0-4999/328/texact.htm";

const ars = (n: number) => formatARS(n, 0);
const pct = (n: number) => formatPctFijo(n, 1);
const indice = (n: number) => n.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 4 });
const factor = (n: number) => n.toLocaleString("es-AR", { minimumFractionDigits: 4, maximumFractionDigits: 4 });

const SERIF = "[font-family:var(--font-informe),Georgia,serif]";

function Seccion({ n, titulo, children, className = "" }: { n: number; titulo: string; children: ReactNode; className?: string }) {
  return (
    <section className={`inf-seccion border-t border-zinc-200 pt-6 print:pt-4 ${className}`}>
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

export function InformeInflacionDocumento({
  datos,
  informe,
  personales = PERSONALES_VACIOS,
  numero,
  emitido,
  muestra = false,
}: {
  datos: Datos;
  informe: Informe;
  personales?: Personales;
  /** Número de informe (derivado del id del pago). Sin número, es una vista previa. */
  numero?: string | null;
  /** AAAA-MM-DD. La vista previa de la landing no la lleva: es estática y mostraría la del build. */
  emitido?: string | null;
  muestra?: boolean;
}) {
  const { act, brecha: b } = informe;
  const carta = armarCarta(datos.caso, informe, personales, emitido);
  const lugar = lugarYFecha(personales, emitido);
  const deuda = esDeuda(datos.caso);
  const desde = mesTxt(informe.desde);
  const hasta = mesTxt(informe.hasta);
  const Titulo = muestra ? "p" : "h1";
  let n = 0;
  const sig = () => ++n;

  const fuentes = [
    { texto: INFLACION_FUENTES.ipc.nombre, url: INFLACION_FUENTES.ipc.url, consultado: IPC_DESCARGADO_EL },
    { texto: INFLACION_FUENTES.indec.nombre, url: INFLACION_FUENTES.indec.url, consultado: IPC_DESCARGADO_EL },
    ...(deuda
      ? [{ texto: "Ley 23.928, arts. 7 y 10 (texto según Ley 25.561), InfoLEG", url: LEY_23928, consultado: "2026-10-06" }]
      : []),
  ];

  const preguntas: [string, string][] = [
    [
      "¿Por qué el IPC y no otro número?",
      "Porque es el índice oficial de precios del país: lo publica el INDEC todos los meses y cualquiera lo puede consultar. No es una estimación propia ni de ninguna de las dos partes.",
    ],
    [
      `¿Por qué desde ${desde}?`,
      `Porque es el mes en que se fijó el monto. La cuenta toma el índice de ese mes y el de ${hasta}, sin promedios ni redondeos intermedios.`,
    ],
    [
      "«Lo mío no subió tanto» (o «subió más»)",
      "Es cierto que el IPC promedia lo que consumen todos los hogares y puede no coincidir con un gasto puntual. Justamente por eso sirve como referencia común: no favorece a nadie.",
    ],
    [
      "¿Y el mes que viene?",
      `El IPC de ${mesTxt(informe.proximo.periodo)} lo publica el INDEC ${IPC_DIA_PUBLICACION} de ${mesTxt(informe.proximo.publicaEn).split(" de ")[0]}. ${
        informe.hastaEsUltimo ? "El enlace de este informe no vence: si lo abrís después, ya trae el dato nuevo." : ""
      }`,
    ],
    ...(deuda
      ? ([
          [
            "¿Se puede exigir el monto actualizado?",
            "No con este informe. Por ley, una deuda en pesos se cancela con la misma cantidad de pesos: el art. 7 de la Ley 23.928 no admite la indexación. Nada impide que las dos partes acuerden devolver el valor actualizado, y por eso la carta es una propuesta. Para un reclamo, consultá con un abogado.",
          ],
        ] as [string, string][])
      : []),
  ];

  return (
    <article
      className={`${fuenteInforme.variable} inf-doc relative bg-white text-zinc-800 [print-color-adjust:exact] [-webkit-print-color-adjust:exact]`}
      aria-label="Informe de actualización por inflación"
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
          Informe de referencia · {NOMBRE_CASO_CORTO[datos.caso]}
        </p>
        <Titulo className={`${SERIF} mt-2 text-[2.1rem] font-normal leading-[1.05] tracking-[-0.02em] text-zinc-900 [font-variation-settings:'opsz'_72] sm:text-[2.6rem] print:text-[26pt]`}>
          Actualización por inflación
        </Titulo>
        <p className={`${SERIF} mt-1.5 text-lg italic text-zinc-600 print:text-[12pt]`}>
          {ars(informe.monto)} de {desde}, llevados a pesos de {hasta} con el IPC del INDEC
        </p>
      </header>

      {/* ── La cifra ── */}
      <div className="inf-seccion mt-7 grid gap-px overflow-hidden rounded-xl bg-zinc-200 ring-1 ring-zinc-200 sm:grid-cols-[1.35fr_1fr]">
        <div className="bg-emerald-50/70 p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">Monto actualizado a {hasta}</p>
          <p className={`${SERIF} mt-2 text-[2.6rem] leading-none tracking-[-0.02em] text-zinc-900 tabular-nums print:text-[30pt]`}>
            {ars(act.montoActualizado)}
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            {ars(informe.monto)} de {desde} · {pct(act.variacionPct)} de inflación en {informe.meses}{" "}
            {informe.meses === 1 ? "mes" : "meses"}
          </p>
        </div>
        <dl className="grid content-start gap-3 bg-white p-5 text-sm sm:p-6">
          {b ? (
            <div>
              <dt className="text-xs text-zinc-500">{b.gana ? "Contra el sueldo de hoy" : "Le falta al sueldo de hoy"}</dt>
              <dd className="font-medium tabular-nums text-zinc-900">
                {b.gana ? `${ars(b.diferencia)} por encima` : `${ars(-b.diferencia)} por mes (+${pct(b.aumentoNecesarioPct)})`}
              </dd>
            </div>
          ) : (
            <div>
              <dt className="text-xs text-zinc-500">La diferencia</dt>
              <dd className="font-medium tabular-nums text-zinc-900">{ars(act.montoActualizado - informe.monto)} más</dd>
            </div>
          )}
          <div>
            <dt className="text-xs text-zinc-500">Coeficiente de actualización</dt>
            <dd className="font-medium tabular-nums text-zinc-900">× {factor(act.factor)}</dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">Dato oficial</dt>
            <dd className="text-zinc-900">
              IPC INDEC, {hasta}
              {informe.hastaEsUltimo ? " (último publicado)" : ""}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 space-y-7 print:mt-6 print:space-y-5">
        {/* ── Cómo se calculó ── */}
        <Seccion n={sig()} titulo="Cómo se calculó, en simple">
          <p>
            El INDEC mide todos los meses cuánto cambian los precios de lo que compra un hogar promedio: es el{" "}
            <strong className="font-semibold text-zinc-900">Índice de Precios al Consumidor</strong> (IPC). Lo publica como un
            número que arrancó en 100 en diciembre de 2016 y sube con los precios. Para saber cuánto vale hoy una plata de
            otro mes, se compara el índice de los dos meses:
          </p>
          <div className="inf-seccion rounded-xl bg-zinc-50 p-4 ring-1 ring-zinc-200">
            <p className={`${SERIF} text-[1.05rem] text-zinc-900`}>
              monto de hoy = monto original × (IPC de {hasta} ÷ IPC de {desde})
            </p>
            <p className="mt-2 tabular-nums text-zinc-800">
              {ars(informe.monto)} × ({indice(informe.indiceHasta)} ÷ {indice(informe.indiceDesde)}) ={" "}
              {ars(informe.monto)} × {factor(act.factor)} ={" "}
              <strong className="font-semibold text-zinc-900">{ars(act.montoActualizado)}</strong>
            </p>
          </div>
          <p>
            Es decir: lo que en {desde} costaba {ars(informe.monto)}, en {hasta} cuesta {ars(act.montoActualizado)}. No es
            plata de más: es la misma cantidad de cosas, medida en pesos de hoy. Cualquiera puede rehacer la cuenta con los dos
            índices de arriba, que son los del INDEC.
          </p>
        </Seccion>

        {/* ── Mes a mes ── */}
        <Seccion n={sig()} titulo={informe.porAnio ? "Año por año" : "Mes a mes"}>
          <p>
            {informe.porAnio
              ? `Son ${informe.meses} meses: para que entre en la hoja, la tabla muestra cada año calendario completo. El resultado es el mismo que mes a mes.`
              : "Cómo fue creciendo el mismo monto con la inflación de cada mes."}
          </p>
          <div className="-mx-1 overflow-x-auto px-1">
            <table className="inf-tabla w-full min-w-[32rem] border-collapse text-sm print:min-w-0 print:text-[9pt]">
              <thead>
                <tr className="border-b border-zinc-300 text-left text-xs text-zinc-500">
                  <th scope="col" className="py-2 pr-3 font-medium">{informe.porAnio ? "Tramo" : "Mes"}</th>
                  <th scope="col" className="py-2 pr-3 text-right font-medium">Índice IPC</th>
                  <th scope="col" className="py-2 pr-3 text-right font-medium">{informe.porAnio ? "Inflación del tramo" : "Del mes"}</th>
                  <th scope="col" className="py-2 pr-3 text-right font-medium">Acumulada</th>
                  <th scope="col" className="py-2 text-right font-medium">Monto</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-100 text-zinc-500">
                  <th scope="row" className="py-1.5 pr-3 text-left font-normal capitalize">{mesCorto(informe.desde)} · origen</th>
                  <td className="py-1.5 pr-3 text-right tabular-nums">{indice(informe.indiceDesde)}</td>
                  <td className="py-1.5 pr-3 text-right">—</td>
                  <td className="py-1.5 pr-3 text-right">—</td>
                  <td className="py-1.5 text-right tabular-nums">{ars(informe.monto)}</td>
                </tr>
                {informe.filas.map((f) => {
                  const final = f.periodo === informe.hasta;
                  return (
                    <tr key={f.periodo} className={`border-b border-zinc-100 ${final ? "bg-emerald-50/60" : ""}`}>
                      <th scope="row" className="py-1.5 pr-3 text-left font-normal capitalize text-zinc-900">
                        {informe.porAnio ? `${mesCorto(f.desde)} → ${mesCorto(f.periodo)}` : mesCorto(f.periodo)}
                      </th>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{indice(f.indice)}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{pct(f.variacion)}</td>
                      <td className="py-1.5 pr-3 text-right tabular-nums">{pct(f.acumulada)}</td>
                      <td className={`py-1.5 text-right tabular-nums ${final ? "font-semibold text-zinc-900" : ""}`}>
                        {ars(f.montoActualizado)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-500">
            Fuente: INDEC, IPC Nacional nivel general (base diciembre 2016 = 100).{" "}
            {informe.hastaEsUltimo
              ? `${hasta[0].toUpperCase()}${hasta.slice(1)} es el último mes publicado al emitir este informe.`
              : ""}
          </p>
        </Seccion>

        {/* ── El sueldo ── */}
        {b ? (
          <Seccion n={sig()} titulo="El sueldo de hoy frente a la inflación">
            <dl className="grid gap-px overflow-hidden rounded-xl bg-zinc-200 ring-1 ring-zinc-200 sm:grid-cols-3">
              <div className="bg-white p-4">
                <dt className="text-xs text-zinc-500">Sueldo de {desde}</dt>
                <dd className="mt-0.5 font-medium tabular-nums text-zinc-900">{ars(informe.monto)}</dd>
              </div>
              <div className="bg-white p-4">
                <dt className="text-xs text-zinc-500">Para empatar, en {hasta}</dt>
                <dd className="mt-0.5 font-medium tabular-nums text-zinc-900">{ars(b.equivalente)}</dd>
              </div>
              <div className={b.gana ? "bg-emerald-50/70 p-4" : "bg-amber-50/80 p-4"}>
                <dt className="text-xs text-zinc-500">Sueldo de hoy</dt>
                <dd className="mt-0.5 font-medium tabular-nums text-zinc-900">{ars(b.actual)}</dd>
              </div>
            </dl>
            <p>
              {b.gana ? (
                <>
                  El sueldo de hoy está {ars(b.diferencia)} por encima del de {desde} actualizado: ganó un{" "}
                  {pct(b.diferenciaRealPct)} de poder de compra.
                </>
              ) : (
                <>
                  Al sueldo de hoy le faltan <strong className="font-semibold text-zinc-900">{ars(-b.diferencia)} por mes</strong>{" "}
                  para comprar lo mismo que en {desde}: perdió un {pct(-b.diferenciaRealPct)} de poder de compra. Para recuperarlo,
                  tendría que subir un <strong className="font-semibold text-zinc-900">{pct(b.aumentoNecesarioPct)}</strong>.
                </>
              )}
            </p>
            <p className="text-xs text-zinc-500">
              Si el trabajo está en un convenio colectivo, la escala del convenio fija el mínimo; este cálculo mide sólo el
              poder de compra del sueldo que se cobra.
            </p>
          </Seccion>
        ) : null}

        {/* ── La carta ── */}
        <Seccion n={sig()} titulo="La carta, lista para mandar" className="inf-carta">
          <p className="text-sm text-zinc-500 print:hidden">
            Para pegar en un mail o un mensaje, o para imprimir sola: al imprimir, la carta empieza en una hoja aparte.
          </p>
          <div className={`${SERIF} rounded-xl border border-zinc-200 px-5 py-6 text-[1.02rem] leading-[1.65] text-zinc-800 sm:px-8 sm:py-8 print:border-0 print:p-0 print:text-[11.5pt]`}>
            {lugar ? <p className="text-right text-zinc-600">{lugar}</p> : null}
            <p className="mt-4 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-zinc-500 [font-family:var(--font-geist-sans)]">
              Asunto: {carta.asunto}
            </p>
            <p className="mt-4">{carta.saludo}</p>
            {carta.parrafos.map((t, i) => (
              <p key={i} className="mt-3">
                {t}
              </p>
            ))}
            <p className="mt-5">{carta.despedida}</p>
            <p className="mt-6 min-h-[1.65em] border-b border-dotted border-zinc-300 pb-1 sm:max-w-[16rem]">
              {carta.firma || <span className="text-zinc-400 print:text-transparent">Tu nombre</span>}
            </p>
          </div>
        </Seccion>

        {/* ── Preguntas ── */}
        <Seccion n={sig()} titulo="Si te preguntan">
          <dl className="grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2 print:grid-cols-2 print:text-[9.5pt]">
            {preguntas.map(([q, a]) => (
              <div key={q}>
                <dt className="font-semibold text-zinc-900">{q}</dt>
                <dd className="mt-0.5 text-zinc-600">{a}</dd>
              </div>
            ))}
          </dl>
        </Seccion>

        {/* ── Nota y fuentes ── */}
        <section className="inf-seccion rounded-xl border border-zinc-300 p-5 print:p-4">
          <h2 className={`${SERIF} text-lg font-medium text-zinc-900`}>Qué es y qué no es este informe</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-700 print:text-[9.5pt]">
            Es una referencia de cálculo hecha con el dato oficial del INDEC, para llegar a una conversación con un número
            fundado. El IPC mide la variación promedio de los precios al consumidor: no es lo que subió cada gasto en
            particular. No es asesoramiento legal, contable ni financiero, y no obliga a nadie a pagar un monto: el valor
            final lo acuerdan las partes.
            {deuda
              ? " En deudas de dinero, la Ley 23.928 (art. 7) no admite la actualización por índices: el monto actualizado sirve para proponer un acuerdo, no para exigirlo."
              : ""}
          </p>
          <h3 className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Fuentes</h3>
          <ol className="mt-2 space-y-1.5 text-xs leading-relaxed text-zinc-600">
            {fuentes.map((f, i) => (
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
        CalculAR · calcular.ar{numero ? ` · Informe N.º ${numero}` : ""} · Elaborado con datos públicos del INDEC.
      </p>
    </article>
  );
}
