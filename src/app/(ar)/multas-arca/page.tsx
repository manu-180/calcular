import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraMultasArca } from "@/components/CalculadoraMultasArca";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, datasetSchema, ORGANIZACION } from "@/lib/schema";
import { openGraphDe } from "@/lib/seo";
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
  title: "Multas de ARCA 2026: montos desde la Ley 27.799",
  description: `La multa por no presentar una DDJJ en término pasó de $200 a ${formatARS(DDJJ_PERSONA, 0)} y baja a la mitad si pagás y presentás. Calculá cada multa con el monto vigente.`,
  alternates: { canonical: "/multas-arca" },
  openGraph: {
    ...openGraphDe({
      ruta: "/multas-arca",
      titulo: "Multas de ARCA · Ley 11.683",
      bajada: `No presentar una DDJJ: ${formatARS(DDJJ_PERSONA, 0)}`,
    }),
    title: "Multas de ARCA: los montos que cambiaron en enero de 2026",
    description: `No presentar una DDJJ ya no cuesta $200: cuesta ${formatARS(DDJJ_PERSONA, 0)}. Toda la escala de la Ley 11.683, con lo que valía antes al lado.`,
  },
};

const faqs = [
  {
    q: "¿Cuánto es la multa por no presentar una declaración jurada?",
    a: `${formatARS(DDJJ_PERSONA, 0)} si sos una persona humana y ${formatARS(DDJJ_SOCIEDAD, 0)} si es una sociedad, asociación o entidad del país. Lo dice el artículo 38 de la Ley 11.683, con los montos que le puso el artículo 15 de la Ley 27.799, vigente desde el 2 de enero de 2026. Antes eran $200 y $400, que es lo que sigue diciendo casi toda la web. No es un detalle: es más de mil veces el monto.`,
  },
  {
    q: "¿Se puede pagar menos?",
    a: `Sí, y lo dice la propia ley. Si pagás la multa y presentás la declaración jurada que faltaba, el monto baja «de pleno derecho a la mitad» (${formatARS(DDJJ_REDUCIDA, 0)} para una persona humana), y la infracción no queda como antecedente. Lo que casi nadie cuenta es que hay dos momentos para hacerlo, no uno: dentro de los 15 días de la notificación, o desde el vencimiento general de la obligación hasta 15 días después de esa notificación.`,
  },
  {
    q: "¿Qué pasa si presento la declaración jurada antes de que me notifiquen algo?",
    a: `El primer párrafo del artículo 49 dice que si te ponés al día presentando la declaración jurada (o su rectificativa) antes de que te notifiquen una orden de intervención, «quedará exento de responsabilidad infraccional». La condición es no ser reincidente en infracciones materiales. Hay que leerlo con cuidado: ese párrafo no nombra artículos, pero los párrafos siguientes sí nombran los artículos 45, 46 y 48. Publicamos el texto tal cual. No decimos que cubra también las infracciones formales, porque la norma no lo dice.`,
  },
  {
    q: "Me abrieron un sumario por el artículo 39. ¿Conviene reconocer la infracción?",
    a: `Es la decisión más cara de esta página, y la ley la responde con un número. Según el artículo 50, si en la primera defensa del sumario (o en la audiencia del artículo 41) el titular o representante legal reconoce la infracción, la sanción baja al mínimo legal, por única vez. En el caso general del artículo 39, eso es pasar de un techo de ${formatARS(FORMAL.rango!.maximo, 0)} a ${formatARS(FORMAL.rango!.minimo, 0)}. En los cuatro casos agravados, de ${formatARS(AGRAVADO.rango!.maximo, 0)} al mismo mínimo.`,
  },
  {
    q: "¿Me pueden clausurar el local por no dar una factura chica?",
    a: `Desde enero de 2026, no por cualquier monto. El artículo 40 exige que la operación supere ${formatARS(CLAUSURA.pisoValorOperacion, 0)}. Antes ese piso era de ${formatARS(CLAUSURA.pisoAnterior, 0)}, o sea que en la práctica no filtraba nada. Por debajo del piso, no dar la factura puede seguir siendo una infracción formal, pero no habilita la clausura de ${CLAUSURA.diasMinimo} a ${CLAUSURA.diasMaximo} días de ese artículo.`,
  },
  {
    q: "¿Las multas se suman entre sí?",
    a: "Sí, y la ley lo dice con todas las letras en dos lugares. El artículo 39 aclara que sus multas «son acumulables con las establecidas en el artículo 38», y el artículo que sigue al 39 dice lo mismo del que sigue al 38. Además, si ya te condenaron por no cumplir un requerimiento, cada vez que lo repitas sobre el mismo deber formal es una multa nueva, aunque las anteriores no estén firmes ni se hayan discutido.",
  },
  {
    q: "¿Cuánto es la multa por tener empleados sin registrar?",
    a: `De ${formatARS(NO_REGISTRADO.rango!.minimo, 0)} a ${formatARS(NO_REGISTRADO.rango!.maximo, 0)}, «sin perjuicio de las demás sanciones que pudieran corresponder». Es decir, se suma a las multas laborales y previsionales, no las reemplaza. Antes de la Ley 27.799 iba de $3.000 a $100.000. Y hay un agravante: si el local tiene al menos 10 empleados y la mitad o más de los relevados no están registrados, el inciso g) del artículo 40 habilita además la clausura.`,
  },
  {
    q: "¿Todos los montos se multiplicaron por mil?",
    a: `No, y decirlo así es el error más común. Según el artículo, los montos se multiplicaron entre ${FACTORES.minimo} y ${FACTORES.maximo} veces. La multa del artículo 38 se multiplicó por 1.100, la del primer párrafo del 39 por 1.000, el techo agravado del 39 por unas 778, el piso para la clausura por 2.000 y la multa por empleo no registrado por unas 67. Por eso mostramos el monto anterior al lado de cada uno, en vez de un porcentaje único.`,
  },
  {
    q: "¿Y si el error fue de buena fe?",
    a: "La ley tiene una figura para eso: el error excusable, en un artículo sin número que sigue al 50. Existe cuando la norma, «por su complejidad, oscuridad o novedad», se podía entender de varias formas y no se podía saber qué quería decir, aun siendo cuidadoso. Para evaluarlo se mira la norma que no se cumplió, la situación del contribuyente y si ya había pasado antes. No es automático: se plantea y se prueba en el sumario.",
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
          "Montos vigentes y anteriores de las multas de los artículos 38, 39 y 40 de la Ley 11.683 (t.o. 1998), con el artículo de la Ley 27.799 que cambió cada uno, las reducciones de los artículos 38 y 50 y el piso de valor que habilita la clausura.",
        url: "/multas-arca",
        modificado: MULTAS_FUENTES.consultadoEl,
        fuenteNombre: MULTAS_FUENTES.principal.nombre,
        fuenteUrl: MULTAS_FUENTES.principal.url,
      }),
      articleSchema({
        titulo: "Multas de ARCA 2026: montos desde la Ley 27.799",
        descripcion:
          "La Ley 27.799 reescribió los montos de las multas formales de la Ley 11.683, congelados desde 2003. Cuánto es cada multa hoy, cuánto era antes, cuándo baja a la mitad, cuándo baja al mínimo legal y desde qué monto se habilita la clausura.",
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
          Las multas por deberes formales de la Ley 11.683 estaban congeladas desde 2003 y eran casi
          simbólicas. El <strong>{VIGENCIA_MULTAS.reformaBO}</strong> la {VIGENCIA_MULTAS.reforma}{" "}
          las reescribió una por una: una multa de $200 pasó a {formatARS(DDJJ_PERSONA, 0)}. Acá
          está la escala entera, con el monto anterior al lado para que veas el salto.
        </p>
      </header>

      <RespuestaPrimero actualizado={MULTAS_FUENTES.consultadoEl}>
        <p>
          <strong>
            No presentar una declaración jurada a tiempo cuesta {formatARS(DDJJ_PERSONA, 0)} si sos
            una persona humana y {formatARS(DDJJ_SOCIEDAD, 0)} si es una sociedad
          </strong>{" "}
          (art. 38). Se aplica sin aviso previo. Pero baja{" "}
          <strong>sola a la mitad</strong> ({formatARS(DDJJ_REDUCIDA, 0)}) si la pagás y presentás
          la declaración dentro de los 15 días, y en ese caso{" "}
          <strong>no queda como antecedente</strong>. No cumplir cualquier otro deber formal cuesta
          de {formatARS(FORMAL.rango!.minimo, 0)} a {formatARS(FORMAL.rango!.maximo, 0)} (art. 39),
          con un techo de {formatARS(AGRAVADO.rango!.maximo, 0)} en cuatro casos agravados. Si{" "}
          <strong>reconocés la infracción, baja al mínimo legal</strong> (art. 50). Y la clausura del
          art. 40 solo se habilita si la operación supera{" "}
          {formatARS(CLAUSURA.pisoValorOperacion, 0)}.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Tu caso</h2>
        <p className="text-sm text-zinc-600">
          Elegí la infracción y mirá el monto de hoy, el de antes de la reforma y cuánto baja con la
          reducción que te da la ley para ese artículo.
        </p>
        <CalculadoraMultasArca />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La escala completa, y lo que valía hasta el {VIGENCIA_MULTAS.reformaBO}
        </h2>
        <p className="text-zinc-600">
          Esta tabla es el corazón de la página. La columna de la derecha no es solo historia: es lo
          que todavía dice cualquier nota escrita antes de enero de 2026. Y es entre{" "}
          {FACTORES.minimo} y {FACTORES.maximo} veces menos que lo que dice la ley hoy. El
          multiplicador no lo escribimos a mano: sale de dividir un monto por el otro.
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
                    Monto mínimo de la operación para que haya clausura
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
          Los montos de la columna «Antes» no son un cálculo nuestro. Son los que cita el propio
          texto actualizado de la Ley 11.683 al pie de cada artículo, junto con el artículo de la{" "}
          {VIGENCIA_MULTAS.reforma} que los reemplazó.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Las dos salidas que te da la ley</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-900">
              La mitad, sin pedirla (art. 38)
            </p>
            <p className="mt-1 text-sm text-zinc-700">
              Si pagás la multa y presentás la declaración jurada que faltaba, baja a{" "}
              {formatARS(DDJJ_REDUCIDA, 0)} y no queda antecedente. No hay que pedirlo ni discutirlo:
              la rebaja es automática si cumplís las dos cosas dentro de alguno de los dos plazos de
              15 días.
            </p>
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-900">El mínimo legal (art. 50)</p>
            <p className="mt-1 text-sm text-zinc-700">
              Si reconocés la infracción en la primera defensa del sumario del art. 39, la multa baja
              al mínimo legal, por única vez. En los casos agravados eso es pasar de{" "}
              {formatARS(AGRAVADO.rango!.maximo, 0)} a {formatARS(AGRAVADO.rango!.minimo, 0)}.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Las siete conductas que habilitan la clausura
        </h2>
        <p className="text-zinc-600">
          Ninguna alcanza sola para clausurar. El artículo 40 exige además que la operación supere{" "}
          {formatARS(CLAUSURA.pisoValorOperacion, 0)}. La clausura va de {CLAUSURA.diasMinimo} a{" "}
          {CLAUSURA.diasMaximo} días, y el mínimo y el máximo se duplican si hubo otra infracción
          del mismo artículo en los {CLAUSURA.aniosReincidencia} años anteriores.
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
              Ley 11.683, art. 38: la multa automática
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.art38Primero}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Lo que la vuelve automática es <strong>«sin necesidad de requerimiento
              previo»</strong>: ARCA no tiene que pedirte nada antes de aplicarla.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683, art. 38: la rebaja a la mitad, con sus dos plazos
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.art38Reduccion}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              La segunda oración casi nunca se cita. Dice que pasa lo mismo si cumplís las dos cosas{" "}
              <strong>desde el vencimiento general</strong> de la obligación, o sea antes de que te
              llegue cualquier notificación.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-sky-300 bg-sky-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683, art. 39: la multa por deberes formales
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.art39Primero}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-amber-300 bg-amber-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683, art. 39: se suman, no se elige una
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.art39Acumulable}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-300 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683, art. 40: el monto mínimo que nadie publica
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.art40Acapite}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Dice <strong>«exceda»</strong>: una operación de exactamente{" "}
              {formatARS(CLAUSURA.pisoValorOperacion, 0)} no pasa el piso.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-rose-300 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683, art. 40: empleo no registrado
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.art40NoRegistrado}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683, art. 40: el doble si se repite dentro de dos años
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.art40Reincidencia}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683, art. 50: reconocer la infracción baja al mínimo
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.art50}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683, art. 49: ponerse al día antes de la orden de intervención
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.art49Primero}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Lo citamos con su límite a la vista. Este párrafo habla de «responsabilidad
              infraccional» sin nombrar artículos, y los párrafos que siguen sí nombran los arts. 45,
              46 y 48. No decimos que alcance a las infracciones formales, porque el texto no lo dice.
            </p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Ley 11.683: cuándo hay reincidencia
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.reincidencia}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">Ley 11.683: el error excusable</p>
            <p className="mt-1 text-sm text-zinc-700">«{MULTAS_TEXTOS.errorExcusable}»</p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El agravante para los contribuyentes grandes
        </h2>
        <p className="text-zinc-600">
          Hay una parte de la escala que no le toca a casi nadie, pero conviene conocerla porque es
          la que explica los titulares. Si facturás{" "}
          {formatARS(UMBRAL_GRANDES_CONTRIBUYENTES.ingresosBrutosAnuales, 0)} o más por año y no
          contestás el <strong>tercer</strong> requerimiento de ARCA, la multa es de{" "}
          {UMBRAL_GRANDES_CONTRIBUYENTES.vecesMinimo} a {UMBRAL_GRANDES_CONTRIBUYENTES.vecesMaximo}{" "}
          veces el máximo del artículo, y se suma a las demás. La reforma también movió ese umbral:
          era de {formatARS(UMBRAL_GRANDES_CONTRIBUYENTES.anterior, 0)} y hoy es mil veces más alto.
          Así que ahora alcanza a muchas menos empresas que antes (
          {UMBRAL_GRANDES_CONTRIBUYENTES.sustituidoPor}).
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
              </a>
              : {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página es informativa y reproduce normas publicadas en el Boletín Oficial e InfoLEG.
          Quien aplica y gradúa las multas es ARCA. Si lo que buscás es hasta cuándo te pueden
          reclamar una deuda, está en{" "}
          <Link href="/prescripcion-deuda-arca" className="text-emerald-700 hover:underline">
            prescripción de deuda con ARCA
          </Link>
          . Si es el monotributo, en{" "}
          <Link href="/monotributo" className="text-emerald-700 hover:underline">
            categorías del monotributo
          </Link>
          . Consultada el {MULTAS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
