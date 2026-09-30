import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraNegociacionBuenaFe } from "@/components/CalculadoraNegociacionBuenaFe";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  CAMBIOS,
  FUENTES,
  INFORMACION_OBLIGATORIA,
  REGLAS,
  TEXTOS,
  VIGENCIA,
} from "@/data/negociacion-buena-fe";

export const metadata: Metadata = {
  title: "Negociar de buena fe: la multa del 20% ahora es obligatoria",
  description: `Desde el ${VIGENCIA} el juez ya no «podrá» multar a quien se niega a negociar: «sancionará». Y cesar a tiempo dejó de reducir la multa a la mitad — la elimina. Calculá el techo del ${REGLAS.topePorcentaje}% de la masa salarial y los plazos de la Ley 23.546.`,
  alternates: { canonical: "/negociacion-de-buena-fe" },
  openGraph: {
    title: "La multa por no negociar de buena fe dejó de ser facultativa",
    description:
      "El art. 149 de la Ley 27.802 cambió «podrá sancionar» por «sancionará», fijó en 10 días el plazo para que la multa pueda eliminarse entera y escribió quién negocia un convenio de empresa, como norma de orden público.",
    url: "https://calcular.ar/negociacion-de-buena-fe",
    images: [
      {
        url: "/og?t=Negociar%20de%20buena%20fe&s=La%20multa%20del%2020%25%20ahora%20es%20obligatoria",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuánto es la multa por no negociar de buena fe?",
    a: `Hasta el ${REGLAS.topePorcentaje}% del total de la masa salarial del mes en que se produzca el hecho, correspondiente a los trabajadores comprendidos en el ámbito personal de la negociación. Es un techo, no un importe: el inciso dice «hasta un máximo equivalente». Si la parte infractora mantiene su actitud, el importe se incrementa un ${REGLAS.incrementoPorcentaje}% por cada ${REGLAS.incrementoCadaDias} días de mora en acatar la decisión judicial, y en caso de reincidencia el máximo puede elevarse hasta el ${REGLAS.topeReincidenciaPorcentaje}% de esos montos.`,
  },
  {
    q: "¿Qué cambió el 6 de marzo de 2026 si el 20% ya existía desde 2004?",
    a: "Cambió el verbo, que es lo que casi nadie miró porque el número siguió igual. El texto anterior decía que el tribunal «podrá, además, sancionar a la parte incumplidora»; el vigente dice que «sancionará». Con el texto viejo el juez podía ordenar el cese sin multar; con el nuevo la sanción acompaña al cese.",
  },
  {
    q: "¿Si dejo de incumplir me perdonan la multa?",
    a: `Puede ser, y esa posibilidad es nueva. Antes, si los actos cesaban dentro del plazo que fijara la sentencia, el monto «podrá ser reducido por el juez hasta el CINCUENTA POR CIENTO (50%)». Hoy el plazo es de ${REGLAS.diasParaEliminar} días —fijo, y la decisión judicial «debe» establecerlo— y el monto «podrá ser eliminada por el juez». Se pasó de una quita de hasta la mitad a la posibilidad de que no quede nada.`,
  },
  {
    q: "¿Hay que ir al juzgado sí o sí?",
    a: "No, y ése es el otro cambio grande. El texto anterior sólo habilitaba a «promover una acción judicial». El vigente permite pedirle antes a la Secretaría de Trabajo que adopte las medidas conducentes para concretar la mesa de negociación, y entre esas facultades incluye una que pesa: «delimitar el alcance de la prórroga en la vigencia de las cláusulas obligacionales del Convenio Colectivo de Trabajo que se intenta renegociar si a ese momento aún se encontrasen vigentes». La vía judicial sigue disponible, pero ya no es la única.",
  },
  {
    q: "¿Quién negocia un convenio colectivo de empresa?",
    a: "Desde el 6 de marzo de 2026 lo dice el artículo: en una negociación por empresa o por región, la representación sindical es la del sindicato o los sindicatos de primer grado o de empresa con personería gremial en el ámbito territorial y personal que se pretenda negociar. Y agrega que «esta disposición es de orden público por cuanto toda disposición establecida por estatuto de la Organización Sindical de Segundo o Primer Grado que se oponga a la misma, no será válida». En una negociación por actividad, en cambio, la representación es de la federación u organización gremial de primer grado con alcance nacional.",
  },
  {
    q: "¿Qué información hay que intercambiar obligatoriamente?",
    a: "La distribución de los beneficios de la productividad, la situación actual del empleo y las previsiones sobre su futura evolución. Si la negociación es a nivel de empresa, se suman siete temas más: situación económica de la empresa y su entorno, costo laboral unitario, causales e indicadores de ausentismo, innovaciones tecnológicas y organizacionales previstas, organización y distribución del tiempo de trabajo, siniestralidad laboral y planes de formación profesional. En procedimientos preventivos de crisis y en empresas concursadas hay listas propias.",
  },
  {
    q: "¿En cuánto tiempo hay que constituir la comisión negociadora?",
    a: `En ${REGLAS.diasComisionNegociadora} días desde la recepción de la notificación del artículo 2°. Y son días hábiles administrativos: lo dice el artículo 8° de la misma ley, que la reforma no tocó.`,
  },
  {
    q: "¿Cuándo se considera homologado un convenio por el paso del tiempo?",
    a: `A los ${REGLAS.diasHomologacion} días hábiles administrativos de recibida la solicitud — pero con una condición que antes no estaba. El texto anterior decía «transcurrido dicho plazo se la considerará tácitamente homologada»; el vigente agrega «sin que existan observaciones a cumplir por las partes». Si quedaron observaciones pendientes, el silencio ya no homologa.`,
  },
  {
    q: "¿El 10% por cada cinco días se calcula sobre el importe original o sobre el ya aumentado?",
    a: "La ley no lo dice. El inciso escribe que «el importe de la sanción se incrementará en un diez por ciento (10%) por cada cinco (5) días de mora» y ahí termina. Las dos lecturas son defendibles y a las pocas semanas dan números bien distintos, así que esta página muestra las dos en vez de elegir una y hacerla pasar por la única.",
  },
  {
    q: "¿Qué pasa con las astreintes?",
    a: "Siguen disponibles, y la remisión se actualizó: el texto anterior mandaba al artículo 666 bis del Código Civil —una norma derogada por el Código Civil y Comercial— y el vigente manda al artículo 804 del Código Civil y Comercial de la Nación. El juez las puede aplicar a pedido de parte, además de la multa.",
  },
  {
    q: "¿A dónde va la plata de la multa?",
    a: "A programas de inspección: el inciso dice que «todos los importes que así se devenguen tendrán como exclusivo destino programas de inspección de la Secretaría de Trabajo, Empleo y Seguridad Social del Ministerio de Capital Humano». No la cobra la parte que ganó el juicio.",
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
          "Los cinco cambios que el art. 149 de la Ley 27.802 introdujo en el procedimiento de la negociación colectiva, con el texto de antes y el de ahora al lado.",
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
          El {REGLAS.topePorcentaje}% de la masa salarial está en la ley desde 2004 — y por eso casi
          nadie notó que el {VIGENCIA} cambió todo lo que lo rodea.{" "}
          <strong>El juez ya no «podrá» multar: «sancionará»</strong>, y cesar a tiempo dejó de
          reducir la multa a la mitad para poder borrarla entera.
        </p>
      </header>

      <RespuestaPrimero actualizado={FUENTES.consultadoEl}>
        <p>
          El art. 4° inciso e) de la Ley 23.546 —en la redacción del art. 149 de la Ley 27.802,
          vigente desde el <strong>{VIGENCIA}</strong>— manda al tribunal disponer el cese del
          comportamiento y <strong>sancionar</strong> con una multa de{" "}
          <strong>hasta el {REGLAS.topePorcentaje}%</strong> de la masa salarial del mes del ámbito
          personal de la negociación, con un <strong>+{REGLAS.incrementoPorcentaje}% por cada{" "}
          {REGLAS.incrementoCadaDias} días</strong> de mora en acatar la decisión y un techo que en
          caso de reincidencia puede llegar al {REGLAS.topeReincidenciaPorcentaje}%. Si los actos
          cesan dentro de <strong>{REGLAS.diasParaEliminar} días</strong>, el juez puede{" "}
          <strong>eliminarla</strong>. La comisión negociadora se constituye en{" "}
          {REGLAS.diasComisionNegociadora} días y la homologación tiene {REGLAS.diasHomologacion} —
          todos hábiles administrativos, por el art. 8°.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tu caso</h2>
        <p className="text-sm text-zinc-600">
          La primera calculadora da el techo de la multa y los incrementos por mora. La segunda, las
          fechas de los dos plazos que la ley fija con número. Ninguna de las dos adivina cuánto va
          a aplicar el juez: el inciso fija un máximo y deja el importe a la sentencia.
        </p>
        <CalculadoraNegociacionBuenaFe />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los cinco cambios, con el texto de antes al lado
        </h2>
        <p className="text-sm text-zinc-600">
          Es la forma más honesta de mostrarlo: no «qué dice la ley» sino qué decía y qué dice. La
          columna de la izquierda es el texto que rigió hasta el 5 de marzo de 2026, tomado de la
          captura del propio texto oficial de InfoLEG.
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
          Este inciso no cambió, y conviene leerlo entero antes de discutir la multa: define el
          incumplimiento que la habilita. Los cuatro deberes son concretos —ir a las reuniones,
          mandar gente con mandato, intercambiar información y hacer esfuerzos por acordar— y el
          tercero trae una lista de información obligatoria que crece cuando se negocia a nivel de
          empresa.
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
            <p className="text-sm font-semibold text-zinc-800">Además, a nivel de empresa</p>
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
          Quien recibe información calificada de confidencial está obligado a guardar secreto
          (inciso d). Ese deber tampoco cambió.
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
          El texto anterior decía «con representantes sindicales» y nada más: quién se sentaba en un
          convenio de empresa dependía en la práctica de lo que dijera el estatuto de la federación.
          El vigente lo resuelve por nivel de negociación y agrega la cláusula que hace la
          diferencia: es <strong>de orden público</strong>, y todo estatuto de una organización de
          segundo o primer grado que se le oponga «no será válida». Sin esa oración, el reparto sería
          disponible por vía estatutaria; con ella, no.
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
          Vale la pena marcar el contraste, porque es la misma materia y la regla es distinta: el
          art. 7° manda a la <strong>Ley 14.786</strong> para los diferendos que aparezcan durante la
          negociación, y esa ley escribe su plazo como «quince días», sin calificarlos. Acá la
          calificación está escrita en la propia ley; allá hay que decidirla. Ese caso está contado
          en la página de{" "}
          <Link
            href="/servicios-esenciales-huelga"
            className="font-medium text-emerald-700 hover:underline"
          >
            servicios esenciales y guardias mínimas
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
              </a>{" "}
              — {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página cita el texto oficial publicado en InfoLEG y lo contrasta contra la versión que
          rigió hasta el 5 de marzo de 2026 — no contra un resumen de prensa. Es informativa y
          orientativa: no reemplaza el asesoramiento de un profesional ni anticipa el criterio de un
          tribunal. Consultada el {FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
