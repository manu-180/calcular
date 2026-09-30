import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraLicencias } from "@/components/CalculadoraLicencias";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ANTIGUEDAD_MINIMA_MESES,
  ESTABILIDAD,
  EXCEDENCIA,
  LACTANCIA,
  LICENCIAS_FUENTES,
  MATERNIDAD,
  PATERNIDAD,
} from "@/data/licencias";
import { ASIGNACIONES_VIGENTES as A } from "@/data/asignaciones";
import { formatARS } from "@/lib/formato";

const MES = A.vigencia;

export const metadata: Metadata = {
  title: "Licencia por maternidad: fechas exactas y cuánto cobrás",
  description: `Poné la fecha probable de parto y mirá el día exacto en que empieza y termina tu licencia. Son ${MATERNIDAD.diasTotal} días y podés bajar a ${MATERNIDAD.diasAntesMinimo} días antes del parto —no 15, como se publica—, acumulando el resto después. Durante la licencia cobrás el BRUTO, y lo paga ANSES. Con los artículos 177, 178, 182 y 183 de la LCT.`,
  alternates: { canonical: "/licencia-por-maternidad" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Licencia por maternidad")}&s=${encodeURIComponent("Las fechas exactas, y por qué cobrás el bruto")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuántos días de licencia por maternidad me corresponden?",
    a: `${MATERNIDAD.diasTotal} días en total: ${MATERNIDAD.diasAntes} anteriores al parto y ${MATERNIDAD.diasDespues} posteriores (art. 177 de la Ley de Contrato de Trabajo). Pero el reparto no es fijo: podés pedir que se te reduzca la licencia anterior al parto, que en ese caso no puede ser inferior a ${MATERNIDAD.diasAntesMinimo} días, y el resto se acumula al descanso posterior. O sea que el reparto extremo es ${MATERNIDAD.diasAntesMinimo} días antes y ${MATERNIDAD.diasTotal - MATERNIDAD.diasAntesMinimo} después.`,
  },
  {
    q: `¿El mínimo antes del parto es de 15 días o de ${MATERNIDAD.diasAntesMinimo}?`,
    a: `De ${MATERNIDAD.diasAntesMinimo}. Es uno de los errores más repetidos. El artículo 177 dice textualmente que la persona interesada podrá optar por que se le reduzca la licencia anterior al parto, «que en tal caso no podrá ser inferior a diez (10) días». Los 15 días eran el piso del texto anterior a la reforma de la Ley 24.716 y quedaron circulando en notas y modelos de nota que nadie actualizó.`,
  },
  {
    q: "Durante la licencia, ¿cobro el sueldo o menos?",
    a: `Cobrás el equivalente a tu remuneración BRUTA, y no te lo paga el empleador: es la asignación por maternidad, que paga ANSES. El artículo 177 de la LCT dice que se garantiza «la percepción de una suma igual a la retribución que corresponda al período de licencia legal», y el artículo 11 de la Ley 24.714 lo repite: una suma igual a la remuneración que hubieras debido percibir. Como es una asignación familiar y no una remuneración, no sufre aportes ni contribuciones. Por eso durante la licencia se cobra más que el neto de un mes normal.`,
  },
  {
    q: "¿Qué antigüedad hace falta para cobrarla?",
    a: `${ANTIGUEDAD_MINIMA_MESES} meses continuados en el empleo, y es un requisito de ANSES, no del empleador (art. 11 de la Ley 24.714). Es importante separar las dos cosas: la licencia y la conservación del empleo te corresponden desde el primer día por la LCT; lo que puede faltar con menos de ${ANTIGUEDAD_MINIMA_MESES} meses es el pago de la asignación.`,
  },
  {
    q: "¿Qué pasa si el bebé nace antes de la fecha prevista?",
    a: `No perdés días. El artículo 177 prevé el caso: «en caso de nacimiento pretérmino se acumulará al descanso posterior todo el lapso de licencia que no se hubiere gozado antes del parto, de modo de completar los noventa (90) días». Los ${MATERNIDAD.diasTotal} días están garantizados aunque el parto se adelante.`,
  },
  {
    q: "¿Cuántos días de licencia tiene el padre o la otra persona progenitora?",
    a: `${PATERNIDAD.dias} días corridos por nacimiento de hijo (art. 158 inc. a de la LCT). Hay un detalle que casi no se menciona: el artículo 160 obliga a computar necesariamente un día hábil cuando la licencia coincida con domingo, feriado o día no laborable. O sea que si el nacimiento cae un sábado, los dos días no pueden ser sábado y domingo. Muchos convenios colectivos mejoran ese piso: siempre conviene mirar el convenio antes que la ley.`,
  },
  {
    q: "¿Me pueden despedir estando embarazada o recién vuelta de la licencia?",
    a: `Despedirte no es imposible, pero sale muy caro y la ley presume la causa. El artículo 178 de la LCT presume —salvo prueba en contrario— que el despido obedece a razones de maternidad o embarazo cuando se dispone dentro de los ${ESTABILIDAD.mesesPresuncion} meses anteriores o posteriores al parto, siempre que hayas notificado y acreditado el embarazo o el nacimiento. En ese caso corresponde la indemnización especial del artículo 182: un año de remuneraciones, que se acumula a la indemnización común del artículo 245.`,
  },
  {
    q: "¿Qué es el estado de excedencia y cuánto dura?",
    a: `Es la opción de extender el alejamiento sin cobrar sueldo, conservando el derecho a reintegrarse a las tareas que hacías antes. Dura entre ${EXCEDENCIA.mesesMinimo} y ${EXCEDENCIA.mesesMaximo} meses (art. 183 inc. c de la LCT) y se toma al terminar la licencia. Es un período no pago: no hay asignación de ANSES ni sueldo del empleador. El artículo 183 también permite rescindir el contrato cobrando una compensación del 25% del promedio del artículo 245 por año de servicio, con tope de un salario mínimo por año.`,
  },
  {
    q: "Al volver a trabajar, ¿tengo derecho a pausas para amamantar?",
    a: `Sí: ${LACTANCIA.descansosPorDia} descansos de ${LACTANCIA.minutosCadaUno} minutos por día dentro de la jornada, durante el año posterior al nacimiento, y por más tiempo si hay indicación médica (art. 179 de la LCT). El mismo artículo obliga a habilitar salas maternales y guarderías en los establecimientos que superen el número mínimo de trabajadoras que fije la reglamentación.`,
  },
  {
    q: "¿Además de la licencia cobro algún pago extra por el nacimiento?",
    a: `Sí, la asignación por nacimiento: un pago único de ${formatARS(A.nacimiento, 0)} en ${MES}, que se cobra acreditando el hecho ante ANSES (art. 12 de la Ley 24.714). Por adopción el pago único es de ${formatARS(A.adopcion, 0)}. Durante el embarazo también corresponde la asignación prenatal, que se cobra por mes y usa la misma tabla de tramos por ingreso que la asignación por hijo.`,
  },
];

export default function LicenciaMaternidadPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de licencia por maternidad",
        url: "https://calcular.ar/licencia-por-maternidad",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Licencia por maternidad: fechas exactas y cuánto cobrás",
        descripcion:
          "Cálculo de las fechas de la licencia por maternidad con el art. 177 de la LCT, la opción de reducir el tramo anterior al parto hasta 10 días, y la regla de pago de la asignación por maternidad de ANSES.",
        url: "/licencia-por-maternidad",
        modificado: LICENCIAS_FUENTES.consultadoEl,
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
          Licencia por maternidad: las fechas exactas, no «tres meses»
        </h1>
        <p className="text-zinc-600">
          Poné la fecha probable de parto y mirá qué día empezás, qué día terminás y qué día volvés.
          Y dos cosas que se publican mal en casi todos lados: el mínimo antes del parto es de{" "}
          {MATERNIDAD.diasAntesMinimo} días —no 15— y durante la licencia cobrás el{" "}
          <strong>bruto</strong>, porque no es sueldo: es una asignación de ANSES.
        </p>
      </header>

      <RespuestaPrimero actualizado={LICENCIAS_FUENTES.consultadoEl}>
        <p>
          La licencia por maternidad son <strong>{MATERNIDAD.diasTotal} días</strong>:{" "}
          {MATERNIDAD.diasAntes} antes del parto y {MATERNIDAD.diasDespues} después (art. 177 de la
          LCT). Podés pedir que el tramo anterior se reduzca hasta un mínimo de{" "}
          <strong>{MATERNIDAD.diasAntesMinimo} días</strong>, y lo que no tomás antes se acumula
          después. Durante todo ese período no cobrás sueldo del empleador: cobrás la{" "}
          <strong>asignación por maternidad de ANSES</strong>, que es una suma igual a la
          remuneración que hubieras debido percibir —el bruto, sin aportes— y exige{" "}
          {ANTIGUEDAD_MINIMA_MESES} meses de antigüedad. Si el bebé nace antes de tiempo, los días
          no gozados se acumulan al descanso posterior hasta completar los {MATERNIDAD.diasTotal}.
        </p>
      </RespuestaPrimero>

      <CalculadoraLicencias />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Por qué durante la licencia cobrás más que un mes normal
        </h2>
        <p className="text-zinc-600">
          Es la simetría exacta de la{" "}
          <Link href="/desempleo" className="font-medium text-emerald-700 hover:underline">
            prestación por desempleo
          </Link>
          , que se calcula sobre el neto. Acá es al revés, y por una razón concreta: la asignación
          por maternidad no es una remuneración, así que no está sujeta a aportes ni a
          contribuciones. El monto que llega a tu cuenta es el bruto de tu recibo.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Concepto</th>
                  <th className="px-4 py-2.5 font-semibold">Quién paga</th>
                  <th className="px-4 py-2.5 font-semibold">Sobre qué base</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-100 bg-emerald-50/50">
                  <td className="px-4 py-2.5 font-medium text-zinc-800">
                    Asignación por maternidad
                    <span className="block text-xs text-zinc-500">
                      Art. 177 LCT · art. 11 Ley 24.714
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">ANSES</td>
                  <td className="px-4 py-2.5 text-zinc-900">Remuneración bruta</td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-700">
                    Prestación por desempleo
                    <span className="block text-xs text-zinc-500">Res. CNEPySMVM 4/2026</span>
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">ANSES</td>
                  <td className="px-4 py-2.5 text-zinc-600">75% del neto</td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-700">
                    Asignación por nacimiento (pago único)
                    <span className="block text-xs text-zinc-500">Art. 12 Ley 24.714</span>
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">ANSES</td>
                  <td className="px-4 py-2.5 text-zinc-900">
                    {formatARS(A.nacimiento, 0)} en {MES}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-700">
                    Estado de excedencia
                    <span className="block text-xs text-zinc-500">Art. 183 inc. c) LCT</span>
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">nadie</td>
                  <td className="px-4 py-2.5 text-zinc-600">
                    sin goce de sueldo, {EXCEDENCIA.mesesMinimo} a {EXCEDENCIA.mesesMaximo} meses
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Para saber cuál es tu bruto si sólo conocés lo que cobrás en mano, pasalo por la{" "}
          <Link href="/sueldo-neto" className="font-medium text-emerald-700 hover:underline">
            calculadora de sueldo neto
          </Link>
          , que también hace el camino inverso. Y si tenés hijos a cargo, mirá las{" "}
          <Link
            href="/asignaciones-familiares"
            className="font-medium text-emerald-700 hover:underline"
          >
            asignaciones familiares
          </Link>{" "}
          que seguís cobrando durante la licencia.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los {PATERNIDAD.dias} días por nacimiento, y la trampa del domingo
        </h2>
        <p className="text-zinc-600">
          La licencia por nacimiento de hijo del artículo 158 inciso a) son{" "}
          {PATERNIDAD.dias} días corridos. Lo que casi nadie menciona es el artículo 160: cuando esos
          días coinciden con domingo, feriado o día no laborable,{" "}
          <strong>debe computarse necesariamente un día hábil</strong>. Un nacimiento un sábado no
          se «paga» con sábado y domingo. Muchos convenios colectivos mejoran ese piso de dos días
          —conviene mirar el convenio antes que la ley:{" "}
          <Link href="/convenios" className="font-medium text-emerald-700 hover:underline">
            acá están las escalas y los convenios verificados
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La ventana en la que un despido cuesta un año de sueldos
        </h2>
        <p className="text-zinc-600">
          Entre los {ESTABILIDAD.mesesPresuncion} meses anteriores y los{" "}
          {ESTABILIDAD.mesesPresuncion} meses posteriores al parto, el artículo 178 de la LCT
          presume que el despido obedece a razones de maternidad, siempre que hayas notificado y
          acreditado el embarazo o el nacimiento. Esa presunción admite prueba en contrario, pero
          cuando se confirma dispara el artículo 182: una indemnización especial equivalente a{" "}
          <strong>un año de remuneraciones</strong>, que se <em>acumula</em> a la del artículo 245.
          La calculadora de arriba te marca las dos fechas de esa ventana; para la indemnización
          común, está la{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            calculadora de despido
          </Link>
          .
        </p>
        <p className="text-sm text-zinc-500">
          La notificación fehaciente del embarazo es la condición de todo esto: sin ella, la
          presunción no se activa. El propio artículo 177 exige comunicar el embarazo al empleador
          con certificado médico donde conste la fecha presunta del parto.
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
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {LICENCIAS_FUENTES.lista.map((f) => (
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
          Esta página es informativa y aplica el texto vigente de la Ley de Contrato de Trabajo y de
          la Ley 24.714, verificado en InfoLEG. No reemplaza al asesoramiento de un profesional ni a
          ANSES: el convenio colectivo de tu actividad puede mejorar estos pisos y la liquidación
          concreta depende de tu situación registrada. Consultada el {LICENCIAS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
