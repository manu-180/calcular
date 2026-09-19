import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { FirmaAutor } from "@/components/FirmaAutor";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { PlanillaComercioCTA } from "@/components/PlanillaComercioCTA";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { COMERCIO_FUENTES } from "@/data/convenios/comercio";

export const metadata: Metadata = {
  title: "Cómo liquidar el sueldo de un empleado de comercio 2026 (paso a paso)",
  description:
    "Guía práctica para liquidar un sueldo del CCT 130/75: básico por categoría, los $120.000 no remunerativos, antigüedad, presentismo, jornada parcial y descuentos. Con un ejemplo real de junio 2026 y la escala oficial de FAECYS.",
  alternates: { canonical: "/blog/como-liquidar-sueldo-empleado-de-comercio" },
  openGraph: {
    type: "article",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Cómo liquidar un sueldo de Comercio 2026")}&s=${encodeURIComponent("Paso a paso, con ejemplo real y escala oficial CCT 130/75")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const PUBLICADO = "15 de junio de 2026";

const pasos = [
  {
    n: 1,
    titulo: "Identificá la categoría y tomá el básico del mes",
    cuerpo:
      "El CCT 130/75 agrupa al personal en Maestranza, Administrativos (A–F), Cajeros (A–C), Auxiliares, Auxiliares especializados y Vendedores (A–D). La categoría figura en el recibo. Con la categoría y el mes, buscás el básico de convenio en la escala oficial de FAECYS. La más común en locales es Vendedor B.",
  },
  {
    n: 2,
    titulo: "Sumá las sumas no remunerativas del mes",
    cuerpo:
      "Hasta junio de 2026 todas las categorías cobran $120.000 no remunerativos por mes ($100.000 prorrogados de 2025 + $20.000 del acuerdo de marzo). No es un bono de pago único: se cobra cada mes. En julio de 2026 esos $120.000 se incorporan al básico y dejan de figurar como suma aparte.",
  },
  {
    n: 3,
    titulo: "Calculá la antigüedad (1% por año)",
    cuerpo:
      "Es el 1% del sueldo por cada año cumplido en la empresa (art. 24 del CCT). Ojo, el dato que más se equivoca: por instrucción expresa de FAECYS, la antigüedad se aplica sobre el básico Y sobre las sumas no remunerativas. Con 10 años, sumás un 10% sobre el total (básico + $120.000).",
  },
  {
    n: 4,
    titulo: "Agregá el presentismo (8,33%) si corresponde",
    cuerpo:
      "Es la asignación por asistencia y puntualidad del art. 40: una doceava parte (8,33%) de la remuneración del mes, incluida la antigüedad y las sumas no remunerativas. Se pierde con más de una ausencia injustificada en el mes; enfermedad, vacaciones y licencias legales no cuentan.",
  },
  {
    n: 5,
    titulo: "Ajustá por jornada si es a tiempo parcial",
    cuerpo:
      "La jornada completa del sector es de 8 horas. Si el empleado trabaja 6 horas cobra el 75% (básico y no remunerativo proporcionales), y con 4 horas el 50%. La antigüedad y el presentismo se calculan sobre esas cifras ya proporcionadas.",
  },
  {
    n: 6,
    titulo: "Restá los aportes para llegar al neto",
    cuerpo:
      "Del sueldo remunerativo se descuenta el 17% de aportes de ley (11% jubilación + 3% PAMI + 3% obra social). Las sumas no remunerativas solo descuentan el 3% de obra social (OSECAC) — por eso «rinden» más en mano. Aparte pueden ir la cuota sindical (2% si está afiliado) y, en sueldos altos, Ganancias.",
  },
];

const errores = [
  {
    q: "Confundir el bono de $20.000 con los $120.000",
    a: "Las dos cifras existen: el acuerdo de marzo creó $20.000 nuevos por mes (abr–jun) y prorrogó los $100.000 que venían de 2025. El total no remunerativo que se cobra cada mes es $120.000, no $20.000.",
  },
  {
    q: "Aplicar la antigüedad solo sobre el básico",
    a: "La circular de FAECYS es explícita: la antigüedad se calcula sobre el básico más las sumas no remunerativas. Liquidarla solo sobre el básico paga de menos.",
  },
  {
    q: "Descontar el 17% sobre todo el bruto",
    a: "Las sumas no remunerativas solo descuentan el 3% de obra social, no el 17%. Aplicar el 17% sobre los $120.000 da un neto equivocado (más bajo del que corresponde).",
  },
  {
    q: "Olvidar que en julio cambia la estructura",
    a: "Desde julio de 2026 los $120.000 se incorporan al básico: ya no hay suma no remunerativa separada y todo el sueldo vuelve a ser remunerativo (con aportes completos).",
  },
];

const faqs = [
  {
    q: "¿Cuánto cobra un empleado de comercio en junio de 2026?",
    a: "Para Vendedor B (la categoría más común en locales), jornada completa y sin antigüedad: $1.153.746 de básico + $120.000 no remunerativos = $1.273.746 brutos; con presentismo sube a $1.379.892, y en mano quedan aproximadamente $1.163.510 antes de cuota sindical y Ganancias. Las demás categorías van de $1.113.585 (Maestranza A) a $1.179.445 (Vendedor D / Administrativo F) de básico, siempre más los $120.000.",
  },
  {
    q: "¿Qué necesito para liquidar un sueldo de comercio?",
    a: "La categoría del convenio, el mes a liquidar, los años de antigüedad, la jornada y si corresponde el presentismo. Con eso y la escala oficial de FAECYS armás el bruto; restando los aportes (17% sobre lo remunerativo y 3% sobre lo no remunerativo) llegás al neto.",
  },
  {
    q: "¿La planilla o calculadora reemplaza a un contador?",
    a: "No. Son herramientas de cálculo y verificación. Para emitir recibos de sueldo oficiales de una empresa conviene un contador matriculado o un sistema de liquidación habilitado. Sirven para estimar, controlar que el recibo esté bien y liquidar más rápido mes a mes.",
  },
  {
    q: "¿Cada cuánto cambia la escala de comercio?",
    a: "Suele cambiar cada 2–4 meses por las paritarias. El acuerdo vigente además fijó una revisión en junio de 2026 según la inflación. Por eso conviene trabajar siempre con la escala del mes que estás liquidando, no con una vieja.",
  },
];

export default function Post() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Cómo liquidar el sueldo de un empleado de comercio 2026 (paso a paso)",
        descripcion:
          "Guía práctica para liquidar un sueldo del CCT 130/75 con la escala oficial de FAECYS: básico, sumas no remunerativas, antigüedad, presentismo, jornada parcial y descuentos, con un ejemplo real de junio 2026.",
        url: "/blog/como-liquidar-sueldo-empleado-de-comercio",
        modificado: "2026-06-15",
        publicado: "2026-06-15",
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
    <article className="space-y-8">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <p className="text-xs text-zinc-400">
          Guías · <FirmaAutor prefijo="por" /> · {PUBLICADO} · datos verificados al {PUBLICADO}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Cómo liquidar el sueldo de un empleado de comercio en 2026, paso a paso
        </h1>
        <p className="text-zinc-600">
          Liquidar un sueldo del CCT 130/75 (Empleados de Comercio) es sumar bien cinco cosas y
          restar los aportes. Acá está el método completo, con un ejemplo real de junio de 2026 y
          la escala oficial de FAECYS — sin depender de blogs desactualizados.
        </p>
      </header>

      <RespuestaPrimero actualizado={PUBLICADO}>
        <p>
          Para liquidar un sueldo de comercio: <strong>1)</strong> tomá el básico de la categoría
          según la escala oficial del mes; <strong>2)</strong> sumá los{" "}
          <strong>$120.000 no remunerativos</strong> (hasta junio 2026); <strong>3)</strong> sumá la
          antigüedad (1% por año, sobre básico + no remunerativo); <strong>4)</strong> sumá el
          presentismo (8,33%) si corresponde; <strong>5)</strong> ajustá por jornada. Después restás
          los aportes: <strong>17% sobre lo remunerativo y solo 3% sobre lo no remunerativo</strong>.
          Ejemplo: un Vendedor B de junio 2026 sin antigüedad cobra{" "}
          <strong>$1.273.746 brutos</strong> ($1.379.892 con presentismo) y ≈ $1.163.510 en mano.
        </p>
      </RespuestaPrimero>

      <p className="text-zinc-600">
        ¿Querés el número ya, sin hacer la cuenta a mano? Poné la categoría y el mes en la{" "}
        <Link href="/convenios/comercio" className="text-emerald-700 underline">
          calculadora de sueldo de comercio
        </Link>{" "}
        (gratis). Abajo está el método completo para entender de dónde sale cada peso.
      </p>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">El método en 6 pasos</h2>
        <ol className="space-y-4">
          {pasos.map((p) => (
            <li key={p.n} className="flex gap-4">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                {p.n}
              </div>
              <div>
                <p className="font-semibold text-zinc-900">{p.titulo}</p>
                <p className="mt-0.5 text-sm text-zinc-600">{p.cuerpo}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="rounded-xl bg-white p-4 text-sm font-medium text-zinc-800 shadow-sm">
          La fórmula corta: <strong>Bruto = (básico + $120.000) × (1 + 1% × años de antigüedad) ×
          (1 + 8,33% si cobra presentismo)</strong>, proporcional a la jornada. El neto resta 17%
          sobre lo remunerativo y 3% sobre los $120.000.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Ejemplo completo: Vendedor B, junio 2026
        </h2>
        <p className="text-zinc-600">
          Jornada completa, sin antigüedad, cobrando presentismo. Los básicos salen de la circular
          oficial de FAECYS del 7/4/2026:
        </p>
        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full min-w-[420px] text-sm">
            <tbody className="text-zinc-700">
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5">Básico convencional (Vendedor B, junio)</td>
                <td className="px-4 py-2.5 text-right font-medium text-zinc-900">$1.153.746</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5">+ Sumas no remunerativas del mes</td>
                <td className="px-4 py-2.5 text-right font-medium text-zinc-900">$120.000</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5">= Subtotal (sin presentismo)</td>
                <td className="px-4 py-2.5 text-right font-medium text-zinc-900">$1.273.746</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5">+ Presentismo (8,33%)</td>
                <td className="px-4 py-2.5 text-right font-medium text-zinc-900">$106.146</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5 font-semibold text-zinc-900">= Bruto</td>
                <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">$1.379.892</td>
              </tr>
              <tr>
                <td className="px-4 py-2.5">≈ En mano (tras aportes 17%/3%)</td>
                <td className="px-4 py-2.5 text-right font-semibold text-emerald-700">
                  ≈ $1.163.510
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400">
          Si el empleado tuviera, por ejemplo, 10 años de antigüedad, se suma un 10% sobre (básico +
          $120.000) antes del presentismo. Para cualquier categoría, mes o antigüedad, el número
          exacto lo da la{" "}
          <Link href="/convenios/comercio" className="text-emerald-700 underline">
            calculadora
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los 4 errores que más se cometen</h2>
        <div className="space-y-3">
          {errores.map((e) => (
            <div key={e.q} className="rounded-xl border border-zinc-200 bg-white p-4">
              <p className="font-semibold text-zinc-900">{e.q}</p>
              <p className="mt-1 text-sm text-zinc-600">{e.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Si liquidás todos los meses</h2>
        <p className="text-zinc-600">
          La calculadora resuelve un sueldo puntual. Pero si liquidás varios empleados o lo hacés
          todos los meses, lo que cansa es <strong>volver a buscar la escala nueva cada paritaria</strong>{" "}
          y rehacer la planilla. Para eso armamos la planilla de Excel/Google Sheets con la escala
          oficial embebida y actualización garantizada con cada acuerdo: ponés categoría, mes y
          jornada, y tenés el bruto y el neto desglosados — los mismos números que esta guía.
        </p>
      </section>

      {/* CTA al producto pago, enmarcado para quien liquida */}
      <PlanillaComercioCTA />

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-zinc-200 bg-white p-4 open:shadow-sm"
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
          {[COMERCIO_FUENTES.escalas, COMERCIO_FUENTES.acuerdo, COMERCIO_FUENTES.cct].map((f) => (
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
          Última verificación: {PUBLICADO}. Calculá un sueldo puntual en la{" "}
          <Link href="/convenios/comercio" className="text-emerald-700 underline">
            calculadora de comercio
          </Link>
          , o mirá la{" "}
          <Link href="/planillas" className="text-emerald-700 underline">
            planilla para liquidar todos los meses
          </Link>
          . ¿Tu paritaria le gana al IPC? Velo en la{" "}
          <Link href="/inflacion" className="text-emerald-700 underline">
            calculadora de inflación
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
