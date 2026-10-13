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
function datosDelMes() {
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

  const ANIO = new Date().getFullYear();
  return { ALQUILER_QUE_AGOTA, BASE_CASO, CASO_ALTO, CASO_BAJO, CASO_2025, PCT_ALTO, MESES_ALTO, DIFERENCIA_2026, ANIO };
}

type DatosDelMes = ReturnType<typeof datosDelMes>;

const metadataDelMes = ({ ANIO }: DatosDelMes): Metadata => ({
  title: `Deducción de alquiler en Ganancias ${ANIO}: cuánto vuelve`,
  description: `Se deduce el 40% del alquiler con un tope anual y lo que vuelve depende de tu alícuota. Calculá el ahorro real y el cambio del inciso k) en ${PRIMER_EJERCICIO_EXENCION}.`,
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
});

export function generateMetadata(): Metadata {
  return metadataDelMes(datosDelMes());
}

const crearFaqs = ({ ALQUILER_QUE_AGOTA, CASO_ALTO, CASO_BAJO, PCT_ALTO, MESES_ALTO, DIFERENCIA_2026 }: DatosDelMes) => [
  {
    q: "¿Cuánto se puede deducir del alquiler en Ganancias?",
    a: `El 40% de lo que pagás de alquiler por la casa donde vivís, con un tope anual de ${formatARS(TOPE_DEDUCCION_ALQUILER, 2)} para el período en curso (${ALQUILER_VIGENCIA}). El tope no es un número propio: el art. 85 inc. h) lo ata al inc. a) del art. 30, o sea a la ganancia no imponible, y se actualiza cuando ella se actualiza. Hay además una condición que deja afuera a mucha gente: solo la puede usar quien no sea dueño de ningún inmueble, «cualquiera sea la proporción».`,
  },
  {
    q: "¿A partir de qué alquiler me pega el tope?",
    a: `Con un alquiler de ${formatARS(ALQUILER_QUE_AGOTA, 0)} por mes durante los doce meses. La cuenta es simple: se deduce el 40% y el límite es ${formatARS(TOPE_DEDUCCION_ALQUILER, 2)} al año, así que para llegar tenés que pagar ${formatARS(TOPE_DEDUCCION_ALQUILER / 0.4, 0)} de alquiler en el año. Por eso el tope (lo único que publican todas las notas) casi nunca es lo que te limita. Lo que decide cuánta plata volvés a ver es tu alícuota.`,
  },
  {
    q: "¿Deducir el alquiler es lo mismo que recuperarlo?",
    a: `No, y es la confusión que más plata cuesta. La deducción baja la base sobre la que se calcula el impuesto. Lo que te vuelve al bolsillo es lo deducido multiplicado por tu alícuota. En el caso de ejemplo de esta página (alquiler de ${formatARS(450_000, 0)} y sueldo bruto de ${formatARS(3_000_000, 0)}) se deducen ${formatARS(CASO_ALTO.deduccionIncH, 2)} y el ahorro real de impuesto es ${formatARS(CASO_ALTO.ahorroAnual, 2)} al año. Es el ${PCT_ALTO}% de lo deducido, o ${MESES_ALTO} meses de alquiler. La calculadora hace tu impuesto con y sin la deducción, no estima un porcentaje.`,
  },
  {
    q: `¿Sigue vigente el 10% adicional para inquilinos y propietarios en ${PRIMER_EJERCICIO_EXENCION}?`,
    a: `Sobre el alquiler de la casa donde vivís, no. El art. 192 de la Ley 27.802 (B.O. 6/3/2026) reemplazó el inciso n) del art. 26 de la ley del impuesto y dejó exentas, «${ALQUILER_TEXTOS.exencion}». O sea: la misma ley dice que a esos alquileres no se les aplica el 10% del inciso k). El 40% del inciso h) para el inquilino no se tocó y sigue igual. La mayoría de las notas todavía publica el esquema anterior porque cita el texto viejo del artículo.`,
  },
  {
    q: "Entonces, ¿para qué declaración me sirve cada cosa?",
    a: `Para la declaración del período fiscal 2025 (la que se presenta durante 2026) corría el régimen anterior: 40% del inciso h) más 10% del inciso k). Para lo que te retienen ahora, ejercicio ${PRIMER_EJERCICIO_EXENCION}, queda el 40%. En el caso de ejemplo, la diferencia entre un régimen y otro es de ${formatARS(DIFERENCIA_2026, 2)} al año. En la calculadora podés prender y apagar el 10% para ver los dos.`,
  },
  {
    q: "Tengo un departamento heredado pero alquilo donde vivo, ¿puedo deducir?",
    a: "El inciso h) no lo permite: pide no ser dueño de ningún inmueble, «cualquiera sea la proporción». Una parte heredada de una casa, un terreno en otra provincia o una cochera te dejan afuera, aunque no vivas ahí y aunque no te den ingresos. No hay término medio: es todo o nada.",
  },
  {
    q: "Alquilo, pero no pago Ganancias. ¿Me sirve?",
    a: `No te devuelve nada. La deducción solo sirve si pagás el impuesto. Si ya no pagás, restar más deducciones no genera saldo a favor, no es un reintegro y no pasa al año siguiente. En el segundo caso de ejemplo (mismo alquiler, sueldo bruto de ${formatARS(1_800_000, 0)}) el ahorro es exactamente ${formatARS(CASO_BAJO.ahorroAnual, 2)}.`,
  },
  {
    q: "¿Qué papeles necesito?",
    a: `Que el dueño te haga factura o un documento equivalente por el alquiler (ARCA lo pide así: «${ALQUILER_TEXTOS.arcaFactura}») y que guardes los comprobantes de pago. Se informa en el F. 572 web (SIRADIG), en deducciones. Desde la RG 5547/2024, si sos empleado en relación de dependencia ya no tenés que adjuntar el contrato en el SiRADIG.`,
  },
  {
    q: "¿Y si somos dos y firmamos el contrato juntos?",
    a: "Cada uno deduce el 40% de lo que pagó de verdad, con su propio tope anual. Y cada uno tiene que cumplir por su cuenta la condición de no ser dueño de ningún inmueble. Lo que no se puede es que los dos usen el mismo pago: el gasto se reparte, no se duplica.",
  },
  {
    q: "¿Sirve si estoy en monotributo?",
    a: "No. Es una deducción de Ganancias, y el monotributo reemplaza a ese impuesto: si estás solo en el monotributo, no liquidás Ganancias y no tenés dónde usarla. Si además trabajás en relación de dependencia o estás en el régimen general, la deducción va ahí.",
  },
  {
    q: "¿Se puede deducir el alquiler de un local o una oficina?",
    a: "Con esta deducción, no: el inciso h) habla de la casa donde vivís. El alquiler de un lugar que usás para trabajar se descuenta como gasto de esa actividad. Es otro mecanismo, con otras reglas y sin este tope.",
  },
];

export default function DeduccionAlquilerPage() {
  const datos = datosDelMes();
  const { ALQUILER_QUE_AGOTA, CASO_ALTO, CASO_2025, PCT_ALTO, MESES_ALTO, DIFERENCIA_2026 } = datos;
  const faqs = crearFaqs(datos);
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
          Todas las notas publican los mismos dos números (40% y el tope) y ahí terminan. Pero el
          tope casi nunca es lo que te limita: lo que decide cuánta plata te vuelve es{" "}
          <strong>tu alícuota</strong>. Y hay un cambio de {PRIMER_EJERCICIO_EXENCION} que casi nadie
          tomó todavía: <strong>el 10% del inciso k) dejó de correr</strong> sobre el alquiler de la
          casa donde vivís. Acá tenés la cuenta de las dos cosas, con el texto vigente de la ley a la
          vista.
        </p>
      </header>

      <RespuestaPrimero actualizado={ALQUILER_FUENTES.consultadoEl}>
        <p>
          Se deduce el <strong>40% del alquiler</strong> de tu casa habitación hasta{" "}
          <strong>{formatARS(TOPE_DEDUCCION_ALQUILER, 2)}</strong> al año ({ALQUILER_VIGENCIA}),
          siempre que <strong>no seas dueño de ningún inmueble</strong>. Al tope se llega recién con
          un alquiler de {formatARS(ALQUILER_QUE_AGOTA, 0)} por mes, así que en la práctica manda tu
          alícuota. En el caso de ejemplo de acá abajo, deducir{" "}
          {formatARS(CASO_ALTO.deduccionIncH, 2)} te devuelve{" "}
          <strong>{formatARS(CASO_ALTO.ahorroAnual, 2)}</strong> (el {PCT_ALTO}%, o {MESES_ALTO}{" "}
          meses de alquiler). Desde el ejercicio {PRIMER_EJERCICIO_EXENCION} el 10% extra del
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
          <strong>inciso k)</strong>, que sumó la Ley 27.737 en 2023, agregó un beneficio para las dos
          partes: «{ALQUILER_TEXTOS.incK}».
        </p>
        <p className="text-zinc-600">
          El 6 de marzo de 2026 el artículo 192 de la Ley 27.802 reemplazó el inciso n) del artículo
          26 (el de las exenciones) y dejó exentas, «{ALQUILER_TEXTOS.exencion}». Leído despacio, ese
          texto hace dos cosas a la vez: deja exento lo que cobra el dueño y{" "}
          <strong>dice con todas las letras que a esos alquileres no se les aplica el inciso k)</strong>.
          El 40% del inciso h) no se tocó y sigue igual que antes.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Ejercicio fiscal</th>
                  <th className="px-4 py-2.5 font-semibold">40% inc. h)</th>
                  <th className="px-4 py-2.5 font-semibold">10% inc. k)</th>
                  <th className="px-4 py-2.5 font-semibold">Ahorro en el caso de ejemplo</th>
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
                    No sobre la casa donde vivís (art. 26 inc. n)
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
          Caso de ejemplo: alquiler de {formatARS(450_000, 0)} por mes todo el año, inquilino con
          sueldo bruto de {formatARS(3_000_000, 0)}, sin cónyuge ni hijos a cargo. La diferencia
          entre los dos regímenes es de {formatARS(DIFERENCIA_2026, 2)} al año. Los dos importes
          salen de la misma cuenta que hace la calculadora de arriba.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Por qué el tope casi nunca es el problema</h2>
        <p className="text-zinc-600">
          El tope se publica en todos lados como si fuera el límite real del beneficio, y no lo es.
          Como se deduce el 40% de lo pagado y el techo anual es{" "}
          {formatARS(TOPE_DEDUCCION_ALQUILER, 2)}, para agotarlo hay que pagar{" "}
          {formatARS(TOPE_DEDUCCION_ALQUILER / 0.4, 0)} de alquiler en el año, o sea{" "}
          <strong>{formatARS(ALQUILER_QUE_AGOTA, 0)} por mes</strong>. Por debajo de eso, el
          inquilino deduce todo el 40% y lo único que cambia el resultado es en qué tramo de la
          escala cae su sueldo. Dos personas con el mismo alquiler pueden recibir montos muy
          distintos (o nada) según cuánto ganen.
        </p>
        <p className="text-sm text-zinc-500">
          El otro filtro real no es un número: es la condición de no ser dueño de ningún inmueble
          «cualquiera sea la proporción». Deja afuera a quien heredó una parte de una casa, aunque
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
          y la otra deducción que se calcula igual (mismo tope, misma trampa de la alícuota) en{" "}
          <Link
            href="/deduccion-empleada-domestica"
            className="font-medium text-emerald-700 hover:underline"
          >
            la de empleada doméstica
          </Link>
          . Prepaga, médicos y seguros tienen sus propios topes en{" "}
          <Link
            href="/deducciones-generales-ganancias"
            className="font-medium text-emerald-700 hover:underline"
          >
            las deducciones generales de Ganancias
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
              </a>
              : {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Leímos los artículos del texto actualizado de InfoLEG, no de resúmenes. El inciso n) del
          art. 26 está reemplazado desde marzo de 2026, y la versión anterior sigue dando vueltas en
          notas y guías. El tope sale de la ganancia no imponible vigente ({ALQUILER_VIGENCIA}), no
          está escrito a mano, así que se actualiza junto con la tabla de Ganancias. Esta página es
          informativa y no reemplaza a un profesional. Consultada el{" "}
          {ALQUILER_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
