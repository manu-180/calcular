import type { Metadata } from "next";
import { hreflangHeadAR } from "@/lib/hreflang-ar";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { CalculadoraPlazoFijo } from "@/components/CalculadoraPlazoFijo";
import { datosOferta } from "@/lib/oferta";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import { interesPlazoFijo, tem, tea } from "@/lib/plazofijo";
import { formatPct } from "@/lib/formato";
import {
  GARANTIA_DEPOSITOS,
  INFLACION_DEFAULT,
  PLAZOFIJO_FUENTES,
  TNA_FALLBACK,
  UVA,
} from "@/data/plazofijo";
import { OtrosPaises } from "@/components/OtrosPaises";

// Ejemplo canónico de la página ($1.000.000 a 30 días), DERIVADO de la tasa de
// referencia con las MISMAS fórmulas testeadas que la calculadora. Regla 2-2: nunca
// hardcodear un número que depende de un dato vivo — si se hardcodea, driftea en
// silencio cuando rota TNA_FALLBACK (pasó el 17/6/2026: la tasa se mostraba dinámica
// pero el interés/TEM quedaban viejos e inconsistentes). Derivarlo lo hace imposible.
const EJ_CAPITAL = 1_000_000;
const EJ_DIAS = 30;
const ejTna = TNA_FALLBACK.valor;
const ejInteres = Math.round(interesPlazoFijo(EJ_CAPITAL, ejTna, EJ_DIAS));
const ejTnaStr = ejTna.toLocaleString("es-AR");
const ejTnaDecStr = (ejTna / 100).toLocaleString("es-AR", { maximumFractionDigits: 4 });
const ejInteresStr = "$" + ejInteres.toLocaleString("es-AR");
const ejTotalStr = "$" + (EJ_CAPITAL + ejInteres).toLocaleString("es-AR");
const ejTemStr = formatPct(tem(ejTna), 2);
const ejTeaStr = formatPct(tea(ejTna, EJ_DIAS), 0);
const ejLeGana = tem(ejTna) >= INFLACION_DEFAULT.mensualPct;
const ejInflStr = formatPct(INFLACION_DEFAULT.mensualPct, 1);

// Función y no constante: el clúster hreflang se evalúa con la fecha del día (check_mes_en_render).
export function generateMetadata(): Metadata {
  return {
    title: "Calculadora de plazo fijo 2026 con la tasa del BCRA",
    description:
      "Simulá tu plazo fijo con la tasa actualizada del BCRA: interés, total al vencimiento, TEA y renovaciones, y mirá si le ganás a la inflación.",
    alternates: { canonical: "/plazo-fijo", languages: hreflangHeadAR("/plazo-fijo") },
  };
}

const faqs = [
  {
    q: "¿Cuánto gana un plazo fijo de $1.000.000 a 30 días?",
    a: `Depende de la TNA que pague tu banco. Con la tasa promedio de referencia del BCRA al ${TNA_FALLBACK.fechaISO.split("-").reverse().join("/")} (${ejTnaStr}% TNA), $${EJ_CAPITAL.toLocaleString("es-AR")} a ${EJ_DIAS} días dan unos ${ejInteresStr} de interés: retirás ${ejTotalStr}. La cuenta exacta la hacés arriba con la tasa de tu banco, que puede ser más alta o más baja que el promedio.`,
  },
  {
    q: "¿Cómo se calcula el interés de un plazo fijo?",
    a: `Con interés simple, sobre un año de 365 días: interés = capital × TNA × días ÷ 365. Por ejemplo, $${EJ_CAPITAL.toLocaleString("es-AR")} al ${ejTnaStr}% por ${EJ_DIAS} días: ${EJ_CAPITAL.toLocaleString("es-AR")} × ${ejTnaDecStr} × ${EJ_DIAS} ÷ 365 = ${ejInteresStr}. Es la forma en que calculan todos los bancos argentinos los plazos fijos tradicionales en pesos.`,
  },
  {
    q: "¿Qué diferencia hay entre TNA, TEM y TEA?",
    a: "La TNA (tasa nominal anual) es la que publican los bancos. Sirve para calcular el interés, pero no es lo que ganás en un año. La TEM es lo que ganás en un mes de 30 días (TNA × 30 ÷ 365). La TEA (tasa efectiva anual) es lo que ganarías en un año si renovás capital e intereses en cada vencimiento. Siempre da más que la TNA, porque suma interés sobre interés.",
  },
  {
    q: "¿Conviene renovar el plazo fijo cada 30 días?",
    a: `Si renovás capital más intereses, cada mes ganás interés también sobre los intereses de antes. Eso es el interés compuesto, y es lo que separa la TNA de la TEA. Con una TNA del ${ejTnaStr}%, renovar todos los meses durante un año rinde cerca del ${ejTeaStr} efectivo, no el ${ejTnaStr}%. La calculadora te muestra cómo crece renovación por renovación.`,
  },
  {
    q: "¿Cuál es el plazo mínimo de un plazo fijo?",
    a: "Los plazos fijos tradicionales en pesos son de 30 días como mínimo. Los plazos fijos UVA piden un mínimo de 90 días, aunque podés sacar la plata antes desde el día 30 (y perdés el ajuste por inflación).",
  },
  {
    q: "¿Qué es un plazo fijo UVA y cuándo conviene?",
    a: "Es un plazo fijo en UVA, una unidad que sigue a la inflación (a través del coeficiente CER). Al vencer recibís el capital ajustado por la inflación del período, más una tasa extra si tu banco la paga. Conviene cuando esperás que la inflación del mes supere lo que paga por mes el plazo fijo tradicional. La contra: la plata queda quieta al menos 90 días.",
  },
  {
    q: "¿Puedo sacar la plata antes del vencimiento?",
    a: "En un plazo fijo tradicional, no: la plata queda inmovilizada hasta que vence. En un plazo fijo UVA precancelable podés salir desde el día 30 avisándole al banco. Pero en ese caso no cobrás el ajuste por inflación, sino una tasa fija que suele ser menor que la de un plazo fijo común.",
  },
  {
    q: "¿Qué pasa cuando vence el plazo fijo?",
    a: "El capital y los intereses se acreditan en tu cuenta y quedan disponibles. Si elegiste renovación automática, el banco lo renueva por el mismo plazo con la tasa de ese día, que puede ser distinta a la original. Las tasas cambian seguido, así que conviene revisarla en cada renovación.",
  },
  {
    q: "¿El plazo fijo paga impuestos?",
    a: "Si sos persona humana, los intereses de plazos fijos no pagan Ganancias (art. 26 inc. h de la ley, con el texto de la Ley 27.802, que desde 2026 sacó el límite a depósitos en pesos). Además, los plazos fijos en bancos argentinos no pagan Bienes Personales (art. 21 inc. h, Ley 23.966). Y no tienen comisiones: lo que calculás es lo que cobrás.",
  },
  {
    q: "¿Es seguro poner plata en un plazo fijo?",
    a: "Los depósitos en bancos regulados por el BCRA tienen el seguro de garantía de los depósitos. Cubre hasta $50.000.000 por persona y por banco (capital, intereses y el ajuste CER de los UVA), desde abril de 2026. Lo que pase de ese monto no está garantizado.",
  },
  {
    q: "¿Todos los bancos pagan la misma tasa?",
    a: "No. Cada banco pone su TNA y la diferencia puede ser de varios puntos. Los bancos digitales y los que necesitan captar plata suelen pagar más que los bancos grandes de siempre. La tasa que cargamos es el promedio de depósitos a 30 días que publica el BCRA: usala de referencia y poné la que te ofrece tu banco.",
  },
  {
    q: "¿Plazo fijo o dólar?",
    a: "Son apuestas distintas. El plazo fijo rinde una tasa conocida en pesos. El dólar depende de lo que haga el tipo de cambio, y eso nadie lo sabe de antemano. La comparación honesta es contra la inflación: si el plazo fijo no le gana, tu plata pierde poder de compra aunque el número crezca. Esta calculadora te muestra justo eso.",
  },
];

export default function PlazoFijoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de Plazo Fijo 2026",
        url: "https://calcular.ar/plazo-fijo",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Calculadora de plazo fijo 2026 con la tasa del BCRA",
        descripcion:
          "Cómo se calcula un plazo fijo en pesos: interés simple a 30 días, TEM, TEA con renovaciones, plazo fijo UVA y comparación con la inflación, con la tasa del BCRA.",
        url: "/plazo-fijo",
        modificado: "2026-06-15",
      }),
      datasetSchema({
        nombre: "Tasa de referencia de plazo fijo a 30 días (BCRA, serie 12)",
        descripcion:
          "TNA promedio de los plazos fijos a 30 días que publica el BCRA, cargada como referencia en la calculadora. Incluye el plazo mínimo del UVA (90 días) y la garantía de depósitos vigente.",
        url: "/plazo-fijo",
        modificado: "2026-06-15",
        fuenteNombre: PLAZOFIJO_FUENTES.bcraTasa.nombre,
        fuenteUrl: PLAZOFIJO_FUENTES.bcraTasa.url,
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
          Calculadora de Plazo Fijo 2026
        </h1>
        <p className="text-zinc-600">
          Poné cuánto depositás y a cuántos días, y mirá en el momento{" "}
          <strong>cuánto interés ganás</strong> y qué tasa efectiva cobrás. Y lo que casi ninguna
          calculadora te muestra: <strong>si le ganás o no a la inflación</strong>. Ya trae cargada
          la tasa promedio del BCRA y podés simular renovaciones.
        </p>
      </header>

      <RespuestaPrimero actualizado={PLAZOFIJO_FUENTES.consultadoEl}>
        <p>
          Un plazo fijo tradicional en pesos paga <strong>interés simple</strong>: interés ={" "}
          capital × TNA × días ÷ 365. Con la tasa promedio de referencia del BCRA (
          <strong>{TNA_FALLBACK.valor.toLocaleString("es-AR")}% TNA</strong>), si depositás{" "}
          <strong>${EJ_CAPITAL.toLocaleString("es-AR")} a {EJ_DIAS} días</strong> ganás unos{" "}
          <strong>{ejInteresStr}</strong> de interés. Es una{" "}
          <strong>TEM de ~{ejTemStr}</strong>, {ejLeGana ? "por encima" : "por debajo"} de la
          última inflación mensual del INDEC ({ejInflStr} en {INFLACION_DEFAULT.periodo}). Con esos
          números, un plazo fijo tradicional <strong>{ejLeGana ? "le gana" : "no le gana"} a la inflación</strong>.
          La inflación de los próximos meses puede ser otra, y la tasa exacta la pone tu banco. Lo
          simulás arriba, también contra un <strong>plazo fijo UVA</strong> (mínimo 90 días).
        </p>
      </RespuestaPrimero>

      <CalculadoraPlazoFijo oferta={datosOferta("planilla-plazo-fijo")} />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cómo se calcula un plazo fijo</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Los plazos fijos tradicionales en pesos usan <strong>interés simple</strong> sobre un
            año de 365 días:
          </p>
          <p className="rounded-xl bg-white p-4 font-medium text-zinc-800 shadow-sm">
            Interés = capital × TNA × días ÷ 365
          </p>
          <p>
            Por ejemplo, $1.000.000 a 30 días con una TNA del {ejTnaStr}% (el promedio de los
            bancos al {TNA_FALLBACK.fechaISO.split("-").reverse().join("/")}): 1.000.000 × {ejTnaDecStr} × 30 ÷ 365 ={" "}
            <strong>{ejInteresStr} de interés</strong>. Al vencimiento retirás {ejTotalStr}.
          </p>
          <p>
            Cada banco pone su TNA y la cambia seguido (a veces de un día para el otro, cuando se
            mueve la tasa de referencia). Por eso la calculadora trae el promedio que publica el
            BCRA, con su fecha, y te deja escribir la tasa exacta que te ofrece tu banco.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">TNA, TEM y TEA: qué mirar de verdad</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            La <strong>TNA</strong> (tasa nominal anual) es el número grande que publican los
            bancos, pero nadie cobra la TNA: es solo la base de la cuenta. Lo que de verdad ganás en
            un mes es la <strong>TEM</strong> (tasa efectiva mensual): TNA × 30 ÷ 365. Con una TNA
            del {ejTnaStr}%, la TEM es ~{ejTemStr}. Ese es el número que tenés que comparar con la
            inflación del mes.
          </p>
          <p>
            La <strong>TEA</strong> (tasa efectiva anual) responde otra pregunta: ¿cuánto ganarías
            en un año si renovaras capital e intereses en cada vencimiento? Como cada renovación
            suma interés sobre los intereses anteriores, la TEA siempre es más alta que la TNA. Es
            la forma correcta de comparar el plazo fijo con cualquier otra inversión a un año.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          ¿Le ganás a la inflación? Tradicional vs. UVA
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Un plazo fijo puede hacer crecer el número de tu cuenta y aun así{" "}
            <strong>achicar lo que podés comprar</strong>. Pasa cada vez que la inflación del
            período es más alta que la tasa efectiva. Por eso la calculadora pasa tu resultado a
            «plata de hoy» con la inflación mensual que vos estimes. Cargamos el último dato oficial
            del INDEC y lo podés cambiar (acá tenés{" "}
            <Link href="/inflacion" className="text-emerald-700 underline">
              la inflación real, mes a mes
            </Link>
            ).
          </p>
          <p>
            Si te querés cubrir de ese riesgo, existe el <strong>plazo fijo UVA</strong>. El capital
            se expresa en UVA, una unidad que sigue a la inflación a través del coeficiente CER, y el
            banco puede sumar una tasa extra. La regla vigente (Com. «A» 8246/2025 del BCRA) pide un
            mínimo de {UVA.plazoMinimoDias} días, y podés sacar la plata antes desde el día{" "}
            {UVA.precancelableDesdeDia}. Pero si la sacás antes, cobrás una tasa fija más baja en
            lugar del ajuste por inflación.
          </p>
          <p>
            ¿Cuál conviene? Si esperás que la inflación del mes supere la TEM del tradicional, el UVA
            te protege mejor. Si creés que la inflación va a bajar más rápido que las tasas, el
            tradicional paga más. La calculadora simula los dos casos con tu propia estimación. Nadie
            sabe el futuro, así que probá varias.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Seguro, sin comisiones y sin impuestos</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Tres cosas juegan a favor del plazo fijo y poca gente las conoce bien. Los depósitos
            están cubiertos por la{" "}
            <strong>
              garantía de los depósitos hasta {GARANTIA_DEPOSITOS.monto.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                maximumFractionDigits: 0,
              })}
            </strong>{" "}
            por persona y por banco (desde el {GARANTIA_DEPOSITOS.vigenciaDesde}). Los intereses{" "}
            <strong>no pagan Ganancias</strong> si sos persona humana, y los depósitos{" "}
            <strong>no pagan Bienes Personales</strong>. Y los bancos no cobran comisión por
            hacerlos. Lo que ves en la calculadora es lo que cobrás.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Si tenés varios plazos fijos</h2>
        <p className="text-zinc-600">
          Si renovás seguido o tenés plata en más de un banco, la{" "}
          <Link href="/planillas/plazo-fijo" className="text-emerald-700 underline">
            planilla de plazos fijos en Excel
          </Link>{" "}
          te ordena los vencimientos y te muestra la tasa real contra la inflación de cada uno. Y si
          estás por hacer tu primer plazo fijo con el aguinaldo, leé{" "}
          <Link href="/blog/que-hacer-con-el-aguinaldo-2026" className="text-emerald-700 underline">
            qué hacer con el aguinaldo
          </Link>
          .
        </p>
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
          {[
            PLAZOFIJO_FUENTES.bcraTasa,
            PLAZOFIJO_FUENTES.comunicacionUva,
            PLAZOFIJO_FUENTES.garantia,
            PLAZOFIJO_FUENTES.ipc,
            PLAZOFIJO_FUENTES.ganancias,
          ].map((f) => (
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
          Última verificación: {PLAZOFIJO_FUENTES.consultadoEl}. ¿Cobraste el{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            aguinaldo
          </Link>{" "}
          o una{" "}
          <Link href="/indemnizacion" className="text-emerald-700 underline">
            indemnización
          </Link>
          ? Acá ves cuánto rinde si la ponés a trabajar. Mirá también la{" "}
          <Link href="/monotributo" className="text-emerald-700 underline">
            calculadora de monotributo
          </Link>
          .
        </p>
      </section>
      <EmailCapture
        source="plazo-fijo"
        headline="Avisame cuando cambie la tasa de plazo fijo"
        subtext="El BCRA mueve la tasa seguido. Te aviso cuando cambie, así sabés si te conviene renovar. Sin spam."
      />
      <OtrosPaises concepto="plazo-fijo" />
    </article>
  );
}
