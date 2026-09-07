import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraDespidoCasas } from "@/components/CalculadoraDespidoCasas";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  CAMBIOS_TITULO_X,
  DESPIDO_CASAS_FUENTES,
  DESPIDO_CASAS_TEXTOS,
  PREAVISO,
  PRUEBA_DIAS_ANTERIOR_CON_RETIRO,
  PRUEBA_DIAS_ANTERIOR_SIN_RETIRO,
  PRUEBA_MESES_VIGENTE,
  PRUEBA_TOPE_MESES_ANTERIOR_CON_RETIRO,
  VIGENCIA_REFORMA,
} from "@/data/despido-casas-particulares";

export const metadata: Metadata = {
  title: "Despido de empleada doméstica: liquidación final con el texto 2026",
  description: `El período de prueba del personal de casas particulares pasó de ${PRUEBA_DIAS_ANTERIOR_SIN_RETIRO} días a ${PRUEBA_MESES_VIGENTE} meses el ${VIGENCIA_REFORMA}. Calculá preaviso, integración del mes, indemnización del art. 48, aguinaldo y vacaciones proporcionales, con el artículo que corresponde según la fecha.`,
  alternates: { canonical: "/despido-empleada-domestica" },
  openGraph: {
    title: "Despido de empleada doméstica: el período de prueba ahora son 6 meses",
    description:
      "El art. 107 de la Ley 27.802 reescribió el art. 7 de la Ley 26.844: de 30 días (sin retiro) y 15 (con retiro) a un plazo único de seis meses. La liquidación final, artículo por artículo.",
    url: "https://calcular.ar/despido-empleada-domestica",
    images: [
      {
        url: "/og?t=Despido%20de%20empleada%20dom%C3%A9stica&s=El%20per%C3%ADodo%20de%20prueba%20ahora%20son%206%20meses",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuánto dura el período de prueba de una empleada doméstica en 2026?",
    a: `Seis meses, para las dos modalidades. Y es un cambio reciente que casi nadie publicó. El texto original del artículo 7 de la Ley 26.844, vigente desde 2013, decía «durante los primeros treinta (30) días de su vigencia respecto del personal sin retiro; y durante los primeros quince (15) días de trabajo en tanto no supere los tres (3) meses para el personal con retiro». El artículo 107 de la Ley 27.802 lo sustituyó el ${VIGENCIA_REFORMA} por un plazo único: «durante los primeros seis (6) meses de vigencia», sin distinguir modalidad. Para el personal sin retiro el período de prueba se multiplicó por seis.`,
  },
  {
    q: "Si la despido dentro de los seis meses, ¿no le pago nada?",
    a: "Indemnización, no. El artículo 7 dice que cualquiera de las partes puede extinguir la relación durante ese lapso «sin expresión de causa y sin generarse derecho a indemnización alguna con motivo de la extinción» — y la palabra «alguna» tampoco estaba en el texto anterior. Pero eso no es lo mismo que no pagar nada: los días trabajados del mes son salario y se pagan siempre, y el aguinaldo proporcional lo manda el artículo 28 «cuando se opere la extinción del contrato de trabajo por cualquier causa». Lo que no corresponde es la indemnización por antigüedad del artículo 48.",
  },
  {
    q: "¿Cuántos días de preaviso hay que dar?",
    a: `Diez días si la antigüedad es menor a un año y treinta si es mayor, cuando el despido lo dispone el empleador (artículo 42 inciso b). Si es la empleada la que renuncia, son ${PREAVISO.diasDeLaEmpleada} días (inciso a). Si el empleador no lo da, paga la indemnización sustitutiva del artículo 43, equivalente al sueldo de esos días. Y hay un detalle propio del régimen que suele faltar: durante el preaviso, el personal sin retiro tiene derecho a diez horas semanales remuneradas para buscar otro trabajo (artículo 45).`,
  },
  {
    q: "¿Cómo se calcula la indemnización por despido?",
    a: "Un mes de sueldo por cada año de servicio o fracción mayor de tres meses, tomando «la mejor remuneración, mensual, normal y habitual devengada durante el último año o durante el tiempo de prestación de servicios si éste fuera menor» (artículo 48). El piso es un mes de sueldo: nunca puede ser menos. Y una diferencia importante con el régimen general: acá no hay tope de convenio como el del artículo 245 de la LCT — el artículo 48 no lo prevé.",
  },
  {
    q: "¿Se aplica la Ley de Contrato de Trabajo a las empleadas domésticas?",
    a: `Cada vez menos, y eso cambió el ${VIGENCIA_REFORMA}. Hasta entonces el inciso b) del artículo 2° de la LCT —escrito por el artículo 72 de la propia Ley 26.844— decía que la LCT no se aplica al personal de casas particulares «sin perjuicio que las disposiciones de la presente ley serán de aplicación en todo lo que resulte compatible y no se oponga a la naturaleza y modalidades propias del régimen específico». El artículo 1º de la Ley 27.802 lo reescribió: ahora la excepción es «con la sola excepción de aquellas normas que el régimen de la Ley (…) N° 26.844 (…) expresamente declare aplicables». La regla se dio vuelta: pasó de «se aplica salvo incompatibilidad» a «no se aplica salvo remisión expresa». Que fue deliberado se ve en el inciso siguiente: el de los trabajadores agrarios conserva la fórmula vieja de aplicación supletoria.`,
  },
  {
    q: "¿Se pagan las vacaciones no gozadas?",
    a: "Acá hay un punto abierto que conviene conocer antes de firmar nada. La Ley 26.844 no tiene un artículo equivalente al 156 de la LCT: la expresión «no gozada» no aparece en toda la norma. Lo que sí tiene es el artículo 30, que da un día de descanso por cada veinte de trabajo efectivo a quien no llegó a los seis meses del año. Hasta el 5 de marzo de 2026, el vacío se llenaba con la LCT por vía supletoria. Desde el 6 de marzo, esa vía exige remisión expresa del régimen, y el régimen no remite. La calculadora liquida el proporcional como se venía haciendo, pero el fundamento cambió: es un tema que van a definir los tribunales y vale consultarlo con un profesional.",
  },
  {
    q: "¿Qué más cambió en el régimen de casas particulares?",
    a: "El Título X de la Ley 27.802 tocó cuatro artículos. Además del período de prueba: el artículo 14 admite distribuir la semana en forma desigual hasta nueve horas diarias, permite reemplazar la ropa de trabajo por una suma no remunerativa una vez cumplido el período de prueba y escribe la pausa de doce horas entre jornadas para el personal con retiro; el artículo 20 vuelve obligatorio el recibo electrónico emitido por el sistema que determine ARCA; y el artículo 70 manda actualizar los créditos laborales del régimen con la misma regla del artículo 276 de la LCT.",
  },
  {
    q: "¿Y si la empleada se considera despedida?",
    a: "El artículo 49 lo resuelve con una remisión: en el despido indirecto —cuando la empleada denuncia el contrato con justa causa— corresponden las mismas indemnizaciones de los artículos 43 (sustitutiva del preaviso), 44 (integración del mes) y 48 (antigüedad). O sea, la misma liquidación que en un despido sin causa. Lo que hay que poder probar es la justa causa.",
  },
  {
    q: "La multa por no tener registrada a la empleada, ¿sigue existiendo?",
    a: "No en la Ley 26.844. Su artículo 50, que la preveía, fue derogado por el artículo 99 de la Ley 27.742 en julio de 2024 — antes de la reforma de 2026, así que no es novedad de esta ley, pero sigue apareciendo en publicaciones que no se actualizaron. La falta de registración tiene otras consecuencias (aportes adeudados, prueba de la relación), pero esa indemnización agravada específica ya no está en el texto.",
  },
];

export default function DespidoEmpleadaDomesticaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de liquidación final del personal de casas particulares",
        url: "https://calcular.ar/despido-empleada-domestica",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Despido de empleada doméstica: la liquidación final con el texto vigente",
        descripcion:
          "El art. 107 de la Ley 27.802 llevó el período de prueba del personal de casas particulares de 30 días (sin retiro) y 15 (con retiro) a seis meses. Preaviso, integración del mes, indemnización del art. 48, aguinaldo y vacaciones proporcionales, con el artículo que rige según la fecha de egreso.",
        url: "/despido-empleada-domestica",
        modificado: DESPIDO_CASAS_FUENTES.consultadoEl,
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
          Despido de empleada doméstica: qué hay que pagar
        </h1>
        <p className="text-zinc-600">
          El régimen del personal de casas particulares tiene sus propios artículos y no se liquida
          como el resto: el preaviso son días, no meses, y la indemnización no tiene tope. El{" "}
          {VIGENCIA_REFORMA} cambiaron dos cosas de fondo que casi ninguna publicación recogió — el{" "}
          <strong>período de prueba pasó de {PRUEBA_DIAS_ANTERIOR_SIN_RETIRO} días a{" "}
          {PRUEBA_MESES_VIGENTE} meses</strong> y la Ley de Contrato de Trabajo{" "}
          <strong>dejó de aplicarse supletoriamente</strong>.
        </p>
      </header>

      <RespuestaPrimero actualizado={DESPIDO_CASAS_FUENTES.consultadoEl}>
        <p>
          <strong>
            El período de prueba del personal de casas particulares es de {PRUEBA_MESES_VIGENTE}{" "}
            meses desde el {VIGENCIA_REFORMA}
          </strong>{" "}
          (art. 7 de la Ley 26.844, texto del art. 107 de la Ley 27.802). Antes eran{" "}
          {PRUEBA_DIAS_ANTERIOR_SIN_RETIRO} días para el personal sin retiro y{" "}
          {PRUEBA_DIAS_ANTERIOR_CON_RETIRO} días —con tope de{" "}
          {PRUEBA_TOPE_MESES_ANTERIOR_CON_RETIRO} meses— para el personal con retiro. Dentro de ese
          plazo la extinción no genera «indemnización alguna», pero <strong>sí</strong> se pagan los
          días trabajados y el aguinaldo proporcional (art. 28). Pasado el período de prueba: preaviso
          de {PREAVISO.diasHastaUnAnio} o {PREAVISO.diasDesdeUnAnio} días según se llegue al año
          (art. 42), integración del mes (art. 44) e indemnización de{" "}
          <strong>un mes de sueldo por año o fracción mayor de tres meses</strong>, con piso de un
          mes y <strong>sin tope</strong> (art. 48).
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La liquidación final</h2>
        <p className="text-sm text-zinc-600">
          Cargá el sueldo y las dos fechas. La fecha de salida decide qué texto del art. 7 se
          aplica: la calculadora usa el que corresponde y te muestra cuánto habría dado con el otro.
        </p>
        <CalculadoraDespidoCasas />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El artículo 7, antes y después
        </h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 26.844, art. 7 — texto vigente desde el {VIGENCIA_REFORMA}
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{DESPIDO_CASAS_TEXTOS.art7Vigente}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">{DESPIDO_CASAS_TEXTOS.notaVigencia7}</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              El texto ANTERIOR, que rigió desde 2013 y sigue circulando
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{DESPIDO_CASAS_TEXTOS.art7Anterior}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              Rigió hasta el 5 de marzo de 2026 y sigue siendo el correcto para las extinciones
              anteriores a esa fecha: la nota de vigencia dice «a partir de su publicación en el
              Boletín Oficial», sin efecto retroactivo.
            </p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El otro cambio: la LCT dejó de aplicarse supletoriamente
        </h2>
        <p className="text-sm text-zinc-600">
          Este no está en el título del régimen doméstico sino en el primer artículo de la reforma,
          que reescribió el art. 2° de la LCT. Es la razón por la que hoy hay temas del régimen que
          quedaron sin norma de reemplazo.
        </p>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 2° inc. b) — texto vigente
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{DESPIDO_CASAS_TEXTOS.lctArt2IncBVigente}»
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              El texto anterior (escrito por el art. 72 de la propia Ley 26.844)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{DESPIDO_CASAS_TEXTOS.lctArt2IncBAnterior}»
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Y el inciso de al lado, que NO cambió: la prueba de que fue deliberado
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{DESPIDO_CASAS_TEXTOS.lctArt2IncCVigente}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              El inciso c), de los trabajadores agrarios, conserva la fórmula de aplicación
              supletoria «en todo lo que resulte compatible». El b), el de casas particulares, la
              perdió. En el mismo artículo, sancionado el mismo día.
            </p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los cuatro artículos que reescribió la reforma
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="pb-2 font-semibold">Artículo</th>
                <th className="pb-2 font-semibold">Tema</th>
                <th className="pb-2 font-semibold">Qué cambió</th>
              </tr>
            </thead>
            <tbody>
              {CAMBIOS_TITULO_X.map((c) => (
                <tr key={c.articulo} className="border-b border-zinc-200 align-top">
                  <td className="py-3 pr-3 font-mono text-xs text-zinc-500">{c.articulo}</td>
                  <td className="py-3 pr-3 font-medium text-zinc-800">{c.tema}</td>
                  <td className="py-3 text-zinc-600">{c.queCambio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los artículos que NO cambiaron</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 42 — el preaviso, en días
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{DESPIDO_CASAS_TEXTOS.art42}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Y el art. 45, que casi nadie cita: «{DESPIDO_CASAS_TEXTOS.art45}»
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 48 — la indemnización por antigüedad, sin tope
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{DESPIDO_CASAS_TEXTOS.art48}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Arts. 28 y 30 — lo que se cobra igual
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{DESPIDO_CASAS_TEXTOS.art28}»</p>
            <p className="mt-2 text-sm italic text-zinc-700">«{DESPIDO_CASAS_TEXTOS.art30}»</p>
          </blockquote>
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
          El sueldo por categoría y modalidad está en{" "}
          <Link href="/empleada-domestica" className="font-medium text-emerald-700 hover:underline">
            la calculadora de casas particulares
          </Link>
          , los aportes mensuales en{" "}
          <Link
            href="/aportes-empleada-domestica"
            className="font-medium text-emerald-700 hover:underline"
          >
            la de aportes
          </Link>{" "}
          y lo que se puede deducir de Ganancias, en{" "}
          <Link
            href="/deduccion-empleada-domestica"
            className="font-medium text-emerald-700 hover:underline"
          >
            la de deducción
          </Link>
          . Si el contrato es del régimen general, la cuenta es otra:{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            indemnización por despido
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {DESPIDO_CASAS_FUENTES.lista.map((f) => (
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
          Esta página aplica el texto actualizado de la Ley 26.844 publicado en InfoLEG, comparado
          palabra por palabra contra su texto original, no un resumen de prensa. Es informativa y
          orientativa: no reemplaza el asesoramiento de un profesional ni una liquidación.
          Consultada el {DESPIDO_CASAS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
