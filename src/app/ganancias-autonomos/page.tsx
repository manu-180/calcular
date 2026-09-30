import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraGananciasAutonomos } from "@/components/CalculadoraGananciasAutonomos";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { DEDUCCIONES, GANANCIAS_VIGENCIA } from "@/data/ganancias";
import { ANIO_AUTONOMOS, AUTONOMOS_FUENTES, AUTONOMOS_TEXTOS } from "@/data/ganancias-autonomos";
import { calcularGananciasAutonomos, umbralAutonomos } from "@/lib/ganancias-autonomos";
import { formatARS } from "@/lib/formato";

const CASO_ENTRADA = { gananciaNetaAnual: 36_000_000, aporteMensual: 150_000 };
const COMUN = calcularGananciasAutonomos({ ...CASO_ENTRADA, mesesDeAntiguedad: 60 });
const NUEVO = calcularGananciasAutonomos({ ...CASO_ENTRADA, mesesDeAntiguedad: 12 });
const UMBRAL_COMUN = umbralAutonomos({ aporteMensual: 150_000, mesesDeAntiguedad: 60 });
const UMBRAL_NUEVO = umbralAutonomos({ aporteMensual: 150_000, mesesDeAntiguedad: 12 });
const DIFERENCIA_ESPECIAL = DEDUCCIONES.deduccionEspecialNuevosProfesionales - DEDUCCIONES.deduccionEspecialAutonomos;

const ESPECIAL = formatARS(DEDUCCIONES.deduccionEspecialAutonomos, 2);
const ESPECIAL_NUEVOS = formatARS(DEDUCCIONES.deduccionEspecialNuevosProfesionales, 2);

export const metadata: Metadata = {
  title: `Ganancias para autónomos ${ANIO_AUTONOMOS}: deducción especial y «nuevos profesionales» (calculadora)`,
  description: `Un autónomo que trabaja personalmente deduce ${ESPECIAL} de deducción especial en ${ANIO_AUTONOMOS}, y ${ESPECIAL_NUEVOS} si tiene menos de tres años de matrícula. Sin los aportes al día la pierde entera. Calculá cuánto pagás de Ganancias.`,
  alternates: { canonical: "/ganancias-autonomos" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Ganancias para autónomos")}&s=${encodeURIComponent(`Deducción especial ${ANIO_AUTONOMOS}: ${formatARS(DEDUCCIONES.deduccionEspecialAutonomos, 0)}`)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: `¿Cuánto es la deducción especial de los autónomos en ${ANIO_AUTONOMOS}?`,
    a: `${ESPECIAL} en el año para quien trabaja personalmente en su actividad (profesionales, oficios, dueños de empresas unipersonales). La ley la define como el no imponible «incrementado» en 2,5 veces: «${AUTONOMOS_TEXTOS.apartado1}» Incrementar en 2,5 veces es sumarle 2,5 veces más, así que da 3,5 veces el no imponible (${formatARS(DEDUCCIONES.mni, 2)}). Es el número que publica ARCA.`,
  },
  {
    q: "¿Qué es la deducción de «nuevos profesionales» y «nuevos emprendedores»?",
    a: `Una deducción especial más alta: ${ESPECIAL_NUEVOS} en ${ANIO_AUTONOMOS}, ${formatARS(DIFERENCIA_ESPECIAL, 0)} más que la común. La ley dice que «${AUTONOMOS_TEXTOS.nuevos}», y el reglamento (Decreto 862/2019, art. 99) define a quiénes alcanza: «${AUTONOMOS_TEXTOS.reglamento99}».`,
  },
  {
    q: "¿Cuánto me ahorra ser nuevo profesional?",
    a: `Depende de tu alícuota: la diferencia de deducción es de ${formatARS(DIFERENCIA_ESPECIAL, 0)} y vuelve multiplicada por tu tramo de la escala, así que nunca pasa del 35% de eso. En el caso de esta página —ganancia neta de ${formatARS(CASO_ENTRADA.gananciaNetaAnual, 0)} y ${formatARS(CASO_ENTRADA.aporteMensual, 0)} de aportes por mes— el impuesto baja de ${formatARS(COMUN.impuestoAnual, 0)} a ${formatARS(NUEVO.impuestoAnual, 0)}: ${formatARS(NUEVO.ahorroPorNuevo, 0)} en el año.`,
  },
  {
    q: "¿Qué pasa si no pago los aportes de autónomos?",
    a: `Perdés la deducción especial entera, no sólo la deducción de los aportes. El texto es tajante: «${AUTONOMOS_TEXTOS.condicionAportes}» En el caso testigo, dejar de pagar ${formatARS(COMUN.aportesAnual, 0)} de aportes en el año lleva el impuesto de ${formatARS(COMUN.impuestoAnual, 0)} a ${formatARS(COMUN.impuestoSinAportes, 0)}.`,
  },
  {
    q: "¿Desde cuánto paga Ganancias un autónomo?",
    a: `Sin cargas de familia y con ${formatARS(150_000, 0)} de aportes por mes, desde una ganancia neta de ${formatARS(UMBRAL_COMUN, 0)} al año (${formatARS(UMBRAL_NUEVO, 0)} si es nuevo profesional). La ganancia neta es lo facturado menos los gastos de la actividad; después se restan los aportes, el no imponible, la especial y las cargas de familia.`,
  },
  {
    q: "¿Es lo mismo que la deducción especial de los empleados?",
    a: `No. Los empleados en relación de dependencia y los jubilados tienen el apartado 2, que es de 3,8 veces (${formatARS(DEDUCCIONES.deduccionEspecialDependencia, 0)} en total) y además suma la doceava parte por el aguinaldo. El apartado 1 de los autónomos es más chico y no tiene doceava parte.`,
  },
  {
    q: "¿Los monotributistas pagan Ganancias?",
    a: "No por la actividad por la que están en el monotributo: el régimen simplificado reemplaza a Ganancias y a IVA. Esta cuenta es para autónomos inscriptos en el régimen general.",
  },
  {
    q: "¿Cómo y cuándo se paga?",
    a: `Con la declaración jurada anual, que se presenta a mitad del año siguiente, y con anticipos durante el año calculados sobre el impuesto del año anterior. Los montos de esta página son los de ${GANANCIAS_VIGENCIA}, acumulados a diciembre: los que se usan para la declaración de ${ANIO_AUTONOMOS}.`,
  },
];

export default function GananciasAutonomosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de Ganancias para autónomos",
        url: "https://calcular.ar/ganancias-autonomos",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: `Ganancias para autónomos ${ANIO_AUTONOMOS}: deducción especial y nuevos profesionales`,
        descripcion:
          "La deducción especial del art. 30 inc. c) apartado 1 de la ley de Ganancias, la mayor para nuevos profesionales y emprendedores (Decreto 862/2019, art. 99) y la condición de tener los aportes pagos.",
        url: "/ganancias-autonomos",
        modificado: AUTONOMOS_FUENTES.consultadoEl,
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
          Ganancias para autónomos {ANIO_AUTONOMOS}: la deducción especial es de {ESPECIAL}, y de {ESPECIAL_NUEVOS} si
          sos nuevo profesional
        </h1>
        <p className="text-zinc-600">
          Profesionales, oficios y emprendedores que trabajan personalmente tienen su propia deducción especial, más
          chica que la de los empleados y con una condición que se olvida: los aportes al día. Cargá tu ganancia del
          año y te mostramos cuánto pagás.
        </p>
      </header>

      <RespuestaPrimero actualizado={AUTONOMOS_FUENTES.consultadoEl}>
        <p>
          En {ANIO_AUTONOMOS} un autónomo resta {formatARS(DEDUCCIONES.mni, 0)} de ganancia no imponible y{" "}
          <strong>{ESPECIAL}</strong> de deducción especial. Si tiene hasta tres años de matrícula o de inscripción,
          la especial sube a <strong>{ESPECIAL_NUEVOS}</strong>. Y sólo la puede computar si pagó los aportes de
          autónomos: sin ellos se pierde entera.
        </p>
      </RespuestaPrimero>

      <CalculadoraGananciasAutonomos />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Por qué no conviene dejar de aportar</h2>
        <p className="text-zinc-600">
          La deducción especial no es un premio por aportar: es una condición. La ley la ata a «el pago de los aportes
          que, como trabajadores autónomos, deban realizar obligatoriamente». Con una ganancia neta de{" "}
          {formatARS(CASO_ENTRADA.gananciaNetaAnual, 0)}, pagar {formatARS(COMUN.aportesAnual, 0)} de aportes en el
          año deja el impuesto en {formatARS(COMUN.impuestoAnual, 0)}; no pagarlos lo lleva a{" "}
          <strong>{formatARS(COMUN.impuestoSinAportes, 0)}</strong>. Lo que se ahorra por un lado se paga varias
          veces por el otro, y además se pierden años de aportes para la jubilación.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Quién es «nuevo profesional» y hasta cuándo</h2>
        <p className="text-zinc-600">
          El reglamento lo define por antigüedad: {AUTONOMOS_TEXTOS.reglamento99}. Son tres años, no tres
          declaraciones: se cuentan desde la matrícula (profesionales) o desde la inscripción como trabajador
          independiente (emprendedores). En el caso testigo, la diferencia vale {formatARS(NUEVO.ahorroPorNuevo, 0)}{" "}
          en el año.
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
        <h2 className="text-base font-semibold text-zinc-900">Para seguir</h2>
        <p>
          Si todavía no sabés si te conviene el monotributo, mirá{" "}
          <Link href="/monotributo" className="font-medium text-emerald-700 hover:underline">
            la calculadora de monotributo
          </Link>
          ; si tenés que aportar o no, en{" "}
          <Link href="/aportes-jubilatorios-obligatorios" className="font-medium text-emerald-700 hover:underline">
            aportes jubilatorios obligatorios
          </Link>
          ; y los topes de prepaga, médicos y seguros en{" "}
          <Link href="/deducciones-generales-ganancias" className="font-medium text-emerald-700 hover:underline">
            las deducciones generales
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {AUTONOMOS_FUENTES.lista.map((f) => (
            <li key={f.nombre}>
              <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                {f.nombre}
              </a>{" "}
              — {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Los textos legales se leyeron del texto ACTUALIZADO de InfoLEG y los montos de las tablas de ARCA. Es una
          estimación anual: no reemplaza a la declaración jurada ni a un profesional. Consultada el{" "}
          {AUTONOMOS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
