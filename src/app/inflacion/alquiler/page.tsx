import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { CalculadoraAlquiler } from "@/components/CalculadoraAlquiler";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { ORGANIZACION, articleSchema } from "@/lib/schema";
import { INFLACION_FUENTES, IPC_DIA_PUBLICACION } from "@/data/inflacion";
import { nombrePeriodo, ULTIMO_PERIODO, variacionMensual } from "@/lib/inflacion";
import { formatPct } from "@/lib/formato";
import { PRODUCTOS } from "@/lib/mp";

const PLANILLA = PRODUCTOS["planilla-alquileres"];

export const metadata: Metadata = {
  title: "Ajuste de alquiler por IPC: calculá cuánto aumenta tu alquiler",
  description:
    "Calculadora de ajuste de alquiler por IPC (INDEC): cronograma completo de aumentos trimestrales, cuatrimestrales, semestrales o anuales, y estimación del próximo ajuste.",
  alternates: { canonical: "/inflacion/alquiler" },
};

const faqs = [
  {
    q: "¿Cómo se calcula el ajuste de alquiler por IPC?",
    a: "Se toma la variación acumulada del IPC entre los meses del período: nuevo alquiler = alquiler vigente × (índice IPC final ÷ índice IPC inicial). Por ejemplo, en un ajuste trimestral se aplica la inflación acumulada de los tres meses completos anteriores al mes del ajuste. No se suman los porcentajes mensuales: se multiplican los factores, que da un poco más.",
  },
  {
    q: "¿Se usa el IPC mensual o el acumulado del período?",
    a: "El acumulado del período completo entre ajuste y ajuste. Un error común es sumar las variaciones mensuales (2% + 2% + 2% = 6%): lo correcto es componerlas (1,02 × 1,02 × 1,02 = 6,12%). La calculadora lo hace bien automáticamente, usando los índices oficiales.",
  },
  {
    q: "¿Mi contrato se ajusta por IPC o por ICL?",
    a: "Lo dice tu contrato, en la cláusula de actualización del precio. En los contratos firmados desde 2024 las partes eligen libremente el índice y la periodicidad: los más comunes son el IPC (INDEC) trimestral o cuatrimestral y el ICL (BCRA). Esta calculadora es para contratos que ajustan por IPC.",
  },
  {
    q: "¿Es legal ajustar el alquiler por IPC?",
    a: "Sí. El DNU 70/2023 derogó la ley de alquileres 27.551 (art. 249) y reescribió el artículo 1199 del Código Civil y Comercial (art. 257): las partes pueden pactar el ajuste del alquiler usando cualquier índice, público o privado, en la moneda del contrato. La periodicidad también es libre: 3, 4, 6 o 12 meses son las más usadas.",
  },
  {
    q: "¿Qué pasa con los contratos firmados antes de 2024?",
    a: "Los contratos firmados bajo la ley 27.551 (entre julio de 2020 y diciembre de 2023) en general mantienen el esquema con el que se firmaron — ajuste anual por ICL — hasta que terminen, porque las nuevas reglas no se aplican retroactivamente a los contratos en curso. Si renovaste o firmaste de nuevo desde 2024, ya corre la libertad de pacto.",
  },
  {
    q: "¿Por qué mi inmobiliaria usa el IPC 'con un mes de atraso'?",
    a: `Porque el INDEC publica cada dato ${IPC_DIA_PUBLICACION} del mes siguiente. Si tu ajuste rige desde julio, el IPC de junio recién sale a mitad de julio: muchos contratos toman entonces los últimos índices ya publicados al momento del ajuste, que corren un mes atrás. La diferencia se compensa en el ajuste siguiente; la letra del contrato define la convención exacta.`,
  },
  {
    q: "¿Puedo saber cuánto va a aumentar mi alquiler antes de que salga el dato?",
    a: "Exacto no, porque falta publicar el IPC de los meses del período. La calculadora te lo estima proyectando la última inflación mensual conocida sobre los meses que faltan, marcándolo claramente como estimación. Cuando el INDEC publique los datos, volvé y tenés el número final.",
  },
  {
    q: "¿El aumento se aplica automáticamente?",
    a: "El derecho al ajuste nace del contrato, pero el número conviene verificarlo: calculalo acá con los índices oficiales y comparalo con el que te informa la inmobiliaria o el propietario. Si difiere, pedí que te muestren la cuenta y la convención usada (qué meses tomaron).",
  },
  {
    q: "¿Se usa el IPC nacional o el de mi provincia?",
    a: "Salvo que el contrato diga otra cosa, la referencia estándar es el IPC Nacional nivel general del INDEC, que es el que usa esta calculadora. El INDEC también publica aperturas regionales, pero es raro que un contrato las use.",
  },
  {
    q: "¿Qué conviene pactar: IPC o ICL?",
    a: "El IPC sigue a los precios; el ICL combina inflación y salarios, así que suele moverse algo más suave cuando los sueldos pierden contra los precios. Para el inquilino, un índice que suba menos es mejor; para el propietario, al revés. Lo importante es entender qué firmás: con esta calculadora ves exactamente cómo evoluciona un contrato atado al IPC.",
  },
];

export default function AlquilerPage() {
  const mensual = variacionMensual(ULTIMO_PERIODO);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de ajuste de alquiler por IPC",
        url: "https://calcular.ar/inflacion/alquiler",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Ajuste de alquiler por IPC: cómo calcular tu próximo aumento",
        descripcion:
          "Cómo se ajusta un alquiler por IPC del INDEC: la fórmula (los porcentajes se componen, no se suman), la base legal del DNU 70/2023 y la demora de publicación del índice.",
        url: "/inflacion/alquiler",
        modificado: "2026-10-06",
      }),
    ],
  };

  return (
    <article className="space-y-10">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Ajuste de alquiler por IPC: calculá tu próximo aumento
        </h1>
        <p className="text-zinc-600">
          Poné el alquiler inicial, cuándo arrancó el contrato y cada cuánto se ajusta:
          te armamos el <strong>cronograma completo de aumentos</strong> con el IPC oficial del
          INDEC y te estimamos el que viene. Último dato cargado:{" "}
          {nombrePeriodo(ULTIMO_PERIODO)} ({formatPct(mensual ?? 0, 1)} mensual).
        </p>
      </header>

      <RespuestaPrimero actualizado={INFLACION_FUENTES.consultadoEl}>
        <p>
          El alquiler se ajusta multiplicando el precio vigente por la{" "}
          <strong>variación acumulada del IPC</strong> del período:{" "}
          <strong>nuevo alquiler = alquiler actual × (IPC del mes final ÷ IPC del mes inicial)</strong>.
          Clave: los porcentajes mensuales <strong>se componen, no se suman</strong> (tres meses de
          2% dan 6,12%, no 6%). Desde el DNU 70/2023 el índice (IPC o ICL) y la periodicidad (3, 4,
          6 o 12 meses) se pactan libremente en el contrato. El último IPC cargado es{" "}
          {nombrePeriodo(ULTIMO_PERIODO)} ({formatPct(mensual ?? 0, 1)} mensual). Poné tus datos en
          la calculadora de abajo para ver el cronograma completo y estimar el próximo aumento.
        </p>
      </RespuestaPrimero>

      <CalculadoraAlquiler oferta={{ precio: PLANILLA.precio, rutaLanding: PLANILLA.rutaLanding }} />

      <EmailCapture
        source="inflacion-alquiler"
        headline="¿Sos inquilino? Recibí el IPC nuevo cada lunes"
        subtext="Con ese dato se calcula tu próximo aumento. Cada lunes te mandamos un resumen corto con el último IPC del INDEC y las tasas del momento. Te das de baja con un clic."
      />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cómo se ajusta un alquiler por IPC</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Desde el DNU 70/2023, índice y periodicidad de ajuste se pactan libremente: el nuevo
            artículo 1199 del Código Civil y Comercial dice que «las partes podrán pactar el
            ajuste del valor de los alquileres» y que «será válido el uso de cualquier índice
            pactado por las partes, público o privado». En la práctica, la mayoría de los
            contratos nuevos usa el <strong>IPC del INDEC cada 3 o 4 meses</strong>, o el ICL del
            BCRA.
          </p>
          <p className="rounded-xl bg-white p-4 font-medium text-zinc-800 shadow-sm">
            Nuevo alquiler = alquiler vigente × (IPC del mes final ÷ IPC del mes inicial del
            período)
          </p>
          <p>
            Ojo con un clásico: <strong>los porcentajes mensuales no se suman, se componen</strong>.
            Tres meses de 2% no son 6%, son 6,12%. Parece poco, pero en contratos largos la
            diferencia se acumula. La calculadora compone los índices oficiales mes a mes, que es
            la cuenta correcta.
          </p>
          <p>
            El detalle operativo que genera más dudas es la <strong>demora de publicación</strong>:
            el INDEC publica el IPC de cada mes {IPC_DIA_PUBLICACION} del mes siguiente. Por eso
            algunos contratos toman los meses calendario completos anteriores al ajuste (la
            convención de esta calculadora) y otros, los últimos índices ya publicados al momento
            de ajustar. La letra del contrato manda — si tu número difiere del nuestro por un mes
            de corrimiento, probablemente sea eso.
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
          {[INFLACION_FUENTES.ipc, INFLACION_FUENTES.dnu, INFLACION_FUENTES.ccyc1199].map((f) => (
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
          Última verificación: {INFLACION_FUENTES.consultadoEl}. ¿El alquiler te come el sueldo?
          Chequeá si tu sueldo{" "}
          <Link href="/inflacion" className="text-emerald-700 underline">
            le gana a la inflación
          </Link>{" "}
          y cuánto rinde tu plata en un{" "}
          <Link href="/plazo-fijo" className="text-emerald-700 underline">
            plazo fijo
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
