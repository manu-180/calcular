import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraActualizacionCreditos } from "@/components/CalculadoraActualizacionCreditos";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import {
  COSTAS_MAXIMAS,
  CREDITOS_FUENTES,
  CREDITOS_TEXTOS,
  CUOTAS_GRANDES_EMPRESAS,
  CUOTAS_PYME,
  CUOTA_LITIS_MAXIMA,
  TASA_PURA_ANUAL,
  VIGENCIA_ART_276,
} from "@/data/actualizacion-creditos";
import {
  actualizarCreditoLaboral,
  cuotasSinAjuste,
} from "@/lib/actualizacion-creditos";
import {
  PRIMER_PERIODO,
  ULTIMO_PERIODO,
  nombrePeriodo,
  sumarMeses,
  variacionMensual,
} from "@/lib/inflacion";
import { formatARS, formatPct } from "@/lib/formato";
import { productoPorSlug } from "@/lib/mp";

/** El caso testigo de la página: un millón de pesos debidos hace dos años. */
const EJEMPLO_MONTO = 1_000_000;
const EJEMPLO_DESDE = sumarMeses(ULTIMO_PERIODO, -24);
const EJEMPLO = actualizarCreditoLaboral({
  monto: EJEMPLO_MONTO,
  desde: EJEMPLO_DESDE,
  hasta: ULTIMO_PERIODO,
})!;

const MENSUAL = variacionMensual(ULTIMO_PERIODO);
/** Lo que suma un mes de demora hoy: IPC del mes + la doceava parte del 3% anual. */
const COSTO_MENSUAL_PCT =
  MENSUAL === null ? null : MENSUAL + (TASA_PURA_ANUAL / 12) * 100;

/** Qué pasa si las 12 cuotas del art. 277 no se ajustan. */
const CUOTAS_PYME_SIN_AJUSTE = cuotasSinAjuste(EJEMPLO.total, CUOTAS_PYME);

export const metadata: Metadata = {
  title: "Actualización de créditos laborales: IPC + 3% anual",
  description:
    "Calculá cuánto vale hoy una deuda laboral con el IPC del INDEC más 3% anual (art. 276 LCT), con la serie oficial y los topes del art. 277.",
  alternates: { canonical: "/actualizacion-creditos-laborales" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Créditos laborales · art. 276")}&s=${encodeURIComponent("IPC + 3% anual, por ley desde marzo de 2026")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cómo se actualiza hoy un crédito laboral?",
    a: `Por ley, desde el ${VIGENCIA_ART_276}. El art. 276 de la Ley de Contrato de Trabajo (con el texto que le dio el art. 54 de la Ley 27.802) dice que los créditos laborales se actualizan por el Índice de Precios al Consumidor Nivel General del INDEC, más un interés del ${formatPct(TASA_PURA_ANUAL * 100, 0)} anual. Corre desde que cada suma se debe hasta que se paga. Antes de la reforma no había una regla en la ley: cada fuero usaba la tasa que decidía su jurisprudencia, y el mismo crédito daba montos muy distintos según dónde tramitara. Cualquier calculadora o nota anterior a marzo de 2026 explica el régimen viejo.`,
  },
  {
    q: "¿El 3% anual se calcula sobre el monto original o sobre el actualizado?",
    a: "Sobre el actualizado. La norma lo dice en ese orden («serán actualizados por la variación… con más una tasa de interés del 3% anual»): primero se actualiza el capital por IPC y sobre ese valor corre el interés. Es la única lectura que tiene sentido, porque un 3% anual sobre un capital comido por la inflación no compensaría nada. Por eso se lo llama tasa pura o interés puro: la inflación ya la cubre el índice.",
  },
  {
    q: "¿El 3% se capitaliza?",
    a: `La ley no lo dice, y sin una norma que lo autorice el interés no se capitaliza. Por eso el número principal de esta página es con interés simple. Igual mostramos al lado el resultado con capitalización anual, porque es el mismo texto leído de la otra forma y la diferencia es plata. En el ejemplo de ${formatARS(EJEMPLO_MONTO, 0)} debidos en ${nombrePeriodo(EJEMPLO_DESDE)}, la diferencia entre las dos lecturas es de ${formatARS(EJEMPLO.totalCompuesto - EJEMPLO.total, 2)}. Existe, pero es chica al lado de lo que mueve el índice.`,
  },
  {
    q: "El IPC se publica con atraso. ¿Hasta cuándo se puede actualizar realmente?",
    a: `Hasta el último índice publicado, que hoy es el de ${nombrePeriodo(ULTIMO_PERIODO)}. El INDEC publica cada mes entre el día 10 y el 15 del mes siguiente. Entonces, un pago que se hace hoy nunca se puede actualizar «hasta hoy»: siempre quedan uno o dos meses de inflación afuera. Ninguna liquidación lo puede evitar, y casi ninguna calculadora te lo muestra. El interés del 3% anual, en cambio, corre por el tiempo que pasa y sí llega hasta el día del pago.`,
  },
  {
    q: "¿Se puede actualizar un crédito anterior a 2017?",
    a: `Con este índice, no. La serie del IPC Nacional Nivel General del INDEC (la que nombra el artículo) arranca en ${nombrePeriodo(PRIMER_PERIODO)}. Para un crédito anterior habría que unir series distintas (IPC GBA, índices provinciales, IPIM). Eso ya no es aplicar la norma: es elegir un criterio, que es justo lo que la reforma quiso sacar de la discusión. Preferimos decírtelo antes que darte un número inventado.`,
  },
  {
    q: "¿Cuánto cuesta cada mes de demora?",
    a:
      COSTO_MENSUAL_PCT === null
        ? "Depende de la inflación del mes más la doceava parte del 3% anual."
        : `Con el último IPC publicado (${formatPct(MENSUAL!, 1)} en ${nombrePeriodo(ULTIMO_PERIODO)}), cada mes que pasa le suma cerca de ${formatPct(COSTO_MENSUAL_PCT, 2)} al crédito: la inflación del mes más la doceava parte del ${formatPct(TASA_PURA_ANUAL * 100, 0)} anual. Con esa cuenta decidís si te conviene aceptar una propuesta hoy o seguir. Una oferta que no supera al crédito actualizado del mes siguiente te ofrece menos de lo que la ley ya te reconoce.`,
  },
  {
    q: "¿Cuánto puede quedarse el abogado?",
    a: `Como máximo el ${formatPct(CUOTA_LITIS_MAXIMA * 100, 0)} del monto del proceso. Lo fija el art. 277 de la LCT, que también cambió con la Ley 27.802 (art. 56). Además, el pacto tiene que ratificarse en persona en el juicio y homologarlo el juez; sin esas dos cosas es nulo. Las costas van aparte: el mismo artículo pone un tope a las costas de primera o única instancia (con todos los honorarios incluidos) del ${formatPct(COSTAS_MAXIMAS * 100, 0)} del monto de la sentencia. Si los honorarios regulados lo superan, el juez los reparte en proporción.`,
  },
  {
    q: "¿Pueden pagarme la sentencia en cuotas?",
    a: `Sí. El art. 277 permite pagar la sentencia en hasta ${CUOTAS_GRANDES_EMPRESAS} cuotas mensuales seguidas si quien perdió es una gran empresa, y en hasta ${CUOTAS_PYME} si es una micro, pequeña o mediana empresa. Hay una diferencia en el texto que conviene mirar: para las ${CUOTAS_GRANDES_EMPRESAS} cuotas aclara «ajustadas conforme la pauta establecida en el artículo 276», y para las ${CUOTAS_PYME} no repite esa frase. Quién paga esa diferencia depende de cómo se interprete: ${CUOTAS_PYME_SIN_AJUSTE ? `si las ${CUOTAS_PYME} cuotas no se ajustaran, con una inflación mensual como la última publicada, el trabajador cobraría en valores reales un ${formatPct(CUOTAS_PYME_SIN_AJUSTE.perdidaPct, 0)} menos que el monto de la sentencia` : "sin ajuste, la inflación del período la pierde quien cobra"}.`,
  },
  {
    q: "¿Qué pasa con los juicios que ya estaban en trámite en marzo de 2026?",
    a: `La misma ley tiene una regla especial para esos casos. El art. 55 de la Ley 27.802 dice que en los juicios en trámite y sin sentencia definitiva al ${VIGENCIA_ART_276}, los créditos se actualizan con la tasa pasiva que fije el BCRA, con un techo y un piso: el resultado no puede pasar la cuenta de IPC más ${formatPct(TASA_PURA_ANUAL * 100, 0)} anual, ni quedar por debajo del 67% de esa cuenta. Esta calculadora muestra esa cuenta, que es el techo; no calcula la tasa pasiva. La norma es nueva y se discute: al menos una sala de la Cámara Nacional de Apelaciones del Trabajo declaró inconstitucional el art. 55 en un caso y aplicó el art. 276. Qué regla rige en cada expediente lo decide el juez de la causa.`,
  },
];

export default function ActualizacionCreditosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de actualización de créditos laborales (art. 276 LCT)",
        url: "https://calcular.ar/actualizacion-creditos-laborales",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      datasetSchema({
        nombre: "Actualización de créditos laborales: art. 276 LCT (IPC + 3% anual)",
        descripcion: `Cálculo de la actualización de créditos laborales según el art. 276 de la Ley 20.744 con el texto del art. 54 de la Ley 27.802 (B.O. ${VIGENCIA_ART_276}): coeficiente del IPC Nacional Nivel General del INDEC entre el mes en que la suma se hizo debida y el del efectivo pago, más una tasa de interés del ${formatPct(TASA_PURA_ANUAL * 100, 0)} anual. Serie del IPC disponible desde ${nombrePeriodo(PRIMER_PERIODO)} hasta ${nombrePeriodo(ULTIMO_PERIODO)}.`,
        url: "/actualizacion-creditos-laborales",
        modificado: `${ULTIMO_PERIODO}-01`,
        fuenteNombre: "Ley de Contrato de Trabajo 20.744, art. 276 (texto actualizado, InfoLEG)",
        fuenteUrl: CREDITOS_FUENTES.lista[0].url,
      }),
      articleSchema({
        titulo: "Actualización de créditos laborales: IPC + 3% anual",
        descripcion:
          "Cómo se actualiza hoy un crédito laboral por ley, sobre qué capital corre el 3%, hasta dónde llega realmente el IPC publicado y los topes del art. 277.",
        url: "/actualizacion-creditos-laborales",
        modificado: CREDITOS_FUENTES.consultadoEl,
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
          Actualización de créditos laborales: cuánto vale hoy lo que te deben
        </h1>
        <p className="text-zinc-600">
          Durante años, cuánto crecía un crédito laboral dependía del fuero que te tocara: tasa
          activa, actas de la Cámara, CER más un porcentaje. Desde el {VIGENCIA_ART_276} lo dice la
          ley, en una sola oración del art. 276 de la LCT:{" "}
          <strong>IPC Nivel General del INDEC más {formatPct(TASA_PURA_ANUAL * 100, 0)} anual</strong>,
          desde que cada suma se debe hasta que se paga. Acá aplicamos ese texto con la serie
          oficial del INDEC y te mostramos lo que la fórmula no cubre.
        </p>
      </header>

      <RespuestaPrimero actualizado={CREDITOS_FUENTES.consultadoEl}>
        <p>
          {formatARS(EJEMPLO_MONTO, 0)} que se deben desde {nombrePeriodo(EJEMPLO_DESDE)} valen hoy{" "}
          <strong>{formatARS(EJEMPLO.total, 2)}</strong>:{" "}
          {formatARS(EJEMPLO.capitalActualizado, 2)} de capital actualizado por el IPC (el
          coeficiente del tramo es{" "}
          {EJEMPLO.coeficiente.toLocaleString("es-AR", { maximumFractionDigits: 4 })}) más{" "}
          {formatARS(EJEMPLO.interesPuro, 2)} del {formatPct(TASA_PURA_ANUAL * 100, 0)} anual. Son{" "}
          <strong>
            {EJEMPLO.multiplicador.toLocaleString("es-AR", { maximumFractionDigits: 2 })} veces
          </strong>{" "}
          el monto original en {EJEMPLO.meses} meses. Ojo con un detalle que decide casos:{" "}
          <strong>la actualización llega hasta el último IPC publicado</strong> (
          {nombrePeriodo(ULTIMO_PERIODO)}), nunca hasta el día del pago.
        </p>
      </RespuestaPrimero>

      <CalculadoraActualizacionCreditos
        precioInforme={productoPorSlug("informe-credito-laboral")?.precio}
      />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Lo que dice el artículo, entero</h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50/40 px-4 py-3 text-sm text-zinc-700">
          <p className="font-medium text-zinc-800">Art. 276 de la Ley de Contrato de Trabajo 20.744</p>
          <p className="mt-2 italic">{CREDITOS_TEXTOS.art276}</p>
          <p className="mt-2 text-xs text-zinc-500">
            Artículo sustituido por el art. 54 de la Ley 27.802 (B.O. {VIGENCIA_ART_276}). Vigencia:
            a partir de su publicación en el Boletín Oficial.
          </p>
        </blockquote>
        <p className="text-zinc-600">
          Son cuatro decisiones en una oración, y cada una cambia el número: <strong>qué
          índice</strong> (el IPC Nivel General del INDEC, no el de tu provincia ni el mayorista),{" "}
          <strong>qué tasa</strong> ({formatPct(TASA_PURA_ANUAL * 100, 0)} anual, una tasa pura
          porque la inflación ya la cubre el índice), <strong>desde cuándo</strong> (desde que cada
          suma se debe, no desde la demanda ni desde la sentencia) y{" "}
          <strong>hasta cuándo</strong> (hasta el pago, no hasta la fecha de la liquidación).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El desfasaje del IPC: por qué nunca se actualiza «hasta hoy»
        </h2>
        <p className="text-zinc-600">
          El INDEC publica el IPC de cada mes entre el día 10 y el 15 del mes siguiente. Hoy el
          último índice disponible es el de <strong>{nombrePeriodo(ULTIMO_PERIODO)}</strong>. Un
          pago que se hace este mes se actualiza con un índice que ya tiene semanas de atraso, y esa
          inflación no se recupera nunca: una vez pagado el crédito, ningún índice futuro la
          compensa.
        </p>
        {COSTO_MENSUAL_PCT !== null && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
            <p className="text-sm text-zinc-600">
              Con el último dato publicado, cada mes de demora suma
            </p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-zinc-900">
              {formatPct(COSTO_MENSUAL_PCT, 2)}
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              {formatPct(MENSUAL!, 2)} del IPC de {nombrePeriodo(ULTIMO_PERIODO)} más{" "}
              {formatPct((TASA_PURA_ANUAL / 12) * 100, 2)} de la doceava parte del{" "}
              {formatPct(TASA_PURA_ANUAL * 100, 0)} anual. Sobre un crédito de{" "}
              {formatARS(EJEMPLO.total, 0)} son{" "}
              {formatARS((EJEMPLO.total * COSTO_MENSUAL_PCT) / 100, 0)} por mes.
            </p>
          </div>
        )}
        <p className="text-sm text-zinc-500">
          Tené ese número a mano cuando te hagan una propuesta de acuerdo. Una oferta que no le gana
          al crédito actualizado del mes que viene te ofrece menos de lo que la ley ya te reconoce.
          Para llevar la cuenta de tu caso completo, con cada rubro desde su fecha, está el{" "}
          <Link href="/informes/credito-laboral" className="font-medium text-emerald-700 hover:underline">
            informe de crédito laboral
          </Link>
          . La inflación mes a mes, con la serie completa, está en{" "}
          <Link href="/inflacion" className="font-medium text-emerald-700 hover:underline">
            la calculadora de inflación
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El art. 277: cuánto se descuenta antes de que llegue a tus manos
        </h2>
        <p className="text-zinc-600">
          La misma ley cambió el artículo siguiente. Ahí están los tres números que definen cuánto
          del crédito actualizado llega a la cuenta del trabajador.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Qué</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Tope</th>
                  <th className="px-4 py-2.5 text-left font-semibold">Letra chica</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">Pacto de cuota litis</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatPct(CUOTA_LITIS_MAXIMA * 100, 0)}
                  </td>
                  <td className="px-4 py-2.5 text-zinc-500">
                    del monto del proceso · exige ratificación personal y homologación judicial, o
                    es nulo de pleno derecho
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">Costas de primera o única instancia</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatPct(COSTAS_MAXIMAS * 100, 0)}
                  </td>
                  <td className="px-4 py-2.5 text-zinc-500">
                    honorarios de todo tipo incluidos · si las regulaciones lo superan, el juez
                    prorratea entre los beneficiarios
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">Pago en cuotas de la sentencia</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {CUOTAS_GRANDES_EMPRESAS} / {CUOTAS_PYME}
                  </td>
                  <td className="px-4 py-2.5 text-zinc-500">
                    {CUOTAS_GRANDES_EMPRESAS} cuotas mensuales para grandes empresas,{" "}
                    {CUOTAS_PYME} para MiPyME
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-sm text-amber-900">
          <p className="font-semibold">Una diferencia del texto que casi nadie marca</p>
          <p className="mt-2">
            Para las {CUOTAS_GRANDES_EMPRESAS} cuotas de las grandes empresas, la norma dice que van
            «ajustadas conforme la pauta establecida en el artículo 276». En la oración siguiente,
            la que permite {CUOTAS_PYME} cuotas para las MiPyME, esa frase no está.
          </p>
          {CUOTAS_PYME_SIN_AJUSTE && (
            <p className="mt-2">
              Si esas {CUOTAS_PYME} cuotas no se ajustaran, proyectando la última inflación mensual
              publicada ({formatPct(CUOTAS_PYME_SIN_AJUSTE.mensualUsadaPct, 1)}), la última cuota
              valdría en términos reales{" "}
              <strong>{formatARS(CUOTAS_PYME_SIN_AJUSTE.valorRealUltimaCuota, 0)}</strong> en vez de{" "}
              {formatARS(CUOTAS_PYME_SIN_AJUSTE.valorCuotaNominal, 0)}, y el cobro total perdería un{" "}
              <strong>{formatPct(CUOTAS_PYME_SIN_AJUSTE.perdidaPct, 0)}</strong> de su valor. Es más
              de lo que paga el {formatPct(TASA_PURA_ANUAL * 100, 0)} anual en tres años.
            </p>
          )}
          <p className="mt-2 text-xs">
            No es una conclusión jurídica: es lo que dice el texto, que copiamos abajo para que lo
            leas vos. Cómo se resuelve esa diferencia lo van a decidir los tribunales.
          </p>
        </div>

        <details className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 text-sm shadow-sm">
          <summary className="cursor-pointer font-semibold text-zinc-800">
            Ver los párrafos del art. 277, textuales
          </summary>
          <div className="mt-3 space-y-3 text-zinc-600">
            <p className="italic">{CREDITOS_TEXTOS.cuotaLitis}</p>
            <p className="italic">{CREDITOS_TEXTOS.cuotasGrandes}</p>
            <p className="italic">{CREDITOS_TEXTOS.cuotasPyme}</p>
            <p className="italic">{CREDITOS_TEXTOS.costas}</p>
            <p className="text-xs text-zinc-500">
              Artículo sustituido por el art. 56 de la Ley 27.802 (B.O. {VIGENCIA_ART_276}).
            </p>
          </div>
        </details>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Antes de actualizar, hay que tener el monto</h2>
        <p className="text-zinc-600">
          El art. 276 dice cómo crece un crédito, no cuánto es. Si todavía estás calculando cuánto
          te corresponde, estas tres calculadoras te dan el número que después traés acá:
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <Link
            href="/indemnizacion"
            className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-emerald-300"
          >
            <p className="font-semibold text-zinc-800">Indemnización por despido</p>
            <p className="mt-1 text-sm text-zinc-500">
              Antigüedad, preaviso, integración y SAC, con el tope del convenio y el piso del 67%.
            </p>
          </Link>
          <Link
            href="/licencia-por-enfermedad"
            className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-emerald-300"
          >
            <p className="font-semibold text-zinc-800">Licencia por enfermedad</p>
            <p className="mt-1 text-sm text-zinc-500">
              Hasta qué día se cobra sueldo con el art. 208 y desde cuándo empieza la reserva.
            </p>
          </Link>
          <Link
            href="/vacaciones"
            className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:border-emerald-300"
          >
            <p className="font-semibold text-zinc-800">Vacaciones no gozadas</p>
            <p className="mt-1 text-sm text-zinc-500">
              Los días que corresponden por antigüedad y cuánto se paga cada uno al extinguirse.
            </p>
          </Link>
        </div>
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

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {CREDITOS_FUENTES.lista.map((f) => (
            <li key={f.url}>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 hover:underline"
              >
                {f.nombre}
              </a>
              : {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página es informativa. Aplica el texto ACTUALIZADO de la Ley de Contrato de Trabajo
          publicado en InfoLEG a la serie oficial del IPC Nacional del INDEC. No es una liquidación
          judicial: en un expediente cada rubro se actualiza desde su propia fecha, puede haber
          topes, compensaciones y depósitos parciales, y se discute si el texto nuevo vale para
          tramos anteriores al {VIGENCIA_ART_276}. Si tenés un juicio en marcha, mirá también{" "}
          <Link href="/caducidad-de-instancia-laboral" className="text-emerald-700 hover:underline">
            los plazos de caducidad de instancia
          </Link>{" "}
          y{" "}
          <Link href="/honorarios-periciales" className="text-emerald-700 hover:underline">
            los honorarios de los peritos
          </Link>
          .
          Texto legal consultado el {CREDITOS_FUENTES.consultadoEl}. Serie del IPC hasta{" "}
          {nombrePeriodo(ULTIMO_PERIODO)}.
        </p>
      </section>
    </article>
  );
}
