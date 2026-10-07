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
  title: "Ajuste de alquiler por IPC 2026: calculadora",
  description:
    "Calculá el aumento de tu alquiler con el IPC del INDEC: cronograma de ajustes cada 3, 4, 6 o 12 meses y estimación del próximo aumento.",
  alternates: { canonical: "/inflacion/alquiler" },
};

const faqs = [
  {
    q: "¿Cómo se calcula el ajuste de alquiler por IPC?",
    a: "Se toma la inflación acumulada del período: nuevo alquiler = alquiler vigente × (índice IPC final ÷ índice IPC inicial). Por ejemplo, en un ajuste cada tres meses se aplica la inflación acumulada de los tres meses completos anteriores al mes del ajuste. Los porcentajes de cada mes no se suman: se multiplican, y eso da un poco más.",
  },
  {
    q: "¿Se usa el IPC mensual o el acumulado del período?",
    a: "El acumulado de todo el período entre un ajuste y otro. Un error común es sumar los porcentajes de cada mes (2% + 2% + 2% = 6%). Lo correcto es multiplicarlos (1,02 × 1,02 × 1,02 = 6,12%). La calculadora lo hace bien sola, con los índices oficiales.",
  },
  {
    q: "¿Mi contrato se ajusta por IPC o por ICL?",
    a: "Lo dice tu contrato, en la cláusula de actualización del precio. En los contratos firmados desde 2024 las partes eligen libremente el índice y cada cuánto se ajusta. Los más comunes son el IPC (INDEC) cada tres o cuatro meses y el ICL (BCRA). Esta calculadora es para contratos que ajustan por IPC.",
  },
  {
    q: "¿Es legal ajustar el alquiler por IPC?",
    a: "Sí. El DNU 70/2023 derogó la ley de alquileres 27.551 (art. 249) y reescribió el artículo 1199 del Código Civil y Comercial (art. 257). Las partes pueden pactar el ajuste del alquiler con cualquier índice, público o privado, en la moneda del contrato. Cada cuánto se ajusta también es libre: cada 3, 4, 6 o 12 meses es lo más usado.",
  },
  {
    q: "¿Qué pasa con los contratos firmados antes de 2024?",
    a: "Los contratos firmados con la ley 27.551 (entre julio de 2020 y diciembre de 2023) en general siguen con el esquema con el que se firmaron (ajuste anual por ICL) hasta que terminen, porque las reglas nuevas no se aplican hacia atrás a los contratos en curso. Si renovaste o firmaste de nuevo desde 2024, ya podés pactar libremente.",
  },
  {
    q: "¿Por qué mi inmobiliaria usa el IPC 'con un mes de atraso'?",
    a: `Porque el INDEC publica cada dato ${IPC_DIA_PUBLICACION} del mes siguiente. Si tu ajuste rige desde julio, el IPC de junio recién sale a mitad de julio. Por eso muchos contratos toman los últimos índices ya publicados al momento del ajuste, que van un mes atrás. La diferencia se compensa en el ajuste siguiente. Lo que diga tu contrato define cómo se cuenta.`,
  },
  {
    q: "¿Puedo saber cuánto va a aumentar mi alquiler antes de que salga el dato?",
    a: "Exacto no, porque falta que se publique el IPC de los meses del período. La calculadora te lo estima: repite la última inflación mensual conocida en los meses que faltan y lo marca claramente como estimación. Cuando el INDEC publique los datos, volvé y vas a tener el número final.",
  },
  {
    q: "¿El aumento se aplica automáticamente?",
    a: "El derecho al ajuste sale del contrato, pero conviene verificar el número. Calculalo acá con los índices oficiales y comparalo con el que te pasa la inmobiliaria o el dueño. Si no coincide, pedí que te muestren la cuenta y qué meses tomaron.",
  },
  {
    q: "¿Se usa el IPC nacional o el de mi provincia?",
    a: "Salvo que el contrato diga otra cosa, se usa el IPC Nacional nivel general del INDEC, que es el que usa esta calculadora. El INDEC también publica índices por región, pero es raro que un contrato los use.",
  },
  {
    q: "¿Qué conviene pactar: IPC o ICL?",
    a: "El IPC sigue a los precios. El ICL mezcla inflación y sueldos, así que suele subir un poco menos cuando los sueldos pierden contra los precios. Para el inquilino conviene un índice que suba menos; para el dueño, al revés. Lo importante es entender qué firmás: con esta calculadora ves exactamente cómo evoluciona un contrato atado al IPC.",
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
          Poné el alquiler inicial, cuándo arrancó el contrato y cada cuánto se ajusta. Te armamos
          el <strong>calendario completo de aumentos</strong> con el IPC oficial del INDEC y te
          estimamos el que viene. Último dato cargado:{" "}
          {nombrePeriodo(ULTIMO_PERIODO)} ({formatPct(mensual ?? 0, 1)} mensual).
        </p>
      </header>

      <RespuestaPrimero actualizado={INFLACION_FUENTES.consultadoEl}>
        <p>
          El alquiler se ajusta multiplicando el precio actual por la{" "}
          <strong>inflación acumulada del IPC</strong> en el período:{" "}
          <strong>nuevo alquiler = alquiler actual × (IPC del mes final ÷ IPC del mes inicial)</strong>.
          La clave: los porcentajes de cada mes <strong>se multiplican, no se suman</strong> (tres
          meses de 2% dan 6,12%, no 6%). Desde el DNU 70/2023, el índice (IPC o ICL) y cada cuánto se
          ajusta (3, 4, 6 o 12 meses) se pactan libremente en el contrato. El último IPC cargado es{" "}
          {nombrePeriodo(ULTIMO_PERIODO)} ({formatPct(mensual ?? 0, 1)} mensual). Poné tus datos en
          la calculadora de abajo para ver todos los aumentos y estimar el próximo.
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
            Desde el DNU 70/2023, el índice y cada cuánto se ajusta se pactan libremente. El nuevo
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
            Ojo con un error clásico: <strong>los porcentajes de cada mes no se suman, se
            multiplican</strong>. Tres meses de 2% no son 6%, son 6,12%. Parece poco, pero en
            contratos largos la diferencia se acumula. La calculadora multiplica los índices
            oficiales mes a mes, que es la cuenta correcta.
          </p>
          <p>
            Lo que más dudas genera es la <strong>demora en la publicación</strong>: el INDEC publica
            el IPC de cada mes {IPC_DIA_PUBLICACION} del mes siguiente. Por eso algunos contratos
            toman los meses completos anteriores al ajuste (como hace esta calculadora) y otros, los
            últimos índices ya publicados al momento de ajustar. Manda lo que diga el contrato. Si tu
            número no coincide con el nuestro por un mes de diferencia, seguramente es eso. Si sos
            dueño y tenés varios contratos, la{" "}
            <Link href="/planillas/alquileres" className="text-emerald-700 underline">
              planilla de alquileres en Excel
            </Link>{" "}
            te los ordena. Y si sos inquilino, revisá la{" "}
            <Link href="/deduccion-alquiler" className="text-emerald-700 underline">
              deducción del alquiler en Ganancias
            </Link>
            .
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
