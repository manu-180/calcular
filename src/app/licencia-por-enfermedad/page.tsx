import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraEnfermedad } from "@/components/CalculadoraEnfermedad";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { openGraphDe } from "@/lib/seo";
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
  title: "Licencia por enfermedad: cuántos meses se cobra",
  description: `Son ${P.sinCargas.hasta5}, ${P.sinCargas.mas5} o ${P.conCargas.mas5} meses según antigüedad y cargas de familia (art. 208 LCT). Poné la fecha de inicio y mirá el día exacto en que se termina el sueldo.`,
  alternates: { canonical: "/licencia-por-enfermedad" },
  openGraph: openGraphDe({
    ruta: "/licencia-por-enfermedad",
    titulo: "Licencia por enfermedad",
    bajada: "Hasta qué día cobrás, y qué pasa después",
  }),
};

const faqs = [
  {
    q: "¿Cuántos meses de licencia por enfermedad me corresponden?",
    a: `Depende de tu antigüedad y de si tenés cargas de familia. Sin cargas de familia son ${P.sinCargas.hasta5} meses con menos de ${P.corteAntiguedadAnios} años de antigüedad y ${P.sinCargas.mas5} meses con más. Con cargas de familia se duplican: ${P.conCargas.hasta5} y ${P.conCargas.mas5} meses (art. 208 de la Ley de Contrato de Trabajo). Es una licencia paga: cobrás tu sueldo normal y lo paga el empleador.`,
  },
  {
    q: "Si me vuelvo a enfermar de lo mismo, ¿empieza un plazo nuevo?",
    a: `No, y es el error más caro de todos. El artículo 208 dice que «la recidiva de enfermedades crónicas no será considerada enfermedad, salvo que se manifestara transcurridos los dos (2) años». En criollo: si recaés por la misma dolencia dentro de los ${RECIDIVA_ANIOS} años, gastás del mismo plazo. No se abre uno nuevo. Si ya usaste 45 días por esa enfermedad y tu plazo es de ${P.sinCargas.hasta5} meses, te quedan los días que faltan para completarlo. El plazo vuelve a estar entero recién si la dolencia aparece de nuevo después de ${RECIDIVA_ANIOS} años. Una enfermedad distinta sí abre su propio plazo.`,
  },
  {
    q: "¿Qué pasa cuando se me termina la licencia paga y sigo sin poder trabajar?",
    a: `No te pueden despedir así nomás. Empieza la conservación del empleo del artículo 211, que dura ${CONSERVACION_EMPLEO_MESES} meses desde que vence la licencia paga. En ese año no cobrás sueldo, pero el empleador te tiene que guardar el puesto. Cuando termina, la relación sigue hasta que una de las partes le avise a la otra que quiere cortarla. Ese corte no genera indemnización para ninguna de las dos.`,
  },
  {
    q: "¿Cuánto tengo que cobrar durante la licencia?",
    a: `Lo que cobrabas cuando te enfermaste, más los aumentos que reciba tu categoría mientras estás de licencia (por ley, convenio o decisión del empleador, art. 208). Esto se liquida mal seguido: el sueldo no se congela el día en que te enfermaste. Si tenés una parte variable (comisiones, horas extras habituales), se paga con el promedio de lo que cobraste en el último semestre trabajado. Nunca podés cobrar menos de lo que hubieras cobrado sin la enfermedad. Y lo que recibías en especie y dejás de recibir se tiene que pagar en plata.`,
  },
  {
    q: "¿Cuándo tengo que avisar en el trabajo?",
    a: `Dentro de ${AVISO_ART_209.plazo}, salvo fuerza mayor. Tenés que avisar qué te pasó y dónde estás (art. 209 de la LCT, con el texto que le dio la Ley 27.802 en marzo de 2026). Mientras no avises, no cobrás esos días. La excepción es que después quede claro, sin lugar a dudas, que estabas enfermo y que el cuadro era tan grave que no podías avisar.`,
  },
  {
    q: "¿Qué tiene que decir el certificado médico?",
    a: `Desde la reforma de marzo de 2026, el artículo 210 es claro y bastante más exigente que antes. El certificado tiene que tener ${CERTIFICADO_ART_210.requisitos.join(", ")}. Lo tiene que hacer un profesional habilitado y tiene que estar firmado digitalmente en las plataformas autorizadas por la ${CERTIFICADO_ART_210.leyFirmaDigital}. Muchas notas que circulan todavía describen el texto viejo, que solo hablaba del control del empleador. Ese control sigue: tenés que dejarte revisar por el médico que mande la empresa. Si los dos médicos no se ponen de acuerdo, se puede ir a una junta médica oficial o pedir el dictamen de un instituto de trayectoria reconocida. Ese costo lo paga el empleador.`,
  },
  {
    q: "¿Me pueden despedir estando de licencia por enfermedad?",
    a: `Pueden, pero les sale caro. Según el artículo 213, si el empleador te despide durante la licencia paga, además de la indemnización por despido sin causa te tiene que pagar los sueldos de todo el tiempo que faltaba hasta el final de la licencia o hasta el alta (lo que llegue primero). El despido no te saca esos sueldos: te los adelanta.`,
  },
  {
    q: "¿Y si al alta me queda una incapacidad y no puedo hacer mi tarea de antes?",
    a: `Eso lo resuelve el artículo 212. Si te queda una incapacidad definitiva y no podés hacer tus tareas de siempre, el empleador te tiene que dar otras que sí puedas hacer, sin bajarte el sueldo. Si no puede por un motivo ajeno a él, te debe la indemnización reducida del artículo 247. Si puede darte otras tareas y no lo hace, te debe la indemnización completa del artículo 245. Y si la incapacidad es absoluta, también te corresponde la del artículo 245, que se suma a lo que digan los estatutos especiales o el convenio.`,
  },
  {
    q: "¿Esto es lo mismo que una ART?",
    a: `No, es justo lo contrario. Los artículos 208 a 213 cubren las enfermedades y accidentes inculpables: los que no tienen que ver con el trabajo (una gripe, una operación, un accidente en tu casa). Los accidentes de trabajo y las enfermedades profesionales van por la Ley de Riesgos del Trabajo 24.557 y los cubre la ART, con otras reglas. «Inculpable» no quiere decir que no tengas la culpa: quiere decir que la causa no es el trabajo.`,
  },
  {
    q: "¿Los días de licencia por enfermedad me descuentan las vacaciones o el aguinaldo?",
    a: `No. Son días pagos, así que cuentan como trabajados para la antigüedad y entran en el cálculo del aguinaldo y de las vacaciones. Lo que conviene revisar es tu convenio colectivo: los plazos del artículo 208 son un piso y muchos convenios los mejoran.`,
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
        titulo: "Licencia por enfermedad: cuántos meses se cobra",
        descripcion:
          "Cálculo de la licencia paga por enfermedad o accidente inculpable según el art. 208 de la LCT, la recaída dentro de los 2 años y el año de conservación del empleo del art. 211.",
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
          Todos dicen «{P.sinCargas.hasta5}, {P.sinCargas.mas5} o {P.conCargas.mas5} meses» y ahí
          cortan. Lo que vos necesitás saber es otra cosa: <strong>qué día exacto</strong> se termina
          el sueldo, cuánto te queda si ya faltaste por lo mismo hace unos meses y hasta cuándo te
          guardan el puesto.
        </p>
      </header>

      <RespuestaPrimero actualizado={ENFERMEDAD_FUENTES.consultadoEl}>
        <p>
          La licencia paga por enfermedad o accidente inculpable (que no tiene que ver con el
          trabajo) es de <strong>{P.sinCargas.hasta5} meses</strong> si tenés menos de{" "}
          {P.corteAntiguedadAnios} años de antigüedad y de{" "}
          <strong>{P.sinCargas.mas5} meses</strong> si tenés más. Con{" "}
          <strong>cargas de familia</strong> se duplican: {P.conCargas.hasta5} y{" "}
          {P.conCargas.mas5} meses (art. 208 de la LCT). Mientras dura cobrás tu sueldo normal, con
          los aumentos que reciba tu categoría. Si{" "}
          <strong>recaés por lo mismo dentro de los {RECIDIVA_ANIOS} años, no empieza un plazo
          nuevo</strong>: seguís gastando el mismo. Y cuando se termina la licencia paga no te
          despiden. Empieza un año de conservación del empleo (art. 211): no cobrás, pero el puesto
          sigue siendo tuyo.
        </p>
      </RespuestaPrimero>

      <CalculadoraEnfermedad />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La tabla del artículo 208, completa
        </h2>
        <p className="text-zinc-600">
          Son cuatro casos, y del mejor al peor hay cuatro veces de diferencia. Lo que más pesa no
          es la antigüedad: son las cargas de familia.
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
          Estos plazos son un piso: el convenio de tu actividad puede mejorarlos.{" "}
          <Link href="/convenios" className="font-medium text-emerald-700 hover:underline">
            Mirá las escalas y los convenios verificados
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La trampa de la recaída: el plazo no se reinicia
        </h2>
        <p className="text-zinc-600">
          Es la parte del artículo 208 que más discusiones trae en una liquidación, y casi nadie la
          calcula. El texto es corto y no deja dudas:{" "}
          <em>
            «la recidiva de enfermedades crónicas no será considerada enfermedad, salvo que se
            manifestara transcurridos los dos (2) años»
          </em>
          . Quiere decir que si volvés a faltar por la <strong>misma</strong> dolencia dentro de los{" "}
          {RECIDIVA_ANIOS} años, esos días se restan del plazo que ya venías usando. Una enfermedad
          distinta abre su propio plazo completo. Por eso la calculadora te pregunta cuántos días ya
          usaste: sin ese dato, cualquier fecha de fin que te den está mal.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El certificado cambió en marzo de 2026 y casi nadie lo publicó
        </h2>
        <p className="text-zinc-600">
          La Ley 27.802 (B.O. 6/3/2026) reemplazó el artículo 210 entero. Antes hablaba casi solo
          del control del empleador. Ahora dice qué tiene que tener el certificado:{" "}
          <strong>{CERTIFICADO_ART_210.requisitos.join(", ")}</strong>. Lo firma un profesional
          habilitado y tiene que estar <strong>firmado digitalmente</strong> en las plataformas
          autorizadas por la {CERTIFICADO_ART_210.leyFirmaDigital}. Vos seguís obligado a dejarte
          revisar por el médico de la empresa. Si no hay acuerdo entre los médicos, se puede ir a una
          junta médica oficial (donde la autoridad habilitó esa opción) o a un instituto de
          trayectoria reconocida. Eso lo paga el empleador.
        </p>
        <p className="text-sm text-zinc-500">
          La misma ley también cambió el artículo 209, el del aviso: tenés que avisar dentro de{" "}
          {AVISO_ART_209.plazo} y decir dónde estás.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Si te despiden estando de licencia, cobrás las dos cosas
        </h2>
        <p className="text-zinc-600">
          El artículo 213 es claro. Si te despiden durante la licencia paga, te tienen que pagar{" "}
          <strong>la indemnización por despido sin causa</strong> y, además, los sueldos de todo el
          tiempo que faltaba hasta el final de la licencia o hasta el alta. Para la indemnización
          usá la{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            calculadora de despido
          </Link>
          . Si después viene el desempleo, la{" "}
          <Link href="/desempleo" className="font-medium text-emerald-700 hover:underline">
            prestación por desempleo
          </Link>{" "}
          te dice cuánto cobrás y por cuántos meses.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Después de la licencia: el puesto y la obra social
        </h2>
        <p className="text-zinc-600">
          Cuando se termina la licencia paga empieza el año en que te guardan el puesto sin cobrar.
          Cómo funciona y qué pasa al final lo explicamos en{" "}
          <Link href="/reserva-del-empleo" className="font-medium text-emerald-700 hover:underline">
            reserva del puesto de trabajo
          </Link>
          . Y si la relación termina, mirá{" "}
          <Link
            href="/hasta-cuando-tengo-obra-social"
            className="font-medium text-emerald-700 hover:underline"
          >
            hasta cuándo seguís teniendo obra social
          </Link>
          .
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
              </a>
              : {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página es informativa. Usa el texto vigente de la Ley de Contrato de Trabajo,
          verificado en InfoLEG, y no reemplaza el consejo de un profesional. El convenio de tu
          actividad puede mejorar estos pisos, y cada caso depende del certificado médico y de cómo
          estés registrado. Consultada el {ENFERMEDAD_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
