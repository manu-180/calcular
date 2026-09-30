import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { FirmaAutor } from "@/components/FirmaAutor";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { PlanillaComercioCTA } from "@/components/PlanillaComercioCTA";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  COMERCIO_FUENTES,
  COMERCIO_APORTES_NO_REM,
} from "@/data/convenios/comercio";
import { calcularComercio } from "@/lib/convenios";
import { formatARS } from "@/lib/formato";
import { DECRETO_407, RECIBO_SECCIONES, RECIBO_RUBROS_COSTO } from "@/data/recibo-sueldo";

export const metadata: Metadata = {
  title: "Modelo de recibo de sueldo de Empleado de Comercio 2026 (nuevo formato)",
  description:
    "Cómo es el recibo de sueldo de Comercio (CCT 130/75) con el nuevo formato del Decreto 407/2026: las 4 secciones obligatorias, el resumen del costo laboral y un modelo con números reales de junio 2026 según la escala oficial de FAECYS.",
  alternates: { canonical: "/blog/modelo-recibo-de-sueldo-empleado-de-comercio" },
  openGraph: {
    type: "article",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Modelo de recibo de sueldo de Comercio 2026")}&s=${encodeURIComponent("El nuevo formato del Decreto 407/2026, con un ejemplo real")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const PUBLICADO = "15 de junio de 2026";

const faqs = [
  {
    q: "¿Qué cambió en el recibo de sueldo en 2026?",
    a: "Desde el 1 de junio de 2026, el Decreto 407/2026 (que reglamenta la Ley 27.802 de Modernización Laboral) cambió el modelo del recibo. Ahora se estructura en 4 secciones y, además del sueldo del trabajador, debe mostrar un resumen del costo laboral total que asume el empleador (contribuciones patronales discriminadas). El objetivo es dar más transparencia a cuánto cuesta realmente un puesto de trabajo.",
  },
  {
    q: "¿Qué datos no pueden faltar en un recibo de comercio?",
    a: "Según el art. 140 de la LCT con la redacción del Decreto 407/2026: datos del empleador (CUIT) y del trabajador (CUIL, fecha de ingreso, antigüedad y categoría); el detalle de las contribuciones a cargo del empleador; la remuneración bruta con su determinación y las deducciones; y la remuneración neta. En Comercio, además, deben verse por separado el básico de convenio, las sumas no remunerativas, la antigüedad y el presentismo.",
  },
  {
    q: "¿Cuánto cobra un Vendedor B de comercio en junio de 2026?",
    a: "Jornada completa y sin antigüedad: $1.153.746 de básico + $120.000 no remunerativos = $1.273.746 brutos; con presentismo (8,33%) sube a $1.379.892, y en mano quedan aproximadamente $1.163.510 antes de cuota sindical y Ganancias. El número exacto para cualquier categoría y antigüedad lo da la calculadora de comercio.",
  },
  {
    q: "¿Por qué el descuento no es el 17% sobre todo el bruto?",
    a: "Porque las sumas no remunerativas ($120.000 hasta junio 2026) solo aportan el 3% de obra social, no el 17% completo. El 17% (11% jubilación + 3% PAMI + 3% obra social) se aplica únicamente sobre la parte remunerativa. Por eso lo no remunerativo «rinde» más en mano.",
  },
  {
    q: "¿Este modelo sirve para emitir recibos oficiales?",
    a: "Es un modelo de referencia para entender y controlar el recibo. Para emitir recibos de sueldo oficiales de una empresa conviene un contador matriculado o un sistema de liquidación habilitado. La planilla y la calculadora sirven para estimar, verificar que el recibo esté bien y liquidar más rápido mes a mes.",
  },
];

export default function Post() {
  // Ejemplo computado (no hardcodeado): Vendedor B, junio 2026, jornada completa, sin
  // antigüedad, con presentismo. Los mismos números que la calculadora y el resto del sitio.
  const r = calcularComercio({
    mesId: "junio-2026",
    categoriaId: "vendedor-b",
    aniosAntiguedad: 0,
    jornadaFactor: 1,
    conPresentismo: true,
  })!;

  // Desglose de las deducciones del trabajador (alícuotas de ley estables: SIPA 11% + PAMI 3%
  // + OSECAC 3% sobre lo remunerativo; OSECAC 3% sobre lo no remunerativo). El total coincide
  // con r.descuentos, que es lo que valida la suite de checks del convenio.
  const dedJubilacion = r.totalRemunerativo * 0.11;
  const dedPami = r.totalRemunerativo * 0.03;
  const dedObraSocialRem = r.totalRemunerativo * 0.03;
  const dedObraSocialNoRem = r.totalNoRemunerativo * COMERCIO_APORTES_NO_REM;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Modelo de recibo de sueldo de Empleado de Comercio 2026 (nuevo formato)",
        descripcion:
          "El recibo de sueldo de Comercio (CCT 130/75) con el formato del Decreto 407/2026: las 4 secciones obligatorias, el resumen del costo laboral y un modelo con números reales de junio 2026 según la escala oficial de FAECYS.",
        url: "/blog/modelo-recibo-de-sueldo-empleado-de-comercio",
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
          Modelo de recibo de sueldo de Empleado de Comercio 2026
        </h1>
        <p className="text-zinc-600">
          Desde junio de 2026 el recibo de sueldo cambió de formato. Acá tenés cómo queda el de un
          Empleado de Comercio (CCT 130/75) con el nuevo modelo del Decreto 407/2026: qué secciones
          lleva, qué se agregó, y un recibo de ejemplo con números reales de junio 2026 según la
          escala oficial de FAECYS.
        </p>
      </header>

      <RespuestaPrimero actualizado={PUBLICADO}>
        <p>
          El recibo de sueldo de Comercio debe tener, según el <strong>Decreto 407/2026</strong>{" "}
          (vigente desde el 1/6/2026), <strong>cuatro secciones</strong>: (a) datos del empleador y
          del trabajador (con categoría y antigüedad); (b) las contribuciones a cargo del empleador;
          (c) la remuneración bruta y las deducciones; y (d) el neto. La novedad es que ahora también
          debe mostrar un <strong>resumen del costo laboral total</strong> que paga el empleador. En
          Comercio, el cuerpo del recibo separa el básico de convenio, los $120.000 no remunerativos,
          la antigüedad (1%/año) y el presentismo (8,33%). Ejemplo: un Vendedor B de junio 2026 sin
          antigüedad cobra <strong>{formatARS(r.bruto, 0)} brutos</strong> y{" "}
          <strong>≈ {formatARS(r.neto, 0)} en mano</strong>.
        </p>
      </RespuestaPrimero>

      <p className="text-zinc-600">
        ¿Querés el número de tu categoría sin armar el recibo a mano? Ponés categoría, mes y
        antigüedad en la{" "}
        <Link href="/convenios/comercio" className="text-emerald-700 underline">
          calculadora de sueldo de comercio
        </Link>{" "}
        (gratis). Para entender cómo se calcula cada peso, está la guía de{" "}
        <Link
          href="/blog/como-liquidar-sueldo-empleado-de-comercio"
          className="text-emerald-700 underline"
        >
          cómo liquidar un sueldo de comercio paso a paso
        </Link>
        .
      </p>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Qué cambió en 2026: el Decreto 407/2026</h2>
        <p className="text-zinc-600">
          El{" "}
          <a
            href={DECRETO_407.texto}
            rel="nofollow noopener"
            target="_blank"
            className="text-emerald-700 underline"
          >
            Decreto 407/2026
          </a>{" "}
          (B.O. 1/6/2026) reglamentó la Ley 27.802 de Modernización Laboral y redefinió el modelo del
          recibo de haberes del artículo 140 de la LCT. El recibo ahora debe estructurarse en{" "}
          <strong>cuatro secciones claramente diferenciadas</strong>:
        </p>
        <ol className="space-y-3">
          {RECIBO_SECCIONES.map((s) => (
            <li key={s.letra} className="flex gap-4">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                {s.letra}
              </div>
              <div>
                <p className="font-semibold text-zinc-900">{s.titulo}</p>
                <p className="mt-0.5 text-sm text-zinc-600">{s.cuerpo}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="rounded-xl bg-white p-4 text-sm font-medium text-zinc-800 shadow-sm">
          La novedad de fondo: el recibo dejó de mostrar solo lo que cobra el empleado. Ahora también
          expone, en el anverso, un <strong>resumen de la composición total del costo laboral</strong>{" "}
          a cargo del empleador — para que se vea cuánto cuesta el puesto completo, no solo el sueldo.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Modelo de recibo: Vendedor B, junio 2026
        </h2>
        <p className="text-zinc-600">
          Un ejemplo armado con el nuevo formato. Jornada completa, sin antigüedad, cobrando
          presentismo. Los básicos salen de la circular oficial de FAECYS; los importes los calcula
          la misma lógica que la calculadora del sitio (no son números cargados a mano).
        </p>

        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          {/* Sección A — datos */}
          <div className="border-b border-zinc-100 bg-zinc-50 px-4 py-3 text-xs text-zinc-500">
            <p className="font-semibold uppercase tracking-wide text-zinc-600">
              a) Empleador y trabajador
            </p>
            <p className="mt-1">
              Empleador: (razón social) · CUIT (xx-xxxxxxxx-x) — Trabajador: (nombre) · CUIL
              (xx-xxxxxxxx-x) · Ingreso (dd/mm/aaaa) · Antigüedad: 0 años · Categoría:{" "}
              <span className="font-medium text-zinc-700">Vendedor B — CCT 130/75</span>
            </p>
          </div>

          {/* Sección C — haberes */}
          <div className="px-4 pt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              c) Haberes
            </p>
          </div>
          <table className="w-full min-w-[460px] text-sm">
            <tbody className="text-zinc-700">
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5">Sueldo básico (Vendedor B)</td>
                <td className="px-4 py-2.5 text-right text-xs text-zinc-400">Remunerativo</td>
                <td className="px-4 py-2.5 text-right font-medium text-zinc-900">
                  {formatARS(r.basico)}
                </td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5">Presentismo (8,33%)</td>
                <td className="px-4 py-2.5 text-right text-xs text-zinc-400">Remunerativo</td>
                <td className="px-4 py-2.5 text-right font-medium text-zinc-900">
                  {formatARS(r.presentismoRem)}
                </td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5">Suma no remunerativa (acuerdo)</td>
                <td className="px-4 py-2.5 text-right text-xs text-zinc-400">No remunerativo</td>
                <td className="px-4 py-2.5 text-right font-medium text-zinc-900">
                  {formatARS(r.noRemunerativo)}
                </td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5">Presentismo s/ no remunerativo (8,33%)</td>
                <td className="px-4 py-2.5 text-right text-xs text-zinc-400">No remunerativo</td>
                <td className="px-4 py-2.5 text-right font-medium text-zinc-900">
                  {formatARS(r.presentismoNoRem)}
                </td>
              </tr>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <td className="px-4 py-2.5 font-semibold text-zinc-900" colSpan={2}>
                  Total bruto
                </td>
                <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                  {formatARS(r.bruto)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Deducciones */}
          <div className="px-4 pt-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Deducciones
            </p>
          </div>
          <table className="w-full min-w-[460px] text-sm">
            <tbody className="text-zinc-700">
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5">Jubilación (11% s/ remunerativo)</td>
                <td className="px-4 py-2.5 text-right text-rose-600">
                  − {formatARS(dedJubilacion)}
                </td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5">Ley 19.032 — PAMI (3% s/ remunerativo)</td>
                <td className="px-4 py-2.5 text-right text-rose-600">− {formatARS(dedPami)}</td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5">Obra social OSECAC (3% s/ remunerativo)</td>
                <td className="px-4 py-2.5 text-right text-rose-600">
                  − {formatARS(dedObraSocialRem)}
                </td>
              </tr>
              <tr className="border-b border-zinc-100">
                <td className="px-4 py-2.5">Obra social OSECAC (3% s/ no remunerativo)</td>
                <td className="px-4 py-2.5 text-right text-rose-600">
                  − {formatARS(dedObraSocialNoRem)}
                </td>
              </tr>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <td className="px-4 py-2.5 font-semibold text-zinc-900">Total deducciones</td>
                <td className="px-4 py-2.5 text-right font-semibold text-rose-700">
                  − {formatARS(r.descuentos)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Sección D — neto */}
          <div className="flex items-center justify-between bg-emerald-50 px-4 py-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
              d) Neto a cobrar
            </p>
            <p className="text-lg font-bold text-emerald-700">{formatARS(r.neto)}</p>
          </div>
        </div>

        <p className="text-xs text-zinc-400">
          Importes ilustrativos para una jornada completa sin antigüedad. Con antigüedad se suma 1%
          por año sobre el básico y las sumas no remunerativas, antes del presentismo. No incluye
          cuota sindical (2% si está afiliado) ni Ganancias. El número exacto de tu caso lo da la{" "}
          <Link href="/convenios/comercio" className="text-emerald-700 underline">
            calculadora
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">El nuevo resumen del costo laboral</h2>
        <p className="text-zinc-600">
          Además del sueldo del trabajador, el recibo ahora incluye un resumen de lo que paga el
          empleador por encima de ese sueldo. El Decreto 407/2026 pide discriminar el costo laboral,
          como mínimo, en estos rubros:
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {RECIBO_RUBROS_COSTO.map((rubro) => (
            <li
              key={rubro}
              className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              {rubro}
            </li>
          ))}
        </ul>
        <p className="text-xs text-zinc-400">
          Las alícuotas de las contribuciones patronales dependen del Decreto 814/2001 y de la
          actividad de la empresa, por eso no las fijamos acá: el monto exacto lo determina cada
          empleador o su contador. Lo que el recibo nuevo garantiza es que esos conceptos figuren
          discriminados.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Si liquidás todos los meses</h2>
        <p className="text-zinc-600">
          Armar el recibo una vez es fácil. Lo que cansa es{" "}
          <strong>volver a buscar la escala nueva cada paritaria</strong> y rehacer los números para
          cada categoría. Para eso armamos la planilla de Excel/Google Sheets con la escala oficial
          de Comercio embebida y actualización garantizada con cada acuerdo: ponés categoría, mes y
          jornada, y tenés el bruto y el neto desglosados — los mismos importes que este modelo, que
          después pasás al recibo.
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
              href={DECRETO_407.bo}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              {DECRETO_407.nombre}
            </a>
          </li>
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
          .
        </p>
      </section>
    </article>
  );
}
