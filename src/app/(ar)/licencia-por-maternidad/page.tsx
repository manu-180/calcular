import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraLicencias } from "@/components/CalculadoraLicencias";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { openGraphDe } from "@/lib/seo";
import {
  ANTIGUEDAD_MINIMA_MESES,
  ESTABILIDAD,
  EXCEDENCIA,
  LACTANCIA,
  licenciasFuentes,
  MATERNIDAD,
  PATERNIDAD,
} from "@/data/licencias";
import { asignacionesVigentes } from "@/data/asignaciones";
import { formatARS } from "@/lib/formato";

function datosDelMes() {
  const A = asignacionesVigentes();
  const MES = A.vigencia;
  return { A, MES };
}

type DatosDelMes = ReturnType<typeof datosDelMes>;

export const metadata: Metadata = {
  title: "Licencia por maternidad: fechas exactas y cuánto cobrás",
  description: `Poné la fecha probable de parto y mirá cuándo empieza y termina tu licencia de ${MATERNIDAD.diasTotal} días, cuánto cobrás y quién paga (arts. 177 a 183 LCT).`,
  alternates: { canonical: "/licencia-por-maternidad" },
  openGraph: openGraphDe({
    ruta: "/licencia-por-maternidad",
    titulo: "Licencia por maternidad",
    bajada: "Las fechas exactas, y por qué cobrás el bruto",
  }),
};

const crearFaqs = ({ A, MES }: DatosDelMes) => [
  {
    q: "¿Cuántos días de licencia por maternidad me corresponden?",
    a: `${MATERNIDAD.diasTotal} días en total: ${MATERNIDAD.diasAntes} antes del parto y ${MATERNIDAD.diasDespues} después (art. 177 de la Ley de Contrato de Trabajo). El reparto no es fijo. Podés pedir que se achique la parte de antes del parto, hasta un mínimo de ${MATERNIDAD.diasAntesMinimo} días, y lo que no uses se suma a la de después. Llevado al extremo: ${MATERNIDAD.diasAntesMinimo} días antes y ${MATERNIDAD.diasTotal - MATERNIDAD.diasAntesMinimo} después.`,
  },
  {
    q: `¿El mínimo antes del parto es de 15 días o de ${MATERNIDAD.diasAntesMinimo}?`,
    a: `De ${MATERNIDAD.diasAntesMinimo}. Es uno de los errores más repetidos. El artículo 177 dice que podés pedir que se reduzca la licencia anterior al parto, «que en tal caso no podrá ser inferior a diez (10) días». Los 15 días eran el piso de antes de la reforma de la Ley 24.716. Quedaron dando vueltas en notas y modelos que nadie actualizó.`,
  },
  {
    q: "Durante la licencia, ¿cobro el sueldo o menos?",
    a: `Cobrás lo mismo que tu sueldo BRUTO, y no te lo paga el empleador: es la asignación por maternidad, que paga ANSES. El artículo 177 de la LCT garantiza «la percepción de una suma igual a la retribución que corresponda al período de licencia legal», y el artículo 11 de la Ley 24.714 dice lo mismo. Como es una asignación familiar y no un sueldo, no tiene descuentos de aportes ni contribuciones. Por eso en la licencia cobrás más que el neto de un mes normal.`,
  },
  {
    q: "¿Qué antigüedad hace falta para cobrarla?",
    a: `${ANTIGUEDAD_MINIMA_MESES} meses seguidos en el trabajo. Es un requisito de ANSES, no del empleador (art. 11 de la Ley 24.714). Conviene separar las dos cosas. La licencia y el puesto te corresponden desde el primer día por la LCT. Lo que puede faltar con menos de ${ANTIGUEDAD_MINIMA_MESES} meses es el pago de la asignación.`,
  },
  {
    q: "¿Qué pasa si el bebé nace antes de la fecha prevista?",
    a: `No perdés días. El artículo 177 lo prevé: «en caso de nacimiento pretérmino se acumulará al descanso posterior todo el lapso de licencia que no se hubiere gozado antes del parto, de modo de completar los noventa (90) días». Los ${MATERNIDAD.diasTotal} días están garantizados aunque el parto se adelante.`,
  },
  {
    q: "¿Cuántos días de licencia tiene el padre o la otra persona progenitora?",
    a: `${PATERNIDAD.dias} días corridos por nacimiento (art. 158 inc. a de la LCT). Hay un detalle que casi nadie menciona. El artículo 160 obliga a contar sí o sí un día hábil cuando la licencia cae en domingo, feriado o día no laborable. Si el bebé nace un sábado, los dos días no pueden ser sábado y domingo. Muchos convenios mejoran ese piso, así que mirá primero tu convenio.`,
  },
  {
    q: "¿Me pueden despedir estando embarazada o recién vuelta de la licencia?",
    a: `Poder pueden, pero sale muy caro y la ley supone el motivo. Según el artículo 178 de la LCT, si te despiden dentro de los ${ESTABILIDAD.mesesPresuncion} meses anteriores o posteriores al parto, se presume que fue por el embarazo o la maternidad (salvo que el empleador pruebe lo contrario). Para eso tenés que haber avisado y acreditado el embarazo o el nacimiento. En ese caso te corresponde la indemnización especial del artículo 182: un año de sueldos, que se suma a la indemnización común del artículo 245.`,
  },
  {
    q: "¿Qué es el estado de excedencia y cuánto dura?",
    a: `Es la opción de quedarte más tiempo en casa sin cobrar sueldo, con derecho a volver a tu puesto de antes. Dura entre ${EXCEDENCIA.mesesMinimo} y ${EXCEDENCIA.mesesMaximo} meses (art. 183 inc. c de la LCT) y empieza cuando termina la licencia. No se cobra nada: ni asignación de ANSES ni sueldo. El mismo artículo 183 también te deja terminar el contrato y cobrar una compensación del 25% del promedio del artículo 245 por cada año trabajado, con un tope de un salario mínimo por año.`,
  },
  {
    q: "Al volver a trabajar, ¿tengo derecho a pausas para amamantar?",
    a: `Sí: ${LACTANCIA.descansosPorDia} descansos de ${LACTANCIA.minutosCadaUno} minutos por día dentro de la jornada, durante el año siguiente al nacimiento. Puede ser más tiempo si lo indica un médico (art. 179 de la LCT). El mismo artículo obliga a tener salas maternales y guarderías en los lugares de trabajo que pasen el mínimo de trabajadoras que fija la reglamentación.`,
  },
  {
    q: "¿Además de la licencia cobro algún pago extra por el nacimiento?",
    a: `Sí, la asignación por nacimiento: un pago único de ${formatARS(A.nacimiento, 0)} en ${MES}. Se cobra presentando la partida ante ANSES (art. 12 de la Ley 24.714). Por adopción, el pago único es de ${formatARS(A.adopcion, 0)}. Durante el embarazo también corresponde la asignación prenatal, que se cobra todos los meses y usa la misma tabla por ingresos que la asignación por hijo.`,
  },
];

export default function LicenciaMaternidadPage() {
  const datos = datosDelMes();
  const { A, MES } = datos;
  const faqs = crearFaqs(datos);
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
          "Cálculo de las fechas de la licencia por maternidad con el art. 177 de la LCT, la opción de achicar la parte anterior al parto hasta 10 días y cómo paga ANSES la asignación por maternidad.",
        url: "/licencia-por-maternidad",
        modificado: licenciasFuentes().consultadoEl,
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
          Hay dos cosas que casi todos publican mal. El mínimo antes del parto es de{" "}
          {MATERNIDAD.diasAntesMinimo} días (no 15). Y durante la licencia cobrás el{" "}
          <strong>bruto</strong>, porque no es sueldo: es una asignación de ANSES.
        </p>
      </header>

      <RespuestaPrimero actualizado={licenciasFuentes().consultadoEl}>
        <p>
          La licencia por maternidad es de <strong>{MATERNIDAD.diasTotal} días</strong>:{" "}
          {MATERNIDAD.diasAntes} antes del parto y {MATERNIDAD.diasDespues} después (art. 177 de la
          LCT). Podés pedir que la parte de antes baje hasta{" "}
          <strong>{MATERNIDAD.diasAntesMinimo} días</strong>, y lo que no uses se suma después. En
          esos días no te paga el empleador: cobrás la{" "}
          <strong>asignación por maternidad de ANSES</strong>, que es igual a tu sueldo bruto (sin
          descuentos). Para cobrarla necesitás {ANTIGUEDAD_MINIMA_MESES} meses de antigüedad. Si el
          bebé nace antes de tiempo, los días que no usaste se pasan a después del parto hasta
          completar los {MATERNIDAD.diasTotal}.
        </p>
      </RespuestaPrimero>

      <CalculadoraLicencias />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Por qué durante la licencia cobrás más que un mes normal
        </h2>
        <p className="text-zinc-600">
          Pasa lo contrario que con la{" "}
          <Link href="/desempleo" className="font-medium text-emerald-700 hover:underline">
            prestación por desempleo
          </Link>
          , que se calcula sobre el neto. La razón es concreta: la asignación por maternidad no es
          sueldo, así que no tiene aportes ni contribuciones. Lo que te llega a la cuenta es el
          bruto de tu recibo.
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
                  <td className="px-4 py-2.5 text-zinc-900">Sueldo bruto</td>
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
                    sin sueldo, {EXCEDENCIA.mesesMinimo} a {EXCEDENCIA.mesesMaximo} meses
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Si solo sabés lo que cobrás en mano y querés saber tu bruto, usá la{" "}
          <Link href="/sueldo-neto" className="font-medium text-emerald-700 hover:underline">
            calculadora de sueldo neto
          </Link>
          , que también hace la cuenta al revés. Y si tenés hijos a cargo, mirá las{" "}
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
          La licencia por nacimiento del artículo 158 inciso a) es de {PATERNIDAD.dias} días
          corridos. Lo que casi nadie dice es lo del artículo 160: si esos días caen en domingo,
          feriado o día no laborable,{" "}
          <strong>se tiene que contar sí o sí un día hábil</strong>. Un nacimiento un sábado no se
          «paga» con sábado y domingo. Muchos convenios mejoran ese piso de dos días, así que mirá tu
          convenio antes que la ley:{" "}
          <Link href="/convenios" className="font-medium text-emerald-700 hover:underline">
            escalas y convenios verificados
          </Link>
          . Las demás licencias (casamiento, fallecimiento, examen) están en{" "}
          <Link
            href="/licencias-especiales"
            className="font-medium text-emerald-700 hover:underline"
          >
            licencias especiales del art. 158
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La ventana en la que un despido cuesta un año de sueldos
        </h2>
        <p className="text-zinc-600">
          Desde {ESTABILIDAD.mesesPresuncion} meses antes hasta {ESTABILIDAD.mesesPresuncion}{" "}
          meses después del parto, el artículo 178 de la LCT supone que un despido es por la
          maternidad. Para eso tenés que haber avisado y acreditado el embarazo o el nacimiento. El
          empleador puede probar lo contrario. Si no lo prueba, entra el artículo 182: una
          indemnización especial de <strong>un año de sueldos</strong>, que se <em>suma</em> a la del
          artículo 245. La calculadora te marca las dos fechas de esa ventana. Para la indemnización
          común, usá la{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            calculadora de despido
          </Link>
          .
        </p>
        <p className="text-sm text-zinc-500">
          Todo esto depende de que hayas avisado del embarazo de forma fehaciente. Sin ese aviso, la
          protección no se activa. El propio artículo 177 pide comunicar el embarazo al empleador con
          un certificado médico que diga la fecha probable de parto.
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
          {licenciasFuentes().lista.map((f) => (
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
          Esta página es informativa. Usa el texto vigente de la Ley de Contrato de Trabajo y de la
          Ley 24.714, verificado en InfoLEG, y no reemplaza el consejo de un profesional ni a ANSES.
          Tu convenio puede mejorar estos pisos, y la liquidación concreta depende de cómo esté
          registrado tu trabajo. Consultada el {licenciasFuentes().consultadoEl}.
        </p>
      </section>
    </article>
  );
}
