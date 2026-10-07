import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraNegociacionBuenaFe } from "@/components/CalculadoraNegociacionBuenaFe";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { openGraphDe } from "@/lib/seo";
import {
  CAMBIOS,
  FUENTES,
  INFORMACION_OBLIGATORIA,
  REGLAS,
  TEXTOS,
  VIGENCIA,
} from "@/data/negociacion-buena-fe";

export const metadata: Metadata = {
  title: "Negociación de buena fe: la multa del 20% (Ley 23.546)",
  description: `Desde el ${VIGENCIA} el juez sanciona a quien se niega a negociar, y cesar a tiempo puede borrar la multa. Calculá el techo del ${REGLAS.topePorcentaje}% de la masa salarial.`,
  alternates: { canonical: "/negociacion-de-buena-fe" },
  openGraph: {
    ...openGraphDe({
      ruta: "/negociacion-de-buena-fe",
      titulo: "Negociar de buena fe",
      bajada: "La multa del 20% ahora es obligatoria",
    }),
    title: "La multa por no negociar de buena fe dejó de ser opcional",
    description:
      "El art. 149 de la Ley 27.802 cambió «podrá sancionar» por «sancionará», fijó en 10 días el plazo para que la multa se pueda borrar entera y escribió quién negocia un convenio de empresa, como norma de orden público.",
  },
};

const faqs = [
  {
    q: "¿Cuánto es la multa por no negociar de buena fe?",
    a: `Hasta el ${REGLAS.topePorcentaje}% de la masa salarial del mes en que pasó el hecho, contando a los trabajadores que abarca la negociación. Es un techo, no un monto fijo: la ley dice «hasta un máximo equivalente». Si la parte que incumple sigue igual, la multa sube un ${REGLAS.incrementoPorcentaje}% cada ${REGLAS.incrementoCadaDias} días de demora en cumplir lo que ordenó el juez. Y si reincide, el máximo puede subir hasta el ${REGLAS.topeReincidenciaPorcentaje}% de esos montos.`,
  },
  {
    q: "¿Qué cambió el 6 de marzo de 2026 si el 20% ya existía desde 2004?",
    a: "Cambió el verbo, y casi nadie lo vio porque el número quedó igual. Antes decía que el tribunal «podrá, además, sancionar a la parte incumplidora». Ahora dice que «sancionará». Con el texto viejo, el juez podía ordenar que se dejara de incumplir sin multar. Con el nuevo, la orden viene con multa.",
  },
  {
    q: "¿Si dejo de incumplir me perdonan la multa?",
    a: `Puede ser, y eso es nuevo. Antes, si se dejaba de incumplir dentro del plazo que fijaba la sentencia, el monto «podrá ser reducido por el juez hasta el CINCUENTA POR CIENTO (50%)». Hoy el plazo es fijo, de ${REGLAS.diasParaEliminar} días, y el juez «debe» ponerlo en su decisión. Y la multa «podrá ser eliminada por el juez». Se pasó de una rebaja de hasta la mitad a la posibilidad de que no quede nada.`,
  },
  {
    q: "¿Hay que ir al juzgado sí o sí?",
    a: "No, y ese es el otro cambio grande. Antes la única vía era «promover una acción judicial». Ahora se puede pedir primero a la Secretaría de Trabajo que tome medidas para que la mesa de negociación se arme. Entre esas medidas hay una que pesa: «delimitar el alcance de la prórroga en la vigencia de las cláusulas obligacionales del Convenio Colectivo de Trabajo que se intenta renegociar si a ese momento aún se encontrasen vigentes». El juzgado sigue disponible, pero ya no es el único camino.",
  },
  {
    q: "¿Quién negocia un convenio colectivo de empresa?",
    a: "Desde el 6 de marzo de 2026 lo dice el artículo. En una negociación por empresa o por región, negocia el sindicato (o los sindicatos) de primer grado o de empresa con personería gremial en ese lugar y para esos trabajadores. Y agrega que «esta disposición es de orden público por cuanto toda disposición establecida por estatuto de la Organización Sindical de Segundo o Primer Grado que se oponga a la misma, no será válida». En una negociación por actividad, en cambio, negocia la federación o el sindicato de primer grado con alcance nacional.",
  },
  {
    q: "¿Qué información hay que intercambiar obligatoriamente?",
    a: "Cómo se reparten los beneficios de la productividad, cómo está el empleo hoy y qué se espera para adelante. Si la negociación es por empresa, se suman siete temas más: la situación económica de la empresa y su entorno, el costo laboral por unidad, las causas y los números del ausentismo, los cambios tecnológicos y de organización que se planean, cómo se organiza el tiempo de trabajo, los accidentes laborales y los planes de capacitación. Las empresas en crisis o en concurso tienen sus propias listas.",
  },
  {
    q: "¿En cuánto tiempo hay que constituir la comisión negociadora?",
    a: `En ${REGLAS.diasComisionNegociadora} días desde que se recibe la notificación del artículo 2°. Y son días hábiles administrativos: lo dice el artículo 8° de la misma ley, que la reforma no tocó.`,
  },
  {
    q: "¿Cuándo se considera homologado un convenio por el paso del tiempo?",
    a: `A los ${REGLAS.diasHomologacion} días hábiles administrativos de recibido el pedido, pero ahora con una condición nueva. Antes decía «transcurrido dicho plazo se la considerará tácitamente homologada». Ahora agrega «sin que existan observaciones a cumplir por las partes». Si quedaron observaciones pendientes, el silencio ya no homologa.`,
  },
  {
    q: "¿El 10% por cada cinco días se calcula sobre el importe original o sobre el ya aumentado?",
    a: "La ley no lo dice. Escribe que «el importe de la sanción se incrementará en un diez por ciento (10%) por cada cinco (5) días de mora» y ahí termina. Las dos lecturas se pueden defender, y a las pocas semanas dan números muy distintos. Por eso mostramos las dos en vez de elegir una y presentarla como la única.",
  },
  {
    q: "¿Qué pasa con las astreintes?",
    a: "Siguen disponibles, y se actualizó la referencia. Antes remitía al artículo 666 bis del Código Civil (que quedó derogado con el Código Civil y Comercial). Ahora remite al artículo 804 del Código Civil y Comercial de la Nación. El juez las puede aplicar si una parte lo pide, además de la multa.",
  },
  {
    q: "¿A dónde va la plata de la multa?",
    a: "A programas de inspección. La ley dice que «todos los importes que así se devenguen tendrán como exclusivo destino programas de inspección de la Secretaría de Trabajo, Empleo y Seguridad Social del Ministerio de Capital Humano». No la cobra la parte que ganó el juicio.",
  },
];

export default function NegociacionBuenaFePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de la multa por no negociar de buena fe",
        url: "https://calcular.ar/negociacion-de-buena-fe",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo:
          "Negociación colectiva de buena fe: la multa del art. 4° de la Ley 23.546 después de la reforma",
        descripcion:
          "Los cinco cambios que el art. 149 de la Ley 27.802 hizo en el procedimiento de la negociación colectiva, con el texto de antes y el de ahora lado a lado.",
        url: "/negociacion-de-buena-fe",
        modificado: FUENTES.consultadoEl,
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
          Negociar de buena fe: la multa, los plazos y lo que cambió
        </h1>
        <p className="text-zinc-600">
          El {REGLAS.topePorcentaje}% de la masa salarial está en la ley desde 2004. Por eso casi
          nadie notó que el {VIGENCIA} cambió todo lo que lo rodea.{" "}
          <strong>El juez ya no «podrá» multar: «sancionará»</strong>. Y dejar de incumplir a
          tiempo ya no baja la multa a la mitad: ahora la puede borrar entera.
        </p>
      </header>

      <RespuestaPrimero actualizado={FUENTES.consultadoEl}>
        <p>
          Lo dice el art. 4° inciso e) de la Ley 23.546, con el texto que le dio el art. 149 de la
          Ley 27.802 (vigente desde el <strong>{VIGENCIA}</strong>). El juez tiene que ordenar que se
          deje de incumplir y <strong>sancionar</strong> con una multa de{" "}
          <strong>hasta el {REGLAS.topePorcentaje}%</strong> de la masa salarial del mes de los
          trabajadores que abarca la negociación. Se suma un{" "}
          <strong>
            +{REGLAS.incrementoPorcentaje}% cada {REGLAS.incrementoCadaDias} días
          </strong>{" "}
          de demora en cumplir, y si hay reincidencia el techo puede llegar al{" "}
          {REGLAS.topeReincidenciaPorcentaje}%. Si se deja de incumplir dentro de{" "}
          <strong>{REGLAS.diasParaEliminar} días</strong>, el juez puede{" "}
          <strong>borrarla</strong>. La comisión negociadora se arma en{" "}
          {REGLAS.diasComisionNegociadora} días y la homologación tiene {REGLAS.diasHomologacion}.
          Todos son días hábiles administrativos, por el art. 8°.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tu caso</h2>
        <p className="text-sm text-zinc-600">
          La primera calculadora te da el techo de la multa y cuánto sube por la demora. La segunda,
          las fechas de los dos plazos que la ley fija con número. Ninguna adivina cuánto va a poner
          el juez: la ley fija un máximo y deja el monto a la sentencia.
        </p>
        <CalculadoraNegociacionBuenaFe />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los cinco cambios, con el texto de antes al lado
        </h2>
        <p className="text-sm text-zinc-600">
          Es la forma más honesta de mostrarlo: no solo qué dice la ley, sino qué decía y qué dice.
          La columna de la izquierda es el texto que rigió hasta el 5 de marzo de 2026, tomado de la
          captura del texto oficial de InfoLEG.
        </p>
        <div className="space-y-4">
          {CAMBIOS.map((c) => (
            <div key={c.id} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <h3 className="text-base font-semibold text-zinc-900">{c.titulo}</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <blockquote className="rounded-lg border-l-4 border-zinc-300 bg-zinc-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Hasta el 5/3/2026
                  </p>
                  <p className="mt-1 text-sm italic text-zinc-600">«{c.antes}»</p>
                </blockquote>
                <blockquote className="rounded-lg border-l-4 border-emerald-400 bg-emerald-50/60 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                    Vigente
                  </p>
                  <p className="mt-1 text-sm italic text-zinc-700">«{c.ahora}»</p>
                </blockquote>
              </div>
              <p className="mt-3 text-sm text-zinc-700">{c.porQue}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué es negociar de buena fe, según la ley</h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Art. 4° inciso a)</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.buenaFe}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Este inciso no cambió, y conviene leerlo entero antes de discutir la multa, porque dice qué
          incumplimiento la habilita. Son cuatro deberes concretos: ir a las reuniones, mandar gente
          con poder para decidir, intercambiar información y esforzarse por llegar a un acuerdo. El
          tercero trae una lista de información obligatoria que crece cuando se negocia por empresa.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-800">Siempre</p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              {INFORMACION_OBLIGATORIA.siempre.map((i) => (
                <li key={i}>· {i}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-800">Además, si se negocia por empresa</p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              {INFORMACION_OBLIGATORIA.aNivelEmpresa.map((i) => (
                <li key={i}>· {i}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-800">
              En procedimiento preventivo de crisis
            </p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              {INFORMACION_OBLIGATORIA.enCrisis.map((i) => (
                <li key={i}>· {i}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-sm font-semibold text-zinc-800">En empresas concursadas</p>
            <ul className="mt-2 space-y-1 text-sm text-zinc-600">
              {INFORMACION_OBLIGATORIA.enConcurso.map((i) => (
                <li key={i}>· {i}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Quien recibe información marcada como confidencial tiene que guardar el secreto (inciso
          d). Eso tampoco cambió.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Quién negocia un convenio de empresa, y por qué la ley lo blindó
        </h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Art. 4°, primer párrafo</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.quienNegocia}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Antes decía «con representantes sindicales» y nada más. En la práctica, quién se sentaba
          en un convenio de empresa dependía de lo que dijera el estatuto de la federación. El texto
          nuevo lo resuelve según el nivel de la negociación y suma la frase que hace la diferencia:
          es <strong>de orden público</strong>, y cualquier estatuto de una organización de segundo
          o primer grado que lo contradiga «no será válida». Sin esa frase, un estatuto podría
          cambiar el reparto. Con ella, no puede.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los plazos son hábiles administrativos, y acá la ley lo dice
        </h2>
        <blockquote className="rounded-xl border-l-4 border-zinc-400 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Art. 8° de la Ley 23.546 (intacto)</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.plazosHabiles}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Vale marcar el contraste, porque es el mismo tema y la regla es distinta. El art. 7° manda
          a la <strong>Ley 14.786</strong> para los conflictos que aparezcan durante la negociación,
          y esa ley dice «quince días» sin aclarar de qué tipo. Acá la ley lo aclara; allá hay que
          decidirlo. Ese caso está contado en la página de{" "}
          <Link
            href="/servicios-esenciales-huelga"
            className="font-medium text-emerald-700 hover:underline"
          >
            servicios esenciales y guardias mínimas
          </Link>
          . Y si el convenio ya venció y la negociación está trabada, mirá qué pasa con un{" "}
          <Link href="/convenio-vencido" className="font-medium text-emerald-700 hover:underline">
            convenio colectivo vencido
          </Link>
          .
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
          Lo que la misma reforma cambió en el resto del derecho colectivo:{" "}
          <Link
            href="/servicios-esenciales-huelga"
            className="font-medium text-emerald-700 hover:underline"
          >
            servicios esenciales
          </Link>
          ,{" "}
          <Link
            href="/despido-de-delegado-gremial"
            className="font-medium text-emerald-700 hover:underline"
          >
            tutela sindical
          </Link>
          ,{" "}
          <Link
            href="/practicas-desleales-sindicales"
            className="font-medium text-emerald-700 hover:underline"
          >
            prácticas desleales
          </Link>{" "}
          y{" "}
          <Link href="/descuentos-del-sueldo" className="font-medium text-emerald-700 hover:underline">
            la cuota solidaria con tope del 2%
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {FUENTES.lista.map((f) => (
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
          Esta página cita el texto oficial publicado en InfoLEG y lo compara con la versión que
          rigió hasta el 5 de marzo de 2026 (no con un resumen de prensa). Es informativa: no
          reemplaza el consejo de un profesional ni anticipa lo que va a decidir un tribunal.
          Consultada el {FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
