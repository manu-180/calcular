import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraGarantia82 } from "@/components/CalculadoraGarantia82";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import {
  ANIOS_SERVICIOS,
  GARANTIA_82_FUENTES,
  GARANTIA_82_TEXTOS,
  MORATORIAS_EXCLUIDAS,
  UNIVERSOS,
} from "@/data/garantia-82";
import { PRESTACIONES_VIGENTES } from "@/data/prestaciones";
import { etiquetaMes, smvmVigente } from "@/lib/desempleo";
import {
  comparativaMensual,
  horizonteSinSuplemento,
  nivelGarantizado,
  pagaHoy,
  pisoPropio,
} from "@/lib/garantia-82";
import { formatARS } from "@/lib/formato";

const SMVM = smvmVigente().mes;
const MES = etiquetaMes(SMVM.periodo);
const NIVEL = nivelGarantizado(SMVM.periodo);
const MINIMO = PRESTACIONES_VIGENTES.haberMinimo;
const BRECHA = Math.round(((MINIMO - NIVEL) / NIVEL) * 1000) / 10;

const H = horizonteSinSuplemento();
const MES_FIN = etiquetaMes(H.ultimoPeriodo);

const NIVEL_VETERANO = nivelGarantizado(SMVM.periodo, "pension-veterano");
const PISO_VETERANO = pisoPropio(SMVM.periodo, "pension-veterano") ?? 0;
const PAGA_ALGUNO = UNIVERSOS.some((u) => pagaHoy(SMVM.periodo, u.id) === true);

// La tabla arranca en el mes vigente: lo que importa es hoy y lo que ya tiene norma hacia adelante.
const TODAS = comparativaMensual();
const I_VIGENTE = TODAS.findIndex((f) => f.periodo === SMVM.periodo);
const COMPARATIVA = TODAS.slice(Math.max(0, I_VIGENTE - 3));
const CON_NORMA = TODAS.filter((f) => f.haberMinimo !== null);
const PRIMERA = CON_NORMA[0];

export const metadata: Metadata = {
  title: `82% móvil: el suplemento del art. 125 bis en ${MES} es ${formatARS(0, 0)}`,
  description: `La garantía del 82% del salario mínimo existe y está vigente, pero hoy no paga nada: es un suplemento «hasta alcanzar» ${formatARS(NIVEL, 0)}, y el haber mínimo garantizado ya es ${formatARS(MINIMO, 0)} — un ${BRECHA}% más alto. Calculá tu caso, mirá la brecha mes a mes y a quiénes alcanza de verdad: la ley excluye las moratorias y la reglamentación mete regímenes de menos de ${ANIOS_SERVICIOS} años.`,
  alternates: { canonical: "/82-por-ciento-movil" },
  openGraph: {
    title: `82% móvil: cuánto paga hoy el art. 125 bis`,
    description: `El 82% del salario mínimo son ${formatARS(NIVEL, 0)} y el haber mínimo ya es ${formatARS(MINIMO, 0)}. El suplemento es la diferencia: hoy, cero.`,
    url: "https://calcular.ar/82-por-ciento-movil",
    images: [
      {
        url: `/og?t=${encodeURIComponent(`82% móvil · ${MES}`)}&s=${encodeURIComponent(`Nivel garantizado ${formatARS(NIVEL, 0)} · haber mínimo ${formatARS(MINIMO, 0)}`)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: `¿Cuánto se cobra por el 82% del salario mínimo en ${MES}?`,
    a: `Cero, en el universo general. El artículo 125 bis de la Ley 24.241 no fija un haber del 82%: fija un suplemento «hasta alcanzar» ese nivel. En ${MES} el 82% del salario mínimo es ${formatARS(NIVEL, 0)}, y el haber mínimo garantizado que todo beneficiario ya cobra por el artículo 125 es ${formatARS(MINIMO, 0)} — un ${BRECHA}% más alto. Como no hay diferencia que cubrir, el suplemento da cero. Que dé cero no significa que la garantía esté derogada: sigue vigente y se activaría sola si alguna vez el 82% del salario mínimo superara al haber mínimo.`,
  },
  {
    q: "Entonces, ¿me están sacando algo?",
    a: `No, y es la confusión que más daño hace. Los dos son pisos de la misma ley: el artículo 125 garantiza el haber mínimo y el artículo 125 bis garantiza el 82% del salario mínimo. Se aplica el más alto de los dos, y hoy el más alto es el haber mínimo. Una nota que dice «los jubilados cobran el 82% del salario mínimo» está publicando un número ${BRECHA}% MENOR al que ya se cobra.`,
  },
  {
    q: "¿El 82% móvil es el 82% del sueldo del trabajador activo?",
    a: "Ese es el reclamo histórico, pero no es lo que dice la ley vigente. El 82% que está escrito en el derecho argentino desde diciembre de 2017 es el 82% del Salario Mínimo, Vital y Móvil que fija el Consejo del Salario — no el 82% de la remuneración del trabajador en actividad del mismo puesto. Son dos cosas distintas y se nombran igual, y ahí empieza la mitad de los malentendidos del tema.",
  },
  {
    q: `¿Sirve si me jubilé por moratoria?`,
    a: `No. El segundo párrafo del artículo 125 bis excluye por nombre a quienes accedieron a la Prestación Básica Universal por ${MORATORIAS_EXCLUIDAS.join(", ")}, todas con las modificaciones de los artículos 20 a 22 de la Ley 27.260. Es una exclusión expresa del texto legal, no una interpretación de ANSES.`,
  },
  {
    q: `¿Hay que tener ${ANIOS_SERVICIOS} años de aportes sí o sí?`,
    a: `El texto de la ley pide ${ANIOS_SERVICIOS} años o más de servicios con aportes efectivos, pero la reglamentación abre la puerta bastante más de lo que se publica. El artículo 2º de la Resolución 25-E/2017 de la Secretaría de Seguridad Social incluye expresamente los beneficios otorgados por normas que exigen menos de ${ANIOS_SERVICIOS} años: regímenes nacionales anteriores a la Ley 24.241, diferenciales o insalubres, especiales derogados por la Ley 23.966, los de los artículos 18 a 25 de la Ley 24.018, el retiro por invalidez con aportes regulares, los de las ex cajas provinciales o municipales transferidas al Estado nacional en el marco de la Ley 24.307, y las pensiones directas o derivadas de todos ellos.`,
  },
  {
    q: "¿Y los veteranos de Malvinas, que tienen un nivel más alto?",
    a: `Tampoco cobran suplemento, y la razón es elegante: la reglamentación le asigna a la pensión honorífica de Veterano de Guerra de la Ley 23.848 un nivel del 82% del valor de TRES salarios mínimos —${formatARS(NIVEL_VETERANO, 0)} en ${MES}—, pero esa pensión ya vale, por el Decreto 1357/2004, TRES veces el haber mínimo: ${formatARS(PISO_VETERANO, 0)}. El nivel garantizado y el piso propio están multiplicados por el mismo número, así que la proporción es exactamente la misma que en el caso general y el resultado también: cero. Es el error más fácil de cometer acá — comparar el nivel de un beneficio triple contra el haber mínimo simple da un «sí, paga» que es falso. Lo que sí distingue a esta pensión, y casi no se publica, es que el artículo 3º de la Ley 23.848 la declara compatible con cualquier otro beneficio previsional permanente, nacional, provincial o municipal.`,
  },
  {
    q: "¿Hay alguien que hoy cobre el suplemento?",
    a: `Con los valores de ${MES}, en ninguno de los universos con piso conocido: en todos, el beneficio que la persona ya cobra supera el nivel del 82%. El único caso en el que la respuesta depende de cada persona es la jubilación del régimen especial para ex soldados combatientes de la Ley 27.329, que no tiene un múltiplo fijo del haber mínimo: ahí hay que comparar contra el haber efectivamente liquidado, y para eso está la calculadora. No es que la garantía esté derogada: es que el salario mínimo quedó atrás del haber mínimo, y mientras eso siga así el artículo no tiene diferencia que pagar.`,
  },
  {
    q: `¿Puede volver a activarse la garantía general?`,
    a: `Sí, pero no en el horizonte que ya tiene norma. El laudo del Consejo del Salario dejó fijado el salario mínimo hasta ${MES_FIN}: el 82% de ese último mes es ${formatARS(H.nivelUltimo, 0)}, todavía por debajo del haber mínimo de ${formatARS(H.haberMinimoHoy, 0)} que rige HOY. Para que la garantía volviera a pagar algo en ese período, el haber mínimo tendría que caer un ${H.caidaNecesariaPct}% en pesos corrientes, y la movilidad del Decreto 274/2024 lo mueve con el IPC de dos meses antes. No es imposible por definición —lo sería con inflación negativa—, pero es lo contrario de lo que viene pasando: la brecha se ensanchó todos los meses.`,
  },
  {
    q: "¿Y el bono? ¿Cuenta para llegar al 82%?",
    a: `El bono es otra cosa y va por decreto propio, mes a mes. Es no remunerativo y discrecional: no es parte del haber ni de la garantía del artículo 125 bis, y puede no existir. Si querés ver cuánto cobrás de verdad este mes, con tu haber real y el bono que corresponda, está la calculadora de jubilación.`,
  },
  {
    q: "¿Quién liquida el suplemento?",
    a: `ANSES. El artículo 3º de la Resolución 25-E/2017 la faculta expresamente «para emitir las normas de procedimientos relativas al alcance y contenido» de la reglamentación. Lo que se calcula acá es la diferencia que surge de aplicar la norma sobre valores oficiales publicados, no una liquidación del organismo.`,
  },
];

export default function Garantia82Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de la garantía del 82% del salario mínimo (art. 125 bis)",
        url: "https://calcular.ar/82-por-ciento-movil",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      datasetSchema({
        nombre: "Garantía del 82% del SMVM contra el haber mínimo garantizado, mes a mes",
        descripcion: `Nivel garantizado por el artículo 125 bis de la Ley 24.241 (82% del salario mínimo vital y móvil) comparado mes a mes con el haber mínimo garantizado del artículo 125 que fija ANSES por resolución. Incluye el suplemento resultante, que es la diferencia entre ambos cuando el primero supera al segundo.`,
        url: "/82-por-ciento-movil",
        modificado: GARANTIA_82_FUENTES.consultadoEl,
        fuenteNombre: GARANTIA_82_FUENTES.lista[0].nombre,
        fuenteUrl: GARANTIA_82_FUENTES.lista[0].url,
      }),
      articleSchema({
        titulo: "82% móvil: qué garantiza el art. 125 bis y por qué hoy el suplemento da cero",
        descripcion:
          "La garantía del 82% del salario mínimo está vigente, pero es un suplemento «hasta alcanzar» ese nivel, y el haber mínimo garantizado hace años que lo supera. La brecha mes a mes, quiénes quedan excluidos por moratoria, y los universos que la reglamentación agregó — incluidos los de Malvinas, que tampoco cobran suplemento porque su piso propio también es triple.",
        url: "/82-por-ciento-movil",
        modificado: GARANTIA_82_FUENTES.consultadoEl,
      }),
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <article className="space-y-10">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          82% móvil: la garantía existe, y en {MES} el suplemento es {formatARS(0, 0)}
        </h1>
        <p className="text-zinc-600">
          El artículo 125 bis de la Ley 24.241 no fija un haber del 82% del salario mínimo: fija un{" "}
          <strong>suplemento «hasta alcanzar»</strong> ese nivel. Y el otro piso de la misma ley —el
          haber mínimo garantizado— hace años que está por encima. Acá está la cuenta con los
          valores oficiales, la brecha mes a mes, y los universos que la reglamentación agregó y casi
          nadie publica.
        </p>
      </header>

      <RespuestaPrimero actualizado={GARANTIA_82_FUENTES.consultadoEl}>
        <p>
          <strong>
            En {MES} el 82% del salario mínimo es {formatARS(NIVEL, 0)} y el haber mínimo garantizado
            es {formatARS(MINIMO, 0)}: el suplemento del artículo 125 bis da cero.
          </strong>{" "}
          No porque la garantía esté derogada —sigue vigente y se activaría sola si el 82% superara
          al mínimo—, sino porque el haber mínimo ya está un <strong>{BRECHA}% por encima</strong> de
          ese nivel y el artículo sólo manda pagar la diferencia. La consecuencia práctica es
          incómoda: cada nota que titula «los jubilados cobran el 82% del salario mínimo» publica un
          número <strong>menor</strong> al que esa persona ya está cobrando. Tampoco paga en los
          beneficios de Malvinas: la reglamentación les da un nivel triple, pero el Decreto
          1357/2004 ya les da un piso triple, y multiplicar los dos lados por lo mismo no cambia
          nada.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Tu caso</h2>
        <p className="text-sm text-zinc-600">
          Elegí el mes y tu situación. Si cargás tu haber, la calculadora compara contra el nivel
          garantizado de ese mes; si lo dejás en blanco, usa el haber mínimo, que es el piso que ya
          tenés asegurado por el artículo 125.
        </p>
        <CalculadoraGarantia82 />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los dos pisos, mes a mes: por qué gana siempre el mismo
        </h2>
        <p className="text-zinc-600">
          Esta es toda la historia en una tabla. La columna del 82% sale de la escala del salario
          mínimo publicada en el Boletín Oficial; la del haber mínimo, de la resolución mensual de
          ANSES. El suplemento es la resta, y no puede ser negativo. Desde{" "}
          {etiquetaMes(PRIMERA.periodo)} la brecha no dejó de ensancharse:{" "}
          {PRIMERA.brechaPct}% entonces, {BRECHA}% ahora.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[38rem] text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Mes</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Salario mínimo</th>
                  <th className="px-4 py-2.5 text-right font-semibold">82% (art. 125 bis)</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Haber mínimo (art. 125)</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Suplemento</th>
                </tr>
              </thead>
              <tbody>
                {COMPARATIVA.map((f) => (
                  <tr
                    key={f.periodo}
                    className={`border-t border-zinc-100 ${
                      f.periodo === SMVM.periodo ? "bg-emerald-50/60 font-semibold" : ""
                    }`}
                  >
                    <td className="px-4 py-2.5 text-zinc-700">
                      {etiquetaMes(f.periodo)}
                      {f.periodo === SMVM.periodo ? (
                        <span className="ml-2 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                          vigente
                        </span>
                      ) : null}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-zinc-700">
                      {formatARS(f.smvm, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                      {formatARS(f.nivel, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                      {f.haberMinimo === null ? (
                        <span className="text-zinc-400">sin resolución</span>
                      ) : (
                        <>
                          {formatARS(f.haberMinimo, 0)}
                          <span className="ml-1 text-xs font-normal text-emerald-700">
                            +{f.brechaPct}%
                          </span>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-zinc-700">
                      {f.suplemento === null ? "—" : formatARS(f.suplemento, 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-zinc-500">
          El salario mínimo tiene norma dictada hasta {MES_FIN} porque la Resolución 4/2026 salió por
          laudo y fijó ocho meses de una. El haber mínimo, en cambio, se dicta mes a mes: por eso las
          últimas filas todavía no tienen con qué compararse. Aun así el dato ya está: el 82% del
          último mes de la escala son {formatARS(H.nivelUltimo, 0)}, todavía{" "}
          {H.caidaNecesariaPct}% por debajo del haber mínimo{" "}
          <em>que rige hoy</em>. Para que la garantía general se activara en ese horizonte, el haber
          mínimo tendría que <strong>bajar</strong>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          A quiénes alcanza de verdad (la reglamentación cambia el mapa)
        </h2>
        <p className="text-zinc-600">
          La ley pide ser titular de la PBU con {ANIOS_SERVICIOS} años o más de aportes efectivos. La
          Resolución 25-E/2017 de la Secretaría de Seguridad Social, que la reglamenta, amplía ese
          universo hacia un lado y le fija niveles propios a los beneficios de Malvinas. La columna
          que decide es la tercera: <strong>cada nivel se compara contra el piso que ese beneficio
          ya tiene por su propia norma</strong>, nunca contra el haber mínimo general. Medirlo contra
          el mínimo simple es lo que hace parecer que la pensión de veterano cobra suplemento — y no
          lo cobra.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[52rem] text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Situación</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Nivel del 82% en {MES}</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Piso que ya tiene</th>
                  <th className="px-4 py-2.5 font-semibold">¿Paga hoy?</th>
                  <th className="px-4 py-2.5 font-semibold">Norma</th>
                </tr>
              </thead>
              <tbody>
                {UNIVERSOS.map((u) => {
                  const nivel = nivelGarantizado(SMVM.periodo, u.id);
                  const piso = pisoPropio(SMVM.periodo, u.id);
                  const activo = pagaHoy(SMVM.periodo, u.id);
                  return (
                    <tr key={u.id} className="border-t border-zinc-100 align-top">
                      <td className="px-4 py-2.5">
                        <span className="font-medium text-zinc-800">{u.etiqueta}</span>
                        <span className="mt-1 block text-xs text-zinc-500">{u.detalle}</span>
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                        {formatARS(nivel, 0)}
                        <span className="mt-0.5 block text-xs font-normal text-zinc-500">
                          82% × {u.smvm} SMVM
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-zinc-700">
                        {piso === null ? (
                          <span className="text-xs text-zinc-400">según el haber liquidado</span>
                        ) : (
                          <>
                            {formatARS(piso, 0)}
                            <span className="mt-0.5 block text-xs font-normal text-zinc-500">
                              {u.normaPiso}
                            </span>
                          </>
                        )}
                      </td>
                      <td className="px-4 py-2.5">
                        {activo === null ? (
                          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
                            depende
                          </span>
                        ) : activo ? (
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
                            sí
                          </span>
                        ) : (
                          <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-600">
                            no
                          </span>
                        )}
                        <span className="mt-1 block text-xs text-zinc-500">
                          {activo === null
                            ? "ese régimen no tiene un múltiplo fijo del haber mínimo: cargá tu haber en la calculadora"
                            : activo
                              ? "el nivel del 82% queda por encima del piso propio del beneficio"
                              : "el piso que el beneficio ya tiene supera al nivel del 82%"}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-zinc-500">{u.norma}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-zinc-500">
          Quedan afuera, por el segundo párrafo del artículo 125 bis, quienes accedieron a la PBU por{" "}
          {MORATORIAS_EXCLUIDAS.join(", ")} — todas con las modificaciones de los artículos 20 a 22
          de la Ley 27.260. Es una exclusión escrita en la ley, con nombre y número.{" "}
          {PAGA_ALGUNO
            ? "Y este mes al menos uno de los universos con piso conocido pasó a cobrar suplemento."
            : "Con los valores de este mes, ninguno de los universos con piso conocido cobra suplemento: en todos, el beneficio que ya se percibe supera al nivel del 82%."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 24.241, art. 125 bis — la garantía
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{GARANTIA_82_TEXTOS.art125bis}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Las tres palabras que cambian todo son <strong>«hasta alcanzar»</strong>: lo que se
              garantiza es un nivel, y lo que se paga es la diferencia contra lo que ya se cobra.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-300 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 24.241, art. 125 bis, 2º párrafo — la exclusión de las moratorias
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{GARANTIA_82_TEXTOS.art125bisExclusion}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Res. SSS 25-E/2017, art. 2º — el universo que la ley no enumera
            </p>
            <p className="mt-1 text-sm text-zinc-700">
              «{GARANTIA_82_TEXTOS.reglamentacionArt2}…»
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-sky-300 bg-sky-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Res. SSS 25-E/2017, art. 2º inc. h) — la pensión honorífica de Veteranos de Guerra
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{GARANTIA_82_TEXTOS.reglamentacionIncisoH}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-sky-300 bg-sky-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Res. SSS 25-E/2017, art. 2º inc. i) — ex soldados combatientes
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{GARANTIA_82_TEXTOS.reglamentacionIncisoI}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-amber-300 bg-amber-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Res. SSS 25-E/2017, art. 3º — quién liquida
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{GARANTIA_82_TEXTOS.reglamentacionArt3}»</p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-zinc-900">{f.q}</h3>
              <p className="mt-1 text-zinc-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3 text-sm text-zinc-600">
        <h2 className="text-xl font-bold text-zinc-900">Fuentes</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          {GARANTIA_82_FUENTES.lista.map((f) => (
            <li key={f.url}>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                {f.nombre}
              </a>{" "}
              — {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página es informativa y aplica normas publicadas en el Boletín Oficial e InfoLEG;
          quien liquida es ANSES. Para ver cuánto cobrás este mes con tu haber real y el bono, usá la{" "}
          <Link href="/jubilacion" className="text-emerald-700 hover:underline">
            calculadora de jubilación
          </Link>
          ; el valor del que sale el 82% está en la{" "}
          <Link href="/salario-minimo" className="text-emerald-700 hover:underline">
            página del salario mínimo
          </Link>
          . Si no llegás a los {ANIOS_SERVICIOS} años de aportes, mirá la{" "}
          <Link href="/puam" className="text-emerald-700 hover:underline">
            PUAM
          </Link>{" "}
          y la{" "}
          <Link href="/edad-avanzada" className="text-emerald-700 hover:underline">
            prestación por edad avanzada
          </Link>
          . Consultada el {GARANTIA_82_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
