import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraTemeridadMalicia } from "@/components/CalculadoraTemeridadMalicia";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ARTICULO_DEROGADO,
  ARTICULO_DEROGATORIO,
  ARTICULO_SUSTITUTIVO_ART20,
  FUENTE_TEXTO_ANTERIOR,
  NOTA_DEROGACION_275,
  SUPUESTOS_ART_275,
  TEMERIDAD_FUENTES,
  TEMERIDAD_TEXTOS,
  TOPE_COSTAS,
  VIGENCIA_REFORMA,
} from "@/data/temeridad-malicia";

export const metadata: Metadata = {
  title: "Temeridad y malicia: el art. 275 LCT derogado",
  description: `Desde el 6/3/2026 el empleador que litiga de mala fe ya no paga el interés agravado, y el trabajador puede cargar costas por pluspetición. Qué cambió.`,
  alternates: { canonical: "/temeridad-y-malicia" },
  openGraph: {
    title: "Temeridad y malicia: el art. 275 de la LCT está derogado",
    description:
      "Cayó la sanción al empleador que litiga de mala fe y apareció una para el trabajador que reclama de más. Las dos cosas pasaron el mismo día, en el mismo Boletín.",
    url: "https://calcular.ar/temeridad-y-malicia",
    images: [
      {
        url: "/og?t=Temeridad%20y%20malicia&s=El%20art.%20275%20de%20la%20LCT%20est%C3%A1%20derogado",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Sigue vigente el artículo 275 de la LCT?",
    a: `No. Lo derogó el artículo ${ARTICULO_DEROGATORIO} de la Ley 27.802, sin fecha diferida: la nota dice «Vigencia: a partir de su publicación en el Boletín Oficial», o sea el ${VIGENCIA_REFORMA}. El texto actualizado de InfoLEG ya no muestra el artículo, solo la nota de derogación. Con él se fue la única sanción en plata que la Ley de Contrato de Trabajo tenía contra el empleador que perdía el juicio después de litigar con malicia o temeridad.`,
  },
  {
    q: "¿Qué decía exactamente?",
    a: "Que el empleador declarado malicioso o temerario que perdiera el juicio, en todo o en parte, tenía que pagar «un interés de hasta dos veces y media el que cobren los bancos oficiales, para operaciones corrientes de descuento de documentos comerciales». El juez lo graduaba según cómo se había comportado en el juicio. Y nombraba los casos «especialmente comprendidos»: demorar un reclamo por accidente de trabajo, no dar los auxilios indispensables, negar la relación laboral sabiendo que existía, usar actos hechos en fraude del trabajador abusando de su necesidad o inexperiencia, y oponer defensas manifiestamente incompatibles o contradictorias.",
  },
  {
    q: "¿Qué pasa ahora si no se cumple un acuerdo homologado?",
    a: "Es la parte más dura de la derogación y casi no se publica. Desde 2011, por el artículo 1° de la Ley 26.696, el artículo 275 tenía un tercer párrafo. Si el trabajador tenía que seguir o iniciar el juicio porque no se cumplió un acuerdo ya homologado (judicial o administrativo), esa conducta «será calificada como ‘temeraria y maliciosa’» y la deuda generaba el interés máximo desde la mora. No lo decidía el juez: era automático, solo por no cumplir. Ese párrafo cayó con el artículo entero. Hoy, dentro de la LCT, no cumplir un acuerdo homologado no tiene ninguna consecuencia en plata distinta de la actualización del artículo 276.",
  },
  {
    q: "Entonces, ¿qué le queda a un crédito laboral por el paso del tiempo?",
    a: "El artículo 276, que la misma Ley 27.802 reescribió el mismo día. El crédito se actualiza por la variación del Índice de Precios al Consumidor Nivel General del INDEC «con más una tasa de interés del tres por ciento (3%) anual, desde que cada suma sea debida y hasta el momento del efectivo pago». Nada más. Y es igual para el que pagó a tiempo, para el que discutió de buena fe y para el que demoró el juicio cinco años. La diferencia entre los tres desapareció.",
  },
  {
    q: "¿Y qué es la pluspetición inexcusable del artículo 20?",
    a: `Es el cambio en sentido contrario, hecho el mismo día. El artículo 20 de la LCT es el de la gratuidad: garantiza que el trabajador y sus derechohabientes no paguen por litigar y que su vivienda no se use para pagar costas. El artículo ${ARTICULO_SUSTITUTIVO_ART20} de la Ley 27.802 lo reescribió y le sumó un párrafo final. Si del juicio surge «pluspetición inexcusable, configurándose ésta de manera objetiva en caso de sobreestimación de los créditos reclamados», las costas «deberán ser soportadas solidariamente entre la parte y el profesional actuante». Dicho simple: reclamar de más ahora tiene costo, y lo pagan juntos el trabajador y su abogado.`,
  },
  {
    q: "¿Hasta cuánto pueden ser esas costas?",
    a: `El techo lo pone el artículo 277 vigente. Las costas de primera o única instancia, honorarios incluidos, «no excederán del veinticinco por ciento (25%) del monto de la sentencia, laudo, transacción o instrumento que ponga fin al diferendo». Si los honorarios regulados pasan ese porcentaje, el juez los reparte en proporción. Ese ${TOPE_COSTAS * 100}% es el peor caso, y por eso la calculadora lo muestra sobre el crédito que cargaste.`,
  },
  {
    q: "¿Por qué la calculadora me pide la tasa en vez de traerla sola?",
    a: "Porque la ley nunca la publicó. El artículo 275 hablaba de «el que cobren los bancos oficiales, para operaciones corrientes de descuento de documentos comerciales»: no es una serie que el BCRA publique con ese nombre ni un número que salga del texto. Y el multiplicador era «de hasta» dos veces y media, según decidiera el juez. Poner un solo importe sería inventarlo. Esta página publica la regla (el rango de 1× a 2,5× sobre la tasa que cargues) y, al lado, el número que sí sale de un dato oficial: la actualización del artículo 276 con la serie del IPC del INDEC.",
  },
  {
    q: "¿Vale para los juicios que ya están en trámite?",
    a: `La derogación no es retroactiva: rige «a partir de su publicación en el Boletín Oficial», el ${VIGENCIA_REFORMA}. Para lo que se hizo en el juicio antes de esa fecha, el artículo 275 estaba vigente, y esa es justo la discusión abierta en los expedientes en curso. La página no la resuelve: muestra los dos escenarios lado a lado para que veas de cuánta plata se habla.`,
  },
];

export default function TemeridadYMaliciaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora: cuánto valía la sanción por temeridad y malicia que la Ley 27.802 derogó",
        url: "https://calcular.ar/temeridad-y-malicia",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Temeridad y malicia: el art. 275 de la LCT está derogado",
        descripcion:
          "El art. 207 de la Ley 27.802 derogó el art. 275 de la LCT (interés de hasta 2,5 veces el bancario contra el empleador malicioso o temerario, y la calificación automática por acuerdo homologado incumplido de la Ley 26.696). El mismo día, el art. 10 sumó al art. 20 las costas solidarias por pluspetición inexcusable.",
        url: "/temeridad-y-malicia",
        modificado: TEMERIDAD_FUENTES.consultadoEl,
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
          Temeridad y malicia: cayó la sanción al empleador y apareció una para el trabajador
        </h1>
        <p className="text-zinc-600">
          Los dos cambios se hicieron el mismo día, en el mismo Boletín Oficial, y van en
          direcciones opuestas. Por separado parecen dos noticias más. Juntos cambian el riesgo de
          cualquier reclamo laboral.
        </p>
      </header>

      <RespuestaPrimero actualizado={TEMERIDAD_FUENTES.consultadoEl}>
        <p>
          <strong>
            El artículo {ARTICULO_DEROGADO} de la LCT está derogado desde el {VIGENCIA_REFORMA}
          </strong>{" "}
          por el artículo {ARTICULO_DEROGATORIO} de la Ley 27.802, sin fecha diferida. Con él se fue
          el interés de <strong>hasta dos veces y media</strong> el de los bancos oficiales contra el
          empleador que perdía el juicio después de litigar con malicia o temeridad. También cayó el
          párrafo que la Ley 26.696 sumó en 2011, que calificaba{" "}
          <strong>automáticamente</strong> como «temeraria y maliciosa» la falta de cumplimiento de
          un acuerdo ya homologado y aplicaba el interés máximo desde la mora. Hoy a un crédito
          laboral solo le queda el artículo 276: IPC del INDEC más 3% anual, igual para el que pagó a
          tiempo y para el que demoró cinco años. En sentido contrario, el artículo{" "}
          {ARTICULO_SUSTITUTIVO_ART20} de la misma ley metió en el artículo 20 (el de la{" "}
          <em>gratuidad</em>) que{" "}
          <strong>
            si reclamás de más sin excusa, las costas las pagan juntos el trabajador y su abogado
          </strong>
          , con el techo del {TOPE_COSTAS * 100}% del artículo 277.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuánta plata era</h2>
        <p className="text-sm text-zinc-600">
          De un lado, lo que rige hoy, calculado con dato oficial: el artículo 276 con la serie del
          IPC del INDEC. Del otro, el rango del artículo 275 derogado. Es un rango y no un número
          porque la ley nunca publicó la tasa y el multiplicador lo decidía el juez.
        </p>
        <CalculadoraTemeridadMalicia />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué decía el artículo que se derogó</h2>
        <p className="text-sm text-zinc-600">
          El texto actualizado de InfoLEG ya no lo muestra. Lo que sigue es el texto vigente hasta el{" "}
          {VIGENCIA_REFORMA}, tomado de la misma página oficial guardada antes de la reforma.
        </p>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. {ARTICULO_DEROGADO}: Conducta maliciosa y temeraria{" "}
              <span className="font-normal text-rose-700">(derogado)</span>
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{TEMERIDAD_TEXTOS.art275Primero}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">{NOTA_DEROGACION_275}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              …y su tercer párrafo, el que sumó la Ley 26.696 en 2011
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{TEMERIDAD_TEXTOS.art275AcuerdoHomologado}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Según los «Antecedentes Normativos» de la LCT, es el único cambio que tuvo el artículo
              desde 1976, y también cayó. La calificación era automática: no dependía de lo que
              opinara el juez.
            </p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Las cinco conductas que el artículo nombraba
        </h2>
        <p className="text-sm text-zinc-600">
          El artículo no dejaba la temeridad librada a la interpretación: nombraba los casos
          «especialmente comprendidos». Vale leerlos, porque describen justo lo que hoy ya no tiene
          una consecuencia en plata propia dentro de la LCT.
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {SUPUESTOS_ART_275.map((s) => (
            <li
              key={s.titulo}
              className="rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-600 shadow-sm"
            >
              <span className="font-semibold text-zinc-900">{s.titulo}.</span> {s.detalle}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El cambio del otro lado: la pluspetición inexcusable
        </h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 20: Gratuidad (texto vigente)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEMERIDAD_TEXTOS.art20}»</p>
            <p className="mt-2 text-xs text-zinc-500">{TEMERIDAD_TEXTOS.art20Nota}</p>
          </blockquote>
          <p className="rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 shadow-sm">
            Las dos primeras oraciones son las de siempre: el juicio es gratis para el trabajador y
            su vivienda no se puede embargar por costas. La tercera es nueva, y está escrita dentro
            del artículo que protege al trabajador de los costos del juicio. El texto dice que se
            configura de manera «objetiva» («en caso de sobreestimación de los créditos
            reclamados») y que la responsabilidad es{" "}
            <strong>solidaria entre la parte y el profesional actuante</strong>.
          </p>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 277: el techo de esas costas
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEMERIDAD_TEXTOS.art277Costas}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 276: lo único que le queda al crédito por el paso del tiempo
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEMERIDAD_TEXTOS.art276}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Lo reescribió el art. 54 de la misma Ley 27.802. El detalle mes a mes, con la serie
              oficial del IPC, está en{" "}
              <Link
                href="/actualizacion-creditos-laborales"
                className="font-medium text-emerald-700 hover:underline"
              >
                la calculadora del art. 276
              </Link>
              .
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
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Otras páginas de la misma reforma</h2>
        <p className="text-sm text-zinc-600">
          El artículo {ARTICULO_DEROGATORIO} de la Ley 27.802 derogó nueve artículos de la LCT de una
          vez, todos sin fecha diferida. Ya tienen página el 113 (
          <Link href="/propinas" className="font-medium text-emerald-700 hover:underline">
            las propinas dejaron de ser remuneración
          </Link>
          ) y los 174, 175 y 176 (
          <Link
            href="/trabajo-de-mujeres"
            className="font-medium text-emerald-700 hover:underline"
          >
            el capítulo de trabajo de mujeres quedó vacío
          </Link>
          ). Si tenés un juicio en curso, mirá también{" "}
          <Link
            href="/caducidad-de-instancia-laboral"
            className="font-medium text-emerald-700 hover:underline"
          >
            cuándo caduca la instancia en un juicio laboral
          </Link>
          . Y si lo que estás calculando es un despido, están{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            la calculadora de indemnización
          </Link>{" "}
          y{" "}
          <Link
            href="/actualizacion-creditos-laborales"
            className="font-medium text-emerald-700 hover:underline"
          >
            la de actualización de créditos laborales
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {TEMERIDAD_FUENTES.lista.map((f) => (
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
          <li>
            <a
              href={FUENTE_TEXTO_ANTERIOR.urlArchivada}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              Texto del art. {ARTICULO_DEROGADO} antes de la derogación
            </a>
            : {FUENTE_TEXTO_ANTERIOR.detalle}
          </li>
        </ul>
        <p className="pt-2">
          Esta página usa el texto actualizado de la Ley de Contrato de Trabajo publicado en InfoLEG
          y el texto oficial de la Ley 27.802, no un resumen de prensa. Es una guía informativa: no
          reemplaza el consejo de un profesional ni una liquidación judicial. Consultada el{" "}
          {TEMERIDAD_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
