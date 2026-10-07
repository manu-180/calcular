import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraLicenciasEspeciales } from "@/components/CalculadoraLicenciasEspeciales";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { openGraphDe } from "@/lib/seo";
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
  title: "Licencias especiales (art. 158 LCT): días y pago",
  description: `Matrimonio, nacimiento, fallecimiento y examen: cuántos días te tocan, hasta qué fecha con feriados y por qué el día se paga sueldo dividido ${DIVISOR_DIA_LICENCIA}.`,
  alternates: { canonical: "/licencias-especiales" },
  openGraph: openGraphDe({
    ruta: "/licencias-especiales",
    titulo: "Licencias especiales · art. 158 LCT",
    bajada: "Días, fechas exactas y cuánto se paga de verdad",
  }),
};

const faqs = [
  {
    q: "¿Cuántos días de licencia por matrimonio da la ley?",
    a: "Diez días corridos (art. 158 inc. b de la LCT). Corridos quiere decir que cuentan sábados, domingos y feriados: si te casás un sábado, los diez días terminan el lunes de la semana siguiente. Y hay un derecho que casi nadie usa. Según el último párrafo del art. 164, si lo pedís, el empleador TIENE que sumarte las vacaciones a la licencia por matrimonio, aunque no fuera la época en que te tocaban.",
  },
  {
    q: "¿Cuántos días son por fallecimiento de un familiar?",
    a: "Tres días corridos si muere tu cónyuge, la persona con la que convivías como pareja, un hijo o tus padres (art. 158 inc. c). Si muere un hermano, un día (inc. d). La ley no cambia los días según la distancia ni si tenés que viajar. Eso lo agregan algunos convenios, no la LCT.",
  },
  {
    q: "Si la licencia cae domingo o feriado, ¿se pierde?",
    a: `Depende de cuál. El art. 160 dice que en las licencias de los incisos a), c) y d) (nacimiento y los dos fallecimientos) "deberá necesariamente computarse un día hábil" cuando caen en domingo, feriado o día no laborable. Si todos los días caen en días no hábiles, la licencia se estira hasta incluir uno. Un caso real de 2026: muere un hermano el domingo 16 de agosto. El único día de licencia cae domingo, y el lunes 17 es feriado por San Martín. Entonces la licencia llega hasta el martes 18. En cambio, la de matrimonio (inc. b) y la de examen (inc. e) NO están en el art. 160: si caen en fin de semana, no se recuperan.`,
  },
  {
    q: "¿Las licencias especiales se pagan?",
    a: `Sí, y acá está el detalle que casi ninguna calculadora tiene en cuenta. El art. 159 dice que las licencias del art. 158 "serán pagas, y el salario se calculará con arreglo a lo dispuesto en el artículo 155". Y el art. 155 inciso a, para quien cobra por mes, manda dividir el sueldo por VEINTICINCO. Un día de licencia especial vale sueldo ÷ ${DIVISOR_DIA_LICENCIA}, no sueldo ÷ ${DIVISOR_DIA_COMUN}: un 20% más. En los diez días de matrimonio, eso es el 40% del sueldo bruto, no el 33,3%. Es la misma cuenta del plus vacacional, aplicada a estas licencias.`,
  },
  {
    q: "¿Cuántos días de licencia por examen me corresponden?",
    a: "Dos días corridos por examen, con un máximo de diez días por año calendario (art. 158 inc. e). El art. 161 pone dos condiciones. Que la carrera sea de un plan de estudios oficial o autorizado por un organismo provincial o nacional. Y que muestres el certificado de la institución que diga que rendiste. Sin ese certificado, el empleador te puede descontar los días.",
  },
  {
    q: "¿Cuántos días por nacimiento de un hijo?",
    a: "Dos días corridos para quien no estuvo embarazada (art. 158 inc. a), con la garantía de día hábil del art. 160. Es el piso legal y es de los más bajos de la región. Muchos convenios lo amplían. La licencia de quien dio a luz es otra cosa: son 90 días y los paga ANSES, no el empleador.",
  },
  {
    q: `¿Qué feriados hay en ${ANIO} y de dónde salen?`,
    a: `No copiamos el calendario: lo sacamos de la Ley 27.399. Los feriados inamovibles tienen fecha fija en su art. 1. El Carnaval y la Semana Santa se calculan desde el domingo de Pascua. Y los trasladables se mueven con la regla del art. 6 (si caen martes o miércoles pasan al lunes anterior; si caen jueves o viernes, al lunes siguiente). Por eso en ${ANIO} el feriado de Güemes, que cae miércoles 17 de junio, se toma el lunes 15. Y el de la Soberanía Nacional, que cae viernes 20 de noviembre, se toma el lunes 23. Lo único que no se calcula son los días turísticos: los fija el Poder Ejecutivo con una norma aparte. Para ${ANIO} son el lunes 23 de marzo, el viernes 10 de julio y el lunes 7 de diciembre (Resolución 164/2025).`,
  },
  {
    q: "¿El sábado cuenta como día hábil?",
    a: "Para la ley, sí. El art. 160 habla de domingos, feriados y días no laborables, y el sábado no es ninguno de los tres. Pero en la mayoría de los trabajos no se trabaja el sábado, y eso cambia el día en que volvés. Por eso la calculadora te lo pregunta en vez de suponerlo: según tu jornada, la vuelta puede caer otro día.",
  },
  {
    q: "¿Mi convenio puede darme más días?",
    a: "Sí, y es lo más común. La LCT pone un piso. El convenio puede mejorarlo con más días, con adicionales por distancia o con motivos que la ley no tiene (mudanza, casamiento de un hijo, donación de sangre). Cuando el convenio da más que la ley, vale el convenio. Esta página muestra el piso legal, que es lo que rige cuando el convenio no dice nada.",
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
        titulo: "Licencias especiales (art. 158 LCT): días y pago",
        descripcion:
          "Los cinco incisos del art. 158, la garantía de día hábil del art. 160 con el calendario oficial de feriados, y el pago del art. 159, que remite al art. 155: sueldo dividido 25.",
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
          Ley de Contrato de Trabajo y son fáciles de encontrar. Lo difícil son otras dos preguntas.
          Primero, <strong>hasta qué día exacto</strong> (hay un artículo que estira la licencia si
          cae en feriado, pero solo para tres de las cinco causas). Y segundo,{" "}
          <strong>cuánto se cobra</strong>, que no es lo mismo que un día común.
        </p>
      </header>

      <RespuestaPrimero actualizado={LICENCIAS_ESPECIALES_FUENTES.consultadoEl}>
        <p>
          Son <strong>10 días corridos</strong> por matrimonio, <strong>3</strong> por fallecimiento
          de cónyuge, hijo o padres, <strong>2</strong> por nacimiento, <strong>2</strong> por
          examen (hasta 10 al año) y <strong>1</strong> por fallecimiento de un hermano. En el
          nacimiento y en los dos fallecimientos, el art. 160 obliga a{" "}
          <strong>contar un día hábil</strong> si todos los días caen en domingo, feriado o día no
          laborable. En el matrimonio y en el examen, no. Y las cinco se pagan como un día de
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
          La columna del medio es la que más se publica mal. El art. 160 nombra solo a los incisos{" "}
          <strong>a), c) y d)</strong> y deja afuera al b) y al e). Si la licencia por matrimonio
          arranca un sábado, el fin de semana se pierde y no se recupera.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El artículo 160, con un caso de este año
        </h2>
        <p className="text-zinc-600">
          Muere un hermano el domingo 16 de agosto de 2026. La ley da un día, y ese día cae domingo.
          El lunes 17 tampoco es hábil: es el feriado de San Martín. Queda así:
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
          Sin el art. 160, esa licencia no habría cubierto ni un día de trabajo. Con él, cubre{" "}
          {CASO_160.diasHabilesCubiertos}. Es la diferencia entre tener la licencia de verdad y
          tenerla solo en el papel.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Cuánto se paga: el día vale sueldo ÷ {DIVISOR_DIA_LICENCIA}, no ÷ {DIVISOR_DIA_COMUN}
        </h2>
        <p className="text-zinc-600">
          El artículo 159 no dice un monto. Dice que el pago de estas licencias se calcula{" "}
          <em>con arreglo a lo dispuesto en el artículo 155</em>. Y el artículo 155, para el sueldo
          mensual, dice: dividir por veinticinco. Es lo mismo que el plus vacacional, y casi nadie lo
          aplica a los diez días de matrimonio o a los tres de duelo.
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
          Para ser honestos: muchas liquidaciones de quienes cobran por mes pagan el mes completo
          sin sumar ese plus, y el tema se discute. Lo de arriba es lo que surge del texto de los
          artículos 159 y 155, que es lo que podés citar en un reclamo. La misma cuenta, aplicada a
          las vacaciones, está en la{" "}
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
          No los copiamos de ningún lado: salen de la Ley 27.399. Los trasladables se mueven solos
          con la regla del art. 6, y por eso dos de ellos no se toman en su fecha.
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
          No están los feriados provinciales ni municipales, ni los días no laborables por religión
          de los artículos 2 y 3 de la Ley 27.399, que tienen calendarios propios.
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
          Si faltás por enfermedad, el plazo es otro y mucho más largo:{" "}
          <Link
            href="/licencia-por-enfermedad"
            className="font-medium text-emerald-700 hover:underline"
          >
            la licencia por enfermedad inculpable
          </Link>{" "}
          va de 3 a 12 meses según antigüedad y cargas de familia. Y si el parto es tuyo, la{" "}
          <Link
            href="/licencia-por-maternidad"
            className="font-medium text-emerald-700 hover:underline"
          >
            licencia por maternidad
          </Link>{" "}
          es de 90 días y la paga ANSES.
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
              </a>
              : {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página es informativa. Usa el texto ACTUALIZADO de la Ley de Contrato de Trabajo
          publicado en InfoLEG, la Ley 27.399 y la resolución de días turísticos del Boletín
          Oficial. No reemplaza a tu convenio, que puede mejorar estos pisos. Textos legales
          consultados el {LICENCIAS_ESPECIALES_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
