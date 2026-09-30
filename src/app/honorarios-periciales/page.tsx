import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraHonorariosPericiales } from "@/components/CalculadoraHonorariosPericiales";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  CONSULTADO_EL,
  COBERTURA_CONTINUA_DESDE,
  FUENTES,
  PISO_ANTERIOR_UMA,
  SUPUESTOS,
  TEXTO_19,
  TEXTO_51,
  TEXTO_61_BIS_DESVINCULACION,
  UMA_VIGENTE,
  VIGENCIA_REFORMA,
} from "@/data/uma";
import { serieContinua } from "@/lib/honorarios-periciales";

const pesos = (n: number) => `$${Math.round(n).toLocaleString("es-AR")}`;
const fechaLarga = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const PISO_HOY = pesos(2 * UMA_VIGENTE.valor);
const PISO_ANTES = pesos(PISO_ANTERIOR_UMA * UMA_VIGENTE.valor);

export const metadata: Metadata = {
  title: "Honorarios de peritos: el piso bajó de 6 UMA a 2 UMA",
  description: `El valor de la UMA hoy es ${pesos(UMA_VIGENTE.valor)}. La Ley 27.802 sustituyó los arts. 60 y 61 de la Ley 27.423 y bajó el mínimo pericial de ${PISO_ANTERIOR_UMA} a 2 UMA, y el art. 61 bis desvinculó el honorario de la cuantía del juicio y del porcentaje de incapacidad. Calculá el piso legal y cuánto vale hoy una regulación en UMA.`,
  alternates: { canonical: "/honorarios-periciales" },
  openGraph: {
    title: "El piso de los honorarios periciales bajó dos tercios y casi nadie lo publicó",
    description: `De ${PISO_ANTERIOR_UMA} UMA a 2 UMA: los arts. 95 y 96 de la Ley 27.802 reescribieron los arts. 60 y 61 de la Ley 27.423 cambiando una sola palabra. Con la UMA de ${pesos(UMA_VIGENTE.valor)}, el piso pasó de ${PISO_ANTES} a ${PISO_HOY}.`,
    url: "https://calcular.ar/honorarios-periciales",
    images: [
      {
        url: "/og?t=Honorarios%20de%20peritos&s=El%20piso%20bajo%20de%206%20UMA%20a%202%20UMA",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuánto vale la UMA hoy?",
    a: `${pesos(UMA_VIGENTE.valor)}, desde el ${fechaLarga(UMA_VIGENTE.desde)}, fijada por la Resolución SGA ${UMA_VIGENTE.resolucion} de la Corte Suprema. La UMA equivale al 3% de la remuneración básica de un juez federal de primera instancia (art. 19 de la Ley 27.423) y la Corte la publica mes a mes, siempre después de la vigencia que fija: la resolución que puso el valor de ${UMA_VIGENTE.desde.slice(0, 7)} salió el ${fechaLarga(UMA_VIGENTE.resolucionFecha)}.`,
  },
  {
    q: "¿Cuál es el honorario mínimo de un perito?",
    a: `Dos UMA — hoy ${PISO_HOY} — tanto en los procesos susceptibles de apreciación pecuniaria (art. 61) como en los que no lo son (art. 60). Antes del ${VIGENCIA_REFORMA} eran ${PISO_ANTERIOR_UMA} UMA. Es un mínimo de orden público: el art. 16 in fine dice que «los jueces no podrán apartarse de los mínimos establecidos en la presente ley», pero el monto concreto lo fija el juez según las pautas del art. 16.`,
  },
  {
    q: "¿Qué cambió exactamente la Ley 27.802?",
    a: `Los arts. 95 y 96 sustituyeron los arts. 60 y 61 de la Ley 27.423, y el texto nuevo es idéntico al viejo palabra por palabra salvo una: donde decía «seis (6) UMA» ahora dice «dos (2) UMA». Por eso pasa desapercibida — un artículo «sustituido» que no cambia ni la lista, ni el verbo, ni el epígrafe parece una modificación menor, y en pesos son cientos de miles por pericia. El art. 97 incorporó además el art. 61 bis, que es nuevo.`,
  },
  {
    q: "¿El honorario del perito médico se calcula como porcentaje de la incapacidad?",
    a: `No, y la norma vigente lo prohíbe expresamente. El art. 61 bis dice que los honorarios periciales «no estarán vinculados a la cuantía del respectivo juicio, ni al porcentaje de incapacidad que se dictamine en caso de producirse una pericia médica», y que la regulación «responderá exclusivamente a la apreciación judicial de la labor técnica realizada». Es el punto donde más se sigue aplicando el criterio anterior en juicios laborales y de ART.`,
  },
  {
    q: "El juicio terminó en una conciliación y no llegué a presentar la pericia. ¿Cobro algo?",
    a: `Sí: un cuarto de UMA — hoy ${pesos(0.25 * UMA_VIGENTE.valor)} — «en tanto el perito haya aceptado el cargo». Lo incorporó el art. 61 bis y es un supuesto nuevo: antes de la reforma no había piso escrito para el proceso que se cierra por transacción, avenimiento o conciliación sin pericia presentada. Para regulaciones anteriores al ${VIGENCIA_REFORMA} esta calculadora no muestra piso, porque la norma no existía.`,
  },
  {
    q: "¿El mínimo es por juicio o por pericia?",
    a: "El art. 61 bis lo dice al final: «Por cada pericia, se fijará un monto mínimo de dos (2) UMA». O sea que dos pericias en el mismo expediente tienen dos pisos, no uno. La calculadora lo multiplica por la cantidad que cargues.",
  },
  {
    q: "¿Tengo que hacer la pericia para cobrar el mínimo?",
    a: "En los procesos no susceptibles de apreciación pecuniaria, no: el propio art. 60 aclara que «es suficiente para la fijación de los honorarios mínimos, la aceptación del cargo conferido». Lo mismo vale para el cuarto de UMA del art. 61 bis, que también se ancla en la aceptación del cargo.",
  },
  {
    q: "Me regularon honorarios hace un año y todavía no me pagaron. ¿Cobro el importe de entonces?",
    a: "No. El art. 51 dice que el pago «será definitivo y cancelatorio únicamente si se abona la cantidad de moneda de curso legal que resulte equivalente a la cantidad de UMA contenidas en la resolución regulatoria, según su valor vigente al momento del pago». La regulación se paga por sus UMA al valor de hoy, no por su importe nominal — y el mismo artículo obliga a que la resolución exprese las dos cosas, el monto en pesos y las UMA, bajo pena de nulidad.",
  },
  {
    q: "¿Y si mi resolución no dice cuántas UMA son?",
    a: "El art. 51 la impone «bajo pena de nulidad», así que la falta de las UMA es un defecto de la resolución, no una renuncia. La cantidad se reconstruye dividiendo el monto regulado por el valor de la UMA vigente a la fecha de esa resolución: ese cociente es lo que hay que reclamar.",
  },
  {
    q: "¿Esto vale para los honorarios de abogados?",
    a: "No. El Título IV de la Ley 27.802 reformó los mínimos de los peritos y auxiliares de la Justicia. Los honorarios de abogados y procuradores siguen su propio régimen dentro de la Ley 27.423 y no están tocados por los arts. 95 a 97. Mezclarlos es el error más caro que se puede cometer con esta reforma.",
  },
  {
    q: "¿Por qué la calculadora no acepta fechas de 2019 o 2022?",
    a: `Porque la Corte publicó varias de sus resoluciones de la UMA como imagen escaneada, y esos PDF no tienen texto legible. La serie que verificamos resolución por resolución es continua mes a mes desde el ${fechaLarga(COBERTURA_CONTINUA_DESDE)}; fuera de ese tramo no interpolamos ni estimamos, mandamos a la fuente. Preferimos un «no lo sé» a un número inventado.`,
  },
];

export default function HonorariosPericialesPage() {
  const serie = serieContinua();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de honorarios periciales mínimos (UMA, Ley 27.423)",
        url: "https://calcular.ar/honorarios-periciales",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo:
          "Honorarios periciales: el piso de 2 UMA, la desvinculación del art. 61 bis y el valor de la UMA",
        descripcion:
          "Los arts. 95 a 97 de la Ley 27.802 bajaron el mínimo pericial de 6 a 2 UMA, incorporaron el cuarto de UMA para el proceso cerrado sin pericia y desengancharon el honorario de la cuantía del juicio y del porcentaje de incapacidad.",
        url: "/honorarios-periciales",
        modificado: CONSULTADO_EL,
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
          Honorarios de peritos: cuánto es el mínimo hoy
        </h1>
        <p className="text-zinc-600">
          La UMA vale <strong>{pesos(UMA_VIGENTE.valor)}</strong> y el piso pericial son{" "}
          <strong>2 UMA</strong>. Hasta el {VIGENCIA_REFORMA} eran {PISO_ANTERIOR_UMA} —{" "}
          <strong>{PISO_ANTES}</strong> con la UMA de hoy—, y la reforma que lo bajó cambió{" "}
          <strong>una sola palabra</strong> dentro de dos artículos, por lo que casi ninguna nota la
          contó.
        </p>
      </header>

      <RespuestaPrimero actualizado={CONSULTADO_EL}>
        <p>
          El honorario mínimo de un perito es de <strong>2 UMA</strong> —hoy{" "}
          <strong>{PISO_HOY}</strong>—, tanto en los procesos susceptibles de apreciación pecuniaria
          (art. 61) como en los que no lo son (art. 60), y el mínimo se cuenta{" "}
          <strong>por cada pericia</strong>. Si el juicio terminó por transacción, avenimiento o
          conciliación y la pericia no se presentó, el piso es de <strong>1/4 de UMA</strong> (
          {pesos(0.25 * UMA_VIGENTE.valor)}), siempre que se haya aceptado el cargo. Y por el art. 61
          bis, el honorario <strong>no puede atarse</strong> ni a la cuantía del juicio ni al
          porcentaje de incapacidad.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tu caso</h2>
        <p className="text-sm text-zinc-600">
          Dos cuentas distintas: el <strong>piso legal</strong> según el supuesto y la fecha de la
          regulación, y —la que más plata mueve— cuánto hay que pagar <strong>hoy</strong> por una
          regulación vieja expresada en UMA, que es lo que manda el art. 51.
        </p>
        <CalculadoraHonorariosPericiales />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La palabra que cambió: de «seis (6) UMA» a «dos (2) UMA»
        </h2>
        <p className="text-sm text-zinc-600">
          Los arts. 95 y 96 de la Ley 27.802 «sustituyeron» los arts. 60 y 61 de la Ley 27.423. Un
          artículo sustituido suele reescribir una lista, un verbo o un epígrafe; acá el texto nuevo
          es idéntico al anterior salvo el número del mínimo. Es exactamente el tipo de reforma que
          se lee por arriba y se archiva como menor — y que en pesos vale{" "}
          <strong>{pesos((PISO_ANTERIOR_UMA - 2) * UMA_VIGENTE.valor)} por pericia</strong>.
        </p>
        <div className="space-y-3">
          {SUPUESTOS.map((s) => (
            <details
              key={s.clave}
              className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
              open
            >
              <summary className="cursor-pointer font-semibold text-zinc-800">
                {s.etiqueta} — {s.uma} UMA
                {s.umaAnterior !== null ? ` (antes: ${s.umaAnterior})` : " (supuesto nuevo)"}
              </summary>
              <p className="mt-2 text-sm italic text-zinc-600">«{s.texto}»</p>
              <p className="mt-2 text-sm text-zinc-700">{s.requisito}</p>
              <p className="mt-2 text-xs text-zinc-500">{s.articulo}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El art. 61 bis: el honorario ya no se ata al porcentaje de incapacidad
        </h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Ley 27.423, art. 61 bis (incorporado por el art. 97 de la Ley 27.802)
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTO_61_BIS_DESVINCULACION}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Toda la práctica de los juicios laborales y de riesgos del trabajo venía anclando el
          honorario del perito médico a un porcentaje de la condena o de la incapacidad dictaminada.
          Eso es justamente lo que la norma vigente prohíbe, y la frase está escrita en negativo —
          «no estarán vinculados»— para que no queden dudas. El criterio que la reemplaza es la
          apreciación judicial de la labor técnica: su relevancia, calidad y extensión.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El art. 51: una regulación en UMA no se paga por su importe nominal
        </h2>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Ley 27.423, art. 51</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTO_51}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Es una cláusula de actualización legal, y de las pocas que sobrevivieron a la prohibición
          de indexar: el pago sólo cancela si se abonan las <em>UMA</em> de la resolución al valor
          vigente <em>al momento del pago</em>. Por eso la resolución tiene que decir las dos cosas
          —el monto en pesos y la cantidad de UMA— bajo pena de nulidad. Un honorario regulado hace
          un año y pagado hoy por su importe nominal está pagado de menos, y el artículo da la
          herramienta exacta para reclamarlo.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué es la UMA y quién la fija</h2>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Ley 27.423, art. 19</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTO_19}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          La fija la Corte Suprema por resolución de su Secretaría General de Administración, y
          siempre <strong>después</strong> del período que rige: el valor de{" "}
          {fechaLarga(UMA_VIGENTE.desde)} se publicó el {fechaLarga(UMA_VIGENTE.resolucionFecha)}.
          Esta es la serie que verificamos resolución por resolución, con el PDF de cada una.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left">
                <th className="py-2 pr-3 font-medium text-zinc-600">Rige desde</th>
                <th className="py-2 px-3 text-right font-medium text-zinc-600">Valor</th>
                <th className="py-2 pl-3 font-medium text-zinc-600">Resolución SGA</th>
              </tr>
            </thead>
            <tbody>
              {serie.map((f) => (
                <tr key={f.desde} className="border-b border-zinc-200">
                  <td className="py-2 pr-3 text-zinc-800">{fechaLarga(f.desde)}</td>
                  <td className="py-2 px-3 text-right font-semibold text-zinc-900">
                    {pesos(f.valor)}
                  </td>
                  <td className="py-2 pl-3">
                    <a
                      href={`https://www.csjn.gov.ar/documentos/descargar?ID=${f.docId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline"
                    >
                      {f.resolucion}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500">
          La serie no se transcribe a mano: la baja y la parsea un script desde los PDF de la Corte.
          Antes del {fechaLarga(COBERTURA_CONTINUA_DESDE)} varias resoluciones están escaneadas y no
          se pueden leer por código — esos valores no los publicamos ni los estimamos.
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
        <p className="text-sm text-zinc-500">
          Otros cambios de la misma reforma:{" "}
          <Link href="/venta-de-inmuebles" className="font-medium text-emerald-700 hover:underline">
            la venta de inmuebles sin impuesto
          </Link>
          ,{" "}
          <Link href="/impuestos-internos" className="font-medium text-emerald-700 hover:underline">
            los impuestos internos eliminados
          </Link>{" "}
          y{" "}
          <Link href="/propinas" className="font-medium text-emerald-700 hover:underline">
            las propinas fuera del sueldo
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {FUENTES.map((f) => (
            <li key={f.url}>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                {f.titulo}
              </a>
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Los textos citados salen del texto actualizado de InfoLEG y los valores de la UMA, de los
          PDF de la Corte Suprema. Esta página es informativa y orientativa: publica los mínimos
          legales, no una estimación del honorario que va a regular el juez, que depende de las
          pautas del art. 16 y de su apreciación. Consultada el {CONSULTADO_EL}.
        </p>
      </section>
    </article>
  );
}
