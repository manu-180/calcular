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
  title: "Temeridad y malicia: el art. 275 de la LCT está derogado",
  description: `Desde el ${VIGENCIA_REFORMA} el empleador que litiga de mala fe ya no paga el interés de hasta 2,5 veces el bancario: la Ley 27.802 derogó el art. 275 de la LCT. Y el mismo día metió en el art. 20 —el de la gratuidad— las costas solidarias del trabajador y su abogado por pluspetición inexcusable.`,
  alternates: { canonical: "/temeridad-y-malicia" },
  openGraph: {
    title: "Temeridad y malicia: el art. 275 de la LCT está derogado",
    description:
      "Cayó la sanción contra el empleador que litiga de mala fe y apareció una contra el trabajador que reclama de más. Los dos movimientos, el mismo día y en el mismo Boletín.",
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
    a: `No. El artículo ${ARTICULO_DEROGATORIO} de la Ley 27.802 lo derogó, y sin fecha diferida: la nota dice «Vigencia: a partir de su publicación en el Boletín Oficial», o sea el ${VIGENCIA_REFORMA}. El texto actualizado de InfoLEG ya no muestra el artículo: sólo la nota de derogación. Con él se fue la única sanción económica que la Ley de Contrato de Trabajo tenía contra el empleador que perdía el juicio con conducta maliciosa o temeraria.`,
  },
  {
    q: "¿Qué decía exactamente?",
    a: "Que el empleador declarado malicioso o temerario que perdiera total o parcialmente el juicio sería condenado a pagar «un interés de hasta dos veces y media el que cobren los bancos oficiales, para operaciones corrientes de descuento de documentos comerciales», graduado por el juez según la conducta procesal. Y enumeraba los casos «especialmente comprendidos»: dilatar un reclamo por accidente de trabajo, omitir los auxilios indispensables, negar la relación laboral sabiendo que existía, hacer valer actos cometidos en fraude del trabajador abusando de su necesidad o inexperiencia, y oponer defensas manifiestamente incompatibles o contradictorias.",
  },
  {
    q: "¿Qué pasa ahora si no se cumple un acuerdo homologado?",
    a: "Es la parte más filosa de la derogación y casi no se publica. Desde 2011, por el artículo 1° de la Ley 26.696, el artículo 275 tenía un tercer párrafo: si el trabajador tenía que seguir o promover el juicio porque no se cumplió un acuerdo ya homologado —judicial o administrativo—, esa conducta «será calificada como ‘temeraria y maliciosa’» y la deuda devengaba el MÁXIMO del interés desde la fecha de la mora. No era una facultad del juez: era automático, por el solo hecho del incumplimiento. Ese párrafo cayó con el artículo entero. Hoy incumplir un acuerdo homologado no tiene, dentro de la LCT, ninguna consecuencia económica propia distinta de la actualización del artículo 276.",
  },
  {
    q: "Entonces, ¿qué le queda a un crédito laboral por el paso del tiempo?",
    a: "El artículo 276, que la misma Ley 27.802 sustituyó el mismo día: el crédito se actualiza por la variación del Índice de Precios al Consumidor Nivel General del INDEC «con más una tasa de interés del tres por ciento (3%) anual, desde que cada suma sea debida y hasta el momento del efectivo pago». Eso es todo, y es igual para el que pagó puntual, para el que discutió de buena fe y para el que dilató el juicio cinco años. La diferencia entre los tres desapareció.",
  },
  {
    q: "¿Y qué es la pluspetición inexcusable del artículo 20?",
    a: `El movimiento en el sentido contrario, hecho el mismo día. El artículo 20 de la LCT es el de la GRATUIDAD: garantiza que el trabajador y sus derechohabientes no paguen por litigar y que su vivienda no sea afectada al pago de costas. El artículo ${ARTICULO_SUSTITUTIVO_ART20} de la Ley 27.802 lo sustituyó y le agregó un párrafo final: si de los antecedentes del proceso resulta «pluspetición inexcusable, configurándose ésta de manera objetiva en caso de sobreestimación de los créditos reclamados», las costas «deberán ser soportadas solidariamente entre la parte y el profesional actuante». Dicho de otro modo: reclamar de más ahora tiene costo, y lo comparten el trabajador y su abogado.`,
  },
  {
    q: "¿Hasta cuánto pueden ser esas costas?",
    a: `El techo lo pone el artículo 277 vigente: la responsabilidad por las costas procesales de primera o única instancia, honorarios incluidos, «no excederán del veinticinco por ciento (25%) del monto de la sentencia, laudo, transacción o instrumento que ponga fin al diferendo». Si las regulaciones superan ese porcentaje, el juez prorratea entre los beneficiarios. Ese ${TOPE_COSTAS * 100}% es el peor caso y por eso la calculadora lo muestra sobre el crédito cargado.`,
  },
  {
    q: "¿Por qué la calculadora me pide la tasa en vez de traerla sola?",
    a: "Porque la ley nunca la publicó. El artículo 275 hablaba de «el que cobren los bancos oficiales, para operaciones corrientes de descuento de documentos comerciales»: no es una serie que el BCRA publique con ese nombre ni un número que se derive del texto. Y el multiplicador era «de hasta» dos veces y media, graduado por el juez. Poner un importe único sería inventarlo. Lo que esta página publica es la regla —el abanico de 1× a 2,5× sobre la tasa que se cargue—, y del otro lado el número que sí sale de dato oficial: la actualización del artículo 276 con la serie del IPC del INDEC.",
  },
  {
    q: "¿Vale para los juicios que ya están en trámite?",
    a: `La derogación no es retroactiva: rige «a partir de su publicación en el Boletín Oficial», el ${VIGENCIA_REFORMA}. Para la conducta procesal desplegada antes de esa fecha el artículo 275 estaba vigente, y esa es precisamente la discusión que está abierta en los expedientes en curso. La página no la resuelve: muestra los dos escenarios al lado para que se vea de cuánta plata se está hablando.`,
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
          "El art. 207 de la Ley 27.802 derogó el art. 275 de la LCT (interés de hasta 2,5 veces el bancario contra el empleador malicioso o temerario, y la calificación automática por acuerdo homologado incumplido de la Ley 26.696). El mismo día, el art. 10 metió en el art. 20 las costas solidarias por pluspetición inexcusable.",
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
          Los dos movimientos se hicieron el mismo día, en el mismo Boletín Oficial, y apuntan en
          direcciones opuestas. Leídos por separado son dos notas más; leídos juntos cambian el
          cálculo de riesgo de cualquier reclamo laboral.
        </p>
      </header>

      <RespuestaPrimero actualizado={TEMERIDAD_FUENTES.consultadoEl}>
        <p>
          <strong>
            El artículo {ARTICULO_DEROGADO} de la LCT está derogado desde el {VIGENCIA_REFORMA}
          </strong>{" "}
          por el artículo {ARTICULO_DEROGATORIO} de la Ley 27.802, sin fecha diferida. Con él se fue
          el interés de <strong>hasta dos veces y media</strong> el de los bancos oficiales contra el
          empleador que perdía el juicio con conducta maliciosa o temeraria — y también el párrafo
          que la Ley 26.696 había incorporado en 2011, que calificaba{" "}
          <strong>automáticamente</strong> como «temeraria y maliciosa» la falta de cumplimiento de
          un acuerdo ya homologado y aplicaba el máximo del interés desde la mora. Lo único que le
          queda hoy a un crédito laboral por el paso del tiempo es el artículo 276: IPC del INDEC más
          3% anual, igual para el que pagó puntual y para el que dilató cinco años. En el sentido
          contrario, el artículo {ARTICULO_SUSTITUTIVO_ART20} de la misma ley metió dentro del
          artículo 20 —el de la <em>gratuidad</em>— que{" "}
          <strong>
            la pluspetición inexcusable hace que las costas las paguen solidariamente el trabajador y
            su abogado
          </strong>
          , con el techo del {TOPE_COSTAS * 100}% del artículo 277.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuánta plata era</h2>
        <p className="text-sm text-zinc-600">
          De un lado, lo que rige hoy, calculado con dato oficial: el artículo 276 con la serie del
          IPC del INDEC. Del otro, el abanico del artículo 275 derogado — un abanico y no un número,
          porque la ley nunca publicó la tasa y el multiplicador lo graduaba el juez.
        </p>
        <CalculadoraTemeridadMalicia />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué decía el artículo que se derogó</h2>
        <p className="text-sm text-zinc-600">
          El texto actualizado de InfoLEG ya no lo muestra. Lo que sigue es el texto que estuvo
          vigente hasta el {VIGENCIA_REFORMA}, tomado de la misma página oficial capturada antes de
          la reforma.
        </p>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. {ARTICULO_DEROGADO} — Conducta maliciosa y temeraria{" "}
              <span className="font-normal text-rose-700">(derogado)</span>
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{TEMERIDAD_TEXTOS.art275Primero}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">{NOTA_DEROGACION_275}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              …y su tercer párrafo, el que incorporó la Ley 26.696 en 2011
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{TEMERIDAD_TEXTOS.art275AcuerdoHomologado}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Es la única modificación que el artículo tuvo desde 1976 según los «Antecedentes
              Normativos» de la LCT — y también cayó. La calificación era automática: no dependía de
              que el juez apreciara nada.
            </p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Las cinco conductas que el artículo nombraba
        </h2>
        <p className="text-sm text-zinc-600">
          El artículo no dejaba la temeridad librada a la interpretación: enumeraba los casos
          «especialmente comprendidos». Vale leerlos, porque describen con precisión lo que hoy ya no
          tiene consecuencia económica propia en la LCT.
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
          El movimiento del otro lado: la pluspetición inexcusable
        </h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 20 — Gratuidad (texto vigente)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEMERIDAD_TEXTOS.art20}»</p>
            <p className="mt-2 text-xs text-zinc-500">{TEMERIDAD_TEXTOS.art20Nota}</p>
          </blockquote>
          <p className="rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 shadow-sm">
            Las dos primeras oraciones son las de siempre: la gratuidad y la vivienda inembargable
            por costas. La tercera es nueva y está escrita dentro del artículo que protege al
            trabajador de los costos del pleito. La configuración es «objetiva», dice el texto —«en
            caso de sobreestimación de los créditos reclamados»—, y la responsabilidad es{" "}
            <strong>solidaria entre la parte y el profesional actuante</strong>.
          </p>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 277 — el techo de esas costas
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEMERIDAD_TEXTOS.art277Costas}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 276 — lo único que le queda al crédito por el paso del tiempo
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{TEMERIDAD_TEXTOS.art276}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Sustituido por el art. 54 de la misma Ley 27.802. El detalle mes a mes, con la serie
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
          sola vez, todos sin fecha diferida. Ya tienen página el 113 —
          <Link href="/propinas" className="font-medium text-emerald-700 hover:underline">
            las propinas dejaron de ser remuneración
          </Link>
          — y los 174, 175 y 176 —
          <Link
            href="/trabajo-de-mujeres"
            className="font-medium text-emerald-700 hover:underline"
          >
            el capítulo de trabajo de mujeres quedó vacío
          </Link>
          —. Si lo que estás calculando es un despido, están{" "}
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
              Texto del art. {ARTICULO_DEROGADO} antes de la derogación
            </a>{" "}
            — {FUENTE_TEXTO_ANTERIOR.detalle}
          </li>
        </ul>
        <p className="pt-2">
          Esta página aplica el texto actualizado de la Ley de Contrato de Trabajo publicado en
          InfoLEG y el texto oficial de la Ley 27.802, no un resumen de prensa. Es informativa y
          orientativa: no reemplaza el asesoramiento de un profesional ni una liquidación judicial.
          Consultada el {TEMERIDAD_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
