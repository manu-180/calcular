import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { CalculadoraPlazoFijo } from "@/components/CalculadoraPlazoFijo";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import { interesPlazoFijo, tem, tea } from "@/lib/plazofijo";
import { formatPct } from "@/lib/formato";
import {
  GARANTIA_DEPOSITOS,
  PLAZOFIJO_FUENTES,
  TNA_FALLBACK,
  UVA,
} from "@/data/plazofijo";

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

export const metadata: Metadata = {
  title: "Calculadora de Plazo Fijo 2026: cuánto ganás con tu plata a 30 días o más",
  description:
    "Simulá tu plazo fijo con la tasa actualizada del BCRA: interés, total al vencimiento, TEA y renovaciones. Y lo que casi nadie te muestra: si le ganás o no a la inflación.",
  alternates: { canonical: "/plazo-fijo" },
};

const faqs = [
  {
    q: "¿Cuánto gana un plazo fijo de $1.000.000 a 30 días?",
    a: `Depende de la TNA que pague tu banco. Con la tasa promedio de referencia de junio de 2026 (${ejTnaStr}% TNA), $${EJ_CAPITAL.toLocaleString("es-AR")} a ${EJ_DIAS} días generan unos ${ejInteresStr} de interés: retirás ${ejTotalStr}. La cuenta exacta la hacés arriba con la tasa de tu banco, que puede ser mayor o menor al promedio.`,
  },
  {
    q: "¿Cómo se calcula el interés de un plazo fijo?",
    a: `Con interés simple sobre un año de 365 días: interés = capital × TNA × días ÷ 365. Por ejemplo, $${EJ_CAPITAL.toLocaleString("es-AR")} al ${ejTnaStr}% por ${EJ_DIAS} días: ${EJ_CAPITAL.toLocaleString("es-AR")} × ${ejTnaDecStr} × ${EJ_DIAS} ÷ 365 = ${ejInteresStr}. Esa es la convención que usan todos los bancos argentinos para plazos fijos tradicionales en pesos.`,
  },
  {
    q: "¿Qué diferencia hay entre TNA, TEM y TEA?",
    a: "La TNA (tasa nominal anual) es la tasa que publican los bancos: sirve para calcular el interés del plazo, pero no es lo que ganás en un año. La TEM es la tasa efectiva de un mes de 30 días (TNA × 30 ÷ 365). La TEA (tasa efectiva anual) es lo que ganarías en un año renovando capital más intereses cada vencimiento: siempre da más que la TNA porque incluye el interés compuesto.",
  },
  {
    q: "¿Conviene renovar el plazo fijo cada 30 días?",
    a: `Si renovás capital + intereses, cada período generás interés sobre los intereses anteriores: eso es el interés compuesto y es lo que separa la TNA de la TEA. Con una TNA del ${ejTnaStr}%, renovar todos los meses durante un año rinde cerca del ${ejTeaStr} efectivo, no ${ejTnaStr}%. La calculadora te muestra la evolución renovación por renovación.`,
  },
  {
    q: "¿Cuál es el plazo mínimo de un plazo fijo?",
    a: "Los plazos fijos tradicionales en pesos se constituyen por un mínimo de 30 días. Los plazos fijos UVA exigen un mínimo de 90 días, aunque permiten precancelar desde el día 30 (resignando el ajuste por inflación).",
  },
  {
    q: "¿Qué es un plazo fijo UVA y cuándo conviene?",
    a: "Es un plazo fijo cuyo capital se expresa en UVA, una unidad que sigue a la inflación (vía el coeficiente CER). Al vencer recibís el capital ajustado por la inflación del período más una tasa adicional si tu banco la paga. Conviene cuando esperás que la inflación mensual supere a la tasa efectiva mensual del plazo fijo tradicional. La contra: te comprometés por al menos 90 días.",
  },
  {
    q: "¿Puedo sacar la plata antes del vencimiento?",
    a: "En un plazo fijo tradicional, no: la plata queda inmovilizada hasta el vencimiento. En un plazo fijo UVA precancelable podés salir a partir del día 30 avisando al banco, pero en ese caso no cobrás el ajuste por inflación sino una tasa fija de precancelación, generalmente menor a la de un plazo fijo común.",
  },
  {
    q: "¿Qué pasa cuando vence el plazo fijo?",
    a: "El capital más los intereses se acreditan en tu cuenta y quedan disponibles. Si al constituirlo elegiste renovación automática, el banco lo renueva por el mismo plazo a la tasa vigente ese día — que puede ser distinta a la original. Las tasas cambian seguido: conviene revisarla en cada renovación.",
  },
  {
    q: "¿El plazo fijo paga impuestos?",
    a: "Para personas humanas, los intereses de plazos fijos están exentos del impuesto a las Ganancias (art. 26 inc. h de la ley, texto según la Ley 27.802, que desde 2026 eliminó la limitación a depósitos en moneda nacional). Además, los depósitos a plazo fijo en bancos argentinos están exentos de Bienes Personales (art. 21 inc. h, Ley 23.966). Tampoco tienen comisiones: lo que calculás es lo que cobrás.",
  },
  {
    q: "¿Es seguro poner plata en un plazo fijo?",
    a: "Los depósitos en bancos regulados por el BCRA cuentan con el seguro de garantía de los depósitos: cubre hasta $50.000.000 por persona y por entidad (incluye capital, intereses y el ajuste CER de los UVA), vigente desde abril de 2026. Por encima de ese monto, el excedente no está garantizado.",
  },
  {
    q: "¿Todos los bancos pagan la misma tasa?",
    a: "No: cada banco fija su TNA y la diferencia puede ser de varios puntos. Los bancos digitales y los que buscan fondeo suelen pagar más que los grandes bancos tradicionales. La tasa que precargamos es el promedio de depósitos a 30 días que publica el BCRA: usala como referencia y poné la que te ofrece tu banco.",
  },
  {
    q: "¿Plazo fijo o dólar?",
    a: "Son apuestas distintas: el plazo fijo rinde una tasa conocida en pesos; el dólar depende de la evolución del tipo de cambio, que nadie conoce de antemano. La comparación honesta es contra la inflación: si el plazo fijo no le gana, tu plata pierde poder de compra aunque el número crezca. Esta calculadora te muestra exactamente eso.",
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
        titulo: "Calculadora de Plazo Fijo 2026: interés, TEA y si le ganás a la inflación",
        descripcion:
          "Cómo se calcula un plazo fijo en pesos: interés simple a 30 días, TEM, TEA con renovaciones, plazo fijo UVA y comparación contra la inflación, con la tasa del BCRA.",
        url: "/plazo-fijo",
        modificado: "2026-06-15",
      }),
      datasetSchema({
        nombre: "Tasa de referencia de plazo fijo a 30 días (BCRA, serie 12)",
        descripcion:
          "TNA promedio de los depósitos a plazo fijo de 30 días publicada por el BCRA, usada como referencia precargada en la calculadora. Incluye plazo mínimo UVA (90 días) y garantía de depósitos vigente.",
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
          Poné cuánto depositás y a cuántos días, y mirá al instante{" "}
          <strong>cuánto interés ganás</strong>, qué tasa efectiva estás cobrando y — lo que casi
          ninguna calculadora te muestra — <strong>si le ganás o no a la inflación</strong>. Con
          la tasa promedio del BCRA precargada y la opción de simular renovaciones.
        </p>
      </header>

      <RespuestaPrimero actualizado={PLAZOFIJO_FUENTES.consultadoEl}>
        <p>
          Un plazo fijo tradicional en pesos paga <strong>interés simple</strong>: interés ={" "}
          capital × TNA × días ÷ 365. Con la tasa promedio de referencia del BCRA (
          <strong>{TNA_FALLBACK.valor.toLocaleString("es-AR")}% TNA</strong>), depositar{" "}
          <strong>${EJ_CAPITAL.toLocaleString("es-AR")} a {EJ_DIAS} días</strong> rinde unos{" "}
          <strong>{ejInteresStr}</strong> de interés. Eso equivale a una{" "}
          <strong>TEM de ~{ejTemStr}</strong>, todavía por debajo de la inflación mensual
          (~2,1%), así que hoy un plazo fijo tradicional <strong>no le gana a la inflación</strong>:
          para eso conviene mirar el <strong>plazo fijo UVA</strong> (mínimo 90 días). La tasa exacta
          la pone tu banco y la simulás arriba.
        </p>
      </RespuestaPrimero>

      <CalculadoraPlazoFijo />

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
            Por ejemplo, $1.000.000 a 30 días con una TNA del {TNA_FALLBACK.valor}% (el promedio
            de los bancos al momento de escribir esto): 1.000.000 × 0,1941 × 30 ÷ 365 ={" "}
            <strong>$15.953 de interés</strong>. Al vencimiento retirás $1.015.953.
          </p>
          <p>
            La TNA la fija cada banco y cambia seguido — a veces de un día para el otro, cuando se
            mueve la tasa de referencia. Por eso la calculadora trae el promedio publicado por el
            BCRA con su fecha, y te deja escribir la tasa exacta que te ofrece tu banco.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">TNA, TEM y TEA: qué mirar de verdad</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            La <strong>TNA</strong> (tasa nominal anual) es el número grande que publican los
            bancos, pero nadie cobra la TNA: es solo la base de la fórmula. Lo que de verdad
            ganás en un mes es la <strong>TEM</strong> (tasa efectiva mensual): TNA × 30 ÷ 365.
            Con TNA {ejTnaStr}%, la TEM es ~{ejTemStr} — ese es el número que tenés que comparar
            contra la inflación mensual.
          </p>
          <p>
            La <strong>TEA</strong> (tasa efectiva anual) responde otra pregunta: ¿cuánto ganarías
            en un año si renovaras capital + intereses en cada vencimiento? Como cada renovación
            genera interés sobre los intereses anteriores, la TEA siempre supera a la TNA. Es la
            forma correcta de comparar el plazo fijo contra cualquier otra inversión a un año.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          ¿Le ganás a la inflación? Tradicional vs. UVA
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Un plazo fijo puede hacer crecer el número de tu cuenta y aún así{" "}
            <strong>achicar tu poder de compra</strong>: pasa cada vez que la inflación del
            período supera a la tasa efectiva. Por eso la calculadora convierte tu resultado a
            «plata de hoy» usando la inflación mensual que estimes (precargamos el último dato
            oficial del INDEC, editable — y acá tenés{" "}
            <Link href="/inflacion" className="text-emerald-700 underline">
              la inflación real, mes a mes
            </Link>
            ).
          </p>
          <p>
            Para quien quiere cubrirse de ese riesgo existe el <strong>plazo fijo UVA</strong>: el
            capital se expresa en UVA, una unidad que sigue a la inflación a través del
            coeficiente CER, y el banco puede sumar una tasa adicional. La regla vigente (Com. «A»
            8246/2025 del BCRA) pide un mínimo de {UVA.plazoMinimoDias} días, con opción de
            precancelar desde el día {UVA.precancelableDesdeDia} — aunque precancelando cobrás una
            tasa fija menor en lugar del ajuste por inflación.
          </p>
          <p>
            ¿Cuál conviene? Si esperás que la inflación mensual supere a la TEM del tradicional,
            el UVA protege mejor; si creés que la inflación va a bajar más rápido que las tasas,
            el tradicional paga más. La calculadora simula los dos escenarios con tu propia
            estimación — el futuro no lo conoce nadie, así que probá varias.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Seguro, sin comisiones y sin impuestos</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Tres cosas que juegan a favor del plazo fijo y poca gente conoce con precisión: los
            depósitos están cubiertos por la{" "}
            <strong>
              garantía de los depósitos hasta {GARANTIA_DEPOSITOS.monto.toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                maximumFractionDigits: 0,
              })}
            </strong>{" "}
            por persona y por banco (vigente desde el {GARANTIA_DEPOSITOS.vigenciaDesde}); los
            intereses están <strong>exentos de Ganancias</strong> para personas humanas y los
            depósitos <strong>exentos de Bienes Personales</strong>; y los bancos no cobran
            comisión por constituirlos. Lo que ves en la calculadora es lo que cobrás.
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
    </article>
  );
}
