import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraDescuentos } from "@/components/CalculadoraDescuentos";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  CONCEPTOS_PERMITIDOS,
  DESCUENTOS_FUENTES,
  DESCUENTOS_TEXTOS,
  VIGENCIA_REFORMA,
} from "@/data/descuentos-sueldo";

export const metadata: Metadata = {
  title: "Descuentos del sueldo: el tope del 20% y el embargo",
  description: "El art. 133 de la LCT limita los descuentos al 20% del sueldo, con excepciones como Ganancias y un techo nuevo del 2% para la cuota solidaria.",
  alternates: { canonical: "/descuentos-del-sueldo" },
  openGraph: {
    title: "Descuentos del sueldo: el 20%, el nuevo 2% y el embargo",
    description:
      "Los tres números oficiales que deciden cuánto te pueden sacar del recibo, con el texto vigente de la LCT, el art. 9º de la Ley 14.250 reescrito en 2026 y el Decreto 484/87.",
    url: "https://calcular.ar/descuentos-del-sueldo",
    images: [
      {
        url: "/og?t=Descuentos%20del%20sueldo&s=El%20tope%20del%2020%25%2C%20el%20nuevo%202%25%20y%20el%20embargo",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuánto me pueden descontar del sueldo como máximo?",
    a: "El 20% de lo que cobrás en dinero en el mes (artículo 133 de la Ley de Contrato de Trabajo). Ese número no cambió desde 1974 y la reforma de 2026 no lo tocó. Pero el 20% no es toda la respuesta. Hay una excepción oficial que lo deja sin efecto (la retención de Ganancias). Y hay un tope nuevo, más chico, desde el 6 de marzo de 2026, para los aportes de convenio a favor del sindicato.",
  },
  {
    q: "Me descontaron más del 20%. ¿Es ilegal?",
    a: "No siempre. El artículo 1º de la Resolución 436/2004 del Ministerio de Trabajo dice que el límite del artículo 133 «podrá ser excedido al sólo efecto de hacer posible la retención» de Ganancias de 4ª categoría, «sin otro límite que el que la legislación en vigencia al momento de practicarse la retención establezca como tasa máxima aplicable». O sea: para Ganancias, el 20% no rige y no hay otro techo. Esa resolución derogó la anterior (Res. 930/1993), que sí ponía un máximo del 30%. Para todo lo que no sea Ganancias, el 20% sigue siendo el límite.",
  },
  {
    q: "¿La cuota solidaria del sindicato tiene tope?",
    a: `Desde el ${VIGENCIA_REFORMA}, sí: 2% del sueldo. Antes no tenía ninguno. El artículo 9º de la Ley 14.250 (texto ordenado en 2004) solo decía que los aportes de convenio valían «no sólo para los afiliados, sino también para los no afiliados comprendidos en el ámbito de la convención», sin poner un porcentaje. El artículo 133 de la Ley 27.802 lo reemplazó y escribió el número: los aportes de convenio a favor de los sindicatos «no podrán superar el dos por ciento (2%) de las remuneraciones». El mismo artículo puso 0,5% para los aportes a favor de cámaras empresarias.`,
  },
  {
    q: "¿La cuota sindical de afiliado entra en ese 2%?",
    a: "No. El mismo artículo lo dice al final: «Quedan excluidas las cuotas de afiliación sindical y las cláusulas que acuerden otros beneficios especiales en función de la afiliación a la asociación profesional de trabajadores que suscribió el convenio colectivo». El tope del 2% es para los aportes de convenio que se cobran también a quien no está afiliado (la llamada cuota solidaria). No para la cuota que paga el afiliado por serlo.",
  },
  {
    q: "¿Los aportes jubilatorios y de obra social cuentan dentro del 20%?",
    a: "La ley no los deja afuera, y eso casi nadie lo dice. El artículo 133 arranca con una sola excepción («salvo lo dispuesto en el artículo 130», que es el adelanto de sueldo) y después limita al 20% «la deducción, retención o compensación» en total. Los aportes de ley son el inciso b) del artículo 132, o sea uno de los conceptos que entran. Hay una pista fuerte de que el Ministerio lo lee así. El considerando de la Resolución 436/2004 dice que lo que se retiene por Ganancias «con más las otras retenciones legalmente permitidas» supera el límite de la ley. Si los descuentos de ley no contaran, esa resolución no habría hecho falta. En la práctica: con el 17% de aportes, el margen que queda para otros descuentos es de apenas unos puntos.",
  },
  {
    q: "¿Cuánto me pueden embargar del sueldo?",
    a: "El Decreto 484/87 lo arma en escalones según el salario mínimo vital. Hasta un salario mínimo, no se puede embargar nada. Entre uno y dos salarios mínimos, hasta el 10% de lo que pase del primero. Y por encima de dos salarios mínimos, hasta el 20%. Como el decreto no tiene montos propios, la cuenta se actualiza sola cada vez que cambia el salario mínimo. Dos aclaraciones que casi siempre faltan: se calcula sobre el bruto (artículo 2º) y la cuota alimentaria queda fuera de todos estos límites (artículo 4º).",
  },
  {
    q: "El embargo, ¿se calcula sobre el sueldo bruto o sobre el neto?",
    a: "Sobre el bruto. El artículo 2º del Decreto 484/87 lo dice claro: «A los efectos de la determinación de los importes sujetos a embargos sólo se tendrán en cuenta las remuneraciones en dinero por su importe bruto, con independencia de lo dispuesto en el artículo 133 del Régimen de Contrato de Trabajo». O sea, la base del embargo se toma antes de los descuentos, y es una cuenta aparte del tope del 20%. Son dos límites distintos: uno para lo que descuenta el empleador y otro para lo que retiene un juez.",
  },
  {
    q: "¿Y si el embargo es por cuota alimentaria?",
    a: "Ahí no rigen los porcentajes. El artículo 4º del Decreto 484/87 dice que los límites de embargo «no serán de aplicación en el caso de cuotas por alimentos o litis expensas, las que deberán ser fijadas de modo que permitan la subsistencia del alimentante». El artículo 120 de la LCT lo confirma: el salario mínimo vital no se puede embargar «salvo por deudas alimentarias». No hay un porcentaje legal: lo fija el juez, con ese único piso.",
  },
  {
    q: "¿Qué otra cosa cambió en el artículo 133 con la reforma?",
    a: "Desapareció una oración. El texto anterior dejaba que el Ministerio fijara un porcentaje distinto «cuando la situación particular lo requiera y, en todo caso, con intervención de la asociación profesional de trabajadores representativa de la actividad». El texto vigente mantiene esa facultad pero borra la última parte. Ahora el sindicato de la actividad ya no tiene que intervenir cuando el Ministerio decide mover el tope.",
  },
  {
    q: "¿Me pueden descontar por roturas, faltantes de caja o multas?",
    a: "No. El artículo 131 lo prohíbe con todas las letras: «No podrá deducirse, retenerse o compensarse suma alguna que rebaje el monto de las remuneraciones». Y agrega que «no se podrá imponer multas al trabajador ni deducirse, retenerse o compensarse por vía de ellas el monto de las remuneraciones». Solo se pueden descontar los nueve conceptos del artículo 132. Varios además necesitan que vos lo aceptes por escrito y, en algunos casos, el visto bueno previo del organismo que corresponda.",
  },
];

export default function DescuentosDelSueldoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de descuentos y embargo del sueldo",
        url: "https://calcular.ar/descuentos-del-sueldo",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Cuánto te pueden descontar del sueldo: el tope del 20% y sus excepciones",
        descripcion:
          "El art. 133 de la LCT, el tope del 2% que la Ley 27.802 le puso a la cuota solidaria el 6/3/2026, la excepción de Ganancias de la Res. MTEySS 436/2004 y los límites de embargo del Decreto 484/87, derivados del salario mínimo.",
        url: "/descuentos-del-sueldo",
        modificado: DESCUENTOS_FUENTES.consultadoEl,
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
          ¿Cuánto te pueden descontar del sueldo?
        </h1>
        <p className="text-zinc-600">
          La respuesta corta (el 20% del artículo 133 de la LCT) es correcta y no cambió desde 1974.
          Por eso el tema parece cerrado. Pero al lado de ese 20% hay tres números oficiales que casi
          nadie publica: un tope del <strong>2%</strong> para la cuota solidaria que{" "}
          <strong>no existía</strong> antes del {VIGENCIA_REFORMA}, una resolución que permite pasar
          el 20% <strong>sin techo</strong> cuando el motivo es Ganancias, y una escala de embargo
          que se calcula sobre el <strong>bruto</strong>, no sobre lo que cobrás.
        </p>
      </header>

      <RespuestaPrimero actualizado={DESCUENTOS_FUENTES.consultadoEl}>
        <p>
          <strong>El empleador no puede descontarte más del 20% de la remuneración del mes</strong>{" "}
          (art. 133 LCT), salvo por retención de Ganancias, que la Res. MTEySS 436/2004 autoriza a
          exceder <strong>sin otro límite</strong> que la tasa máxima del impuesto. Desde el{" "}
          {VIGENCIA_REFORMA}, los aportes de convenio a favor del sindicato que también se cobran a
          los no afiliados <strong>no pueden superar el 2%</strong> (antes no tenían tope). Los que
          van a cámaras empresarias, el 0,5% (art. 9º de la Ley 14.250, texto del art. 133 de la Ley
          27.802). El <strong>embargo judicial</strong> es una cuenta aparte. Hasta un salario mínimo
          no se puede embargar nada. Sobre lo que pase se retiene 10% (hasta dos salarios mínimos) o
          20% (por encima), siempre sobre el <strong>bruto</strong>. La cuota alimentaria no tiene
          ninguno de estos límites.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Tus topes, en pesos</h2>
        <p className="text-sm text-zinc-600">
          Cargá tu sueldo bruto del mes. El tope del 20% y el del 2% salen del sueldo. El embargo
          depende además del{" "}
          <Link href="/salario-minimo" className="text-emerald-700 hover:underline">
            salario mínimo
          </Link>{" "}
          del mes que elijas.
        </p>
        <CalculadoraDescuentos />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El cambio de 2026 que casi nadie publicó: la cuota solidaria tiene techo
        </h2>
        <p className="text-sm text-zinc-600">
          Es el mismo artículo, antes y después. La diferencia no es de redacción: antes no había
          ningún porcentaje escrito.
        </p>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 14.250, art. 9º: texto vigente desde el {VIGENCIA_REFORMA} (art. 133 de la Ley
              27.802)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{DESCUENTOS_TEXTOS.ley14250Art9Vigente}»
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              El texto ANTERIOR (t.o. 2004 por Decreto 1135/2004), sin ningún tope
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{DESCUENTOS_TEXTOS.ley14250Art9Anterior}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Rigió hasta el 5 de marzo de 2026. Si en tu recibo aparece un aporte de convenio a
              favor del sindicato que se cobra por estar comprendido en el CCT y no por estar
              afiliado, desde el {VIGENCIA_REFORMA} ese concepto tiene un techo del 2%. La cuota de
              afiliación queda fuera del tope: la excluye el propio artículo.
            </p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 133: texto vigente desde el {VIGENCIA_REFORMA}
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{DESCUENTOS_TEXTOS.art133Vigente}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">{DESCUENTOS_TEXTOS.notaVigencia133}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              El texto anterior (art. 147 de la Ley 20.744, renumerado como 133 por el t.o. 1976)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{DESCUENTOS_TEXTOS.art133Anterior}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Comparados palabra por palabra: el 20% no se movió. Se sumó el tope del 2% para lo que
              va a los sindicatos que firmaron el convenio. Y ya no hace falta que el Ministerio
              actúe «con intervención de la asociación profesional de trabajadores representativa de
              la actividad» para fijar un porcentaje distinto.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Resolución MTEySS 436/2004, art. 1º: la excepción que deja el 20% sin efecto
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{DESCUENTOS_TEXTOS.res436Articulo1}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Y su considerando, que es el que explica por qué hizo falta dictarla: «
              {DESCUENTOS_TEXTOS.res436Considerando}»
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 131: la regla es que NO se puede descontar
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{DESCUENTOS_TEXTOS.art131}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Decreto 484/87: los límites del embargo
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{DESCUENTOS_TEXTOS.dec484Art1}»</p>
            <p className="mt-2 text-sm italic text-zinc-700">«{DESCUENTOS_TEXTOS.dec484Art2}»</p>
            <p className="mt-2 text-sm italic text-zinc-700">«{DESCUENTOS_TEXTOS.dec484Art4}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Y sobre la liquidación final, el art. 3º cambia la base: «
              {DESCUENTOS_TEXTOS.dec484Art3}»
            </p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los nueve descuentos permitidos</h2>
        <p className="text-sm text-zinc-600">
          El art. 131 prohíbe descontar. El art. 132 abre nueve excepciones, y solo esas. Todo lo
          demás (roturas, faltantes de caja, multas) queda afuera.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="pb-2 font-semibold">Inciso</th>
                <th className="pb-2 font-semibold">Concepto</th>
                <th className="pb-2 font-semibold">La letra chica</th>
              </tr>
            </thead>
            <tbody>
              {CONCEPTOS_PERMITIDOS.map((c) => (
                <tr key={c.inciso} className="border-b border-zinc-200 align-top">
                  <td className="py-3 pr-3 font-mono text-xs text-zinc-500">{c.inciso}</td>
                  <td className="py-3 pr-3 font-medium text-zinc-800">{c.concepto}</td>
                  <td className="py-3 text-zinc-600">{c.nota}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-600">
          El inciso c) tiene además un requisito que no viene de 2026 sino del DNU 70/2023: «
          {DESCUENTOS_TEXTOS.art132IncC}». La palabra que importa es <em>explícito</em>.
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
          Para ver cuánto queda de bolsillo con Ganancias incluido, está{" "}
          <Link href="/sueldo-neto" className="font-medium text-emerald-700 hover:underline">
            la calculadora de sueldo neto
          </Link>
          . Cuánto te retienen de Ganancias mes a mes lo ves en{" "}
          <Link href="/ganancias" className="font-medium text-emerald-700 hover:underline">
            la calculadora de Ganancias
          </Link>
          . Si el embargo es por alimentos, el monto se estima en{" "}
          <Link href="/cuota-alimentaria" className="font-medium text-emerald-700 hover:underline">
            la calculadora de cuota alimentaria
          </Link>
          . Otras páginas de la misma reforma:{" "}
          <Link href="/horas-extras" className="font-medium text-emerald-700 hover:underline">
            horas extras y banco de horas
          </Link>{" "}
          y{" "}
          <Link href="/periodo-de-prueba" className="font-medium text-emerald-700 hover:underline">
            el despido en período de prueba
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {DESCUENTOS_FUENTES.lista.map((f) => (
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
          Esta página usa los textos oficiales publicados en InfoLEG, no un resumen de prensa: el
          actualizado de la Ley de Contrato de Trabajo, el original de la Ley 20.744, la Ley 27.802,
          el texto ordenado de la Ley 14.250, el Decreto 484/87 y la Resolución MTEySS 436/2004. Es
          informativa y orientativa: no reemplaza el asesoramiento de un profesional ni una
          liquidación. Consultada el {DESCUENTOS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
