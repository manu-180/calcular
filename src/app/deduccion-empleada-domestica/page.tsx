import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraDeduccionDomestica } from "@/components/CalculadoraDeduccionDomestica";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  DEDUCCION_FUENTES,
  DEDUCCION_TEXTOS,
  DEDUCCION_VIGENCIA,
  TOPE_DEDUCCION_ANUAL,
} from "@/data/deduccion-domestica";
import { VIGENCIA_APORTES } from "@/data/aportes-casas-particulares";
import { calcularDeduccionDomestica } from "@/lib/deduccion-domestica";
import { formatARS } from "@/lib/formato";
import { PlanillaCTA } from "@/components/PlanillaCTA";

// Dos casos testigo, calculados con el mismo motor que usa la calculadora (si el motor cambia,
// el texto cambia con él: acá no hay números escritos a mano).
const CASO_ALTO = calcularDeduccionDomestica({
  sueldoMensual: 450_000,
  mesesTrabajados: 12,
  incluirAguinaldo: true,
  horasSemanales: 16,
  condicion: "activo-mayor-18",
  brutoMensualEmpleador: 3_500_000,
  conyuge: false,
  hijos: 0,
});

const CASO_BAJO = calcularDeduccionDomestica({
  sueldoMensual: 150_000,
  mesesTrabajados: 12,
  incluirAguinaldo: true,
  horasSemanales: 8,
  condicion: "activo-mayor-18",
  brutoMensualEmpleador: 1_800_000,
  conyuge: false,
  hijos: 0,
});

const PCT_ALTO = (CASO_ALTO.alicuotaEfectiva * 100).toLocaleString("es-AR", {
  maximumFractionDigits: 1,
});

export const metadata: Metadata = {
  title: `Deducción de empleada doméstica en Ganancias ${new Date().getFullYear()}: cuánto te vuelve de verdad`,
  description: `El tope anual es ${formatARS(TOPE_DEDUCCION_ANUAL, 2)} —la ganancia no imponible—, pero deducir no es cobrar: te devuelve tu alícuota. Calculá el ahorro real según tu sueldo, con el desglose de qué parte del pago a ARCA entra en la cuenta y cuál no.`,
  alternates: { canonical: "/deduccion-empleada-domestica" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Deducción de empleada doméstica")}&s=${encodeURIComponent(`Ganancias · tope ${formatARS(TOPE_DEDUCCION_ANUAL, 0)}`)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuánto se puede deducir por empleada doméstica en Ganancias?",
    a: `El tope anual es ${formatARS(TOPE_DEDUCCION_ANUAL, 2)} para el período fiscal en curso (${DEDUCCION_VIGENCIA}). No es un número que ARCA publique por separado: la Ley 26.063 lo define por remisión —«${DEDUCCION_TEXTOS.tope}»—, así que el tope es siempre igual a la ganancia no imponible del año y se actualiza cuando ella se actualiza. Dentro de ese límite se computa lo efectivamente pagado.`,
  },
  {
    q: "¿Deducir es lo mismo que recuperar esa plata?",
    a: `No, y es la confusión más común. La deducción baja la base sobre la que se calcula el impuesto, así que lo que volvés a tener en el bolsillo es el monto deducido multiplicado por tu alícuota. En el caso testigo de esta página —empleada de jornada completa, empleador con sueldo bruto de ${formatARS(3_500_000, 0)}— la deducción computable es ${formatARS(CASO_ALTO.deduccionAplicada, 2)} y el ahorro real de impuesto es ${formatARS(CASO_ALTO.ahorroAnual, 2)} al año: el ${PCT_ALTO}% de lo deducido. La calculadora corre tu impuesto con y sin la deducción, no estima un porcentaje.`,
  },
  {
    q: "Tengo empleada registrada pero no pago Ganancias, ¿me sirve?",
    a: "No te devuelve nada. La deducción sólo tiene efecto si estás alcanzado por el impuesto: si ya no pagás, restar más deducciones no genera saldo a favor, no es un reintegro y no se traslada al año siguiente. En el segundo caso testigo (empleador con sueldo bruto de $1.800.000) el ahorro es exactamente cero, aunque la relación esté registrada y todo pagado en regla.",
  },
  {
    q: "¿Qué conceptos entran exactamente?",
    a: `La ley enumera dos: «${DEDUCCION_TEXTOS.queSeDeduce}». O sea el sueldo pagado y las contribuciones patronales del régimen de casas particulares. ARCA lo dice igual en su ayuda del régimen: «${DEDUCCION_TEXTOS.arca}».`,
  },
  {
    q: "El pago mensual a ARCA incluye la cuota de ART, ¿esa también se deduce?",
    a: `Acá está la letra chica que nadie separa. El inciso b) del artículo 16 remite a las contribuciones del artículo 3º del régimen especial de la Ley 25.239, y ese artículo —en su texto vigente, sustituido por el Decreto 90/2023— manda ingresar dos sumas: una con destino al SIPA y otra al sistema de salud. La cuota de ART no está ahí: es obligatoria, pero nace de otra norma (Ley 26.844 y Decreto 49/2018) y ARCA tampoco la menciona entre los conceptos deducibles. En el caso testigo son ${formatARS(CASO_ALTO.artAnual, 2)} al año que se pagan pero quedan fuera del cómputo de esta página.`,
  },
  {
    q: "¿Y si le pago más que el tope?",
    a: `El excedente se pierde: no se deduce, no se traslada y no lo puede tomar otro integrante del hogar por el mismo trabajador. Pasa antes de lo que parece: con un sueldo de ${formatARS(450_000, 0)} por mes y aguinaldo, lo pagado en el año ya supera el tope en ${formatARS(CASO_ALTO.excedente, 2)}.`,
  },
  {
    q: "¿Cómo se informa?",
    a: "Por el formulario 572 web (SIRADIG), en el ítem de deducciones y desgravaciones, con los datos de la persona empleada y los importes pagados. Si sos autónomo o presentás declaración jurada anual, va directamente en la declaración. En los dos casos hay que tener la relación laboral registrada y conservar los comprobantes de los pagos y de los aportes ingresados.",
  },
  {
    q: "¿La puede deducir más de una persona por el mismo trabajador?",
    a: "No por el mismo pago. La deducción la computa quien reviste el carácter de dador de trabajo y efectivamente abonó los importes. Si en un hogar hay dos contribuyentes, la toma quien figura como empleador y pagó; duplicar el mismo gasto en dos declaraciones es una diferencia que ARCA cruza sin esfuerzo, porque el pago de aportes está a nombre de una sola CUIT.",
  },
  {
    q: "¿Sirve para el monotributo?",
    a: "No. Es una deducción del Impuesto a las Ganancias, y el monotributo es un régimen sustitutivo: quien está sólo en monotributo no determina Ganancias, así que no tiene dónde computarla. Si además tenés ingresos en relación de dependencia o estás en el régimen general, la deducción va ahí.",
  },
  {
    q: "¿El tope se prorratea si la empleada trabajó medio año?",
    a: "El tope no se prorratea: es anual y siempre igual a la ganancia no imponible. Lo que baja es el importe computable, porque se deduce lo efectivamente pagado en el período fiscal. Por eso en la calculadora se eligen los meses trabajados: cambian lo pagado, no el límite.",
  },
];

export default function DeduccionEmpleadaDomesticaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de la deducción de casas particulares en Ganancias",
        url: "https://calcular.ar/deduccion-empleada-domestica",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Deducción de empleada doméstica en Ganancias: el tope, y cuánto te vuelve de verdad",
        descripcion:
          "Cálculo del ahorro real de impuesto por la deducción del personal de casas particulares: tope anual igual a la ganancia no imponible, importe computable con sueldos, aguinaldo y contribuciones, y el efecto en el impuesto del empleador corriendo la liquidación con y sin la deducción.",
        url: "/deduccion-empleada-domestica",
        modificado: DEDUCCION_FUENTES.consultadoEl,
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
          Deducción de empleada doméstica en Ganancias: el tope es{" "}
          {formatARS(TOPE_DEDUCCION_ANUAL, 2)}, pero lo que te vuelve es otra cosa
        </h1>
        <p className="text-zinc-600">
          Todas las notas publican el mismo número —el tope— y ahí terminan. El empleador se queda
          con las dos preguntas que importan: <strong>cuánta plata le vuelve de verdad</strong> (una
          deducción devuelve tu alícuota, no el monto) y{" "}
          <strong>qué parte de lo que le paga a ARCA entra en la cuenta</strong>. Esta página calcula
          las dos, corriendo tu impuesto con y sin la deducción.
        </p>
      </header>

      <RespuestaPrimero actualizado={DEDUCCION_FUENTES.consultadoEl}>
        <p>
          El tope anual es <strong>{formatARS(TOPE_DEDUCCION_ANUAL, 2)}</strong> ({DEDUCCION_VIGENCIA}
          ) y no es un valor propio: la Ley 26.063 lo fija «{DEDUCCION_TEXTOS.tope}», así que es
          siempre igual a la ganancia no imponible del art. 30 inc. a). Se deduce el sueldo pagado más
          las contribuciones patronales ingresadas —no la cuota de ART—, y el ahorro real es esa
          deducción multiplicada por tu alícuota: en el caso testigo de acá abajo,{" "}
          <strong>{formatARS(CASO_ALTO.ahorroAnual, 2)}</strong> al año sobre{" "}
          {formatARS(CASO_ALTO.deduccionAplicada, 2)} deducidos, o sea el {PCT_ALTO}%.
        </p>
      </RespuestaPrimero>

      <CalculadoraDeduccionDomestica />

      <PlanillaCTA producto="planilla-casas-particulares" desde="deduccion-empleada-domestica" />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Deducir no es cobrar: los dos casos que lo muestran
        </h2>
        <p className="text-zinc-600">
          Misma deducción, dos empleadores distintos. Es la diferencia que decide si conviene juntar
          los comprobantes o no.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Caso</th>
                  <th className="px-4 py-2.5 font-semibold">Pagado en el año</th>
                  <th className="px-4 py-2.5 font-semibold">Deducción computable</th>
                  <th className="px-4 py-2.5 font-semibold">Ahorro real</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 font-medium text-zinc-800">
                    Jornada completa (16 h), empleador con bruto de {formatARS(3_500_000, 0)}
                  </td>
                  <td className="px-4 py-2.5 text-zinc-900">{formatARS(CASO_ALTO.computable, 2)}</td>
                  <td className="px-4 py-2.5 text-zinc-900">
                    {formatARS(CASO_ALTO.deduccionAplicada, 2)}
                  </td>
                  <td className="px-4 py-2.5 font-semibold text-emerald-700">
                    {formatARS(CASO_ALTO.ahorroAnual, 2)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 font-medium text-zinc-800">
                    8 h semanales, empleador con bruto de {formatARS(1_800_000, 0)}
                  </td>
                  <td className="px-4 py-2.5 text-zinc-900">{formatARS(CASO_BAJO.computable, 2)}</td>
                  <td className="px-4 py-2.5 text-zinc-900">
                    {formatARS(CASO_BAJO.deduccionAplicada, 2)}
                  </td>
                  <td className="px-4 py-2.5 font-semibold text-zinc-900">
                    {formatARS(CASO_BAJO.ahorroAnual, 2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          El segundo empleador no recupera nada: con ese sueldo no llega a pagar el impuesto, y una
          deducción sobre un impuesto que no se paga vale cero. No genera saldo a favor ni se
          traslada al año siguiente.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La letra chica que separa el pago a ARCA en dos
        </h2>
        <p className="text-zinc-600">
          Cada mes el empleador ingresa un solo importe que junta tres conceptos —obra social,
          jubilación (SIPA) y cuota de ART—, y de ahí sale la idea de que «lo que pagás a ARCA se
          deduce». La ley es más precisa: el inciso b) del art. 16 permite deducir «las
          contribuciones patronales indicadas en el artículo 3º» del régimen especial, y ese artículo
          —texto vigente, sustituido por el Decreto 90/2023— manda ingresar dos sumas: una al SIPA y
          otra al sistema de salud. <strong>La ART no aparece en ese artículo</strong>: es obligatoria
          por la Ley 26.844, pero es un seguro, no una contribución de seguridad social. ARCA, en la
          ayuda del propio régimen, describe lo deducible con la misma frase: «{DEDUCCION_TEXTOS.arca}
          ».
        </p>
        <p className="text-sm text-zinc-500">
          Por eso la calculadora suma sueldos y contribuciones, y muestra la ART aparte en vez de
          sumarla en silencio. El desglose mensual de los tres conceptos, con los importes oficiales
          de {VIGENCIA_APORTES.mesVigente}, está en{" "}
          <Link
            href="/aportes-empleada-domestica"
            className="font-medium text-emerald-700 hover:underline"
          >
            la calculadora de aportes
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Quién la puede computar</h2>
        <p className="text-zinc-600">
          La ley alcanza a «{DEDUCCION_TEXTOS.quienPuede}», y aclara que tiene «{DEDUCCION_TEXTOS.caracter}
          ». Deducción general significa que se resta de la ganancia de cualquier fuente, no sólo del
          sueldo. En relación de dependencia se informa por el F. 572 web (SIRADIG) y la computa el
          empleador en la retención; quien presenta declaración jurada anual la incluye ahí.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-zinc-800">{f.q}</summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-2 rounded-xl bg-emerald-50/60 p-5 text-sm text-zinc-700">
        <h2 className="text-base font-semibold text-zinc-900">Las tres piezas del mismo tema</h2>
        <p>
          El sueldo sale de{" "}
          <Link href="/empleada-domestica" className="font-medium text-emerald-700 hover:underline">
            la escala oficial de casas particulares
          </Link>
          , lo que se ingresa a ARCA por mes está en{" "}
          <Link
            href="/aportes-empleada-domestica"
            className="font-medium text-emerald-700 hover:underline"
          >
            la calculadora de aportes
          </Link>{" "}
          y tu impuesto, mes a mes con el método acumulado, en{" "}
          <Link href="/ganancias" className="font-medium text-emerald-700 hover:underline">
            la calculadora de Ganancias
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {DEDUCCION_FUENTES.lista.map((f) => (
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
          Los textos legales se leyeron del texto ACTUALIZADO de InfoLEG, no de resúmenes: el art. 3º
          del régimen especial está sustituido desde 2023 y la versión vieja sigue circulando. El tope
          se deriva de la ganancia no imponible vigente ({DEDUCCION_VIGENCIA}) en vez de escribirse a
          mano, así que se actualiza junto con la tabla de Ganancias. Esta página es informativa y no
          reemplaza a un profesional. Consultada el {DEDUCCION_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
