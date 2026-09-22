import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraGananciasJubilados } from "@/components/CalculadoraGananciasJubilados";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { DEDUCCIONES } from "@/data/ganancias";
import { PRESTACIONES_VIGENTES } from "@/data/prestaciones";
import { ANIO_JUBILADOS, JUBILADOS_FUENTES, JUBILADOS_TEXTOS } from "@/data/ganancias-jubilados";
import {
  DEDUCCIONES_A_Y_C,
  calcularGananciasJubilados,
  deduccionEspecificaAnual,
  haberesMinimosProyectados,
} from "@/lib/ganancias-jubilados";
import { formatARS } from "@/lib/formato";

const BASE = calcularGananciasJubilados({ haberBruto: 3_500_000 });
const CON_CONYUGE = calcularGananciasJubilados({ haberBruto: 3_500_000, conyuge: true });
const SIN_ESPECIFICA = calcularGananciasJubilados({ haberBruto: 3_500_000, bienesPersonales: true });
const MAXIMO = calcularGananciasJubilados({ haberBruto: PRESTACIONES_VIGENTES.haberMaximo });
const MAXIMO_SIN = calcularGananciasJubilados({ haberBruto: PRESTACIONES_VIGENTES.haberMaximo, bienesPersonales: true });
const MESES = haberesMinimosProyectados();
const ESPECIFICA = deduccionEspecificaAnual();
const MESES_NOMBRE = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const ULTIMO_PUBLICADO = MESES.filter((m) => m.publicado).at(-1)!;
const mesDe = (p: string) => MESES_NOMBRE[Number(p.slice(5, 7)) - 1];
const veces = (n: number) => n.toLocaleString("es-AR", { maximumFractionDigits: 1 });

const UMBRAL = formatARS(BASE.umbralHaber, 0);
const HABER_MAXIMO = formatARS(PRESTACIONES_VIGENTES.haberMaximo, 2);

const FRASE_MAXIMO = MAXIMO.pagaGanancias
  ? `Con el haber máximo del régimen general (${HABER_MAXIMO}) ya se paga Ganancias.`
  : `Con el haber máximo del régimen general (${HABER_MAXIMO}) no se paga Ganancias: el umbral está más arriba.`;

export const metadata: Metadata = {
  title: `Ganancias para jubilados ${ANIO_JUBILADOS}: desde cuánto se paga y cómo pesa la deducción de 8 haberes mínimos`,
  description: `Un jubilado sin cargas empieza a pagar Ganancias con un haber bruto de ${UMBRAL} por mes. ${FRASE_MAXIMO} Las cargas de familia se suman aparte, y con Bienes Personales se pierde la deducción. Calculá tu caso.`,
  alternates: { canonical: "/ganancias-jubilados" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Ganancias para jubilados")}&s=${encodeURIComponent(`Se paga desde ${UMBRAL} brutos por mes`)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: `¿Desde cuánto pagan Ganancias los jubilados en ${ANIO_JUBILADOS}?`,
    a: `Sin cónyuge ni hijos a cargo, desde un haber bruto de ${UMBRAL} por mes, que son ${veces(BASE.umbralEnHaberesMinimos)} haberes mínimos de ${mesDe(ULTIMO_PUBLICADO.periodo)}. Con cónyuge a cargo, desde ${formatARS(CON_CONYUGE.umbralHaber, 0)}. Es la cuenta anual: 13 haberes (el aguinaldo también tributa) menos el aporte a PAMI y menos la deducción específica, que suma ocho veces el haber mínimo de cada mes del año.`,
  },
  {
    q: "¿No era «el que cobra más de 8 haberes mínimos»?",
    a: `Es la forma corta, y queda un poco alta. La ley dice «${JUBILADOS_TEXTOS.especifica}». Esa suma es de los haberes mínimos de cada mes —un agente de retención oficial lo explica así: «${JUBILADOS_TEXTOS.issysMensual}»—, mientras que el aguinaldo sí se cobra y tributa. Doce haberes mínimos por ocho contra trece haberes cobrados: por eso, en el año, el umbral cae por debajo de ocho haberes mensuales. Y como a principio de año el haber mínimo era más bajo, medido contra el de hoy da todavía menos. Esa comparación es nuestra lectura de la norma, no una frase de ella.`,
  },
  {
    q: "¿Los jubilados de la mínima o de ANSES pagan Ganancias?",
    a: `La mínima, no: está lejos del umbral. ${FRASE_MAXIMO} Los que pagan suelen ser jubilados de regímenes especiales o de cajas provinciales con haberes más altos, o quienes pierden la deducción específica.`,
  },
  {
    q: "Si tengo cónyuge o hijos a cargo, ¿se suman a los 8 haberes mínimos?",
    a: `Sí. La deducción específica reemplaza sólo a los incisos a) y c) del art. 30 —el mínimo no imponible y la deducción especial—, no al inciso b). El cónyuge a cargo resta ${formatARS(DEDUCCIONES.conyuge, 0)} por año y cada hijo ${formatARS(DEDUCCIONES.hijo, 0)}, encima de la específica. Muchas explicaciones hablan de «ocho haberes» como si fuera el único número; con cónyuge el umbral pasa de ${UMBRAL} a ${formatARS(CON_CONYUGE.umbralHaber, 0)}.`,
  },
  {
    q: "¿Cuándo se pierde la deducción de los 8 haberes mínimos?",
    a: `En dos casos. Si tenés otros ingresos de otra naturaleza por más de la ganancia no imponible anual: «${JUBILADOS_TEXTOS.otrosIngresos}». Y si pagás Bienes Personales: «${JUBILADOS_TEXTOS.bienesPersonales}». En esos casos volvés al mínimo no imponible más la deducción especial y la doceava parte, y el umbral baja: sin cargas, a ${formatARS(SIN_ESPECIFICA.umbralHaber, 0)} brutos por mes.${MAXIMO_SIN.pagaGanancias && !MAXIMO.pagaGanancias ? ` Con eso, el haber máximo sí paga: ${formatARS(MAXIMO_SIN.retencionMensual, 0)} por mes aproximadamente.` : ""}`,
  },
  {
    q: "¿La casa donde vivo me hace perder la deducción?",
    a: "No, si es lo único por lo que pagarías Bienes Personales. La excepción está escrita en la ley: la obligación no puede surgir «exclusivamente de la tenencia de un inmueble para vivienda única». Un segundo inmueble, plata en el banco o inversiones por encima del mínimo del impuesto sí la hacen caer.",
  },
  {
    q: "¿El aguinaldo de los jubilados paga Ganancias?",
    a: `Sí, forma parte de la ganancia del año. En la retención mensual no se cobra todo junto: la RG 4003 manda sumar cada mes «${JUBILADOS_TEXTOS.rg4003Sac}», y así el impuesto del aguinaldo se reparte a lo largo del año.`,
  },
  {
    q: "¿El descuento de PAMI se resta?",
    a: "Sí: el aporte a la obra social es una deducción de la ganancia. Para los jubilados de ANSES por relación de dependencia es un 3% hasta el haber mínimo y un 6% sobre el resto (ley 19.032); la calculadora lo aplica también sobre el aguinaldo. Si tu caja provincial descuenta otra alícuota, la diferencia es chica pero existe.",
  },
  {
    q: "¿Tengo que presentar algo?",
    a: "Si tenés cónyuge o hijos a cargo, informalos en el formulario 572 web (SiRADIG) eligiendo a ANSES o a tu caja como agente de retención: si no los cargás, no los descuentan. Si pagás Bienes Personales o tenés otros ingresos, también se informa ahí, y la retención cambia.",
  },
];

export default function GananciasJubiladosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de Ganancias para jubilados y pensionados",
        url: "https://calcular.ar/ganancias-jubilados",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: `Ganancias para jubilados ${ANIO_JUBILADOS}: la deducción específica de ocho haberes mínimos`,
        descripcion:
          "Desde qué haber paga Ganancias un jubilado, cómo se suma la deducción específica del art. 30 de la ley del impuesto mes a mes, por qué las cargas de familia se restan aparte y cuándo se pierde.",
        url: "/ganancias-jubilados",
        modificado: JUBILADOS_FUENTES.consultadoEl,
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
          Ganancias para jubilados {ANIO_JUBILADOS}: se empieza a pagar con {UMBRAL} brutos por mes
        </h1>
        <p className="text-zinc-600">
          La ley les da a los jubilados y pensionados una deducción propia: ocho veces la suma de los haberes mínimos
          del año. Cargá tu haber y te mostramos si pagás, cuánto, y qué cambia con cónyuge a cargo, con otros
          ingresos o si pagás Bienes Personales.
        </p>
      </header>

      <RespuestaPrimero actualizado={JUBILADOS_FUENTES.consultadoEl}>
        <p>
          Un jubilado sin cargas de familia paga Ganancias desde un haber bruto de <strong>{UMBRAL}</strong> por mes (
          {veces(BASE.umbralEnHaberesMinimos)} haberes mínimos). {FRASE_MAXIMO} La deducción de ocho haberes mínimos
          reemplaza sólo al mínimo no imponible y a la deducción especial: el cónyuge y los hijos a cargo se restan
          aparte. Y se pierde si tenés otros ingresos por más de la ganancia no imponible o si pagás Bienes Personales
          por algo más que tu vivienda única.
        </p>
      </RespuestaPrimero>

      <CalculadoraGananciasJubilados />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La deducción de {ANIO_JUBILADOS}, mes por mes: {formatARS(ESPECIFICA, 0)}
        </h2>
        <p className="text-zinc-600">
          No es un número fijo que ARCA publique: se arma sumando el haber mínimo garantizado de cada mes, que ANSES
          ajusta todos los meses por inflación, y multiplicando por ocho. Supera al mínimo no imponible más la
          deducción especial ({formatARS(DEDUCCIONES_A_Y_C, 0)}), así que es la que rige.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Mes</th>
                  <th className="px-4 py-2.5 font-semibold">Haber mínimo</th>
                  <th className="px-4 py-2.5 font-semibold">× 8</th>
                </tr>
              </thead>
              <tbody>
                {MESES.map((m) => (
                  <tr key={m.periodo} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 font-medium capitalize text-zinc-800">
                      {mesDe(m.periodo)}
                      {!m.publicado && <span className="ml-1 text-xs font-normal text-zinc-500">(estimado)</span>}
                    </td>
                    <td className="px-4 py-2.5 text-zinc-900">{formatARS(m.haberMinimo, 2)}</td>
                    <td className="px-4 py-2.5 text-zinc-900">{formatARS(m.haberMinimo * 8, 2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Los meses marcados como estimados repiten el haber mínimo de {mesDe(ULTIMO_PUBLICADO.periodo)} (
          {formatARS(ULTIMO_PUBLICADO.haberMinimo, 2)}, {PRESTACIONES_VIGENTES.resolucion}). Cuando ANSES fije el
          siguiente, la tabla se actualiza sola y la deducción sube.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Lo que casi nadie aclara: las cargas de familia van aparte</h2>
        <p className="text-zinc-600">
          El texto dice que la deducción específica reemplaza a «las deducciones previstas en los incisos a) y c)».
          El inciso b), el de las cargas de familia, queda afuera del reemplazo: se sigue restando. Con un cónyuge a
          cargo, el umbral sube de {UMBRAL} a <strong>{formatARS(CON_CONYUGE.umbralHaber, 0)}</strong> brutos por mes.
          Para que cuente, hay que informarlo en el SiRADIG.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuándo se pierde, y cuánto cuesta perderla</h2>
        <p className="text-zinc-600">
          Tener un alquiler que tributa, cobrar honorarios o seguir trabajando por más de la ganancia no imponible del
          año ({formatARS(DEDUCCIONES.mni, 0)}), o estar obligado a pagar Bienes Personales por algo más que la
          vivienda única, hace caer la deducción específica. Se vuelve al esquema general: el mínimo no imponible, la
          deducción especial de 3,8 veces y la doceava parte. En {ANIO_JUBILADOS} eso baja el umbral de {UMBRAL} a{" "}
          <strong>{formatARS(SIN_ESPECIFICA.umbralHaber, 0)}</strong>
          {MAXIMO_SIN.pagaGanancias && !MAXIMO.pagaGanancias
            ? `, justo por debajo del haber máximo: el mismo jubilado que no pagaba empieza a pagar.`
            : "."}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-zinc-800">{f.q}</summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-2 rounded-xl bg-emerald-50/60 p-5 text-sm text-zinc-700">
        <h2 className="text-base font-semibold text-zinc-900">Para seguir</h2>
        <p>
          Cuánto te descuenta PAMI, en{" "}
          <Link href="/descuento-pami" className="font-medium text-emerald-700 hover:underline">
            el descuento de obra social del jubilado
          </Link>
          ; cuánto cobrás este mes, en{" "}
          <Link href="/jubilacion" className="font-medium text-emerald-700 hover:underline">
            la calculadora de jubilación
          </Link>
          ; y si todavía trabajás, tu retención en{" "}
          <Link href="/ganancias" className="font-medium text-emerald-700 hover:underline">
            la calculadora de Ganancias
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {JUBILADOS_FUENTES.lista.map((f) => (
            <li key={f.nombre}>
              <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-emerald-700 hover:underline">
                {f.nombre}
              </a>{" "}
              — {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Los textos legales se leyeron del texto ACTUALIZADO de InfoLEG. El haber mínimo de cada mes sale de la serie
          oficial de ANSES. Es una estimación anual: la retención real la calcula tu agente de retención con el método
          acumulado. Esta página es informativa y no reemplaza a un profesional. Consultada el{" "}
          {JUBILADOS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
