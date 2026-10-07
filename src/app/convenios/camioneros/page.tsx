import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraCamioneros } from "@/components/CalculadoraCamioneros";
import { datosOferta } from "@/lib/oferta";
import { JsonLd } from "@/components/JsonLd";
import {
  CAMIONEROS_BASE_MAYO,
  CAMIONEROS_FUENTES,
  CAMIONEROS_HOMOLOGACION,
  CATEGORIAS_CAMIONEROS,
  MESES_CAMIONEROS,
  basicoCamioneros,
} from "@/data/convenios/camioneros";
import { formatARS } from "@/lib/formato";
import { datasetSchema, ORGANIZACION } from "@/lib/schema";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { SelloVerificado } from "@/components/SelloVerificado";
import { EmailCapture } from "@/components/EmailCapture";
import { calcularCamioneros } from "@/lib/convenios";
import { periodoDeMes, vigenteEn } from "@/lib/hoy";

export const metadata: Metadata = {
  title: "Sueldo de camioneros 2026: escala CCT 40/89",
  description:
    "Escala salarial de Camioneros 2026 por categoría (chofer de 1ª, 2ª y 3ª, peones y taller) con antigüedad y calculadora, homologada por la DNRyRT.",
  alternates: { canonical: "/convenios/camioneros" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Sueldo de camioneros 2026")}&s=${encodeURIComponent("Escala CCT 40/89 verificada (Disposición DNRyRT 455/2026)")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

// El mes que se muestra es el que se liquida hoy, o el último con planilla firmada si la escala
// siguiente todavía no salió (src/lib/hoy.ts). Nunca un mes fijo escrito a mano.
const MES = vigenteEn(MESES_CAMIONEROS, periodoDeMes);
const MES_TXT = MES.etiqueta.toLowerCase();
const PRIMERO = MESES_CAMIONEROS[0];
const ULTIMO = MESES_CAMIONEROS[MESES_CAMIONEROS.length - 1];
const CHOFER1_MES = basicoCamioneros(MES.id, "chofer-primera")!;
const CHOFER1_NETO = calcularCamioneros({ mesId: MES.id, categoriaId: "chofer-primera", aniosAntiguedad: 0 })!.neto;
// Variación real del básico del Chofer de Primera mes a mes, leída de las planillas firmadas. En
// marzo no hay planilla anterior cargada: se muestra el tramo del acuerdo (+2,0%).
const VARIACION: Record<string, string> = Object.fromEntries(
  MESES_CAMIONEROS.map((m, i) => {
    if (i === 0) return [m.id, "+2,0%"];
    const v = basicoCamioneros(m.id, "chofer-primera")! / basicoCamioneros(MESES_CAMIONEROS[i - 1].id, "chofer-primera")! - 1;
    return [m.id, `+${(v * 100).toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 2 })}%`];
  }),
);
const ACUMULADO = (
  (basicoCamioneros(ULTIMO.id, "chofer-primera")! / basicoCamioneros(PRIMERO.id, "chofer-primera")!) * 1.02 - 1
) * 100;

const faqs = [
  {
    q: `¿Cuánto cobra un Chofer de Primera en ${MES_TXT}?`,
    a: `El básico de un Chofer de Primera en ${MES_TXT} es ${formatARS(CHOFER1_MES, 0)}, según la escala del CCT 40/89 (acuerdo homologado por la Disposición DNRyRT 455/2026, con la revisión de julio). A eso se suma la antigüedad: 1% del básico por cada año. Después de descontar el 17% de aportes de ley, te quedan unos ${formatARS(CHOFER1_NETO, 0)} en mano.`,
  },
  {
    q: "¿Qué convenio cubre a los camioneros?",
    a: "El CCT 40/89 (Convenio Colectivo de Trabajo 40/89), que cubre el transporte automotor de cargas, la logística y los servicios. Lo negocia la Federación Nacional de Trabajadores Camioneros y Obreros del Transporte Automotor de Cargas, Logística y Servicios (FETIAMP, Camioneros).",
  },
  {
    q: "¿Cuánto es el aumento de camioneros en 2026?",
    a: `El acuerdo del 13/3/2026 (homologado por la Disposición DNRyRT 455/2026) fijó aumentos mensuales sobre el básico del mes anterior: marzo +2,0%, abril +1,8% (y la suma no remunerativa de marzo pasó al básico), mayo +1,7% y junio +1,6%. Julio no quedó en el +1,5% original: la revisión de la cláusula TERCERA lo llevó a +4,22% sobre junio. Agosto sumó +1,5% sobre ese julio revisado. En total, el básico del Chofer de Primera subió ${ACUMULADO.toLocaleString("es-AR", { maximumFractionDigits: 1 })}% entre febrero y agosto de 2026. El 18/9/2026 se firmó el acuerdo siguiente (septiembre de 2026 a febrero de 2027). Cargamos esos básicos cuando FADEEAC publique las planillas firmadas. Hasta entonces, la de ${ULTIMO.etiqueta.toLowerCase()} es la última escala con planilla oficial.`,
  },
  {
    q: "¿Hay zonas o regiones en la escala de camioneros?",
    a: "El básico no cambia por provincia: el CCT 40/89 tiene una sola escala nacional (UOCRA, en cambio, tiene cuatro zonas). Lo que sí cambia por zona son los viáticos y recargos (ítems 4.2.3 y 4.2.4). Si vivís al sur del Río Colorado los cobrás con coeficiente 1,20, y al sur del Río Santa Cruz con 1,40. Los ítems de comida, viático especial y pernoctada suben 20% y 40% en cada caso. O sea: mismo básico, distinto bolsillo final.",
  },
  {
    q: "¿Cómo se calcula la antigüedad en el convenio de camioneros?",
    a: "El CCT 40/89 paga un adicional del 1% del básico por cada año que trabajaste en la empresa. Con 10 años de antigüedad, por ejemplo, el adicional es el 10% del básico del mes.",
  },
  {
    q: "¿Qué diferencia hay entre Chofer de Primera, Segunda y Tercera?",
    a: "Se distinguen sobre todo por el tipo de vehículo y la responsabilidad. El Chofer de Primera maneja equipos más pesados o más complejos. Segunda y Tercera cobran menos, según las tareas que define el CCT para cada una. Los sueldos siguen ese mismo orden.",
  },
  {
    q: "¿El sueldo del convenio ya incluye el SAC (aguinaldo)?",
    a: "No. El básico del convenio es el sueldo de todos los meses. El aguinaldo (en la ley se llama SAC) va aparte: es el 50% del mejor sueldo del semestre y se paga en dos cuotas por año (30 de junio y 18 de diciembre). Lo podés calcular en la calculadora de aguinaldo.",
  },
];

// El mediodía evita que "2026-06-13" se corra un día al pasar de UTC a la zona de AR.
const VERIFICADO_EL = new Intl.DateTimeFormat("es-AR", { dateStyle: "long" }).format(
  new Date(`${CAMIONEROS_FUENTES.circular.consultadoEl}T12:00:00`),
);

export default function CamionerosPage() {
  const junio = MES;
  const junioChofer1 = CHOFER1_MES;
  const junioAyudante = basicoCamioneros(MES.id, "ayudante-mayor")!;
  const chofer1 = { neto: CHOFER1_NETO };

  const grupos = Array.from(new Set(CATEGORIAS_CAMIONEROS.map((c) => c.grupo)));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      datasetSchema({
        nombre: "Escala salarial Camioneros 2026 (CCT 40/89)",
        descripcion:
          "Básicos por categoría del CCT 40/89 (Transporte Automotor de Cargas), marzo a agosto de 2026, escala nacional única, transcriptos de las planillas salariales firmadas que publica FADEEAC.",
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
          Sueldo de camioneros 2026: calculadora CCT 40/89
        </h1>
        <p className="text-zinc-600">
          La escala oficial del{" "}
          <strong>Convenio Colectivo de Trabajo 40/89</strong> (transporte automotor de
          cargas, logística y servicios), homologada por la{" "}
          <strong>Disposición DNRyRT 455/2026</strong>. En {MES_TXT} el básico de un Chofer
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
          automotor de cargas) cobra en {MES_TXT} un básico de{" "}
          <strong>{formatARS(junioChofer1, 0)}</strong>. Sin antigüedad y con el 17% de aportes
          de ley, en mano le quedan unos <strong>{formatARS(chofer1.neto, 0)}</strong>. El CCT
          40/89 tiene <strong>una sola escala para todo el país</strong> (sin zonas) y suma 1% por
          año de antigüedad. Los valores salen de la paritaria homologada por la Disposición DNRyRT
          455/2026.
        </p>
      </RespuestaPrimero>

      <CalculadoraCamioneros oferta={datosOferta("planilla-camioneros")} />

      <EmailCapture
        source="convenio-camioneros"
        headline="Avisame cuando cambie la escala de Camioneros"
        subtext="El CCT 40/89 cambia varias veces por año. Actualizamos esta página apenas sale el acuerdo homologado y te avisamos por mail ese mismo día. Sin spam."
      />

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">
          Escala de básicos de {MES_TXT}
        </h2>
        <p className="text-sm text-zinc-600">
          Valores según la Disposición DNRyRT 455/2026. El CCT 40/89 tiene{" "}
          <strong>una sola escala nacional</strong>: no cambia por zona ni por provincia.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Categoría</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Básico {MES_TXT}</th>
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
                            basicoCamioneros(junio.id, cat.id)!,
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
            La Disposición DNRyRT 455/2026 homologó el acuerdo salarial de Camioneros de marzo
            a agosto de 2026. Cada mes, el aumento se aplica sobre el básico del mes anterior:
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
                      {VARIACION[m.id]}
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
            Entre febrero y {ULTIMO.etiqueta.toLowerCase()} el básico del Chofer de Primera subió{" "}
            <strong className="text-zinc-700">
              +{ACUMULADO.toLocaleString("es-AR", { maximumFractionDigits: 1 })}%
            </strong>
            , contando la incorporación de la suma de marzo y la revisión de julio (cláusula
            TERCERA), que reemplazó el +1,5% original por +4,22%.
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
