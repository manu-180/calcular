import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraMultasArca } from "@/components/CalculadoraMultasArca";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import {
  CLAUSURA,
  INFRACCIONES,
  MULTAS_FUENTES,
  MULTAS_TEXTOS,
  UMBRAL_GRANDES_CONTRIBUYENTES,
  VIGENCIA_MULTAS,
} from "@/data/multas-arca";
import { calcularMulta, infraccionPorId, rangoMultiplicadores } from "@/lib/multas-arca";
import { formatARS } from "@/lib/formato";

const DDJJ = infraccionPorId("ddjj-omitida");
const DDJJ_PERSONA = DDJJ.fijo!.persona;
const DDJJ_SOCIEDAD = DDJJ.fijo!.sociedad;
const DDJJ_REDUCIDA = calcularMulta({
  infraccionId: "ddjj-omitida",
  sujeto: "persona",
  aplicaReduccion: true,
}).montoReducido!;

const FORMAL = infraccionPorId("deber-formal");
const AGRAVADO = infraccionPorId("deber-formal-agravado");
const NO_REGISTRADO = infraccionPorId("empleo-no-registrado");
const FACTORES = rangoMultiplicadores();

export const metadata: Metadata = {
  title: "Multas de ARCA por deberes formales: cuánto son desde la Ley 27.799",
  description: `La multa por no presentar una declaración jurada en término pasó de $200 a ${formatARS(DDJJ_PERSONA, 0)} (${formatARS(DDJJ_SOCIEDAD, 0)} para sociedades) el 2 de enero de 2026, y baja a la mitad de pleno derecho si pagás y presentás. Calculá cada infracción de la Ley 11.683 con el monto vigente, el anterior y las reducciones de los arts. 49 y 50.`,
  alternates: { canonical: "/multas-arca" },
  openGraph: {
    title: "Multas de ARCA: los montos que cambiaron en enero de 2026",
    description: `No presentar una DDJJ ya no son $200: son ${formatARS(DDJJ_PERSONA, 0)}. La escala entera de la Ley 11.683, con lo que valía antes al lado.`,
    url: "https://calcular.ar/multas-arca",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Multas de ARCA · Ley 11.683")}&s=${encodeURIComponent(`No presentar una DDJJ: ${formatARS(DDJJ_PERSONA, 0)}`)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuánto es la multa por no presentar una declaración jurada?",
    a: `${formatARS(DDJJ_PERSONA, 0)} si el obligado es una persona humana y ${formatARS(DDJJ_SOCIEDAD, 0)} si es una sociedad, asociación o entidad constituida en el país. Lo fija el artículo 38 de la Ley 11.683 con los importes que le puso el artículo 15 de la Ley 27.799, en vigor desde el 2 de enero de 2026. Antes de esa fecha eran $200 y $400, que es lo que sigue publicando casi toda la web: no es una diferencia de redacción, es más de mil veces el monto.`,
  },
  {
    q: "¿Se puede pagar menos?",
    a: `Sí, y la propia ley lo dice: si el infractor paga la multa y presenta la declaración jurada omitida, el importe se reduce «de pleno derecho a la mitad» —${formatARS(DDJJ_REDUCIDA, 0)} para una persona humana— y la infracción no se considera como antecedente en su contra. Lo que casi nadie cita es que hay dos ventanas para hacerlo, no una: dentro de los 15 días de la notificación, o desde el vencimiento general de la obligación hasta 15 días después de esa notificación.`,
  },
  {
    q: "¿Qué pasa si presento la declaración jurada antes de que me notifiquen algo?",
    a: `El primer párrafo del artículo 49 dice que quien regulariza su situación presentando la declaración jurada omitida o su rectificativa antes de que se le notifique una orden de intervención «quedará exento de responsabilidad infraccional», siempre que no sea reincidente en infracciones materiales. Vale la pena leerlo con cuidado: ese párrafo no nombra artículos, mientras que los párrafos siguientes del mismo artículo sí enumeran los artículos 45, 46 y 48. Publicamos el texto tal como está; no afirmamos que cubra también a las infracciones formales, porque la norma no lo dice.`,
  },
  {
    q: "Me abrieron un sumario por el artículo 39. ¿Conviene reconocer la infracción?",
    a: `Es la decisión más cara de esta página, y la ley la resuelve con un número. El artículo 50 dice que si en la primera oportunidad de defensa del sumario —o en la audiencia del artículo 41— el titular o representante legal reconoce la materialidad de la infracción, las sanciones se reducen, por única vez, al mínimo legal. En el caso general del artículo 39 eso significa pasar de un techo de ${formatARS(FORMAL.rango!.maximo, 0)} a ${formatARS(FORMAL.rango!.minimo, 0)}; en los cuatro supuestos agravados, de ${formatARS(AGRAVADO.rango!.maximo, 0)} al mismo mínimo.`,
  },
  {
    q: "¿Me pueden clausurar el local por no dar una factura chica?",
    a: `Desde enero de 2026, no por cualquier importe. El acápite del artículo 40 exige que el valor de los bienes o servicios de la operación exceda ${formatARS(CLAUSURA.pisoValorOperacion, 0)}; ese piso era de ${formatARS(CLAUSURA.pisoAnterior, 0)}, o sea que en la práctica no filtraba nada. Debajo del piso la conducta puede seguir siendo una infracción a los deberes formales, pero no habilita la clausura de ${CLAUSURA.diasMinimo} a ${CLAUSURA.diasMaximo} días de ese artículo.`,
  },
  {
    q: "¿Las multas se suman entre sí?",
    a: "Sí, y la ley lo dice con todas las letras en dos lugares. El artículo 39 aclara que sus multas «son acumulables con las establecidas en el artículo 38», y el artículo agregado a continuación del 39 dice lo mismo respecto del agregado a continuación del 38. Además, si ya hubo una resolución condenatoria por incumplir un requerimiento, cada reiteración posterior sobre el mismo deber formal es una multa independiente, aunque las anteriores no estén firmes ni se hayan discutido.",
  },
  {
    q: "¿Cuánto es la multa por tener empleados sin registrar?",
    a: `De ${formatARS(NO_REGISTRADO.rango!.minimo, 0)} a ${formatARS(NO_REGISTRADO.rango!.maximo, 0)}, y es «sin perjuicio de las demás sanciones que pudieran corresponder»: convive con las multas laborales y previsionales, no las reemplaza. Antes de la Ley 27.799 el rango era de $3.000 a $100.000. Y hay un agravante propio: si el establecimiento tiene al menos 10 empleados y la mitad o más del personal relevado está sin registrar, el inciso g) del artículo 40 habilita además la clausura.`,
  },
  {
    q: "¿Todos los montos se multiplicaron por mil?",
    a: `No, y decirlo así es el error más común. Los factores de la reforma van de ${FACTORES.minimo} a ${FACTORES.maximo} veces según el artículo: la multa del artículo 38 se multiplicó por 1.100, la del primer párrafo del 39 por 1.000, el techo agravado del 39 por unas 778 veces, el piso de valor de la clausura por 2.000 y la multa por empleo no registrado por unas 67. Por eso esta página muestra el importe anterior al lado de cada uno, en vez de publicar un porcentaje único.`,
  },
  {
    q: "¿Y si el error fue de buena fe?",
    a: "La ley tiene una figura propia para eso. Un artículo sin número incorporado a continuación del 50 define el error excusable: existe cuando la norma aplicable, «por su complejidad, oscuridad o novedad», admitía varias interpretaciones que impedían entender su verdadero significado aun actuando con la debida diligencia. Para evaluarlo hay que valorar la norma incumplida, la condición del contribuyente y si la conducta se repitió antes. No es automático: se invoca y se prueba en el sumario.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de multas de ARCA por deberes formales (Ley 11.683)",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        url: "https://calcular.ar/multas-arca",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
      },
      datasetSchema({
        nombre: "Escala de sanciones por deberes formales de la Ley 11.683",
        descripcion:
          "Importes vigentes e importes anteriores de las multas de los artículos 38, 39 y 40 de la Ley 11.683 (t.o. 1998), con el artículo de la Ley 27.799 que sustituyó cada uno, las reducciones de los artículos 38 y 50 y el piso de valor que habilita la clausura.",
        url: "/multas-arca",
        modificado: MULTAS_FUENTES.consultadoEl,
        fuenteNombre: MULTAS_FUENTES.principal.nombre,
        fuenteUrl: MULTAS_FUENTES.principal.url,
      }),
      articleSchema({
        titulo: "Multas de ARCA por deberes formales: la escala que cambió en enero de 2026",
        descripcion:
          "La Ley 27.799 reescribió los importes de las sanciones formales de la Ley 11.683, congelados desde 2003. Cuánto es cada multa hoy, cuánto era antes, cuándo baja a la mitad de pleno derecho, cuándo baja al mínimo legal y desde qué valor de operación se habilita la clausura.",
        url: "/multas-arca",
        modificado: MULTAS_FUENTES.consultadoEl,
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
          Multas de ARCA: cuánto son hoy, y cuánto bajan si actuás a tiempo
        </h1>
        <p className="text-zinc-600">
          Las sanciones por deberes formales de la Ley 11.683 estaban congeladas desde 2003 y eran
          casi simbólicas. El <strong>{VIGENCIA_MULTAS.reformaBO}</strong> la{" "}
          {VIGENCIA_MULTAS.reforma} las reescribió una por una: una multa de $200 pasó a{" "}
          {formatARS(DDJJ_PERSONA, 0)}. Acá está la escala entera, con el importe anterior al lado
          para que se vea el salto.
        </p>
      </header>

      <RespuestaPrimero actualizado={MULTAS_FUENTES.consultadoEl}>
        <p>
          <strong>
            No presentar una declaración jurada en término cuesta {formatARS(DDJJ_PERSONA, 0)} para
            una persona humana y {formatARS(DDJJ_SOCIEDAD, 0)} para una sociedad
          </strong>{" "}
          (art. 38), y se aplica sin requerimiento previo. Pero baja{" "}
          <strong>de pleno derecho a la mitad</strong> —{formatARS(DDJJ_REDUCIDA, 0)}— si se paga y
          se presenta la declaración jurada dentro de los 15 días, y en ese caso{" "}
          <strong>no cuenta como antecedente</strong>. El incumplimiento de cualquier otro deber
          formal va de {formatARS(FORMAL.rango!.minimo, 0)} a {formatARS(FORMAL.rango!.maximo, 0)}{" "}
          (art. 39), con techo de {formatARS(AGRAVADO.rango!.maximo, 0)} en cuatro supuestos
          agravados, y <strong>reconocer la infracción lo lleva al mínimo legal</strong> (art. 50).
          La clausura del art. 40 sólo se habilita si el valor de la operación supera{" "}
          {formatARS(CLAUSURA.pisoValorOperacion, 0)}.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Tu caso</h2>
        <p className="text-sm text-zinc-600">
          Elegí la infracción y mirá el monto vigente, el que regía antes de la reforma y el efecto
          de la reducción que la ley te da para ese artículo.
        </p>
        <CalculadoraMultasArca />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La escala completa, y lo que valía hasta el {VIGENCIA_MULTAS.reformaBO}
        </h2>
        <p className="text-zinc-600">
          Esta tabla es el argumento de la página. La columna de la derecha no es un dato
          histórico: es lo que todavía publica cualquier nota escrita antes de enero de 2026, y es
          entre {FACTORES.minimo} y {FACTORES.maximo} veces menos que lo que dice la ley hoy. El
          multiplicador no está escrito a mano: sale de dividir un importe por el otro.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[42rem] text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Infracción</th>
                  <th className="px-4 py-2.5 font-semibold">Artículo</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Hoy</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Antes</th>
                </tr>
              </thead>
              <tbody>
                {INFRACCIONES.map((i) => (
                  <tr key={i.id} className="border-t border-zinc-100 align-top">
                    <td className="px-4 py-2.5 text-zinc-800">{i.etiqueta}</td>
                    <td className="px-4 py-2.5 text-zinc-600">{i.articulo}</td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                      {i.fijo
                        ? `${formatARS(i.fijo.persona, 0)} / ${formatARS(i.fijo.sociedad, 0)}`
                        : `${formatARS(i.rango!.minimo, 0)} a ${formatARS(i.rango!.maximo, 0)}`}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-zinc-500">
                      {i.fijo
                        ? `${formatARS(i.anterior.persona!, 0)} / ${formatARS(i.anterior.sociedad!, 0)}`
                        : `${formatARS(i.anterior.minimo!, 0)} a ${formatARS(i.anterior.maximo!, 0)}`}
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-zinc-100 bg-amber-50/50 align-top">
                  <td className="px-4 py-2.5 text-zinc-800">
                    Piso de valor para que se habilite la clausura
                  </td>
                  <td className="px-4 py-2.5 text-zinc-600">{CLAUSURA.articulo}, acápite</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                    {formatARS(CLAUSURA.pisoValorOperacion, 0)}
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-zinc-500">
                    {formatARS(CLAUSURA.pisoAnterior, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-zinc-500">
          Los importes de la columna «Antes» no son una estimación nuestra: son los que el propio
          texto actualizado de la Ley 11.683 cita en la nota de sustitución al pie de cada artículo,
          junto con el artículo de la {VIGENCIA_MULTAS.reforma} que los reemplazó.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Las dos salidas que la ley te da</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-900">
              La mitad, de pleno derecho — art. 38
            </p>
            <p className="mt-1 text-sm text-zinc-700">
              Pagar la multa y presentar la declaración jurada omitida la baja a{" "}
              {formatARS(DDJJ_REDUCIDA, 0)} y borra el antecedente. No hay que pedirlo ni discutirlo:
              la reducción opera sola si se cumplen los dos requisitos dentro de alguna de las dos
              ventanas de 15 días.
            </p>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-900">El mínimo legal — art. 50</p>
            <p className="mt-1 text-sm text-zinc-700">
              Reconocer la materialidad de la infracción en la primera defensa del sumario del art.
              39 lleva la sanción al mínimo legal, por única vez. En los supuestos agravados eso es
              pasar de {formatARS(AGRAVADO.rango!.maximo, 0)} a{" "}
              {formatARS(AGRAVADO.rango!.minimo, 0)}.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Las siete conductas que habilitan la clausura
        </h2>
        <p className="text-zinc-600">
          Ninguna de estas habilita la clausura por sí sola: el acápite del artículo 40 exige
          además que el valor de los bienes o servicios de la operación exceda{" "}
          {formatARS(CLAUSURA.pisoValorOperacion, 0)}. La sanción va de {CLAUSURA.diasMinimo} a{" "}
          {CLAUSURA.diasMaximo} días, y el mínimo y el máximo se duplican si hubo otra infracción
          del mismo artículo dentro de los {CLAUSURA.aniosReincidencia} años anteriores.
        </p>
        <ul className="list-disc space-y-1.5 pl-5 text-zinc-600">
          {CLAUSURA.conductas.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683, art. 38 — la multa automática
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.art38Primero}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              La frase que la vuelve automática es <strong>«sin necesidad de requerimiento
              previo»</strong>: no hace falta que ARCA pida nada antes de aplicarla.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683, art. 38 — la reducción a la mitad, con sus dos ventanas
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.art38Reduccion}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              La segunda oración es la que casi nunca se cita: el mismo efecto se produce si los dos
              requisitos se cumplen <strong>desde el vencimiento general</strong> de la obligación,
              o sea antes de que llegue notificación alguna.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-sky-300 bg-sky-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683, art. 39 — la multa por deberes formales
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.art39Primero}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-amber-300 bg-amber-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683, art. 39 — se suman, no se eligen
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.art39Acumulable}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-300 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683, art. 40 — el piso de valor que nadie publica
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.art40Acapite}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              El acápite dice <strong>«exceda»</strong>: una operación de exactamente{" "}
              {formatARS(CLAUSURA.pisoValorOperacion, 0)} no supera el piso.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-300 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683, art. 40 — empleo no registrado
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.art40NoRegistrado}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683, art. 40 — la duplicación por repetir dentro de dos años
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.art40Reincidencia}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683, art. 50 — reconocer la infracción baja al mínimo
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.art50}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683, art. 49 — regularizar antes de la orden de intervención
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.art49Primero}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Lo citamos con su límite a la vista: este párrafo habla de «responsabilidad
              infraccional» sin nombrar artículos, mientras que los párrafos siguientes del mismo
              artículo sí enumeran los arts. 45, 46 y 48. No afirmamos que alcance a las
              infracciones formales, porque el texto no lo dice.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683 — cuándo hay reincidencia
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.reincidencia}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">Ley 11.683 — el error excusable</p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.errorExcusable}»</p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El agravante para los contribuyentes grandes
        </h2>
        <p className="text-zinc-600">
          Hay un tramo de la escala que no le aplica a casi nadie, pero conviene conocerlo porque es
          el que explica los titulares. A quien tenga ingresos brutos anuales iguales o superiores a{" "}
          {formatARS(UMBRAL_GRANDES_CONTRIBUYENTES.ingresosBrutosAnuales, 0)} y no conteste el{" "}
          <strong>tercer</strong> requerimiento de ARCA se le aplica una multa de{" "}
          {UMBRAL_GRANDES_CONTRIBUYENTES.vecesMinimo} a {UMBRAL_GRANDES_CONTRIBUYENTES.vecesMaximo}{" "}
          veces el importe máximo del artículo, acumulable con las demás. Ese umbral también lo movió
          la reforma: era de {formatARS(UMBRAL_GRANDES_CONTRIBUYENTES.anterior, 0)} y hoy es mil
          veces más alto, con lo cual el agravante alcanza a muchísimas menos empresas que antes
          ({UMBRAL_GRANDES_CONTRIBUYENTES.sustituidoPor}).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-zinc-900">{f.q}</h3>
              <p className="mt-1 text-zinc-600">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3 text-sm text-zinc-600">
        <h2 className="text-xl font-bold text-zinc-900">Fuentes</h2>
        <ul className="list-disc space-y-1.5 pl-5">
          {MULTAS_FUENTES.lista.map((f) => (
            <li key={f.nombre}>
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
          Esta página es informativa y reproduce normas publicadas en el Boletín Oficial e InfoLEG;
          quien aplica las sanciones y las gradúa es ARCA. Si lo que buscás es hasta cuándo pueden
          reclamarte una deuda, está en{" "}
          <Link href="/prescripcion-deuda-arca" className="text-emerald-700 hover:underline">
            prescripción de deuda con ARCA
          </Link>
          ; si es el monotributo, en{" "}
          <Link href="/monotributo" className="text-emerald-700 hover:underline">
            categorías del monotributo
          </Link>
          . Consultada el {MULTAS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
