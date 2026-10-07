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
  title: "Despido antes del fin del plazo fijo: indemnización",
  description: `El art. ${ARTICULO_REFORMADO} de la LCT cambió en marzo de 2026: ahora rige la antigüedad ficta hasta el fin del plazo pactado. Calculá tu indemnización.`,
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
    a: `Desde el ${VIGENCIA_REFORMA}, las indemnizaciones comunes por despido (antigüedad del art. 245, preaviso e integración del mes), pero calculadas "considerando, a ese solo efecto, la antigüedad que habría acumulado hasta la fecha de finalización del plazo originariamente pactado". O sea: no se cuenta el tiempo que trabajaste, se cuenta el que ibas a trabajar. A eso se suma la liquidación final (aguinaldo proporcional y vacaciones no gozadas), que sí va sobre el tiempo real.`,
  },
  {
    q: "¿Sigo pudiendo reclamar daños y perjuicios por la ruptura anticipada?",
    a: `Por el art. ${ARTICULO_REFORMADO} de la LCT, no: ese punto ya no está en el artículo. El texto anterior decía que el despido anticipado daba derecho a las indemnizaciones por extinción "además de (…) la de daños y perjuicios provenientes del derecho común, la que se fijará (…) o los que, a falta de demostración, fije el juez o tribunal prudencialmente, por la sola ruptura anticipada del contrato". Esa oración ya no está. El art. ${ARTICULO_SUSTITUYENTE} de la Ley 27.802 la reemplazó por la antigüedad ficta. Casi todas las notas que vas a encontrar describen el sistema viejo: se escribieron antes de marzo de 2026 y nunca se actualizaron.`,
  },
  {
    q: "¿La reforma me conviene o me perjudica?",
    a: "Depende de cuándo te cortaron el contrato, y conviene decirlo sin vueltas. Si faltaba poco para el final, la antigüedad ficta puede sumarte un año más de art. 245 y la diferencia con el sistema viejo es chica. Si te lo cortaron temprano (el caso más común), el sistema viejo te dejaba reclamar por todo lo que faltaba y el nuevo no. El art. 245 con la antigüedad ficta llega como mucho a cinco sueldos, porque el art. 93 no deja firmar contratos de más de cinco años. La calculadora te muestra los dos números: lo que suma la ficta y lo que ya no se puede reclamar.",
  },
  {
    q: "Trabajé menos de seis meses. ¿No estoy en período de prueba?",
    a: `No. Según su primera oración, el período de prueba del art. 92 bis es solo para el "contrato de trabajo por tiempo indeterminado". Un contrato a plazo fijo no tiene período de prueba: si te lo cortan en el mes dos, te corresponde indemnización igual. Es una de las diferencias más importantes entre los dos tipos de contrato y una de las que peor se explican.`,
  },
  {
    q: "¿Cuánto puede durar un contrato a plazo fijo?",
    a: `Hasta ${ANIOS_MAXIMO_PLAZO} años. El art. 93 de la LCT dice que "no podrá celebrarse por más de cinco (5) años". Ese límite es el techo de la antigüedad ficta del art. ${ARTICULO_REFORMADO}: por más largo que fuera el plazo que faltaba, la indemnización del art. 245 por esta vía no puede pasar de cinco sueldos.`,
  },
  {
    q: "¿Y si el contrato llegó a su fin normalmente?",
    a: `Ahí se aplica el segundo párrafo del art. ${ARTICULO_REFORMADO}, que la reforma dejó igual. Si el contrato se cumplió entero y hubo preaviso, cobrás la indemnización del art. 250, que manda al art. 247 (la mitad del art. 245). Pero el art. 250 pone una condición por escrito: que el contrato haya durado un año o más. Un plazo fijo de seis meses que vence con preaviso no da indemnización.`,
  },
  {
    q: "¿Qué pasa si el empleador no preavisa el vencimiento?",
    a: "Cambia el tipo de contrato. El art. 94 obliga a avisar el vencimiento entre uno y dos meses antes (salvo que el contrato dure menos de un mes). Y agrega que quien no avise \"se entenderá que acepta la conversión del mismo como de plazo indeterminado\", salvo que se renueve por escrito. O sea: el contrato deja de ser a plazo fijo y pasa a seguir las reglas comunes.",
  },
  {
    q: "¿Esto también alcanza a los trabajadores de temporada?",
    a: `Sí, aunque la reforma no los nombró. El art. 97 de la LCT dice que el despido sin causa del trabajador de temporada, con el ciclo sin terminar, "dará lugar al pago de los resarcimientos establecidos en el artículo 95, primer párrafo". Como ese primer párrafo es el que cambió, lo que cobra un trabajador de temporada cambió con él, sin que la Ley 27.802 le dedique una sola línea.`,
  },
  {
    q: "Me despidieron antes de marzo de 2026. ¿Qué texto se aplica?",
    a: `El anterior. La nota del artículo dice que rige "a partir de su publicación en el Boletín Oficial", que fue el ${VIGENCIA_REFORMA}. Si te cortaron el contrato antes de esa fecha, el art. ${ARTICULO_REFORMADO} todavía incluía los daños y perjuicios del derecho común. Esta página publica los dos textos completos para que veas cuál te toca.`,
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
          Despido antes de que termine el contrato a plazo fijo: cuánto se cobra hoy
        </h1>
        <p className="text-zinc-600">
          Firmaste un contrato a plazo fijo y te lo cortaron antes de tiempo. Hasta marzo de 2026 la
          ley te daba, además de las indemnizaciones comunes, un reclamo de daños y perjuicios que
          fijaba el juez. <strong>Ese reclamo ya no está en el artículo</strong>. En su lugar entró
          una antigüedad ficta: la que habrías juntado si el contrato llegaba al final.
        </p>
      </header>

      <RespuestaPrimero actualizado={PLAZO_FIJO_FUENTES.consultadoEl}>
        <p>
          <strong>
            El art. {ARTICULO_REFORMADO} de la LCT cambió de sistema el {VIGENCIA_REFORMA}
          </strong>
          , por el art. {ARTICULO_SUSTITUYENTE} de la Ley 27.802 y desde ese mismo día. Hoy, si te
          despiden antes de tiempo y sin causa, tenés derecho a «las indemnizaciones que correspondan por la
          extinción del contrato considerando,{" "}
          <strong>
            a ese solo efecto, la antigüedad que habría acumulado hasta la fecha de finalización del
            plazo originariamente pactado
          </strong>
          ». Lo que desapareció es lo que más plata daba en los contratos cortados temprano: la
          indemnización «de daños y perjuicios provenientes del derecho común (…) por la sola ruptura
          anticipada del contrato». Y con ella se fue el tercer párrafo, el que hacía que esos daños
          cubrieran el preaviso que no se dio. La calculadora liquida con el texto vigente y te
          muestra, al lado, lo que ya no se puede reclamar.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tu caso</h2>
        <p className="text-sm text-zinc-600">
          Cargá las tres fechas y tu mejor sueldo. La calculadora hace la misma cuenta del art. 245
          que{" "}
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
              LCT, art. {ARTICULO_REFORMADO}: texto vigente desde el {VIGENCIA_REFORMA}
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
              LCT, art. {ARTICULO_REFORMADO}: texto anterior (hasta el {VIGENCIA_REFORMA})
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{PLAZO_FIJO_TEXTOS.art95Anterior}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Lo sacamos de la captura oficial del 15 de diciembre de 2025 de esa misma página de
              InfoLEG, anterior a la reforma, porque el texto actualizado ya no lo trae. Es el que
              siguen citando casi todas las notas sobre el tema.
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
            Era la regla que unía los dos: si lo que faltaba del contrato era igual o mayor al
            preaviso, la indemnización por daños lo cubría. Sin daños no queda nada que cubra el
            preaviso que no se dio, así que hoy se paga por separado.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los artículos que rodean al 95</h2>
        <p className="text-sm text-zinc-600">
          El art. {ARTICULO_REFORMADO} no se lee solo. Estos cuatro deciden en qué caso estás, y la
          reforma no tocó ninguno.
        </p>
        <div className="space-y-3">
          {[
            {
              art: "Art. 93: duración",
              texto: PLAZO_FIJO_TEXTOS.art93,
              porQue: `Es el techo de la antigüedad ficta: si el contrato no puede pactarse por más de ${ANIOS_MAXIMO_PLAZO} años, el art. 245 no puede superar los ${ANIOS_MAXIMO_PLAZO} sueldos por esta vía.`,
            },
            {
              art: "Art. 94: deber de avisar y cambio de contrato",
              texto: PLAZO_FIJO_TEXTOS.art94,
              porQue:
                "El preaviso del plazo fijo no es el del despido: es el aviso de que se termina, de uno a dos meses antes. Y si no se da, no genera una indemnización: convierte al contrato en uno por tiempo indeterminado.",
            },
            {
              art: "Art. 97: trabajadores de temporada",
              texto: PLAZO_FIJO_TEXTOS.art97,
              porQue:
                "La reforma no nombró al contrato de temporada, pero este artículo manda al primer párrafo del 95. Al cambiar ese párrafo, cambió también lo que cobra un trabajador de temporada despedido con el ciclo sin terminar.",
            },
            {
              art: "Art. 250: vencimiento con preaviso (manda al art. 247)",
              texto: PLAZO_FIJO_TEXTOS.art250,
              porQue:
                "Es el otro final del contrato, el normal: media indemnización del art. 245, y solo si el contrato duró un año o más.",
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
          <em>«{PLAZO_FIJO_TEXTOS.art92bisPrimeraOracion}»</em>. Fijate: por tiempo{" "}
          <strong>indeterminado</strong>. El contrato a plazo fijo está en otro capítulo, el de los
          arts. 90 a 95, y no tiene período de prueba. Si te cortan un plazo fijo en el mes dos,
          cobrás indemnización. Si te cortan un contrato común en el mes dos, no. Esta calculadora
          liquida así.
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
              </a>
              : {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página cita el texto oficial de la Ley de Contrato de Trabajo publicado en InfoLEG y
          el texto anterior del art. {ARTICULO_REFORMADO}, sacado de una captura de esa misma página
          de antes de la reforma. No es un resumen de prensa. Es informativa y orientativa: no
          reemplaza el asesoramiento de un profesional ni una liquidación. Consultada el{" "}
          {PLAZO_FIJO_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
