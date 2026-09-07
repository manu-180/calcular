import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraLicenciasEspeciales } from "@/components/CalculadoraLicenciasEspeciales";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  DIVISOR_DIA_COMUN,
  DIVISOR_DIA_LICENCIA,
  LICENCIAS_ESPECIALES,
  LICENCIAS_ESPECIALES_FUENTES,
} from "@/data/licencias-especiales";
import { TURISTICOS_POR_ANIO } from "@/data/feriados";
import { calendarioDe } from "@/lib/feriados";
import { fechaLarga, parseFechaISO } from "@/lib/licencias";
import { calcularLicenciaEspecial } from "@/lib/licencias-especiales";

const ANIO = 2026;
const CALENDARIO = calendarioDe(ANIO);
const TURISTICOS = TURISTICOS_POR_ANIO[ANIO];

// El caso testigo del art. 160, calculado con el mismo motor que usa la calculadora: un
// fallecimiento de hermano el domingo 16/8/2026, cuando el lunes 17 es feriado.
const CASO_160 = calcularLicenciaEspecial({
  causa: "fallecimiento-hermano",
  fechaInicio: "2026-08-16",
  sabadoEsHabil: false,
  brutoMensual: 0,
})!;

export const metadata: Metadata = {
  title: "Licencias especiales del art. 158 LCT: días, fechas exactas y cuánto se paga",
  description:
    "Matrimonio, nacimiento, fallecimiento y examen: cuántos días te corresponden, hasta qué día exacto y cuándo volvés a trabajar, con los feriados oficiales aplicados. Y lo que casi ninguna calculadora hace: el día de licencia se paga a sueldo ÷ 25, no ÷ 30 (art. 159 → art. 155).",
  alternates: { canonical: "/licencias-especiales" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Licencias especiales · art. 158 LCT")}&s=${encodeURIComponent("Días, fechas exactas y cuánto se paga de verdad")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuántos días de licencia por matrimonio da la ley?",
    a: "Diez días corridos (art. 158 inc. b de la LCT). Corridos quiere decir que se cuentan sábados, domingos y feriados: si el casamiento es un sábado, los diez días terminan el lunes de la semana siguiente. Y hay un derecho que casi nadie usa: el último párrafo del art. 164 dice que el empleador DEBE conceder las vacaciones acumuladas a la licencia por matrimonio si el trabajador se lo pide, aunque eso altere la época en la que le tocaban.",
  },
  {
    q: "¿Cuántos días son por fallecimiento de un familiar?",
    a: "Tres días corridos por fallecimiento del cónyuge, de la persona con la que se convivía en aparente matrimonio, de un hijo o de los padres (art. 158 inc. c). Por fallecimiento de un hermano, un día (inc. d). La ley no distingue por distancia ni por si hay que viajar: eso lo agregan algunos convenios colectivos, no la LCT.",
  },
  {
    q: "Si la licencia cae domingo o feriado, ¿se pierde?",
    a: `Depende de cuál. El art. 160 dice que en las licencias de los incisos a), c) y d) —nacimiento y los dos fallecimientos— "deberá necesariamente computarse un día hábil" cuando coincidan con domingo, feriado o día no laborable. O sea: si los días caen íntegramente en días no hábiles, la licencia se estira hasta incluir uno. Ejemplo real de 2026: un fallecimiento de hermano el domingo 16 de agosto. El único día que fija la ley cae domingo y el lunes 17 es feriado por San Martín, así que la licencia llega hasta el martes 18. En cambio, la licencia por matrimonio (inc. b) y la de examen (inc. e) NO están en el art. 160: si caen en fin de semana, no se recuperan.`,
  },
  {
    q: "¿Las licencias especiales se pagan?",
    a: `Sí, y ahí está el detalle que casi ninguna calculadora hace. El art. 159 dice que las licencias del art. 158 "serán pagas, y el salario se calculará con arreglo a lo dispuesto en el artículo 155". El art. 155 inciso a, para el trabajador con sueldo mensual, manda dividir por VEINTICINCO el sueldo que percibe al momento del otorgamiento. Un día de licencia especial vale sueldo ÷ ${DIVISOR_DIA_LICENCIA}, no sueldo ÷ ${DIVISOR_DIA_COMUN}: un 20% más. Sobre los diez días de matrimonio, eso significa el 40% del sueldo bruto y no el 33,3%. Es la misma cuenta del plus vacacional, aplicada a estas licencias.`,
  },
  {
    q: "¿Cuántos días de licencia por examen me corresponden?",
    a: "Dos días corridos por examen, con un máximo de diez días por año calendario (art. 158 inc. e). El art. 161 pone dos condiciones: que el examen corresponda a planes de enseñanza oficiales o autorizados por un organismo provincial o nacional, y que se acredite haberlo rendido con el certificado del instituto. Sin ese certificado, el empleador puede descontar los días.",
  },
  {
    q: "¿Cuántos días por nacimiento de un hijo?",
    a: "Dos días corridos para la persona progenitora que no cursó el embarazo (art. 158 inc. a), con la garantía de día hábil del art. 160. Es el piso legal y es de los más bajos de la región; muchos convenios colectivos lo amplían. La licencia de quien dio a luz es otra cosa: son 90 días y los paga ANSES, no el empleador.",
  },
  {
    q: `¿Qué feriados hay en ${ANIO} y de dónde salen?`,
    a: `Este sitio no copia el calendario: lo deriva de la Ley 27.399. Los feriados inamovibles tienen fecha fija en su art. 1; el Carnaval y la Semana Santa se calculan a partir del domingo de Pascua; y los trasladables se mueven con la regla del art. 6 (martes y miércoles al lunes anterior, jueves y viernes al lunes siguiente). Por eso en ${ANIO} el feriado de Güemes, que cae miércoles 17 de junio, se goza el lunes 15, y el de la Soberanía Nacional, que cae viernes 20 de noviembre, se goza el lunes 23. Lo único que no se deriva son los días con fines turísticos: los fija el Poder Ejecutivo con una norma propia, y para ${ANIO} son el lunes 23 de marzo, el viernes 10 de julio y el lunes 7 de diciembre (Resolución 164/2025).`,
  },
  {
    q: "¿El sábado cuenta como día hábil?",
    a: "Para la ley, sí: el art. 160 habla de domingos, feriados y días no laborables, y el sábado no es ninguna de esas tres cosas. En la práctica, en la mayoría de los empleos no se trabaja el sábado, y eso cambia el día en que se vuelve efectivamente. Por eso la calculadora lo pregunta en vez de suponerlo: según cómo sea la jornada, el reintegro puede caer un día distinto.",
  },
  {
    q: "¿Mi convenio puede darme más días?",
    a: "Sí, y es lo habitual. La LCT fija un piso; el convenio colectivo puede mejorarlo con más días, con adicionales por distancia o con causales que la ley directamente no tiene (mudanza, matrimonio de un hijo, donación de sangre). Cuando el convenio dice más que la ley, manda el convenio. Esta página publica el piso legal, que es lo que rige cuando el convenio no dice nada.",
  },
];

export default function LicenciasEspecialesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de licencias especiales (art. 158 LCT)",
        url: "https://calcular.ar/licencias-especiales",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Licencias especiales del art. 158 LCT: días, fechas exactas y cuánto se paga",
        descripcion:
          "Los cinco incisos del art. 158, la garantía de día hábil del art. 160 aplicada con el calendario oficial de feriados, y el salario del art. 159, que remite al art. 155: sueldo dividido 25.",
        url: "/licencias-especiales",
        modificado: LICENCIAS_ESPECIALES_FUENTES.consultadoEl,
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
          Licencias especiales: cuántos días, hasta cuándo y cuánto se paga
        </h1>
        <p className="text-zinc-600">
          Matrimonio, nacimiento, fallecimiento y examen. Los días están en el artículo 158 de la
          Ley de Contrato de Trabajo y son fáciles de encontrar. Lo difícil son las otras dos
          preguntas: <strong>hasta qué día exacto</strong> —porque hay un artículo que estira la
          licencia cuando cae en feriado, y solo para tres de las cinco causas— y{" "}
          <strong>cuánto se cobra</strong>, que no es el valor del día común.
        </p>
      </header>

      <RespuestaPrimero actualizado={LICENCIAS_ESPECIALES_FUENTES.consultadoEl}>
        <p>
          Son <strong>10 días corridos</strong> por matrimonio, <strong>3</strong> por fallecimiento
          de cónyuge, hijo o padres, <strong>2</strong> por nacimiento, <strong>2</strong> por
          examen (hasta 10 al año) y <strong>1</strong> por fallecimiento de hermano. En el
          nacimiento y en los dos fallecimientos, el art. 160 obliga a{" "}
          <strong>computar un día hábil</strong> si los días caen en domingo, feriado o día no
          laborable — en el matrimonio y en el examen, no. Y las cinco se pagan a valor día de
          vacaciones: <strong>sueldo ÷ {DIVISOR_DIA_LICENCIA}</strong>, no ÷ {DIVISOR_DIA_COMUN}{" "}
          (art. 159, que remite al art. 155).
        </p>
      </RespuestaPrimero>

      <CalculadoraLicenciasEspeciales />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los cinco incisos, en una tabla</h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Causa</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Días</th>
                  <th className="px-4 py-2.5 text-center font-semibold">¿Día hábil garantizado?</th>
                  <th className="px-4 py-2.5 font-semibold">Inciso</th>
                </tr>
              </thead>
              <tbody>
                {LICENCIAS_ESPECIALES.map((l) => (
                  <tr key={l.causa} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 text-zinc-700">
                      {l.nombre}
                      {l.topeAnual && (
                        <span className="block text-xs text-zinc-400">{l.topeAnual.texto}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">{l.dias}</td>
                    <td className="px-4 py-2.5 text-center">
                      {l.garantizaDiaHabil ? (
                        <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                          sí (art. 160)
                        </span>
                      ) : (
                        <span className="rounded bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600">
                          no
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-zinc-500">{l.inciso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          La columna del medio es la que se publica mal más seguido. El art. 160 nombra
          expresamente a los incisos <strong>a), c) y d)</strong> y deja afuera al b) y al e): la
          licencia por matrimonio que arranca un sábado se come el fin de semana y no se recupera.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El artículo 160, con un caso de este año
        </h2>
        <p className="text-zinc-600">
          Un fallecimiento de hermano el domingo 16 de agosto de 2026. La ley da un día, y ese día
          cae domingo. El lunes 17 tampoco es hábil: es el feriado de San Martín. Así queda:
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <tbody>
              {CASO_160.dias.map((d) => (
                <tr key={d.fecha} className="border-t border-zinc-100 first:border-t-0">
                  <td className="px-4 py-2.5 text-zinc-800">
                    {fechaLarga(parseFechaISO(d.fecha)!)}
                    {d.agregadoPorArt160 && (
                      <span className="ml-2 rounded bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-800">
                        agregado por el art. 160
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-600">
                    {d.feriado ?? (d.habil ? "día hábil" : "día no laborable")}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-zinc-200 bg-zinc-50">
                <td className="px-4 py-2.5 font-medium text-zinc-800">Volvés a trabajar el</td>
                <td className="px-4 py-2.5 text-right font-bold text-zinc-900">
                  {fechaLarga(parseFechaISO(CASO_160.reintegro)!)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-500">
          Sin el art. 160, esa licencia no habría cubierto un solo día de trabajo. Con él, cubre{" "}
          {CASO_160.diasHabilesCubiertos}. Es la diferencia entre tener una licencia y tenerla
          escrita.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Cuánto se paga: el día vale sueldo ÷ {DIVISOR_DIA_LICENCIA}, no ÷ {DIVISOR_DIA_COMUN}
        </h2>
        <p className="text-zinc-600">
          El artículo 159 no fija un importe: manda calcular el salario de estas licencias{" "}
          <em>con arreglo a lo dispuesto en el artículo 155</em>. Y el artículo 155, para el sueldo
          mensual, dice: dividir por veinticinco. Es el mismo mecanismo del plus vacacional, y casi
          nadie lo aplica a los diez días de matrimonio o a los tres de duelo.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Sobre un sueldo bruto de</th>
                  <th className="px-4 py-2.5 text-right font-semibold">
                    Día de licencia (÷ {DIVISOR_DIA_LICENCIA})
                  </th>
                  <th className="px-4 py-2.5 text-right font-semibold">
                    Día común (÷ {DIVISOR_DIA_COMUN})
                  </th>
                  <th className="px-4 py-2.5 text-right font-semibold">10 días de matrimonio</th>
                </tr>
              </thead>
              <tbody>
                {[1_000_000, 1_500_000, 2_000_000].map((bruto) => (
                  <tr key={bruto} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 text-zinc-700">
                      {bruto.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">
                      {(bruto / DIVISOR_DIA_LICENCIA).toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-500">
                      {(bruto / DIVISOR_DIA_COMUN).toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                      {((bruto / DIVISOR_DIA_LICENCIA) * 10).toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Honestidad sobre el punto: muchas liquidaciones de personal mensualizado pagan el mes
          completo sin agregar ese plus, y el tema tiene discusión. Lo que está arriba es lo que
          resulta del texto de los artículos 159 y 155, que es lo que se puede citar en un reclamo.
          La misma cuenta, aplicada a las vacaciones, está en la{" "}
          <Link href="/vacaciones" className="font-medium text-emerald-700 hover:underline">
            calculadora de vacaciones
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los feriados de {ANIO} que usa este cálculo
        </h2>
        <p className="text-zinc-600">
          No están copiados de ningún lado: se derivan de la Ley 27.399. Los trasladables se mueven
          solos con la regla del art. 6, y por eso dos de ellos no se gozan en su fecha.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Fecha</th>
                  <th className="px-4 py-2.5 font-semibold">Feriado</th>
                  <th className="px-4 py-2.5 font-semibold">Tipo</th>
                </tr>
              </thead>
              <tbody>
                {CALENDARIO.feriados.map((f) => (
                  <tr key={`${f.fecha}-${f.nombre}`} className="border-t border-zinc-100">
                    <td className="whitespace-nowrap px-4 py-2 text-zinc-800">
                      {fechaLarga(parseFechaISO(f.fecha)!)}
                    </td>
                    <td className="px-4 py-2 text-zinc-700">
                      {f.nombre}
                      {f.fechaOriginal && (
                        <span className="block text-xs text-zinc-400">
                          trasladado desde el {fechaLarga(parseFechaISO(f.fechaOriginal)!)}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-zinc-500">
                      {f.tipo === "inamovible" && "feriado inamovible"}
                      {f.tipo === "trasladable" && "feriado trasladable"}
                      {f.tipo === "no-laborable" && "día no laborable"}
                      {f.tipo === "turistico" && "no laborable · turístico"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Los tres días turísticos de {ANIO} los fijó la {TURISTICOS.norma} ({TURISTICOS.normaBO}).
          No incluye feriados provinciales ni municipales, ni los días no laborables por religión de
          los artículos 2 y 3 de la Ley 27.399, que dependen de calendarios propios.
        </p>
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
          Si la ausencia es por enfermedad, el plazo es otro y mucho más largo:{" "}
          <Link
            href="/licencia-por-enfermedad"
            className="font-medium text-emerald-700 hover:underline"
          >
            la licencia por enfermedad inculpable
          </Link>{" "}
          va de 3 a 12 meses según antigüedad y cargas de familia. Y si el nacimiento es propio, la{" "}
          <Link
            href="/licencia-por-maternidad"
            className="font-medium text-emerald-700 hover:underline"
          >
            licencia por maternidad
          </Link>{" "}
          son 90 días que paga ANSES.
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {LICENCIAS_ESPECIALES_FUENTES.lista.map((f) => (
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
          Esta página es informativa y aplica el texto ACTUALIZADO de la Ley de Contrato de Trabajo
          publicado en InfoLEG, más la Ley 27.399 y la resolución de días turísticos del Boletín
          Oficial. No reemplaza al convenio colectivo, que puede mejorar estos pisos. Textos legales
          consultados el {LICENCIAS_ESPECIALES_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
