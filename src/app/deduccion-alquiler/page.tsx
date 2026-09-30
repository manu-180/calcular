import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraDeduccionAlquiler } from "@/components/CalculadoraDeduccionAlquiler";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ALQUILER_FUENTES,
  ALQUILER_TEXTOS,
  ALQUILER_VIGENCIA,
  PRIMER_EJERCICIO_EXENCION,
  TOPE_DEDUCCION_ALQUILER,
} from "@/data/deduccion-alquiler";
import { alquilerMensualQueAgotaElTope, calcularDeduccionAlquiler } from "@/lib/deduccion-alquiler";
import { formatARS } from "@/lib/formato";

// El alquiler mensual con el que recién se agota el tope: derivado del tope vigente, no escrito.
const ALQUILER_QUE_AGOTA = alquilerMensualQueAgotaElTope();

// Casos testigo, calculados con el mismo motor que usa la calculadora (si el motor cambia, el
// texto cambia con él: acá no hay números a mano).
const BASE_CASO = {
  alquilerMensual: 450_000,
  mesesPagados: 12,
  conyuge: false,
  hijos: 0,
  titularDeInmueble: false,
  computarDiezPorCiento: false,
};

const CASO_ALTO = calcularDeduccionAlquiler({ ...BASE_CASO, brutoMensual: 3_000_000 });
const CASO_BAJO = calcularDeduccionAlquiler({ ...BASE_CASO, brutoMensual: 1_800_000 });
const CASO_2025 = calcularDeduccionAlquiler({
  ...BASE_CASO,
  brutoMensual: 3_000_000,
  computarDiezPorCiento: true,
});

const PCT_ALTO = (CASO_ALTO.alicuotaEfectiva * 100).toLocaleString("es-AR", {
  maximumFractionDigits: 1,
});
const MESES_ALTO = CASO_ALTO.mesesDeAlquilerQueVuelven.toLocaleString("es-AR", {
  maximumFractionDigits: 1,
});
const DIFERENCIA_2026 = CASO_2025.ahorroAnual - CASO_ALTO.ahorroAnual;

export const metadata: Metadata = {
  title: `Deducción de alquiler en Ganancias ${new Date().getFullYear()}: cuánto te vuelve de verdad`,
  description: `El 40% del alquiler se deduce hasta ${formatARS(TOPE_DEDUCCION_ALQUILER, 2)}, un tope que recién muerde con un alquiler de ${formatARS(ALQUILER_QUE_AGOTA, 0)} por mes. Lo que decide cuánto te vuelve es tu alícuota. Y desde el ejercicio ${PRIMER_EJERCICIO_EXENCION} el 10% del inciso k) ya no corre sobre la casa habitación.`,
  alternates: { canonical: "/deduccion-alquiler" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Deducción de alquiler en Ganancias")}&s=${encodeURIComponent(`40% con tope ${formatARS(TOPE_DEDUCCION_ALQUILER, 0)} · qué cambió en ${PRIMER_EJERCICIO_EXENCION}`)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuánto se puede deducir del alquiler en Ganancias?",
    a: `El 40% de las sumas pagadas por el alquiler de tu casa habitación, con tope anual de ${formatARS(TOPE_DEDUCCION_ALQUILER, 2)} para el período en curso (${ALQUILER_VIGENCIA}). El tope no es un valor propio: el art. 85 inc. h) lo fija por remisión al inc. a) del art. 30, o sea la ganancia no imponible, y se actualiza cuando ella se actualiza. Además hay una condición que descarta a mucha gente: sólo puede computarla quien no resulte titular de ningún inmueble, «cualquiera sea la proporción».`,
  },
  {
    q: "¿A partir de qué alquiler me pega el tope?",
    a: `Con un alquiler de ${formatARS(ALQUILER_QUE_AGOTA, 0)} por mes durante los doce meses. Es el número que sale de despejar el tope: como se deduce el 40% y el límite es ${formatARS(TOPE_DEDUCCION_ALQUILER, 2)} al año, hace falta pagar ${formatARS(TOPE_DEDUCCION_ALQUILER / 0.4, 0)} de alquiler anual para llegar. Por eso el tope, que es lo único que publican todas las notas, casi nunca es lo que te limita: lo que decide cuánta plata volvés a ver es tu alícuota.`,
  },
  {
    q: "¿Deducir el alquiler es lo mismo que recuperarlo?",
    a: `No, y es la confusión que más plata cuesta. La deducción baja la base sobre la que se calcula el impuesto: lo que volvés a tener en el bolsillo es lo deducido multiplicado por tu alícuota. En el caso testigo de esta página —alquiler de ${formatARS(450_000, 0)} y sueldo bruto de ${formatARS(3_000_000, 0)}— se deducen ${formatARS(CASO_ALTO.deduccionIncH, 2)} y el ahorro real de impuesto es ${formatARS(CASO_ALTO.ahorroAnual, 2)} al año: el ${PCT_ALTO}% de lo deducido, equivalente a ${MESES_ALTO} meses de alquiler. La calculadora corre tu impuesto con y sin la deducción, no estima un porcentaje.`,
  },
  {
    q: `¿Sigue vigente el 10% adicional para inquilinos y propietarios en ${PRIMER_EJERCICIO_EXENCION}?`,
    a: `Sobre el alquiler de la casa habitación, no. El art. 192 de la Ley 27.802 (B.O. 6/3/2026) sustituyó el inciso n) del art. 26 de la ley del impuesto y dejó exentas, «${ALQUILER_TEXTOS.exencion}». O sea: la propia ley declara que a esos alquileres no se les aplica el 10% del inciso k). La deducción del 40% del inciso h) para el inquilino no fue tocada y sigue igual. La mayoría de las notas todavía publica el esquema anterior porque cita el texto viejo del artículo.`,
  },
  {
    q: "Entonces, ¿para qué declaración me sirve cada cosa?",
    a: `Para la declaración del período fiscal 2025 —la que se presenta durante 2026— corría el régimen anterior: 40% del inciso h) más 10% del inciso k). Para lo que te están reteniendo ahora, ejercicio ${PRIMER_EJERCICIO_EXENCION}, queda el 40%. En el caso testigo la diferencia entre un régimen y otro es de ${formatARS(DIFERENCIA_2026, 2)} al año. En la calculadora podés prender y apagar el 10% para ver las dos.`,
  },
  {
    q: "Tengo un departamento heredado pero alquilo donde vivo, ¿puedo deducir?",
    a: "El inciso h) no lo permite: exige no resultar titular de ningún inmueble, «cualquiera sea la proporción». Una parte indivisa heredada, un terreno en otra provincia o una cochera te dejan afuera aunque no vivas ahí y aunque no generen ingresos. No hay prorrateo: es una condición de todo o nada.",
  },
  {
    q: "Alquilo, pero no pago Ganancias. ¿Me sirve?",
    a: `No te devuelve nada. La deducción sólo tiene efecto si estás alcanzado por el impuesto: si ya no pagás, restar más deducciones no genera saldo a favor, no es un reintegro y no se traslada al año siguiente. En el segundo caso testigo —mismo alquiler, sueldo bruto de ${formatARS(1_800_000, 0)}— el ahorro es exactamente ${formatARS(CASO_BAJO.ahorroAnual, 2)}.`,
  },
  {
    q: "¿Qué papeles necesito?",
    a: `Que el locador emita factura o documento equivalente por el alquiler —ARCA lo pide así: «${ALQUILER_TEXTOS.arcaFactura}»— y conservar los comprobantes de pago. Se informa por el F. 572 web (SIRADIG), en deducciones. Desde la RG 5547/2024 los empleados en relación de dependencia ya no tienen que adjuntar copia del contrato en el SiRADIG.`,
  },
  {
    q: "¿Y si somos dos y firmamos el contrato juntos?",
    a: "Cada uno deduce el 40% de lo que efectivamente pagó, con su propio tope anual, y cada uno tiene que cumplir por su cuenta la condición de no ser titular de ningún inmueble. Lo que no se puede es que los dos computen el mismo pago: el gasto se reparte, no se duplica.",
  },
  {
    q: "¿Sirve si estoy en monotributo?",
    a: "No. Es una deducción del Impuesto a las Ganancias y el monotributo es un régimen sustitutivo: quien está sólo en monotributo no determina Ganancias, así que no tiene dónde computarla. Si además trabajás en relación de dependencia o estás en el régimen general, la deducción va ahí.",
  },
  {
    q: "¿Se puede deducir el alquiler de un local o una oficina?",
    a: "Esta deducción no: el inciso h) habla de inmuebles destinados a casa habitación. El alquiler de un inmueble afectado a una actividad gravada se computa como gasto necesario de esa actividad, que es otro mecanismo, con otras reglas y sin este tope.",
  },
];

export default function DeduccionAlquilerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de la deducción de alquiler en Ganancias",
        url: "https://calcular.ar/deduccion-alquiler",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Deducción de alquiler en Ganancias: el tope, la alícuota y qué cambió en 2026",
        descripcion:
          "Cálculo del ahorro real de impuesto por deducir el alquiler de la casa habitación: el 40% del art. 85 inc. h) con tope en la ganancia no imponible, el alquiler a partir del cual ese tope realmente muerde, y la baja del 10% del inc. k) desde el ejercicio 2026 por la exención del art. 26 inc. n) según la Ley 27.802.",
        url: "/deduccion-alquiler",
        modificado: ALQUILER_FUENTES.consultadoEl,
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
          Deducción de alquiler en Ganancias: el tope recién muerde con{" "}
          {formatARS(ALQUILER_QUE_AGOTA, 0)} por mes
        </h1>
        <p className="text-zinc-600">
          Todas las notas publican el mismo par de números —40% y el tope— y ahí terminan. Pero el
          tope casi nunca es lo que te limita: lo que decide cuánta plata te vuelve es{" "}
          <strong>tu alícuota</strong>. Y hay un cambio de {PRIMER_EJERCICIO_EXENCION} que la mayoría
          todavía no incorporó: <strong>el 10% del inciso k) dejó de correr</strong> sobre el
          alquiler de la casa habitación. Acá está el cálculo de las dos cosas, con el texto vigente
          de la ley a la vista.
        </p>
      </header>

      <RespuestaPrimero actualizado={ALQUILER_FUENTES.consultadoEl}>
        <p>
          Se deduce el <strong>40% del alquiler</strong> de tu casa habitación hasta{" "}
          <strong>{formatARS(TOPE_DEDUCCION_ALQUILER, 2)}</strong> al año ({ALQUILER_VIGENCIA}),
          siempre que <strong>no seas titular de ningún inmueble</strong>. Ese tope se alcanza recién
          con un alquiler de {formatARS(ALQUILER_QUE_AGOTA, 0)} por mes, así que en la práctica lo
          que manda es tu alícuota: en el caso testigo de acá abajo, deducir{" "}
          {formatARS(CASO_ALTO.deduccionIncH, 2)} devuelve{" "}
          <strong>{formatARS(CASO_ALTO.ahorroAnual, 2)}</strong> —el {PCT_ALTO}%, o {MESES_ALTO}{" "}
          meses de alquiler—. Desde el ejercicio {PRIMER_EJERCICIO_EXENCION} el 10% adicional del
          inciso k) no se aplica sobre estos alquileres.
        </p>
      </RespuestaPrimero>

      <CalculadoraDeduccionAlquiler />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Lo que cambió en {PRIMER_EJERCICIO_EXENCION}, con la ley en la mano
        </h2>
        <p className="text-zinc-600">
          El artículo 85 de la ley del impuesto tiene dos incisos que hablan de alquileres. El{" "}
          <strong>inciso h)</strong> es el del inquilino: «{ALQUILER_TEXTOS.incH}». El{" "}
          <strong>inciso k)</strong>, incorporado por la Ley 27.737 en 2023, agregó un beneficio para
          las dos puntas: «{ALQUILER_TEXTOS.incK}».
        </p>
        <p className="text-zinc-600">
          El 6 de marzo de 2026 el artículo 192 de la Ley 27.802 sustituyó el inciso n) del artículo
          26 —el de las exenciones— y dejó exentas, «{ALQUILER_TEXTOS.exencion}». Leído despacio, ese
          texto hace dos cosas a la vez: exime la renta del locador y{" "}
          <strong>declara expresamente que a esos alquileres no se les aplica el inciso k)</strong>.
          El 40% del inciso h) no fue tocado y sigue vigente igual que antes.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Ejercicio fiscal</th>
                  <th className="px-4 py-2.5 font-semibold">40% inc. h)</th>
                  <th className="px-4 py-2.5 font-semibold">10% inc. k)</th>
                  <th className="px-4 py-2.5 font-semibold">Ahorro en el caso testigo</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 font-medium text-zinc-800">
                    Hasta 2025 (la DDJJ que se presenta este año)
                  </td>
                  <td className="px-4 py-2.5 text-zinc-900">Sí</td>
                  <td className="px-4 py-2.5 text-zinc-900">Sí, las dos partes</td>
                  <td className="px-4 py-2.5 font-semibold text-zinc-900">
                    {formatARS(CASO_2025.ahorroAnual, 2)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 font-medium text-zinc-800">
                    Desde {PRIMER_EJERCICIO_EXENCION} (lo que te retienen hoy)
                  </td>
                  <td className="px-4 py-2.5 text-zinc-900">Sí, sin cambios</td>
                  <td className="px-4 py-2.5 text-zinc-900">
                    No sobre la casa habitación (art. 26 inc. n)
                  </td>
                  <td className="px-4 py-2.5 font-semibold text-emerald-700">
                    {formatARS(CASO_ALTO.ahorroAnual, 2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Caso testigo: alquiler de {formatARS(450_000, 0)} por mes durante todo el año, inquilino
          con sueldo bruto de {formatARS(3_000_000, 0)}, sin cónyuge ni hijos a cargo. La diferencia
          entre los dos regímenes son {formatARS(DIFERENCIA_2026, 2)} al año. Los dos importes salen
          del mismo motor que corre la calculadora de arriba.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Por qué el tope casi nunca es el problema</h2>
        <p className="text-zinc-600">
          El tope se publica en todos lados como si fuera el límite práctico del beneficio, y no lo
          es. Como se computa el 40% de lo pagado y el techo anual es{" "}
          {formatARS(TOPE_DEDUCCION_ALQUILER, 2)}, para agotarlo hay que pagar{" "}
          {formatARS(TOPE_DEDUCCION_ALQUILER / 0.4, 0)} de alquiler en el año, o sea{" "}
          <strong>{formatARS(ALQUILER_QUE_AGOTA, 0)} por mes</strong>. Debajo de eso, el inquilino
          deduce todo el 40% y lo único que mueve la aguja es en qué tramo de la escala cae su
          sueldo. Dos personas con el mismo alquiler pueden recibir montos muy distintos —o nada—
          según cuánto ganen.
        </p>
        <p className="text-sm text-zinc-500">
          El otro filtro real no es un número: es la condición de no ser titular de ningún inmueble
          «cualquiera sea la proporción». Deja afuera a quien heredó una parte de una casa aunque
          alquile donde vive.
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
        <h2 className="text-base font-semibold text-zinc-900">Las otras piezas del mismo tema</h2>
        <p>
          Cuánto te retienen mes a mes está en{" "}
          <Link href="/ganancias" className="font-medium text-emerald-700 hover:underline">
            la calculadora de Ganancias
          </Link>
          , el ajuste de tu alquiler por índice en{" "}
          <Link href="/inflacion/alquiler" className="font-medium text-emerald-700 hover:underline">
            la de aumento de alquiler
          </Link>{" "}
          y la otra deducción que se calcula igual —el mismo tope, la misma trampa de la alícuota— en{" "}
          <Link
            href="/deduccion-empleada-domestica"
            className="font-medium text-emerald-700 hover:underline"
          >
            la de empleada doméstica
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {ALQUILER_FUENTES.lista.map((f) => (
            <li key={f.nombre}>
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
          Los artículos se leyeron del texto ACTUALIZADO de InfoLEG, no de resúmenes: el inciso n)
          del art. 26 está sustituido desde marzo de 2026 y la versión anterior sigue circulando en
          notas y guías. El tope se deriva de la ganancia no imponible vigente ({ALQUILER_VIGENCIA})
          en vez de escribirse a mano, así que se actualiza junto con la tabla de Ganancias. Esta
          página es informativa y no reemplaza a un profesional. Consultada el{" "}
          {ALQUILER_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
