import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraReservaEmpleo } from "@/components/CalculadoraReservaEmpleo";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ARTICULO_DEROGADO,
  ARTICULO_DEROGATORIO,
  DIAS_PARA_REINCORPORAR,
  RESERVA_FUENTES,
  RESERVA_TEXTOS,
  SUPUESTOS_RESERVA,
  VIGENCIA_REFORMA,
} from "@/data/reserva-empleo";

export const metadata: Metadata = {
  title: "Reserva del empleo: qué pasa si no te reincorporan",
  description: `La reserva del puesto sigue vigente, pero el art. ${ARTICULO_DEROGADO} de la LCT se derogó el 6/3/2026. Calculá cuánto cambia la indemnización según cuente o no.`,
  alternates: { canonical: "/reserva-del-empleo" },
  openGraph: {
    title: "Reserva del empleo: quedó el derecho, cayó la sanción",
    description: `La Ley 27.802 derogó el art. ${ARTICULO_DEROGADO} de la LCT. Los arts. 214 y 215 siguen obligando a guardar el puesto y a reincorporar en ${DIAS_PARA_REINCORPORAR} días, pero ya no existe la regla que sumaba el período de reserva a la antigüedad para indemnizar.`,
    url: "https://calcular.ar/reserva-del-empleo",
    images: [
      {
        url: "/og?t=Reserva%20del%20empleo&s=Arts.%20214%20a%20217%20LCT%3A%20qued%C3%B3%20el%20derecho%2C%20cay%C3%B3%20la%20sanci%C3%B3n",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Sigue existiendo la reserva del puesto de trabajo?",
    a: `Sí, sin ningún cambio. Los artículos 214 (convocatoria militar, movilización) y 215 (cargos electivos nacionales, provinciales o municipales) de la Ley de Contrato de Trabajo siguen iguales: el empleador "conservará el empleo" y tenés derecho "a su reincorporación hasta treinta (30) días después de concluido el ejercicio de sus funciones". La Ley 27.802 no los tocó. Lo que derogó es otro artículo, el ${ARTICULO_DEROGADO}, que decía qué pasaba si el empleador no cumplía.`,
  },
  {
    q: `¿Qué decía exactamente el artículo ${ARTICULO_DEROGADO} que se derogó?`,
    a: `Dos cosas, y la segunda es la que movía plata. Primero, que si despedían o no reincorporaban a un trabajador en la situación de los arts. 214 o 215, éste "podrá reclamar el pago de las indemnizaciones que le correspondan por despido injustificado y por falta u omisión del preaviso". Y segundo: "A los efectos de dichas indemnizaciones la antigüedad computable incluirá el período de reserva del empleo". Esa última oración ya no está en la ley.`,
  },
  {
    q: "Entonces, ¿el período de reserva ya no me cuenta para la indemnización?",
    a: `No es tan directo, y ahí está el punto. Lo que desapareció es la regla específica para las indemnizaciones. La regla general sigue viva en la segunda parte de los mismos arts. 214 y 215: el tiempo de reserva "será considerado período de trabajo a los efectos del cómputo de su antigüedad, frente a los beneficios que por esta ley, estatutos profesionales o convenciones colectivas de trabajo le hubiesen correspondido en el caso de haber prestado servicios". Antes del ${VIGENCIA_REFORMA} la respuesta estaba escrita; hoy depende de cómo se lea esa frase. Por eso la calculadora muestra dos números en vez de uno: la diferencia entre las columnas es justo lo que se discute.`,
  },
  {
    q: "¿Le pasa lo mismo al delegado gremial?",
    a: "No, y es la diferencia más llamativa de la reforma. El artículo 217 (cargos gremiales o representación sindical) quedó entero, en el capítulo siguiente del mismo título. Mantiene la reserva del empleo, la reincorporación a los 30 días, el cómputo del tiempo «con el alcance de los artículos 214 y 215, segunda parte» y, además, una prohibición expresa que los otros dos nunca tuvieron: «no pudiendo ser despedidos durante los plazos que fije la ley respectiva». El art. 216 derogado solo nombraba «los artículos 214 o 215», así que su caída no le quita nada al cargo gremial.",
  },
  {
    q: "¿Desde cuándo rige la derogación?",
    a: `Desde el ${VIGENCIA_REFORMA}. La nota del artículo dice "Vigencia: a partir de su publicación en el Boletín Oficial", así que no espera al 1° de enero de 2027 como las leyes enteras que deroga el Título XXVI de la reforma. Si el despido o la no reincorporación pasaron antes de esa fecha, el art. ${ARTICULO_DEROGADO} estaba vigente y la antigüedad incluía el período de reserva porque la ley lo decía.`,
  },
  {
    q: "¿El artículo 214 no es letra muerta si ya no hay servicio militar obligatorio?",
    a: "No del todo. La Ley 24.429 cambió el servicio militar obligatorio por uno voluntario, pero su artículo 19 deja una convocatoria excepcional: si no se cubren los cupos de soldados voluntarios, el Poder Ejecutivo puede convocar ciudadanos, con autorización previa del Congreso por ley. Y el art. 214 de la LCT también cubre la movilización y las convocatorias especiales. Es un caso poco frecuente, pero existe.",
  },
  {
    q: "Los meses sin sueldo del período de reserva, ¿me bajan la base de la indemnización?",
    a: "No, y casi nadie lo publica. La tercera oración de los arts. 214 y 215 (que también quedó en pie) dice que el tiempo de reserva «no será considerado para determinar los promedios de remuneraciones a los fines de la aplicación de las mismas disposiciones». O sea: la mejor remuneración mensual, normal y habitual del art. 245 se busca entre los meses que trabajaste de verdad, no contra meses en cero.",
  },
  {
    q: "¿Cuántos días tiene el empleador para reincorporarme?",
    a: `Treinta días corridos desde que termina el servicio, el mandato o la función. Los tres artículos (214, 215 y 217) usan la misma fórmula: "hasta treinta (30) días después de concluido". La calculadora te muestra la fecha exacta de ese límite según lo que cargues.`,
  },
  {
    q: "¿Hay jurisprudencia sobre qué pasa ahora?",
    a: "Todavía no, y preferimos decirlo. La derogación es de marzo de 2026: no pasó el tiempo suficiente para que haya fallos firmes sobre el hueco que dejó. Esta página publica el texto oficial de los cuatro artículos, el texto derogado sacado de la captura anterior a la reforma y las dos lecturas posibles con su número en pesos. Lo que conviene en tu caso lo tiene que decidir un profesional.",
  },
];

export default function ReservaDelEmpleoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de reserva del empleo (arts. 214 a 217 LCT)",
        url: "https://calcular.ar/reserva-del-empleo",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo:
          "Reserva del empleo: el art. 216 de la LCT derogado y qué queda de los arts. 214, 215 y 217",
        descripcion:
          "La Ley 27.802 derogó el art. 216 de la LCT el 6/3/2026. Los arts. 214 y 215 mantienen la reserva del puesto y el plazo de 30 días para reincorporar, pero desapareció la regla que sumaba el período de reserva a la antigüedad para indemnizar. El art. 217, de cargos gremiales, quedó igual.",
        url: "/reserva-del-empleo",
        modificado: RESERVA_FUENTES.consultadoEl,
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
          Reserva del empleo: qué pasa hoy si no te reincorporan
        </h1>
        <p className="text-zinc-600">
          Dejaste de trabajar para asumir un cargo electivo, por una convocatoria o por un cargo
          gremial. La ley obliga a tu empleador a guardarte el puesto, y eso no cambió. Lo que
          cambió es que el artículo que decía cuánto te tenía que pagar si no lo hacía{" "}
          <strong>ya no existe</strong>.
        </p>
      </header>

      <RespuestaPrimero actualizado={RESERVA_FUENTES.consultadoEl}>
        <p>
          <strong>
            Quedó el derecho y cayó la sanción. Los arts. 214 y 215 de la LCT siguen iguales, pero
            el art. {ARTICULO_DEROGADO} (el que los hacía cumplir) se derogó el {VIGENCIA_REFORMA}
          </strong>{" "}
          por el art. {ARTICULO_DEROGATORIO} de la Ley 27.802, sin fecha diferida. Ese artículo
          decía dos cosas: que si te despedían o no te reincorporaban podías reclamar las
          indemnizaciones por despido injustificado y por preaviso, y que{" "}
          <strong>«la antigüedad computable incluirá el período de reserva del empleo»</strong>. La
          segunda oración era la que movía la plata, y desapareció. Sigue en pie la regla general de
          esos mismos artículos: el tiempo de reserva «será considerado período de trabajo a los
          efectos del cómputo de su antigüedad». La calculadora pone las dos lecturas una al lado de
          la otra, porque hoy eso es lo que se discute. El{" "}
          <strong>art. 217, de cargos gremiales, quedó entero</strong>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuánto se juega en tu caso</h2>
        <p className="text-sm text-zinc-600">
          Cargá las cuatro fechas y tu mejor sueldo. La calculadora liquida los dos rubros que
          nombraba el art. {ARTICULO_DEROGADO} (indemnización por antigüedad y preaviso no dado) en
          los dos escenarios, y te muestra la diferencia. Para la liquidación completa de un
          despido, usá la{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            calculadora de indemnización
          </Link>
          .
        </p>
        <CalculadoraReservaEmpleo />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los tres casos, y por qué solo uno quedó protegido
        </h2>
        <p className="text-sm text-zinc-600">
          El Título X de la LCT tiene tres capítulos con reserva del empleo. El art.{" "}
          {ARTICULO_DEROGADO} cubría los dos primeros y nunca nombró al tercero, que es justo el
          único que mantuvo una protección expresa.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {SUPUESTOS_RESERVA.map((s) => (
            <div
              key={s.id}
              className={`rounded-xl border p-4 shadow-sm ${
                s.cubriaElArt216
                  ? "border-rose-200 bg-rose-50/40"
                  : "border-emerald-200 bg-emerald-50/40"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                {s.capitulo} · Art. {s.articulo}
              </p>
              <p className="mt-1 font-semibold text-zinc-900">{s.quien}</p>
              <p className="mt-2 text-xs font-medium text-zinc-700">
                {s.cubriaElArt216
                  ? `Lo cubría el art. ${ARTICULO_DEROGADO}: se quedó sin artículo de sanción.`
                  : "Tiene artículo propio, con prohibición expresa de despedir."}
              </p>
              <p className="mt-2 text-sm text-zinc-600">{s.nota}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la ley</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. {ARTICULO_DEROGADO}: Despido o no reincorporación del trabajador (texto
              derogado)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{RESERVA_TEXTOS.art216Derogado}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Hoy, en lugar de ese texto, InfoLEG solo muestra la nota:{" "}
              {RESERVA_TEXTOS.art216Nota} El texto de arriba sale de la captura oficial del 15 de
              diciembre de 2025, anterior a la reforma.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 215: Reserva del empleo. Cómputo como tiempo de servicio (vigente, sin
              cambios)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{RESERVA_TEXTOS.art215}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              No tiene nota de cambios ni figura en los «Antecedentes Normativos» de la LCT: está
              igual que en el texto ordenado de 1976.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 214: Servicio militar y convocatorias especiales (vigente, sin cambios)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{RESERVA_TEXTOS.art214}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 217: Cargos gremiales. Fuero sindical (vigente, sin cambios)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{RESERVA_TEXTOS.art217}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Tiene las palabras que les faltan a los otros dos capítulos: «no pudiendo ser
              despedidos durante los plazos que fije la ley respectiva». Para lo demás, mirá{" "}
              <Link
                href="/despido-de-delegado-gremial"
                className="font-medium text-emerald-700 hover:underline"
              >
                la tutela sindical de la Ley 23.551
              </Link>
              .
            </p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La oración que cayó y la que quedó</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-rose-200 bg-rose-50/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">
              Derogada el {VIGENCIA_REFORMA}
            </p>
            <p className="mt-2 text-sm italic text-zinc-700">«{RESERVA_TEXTOS.oracionQueCayo}»</p>
            <p className="mt-2 text-xs text-zinc-600">
              Era la regla específica para las indemnizaciones. Estaba escrita: no había nada que
              interpretar.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Sigue vigente en los arts. 214 y 215
            </p>
            <p className="mt-2 text-sm italic text-zinc-700">…{RESERVA_TEXTOS.oracionQueQueda}.</p>
            <p className="mt-2 text-xs text-zinc-600">
              Es la regla general, y hoy es el argumento para contar igual el período de reserva. No
              dice «indemnizaciones»: dice «beneficios que por esta ley (…) le hubiesen
              correspondido».
            </p>
          </div>
        </div>
        <p className="rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 shadow-sm">
          <strong className="text-zinc-900">Y una tercera que nadie cita:</strong> «
          {RESERVA_TEXTOS.oracionDeLosPromedios}» Los meses sin sueldo del período de reserva no
          bajan la base del art. 245.
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
          Si te guardan el puesto por una enfermedad y no por un cargo, los plazos son otros: están
          en{" "}
          <Link
            href="/licencia-por-enfermedad"
            className="font-medium text-emerald-700 hover:underline"
          >
            la calculadora de licencia por enfermedad
          </Link>
          . Otros artículos de la LCT que la misma reforma derogó:{" "}
          <Link href="/propinas" className="font-medium text-emerald-700 hover:underline">
            las propinas del art. 113
          </Link>
          ,{" "}
          <Link href="/trabajo-de-mujeres" className="font-medium text-emerald-700 hover:underline">
            el capítulo de trabajo de mujeres
          </Link>{" "}
          y{" "}
          <Link href="/temeridad-y-malicia" className="font-medium text-emerald-700 hover:underline">
            la temeridad y malicia del art. 275
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {RESERVA_FUENTES.lista.map((f) => (
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
          Esta página cita el texto oficial de la Ley de Contrato de Trabajo publicado en InfoLEG, y
          el texto del artículo derogado tomado de una captura de esa misma página anterior a la
          reforma. No es un resumen de prensa. Es una guía informativa: no reemplaza el consejo de
          un profesional ni una liquidación. Consultada el {RESERVA_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
