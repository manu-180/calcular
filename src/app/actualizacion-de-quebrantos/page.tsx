import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraQuebrantos } from "@/components/CalculadoraQuebrantos";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ANIOS_DE_VIDA,
  BO_LEY_27802,
  CONGELAMIENTO_24073,
  QUEBRANTOS_ESPECIFICOS,
  QUEBRANTOS_FUENTES,
  QUEBRANTOS_TEXTOS,
} from "@/data/quebrantos";

export const metadata: Metadata = {
  title: "Actualización de quebrantos por IPC (Ley 27.802)",
  description:
    "Los quebrantos de ejercicios iniciados desde el 1/1/2025 se actualizan por IPC del INDEC. Calculá tu quebranto actualizado con la serie oficial.",
  alternates: { canonical: "/actualizacion-de-quebrantos" },
  openGraph: {
    title: "El art. 190 no cambió un índice: destrabó una actualización que valía cero",
    description:
      "El texto viejo mandaba actualizar los quebrantos por IPIM, y el art. 93 remitía a tablas topeadas en marzo de 1992. La Ley 27.802 sacó esa remisión y puso IPC, solo para ejercicios iniciados desde el 1/1/2025.",
    url: "https://calcular.ar/actualizacion-de-quebrantos",
    images: [
      {
        url: "/og?t=Actualizacion%20de%20quebrantos&s=Por%20IPC%20desde%20los%20ejercicios%20iniciados%20en%202025",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Los quebrantos impositivos se actualizan?",
    a: `Desde la Ley 27.802, sí. Pero solo los de ejercicios fiscales que se INICIEN desde el 1° de enero de 2025, y por el IPC nivel general del INDEC. Los de ejercicios que empezaron antes se siguen tomando por su valor nominal.`,
  },
  {
    q: "Si la ley ya decía «se actualizarán por IPIM», ¿qué cambió de verdad?",
    a: `Que ahora la actualización se hace. El texto anterior mandaba actualizar, pero el primer párrafo del art. 93 remitía al art. 39 de la Ley 24.073. Ese artículo obliga a que las tablas de actualización tomen «en todos los casos» como tope las variaciones hasta ${CONGELAMIENTO_24073}. Resultado: coeficiente 1. La actualización estaba en la ley, pero en la cuenta no existía. El art. 190 agregó una frase («sin que resulte de aplicación lo dispuesto en el primer párrafo del artículo 93») y recién ahí empezó a valer.`,
  },
  {
    q: "Mi sociedad cierra en junio. ¿El quebranto del ejercicio que cerró el 30/6/2025 se actualiza?",
    a: "No. La ley mira cuándo EMPIEZA el ejercicio, no cuándo cierra, y ese ejercicio empezó el 1/7/2024. El primer quebranto que se actualiza con cierre en junio es el del ejercicio del 1/7/2025 al 30/6/2026. Es la trampa del artículo para quien no cierra en diciembre. Por eso la calculadora saca la fecha de inicio a partir del mes de cierre.",
  },
  {
    q: "¿Entre qué meses se calcula el coeficiente?",
    a: "Entre «el mes de cierre del ejercicio fiscal en que se originaron y el mes de cierre del ejercicio fiscal que se liquida». No se cuenta desde la fecha de la pérdida ni por años calendario: son los dos meses de cierre, con el IPC nivel general del INDEC.",
  },
  {
    q: "¿Cuánto dura un quebranto?",
    a: `Cinco años. El noveno párrafo del art. 25 dice que, pasados ${ANIOS_DE_VIDA} años desde el año de la pérdida, «no podrá hacerse deducción alguna del quebranto que aún reste». La actualización no alarga el plazo: el quebranto llega actualizado al último ejercicio, y lo que sobre ahí se pierde.`,
  },
  {
    q: "¿Qué es un quebranto «de naturaleza específica»?",
    a: "Es uno que no se puede compensar contra cualquier ganancia, solo contra las de su misma fuente y tipo de operación: rentas financieras, venta de acciones y participaciones, derivados que no sean de cobertura, actividades en la plataforma continental y los de fuente extranjera. Se actualizan igual que los generales. Lo que cambia es contra qué se pueden usar.",
  },
  {
    q: "¿Y el ajuste por inflación impositivo? ¿No es lo mismo?",
    a: "No. El ajuste por inflación del Título VI corrige el resultado del ejercicio. Esto corrige un saldo que viene de ejercicios anteriores. Son dos mecanismos distintos, con artículos distintos, y esta calculadora solo hace el segundo.",
  },
  {
    q: "¿Desde cuándo rige el art. 190?",
    a: `La Ley 27.802 se publicó en el Boletín Oficial el ${BO_LEY_27802} y este artículo rige desde ese día. Lo que tiene fecha propia es a quién alcanza: los quebrantos de ejercicios iniciados desde el 1/1/2025.`,
  },
];

export default function ActualizacionDeQuebrantosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de actualización de quebrantos impositivos por IPC",
        url: "https://calcular.ar/actualizacion-de-quebrantos",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo:
          "Actualización de quebrantos impositivos: el art. 25 de Ganancias después del art. 190 de la Ley 27.802",
        descripcion:
          "El cambio de IPIM a IPC, la fecha de corte del 1/1/2025 medida sobre el inicio del ejercicio, y la exclusión del primer párrafo del art. 93 que es lo que destrabó la actualización.",
        url: "/actualizacion-de-quebrantos",
        modificado: QUEBRANTOS_FUENTES.consultadoEl,
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
          Actualización de quebrantos: qué cambió, y por qué antes no cambiaba nada
        </h1>
        <p className="text-zinc-600">
          Si lo leés solo, el art. 190 de la Ley 27.802 parece un cambio de índice: donde decía{" "}
          <strong>IPIM</strong> ahora dice <strong>IPC</strong>. Si lo ponés al lado del texto
          anterior, aparece lo importante: la actualización de los quebrantos{" "}
          <strong>valía cero desde 1992</strong>. Y lo que la destrabó no fue el índice nuevo, sino
          una frase al final del párrafo.
        </p>
      </header>

      <RespuestaPrimero actualizado={QUEBRANTOS_FUENTES.consultadoEl}>
        <p>
          Un quebranto se actualiza por <strong>IPC nivel general del INDEC</strong>, entre el mes de
          cierre del ejercicio en que se originó y el del ejercicio que se liquida,{" "}
          <strong>
            solo si su ejercicio de origen empezó el 1° de enero de 2025 o después
          </strong>
          . Cuenta el <strong>inicio</strong> del ejercicio, no el cierre: un cierre de junio de
          2025 corresponde a un ejercicio que empezó en julio de 2024, y{" "}
          <strong>no entra</strong>. Y el plazo no cambió: sigue siendo de {ANIOS_DE_VIDA} años.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tu quebranto</h2>
        <p className="text-sm text-zinc-600">
          Usa la <strong>serie oficial del IPC del INDEC</strong>, que en este sitio se actualiza
          todos los meses (la serie completa está en la{" "}
          <Link href="/inflacion" className="font-medium text-emerald-700 hover:underline">
            calculadora de inflación
          </Link>
          ). También resuelve las dos condiciones que deciden el caso: si el ejercicio de origen
          entra por su fecha de inicio, y si el quebranto sigue dentro de los cinco años.
        </p>
        <CalculadoraQuebrantos />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">El párrafo, antes y después</h2>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Antes: art. 25, undécimo párrafo (texto hasta el 6/3/2026)
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">
            «{QUEBRANTOS_TEXTOS.parrafoAnterior}»
          </p>
        </blockquote>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Ahora: mismo párrafo, texto del art. 190 de la Ley 27.802
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{QUEBRANTOS_TEXTOS.parrafoVigente}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Tres cambios, y el que más plata mueve es el último:{" "}
          <strong>el índice</strong> (IPIM → IPC), <strong>una fecha de corte que antes no
          existía</strong> (el párrafo viejo no distinguía ejercicios) y{" "}
          <strong>la exclusión del primer párrafo del art. 93</strong>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Por qué la actualización anterior daba coeficiente 1
        </h2>
        <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Ley de Ganancias, art. 93, primer párrafo
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">
            «{QUEBRANTOS_TEXTOS.art93PrimerParrafo}»
          </p>
        </blockquote>
        <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Ley 24.073, art. 39</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{QUEBRANTOS_TEXTOS.art39Ley24073}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Juntas, las dos piezas dicen esto: el art. 25 mandaba actualizar, el art. 93 decía que las
          actualizaciones «previstas en esta ley» se hacen como manda el art. 39 de la Ley 24.073, y
          ese artículo pone tope a las tablas en {CONGELAMIENTO_24073}. El <strong>segundo</strong>{" "}
          párrafo del art. 93 salva de ese congelamiento a una lista corta de artículos (62 a 66,
          71, 78, 87, 88, 98 y 99, para compras desde 2018), y{" "}
          <strong>el art. 25 no está en esa lista</strong>. Por eso un quebranto llegaba a su quinto
          año comido por la inflación, y por eso la reforma tuvo que escribir la excepción a mano.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La fecha de corte se mide sobre el inicio del ejercicio
        </h2>
        <p className="text-sm text-zinc-600">
          El párrafo dice «los quebrantos generados en los ejercicios fiscales que{" "}
          <strong>se inicien</strong> a partir del 1° de enero de 2025». Para una persona humana el
          ejercicio es el año calendario y no hay diferencia. Para una sociedad que no cierra en
          diciembre, eso decide el caso:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[34rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left align-bottom">
                <th className="py-2 pr-3 font-medium text-zinc-600">Cierre</th>
                <th className="py-2 pr-3 font-medium text-zinc-600">Ejercicio</th>
                <th className="py-2 pl-3 font-medium text-zinc-600">¿Se actualiza?</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["31/12/2024", "1/1/2024 al 31/12/2024", false, "se inició en 2024"],
                ["30/6/2025", "1/7/2024 al 30/6/2025", false, "cierra en 2025, pero se inició en 2024"],
                ["31/12/2025", "1/1/2025 al 31/12/2025", true, "primer ejercicio alcanzado del cierre de diciembre"],
                ["30/6/2026", "1/7/2025 al 30/6/2026", true, "primer ejercicio alcanzado del cierre de junio"],
              ].map(([cierre, ejercicio, ok, nota]) => (
                <tr key={cierre as string} className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3 font-medium text-zinc-800">{cierre}</td>
                  <td className="py-2 pr-3 text-zinc-700">{ejercicio}</td>
                  <td className="py-2 pl-3">
                    <span
                      className={`font-semibold ${ok ? "text-emerald-700" : "text-rose-700"}`}
                    >
                      {ok ? "Sí" : "No"}
                    </span>
                    <span className="block text-xs text-zinc-500">{nota}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los cinco años no se movieron, y los específicos tampoco
        </h2>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Art. 25, noveno párrafo</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{QUEBRANTOS_TEXTOS.cincoAnios}»</p>
        </blockquote>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Art. 25, décimo párrafo: los quebrantos específicos
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{QUEBRANTOS_TEXTOS.especificos}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Un quebranto específico se actualiza igual que uno general. Lo que cambia es contra qué
          ganancias se puede usar. Los que el art. 25 declara específicos son:
        </p>
        <ul className="space-y-2">
          {QUEBRANTOS_ESPECIFICOS.map((q) => (
            <li key={q.titulo} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <p className="font-semibold text-zinc-800">{q.titulo}</p>
              <p className="mt-1 text-sm text-zinc-600">{q.detalle}</p>
            </li>
          ))}
        </ul>
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
        <p className="text-sm text-zinc-500">
          Si tenés una sociedad, el impuesto del ejercicio lo calculás en{" "}
          <Link href="/ganancias-sociedades" className="font-medium text-emerald-700 hover:underline">
            Ganancias de sociedades
          </Link>
          . Otros artículos de Ganancias que cambió la misma ley:{" "}
          <Link href="/venta-de-inmuebles" className="font-medium text-emerald-700 hover:underline">
            la exención de la venta de inmuebles
          </Link>
          ,{" "}
          <Link href="/deduccion-alquiler" className="font-medium text-emerald-700 hover:underline">
            la del alquiler de casa habitación
          </Link>{" "}
          y{" "}
          <Link href="/plazo-fijo" className="font-medium text-emerald-700 hover:underline">
            la de los plazos fijos
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {QUEBRANTOS_FUENTES.lista.map((f) => (
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
          Esta página cita los textos oficiales publicados en InfoLEG, no un resumen de prensa. Es
          informativa: no reemplaza el consejo de un profesional ni una liquidación impositiva.
          Consultada el {QUEBRANTOS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
