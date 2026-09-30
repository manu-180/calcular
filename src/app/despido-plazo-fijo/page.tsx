import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraDespidoPlazoFijo } from "@/components/CalculadoraDespidoPlazoFijo";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ANIOS_MAXIMO_PLAZO,
  ARTICULO_REFORMADO,
  ARTICULO_SUSTITUYENTE,
  PLAZO_FIJO_FUENTES,
  PLAZO_FIJO_TEXTOS,
  VIGENCIA_REFORMA,
} from "@/data/despido-plazo-fijo";

export const metadata: Metadata = {
  title: "Despido antes del vencimiento del plazo: cuánto se cobra hoy (art. 95 LCT)",
  description: `El art. ${ARTICULO_REFORMADO} de la LCT cambió el ${VIGENCIA_REFORMA}: se fueron los daños y perjuicios del derecho común y entró la antigüedad ficta hasta el fin del plazo pactado. Calculá la indemnización con el texto vigente.`,
  alternates: { canonical: "/despido-plazo-fijo" },
  openGraph: {
    title: "Contrato a plazo fijo roto antes de tiempo: el art. 95 ya no paga daños",
    description: `La Ley 27.802 sustituyó el art. ${ARTICULO_REFORMADO} de la LCT: la indemnización se calcula con la antigüedad que habrías acumulado hasta el vencimiento, y el reclamo de daños y perjuicios desapareció del artículo.`,
    url: "https://calcular.ar/despido-plazo-fijo",
    images: [
      {
        url: "/og?t=Despido%20antes%20del%20plazo&s=Art.%2095%20LCT%3A%20se%20fueron%20los%20da%C3%B1os%2C%20entr%C3%B3%20la%20antig%C3%BCedad%20ficta",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuánto me tienen que pagar si me despiden antes de que termine el contrato a plazo fijo?",
    a: `Desde el ${VIGENCIA_REFORMA}, las indemnizaciones que corresponden por la extinción del contrato —indemnización por antigüedad del art. 245, preaviso e integración del mes— pero calculadas "considerando, a ese solo efecto, la antigüedad que habría acumulado hasta la fecha de finalización del plazo originariamente pactado". O sea: no se cuenta el tiempo que trabajaste, se cuenta el que ibas a trabajar. A eso se suma la liquidación final (SAC proporcional y vacaciones no gozadas), que sí va sobre el tiempo real.`,
  },
  {
    q: "¿Sigo pudiendo reclamar daños y perjuicios por la ruptura anticipada?",
    a: `Por el art. ${ARTICULO_REFORMADO} de la LCT, no: ese rubro se fue del artículo. El texto anterior decía que el despido anticipado daba derecho a las indemnizaciones por extinción "además de (…) la de daños y perjuicios provenientes del derecho común, la que se fijará (…) o los que, a falta de demostración, fije el juez o tribunal prudencialmente, por la sola ruptura anticipada del contrato". Esa oración ya no está. El art. ${ARTICULO_SUSTITUYENTE} de la Ley 27.802 la reemplazó por la antigüedad ficta. Casi todas las notas que vas a encontrar sobre el tema describen el sistema viejo: fueron escritas antes de marzo de 2026 y nunca se actualizaron.`,
  },
  {
    q: "¿La reforma me conviene o me perjudica?",
    a: "Depende de cuándo te rompieron el contrato, y conviene decirlo sin vueltas. Si faltaba poco para el vencimiento, la antigüedad ficta puede sumarte un año computable más de art. 245 y la diferencia con el sistema viejo es chica. Si te rompieron el contrato temprano —el caso más común—, el sistema viejo abría un reclamo por todo lo que faltaba y el nuevo no: el art. 245 sobre la antigüedad ficta tiene techo en cinco sueldos, porque el art. 93 no deja pactar más de cinco años. La calculadora te muestra los dos números: lo que suma la ficta y el tamaño de la ventana que se cerró.",
  },
  {
    q: "Trabajé menos de seis meses. ¿No estoy en período de prueba?",
    a: `No. El período de prueba del art. 92 bis está reservado, por su propia primera oración, al "contrato de trabajo por tiempo indeterminado". Un contrato a plazo fijo no tiene período de prueba: si te lo rompen en el mes dos, te corresponde indemnización igual. Es una de las diferencias más importantes entre las dos modalidades y una de las que peor se contestan.`,
  },
  {
    q: "¿Cuánto puede durar un contrato a plazo fijo?",
    a: `Hasta ${ANIOS_MAXIMO_PLAZO} años. El art. 93 de la LCT dice que "no podrá celebrarse por más de cinco (5) años". Ese tope es el que le pone techo a la antigüedad ficta del art. ${ARTICULO_REFORMADO}: por más largo que fuera el plazo que faltaba, la indemnización del art. 245 por esta vía no puede superar los cinco sueldos.`,
  },
  {
    q: "¿Y si el contrato llegó a su fin normalmente?",
    a: `Ahí juega el segundo párrafo del art. ${ARTICULO_REFORMADO}, que la reforma dejó igual: si la extinción se produce con preaviso y el contrato está íntegramente cumplido, el trabajador cobra la indemnización del art. 250, que remite al art. 247 —la mitad del art. 245—. Pero con una condición que el art. 250 escribe expresamente: que el contrato haya durado un año o más. Un plazo fijo de seis meses que vence con preaviso no genera indemnización por la extinción.`,
  },
  {
    q: "¿Qué pasa si el empleador no preavisa el vencimiento?",
    a: "Cambia la naturaleza del contrato. El art. 94 obliga a preavisar la expiración con una antelación no menor a un mes ni mayor a dos —salvo que el contrato dure menos de un mes— y agrega que quien lo omita \"se entenderá que acepta la conversión del mismo como de plazo indeterminado\", salvo acto expreso de renovación. O sea: el contrato deja de ser a plazo fijo y pasa a regirse por las reglas comunes.",
  },
  {
    q: "¿Esto también alcanza a los trabajadores de temporada?",
    a: `Sí, aunque la reforma no los nombró. El art. 97 de la LCT dice que el despido sin causa del trabajador de temporada, pendientes los plazos del ciclo, "dará lugar al pago de los resarcimientos establecidos en el artículo 95, primer párrafo". Como ese primer párrafo es el que cambió, el régimen de los trabajadores de temporada cambió con él, por remisión y sin una sola línea propia en la Ley 27.802.`,
  },
  {
    q: "Me despidieron antes de marzo de 2026. ¿Qué texto se aplica?",
    a: `El anterior. La nota del artículo fija la vigencia "a partir de su publicación en el Boletín Oficial", que fue el ${VIGENCIA_REFORMA}. Si la ruptura anticipada ocurrió antes de esa fecha, el art. ${ARTICULO_REFORMADO} todavía preveía los daños y perjuicios del derecho común. Esta página publica los dos textos completos para que puedas comparar cuál te toca.`,
  },
];

export default function DespidoPlazoFijoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de despido antes del vencimiento del plazo (art. 95 LCT)",
        url: "https://calcular.ar/despido-plazo-fijo",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo:
          "Despido antes del vencimiento del plazo: el art. 95 de la LCT después de la Ley 27.802",
        descripcion:
          "El art. 28 de la Ley 27.802 sustituyó el art. 95 de la LCT el 6/3/2026. Se fue el reclamo de daños y perjuicios del derecho común por la ruptura anticipada y entró una antigüedad ficta: la que el trabajador habría acumulado hasta el fin del plazo originariamente pactado.",
        url: "/despido-plazo-fijo",
        modificado: PLAZO_FIJO_FUENTES.consultadoEl,
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
          Despido antes del vencimiento del plazo: cuánto se cobra hoy
        </h1>
        <p className="text-zinc-600">
          Firmaste un contrato a plazo fijo y te lo rompieron antes de tiempo. Hasta marzo de 2026 la
          ley te daba, además de las indemnizaciones comunes, un reclamo de daños y perjuicios que
          fijaba el juez. <strong>Ese reclamo ya no está en el artículo</strong>: en su lugar entró
          una antigüedad ficta, la que habrías acumulado si el contrato hubiera llegado a su fin.
        </p>
      </header>

      <RespuestaPrimero actualizado={PLAZO_FIJO_FUENTES.consultadoEl}>
        <p>
          <strong>
            El art. {ARTICULO_REFORMADO} de la LCT cambió de sistema el {VIGENCIA_REFORMA}
          </strong>
          , por el art. {ARTICULO_SUSTITUYENTE} de la Ley 27.802 y sin fecha diferida. Hoy el
          despido anticipado injustificado da derecho a «las indemnizaciones que correspondan por la
          extinción del contrato considerando,{" "}
          <strong>
            a ese solo efecto, la antigüedad que habría acumulado hasta la fecha de finalización del
            plazo originariamente pactado
          </strong>
          ». Lo que desapareció es el rubro que decidía la plata en los contratos rotos temprano: la
          indemnización «de daños y perjuicios provenientes del derecho común (…) por la sola ruptura
          anticipada del contrato». Y con él se fue el tercer párrafo, el que hacía que esos daños
          absorbieran al preaviso omitido. La calculadora liquida con el texto vigente y te muestra,
          al lado, el tamaño de la ventana que se cerró.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tu caso</h2>
        <p className="text-sm text-zinc-600">
          Cargá las tres fechas y tu mejor remuneración. La calculadora usa el mismo motor del art.
          245 que{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            la calculadora de despido sin causa
          </Link>
          : lo único que cambia es la antigüedad con la que se multiplica.
        </p>
        <CalculadoraDespidoPlazoFijo />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. {ARTICULO_REFORMADO} — texto vigente desde el {VIGENCIA_REFORMA}
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{PLAZO_FIJO_TEXTOS.art95Vigente}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Al pie, el texto actualizado de InfoLEG trae la nota: {PLAZO_FIJO_TEXTOS.art95Nota}
            </p>
          </blockquote>

          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. {ARTICULO_REFORMADO} — texto anterior (hasta el {VIGENCIA_REFORMA})
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{PLAZO_FIJO_TEXTOS.art95Anterior}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Recuperado de la captura oficial del 15 de diciembre de 2025 de esa misma página de
              InfoLEG, anterior a la reforma: el texto actualizado ya no lo trae. Es el texto que
              siguen citando casi todas las notas publicadas sobre el tema.
            </p>
          </blockquote>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-rose-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">
              La oración que salió
            </p>
            <p className="mt-2 text-sm italic text-zinc-700">
              «{PLAZO_FIJO_TEXTOS.oracionQueSalio}»
            </p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              La oración que entró
            </p>
            <p className="mt-2 text-sm italic text-zinc-700">
              «{PLAZO_FIJO_TEXTOS.oracionQueEntro}»
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            El tercer párrafo que se fue con los daños
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">
            «{PLAZO_FIJO_TEXTOS.parrafoDeAbsorcion}»
          </p>
          <p className="mt-2 text-xs text-zinc-600">
            Era la regla de absorción: si lo que faltaba del contrato era igual o mayor al preaviso,
            la indemnización por daño lo suplía. Sin daños no queda nada que absorba al preaviso
            omitido, así que hoy ese rubro se liquida por su propia cuenta.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los artículos que rodean al 95</h2>
        <p className="text-sm text-zinc-600">
          El art. {ARTICULO_REFORMADO} no se lee solo. Estos cuatro deciden el encuadre, y ninguno
          fue tocado por la reforma.
        </p>
        <div className="space-y-3">
          {[
            {
              art: "Art. 93 — Duración",
              texto: PLAZO_FIJO_TEXTOS.art93,
              porQue: `Es el techo de la antigüedad ficta: si el contrato no puede pactarse por más de ${ANIOS_MAXIMO_PLAZO} años, el art. 245 no puede superar los ${ANIOS_MAXIMO_PLAZO} sueldos por esta vía.`,
            },
            {
              art: "Art. 94 — Deber de preavisar y conversión del contrato",
              texto: PLAZO_FIJO_TEXTOS.art94,
              porQue:
                "El preaviso del plazo fijo no es el del despido: es el de la expiración, de uno a dos meses antes. Y omitirlo no genera una indemnización, convierte al contrato en uno de plazo indeterminado.",
            },
            {
              art: "Art. 97 — Trabajadores de temporada",
              texto: PLAZO_FIJO_TEXTOS.art97,
              porQue:
                "La reforma no nombró al contrato de temporada, pero este artículo remite al primer párrafo del 95. Al cambiar ese párrafo, cambió también lo que cobra un trabajador de temporada despedido con el ciclo pendiente.",
            },
            {
              art: "Art. 250 — Vencimiento con preaviso, remisión al art. 247",
              texto: PLAZO_FIJO_TEXTOS.art250,
              porQue:
                "Es el otro final del contrato, el normal: media indemnización del art. 245, y sólo si el contrato duró un año o más.",
            },
          ].map((a) => (
            <details
              key={a.art}
              className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-zinc-800">{a.art}</summary>
              <p className="mt-2 text-sm italic text-zinc-600">«{a.texto}»</p>
              <p className="mt-2 text-sm text-zinc-700">{a.porQue}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          En el plazo fijo no hay período de prueba
        </h2>
        <p className="text-sm text-zinc-600">
          Es el error más caro que circula sobre esta modalidad. El art. 92 bis empieza así:{" "}
          <em>«{PLAZO_FIJO_TEXTOS.art92bisPrimeraOracion}»</em> — por tiempo{" "}
          <strong>indeterminado</strong>. El contrato a plazo fijo vive en otro capítulo, el de las
          modalidades de los arts. 90 a 95, y no tiene período de prueba. Si te rompen un plazo fijo
          en el mes dos, cobrás indemnización; si te rompen un contrato común en el mes dos, no.
          Esta calculadora liquida en consecuencia.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-zinc-800">{f.q}</summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="text-sm text-zinc-500">
          Otros artículos de la LCT que la misma reforma cambió de raíz:{" "}
          <Link href="/reserva-del-empleo" className="font-medium text-emerald-700 hover:underline">
            la reserva del empleo
          </Link>
          ,{" "}
          <Link href="/libro-de-sueldos" className="font-medium text-emerald-700 hover:underline">
            la presunción del art. 55
          </Link>{" "}
          y{" "}
          <Link href="/propinas" className="font-medium text-emerald-700 hover:underline">
            las propinas del art. 113
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {PLAZO_FIJO_FUENTES.lista.map((f) => (
            <li key={f.nombre}>
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
          Esta página cita el texto oficial de la Ley de Contrato de Trabajo publicado en InfoLEG y
          el texto anterior del art. {ARTICULO_REFORMADO} recuperado de una captura de esa misma
          página previa a la reforma — no un resumen de prensa. Es informativa y orientativa: no
          reemplaza el asesoramiento de un profesional ni una liquidación. Consultada el{" "}
          {PLAZO_FIJO_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
