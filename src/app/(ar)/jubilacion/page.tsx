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
  bonoVigente,
  PRESTACIONES_FUENTES,
  prestacionesVigentes,
  resolucionProxima,
} from "@/data/prestaciones";
import {
  etiquetaPeriodo,
  proximoMesDeterminado,
  sumarMeses,
  varInteranualHaber,
} from "@/lib/jubilacion";
import { formatARS, formatPct } from "@/lib/formato";
import { OtrosPaises } from "@/components/OtrosPaises";

function datosDelMes() {
  const V = prestacionesVigentes();
  const MES = etiquetaPeriodo(V.periodo);
  const TOPE_BONO = Math.round((V.haberMinimo + bonoVigente().monto) * 100) / 100;

  const PROXIMO = proximoMesDeterminado();
  const OFICIAL =
    PROXIMO && resolucionProxima()?.periodo === PROXIMO.periodo ? resolucionProxima() : null;
  const INTERANUAL = varInteranualHaber(V.periodo);

  // Últimos 12 meses de la serie, del más nuevo al más viejo.
  const ULTIMOS = [...HABER_MINIMO_SERIE].slice(-12).reverse();
  return { V, MES, TOPE_BONO, PROXIMO, OFICIAL, INTERANUAL, ULTIMOS };
}

type DatosDelMes = ReturnType<typeof datosDelMes>;

const metadataDelMes = ({ MES }: DatosDelMes): Metadata => ({
  title: `Jubilación ${MES}: cuánto cobrás con aumento y bono`,
  description: `Haber mínimo y bono de ${MES} según la resolución de ANSES. Poné tu haber real: si cobrás más que la mínima el bono se recorta, y acá ves cuánto.`,
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
});

export function generateMetadata(): Metadata {
  return metadataDelMes(datosDelMes());
}

const crearFaqs = ({ V, MES, TOPE_BONO, PROXIMO, OFICIAL }: DatosDelMes) => [
  {
    q: `¿Cuánto cobra un jubilado en ${MES}?`,
    a: `El haber mínimo de ${MES} es de ${formatARS(V.haberMinimo, 0)}, con el aumento de ${formatPct(V.movilidad)} que fijó la ${V.resolucion}. Con el bono de ${formatARS(bonoVigente().monto, 0)} del ${bonoVigente().norma}, quien cobra la mínima recibe ${formatARS(TOPE_BONO, 0)}. Si cobrás más que la mínima, el bono es más chico: solo completa hasta ${formatARS(TOPE_BONO, 0)}.`,
  },
  ...(OFICIAL
    ? [
        {
          q: `¿Cuánto cobra un jubilado en ${etiquetaPeriodo(OFICIAL.periodo)}?`,
          a: `La ${OFICIAL.resolucion} (${OFICIAL.resolucionBO}) fijó el haber mínimo de ${etiquetaPeriodo(OFICIAL.periodo)} en ${formatARS(OFICIAL.haberMinimo, 2)}, con un aumento de ${formatPct(PROXIMO!.movilidad)}. La PUAM pasa a ${formatARS(OFICIAL.puam, 2)} y el haber máximo a ${formatARS(OFICIAL.haberMaximo, 2)}. El bono de ese mes todavía no tiene decreto: se fija aparte, mes a mes.`,
        },
      ]
    : []),
  {
    q: "Si cobro más que la mínima, ¿me dan los $70.000 igual?",
    a: `No, y es lo que casi nunca se aclara. El decreto fija el bono como un máximo. Si cobrás más que la mínima, recibís solo lo que te falta para llegar a la mínima más el bono, o sea ${formatARS(TOPE_BONO, 0)}. En la práctica, todos los haberes entre ${formatARS(V.haberMinimo, 0)} y ${formatARS(TOPE_BONO, 0)} terminan cobrando exactamente lo mismo. Por encima de ${formatARS(TOPE_BONO, 0)} no hay bono.`,
  },
  {
    q: "¿Cómo se calcula el aumento de las jubilaciones?",
    a: "Desde mayo de 2024 rige la movilidad mensual del Decreto 274/2024. Cada mes, los haberes suben lo mismo que la inflación (el IPC del INDEC) de dos meses antes, redondeada a dos decimales. Por ejemplo, el aumento de agosto de 2026 (1,89%) es la inflación de junio de 2026. Antes de mayo de 2024 el aumento era cada tres meses y con otra fórmula, por eso esta serie arranca ahí.",
  },
  {
    q: "¿Se puede saber el aumento del mes que viene antes de que lo anuncien?",
    a: "Sí, y no es una estimación. Como el aumento de un mes es la inflación de dos meses antes, apenas el INDEC publica el IPC (alrededor del día 12 de cada mes) ya se sabe el aumento de dos meses después. ANSES lo hace oficial recién a fin de mes, así que hay unas tres semanas en las que el número existe pero no se anunció. Esta página lo muestra apenas sale el IPC.",
  },
  {
    q: `¿Cuánto es la PUAM en ${MES}?`,
    a: `La Pensión Universal para el Adulto Mayor es de ${formatARS(V.puam, 0)} en ${MES}. Por el artículo 13 de la Ley 27.260 es el 80% del haber mínimo, así que sube con el mismo aumento todos los meses. Como la PUAM está por debajo del haber mínimo, le corresponde el bono completo.`,
  },
  {
    q: `¿Cuál es el haber máximo y la PBU de ${MES}?`,
    a: `El haber máximo del SIPA es de ${formatARS(V.haberMaximo, 0)} y la Prestación Básica Universal, de ${formatARS(V.pbu, 0)}. Los dos los fija la misma resolución mensual de ANSES y suben con el mismo aumento. Un haber máximo no cobra bono, porque está muy por encima del tope de ${formatARS(TOPE_BONO, 0)}.`,
  },
  {
    q: "¿El bono es siempre de $70.000?",
    a: "No está garantizado. El bono lo decide el gobierno con un decreto cada mes, así que puede cambiar de monto o no salir. Su valor está congelado en $70.000 desde 2024. Eso quiere decir que cada mes vale menos, porque los haberes suben con la inflación y el bono no. Acá solo publicamos el bono del mes que ya tiene decreto: nunca lo proyectamos hacia adelante.",
  },
  {
    q: "¿Lo que dice esta calculadora es lo que me deposita ANSES?",
    a: "No exactamente. Es el haber bruto más el bono, con los valores oficiales del mes. Lo que te llega a la cuenta puede ser menos por los descuentos de siempre (PAMI, obra social, cuotas de créditos, embargos). Y puede cambiar si cobrás de una caja provincial, de un régimen especial o de una moratoria con cuota vigente. Para tu caso puntual, la fuente es ANSES.",
  },
];

export default function JubilacionPage() {
  const datos = datosDelMes();
  const { V, MES, TOPE_BONO, PROXIMO, OFICIAL, INTERANUAL, ULTIMOS } = datos;
  const faqs = crearFaqs(datos);
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
        nombre: `Haber mínimo jubilatorio y movilidad previsional mensual, ${MES} (ANSES)`,
        descripcion: `Serie mensual del haber mínimo jubilatorio garantizado bajo el régimen de movilidad del Decreto 274/2024, desde mayo de 2024. En ${MES}: haber mínimo ${formatARS(V.haberMinimo, 0)} con una movilidad de ${formatPct(V.movilidad)}, haber máximo ${formatARS(V.haberMaximo, 0)}, PBU ${formatARS(V.pbu, 0)} y PUAM ${formatARS(V.puam, 0)}.`,
        url: "/jubilacion",
        modificado: `${V.periodo}-01`,
        fuenteNombre: HABER_MINIMO_FUENTE.nombre,
        fuenteUrl: V.resolucionUrl,
      }),
      articleSchema({
        titulo: `Jubilación ${MES}: cuánto cobrás con aumento y bono`,
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
          {formatARS(bonoVigente().monto, 0)}. Lo que casi nunca se aclara es que, si cobrás más que
          la mínima, el bono se te recorta. Poné tu haber real y mirá lo que te toca a vos, con los
          valores de la resolución oficial del mes.
        </p>
      </header>

      <RespuestaPrimero actualizado={PRESTACIONES_FUENTES.consultadoEl}>
        <p>
          En {MES} el haber mínimo es de <strong>{formatARS(V.haberMinimo, 0)}</strong>, con un
          aumento de <strong>{formatPct(V.movilidad)}</strong> ({V.resolucion}, {V.resolucionBO}).
          Con el bono de <strong>{formatARS(bonoVigente().monto, 0)}</strong> del{" "}
          {bonoVigente().norma}, quien cobra la mínima recibe{" "}
          <strong>{formatARS(TOPE_BONO, 0)}</strong>. Si cobrás más que la mínima, el bono te llega{" "}
          <strong>recortado</strong>: solo completa hasta {formatARS(TOPE_BONO, 0)}. Por eso todos
          los haberes entre{" "}
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
              El aumento de {etiquetaPeriodo(PROXIMO.periodo)} es de{" "}
              <strong>{formatPct(PROXIMO.movilidad)}</strong>, que es la variación del IPC de{" "}
              {etiquetaPeriodo(PROXIMO.ipcDe)} publicada por el INDEC.{" "}
              {OFICIAL ? (
                <>
                  Ya es oficial: la{" "}
                  <a
                    href={OFICIAL.resolucionUrl}
                    className="font-medium underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {OFICIAL.resolucion}
                  </a>{" "}
                  ({OFICIAL.resolucionBO}) confirmó el número que la fórmula ya había dado.
                </>
              ) : (
                <>
                  No es una proyección: la fórmula del Decreto 274/2024 ya lo definió. ANSES lo hace
                  oficial con una resolución a fin de mes.
                </>
              )}
            </p>
            {OFICIAL && (
              <dl className="mt-4 grid gap-3 text-sm text-emerald-900 sm:grid-cols-3">
                <div>
                  <dt className="text-emerald-800">PUAM</dt>
                  <dd className="font-semibold">{formatARS(OFICIAL.puam, 2)}</dd>
                </div>
                <div>
                  <dt className="text-emerald-800">Haber máximo</dt>
                  <dd className="font-semibold">{formatARS(OFICIAL.haberMaximo, 2)}</dd>
                </div>
                <div>
                  <dt className="text-emerald-800">PBU</dt>
                  <dd className="font-semibold">{formatARS(OFICIAL.pbu, 2)}</dd>
                </div>
              </dl>
            )}
            {OFICIAL && (
              <p className="mt-3 text-sm text-emerald-900">
                Lo que todavía no existe es el bono de {etiquetaPeriodo(PROXIMO.periodo)}: lo fija
                un decreto aparte, mes a mes, y suele salir el último día hábil del mes anterior.
                Hasta entonces, cualquier monto de bono para {etiquetaPeriodo(PROXIMO.periodo)} es
                una suposición.
              </p>
            )}
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
              12. Apenas salga, el número aparece acá, unas tres semanas antes de que ANSES publique
              la resolución.
            </p>
          </div>
        )}
        <p className="text-sm text-zinc-600">
          Pasa por cómo funciona el aumento mensual: como el aumento de un mes es la inflación de
          dos meses antes, el dato existe antes del anuncio. Podés seguir la inflación
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
                      80% del haber mínimo (Ley 27.260, art. 13)
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
          La base imponible máxima es el tope sobre el que se calculan los aportes de quien trabaja:
          la usa la{" "}
          <Link href="/sueldo-neto" className="font-medium text-emerald-700 hover:underline">
            calculadora de sueldo neto
          </Link>
          , y sale de la misma resolución que los haberes. Ese mismo día ANSES publica otra
          resolución con los montos de las{" "}
          <Link
            href="/asignaciones-familiares"
            className="font-medium text-emerald-700 hover:underline"
          >
            asignaciones familiares
          </Link>
          . Si sos jubilado o pensionado, te pueden corresponder la asignación por cónyuge y la de
          hijo.
        </p>
        <p className="text-sm text-zinc-500">
          Para seguir: cuánto te descuenta{" "}
          <Link href="/descuento-pami" className="font-medium text-emerald-700 hover:underline">
            PAMI
          </Link>
          , si te corresponde la garantía del{" "}
          <Link href="/82-por-ciento-movil" className="font-medium text-emerald-700 hover:underline">
            82% móvil
          </Link>
          , desde cuánto pagás{" "}
          <Link href="/ganancias-jubilados" className="font-medium text-emerald-700 hover:underline">
            Ganancias como jubilado
          </Link>
          , cuánto es la{" "}
          <Link href="/puam" className="font-medium text-emerald-700 hover:underline">
            PUAM
          </Link>{" "}
          y en qué{" "}
          <Link href="/aguinaldo/fechas" className="font-medium text-emerald-700 hover:underline">
            fecha se cobra el aguinaldo
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Cómo se movió el haber mínimo mes a mes
        </h2>
        <p className="text-zinc-600">
          Cada fila sale de aplicarle el aumento del mes al haber del mes anterior. La columna
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
          mes del aumento mensual. Los valores no se cargan a mano: un control rehace los{" "}
          {HABER_MINIMO_SERIE.length - 1} meses con la fórmula del decreto y frena la publicación
          si alguno no da exacto al centavo.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
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
            </a>
            : haber mínimo y máximo, PBU, PUAM y bases imponibles de {MES} ({V.resolucionBO}).
          </li>
          <li>
            <a
              href={bonoVigente().normaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              {bonoVigente().norma}
            </a>
            : bono extraordinario previsional de {MES} ({bonoVigente().normaBO}).
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
            </a>
            : serie mensual, consultada el {HABER_MINIMO_FUENTE.consultadoEl}.
          </li>
        </ul>
        <p className="pt-2">
          Esta página es informativa y usa valores oficiales publicados en el Boletín Oficial. No
          es una liquidación ni reemplaza a ANSES: lo que te depositan puede cambiar por
          descuentos, por el tipo de beneficio y por tu situación particular.
        </p>
      </section>
      <OtrosPaises concepto="jubilacion" />
    </article>
  );
}
