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
  title: `Día del Empleado de Comercio ${ANIO}: se trasladó al lunes 28 de septiembre`,
  description:
    "El 26 de septiembre cae sábado, así que FAECYS y las cámaras lo pasaron al lunes 28. No es un feriado nacional, pero la Ley 26.541 lo asimila a uno: si trabajás, se paga doble. Y hay una condición del art. 168 de la LCT que decide quién lo cobra sin trabajar.",
  alternates: { canonical: "/dia-del-empleado-de-comercio" },
  openGraph: {
    title: `Día del Empleado de Comercio ${ANIO}: lunes 28 de septiembre`,
    description:
      "Se trasladó porque el 26 cae sábado. Se paga como feriado nacional (doble si se trabaja) y no puede darse como franco compensatorio.",
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
    a: `El ${FECHA_LARGA}. La Ley 26.541 fija el 26 de septiembre, pero en ${ANIO} ese día cae sábado, y las partes firmantes del CCT 130/75 —FAECYS junto a la CAC, CAME y UDECA— acordaron el 7 de septiembre trasladar la conmemoración al lunes siguiente, con todos los alcances de la ley. El traslado no es automático ni lo decide el Gobierno: sale de un acuerdo de las partes, y por eso cada año hay que mirar la circular.`,
  },
  {
    q: "¿Es feriado? Porque no aparece en el calendario oficial.",
    a: "No es feriado nacional y por eso no está en el calendario de la Ley 27.399: solo corre para los trabajadores comprendidos en el convenio de comercio. Pero el artículo 2 de la Ley 26.541 dice que ese día los empleados de comercio no prestan labores «asimilándose el mismo a los feriados nacionales a todos los efectos legales». Esa asimilación es la que importa en la práctica: las reglas de pago que se le aplican son las del feriado nacional de la LCT, no las de un día no laborable.",
  },
  {
    q: "Trabajé ese día. ¿Cuánto me tienen que pagar?",
    a: "El doble. El artículo 166 de la LCT dice que quien presta servicios en un feriado cobra «la remuneración normal de los días laborables más una cantidad igual»: el día que ya venía dentro del sueldo, más otro día. No es un recargo del 100% sobre las horas trabajadas que se suma aparte de un franco: es el día pagado dos veces. Si tu remuneración es variable o a destajo, el artículo 169 manda tomar un promedio —de los 6 días efectivos anteriores a destajo, de los 30 días anteriores en las demás formas variables—.",
  },
  {
    q: "No trabajé. ¿Lo cobro igual?",
    a: "Sí, pero con una condición que casi nadie menciona. El artículo 168 de la LCT exige haber trabajado para el mismo empleador 48 horas o 6 jornadas dentro de los 10 días hábiles anteriores al feriado; o, como alternativa, haber trabajado la víspera hábil y seguir trabajando en alguno de los 5 días hábiles siguientes. Quien entró hace pocos días, o venía de una licencia larga sin prestar servicios, puede no cumplir ninguno de los dos caminos. Cumpliéndolos, el día se paga aunque el local haya estado cerrado.",
  },
  {
    q: "Mi franco semanal cae ese lunes. ¿Me lo pueden dar como el día del gremio?",
    a: "No. La circular del 7 de septiembre lo dice con todas las letras: el lunes en que se conmemora el Día del Empleado de Comercio «no se podrá otorgar como franco compensatorio de descanso semanal». Son dos cosas distintas y se acumulan: el descanso semanal que ya te corresponde sigue corriendo por su lado.",
  },
  {
    q: "¿Y si el negocio abre igual?",
    a: "Puede abrir: la ley no prohíbe la apertura, regula la relación laboral. Lo que no puede es tratar ese día como uno común. Quien vaya a trabajar cobra el día doble del artículo 166, y la decisión de abrir no cambia el derecho de quien no fue.",
  },
  {
    q: "¿Cuándo va a ser en 2027?",
    a: "Todavía no se sabe, y es honesto decirlo. El 26 de septiembre de 2027 cae domingo, así que otra vez va a hacer falta un acuerdo de las partes para correrlo — y no hay una regla de traslado como la del artículo 6 de la Ley 27.399 que permita derivar la fecha. En cuanto FAECYS publique la circular, esta página la carga.",
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
          La Ley 26.541 lo fija el 26 de septiembre. Este año ese día cae sábado, así que las
          partes del convenio lo corrieron — y como el artículo 2 de esa ley lo asimila a un
          feriado nacional, lo que se corre no es solo la fecha: es el derecho a cobrarlo doble.
        </p>
      </header>

      <RespuestaPrimero actualizado={LEY_DIA_COMERCIO.consultadoEl}>
        <p>
          <strong>
            En {ANIO} se conmemora el {FECHA_LARGA}
          </strong>
          , trasladado desde el sábado 26 por la circular que firmaron FAECYS, la CAC, la CAME y
          UDECA el 7 de septiembre. <strong>Si trabajás ese día, cobrás el día doble</strong> (art.
          166 de la LCT: la remuneración normal «más una cantidad igual»).{" "}
          <strong>Si no trabajás, lo cobrás igual</strong> siempre que cumplas la condición del
          art. 168 —48 horas o 6 jornadas en los 10 días hábiles anteriores, o la víspera hábil más
          alguno de los 5 días hábiles siguientes—. Y ese lunes{" "}
          <strong>no puede dártelo el empleador como franco compensatorio</strong> del descanso
          semanal: la circular lo prohíbe expresamente.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Por qué no está en el calendario oficial
        </h2>
        <p className="text-zinc-600">
          Porque no es un feriado nacional. El calendario de la Ley 27.399 alcanza a todo el país;
          este día alcanza solo a quienes están comprendidos en el convenio de comercio. La
          confusión viene de que la ley lo trata <em>como si</em> lo fuera: el artículo 2 dice que
          los empleados de comercio no prestan labores ese día,{" "}
          <em>«asimilándose el mismo a los feriados nacionales a todos los efectos legales»</em>. De
          ahí sale todo lo demás — el pago doble, la condición para cobrarlo sin trabajar y la base
          de cálculo salen de los artículos de la LCT sobre feriados, no de la Ley 26.541, que tiene
          tres artículos y ningún número.
        </p>
        <p className="text-zinc-600">
          Ese es también el motivo por el que el traslado necesita un acuerdo. Los feriados
          nacionales trasladables se mueven con una regla escrita (art. 6 de la Ley 27.399: martes y
          miércoles al lunes anterior, jueves y viernes al lunes siguiente). Acá no hay regla:
          cuando el 26 cae fin de semana, la fecha la define la negociación colectiva, año por año.
          Por eso esta página no deriva la fecha de {ANIO + 1} — la espera.
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
          La condición del artículo 168 es la parte que decide casos reales y la que menos se
          publica: <em>{LCT_FERIADOS.art168}</em>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Lo que agrega el acuerdo de este año</h2>
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
            nombre: "LCT 20.744 (t.o. Decreto 390/1976) — arts. 166, 168 y 169, feriados",
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
