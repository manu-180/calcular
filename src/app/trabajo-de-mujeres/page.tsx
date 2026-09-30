import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraTrabajoMujeres } from "@/components/CalculadoraTrabajoMujeres";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ARTICULO_DEROGATORIO,
  FUENTE_TEXTO_ANTERIOR,
  NOTA_DEROGACION,
  TEXTOS_DEROGADOS,
  TEXTOS_VIGENTES,
  TRABAJO_A_DOMICILIO_12713,
  TRABAJO_MUJERES_FUENTES,
  VIGENCIA_REFORMA,
} from "@/data/trabajo-mujeres";

export const metadata: Metadata = {
  title: "Trabajo de mujeres en la LCT: los arts. 174, 175 y 176 están derogados",
  description: `Desde el ${VIGENCIA_REFORMA} el Capítulo I del Título VII de la Ley de Contrato de Trabajo quedó vacío: se cayeron el descanso de dos horas al mediodía, la prohibición de trabajo a domicilio y la de tareas penosas, peligrosas o insalubres. Qué dice el texto que se derogó, qué quedó en pie y cuánto cambia tu día.`,
  alternates: { canonical: "/trabajo-de-mujeres" },
  openGraph: {
    title: "Trabajo de mujeres en la LCT: qué quedó vigente tras la Ley 27.802",
    description:
      "Los arts. 174, 175 y 176 de la LCT fueron derogados el 6/3/2026, sin fecha diferida. El art. 172 y todo el capítulo de maternidad siguen en pie. Acá el texto exacto de lo que se cayó.",
    url: "https://calcular.ar/trabajo-de-mujeres",
    images: [
      {
        url: "/og?t=Trabajo%20de%20mujeres%20en%20la%20LCT&s=Los%20arts.%20174%2C%20175%20y%20176%20est%C3%A1n%20derogados",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Sigue vigente el descanso de dos horas al mediodía para las mujeres?",
    a: `No. El artículo 174 de la Ley de Contrato de Trabajo —el que fijaba ese descanso— fue derogado por el artículo ${ARTICULO_DEROGATORIO} de la Ley 27.802, publicada el ${VIGENCIA_REFORMA}. La nota de derogación dice «Vigencia: a partir de su publicación en el Boletín Oficial», así que no espera al 1/1/2027 como otras partes de la misma reforma: rige derogado desde marzo de 2026. Hoy no hay pausa legal obligatoria al mediodía para nadie. Si el descanso está previsto en el convenio colectivo o en el contrato individual, sigue rigiendo por esa vía: el artículo 8 de la LCT dice que las convenciones con normas más favorables «serán válidas y de aplicación».`,
  },
  {
    q: "¿Una mujer puede hacer hoy tareas penosas, peligrosas o insalubres?",
    a: "Sí. El artículo 176, que lo prohibía, está derogado. Lo que queda es el régimen general del artículo 200 de la LCT, que vale para todo el personal por igual: la insalubridad no existe sin declaración previa de la autoridad de aplicación, y una vez declarada la jornada no puede pasar de seis horas diarias ni de treinta y seis semanales, sin que esa reducción baje la remuneración. O sea: la protección dejó de depender del sexo de la persona y pasó a depender de una declaración administrativa sobre el puesto.",
  },
  {
    q: "¿Qué se perdió además de la prohibición del artículo 176?",
    a: "La parte que casi no se publica. El artículo 176 no terminaba en la prohibición: su última oración decía «Regirá con respecto al empleo de mujeres lo dispuesto en el artículo 195». Ese artículo 195 —que sigue vigente— establece que cuando el accidente o la enfermedad tienen por causa una tarea prohibida, se considera «por ese solo hecho» resultante de la acción u omisión del empleador, «sin admitirse prueba en contrario». Es una presunción que no se puede rebatir. Al caer el 176 cayó el puente: hoy el artículo 195 alcanza sólo a quienes están comprendidos en su propio título, el VIII, de trabajo de menores. Lo que se derogó no fue únicamente una prohibición, fue una regla de responsabilidad.",
  },
  {
    q: "¿Le pueden encargar trabajo a domicilio a una empleada del local?",
    a: `Sí. El artículo 175 lo prohibía expresamente y está derogado. El trabajo a domicilio se rige por la Ley 12.713, que la misma Ley 27.802 modificó en sus artículos 105 y 106: la registración pasa a hacerse por los sistemas de la Agencia de Recaudación y Control Aduanero (ARCA), sin poder exigirse ningún trámite adicional ante otra autoridad, y esa inscripción alcanza para cumplir el artículo 7 de la Ley 24.013; las infracciones se sancionan por el Régimen General del Anexo II de la Ley 25.212. Dicho de otro modo: el trabajo a domicilio dejó de estar prohibido para ellas el mismo día en que se lo empujó al circuito formal.`,
  },
  {
    q: "¿Quedó algo del Título VII de la LCT?",
    a: "Sí, y es la mitad más importante. El artículo 172 sigue intacto: la mujer puede celebrar toda clase de contrato de trabajo y no puede consagrarse ningún tipo de discriminación fundada en el sexo o el estado civil, con plena observancia del principio de igualdad de retribución por trabajo de igual valor. Y el Capítulo II entero —protección de la maternidad: licencia, conservación del empleo, presunción de despido por embarazo, estado de excedencia, descansos por lactancia— quedó sin tocar. Lo que se vació es el Capítulo I, de disposiciones generales.",
  },
  {
    q: "¿Por qué casi ninguna nota dice esto?",
    a: "Porque los tres artículos llegaron intactos desde el texto ordenado de 1976 hasta marzo de 2026: no figuran en los «Antecedentes Normativos» de la LCT, o sea que nunca fueron modificados en cincuenta años. Medio siglo de manuales, apuntes y notas periodísticas fueron escritos sobre un texto que se dio por estable, y esos contenidos se siguen copiando entre sí. El texto actualizado de InfoLEG hoy ya no muestra los artículos: sólo la nota de derogación.",
  },
  {
    q: "Mi empleador me sacó el corte del mediodía. ¿Puede?",
    a: "Si el descanso salía sólo de la ley, sí: desde el 6 de marzo de 2026 la distribución de las horas es facultad privativa del empleador (artículo 197) dentro de los topes de jornada. Si estaba en el convenio colectivo o en tu contrato, no: esa cláusula sobrevive por el artículo 8. Y en cualquier caso hay dos límites que no se mueven: la jornada no puede pasar de 8 horas diarias ni 48 semanales (artículo 196 y Ley 11.544), y entre el cese de una jornada y el comienzo de la otra tiene que haber una pausa no inferior a 12 horas (artículos 197 y 198). Si el horario nuevo suma horas por encima del tope, son horas suplementarias con el recargo del artículo 201.",
  },
  {
    q: "¿Esto es retroactivo?",
    a: `No. La nota de vigencia de los tres artículos dice «a partir de su publicación en el Boletín Oficial», y esa publicación es del ${VIGENCIA_REFORMA}. Lo ocurrido antes se sigue rigiendo por el texto derogado, que es exactamente lo que está en discusión en los reclamos en trámite: un accidente por una tarea prohibida ocurrido antes de esa fecha conserva la presunción del artículo 195 vía artículo 176.`,
  },
];

export default function TrabajoDeMujeresPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Trabajo de mujeres en la LCT: qué cambió con la derogación de los arts. 174, 175 y 176",
        url: "https://calcular.ar/trabajo-de-mujeres",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Trabajo de mujeres en la LCT: los arts. 174, 175 y 176 están derogados",
        descripcion:
          "El art. 207 de la Ley 27.802 derogó el Capítulo I del Título VII de la LCT sin fecha diferida: descanso al mediodía, prohibición de trabajo a domicilio y prohibición de tareas penosas, peligrosas o insalubres. Qué quedó en pie y qué se perdió con la remisión al art. 195.",
        url: "/trabajo-de-mujeres",
        modificado: TRABAJO_MUJERES_FUENTES.consultadoEl,
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
          Trabajo de mujeres: los tres artículos de la LCT que dejaron de existir el{" "}
          {VIGENCIA_REFORMA}
        </h1>
        <p className="text-zinc-600">
          No cayó un artículo suelto: cayó el Capítulo I entero del Título VII. El texto actualizado
          de la Ley de Contrato de Trabajo pasa hoy del artículo 176 derogado directo a «CAPÍTULO II
          De la protección de la maternidad», que quedó intacto. Acá está el texto exacto de lo que
          se derogó —que InfoLEG ya no muestra—, lo que rige en su lugar y cuánto cambia tu día.
        </p>
      </header>

      <RespuestaPrimero actualizado={TRABAJO_MUJERES_FUENTES.consultadoEl}>
        <p>
          <strong>
            Los artículos 174, 175 y 176 de la LCT están derogados desde el {VIGENCIA_REFORMA}
          </strong>{" "}
          por el artículo {ARTICULO_DEROGATORIO} de la Ley 27.802, y sin fecha diferida: rigen
          derogados desde la publicación. Se cayeron el descanso de dos horas al mediodía, la
          prohibición de encargarle trabajo a domicilio a la empleada del local y la prohibición de
          ocuparla en tareas penosas, peligrosas o insalubres. <strong>Siguen en pie</strong> el
          artículo 172 (prohibición de trato discriminatorio e igual remuneración por trabajo de
          igual valor) y todo el Capítulo II de protección de la maternidad. Los topes de jornada —8
          y 48 horas, o 6 y 36 si hay insalubridad declarada— no se tocaron, pero ahora valen para
          todo el personal por igual. Lo que casi nadie publica:{" "}
          <strong>
            con el artículo 176 se perdió también la remisión al artículo 195
          </strong>
          , que presumía la responsabilidad del empleador sin admitir prueba en contrario cuando el
          accidente venía de una tarea prohibida.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuánto cambia tu día</h2>
        <p className="text-sm text-zinc-600">
          Sacar el descanso del mediodía no cambia cuántas horas trabajás —los topes nunca
          estuvieron en el artículo 174—, cambia la <em>amplitud</em>: el tiempo total entre la
          primera entrada y la última salida. Ese es el número que decide si llegás a buscar a un
          chico al colegio, y no aparece en ningún recibo.
        </p>
        <CalculadoraTrabajoMujeres />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Qué decía cada artículo y qué rige hoy en su lugar
        </h2>
        <p className="text-sm text-zinc-600">
          El texto actualizado de InfoLEG ya no muestra estos artículos: sólo la nota de derogación.
          El texto que se cita es el que estuvo vigente hasta el {VIGENCIA_REFORMA}, tomado de la
          misma página oficial capturada antes de la reforma y cruzado contra el texto original de
          la Ley 20.744.
        </p>
        <div className="space-y-4">
          {TEXTOS_DEROGADOS.map((a) => (
            <div key={a.articulo} className="space-y-2">
              <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
                <p className="text-sm font-semibold text-zinc-800">
                  LCT, art. {a.articulo} — {a.epigrafe}{" "}
                  <span className="font-normal text-rose-700">(derogado)</span>
                </p>
                <p className="mt-1 text-sm italic text-zinc-700">«{a.texto}»</p>
                <p className="mt-2 text-xs text-zinc-500">{NOTA_DEROGACION}</p>
              </blockquote>
              <p className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 text-sm text-zinc-700">
                <span className="font-semibold text-zinc-900">Lo que rige hoy: </span>
                {a.loQueRigeHoy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Lo que quedó en pie en el mismo título</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 172 — sin una sola modificación
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS_VIGENTES.art172}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 195 — la presunción que ya no alcanza al trabajo de mujeres
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS_VIGENTES.art195}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              El artículo sigue vigente, pero alcanza a «una persona trabajadora comprendida en el
              presente título», que es el Título VIII, de trabajo de menores. El puente hacia el
              trabajo de mujeres era la última oración del artículo 176, y esa oración se derogó.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 200 — jornada en tareas declaradas insalubres
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS_VIGENTES.art200Insalubre}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 8 — por qué el convenio puede salvar el descanso
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS_VIGENTES.art8}»</p>
          </blockquote>
          <p className="rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 shadow-sm">
            El artículo 173 del mismo capítulo, que prohibía el trabajo nocturno de mujeres, ya
            estaba derogado desde 1991: «{TEXTOS_VIGENTES.art173Nota}». Con la caída de los otros
            tres, del Capítulo I sólo sobrevive el artículo 172.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El otro movimiento del mismo día: el trabajo a domicilio
        </h2>
        <p className="text-sm text-zinc-600">
          La Ley 27.802 no se limitó a borrar la prohibición del artículo 175. En su Título IX
          reescribió el régimen de trabajo a domicilio de la Ley 12.713, que es de 1941 y casi nunca
          se cita.
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {TRABAJO_A_DOMICILIO_12713.map((t) => (
            <li
              key={t.articulo}
              className="rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-600 shadow-sm"
            >
              <span className="font-semibold text-zinc-900">
                Art. {t.articulo} de la Ley 27.802
              </span>{" "}
              — sustituye el {t.sustituye}. {t.que}
            </li>
          ))}
        </ul>
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
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Otras páginas de esta misma reforma</h2>
        <p className="text-sm text-zinc-600">
          El artículo {ARTICULO_DEROGATORIO} de la Ley 27.802 derogó nueve artículos de la LCT de
          una sola vez, todos sin fecha diferida. Otro de ellos, el 113, ya tiene página:{" "}
          <Link href="/propinas" className="font-medium text-emerald-700 hover:underline">
            las propinas dejaron de ser remuneración
          </Link>
          . Y el mismo día se reescribieron{" "}
          <Link href="/horas-extras" className="font-medium text-emerald-700 hover:underline">
            las horas extras y el banco de horas
          </Link>
          ,{" "}
          <Link href="/periodo-de-prueba" className="font-medium text-emerald-700 hover:underline">
            el período de prueba
          </Link>{" "}
          y{" "}
          <Link href="/tiempo-parcial" className="font-medium text-emerald-700 hover:underline">
            la media jornada
          </Link>
          . Si lo que buscabas es la licencia por embarazo, esa parte no se tocó:{" "}
          <Link
            href="/licencia-por-maternidad"
            className="font-medium text-emerald-700 hover:underline"
          >
            la calculadora de licencia por maternidad
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {TRABAJO_MUJERES_FUENTES.lista.map((f) => (
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
          <li>
            <a
              href={FUENTE_TEXTO_ANTERIOR.urlArchivada}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              Texto de los arts. 174, 175 y 176 antes de la derogación
            </a>{" "}
            — {FUENTE_TEXTO_ANTERIOR.detalle}
          </li>
        </ul>
        <p className="pt-2">
          Esta página aplica el texto actualizado de la Ley de Contrato de Trabajo publicado en
          InfoLEG y el texto oficial de la Ley 27.802, no un resumen de prensa. Es informativa y
          orientativa: no reemplaza el asesoramiento de un profesional. Consultada el{" "}
          {TRABAJO_MUJERES_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
