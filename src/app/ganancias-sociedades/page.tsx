import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraGananciasSociedades } from "@/components/CalculadoraGananciasSociedades";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ALICUOTA_DIVIDENDOS,
  ALICUOTA_JUEGOS_DE_AZAR,
  ANIOS_SOLO_ARCA,
  ESCALA_LEY_27630,
  GANANCIAS_SOCIEDADES_FUENTES,
  GANANCIAS_SOCIEDADES_TEXTOS,
  ULTIMO_ANIO_ESCALA,
  escalaDe,
  escalaDerivadaDe,
  escalasDisponibles,
} from "@/data/ganancias-sociedades";
import { calcularGananciasSociedades } from "@/lib/ganancias-sociedades";
import { formatARS } from "@/lib/formato";

const ANIO = ULTIMO_ANIO_ESCALA;
const ESCALA = escalaDe(ANIO)!;
const [T1, T2, T3] = ESCALA.tramos;
const ESCALAS = escalasDisponibles();

const pct = (n: number, d = 2) => `${(n * 100).toLocaleString("es-AR", { maximumFractionDigits: d })}%`;

const GANANCIA_CASO = 500_000_000;
const CASO_ANTERIOR = calcularGananciasSociedades({
  gananciaNetaImponible: GANANCIA_CASO,
  anioInicioEjercicio: ANIO - 1,
  porcentajeDistribuido: 0,
})!;
const CASO_VIGENTE = calcularGananciasSociedades({
  gananciaNetaImponible: GANANCIA_CASO,
  anioInicioEjercicio: ANIO,
  porcentajeDistribuido: 1,
})!;
const DIFERENCIA = CASO_ANTERIOR.impuesto - CASO_VIGENTE.impuesto;
const DESVIO_SOLO_ARCA = ANIOS_SOLO_ARCA.map(
  (a) => (escalaDerivadaDe(a)?.tramos[0].hasta ?? 0) - (escalaDe(a)?.tramos[0].hasta ?? 0),
);

export const metadata: Metadata = {
  title: `Escala de Ganancias para sociedades ${ANIO}: 25%, 30% y 35% (tramos y calculadora)`,
  description: `Para los ejercicios iniciados en ${ANIO} la sociedad paga 25% hasta ${formatARS(T1.hasta ?? 0, 0)}, 30% hasta ${formatARS(T2.hasta ?? 0, 0)} y 35% por encima. La escala se ajusta sola por IPC y la elige el año de inicio del ejercicio, no el de cierre.`,
  alternates: { canonical: "/ganancias-sociedades" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent(`Ganancias de sociedades ${ANIO}`)}&s=${encodeURIComponent(`25% hasta ${formatARS(T1.hasta ?? 0, 0)}`)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: `¿Cuál es la escala de Ganancias para sociedades en ${ANIO}?`,
    a: `Para los ejercicios que empiezan en ${ANIO}: 25% hasta ${formatARS(T1.hasta ?? 0, 2)} de ganancia neta imponible; entre ese monto y ${formatARS(T2.hasta ?? 0, 2)}, ${formatARS(T2.fijo, 2)} más el 30% del excedente; y por encima, ${formatARS(T3.fijo, 2)} más el 35% del excedente. Son los montos de la Ley 27.630 ajustados por el IPC de octubre, y coinciden al centavo con los que publica ARCA.`,
  },
  {
    q: "¿La escala se aplica por el año de cierre o por el de inicio del ejercicio?",
    a: `Por el de inicio. El art. 73 dice que «${GANANCIAS_SOCIEDADES_TEXTOS.ejerciciosQueSeInicien}». Una sociedad que cierra el 30 de junio de ${ANIO} empezó su ejercicio en julio de ${ANIO - 1}, y liquida con la escala de ${ANIO - 1}, no con la de ${ANIO}. Con ${formatARS(GANANCIA_CASO, 0)} de ganancia, la diferencia entre una y otra es de ${formatARS(DIFERENCIA, 0)}.`,
  },
  {
    q: "¿Cómo se actualizan los tramos?",
    a: `Solos, sin decreto: la ley ordena que «${GANANCIAS_SOCIEDADES_TEXTOS.ajuste}». ARCA calcula cada año sobre los montos originales de la ley multiplicados por el IPC de octubre del año anterior dividido por el de octubre de 2020. Si se encadena año contra año redondeando en el medio, el resultado ya no da exacto.`,
  },
  {
    q: "¿Las SRL pagan la misma escala que las SA?",
    a: "Sí. La escala alcanza a las sociedades anónimas (incluidas las unipersonales), las SAS, las SRL, las sociedades en comandita, las asociaciones, fundaciones, cooperativas y mutuales en cuanto no tengan otro tratamiento, los fideicomisos del país (salvo cuando el fiduciante es el beneficiario, con excepciones) y algunos fondos comunes de inversión. También las sociedades de la Sección IV de la Ley General de Sociedades (las simples o informales) que opten por tributar así.",
  },
  {
    q: "¿Cuánto pagan los socios cuando la sociedad reparte dividendos?",
    a: `Un ${pct(ALICUOTA_DIVIDENDOS, 0)} sobre lo que cobran, retenido por la sociedad al pagar. La ley dice que «${GANANCIAS_SOCIEDADES_TEXTOS.dividendos}», y que la retención tiene «el carácter de pago único y definitivo» para las personas humanas residentes no inscriptas en el impuesto. Con ${formatARS(GANANCIA_CASO, 0)} de ganancia y todo repartido, la carga total entre sociedad y socios llega al ${pct(CASO_VIGENTE.cargaTotalEfectiva)}.`,
  },
  {
    q: "¿El 35% es la alícuota de toda la ganancia?",
    a: `No: es la marginal. Una sociedad con ${formatARS(GANANCIA_CASO, 0)} de ganancia en un ejercicio iniciado en ${ANIO} paga ${formatARS(CASO_VIGENTE.impuesto, 0)}, un ${pct(CASO_VIGENTE.alicuotaEfectiva)} efectivo, aunque su último peso tribute al ${pct(CASO_VIGENTE.alicuotaMarginal, 0)}. La efectiva se acerca al 35% recién con ganancias muy por encima del último límite.`,
  },
  {
    q: "¿Hay alguna actividad que no use la escala?",
    a: `Sí: el mismo art. 73 dispone que las rentas de casinos, máquinas de apuestas y juegos de azar por plataformas digitales tributan al ${pct(ALICUOTA_JUEGOS_DE_AZAR, 1)}, tanto para personas humanas como jurídicas. Y los establecimientos permanentes de empresas del exterior usan la escala pero pagan un 7% adicional al remesar utilidades a su casa matriz.`,
  },
  {
    q: "¿El impuesto determinado es lo que hay que pagar con la declaración jurada?",
    a: `No necesariamente. ARCA aclara: «${GANANCIAS_SOCIEDADES_TEXTOS.arcaSaldo}». La calculadora te da el impuesto determinado; el saldo a pagar depende de lo que ya ingresó la sociedad durante el año.`,
  },
];

export default function GananciasSociedadesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de Ganancias para sociedades",
        url: "https://calcular.ar/ganancias-sociedades",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: `Escala de Ganancias para sociedades ${ANIO}: tramos del art. 73 ajustados por IPC`,
        descripcion:
          "Escala del Impuesto a las Ganancias para sociedades (art. 73 LIG, Ley 27.630) año por año, cómo se ajusta por el IPC de octubre, por qué manda el año de inicio del ejercicio y el 7% de los dividendos.",
        url: "/ganancias-sociedades",
        modificado: GANANCIAS_SOCIEDADES_FUENTES.consultadoEl,
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
          Ganancias de sociedades {ANIO}: la escala del 25, 30 y 35%, y el año que de verdad la elige
        </h1>
        <p className="text-zinc-600">
          SA, SAS y SRL pagan Ganancias con una escala cuyos tramos se ajustan solos por inflación. Cargá la ganancia
          neta imponible y el año en que empezó el ejercicio: te mostramos el impuesto, la alícuota efectiva y cuánto
          suma el 7% si la sociedad reparte dividendos.
        </p>
      </header>

      <RespuestaPrimero actualizado={GANANCIAS_SOCIEDADES_FUENTES.consultadoEl}>
        <p>
          Para los ejercicios iniciados en {ANIO}: <strong>25%</strong> hasta {formatARS(T1.hasta ?? 0, 2)};{" "}
          <strong>30%</strong> sobre el excedente hasta {formatARS(T2.hasta ?? 0, 2)} (más {formatARS(T2.fijo, 2)}{" "}
          fijos); y <strong>35%</strong> por encima (más {formatARS(T3.fijo, 2)}). Manda el año de{" "}
          <strong>inicio</strong> del ejercicio: una sociedad que cierra en junio de {ANIO} usa la escala de{" "}
          {ANIO - 1}.
        </p>
      </RespuestaPrimero>

      <CalculadoraGananciasSociedades />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La escala, año por año</h2>
        <p className="text-zinc-600">
          La Ley 27.630 fijó los tramos en {formatARS(ESCALA_LEY_27630[0].hasta ?? 0, 0)} y{" "}
          {formatARS(ESCALA_LEY_27630[1].hasta ?? 0, 0)} para los ejercicios iniciados en 2021. Desde ahí, cada año
          es la escala de la ley multiplicada por el IPC de octubre del año anterior dividido por el de octubre de
          2020. Probamos la cuenta contra los PDF de ARCA y da los mismos montos, al centavo, de 2023 a {ANIO}.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Ejercicios iniciados en</th>
                  <th className="px-4 py-2.5 font-semibold">25% hasta</th>
                  <th className="px-4 py-2.5 font-semibold">30% hasta (fijo)</th>
                  <th className="px-4 py-2.5 font-semibold">35% desde (fijo)</th>
                  <th className="px-4 py-2.5 font-semibold">Origen</th>
                </tr>
              </thead>
              <tbody>
                {[...ESCALAS].reverse().map((e) => (
                  <tr key={e.anio} className="border-t border-zinc-100 align-top">
                    <td className="px-4 py-2.5 font-medium text-zinc-800">{e.anio}</td>
                    <td className="px-4 py-2.5 text-zinc-900">{formatARS(e.tramos[0].hasta ?? 0, 2)}</td>
                    <td className="px-4 py-2.5 text-zinc-900">
                      {formatARS(e.tramos[1].hasta ?? 0, 2)}
                      <span className="block text-xs text-zinc-500">{formatARS(e.tramos[1].fijo, 2)}</span>
                    </td>
                    <td className="px-4 py-2.5 text-zinc-900">
                      {formatARS(e.tramos[2].desde, 2)}
                      <span className="block text-xs text-zinc-500">{formatARS(e.tramos[2].fijo, 2)}</span>
                    </td>
                    <td className="px-4 py-2.5 text-zinc-600">
                      {e.origen === "ley"
                        ? "Ley 27.630"
                        : e.origen === "arca"
                          ? "publicada por ARCA"
                          : `ley × ${e.coeficiente?.toLocaleString("es-AR", { maximumFractionDigits: 4 })} (IPC oct. ${e.anio - 1} / oct. 2020)`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          {ANIOS_SOLO_ARCA.join(", ")}: mostramos la escala tal como la publicó ARCA. Con la serie actual del INDEC la
          cuenta da unos $634 más en el primer tramo; la de 2023 en adelante sí sale exacta. Cuando el INDEC publique
          el IPC de octubre de {ANIO}, la escala de los ejercicios iniciados en {ANIO + 1} aparece sola en esta tabla.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Por qué el año de inicio cambia la cuenta</h2>
        <p className="text-zinc-600">
          Muchas guías publican «la escala {ANIO}» sin aclarar para qué ejercicios rige. La ley la aplica a los
          ejercicios que <strong>empiezan</strong> después de cada ajuste. Una sociedad con cierre en junio de {ANIO}{" "}
          empezó en julio de {ANIO - 1} y usa la escala de {ANIO - 1}, con tramos más chicos: con{" "}
          {formatARS(GANANCIA_CASO, 0)} de ganancia paga {formatARS(CASO_ANTERIOR.impuesto, 0)} en vez de{" "}
          {formatARS(CASO_VIGENTE.impuesto, 0)}. Son <strong>{formatARS(DIFERENCIA, 0)} de diferencia</strong> por
          elegir mal la tabla.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Sociedad más dividendos: la carga completa</h2>
        <p className="text-zinc-600">
          El impuesto de la sociedad no es el final. Cuando reparte lo que le queda a socios que son personas
          humanas, retiene un {pct(ALICUOTA_DIVIDENDOS, 0)} más. En el ejemplo, con toda la ganancia repartida: la
          sociedad paga {formatARS(CASO_VIGENTE.impuesto, 0)}, los socios cobran{" "}
          {formatARS(CASO_VIGENTE.dividendos, 0)} y se les retienen {formatARS(CASO_VIGENTE.retencionDividendos, 0)}.
          Entre los dos, el {pct(CASO_VIGENTE.cargaTotalEfectiva)} de la ganancia.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-zinc-800">{f.q}</summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-2 rounded-xl bg-emerald-50/60 p-5 text-sm text-zinc-700">
        <h2 className="text-base font-semibold text-zinc-900">Si sos persona humana</h2>
        <p>
          La escala de las personas es otra (art. 94). Tu impuesto mes a mes está en{" "}
          <Link href="/ganancias" className="font-medium text-emerald-700 hover:underline">
            la calculadora de Ganancias
          </Link>
          , las pérdidas de años anteriores se actualizan en{" "}
          <Link href="/actualizacion-de-quebrantos" className="font-medium text-emerald-700 hover:underline">
            quebrantos por IPC
          </Link>{" "}
          y lo que podés restar, en{" "}
          <Link href="/deducciones-generales-ganancias" className="font-medium text-emerald-700 hover:underline">
            las deducciones generales
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {GANANCIAS_SOCIEDADES_FUENTES.lista.map((f) => (
            <li key={f.nombre}>
              <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                {f.nombre}
              </a>{" "}
              — {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Los textos legales se leyeron del texto ACTUALIZADO de InfoLEG y de la Ley 27.630 en el Boletín Oficial. Las
          escalas se calculan con la serie oficial del IPC y se controlan contra las que publica ARCA. Esta página es
          informativa y no reemplaza a un contador. Consultada el {GANANCIAS_SOCIEDADES_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
