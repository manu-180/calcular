import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraLibroSueldos } from "@/components/CalculadoraLibroSueldos";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ANIOS_CONSERVACION,
  CAMBIOS_DEL_BLOQUE,
  INCISOS_LIBRO_ANTERIOR,
  LIBRO_FUENTES,
  LIBRO_TEXTOS,
  PROHIBICIONES_LIBRO_ANTERIOR,
  VIGENCIA_REFORMA,
} from "@/data/libro-sueldos";

export const metadata: Metadata = {
  title: "Libro de sueldos y presunción del art. 55: qué cambió con la Ley 27.802",
  description: `El libro especial rubricado del art. 52 de la LCT dejó de existir el ${VIGENCIA_REFORMA}: hoy la registración se hace ante ARCA. Y la presunción del art. 55 cambió de disparador — pasó de castigar no exhibir los libros a castigar no registrar. Fijate qué presunción te ampara.`,
  alternates: { canonical: "/libro-de-sueldos" },
  openGraph: {
    title: "El art. 55 cambió de disparador: de no exhibir a no registrar",
    description:
      "La Ley 27.802 reescribió los arts. 52, 53 y 55 de la LCT y derogó los arts. 54 y 61. La presunción más usada del derecho laboral argentino ya no nace de la falta de exhibición de los libros.",
    url: "https://calcular.ar/libro-de-sueldos",
    images: [
      {
        url: "/og?t=Libro%20de%20sueldos%20y%20art.%2055&s=La%20presunci%C3%B3n%20cambi%C3%B3%20de%20disparador",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Sigue existiendo el libro especial del artículo 52?",
    a: `No con esa forma. Hasta el ${VIGENCIA_REFORMA}, el art. 52 de la LCT mandaba llevar "un libro especial, registrado y rubricado, en las mismas condiciones que se exigen para los libros principales de comercio", con ocho incisos obligatorios y cuatro prohibiciones expresas. El texto vigente —sustituido por el art. 20 de la Ley 27.802— dice otra cosa: los empleadores "deberán registrar a los trabajadores ante la Agencia de Recaudación y Control Aduanero (ARCA)", y esa registración "será suficiente a todos los efectos, sin que puedan exigirse requisitos adicionales por parte de ninguna otra autoridad".`,
  },
  {
    q: "¿Cuánto tiempo hay que guardar los libros viejos?",
    a: `Diez años. El art. 52 nuevo dice que "el empleador deberá conservar los libros preexistentes durante un plazo de diez (10) años" y agrega algo que antes no estaba: "dichos libros podrán ser digitalizados y las copias digitales tendrán la misma validez legal que los originales en formato papel". El artículo no aclara desde qué día se cuentan esos ${ANIOS_CONSERVACION} años, así que conviene chequearlo con un profesional para un caso concreto.`,
  },
  {
    q: "¿Qué cambió en la presunción del artículo 55?",
    a: `El disparador, que es lo único que importa en un juicio. El epígrafe pasó de "Omisión de su exhibición" a "Omisión de registración". El texto anterior decía que la presunción nacía de "la falta de exhibición o requerimiento judicial o administrativo del libro, registro, planilla u otros elementos de contralor previstos por los artículos 52 y 54". El texto vigente dice que nace de "la falta de registración en los términos del artículo 52". Se dejó de castigar una conducta procesal —tener los libros y no traerlos— y se pasó a castigar un hecho: no haber registrado.`,
  },
  {
    q: "Mi empleador me tenía registrado pero no presentó los libros. ¿Me ampara la presunción?",
    a: `Ése es exactamente el caso que la reforma dio vuelta, y por eso esta página existe. Con el texto anterior, esa sola negativa hacía nacer la presunción a favor del trabajador. Con el texto vigente, el art. 55 no menciona la exhibición: sólo la falta de registración. Y el art. 54 —que extendía la regla a "los registros, planillas u otros elementos de contralor"— fue derogado el mismo día por el art. 207 de la misma ley. Que esa negativa siga pesando por otras vías (los arts. 53, 56 y 57, el código procesal de cada provincia) es discusión abierta; lo que la ley ya no dice es que constituya, por sí sola, la presunción del art. 55.`,
  },
  {
    q: "Estoy registrado pero con fecha de ingreso o sueldo falsos. ¿Y ahí?",
    a: 'Ahí la presunción vigente sí juega, y con buena letra: recae sobre "las circunstancias que debieron constar en el pertinente registro". Si lo que se registró mal es la fecha de ingreso o la remuneración, esas son precisamente las circunstancias que debieron constar. La registración deficiente es "falta de registración en los términos del artículo 52" respecto de lo que quedó afuera.',
  },
  {
    q: '¿Por qué tantos escritos siguen citando "arts. 52 y 54 LCT"?',
    a: `Porque así lo decía el art. 55 hasta el ${VIGENCIA_REFORMA}: remitía a los dos. La Ley 27.802 derogó el art. 54 con su art. 207 y reescribió el art. 55 con su art. 22 para que remitiera sólo al 52. Cualquier modelo de demanda, nota o resumen que siga citando esa dupla está invocando la mitad de una remisión que ya no existe.`,
  },
  {
    q: "¿Qué era el artículo 61, el de los formularios?",
    a: 'Era la regla de interpretación de la letra chica, y también fue derogado por el art. 207. Decía que "las cláusulas o rubros insertos en formularios dispuestos o utilizados por el empleador, que no correspondan al impreso, la incorporación a los mismos de declaraciones o cantidades, cancelatorias o liberatorias por más de un concepto u obligación, o diferentes períodos acumulados, se apreciarán por los jueces, en cada caso, en favor del trabajador". Era la que se invocaba contra los recibos que declaran cancelado "todo concepto" o acumulan períodos.',
  },
  {
    q: "¿La reforma es retroactiva?",
    a: `No. Los cinco artículos llevan la misma nota de vigencia: "a partir de su publicación en el Boletín Oficial", o sea el ${VIGENCIA_REFORMA}. Para un hecho anterior rige el texto anterior. La calculadora aplica el régimen que corresponde a la fecha que cargues y te muestra igual el otro, para que veas la diferencia.`,
  },
];

export default function LibroDeSueldosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Presunción del art. 55 de la LCT: qué texto te aplica",
        url: "https://calcular.ar/libro-de-sueldos",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo:
          "Libro de sueldos y presunción del art. 55 de la LCT: los cinco artículos que reescribió la Ley 27.802",
        descripcion:
          "La Ley 27.802 sustituyó los arts. 52, 53 y 55 de la LCT y derogó los arts. 54 y 61. El libro especial rubricado dejó lugar a la registración ante ARCA, y la presunción del art. 55 pasó de la omisión de exhibición a la omisión de registración.",
        url: "/libro-de-sueldos",
        modificado: LIBRO_FUENTES.consultadoEl,
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
          Libro de sueldos y presunción del art. 55: qué cambió
        </h1>
        <p className="text-zinc-600">
          La presunción del artículo 55 de la Ley de Contrato de Trabajo es la herramienta más usada
          en un juicio laboral argentino. La Ley 27.802 no la ajustó: le cambió el disparador. Y de
          paso reescribió el libro de sueldos y borró dos artículos del bloque de prueba.
        </p>
      </header>

      <RespuestaPrimero actualizado={LIBRO_FUENTES.consultadoEl}>
        <p>
          <strong>
            El art. 55 pasó de «Omisión de su exhibición» a «Omisión de registración»
          </strong>{" "}
          el {VIGENCIA_REFORMA}. Antes, la presunción a favor del trabajador nacía de que el
          empleador <strong>no exhibiera</strong> el libro, los registros o las planillas ante el
          requerimiento judicial o administrativo. Hoy nace de que{" "}
          <strong>no haya registrado</strong> al trabajador en los términos del art. 52 — que
          también es nuevo: la registración se hace ante ARCA, y esa registración «será suficiente a
          todos los efectos». En el medio, la misma ley <strong>derogó los arts. 54 y 61</strong>:
          el que extendía la regla a planillas y elementos de contralor, y el que mandaba
          interpretar los formularios del empleador a favor del trabajador. El caso que cambió de
          signo es concreto: <strong>empleador registrado que no exhibe la documentación</strong>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">¿Te ampara la presunción?</h2>
        <p className="text-sm text-zinc-600">
          Cargá la fecha del hecho y qué pasó con la registración y con los libros. La página te dice
          qué texto del artículo se te aplica y qué hubiera pasado con el otro.
        </p>
        <CalculadoraLibroSueldos />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los cinco artículos que la reforma tocó el mismo día
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[42rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left">
                <th className="py-2 pr-3 font-medium text-zinc-600">Art. LCT</th>
                <th className="py-2 pr-3 font-medium text-zinc-600">Epígrafe anterior</th>
                <th className="py-2 pr-3 font-medium text-zinc-600">Hoy</th>
                <th className="py-2 font-medium text-zinc-600">Qué cambió</th>
              </tr>
            </thead>
            <tbody>
              {CAMBIOS_DEL_BLOQUE.map((c) => (
                <tr key={c.articulo} className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3 font-semibold text-zinc-900">{c.articulo}</td>
                  <td className="py-2 pr-3 text-zinc-600">«{c.epigrafeAnterior}»</td>
                  <td className="py-2 pr-3">
                    {c.epigrafeVigente ? (
                      <span className="text-zinc-800">«{c.epigrafeVigente}»</span>
                    ) : (
                      <span className="font-semibold text-rose-700">derogado</span>
                    )}
                    <span className="block text-xs text-zinc-500">
                      {c.accion === "derogado" ? "por el art." : "sustituido por el art."}{" "}
                      {c.porArticulo} de la Ley 27.802
                    </span>
                  </td>
                  <td className="py-2 text-zinc-600">{c.queCambio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">El artículo 55, lado a lado</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">Texto vigente</p>
            <p className="mt-1 text-sm italic text-zinc-700">«{LIBRO_TEXTOS.art55Vigente}»</p>
            <p className="mt-2 text-xs text-zinc-500">{LIBRO_TEXTOS.art55Nota}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Texto anterior, hasta el {VIGENCIA_REFORMA}
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{LIBRO_TEXTOS.art55Anterior}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Recuperado de la captura oficial del 15 de diciembre de 2025. Fijate en la remisión:
              «los artículos 52 y 54». El art. 54 ya no existe.
            </p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El libro especial que dejó de ser obligatorio
        </h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            LCT, art. 52 — Registro del trabajador (texto vigente)
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{LIBRO_TEXTOS.art52Vigente}»</p>
          <p className="mt-2 text-xs text-zinc-500">{LIBRO_TEXTOS.art52Nota}</p>
        </blockquote>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-zinc-800">
              Los ocho incisos que el libro tenía que consignar
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-zinc-600">
              {INCISOS_LIBRO_ANTERIOR.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ol>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-zinc-800">
              Y las cuatro prohibiciones expresas
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-zinc-600">
              {PROHIBICIONES_LIBRO_ANTERIOR.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
            <p className="mt-2 text-xs text-zinc-500">
              Ninguna de las dos listas está en el texto vigente. Lo que hay es la registración ante
              ARCA «de acuerdo a la normativa que dicho organismo dicte».
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los dos artículos que desaparecieron</h2>
        <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            LCT, art. 54 — Aplicación de los registros, planillas u otros elementos de contralor
            (derogado)
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{LIBRO_TEXTOS.art54Derogado}»</p>
          <p className="mt-2 text-xs text-zinc-500">
            {LIBRO_TEXTOS.art54Nota} Era la otra mitad de la remisión del art. 55 anterior.
          </p>
        </blockquote>
        <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            LCT, art. 61 — Formularios (derogado)
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{LIBRO_TEXTOS.art61Derogado}»</p>
          <p className="mt-2 text-xs text-zinc-500">
            {LIBRO_TEXTOS.art61Nota} Era la regla que se invocaba contra los recibos que declaran
            cancelado «todo concepto» o acumulan períodos.
          </p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-zinc-800">{f.q}</summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
        <p className="text-sm text-zinc-500">
          Otros artículos que la misma reforma derogó:{" "}
          <Link
            href="/reserva-del-empleo"
            className="font-medium text-emerald-700 hover:underline"
          >
            el art. 216, de reserva del empleo
          </Link>
          ,{" "}
          <Link href="/propinas" className="font-medium text-emerald-700 hover:underline">
            el art. 113, de propinas
          </Link>{" "}
          y{" "}
          <Link
            href="/temeridad-y-malicia"
            className="font-medium text-emerald-700 hover:underline"
          >
            el art. 275, de temeridad y malicia
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {LIBRO_FUENTES.lista.map((f) => (
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
          Esta página cita el texto oficial de la Ley de Contrato de Trabajo publicado en InfoLEG y
          los textos anteriores recuperados de una captura de esa misma página previa a la reforma —
          no un resumen de prensa. Es informativa y orientativa: no reemplaza el asesoramiento de un
          profesional. Consultada el {LIBRO_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
