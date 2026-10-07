import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { ORGANIZACION, articleSchema, datasetSchema } from "@/lib/schema";
import { openGraphDe } from "@/lib/seo";
import { AGUINALDO_FUENTES, APORTES_PERSONALES } from "@/data/aguinaldo";
import { formatARS } from "@/lib/formato";

export const metadata: Metadata = {
  title: "Aguinaldo neto 2026: cuánto queda en mano",
  description:
    "El aguinaldo se cobra neto: 50% del mejor sueldo bruto menos 17% de aportes. En mano queda cerca del 41,5% del mejor sueldo. Tabla por sueldo.",
  alternates: { canonical: "/aguinaldo/neto" },
  openGraph: openGraphDe({
    ruta: "/aguinaldo/neto",
    titulo: "Aguinaldo: ¿bruto o neto?",
    bajada: "En mano queda cerca del 41,5% de tu mejor sueldo. Tabla por sueldo.",
  }),
};

// Fecha de la última revisión del contenido de esta página (mantener al rotar datos).
const ACTUALIZADO_EL = "12 de junio de 2026";

const TOTAL_APORTES =
  APORTES_PERSONALES.jubilacion + APORTES_PERSONALES.pami + APORTES_PERSONALES.obraSocial; // 0,17
const FACTOR_EN_MANO = 0.5 * (1 - TOTAL_APORTES); // 0,415 del mejor sueldo bruto

// Tabla por rangos de mejor sueldo bruto. Tope en $4M: por encima de la base imponible
// máxima de aportes el descuento deja de crecer y suele aplicar Ganancias (ver FAQ).
const SUELDOS_TABLA = [
  600_000, 800_000, 1_000_000, 1_200_000, 1_500_000, 1_800_000, 2_000_000, 2_500_000,
  3_000_000, 3_500_000, 4_000_000,
];

const faqs = [
  {
    q: "¿El aguinaldo se calcula sobre el sueldo bruto o el neto?",
    a: "Se calcula sobre el bruto: la cuota es el 50% de tu mejor sueldo bruto del semestre (Ley 23.041). Pero se cobra en neto. Como es remunerativo, tiene los mismos aportes que un sueldo (11% jubilación + 3% PAMI + 3% obra social = 17%). En mano te queda cerca del 41,5% de tu mejor sueldo bruto.",
  },
  {
    q: "¿Qué porcentaje se descuenta del aguinaldo?",
    a: "Un 17% de aportes de ley: 11% de jubilación (SIPA), 3% de PAMI (Ley 19.032) y 3% de obra social. Es lo mismo que en el sueldo. Además se puede descontar la cuota sindical de tu convenio y, si tu sueldo es alto, Ganancias.",
  },
  {
    q: "¿El aguinaldo paga impuesto a las Ganancias?",
    a: "Sí, es ganancia gravada, pero no se retiene todo junto: el empleador reparte el SAC mes a mes durante el año. Con las deducciones vigentes para enero a junio 2026 (tablas de ARCA), la retención recién aparece con sueldos brutos de alrededor de $3.000.000, para una persona soltera sin deducciones. El número exacto depende de tu caso (cargas de familia, deducciones del SIRADIG, etc.).",
  },
  {
    q: "¿Por qué me depositaron un monto distinto al de la tabla?",
    a: "Lo más común: pagás cuota sindical (de 1% a 3% según el convenio), tu sueldo pasa la base imponible máxima de aportes (por encima del tope, el 17% deja de crecer), te retuvieron Ganancias, o tu mejor sueldo tenía conceptos no remunerativos (no pagan aportes, pero tampoco suman para el aguinaldo). La tabla es una estimación con los aportes de ley solos.",
  },
  {
    q: "¿El neto del aguinaldo es la mitad de mi sueldo de bolsillo?",
    a: "Más o menos sí, si tu mejor sueldo del semestre fue el último y no pagás Ganancias. Como el aguinaldo tiene los mismos descuentos que el sueldo, lo que cobrás en mano se parece mucho a la mitad de tu sueldo de bolsillo de un mes normal.",
  },
];

export default function AguinaldoNetoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Aguinaldo neto 2026: cuánto queda en mano",
        descripcion:
          "El aguinaldo se calcula en bruto (50% del mejor sueldo del semestre) y se cobra en neto: después del 17% de aportes, en mano queda cerca del 41,5% de tu mejor sueldo bruto.",
        url: "/aguinaldo/neto",
        modificado: "2026-06-19",
      }),
      datasetSchema({
        nombre: "Aguinaldo bruto y neto por rango de sueldo (Argentina 2026)",
        descripcion:
          "Tabla del medio aguinaldo bruto (50% del mejor sueldo) y el monto en mano tras el 17% de aportes (jubilación, PAMI y obra social), por rango de mejor sueldo bruto del semestre.",
        url: "/aguinaldo/neto",
        modificado: "2026-06-19",
        fuenteNombre: "Ley 23.041 (aguinaldo) y Ley de Contrato de Trabajo",
        fuenteUrl: AGUINALDO_FUENTES.ley23041.url,
      }),
    ],
  };

  return (
    <article className="space-y-10">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Aguinaldo: ¿bruto o neto? Cuánto te queda en mano
        </h1>
        <p className="text-zinc-600">
          En corto: <strong>el aguinaldo se calcula en bruto y se cobra en neto</strong>. La cuota
          es el 50% de tu mejor sueldo bruto del semestre, y a ese monto se le descuenta un{" "}
          <strong>17% de aportes</strong> (jubilación, PAMI y obra social), igual que a un sueldo.
          En mano te queda <strong>cerca del 41,5% de tu mejor sueldo bruto</strong>.
        </p>
        <p className="text-sm text-zinc-500">
          Actualizado al {ACTUALIZADO_EL} · segunda cuota 2026: vence el 18 de diciembre.
        </p>
      </header>

      <RespuestaPrimero actualizado={ACTUALIZADO_EL}>
        <p>
          El aguinaldo <strong>se calcula en bruto y se cobra en neto</strong>. La cuota es el{" "}
          <strong>50% de tu mejor sueldo bruto</strong> del semestre (Ley 23.041), y se le
          descuenta el <strong>17% de aportes</strong> (11% jubilación + 3% PAMI + 3% obra social),
          igual que a un sueldo. En mano queda{" "}
          <strong>cerca del 41,5% de tu mejor sueldo bruto</strong> (atajo: mejor sueldo × 0,415).
          Si tu sueldo es alto, también pueden descontarte cuota sindical y Ganancias. Buscá tu caso
          en la tabla de abajo o calculá el proporcional exacto en la{" "}
          <Link href="/aguinaldo">calculadora de aguinaldo</Link>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Tabla: aguinaldo bruto y en mano según tu sueldo
        </h2>
        <p className="text-zinc-600">
          Es una estimación con los aportes de ley (17%), sin Ganancias ni cuota sindical. Buscá
          tu mejor sueldo bruto del semestre:
        </p>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full min-w-[520px] text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-zinc-600">
                <th className="px-4 py-3 font-semibold">Mejor sueldo bruto</th>
                <th className="px-4 py-3 font-semibold">Aguinaldo bruto (50%)</th>
                <th className="px-4 py-3 font-semibold">Aportes (17%)</th>
                <th className="px-4 py-3 font-semibold">En mano</th>
              </tr>
            </thead>
            <tbody>
              {SUELDOS_TABLA.map((sueldo) => {
                const bruto = sueldo / 2;
                const aportes = bruto * TOTAL_APORTES;
                return (
                  <tr key={sueldo} className="border-b border-zinc-100 last:border-0">
                    <td className="px-4 py-2.5 font-medium text-zinc-900">
                      {formatARS(sueldo, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-zinc-700">{formatARS(bruto, 0)}</td>
                    <td className="px-4 py-2.5 text-zinc-500">−{formatARS(aportes, 0)}</td>
                    <td className="px-4 py-2.5 font-semibold text-emerald-700">
                      {formatARS(sueldo * FACTOR_EN_MANO, 0)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400">
          Por encima de la base imponible máxima de aportes, el descuento del 17% deja de crecer
          (es un tope legal), y en esos sueldos suele haber retención de Ganancias. Ahí la
          estimación es menos precisa: mirá{" "}
          <Link href="/blog/aguinaldo-paga-ganancias" className="text-emerald-700 underline">
            si tu aguinaldo paga Ganancias
          </Link>
          . ¿Trabajaste solo parte del semestre? Usá la{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            calculadora de aguinaldo
          </Link>{" "}
          para el proporcional exacto. Para tu sueldo de todos los meses, está la{" "}
          <Link href="/sueldo-neto" className="text-emerald-700 underline">
            calculadora de sueldo neto
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La cuenta, paso a paso</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Con un mejor sueldo bruto de <strong>$1.500.000</strong>:
          </p>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              <strong>Aguinaldo bruto:</strong> $1.500.000 ÷ 2 = <strong>$750.000</strong> (50%
              de la mayor remuneración mensual del semestre, Ley 23.041).
            </li>
            <li>
              <strong>Aportes (17%):</strong> $750.000 × 0,17 = <strong>$127.500</strong>{" "}
              (jubilación 11% + PAMI 3% + obra social 3%).
            </li>
            <li>
              <strong>En mano:</strong> $750.000 − $127.500 = <strong>$622.500</strong>.
            </li>
          </ol>
          <p className="rounded-xl bg-white p-4 font-medium text-zinc-800 shadow-sm">
            Atajo: aguinaldo en mano ≈ mejor sueldo bruto × 0,415
          </p>
        </div>
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
          <li>
            •{" "}
            <a
              href={AGUINALDO_FUENTES.ley23041.url}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              {AGUINALDO_FUENTES.ley23041.nombre}
            </a>
          </li>
          <li>
            •{" "}
            <a
              href={AGUINALDO_FUENTES.lct.url}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              {AGUINALDO_FUENTES.lct.nombre}
            </a>
          </li>
          <li>
            •{" "}
            <a
              href="https://www.afip.gob.ar/gananciasYBienes/ganancias/personas-humanas-sucesiones-indivisas/empleados-jubilados/conceptos-basicos.asp"
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              ARCA: Ganancias para empleados, deducciones y tablas vigentes
            </a>
          </li>
        </ul>
        <p className="text-xs text-zinc-400">
          Última verificación: {ACTUALIZADO_EL}. Calculá tu caso exacto con la{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            calculadora de aguinaldo
          </Link>{" "}
          y mirá{" "}
          <Link href="/plazo-fijo" className="text-emerald-700 underline">
            cuánto rinde si lo ahorrás
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
