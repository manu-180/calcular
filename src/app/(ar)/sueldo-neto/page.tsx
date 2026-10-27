import type { Metadata } from "next";
import { hreflangHeadAR } from "@/lib/hreflang-ar";
import Link from "next/link";
import { CalculadoraSueldoNeto } from "@/components/CalculadoraSueldoNeto";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import { brutoANeto } from "@/lib/sueldo";
import { SUELDO_FUENTES, topeSipa } from "@/data/sueldo";
import {
  DEDUCCIONES,
  ESCALA_GANANCIAS,
  GANANCIAS_FUENTES,
  GANANCIAS_VIGENCIA,
} from "@/data/ganancias";
import { formatARS } from "@/lib/formato";
import { datosOferta } from "@/lib/oferta";
import { OtrosPaises } from "@/components/OtrosPaises";

const ACTUALIZADO_EL = "13 de junio de 2026";

export const metadata: Metadata = {
  title: "Calculadora de sueldo neto 2026: de bruto a en mano",
  description:
    "Calculá tu sueldo en mano con jubilación 11%, PAMI 3% y obra social 3%, tope SIPA, cuota sindical y Ganancias. También de neto a bruto.",
  alternates: { canonical: "/sueldo-neto", languages: hreflangHeadAR("/sueldo-neto") },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Calculadora de Sueldo Neto 2026")}&s=${encodeURIComponent("De bruto a en mano y al revés. Aportes, tope SIPA y Ganancias.")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

// Tabla "cuánto es X en mano" — neto con los aportes de ley (sin Ganancias ni sindical).
const SUELDOS_TABLA = [800_000, 1_000_000, 1_200_000, 1_500_000, 2_000_000, 2_500_000];

const crearFaqs = () => [
  {
    q: "¿Cómo se calcula el sueldo neto en Argentina?",
    a: "Al sueldo bruto se le restan los aportes de ley: 11% de jubilación (SIPA), 3% de PAMI (Ley 19.032) y 3% de obra social. En total, 17%. A eso se pueden sumar la cuota sindical (si estás afiliado) y, en sueldos altos, la retención de Ganancias. El neto es lo que queda después de esos descuentos: en la mayoría de los casos, alrededor del 83% del bruto.",
  },
  {
    q: "¿Qué descuentos tiene el sueldo?",
    a: "Los obligatorios son tres: jubilación 11%, PAMI/INSSJP 3% y obra social 3% (17% en total). Son aportes a la seguridad social, no impuestos. Después, según tu caso, pueden aparecer la cuota sindical de tu convenio (1% a 3%) y la retención de Ganancias de 4ta categoría, que recién empieza desde unos $2.800.000 de sueldo bruto si sos soltero y sin hijos.",
  },
  {
    q: "¿Desde cuánto se paga Ganancias en 2026?",
    a: `Con las deducciones del segundo semestre 2026, un trabajador soltero y sin hijos empieza a pagar Ganancias entre los $2.800.000 y los $3.000.000 de sueldo bruto por mes. El piso sube si tenés cónyuge o hijos a cargo, o deducciones como prepaga o alquiler. El mínimo no imponible vigente es de ${formatARS(DEDUCCIONES.mni, 0)} anuales y la deducción especial para empleados es de ${formatARS(DEDUCCIONES.deduccionEspecialDependencia, 0)} anuales.`,
  },
  {
    q: "Gano mucho y me descuentan proporcionalmente menos de aportes, ¿por qué?",
    a: `Porque los aportes tienen un tope. Se calculan sobre la base máxima del SIPA, que en ${topeSipa().vigencia} es de ${formatARS(topeSipa().baseMaxima, 0)}. Si tu sueldo bruto pasa ese monto, el 17% se aplica solo hasta el tope y no sobre lo que sobra. Por eso, en sueldos muy altos, el porcentaje real de aportes baja (aunque suele aparecer Ganancias).`,
  },
  {
    q: "¿El sueldo neto incluye el aguinaldo?",
    a: "No: el sueldo neto mensual es lo que cobrás cada mes. El aguinaldo (en la ley se llama SAC) se paga aparte, en junio y diciembre, y es el 50% de tu mejor sueldo del semestre. También lleva el 17% de aportes. Para esa cuenta tenemos una calculadora de aguinaldo.",
  },
  {
    q: "¿La cuota sindical es obligatoria?",
    a: "No. Solo se descuenta si estás afiliado al sindicato de tu actividad. El porcentaje lo fija cada convenio (en general, del 1% al 3% del sueldo). Si te desafiliás, deja de descontarse. Otra cosa es la contribución solidaria, que algunos convenios cobran a todos los trabajadores del sector por un tiempo.",
  },
  {
    q: "¿Qué cambió en mi recibo con la Ley 27.802?",
    a: "La Ley 27.802 (Modernización Laboral, vigente desde marzo de 2026) no cambió los aportes que te descuentan: seguís aportando el 17%. Lo que cambió es que el recibo ahora tiene que mostrar por separado las contribuciones que paga el empleador por vos (jubilación, obra social, ART). Tampoco tocó la cuenta de Ganancias del sueldo.",
  },
];

export default function SueldoNetoPage() {
  const faqs = crearFaqs();
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de Sueldo Neto 2026",
        url: "https://calcular.ar/sueldo-neto",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Calculadora de Sueldo Neto 2026: de bruto a en mano",
        descripcion:
          "Cómo se calcula el sueldo neto en Argentina: aportes de ley (17%), tope SIPA, cuota sindical y el impuesto a las Ganancias de 4ta categoría.",
        url: "/sueldo-neto",
        modificado: "2026-06-13",
      }),
      datasetSchema({
        nombre: "Escala del impuesto a las Ganancias 4ta categoría, art. 94 LIG (1er sem 2026)",
        descripcion:
          "Tramos y alícuotas (5% a 35%) de la escala del art. 94 de la Ley de Impuesto a las Ganancias, vigentes para el primer semestre de 2026, y deducciones personales del art. 30.",
        url: "/sueldo-neto",
        modificado: "2026-06-13",
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
    <article className="space-y-10">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Calculadora de Sueldo Neto 2026
        </h1>
        <p className="text-zinc-600">
          Pasá tu sueldo <strong>de bruto a en mano</strong> con los aportes de ley, la cuota
          sindical y Ganancias si te toca. O al revés: <strong>qué bruto pedir</strong> para cobrar
          el neto que querés.
        </p>
      </header>

      <RespuestaPrimero actualizado={ACTUALIZADO_EL}>
        <p>
          Tu <strong>sueldo neto</strong> es el bruto menos los aportes de ley:{" "}
          <strong>11% de jubilación + 3% de PAMI + 3% de obra social = 17%</strong>. Para la
          mayoría, el neto es <strong>alrededor del 83% del bruto</strong>. Si estás afiliado al
          sindicato también se descuenta la cuota sindical (1% a 3%), y desde unos{" "}
          <strong>$2.800.000 de bruto</strong> (soltero sin hijos) aparece la retención de Ganancias.
          Los aportes tienen tope: por la parte del sueldo que pasa{" "}
          {formatARS(topeSipa().baseMaxima, 0)} ({topeSipa().vigencia}) el 17% deja de crecer. El
          detalle de cada descuento posible está en{" "}
          <Link href="/descuentos-del-sueldo" className="text-emerald-700 hover:underline">
            cuánto te pueden descontar del sueldo
          </Link>
          .
        </p>
      </RespuestaPrimero>

      <CalculadoraSueldoNeto oferta={datosOferta("planilla-mi-sueldo")} />

      {/* Moat: neto por convenio */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">¿Cobrás por convenio?</h2>
        <p className="text-zinc-600">
          Si tu sueldo sale de una escala de convenio, arrancá por el básico oficial de tu categoría
          y después pasalo a neto. Tenemos las escalas revisadas contra la circular oficial:
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/sueldo-neto/comercio"
            className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-emerald-400"
          >
            <p className="font-semibold text-zinc-900">Sueldo neto de Comercio →</p>
            <p className="mt-1 text-sm text-zinc-600">
              Neto por categoría, con los $120.000 no remunerativos bien calculados.
            </p>
          </Link>
          <Link
            href="/sueldo-neto/construccion"
            className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-emerald-400"
          >
            <p className="font-semibold text-zinc-900">Sueldo neto de la construcción (UOCRA) →</p>
            <p className="mt-1 text-sm text-zinc-600">Jornal a sueldo por categoría y zona.</p>
          </Link>
          <Link
            href="/sueldo-neto/camioneros"
            className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-emerald-400"
          >
            <p className="font-semibold text-zinc-900">Sueldo neto de camioneros →</p>
            <p className="mt-1 text-sm text-zinc-600">Neto por categoría, CCT 40/89.</p>
          </Link>
        </div>
      </section>

      <EmailCapture
        source="sueldo-neto"
        headline="Avisame cuando cambien los aportes o las escalas"
        subtext="Cuando se actualice el tope de aportes, las deducciones de Ganancias o el sueldo mínimo, te aviso. Sin spam."
      />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuánto es tu sueldo en mano</h2>
        <p className="text-zinc-600">
          Una estimación con los aportes de ley (17%), sin cuota sindical ni Ganancias. Buscá tu
          sueldo bruto:
        </p>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-zinc-600">
                <th className="px-4 py-3 font-semibold">Sueldo bruto</th>
                <th className="px-4 py-3 font-semibold">Aportes (17%)</th>
                <th className="px-4 py-3 font-semibold">En mano</th>
              </tr>
            </thead>
            <tbody>
              {SUELDOS_TABLA.map((bruto) => {
                const d = brutoANeto(bruto);
                return (
                  <tr key={bruto} className="border-b border-zinc-100 last:border-0">
                    <td className="px-4 py-2.5 font-medium text-zinc-900">{formatARS(bruto, 0)}</td>
                    <td className="px-4 py-2.5 text-zinc-500">−{formatARS(d.aportes.total, 0)}</td>
                    <td className="px-4 py-2.5 font-semibold text-emerald-700">
                      {formatARS(d.neto, 0)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400">
          Por encima de $2.800.000 de bruto (soltero) suele aparecer además la retención de
          Ganancias, que baja el neto. Usá la calculadora de arriba con la opción de Ganancias
          activada. Si querés llevar la cuenta de todo el año en Excel, está la{" "}
          <Link href="/planillas/mi-sueldo" className="text-emerald-700 underline">
            planilla de mi sueldo
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La cuenta, paso a paso</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Con un sueldo bruto de <strong>$1.200.000</strong>, sin cuota sindical ni Ganancias:
          </p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              <strong>Jubilación (11%):</strong> $1.200.000 × 0,11 = <strong>$132.000</strong>.
            </li>
            <li>
              <strong>PAMI (3%):</strong> $1.200.000 × 0,03 = <strong>$36.000</strong>.
            </li>
            <li>
              <strong>Obra social (3%):</strong> $1.200.000 × 0,03 = <strong>$36.000</strong>.
            </li>
            <li>
              <strong>Neto en mano:</strong> $1.200.000 − $204.000 ={" "}
              <strong>$996.000</strong> (el 83% del bruto).
            </li>
          </ol>
          <p className="rounded-xl bg-white p-4 font-medium text-zinc-800 shadow-sm">
            Atajo: sueldo en mano ≈ sueldo bruto × 0,83 (mientras no pagues Ganancias).
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Escala de Ganancias 4ta categoría ({GANANCIAS_VIGENCIA})
        </h2>
        <p className="text-zinc-600">
          La retención de Ganancias se aplica sobre la ganancia neta imponible (tu sueldo del año
          menos aportes y deducciones) con esta escala oficial de ARCA, que sube por tramos. Cada
          tramo paga un monto fijo más un porcentaje sobre lo que pasa del piso del tramo:
        </p>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-zinc-600">
                <th className="px-4 py-3 font-semibold">Ganancia neta anual desde</th>
                <th className="px-4 py-3 font-semibold">Hasta</th>
                <th className="px-4 py-3 font-semibold">Paga fijo</th>
                <th className="px-4 py-3 font-semibold">+ % s/ excedente</th>
              </tr>
            </thead>
            <tbody>
              {ESCALA_GANANCIAS.map((t) => (
                <tr key={t.desde} className="border-b border-zinc-100 last:border-0">
                  <td className="px-4 py-2.5 font-medium text-zinc-900">{formatARS(t.desde, 0)}</td>
                  <td className="px-4 py-2.5 text-zinc-600">
                    {t.hasta === null ? "en adelante" : formatARS(t.hasta, 0)}
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">{formatARS(t.fijo, 0)}</td>
                  <td className="px-4 py-2.5 font-semibold text-emerald-700">
                    {(t.alicuota * 100).toLocaleString("es-AR")}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400">
          Estos valores se actualizan cada enero y julio por el IPC del semestre anterior. La
          retención de tu recibo se calcula mes a mes, acumulando el año: la opción de Ganancias de
          la calculadora te da una estimación anual, no la liquidación exacta.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="ca-acordeon group rounded-xl border border-zinc-200 bg-white p-4 open:shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-zinc-800 group-open:text-emerald-700">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Fuentes oficiales</h2>
        <ul className="space-y-1.5 text-sm text-zinc-600">
          {[
            SUELDO_FUENTES.jubilacion,
            SUELDO_FUENTES.obraSocial,
            SUELDO_FUENTES.pami,
            SUELDO_FUENTES.topeSIPA,
            GANANCIAS_FUENTES.deducciones,
            GANANCIAS_FUENTES.escala,
          ].map((f) => (
            <li key={f.url}>
              •{" "}
              <a
                href={f.url}
                rel="nofollow noopener"
                target="_blank"
                className="text-emerald-700 underline"
              >
                {f.nombre}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-zinc-400">
          Última verificación: {ACTUALIZADO_EL}. ¿Te vas de un trabajo? Mirá la{" "}
          <Link href="/indemnizacion" className="text-emerald-700 underline">
            calculadora de indemnización
          </Link>
          . ¿Cobrás aguinaldo? Calculá{" "}
          <Link href="/aguinaldo/neto" className="text-emerald-700 underline">
            cuánto queda en mano
          </Link>
          . ¿Sos monotributista? Mirá la{" "}
          <Link href="/monotributo" className="text-emerald-700 underline">
            calculadora de monotributo
          </Link>
          . ¿Tenés hijos? El bruto de acá es el que entra en el ingreso del grupo familiar que mira
          ANSES para las{" "}
          <Link href="/asignaciones-familiares" className="text-emerald-700 underline">
            asignaciones familiares
          </Link>{" "}
          (sin horas extras ni aguinaldo).
        </p>
      </section>
      <OtrosPaises concepto="sueldo-neto" />
    </article>
  );
}
