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
  title: "Actualización de créditos laborales: IPC + 3% anual (art. 276 LCT)",
  description: `Desde el ${VIGENCIA_ART_276} la ley dice cómo se actualiza un crédito laboral: IPC Nivel General del INDEC más 3% anual, desde que la suma es debida hasta el pago. Calculadora con la serie oficial hasta ${nombrePeriodo(ULTIMO_PERIODO)}, el desfasaje del IPC que nadie descuenta y los topes del art. 277 (cuota litis 20%, costas 25%, pago en cuotas).`,
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
    a: `Por ley, y desde el ${VIGENCIA_ART_276}: el art. 276 de la Ley de Contrato de Trabajo, con el texto que le puso el art. 54 de la Ley 27.802, dice que los créditos de las relaciones individuales de trabajo se actualizan por la variación del Índice de Precios al Consumidor Nivel General del INDEC, con más una tasa de interés del ${formatPct(TASA_PURA_ANUAL * 100, 0)} anual, desde que cada suma es debida y hasta el momento del efectivo pago. Antes de esa reforma no había una regla legal: cada fuero aplicaba la tasa que decidía su jurisprudencia, y por eso el mismo crédito daba montos muy distintos según dónde tramitara. Cualquier calculadora o nota anterior a marzo de 2026 está explicando el régimen anterior.`,
  },
  {
    q: "¿El 3% anual se calcula sobre el monto original o sobre el actualizado?",
    a: "Sobre el actualizado. La norma enumera en ese orden —«serán actualizados por la variación… con más una tasa de interés del 3% anual»—, así que primero se repotencia el capital por IPC y sobre ese valor corre el interés. Es la única lectura que le da sentido al número: un 3% anual sobre un capital nominal licuado por la inflación no compensaría nada. En la práctica se lo llama tasa pura o interés puro, porque la depreciación monetaria ya está cubierta por el índice.",
  },
  {
    q: "¿El 3% se capitaliza?",
    a: `La ley no lo dice, y sin norma que lo autorice el interés no se capitaliza: por eso el número principal de esta página es el interés simple. Igual mostramos el resultado con capitalización anual al lado, porque es el mismo texto leído con la otra hipótesis y la diferencia es plata. En el ejemplo de ${formatARS(EJEMPLO_MONTO, 0)} debidos en ${nombrePeriodo(EJEMPLO_DESDE)} la brecha entre las dos lecturas es de ${formatARS(EJEMPLO.totalCompuesto - EJEMPLO.total, 2)}: existe, pero es chica al lado de lo que mueve el índice.`,
  },
  {
    q: "El IPC se publica con atraso. ¿Hasta cuándo se puede actualizar realmente?",
    a: `Hasta el último índice publicado, que hoy es el de ${nombrePeriodo(ULTIMO_PERIODO)}. El INDEC publica cada mes alrededor del día 10 al 15 del mes siguiente, así que un pago que se hace hoy nunca se puede repotenciar «hasta hoy»: siempre quedan uno o dos meses de inflación sin cubrir. Es un desfasaje estructural que ninguna liquidación puede evitar y que casi ninguna calculadora te muestra. El interés del 3% anual, en cambio, corre por tiempo transcurrido y sí llega hasta la fecha real del pago.`,
  },
  {
    q: "¿Se puede actualizar un crédito anterior a 2017?",
    a: `Con este índice, no. La serie del IPC Nacional Nivel General del INDEC —la que nombra el artículo— arranca en ${nombrePeriodo(PRIMER_PERIODO)}. Para un crédito anterior habría que empalmar series distintas (IPC GBA, índices provinciales, IPIM), y eso ya no es aplicar la norma: es elegir un criterio, que es exactamente lo que la reforma vino a sacar de la discusión. Esta calculadora prefiere decírtelo antes que darte un número inventado.`,
  },
  {
    q: "¿Cuánto cuesta cada mes de demora?",
    a:
      COSTO_MENSUAL_PCT === null
        ? "Depende de la inflación del mes más la doceava parte del 3% anual."
        : `Con el último IPC publicado —${formatPct(MENSUAL!, 1)} en ${nombrePeriodo(ULTIMO_PERIODO)}— cada mes que pasa suma alrededor de ${formatPct(COSTO_MENSUAL_PCT, 2)} al crédito: la inflación del mes más la doceava parte del ${formatPct(TASA_PURA_ANUAL * 100, 0)} anual. Es la cuenta que decide si conviene aceptar una propuesta hoy o seguir: una oferta que no supera al crédito actualizado del mes siguiente está ofreciendo menos de lo que la ley ya reconoce.`,
  },
  {
    q: "¿Cuánto puede quedarse el abogado?",
    a: `Como máximo el ${formatPct(CUOTA_LITIS_MAXIMA * 100, 0)} del monto del proceso: lo fija el art. 277 de la LCT, también sustituido por la Ley 27.802 (art. 56). Además exige ratificación personal en el juicio y homologación judicial; sin esos dos requisitos el pacto es nulo de pleno derecho. Aparte corren las costas: el mismo artículo topea la responsabilidad por costas de primera o única instancia —honorarios de todo tipo incluidos— en el ${formatPct(COSTAS_MAXIMAS * 100, 0)} del monto de la sentencia, y si las regulaciones lo superan el juez prorratea entre los beneficiarios.`,
  },
  {
    q: "¿Pueden pagarme la sentencia en cuotas?",
    a: `Sí. El art. 277 permite cancelar la sentencia en hasta ${CUOTAS_GRANDES_EMPRESAS} cuotas mensuales consecutivas cuando el condenado es una gran empresa, y en hasta ${CUOTAS_PYME} cuando es una micro, pequeña o mediana empresa. Y acá hay una asimetría del texto que conviene mirar: la norma aclara «ajustadas conforme la pauta establecida en el artículo 276» para el supuesto de las ${CUOTAS_GRANDES_EMPRESAS} cuotas, y no repite esa frase para el de las ${CUOTAS_PYME}. Quién paga esa diferencia depende de cómo se interprete: ${CUOTAS_PYME_SIN_AJUSTE ? `si ${CUOTAS_PYME} cuotas no se ajustaran, con una inflación mensual como la última publicada el trabajador cobraría en términos reales un ${formatPct(CUOTAS_PYME_SIN_AJUSTE.perdidaPct, 0)} menos que el monto de la sentencia` : "sin ajuste, la inflación del período se la come el acreedor"}.`,
  },
  {
    q: "¿Qué pasa con los períodos anteriores a marzo de 2026?",
    a: `Es la discusión abierta. El texto nuevo rige desde su publicación en el Boletín Oficial (${VIGENCIA_ART_276}) y no dice qué hacer con los tramos ya corridos bajo el régimen anterior; los tribunales lo están resolviendo. Esta calculadora aplica el texto vigente a todo el período que le cargues y te lo dice de frente, para que sepas exactamente qué estás mirando: es una estimación con la regla de hoy, no una liquidación judicial.`,
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
        nombre: "Actualización de créditos laborales — art. 276 LCT (IPC + 3% anual)",
        descripcion: `Cálculo de la actualización de créditos laborales según el art. 276 de la Ley 20.744 con el texto del art. 54 de la Ley 27.802 (B.O. ${VIGENCIA_ART_276}): coeficiente del IPC Nacional Nivel General del INDEC entre el mes en que la suma se hizo debida y el del efectivo pago, más una tasa de interés del ${formatPct(TASA_PURA_ANUAL * 100, 0)} anual. Serie del IPC disponible desde ${nombrePeriodo(PRIMER_PERIODO)} hasta ${nombrePeriodo(ULTIMO_PERIODO)}.`,
        url: "/actualizacion-creditos-laborales",
        modificado: `${ULTIMO_PERIODO}-01`,
        fuenteNombre: "Ley de Contrato de Trabajo 20.744, art. 276 (texto actualizado, InfoLEG)",
        fuenteUrl: CREDITOS_FUENTES.lista[0].url,
      }),
      articleSchema({
        titulo: "Actualización de créditos laborales: IPC + 3% anual (art. 276 LCT)",
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
          desde que cada suma es debida hasta el efectivo pago. Acá se aplica ese texto con la serie
          oficial del INDEC, y se muestra lo que la fórmula no cubre.
        </p>
      </header>

      <RespuestaPrimero actualizado={CREDITOS_FUENTES.consultadoEl}>
        <p>
          {formatARS(EJEMPLO_MONTO, 0)} que se hicieron debidos en {nombrePeriodo(EJEMPLO_DESDE)}{" "}
          valen hoy <strong>{formatARS(EJEMPLO.total, 2)}</strong>:{" "}
          {formatARS(EJEMPLO.capitalActualizado, 2)} de capital repotenciado por el IPC —el
          coeficiente del tramo es{" "}
          {EJEMPLO.coeficiente.toLocaleString("es-AR", { maximumFractionDigits: 4 })}— más{" "}
          {formatARS(EJEMPLO.interesPuro, 2)} del {formatPct(TASA_PURA_ANUAL * 100, 0)} anual. Es{" "}
          <strong>
            {EJEMPLO.multiplicador.toLocaleString("es-AR", { maximumFractionDigits: 2 })} veces
          </strong>{" "}
          el nominal en {EJEMPLO.meses} meses. La letra chica que decide casos:{" "}
          <strong>la actualización llega hasta el último IPC publicado</strong> (
          {nombrePeriodo(ULTIMO_PERIODO)}), nunca hasta el día del pago.
        </p>
      </RespuestaPrimero>

      <CalculadoraActualizacionCreditos />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Lo que dice el artículo, entero</h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50/40 px-4 py-3 text-sm text-zinc-700">
          <p className="font-medium text-zinc-800">Art. 276 — Ley de Contrato de Trabajo 20.744</p>
          <p className="mt-2 italic">{CREDITOS_TEXTOS.art276}</p>
          <p className="mt-2 text-xs text-zinc-500">
            Artículo sustituido por el art. 54 de la Ley 27.802 (B.O. {VIGENCIA_ART_276}). Vigencia:
            a partir de su publicación en el Boletín Oficial.
          </p>
        </blockquote>
        <p className="text-zinc-600">
          Son cuatro decisiones metidas en una oración, y cada una cambia el número: <strong>qué
          índice</strong> (el IPC Nivel General del INDEC, no el de tu provincia ni el mayorista),{" "}
          <strong>qué tasa</strong> ({formatPct(TASA_PURA_ANUAL * 100, 0)} anual, que es una tasa
          pura porque la inflación ya la cubre el índice), <strong>desde cuándo</strong> (desde que
          cada suma es debida, no desde la demanda ni desde la sentencia) y{" "}
          <strong>hasta cuándo</strong> (el efectivo pago, no la fecha de la liquidación).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El desfasaje del IPC: por qué nunca se actualiza «hasta hoy»
        </h2>
        <p className="text-zinc-600">
          El INDEC publica el IPC de cada mes alrededor del día 10 al 15 del mes siguiente. Hoy el
          último índice disponible es el de <strong>{nombrePeriodo(ULTIMO_PERIODO)}</strong>. Eso
          significa que un pago que se concreta este mes se repotencia con un índice que ya tiene
          semanas de atraso, y esa inflación no vuelve nunca: no hay un índice futuro que la
          recupere retroactivamente sobre un crédito ya cancelado.
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
          Ese número es el que conviene tener a mano frente a una propuesta de acuerdo: una oferta
          que no le gana al crédito actualizado del mes que viene está ofreciendo menos de lo que la
          ley ya reconoce. La inflación mes a mes, con la serie completa, está en{" "}
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
          La misma ley sustituyó el artículo siguiente, y ahí están los tres números que definen
          cuánto del crédito actualizado termina en la cuenta del trabajador.
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
          <p className="font-semibold">Una asimetría del texto que casi nadie señala</p>
          <p className="mt-2">
            Para las {CUOTAS_GRANDES_EMPRESAS} cuotas de las grandes empresas la norma dice
            expresamente que van «ajustadas conforme la pauta establecida en el artículo 276». En la
            oración siguiente, la que habilita {CUOTAS_PYME} cuotas para las MiPyME, esa frase no
            aparece.
          </p>
          {CUOTAS_PYME_SIN_AJUSTE && (
            <p className="mt-2">
              Si esas {CUOTAS_PYME} cuotas no se ajustaran, proyectando la última inflación mensual
              publicada ({formatPct(CUOTAS_PYME_SIN_AJUSTE.mensualUsadaPct, 1)}), la última cuota
              valdría en términos reales{" "}
              <strong>{formatARS(CUOTAS_PYME_SIN_AJUSTE.valorRealUltimaCuota, 0)}</strong> en vez de{" "}
              {formatARS(CUOTAS_PYME_SIN_AJUSTE.valorCuotaNominal, 0)}, y el cobro total se licuaría
              un <strong>{formatPct(CUOTAS_PYME_SIN_AJUSTE.perdidaPct, 0)}</strong> — más de lo que
              paga el {formatPct(TASA_PURA_ANUAL * 100, 0)} anual en tres años.
            </p>
          )}
          <p className="mt-2 text-xs">
            No es una conclusión jurídica: es lo que dice el texto, transcripto abajo, para que lo
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
          El art. 276 dice cómo crece un crédito, no cuál es. Si todavía estás en la etapa de
          calcular cuánto te corresponde, estas tres calculadoras dan el número que después se trae
          acá:
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
              </a>{" "}
              — {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página es informativa y aplica el texto ACTUALIZADO de la Ley de Contrato de Trabajo
          publicado en InfoLEG sobre la serie oficial del IPC Nacional del INDEC. No es una
          liquidación judicial: en un expediente cada rubro se actualiza desde su propia fecha de
          exigibilidad, pueden intervenir topes, compensaciones y depósitos parciales, y la
          aplicación del texto nuevo a tramos anteriores al {VIGENCIA_ART_276} está en discusión.
          Texto legal consultado el {CREDITOS_FUENTES.consultadoEl}. Serie del IPC hasta{" "}
          {nombrePeriodo(ULTIMO_PERIODO)}.
        </p>
      </section>
    </article>
  );
}
