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
function datosDelMes() {
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

  const ANIO = new Date().getFullYear();
  return { CASO_ALTO, CASO_BAJO, PCT_ALTO, ANIO };
}

type DatosDelMes = ReturnType<typeof datosDelMes>;

const metadataDelMes = ({ ANIO }: DatosDelMes): Metadata => ({
  title: `Deducción de empleada doméstica en Ganancias ${ANIO}`,
  description: "El tope anual es la ganancia no imponible, pero deducir no es cobrar: te vuelve tu alícuota. Calculá el ahorro real según tu sueldo y qué pagos cuentan.",
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
});

export function generateMetadata(): Metadata {
  return metadataDelMes(datosDelMes());
}

const crearFaqs = ({ CASO_ALTO, PCT_ALTO }: DatosDelMes) => [
  {
    q: "¿Cuánto se puede deducir por empleada doméstica en Ganancias?",
    a: `El tope anual es ${formatARS(TOPE_DEDUCCION_ANUAL, 2)} para el período fiscal en curso (${DEDUCCION_VIGENCIA}). ARCA no lo publica aparte: la Ley 26.063 lo ata a otro número («${DEDUCCION_TEXTOS.tope}»). Así que el tope es siempre igual a la ganancia no imponible del año y se actualiza cuando ella se actualiza. Hasta ese límite, se deduce lo que pagaste de verdad.`,
  },
  {
    q: "¿Deducir es lo mismo que recuperar esa plata?",
    a: `No, y es la confusión más común. La deducción baja la base sobre la que se calcula el impuesto. Lo que te vuelve al bolsillo es el monto deducido multiplicado por tu alícuota. En el caso de ejemplo de esta página (empleada de jornada completa, empleador con sueldo bruto de ${formatARS(3_500_000, 0)}) se deducen ${formatARS(CASO_ALTO.deduccionAplicada, 2)} y el ahorro real de impuesto es ${formatARS(CASO_ALTO.ahorroAnual, 2)} al año: el ${PCT_ALTO}% de lo deducido. La calculadora hace tu impuesto con y sin la deducción, no estima un porcentaje.`,
  },
  {
    q: "Tengo empleada registrada pero no pago Ganancias, ¿me sirve?",
    a: "No te devuelve nada. La deducción solo sirve si pagás el impuesto. Si ya no pagás, restar más deducciones no genera saldo a favor, no es un reintegro y no pasa al año siguiente. En el segundo caso de ejemplo (empleador con sueldo bruto de $1.800.000) el ahorro es exactamente cero, aunque la empleada esté registrada y todo esté pagado.",
  },
  {
    q: "¿Qué conceptos entran exactamente?",
    a: `La ley nombra dos: «${DEDUCCION_TEXTOS.queSeDeduce}». O sea, el sueldo pagado y las contribuciones del empleador en el régimen de casas particulares. ARCA lo dice igual en su ayuda del régimen: «${DEDUCCION_TEXTOS.arca}».`,
  },
  {
    q: "El pago mensual a ARCA incluye la cuota de ART, ¿esa también se deduce?",
    a: `Acá está la letra chica que nadie separa. El inciso b) del artículo 16 manda a las contribuciones del artículo 3º del régimen especial de la Ley 25.239. Ese artículo (en su texto vigente, reemplazado por el Decreto 90/2023) pide pagar dos sumas: una para el SIPA y otra para el sistema de salud. La cuota de ART no está ahí. Es obligatoria, pero sale de otra norma (Ley 26.844 y Decreto 49/2018), y ARCA tampoco la nombra entre lo que se deduce. En el caso de ejemplo son ${formatARS(CASO_ALTO.artAnual, 2)} al año que se pagan pero quedan fuera de la cuenta de esta página.`,
  },
  {
    q: "¿Y si le pago más que el tope?",
    a: `Lo que pasa del tope se pierde: no se deduce, no pasa al año siguiente y no lo puede usar otra persona de la casa por la misma empleada. Pasa antes de lo que parece: con un sueldo de ${formatARS(450_000, 0)} por mes y aguinaldo, lo pagado en el año ya supera el tope en ${formatARS(CASO_ALTO.excedente, 2)}.`,
  },
  {
    q: "¿Cómo se informa?",
    a: "Por el formulario 572 web (SIRADIG), en deducciones y desgravaciones, con los datos de la persona empleada y lo que le pagaste. Si sos autónomo o presentás declaración jurada anual, va directo en la declaración. En los dos casos la empleada tiene que estar registrada y tenés que guardar los comprobantes de los pagos y de los aportes.",
  },
  {
    q: "¿La puede deducir más de una persona por el mismo trabajador?",
    a: "No por el mismo pago. La deduce quien es el empleador y pagó de verdad. Si en una casa hay dos personas que pagan Ganancias, la usa la que figura como empleadora y pagó. Si las dos ponen el mismo gasto, ARCA lo detecta enseguida, porque los aportes están a nombre de una sola CUIT.",
  },
  {
    q: "¿Sirve para el monotributo?",
    a: "No. Es una deducción de Ganancias, y el monotributo reemplaza a ese impuesto: si estás solo en el monotributo, no liquidás Ganancias y no tenés dónde usarla. Si además tenés ingresos en relación de dependencia o estás en el régimen general, la deducción va ahí.",
  },
  {
    q: "¿El tope se prorratea si la empleada trabajó medio año?",
    a: "No. El tope es anual y siempre igual a la ganancia no imponible. Lo que baja es lo que deducís, porque se deduce lo que pagaste de verdad en el año. Por eso en la calculadora elegís los meses trabajados: cambian lo pagado, no el límite.",
  },
];

export default function DeduccionEmpleadaDomesticaPage() {
  const datos = datosDelMes();
  const { CASO_ALTO, CASO_BAJO, PCT_ALTO } = datos;
  const faqs = crearFaqs(datos);
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
          Todas las notas publican el mismo número (el tope) y ahí terminan. Al empleador le quedan
          las dos preguntas que importan: <strong>cuánta plata le vuelve de verdad</strong> (una
          deducción devuelve tu alícuota, no el monto) y{" "}
          <strong>qué parte de lo que le paga a ARCA cuenta</strong>. Esta página calcula las dos,
          con tu impuesto con y sin la deducción.
        </p>
      </header>

      <RespuestaPrimero actualizado={DEDUCCION_FUENTES.consultadoEl}>
        <p>
          El tope anual es <strong>{formatARS(TOPE_DEDUCCION_ANUAL, 2)}</strong> ({DEDUCCION_VIGENCIA}
          ) y no es un número propio: la Ley 26.063 lo fija «{DEDUCCION_TEXTOS.tope}», así que es
          siempre igual a la ganancia no imponible del art. 30 inc. a). Se deduce el sueldo pagado más
          las contribuciones del empleador (no la cuota de ART). El ahorro real es esa deducción
          multiplicada por tu alícuota. En el caso de ejemplo de acá abajo son{" "}
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
          Misma deducción, dos empleadores distintos. Esta diferencia decide si te conviene juntar
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
          El segundo empleador no recupera nada. Con ese sueldo no llega a pagar el impuesto, y una
          deducción sobre un impuesto que no pagás vale cero. No genera saldo a favor ni pasa al año
          siguiente.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La letra chica que separa el pago a ARCA en dos
        </h2>
        <p className="text-zinc-600">
          Cada mes el empleador paga un solo importe que junta tres cosas (obra social, jubilación
          del SIPA y cuota de ART). De ahí sale la idea de que «lo que pagás a ARCA se deduce». La
          ley es más precisa: el inciso b) del art. 16 permite deducir «las contribuciones patronales
          indicadas en el artículo 3º» del régimen especial. Ese artículo (texto vigente, reemplazado
          por el Decreto 90/2023) pide pagar dos sumas: una al SIPA y otra al sistema de salud.{" "}
          <strong>La ART no aparece en ese artículo</strong>. Es obligatoria por la Ley 26.844, pero
          es un seguro, no una contribución de seguridad social. ARCA, en la ayuda del mismo régimen,
          describe lo deducible con la misma frase: «{DEDUCCION_TEXTOS.arca}
          ».
        </p>
        <p className="text-sm text-zinc-500">
          Por eso la calculadora suma sueldos y contribuciones y muestra la ART aparte, en vez de
          sumarla sin avisar. El detalle mensual de las tres cosas, con los importes oficiales de{" "}
          {VIGENCIA_APORTES.mesVigente}, está en{" "}
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
          ». Que sea una deducción general quiere decir que se resta de cualquier ingreso, no solo
          del sueldo. Si estás en relación de dependencia, la informás en el F. 572 web (SIRADIG) y
          tu empleador la descuenta en la retención. Si presentás declaración jurada anual, va ahí.
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
              </a>
              : {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Leímos las leyes del texto actualizado de InfoLEG, no de resúmenes. El art. 3º del régimen
          especial está reemplazado desde 2023, y la versión vieja sigue dando vueltas. El tope sale
          de la ganancia no imponible vigente ({DEDUCCION_VIGENCIA}), no está escrito a mano, así que
          se actualiza junto con la tabla de Ganancias. Esta página es informativa y no reemplaza a
          un profesional. Consultada el {DEDUCCION_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
