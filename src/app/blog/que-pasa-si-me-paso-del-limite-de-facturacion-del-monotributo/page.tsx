import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd } from "@/components/JsonLd";
import { FirmaAutor } from "@/components/FirmaAutor";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  CATEGORIAS,
  TOPE_MAXIMO,
  VIGENCIA,
  RECATEGORIZACION,
  ventanaRecategorizacion,
} from "@/data/monotributo";
import { formatARS } from "@/lib/formato";

// La ventana de recategorización se deriva de la fecha (data/monotributo.ts): revalidar cada
// hora hace que el bloque de "próxima ventana" no se quede viejo entre deploys.
export const revalidate = 3600;

const PUBLICADO = "22 de junio de 2026";
const PUBLICADO_ISO = "2026-06-22";

const catA = CATEGORIAS[0];
const catK = CATEGORIAS[CATEGORIAS.length - 1];
const precioUnitarioMax = catK.precioUnitarioMax;

const titulo =
  "Qué pasa si me paso del límite de facturación del monotributo (2026)";
const descripcion =
  "Si superás el tope de tu categoría hay dos caminos: recategorizarte (si seguís bajo el máximo) o quedar excluido y pasar al Régimen General. Cómo funciona, los topes oficiales de ARCA por categoría y cómo controlarlo para no quedar afuera.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: {
    canonical: "/blog/que-pasa-si-me-paso-del-limite-de-facturacion-del-monotributo",
  },
  openGraph: {
    type: "article",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Me pasé del límite del monotributo")}&s=${encodeURIComponent("Qué pasa, los topes oficiales y cómo no quedar afuera")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Me pasé del límite un solo mes, quedo excluido?",
    a: "No necesariamente. El monotributo mira los ingresos brutos de los últimos 12 meses, no un mes suelto. Lo que importa es el acumulado de un año móvil: si en ese período superaste el tope de tu categoría pero seguís por debajo del tope máximo del régimen, lo que corresponde es recategorizarte en la próxima ventana, no quedar excluido.",
  },
  {
    q: "¿Cuál es el tope máximo de facturación del monotributo en 2026?",
    a: `Desde ${VIGENCIA.desde}, el tope máximo es ${formatARS(TOPE_MAXIMO, 0)} de ingresos brutos en los últimos 12 meses (categoría K), tanto para prestación de servicios como para venta de cosas muebles. Si superás ese monto, quedás excluido del régimen de pleno derecho y tenés que pasar al Régimen General.`,
  },
  {
    q: "¿Qué pasa si me excluyen del monotributo?",
    a: "Pasás al Régimen General: empezás a tributar IVA y a inscribirte en Ganancias y en autónomos. La exclusión puede ser retroactiva al momento en que superaste el parámetro, así que podés deber IVA y Ganancias desde ese mes, más intereses. Por eso conviene controlar la facturación del año móvil antes de llegar al tope, no después.",
  },
  {
    q: "¿Solo me pueden excluir por facturar de más?",
    a: `No. También quedás excluido si superás cualquiera de los parámetros físicos de tu actividad (superficie afectada, energía eléctrica consumida o alquileres devengados) o, en venta de cosas muebles, si el precio unitario de venta supera ${formatARS(precioUnitarioMax, 0)}. Cualquiera de estos parámetros, por sí solo, puede dejarte fuera del régimen.`,
  },
  {
    q: "¿Cuándo me puedo recategorizar?",
    a: `La recategorización se hace dos veces al año, en febrero y en agosto, hasta el día 5. Se evalúan ${RECATEGORIZACION.periodoEvaluado}. La próxima ventana es ${RECATEGORIZACION.proximaVentana}. Si en ese período cambiaste de categoría, ahí es donde lo regularizás.`,
  },
  {
    q: "¿Conviene esperar a la recategorización o adelantarme?",
    a: "Si ya sabés que superaste el tope de tu categoría, lo más prolijo es recategorizarte en la primera ventana disponible. ARCA controla la facturación electrónica en tiempo real: si detecta que superaste los parámetros y no te recategorizaste, puede excluirte de oficio. Adelantarte evita intereses y la exclusión retroactiva.",
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
        url: "/blog/que-pasa-si-me-paso-del-limite-de-facturacion-del-monotributo",
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
          Qué pasa si me paso del límite de facturación del monotributo
        </h1>
        <p className="text-zinc-600">
          Facturaste más de lo que permite tu categoría y no sabés si tenés que
          recategorizarte o si te van a echar del monotributo. Acá está la respuesta clara, con
          los topes oficiales de ARCA y la cuenta a la vista — sin el susto que venden los
          estudios contables.
        </p>
      </header>

      <RespuestaPrimero actualizado={PUBLICADO}>
        <p>
          Si te pasás del tope de facturación, hay <strong>dos caminos posibles</strong>. Si
          superaste el límite de <strong>tu</strong> categoría pero seguís por debajo del tope
          máximo del régimen ({formatARS(TOPE_MAXIMO, 0)} en los últimos 12 meses),
          simplemente te tenés que <strong>recategorizar</strong> a la categoría que corresponda
          en la próxima ventana (febrero o agosto). Si superaste el{" "}
          <strong>tope máximo</strong> —o un parámetro físico como superficie, energía o
          alquileres—, quedás <strong>excluido de pleno derecho</strong> y pasás al Régimen
          General (IVA + Ganancias). Lo clave: el monotributo mira los{" "}
          <strong>últimos 12 meses</strong>, no un mes suelto, y ARCA controla la facturación
          electrónica en tiempo real.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los dos escenarios: recategorización o exclusión
        </h2>
        <p className="text-zinc-600">
          Pasarse del límite no significa automáticamente quedar afuera. Todo depende de{" "}
          <strong>cuánto</strong> te pasaste:
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="font-bold text-emerald-900">1. Te recategorizás</p>
            <p className="mt-2 text-sm text-emerald-800">
              Superaste el tope de tu categoría, pero tus ingresos de los últimos 12 meses{" "}
              <strong>siguen por debajo de {formatARS(TOPE_MAXIMO, 0)}</strong> (el máximo del
              régimen). No quedás afuera: en la próxima ventana de recategorización pasás a la
              categoría más alta que te corresponda y empezás a pagar la cuota nueva.
            </p>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50 p-5">
            <p className="font-bold text-rose-900">2. Quedás excluido</p>
            <p className="mt-2 text-sm text-rose-800">
              Superaste el <strong>tope máximo</strong> ({formatARS(TOPE_MAXIMO, 0)}) o algún{" "}
              <strong>parámetro físico</strong>. La exclusión es de pleno derecho y puede ser
              retroactiva: pasás al Régimen General y tributás IVA y Ganancias desde el mes del
              exceso.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">
          Los topes oficiales por categoría (vigentes desde {VIGENCIA.desde})
        </h2>
        <p className="text-sm text-zinc-600">
          Tope de ingresos brutos de los <strong>últimos 12 meses</strong> por categoría. Mientras
          tu facturación anual móvil esté por debajo del tope de tu categoría, no tenés que hacer
          nada. Si la superás, mirá en qué categoría caés.
        </p>
        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-xs text-zinc-500">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Categoría</th>
                <th className="px-4 py-2.5 text-right font-medium">
                  Tope de facturación anual (12 meses)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {CATEGORIAS.map((c) => (
                <tr key={c.cat} className="bg-white hover:bg-zinc-50">
                  <td className="px-4 py-2.5 font-medium text-zinc-800">{c.cat}</td>
                  <td className="px-4 py-2.5 text-right text-zinc-700">
                    {formatARS(c.ingresosBrutosMax, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400">
          Desde 2026, las categorías más altas (I, J y K) aplican tanto a venta de cosas muebles
          como a prestación de servicios. El tope máximo del régimen, para ambas actividades, es{" "}
          {formatARS(TOPE_MAXIMO, 0)} (categoría K). Fuente: ARCA, consultado el{" "}
          {VIGENCIA.consultadoEl}.
        </p>
        <p className="text-zinc-600">
          ¿No sabés en qué categoría caés con tu facturación de hoy? Meté tu monto en la{" "}
          <Link href="/monotributo/categorias" className="text-emerald-700 underline">
            calculadora de categorías de monotributo
          </Link>{" "}
          y te dice la categoría y la cuota exacta.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          No es solo la facturación: los otros parámetros
        </h2>
        <p className="text-zinc-600">
          La mayoría se enfoca en el monto facturado, pero ARCA también te puede excluir por
          superar un <strong>parámetro físico</strong> de tu actividad, aunque factures poco:
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {[
            "Superficie afectada a la actividad",
            "Energía eléctrica consumida en el año",
            "Alquileres devengados (lo que pagás de alquiler del local)",
            `Precio unitario de venta máximo: ${formatARS(precioUnitarioMax, 0)} (solo venta de cosas muebles)`,
          ].map((p) => (
            <li
              key={p}
              className="flex items-start gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
              {p}
            </li>
          ))}
        </ul>
        <p className="text-xs text-zinc-400">
          El precio unitario es un caso especial: si vendés un solo producto por más de{" "}
          {formatARS(precioUnitarioMax, 0)}, quedás excluido sin importar tu facturación anual.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Si te recategorizás: cuándo y cómo
        </h2>
        <p className="text-zinc-600">
          La recategorización se hace <strong>dos veces al año, en febrero y en agosto</strong>,
          y el trámite está abierto hasta el día 5 de cada uno de esos meses. Se evalúan{" "}
          {RECATEGORIZACION.periodoEvaluado}: sumás todo lo que facturaste en ese año móvil y mirás
          en qué categoría caés.
        </p>
        <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
          <p>
            <strong>Próxima ventana: {RECATEGORIZACION.proximaVentana}.</strong> Si entre{" "}
            {ventanaRecategorizacion().dozeMeses} superaste el tope de tu categoría, esa es la
            ventana para ponerte al día sin que ARCA te recategorice de oficio.
          </p>
        </div>
        <p className="text-zinc-600">
          La{" "}
          <Link href="/monotributo/recategorizacion" className="text-emerald-700 underline">
            calculadora de recategorización
          </Link>{" "}
          te dice si te tenés que recategorizar y a qué categoría, con la cuota nueva. Si todavía
          te falta para el tope, mejor: seguís igual.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Si te excluyen: qué significa pasar al Régimen General
        </h2>
        <p className="text-zinc-600">
          La exclusión de pleno derecho es el escenario más complejo. Cuando superás el tope
          máximo o un parámetro, dejás de ser monotributista y pasás al{" "}
          <strong>Régimen General</strong>, que implica:
        </p>
        <ul className="space-y-2 text-zinc-600">
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
            <span>
              <strong>IVA:</strong> empezás a cobrar y declarar el 21% (o la alícuota que
              corresponda) en cada factura.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
            <span>
              <strong>Ganancias:</strong> tributás el impuesto a las ganancias por tu actividad,
              con la posibilidad de deducir gastos.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
            <span>
              <strong>Autónomos:</strong> aportás como trabajador autónomo en lugar de la cuota
              fija del monotributo.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-500" />
            <span>
              <strong>Retroactividad:</strong> la exclusión rige desde el momento en que superaste
              el parámetro, así que podés deber impuestos e intereses de meses anteriores.
            </span>
          </li>
        </ul>
        <p className="text-sm text-zinc-500">
          Pasar al Régimen General no es el fin del mundo —muchos profesionales y comercios
          facturan ahí toda su vida— pero es un cambio que conviene planificar con un contador, no
          que te agarre de sorpresa por una exclusión de oficio.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Cómo controlar para no pasarte sin darte cuenta
        </h2>
        <p className="text-zinc-600">
          Desde que existe la factura electrónica, ARCA tiene tus ingresos en tiempo real. Por eso
          el control del tope ya no es una cosa de fin de año, sino de todos los meses. Tres reglas
          simples:
        </p>
        <ol className="space-y-3">
          {[
            {
              t: "Sumá siempre los últimos 12 meses, no el año calendario",
              d: "El parámetro es un año móvil. Cada mes que cierra, sale el mes de hace 13 meses y entra el actual. Mirá ese acumulado, no enero-diciembre.",
            },
            {
              t: "Dejá un margen antes del tope",
              d: "Si estás cerca del límite de tu categoría, recategorizate en la próxima ventana en lugar de esperar a rozar el tope máximo. Es más barato pagar una cuota más alta que quedar excluido y tributar IVA + Ganancias.",
            },
            {
              t: "Revisá los parámetros físicos, no solo el monto",
              d: "Si mudaste el local, ampliaste superficie o subió el alquiler, podés superar un parámetro aunque tu facturación esté bien. Cualquiera de ellos, solo, te puede excluir.",
            },
          ].map((r, i) => (
            <li key={r.t} className="flex gap-4">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-bold text-zinc-600">
                {i + 1}
              </div>
              <div>
                <p className="font-semibold text-zinc-900">{r.t}</p>
                <p className="mt-0.5 text-sm text-zinc-600">{r.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-6">
        <h2 className="text-lg font-bold text-emerald-900">
          Chequeá tu situación en 30 segundos
        </h2>
        <p className="text-sm text-emerald-800">
          En vez de adivinar, pasá tu facturación por las calculadoras y salí de la duda:
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/monotributo/categorias"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            ¿En qué categoría caigo? →
          </Link>
          <Link
            href="/monotributo/recategorizacion"
            className="rounded-lg border border-emerald-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-400"
          >
            ¿Me tengo que recategorizar? →
          </Link>
          <Link
            href="/monotributo"
            className="rounded-lg border border-emerald-300 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:border-emerald-400"
          >
            Cuánto pago de monotributo →
          </Link>
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

      <EmailCapture
        source="blog-limite-monotributo"
        headline="Avisame cuando cambien las escalas del monotributo"
        subtext="Las escalas se actualizan por IPC en febrero y agosto. Cuando ARCA publique los nuevos topes, te aviso para que controles tu categoría. Sin spam."
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
              ARCA — Categorías y topes del monotributo
            </a>
          </li>
          <li>
            •{" "}
            <a
              href={RECATEGORIZACION.fuenteUrl}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              ARCA — Recategorización del monotributo
            </a>
          </li>
        </ul>
        <p className="text-xs text-zinc-400">
          Escalas vigentes desde {VIGENCIA.desde}. Última verificación: {VIGENCIA.consultadoEl}.
          Esta guía es informativa; para tu caso puntual consultá con tu contador o con ARCA.
          Categoría más baja (A): hasta {formatARS(catA.ingresosBrutosMax, 0)} anuales.
        </p>
        <p className="text-sm text-zinc-600">
          ¿Querés saber qué estás pagando cada mes? Leé{" "}
          <Link
            href="/blog/que-incluye-la-cuota-del-monotributo"
            className="text-emerald-700 underline"
          >
            qué incluye la cuota del monotributo
          </Link>{" "}
          — impuesto, jubilación y obra social, con el desglose por categoría.
        </p>
      </section>
    </article>
  );
}
