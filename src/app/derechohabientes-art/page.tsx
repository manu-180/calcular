import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraDerechohabientes } from "@/components/CalculadoraDerechohabientes";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { SelloVerificado } from "@/components/SelloVerificado";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ANIOS_CONVIVENCIA,
  ANIOS_CONVIVENCIA_CON_HIJOS,
  DH_FUENTES,
  DH_TEXTOS,
  EDAD_TOPE_LRT,
  EDAD_TOPE_LRT_ESTUDIANTE,
  EDAD_TOPE_SIPA,
  ESCALONES,
  INCISOS_ART53,
  VIGENCIA_ART18,
} from "@/data/derechohabientes-art";

export const metadata: Metadata = {
  title: "Quién cobra la indemnización por muerte laboral: las dos listas",
  description:
    "Una muerte de trabajo genera dos indemnizaciones con dos listas distintas de beneficiarios: la de la ART (art. 18 de la Ley 24.557) y la del empleador (art. 248 de la LCT). Cargá el grupo familiar y mirá quién cobra cada una.",
  alternates: { canonical: "/derechohabientes-art" },
  openGraph: {
    title: "Derechohabientes de la ART: quién cobra cuando la muerte es laboral",
    description:
      "Dos indemnizaciones, dos listas. Un conviviente de tres años cobra una y no la otra. Persona por persona, con la norma que lo decide.",
    url: "https://calcular.ar/derechohabientes-art",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Derechohabientes de la ART")}&s=${encodeURIComponent("Art. 18 de la Ley 24.557 · quién cobra la muerte laboral")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Quiénes son los derechohabientes de la ART cuando un trabajador muere?",
    a: `Los que enumera el art. 53 de la Ley 24.241: cónyuge, conviviente e hijos. El art. 18 de la Ley 24.557 remite a esa lista, pero le cambia una cosa: el límite de edad de los hijos, que en el régimen previsional es de ${EDAD_TOPE_SIPA} años, se extiende a ${EDAD_TOPE_LRT}, y a ${EDAD_TOPE_LRT_ESTUDIANTE} si son estudiantes a cargo exclusivo del trabajador fallecido. Si no hay ninguno de ellos, cobran los padres en partes iguales; y si ambos padres murieron, los familiares que acrediten haber estado a cargo.`,
  },
  {
    q: "¿Es la misma lista que la del art. 248 de la LCT?",
    a: "No, y ahí está el error más común. Son dos indemnizaciones distintas, con dos pagadores distintos y dos listas distintas: la del art. 248 la paga el empleador, la del art. 18 la paga la ART. El propio art. 248 aclara que su indemnización «es independiente de la que se reconozca a los causahabientes del trabajador por el Sistema de Riesgos del Trabajo». Se cobran las dos, y puede pasar que alguien cobre una y no la otra.",
  },
  {
    q: "Convivo con el trabajador desde hace tres años. ¿Cobro?",
    a: `La del empleador sí; la de la ART no. El art. 248 de la LCT nombra al «cónyuge o conviviente» sin pedirle un plazo. El art. 53 de la Ley 24.241, al que remite la LRT, exige convivencia pública en aparente matrimonio durante al menos ${ANIOS_CONVIVENCIA} años inmediatamente anteriores al fallecimiento, que bajan a ${ANIOS_CONVIVENCIA_CON_HIJOS} cuando hay descendencia reconocida por ambos convivientes. Con tres años y sin hijos en común, falta el plazo.`,
  },
  {
    q: "Mi papá tenía una caja provincial, no ANSES. ¿Cambia quiénes cobran?",
    a: "No, y eso lo dice el reglamento, no la ley. El art. 7º del Decreto 334/96 —el que reglamenta el art. 18— aclara que los derechohabientes son los del art. 53 de la Ley 24.241 «cualquiera fuera el régimen al que el damnificado estuviera afiliado». Para cobrarle a la ART se mira siempre esa lista.",
  },
  {
    q: "Hay cónyuge y conviviente al mismo tiempo. ¿Quién cobra?",
    a: "Depende, y el texto sólo resuelve dos supuestos. Si el cónyuge fue declarado culpable de la separación personal o del divorcio, el conviviente lo excluye. Si el trabajador pagaba alimentos, se los habían demandado, o dio causa a la separación o al divorcio, cobran los dos por partes iguales. El caso restante —cónyuge no culpable, sin alimentos ni causa— la norma no lo resuelve: lo define un juez.",
  },
  {
    q: "No quedó nadie de la familia directa. ¿Cobra un hermano?",
    a: "El art. 18 lo prevé: fallecidos ambos padres, la prestación corresponde en partes iguales a los familiares que acrediten haber estado a cargo del trabajador. Pero ese escalón tiene un hueco: la misma norma dice que «la reglamentación determinará el grado de parentesco requerido», y el decreto reglamentario de la ley —el 334/96— no lo determina. Hasta dónde llega «familiar» ahí no lo define el reglamento.",
  },
  {
    q: "¿Cuánto cobran los derechohabientes?",
    a: "La prestación del segundo párrafo del art. 15 ap. 2, más la compensación adicional de pago único del art. 11 ap. 4 inc. c), más el 20% del art. 3 de la Ley 26.773. Los montos y los pisos vigentes están en la calculadora de indemnización por accidente de trabajo. Lo que el art. 18 no dice es cómo se reparte ese pago único entre varios derechohabientes: la ley fija quiénes son y en qué orden, no el porcentaje de cada uno.",
  },
  {
    q: "Mi hijo ya cobra una pensión. ¿Puede cobrar también esta?",
    a: "Tiene que optar. El inciso e) del art. 53 pide que el hijo «no gozara de jubilación, pensión, retiro o prestación no contributiva, salvo que optaren por la pensión que acuerda la presente». O sea: puede entrar, pero eligiendo una.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Derechohabientes de la muerte laboral: las dos listas que casi nadie distingue",
        descripcion:
          "El art. 18 de la Ley 24.557 manda a la lista del art. 53 de la Ley 24.241 y le extiende la edad; el art. 248 de la LCT tiene otra lista propia. Quién cobra cada una, persona por persona.",
        url: "/derechohabientes-art",
        modificado: VIGENCIA_ART18.consultadoEl,
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
          Quién cobra cuando la muerte es laboral: son dos listas, no una
        </h1>
        <p className="text-zinc-600">
          Una muerte por accidente de trabajo o enfermedad profesional dispara{" "}
          <strong>dos indemnizaciones distintas</strong>: la que paga la ART (art. 18 de la Ley
          24.557) y la que paga el empleador (art. 248 de la LCT). Se cobran las dos —lo dice el
          propio art. 248— y <strong>cada una tiene su propia lista de beneficiarios</strong>. No
          coinciden: hay familiares que cobran una y no la otra.
        </p>
      </header>

      <SelloVerificado
        verificadoEl={VIGENCIA_ART18.consultadoEl}
        norma="Ley 24.557, art. 18 · Ley 24.241, art. 53 · Decreto 334/96, art. 7º · LCT, art. 248"
        fuente={{ nombre: DH_FUENTES[0].nombre, url: DH_FUENTES[0].url }}
      />

      <RespuestaPrimero actualizado={VIGENCIA_ART18.consultadoEl}>
        <p>
          Para la ART cobran <strong>los del art. 53 de la Ley 24.241</strong> —cónyuge, conviviente
          e hijos—, con el límite de edad{" "}
          <strong>
            extendido de {EDAD_TOPE_SIPA} a {EDAD_TOPE_LRT} años, o {EDAD_TOPE_LRT_ESTUDIANTE} si
            estudian a cargo exclusivo del trabajador
          </strong>
          . Si no hay ninguno, <strong>los padres</strong> en partes iguales; muertos ambos, los{" "}
          <strong>familiares que estaban a cargo</strong>. El conviviente necesita{" "}
          {ANIOS_CONVIVENCIA} años de convivencia ({ANIOS_CONVIVENCIA_CON_HIJOS} si hay hijos en
          común) — <strong>para la indemnización del empleador no le piden ningún plazo</strong>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cargá el grupo familiar</h2>
        <p className="text-sm text-zinc-600">
          Persona por persona sale el veredicto en los dos regímenes, con la regla que lo decide. Lo
          que aparece marcado como <em>cobra una y no la otra</em> es exactamente lo que se pierde
          cuando alguien reclama sólo por una de las dos vías.
        </p>
        <CalculadoraDerechohabientes />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El artículo que remite, y el que dice quiénes son
        </h2>
        <p className="text-zinc-600">
          La Ley de Riesgos del Trabajo no escribe su propia lista: la toma prestada y le cambia una
          cosa.
        </p>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm font-semibold text-emerald-900">Ley 24.557, art. 18 ap. 2</p>
          <p className="mt-1 text-sm text-zinc-700">«{DH_TEXTOS.art18ap2Remision}»</p>
          <p className="mt-2 text-sm text-zinc-700">«{DH_TEXTOS.art18ap2Edad}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Esa segunda oración es la que casi nunca se publica: la lista del art. 53 corta a los{" "}
          {EDAD_TOPE_SIPA} y acá se corre {EDAD_TOPE_LRT - EDAD_TOPE_SIPA} años, y{" "}
          {EDAD_TOPE_LRT_ESTUDIANTE - EDAD_TOPE_SIPA} para el estudiante. Un hijo de{" "}
          {EDAD_TOPE_LRT - 1} años que en el régimen previsional ya no cobraría, acá sí.
        </p>
        <ul className="space-y-2">
          {INCISOS_ART53.map((i) => (
            <li key={i.inciso} className="rounded-lg border border-zinc-200 bg-zinc-50/60 px-3 py-2">
              <span className="text-sm font-semibold text-zinc-900">Inciso {i.inciso})</span>{" "}
              <span className="text-sm text-zinc-700">{i.texto}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Lo que agrega el reglamento y la ley no dice
        </h2>
        <p className="text-zinc-600">
          El art. 18 se reglamentó con el art. 7º del Decreto 334/96, y ese artículo dice algo que
          no está en la ley: <strong>no importa a qué régimen previsional aportaba</strong> el
          trabajador.
        </p>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm font-semibold text-emerald-900">Decreto 334/96, art. 7º</p>
          <p className="mt-1 text-sm text-zinc-700">«{DH_TEXTOS.decreto334art7}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Una caja provincial o un régimen especial puede tener su propia lista de pensionados. Para
          cobrarle a la ART, esa lista no se usa: se usa la del art. 53.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los tres escalones, en orden</h2>
        <p className="text-zinc-600">
          Son excluyentes: el de abajo se abre sólo si el de arriba quedó vacío. Los padres no
          concurren con el cónyuge; los hermanos no concurren con los padres vivos.
        </p>
        <ol className="space-y-3">
          {ESCALONES.map((e) => (
            <li key={e.id} className="rounded-xl border border-zinc-200 bg-white p-4">
              <p className="text-sm font-bold text-zinc-900">{e.titulo}</p>
              <p className="mt-1 text-sm text-zinc-700">{e.detalle}</p>
              <p className="mt-1.5 text-xs font-medium text-emerald-700">{e.norma}</p>
            </li>
          ))}
        </ol>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="mt-0 text-sm text-zinc-700">«{DH_TEXTOS.art18ap2Padres}»</p>
          <p className="mt-2 text-sm text-zinc-700">«{DH_TEXTOS.art18ap2Familiares}»</p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El escalón que la ley mandó reglamentar y quedó sin reglamentar
        </h2>
        <p className="text-zinc-600">
          El tercer escalón —los familiares a cargo— llega con una instrucción para el Poder
          Ejecutivo:
        </p>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/70 p-4">
          <p className="text-sm font-semibold text-amber-900">Ley 24.557, art. 18 ap. 2, in fine</p>
          <p className="mt-1 text-sm text-zinc-700">«{DH_TEXTOS.art18ap2Delegacion}»</p>
        </blockquote>
        <p className="text-zinc-600">
          El decreto que reglamenta ese artículo es el 334/96, y su art. 7º —el que acabás de leer—
          no fija ningún grado de parentesco: se limita a remitir al art. 53. Lo verificamos contra
          el texto actualizado el {VIGENCIA_ART18.consultadoEl}:{" "}
          <strong>la palabra «parentesco» no aparece en el decreto</strong>. Decimos lo que
          comprobamos y nada más: el <em>decreto reglamentario de la ley</em> no lo determina. No
          afirmamos que ninguna otra norma lo haya hecho.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cónyuge y conviviente a la vez</h2>
        <p className="text-zinc-600">
          El art. 53 resuelve dos situaciones y deja una abierta. Las dos que resuelve:
        </p>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm text-zinc-700">«{DH_TEXTOS.art53Exclusion}»</p>
        </blockquote>
        <p className="text-zinc-600">
          La que deja abierta es la tercera: cónyuge no declarado culpable, sin alimentos y sin que
          el trabajador haya dado causa a la separación. Ahí la calculadora no inventa un veredicto:
          marca <strong>«lo define un juez»</strong>. Es la misma política que en el resto del
          sitio — cuando la norma no cierra, lo que se publica es el hueco, no una respuesta
          inventada.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Las dos plata no se restan: se suman</h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm font-semibold text-emerald-900">LCT, art. 248, último párrafo</p>
          <p className="mt-1 text-sm text-zinc-700">«{DH_TEXTOS.art248Independencia}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Los montos están en{" "}
          <Link href="/indemnizacion-art" className="text-emerald-700 hover:underline">
            la calculadora de indemnización por accidente de trabajo
          </Link>{" "}
          y en{" "}
          <Link href="/indemnizacion-por-fallecimiento" className="text-emerald-700 hover:underline">
            la del art. 248
          </Link>
          . Y antes de cobrarle a la ART hay una instancia obligatoria con plazos perentorios:{" "}
          <Link href="/comision-medica" className="text-emerald-700 hover:underline">
            la comisión médica
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <dl className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-zinc-200 bg-white p-4">
              <dt className="text-sm font-bold text-zinc-900">{f.q}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-zinc-700">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Fuentes</h2>
        <p className="text-sm text-zinc-600">
          Todas leídas en el texto <strong>actualizado</strong> de InfoLEG el{" "}
          {VIGENCIA_ART18.consultadoEl}. El art. 18 vigente no es el original de 1995: lo sustituyó
          el {VIGENCIA_ART18.sustituidoPor} ({VIGENCIA_ART18.boletin}).
        </p>
        <ul className="space-y-3">
          {DH_FUENTES.map((f) => (
            <li key={f.url} className="rounded-xl border border-zinc-200 bg-white p-4">
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-emerald-700 hover:underline"
              >
                {f.nombre}
              </a>
              <p className="mt-1 text-sm text-zinc-600">{f.detalle}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
