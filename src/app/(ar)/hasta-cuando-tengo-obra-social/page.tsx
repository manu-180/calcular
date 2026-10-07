import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraObraSocialContinuidad } from "@/components/CalculadoraObraSocialContinuidad";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { SelloVerificado } from "@/components/SelloVerificado";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  CONTINUIDAD_FUENTES,
  CONTINUIDAD_TEXTOS,
  EXTINCION,
  SUPUESTOS,
} from "@/data/obra-social-continuidad";
import { CONSERVACION_EMPLEO_MESES, PLAZOS_ART_208 } from "@/data/enfermedad";

export const metadata: Metadata = {
  title: "Obra social después del despido: hasta cuándo te cubre",
  description:
    "Los 3 meses existen solo si trabajaste más de 3 meses seguidos. Los 8 casos del art. 10 de la Ley 23.660, cada uno con su plazo. Calculá tu fecha.",
  alternates: { canonical: "/hasta-cuando-tengo-obra-social" },
  openGraph: {
    title: "¿Hasta cuándo tenés obra social después del trabajo?",
    description:
      "Los tres meses después del despido tienen un requisito, y el art. 10 tiene ocho casos, no uno. Con la fecha exacta.",
    url: "https://calcular.ar/hasta-cuando-tengo-obra-social",
    images: [
      {
        url: `/og?t=${encodeURIComponent("¿Hasta cuándo tenés obra social?")}&s=${encodeURIComponent("Los 8 supuestos del art. 10 de la Ley 23.660")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "Me despidieron: ¿cuánto me dura la obra social?",
    a: `Tres meses desde el último día de trabajo, sin pagar nada, y también para tu familia. Pero hay una condición que casi nunca se menciona: el inciso a) del artículo 10 los reserva a «los trabajadores que se hubieran desempeñado en forma continuada durante más de tres (3) meses». Si el trabajo duró menos, no hay cobertura después. Los tres meses se cuentan desde el último día de trabajo, no desde que cobrás la liquidación final ni desde el fin de mes.`,
  },
  {
    q: "¿Y si renuncié en vez de que me despidieran?",
    a: "Es lo mismo. El inciso a) habla de «extinción del contrato de trabajo», sin importar la causa: despido con o sin causa, renuncia, mutuo acuerdo o fin de un contrato a plazo. Lo que cambia entre esos casos es la indemnización, no la obra social.",
  },
  {
    q: "Estoy de licencia por enfermedad. ¿Cuándo se corta?",
    a: `Mucho más tarde de lo que suele decirse, y no es un número fijo. El inciso b) no tiene plazo propio: dice que la cobertura dura «el plazo de conservación del empleo sin percepción de remuneración». Ese plazo es el año del artículo 211 de la Ley de Contrato de Trabajo. Y arranca recién cuando termina la licencia paga del artículo 208, que es de ${PLAZOS_ART_208.sinCargas.hasta5}, ${PLAZOS_ART_208.sinCargas.mas5} o ${PLAZOS_ART_208.conCargas.mas5} meses según tu antigüedad y tus cargas de familia. Sumando las dos etapas, la cobertura va de ${PLAZOS_ART_208.sinCargas.hasta5 + CONSERVACION_EMPLEO_MESES} meses a ${PLAZOS_ART_208.conCargas.mas5 + CONSERVACION_EMPLEO_MESES} meses, siempre sin que tengas que aportar.`,
  },
  {
    q: "Me suspendieron sin sueldo. ¿Sigo teniendo cobertura?",
    a: "Tres meses sí, gratis. Si la suspensión dura más, el inciso c) te da una opción, no un derecho: podés seguir con la obra social si pagás tu aporte y también la contribución que pagaba el empleador. Son los nueve puntos completos, no los tres del recibo.",
  },
  {
    q: "Pedí licencia sin goce de sueldo. ¿Me sacan la obra social?",
    a: "No automáticamente, pero la pagás desde el primer día. El inciso d) te deja seguir durante toda la licencia «cumpliendo con las obligaciones de aportes a su cargo y contribución a cargo del empleador». Acá la ley no te regala ningún mes. A diferencia del despido o de la enfermedad, se paga desde el arranque.",
  },
  {
    q: "¿Cuánto cuesta seguir cuando hay que pagar?",
    a: "La ley dice qué hay que cubrir: el aporte del trabajador y la contribución del empleador (artículo 16). Pero no dice sobre qué sueldo se calculan cuando ya no cobrás sueldo. Ese hueco lo llena cada obra social con su propia base, así que preguntá el monto antes de contar con la cobertura. Cualquier número cerrado que se publique sobre esto no sale de la ley.",
  },
  {
    q: "Murió el titular. ¿Qué pasa con la familia?",
    a: `El inciso h) le da a la familia «el plazo y en las condiciones del inciso a)»: los mismos ${EXTINCION.mesesCobertura} meses, con el mismo requisito de que el titular haya trabajado más de tres meses seguidos. Después pueden elegir seguir, pagando los aportes y contribuciones que le hubieran correspondido al trabajador. Ese derecho se termina si consiguen obra social por otro lado.`,
  },
  {
    q: "¿El Decreto 70/2023 recortó algo de esto?",
    a: "Casi nada, y es mejor decirlo así que alarmar. De los ocho incisos tocó dos. Reescribió el e) (trabajadores de temporada) sin cambiar el fondo, y derogó el f), que cubría al trabajador llamado al servicio militar obligatorio. El servicio militar obligatorio no existe desde 1994: el decreto borró texto muerto, no un derecho vivo.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de continuidad de la obra social",
        url: "https://calcular.ar/hasta-cuando-tengo-obra-social",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "¿Hasta cuándo tenés obra social después del trabajo?",
        descripcion:
          "Los ocho supuestos del artículo 10 de la Ley 23.660, con la fecha exacta hasta la que sigue la cobertura y en cuáles hay que pagar el aporte y la contribución para conservarla.",
        url: "/hasta-cuando-tengo-obra-social",
        modificado: CONTINUIDAD_FUENTES.consultadoEl,
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
          ¿Hasta cuándo tenés obra social después del trabajo?
        </h1>
        <p className="text-zinc-600">
          «Te quedan tres meses» es cierto, pero le faltan dos cosas. Esos tres meses{" "}
          <strong>tienen un requisito</strong> (haber trabajado más de tres meses seguidos) y son
          solo uno de los <strong>ocho casos</strong> del artículo 10 de la Ley 23.660. En cuatro
          de ellos seguís cubierto sin pagar nada. En los otros cuatro, solo si pagás tu aporte{" "}
          <em>y</em> la contribución del empleador.
        </p>
      </header>

      <SelloVerificado
        verificadoEl={CONTINUIDAD_FUENTES.consultadoEl}
        norma="Ley 23.660, art. 10 · LCT arts. 208 y 211"
        fuente={CONTINUIDAD_FUENTES.principal}
      />

      <RespuestaPrimero actualizado={CONTINUIDAD_FUENTES.consultadoEl}>
        <p>
          <strong>
            Si se terminó el trabajo, {EXTINCION.mesesCobertura} meses desde el último día, sin
            pagar nada, siempre que hayas trabajado más de {EXTINCION.mesesDesempenoMinimo} meses
            seguidos
          </strong>{" "}
          (art. 10 inc. a). Si estás con licencia por enfermedad o accidente no laboral, la
          cobertura llega mucho más lejos. Primero se termina la licencia paga del art. 208 (
          {PLAZOS_ART_208.sinCargas.hasta5}, {PLAZOS_ART_208.sinCargas.mas5} o{" "}
          {PLAZOS_ART_208.conCargas.mas5} meses) y recién ahí corre el año de reserva del puesto del
          art. 211: entre {PLAZOS_ART_208.sinCargas.hasta5 + CONSERVACION_EMPLEO_MESES} y{" "}
          {PLAZOS_ART_208.conCargas.mas5 + CONSERVACION_EMPLEO_MESES} meses en total. Si te
          suspendieron sin sueldo, son 3 meses gratis y después podés seguir pagando. En la licencia
          sin goce, en la temporada y en la excedencia se paga desde el primer día.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá la fecha exacta</h2>
        <p className="text-sm text-zinc-600">
          Elegí tu caso y cargá las dos fechas. La de ingreso importa: define si cumplís el mínimo
          del inciso a) y, si es por enfermedad, cuántos meses de licencia paga corren antes del año
          de reserva.
        </p>
        <CalculadoraObraSocialContinuidad />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los ocho casos, uno por uno</h2>
        <p className="text-zinc-600">
          El artículo arranca con la regla general ({CONTINUIDAD_TEXTOS.encabezado.toLowerCase()}) y
          después abre las excepciones. Entre una y otra no cambia solo el plazo: cambia quién paga.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Situación</th>
                  <th className="px-4 py-2.5 font-semibold">Cuánto dura</th>
                  <th className="px-4 py-2.5 font-semibold">¿Se paga?</th>
                  <th className="px-4 py-2.5 font-semibold">Norma</th>
                </tr>
              </thead>
              <tbody>
                {SUPUESTOS.map((s) => (
                  <tr key={s.id} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 font-medium text-zinc-900">{s.titulo}</td>
                    <td className="px-4 py-2.5 text-zinc-600">{s.duracion}</td>
                    <td className="px-4 py-2.5">
                      {s.costo === "sin-aporte" ? (
                        <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-xs font-semibold text-emerald-800">
                          No, al principio
                        </span>
                      ) : (
                        <span className="rounded bg-amber-50 px-1.5 py-0.5 text-xs font-semibold text-amber-900">
                          Sí, desde el día uno
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-zinc-500">{s.inciso}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El requisito de entrada que decide el caso más frecuente
        </h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm font-semibold text-emerald-900">Ley 23.660, art. 10 inc. a)</p>
          <p className="mt-1 text-sm text-zinc-700">«{SUPUESTOS[0].texto}»</p>
        </blockquote>
        <p className="text-zinc-600">
          «Más de tres meses» quiere decir más, no tres justos. Y en los trabajos cortos es donde la
          respuesta de siempre falla: si trabajaste dos meses y medio y te quedaste sin trabajo, te
          quedás también sin los tres meses de cobertura, aunque toda la web diga que los tenés. El
          plazo se cuenta desde el último día de trabajo, no desde que cobrás la liquidación final
          ni desde el fin de mes. Si te despidieron, también te puede corresponder la{" "}
          <Link href="/desempleo" className="text-emerald-700 hover:underline">
            prestación por desempleo
          </Link>
          , y si renunciaste, revisá{" "}
          <Link href="/renuncia" className="text-emerald-700 hover:underline">
            qué te tienen que pagar al renunciar
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La enfermedad no se cuenta en meses sueltos: se deriva
        </h2>
        <p className="text-zinc-600">
          El inciso b) es el único que no trae un número. Remite al plazo de reserva del puesto, y
          ese plazo está en otra ley:
        </p>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Ley de Contrato de Trabajo, art. 211
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{CONTINUIDAD_TEXTOS.art211}»</p>
        </blockquote>
        <p className="text-zinc-600">
          «Vencidos los plazos» son los del art. 208: {PLAZOS_ART_208.sinCargas.hasta5} meses hasta
          los {PLAZOS_ART_208.corteAntiguedadAnios} años de antigüedad y{" "}
          {PLAZOS_ART_208.sinCargas.mas5} desde ahí, el doble si tenés cargas de familia. Por eso, a
          «¿cuánto me dura la obra social si estoy de licencia?» la respuesta no es «un año». Es
          entre {PLAZOS_ART_208.sinCargas.hasta5 + CONSERVACION_EMPLEO_MESES} meses y{" "}
          {PLAZOS_ART_208.conCargas.mas5 + CONSERVACION_EMPLEO_MESES} meses, según el caso. El
          detalle de la licencia paga está en la{" "}
          <Link href="/licencia-por-enfermedad" className="text-emerald-700 hover:underline">
            calculadora de licencia por enfermedad
          </Link>{" "}
          y el del año de reserva, en la de{" "}
          <Link href="/reserva-del-empleo" className="text-emerald-700 hover:underline">
            reserva del empleo
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Cuando hay que pagar, son nueve puntos y la base la pone la obra social
        </h2>
        <p className="text-zinc-600">
          En la suspensión larga, en la licencia sin goce de sueldo, en la temporada y en la
          excedencia, la ley usa siempre la misma fórmula: seguís cubierto «cumpliendo con las
          obligaciones del aporte a su cargo <strong>y de la contribución a cargo del
          empleador</strong>». No es el 3% del recibo: es el 3% más el 6%. Y hay un hueco que
          conviene conocer antes. La ley dice qué hay que cubrir, pero{" "}
          <strong>no dice sobre qué sueldo se calcula</strong> cuando ya no cobrás sueldo. Esa base
          la define cada obra social, así que el monto se pregunta. No sale de la norma, y acá no lo
          inventamos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué tocó el Decreto 70/2023</h2>
        <p className="text-zinc-600">
          Dos incisos de ocho. Reescribió el e) (trabajadores de temporada) sin cambiar el fondo, y
          derogó el f), que decía:
        </p>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Derogado: Ley 23.660, art. 10 inc. f) (art. 280 del Decreto 70/2023)
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{CONTINUIDAD_TEXTOS.incisoFDerogado}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Lo anotamos para que esté completo, no porque se haya perdido un derecho. El servicio
          militar obligatorio se suspendió en 1994, así que ese inciso ya no se le aplicaba a nadie.
          Los seis incisos que sí se usan quedaron intactos.
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
          {CONTINUIDAD_FUENTES.lista.map((f) => (
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
          Esta página es informativa y aplica normas publicadas en el Boletín Oficial e InfoLEG. No
          reemplaza la consulta con tu obra social, que es la que define la base de cálculo cuando
          seguir cubierto se paga. Para la liquidación final está la{" "}
          <Link href="/indemnizacion" className="text-emerald-700 hover:underline">
            calculadora de indemnización
          </Link>
          , y para entender cuánto de tu sueldo llega a la obra social cuando volvés a trabajar,{" "}
          <Link href="/derivar-aportes-a-prepaga" className="text-emerald-700 hover:underline">
            derivar aportes a una prepaga
          </Link>
          . Consultada el {CONTINUIDAD_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
