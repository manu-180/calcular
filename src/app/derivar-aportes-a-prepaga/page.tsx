import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraObraSocial } from "@/components/CalculadoraObraSocial";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { SelloVerificado } from "@/components/SelloVerificado";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  APORTE_ADICIONAL_FAMILIAR,
  APORTE_TRABAJADOR,
  ART_19_BIS,
  CONTRIBUCION_EMPLEADOR,
  OBRA_SOCIAL_FUENTES,
  OBRA_SOCIAL_TEXTOS,
  REPARTO_ANTERIOR,
  REPARTO_VIGENTE,
  VIGENCIA_REPARTO,
} from "@/data/obra-social-aportes";

const pct = (n: number) => `${(n * 100).toLocaleString("es-AR", { maximumFractionDigits: 1 })}%`;

export const metadata: Metadata = {
  title: "Derivar aportes a una prepaga: cuánto llega de verdad",
  description:
    "El 85% de tus aportes va a la entidad que elegís y el 15% al Fondo Solidario (Decreto 600/2024). Calculá cuánto llega y cuánto pagás de tu bolsillo.",
  alternates: { canonical: "/derivar-aportes-a-prepaga" },
  openGraph: {
    title: "Derivar aportes a una prepaga: cuánto llega y qué perdés",
    description:
      "85% a tu entidad, 15% al Fondo Solidario. Y una letra chica que casi nadie publica: las protecciones del agente del seguro no se aplican a la prepaga.",
    url: "https://calcular.ar/derivar-aportes-a-prepaga",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Derivar aportes a una prepaga")}&s=${encodeURIComponent("85% a tu entidad · 15% al Fondo Solidario")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuánto de mi sueldo llega realmente a la obra social o a la prepaga?",
    a: `El ${pct(REPARTO_VIGENTE.entidad)} de lo que se junta, no el total. Sobre el bruto se aporta un ${pct(APORTE_TRABAJADOR)} tuyo y un ${pct(CONTRIBUCION_EMPLEADOR)} de tu empleador. De esa suma, el artículo 19 de la Ley 23.660 manda el ${pct(REPARTO_VIGENTE.entidad)} «a la entidad seleccionada por el beneficiario» y el ${pct(REPARTO_VIGENTE.fondo)} al Fondo Solidario de Redistribución. Con un bruto de $1.800.000 son unos $137.700 al mes para tu entidad, no los $162.000 que da la cuenta directa del 9%.`,
  },
  {
    q: "¿El Decreto 600/2024 hizo que llegue más plata a mi obra social?",
    a: `Para la mayoría, no, y conviene decirlo derecho. La escala anterior mandaba el ${pct(REPARTO_ANTERIOR.obraSocial.hastaUmbral)} a la obra social si el sueldo bruto no pasaba de mil pesos, y el ${pct(REPARTO_ANTERIOR.obraSocial.sobreUmbral)} si pasaba. Ese límite estaba congelado desde 2002, así que hace veinte años que todos los sueldos caen del lado del ${pct(REPARTO_ANTERIOR.obraSocial.sobreUmbral)}. Para la obra social sindical, el reparto quedó igual. Donde sí cambió es en las obras sociales del personal de dirección y en las prepagas que funcionan como agentes del seguro: pasaron del ${pct(REPARTO_ANTERIOR.personalDireccion.sobreUmbral)} al ${pct(REPARTO_VIGENTE.entidad)}, cinco puntos más.`,
  },
  {
    q: "¿Puedo derivar los aportes a una prepaga y pagar solo la diferencia?",
    a: "Sí, y la base legal es más concreta que el «se puede» que circula. El artículo 3° del Decreto 600/2024 reescribió el artículo 3° del Anexo I del Decreto 576/93. Dice que las entidades del inciso i) del artículo 1° de la Ley 23.660 (las prepagas que el Decreto 70/2023 sumó como agentes del seguro) «podrán solicitar el pago de una cuota y tomar a cuenta los aportes y contribuciones obligatorios para ofrecer a sus beneficiarios planes superadores». Vos pagás la diferencia entre la cuota del plan y lo que llega por aportes.",
  },
  {
    q: "¿Qué pierdo al derivar los aportes a una prepaga?",
    a: "Las protecciones al entrar, y esto es lo que casi no se publica. El artículo 1° del Anexo II del Decreto 576/93 prohíbe a los agentes del seguro pedir requisitos que no estén en la ley, discriminar, tomar examen psicofísico y poner carencias. El artículo 4° del Decreto 600/2024 agregó que esos cuatro incisos «no son aplicables» a las entidades del inciso i) que funcionan con la Ley 26.682. Para ellas rigen los artículos 9°, 10 y 12 de esa ley. En criollo: la obra social sindical no te puede pedir declaración jurada de salud ni cobrarte más por una enfermedad que ya tenías. La prepaga a la que derivás los aportes, sí (con los valores diferenciales que autoriza la autoridad de aplicación).",
  },
  {
    q: "¿Tengo que esperar un año para volver a cambiar?",
    a: "No, si lo que terminó fue la contratación del plan. El mismo artículo 3° del Anexo I del Decreto 576/93, en su redacción vigente, cierra así: «Cuando, por cualquier motivo, finalice la contratación del plan el beneficiario podrá optar por cualquier otro Agente del Seguro sin limitación temporal».",
  },
  {
    q: "¿Y si pago un adicional para mejorar el plan? ¿Ese adicional también aporta al Fondo?",
    a: `Hoy no. Entre el ${ART_19_BIS.desde} y el ${ART_19_BIS.hasta} sí: el artículo 19 bis, que sumó el Decreto 70/2023, obligaba a depositar el ${pct(ART_19_BIS.coeficiente)} al Fondo Solidario cuando la entidad recibía aportes además de los del artículo 16. El artículo 2° del Decreto 600/2024 lo derogó. Y el artículo 23 de la Ley 26.682, en su texto vigente, es claro con los planes que se contratan por cuenta propia: «no realizarán aportes al Fondo Solidario de Redistribución ni participarán del mismo».`,
  },
  {
    q: "¿Cuándo se paga el 1,5% extra por familiar?",
    a: `Casi nunca por el cónyuge o los hijos, que es lo que suele creerse. El adicional del ${pct(APORTE_ADICIONAL_FAMILIAR)} del artículo 16 inciso b) corre por las personas del último apartado del artículo 9: «otros ascendientes o descendientes por consanguinidad» a cargo del titular, y solo si la Superintendencia de Servicios de Salud autoriza sumarlos. La familia directa del inciso a) (cónyuge, hijos hasta 21 años, hijos estudiantes hasta 25, hijos con discapacidad) entra sin aporte extra.`,
  },
  {
    q: "¿Cambia algo en 2027?",
    a: "El número no, el control sí. El artículo 165 de la Ley 27.802 reemplaza el inciso a) del artículo 16 para las contribuciones que correspondan desde el 1° de enero de 2027. Deja escrito en el mismo inciso el 6% que hoy se liquida por el artículo 80 de la Ley 25.565. Y suma algo nuevo: la Superintendencia de Servicios de Salud podrá auditar adónde va esa plata.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de aportes a la obra social y derivación a prepaga",
        url: "https://calcular.ar/derivar-aportes-a-prepaga",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Derivar aportes a una prepaga: cuánto llega y qué se pierde",
        descripcion:
          "El reparto 85/15 del artículo 19 de la Ley 23.660 según el Decreto 600/2024, con la calculadora de cuánto llega a la entidad y cuánto queda de bolsillo, y la letra chica que saca las protecciones de admisión a las prepagas que actúan como agentes del seguro.",
        url: "/derivar-aportes-a-prepaga",
        modificado: OBRA_SOCIAL_FUENTES.consultadoEl,
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
          Derivar los aportes a una prepaga: cuánto llega de verdad
        </h1>
        <p className="text-zinc-600">
          Sobre tu sueldo se aportan nueve puntos para salud ({pct(APORTE_TRABAJADOR)} tuyo y{" "}
          {pct(CONTRIBUCION_EMPLEADOR)} de tu empleador). Pero a la entidad que elegís no le llegan
          los nueve: llega el <strong>{pct(REPARTO_VIGENTE.entidad)}</strong>. El resto queda en el
          Fondo Solidario de Redistribución. Ese reparto es <strong>igual para todos desde el {VIGENCIA_REPARTO}</strong>.
          La escala que todavía se publica en casi todos lados (10%, 15% o 20% según el sueldo) ya
          no existe.
        </p>
      </header>

      <SelloVerificado
        verificadoEl={OBRA_SOCIAL_FUENTES.consultadoEl}
        norma="Ley 23.660, art. 19 (texto del Decreto 600/2024)"
        fuente={OBRA_SOCIAL_FUENTES.principal}
      />

      <RespuestaPrimero actualizado={OBRA_SOCIAL_FUENTES.consultadoEl}>
        <p>
          <strong>
            El {pct(REPARTO_VIGENTE.entidad)} de tus aportes va a la entidad que elegiste y el{" "}
            {pct(REPARTO_VIGENTE.fondo)} al Fondo Solidario de Redistribución
          </strong>
          , sin escalas ni tramos, desde el {VIGENCIA_REPARTO} (art. 19 de la Ley 23.660, texto del
          Decreto 600/2024). Si derivás los aportes a una prepaga, ese {pct(REPARTO_VIGENTE.entidad)}{" "}
          se toma a cuenta de la cuota y vos pagás la diferencia. Lo que casi nadie aclara es lo que
          perdés. Las reglas que protegen al afiliado de una obra social al entrar (sin declaración
          jurada de salud, sin examen psicofísico, sin carencias){" "}
          <strong>no se aplican</strong> a las prepagas que actúan como agentes del seguro.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá cuánto llega y cuánto ponés vos</h2>
        <p className="text-sm text-zinc-600">
          Cargá el bruto y, si querés, la cuota del plan. La calculadora reparte los aportes con la
          ley vigente y te muestra al lado lo que habría llegado con la escala anterior.
        </p>
        <CalculadoraObraSocial />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El cambio de 2024 no es el que se cuenta
        </h2>
        <p className="text-zinc-600">
          El Decreto 600/2024 se resume casi siempre como «ahora llega más plata a tu obra social».
          Es cierto para una parte del sistema y falso para la otra, y la diferencia importa. Esta es
          la escala que rigió hasta el 31 de julio de 2024, con su límite de mil pesos por mes
          congelado desde el Decreto 486/2002:
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Entidad</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Antes, bruto ≤ $1.000</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Antes, bruto &gt; $1.000</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Hoy</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-700">Obra social sindical</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-zinc-600">
                    {pct(REPARTO_ANTERIOR.obraSocial.hastaUmbral)}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                    {pct(REPARTO_ANTERIOR.obraSocial.sobreUmbral)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-zinc-900">
                    {pct(REPARTO_VIGENTE.entidad)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100 bg-emerald-50/60">
                  <td className="px-4 py-2.5 font-semibold text-zinc-900">
                    Personal de dirección y entidades del inciso i)
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-zinc-600">
                    {pct(REPARTO_ANTERIOR.personalDireccion.hastaUmbral)}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                    {pct(REPARTO_ANTERIOR.personalDireccion.sobreUmbral)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold tabular-nums text-emerald-800">
                    {pct(REPARTO_VIGENTE.entidad)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-600">
          Como hace dos décadas que ningún sueldo real está por debajo de mil pesos, siempre se usaba
          la columna del medio. Para la obra social sindical el reparto ya era{" "}
          {pct(REPARTO_ANTERIOR.obraSocial.sobreUmbral)}: no cambió nada. Para el personal de
          dirección y para las prepagas del inciso i), pasó de{" "}
          {pct(REPARTO_ANTERIOR.personalDireccion.sobreUmbral)} a {pct(REPARTO_VIGENTE.entidad)}. El
          mismo decreto explica por qué borró ese límite:
        </p>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Decreto 600/2024, considerandos
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{OBRA_SOCIAL_TEXTOS.considerandoUmbral}»</p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">El artículo que hoy manda</h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm font-semibold text-emerald-900">
            Ley 23.660, art. 19 (texto del art. 1° del Decreto 600/2024)
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{OBRA_SOCIAL_TEXTOS.art19Vigente}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          La clave está en una frase: «la entidad seleccionada por el beneficiario». Antes del
          Decreto 70/2023 el depósito iba «a la orden de la Obra Social que corresponda» (la de tu
          convenio). Hoy la ley reconoce que la entidad la elegís vos. Y el artículo 270 de ese
          decreto sumó al artículo 1° un inciso i) que mete en el sistema a todas las entidades de la
          Ley 26.682: por ahí entran las prepagas.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Lo que se derogó: los siete meses del artículo 19 bis
        </h2>
        <p className="text-zinc-600">
          Entre el {ART_19_BIS.desde} y el {ART_19_BIS.hasta} hubo un artículo que le cobraba
          justo a lo que ponés de tu bolsillo para mejorar el plan. El artículo 2° del Decreto
          600/2024 lo derogó, pero sigue apareciendo como vigente en explicaciones que no se
          actualizaron:
        </p>
        <blockquote className="rounded-xl border-l-4 border-rose-300 bg-rose-50/60 p-4">
          <p className="text-sm font-semibold text-rose-900">
            DEROGADO: Ley 23.660, art. 19 bis (incorporado por el art. 285 del Decreto 70/2023)
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{OBRA_SOCIAL_TEXTOS.art19bisDerogado}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Y para los planes que se contratan sin aportes de por medio, el artículo 23 de la Ley
          26.682 (también reemplazado por el Decreto 600/2024) lo dice sin vueltas: «
          {OBRA_SOCIAL_TEXTOS.adhesionVoluntaria}».
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La letra chica que decide: qué protecciones no viajan con vos
        </h2>
        <p className="text-zinc-600">
          Esta parte no aparece en las notas sobre cómo derivar aportes, y es la que te puede hacer
          cambiar de idea. Los agentes del seguro tienen cuatro prohibiciones al momento de afiliarte:
          no pueden pedir requisitos que no estén en la ley, no pueden discriminar para darte la
          cobertura básica, no pueden tomar examen psicofísico y no pueden poner carencias. El
          artículo 4° del Decreto 600/2024 agregó al final:
        </p>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/70 p-4">
          <p className="text-sm font-semibold text-amber-900">
            Decreto 576/93, Anexo II, art. 1° (texto del art. 4° del Decreto 600/2024)
          </p>
          <p className="mt-1 text-sm text-zinc-700">
            «{OBRA_SOCIAL_TEXTOS.proteccionesQueNoAplican}»
          </p>
        </blockquote>
        <p className="text-zinc-600">
          En su lugar queda la Ley 26.682, que protege bastante pero no igual. El artículo 10 permite
          la declaración jurada de salud y los valores diferenciales:
        </p>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Ley 26.682, art. 10</p>
          <p className="mt-1 text-sm text-zinc-700">«{OBRA_SOCIAL_TEXTOS.preexistencias}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Del otro lado hay dos garantías para tener en cuenta. El artículo 9° te deja dar de baja el
          plan cuando quieras, sin multa, avisando con treinta días. La prepaga, en cambio, solo puede
          darte de baja por tres cuotas seguidas sin pagar o por mentir en la declaración jurada. Y el
          artículo 12 frena el aumento por edad: «{OBRA_SOCIAL_TEXTOS.mayores65}».
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cambiar de entidad, sin esperar un año</h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm font-semibold text-emerald-900">
            Decreto 576/93, Anexo I, art. 3° (texto del art. 3° del Decreto 600/2024)
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{OBRA_SOCIAL_TEXTOS.tomarACuenta}»</p>
          <p className="mt-2 text-sm text-zinc-700">
            «{OBRA_SOCIAL_TEXTOS.sinLimitacionTemporal}»
          </p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          La primera frase es la base legal de «derivo los aportes y pago la diferencia». La segunda
          rompe el mito de que tenés que quedarte un año, cuando el plan terminó por cualquier
          motivo. Si te quedaste sin trabajo, fijate también{" "}
          <Link href="/hasta-cuando-tengo-obra-social" className="text-emerald-700 hover:underline">
            hasta cuándo te cubre la obra social
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El {pct(APORTE_ADICIONAL_FAMILIAR)} por familiar, que casi nadie cobra bien
        </h2>
        <p className="text-zinc-600">
          El artículo 16 inciso b) tiene una segunda oración que suele leerse mal: el adicional del{" "}
          {pct(APORTE_ADICIONAL_FAMILIAR)} no corre por el cónyuge ni por los hijos. Corre por las
          personas del último apartado del artículo 9, y solo si la Superintendencia autoriza
          sumarlas:
        </p>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Ley 23.660, art. 9, último apartado (texto del art. 278 del Decreto 70/2023)
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{OBRA_SOCIAL_TEXTOS.adicional15}»</p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Lo que viene el 1° de enero de 2027</h2>
        <p className="text-zinc-600">
          El {pct(CONTRIBUCION_EMPLEADOR)} que pone el empleador se liquida hoy por el artículo 80 de
          la Ley 25.565, que lo volvió a subir después de que la Ley 25.239 lo bajara al 5%. Por eso
          el inciso a) sigue diciendo 5%, pero el número real es otro. El artículo 165 de la Ley
          27.802 ordena esa contradicción y suma algo nuevo:
        </p>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Ley 27.802, art. 165</p>
          <p className="mt-1 text-sm text-zinc-700">«{OBRA_SOCIAL_TEXTOS.contribucion2027}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          El porcentaje no cambia. Lo que cambia es que la Superintendencia va a poder auditar adónde
          va esa plata.
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
          {OBRA_SOCIAL_FUENTES.lista.map((f) => (
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
          reemplaza el asesoramiento sobre un caso concreto y no recomienda ninguna entidad. Si pagás
          Ganancias, mirá cuánto de la prepaga podés restar en{" "}
          <Link href="/deducciones-generales-ganancias" className="text-emerald-700 hover:underline">
            las deducciones generales de Ganancias
          </Link>
          . Para ver el recibo completo está la{" "}
          <Link href="/sueldo-neto" className="text-emerald-700 hover:underline">
            calculadora de sueldo neto
          </Link>
          , y para el resto de lo que te descuentan del recibo, la{" "}
          <Link href="/descuentos-del-sueldo" className="text-emerald-700 hover:underline">
            de descuentos del sueldo
          </Link>
          . Consultada el {OBRA_SOCIAL_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
