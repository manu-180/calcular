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
    "La Ley 27.802 no eliminó la ultraactividad: la amplió. El art. 131 le agregó al convenio vencido «los beneficios individuales directos del trabajo y los beneficios otorgados para el trabajador», y lo que sacó fue la prórroga por decreto. Además dio vuelta el orden de prelación: el convenio de empresa le gana al de actividad.",
  alternates: { canonical: "/convenio-vencido" },
  openGraph: {
    title: "La reforma no terminó con la ultraactividad — la amplió",
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
    a: "En parte, y la parte está escrita. El art. 6 de la Ley 14.250 mantiene subsistentes las cláusulas normativas —las condiciones y beneficios individuales directos del trabajo y los beneficios otorgados al trabajador— hasta que entre en vigencia una convención nueva o haya un acuerdo de partes que la prorrogue. Las cláusulas obligacionales, las que obligan a las partes firmantes entre sí, mantienen su vigencia sólo por acuerdo de partes.",
  },
  {
    q: "¿La reforma laboral eliminó la ultraactividad?",
    a: `No, y esa frase describe otra norma. El texto que recortó la ultraactividad fue el art. 86 del DNU 70/2023, vigente desde el ${VIGENCIA_DNU_70}: dejaba subsistentes sólo «las normas referidas a las condiciones de trabajo». El art. 131 de la Ley 27.802 conservó esa frase y le AGREGÓ «y beneficios individuales directos del trabajo y los beneficios otorgados para el trabajador». Un convenio vencido conserva hoy más cosas que entre diciembre de 2023 y marzo de 2026.`,
  },
  {
    q: "Entonces, ¿qué sacó la Ley 27.802 del art. 6?",
    a: "La prórroga por decreto. El texto anterior admitía que las cláusulas obligacionales siguieran «por acuerdo de partes o por la específica prórroga dispuesta por el Poder Ejecutivo Nacional». El vigente dice, seco: «mantendrán su vigencia sólo por acuerdo de partes». El Poder Ejecutivo se quedó sin esa facultad, y es el cambio del que casi no se habla.",
  },
  {
    q: "¿Qué es una cláusula normativa y qué es una obligacional?",
    a: "La ley define a las primeras por su contenido —condiciones y beneficios individuales directos del trabajo, y beneficios otorgados al trabajador— y a las segundas por resta: «el resto de las cláusulas». En la práctica, lo normativo es lo que llega al trabajador individual (escalas, adicionales, jornada, licencias del convenio) y lo obligacional es lo que se deben las partes firmantes entre sí (aportes a la entidad, paritarias, paz social, facilidades sindicales). El encuadre de una cláusula puntual se discute caso por caso: la ley da el criterio, no la lista.",
  },
  {
    q: "Me alcanzan el convenio de actividad y uno de empresa. ¿Cuál me aplica?",
    a: `Desde el ${VIGENCIA_REFORMA}, el de empresa. El art. 19 vigente —texto del art. 136 de la Ley 27.802— dice que «un convenio de ámbito menor, prevalece, dentro de su ámbito de representación personal y territorial, frente a otro convenio de ámbito mayor, anterior o posterior». No hay test de favorabilidad: prevalece aunque sea peor.`,
  },
  {
    q: "¿Antes no ganaba el más favorable?",
    a: "Sí, y ese es el cambio grande. El texto anterior del art. 19 inc. b) decía que un convenio de ámbito distinto modificaba al anterior «en tanto establezca condiciones más favorables para el trabajador», y agregaba que «la comparación de ambos convenios deberá ser efectuada por instituciones» —institución por institución, no comparando los paquetes completos—. Las dos frases desaparecieron. El inciso a) también se endureció: pasó de «puede modificar» a «modifica en cualquier sentido».",
  },
  {
    q: "¿Un convenio de empresa puede empeorar mis condiciones respecto del de actividad?",
    a: "Respecto del convenio de actividad, sí: eso es exactamente lo que habilita el art. 19 vigente. Lo que no puede es bajar del piso de la ley ni del de tu contrato individual: el art. 8, que la reforma no tocó, mantiene que la aplicación de las convenciones colectivas «no podrá afectar las condiciones más favorables a los trabajadores, estipuladas en sus contratos individuales de trabajo».",
  },
  {
    q: "¿Quién decide ahora cómo se articulan los convenios?",
    a: "Se dio vuelta. El art. 18 anterior ponía al convenio de ámbito mayor a establecer las formas de articulación y a delegarle materias al menor. El vigente arranca al revés: «Los Convenios Colectivos de ámbito mayor no podrán modificar ni disponer el contenido de los convenios de ámbito menor», y quien puede establecer formas de articulación es el convenio de empresa.",
  },
  {
    q: "¿Hay un plazo para renegociar los convenios vencidos?",
    a: `Sí, y no es para vos: es para el Estado. El art. 137 de la Ley 27.802 le da a la Secretaría de Trabajo, Empleo y Seguridad Social «el plazo de un (1) año contado desde la promulgación de la presente ley» para convocar a las partes a negociar, renegociar o ratificar las cláusulas de los convenios vencidos. La ley se promulgó el ${fechaLarga(LEY_27802.promulgacion)} por el ${LEY_27802.decretoPromulgatorio}, así que el plazo vence el ${fechaLarga(PLAZO_ART_137)} — un día antes de lo que da la cuenta si se toma la fecha del Boletín Oficial, que es la que se suele usar.`,
  },
  {
    q: "¿Le pueden suspender la homologación a mi convenio?",
    a: "Es la parte nueva y la más filosa del art. 137. Cualquiera de las partes legitimadas puede pedir que se suspendan los efectos del acto de homologación de un convenio cuyas cláusulas normativas estén vigentes sólo por ultraactividad, alegando y demostrando sumariamente que su aplicación «genera distorsiones económicas graves que afecten el interés general». La suspensión dura hasta que la paritaria del convenio nuevo termine su trabajo.",
  },
  {
    q: "¿Y si nadie llama a negociar?",
    a: "Sigue en pie el art. 11, que la reforma no tocó: vencido el convenio, o dentro de los sesenta días anteriores a su vencimiento, la autoridad debe disponer el inicio de las negociaciones a solicitud de cualquiera de las partes interesadas. Lo que sí desapareció es el art. 21, que obligaba al Estado a montar un mecanismo voluntario de mediación, conciliación y arbitraje justamente para los convenios en ultraactividad: lo derogó el art. 211 de la Ley 27.802.",
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
          Sigue aplicándose la parte <strong>normativa</strong> —lo que llega a vos— y cae la{" "}
          <strong>obligacional</strong> salvo acuerdo de partes. Y hay una vuelta que la cobertura
          erró casi en bloque: la Ley 27.802 <strong>no eliminó la ultraactividad</strong>. La
          amplió.
        </p>
      </header>

      <RespuestaPrimero actualizado={CONSULTADO_EL}>
        <p>
          El art. 6 de la Ley 14.250 mantiene vivas las <strong>cláusulas normativas</strong> del
          convenio vencido —«las condiciones y beneficios individuales directos del trabajo y los
          beneficios otorgados para el trabajador»— hasta que entre en vigencia un convenio nuevo o
          haya acuerdo de partes. Las <strong>obligacionales</strong> siguen{" "}
          <strong>sólo por acuerdo de partes</strong>. La frase «beneficios individuales directos»{" "}
          <strong>no estaba</strong> en el texto anterior: la agregó el art. 131 de la Ley 27.802.
          Lo que la reforma sí borró es la <strong>prórroga por decreto</strong> del Poder Ejecutivo.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Resolvé tu caso</h2>
        <p className="text-sm text-zinc-600">
          Dos preguntas distintas: qué sobrevive a un convenio vencido, y cuál de dos convenios
          prevalece cuando los dos te alcanzan. La <strong>fecha decide la regla</strong> en las dos,
          porque el {VIGENCIA_REFORMA} cambió el texto de los dos artículos.
        </p>
        <CalculadoraConvenioVencido />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El diff que nadie publicó: la reforma agregó, no sacó
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 6 ANTERIOR — texto del art. 86 del DNU 70/2023 ({VIGENCIA_DNU_70})
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art6Anterior}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 6 VIGENTE — texto del art. 131 de la Ley 27.802 ({VIGENCIA_REFORMA})
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art6Vigente}»</p>
          </blockquote>
        </div>
        <p className="text-sm text-zinc-600">
          Los dos textos comparten el esqueleto: sólo subsisten las cláusulas normativas, las
          obligacionales necesitan acuerdo. Las diferencias son exactamente dos, y van en
          direcciones opuestas. La primera <strong>ensancha</strong> lo que sobrevive: donde el DNU
          decía sólo «las condiciones de trabajo», la ley vigente dice «las condiciones{" "}
          <strong>y beneficios individuales directos</strong> del trabajo{" "}
          <strong>y los beneficios otorgados para el trabajador</strong>». La segunda{" "}
          <strong>quita una vía</strong>: desaparece «o por la específica prórroga dispuesta por el
          Poder Ejecutivo Nacional». Un convenio vencido conserva hoy más de lo que conservaba en
          2024, y el Ejecutivo perdió la llave que tenía para prorrogar el resto.
        </p>
        <p className="text-sm text-zinc-600">
          Por qué se cuenta al revés: InfoLEG muestra el texto <em>vigente</em>, y las notas de 2023
          y 2024 —escritas sobre el DNU— siguen indexadas describiendo «el fin de la
          ultraactividad». Las dos cosas son ciertas por separado y falsas juntas.
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
              Art. 19 VIGENTE — art. 136 de la Ley 27.802
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art19Vigente}»</p>
          </blockquote>
        </div>
        <p className="text-sm text-zinc-600">
          Tres cosas cambiaron de una vez. El inciso a) pasó de «puede modificar» a{" "}
          <strong>«modifica en cualquier sentido»</strong>. El inciso b) reemplazó el criterio de{" "}
          <strong>favorabilidad</strong> por el de <strong>ámbito</strong>: prevalece el menor,
          «anterior o posterior». Y desapareció la regla de comparación «por instituciones», que era
          la que impedía compensar un retroceso en una institución con una mejora en otra. El piso
          que queda es el de la ley y el del contrato individual (art. 8), no el del convenio de
          actividad.
        </p>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Art. 18 VIGENTE — art. 135 de la Ley 27.802
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art18Vigente}»</p>
          <p className="mt-2 text-sm text-zinc-700">
            El artículo anterior empezaba diciendo lo contrario: que los convenios{" "}
            <em>de ámbito mayor</em> podían establecer las formas de articulación, determinar sus
            materias propias y delegarle materias al menor, que sólo podía tratar lo delegado, lo no
            tratado, lo propio de la organización de la empresa o condiciones más favorables. La
            facultad cambió de manos.
          </p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El reloj del art. 137 — y por qué vence el {fechaLarga(PLAZO_ART_137)}
        </h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Ley 27.802, art. 137, primer párrafo</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art137}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          El plazo corre <strong>«desde la promulgación»</strong>, no desde la publicación, y son
          fechas distintas: la ley se sancionó el {fechaLarga(LEY_27802.sancion)}, se promulgó el{" "}
          {fechaLarga(LEY_27802.promulgacion)} por el {LEY_27802.decretoPromulgatorio} y se publicó
          el {fechaLarga(LEY_27802.boletinOficial)}. Contar desde el Boletín Oficial —que es lo
          natural, porque es la fecha que figura en todas las citas— corre el vencimiento un día.
        </p>
        <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Art. 137, segundo párrafo — la suspensión de la homologación
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art137Suspension}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Es una herramienta nueva y va justo contra los convenios que viven de la ultraactividad. Y
          reemplaza a algo que apuntaba al mismo problema por el lado opuesto: el art. 21 de la Ley
          14.250, <strong>derogado</strong> por el art. 211, obligaba al Estado a montar «un
          mecanismo voluntario de mediación, conciliación y arbitraje, destinado a superar la falta
          de acuerdo entre las partes para la renovación de dichos convenios». Se pasó de facilitar
          el acuerdo a habilitar la suspensión.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los ocho cambios del Título XIV, en orden</h2>
        <div className="space-y-3">
          {CAMBIOS.map((c) => (
            <details key={c.articulo} className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-zinc-800">
                Ley 14.250, {c.articulo} — {c.titulo}
              </summary>
              <p className="mt-2 text-sm text-zinc-600">{c.resumen}</p>
              <p className="mt-2 text-xs text-zinc-500">
                Por el {c.por} de la Ley 27.802.
              </p>
            </details>
          ))}
        </div>
        <p className="text-sm text-zinc-500">
          Los topes del art. 9° —0,5% y 2%— están explicados y calculados en{" "}
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
            Ley 14.250, art. 11 — cómo se fuerza el inicio de la negociación
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.art11}»</p>
        </blockquote>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Ley 14.250, art. 8 — el piso del contrato individual
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
          El texto vigente sale de InfoLEG; el texto anterior, de la captura del 1/6/2025 de la misma
          norma —InfoLEG publica sólo la versión vigente, así que la comparación no se puede hacer en
          su sitio—; y las fechas de sanción y promulgación, del Boletín Oficial. Esta página es
          informativa y orientativa: publica el criterio legal y el diff, no el encuadre de tu
          cláusula concreta, que se discute caso por caso. Consultada el {CONSULTADO_EL}.
        </p>
      </section>
    </article>
  );
}
