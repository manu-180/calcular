import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraFal } from "@/components/CalculadoraFal";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ALICUOTAS,
  ARTICULOS_CUBIERTOS,
  DIAS_HABILES_TRANSFERENCIA,
  EXCLUIDOS,
  FAL_FUENTES,
  FAL_TEXTOS,
  MESES_ANTIGUEDAD_MINIMA,
  MESES_SIN_TRABAJADORES,
  MULTA_MULTIPLO,
  PERIODOS_CARENCIA,
  TOPE_COMISION_ANUAL,
  VIGENCIA_FAL,
  VIGENCIA_ORIGINAL,
} from "@/data/fal";

export const metadata: Metadata = {
  title: "Fondo de Asistencia Laboral (FAL): cuánto se aporta desde el 1/11/2026",
  description: `El Título II de la Ley 27.802 arranca el ${VIGENCIA_FAL}: ${ALICUOTAS.vigentes.pyme}% para MiPyME y ${ALICUOTAS.vigentes.grande}% para grandes empresas, con una reducción equivalente de contribuciones patronales. No reemplaza la indemnización. Calculá tu aporte.`,
  alternates: { canonical: "/fondo-de-asistencia-laboral" },
  openGraph: {
    title: "FAL: no es un impuesto nuevo, y no reemplaza la indemnización",
    description: `Las dos alícuotas del art. 60 (${ALICUOTAS.vigentes.pyme}% y ${ALICUOTAS.vigentes.grande}%), la reducción equivalente del art. 76, la carencia de ${PERIODOS_CARENCIA} períodos y la prórroga al ${VIGENCIA_FAL} — la única de toda la Ley de Modernización Laboral.`,
    url: "https://calcular.ar/fondo-de-asistencia-laboral",
    images: [
      {
        url: "/og?t=Fondo%20de%20Asistencia%20Laboral&s=Arranca%20el%201%2F11%2F2026%3A%20las%20alicuotas%2C%20la%20carencia%20y%20lo%20que%20NO%20cambia",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuándo empieza a regir el Fondo de Asistencia Laboral?",
    a: `El ${VIGENCIA_FAL}. El art. 77 de la Ley 27.802 lo había fijado para el ${VIGENCIA_ORIGINAL} y facultaba al Poder Ejecutivo a prorrogarlo «por el plazo máximo de seis (6) meses»: el art. 27 del Decreto 408/2026 (B.O. 1/6/2026) usó ese plazo entero. Es la única prórroga de toda la ley — el resto del articulado rige desde el 6 de marzo de 2026.`,
  },
  {
    q: "¿Cuánto hay que aportar?",
    a: `El art. 60 fija dos alícuotas sobre la misma base que las contribuciones patronales al SIPA: ${ALICUOTAS.vigentes.grande}% para las grandes empresas y ${ALICUOTAS.vigentes.pyme}% para las Micro, Pequeñas y Medianas de la Ley 24.467. El segundo párrafo del mismo artículo permite subirlas hasta ${ALICUOTAS.maximas.grande}% y ${ALICUOTAS.maximas.pyme}% respectivamente, pero sólo si lo dispone el Poder Ejecutivo «atendiendo al cumplimiento de las metas asociadas a las políticas de equilibrio fiscal» y con aprobación previa de la Comisión Bicameral de Control de Fondos de la Seguridad Social.`,
  },
  {
    q: "¿Es un impuesto nuevo al trabajo?",
    a: `No, y está escrito en dos lugares. El art. 76 de la ley da al empleador «una reducción en las contribuciones patronales con destino a la seguridad social equivalente» a lo que aporta al Fondo, y el art. 24 del Decreto 408/2026 explica cómo: «los empleadores detraerán mensualmente la alícuota de contribución al Fondo de Asistencia Laboral (…) de aquella que les corresponde». O sea que el peso se desvía de la seguridad social a una cuenta del propio empleador. La única excepción está escrita: las relaciones alcanzadas por el RIFL «mientras persista sus efectos» no tienen esa reducción, y ahí sí el aporte es plata adicional.`,
  },
  {
    q: "¿El fondo reemplaza la indemnización por despido?",
    a: `No. Es la confusión más cara y la ley la desmiente en su propio texto: «${FAL_TEXTOS.noSustituye}» (art. 58, último párrafo). El art. 64 lo repite del lado del dinero: «${FAL_TEXTOS.responsabilidadIntegra}». Y el art. 68 cierra el círculo: las entidades administradoras «en ningún caso se considerarán sujetos obligados frente al trabajador». El trabajador le sigue cobrando al empleador, por los mismos importes de siempre; el fondo es una caja del empleador para pagarlos.`,
  },
  {
    q: "¿Desde cuándo el fondo puede pagar una indemnización?",
    a: `No antes de ${PERIODOS_CARENCIA} períodos. El art. 65 dice que el fondo «no responderá» hasta haber recibido las contribuciones de al menos seis períodos mensuales, y el art. 15 del decreto precisa el cómputo: se cuenta desde el mes calendario en que ARCA registra la efectiva integración de la primera contribución, y son seis períodos de devengamiento y pago «completos y consecutivos».`,
  },
  {
    q: "¿Cubre a todos los trabajadores?",
    a: `No. El art. 58 pone dos filtros. El primero: sólo hay cobertura respecto de «trabajadores registrados con una antelación no menor a doce (12) meses de la fecha de la extinción de la relación laboral». El segundo, más tajante: «En ningún caso y bajo ninguna circunstancia prestarán cobertura respecto de trabajadores no registrados». Y si la relación está registrada de modo deficiente, el art. 64 y el art. 13 del decreto limitan la cobertura a lo que correspondería según los datos efectivamente registrados — el empleador paga la diferencia igual.`,
  },
  {
    q: "¿Quiénes quedan fuera del régimen?",
    a: `Tres grupos. El último párrafo del art. 58 excluye a la industria de la construcción (Ley 22.250) y al personal de casas particulares (Ley 26.844); el art. 2 del Decreto 408/2026 agrega al Sector Público, definido por el art. 8° de la Ley 24.156. La construcción es el caso interesante: ya tiene un fondo de cese desde 1980, y ése sí reemplaza a la indemnización — que es exactamente lo que el FAL no hace.`,
  },
  {
    q: "¿La plata del fondo sigue siendo del empleador?",
    a: `Sí. La cuenta es «un patrimonio separado, de afectación específica, independiente, inajenable e inembargable» (art. 59), es del empleador y «de carácter común y no individualizable por trabajador» (art. 62). Los rendimientos están exentos del Impuesto a las Ganancias (art. 67) y las cuentas de los fondos, del impuesto al cheque (art. 25 del decreto). Si el empleador se queda sin trabajadores registrados durante ${MESES_SIN_TRABAJADORES} meses continuos, la cuenta se extingue y el remanente se transfiere a una cuenta bancaria de su titularidad (art. 72).`,
  },
  {
    q: "¿Cuánto cobra la administradora?",
    a: `Hasta ${TOPE_COMISION_ANUAL}%. El art. 71 fija ese tope y el art. 20 del decreto lo define sin lugar a interpretaciones: «${FAL_TEXTOS.decretoArt20}». O sea que no hay comisiones adicionales por fuera de ese techo. El empleador elige la entidad, pero el art. 62 le prohíbe elegir una en la que tenga participación directa o indirecta, bajo la multa del art. 75.`,
  },
  {
    q: "¿Qué pasa si el empleador usa la plata para otra cosa?",
    a: `El art. 75 prevé una multa de hasta ${MULTA_MULTIPLO} veces el monto ingresado al Fondo, más su rendimiento devengado a la fecha de la multa, «sin perjuicio de las acciones civiles y/o penales que pudieran corresponder». La misma sanción alcanza a quien elija una entidad habilitada con la que tenga vinculación.`,
  },
  {
    q: "¿Cuánto tarda en llegarle la plata al trabajador?",
    a: `El art. 69 le da a la entidad administradora un plazo máximo de ${DIAS_HABILES_TRANSFERENCIA} días hábiles para transferir a la cuenta bancaria del trabajador, una vez verificada la declaración jurada que presenta el empleador. Pero el uso del fondo es una opción del empleador, no una obligación: «${FAL_TEXTOS.opcionDelEmpleador}».`,
  },
];

export default function FondoDeAsistenciaLaboralPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora del Fondo de Asistencia Laboral (FAL)",
        url: "https://calcular.ar/fondo-de-asistencia-laboral",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Fondo de Asistencia Laboral (FAL): el Título II de la Ley 27.802, artículo por artículo",
        descripcion:
          "El FAL arranca el 1° de noviembre de 2026 tras la única prórroga de toda la Ley de Modernización Laboral. Las dos alícuotas del art. 60, la reducción equivalente de contribuciones patronales del art. 76, la carencia de seis períodos del art. 65 y la oración del art. 58 que desmiente que reemplace a la indemnización.",
        url: "/fondo-de-asistencia-laboral",
        modificado: FAL_FUENTES.consultadoEl,
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
          Fondo de Asistencia Laboral: qué se aporta desde el {VIGENCIA_FAL}
        </h1>
        <p className="text-zinc-600">
          Es el único tramo de la reforma laboral que todavía no arrancó, y el que más se cuenta
          mal. Dos cosas hay que sacar del medio antes de mirar los números:{" "}
          <strong>no reemplaza la indemnización por despido</strong> y, salvo un caso escrito en la
          ley, <strong>no aumenta el costo laboral</strong> — porque lo que se aporta al Fondo se
          detrae de las contribuciones patronales.
        </p>
      </header>

      <RespuestaPrimero actualizado={FAL_FUENTES.consultadoEl}>
        <p>
          <strong>El FAL empieza el {VIGENCIA_FAL}</strong>, tras la prórroga del art. 27 del
          Decreto 408/2026 —la única de toda la Ley de Modernización Laboral—. Cada empleador privado
          abre una cuenta propia, inembargable, en una entidad habilitada por la CNV, y aporta{" "}
          <strong>
            {ALICUOTAS.vigentes.pyme}% (MiPyME) o {ALICUOTAS.vigentes.grande}% (gran empresa)
          </strong>{" "}
          de la base de contribuciones patronales al SIPA. El art. 76 le devuelve esa misma alícuota
          como reducción de contribuciones patronales, así que el impacto neto es cero — salvo en las
          relaciones alcanzadas por el RIFL, que quedan expresamente afuera de esa reducción. El
          fondo no responde durante los primeros {PERIODOS_CARENCIA} períodos (art. 65) ni por
          trabajadores con menos de {MESES_ANTIGUEDAD_MINIMA} meses de registración (art. 58). Y no
          cambia un peso de lo que cobra el trabajador: «{FAL_TEXTOS.noSustituye}».
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tu aporte</h2>
        <p className="text-sm text-zinc-600">
          Cargá tu masa salarial y el mes de la primera contribución. La calculadora hace la
          aritmética que está en la ley: la alícuota, la reducción del art. 76, el corrimiento de la
          carencia y el tope de comisión. No proyecta rendimientos, porque no hay un rendimiento
          legal que publicar.
        </p>
        <CalculadoraFal />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Las tres oraciones que desmienten el titular
        </h2>
        <p className="text-sm text-zinc-600">
          «El fondo reemplaza la indemnización» es lo que más se lee y lo que la ley niega en tres
          artículos distintos. Los tres textos, completos:
        </p>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">Art. 58, último párrafo</p>
            <p className="mt-1 text-sm italic text-zinc-700">«{FAL_TEXTOS.noSustituye}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">Art. 64</p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{FAL_TEXTOS.responsabilidadIntegra}»
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">Art. 68</p>
            <p className="mt-1 text-sm italic text-zinc-700">«{FAL_TEXTOS.administradoraAjena}»</p>
          </blockquote>
        </div>
        <p className="text-sm text-zinc-600">
          Leídas juntas dicen una sola cosa: el obligado sigue siendo el empleador, por el importe
          completo, y el Fondo es una caja suya para afrontarlo. Si la cuenta no alcanza, la
          diferencia la pone él igual.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Por qué no es un costo nuevo</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              La ley — art. 76
            </p>
            <p className="mt-2 text-sm italic text-zinc-700">«{FAL_TEXTOS.art76}»</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              El decreto — art. 24
            </p>
            <p className="mt-2 text-sm italic text-zinc-700">«{FAL_TEXTOS.decretoArt24}»</p>
          </div>
        </div>
        <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">La excepción, escrita y única</p>
          <p className="mt-1 text-sm text-zinc-700">
            Las relaciones alcanzadas por el{" "}
            <Link href="/rifl" className="font-medium text-emerald-700 hover:underline">
              Régimen de Incentivo a la Formalización Laboral (RIFL)
            </Link>{" "}
            quedan fuera de la reducción «mientras persista sus efectos». Para esas relaciones —y
            sólo para esas—, el aporte al Fondo es plata adicional. Es una diferencia del 100% del
            costo, y depende de un solo dato.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué se puede pagar con el Fondo</h2>
        <p className="text-sm text-zinc-600">
          El art. 58 enumera los artículos de la LCT cuyo pago el fondo puede «coadyuvar» a cumplir,
          más las indemnizaciones de preaviso, integración y despido de los estatutos profesionales
          y las de la Ley 26.727 de trabajo agrario. La lista es taxativa:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[30rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left">
                <th className="py-2 pr-3 font-medium text-zinc-600">Artículo de la LCT</th>
                <th className="py-2 pl-3 font-medium text-zinc-600">Concepto</th>
              </tr>
            </thead>
            <tbody>
              {ARTICULOS_CUBIERTOS.map((a) => (
                <tr key={a.articulo} className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3 font-medium text-zinc-800">{a.articulo}</td>
                  <td className="py-2 pl-3 text-zinc-600">{a.concepto}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-500">
          Nótese qué NO está: las multas e indemnizaciones agravadas por falta de registración. El
          Fondo asiste al pago de la extinción regular, no al costo de haber estado mal registrado.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Quiénes quedan afuera</h2>
        <div className="space-y-3">
          {EXCLUIDOS.map((e) => (
            <div key={e.norma} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-zinc-800">
                {e.quienes} <span className="font-normal text-zinc-500">— {e.norma}</span>
              </p>
              <p className="mt-1 text-sm text-zinc-600">{e.porQue}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los dos plazos que dejan afuera</h2>
        <div className="space-y-3">
          <details className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <summary className="cursor-pointer font-semibold text-zinc-800">
              Carencia de {PERIODOS_CARENCIA} períodos — art. 65 de la ley y art. 15 del decreto
            </summary>
            <p className="mt-2 text-sm italic text-zinc-600">«{FAL_TEXTOS.art65}»</p>
            <p className="mt-2 text-sm italic text-zinc-600">«{FAL_TEXTOS.decretoArt15}»</p>
            <p className="mt-2 text-sm text-zinc-700">
              El decreto es el que evita la discusión: no se cuentan meses corridos desde que arranca
              el régimen, sino seis períodos de devengamiento y pago completos y consecutivos desde
              que ARCA registra la primera contribución efectivamente integrada.
            </p>
          </details>
          <details className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <summary className="cursor-pointer font-semibold text-zinc-800">
              Antigüedad de {MESES_ANTIGUEDAD_MINIMA} meses del trabajador — art. 58
            </summary>
            <p className="mt-2 text-sm italic text-zinc-600">«{FAL_TEXTOS.noRegistrados}»</p>
            <p className="mt-2 text-sm text-zinc-700">
              Dos filtros en una sola oración. El de los doce meses deja fuera del Fondo justamente a
              las relaciones más cortas —que son las que más se extinguen—, y el de los no
              registrados es absoluto: «en ningún caso y bajo ninguna circunstancia». La
              indemnización se paga igual; lo que no se puede es pagarla con la cuenta.
            </p>
          </details>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La letra chica del decreto</h2>
        <div className="space-y-3">
          {[
            {
              art: "Art. 11 — la plata se queda en el país",
              texto: FAL_TEXTOS.decretoArt11,
              porQue:
                "Define el universo de inversión del fondo. Ningún activo con subyacente emitido o negociado en el exterior.",
            },
            {
              art: `Art. 20 — el ${TOPE_COMISION_ANUAL}% de comisión es global y anual`,
              texto: FAL_TEXTOS.decretoArt20,
              porQue:
                "Cierra la puerta a comisiones adicionales por fuera del tope: comprende «cualquier otro interviniente».",
            },
            {
              art: `Art. 27 — la prórroga al ${VIGENCIA_FAL}`,
              texto: FAL_TEXTOS.decretoArt27,
              porQue: `El art. 77 de la ley fijaba el ${VIGENCIA_ORIGINAL} y permitía correrlo hasta seis meses. El Poder Ejecutivo usó el plazo entero. Es la única prórroga de toda la Ley de Modernización Laboral.`,
            },
          ].map((a) => (
            <details
              key={a.art}
              className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-zinc-800">{a.art}</summary>
              <p className="mt-2 text-sm italic text-zinc-600">«{a.texto}»</p>
              <p className="mt-2 text-sm text-zinc-700">{a.porQue}</p>
            </details>
          ))}
        </div>
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
          Las indemnizaciones que el Fondo asiste, calculadas una por una:{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            despido sin causa
          </Link>
          ,{" "}
          <Link
            href="/indemnizacion-por-fallecimiento"
            className="font-medium text-emerald-700 hover:underline"
          >
            muerte del trabajador
          </Link>{" "}
          y{" "}
          <Link
            href="/despido-trabajador-rural"
            className="font-medium text-emerald-700 hover:underline"
          >
            despido del trabajador rural
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {FAL_FUENTES.lista.map((f) => (
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
          Esta página cita el texto oficial de la Ley 27.802 y del Decreto 408/2026 publicados en
          InfoLEG — no un resumen de prensa. Es informativa y orientativa: no reemplaza el
          asesoramiento de un profesional ni una liquidación. Consultada el {FAL_FUENTES.consultadoEl}
          .
        </p>
      </section>
    </article>
  );
}
