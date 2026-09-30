import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraEnfermedad } from "@/components/CalculadoraEnfermedad";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  AVISO_ART_209,
  CERTIFICADO_ART_210,
  CONSERVACION_EMPLEO_MESES,
  ENFERMEDAD_FUENTES,
  PLAZOS_ART_208,
  RECIDIVA_ANIOS,
} from "@/data/enfermedad";

const P = PLAZOS_ART_208;

export const metadata: Metadata = {
  title: "Licencia por enfermedad: cuántos meses y hasta qué día cobrás",
  description: `Poné la fecha en que empezó la licencia y tu antigüedad, y mirá el día exacto en que se te termina el sueldo. Son ${P.sinCargas.hasta5}, ${P.sinCargas.mas5} o ${P.conCargas.mas5} meses según antigüedad y cargas de familia (art. 208 LCT), y la recaída por lo mismo dentro de ${RECIDIVA_ANIOS} años consume el mismo plazo. Después corre un año de conservación del empleo.`,
  alternates: { canonical: "/licencia-por-enfermedad" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Licencia por enfermedad")}&s=${encodeURIComponent("Hasta qué día cobrás, y qué pasa después")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuántos meses de licencia por enfermedad me corresponden?",
    a: `Depende de dos cosas: la antigüedad y si tenés cargas de familia. Sin cargas de familia son ${P.sinCargas.hasta5} meses con menos de ${P.corteAntiguedadAnios} años de antigüedad y ${P.sinCargas.mas5} meses con más. Con cargas de familia esos plazos se duplican: ${P.conCargas.hasta5} y ${P.conCargas.mas5} meses respectivamente (art. 208 de la Ley de Contrato de Trabajo). Es licencia PAGA: durante ese período cobrás tu remuneración normal, y la paga el empleador.`,
  },
  {
    q: "Si me vuelvo a enfermar de lo mismo, ¿empieza un plazo nuevo?",
    a: `No, y es el error más caro de todos. El artículo 208 dice que «la recidiva de enfermedades crónicas no será considerada enfermedad, salvo que se manifestara transcurridos los dos (2) años». O sea: la recaída por la misma dolencia dentro de los ${RECIDIVA_ANIOS} años consume el MISMO plazo, no abre uno nuevo. Si ya usaste 45 días por esa enfermedad y tu plazo es de ${P.sinCargas.hasta5} meses, te quedan los días que falten para completarlo. El plazo vuelve a nacer entero recién si la dolencia reaparece pasados los ${RECIDIVA_ANIOS} años. Una enfermedad DISTINTA, en cambio, abre su propio plazo.`,
  },
  {
    q: "¿Qué pasa cuando se me termina la licencia paga y sigo sin poder trabajar?",
    a: `No te pueden despedir sin más: empieza el plazo de conservación del empleo del artículo 211, que dura ${CONSERVACION_EMPLEO_MESES} meses contados desde el vencimiento de la licencia paga. Durante ese año no cobrás sueldo, pero el empleador tiene que guardarte el puesto. Vencido ese plazo, la relación subsiste hasta que alguna de las partes notifique a la otra su voluntad de rescindirla, y esa extinción no genera responsabilidad indemnizatoria para ninguna de las dos.`,
  },
  {
    q: "¿Cuánto tengo que cobrar durante la licencia?",
    a: `La remuneración que percibías al momento de la interrupción, más los aumentos que durante la licencia se acuerden a los de tu misma categoría por ley, convenio colectivo o decisión del empleador (art. 208). Es un punto que se liquida mal seguido: el sueldo NO se congela al día en que te enfermaste. Si tu remuneración tiene parte variable —comisiones, horas extras habituales—, esa parte se liquida según el promedio de lo percibido en el último semestre de prestación de servicios, y en ningún caso podés cobrar menos de lo que hubieras cobrado sin la enfermedad. Las prestaciones en especie que dejes de percibir tienen que valorizarse.`,
  },
  {
    q: "¿Cuándo tengo que avisar en el trabajo?",
    a: `Dentro de ${AVISO_ART_209.plazo}, salvo caso de fuerza mayor, informando la enfermedad o accidente y el lugar en el que estás (art. 209 de la LCT, con el texto que le dio la Ley 27.802 en marzo de 2026). Mientras no avises, perdés el derecho a percibir la remuneración de esos días, salvo que después quede acreditado de manera inequívoca que estabas enfermo y que no podías avisar por el carácter y la gravedad del cuadro.`,
  },
  {
    q: "¿Qué tiene que decir el certificado médico?",
    a: `Desde la reforma de marzo de 2026 el artículo 210 es explícito y bastante más exigente que antes: el certificado tiene que contener ${CERTIFICADO_ART_210.requisitos.join(", ")}, ser emitido por un profesional habilitado y estar FIRMADO DIGITALMENTE a través de las plataformas electrónicas autorizadas por la ${CERTIFICADO_ART_210.leyFirmaDigital}. Buena parte de las notas que circulan describen el texto anterior, que sólo hablaba del derecho de control del empleador. Ese control sigue existiendo: estás obligado a someterte al médico que designe la empresa, y si hay discrepancia insalvable se puede ir a una junta médica oficial o a un dictamen de un instituto de reconocida trayectoria, cuyo costo paga el empleador.`,
  },
  {
    q: "¿Me pueden despedir estando de licencia por enfermedad?",
    a: `Pueden, pero les sale caro. El artículo 213 dice que si el empleador despide durante el plazo de las interrupciones pagas, además de las indemnizaciones por despido injustificado tiene que abonar los salarios correspondientes a todo el tiempo que faltare para el vencimiento de la licencia o hasta la fecha del alta, lo que ocurra primero. O sea que el despido no corta el derecho a esos sueldos: los adelanta.`,
  },
  {
    q: "¿Y si al alta me queda una incapacidad y no puedo hacer mi tarea de antes?",
    a: `Lo resuelve el artículo 212. Si te queda una disminución definitiva de la capacidad laboral y no podés hacer las tareas que hacías, el empleador debe asignarte otras que puedas ejecutar, sin bajarte la remuneración. Si no puede hacerlo por una causa que no le es imputable, te debe la indemnización del artículo 247 (la reducida). Si pudiendo asignarte tareas compatibles no lo hace, te debe la indemnización completa del artículo 245. Y si de la enfermedad o accidente se deriva una incapacidad absoluta, corresponde también la indemnización del artículo 245, que se acumula con lo que dispongan los estatutos especiales o el convenio colectivo.`,
  },
  {
    q: "¿Esto es lo mismo que una ART?",
    a: `No, es justo lo contrario. Los artículos 208 a 213 regulan las enfermedades y accidentes INCULPABLES: los que no tienen relación con el trabajo —una gripe, una operación, un accidente doméstico—. Los accidentes de trabajo y las enfermedades profesionales van por la Ley de Riesgos del Trabajo 24.557 y los cubre la ART, con otro régimen de prestaciones. La palabra «inculpable» no significa que no tengas la culpa del accidente: significa que la causa es ajena al trabajo.`,
  },
  {
    q: "¿Los días de licencia por enfermedad me descuentan las vacaciones o el aguinaldo?",
    a: `No. Son días con derecho a remuneración, así que se computan como tiempo trabajado para la antigüedad y entran en la base del aguinaldo y de las vacaciones. Lo que sí conviene mirar es tu convenio colectivo: los plazos del artículo 208 son un piso legal y muchos convenios los mejoran.`,
  },
];

export default function LicenciaEnfermedadPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de licencia por enfermedad inculpable",
        url: "https://calcular.ar/licencia-por-enfermedad",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Licencia por enfermedad: cuántos meses y hasta qué día cobrás",
        descripcion:
          "Cálculo de los plazos de licencia paga por enfermedad y accidente inculpable con el art. 208 de la LCT, el arrastre de la recaída dentro de los 2 años y el año de conservación del empleo del art. 211.",
        url: "/licencia-por-enfermedad",
        modificado: ENFERMEDAD_FUENTES.consultadoEl,
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
          Licencia por enfermedad: hasta qué día cobrás, y qué pasa después
        </h1>
        <p className="text-zinc-600">
          Todas las notas dicen «{P.sinCargas.hasta5}, {P.sinCargas.mas5} o {P.conCargas.mas5} meses»
          y ahí terminan. Lo que necesitás saber es otra cosa: <strong>qué día exacto</strong> se te
          termina el sueldo, cuánto te queda si ya faltaste por lo mismo hace unos meses, y hasta
          cuándo te guardan el puesto sin cobrar.
        </p>
      </header>

      <RespuestaPrimero actualizado={ENFERMEDAD_FUENTES.consultadoEl}>
        <p>
          La licencia paga por enfermedad o accidente inculpable es de{" "}
          <strong>{P.sinCargas.hasta5} meses</strong> si tenés menos de {P.corteAntiguedadAnios} años
          de antigüedad y de <strong>{P.sinCargas.mas5} meses</strong> si tenés más. Con{" "}
          <strong>cargas de familia</strong> esos plazos se duplican: {P.conCargas.hasta5} y{" "}
          {P.conCargas.mas5} meses (art. 208 de la LCT). Durante ese período cobrás tu remuneración
          normal, más los aumentos que se otorguen a tu categoría mientras estás de licencia. La{" "}
          <strong>recaída por la misma dolencia dentro de los {RECIDIVA_ANIOS} años no abre un plazo
          nuevo</strong>: consume el mismo. Y cuando el plazo pago se agota no viene el despido:
          viene el año de conservación del empleo del artículo 211, sin goce de sueldo pero con el
          puesto guardado.
        </p>
      </RespuestaPrimero>

      <CalculadoraEnfermedad />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La tabla del artículo 208, completa
        </h2>
        <p className="text-zinc-600">
          Son cuatro casos, y la diferencia entre el mejor y el peor es de cuatro veces. El dato que
          más pesa no es la antigüedad: son las cargas de familia.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Antigüedad</th>
                  <th className="px-4 py-2.5 font-semibold">Sin cargas de familia</th>
                  <th className="px-4 py-2.5 font-semibold">Con cargas de familia</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-700">
                    Menos de {P.corteAntiguedadAnios} años
                  </td>
                  <td className="px-4 py-2.5 font-medium text-zinc-900">
                    {P.sinCargas.hasta5} meses
                  </td>
                  <td className="px-4 py-2.5 font-medium text-emerald-700">
                    {P.conCargas.hasta5} meses
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-700">
                    {P.corteAntiguedadAnios} años o más
                  </td>
                  <td className="px-4 py-2.5 font-medium text-zinc-900">
                    {P.sinCargas.mas5} meses
                  </td>
                  <td className="px-4 py-2.5 font-medium text-emerald-700">
                    {P.conCargas.mas5} meses
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Estos plazos son un piso legal: el convenio colectivo de tu actividad puede mejorarlos.{" "}
          <Link href="/convenios" className="font-medium text-emerald-700 hover:underline">
            Acá están las escalas y los convenios verificados
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La trampa de la recaída: el plazo no se reinicia
        </h2>
        <p className="text-zinc-600">
          Es la parte del artículo 208 que más discusiones genera en una liquidación y la que casi
          ninguna nota calcula. El texto es corto y terminante:{" "}
          <em>
            «la recidiva de enfermedades crónicas no será considerada enfermedad, salvo que se
            manifestara transcurridos los dos (2) años»
          </em>
          . Traducido: si volvés a faltar por la <strong>misma</strong> dolencia dentro de los{" "}
          {RECIDIVA_ANIOS} años, esos días se descuentan del plazo que ya venías usando. Una
          enfermedad distinta, en cambio, abre su propio plazo completo. Por eso la calculadora de
          arriba te pregunta cuántos días ya usaste: sin ese dato, la fecha de fin que te dan en
          cualquier lado está mal.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El certificado cambió en marzo de 2026 y casi nadie lo publicó
        </h2>
        <p className="text-zinc-600">
          La Ley 27.802 (B.O. 6/3/2026) sustituyó el artículo 210 completo. Antes el artículo hablaba
          casi solo del derecho de control del empleador; hoy fija qué tiene que decir el
          certificado: <strong>{CERTIFICADO_ART_210.requisitos.join(", ")}</strong>, emitido por un
          profesional habilitado y{" "}
          <strong>firmado digitalmente</strong> a través de las plataformas autorizadas por la{" "}
          {CERTIFICADO_ART_210.leyFirmaDigital}. El control médico de la empresa sigue siendo
          obligatorio para el trabajador, y ante una discrepancia insalvable se puede recurrir a una
          junta médica oficial —donde la autoridad administrativa habilitó esa opción— o a un
          dictamen de un instituto de reconocida trayectoria, que paga el empleador.
        </p>
        <p className="text-sm text-zinc-500">
          El artículo 209, sobre el aviso, también fue sustituido por la misma ley: hay que avisar
          dentro de {AVISO_ART_209.plazo}, indicando dónde estás.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Si te despiden estando de licencia, cobrás las dos cosas
        </h2>
        <p className="text-zinc-600">
          El artículo 213 no deja lugar a interpretación: el despido durante el plazo de las
          interrupciones pagas obliga a abonar,{" "}
          <strong>además de las indemnizaciones por despido injustificado</strong>, los salarios de
          todo el tiempo que faltaba hasta el vencimiento de la licencia o hasta la fecha del alta.
          Para calcular la parte indemnizatoria está la{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            calculadora de despido
          </Link>
          , y si lo que sigue es el desempleo, la{" "}
          <Link href="/desempleo" className="font-medium text-emerald-700 hover:underline">
            prestación por desempleo
          </Link>{" "}
          te dice cuánto y por cuántos meses.
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
          {ENFERMEDAD_FUENTES.lista.map((f) => (
            <li key={f.detalle}>
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
          Esta página es informativa y aplica el texto vigente de la Ley de Contrato de Trabajo
          verificado en InfoLEG. No reemplaza al asesoramiento de un profesional: el convenio
          colectivo de tu actividad puede mejorar estos pisos y cada caso concreto depende del
          certificado médico y de la situación registrada. Consultada el{" "}
          {ENFERMEDAD_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
