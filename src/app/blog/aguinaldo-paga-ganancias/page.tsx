import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { FirmaAutor } from "@/components/FirmaAutor";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { ORGANIZACION, articleSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "¿El aguinaldo paga impuesto a las Ganancias en 2026?",
  description:
    "Solo si tu sueldo es alto — y no se retiene todo junto en junio: el SAC se prorratea mes a mes. Desde qué sueldo te alcanza Ganancias y cómo verlo en tu recibo.",
  alternates: { canonical: "/blog/aguinaldo-paga-ganancias" },
  openGraph: {
    type: "article",
    images: [
      {
        url: `/og?t=${encodeURIComponent("¿El aguinaldo paga Ganancias?")}&s=${encodeURIComponent("Solo en sueldos altos, y prorrateado mes a mes. La explicación con fuentes.")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const PUBLICADO = "12 de junio de 2026";

const faqs = [
  {
    q: "¿Me descuentan Ganancias del aguinaldo en junio?",
    a: "No todo junto. El régimen de retención prorratea una doceava parte del SAC en cada mes del año, así que el impacto del aguinaldo ya viene repartido en tus recibos. En junio podés ver una retención algo mayor, pero no el impuesto de toda la cuota de una sola vez.",
  },
  {
    q: "¿Desde qué sueldo se paga Ganancias en 2026?",
    a: "Con las deducciones del período enero-junio 2026 publicadas por ARCA, un empleado soltero sin deducciones extra empieza a sufrir retenciones con sueldos brutos de alrededor de $3.000.000 mensuales; con cónyuge e hijos a cargo el piso es más alto. El número exacto depende de tus deducciones cargadas en el SIRADIG.",
  },
  {
    q: "¿El aguinaldo de los jubilados paga Ganancias?",
    a: "Los jubilados tienen su propio esquema de deducciones (deducción específica). Solo los haberes más altos quedan alcanzados; la enorme mayoría de las jubilaciones no sufre retención por el medio aguinaldo.",
  },
  {
    q: "¿Cómo sé si me retuvieron bien?",
    a: "Mirá en tu recibo el concepto 'Retención Impuesto a las Ganancias' y compará tus deducciones con lo que declaraste en SIRADIG (F.572 web). Si te retuvieron de más, la devolución llega con la liquidación anual (abril-mayo del año siguiente) o al actualizar el SIRADIG.",
  },
];

export default function Post() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "¿El aguinaldo paga impuesto a las Ganancias en 2026?",
        descripcion:
          "El aguinaldo es ganancia gravada, pero solo lo sienten los sueldos altos y no se retiene todo junto en junio: el SAC se prorratea mes a mes durante el año.",
        url: "/blog/aguinaldo-paga-ganancias",
        publicado: "2026-06-12",
        modificado: "2026-06-20",
      }),
    ],
  };

  return (
    <article className="space-y-8">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <p className="text-xs text-zinc-400">
          Guías · <FirmaAutor prefijo="por" /> · {PUBLICADO} · datos verificados al {PUBLICADO}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          ¿El aguinaldo paga impuesto a las Ganancias en 2026?
        </h1>
        <p className="text-zinc-600">
          Respuesta corta: <strong>el aguinaldo es ganancia gravada, pero solo lo sienten los
          sueldos altos</strong> — con las deducciones de enero-junio 2026, la retención
          aparece alrededor de los $3.000.000 brutos mensuales para un soltero sin deducciones.
          Y no se descuenta todo junto en junio: se prorratea durante el año.
        </p>
      </header>

      <RespuestaPrimero actualizado={PUBLICADO}>
        <p>
          <strong>El aguinaldo sí es ganancia gravada, pero solo lo pagan los sueldos altos.</strong>{" "}
          Con las deducciones de enero-junio 2026 (tablas de ARCA), un soltero sin deducciones
          recién empieza a sufrir retención alrededor de los <strong>$3.000.000 brutos
          mensuales</strong>; con cónyuge e hijos a cargo el piso sube. Y no te lo descuentan todo
          junto en junio: el régimen <strong>prorratea una doceava parte del SAC en cada mes</strong>,
          así que el impacto ya viene repartido en tus recibos. ¿Cuánto te queda del aguinaldo en
          mano? Mirá la tabla en{" "}
          <Link href="/aguinaldo/neto">aguinaldo: bruto o neto</Link>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cómo funciona el prorrateo del SAC</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            El régimen de retención para empleados establece que el empleador compute{" "}
            <strong>una doceava parte del aguinaldo en cada mes del año</strong>, en lugar de
            sumar toda la cuota al sueldo de junio o diciembre. El objetivo es que el SAC no te
            &laquo;dispare&raquo; de tramo en la escala del impuesto justo el mes que lo
            cobrás.
          </p>
          <p>
            En la práctica: si estás alcanzado por Ganancias, una parte del impuesto de tu
            aguinaldo ya se viene reteniendo mes a mes en tus recibos. En la liquidación anual
            (la hace tu empleador en abril-mayo del año siguiente) se ajusta cualquier
            diferencia entre lo retenido y lo que correspondía: si te retuvieron de más, hay
            devolución.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">¿Te alcanza a vos? La referencia rápida</h2>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full min-w-[480px] text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-zinc-600">
                <th className="px-4 py-3 font-semibold">Tu situación (ene-jun 2026)</th>
                <th className="px-4 py-3 font-semibold">¿Ganancias en el aguinaldo?</th>
              </tr>
            </thead>
            <tbody className="text-zinc-700">
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5">Sueldo bruto hasta ~$2.900.000</td>
                <td className="px-4 py-2.5">
                  <strong className="text-emerald-700">No</strong> — por debajo del piso, el SAC
                  no genera retención
                </td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5">Soltero sin deducciones, bruto ≈ $3.000.000+</td>
                <td className="px-4 py-2.5">
                  <strong className="text-amber-700">Probablemente sí</strong>, prorrateado mes a
                  mes
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">Con cónyuge e hijos cargados en SIRADIG</td>
                <td className="px-4 py-2.5">
                  El piso sube: las cargas de familia y deducciones corren el umbral hacia
                  arriba
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400">
          Los valores exactos surgen de las tablas semestrales de deducciones y escalas del art.
          94 que publica ARCA (se actualizan por IPC en enero y julio). El piso citado es una
          referencia para el período enero-junio 2026: tu caso depende de tus deducciones.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Y al revés: el aguinaldo de los plazos fijos no paga nada
        </h2>
        <p className="text-zinc-600">
          Dato aparte que confunde a muchos: si ponés tu aguinaldo en un plazo fijo, los{" "}
          <strong>intereses están exentos de Ganancias</strong> para personas humanas (art. 26
          inc. h de la ley, que desde los ejercicios 2026 ya no distingue moneda). Lo que
          ganás ahí no tributa ni se informa en el recibo.{" "}
          <Link href="/plazo-fijo" className="text-emerald-700 underline">
            Calculá cuánto rinde
          </Link>
          .
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
          <li>
            •{" "}
            <a
              href="https://www.afip.gob.ar/gananciasYBienes/ganancias/personas-humanas-sucesiones-indivisas/empleados-jubilados/conceptos-basicos.asp"
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              ARCA — Ganancias para empleados y jubilados: deducciones y tablas vigentes
            </a>
          </li>
          <li>
            •{" "}
            <a
              href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/332890/texact.htm"
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              Ley de Impuesto a las Ganancias, t.o. 2019 (texto actualizado, Infoleg)
            </a>
          </li>
        </ul>
        <p className="text-xs text-zinc-400">
          Última verificación: {PUBLICADO}. ¿Querés el número de tu aguinaldo? Usá la{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            calculadora de aguinaldo
          </Link>{" "}
          y mirá{" "}
          <Link href="/aguinaldo/neto" className="text-emerald-700 underline">
            cuánto queda en mano
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
