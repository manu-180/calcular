import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraART } from "@/components/CalculadoraART";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { SelloVerificado } from "@/components/SelloVerificado";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ART_FUENTES,
  ART_TEXTOS,
  COMPENSACIONES,
  FORMULA,
  PISOS,
  TRAMOS,
  VALORES_2009,
  VIGENCIA_ART,
} from "@/data/riesgos-trabajo";

const pesos = (n: number) =>
  n.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 });

export const metadata: Metadata = {
  title: "Indemnización por accidente de trabajo (ART): calculadora con los pisos vigentes",
  description:
    "El texto de la Ley 24.557 todavía dice que la indemnización «en ningún caso será superior a $180.000». El Decreto 1694/2009 suprimió ese tope y convirtió el número en PISO, y hoy ese piso es de $114.354.110 por el porcentaje de incapacidad. Calculá el monto con la resolución SRT vigente.",
  alternates: { canonical: "/indemnizacion-art" },
  openGraph: {
    title: "Indemnización por accidente de trabajo (ART)",
    description:
      "Los $180.000 de la ley no son un techo: son un piso, y hoy valen $114.354.110. Calculalo con la resolución SRT vigente.",
    url: "https://calcular.ar/indemnizacion-art",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Indemnización por accidente de trabajo")}&s=${encodeURIComponent("Los pisos vigentes de la Res. SRT 39/2026")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuánto me corresponde por un accidente de trabajo?",
    a: `La fórmula del art. 14 ap. 2 inc. a) de la Ley 24.557 es 53 × el ingreso base mensual × el porcentaje de incapacidad × (65 ÷ tu edad a la primera manifestación invalidante). Pero eso es sólo la mitad: el resultado no puede quedar por debajo del piso legal, que hoy es de ${pesos(PISOS.incapacidadParcial)} multiplicado por el porcentaje de incapacidad (Res. SRT 39/2026, vigente del ${VIGENCIA_ART.desde} al ${VIGENCIA_ART.hasta}). En incapacidades bajas y sueldos bajos, el piso es casi siempre lo que manda.`,
  },
  {
    q: "La ley dice que no puede superar los $180.000. ¿Es así?",
    a: "No, y es exactamente al revés. El texto del art. 14 sigue diciendo «en ningún caso será superior» a $180.000 por el porcentaje de incapacidad, pero el art. 2º del Decreto 1694/2009 SUPRIMIÓ ese tope y el art. 3º del mismo decreto convirtió el número en un piso: «nunca será inferior». Quien copia el artículo de la ley publica lo contrario de lo que rige, con un valor de 2009.",
  },
  {
    q: "¿De dónde sale el piso de hoy?",
    a: `El art. 17 bis de la Ley 26.773 —incorporado por el art. 21 de la Ley 27.348— manda actualizar los pisos y las compensaciones por el índice RIPTE, y la Superintendencia de Riesgos del Trabajo dicta una resolución semestral con los valores. La vigente es la ${VIGENCIA_ART.resolucion} (${VIGENCIA_ART.boletin}): rige del ${VIGENCIA_ART.desde} al ${VIGENCIA_ART.hasta}, y llevó los $180.000 de 2009 a ${pesos(PISOS.incapacidadParcial)}.`,
  },
  {
    q: "¿Qué es el «ingreso base» y por qué no es mi último sueldo?",
    a: "Es el promedio mensual de todos los salarios devengados durante el año anterior a la primera manifestación invalidante —o el tiempo trabajado, si fue menor—, y cada salario mensual se actualiza por RIPTE hasta ese momento (art. 12, sustituido por el Decreto 669/2019). Además, desde la primera manifestación invalidante hasta que la ART pone la plata a disposición, el ingreso base devenga un interés igual a la variación del RIPTE del período.",
  },
  {
    q: "¿Cambia si la incapacidad es total?",
    a: `Sí, y de una forma que se calcula mal seguido: en la incapacidad permanente TOTAL (66% o más) el capital del art. 15 ap. 2 es 53 × ingreso base × (65 ÷ edad) SIN multiplicar por el porcentaje, con un piso de ${pesos(PISOS.incapacidadTotal)}. Y se suma la compensación adicional de pago único del art. 11 ap. 4 inc. b), que hoy es de ${pesos(COMPENSACIONES.total)}.`,
  },
  {
    q: "¿Y si el trabajador falleció?",
    a: `Los derechohabientes —los del art. 53 de la Ley 24.241, con el límite de edad extendido a 21 años, o 25 si estudian y estaban a cargo exclusivo— cobran la prestación del art. 15 ap. 2 más la compensación adicional del art. 11 ap. 4 inc. c), que hoy es de ${pesos(COMPENSACIONES.muerte)}. Si no hay ninguna de esas personas, acceden los padres en partes iguales.`,
  },
  {
    q: "¿Siempre corresponde el 20% adicional?",
    a: `No: el art. 3 de la Ley 26.773 lo reserva a los daños ocurridos «en el lugar de trabajo o […] mientras se encuentre a disposición del empleador». El accidente in itinere —el del camino de ida o vuelta— queda afuera de ese 20%. Cuando corresponde, en muerte o incapacidad total tiene además un piso propio de ${pesos(PISOS.adicional20)}.`,
  },
  {
    q: "¿Puedo cobrar una renta mensual en vez de un pago único?",
    a: "En general no. El texto original preveía una renta periódica para las incapacidades de más del 50% y menos del 66%, pero el art. 2 de la Ley 26.773 estableció que «el principio general indemnizatorio es de pago único».",
  },
  {
    q: "¿Y si la ART se demora en pagar?",
    a: "El art. 12 ap. 3 (texto del Decreto 669/2019) prevé que si la aseguradora no pone la indemnización a disposición dentro del plazo debido, se aplica un interés igual al promedio de la tasa activa cartera general nominal anual vencida a 30 días del Banco de la Nación Argentina hasta la efectiva cancelación, capitalizándose semestralmente (art. 770 del Código Civil y Comercial). Esta calculadora no incluye esos intereses: dependen de la fecha real de pago.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de indemnización por accidente de trabajo (ART)",
        url: "https://calcular.ar/indemnizacion-art",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Indemnización por accidente de trabajo (ART)",
        descripcion:
          "La fórmula del art. 14 de la Ley 24.557, el piso vigente de la resolución semestral de la SRT y el tope que el Decreto 1694/2009 suprimió y la web sigue publicando.",
        url: "/indemnizacion-art",
        modificado: ART_FUENTES.consultadoEl,
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
          Indemnización por accidente de trabajo (ART)
        </h1>
        <p className="text-zinc-600">
          El texto vigente de la Ley 24.557 todavía dice que la indemnización{" "}
          <strong>«en ningún caso será superior»</strong> a {pesos(VALORES_2009.piso)} por el
          porcentaje de incapacidad. Eso es <strong>lo contrario</strong> de lo que rige: el
          Decreto 1694/2009 suprimió ese tope y convirtió el mismo número en un{" "}
          <strong>piso</strong>, que la SRT actualiza cada seis meses por RIPTE. Hoy vale{" "}
          <strong>{pesos(PISOS.incapacidadParcial)}</strong>.
        </p>
      </header>

      <SelloVerificado
        verificadoEl={ART_FUENTES.consultadoEl}
        norma={`Ley 24.557 arts. 11, 12, 14, 15 y 18 · Dec. 1694/2009 · Ley 26.773 · ${VIGENCIA_ART.resolucion}`}
        fuente={ART_FUENTES.principal}
      />

      <RespuestaPrimero actualizado={ART_FUENTES.consultadoEl}>
        <p>
          <strong>
            53 × ingreso base × % de incapacidad × (65 ÷ edad), y nunca menos de{" "}
            {pesos(PISOS.incapacidadParcial)} × % de incapacidad
          </strong>{" "}
          (art. 14 ap. 2 inc. a de la Ley 24.557 + {VIGENCIA_ART.resolucion}). Si la incapacidad es
          total, el capital del art. 15 ap. 2 va <strong>sin</strong> multiplicar por el
          porcentaje, con piso de {pesos(PISOS.incapacidadTotal)}. A eso se suman las
          compensaciones de pago único del art. 11 ap. 4 y, si el daño ocurrió en el lugar de
          trabajo, el 20% del art. 3 de la Ley 26.773.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá el monto</h2>
        <p className="text-sm text-zinc-600">
          Los tres datos que deciden son el ingreso base, la edad{" "}
          <em>a la primera manifestación invalidante</em> y el porcentaje que fijó la comisión
          médica. La calculadora muestra la fórmula y el piso por separado, para que se vea cuál
          de los dos manda.
        </p>
        <CalculadoraART />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El número que la web publica al revés
        </h2>
        <p className="text-zinc-600">
          Esto sigue escrito, hoy, en el texto actualizado del art. 14 ap. 2 inc. a) de la Ley
          24.557 en InfoLEG:
        </p>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Ley 24.557, art. 14 ap. 2 inc. a)</p>
          <p className="mt-1 text-sm text-zinc-700">«{ART_TEXTOS.topeInvertido}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Y esto es lo que dispuso el Decreto 1694/2009, el mismo día, sobre esa misma cifra:
        </p>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm font-semibold text-emerald-900">Decreto 1694/2009, art. 2º</p>
          <p className="mt-1 text-sm text-zinc-700">«{ART_TEXTOS.supresionTopes}»</p>
          <p className="mt-3 text-sm font-semibold text-emerald-900">Decreto 1694/2009, art. 3º</p>
          <p className="mt-1 text-sm text-zinc-700">«{ART_TEXTOS.pisoParcial}»</p>
        </blockquote>
        <p className="text-zinc-600">
          El mismo número, dado vuelta: de techo a piso. Un artículo derogado o suprimido es peor
          que uno incompleto — la nota que lo copia no queda a medias, queda{" "}
          <strong>afirmando lo opuesto</strong>, y acá eso significa decirle a alguien que su
          indemnización tiene un máximo de {pesos(VALORES_2009.piso)} cuando en realidad tiene un
          mínimo de {pesos(PISOS.incapacidadParcial)}.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los valores vigentes: {VIGENCIA_ART.resolucion}
        </h2>
        <p className="text-zinc-600">
          El art. 17 bis de la Ley 26.773 (incorporado por el art. 21 de la Ley 27.348) manda
          actualizar estos importes por RIPTE, y la SRT dicta una resolución semestral. Estos rigen
          del {VIGENCIA_ART.desde} al {VIGENCIA_ART.hasta}:
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Concepto</th>
                  <th className="px-4 py-2.5 font-semibold">Norma</th>
                  <th className="px-4 py-2.5 text-right font-semibold">En 2009</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Hoy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr>
                  <td className="px-4 py-2.5 text-zinc-900">
                    Piso de la incapacidad parcial (× % de incapacidad)
                  </td>
                  <td className="px-4 py-2.5 text-xs text-zinc-500">Art. 14 ap. 2</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-zinc-500">
                    {pesos(VALORES_2009.piso)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-zinc-900">
                    {pesos(PISOS.incapacidadParcial)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-zinc-900">Piso de la incapacidad total</td>
                  <td className="px-4 py-2.5 text-xs text-zinc-500">Art. 15 ap. 2</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-zinc-500">
                    {pesos(VALORES_2009.piso)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-zinc-900">
                    {pesos(PISOS.incapacidadTotal)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-zinc-900">
                    Compensación adicional — incapacidad parcial &gt; 50%
                  </td>
                  <td className="px-4 py-2.5 text-xs text-zinc-500">Art. 11 ap. 4 inc. a)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-zinc-500">
                    {pesos(VALORES_2009.compensaciones.parcialGrave)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-zinc-900">
                    {pesos(COMPENSACIONES.parcialGrave)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-zinc-900">
                    Compensación adicional — incapacidad total
                  </td>
                  <td className="px-4 py-2.5 text-xs text-zinc-500">Art. 11 ap. 4 inc. b)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-zinc-500">
                    {pesos(VALORES_2009.compensaciones.total)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-zinc-900">
                    {pesos(COMPENSACIONES.total)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-zinc-900">Compensación adicional — muerte</td>
                  <td className="px-4 py-2.5 text-xs text-zinc-500">Art. 11 ap. 4 inc. c)</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-zinc-500">
                    {pesos(VALORES_2009.compensaciones.muerte)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-zinc-900">
                    {pesos(COMPENSACIONES.muerte)}
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-zinc-900">
                    Piso del 20% adicional (muerte o incapacidad total)
                  </td>
                  <td className="px-4 py-2.5 text-xs text-zinc-500">Art. 3, Ley 26.773</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-zinc-500">
                    {pesos(VALORES_2009.adicional20)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-zinc-900">
                    {pesos(PISOS.adicional20)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-600">
          La próxima resolución sale alrededor del 1º de marzo de 2027 y se publica en el Boletín
          Oficial. Hasta que aparezca, estos son los valores que rigen.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los cuatro casos, y qué cambia en cada uno</h2>
        <div className="space-y-3">
          {TRAMOS.map((t) => (
            <div key={t.id} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <h3 className="font-semibold text-zinc-900">{t.titulo}</h3>
              <p className="mt-1 text-sm text-zinc-600">{t.detalle}</p>
              <p className="mt-1 text-xs text-zinc-500">{t.norma}</p>
            </div>
          ))}
        </div>
        <p className="text-zinc-600">
          El error de cálculo más frecuente vive entre el primero y el tercero: en la incapacidad
          parcial la fórmula se multiplica por el porcentaje, y en la total{" "}
          <strong>no</strong> — el art. 15 ap. 2 dice «{FORMULA.veces} veces el valor mensual del
          ingreso base multiplicado por un coeficiente», y ahí no hay porcentaje.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El ingreso base no es tu último sueldo
        </h2>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Ley 24.557, art. 12 ap. 1 (texto del Decreto 669/2019)
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{ART_TEXTOS.ingresoBase}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Por eso esta calculadora <strong>pide</strong> el ingreso base en vez de derivarlo de un
          sueldo: la actualización es mes a mes por RIPTE y depende de las doce remuneraciones
          concretas del año anterior a la primera manifestación invalidante. Y hay un segundo
          tramo de intereses que tampoco se puede adivinar: si la ART se demora,
        </p>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/70 p-4">
          <p className="text-sm font-semibold text-amber-900">Ley 24.557, art. 12 ap. 3</p>
          <p className="mt-1 text-sm text-zinc-700">«{ART_TEXTOS.moraArt12}»</p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El 20% del art. 3: qué accidente lo tiene y cuál no
        </h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm font-semibold text-emerald-900">Ley 26.773, art. 3</p>
          <p className="mt-1 text-sm text-zinc-700">«{ART_TEXTOS.adicional20}»</p>
        </blockquote>
        <p className="text-zinc-600">
          «En el lugar de trabajo o […] a disposición del empleador» deja afuera al accidente{" "}
          <em>in itinere</em>, el del camino de ida o de vuelta: está cubierto por el régimen y da
          derecho a la indemnización, pero no a este 20%. Es la distinción que más cambia el total
          y la que menos se explica.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-zinc-900">{f.q}</h3>
              <p className="mt-1 text-zinc-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3 text-sm text-zinc-600">
        <h2 className="text-xl font-bold text-zinc-900">Fuentes</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          {ART_FUENTES.lista.map((f) => (
            <li key={f.url}>
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
          Esta página es informativa y aplica normas publicadas en el Boletín Oficial e InfoLEG; el
          porcentaje de incapacidad lo determina la comisión médica y el monto final lo liquida la
          ART. El trámite ante esa comisión es la instancia previa obligatoria y tiene sus propios
          plazos —60 días hábiles administrativos, perentorios—:{" "}
          <Link href="/comision-medica" className="text-emerald-700 hover:underline">
            plazos de la comisión médica
          </Link>
          . Si además hubo despido, la indemnización laboral corre por separado:{" "}
          <Link href="/indemnizacion" className="text-emerald-700 hover:underline">
            calculadora de indemnización por despido
          </Link>
          . Y si el trabajador falleció, la indemnización del art. 248 de la LCT tiene su propia
          página:{" "}
          <Link href="/indemnizacion-por-fallecimiento" className="text-emerald-700 hover:underline">
            indemnización por fallecimiento
          </Link>
          . Consultada el {ART_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
