import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraDeduccionesGenerales } from "@/components/CalculadoraDeduccionesGenerales";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ANIO_FISCAL_VIGENTE,
  DEDUCCIONES_GENERALES_FUENTES,
  DEDUCCIONES_GENERALES_TEXTOS,
  TOPE_INTERESES_HIPOTECARIOS,
  TOPE_SEGUROS_BASE,
  TOPE_SEGUROS_VIGENTE,
  TOPE_SEPELIO,
  TOPES_SEGUROS_ANTERIORES,
  topesSegurosDerivados,
} from "@/data/deducciones-generales";
import { calcularDeduccionesGenerales } from "@/lib/deducciones-generales";
import { formatARS } from "@/lib/formato";

function datosDelMes() {
  const TOPES = topesSegurosDerivados();

  const CASO = calcularDeduccionesGenerales({
    brutoMensual: 3_500_000,
    conyuge: false,
    hijos: 0,
    prepagaAnual: 180_000 * 12,
    honorariosFacturadosAnual: 600_000,
    honorariosReintegradosAnual: 0,
    seguroVidaAnual: 400_000,
    seguroRetiroAnual: 0,
    donacionesAnual: 0,
    interesesHipotecariosAnual: 0,
  });
  const PREPAGA = CASO.lineas.find((l) => l.id === "prepaga")!;
  const HONORARIOS = CASO.lineas.find((l) => l.id === "honorarios")!;

  const pct = (n: number) => (n * 100).toLocaleString("es-AR", { maximumFractionDigits: 1 });
  const TOPE_TXT = formatARS(TOPE_SEGUROS_VIGENTE, 2);

  const ANIO = ANIO_FISCAL_VIGENTE;
  return { TOPES, CASO, PREPAGA, HONORARIOS, pct, TOPE_TXT, ANIO };
}

type DatosDelMes = ReturnType<typeof datosDelMes>;

const metadataDelMes = ({ ANIO }: DatosDelMes): Metadata => ({
  title: `Deducciones de Ganancias ${ANIO}: prepaga, médicos, seguros`,
  description: `Topes ${ANIO_FISCAL_VIGENTE} de prepaga, honorarios médicos, donaciones y seguro de vida en Ganancias. Calculá cuánto deducís y cuánto te vuelve según tu sueldo.`,
  alternates: { canonical: "/deducciones-generales-ganancias" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Deducciones generales de Ganancias")}&s=${encodeURIComponent(`Seguro de vida ${ANIO_FISCAL_VIGENTE}: tope ${formatARS(TOPE_SEGUROS_VIGENTE, 0)}`)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
});

export function generateMetadata(): Metadata {
  return metadataDelMes(datosDelMes());
}

const crearFaqs = ({ CASO, PREPAGA, HONORARIOS, pct, TOPE_TXT }: DatosDelMes) => [
  {
    q: `¿Cuál es el tope del seguro de vida en Ganancias ${ANIO_FISCAL_VIGENTE}?`,
    a: `${TOPE_TXT} por año. Y el mismo monto, aparte, para lo que pongas en un seguro de retiro privado. No sale de un decreto nuevo cada año: el art. 78 de la Ley 27.743 dispuso que el monto de 2022 (${formatARS(TOPE_SEGUROS_BASE.monto, 2)}, del Decreto 18/2023) se ajuste solo desde 2023 «considerando la variación anual del Índice de Precios al Consumidor (IPC)… correspondiente al mes de octubre del año anterior al del ajuste respecto del mismo mes del año anterior». Con los índices oficiales del INDEC, esa cuenta da exactamente la tabla que publica ARCA, al centavo.`,
  },
  {
    q: "En la ley dice que el tope son cuatro centavos, ¿está vigente?",
    a: `No. El texto del inciso b) todavía dice «${DEDUCCIONES_GENERALES_TEXTOS.cuatroCentavos}», y es lo primero que aparece al leer la ley. Pero el último párrafo del mismo artículo (reemplazado por la Ley 27.743) manda usar el monto del Decreto 18/2023 ajustado por IPC.`,
  },
  {
    q: "¿Cuánto de la prepaga puedo deducir?",
    a: `Lo que pagaste por vos y tu familia a cargo, hasta el 5% de tu ganancia neta del año. En el caso de esta página (sueldo bruto de ${formatARS(3_500_000, 0)} y cuota de ${formatARS(180_000, 0)} por mes) el límite es ${formatARS(PREPAGA.limite, 0)} y quedan afuera ${formatARS(PREPAGA.excedente, 0)}. ARCA lo describe así en el SiRADIG: «${DEDUCCIONES_GENERALES_TEXTOS.arcaPrepaga}».`,
  },
  {
    q: "¿El 5% de la prepaga y el 5% de los médicos son el mismo?",
    a: "No: cada inciso tiene su propio límite. La prepaga (inc. f), los honorarios médicos (inc. g) y las donaciones (inc. c) llegan cada uno hasta el 5% de la misma base. Si pagás prepaga y además tenés consultas facturadas, podés llegar a deducir hasta el 10% entre las dos.",
  },
  {
    q: "¿Sobre qué ganancia se calcula ese 5%?",
    a: `Sobre una más grande de lo que parece. La ley dice que los porcentajes «${DEDUCCIONES_GENERALES_TEXTOS.baseCincoPorCiento}». Es decir: antes de restar la prepaga, los honorarios, las donaciones y las deducciones personales (mínimo no imponible, especial, cónyuge e hijos). Si sos empleado, se parece mucho más a tu sueldo bruto del año menos aportes que a la ganancia imponible del recibo.`,
  },
  {
    q: "¿Cuánto se deduce de los honorarios médicos?",
    a: `El 40% de lo facturado, y ese 40% con tope en el 5% de la ganancia neta. La ley pide que «${DEDUCCIONES_GENERALES_TEXTOS.honorarios}». Si la prepaga te devolvió parte de una consulta, esa parte no entra. En el caso de ejemplo, ${formatARS(600_000, 0)} facturados dan ${formatARS(HONORARIOS.deducible, 0)} para deducir.`,
  },
  {
    q: "Si pago más seguro de vida que el tope, ¿lo pierdo?",
    a: `No: el inciso b) dice que «${DEDUCCIONES_GENERALES_TEXTOS.diferimiento}», siempre con el tope de cada año. Para el seguro de retiro (inciso i) la ley no trae esa regla, así que la calculadora muestra lo que sobra como algo que no pasa a otros años.`,
  },
  {
    q: "¿Cuánto se deduce por intereses de un crédito hipotecario?",
    a: `${formatARS(TOPE_INTERESES_HIPOTECARIOS, 0)} por año, y es un número fijo: no tiene ajuste. La ley permite deducir «${DEDUCCIONES_GENERALES_TEXTOS.hipotecario}». Lo mismo pasa con los gastos de sepelio: ARCA sigue publicando un tope de ${formatARS(TOPE_SEPELIO, 2)}.`,
  },
  {
    q: "¿Deducir es lo mismo que recuperar la plata?",
    a: `No. La deducción baja la base del impuesto. Lo que te vuelve es lo deducido multiplicado por tu alícuota. En el caso de ejemplo se deducen ${formatARS(CASO.totalDeducible, 0)} y el impuesto baja ${formatARS(CASO.ahorroAnual, 0)}: el ${pct(CASO.alicuotaEfectiva)}%. Si no pagás Ganancias, no te vuelve nada.`,
  },
  {
    q: "¿Dónde se cargan?",
    a: "Si trabajás en relación de dependencia, en el formulario 572 web (SiRADIG), en «Deducciones y desgravaciones», y tu empleador las descuenta en la retención. Si presentás declaración jurada anual, van ahí. Los honorarios tienen que estar facturados a tu nombre o al de un familiar a tu cargo.",
  },
];

export default function DeduccionesGeneralesPage() {
  const datos = datosDelMes();
  const { TOPES, CASO, TOPE_TXT } = datos;
  const faqs = crearFaqs(datos);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de deducciones generales de Ganancias",
        url: "https://calcular.ar/deducciones-generales-ganancias",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: `Deducciones generales de Ganancias ${ANIO_FISCAL_VIGENTE}: prepaga, honorarios médicos, seguros y topes`,
        descripcion:
          "Topes de las deducciones generales del art. 85 de la Ley de Ganancias: seguro de vida y de retiro ajustados por el IPC de octubre, límites del 5% de prepaga, honorarios médicos y donaciones, e intereses hipotecarios.",
        url: "/deducciones-generales-ganancias",
        modificado: DEDUCCIONES_GENERALES_FUENTES.consultadoEl,
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
          Deducciones generales de Ganancias {ANIO_FISCAL_VIGENTE}: el seguro de vida topea en {TOPE_TXT}, y la
          prepaga en tu 5%
        </h1>
        <p className="text-zinc-600">
          Prepaga, consultas médicas, seguro de vida, seguro de retiro, donaciones e intereses hipotecarios: cada uno
          tiene su propio límite, y dos de ellos cambian solos todos los años. Cargá lo que pagaste y te mostramos
          cuánto entra, cuánto queda afuera y <strong>cuánta plata te vuelve de verdad</strong>. Si derivaste tus
          aportes a una prepaga, mirá antes{" "}
          <Link href="/derivar-aportes-a-prepaga" className="font-medium text-emerald-700 hover:underline">
            cuánto llega de verdad a la prepaga
          </Link>
          .
        </p>
      </header>

      <RespuestaPrimero actualizado={DEDUCCIONES_GENERALES_FUENTES.consultadoEl}>
        <p>
          Para {ANIO_FISCAL_VIGENTE} el seguro de vida y el de retiro tienen un tope de <strong>{TOPE_TXT}</strong>{" "}
          cada uno. Sale de ajustar por el IPC de octubre el monto de 2022 (Ley 27.743, art. 78). La prepaga, los
          honorarios médicos (al 40% de lo facturado) y las donaciones tienen <strong>cada uno</strong> un límite del
          5% de la ganancia neta, calculada antes de esas mismas deducciones y de las personales. Los intereses
          hipotecarios siguen congelados en {formatARS(TOPE_INTERESES_HIPOTECARIOS, 0)} por año.
        </p>
      </RespuestaPrimero>

      <CalculadoraDeduccionesGenerales />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">El tope del seguro de vida, año por año, y de dónde sale</h2>
        <p className="text-zinc-600">
          Desde 2023, cada tope es el del año anterior multiplicado por el IPC de octubre del año anterior y dividido
          por el de octubre del año previo. No hace falta esperar a que ARCA lo publique: con el índice del INDEC ya
          se sabe. Probamos la cuenta contra la tabla oficial de ARCA y coincide al centavo en los cuatro años.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Período fiscal</th>
                  <th className="px-4 py-2.5 font-semibold">Tope anual (vida y retiro, cada uno)</th>
                  <th className="px-4 py-2.5 font-semibold">Cómo se obtiene</th>
                </tr>
              </thead>
              <tbody>
                {[...TOPES].reverse().map((t) => (
                  <tr key={t.anio} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 font-medium text-zinc-800">{t.anio}</td>
                    <td className="px-4 py-2.5 text-zinc-900">{formatARS(t.monto, 2)}</td>
                    <td className="px-4 py-2.5 text-zinc-600">
                      {t.coeficiente === null
                        ? "Decreto 18/2023, art. 11"
                        : `año anterior × ${t.coeficiente.toLocaleString("es-AR", { maximumFractionDigits: 4 })} (IPC oct. ${t.anio - 1} / oct. ${t.anio - 2})`}
                    </td>
                  </tr>
                ))}
                {[...TOPES_SEGUROS_ANTERIORES].reverse().map((t) => (
                  <tr key={t.anio} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 font-medium text-zinc-800">{t.anio}</td>
                    <td className="px-4 py-2.5 text-zinc-900">{formatARS(t.monto, 2)}</td>
                    <td className="px-4 py-2.5 text-zinc-600">monto fijo publicado por ARCA</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          El coeficiente se usa con todos sus decimales: si se redondea a cuatro, el tope de 2025 ya no da lo que
          publica ARCA. Cuando el INDEC publique el IPC de octubre de {ANIO_FISCAL_VIGENTE}, el tope de{" "}
          {ANIO_FISCAL_VIGENTE + 1} aparece solo en esta tabla.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Por qué el 5% es más grande de lo que parece</h2>
        <p className="text-zinc-600">
          La mayoría de las guías dicen «5% de la ganancia neta» y dejan que cada uno lo calcule sobre su ganancia
          imponible. La ley define otra base: la ganancia neta <strong>antes</strong> de restar la prepaga, los
          honorarios, las donaciones, las pérdidas de años anteriores y las deducciones personales. Con un
          sueldo bruto de {formatARS(3_500_000, 0)} esa base es de {formatARS(CASO.baseCincoPorCiento, 0)} al año, y
          cada límite del 5% llega a {formatARS(CASO.topeCincoPorCiento, 0)}.
        </p>
        <p className="text-sm text-zinc-500">
          Y son límites separados: prepaga, honorarios y donaciones no comparten un único 5%.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los topes que no se actualizan</h2>
        <p className="text-zinc-600">
          No todo se ajusta. Los intereses de un crédito hipotecario para la vivienda propia siguen en{" "}
          <strong>{formatARS(TOPE_INTERESES_HIPOTECARIOS, 0)} por año</strong>, que es lo que dice el texto vigente
          del inciso a). Y ARCA sigue publicando para los gastos de sepelio: «{DEDUCCIONES_GENERALES_TEXTOS.arcaSepelio}
          ». Se pueden cargar, pero hoy son simbólicos.
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
        <h2 className="text-base font-semibold text-zinc-900">Las otras deducciones</h2>
        <p>
          El alquiler de tu vivienda tiene su propia cuenta en{" "}
          <Link href="/deduccion-alquiler" className="font-medium text-emerald-700 hover:underline">
            la deducción de alquiler
          </Link>
          , la empleada doméstica en{" "}
          <Link href="/deduccion-empleada-domestica" className="font-medium text-emerald-700 hover:underline">
            la deducción de casas particulares
          </Link>{" "}
          y tu impuesto mes a mes en{" "}
          <Link href="/ganancias" className="font-medium text-emerald-700 hover:underline">
            la calculadora de Ganancias
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {DEDUCCIONES_GENERALES_FUENTES.lista.map((f) => (
            <li key={f.nombre}>
              <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                {f.nombre}
              </a>
              : {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Leímos las leyes del texto actualizado de InfoLEG. Los topes de seguros se calculan con la serie oficial
          del IPC y se controlan contra la tabla de ARCA. La base del 5% es una estimación para relación de
          dependencia. Esta página es informativa y no reemplaza a un profesional. Consultada el{" "}
          {DEDUCCIONES_GENERALES_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
