import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { CalculadoraInflacion } from "@/components/CalculadoraInflacion";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import { INFLACION_FUENTES, IPC_DIA_PUBLICACION } from "@/data/inflacion";
import {
  aniosDisponibles,
  inflacionAcumuladaAnio,
  nombreMes,
  nombrePeriodo,
  ultimosPeriodos,
  ULTIMO_PERIODO,
  variacionInteranual,
  variacionMensual,
} from "@/lib/inflacion";
import { formatPct } from "@/lib/formato";
import { productoPorSlug } from "@/lib/mp";

export const metadata: Metadata = {
  title: "Calculadora de inflación: actualizar un monto por IPC",
  description:
    "Convertí cualquier monto del pasado a pesos de hoy con el IPC oficial del INDEC y mirá si tu sueldo le ganó a la inflación. Serie desde 2017.",
  alternates: { canonical: "/inflacion" },
};

export default function InflacionPage() {
  const anioActual = Number(ULTIMO_PERIODO.slice(0, 4));
  const mensual = variacionMensual(ULTIMO_PERIODO);
  const interanual = variacionInteranual(ULTIMO_PERIODO);
  const acumulada = inflacionAcumuladaAnio(anioActual);
  const tabla = ultimosPeriodos(13);
  const anios = aniosDisponibles();

  const faqs = [
    {
      q: "¿Cuál fue la inflación del último mes?",
      a: `El último dato oficial es ${nombrePeriodo(ULTIMO_PERIODO)}: ${formatPct(mensual ?? 0, 1)} mensual. La variación interanual fue de ${formatPct(interanual ?? 0, 1)}. El INDEC publica el dato de cada mes ${IPC_DIA_PUBLICACION} del mes siguiente.`,
    },
    {
      q: `¿Cuánta inflación acumula ${anioActual}?`,
      a: acumulada
        ? `Hasta ${nombrePeriodo(acumulada.hastaPeriodo)}, la inflación acumulada de ${anioActual} es del ${formatPct(acumulada.pct, 1)} (medida desde diciembre de ${anioActual - 1}). Es un dato parcial: se completa cuando salga el IPC de diciembre.`
        : "Todavía no hay datos publicados para este año.",
    },
    {
      q: "¿Cómo se actualiza un monto por inflación?",
      a: "Se divide el índice IPC del mes de llegada por el del mes de origen, y el monto se multiplica por ese resultado. Por ejemplo, para llevar $100.000 de enero de 2024 a hoy: 100.000 × (índice de hoy ÷ índice de enero 2024). Es lo que hace la calculadora, con la serie oficial del INDEC.",
    },
    {
      q: "¿Qué es el IPC y quién lo publica?",
      a: "El Índice de Precios al Consumidor mide cuánto cambian los precios de una canasta típica de productos y servicios. Lo publica el INDEC todos los meses, para todo el país y por regiones. Es el dato oficial de inflación de la Argentina.",
    },
    {
      q: "¿Desde qué fecha puedo actualizar montos?",
      a: "Desde diciembre de 2016, que es donde arranca la serie del IPC Nacional del INDEC (base diciembre 2016 = 100). Para fechas anteriores no hay un índice nacional comparable. Había mediciones parciales, como el IPC de CABA o el de San Luis, que no se pueden unir de forma oficial.",
    },
    {
      q: "¿Cómo sé si mi sueldo le ganó a la inflación?",
      a: "Usá la pestaña «Tu sueldo vs. la inflación». Ponés cuánto cobrabas, en qué mes, y cuánto cobrás hoy. La calculadora actualiza tu sueldo viejo por IPC y lo compara con el de hoy. Si el de hoy es menor que el actualizado, perdiste poder de compra aunque el número haya subido.",
    },
    {
      q: "¿Estos números son los oficiales?",
      a: "Sí. Usamos la serie del IPC Nacional nivel general que publica el INDEC en la API oficial de series de tiempo del Estado argentino, sin tocar nada. La fecha del último dato cargado siempre aparece en la calculadora.",
    },
    {
      q: "¿Sirve para ajustar el alquiler?",
      a: "Sí, si tu contrato se ajusta por IPC. Tenemos una calculadora específica que arma todo el calendario de ajustes (cada 3, 4, 6 o 12 meses) y estima el próximo: buscala como «ajuste de alquiler por IPC» en este sitio.",
    },
    {
      q: "¿Por qué mi 'inflación personal' puede ser distinta?",
      a: "El IPC promedia lo que gastan todos los hogares. Si gastás más que el promedio en lo que más subió (por ejemplo, alquiler o prepaga), tu costo de vida pudo subir más que el índice. Y al revés. El IPC es la mejor referencia general, no una medición de tu caso.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Actualizador de montos por inflación (IPC)",
        url: "https://calcular.ar/inflacion",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Actualizar un monto por inflación: cuánto vale hoy tu plata (IPC INDEC)",
        descripcion:
          "Cómo se actualiza un monto por inflación con el IPC del INDEC (cociente de índices) y cómo saber si tu sueldo le ganó o perdió poder de compra. Serie nacional desde 2017.",
        url: "/inflacion",
        modificado: "2026-06-15",
      }),
      datasetSchema({
        nombre: "Serie del IPC Nacional (INDEC, nivel general, base dic-2016)",
        descripcion:
          "Índice de Precios al Consumidor nivel general del INDEC, serie mensual completa desde diciembre de 2016, usada para actualizar montos y medir variaciones mensual, acumulada e interanual.",
        url: "/inflacion",
        modificado: "2026-06-15",
        fuenteNombre: INFLACION_FUENTES.ipc.nombre,
        fuenteUrl: INFLACION_FUENTES.ipc.url,
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
          ¿Cuánto vale hoy esa plata? Actualizá cualquier monto por inflación
        </h1>
        <p className="text-zinc-600">
          Elegí un monto y dos fechas, y te lo convertimos con el <strong>IPC oficial del
          INDEC</strong>. Y si te animás a la verdad incómoda, compará tu sueldo de antes con el de
          ahora y mirá <strong>cuánto poder de compra ganaste o perdiste</strong>.
        </p>
      </header>

      <RespuestaPrimero actualizado={INFLACION_FUENTES.consultadoEl}>
        <p>
          Para <strong>actualizar un monto por inflación</strong> se multiplica por el cociente de
          índices: <strong>monto × (índice IPC del mes de llegada ÷ índice del mes de origen)</strong>.
          El último dato oficial del INDEC es {nombrePeriodo(ULTIMO_PERIODO)}:{" "}
          <strong>{formatPct(mensual ?? 0, 1)} mensual</strong> y{" "}
          <strong>{formatPct(interanual ?? 0, 1)} interanual</strong>. Para saber si tu sueldo le
          ganó a la inflación, actualizá lo que cobrabas antes y comparalo con lo que cobrás hoy. Si
          el número de hoy es menor que el actualizado, <strong>perdiste poder de compra</strong>{" "}
          aunque el sueldo haya subido.
        </p>
      </RespuestaPrimero>

      <CalculadoraInflacion precioInforme={productoPorSlug("informe-inflacion")?.precio} />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La inflación, mes a mes</h2>
        <p className="text-zinc-600">
          Últimos {tabla.length} meses publicados por el INDEC. La columna «acumulada» mide desde
          diciembre del año anterior. La «interanual», contra el mismo mes del año anterior.
        </p>
        <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-left text-zinc-700">
              <tr>
                <th className="px-3 py-2 font-semibold">Mes</th>
                <th className="px-3 py-2 text-right font-semibold">Mensual</th>
                <th className="px-3 py-2 text-right font-semibold">Acumulada del año</th>
                <th className="px-3 py-2 text-right font-semibold">Interanual</th>
              </tr>
            </thead>
            <tbody>
              {[...tabla].reverse().map((f) => (
                <tr key={f.periodo} className="border-t border-zinc-100">
                  <td className="px-3 py-1.5 capitalize text-zinc-700">
                    {nombreMes(f.periodo)} {f.periodo.slice(0, 4)}
                  </td>
                  <td className="px-3 py-1.5 text-right font-medium text-zinc-900">
                    {f.mensualPct === null ? "—" : formatPct(f.mensualPct, 1)}
                  </td>
                  <td className="px-3 py-1.5 text-right text-zinc-600">
                    {f.acumuladaAnioPct === null ? "—" : formatPct(f.acumuladaAnioPct, 1)}
                  </td>
                  <td className="px-3 py-1.5 text-right text-zinc-600">
                    {f.interanualPct === null ? "—" : formatPct(f.interanualPct, 1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cómo hacemos la cuenta</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            El INDEC publica cada mes el nivel del IPC Nacional como un índice con base{" "}
            <strong>diciembre 2016 = 100</strong>. Actualizar un monto es un cociente de índices:
          </p>
          <p className="rounded-xl bg-white p-4 font-medium text-zinc-800 shadow-sm">
            Monto actualizado = monto × (índice del mes de llegada ÷ índice del mes de origen)
          </p>
          <p>
            No usamos promedios ni estimaciones propias. La serie completa viene de la API oficial
            de series de tiempo del Estado argentino y se actualiza cada vez que el INDEC publica un
            dato nuevo ({IPC_DIA_PUBLICACION} del mes siguiente). El último dato cargado es{" "}
            <strong>{nombrePeriodo(ULTIMO_PERIODO)}</strong>.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La inflación de cada año</h2>
        <p className="text-zinc-600">
          Cuánto subieron los precios cada año calendario según el IPC, con el detalle mes a mes:
        </p>
        <div className="flex flex-wrap gap-2">
          {[...anios].reverse().map((a) => {
            const r = inflacionAcumuladaAnio(a);
            return (
              <Link
                key={a}
                href={`/inflacion/${a}`}
                className="rounded-full border border-zinc-300 bg-white px-3.5 py-1.5 text-sm font-medium text-zinc-700 transition hover:border-emerald-500 hover:text-emerald-700"
              >
                {a}
                {r && (
                  <span className="ml-1.5 text-xs text-zinc-400">
                    {formatPct(r.pct, 1)}
                    {r.completa ? "" : "*"}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
        <p className="text-xs text-zinc-400">* acumulado parcial del año en curso.</p>
      </section>

      <section
        data-oferta="informe-inflacion"
        className="rounded-[1.5rem] bg-zinc-900/[0.035] p-1.5 ring-1 ring-zinc-900/5"
      >
        <div className="flex flex-col gap-4 rounded-[calc(1.5rem-0.375rem)] bg-white p-5 shadow-[var(--shadow-apoyo)] sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-base font-semibold text-zinc-900">
              ¿Tenés que justificar un aumento?
            </h2>
            <p className="mt-1.5 max-w-xl text-sm text-zinc-600">
              Para pedir aumento de sueldo, subir honorarios o actualizar un presupuesto o una plata
              que prestaste: un informe con la cuenta mes a mes del INDEC y la carta escrita con tus
              números, lista para mandar.
            </p>
          </div>
          <Link
            href="/informes/inflacion?desde=inflacion"
            data-evento="cta_compra"
            data-producto="informe-inflacion"
            data-ubicacion="inflacion-cuerpo"
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-zinc-300 px-5 text-sm font-semibold text-zinc-800 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
          >
            Ver el informe
          </Link>
        </div>
      </section>

      <section className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-5">
        <h2 className="text-base font-semibold text-zinc-900">
          ¿Alquilás? Calculá tu próximo ajuste
        </h2>
        <p className="mt-1.5 text-sm text-zinc-600">
          Si tu contrato se ajusta por IPC cada 3, 4, 6 o 12 meses, te armamos el calendario de
          aumentos y te estimamos el que viene.
        </p>
        <Link
          href="/inflacion/alquiler"
          className="mt-3 inline-block rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
        >
          Ir a la calculadora de alquiler →
        </Link>
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
          {[INFLACION_FUENTES.ipc, INFLACION_FUENTES.indec].map((f) => (
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
          Última verificación: {INFLACION_FUENTES.consultadoEl}. ¿La plata te quedó corta? Mirá
          cuánto rinde en un{" "}
          <Link href="/plazo-fijo" className="text-emerald-700 underline">
            plazo fijo
          </Link>{" "}
          o calculá tu{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            aguinaldo
          </Link>
          . ¿Tu paritaria le gana al IPC? Comparala con las{" "}
          <Link href="/convenios" className="text-emerald-700 underline">
            escalas de convenios verificadas
          </Link>
          . Y si querés saber cuánto necesita tu hogar para no quedar debajo de la línea de
          pobreza, mirá la{" "}
          <Link href="/canasta-basica" className="text-emerald-700 underline">
            canasta básica del INDEC
          </Link>
          .
        </p>
      </section>
      <EmailCapture
        source="inflacion"
        headline="Avisame cuando salga el IPC nuevo"
        subtext="Cada mes el INDEC publica el nuevo índice de inflación. Te aviso apenas sale, sin que tengas que estar pendiente. Sin spam."
      />
    </article>
  );
}
