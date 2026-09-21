import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraIndemnizacion } from "@/components/CalculadoraIndemnizacion";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  INDEMNIZACION_FUENTES,
  LIG_ART26_EXENTO,
  LIG_ART26_NO_EXENTO,
} from "@/data/indemnizacion";

export const metadata: Metadata = {
  title: "Calculadora de Indemnización por Despido 2026: cuánto te corresponde",
  description:
    "Calculá gratis tu indemnización por despido sin causa: antigüedad (art. 245 LCT), preaviso, integración del mes, aguinaldo y vacaciones proporcionales. Actualizada con la reforma de la Ley 27.802 (2026).",
  alternates: { canonical: "/indemnizacion" },
};

const faqs = [
  {
    q: "¿Cuánto me corresponde si me despiden sin causa?",
    a: "La indemnización por antigüedad es un mes de sueldo por cada año trabajado o fracción mayor de 3 meses, tomando tu mejor remuneración mensual, normal y habitual del último año (art. 245 LCT). A eso se suman el preaviso (1 o 2 meses si no te lo dieron), la integración del mes de despido, y la liquidación final: aguinaldo y vacaciones proporcionales más los días trabajados del mes.",
  },
  {
    q: "¿Qué sueldo se usa de base para la indemnización?",
    a: "La mejor remuneración mensual, normal y habitual devengada en el último año. Desde la Ley 27.802 (2026) la definición es precisa: cuentan los conceptos cobrados al menos 6 meses en el último año; los variables (horas extra, comisiones, premios mensuales) entran por el promedio de los últimos 6 meses o del último año, lo que te sea más favorable. El aguinaldo y los premios que no se pagan todos los meses no se incluyen.",
  },
  {
    q: "¿La indemnización tiene tope?",
    a: "Sí: la base no puede superar 3 veces el sueldo promedio de tu convenio colectivo. Pero hay un piso, ahora escrito en la ley: aunque se aplique el tope, la base nunca puede ser menor al 67% de tu remuneración real (art. 245, texto Ley 27.802). Antes este piso era solo jurisprudencia (el fallo «Vizzoti»); desde 2026 es texto legal.",
  },
  {
    q: "Me despidieron en el período de prueba, ¿cobro algo?",
    a: "Durante el período de prueba (los primeros 6 meses, ampliables por convenio a 8 o 12 según el tamaño de la empresa) cualquiera de las partes puede extinguir el contrato sin indemnización y, desde la Ley 27.802, sin obligación de preaviso (arts. 92 bis y 231 LCT). Pero la liquidación final te corresponde igual: días trabajados, aguinaldo proporcional y vacaciones proporcionales.",
  },
  {
    q: "¿Qué es el preaviso y cuánto vale?",
    a: "Es el aviso anticipado del despido: 1 mes si tenés hasta 5 años de antigüedad y 2 meses si tenés más (art. 231 LCT). Si te lo dan, trabajás ese tiempo y lo cobrás como sueldo normal. Si no te lo dan, te lo tienen que pagar como indemnización sustitutiva (art. 232), y se calcula con su parte de aguinaldo.",
  },
  {
    q: "¿Qué es la integración del mes de despido?",
    a: "Si te despiden sin preaviso un día que no es el último del mes, te tienen que pagar los días que faltan hasta fin de mes (art. 233 LCT). Por ejemplo, si te despiden el 11, te integran los días restantes del mes. No corresponde cuando el despido ocurre durante el período de prueba.",
  },
  {
    q: "Si renuncio o me despiden con causa, ¿cobro indemnización?",
    a: "No corresponde la indemnización por antigüedad ni el preaviso, pero siempre te deben la liquidación final: los días trabajados del mes, el aguinaldo proporcional del semestre y las vacaciones proporcionales no gozadas (arts. 123 y 156 LCT). Ojo: si la «justa causa» que invocó el empleador no es real, podés discutirla judicialmente.",
  },
  {
    q: "¿Qué es el despido indirecto?",
    a: "Cuando el empleador comete incumplimientos graves (no pagar el sueldo, no registrarte, cambios abusivos de condiciones), podés intimarlo y, si no corrige, considerarte despedido. En ese caso te corresponden las mismas indemnizaciones que en un despido sin causa (art. 246 LCT). Antes de darte por despedido, asesorate con un abogado laboralista: las formas importan.",
  },
  {
    q: "¿Cuándo me tienen que pagar la liquidación?",
    a: "Dentro de los 4 días hábiles desde la extinción del contrato, el mismo plazo que rige para el pago del sueldo mensual (arts. 255 bis y 128 LCT).",
  },
  {
    q: "¿Siguen existiendo las multas por trabajo en negro o la doble indemnización?",
    a: "No. La Ley 27.742 (julio de 2024) derogó las multas por empleo no registrado de la Ley 24.013, las indemnizaciones agravadas de la Ley 25.323 (la famosa «doble indemnización» por falta de pago) y las de la Ley 25.345. Si tu relación no estaba registrada, igual conservás el derecho a la indemnización común y a reclamar los aportes adeudados.",
  },
  {
    q: "¿La indemnización paga aportes o descuentos?",
    a: "Los rubros indemnizatorios (antigüedad, preaviso no otorgado, integración) no son remunerativos: no llevan aportes jubilatorios ni de obra social, los cobrás completos. El aguinaldo proporcional y los días trabajados sí son remunerativos y llevan los descuentos habituales.",
  },
  {
    q: "¿La indemnización por despido paga Ganancias?",
    a: "Solo una parte está exenta. El art. 26 inc. i) de la Ley de Ganancias exime la indemnización por antigüedad (la del art. 245) y los intereses judiciales de un crédito laboral. En el mismo inciso, la ley dice que las indemnizaciones por falta de preaviso no están exentas. La integración del mes, el aguinaldo y las vacaciones proporcionales no figuran entre las exentas: se suman a tus ingresos del año como cualquier sueldo. Que un rubro no esté exento no significa que te lo descuenten: solo pagás si tus ingresos anuales superan las deducciones personales.",
  },
  {
    q: "¿Qué es el fondo de cese laboral?",
    a: "Desde la reforma, los convenios colectivos pueden reemplazar la indemnización del art. 245 por un fondo o sistema de cese (parecido al de la construcción), siempre a cargo del empleador. Si tu convenio adoptó uno, tu liquidación por despido se rige por ese sistema y no por la fórmula clásica. Consultá con tu sindicato si tu actividad lo implementó.",
  },
];

export default function IndemnizacionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de Indemnización por Despido 2026",
        url: "https://calcular.ar/indemnizacion",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo:
          "Calculadora de Indemnización por Despido 2026: cuánto te corresponde",
        descripcion:
          "Cómo se calcula la indemnización por despido sin causa en 2026: antigüedad (art. 245 LCT reformado por la Ley 27.802), preaviso, integración y liquidación final.",
        url: "/indemnizacion",
        modificado: "2026-09-21",
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
          Calculadora de Indemnización por Despido 2026
        </h1>
        <p className="text-zinc-600">
          Ingresá tu sueldo y tus fechas de ingreso y egreso y descubrí{" "}
          <strong>cuánto te corresponde por despido sin causa</strong>: indemnización por
          antigüedad, preaviso, integración del mes, aguinaldo y vacaciones proporcionales.
          Actualizada con el <strong>nuevo art. 245 de la LCT</strong> (Ley 27.802, marzo de
          2026).
        </p>
      </header>

      <RespuestaPrimero actualizado="13 de junio de 2026">
        <p>
          Si te despiden <strong>sin causa</strong>, te corresponde{" "}
          <strong>un mes de sueldo por cada año trabajado</strong> (o fracción mayor a 3
          meses), sobre tu mejor remuneración mensual, normal y habitual del último año
          (art. 245 LCT). Se suman el <strong>preaviso</strong> (1 o 2 meses si no te
          avisaron), la <strong>integración del mes</strong> y la liquidación final (aguinaldo
          y vacaciones proporcionales). Desde la Ley 27.802 (2026), aunque se aplique el tope
          de convenio, la base nunca baja del <strong>67% de tu sueldo real</strong>. Si
          renunciás o te despiden con causa, cobrás solo la liquidación final.
        </p>
      </RespuestaPrimero>

      <CalculadoraIndemnizacion />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Cómo se calcula la indemnización por despido
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Si te despiden <strong>sin justa causa</strong> después del período de prueba, el
            art. 245 de la Ley de Contrato de Trabajo manda pagar{" "}
            <strong>un mes de sueldo por cada año de servicio</strong> o fracción mayor de 3
            meses:
          </p>
          <p className="rounded-xl bg-white p-4 font-medium text-zinc-800 shadow-sm">
            Indemnización = mejor remuneración mensual, normal y habitual × años de antigüedad
            (la fracción mayor a 3 meses cuenta como un año más)
          </p>
          <p>
            Por ejemplo: con 4 años y 5 meses de antigüedad se pagan <strong>5</strong> sueldos;
            con 4 años y 2 meses, <strong>4</strong>. La indemnización nunca puede ser menor a
            un mes de sueldo. Y no viene sola: si no hubo preaviso se suman{" "}
            <strong>1 o 2 meses más</strong> (art. 232), los días que falten hasta fin de mes
            (art. 233) y la liquidación final de cualquier egreso: aguinaldo proporcional,
            vacaciones no gozadas y días trabajados.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La base de cálculo: qué entra y qué no
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            La base es tu <strong>mejor remuneración mensual, normal y habitual</strong>{" "}
            devengada en el último año. La Ley 27.802 definió con precisión cada palabra:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Habitual:</strong> conceptos cobrados al menos{" "}
              <strong>6 meses en el último año</strong>. Un bono extraordinario que apareció una
              vez no cuenta.
            </li>
            <li>
              <strong>Normal:</strong> para los conceptos variables (horas extra, comisiones,
              premios mensuales) se toma el <strong>promedio de los últimos 6 meses</strong>, o
              el del último año si te resulta más favorable.
            </li>
            <li>
              <strong>Quedan afuera:</strong> el aguinaldo, las vacaciones y los premios que no
              se pagan todos los meses.
            </li>
          </ul>
          <p>
            Además, la base tiene un <strong>tope</strong>: 3 veces el sueldo promedio de tu
            convenio colectivo. Pero aunque se aplique el tope, por ley la base nunca puede
            quedar por debajo del <strong>67% de tu remuneración real</strong> — el criterio del
            fallo «Vizzoti» que ahora es texto legal.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Todos los rubros de la liquidación por despido
        </h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 text-left text-zinc-700">
                <th className="px-4 py-2.5 font-semibold">Rubro</th>
                <th className="px-4 py-2.5 font-semibold">Cuánto es</th>
                <th className="px-4 py-2.5 font-semibold">Cuándo corresponde</th>
              </tr>
            </thead>
            <tbody className="text-zinc-600">
              <tr className="border-t border-zinc-100">
                <td className="px-4 py-2.5 font-medium text-zinc-900">Antigüedad (art. 245)</td>
                <td className="px-4 py-2.5">1 mes por año o fracción &gt; 3 meses</td>
                <td className="px-4 py-2.5">Despido sin causa o indirecto</td>
              </tr>
              <tr className="border-t border-zinc-100">
                <td className="px-4 py-2.5 font-medium text-zinc-900">Preaviso (art. 232)</td>
                <td className="px-4 py-2.5">1 mes (hasta 5 años) o 2 meses (más de 5)</td>
                <td className="px-4 py-2.5">Si no te preavisaron</td>
              </tr>
              <tr className="border-t border-zinc-100">
                <td className="px-4 py-2.5 font-medium text-zinc-900">
                  Integración del mes (art. 233)
                </td>
                <td className="px-4 py-2.5">Días faltantes hasta fin de mes</td>
                <td className="px-4 py-2.5">Despido sin preaviso a mitad de mes</td>
              </tr>
              <tr className="border-t border-zinc-100">
                <td className="px-4 py-2.5 font-medium text-zinc-900">SAC proporcional</td>
                <td className="px-4 py-2.5">Parte del aguinaldo del semestre en curso</td>
                <td className="px-4 py-2.5">Siempre, sea cual sea la causa</td>
              </tr>
              <tr className="border-t border-zinc-100">
                <td className="px-4 py-2.5 font-medium text-zinc-900">
                  Vacaciones no gozadas (art. 156)
                </td>
                <td className="px-4 py-2.5">Días proporcionales del año, a sueldo ÷ 25</td>
                <td className="px-4 py-2.5">Siempre, sea cual sea la causa</td>
              </tr>
              <tr className="border-t border-zinc-100">
                <td className="px-4 py-2.5 font-medium text-zinc-900">Días trabajados</td>
                <td className="px-4 py-2.5">Sueldo del mes hasta el día del despido</td>
                <td className="px-4 py-2.5">Siempre, sea cual sea la causa</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Qué cambió en 2026 con la Ley 27.802
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            La Ley 27.802 (B.O. 6/3/2026) reescribió el art. 245 y tocó varias piezas del
            régimen de despido. Lo importante:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Base de cálculo definida por ley:</strong> ya no se discute qué es
              «normal y habitual»: habitual es lo cobrado 6 meses o más en el año, y lo variable
              entra por promedio de 6 meses (o del año, si te favorece).
            </li>
            <li>
              <strong>El piso del 67% es ley:</strong> el criterio del fallo «Vizzoti» (2004)
              quedó escrito en el artículo: el tope de convenio no puede recortar la base por
              debajo del 67% de tu sueldo real.
            </li>
            <li>
              <strong>Fondos de cese laboral:</strong> los convenios colectivos pueden sustituir
              la indemnización por un fondo tipo el de la construcción, siempre a cargo del
              empleador.
            </li>
            <li>
              <strong>Única reparación:</strong> la indemnización del 245 cierra el reclamo: ya
              no se pueden sumar demandas civiles por el mismo despido (salvo delitos penales).
            </li>
            <li>
              <strong>Sin preaviso en período de prueba:</strong> durante la prueba ya no se
              exige preaviso (antes eran 15 días).
            </li>
          </ul>
          <p>
            Y un cambio anterior que sigue vigente: la <strong>Ley 27.742</strong> (2024) derogó
            las multas por empleo no registrado y la «doble indemnización» de las leyes 24.013,
            25.323 y 25.345.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          ¿La indemnización paga Ganancias? Solo una parte está exenta
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            La exención está en el <strong>art. 26 inc. i) de la Ley de Impuesto a las
            Ganancias</strong>, y es una lista cerrada. Lo que sí está exento:
          </p>
          <blockquote className="rounded-xl border-l-4 border-emerald-600 bg-white p-4 text-sm text-zinc-700 shadow-sm">
            «{LIG_ART26_EXENTO} (…)»
          </blockquote>
          <p>
            Y en el mismo inciso, unas líneas más abajo, la ley aclara qué queda afuera:
          </p>
          <blockquote className="rounded-xl border-l-4 border-zinc-400 bg-white p-4 text-sm text-zinc-700 shadow-sm">
            «{LIG_ART26_NO_EXENTO} (…)»
          </blockquote>
          <p>Aplicado a tu liquidación:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>
              <strong>Antigüedad (art. 245): exenta.</strong> Es casi siempre el rubro más grande.
            </li>
            <li>
              <strong>Preaviso no otorgado y su aguinaldo: no exento.</strong> La ley lo nombra
              expresamente. Es el rubro que más gente cree exento y no lo es.
            </li>
            <li>
              <strong>Integración del mes, aguinaldo y vacaciones proporcionales: sin
              exención.</strong> No aparecen en la lista, así que suman como un sueldo más.
            </li>
            <li>
              <strong>Intereses de un juicio laboral: exentos</strong> (la primera oración del
              mismo inciso).
            </li>
          </ul>
          <p>
            «No exento» no quiere decir «te lo descuentan»: el impuesto se paga solo sobre lo que
            supera las deducciones personales del año. Si querés saber si llegás, usá la{" "}
            <Link href="/ganancias" className="text-emerald-700 underline">
              calculadora de Ganancias
            </Link>{" "}
            sumando a tu sueldo anual la parte que no está exenta. La calculadora de arriba ya te
            separa los dos montos.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-zinc-200 bg-white p-4 open:shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-zinc-800 group-open:text-emerald-700">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Fuentes oficiales</h2>
        <ul className="space-y-1.5 text-sm text-zinc-600">
          <li>
            •{" "}
            <a
              href={INDEMNIZACION_FUENTES.lct.url}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              {INDEMNIZACION_FUENTES.lct.nombre}
            </a>
          </li>
          <li>
            •{" "}
            <a
              href={INDEMNIZACION_FUENTES.ley27802.url}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              {INDEMNIZACION_FUENTES.ley27802.nombre}
            </a>
          </li>
          <li>
            •{" "}
            <a
              href={INDEMNIZACION_FUENTES.ley27742.url}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              {INDEMNIZACION_FUENTES.ley27742.nombre}
            </a>
          </li>
          <li>
            •{" "}
            <a
              href={INDEMNIZACION_FUENTES.ligArt26.url}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              {INDEMNIZACION_FUENTES.ligArt26.nombre}
            </a>{" "}
            <span className="text-xs text-zinc-400">
              (consultado el {INDEMNIZACION_FUENTES.gananciasConsultadoEl})
            </span>
          </li>
        </ul>
        <p className="text-xs text-zinc-400">
          Última verificación: {INDEMNIZACION_FUENTES.consultadoEl}. Esta estimación es
          orientativa: ante un despido real, consultá con un abogado laboralista. Si el despido
          fue sin justa causa, además de la indemnización te corresponde la{" "}
          <Link href="/desempleo" className="text-emerald-700 underline">
            prestación por desempleo
          </Link>
          , que paga ANSES aparte y por hasta 12 meses. Mirá también la{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            calculadora de aguinaldo
          </Link>{" "}
          y la{" "}
          <Link href="/vacaciones" className="text-emerald-700 underline">
            calculadora de vacaciones
          </Link>
          . ¿Cobrás por convenio? La base del cálculo es tu sueldo según la{" "}
          <Link href="/convenios" className="text-emerald-700 underline">
            escala salarial de tu gremio
          </Link>
          . ¿Querés entender el cálculo paso a paso? Leé{" "}
          <Link
            href="/blog/como-se-calcula-la-indemnizacion-por-despido-2026"
            className="text-emerald-700 underline"
          >
            cómo se calcula la indemnización por despido en 2026
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
