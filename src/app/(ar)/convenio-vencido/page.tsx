import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraConvenioVencido } from "@/components/CalculadoraConvenioVencido";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  CAMBIOS,
  CONSULTADO_EL,
  FUENTES,
  LEY_27802,
  PLAZO_ART_137,
  TEXTOS,
  VIGENCIA_DNU_70,
  VIGENCIA_REFORMA,
} from "@/data/convenio-vencido";

const fechaLarga = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const metadata: Metadata = {
  title: "Convenio colectivo vencido: qué te sigue aplicando",
  description:
    "La Ley 27.802 amplió la ultraactividad y puso el convenio de empresa por encima del de actividad. Qué beneficios siguen con el convenio vencido.",
  alternates: { canonical: "/convenio-vencido" },
  openGraph: {
    title: "La reforma no terminó con la ultraactividad: la amplió",
    description:
      "El texto que la eliminaba era el del DNU 70/2023. La Ley 27.802 sostiene lo que sobrevive y le suma los beneficios otorgados al trabajador; lo que borró es la prórroga por decreto del Poder Ejecutivo.",
    url: "https://calcular.ar/convenio-vencido",
    images: [
      {
        url: "/og?t=Convenio%20vencido&s=La%20reforma%20amplio%20la%20ultraactividad%2C%20no%20la%20elimino",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "Mi convenio colectivo está vencido. ¿Me sigue aplicando?",
    a: "En parte, y esa parte está escrita. El art. 6 de la Ley 14.250 mantiene vivas las cláusulas normativas (las condiciones y beneficios individuales directos del trabajo y los beneficios otorgados al trabajador) hasta que empiece a regir un convenio nuevo o haya un acuerdo de partes que lo prorrogue. Las cláusulas obligacionales, las que obligan a las partes firmantes entre sí, siguen solo si las partes lo acuerdan.",
  },
  {
    q: "¿La reforma laboral eliminó la ultraactividad?",
    a: `No, y esa frase habla de otra norma. El que recortó la ultraactividad fue el art. 86 del DNU 70/2023, vigente desde el ${VIGENCIA_DNU_70}: dejaba vivas solo «las normas referidas a las condiciones de trabajo». El art. 131 de la Ley 27.802 mantuvo esa frase y le AGREGÓ «y beneficios individuales directos del trabajo y los beneficios otorgados para el trabajador». Hoy un convenio vencido conserva más cosas que entre diciembre de 2023 y marzo de 2026.`,
  },
  {
    q: "Entonces, ¿qué sacó la Ley 27.802 del art. 6?",
    a: "La prórroga por decreto. El texto anterior permitía que las cláusulas obligacionales siguieran «por acuerdo de partes o por la específica prórroga dispuesta por el Poder Ejecutivo Nacional». El vigente dice, corto: «mantendrán su vigencia sólo por acuerdo de partes». El Poder Ejecutivo perdió esa facultad, y es el cambio del que casi nadie habla.",
  },
  {
    q: "¿Qué es una cláusula normativa y qué es una obligacional?",
    a: "La ley define a las primeras por lo que contienen (condiciones y beneficios individuales directos del trabajo, y beneficios otorgados al trabajador) y a las segundas por descarte: «el resto de las cláusulas». En la práctica, lo normativo es lo que le llega a cada trabajador (escalas, adicionales, jornada, licencias del convenio). Lo obligacional es lo que se deben entre sí las partes que firmaron (aportes a la entidad, paritarias, paz social, facilidades sindicales). En qué grupo cae una cláusula puntual se discute caso por caso: la ley da el criterio, no la lista.",
  },
  {
    q: "Me alcanzan el convenio de actividad y uno de empresa. ¿Cuál me aplica?",
    a: `Desde el ${VIGENCIA_REFORMA}, el de empresa. El art. 19 vigente (texto del art. 136 de la Ley 27.802) dice que «un convenio de ámbito menor, prevalece, dentro de su ámbito de representación personal y territorial, frente a otro convenio de ámbito mayor, anterior o posterior». No se mira cuál es más favorable: gana aunque sea peor.`,
  },
  {
    q: "¿Antes no ganaba el más favorable?",
    a: "Sí, y es el gran cambio. El texto anterior del art. 19 inc. b) decía que un convenio de otro ámbito modificaba al anterior «en tanto establezca condiciones más favorables para el trabajador», y agregaba que «la comparación de ambos convenios deberá ser efectuada por instituciones» (tema por tema, no comparando los paquetes completos). Las dos frases desaparecieron. El inciso a) también se endureció: pasó de «puede modificar» a «modifica en cualquier sentido».",
  },
  {
    q: "¿Un convenio de empresa puede empeorar mis condiciones respecto del de actividad?",
    a: "Frente al convenio de actividad, sí: es justo lo que permite el art. 19 vigente. Lo que no puede es bajar del piso de la ley ni del de tu contrato individual. El art. 8, que la reforma no tocó, sigue diciendo que aplicar los convenios colectivos «no podrá afectar las condiciones más favorables a los trabajadores, estipuladas en sus contratos individuales de trabajo».",
  },
  {
    q: "¿Quién decide ahora cómo se articulan los convenios?",
    a: "Se dio vuelta. El art. 18 anterior le daba al convenio de ámbito mayor la facultad de fijar cómo se articulan y de delegarle temas al menor. El vigente arranca al revés: «Los Convenios Colectivos de ámbito mayor no podrán modificar ni disponer el contenido de los convenios de ámbito menor», y el que puede fijar cómo se articulan es el convenio de empresa.",
  },
  {
    q: "¿Hay un plazo para renegociar los convenios vencidos?",
    a: `Sí, pero no es para vos: es para el Estado. El art. 137 de la Ley 27.802 le da a la Secretaría de Trabajo, Empleo y Seguridad Social «el plazo de un (1) año contado desde la promulgación de la presente ley» para llamar a las partes a negociar, renegociar o ratificar las cláusulas de los convenios vencidos. La ley se promulgó el ${fechaLarga(LEY_27802.promulgacion)} por el ${LEY_27802.decretoPromulgatorio}, así que el plazo vence el ${fechaLarga(PLAZO_ART_137)}. Es un día antes de lo que da la cuenta si se usa la fecha del Boletín Oficial, que es la que se suele tomar.`,
  },
  {
    q: "¿Le pueden suspender la homologación a mi convenio?",
    a: "Es lo nuevo y lo más delicado del art. 137. Cualquiera de las partes habilitadas puede pedir que se suspendan los efectos de la homologación de un convenio cuyas cláusulas normativas siguen vigentes solo por ultraactividad. Tiene que alegar y demostrar de forma rápida que aplicarlo «genera distorsiones económicas graves que afecten el interés general». La suspensión dura hasta que la paritaria del convenio nuevo termine su trabajo.",
  },
  {
    q: "¿Y si nadie llama a negociar?",
    a: "Sigue en pie el art. 11, que la reforma no tocó: vencido el convenio, o en los sesenta días antes de que venza, la autoridad tiene que abrir la negociación si cualquiera de las partes interesadas lo pide. Lo que sí desapareció es el art. 21, que obligaba al Estado a armar un sistema voluntario de mediación, conciliación y arbitraje justo para los convenios en ultraactividad. Lo derogó el art. 211 de la Ley 27.802.",
  },
];

export default function ConvenioVencidoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Convenio colectivo vencido: ultraactividad y orden de prelación (Ley 14.250)",
        url: "https://calcular.ar/convenio-vencido",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo:
          "Convenio colectivo vencido: qué sobrevive, qué cae y cuál de dos convenios prevalece",
        descripcion:
          "El art. 6 de la Ley 14.250 en sus tres redacciones, el orden de prelación invertido por el art. 136 de la Ley 27.802 y el plazo del art. 137, contado desde la promulgación.",
        url: "/convenio-vencido",
        modificado: CONSULTADO_EL,
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
          Mi convenio colectivo está vencido: ¿qué me sigue aplicando?
        </h1>
        <p className="text-zinc-600">
          Te sigue aplicando la parte <strong>normativa</strong> (lo que te llega a vos) y se cae la{" "}
          <strong>obligacional</strong>, salvo que las partes acuerden otra cosa. Y hay algo que
          casi todos los medios contaron mal: la Ley 27.802{" "}
          <strong>no eliminó la ultraactividad</strong>. La amplió.
        </p>
      </header>

      <RespuestaPrimero actualizado={CONSULTADO_EL}>
        <p>
          El art. 6 de la Ley 14.250 mantiene vivas las <strong>cláusulas normativas</strong> del
          convenio vencido («las condiciones y beneficios individuales directos del trabajo y los
          beneficios otorgados para el trabajador») hasta que empiece a regir un convenio nuevo o
          haya acuerdo de partes. Las <strong>obligacionales</strong> siguen{" "}
          <strong>solo por acuerdo de partes</strong>. La frase «beneficios individuales directos»{" "}
          <strong>no estaba</strong> en el texto anterior: la agregó el art. 131 de la Ley 27.802.
          Lo que la reforma sí borró es la <strong>prórroga por decreto</strong> del Poder Ejecutivo.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Resolvé tu caso</h2>
        <p className="text-sm text-zinc-600">
          Son dos preguntas distintas: qué sigue vigente de un convenio vencido, y cuál de dos
          convenios gana cuando los dos te alcanzan. En las dos, <strong>la fecha decide la
          regla</strong>, porque el {VIGENCIA_REFORMA} cambió el texto de los dos artículos.
        </p>
        <CalculadoraConvenioVencido />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La comparación que nadie publicó: la reforma agregó, no sacó
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 6 ANTERIOR: texto del art. 86 del DNU 70/2023 ({VIGENCIA_DNU_70})
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art6Anterior}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 6 VIGENTE: texto del art. 131 de la Ley 27.802 ({VIGENCIA_REFORMA})
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art6Vigente}»</p>
          </blockquote>
        </div>
        <p className="text-sm text-zinc-600">
          Los dos textos tienen la misma base: solo siguen las cláusulas normativas, y las
          obligacionales necesitan acuerdo. Hay dos diferencias, y van para lados opuestos. La
          primera <strong>amplía</strong> lo que sigue vigente: donde el DNU decía solo «las
          condiciones de trabajo», la ley vigente dice «las condiciones{" "}
          <strong>y beneficios individuales directos</strong> del trabajo{" "}
          <strong>y los beneficios otorgados para el trabajador</strong>». La segunda{" "}
          <strong>quita una vía</strong>: desaparece «o por la específica prórroga dispuesta por el
          Poder Ejecutivo Nacional». Hoy un convenio vencido conserva más que en 2024, y el
          Ejecutivo perdió la herramienta que tenía para prorrogar el resto.
        </p>
        <p className="text-sm text-zinc-600">
          ¿Por qué se cuenta al revés? InfoLEG muestra el texto <em>vigente</em>, y las notas de
          2023 y 2024 (escritas sobre el DNU) siguen apareciendo en Google con «el fin de la
          ultraactividad». Cada cosa es cierta por separado, pero juntas confunden. Los estatutos
          que sí se derogan están en{" "}
          <Link
            href="/blog/estatutos-laborales-derogados-2027"
            className="font-medium text-emerald-700 hover:underline"
          >
            los estatutos laborales que caen en 2027
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El orden de prelación se dio vuelta: el convenio de empresa le gana al de actividad
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">Art. 19 ANTERIOR (t.o. 2004)</p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art19Anterior}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 19 VIGENTE: art. 136 de la Ley 27.802
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art19Vigente}»</p>
          </blockquote>
        </div>
        <p className="text-sm text-zinc-600">
          Cambiaron tres cosas de una vez. El inciso a) pasó de «puede modificar» a{" "}
          <strong>«modifica en cualquier sentido»</strong>. El inciso b) dejó de mirar cuál es{" "}
          <strong>más favorable</strong> y ahora mira el <strong>ámbito</strong>: gana el menor,
          «anterior o posterior». Y desapareció la regla de comparar «por instituciones», que
          impedía compensar un retroceso en un tema con una mejora en otro. El piso que queda es el
          de la ley y el del contrato individual (art. 8), no el del convenio de actividad.
        </p>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Art. 18 VIGENTE: art. 135 de la Ley 27.802
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art18Vigente}»</p>
          <p className="mt-2 text-sm text-zinc-700">
            El artículo anterior empezaba diciendo lo contrario: que los convenios{" "}
            <em>de ámbito mayor</em> podían fijar cómo se articulan, definir sus temas propios y
            delegarle temas al menor. El menor solo podía tratar lo delegado, lo que no se había
            tratado, lo propio de la organización de la empresa o condiciones más favorables. La
            facultad cambió de manos.
          </p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El plazo del art. 137, y por qué vence el {fechaLarga(PLAZO_ART_137)}
        </h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Ley 27.802, art. 137, primer párrafo</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art137}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          El plazo corre <strong>«desde la promulgación»</strong>, no desde la publicación, y son
          fechas distintas: la ley se sancionó el {fechaLarga(LEY_27802.sancion)}, se promulgó el{" "}
          {fechaLarga(LEY_27802.promulgacion)} por el {LEY_27802.decretoPromulgatorio} y se publicó
          el {fechaLarga(LEY_27802.boletinOficial)}. Si contás desde el Boletín Oficial (lo más
          común, porque es la fecha que aparece en todas las citas), el vencimiento se corre un día.
        </p>
        <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Art. 137, segundo párrafo: la suspensión de la homologación
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art137Suspension}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Es una herramienta nueva y apunta justo a los convenios que siguen vivos por
          ultraactividad. Y reemplaza algo que buscaba resolver lo mismo desde el lado opuesto: el
          art. 21 de la Ley 14.250, <strong>derogado</strong> por el art. 211, obligaba al Estado a
          armar «un mecanismo voluntario de mediación, conciliación y arbitraje, destinado a superar
          la falta de acuerdo entre las partes para la renovación de dichos convenios». Se pasó de
          ayudar a que haya acuerdo a permitir la suspensión. Cómo tiene que ser esa negociación
          está en{" "}
          <Link href="/negociacion-de-buena-fe" className="font-medium text-emerald-700 hover:underline">
            la negociación de buena fe
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los ocho cambios del Título XIV, en orden</h2>
        <div className="space-y-3">
          {CAMBIOS.map((c) => (
            <details key={c.articulo} className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-zinc-800">
                Ley 14.250, {c.articulo}: {c.titulo}
              </summary>
              <p className="mt-2 text-sm text-zinc-600">{c.resumen}</p>
              <p className="mt-2 text-xs text-zinc-500">
                Por el {c.por} de la Ley 27.802.
              </p>
            </details>
          ))}
        </div>
        <p className="text-sm text-zinc-500">
          Los topes del art. 9° (0,5% y 2%) están explicados y calculados en{" "}
          <Link href="/descuentos-del-sueldo" className="font-medium text-emerald-700 hover:underline">
            los descuentos del sueldo
          </Link>
          . Las escalas vigentes por gremio, verificadas contra la circular oficial, están en{" "}
          <Link href="/convenios" className="font-medium text-emerald-700 hover:underline">
            convenios colectivos
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Lo que no cambió, y conviene tener a mano
        </h2>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Ley 14.250, art. 11: cómo se obliga a empezar la negociación
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art11}»</p>
        </blockquote>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Ley 14.250, art. 8: el piso del contrato individual
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art8}»</p>
        </blockquote>
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

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {FUENTES.map((f) => (
            <li key={f.url}>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                {f.titulo}
              </a>
            </li>
          ))}
        </ul>
        <p className="pt-2">
          El texto vigente sale de InfoLEG. El texto anterior, de la captura del 1/6/2025 de la
          misma norma (InfoLEG publica solo la versión vigente, así que la comparación no se puede
          hacer en su sitio). Las fechas de sanción y promulgación, del Boletín Oficial. Esta página
          es informativa: publica el criterio legal y la comparación, no dónde encaja tu cláusula
          concreta, que se discute caso por caso. Consultada el {CONSULTADO_EL}.
        </p>
      </section>
    </article>
  );
}
