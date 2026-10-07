import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PlanillaComercioCTA } from "@/components/PlanillaComercioCTA";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { FuentesOficiales } from "@/components/SelloVerificado";
import {
  LCT_FERIADOS,
  LEY_DIA_COMERCIO,
  TRASLADOS_POR_ANIO,
  diaEfectivo,
} from "@/data/dia-empleado-comercio";
import { articleSchema, ORGANIZACION } from "@/lib/schema";

const ANIO = 2026;
const TRASLADO = TRASLADOS_POR_ANIO[ANIO]!;
const EFECTIVO = diaEfectivo(ANIO)!;

const FECHA_LARGA = new Date(`${EFECTIVO.fecha}T12:00:00`).toLocaleDateString("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const metadata: Metadata = {
  title: `Día del Empleado de Comercio ${ANIO}: fecha y cómo se paga`,
  description:
    "No es feriado nacional, pero la Ley 26.541 lo asimila a uno: si trabajás se paga doble. Cuándo cae este año y quién lo cobra sin trabajar.",
  alternates: { canonical: "/dia-del-empleado-de-comercio" },
  openGraph: {
    title: `Día del Empleado de Comercio ${ANIO}: lunes 28 de septiembre`,
    description:
      "Se pasó al lunes porque el 26 cayó sábado. Se paga como feriado nacional (doble si se trabaja) y no puede darse como franco compensatorio.",
    url: "https://calcular.ar/dia-del-empleado-de-comercio",
    images: [
      {
        url: `/og?t=${encodeURIComponent(`Día del Empleado de Comercio ${ANIO}`)}&s=${encodeURIComponent("Lunes 28 de septiembre · se paga como feriado")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: `¿Qué día es el Día del Empleado de Comercio en ${ANIO}?`,
    a: `El ${FECHA_LARGA}. La Ley 26.541 fija el 26 de septiembre, pero en ${ANIO} ese día cayó sábado. Las partes que firman el CCT 130/75 (FAECYS junto a la CAC, CAME y UDECA) acordaron el 7 de septiembre pasarlo al lunes siguiente, con todos los efectos de la ley. El cambio de fecha no es automático ni lo decide el Gobierno: sale de un acuerdo entre las partes. Por eso cada año hay que mirar la circular.`,
  },
  {
    q: "¿Es feriado? Porque no aparece en el calendario oficial.",
    a: "No es feriado nacional, por eso no está en el calendario de la Ley 27.399: vale solo para quienes trabajan bajo el convenio de comercio. Pero el artículo 2 de la Ley 26.541 dice que ese día los empleados de comercio no trabajan, «asimilándose el mismo a los feriados nacionales a todos los efectos legales». Eso es lo que importa en la práctica: se paga con las reglas del feriado nacional de la LCT, no con las de un día no laborable.",
  },
  {
    q: "Trabajé ese día. ¿Cuánto me tienen que pagar?",
    a: "El doble. El artículo 166 de la LCT dice que quien trabaja en un feriado cobra «la remuneración normal de los días laborables más una cantidad igual»: el día que ya venía en el sueldo, más otro día. No es un recargo del 100% sobre las horas que se suma aparte de un franco: es el día pagado dos veces. Si tu sueldo es variable o a destajo, el artículo 169 manda sacar un promedio: de los 6 días trabajados anteriores si es a destajo, o de los 30 días anteriores en los demás casos.",
  },
  {
    q: "No trabajé. ¿Lo cobro igual?",
    a: "Sí, pero con una condición que casi nadie menciona. El artículo 168 de la LCT pide haber trabajado para el mismo empleador 48 horas o 6 jornadas en los 10 días hábiles antes del feriado. O, si no, haber trabajado el día hábil anterior y volver a trabajar en alguno de los 5 días hábiles siguientes. Si entraste hace pocos días o venías de una licencia larga, puede que no cumplas ninguna de las dos. Si cumplís, el día se paga aunque el local haya estado cerrado.",
  },
  {
    q: "Mi franco semanal cae ese lunes. ¿Me lo pueden dar como el día del gremio?",
    a: "No. La circular del 7 de septiembre lo dice con todas las letras: el lunes del Día del Empleado de Comercio «no se podrá otorgar como franco compensatorio de descanso semanal». Son dos cosas distintas y se suman: el descanso semanal que ya te toca sigue por su lado.",
  },
  {
    q: "¿Y si el negocio abre igual?",
    a: "Puede abrir: la ley no prohíbe abrir, regula el trabajo. Lo que no puede es tratar ese día como uno común. Quien vaya a trabajar cobra el día doble del artículo 166. Y que el local abra no le quita el derecho a quien no fue.",
  },
  {
    q: "¿Cuándo va a ser en 2027?",
    a: "Todavía no se sabe, y preferimos decirlo. El 26 de septiembre de 2027 cae domingo, así que otra vez va a hacer falta un acuerdo de las partes para correrlo. Y no hay una regla fija, como la del artículo 6 de la Ley 27.399, para sacar la fecha de antemano. Apenas FAECYS publique la circular, la cargamos en esta página.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: `Día del Empleado de Comercio ${ANIO}: fecha trasladada y cómo se paga`,
        descripcion:
          "La Ley 26.541 fija el 26 de septiembre y lo asimila a feriado nacional a todos los efectos legales. En 2026 cae sábado y las partes del CCT 130/75 lo trasladaron al lunes 28. Cómo se paga trabajado y no trabajado según los arts. 166, 168 y 169 de la LCT, y por qué no puede darse como franco compensatorio.",
        url: "/dia-del-empleado-de-comercio",
        modificado: LEY_DIA_COMERCIO.consultadoEl,
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
          Día del Empleado de Comercio {ANIO}: cuándo cae y cómo se paga
        </h1>
        <p className="text-zinc-600">
          La Ley 26.541 lo fija el 26 de septiembre. En {ANIO} ese día cayó sábado, así que las
          partes del convenio lo corrieron. Y como el artículo 2 de esa ley lo trata como un feriado
          nacional, lo que se corre no es solo la fecha: es el derecho a cobrarlo doble.
        </p>
      </header>

      <RespuestaPrimero actualizado={LEY_DIA_COMERCIO.consultadoEl}>
        <p>
          <strong>
            En {ANIO} fue el {FECHA_LARGA}
          </strong>
          , pasado desde el sábado 26 por la circular que firmaron FAECYS, la CAC, la CAME y UDECA
          el 7 de septiembre. <strong>Si trabajás ese día, lo cobrás doble</strong> (art. 166 de la
          LCT: el sueldo normal «más una cantidad igual»).{" "}
          <strong>Si no trabajás, lo cobrás igual</strong>, siempre que cumplas la condición del
          art. 168: 48 horas o 6 jornadas en los 10 días hábiles anteriores, o el día hábil
          anterior más alguno de los 5 días hábiles siguientes. Y ese lunes{" "}
          <strong>el empleador no te lo puede dar como franco compensatorio</strong> del descanso
          semanal: la circular lo prohíbe con todas las letras.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Por qué no está en el calendario oficial
        </h2>
        <p className="text-zinc-600">
          Porque no es un feriado nacional. El calendario de la Ley 27.399 vale para todo el país;
          este día vale solo para quienes trabajan bajo el convenio de comercio. La confusión viene
          de que la ley lo trata <em>como si</em> lo fuera: el artículo 2 dice que los empleados de
          comercio no trabajan ese día,{" "}
          <em>«asimilándose el mismo a los feriados nacionales a todos los efectos legales»</em>. De
          ahí sale todo lo demás. El pago doble, la condición para cobrarlo sin trabajar y la base de
          cálculo salen de los artículos de la LCT sobre feriados, no de la Ley 26.541, que tiene
          tres artículos y ningún número.
        </p>
        <p className="text-zinc-600">
          Por eso también, para moverlo hace falta un acuerdo. Los feriados nacionales que se
          pueden mover siguen una regla escrita (art. 6 de la Ley 27.399: martes y miércoles van al
          lunes anterior, jueves y viernes al lunes siguiente). Acá no hay regla: cuando el 26 cae
          fin de semana, la fecha la acuerdan el gremio y las cámaras, año por año. Por eso esta
          página no adivina la fecha de {ANIO + 1}: la espera.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Las tres reglas de pago, con su artículo</h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Situación</th>
                  <th className="px-4 py-2.5 font-semibold">Qué se cobra</th>
                  <th className="px-4 py-2.5 font-semibold">Norma</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr>
                  <td className="px-4 py-2.5 text-zinc-700">Trabajaste ese día</td>
                  <td className="px-4 py-2.5 text-zinc-900">
                    El día normal <strong>más otro tanto</strong> (doble)
                  </td>
                  <td className="px-4 py-2.5 text-zinc-500">LCT art. 166</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-zinc-700">
                    No trabajaste y cumplís la condición
                  </td>
                  <td className="px-4 py-2.5 text-zinc-900">
                    El día, igual que si lo hubieras trabajado
                  </td>
                  <td className="px-4 py-2.5 text-zinc-500">LCT arts. 166 y 168</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 text-zinc-700">Cobrás a destajo o de forma variable</td>
                  <td className="px-4 py-2.5 text-zinc-900">
                    Promedio de los 6 días efectivos (destajo) o de los 30 días anteriores
                  </td>
                  <td className="px-4 py-2.5 text-zinc-500">LCT art. 169</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-600">
          La condición del artículo 168 es la que decide los casos reales, y la que menos se
          publica: <em>{LCT_FERIADOS.art168}</em>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Lo que agregó el acuerdo de {ANIO}</h2>
        <ul className="space-y-2 text-zinc-600">
          {TRASLADO.aclaraciones.map((a) => (
            <li key={a} className="flex gap-2">
              <span aria-hidden className="mt-1 text-emerald-600">
                •
              </span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </section>

      <PlanillaComercioCTA />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <h3 className="font-semibold text-zinc-900">{f.q}</h3>
              <p className="mt-1.5 text-sm text-zinc-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <FuentesOficiales
        verificadoEl={LEY_DIA_COMERCIO.consultadoEl}
        fuentes={[
          { nombre: LEY_DIA_COMERCIO.nombre, url: LEY_DIA_COMERCIO.url },
          { nombre: TRASLADO.circular.nombre, url: TRASLADO.circular.url },
          {
            nombre: "LCT 20.744 (t.o. Decreto 390/1976), arts. 166, 168 y 169: feriados",
            url: LCT_FERIADOS.url,
          },
        ]}
      >
        Si liquidás sueldos de comercio, mirá también la{" "}
        <Link href="/convenios/comercio" className="text-emerald-700 underline underline-offset-2">
          escala del CCT 130/75
        </Link>{" "}
        y el{" "}
        <Link href="/sueldo-neto/comercio" className="text-emerald-700 underline underline-offset-2">
          sueldo neto por categoría
        </Link>
        .
      </FuentesOficiales>
    </article>
  );
}
