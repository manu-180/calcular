import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPrescripcion } from "@/components/CalculadoraPrescripcion";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  PLAZOS_IMPUESTOS,
  PLAZOS_OBRA_SOCIAL,
  PRESCRIPCION_FUENTES,
  PRESCRIPCION_TEXTOS,
  SUSPENSIONES_VIGENTES,
  UMBRALES_RPT,
} from "@/data/prescripcion-arca";
import { formatARS } from "@/lib/formato";

export const metadata: Metadata = {
  title: "Prescripción de deudas con ARCA: 5, 3 o 10 años",
  description:
    "Desde el 2/1/2026 el plazo baja a 3 años si presentaste en término y la suspensión de 120 días quedó derogada. Calculá cuándo prescribe tu deuda.",
  alternates: { canonical: "/prescripcion-deuda-arca" },
  openGraph: {
    title: "Prescripción de deudas con ARCA: qué cambió el 2/1/2026",
    description:
      "Cinco años bajan a tres para quien cumple, la discrepancia significativa quedó definida por ley y la suspensión de 120 días se derogó.",
    url: "https://calcular.ar/prescripcion-deuda-arca",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Prescripción de deudas con ARCA")}&s=${encodeURIComponent("5 años bajan a 3 · la suspensión de 120 días se derogó")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿En cuántos años prescribe una deuda de impuestos con ARCA?",
    a: `Depende de tres cosas, y una es nueva. Si estás inscripto, el plazo general sigue siendo de ${PLAZOS_IMPUESTOS.inscripto} años. Pero desde el 2 de enero de 2026 baja a ${PLAZOS_IMPUESTOS.inscriptoCumplidor} si presentaste la declaración jurada en término y, si hacía falta, regularizaste el saldo, siempre que ARCA no la impugne por «discrepancia significativa». Si no estás inscripto, son ${PLAZOS_IMPUESTOS.noInscripto} años. El cambio lo hizo el artículo 30 de la Ley 27.799, que reescribió el artículo 56 de la Ley 11.683.`,
  },
  {
    q: "¿Qué es una «discrepancia significativa»?",
    a: `Ya no es un concepto abierto: la ley la define en un artículo sin número sumado después del 56 (artículo 31 de la Ley 27.799). Tiene tres condiciones y alcanza con que se cumpla una. (i) Que la impugnación aumente el saldo a favor del fisco (o reduzca quebrantos o saldos a favor) en un 15% o más de lo declarado. (ii) Que la diferencia supere el monto del artículo 1° del Régimen Penal Tributario, hoy ${formatARS(UMBRALES_RPT.tributos, 0)} por tributo y por ejercicio anual. (iii) Que la impugnación venga de facturas u otros documentos apócrifos, sin importar el monto. Sin esta definición, el beneficio de los tres años sería una promesa que el organismo podría desactivar cuando quisiera.`,
  },
  {
    q: "¿Sigue existiendo la suspensión de 120 días?",
    a: "No, y es el cambio que más notas dejó desactualizadas. El artículo sin número después del 65 de la Ley 11.683 suspendía la prescripción por 120 días si el fisco notificaba la vista de la determinación de oficio dentro de los 180 días corridos antes de que prescribiera, sobre los períodos que estaban por vencer. El artículo 32 de la Ley 27.799 lo derogó. Cualquier explicación que todavía lo presente como vigente no está incompleta: dice lo contrario del texto actual.",
  },
  {
    q: "¿Desde cuándo se cuenta el plazo?",
    a: "Desde el 1° de enero siguiente al año en que venció el plazo general para presentar la declaración jurada y pagar el impuesto. Lo dice el artículo 57 de la Ley 11.683, y la reforma no lo cambió. Por eso la calculadora pide el año del vencimiento y no el del período fiscal: una declaración de ganancias del período 2024 vence en 2025, así que el plazo empieza a correr el 1° de enero de 2026.",
  },
  {
    q: "¿Y la deuda de obra social?",
    a: `La misma reforma la tocó, con la misma lógica y otros números. El artículo 35 de la Ley 27.799 sumó dos párrafos al artículo 24 de la Ley 23.660: las acciones para cobrar aportes y contribuciones prescriben a los ${PLAZOS_OBRA_SOCIAL.general} años, y el plazo baja a ${PLAZOS_OBRA_SOCIAL.cumplidor} para quien presentó en término y regularizó, salvo discrepancia significativa. El umbral penal de esta rama es otro: el del artículo 5° del Régimen Penal Tributario, ${formatARS(UMBRALES_RPT.seguridadSocial, 0)}, y se mide por cada mes, no por ejercicio anual.`,
  },
  {
    q: "¿Por qué esta reforma pasó tan desapercibida?",
    a: "Porque la Ley 27.799 se conoce por otra cosa. Su artículo 1° subió el umbral de la evasión simple de $1.500.000 a $100.000.000, y ese fue el titular en todos lados. El capítulo que reescribe la prescripción (artículos 30, 31, 32 y 35) viene en la misma ley y casi no se comentó, aunque le sirve a cualquiera con una deuda vieja, no solo a los casos penales.",
  },
  {
    q: "¿La fecha que da la calculadora es definitiva?",
    a: "No, y conviene decirlo claro: es la fecha del plazo sin interrupciones. La prescripción se suspende y se interrumpe por las causales de los artículos 65 a 67 (intimación administrativa de pago, resolución que aplica una multa, procedimientos en trámite, conciliación administrativa, medidas cautelares, reconocimiento de la deuda, renuncia al plazo ya corrido, juicio de ejecución fiscal), y cada una mueve la fecha de una forma distinta. La calculadora te da el punto de partida correcto; tu caso hay que revisarlo con el expediente en la mano.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de prescripción de deudas con ARCA",
        url: "https://calcular.ar/prescripcion-deuda-arca",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Prescripción de deudas con ARCA: qué cambió la Ley 27.799",
        descripcion:
          "El plazo de cinco años baja a tres para quien cumple, la discrepancia significativa quedó definida por ley con tres condiciones objetivas y la suspensión de 120 días se derogó. Con la calculadora del plazo y la fecha, y el mismo cambio en la deuda de obra social.",
        url: "/prescripcion-deuda-arca",
        modificado: PRESCRIPCION_FUENTES.consultadoEl,
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
          ¿Cuándo prescribe una deuda con ARCA?
        </h1>
        <p className="text-zinc-600">
          La respuesta que publica casi toda la web (cinco años, diez si no estabas inscripto, más la
          suspensión de 120 días) quedó vieja el <strong>2 de enero de 2026</strong>. La Ley 27.799
          es famosa por subir los montos del Régimen Penal Tributario, pero en la misma ley vinieron
          tres cambios a la prescripción que casi no se comentaron. El plazo{" "}
          <strong>baja a tres años</strong> si cumpliste, «discrepancia significativa» ahora tiene{" "}
          <strong>definición legal</strong>, y la suspensión de 120 días quedó{" "}
          <strong>derogada</strong>.
        </p>
      </header>

      <RespuestaPrimero actualizado={PRESCRIPCION_FUENTES.consultadoEl}>
        <p>
          <strong>
            Si estás inscripto, {PLAZOS_IMPUESTOS.inscripto} años. O{" "}
            {PLAZOS_IMPUESTOS.inscriptoCumplidor} si presentaste la declaración jurada en término y
            regularizaste el saldo, y ARCA no la impugnó por discrepancia significativa.
          </strong>{" "}
          Si no estás inscripto, {PLAZOS_IMPUESTOS.noInscripto}. El plazo corre desde el 1° de enero
          siguiente al año en que venció la presentación (art. 57). La baja a tres años y las tres
          condiciones que la pueden anular son nuevas, de los artículos 30 y 31 de la Ley 27.799. Su
          artículo 32 <strong>derogó</strong> la suspensión de 120 días que le daba aire al fisco
          sobre los períodos por prescribir. Para la deuda de obra social, el artículo 35 hizo lo
          mismo: de {PLAZOS_OBRA_SOCIAL.general} años a {PLAZOS_OBRA_SOCIAL.cumplidor}.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá el plazo y la fecha</h2>
        <p className="text-sm text-zinc-600">
          Elegí la rama, cargá el año del vencimiento y, si hubo impugnación, los dos montos. La
          calculadora revisa las tres condiciones de discrepancia significativa y te dice qué plazo
          queda.
        </p>
        <CalculadoraPrescripcion />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los plazos, uno por uno</h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Caso</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Plazo</th>
                  <th className="px-4 py-2.5 font-semibold">Norma</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-100 bg-emerald-50/60">
                  <td className="px-4 py-2.5 font-semibold text-zinc-900">
                    Inscripto que presentó en término y regularizó, sin discrepancia significativa
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold tabular-nums">
                    {PLAZOS_IMPUESTOS.inscriptoCumplidor} años
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">
                    Ley 11.683, art. 56 inc. a), 2° párrafo (nuevo)
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-700">Inscripto, caso general</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">
                    {PLAZOS_IMPUESTOS.inscripto} años
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">Ley 11.683, art. 56 inc. a)</td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-700">No inscripto</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">
                    {PLAZOS_IMPUESTOS.noInscripto} años
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">Ley 11.683, art. 56 inc. b)</td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-700">
                    Créditos fiscales acreditados, devueltos o transferidos de forma indebida
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums">
                    {PLAZOS_IMPUESTOS.creditosIndebidos} años
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">Ley 11.683, art. 56 inc. c)</td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-700">
                    Repetición, recupero o devolución de impuestos
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums">
                    {PLAZOS_IMPUESTOS.repeticion} años
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">Ley 11.683, art. 56, párrafos finales</td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-700">Agentes de retención y percepción</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">
                    {PLAZOS_IMPUESTOS.agentesRetencion} años
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">Ley 11.683, art. 56, párrafos finales</td>
                </tr>
                <tr className="border-t border-zinc-100 bg-zinc-50">
                  <td className="px-4 py-2.5 text-zinc-700">
                    Aportes y contribuciones de obra social (cumplidor / caso general)
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums">
                    {PLAZOS_OBRA_SOCIAL.cumplidor} / {PLAZOS_OBRA_SOCIAL.general} años
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">Ley 23.660, art. 24</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Lo que se derogó, y por qué importa más que lo que se agregó
        </h2>
        <p className="text-zinc-600">
          El artículo sin número después del 65 era el salvavidas del fisco. Si notificaba la vista
          de la determinación de oficio dentro de los 180 días antes de la prescripción, ganaba 120
          días extra justo sobre los períodos que estaban por vencer. El artículo 32 de la Ley 27.799
          lo derogó. Este es su texto, que todavía aparece como vigente en explicaciones viejas:
        </p>
        <blockquote className="rounded-xl border-l-4 border-rose-300 bg-rose-50/60 p-4">
          <p className="text-sm font-semibold text-rose-900">
            Derogado: artículo s/n a continuación del art. 65 de la Ley 11.683
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{PRESCRIPCION_TEXTOS.suspension120Derogada}»</p>
          <p className="mt-2 text-xs text-rose-900/80">
            InfoLEG lo registra así: «{PRESCRIPCION_TEXTOS.notaDerogacion}»
          </p>
        </blockquote>
        <p className="text-zinc-600">
          Las demás causales de suspensión siguen en pie, y son las que en la práctica mueven la
          fecha:
        </p>
        <ul className="space-y-2">
          {SUSPENSIONES_VIGENTES.map((s) => (
            <li key={s.norma} className="rounded-xl border border-zinc-200 bg-white p-4 text-sm">
              <span className="font-semibold text-zinc-900">{s.que}</span>
              <span className="ml-2 text-xs text-zinc-500">{s.norma}</span>
              <span className="mt-1 block text-zinc-600">{s.detalle}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Las tres condiciones, textuales</h2>
        <p className="text-zinc-600">
          Son las que deciden si el plazo se queda en tres años o vuelve a cinco. Alcanza con que se
          cumpla una.
        </p>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">i) El 15%</p>
            <p className="mt-1 text-sm text-zinc-700">«{PRESCRIPCION_TEXTOS.discrepanciaI}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              ii) El umbral penal: {formatARS(UMBRALES_RPT.tributos, 0)} por tributo y ejercicio
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{PRESCRIPCION_TEXTOS.discrepanciaII}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Ese monto lo fijó la misma Ley 27.799 en su artículo 1°, al cambiar el importe del
              artículo 1° del Régimen Penal Tributario: «{PRESCRIPCION_TEXTOS.rptArt1}».
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">iii) Documentación apócrifa</p>
            <p className="mt-1 text-sm text-zinc-700">«{PRESCRIPCION_TEXTOS.discrepanciaIII}»</p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La misma reforma, en la obra social</h2>
        <p className="text-zinc-600">
          El artículo 35 de la Ley 27.799 sumó al artículo 24 de la Ley 23.660 dos párrafos con la
          misma lógica. El plazo de diez años baja a tres para quien presentó en término y
          regularizó, con las mismas tres condiciones y un umbral penal propio: el del artículo 5°
          del Régimen Penal Tributario, {formatARS(UMBRALES_RPT.seguridadSocial, 0)}, que se mide{" "}
          <strong>por cada mes</strong> («{PRESCRIPCION_TEXTOS.rptArt5}»).
        </p>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm font-semibold text-emerald-900">Ley 23.660, art. 24</p>
          <p className="mt-1 text-sm text-zinc-700">«{PRESCRIPCION_TEXTOS.art24ObraSocial}»</p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Desde cuándo corre</h2>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Ley 11.683, art. 57</p>
          <p className="mt-1 text-sm text-zinc-700">«{PRESCRIPCION_TEXTOS.art57}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          La reforma no lo tocó. Por eso la calculadora pide el año del vencimiento y no el del
          período fiscal: son distintos, y confundirlos mueve la fecha un año entero.
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
          {PRESCRIPCION_FUENTES.lista.map((f) => (
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
          InfoLEG. No reemplaza revisar el expediente, donde las suspensiones e interrupciones
          cambian la fecha. Si además te aplicaron una multa, mirá la{" "}
          <Link href="/multas-arca" className="text-emerald-700 hover:underline">
            calculadora de multas de ARCA
          </Link>
          . Para actualizar un monto adeudado está la{" "}
          <Link
            href="/actualizacion-creditos-laborales"
            className="text-emerald-700 hover:underline"
          >
            calculadora de actualización de créditos
          </Link>
          ; para el detalle de aportes y contribuciones sobre un sueldo, la{" "}
          <Link href="/descuentos-del-sueldo" className="text-emerald-700 hover:underline">
            de descuentos del sueldo
          </Link>
          . Consultada el {PRESCRIPCION_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
