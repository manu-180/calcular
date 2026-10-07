import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraTutelaSindical } from "@/components/CalculadoraTutelaSindical";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  CAMBIOS,
  CONGRESALES_CON_TUTELA,
  DIAS_CADUCIDAD_ACCION,
  HORAS_AVISO_LIBERACION,
  HORAS_MENSUALES_DELEGADO,
  MESES_ESTABILIDAD_POSTERIOR,
  MESES_TUTELA_POSTULANTE,
  REFORMA_PUBLICADA,
  ROLES,
  TEXTOS,
  TUTELA_FUENTES,
} from "@/data/tutela-sindical";

export const metadata: Metadata = {
  title: "Despido de delegado gremial: indemnización del art. 52",
  description:
    "La Ley 27.802 reescribió el art. 52 de la Ley 23.551: suplentes afuera, cupo de congresales y sin acumular con el art. 245 bis. Calculá la indemnización.",
  alternates: { canonical: "/despido-de-delegado-gremial" },
  openGraph: {
    title: "Tutela sindical: el art. 52 que casi nadie está citando bien",
    description:
      "38 años sin cambios y una reescritura completa en 2026. Quién sigue teniendo tutela, quién la perdió, y cuánto es la indemnización agravada en pesos.",
    url: "https://calcular.ar/despido-de-delegado-gremial",
    images: [
      {
        url: "/og?t=Despido%20de%20delegado%20gremial&s=El%20art.%2052%20nuevo%3A%20qui%C3%A9n%20cobra%20la%20indemnizaci%C3%B3n%20agravada",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function DespidoDelegadoGremialPage() {
  const faqs = [
    {
      q: "¿Cuánto cobra un delegado gremial despedido sin la exclusión judicial previa?",
      a: `Además de la indemnización común por despido, el art. 52 de la Ley 23.551 le da «una suma equivalente al importe de las remuneraciones que le hubieren correspondido durante el tiempo faltante del mandato y el año de estabilidad posterior». Ese año sale del art. 48, que protege al representante «durante el tiempo que dure el ejercicio de su mandato y hasta un año más». En sueldos: los meses que le faltaban de mandato más ${MESES_ESTABILIDAD_POSTERIOR} sueldos.`,
    },
    {
      q: "¿Un delegado suplente cobra la indemnización agravada?",
      a: "Ya no. Es el cambio más grande del Título XV de la Ley 27.802 y casi no se publica. El art. 52 vigente dice, textual: «A aquellos que sean designados suplentes no les será aplicable la tutela sindical prevista en la presente ley». El texto de 1988 no los dejaba afuera. Un suplente despedido cobra la indemnización común y nada más.",
    },
    {
      q: "¿Qué pasa con los congresales?",
      a: `El art. 52 nuevo limita la protección a ${CONGRESALES_CON_TUTELA.grande} congresales titulares en grandes empresas y ${CONGRESALES_CON_TUTELA.pyme} en pymes (según la Ley 24.467). Y aclara que vale «exclusivamente durante el tiempo en que el trabajador asista al congreso en cuestión», avisándole al empleador cuándo empieza y cuándo termina. La ley explica hasta dónde llega esa protección, pero no mete al congresal en la parte que fija cuánto se cobra por despido indirecto. Por eso esta página no le pone un número.`,
    },
    {
      q: "Me postulé y perdí la elección. ¿Cobro algo?",
      a: `Sí, si sacaste el 5% de los votos válidos o más. El art. 52 le da al candidato que no ganó, además de las indemnizaciones, «las remuneraciones imputables al período de tutela aún no agotado» (lo que quedaba de los ${MESES_TUTELA_POSTULANTE} meses del art. 50) y «el importe de un (1) año más de remuneraciones». Pero el art. 50 nuevo le saca la protección al candidato que «hubiere obtenido menos del cinco por ciento (5%) de los votos válidos emitidos». Debajo de ese piso no hay protección que violar, y sin protección no hay plata extra.`,
    },
    {
      q: "¿La indemnización del art. 52 se suma a la del art. 245 bis por despido discriminatorio?",
      a: "No, y hay doble candado. El art. 52 dice que el año extra del candidato que no ganó se paga «no siendo las mismas acumulables a las dispuestas en el artículo 245 bis de la Ley de Contrato de Trabajo». Y el mismo art. 245 bis de la LCT (que nombra la «opinión política o gremial» entre los motivos de discriminación) termina diciendo que su indemnización «no será acumulable con ningún otro régimen especial que establezca agravamientos indemnizatorios». Son dos caminos y hay que elegir uno: el que deje más.",
    },
    {
      q: "¿Cuánto es el art. 245 bis?",
      a: "El 50% de la indemnización del art. 245 (la de antigüedad), y «según la gravedad de los hechos, los jueces podrán incrementar esta indemnización hasta el cien por ciento (100%)». La discriminación la tiene que probar quien la reclama, y hace falta una sentencia que confirme que el despido fue discriminatorio.",
    },
    {
      q: "¿El empleador puede despedirme igual y discutirlo después?",
      a: `No sin pasar antes por un juez. El art. 52 pide una «resolución judicial previa» que le saque al trabajador esa protección, con el trámite del art. 47. Lo que sumó la reforma es una salida intermedia: el empleador «podrá liberar de prestar servicios» al trabajador protegido. Tiene que avisarle al Ministerio de Capital Humano dentro de las ${HORAS_AVISO_LIBERACION} horas hábiles y seguir cumpliendo todas sus obligaciones. Después tiene ${DIAS_CADUCIDAD_ACCION} días para iniciar la acción del art. 78 de la LCT o pedir que le saquen la protección. Si no lo hace, pierde ese derecho.`,
    },
    {
      q: "¿Puedo pedir la reinstalación en vez del dinero?",
      a: "Sí, son los dos caminos del mismo artículo. El art. 52 permite pedir «por vía sumarísima, la reinstalación en su puesto, con más los salarios caídos durante la tramitación judicial, o el restablecimiento de las condiciones de trabajo». Si el juez ordena la reinstalación y el empleador no cumple, le puede poner multas por día (astreintes, art. 804 del Código Civil y Comercial; antes se citaba el 666 bis del viejo Código Civil). Esta calculadora hace el otro camino: el del despido indirecto.",
    },
    {
      q: "¿Cuántas horas gremiales tiene un delegado?",
      a: `Hasta ${HORAS_MENSUALES_DELEGADO} por mes, pagas, «salvo que el convenio colectivo aplicable disponga una cantidad mayor» (art. 44 inc. c, texto nuevo). Antes la ley no ponía techo ni piso: lo dejaba todo en manos del convenio. La reforma agregó además que «el ejercicio de este derecho no podrá generar la interrupción de actividades en el área de trabajo».`,
    },
    {
      q: "¿Desde cuándo rige este texto?",
      a: `Desde el ${REFORMA_PUBLICADA}, el día que se publicó la Ley 27.802 en el Boletín Oficial. Su Título XV (arts. 138 a 148) cambió once artículos de la Ley 23.551. Ojo con las fechas: el texto anterior de los arts. 44 inc. c), 50 y 52 era el original de 1988 (en InfoLEG solo figuran cambios previos en los arts. 20 bis y 20 ter). Así que casi todos los libros, fallos y notas publicados hasta hoy comentan un artículo que ya no está vigente.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de indemnización por despido de delegado gremial (tutela sindical)",
        url: "https://calcular.ar/despido-de-delegado-gremial",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Despido de un delegado gremial: la indemnización agravada del art. 52 nuevo",
        descripcion:
          "El Título XV de la Ley 27.802 reescribió el art. 52 de la Ley 23.551 después de 38 años sin cambios: excluyó a los suplentes, le puso cupo a los congresales y prohibió acumular el año extra del candidato no electo con el art. 245 bis de la LCT.",
        url: "/despido-de-delegado-gremial",
        modificado: TUTELA_FUENTES.consultadoEl,
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
          Despido de un delegado gremial: cuánto se cobra hoy
        </h1>
        <p className="text-zinc-600">
          El artículo 52 de la Ley 23.551 (el que fija la indemnización extra por violar la
          protección sindical) estuvo escrito <strong>igual desde 1988</strong>. El{" "}
          {REFORMA_PUBLICADA} la Ley 27.802 lo reescribió entero. Las diferencias no son detalles:
          cambian <strong>quién cobra</strong>. Acá tenés el texto vigente al lado del que sigue
          circulando, y la cuenta en pesos.
        </p>
      </header>

      <RespuestaPrimero actualizado={TUTELA_FUENTES.consultadoEl}>
        <p>
          Un <strong>delegado o representante titular</strong> despedido sin la resolución judicial
          previa del art. 52 cobra, además de la indemnización común, las remuneraciones del{" "}
          <strong>mandato que faltaba</strong> más el <strong>año de estabilidad posterior</strong>{" "}
          del art. 48. Un <strong>candidato que no ganó</strong> cobra lo que le quedaba de
          protección del art. 50 más <strong>un año</strong> de sueldos. Y ese año{" "}
          <strong>ya no se suma</strong> al del art. 245 bis de la LCT. Un{" "}
          <strong>suplente no cobra nada extra</strong>: el texto nuevo lo deja afuera por escrito.
          Y un candidato que sacó <strong>menos del 5%</strong> de los votos válidos perdió la
          protección del art. 50, así que tampoco.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La cuenta</h2>
        <p className="text-sm text-zinc-600">
          La indemnización común sale del mismo motor que{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            la calculadora de despido sin causa
          </Link>
          , porque dos páginas de calcular.ar no pueden dar dos montos distintos para el mismo caso.
          Lo que se suma acá es el extra del art. 52.
        </p>
        <CalculadoraTutelaSindical />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los cuatro casos, y los dos que la ley cuantifica
        </h2>
        <p className="text-sm text-zinc-600">
          El art. 52 fija un monto para dos casos, ni uno más. Para los otros dos explica hasta dónde
          llega la protección sin ponerle número, o directamente la saca. Esa diferencia es la que
          decide un juicio, por eso la mostramos separada.
        </p>
        <div className="space-y-3">
          {ROLES.map((r) => (
            <div
              key={r.id}
              className={`rounded-xl border p-4 ${
                r.cuantificado
                  ? "border-emerald-200 bg-emerald-50/40"
                  : "border-zinc-200 bg-zinc-50"
              }`}
            >
              <p className="flex flex-wrap items-center gap-2 font-semibold text-zinc-800">
                {r.etiqueta}
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    r.cuantificado
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-zinc-200 text-zinc-700"
                  }`}
                >
                  {r.cuantificado ? "la ley le fija importe" : "la ley no le fija importe"}
                </span>
              </p>
              <p className="mt-1 text-sm text-zinc-600">{r.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué cambió, artículo por artículo</h2>
        <p className="text-sm text-zinc-600">
          Columna izquierda: el texto que estuvo vigente 38 años y que todavía se cita en la mayoría
          de las notas. Columna derecha: el que rige desde el {REFORMA_PUBLICADA}.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="py-2 pr-3">Artículo</th>
                <th className="py-2 pr-3">Decía (1988)</th>
                <th className="py-2 pr-3">Dice (2026)</th>
                <th className="py-2">Qué cambia en plata</th>
              </tr>
            </thead>
            <tbody>
              {CAMBIOS.map((c) => (
                <tr key={c.articulo} className="border-b border-zinc-200 align-top">
                  <td className="py-3 pr-3 font-semibold text-zinc-800">{c.articulo}</td>
                  <td className="py-3 pr-3 text-zinc-600">{c.antes}</td>
                  <td className="py-3 pr-3 text-zinc-700">{c.ahora}</td>
                  <td className="py-3 font-medium text-emerald-800">{c.plata}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 23.551, art. 52: texto vigente (Ley 27.802, art. 144)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art52Nuevo}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 23.551, art. 52: texto original de 1988 (ya NO vigente)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art52Viejo}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Lo copiamos solo para comparar. Es el texto que aparece en la mayoría de los
              comentarios, fallos y notas publicados hasta 2026, porque rigió 38 años sin un solo
              cambio.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 23.551, art. 50: texto vigente, el corte del 5%
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art50Nuevo}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              El texto de 1988 decía «a partir de su postulación» y solo cortaba la protección si
              la lista no se oficializaba. Ahora corre desde que se notifica al empleador de forma
              fehaciente, cede si se reorganiza todo el establecimiento o sector, y se cae si el
              candidato no llega al 5% de los votos válidos.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 23.551, art. 48: de dónde sale el año de estabilidad posterior
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art48}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              La reforma NO tocó este artículo. Es el que convierte el «año de estabilidad
              posterior» del art. 52 en {MESES_ESTABILIDAD_POSTERIOR} sueldos concretos.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 245 bis: el extra que no se suma
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art245bis}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Doble candado: el art. 52 dice que su monto no se suma a este artículo, y este
              artículo dice que no se suma «con ningún otro régimen especial que establezca
              agravamientos indemnizatorios». La calculadora los muestra por separado y los compara.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 23.551, art. 44 inc. c): las horas gremiales del delegado
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art44cNuevo}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              El texto de 1988 lo dejaba todo en manos del convenio, sin techo ni piso legal: «
              {TEXTOS.art44cViejo}»
            </p>
          </blockquote>
        </div>
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
          Del mismo recibo:{" "}
          <Link
            href="/descuentos-del-sueldo"
            className="font-medium text-emerald-700 hover:underline"
          >
            qué te pueden descontar del sueldo
          </Link>{" "}
          (incluida la cuota sindical),{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            la indemnización por despido sin causa
          </Link>{" "}
          y{" "}
          <Link
            href="/actualizacion-creditos-laborales"
            className="font-medium text-emerald-700 hover:underline"
          >
            cómo se actualiza lo que te deben
          </Link>
          . Si el despido vino con presiones por tu actividad gremial, mirá también{" "}
          <Link
            href="/practicas-desleales-sindicales"
            className="font-medium text-emerald-700 hover:underline"
          >
            las prácticas desleales sindicales
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {TUTELA_FUENTES.lista.map((f) => (
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
          Los textos citados salen del <strong>texto actualizado</strong> de InfoLEG, no de
          resúmenes ni de notas. Esta página es informativa y orientativa: el extra del art. 52 se
          reclama ante la Justicia, y esta página no reemplaza a un abogado laboralista. Consultada
          el {TUTELA_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
