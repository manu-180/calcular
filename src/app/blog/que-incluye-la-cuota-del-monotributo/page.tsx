import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd } from "@/components/JsonLd";
import { FirmaAutor } from "@/components/FirmaAutor";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { CATEGORIAS, VIGENCIA } from "@/data/monotributo";
import { formatARS } from "@/lib/formato";

const PUBLICADO = "22 de junio de 2026";
const PUBLICADO_ISO = "2026-06-22";

const catA = CATEGORIAS[0];

const titulo = "Qué incluye la cuota del monotributo 2026 (con el desglose por categoría)";
const descripcion =
  "La cuota del monotributo no es solo un impuesto: incluye tres cosas — impuesto integrado (reemplaza IVA y Ganancias), aporte jubilatorio (SIPA) y obra social. Cuánto va a cada componente en 2026, categoría por categoría, con los valores oficiales de ARCA.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: "/blog/que-incluye-la-cuota-del-monotributo" },
  openGraph: {
    type: "article",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Qué incluye la cuota del monotributo")}&s=${encodeURIComponent("Impuesto, jubilación y obra social, categoría por categoría")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿La cuota del monotributo es solo un impuesto?",
    a: "No. La cuota tiene tres componentes: el impuesto integrado (que reemplaza al IVA y al impuesto a las Ganancias), el aporte jubilatorio al SIPA y el aporte a la obra social. Por eso con una sola cuota mensual quedás al día con el impuesto, tu jubilación y tu cobertura de salud.",
  },
  {
    q: "¿Cuánto de la cuota va a la jubilación?",
    a: `Depende de tu categoría. El aporte jubilatorio (SIPA) arranca en ${formatARS(catA.sipa, 0)} en la categoría A y sube en cada categoría: un 10% hasta la F, y un 40% desde la G en adelante. Es un componente fijo: no cambia entre prestación de servicios y venta de cosas muebles.`,
  },
  {
    q: "¿Por qué el monotributo de venta de cosas muebles paga menos?",
    a: "Porque el único componente que cambia entre actividades es el impuesto integrado: en venta de cosas muebles es más bajo que en prestación de servicios. La jubilación (SIPA) y la obra social son iguales para las dos. Por eso, a igual categoría, un comerciante paga una cuota total menor que un prestador de servicios.",
  },
  {
    q: "¿Puedo pagar solo una parte de la cuota?",
    a: "Hay casos donde algún componente no corresponde. Por ejemplo, un jubilado por la Ley 24.241 que sigue como monotributista no paga obra social (ya tiene PAMI), pero sí el aporte jubilatorio. En el Monotributo Social se paga el 50% del componente de obra social. Fuera de esos casos, la cuota se paga completa.",
  },
  {
    q: "¿La obra social del monotributo cubre a mi familia?",
    a: "El aporte obligatorio cubre solo al titular. Para sumar al grupo familiar hay un aporte optativo: cada adherente paga el mismo importe del componente de obra social que abona el titular. Ese monto se suma a la cuota base.",
  },
];

export default function Post() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo,
        descripcion,
        url: "/blog/que-incluye-la-cuota-del-monotributo",
        modificado: PUBLICADO_ISO,
        publicado: PUBLICADO_ISO,
      }),
    ],
  };

  return (
    <article className="space-y-8">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <p className="text-xs text-zinc-400">
          Guías · <FirmaAutor prefijo="por" /> · {PUBLICADO} · datos oficiales de ARCA verificados al {VIGENCIA.consultadoEl}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Qué incluye la cuota del monotributo
        </h1>
        <p className="text-zinc-600">
          Pagás una sola cuota por mes, pero ¿sabés qué estás pagando? La cuota del monotributo no
          es un solo impuesto: son tres cosas juntas. Acá está el desglose, categoría por categoría,
          con los valores oficiales de ARCA y la cuenta a la vista.
        </p>
      </header>

      <RespuestaPrimero actualizado={PUBLICADO}>
        <p>
          La cuota del monotributo incluye <strong>tres componentes</strong>: el{" "}
          <strong>impuesto integrado</strong> (que reemplaza al IVA y al impuesto a las Ganancias),
          el <strong>aporte jubilatorio</strong> con destino al SIPA y el aporte a la{" "}
          <strong>obra social</strong>. Por eso con un solo pago mensual quedás al día con el
          impuesto, tu jubilación y tu cobertura de salud. El único componente que cambia entre{" "}
          <strong>prestación de servicios</strong> y <strong>venta de cosas muebles</strong> es el
          impuesto integrado (más bajo en venta); la jubilación y la obra social son iguales para
          las dos.
        </p>
      </RespuestaPrimero>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Los tres componentes</h2>
        <div className="space-y-3">
          {[
            {
              t: "Impuesto integrado",
              d: "Reemplaza al IVA y al impuesto a las Ganancias en un solo monto fijo. Es el único componente que cambia según tu actividad: en venta de cosas muebles es más bajo que en prestación de servicios.",
              color: "bg-emerald-500",
            },
            {
              t: "Aporte jubilatorio (SIPA)",
              d: "Es tu aporte previsional obligatorio al Sistema Integrado Previsional Argentino. Sube un 10% en cada categoría hasta la F, y un 40% desde la G. Es igual para servicios y venta.",
              color: "bg-sky-500",
            },
            {
              t: "Obra social",
              d: "El aporte obligatorio al Sistema Nacional del Seguro de Salud, que te da cobertura de salud. Cubre al titular; sumar al grupo familiar tiene un costo optativo adicional por adherente.",
              color: "bg-violet-500",
            },
          ].map((c) => (
            <div key={c.t} className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-4">
              <span className={`mt-1.5 h-3 w-3 shrink-0 rounded-full ${c.color}`} />
              <div>
                <p className="font-semibold text-zinc-900">{c.t}</p>
                <p className="mt-0.5 text-sm text-zinc-600">{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Ejemplo: cómo se arma la cuota de la categoría A
        </h2>
        <p className="text-zinc-600">
          La categoría más baja (A), para prestación de servicios, se compone así en 2026:
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-zinc-100">
              <tr className="bg-white">
                <td className="px-4 py-2.5 text-zinc-700">Impuesto integrado</td>
                <td className="px-4 py-2.5 text-right text-zinc-700">
                  {formatARS(catA.impuestoServicios, 0)}
                </td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-2.5 text-zinc-700">Aporte jubilatorio (SIPA)</td>
                <td className="px-4 py-2.5 text-right text-zinc-700">{formatARS(catA.sipa, 0)}</td>
              </tr>
              <tr className="bg-white">
                <td className="px-4 py-2.5 text-zinc-700">Obra social</td>
                <td className="px-4 py-2.5 text-right text-zinc-700">
                  {formatARS(catA.obraSocial, 0)}
                </td>
              </tr>
              <tr className="bg-emerald-50 font-semibold">
                <td className="px-4 py-2.5 text-emerald-900">Cuota total (servicios)</td>
                <td className="px-4 py-2.5 text-right text-emerald-900">
                  {formatARS(catA.totalServicios, 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400">
          En venta de cosas muebles, la misma categoría A paga{" "}
          {formatARS(catA.impuestoVenta, 0)} de impuesto integrado (los otros dos componentes son
          iguales), con un total de {formatARS(catA.totalVenta, 0)}.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">
          El desglose completo por categoría (servicios)
        </h2>
        <p className="text-sm text-zinc-600">
          Lo que va a cada componente, en cada categoría, vigente desde {VIGENCIA.desde}. La cuota
          total de venta de cosas muebles es menor porque su impuesto integrado es más bajo.
        </p>
        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-xs text-zinc-500">
              <tr>
                <th className="px-3 py-2.5 text-left font-medium">Cat.</th>
                <th className="px-3 py-2.5 text-right font-medium">Impuesto</th>
                <th className="px-3 py-2.5 text-right font-medium">Jubilación</th>
                <th className="px-3 py-2.5 text-right font-medium">Obra social</th>
                <th className="px-3 py-2.5 text-right font-medium text-emerald-700">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {CATEGORIAS.map((c) => (
                <tr key={c.cat} className="bg-white hover:bg-zinc-50">
                  <td className="px-3 py-2.5 font-medium text-zinc-800">{c.cat}</td>
                  <td className="px-3 py-2.5 text-right text-zinc-600">
                    {formatARS(c.impuestoServicios, 0)}
                  </td>
                  <td className="px-3 py-2.5 text-right text-zinc-600">{formatARS(c.sipa, 0)}</td>
                  <td className="px-3 py-2.5 text-right text-zinc-600">
                    {formatARS(c.obraSocial, 0)}
                  </td>
                  <td className="px-3 py-2.5 text-right font-semibold text-emerald-700">
                    {formatARS(c.totalServicios, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400">
          Valores de prestación de servicios. Fuente: ARCA, escalas vigentes desde {VIGENCIA.desde},
          consultado el {VIGENCIA.consultadoEl}.
        </p>
      </section>

      <section className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
        <h2 className="text-lg font-bold text-emerald-900">¿Cuánto pagás vos?</h2>
        <p className="text-sm text-emerald-800">
          Pasá tu facturación por la calculadora y mirá tu categoría y tu cuota exacta, con los tres
          componentes:
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/monotributo/categorias"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Calcular mi categoría y cuota →
          </Link>
          <Link
            href="/monotributo"
            className="rounded-lg border border-emerald-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-400"
          >
            Todo sobre el monotributo →
          </Link>
        </div>
      </section>

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

      <EmailCapture
        source="blog-cuota-monotributo"
        headline="Avisame cuando cambie la cuota del monotributo"
        subtext="Los componentes de la cuota se actualizan por IPC en febrero y agosto. Cuando ARCA publique los nuevos valores, te aviso. Sin spam."
      />

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Fuentes oficiales</h2>
        <ul className="space-y-1.5 text-sm text-zinc-600">
          <li>
            •{" "}
            <a
              href={VIGENCIA.fuenteUrl}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              ARCA — Categorías y valores del monotributo
            </a>
          </li>
          <li>
            •{" "}
            <a
              href="https://www.afip.gob.ar/monotributo/ayuda/jubilacion.asp"
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              ARCA — Jubilación y obra social del monotributo
            </a>
          </li>
        </ul>
        <p className="text-xs text-zinc-400">
          Escalas vigentes desde {VIGENCIA.desde}. Última verificación: {VIGENCIA.consultadoEl}.
          Esta guía es informativa; para tu caso puntual consultá con tu contador o con ARCA.
        </p>
        <p className="text-sm text-zinc-600">
          ¿Y si te pasás del tope? Leé{" "}
          <Link
            href="/blog/que-pasa-si-me-paso-del-limite-de-facturacion-del-monotributo"
            className="text-emerald-700 underline"
          >
            qué pasa si te pasás del límite de facturación del monotributo
          </Link>
          . Y si te preguntás por el aguinaldo, mirá{" "}
          <Link href="/blog/aguinaldo-monotributista" className="text-emerald-700 underline">
            si el monotributista cobra aguinaldo
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
