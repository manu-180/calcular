import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraSalarioMinimo } from "@/components/CalculadoraSalarioMinimo";
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

const SMVM = smvmVigente().mes;
const MES = etiquetaMes(SMVM.periodo);
const FIN = SMVM_SERIE[SMVM_SERIE.length - 1];
const MES_FIN = etiquetaMes(FIN.periodo);

// La tabla arranca dos meses antes del vigente: lo que importa es el mes en curso y todo lo que
// ya tiene norma hacia adelante, no el final de la escala.
const I_VIGENTE = SMVM_SERIE.findIndex((m) => m.periodo === SMVM.periodo);
const ESCALA = SMVM_SERIE.slice(Math.max(0, I_VIGENTE - 2));

const MEDIA_JORNADA = Math.round(SMVM.mensual / 2);

export const metadata: Metadata = {
  title: `Salario mínimo ${MES}: ${formatARS(SMVM.mensual, 0)} y la escala hasta ${MES_FIN}`,
  description: `El salario mínimo, vital y móvil de ${MES} es ${formatARS(SMVM.mensual, 0)} por mes y ${formatARS(SMVM.porHora, 0)} por hora, para la jornada legal completa. Media jornada cobra la proporción. La Resolución 4/2026 salió por laudo y dejó fijados todos los meses hasta ${MES_FIN}: acá está la escala completa y las siete cosas que el salario mínimo determina.`,
  alternates: { canonical: "/salario-minimo" },
  openGraph: {
    title: `Salario mínimo ${MES}: ${formatARS(SMVM.mensual, 0)}`,
    description: `Mensual, por hora y proporcional para jornada reducida. Con la escala completa hasta ${MES_FIN}, fijada por laudo del Consejo del Salario.`,
    url: "https://calcular.ar/salario-minimo",
    images: [
      {
        url: `/og?t=${encodeURIComponent(`Salario mínimo · ${MES}`)}&s=${encodeURIComponent(`${formatARS(SMVM.mensual, 0)} por mes · ${formatARS(SMVM.porHora, 0)} por hora`)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: `¿Cuánto es el salario mínimo en ${MES}?`,
    a: `${formatARS(SMVM.mensual, 0)} por mes para el trabajador mensualizado que cumple la jornada legal completa, y ${formatARS(SMVM.porHora, 0)} por hora para el jornalizado. Lo fijó el artículo 1º de la Resolución 4/2026 del Consejo Nacional del Empleo, la Productividad y el Salario Mínimo, Vital y Móvil, publicada en el Boletín Oficial el 2 de septiembre de 2026. Es un monto bruto y excluye las asignaciones familiares.`,
  },
  {
    q: "¿Hasta cuándo está fijado el salario mínimo?",
    a: `Hasta ${MES_FIN}, cuando será de ${formatARS(FIN.mensual, 0)}. Es la diferencia menos contada de esta resolución: como el Consejo del Salario no llegó a un acuerdo en la reunión del 28 de agosto de 2026, la escala salió por laudo, y el laudo no fijó un mes sino ocho. Cada uno de esos montos ya está publicado en el Boletín Oficial y no depende de ninguna negociación futura.`,
  },
  {
    q: "Trabajo media jornada, ¿me tienen que pagar el salario mínimo completo?",
    a: `No: te corresponde la proporción. La propia resolución dice que el monto es "para todos los trabajadores mensualizados que cumplen la jornada legal completa de trabajo… con excepción de las situaciones previstas en los artículos 92 ter y 198 [de la LCT], que lo percibirán en su debida proporción". Con la jornada legal de ${JORNADA_LEGAL_SEMANAL} horas semanales, quien trabaja la mitad tiene un piso de ${formatARS(MEDIA_JORNADA, 0)} en ${MES}. Lo que no se prorratea es el valor por hora: la hora vale ${formatARS(SMVM.porHora, 0)} sin importar cuántas trabajes.`,
  },
  {
    q: "¿El salario mínimo es en mano o en bruto?",
    a: "En bruto. Es la remuneración antes de los aportes de ley (11% de jubilación, 3% de PAMI y 3% de obra social), así que el importe de bolsillo es menor. Tampoco incluye las asignaciones familiares: el artículo 118 de la LCT dice que esos subsidios «son independientes del derecho a la percepción del salario mínimo vital», y el artículo 1º de la resolución fija el monto «excluidas las asignaciones familiares».",
  },
  {
    q: "¿Mi sueldo puede ser el salario mínimo si tengo convenio?",
    a: "Puede, pero casi nunca es lo que corresponde. El salario mínimo es el piso absoluto de la economía: el que no puede bajarse por ninguna causa. Si tu actividad tiene convenio colectivo, el piso real es el básico de tu categoría en la escala del convenio, que en toda actividad registrada está por encima del mínimo. Cobrar el salario mínimo teniendo convenio suele ser señal de que la categoría está mal asignada o de que la escala del convenio quedó desactualizada.",
  },
  {
    q: "¿Qué pasa si me pagan menos?",
    a: `El artículo 119 de la LCT es terminante: «por ninguna causa podrán abonarse salarios inferiores a los que se fijen de conformidad al presente capítulo». Las únicas excepciones que el propio artículo admite son las reducciones para aprendices y para quienes cumplen jornada reducida no impuesta por la calificación, según el artículo 200. Pagar por debajo del mínimo es una infracción laboral, y las multas por infracciones se gradúan justamente como un porcentaje del salario mínimo vigente al momento de la constatación.`,
  },
  {
    q: "¿Se puede embargar el salario mínimo?",
    a: "No, salvo por deudas alimentarias. El artículo 120 de la LCT lo declara inembargable «en la proporción que establezca la reglamentación, salvo por deudas alimentarias», y el Decreto 484/87 fija esa proporción: un salario mínimo entero es intocable, y sobre lo que excede ese piso se puede embargar el 10% —o el 20% cuando la remuneración supera el doble del mínimo—.",
  },
  {
    q: "¿Desde qué edad se tiene derecho al salario mínimo?",
    a: `El artículo 117 de la LCT dice, textualmente, que «todo trabajador mayor de dieciocho (${EDAD_ART_117}) años, tendrá derecho a percibir una remuneración no inferior al salario mínimo vital que se establezca». Es el texto vigente y conviene leerlo tal cual está escrito, porque la edad mínima de admisión al empleo es de 16 años: entre los 16 y los 18 el derecho al mínimo no surge de este artículo.`,
  },
  {
    q: "¿A quiénes alcanza?",
    a: "Al Régimen de Contrato de Trabajo (Ley 20.744), al Régimen de Trabajo Agrario, a la Administración Pública Nacional y a todas las entidades y organismos del Estado Nacional que actúen como empleador. Es el alcance textual del artículo 1º de la resolución. Los regímenes con estatuto propio —casas particulares, por ejemplo— tienen su propia escala mínima, que se fija aparte.",
  },
  {
    q: "¿El salario mínimo lo fija el Gobierno?",
    a: "Lo fija el Consejo Nacional del Empleo, la Productividad y el Salario Mínimo, Vital y Móvil, un organismo tripartito creado por la Ley 24.013 donde se sientan el Estado, las cámaras empresarias y las centrales sindicales. Cuando hay acuerdo, la escala sale del acuerdo. Cuando no lo hay —como el 28 de agosto de 2026—, el artículo 137 de esa misma ley obliga a la presidencia del Consejo a laudar, y la escala sale del laudo.",
  },
];

export default function SalarioMinimoPage() {
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
          "El monto publicado es el de la jornada legal completa: quien trabaja menos horas cobra la proporción y el valor por hora no se prorratea. La escala completa hasta abril de 2027, fijada por laudo, y los siete números del derecho laboral que cuelgan del salario mínimo.",
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
          Ese número es el de la <strong>jornada legal completa</strong>. Quien trabaja menos horas
          no cobra eso: cobra la proporción, y es la mitad de la respuesta que casi nunca se publica.
          Acá está el monto que te corresponde según tus horas, la escala mes a mes hasta{" "}
          {MES_FIN} —el laudo la dejó fijada de una vez— y los siete números del derecho laboral que
          se mueven cuando se mueve el salario mínimo.
        </p>
      </header>

      <RespuestaPrimero actualizado={SMVM_FUENTES.consultadoEl}>
        <p>
          <strong>
            En {MES} el salario mínimo, vital y móvil es {formatARS(SMVM.mensual, 0)} por mes y{" "}
            {formatARS(SMVM.porHora, 0)} por hora.
          </strong>{" "}
          El monto mensual corresponde al trabajador mensualizado que cumple la jornada legal
          completa de {JORNADA_LEGAL_SEMANAL} horas semanales; quien trabaja jornada reducida o a
          tiempo parcial lo percibe <strong>en su debida proporción</strong> (media jornada,{" "}
          {formatARS(MEDIA_JORNADA, 0)}). Es un importe bruto y excluye las asignaciones familiares.
          Lo fijó la Resolución 4/2026 del Consejo del Salario (B.O. 2/9/2026), que al no haber
          acuerdo salió por <strong>laudo</strong> y dejó escrita la escala completa hasta{" "}
          {MES_FIN}, cuando llegará a {formatARS(FIN.mensual, 0)}.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuánto te corresponde a vos</h2>
        <p className="text-sm text-zinc-600">
          Elegí el mes y cargá tus horas semanales. Si además ponés tu sueldo bruto, la calculadora
          te dice cuánto te falta —o te sobra— para llegar al piso legal de esa jornada.
        </p>
        <CalculadoraSalarioMinimo />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La escala completa, mes a mes, hasta {MES_FIN}
        </h2>
        <p className="text-zinc-600">
          El 28 de agosto de 2026 el Consejo del Salario se reunió y no hubo acuerdo. El artículo 137
          de la Ley 24.013 obliga entonces a laudar, y el laudo —la Resolución 4/2026— no fijó el
          salario mínimo de septiembre: fijó el de los ocho meses siguientes. Estos montos ya están
          publicados en el Boletín Oficial.
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
          El importe por hora es exactamente el mensual dividido {HORAS_MENSUALES_JORNADA_COMPLETA}:
          esa es la cantidad de horas mensuales que la resolución le asigna a la jornada legal
          completa, y cierra al peso en los {SMVM_SERIE.length} meses de la escala.{" "}
          {FIN.periodo} es el último mes con norma: después hace falta una resolución nueva y acá no
          se proyecta ningún monto.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Las siete cosas que el salario mínimo determina
        </h2>
        <p className="text-zinc-600">
          El salario mínimo casi no se usa como sueldo: se usa como <em>unidad de medida</em>. De él
          cuelgan siete números del derecho laboral y previsional argentino, y cada vez que se mueve,
          se mueven todos. Estos son los valores con el salario mínimo de {MES}.
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
            <p className="text-sm font-semibold text-zinc-800">LCT, art. 116 — Concepto</p>
            <p className="mt-1 text-sm text-zinc-700">«{SMVM_TEXTOS.art116}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 118 — Modalidades de su determinación
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{SMVM_TEXTOS.art118}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-300 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 119 — Prohibición de abonar salarios inferiores
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{SMVM_TEXTOS.art119}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Resolución 4/2026, art. 1º — el alcance y la proporción
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{SMVM_TEXTOS.resolucionArt1}, de:»</p>
            <p className="mt-2 text-sm text-zinc-700">
              …{formatARS(SMVM.mensual, 0)} «{SMVM_TEXTOS.resolucionProporcion}».
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-amber-300 bg-amber-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Resolución 4/2026 — el considerando que la vuelve un laudo
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
              </a>{" "}
              — {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página es informativa y aplica normas publicadas en el Boletín Oficial e InfoLEG. El
          salario mínimo es un piso general: si tu actividad tiene convenio colectivo, el piso que te
          corresponde es el de tu categoría —{" "}
          <Link href="/convenios" className="text-emerald-700 hover:underline">
            mirá las escalas de convenio
          </Link>{" "}
          — y si querés ver el sueldo de bolsillo, usá la{" "}
          <Link href="/sueldo-neto" className="text-emerald-700 hover:underline">
            calculadora de sueldo neto
          </Link>
          . Consultada el {SMVM_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
