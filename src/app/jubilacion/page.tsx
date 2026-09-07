import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraJubilacion } from "@/components/CalculadoraJubilacion";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import {
  HABER_MINIMO_FUENTE,
  HABER_MINIMO_SERIE,
  HABER_MINIMO_ULTIMO,
} from "@/data/jubilaciones";
import {
  BONO_VIGENTE,
  PRESTACIONES_FUENTES,
  PRESTACIONES_VIGENTES,
} from "@/data/prestaciones";
import {
  etiquetaPeriodo,
  proximoMesDeterminado,
  sumarMeses,
  varInteranualHaber,
} from "@/lib/jubilacion";
import { formatARS, formatPct } from "@/lib/formato";

const V = PRESTACIONES_VIGENTES;
const MES = etiquetaPeriodo(V.periodo);
const TOPE_BONO = Math.round((V.haberMinimo + BONO_VIGENTE.monto) * 100) / 100;

const PROXIMO = proximoMesDeterminado();
const INTERANUAL = varInteranualHaber(V.periodo);

// Últimos 12 meses de la serie, del más nuevo al más viejo.
const ULTIMOS = [...HABER_MINIMO_SERIE].slice(-12).reverse();

export const metadata: Metadata = {
  title: `Jubilación ${MES}: cuánto cobrás con el aumento y el bono`,
  description: `El haber mínimo de ${MES} es ${formatARS(V.haberMinimo, 0)} y con el bono de ${formatARS(BONO_VIGENTE.monto, 0)} se llega a ${formatARS(TOPE_BONO, 0)}. Poné tu haber real: si cobrás por encima de la mínima el bono se recorta, y casi nadie lo explica. Datos de la Res. ANSES ${V.resolucion.replace("Resolución ANSES ", "")}.`,
  alternates: { canonical: "/jubilacion" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent(`Jubilación · ${MES}`)}&s=${encodeURIComponent("Cuánto cobrás con tu haber real, aumento y bono")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: `¿Cuánto cobra un jubilado en ${MES} de 2026?`,
    a: `El haber mínimo garantizado de ${MES} es de ${formatARS(V.haberMinimo, 0)}, tras la movilidad de ${formatPct(V.movilidad)} que fijó la ${V.resolucion}. Sumado el bono extraordinario de ${formatARS(BONO_VIGENTE.monto, 0)} del ${BONO_VIGENTE.norma}, quien cobra la mínima recibe ${formatARS(TOPE_BONO, 0)}. Quien cobra por encima de la mínima recibe un bono más chico: el refuerzo sólo completa hasta ${formatARS(TOPE_BONO, 0)}.`,
  },
  {
    q: "Si cobro más que la mínima, ¿me dan los $70.000 igual?",
    a: `No, y es el punto que casi nunca se aclara. El decreto fija el bono como un máximo: quien percibe un haber superior al mínimo recibe sólo lo necesario para llegar al tope de haber mínimo más bono, o sea ${formatARS(TOPE_BONO, 0)}. En la práctica, todos los haberes entre ${formatARS(V.haberMinimo, 0)} y ${formatARS(TOPE_BONO, 0)} terminan cobrando exactamente lo mismo. Por encima de ${formatARS(TOPE_BONO, 0)} no corresponde bono.`,
  },
  {
    q: "¿Cómo se calcula el aumento de las jubilaciones?",
    a: "Desde mayo de 2024 rige la movilidad mensual del Decreto 274/2024: cada mes los haberes se actualizan por la variación del índice de precios al consumidor (IPC) del INDEC de dos meses antes, redondeada a dos decimales. Por ejemplo, el aumento de agosto de 2026 (1,89%) es la inflación de junio de 2026. Antes de mayo de 2024 la movilidad era trimestral y se calculaba con otra fórmula, por eso esta serie arranca ahí.",
  },
  {
    q: "¿Se puede saber el aumento del mes que viene antes de que lo anuncien?",
    a: "Sí, y no es una estimación. Como la movilidad de un mes es la inflación de dos meses antes, en cuanto el INDEC publica el IPC (alrededor del día 12 de cada mes) el aumento de dos meses después ya quedó determinado por la norma. ANSES lo oficializa por resolución recién a fin de mes, así que hay unas tres semanas en las que el número existe pero todavía no se anunció. Esta página lo muestra apenas sale el IPC.",
  },
  {
    q: `¿Cuánto es la PUAM en ${MES}?`,
    a: `La Pensión Universal para el Adulto Mayor es de ${formatARS(V.puam, 0)} en ${MES}. Por el artículo 13 de la Ley 27.260 equivale al 80% del haber mínimo garantizado, así que se mueve con la misma movilidad todos los meses. Quien cobra la PUAM está por debajo del haber mínimo, así que le corresponde el bono completo.`,
  },
  {
    q: `¿Cuál es el haber máximo y la PBU de ${MES}?`,
    a: `El haber máximo del SIPA es de ${formatARS(V.haberMaximo, 0)} y la Prestación Básica Universal, de ${formatARS(V.pbu, 0)}. Ambos los fija la misma resolución mensual de ANSES y se actualizan con la movilidad. A un haber máximo no le corresponde bono, porque supera holgadamente el tope de ${formatARS(TOPE_BONO, 0)}.`,
  },
  {
    q: "¿El bono es siempre de $70.000?",
    a: "No está garantizado: el bono es discrecional y lo fija un decreto mes a mes, así que puede cambiar de monto o directamente no existir. Su valor nominal viene congelado en $70.000 desde 2024, lo que significa que en términos reales vale cada vez menos, porque los haberes se actualizan por inflación y el bono no. Acá sólo se publica el bono del mes que ya tiene decreto: nunca se proyecta hacia adelante.",
  },
  {
    q: "¿Lo que dice esta calculadora es lo que me deposita ANSES?",
    a: "No exactamente. Es el haber bruto más el bono según los valores oficiales del mes. Lo que llega a la cuenta puede ser menor por los descuentos habituales (aporte al PAMI, obra social, cuotas de créditos, embargos) y puede diferir si el beneficio viene de una caja provincial, de un régimen especial o de una moratoria con cuota vigente. Para tu caso puntual, la fuente es ANSES.",
  },
];

export default function JubilacionPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de jubilación, aumento y bono de ANSES",
        url: "https://calcular.ar/jubilacion",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      datasetSchema({
        nombre: `Haber mínimo jubilatorio y movilidad previsional mensual — ${MES} (ANSES)`,
        descripcion: `Serie mensual del haber mínimo jubilatorio garantizado bajo el régimen de movilidad del Decreto 274/2024, desde mayo de 2024. En ${MES}: haber mínimo ${formatARS(V.haberMinimo, 0)} con una movilidad de ${formatPct(V.movilidad)}, haber máximo ${formatARS(V.haberMaximo, 0)}, PBU ${formatARS(V.pbu, 0)} y PUAM ${formatARS(V.puam, 0)}.`,
        url: "/jubilacion",
        modificado: `${V.periodo}-01`,
        fuenteNombre: HABER_MINIMO_FUENTE.nombre,
        fuenteUrl: V.resolucionUrl,
      }),
      articleSchema({
        titulo: `Jubilación ${MES}: cuánto cobrás con el aumento y el bono`,
        descripcion:
          "Haber mínimo, movilidad mensual y bono proporcional de ANSES, calculados sobre la resolución oficial del mes.",
        url: "/jubilacion",
        modificado: PRESTACIONES_FUENTES.consultadoEl,
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
          Jubilación de {MES}: cuánto cobrás con <em>tu</em> haber
        </h1>
        <p className="text-zinc-600">
          Todos los meses sale la noticia con el número de la mínima y el bono de{" "}
          {formatARS(BONO_VIGENTE.monto, 0)}. Lo que casi nunca se aclara es que si cobrás por
          encima de la mínima el bono se te recorta. Poné tu haber real y mirá lo que te toca a vos,
          con los valores de la resolución oficial del mes.
        </p>
      </header>

      <RespuestaPrimero actualizado={PRESTACIONES_FUENTES.consultadoEl}>
        <p>
          En {MES} el haber mínimo garantizado es de{" "}
          <strong>{formatARS(V.haberMinimo, 0)}</strong>, tras una movilidad de{" "}
          <strong>{formatPct(V.movilidad)}</strong> ({V.resolucion}, {V.resolucionBO}). Con el bono
          extraordinario de <strong>{formatARS(BONO_VIGENTE.monto, 0)}</strong> del{" "}
          {BONO_VIGENTE.norma}, quien cobra la mínima recibe{" "}
          <strong>{formatARS(TOPE_BONO, 0)}</strong>. Quien cobra por encima de la mínima recibe un
          bono <strong>recortado</strong>: el refuerzo sólo completa hasta{" "}
          {formatARS(TOPE_BONO, 0)}, así que todos los haberes entre{" "}
          {formatARS(V.haberMinimo, 0)} y {formatARS(TOPE_BONO, 0)} terminan cobrando lo mismo. Por
          encima de {formatARS(TOPE_BONO, 0)} no hay bono. La PUAM es de{" "}
          <strong>{formatARS(V.puam, 0)}</strong> y el haber máximo del SIPA,{" "}
          <strong>{formatARS(V.haberMaximo, 0)}</strong>.
        </p>
      </RespuestaPrimero>

      <CalculadoraJubilacion />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El aumento del mes que viene ya está definido (o falta poco)
        </h2>
        {PROXIMO ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
              {etiquetaPeriodo(PROXIMO.periodo)}
            </p>
            <p className="mt-1 text-3xl font-bold text-emerald-900">
              {formatARS(PROXIMO.haberMinimo, 0)}
            </p>
            <p className="mt-2 text-sm text-emerald-900">
              La movilidad de {etiquetaPeriodo(PROXIMO.periodo)} es{" "}
              <strong>{formatPct(PROXIMO.movilidad)}</strong>, que es la variación del IPC de{" "}
              {etiquetaPeriodo(PROXIMO.ipcDe)} publicada por el INDEC. No es una proyección: la
              fórmula del Decreto 274/2024 ya lo determinó. ANSES lo oficializa por resolución a fin
              de mes.
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              {etiquetaPeriodo(sumarMeses(V.periodo, 1))}
            </p>
            <p className="mt-1 text-lg font-semibold text-zinc-800">Todavía no se puede saber</p>
            <p className="mt-2 text-sm text-zinc-600">
              El aumento de {etiquetaPeriodo(sumarMeses(V.periodo, 1))} es la inflación de{" "}
              {etiquetaPeriodo(sumarMeses(V.periodo, -1))}, que el INDEC publica alrededor del día
              12. Apenas salga, el número aparece acá — unas tres semanas antes de que ANSES dicte
              la resolución.
            </p>
          </div>
        )}
        <p className="text-sm text-zinc-600">
          Es la consecuencia práctica de la movilidad mensual: como el aumento de un mes es la
          inflación de dos meses antes, el dato existe antes del anuncio. Podés seguir la inflación
          mes a mes en la{" "}
          <Link href="/inflacion" className="font-medium text-emerald-700 hover:underline">
            calculadora de inflación
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Todos los valores previsionales de {MES}
        </h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Concepto</th>
                  <th className="px-4 py-2.5 text-right font-semibold">{MES}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">
                    Haber mínimo garantizado
                    <span className="block text-xs text-zinc-400">
                      {V.resolucion}, art. 1
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatARS(V.haberMinimo, 2)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">
                    Mínima + bono
                    <span className="block text-xs text-zinc-400">
                      el tope hasta donde completa el refuerzo
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatARS(TOPE_BONO, 2)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">
                    Pensión Universal para el Adulto Mayor (PUAM)
                    <span className="block text-xs text-zinc-400">
                      80% del haber mínimo — Ley 27.260, art. 13
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">{formatARS(V.puam, 2)}</td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">
                    Prestación Básica Universal (PBU)
                    <span className="block text-xs text-zinc-400">{V.resolucion}, art. 4</span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">{formatARS(V.pbu, 2)}</td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">
                    Haber máximo del SIPA
                    <span className="block text-xs text-zinc-400">{V.resolucion}, art. 2</span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {formatARS(V.haberMaximo, 2)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">
                    Base imponible mínima (aportes)
                    <span className="block text-xs text-zinc-400">{V.resolucion}, art. 3</span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {formatARS(V.baseImponibleMinima, 2)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">
                    Base imponible máxima (tope SIPA)
                    <span className="block text-xs text-zinc-400">{V.resolucion}, art. 3</span>
                  </td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">
                    {formatARS(V.baseImponibleMaxima, 2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          La base imponible máxima es el tope sobre el que se calculan los aportes de un trabajador
          en actividad: la usa la{" "}
          <Link href="/sueldo-neto" className="font-medium text-emerald-700 hover:underline">
            calculadora de sueldo neto
          </Link>
          , y sale de la misma resolución que los haberes. Ese mismo día ANSES dicta una segunda
          resolución con los montos de las{" "}
          <Link
            href="/asignaciones-familiares"
            className="font-medium text-emerald-700 hover:underline"
          >
            asignaciones familiares
          </Link>
          : si sos jubilado o pensionado te pueden corresponder la asignación por cónyuge y la de
          hijo.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Cómo se movió el haber mínimo mes a mes
        </h2>
        <p className="text-zinc-600">
          Cada fila sale de aplicar la movilidad del mes al haber del mes anterior. La columna
          &laquo;equivale al IPC de&raquo; muestra de dónde sale ese porcentaje: es la inflación de
          dos meses antes.
          {INTERANUAL !== null && (
            <>
              {" "}
              En el último año el haber mínimo subió{" "}
              <strong>{formatPct(INTERANUAL, 1)}</strong>.
            </>
          )}
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Mes</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Haber mínimo</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Movilidad</th>
                  <th className="px-4 py-2.5 font-semibold">Equivale al IPC de</th>
                </tr>
              </thead>
              <tbody>
                {ULTIMOS.map((m) => (
                  <tr key={m.periodo} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 text-zinc-600">{etiquetaPeriodo(m.periodo)}</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                      {formatARS(m.haberMinimo, 2)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-900">
                      {m.movilidad === null ? "—" : formatPct(m.movilidad)}
                    </td>
                    <td className="px-4 py-2.5 text-zinc-500">
                      {m.movilidad === null ? "—" : etiquetaPeriodo(sumarMeses(m.periodo, -2))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Serie oficial de ANSES desde {etiquetaPeriodo(HABER_MINIMO_SERIE[0].periodo)}, el primer
          mes del régimen de movilidad mensual. Los valores no se cargan a mano: una verificación
          reconstruye los {HABER_MINIMO_SERIE.length - 1} meses con la fórmula del decreto y aborta
          el deploy si alguno no cierra al centavo.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-zinc-800">{f.q}</summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          <li>
            <a
              href={V.resolucionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              {V.resolucion}
            </a>{" "}
            — haber mínimo y máximo, PBU, PUAM y bases imponibles de {MES} ({V.resolucionBO}).
          </li>
          <li>
            <a
              href={BONO_VIGENTE.normaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              {BONO_VIGENTE.norma}
            </a>{" "}
            — bono extraordinario previsional de {MES} ({BONO_VIGENTE.normaBO}).
          </li>
          <li>
            <a
              href={PRESTACIONES_FUENTES.movilidad.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              {PRESTACIONES_FUENTES.movilidad.nombre}
            </a>
            .
          </li>
          <li>
            <a
              href={PRESTACIONES_FUENTES.puam.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              {PRESTACIONES_FUENTES.puam.nombre}
            </a>
            .
          </li>
          <li>
            <a
              href={HABER_MINIMO_FUENTE.serie}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              {HABER_MINIMO_FUENTE.nombre}
            </a>{" "}
            — serie mensual, consultada el {HABER_MINIMO_FUENTE.consultadoEl}.
          </li>
        </ul>
        <p className="pt-2">
          Esta página es informativa y usa valores oficiales publicados en el Boletín Oficial. No
          es una liquidación ni reemplaza a ANSES: el importe que se acredita puede variar por
          descuentos, por el régimen del beneficio y por situaciones particulares.
        </p>
      </section>
    </article>
  );
}
