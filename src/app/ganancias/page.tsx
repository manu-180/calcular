import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { CalculadoraGanancias } from "@/components/CalculadoraGanancias";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import { ESCALA_GANANCIAS, GANANCIAS_FUENTES, GANANCIAS_VIGENCIA, DEDUCCIONES } from "@/data/ganancias";
import { formatARS } from "@/lib/formato";
import { productoPorSlug } from "@/lib/mp";

const ACTUALIZADO_EL = "15 de junio de 2026";

export const metadata: Metadata = {
  title: "Calculadora de Ganancias 4ta Categoría 2026: retención mes a mes",
  description:
    "Calculá cuánto te descuenta tu empleador de Ganancias cada mes, con el método acumulado oficial (RG ARCA 5008). Escala y deducciones del 2do semestre 2026. Gratis y actualizado.",
  alternates: { canonical: "/ganancias" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Calculadora Ganancias 4ta Categoría 2026")}&s=${encodeURIComponent("Retención mensual real — método acumulado ARCA. Gratis.")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Desde qué sueldo pago Ganancias en 2026?",
    a: `Con las deducciones del segundo semestre 2026, un trabajador soltero sin hijos empieza a tributar alrededor de los $2.800.000–$3.000.000 de sueldo bruto mensual. El piso sube si tenés cónyuge, hijos o deducciones adicionales (prepaga, alquiler). El mínimo no imponible vigente es ${formatARS(DEDUCCIONES.mni, 0)} anuales y la deducción especial para empleados es ${formatARS(DEDUCCIONES.deduccionEspecialDependencia, 0)} anuales (2do semestre 2026).`,
  },
  {
    q: "¿Por qué me retienen más en junio y diciembre?",
    a: "En esos meses tu empleador incluye el SAC (aguinaldo) en la base de Ganancias: el método acumulado suma el sueldo ordinario más el 50% del mejor sueldo del semestre, y el total resulta mayor. Como la escala es progresiva, ese salto en la base hace que la retención del mes trepe notoriamente. Es normal y no significa que te estén descontando de más.",
  },
  {
    q: "¿Qué es el método acumulado de retención?",
    a: "Es el sistema que usa el empleador (RG ARCA 5008). En vez de retener el mismo monto todos los meses, cada mes suma todo lo que ganaste y acumuló en deducciones desde enero, extrapola a año completo, aplica la escala progresiva, y retiene la diferencia respecto a lo ya retenido. Así el impuesto se va ajustando mes a mes y en diciembre queda exactamente saldado, sin retenciones extra ni devoluciones grandes.",
  },
  {
    q: "¿Cuáles son las alícuotas de Ganancias 4ta categoría en 2026?",
    a: `La escala tiene 9 tramos del 5% al 35%, aplicados sobre la ganancia neta imponible anual. Los primeros ${formatARS(ESCALA_GANANCIAS[0].hasta ?? 0, 0)} tributan al 5%; desde ${formatARS(ESCALA_GANANCIAS[4].desde, 0)} la alícuota es 19%; y desde ${formatARS(ESCALA_GANANCIAS[8].desde, 0)} paga el 35% sobre el excedente. Las deducciones (MNI, especial, familiares) reducen la base antes de aplicar los tramos.`,
  },
  {
    q: "¿La cuota sindical y la prepaga reducen Ganancias?",
    a: "Sí. La cuota sindical se resta directamente de la ganancia bruta acumulada antes de calcular el impuesto. La prepaga y otros gastos médicos se deducen si los declarás ante tu empleador con el formulario F.572 (SIRADIG-Trabajador). Cuanto más declarás, menor es tu ganancia neta imponible y menor la retención.",
  },
  {
    q: "¿Esta calculadora reemplaza la liquidación de mi empleador?",
    a: "No. Es una estimación orientativa basada en sueldo fijo y el método acumulado estándar. Tu empleador puede tener variables distintas: aumentos por paritaria, bonos, horas extras, deducciones que declaraste en SIRADIG, retenciones de sueldos anteriores del año. El resultado aquí es útil para entender el orden de magnitud y detectar errores groseros, no para reclamar un centavo exacto.",
  },
];

export default function GananciasPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de Ganancias 4ta Categoría 2026",
        url: "https://calcular.ar/ganancias",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        featureList: [
          "Retención mensual acumulada (RG ARCA 5008)",
          "Tabla de 12 meses con SAC en junio y diciembre",
          "Cargas de familia: cónyuge e hijos",
          "Cuota sindical y otras deducciones",
          "Escala art. 94 LIG — 2do semestre 2026",
        ],
      },
      articleSchema({
        titulo: "Calculadora de Ganancias 4ta Categoría 2026: retención mes a mes",
        descripcion:
          "Herramienta gratuita que calcula la retención mensual de Ganancias 4ta categoría usando el método acumulado oficial (RG ARCA 5008), con la escala y deducciones del 2do semestre 2026.",
        url: "/ganancias",
        modificado: "2026-06-15",
        publicado: "2026-06-15",
      }),
      datasetSchema({
        nombre: "Escala art. 94 LIG — Ganancias 4ta categoría 2do semestre 2026",
        descripcion:
          "Tabla de 9 tramos de la escala progresiva del impuesto a las Ganancias 4ta categoría para el segundo semestre 2026, con alícuotas del 5% al 35% y montos fijos por tramo.",
        url: "/ganancias",
        modificado: "2026-06-15",
        fuenteNombre: GANANCIAS_FUENTES.escala.nombre,
        fuenteUrl: GANANCIAS_FUENTES.escala.url,
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
    <>
      <JsonLd data={jsonLd} />

      <article className="space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
            Calculadora de Ganancias 4ª categoría 2026
          </h1>
          <p className="text-lg text-zinc-600">
            Retención mensual real — método acumulado oficial (RG ARCA 5008)
          </p>
        </header>

        <RespuestaPrimero actualizado={ACTUALIZADO_EL}>
          <p>
            Si tu sueldo bruto mensual supera <strong>~$2.800.000</strong> (soltero sin hijos),
            tu empleador te retiene el impuesto a las Ganancias con el{" "}
            <strong>método acumulado</strong>: suma lo que ganaste desde enero, aplica la escala
            progresiva del <strong>5% al 35%</strong> y retiene la diferencia respecto a los meses
            anteriores. Esto hace que en <strong>junio y diciembre</strong> el descuento suba porque
            se suma el SAC (aguinaldo).
          </p>
          <p>
            Con la escala del 2do semestre 2026, un empleado soltero sin hijos con $5.000.000 de
            bruto paga <strong>~$283.000</strong> de Ganancias en los meses sin SAC y{" "}
            <strong>~$760.000</strong> en junio y diciembre. El total anual es{" "}
            <strong>~$4.350.000</strong> (tasa efectiva de ~6,7% sobre el bruto anual incluido SAC).
          </p>
        </RespuestaPrimero>

        <CalculadoraGanancias precioInforme={productoPorSlug("informe-ganancias")?.precio} />

        {/* Explicación del método */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900">
            Cómo calcula el empleador: método acumulado (RG ARCA 5008)
          </h2>
          <div className="space-y-3 text-zinc-700">
            <p>
              La ley no permite que el empleador retenga simplemente <em>impuesto_anual&nbsp;÷&nbsp;12</em>{" "}
              todos los meses. En cambio usa un proceso de cuatro pasos que se repite cada mes:
            </p>
            <ol className="ml-5 list-decimal space-y-2">
              <li>
                <strong>Acumula el bruto desde enero:</strong> suma todas las remuneraciones del
                año, incluyendo el SAC en el semestre que corresponde.
              </li>
              <li>
                <strong>Resta aportes y deducciones proporcionales:</strong> descuenta el 17% de
                aportes (con el tope SIPA), la cuota sindical y las deducciones personales del{" "}
                art. 30 en proporción a los meses transcurridos.
              </li>
              <li>
                <strong>Extrapola a año completo:</strong> el resultado acumulado se divide por el
                número de meses y se multiplica por 12, para estimar la ganancia neta imponible
                anual.
              </li>
              <li>
                <strong>Aplica la escala y retiene la diferencia:</strong> calcula el impuesto
                anual proyectado, lo multiplica por M/12, y resta lo ya retenido en meses
                anteriores. Eso es el descuento de ese mes.
              </li>
            </ol>
            <p>
              El efecto es que los <strong>meses normales tienen retenciones parejas</strong>, y
              los meses de SAC tienen un pico porque el aguinaldo engrosa la base pero la
              extrapolación lo "divide" entre menos meses.
            </p>
          </div>
        </section>

        {/* Escala */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900">
            Escala art. 94 LIG — {GANANCIAS_VIGENCIA}
          </h2>
          <p className="text-sm text-zinc-500">
            Valores anuales. Se aplican sobre la <em>ganancia neta imponible</em> extrapolada a año
            completo.
          </p>
          <div className="overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="px-4 py-3 text-right font-semibold text-zinc-700">Desde</th>
                  <th className="px-4 py-3 text-right font-semibold text-zinc-700">Hasta</th>
                  <th className="px-4 py-3 text-right font-semibold text-zinc-700">Monto fijo</th>
                  <th className="px-4 py-3 text-right font-semibold text-zinc-700">Alícuota</th>
                </tr>
              </thead>
              <tbody>
                {ESCALA_GANANCIAS.map((t, i) => (
                  <tr key={i} className="border-b border-zinc-50">
                    <td className="px-4 py-2 text-right text-zinc-700">{formatARS(t.desde, 0)}</td>
                    <td className="px-4 py-2 text-right text-zinc-700">
                      {t.hasta ? formatARS(t.hasta, 0) : "Sin límite"}
                    </td>
                    <td className="px-4 py-2 text-right text-zinc-700">{formatARS(t.fijo, 0)}</td>
                    <td className="px-4 py-2 text-right font-semibold text-zinc-900">
                      {(t.alicuota * 100).toFixed(0)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-500">
            Fuente:{" "}
            <a
              href={GANANCIAS_FUENTES.escala.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 underline"
            >
              {GANANCIAS_FUENTES.escala.nombre}
            </a>{" "}
            — consultado el {GANANCIAS_FUENTES.consultadoEl}.
          </p>
        </section>

        {/* FAQs */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-zinc-900">Preguntas frecuentes</h2>
          <dl className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-xl border border-zinc-100 bg-zinc-50 p-4">
                <dt className="font-semibold text-zinc-900">{f.q}</dt>
                <dd className="mt-1.5 text-sm text-zinc-700">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* CTA planillas */}
        <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="font-semibold text-zinc-900">¿Liquidás sueldos de empleados de comercio?</h2>
          <p className="mt-2 text-sm text-zinc-700">
            La <strong>Planilla de Sueldos Comercio 2026</strong> incluye la escala CCT 130/75
            embebida, calcular la retención de Ganancias, horas extras y jornada parcial — todo en
            Excel, con actualización automática por paritaria.
          </p>
          <Link
            href="/planillas"
            className="mt-4 inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Ver Planilla de Sueldos Comercio 2026 →
          </Link>
        </section>

        {/* Cross-links */}
        <nav aria-label="Calculadoras relacionadas" className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">Calculadoras relacionadas</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/sueldo-neto"
              className="group rounded-xl border border-zinc-200 bg-white p-4 hover:border-emerald-400 hover:shadow-sm"
            >
              <p className="font-semibold text-zinc-900 group-hover:text-emerald-700">
                Calculadora de Sueldo Neto
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                De bruto a en mano: aportes (17%) con tope SIPA, cuota sindical y estimación rápida
                de Ganancias.
              </p>
            </Link>
            <Link
              href="/aguinaldo"
              className="group rounded-xl border border-zinc-200 bg-white p-4 hover:border-emerald-400 hover:shadow-sm"
            >
              <p className="font-semibold text-zinc-900 group-hover:text-emerald-700">
                Calculadora de Aguinaldo (SAC)
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                Cuánto te corresponde, con descuentos, fecha de pago y si te conviene cobrarlo en
                cuotas.
              </p>
            </Link>
            <Link
              href="/convenios/comercio"
              className="group rounded-xl border border-zinc-200 bg-white p-4 hover:border-emerald-400 hover:shadow-sm"
            >
              <p className="font-semibold text-zinc-900 group-hover:text-emerald-700">
                Escala Salarial Comercio 2026
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                CCT 130/75 con antigüedad y jornada reducida — todos los valores de la paritaria.
              </p>
            </Link>
            <Link
              href="/deduccion-alquiler"
              className="group rounded-xl border border-zinc-200 bg-white p-4 hover:border-emerald-400 hover:shadow-sm"
            >
              <p className="font-semibold text-zinc-900 group-hover:text-emerald-700">
                Deducción por alquiler
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                Cuánto te devuelve el 40% del alquiler a tu alícuota, y por qué el 10% ya no corre en 2026.
              </p>
            </Link>
            <Link
              href="/deducciones-generales-ganancias"
              className="group rounded-xl border border-zinc-200 bg-white p-4 hover:border-emerald-400 hover:shadow-sm"
            >
              <p className="font-semibold text-zinc-900 group-hover:text-emerald-700">
                Deducciones generales
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                Prepaga, médicos, seguros y donaciones: el tope de cada una y lo que te ahorra.
              </p>
            </Link>
            <Link
              href="/monotributo"
              className="group rounded-xl border border-zinc-200 bg-white p-4 hover:border-emerald-400 hover:shadow-sm"
            >
              <p className="font-semibold text-zinc-900 group-hover:text-emerald-700">
                Calculadora de Monotributo
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                Qué categoría te corresponde y cuánto pagás — con las escalas actualizadas 2026.
              </p>
            </Link>
          </div>
        </nav>

        {/* Fuentes */}
        <section className="space-y-2 text-xs text-zinc-500">
          <h2 className="font-semibold text-zinc-600">Fuentes y vigencia</h2>
          <ul className="space-y-1">
            <li>
              <a
                href={GANANCIAS_FUENTES.escala.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 underline"
              >
                {GANANCIAS_FUENTES.escala.nombre}
              </a>
            </li>
            <li>
              <a
                href={GANANCIAS_FUENTES.deducciones.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 underline"
              >
                {GANANCIAS_FUENTES.deducciones.nombre}
              </a>
            </li>
            <li>
              Valores vigentes {GANANCIAS_VIGENCIA}. Se actualizan semestralmente (enero y julio)
              con el IPC del INDEC.
            </li>
            <li>Consultados el {GANANCIAS_FUENTES.consultadoEl}.</li>
          </ul>
        </section>
        <EmailCapture
          source="ganancias"
          headline="Avisame cuando se actualice la escala de Ganancias"
          subtext="La escala y las deducciones se actualizan en enero y julio con el IPC. Te aviso cuando cambien, así no pagás de más. Sin spam."
        />
      </article>
    </>
  );
}
