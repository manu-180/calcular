import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraRenuncia } from "@/components/CalculadoraRenuncia";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ARTICULO_SUSTITUTIVO_240,
  ARTICULO_SUSTITUTIVO_241,
  CAMBIOS_ART_240,
  FUENTE_TEXTO_ANTERIOR,
  MESES_ABANDONO_RECIPROCO,
  PREAVISO_DEL_TRABAJADOR_DIAS,
  RENUNCIA_FUENTES,
  RENUNCIA_TEXTOS,
  VIGENCIA_REFORMA,
} from "@/data/renuncia";

export const metadata: Metadata = {
  title: "Liquidación final por renuncia 2026: calculadora",
  description:
    "Calculá tu liquidación final por renuncia: días del mes, aguinaldo proporcional y vacaciones no gozadas. Desde 2026 el telegrama puede ser digital.",
  alternates: { canonical: "/renuncia" },
  openGraph: {
    title: "Liquidación final por renuncia 2026: calculadora",
    description:
      "El art. 240 de la LCT cambió en marzo de 2026: telegrama físico o digital, sin ir en persona. Y el art. 241 fijó dos meses para el abandono recíproco. Con la liquidación final calculada.",
    url: "https://calcular.ar/renuncia",
    images: [
      {
        url: "/og?t=Renuncia%20laboral%202026&s=Qu%C3%A9%20te%20tienen%20que%20pagar%20y%20c%C3%B3mo%20se%20hace%20ahora",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "Si renuncio, ¿me tienen que pagar algo?",
    a: "Sí, y bastante más de lo que se cree. No te toca la indemnización por antigüedad del artículo 245 ni el preaviso del empleador. Pero sí todo lo que ya ganaste: los días trabajados del mes (artículo 74), el aguinaldo proporcional (el artículo 123 dice «cuando se opere la extinción del contrato de trabajo por cualquier causa») y las vacaciones proporcionales no gozadas, que el artículo 156 también manda pagar «cuando por cualquier causa se produjera la extinción». Encima va el aguinaldo sobre esas vacaciones. La calculadora de arriba arma los cuatro renglones.",
  },
  {
    q: "¿Cómo se hace hoy una renuncia válida?",
    a: `Con un telegrama «en formato físico o digital» que mandás vos a tu empleador, o ante la autoridad administrativa del trabajo «en la forma que determine la reglamentación». Es lo que exige el artículo 240 de la LCT, con el texto que le dio el artículo ${ARTICULO_SUSTITUTIVO_240} de la Ley 27.802. El telegrama sigue siendo gratis y ahora se manda «requiriendo la validación de su identidad». Hasta el 5 de marzo de 2026 el texto era otro: pedía un telegrama «colacionado», enviado «personalmente», con «presencia personal del remitente» en el correo.`,
  },
  {
    q: "¿Entonces puedo renunciar por internet?",
    a: "El texto ahora permite el «formato digital» para el telegrama, cosa que antes no decía. Lo que no define es cómo se valida la identidad: solo exige que se valide. Y para la otra vía (hacerla ante la autoridad administrativa del trabajo) el mismo artículo remite a «la forma que determine la reglamentación». Guardá la constancia del envío: es la prueba de que renunciaste y en qué fecha.",
  },
  {
    q: "¿Tengo que preavisar? ¿Qué pasa si no lo hago?",
    a: `Sí. El artículo 231 inciso a) fija tu preaviso en ${PREAVISO_DEL_TRABAJADOR_DIAS} días (es el único inciso que la reforma no tocó). Y el artículo 232 dice que «la parte que omita el preaviso o lo otorgue de modo insuficiente deberá abonar a la otra una indemnización substitutiva equivalente a la remuneración que correspondería al trabajador durante los plazos señalados». O sea: irte de un día para el otro te puede costar ${PREAVISO_DEL_TRABAJADOR_DIAS} días de sueldo, que el empleador puede reclamarte o descontarte de la liquidación final. Casi ninguna nota lo menciona, por eso la calculadora lo muestra como un renglón en negativo.`,
  },
  {
    q: "¿Qué es el «acuerdo de partes» del artículo 241 y por qué conviene mirarlo?",
    a: `Es terminar el contrato de común acuerdo. Se firma por escritura pública o ante la autoridad judicial o administrativa del trabajo, y vos tenés que estar presente (si no, el acto es nulo). Igual que la renuncia, no paga indemnización por antigüedad. La diferencia la puso la misma Ley 27.802: su artículo 99 sumó el inciso i) al artículo 114 de la Ley 24.013, y así el mutuo acuerdo del artículo 241 pasó a ser situación legal de desempleo. Dicho simple: con un acuerdo del 241 podés cobrar la prestación por desempleo; con una renuncia común, no.`,
  },
  {
    q: "¿Qué cambió en el artículo 241?",
    a: `El artículo ${ARTICULO_SUSTITUTIVO_241} de la Ley 27.802 le sumó un párrafo nuevo: «En un contrato de trabajo de prestaciones continuas y permanentes, se considera configurado este supuesto luego de transcurridos dos (2) meses calendarios sin que alguna de las partes manifieste su voluntad de continuidad de éste». Ese «supuesto» es el abandono recíproco: el contrato termina porque ninguna de las dos partes lo siguió. Antes había que probarlo caso por caso; ahora hay un plazo fijo de ${MESES_ABANDONO_RECIPROCO} meses. Si la relación quedó en silencio de los dos lados durante ese tiempo, la ley la da por terminada por voluntad de ambos.`,
  },
  {
    q: "¿Cuántos días de vacaciones me pagan?",
    a: "Depende de cuánto trabajaste en el año. Si llegaste a la mitad de los días hábiles del año (artículo 151), te tocan los días de la escala del artículo 150 según tu antigüedad, en proporción a la parte del año que trabajaste (es lo que dice el artículo 156). Si no llegaste a esa mitad, rige el artículo 153: un día de vacaciones por cada veinte de trabajo efectivo. En los dos casos se pagan según el artículo 155 inciso a), o sea el sueldo dividido veinticinco, no treinta. Cada día de vacaciones vale un 20% más que un día común.",
  },
  {
    q: "¿Me pueden descontar aportes de la liquidación final?",
    a: "De la parte remunerativa, sí: los días del mes y el aguinaldo proporcional pagan el 17% del trabajador (11% jubilación + 3% obra social + 3% PAMI). Las vacaciones no gozadas no: el artículo 156 las llama «indemnización» y por eso no llevan aportes. Ganancias va aparte y depende de todo lo que cobraste en el año, así que la calculadora no la estima.",
  },
];

export default function RenunciaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de liquidación final por renuncia",
        url: "https://calcular.ar/renuncia",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Renuncia laboral 2026: qué te tienen que pagar y cómo se hace ahora",
        descripcion:
          "El art. 240 de la LCT, sustituido por el art. 49 de la Ley 27.802, admite el telegrama digital y ya no exige presencia personal. El art. 241 fijó dos meses para el abandono recíproco. Liquidación final: días del mes, aguinaldo proporcional, vacaciones no gozadas y el preaviso de 15 días del trabajador.",
        url: "/renuncia",
        modificado: RENUNCIA_FUENTES.consultadoEl,
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
          Renuncia: qué te tienen que pagar, y cómo cambió el trámite en {VIGENCIA_REFORMA}
        </h1>
        <p className="text-zinc-600">
          «Telegrama colacionado, en el correo, en persona» es la respuesta que sigue circulando, y
          es lo que rigió hasta el 5 de marzo de 2026. La Ley 27.802 reescribió los dos artículos de
          la salida voluntaria (el 240 y el 241) y casi nadie lo publicó. Acá tenés los dos cambios,
          con el texto viejo al lado, y tu liquidación final calculada renglón por renglón.
        </p>
      </header>

      <RespuestaPrimero actualizado={RENUNCIA_FUENTES.consultadoEl}>
        <p>
          <strong>Renunciar no es irse con las manos vacías.</strong> No cobrás indemnización por
          antigüedad ni preaviso del empleador, pero sí los <strong>días trabajados del mes</strong>{" "}
          (art. 74), el <strong>aguinaldo proporcional</strong> (art. 123) y las{" "}
          <strong>vacaciones proporcionales no gozadas</strong> (art. 156), más el aguinaldo sobre
          esas vacaciones: los dos artículos dicen «por cualquier causa». Del otro lado,{" "}
          <strong>vos también debés {PREAVISO_DEL_TRABAJADOR_DIAS} días de preaviso</strong> (art.
          231 inc. a) y, si no los das, el empleador te los puede descontar (art. 232). El trámite
          también cambió: desde el {VIGENCIA_REFORMA} el telegrama puede ser{" "}
          <strong>«en formato físico o digital»</strong>, sigue siendo gratis y ya{" "}
          <strong>no hace falta ir en persona</strong>. Solo se pide «la validación de su identidad».
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Tu liquidación final</h2>
        <p className="text-sm text-zinc-600">
          Cargá el sueldo, la fecha de ingreso y el último día trabajado. El aguinaldo sale de la
          misma fórmula que usa la calculadora de aguinaldo, y para las vacaciones se elige sola la
          regla que te toca (la escala del art. 150 o un día cada veinte del art. 153).
        </p>
        <CalculadoraRenuncia />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los tres cambios del art. 240 que nadie publica
        </h2>
        <div className="space-y-3">
          {CAMBIOS_ART_240.map((c) => (
            <div
              key={c.titulo}
              className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <p className="text-sm font-semibold text-zinc-900">{c.titulo}</p>
              <p className="mt-2 text-sm text-zinc-600">
                <span className="font-semibold text-rose-700">Hasta el 5/3/2026: </span>
                {c.antes}
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                <span className="font-semibold text-emerald-700">Desde el {VIGENCIA_REFORMA}: </span>
                {c.ahora}
              </p>
            </div>
          ))}
        </div>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">LCT, art. 240 (texto vigente)</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{RENUNCIA_TEXTOS.art240Vigente}»</p>
          <p className="mt-2 text-xs text-zinc-500">{RENUNCIA_TEXTOS.art240Nota}</p>
        </blockquote>
        <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            LCT, art. 240 (el texto que rigió hasta el 5/3/2026)
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{RENUNCIA_TEXTOS.art240Anterior}»</p>
          <p className="mt-2 text-xs text-zinc-500">
            Este artículo no figura en los «Antecedentes Normativos» de la LCT: no tuvo un solo
            cambio desde el texto ordenado de 1976 hasta esta reforma. Cincuenta años del mismo
            trámite, explicado de la misma manera.
          </p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El acuerdo del art. 241, y el plazo nuevo de dos meses
        </h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">LCT, art. 241 (texto vigente)</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{RENUNCIA_TEXTOS.art241Vigente}»</p>
          <p className="mt-2 text-xs text-zinc-500">{RENUNCIA_TEXTOS.art241Nota}</p>
        </blockquote>
        <p className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 text-sm text-zinc-700">
          <span className="font-semibold text-zinc-900">
            La última oración es la que no existía:{" "}
          </span>
          «{RENUNCIA_TEXTOS.art241ParrafoNuevo}» Ese «supuesto» es el{" "}
          <strong>abandono recíproco</strong>: el contrato termina porque ninguna de las dos partes
          lo siguió. Antes había que probarlo caso por caso; ahora tiene un plazo fijo. Dos meses de
          silencio de los dos lados y la ley da el contrato por terminado.
        </p>
        <p className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 text-sm text-zinc-700">
          <span className="font-semibold text-zinc-900">Por qué el 241 no es lo mismo que renunciar: </span>
          ninguno de los dos paga indemnización por antigüedad, pero la misma Ley 27.802, en su art.
          99, sumó el inciso i) al art. 114 de la Ley 24.013:{" "}
          <strong>
            el mutuo acuerdo del art. 241 pasó a ser situación legal de desempleo
          </strong>
          . Con un acuerdo del 241 podés cobrar{" "}
          <Link href="/desempleo" className="font-medium text-emerald-700 hover:underline">
            la prestación por desempleo
          </Link>
          ; con una renuncia común, no.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          De dónde sale cada renglón de la liquidación
        </h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 123: aguinaldo proporcional «por cualquier causa»
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{RENUNCIA_TEXTOS.art123}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 156: vacaciones no gozadas
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{RENUNCIA_TEXTOS.art156}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 155 inc. a): cuánto vale un día de vacaciones
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{RENUNCIA_TEXTOS.art155incA}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Dividir por 25 en vez de por 30 hace que cada día de vacaciones valga un 20% más que
              un día común. Por eso el renglón de vacaciones suele sorprender.
            </p>
          </blockquote>
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

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Si tu salida no fue voluntaria</h2>
        <p className="text-sm text-zinc-600">
          Cuando el que termina el contrato es el empleador, la cuenta cambia entera:{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            la calculadora de indemnización por despido
          </Link>{" "}
          suma antigüedad, preaviso e integración del mes. Si estabas en los primeros meses,{" "}
          <Link href="/periodo-de-prueba" className="font-medium text-emerald-700 hover:underline">
            el período de prueba tiene su propia página
          </Link>{" "}
          (los 15 días de preaviso del empleador ya no existen). Sea cual sea la causa, el
          empleador te debe el certificado del art. 80:{" "}
          <Link
            href="/certificado-de-trabajo"
            className="font-medium text-emerald-700 hover:underline"
          >
            cómo se pide y qué multa hay si no lo entregan
          </Link>
          . Y para saber cuánto tiempo más te cubre la obra social después de irte, mirá{" "}
          <Link
            href="/hasta-cuando-tengo-obra-social"
            className="font-medium text-emerald-700 hover:underline"
          >
            hasta cuándo tenés obra social
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {RENUNCIA_FUENTES.lista.map((f) => (
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
          <li>
            <a
              href={FUENTE_TEXTO_ANTERIOR.urlArchivada}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              Texto de los arts. 240 y 241 antes de la reforma
            </a>
            : {FUENTE_TEXTO_ANTERIOR.detalle}
          </li>
        </ul>
        <p className="pt-2">
          Esta página usa el texto actualizado de la Ley de Contrato de Trabajo publicado en InfoLEG
          y el texto oficial de la Ley 27.802, no un resumen de prensa. Es una guía informativa: no
          reemplaza el consejo de un profesional ni una liquidación. Consultada el{" "}
          {RENUNCIA_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
