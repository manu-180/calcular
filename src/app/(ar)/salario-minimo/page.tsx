import type { Metadata } from "next";
import { hreflangHeadAR } from "@/lib/hreflang-ar";
import Link from "next/link";
import { CalculadoraSalarioMinimo } from "@/components/CalculadoraSalarioMinimo";
import { datosOferta } from "@/lib/oferta";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import { SMVM_SERIE } from "@/data/desempleo";
import {
  DERIVADOS_SMVM,
  EDAD_ART_117,
  HORAS_MENSUALES_JORNADA_COMPLETA,
  JORNADA_LEGAL_SEMANAL,
  SMVM_FUENTES,
  SMVM_TEXTOS,
} from "@/data/salario-minimo";
import { etiquetaMes, smvmVigente } from "@/lib/desempleo";
import { variacionMensual } from "@/lib/salario-minimo";
import { formatARS } from "@/lib/formato";
import { OtrosPaises } from "@/components/OtrosPaises";

function datosDelMes() {
  const SMVM = smvmVigente().mes;
  const MES = etiquetaMes(SMVM.periodo);
  const FIN = SMVM_SERIE[SMVM_SERIE.length - 1];
  const MES_FIN = etiquetaMes(FIN.periodo);

  // La tabla arranca dos meses antes del vigente: lo que importa es el mes en curso y todo lo que
  // ya tiene norma hacia adelante, no el final de la escala.
  const I_VIGENTE = SMVM_SERIE.findIndex((m) => m.periodo === SMVM.periodo);
  const ESCALA = SMVM_SERIE.slice(Math.max(0, I_VIGENTE - 2));

  const MEDIA_JORNADA = Math.round(SMVM.mensual / 2);
  return { SMVM, MES, FIN, MES_FIN, I_VIGENTE, ESCALA, MEDIA_JORNADA };
}

type DatosDelMes = ReturnType<typeof datosDelMes>;

const metadataDelMes = ({ SMVM, MES, MES_FIN }: DatosDelMes): Metadata => ({
  title: `Salario mínimo ${MES}: cuánto es por mes y hora`,
  description: `El salario mínimo de ${MES}: ${formatARS(SMVM.mensual, 0)} por mes y ${formatARS(SMVM.porHora, 0)} por hora. Escala fijada hasta ${MES_FIN} (Resolución 4/2026) y lo que determina.`,
  alternates: { canonical: "/salario-minimo", languages: hreflangHeadAR("/salario-minimo") },
  openGraph: {
    title: `Salario mínimo ${MES}: ${formatARS(SMVM.mensual, 0)}`,
    description: `Por mes, por hora y proporcional si trabajás menos horas. Con la escala completa hasta ${MES_FIN}, fijada por laudo del Consejo del Salario.`,
    url: "https://calcular.ar/salario-minimo",
    images: [
      {
        url: `/og?t=${encodeURIComponent(`Salario mínimo · ${MES}`)}&s=${encodeURIComponent(`${formatARS(SMVM.mensual, 0)} por mes · ${formatARS(SMVM.porHora, 0)} por hora`)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
});

export function generateMetadata(): Metadata {
  return metadataDelMes(datosDelMes());
}

const crearFaqs = ({ SMVM, MES, FIN, MES_FIN, MEDIA_JORNADA }: DatosDelMes) => [
  {
    q: `¿Cuánto es el salario mínimo en ${MES}?`,
    a: `${formatARS(SMVM.mensual, 0)} por mes si sos mensualizado y cumplís la jornada legal completa, y ${formatARS(SMVM.porHora, 0)} por hora si sos jornalizado. Lo fijó el artículo 1º de la Resolución 4/2026 del Consejo Nacional del Empleo, la Productividad y el Salario Mínimo, Vital y Móvil, publicada en el Boletín Oficial el 2 de septiembre de 2026. Es un monto bruto y no incluye las asignaciones familiares.`,
  },
  {
    q: "¿Hasta cuándo está fijado el salario mínimo?",
    a: `Hasta ${MES_FIN}, cuando va a ser de ${formatARS(FIN.mensual, 0)}. Es lo que menos se contó de esta resolución. Como el Consejo del Salario no llegó a un acuerdo en la reunión del 28 de agosto de 2026, la escala salió por laudo, y el laudo no fijó un mes sino ocho. Todos esos montos ya están publicados en el Boletín Oficial y no dependen de ninguna negociación futura.`,
  },
  {
    q: "Trabajo media jornada, ¿me tienen que pagar el salario mínimo completo?",
    a: `No: te corresponde la proporción. La resolución dice que el monto es "para todos los trabajadores mensualizados que cumplen la jornada legal completa de trabajo… con excepción de las situaciones previstas en los artículos 92 ter y 198 [de la LCT], que lo percibirán en su debida proporción". Con la jornada legal de ${JORNADA_LEGAL_SEMANAL} horas semanales, si trabajás la mitad tenés un piso de ${formatARS(MEDIA_JORNADA, 0)} en ${MES}. Lo que no cambia es el valor por hora: la hora vale ${formatARS(SMVM.porHora, 0)} sin importar cuántas trabajes.`,
  },
  {
    q: "¿El salario mínimo es en mano o en bruto?",
    a: "En bruto. Es el sueldo antes de los aportes de ley (11% de jubilación, 3% de PAMI y 3% de obra social), así que lo que te queda en mano es menos. Tampoco incluye las asignaciones familiares: el artículo 118 de la LCT dice que esos subsidios «son independientes del derecho a la percepción del salario mínimo vital», y el artículo 1º de la resolución fija el monto «excluidas las asignaciones familiares».",
  },
  {
    q: "¿Mi sueldo puede ser el salario mínimo si tengo convenio?",
    a: "Puede, pero casi nunca es lo que te corresponde. El salario mínimo es el piso de toda la economía: no se puede bajar por ningún motivo. Si tu actividad tiene convenio colectivo, tu piso real es el básico de tu categoría en la escala del convenio, que en toda actividad registrada está por encima del mínimo. Si cobrás el mínimo teniendo convenio, lo más probable es que tu categoría esté mal puesta o que la escala del convenio esté vieja.",
  },
  {
    q: "¿Qué pasa si me pagan menos?",
    a: `El artículo 119 de la LCT es claro: «por ninguna causa podrán abonarse salarios inferiores a los que se fijen de conformidad al presente capítulo». Solo admite dos excepciones: las reducciones para aprendices y para quienes hacen jornada reducida no impuesta por la calificación, según el artículo 200. Pagar menos del mínimo es una infracción laboral, y las multas por infracciones se calculan justamente como un porcentaje del salario mínimo vigente cuando se detecta la falta.`,
  },
  {
    q: "¿Se puede embargar el salario mínimo?",
    a: "No, salvo por deudas de alimentos. El artículo 120 de la LCT dice que no se puede embargar «en la proporción que establezca la reglamentación, salvo por deudas alimentarias», y el Decreto 484/87 fija esa proporción. Un salario mínimo entero no se toca. Sobre lo que pasa de ese piso se puede embargar el 10%, o el 20% si el sueldo es más del doble del mínimo.",
  },
  {
    q: "¿Desde qué edad se tiene derecho al salario mínimo?",
    a: `El artículo 117 de la LCT dice, textualmente, que «todo trabajador mayor de dieciocho (${EDAD_ART_117}) años, tendrá derecho a percibir una remuneración no inferior al salario mínimo vital que se establezca». Es el texto vigente y conviene leerlo tal cual, porque la edad mínima para trabajar es 16 años: entre los 16 y los 18, el derecho al mínimo no sale de este artículo.`,
  },
  {
    q: "¿A quiénes alcanza?",
    a: "Al Régimen de Contrato de Trabajo (Ley 20.744), al Régimen de Trabajo Agrario, a la Administración Pública Nacional y a todas las entidades y organismos del Estado Nacional que actúen como empleador. Es lo que dice el artículo 1º de la resolución. Los regímenes con estatuto propio (casas particulares, por ejemplo) tienen su propia escala mínima, que se fija aparte.",
  },
  {
    q: "¿El salario mínimo lo fija el Gobierno?",
    a: "Lo fija el Consejo Nacional del Empleo, la Productividad y el Salario Mínimo, Vital y Móvil. Es un organismo de tres partes creado por la Ley 24.013, donde se sientan el Estado, las cámaras empresarias y las centrales sindicales. Si hay acuerdo, la escala sale del acuerdo. Si no lo hay (como el 28 de agosto de 2026), el artículo 137 de esa ley obliga a la presidencia del Consejo a laudar, y la escala sale del laudo.",
  },
];

export default function SalarioMinimoPage() {
  const datos = datosDelMes();
  const { SMVM, MES, FIN, MES_FIN, ESCALA, MEDIA_JORNADA } = datos;
  const faqs = crearFaqs(datos);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de salario mínimo, vital y móvil",
        url: "https://calcular.ar/salario-minimo",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      datasetSchema({
        nombre: "Escala del salario mínimo, vital y móvil de la Argentina",
        descripcion: `Salario mínimo, vital y móvil mes a mes, en importe mensual para la jornada legal completa y en importe por hora para el trabajador jornalizado. Incluye la escala fijada por la Resolución 4/2026 del Consejo Nacional del Empleo, la Productividad y el SMVM, con norma dictada hasta ${MES_FIN}.`,
        url: "/salario-minimo",
        modificado: SMVM_FUENTES.consultadoEl,
        fuenteNombre: SMVM_FUENTES.lista[0].nombre,
        fuenteUrl: SMVM_FUENTES.lista[0].url,
      }),
      articleSchema({
        titulo: `Salario mínimo de ${MES}: cuánto es, cuánto por hora y qué determina`,
        descripcion:
          "El monto publicado es el de la jornada legal completa: si trabajás menos horas cobrás la proporción, y el valor por hora no cambia. La escala completa hasta abril de 2027, fijada por laudo, y los siete números del derecho laboral que dependen del salario mínimo.",
        url: "/salario-minimo",
        modificado: SMVM_FUENTES.consultadoEl,
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
          Salario mínimo de {MES}: {formatARS(SMVM.mensual, 0)} por mes y{" "}
          {formatARS(SMVM.porHora, 0)} por hora
        </h1>
        <p className="text-zinc-600">
          Ese número es el de la <strong>jornada legal completa</strong>. Si trabajás menos horas no
          cobrás eso: cobrás la proporción, y esa mitad de la respuesta casi nunca se publica. Acá
          tenés el monto que te toca según tus horas, la escala mes a mes hasta {MES_FIN} (el laudo
          la dejó fijada de una vez) y los siete números del derecho laboral que se mueven cuando se
          mueve el salario mínimo.
        </p>
      </header>

      <RespuestaPrimero actualizado={SMVM_FUENTES.consultadoEl}>
        <p>
          <strong>
            En {MES} el salario mínimo, vital y móvil es {formatARS(SMVM.mensual, 0)} por mes y{" "}
            {formatARS(SMVM.porHora, 0)} por hora.
          </strong>{" "}
          El monto mensual es para quien trabaja la jornada legal completa de{" "}
          {JORNADA_LEGAL_SEMANAL} horas semanales. Si hacés jornada reducida o trabajás a{" "}
          <Link href="/tiempo-parcial" className="text-emerald-700 hover:underline">
            tiempo parcial
          </Link>
          , te corresponde <strong>en su debida proporción</strong> (media jornada,{" "}
          {formatARS(MEDIA_JORNADA, 0)}). Es un monto bruto y no incluye las asignaciones
          familiares. Lo fijó la Resolución 4/2026 del Consejo del Salario (B.O. 2/9/2026). Como no
          hubo acuerdo, salió por <strong>laudo</strong> y dejó escrita la escala completa hasta{" "}
          {MES_FIN}, cuando va a llegar a {formatARS(FIN.mensual, 0)}.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuánto te corresponde a vos</h2>
        <p className="text-sm text-zinc-600">
          Elegí el mes y cargá tus horas semanales. Si además ponés tu sueldo bruto, la calculadora
          te dice cuánto te falta (o te sobra) para llegar al piso legal de esa jornada.
        </p>
        <CalculadoraSalarioMinimo oferta={datosOferta("planilla-mi-sueldo")} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La escala completa, mes a mes, hasta {MES_FIN}
        </h2>
        <p className="text-zinc-600">
          El 28 de agosto de 2026 el Consejo del Salario se reunió y no hubo acuerdo. En ese caso el
          artículo 137 de la Ley 24.013 obliga a laudar. Y el laudo (la Resolución 4/2026) no fijó
          solo el salario mínimo de septiembre: fijó el de los ocho meses siguientes. Estos montos ya
          están publicados en el Boletín Oficial.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Desde</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Mensual</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Por hora</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Media jornada</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Variación</th>
                </tr>
              </thead>
              <tbody>
                {ESCALA.map((m) => {
                  const v = variacionMensual(m.periodo);
                  return (
                    <tr
                      key={m.periodo}
                      className={`border-t border-zinc-100 ${
                        m.periodo === SMVM.periodo ? "bg-emerald-50/60 font-semibold" : ""
                      }`}
                    >
                      <td className="px-4 py-2.5 text-zinc-700">
                        {etiquetaMes(m.periodo)}
                        {m.periodo === SMVM.periodo ? (
                          <span className="ml-2 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                            vigente
                          </span>
                        ) : null}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                        {formatARS(m.mensual, 0)}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-zinc-700">
                        {formatARS(m.porHora, 0)}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-zinc-700">
                        {formatARS(Math.round(m.mensual / 2), 0)}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-zinc-500">
                        {v === null ? "—" : `+${v.toLocaleString("es-AR", { minimumFractionDigits: 1 })}%`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-zinc-500">
          El monto por hora es exactamente el mensual dividido {HORAS_MENSUALES_JORNADA_COMPLETA}:
          son las horas por mes que la resolución le asigna a la jornada legal completa, y la cuenta
          cierra al peso en los {SMVM_SERIE.length} meses de la escala. {FIN.periodo} es el último
          mes con norma. Después hace falta una resolución nueva, y acá no inventamos ningún monto.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Las siete cosas que el salario mínimo determina
        </h2>
        <p className="text-zinc-600">
          El salario mínimo casi no se usa como sueldo: se usa como <em>unidad de medida</em>. De él
          dependen siete números del derecho laboral y previsional, y cuando se mueve, se mueven
          todos. Estos son los valores con el salario mínimo de {MES}. Para comparar con lo que
          necesita un hogar para no ser pobre, mirá la{" "}
          <Link href="/canasta-basica" className="text-emerald-700 hover:underline">
            canasta básica del INDEC
          </Link>
          .
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[38rem] text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Qué</th>
                  <th className="px-4 py-2.5 font-semibold">Regla</th>
                  <th className="px-4 py-2.5 text-right font-semibold">En {MES}</th>
                  <th className="px-4 py-2.5 font-semibold">Norma</th>
                </tr>
              </thead>
              <tbody>
                {DERIVADOS_SMVM.map((d) => (
                  <tr key={d.concepto} className="border-t border-zinc-100 align-top">
                    <td className="px-4 py-2.5 font-medium text-zinc-800">
                      {d.href ? (
                        <Link href={d.href} className="text-emerald-700 hover:underline">
                          {d.concepto}
                        </Link>
                      ) : (
                        d.concepto
                      )}
                    </td>
                    <td className="px-4 py-2.5 text-zinc-600">{d.regla}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                      {d.factor === null
                        ? "según la infracción"
                        : formatARS(Math.round(SMVM.mensual * d.factor), 0)}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-zinc-500">{d.norma}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la ley</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">LCT, art. 116: concepto</p>
            <p className="mt-1 text-sm text-zinc-700">«{SMVM_TEXTOS.art116}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 118: cómo se determina
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{SMVM_TEXTOS.art118}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-300 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 119: prohibido pagar menos
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{SMVM_TEXTOS.art119}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Resolución 4/2026, art. 1º: el alcance y la proporción
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{SMVM_TEXTOS.resolucionArt1}, de:»</p>
            <p className="mt-2 text-sm text-zinc-700">
              …{formatARS(SMVM.mensual, 0)} «{SMVM_TEXTOS.resolucionProporcion}».
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-amber-300 bg-amber-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Resolución 4/2026: el considerando que la vuelve un laudo
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{SMVM_TEXTOS.considerandoLaudo}»</p>
          </blockquote>
        </div>
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
          {SMVM_FUENTES.lista.map((f) => (
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
          Esta página es una guía informativa y aplica normas publicadas en el Boletín Oficial e
          InfoLEG. El salario mínimo es un piso general. Si tu actividad tiene convenio colectivo,
          tu piso es el de tu categoría (
          <Link href="/convenios" className="text-emerald-700 hover:underline">
            mirá las escalas de convenio
          </Link>
          ). Y si querés ver el sueldo en mano, usá la{" "}
          <Link href="/sueldo-neto" className="text-emerald-700 hover:underline">
            calculadora de sueldo neto
          </Link>
          . Consultada el {SMVM_FUENTES.consultadoEl}.
        </p>
      </section>
      <OtrosPaises concepto="salario-minimo" />
    </article>
  );
}
