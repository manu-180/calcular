import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraCamioneros } from "@/components/CalculadoraCamioneros";
import { JsonLd } from "@/components/JsonLd";
import {
  CAMIONEROS_BASE_MAYO,
  CAMIONEROS_FUENTES,
  CAMIONEROS_HOMOLOGACION,
  CATEGORIAS_CAMIONEROS,
  MESES_CAMIONEROS,
} from "@/data/convenios/camioneros";
import { formatARS } from "@/lib/formato";
import { datasetSchema, ORGANIZACION } from "@/lib/schema";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { SelloVerificado } from "@/components/SelloVerificado";
import { EmailCapture } from "@/components/EmailCapture";
import { calcularCamioneros } from "@/lib/convenios";

export const metadata: Metadata = {
  title: "Sueldo de camioneros 2026: calculadora y escala (CCT 40/89)",
  description:
    "Calculadora de sueldo para camioneros en Argentina 2026 según CCT 40/89. Escala salarial oficial por categoría — Chofer 1ª, 2ª, 3ª, peones y taller — con antigüedad. Paritaria verificada contra la Disposición DNRyRT 455/2026.",
  alternates: { canonical: "/convenios/camioneros" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Sueldo de camioneros 2026")}&s=${encodeURIComponent("Escala CCT 40/89 verificada — Disposición DNRyRT 455/2026")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuánto cobra un Chofer de Primera en junio 2026?",
    a: "El básico de un Chofer de Primera en junio 2026 es $1.017.089 según la escala vigente del CCT 40/89 (homologada por la Disposición DNRyRT 455/2026). A eso se suma la antigüedad (1% por año sobre el básico). El neto, descontando el 17% de aportes de ley, queda en aproximadamente $843.984.",
  },
  {
    q: "¿Qué convenio cubre a los camioneros?",
    a: "El CCT 40/89 (Convenio Colectivo de Trabajo 40/89) cubre al Transporte Automotor de Cargas, Logística y Servicios. Lo negocia la Federación Nacional de Trabajadores Camioneros y Obreros del Transporte Automotor de Cargas, Logística y Servicios (FETIAMP / Camioneros).",
  },
  {
    q: "¿Cuánto es el aumento de camioneros en 2026?",
    a: "La paritaria 2026 acordó aumentos escalonados: marzo +2,0%, abril +1,8%, mayo +1,7%, junio +1,6%, julio +1,5% y agosto +1,5% (todos aplicados sobre el básico del mes anterior). El acuerdo está homologado por la Disposición DNRyRT 455/2026. La acumulación total marzo-agosto 2026 es de aproximadamente +10,7%.",
  },
  {
    q: "¿Hay zonas o regiones en la escala de camioneros?",
    a: "No. El CCT 40/89 establece una escala nacional única, a diferencia de otros convenios como UOCRA que tiene cuatro zonas geográficas. Todos los trabajadores incluidos en el CCT cobran el mismo básico sin importar la provincia.",
  },
  {
    q: "¿Cómo se calcula la antigüedad en el convenio de camioneros?",
    a: "El CCT 40/89 reconoce un adicional por antigüedad del 1% del sueldo básico por cada año de servicio en la empresa. Con 10 años de antigüedad, por ejemplo, el adicional es el 10% del básico del mes.",
  },
  {
    q: "¿Qué diferencia hay entre Chofer de Primera, Segunda y Tercera?",
    a: "Las categorías de chofer se distinguen principalmente por el tipo de vehículo y la responsabilidad. Chofer de Primera maneja equipos de mayor tonelaje o complejidad; Chofer de Segunda y Tercera tienen escala menor de acuerdo a las características del trabajo definidas en el CCT. Las diferencias salariales reflejan esa gradación.",
  },
  {
    q: "¿El sueldo del convenio ya incluye el SAC (aguinaldo)?",
    a: "No. El básico del convenio es el sueldo mensual regular. El SAC (aguinaldo) es adicional: equivale al 50% del mejor sueldo mensual del semestre y se paga en dos cuotas anuales (30 de junio y 18 de diciembre). Podés calcularlo en la calculadora de aguinaldo.",
  },
];

// El mediodía evita que "2026-06-13" se corra un día al pasar de UTC a la zona de AR.
const VERIFICADO_EL = new Intl.DateTimeFormat("es-AR", { dateStyle: "long" }).format(
  new Date(`${CAMIONEROS_FUENTES.circular.consultadoEl}T12:00:00`),
);

export default function CamionerosPage() {
  const junio = MESES_CAMIONEROS.find((m) => m.id === "junio-2026")!;
  const junioChofer1 =
    CAMIONEROS_BASE_MAYO["chofer-primera"] * junio.factorDesdeMayo;
  const junioAyudante =
    CAMIONEROS_BASE_MAYO["ayudante-mayor"] * junio.factorDesdeMayo;
  // Neto computado (regla 2-2): Chofer de Primera, sin antigüedad.
  const chofer1 = calcularCamioneros({
    mesId: "junio-2026",
    categoriaId: "chofer-primera",
    aniosAntiguedad: 0,
  })!;

  const grupos = Array.from(new Set(CATEGORIAS_CAMIONEROS.map((c) => c.grupo)));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      datasetSchema({
        nombre: "Escala salarial Camioneros 2026 (CCT 40/89)",
        descripcion:
          "Básicos por categoría del CCT 40/89 (Transporte Automotor de Cargas), marzo a agosto de 2026, escala nacional única, verificados contra la Disposición DNRyRT 455/2026.",
        url: "/convenios/camioneros",
        modificado: "2026-06-13",
        fuenteNombre: CAMIONEROS_HOMOLOGACION,
      }),
      {
        "@type": "WebApplication",
        name: "Calculadora de sueldo Camioneros (CCT 40/89)",
        url: "https://calcular.ar/convenios/camioneros",
        applicationCategory: "FinanceApplication",
        inLanguage: "es-AR",
        description:
          "Calculadora de sueldo para el convenio de camioneros (CCT 40/89). Escala salarial verificada, con antigüedad y descuentos.",
        isPartOf: {
          "@type": "WebSite",
          url: "https://calcular.ar",
        },
      },
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
        <nav className="text-sm text-zinc-500">
          <Link href="/convenios" className="hover:text-emerald-700">
            Convenios
          </Link>{" "}
          /
        </nav>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Sueldo de camioneros 2026 — calculadora CCT 40/89
        </h1>
        <p className="text-zinc-600">
          Escala salarial oficial del{" "}
          <strong>Convenio Colectivo de Trabajo 40/89</strong> (Transporte Automotor de
          Cargas, Logística y Servicios), homologada por la{" "}
          <strong>Disposición DNRyRT 455/2026</strong>. En junio 2026 el básico de un Chofer
          de Primera es{" "}
          <strong className="text-zinc-900">{formatARS(junioChofer1, 0)}</strong> y el de
          Ayudante mayor de 18 años es{" "}
          <strong className="text-zinc-900">{formatARS(junioAyudante, 0)}</strong>.
        </p>
      </header>

      <SelloVerificado
        verificadoEl={VERIFICADO_EL}
        fuente={CAMIONEROS_FUENTES.circular}
        norma={`CCT 40/89 · ${CAMIONEROS_HOMOLOGACION}`}
      />

      <RespuestaPrimero actualizado={VERIFICADO_EL}>
        <p>
          Un <strong>Chofer de Primera</strong> del convenio de Camioneros (CCT 40/89, transporte
          automotor de cargas) cobra en junio 2026 un básico de{" "}
          <strong>{formatARS(junioChofer1, 0)}</strong>; con el 17% de aportes de ley y sin
          antigüedad, el neto ronda <strong>≈ {formatARS(chofer1.neto, 0)}</strong>. El CCT 40/89
          tiene <strong>escala nacional única</strong> (sin zonas) y suma 1% por año de
          antigüedad; los valores salen de la paritaria homologada por la Disposición DNRyRT
          455/2026.
        </p>
      </RespuestaPrimero>

      <CalculadoraCamioneros />

      <EmailCapture
        source="convenio-camioneros"
        headline="Avisame cuando cambie la escala de Camioneros"
        subtext="El CCT 40/89 se actualiza varias veces al año. Actualizamos esta página apenas sale el acuerdo homologado y te avisamos por mail el mismo día. Sin spam."
      />

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">
          Escala de básicos de junio 2026
        </h2>
        <p className="text-sm text-zinc-600">
          Valores según la Disposición DNRyRT 455/2026. El CCT 40/89 establece una{" "}
          <strong>escala nacional única</strong> — no hay diferencias por zona o provincia.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Categoría</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Básico junio 2026</th>
                </tr>
              </thead>
              <tbody>
                {grupos.map((grupo) => (
                  <>
                    <tr key={`head-${grupo}`} className="border-t border-zinc-100">
                      <td
                        colSpan={2}
                        className="bg-zinc-50/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-400"
                      >
                        {grupo}
                      </td>
                    </tr>
                    {CATEGORIAS_CAMIONEROS.filter((c) => c.grupo === grupo).map((cat) => (
                      <tr key={cat.id} className="border-t border-zinc-100">
                        <td className="px-4 py-2.5 text-zinc-600">{cat.nombre}</td>
                        <td className="px-4 py-2.5 text-right font-medium text-zinc-900">
                          {formatARS(
                            CAMIONEROS_BASE_MAYO[cat.id] * junio.factorDesdeMayo,
                            0
                          )}
                        </td>
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Ver tabla completa mes a mes:{" "}
          {MESES_CAMIONEROS.map((m, i) => (
            <span key={m.id}>
              {i > 0 && " · "}
              <Link
                href={`/convenios/camioneros/${m.id}`}
                className="text-emerald-700 hover:underline"
              >
                {m.etiqueta}
              </Link>
            </span>
          ))}
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">
          Aumentos de la paritaria 2026
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            La Disposición DNRyRT 455/2026 homologó el acuerdo salarial de Camioneros para
            el período marzo-agosto 2026. Los aumentos se aplican en tramos mensuales sobre
            el básico del mes anterior:
          </p>
          <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Mes</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Aumento</th>
                  <th className="px-4 py-2.5 text-zinc-500 font-normal hidden sm:table-cell">
                    Detalle
                  </th>
                </tr>
              </thead>
              <tbody>
                {MESES_CAMIONEROS.map((m) => (
                  <tr key={m.id} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 text-zinc-700">{m.etiqueta}</td>
                    <td className="px-4 py-2.5 text-right font-medium text-zinc-900">
                      {m.id === "marzo-2026"
                        ? "+2,0%"
                        : m.id === "abril-2026"
                          ? "+1,8%"
                          : m.id === "mayo-2026"
                            ? "+1,7%"
                            : m.id === "junio-2026"
                              ? "+1,6%"
                              : "+1,5%"}
                    </td>
                    <td className="px-4 py-2.5 text-sm text-zinc-500 hidden sm:table-cell">
                      {m.cambios}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-zinc-500">
            El acumulado marzo-agosto 2026 es de aproximadamente{" "}
            <strong className="text-zinc-700">+10,7%</strong>. El convenio incluye una cláusula de revisión: si la inflación supera ese porcentaje, las partes deben renegociar.
          </p>
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

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Fuentes oficiales</h2>
        <ul className="space-y-1.5 text-sm text-zinc-600">
          <li>
            •{" "}
            <a
              href={CAMIONEROS_FUENTES.circular.url}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              {CAMIONEROS_FUENTES.circular.nombre}
            </a>
          </li>
          <li>
            •{" "}
            <a
              href={CAMIONEROS_FUENTES.verificacion.url}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              {CAMIONEROS_FUENTES.verificacion.nombre}
            </a>
          </li>
        </ul>
        <p className="text-xs text-zinc-400">
          Escala verificada contra la {CAMIONEROS_HOMOLOGACION}. Última verificación:{" "}
          {CAMIONEROS_FUENTES.circular.consultadoEl}. Mirá{" "}
          <Link href="/sueldo-neto/camioneros" className="text-emerald-700 underline">
            cuánto te queda en mano por categoría
          </Link>
          , o calculá tu{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            aguinaldo
          </Link>
          , tus{" "}
          <Link href="/vacaciones" className="text-emerald-700 underline">
            vacaciones
          </Link>{" "}
          y tu{" "}
          <Link href="/indemnizacion" className="text-emerald-700 underline">
            indemnización
          </Link>
          .
        </p>
        <p className="text-xs text-zinc-400">
          Desde junio de 2026 el recibo de sueldo tiene un{" "}
          <Link
            href="/blog/nuevo-recibo-de-sueldo-2026"
            className="text-emerald-700 underline"
          >
            formato nuevo (Decreto 407/2026)
          </Link>
          : cuatro secciones y el costo laboral del empleador a la vista. Tu sueldo en mano no
          cambia.
        </p>
      </section>
    </article>
  );
}
