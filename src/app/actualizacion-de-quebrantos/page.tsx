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
  title: "Actualización de quebrantos por IPC: qué cambió con la Ley 27.802",
  description:
    "Los quebrantos de ejercicios iniciados desde el 1/1/2025 se actualizan por IPC del INDEC. Antes la ley decía IPIM, pero remitía a una tabla congelada en 1992: el coeficiente era 1. Calculá tu quebranto actualizado con la serie oficial.",
  alternates: { canonical: "/actualizacion-de-quebrantos" },
  openGraph: {
    title: "El art. 190 no cambió un índice: destrabó una actualización que valía cero",
    description:
      "El texto viejo mandaba actualizar los quebrantos por IPIM, y el art. 93 remitía a tablas topeadas en marzo de 1992. La Ley 27.802 excluyó esa remisión y puso IPC — sólo para ejercicios iniciados desde el 1/1/2025.",
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
    a: `Desde la Ley 27.802, sí — pero sólo los generados en ejercicios fiscales que se INICIEN a partir del 1° de enero de 2025, y por el IPC nivel general del INDEC. Los de ejercicios iniciados antes de esa fecha se siguen computando por su valor nominal.`,
  },
  {
    q: "Si la ley ya decía «se actualizarán por IPIM», ¿qué cambió de verdad?",
    a: `Que ahora la actualización se hace. El texto anterior mandaba actualizar, pero el primer párrafo del art. 93 remitía al art. 39 de la Ley 24.073, que obliga a las tablas de actualización a tomar «en todos los casos» como límite máximo las variaciones operadas hasta ${CONGELAMIENTO_24073}. Coeficiente 1: la actualización existía en la letra y no existía en la cuenta. El art. 190 agregó siete palabras —«sin que resulte de aplicación lo dispuesto en el primer párrafo del artículo 93»— y ahí recién empezó a valer.`,
  },
  {
    q: "Mi sociedad cierra en junio. ¿El quebranto del ejercicio que cerró el 30/6/2025 se actualiza?",
    a: "No. La ley mira el INICIO del ejercicio, no el cierre: ese ejercicio se inició el 1/7/2024. El primer quebranto actualizable de un cierre de junio es el del ejercicio 1/7/2025–30/6/2026. Es la trampa del artículo para todo el que no cierre en diciembre, y la razón por la que esta calculadora deriva el inicio a partir del mes de cierre.",
  },
  {
    q: "¿Entre qué meses se calcula el coeficiente?",
    a: "Entre «el mes de cierre del ejercicio fiscal en que se originaron y el mes de cierre del ejercicio fiscal que se liquida». No es entre fechas de la pérdida ni entre años calendario: son los dos meses de cierre, y el índice es el IPC nivel general que publica el INDEC.",
  },
  {
    q: "¿Cuánto dura un quebranto?",
    a: `Cinco años. El noveno párrafo del art. 25 dice que, transcurridos ${ANIOS_DE_VIDA} años después de aquél en que se produjo la pérdida, «no podrá hacerse deducción alguna del quebranto que aún reste». La actualización no extiende el plazo: llega actualizado al último ejercicio, y ahí se pierde lo que sobre.`,
  },
  {
    q: "¿Qué es un quebranto «de naturaleza específica»?",
    a: "Uno que no se puede compensar contra cualquier ganancia, sino sólo contra las de su misma fuente y tipo de operación: rentas financieras, enajenación de acciones y participaciones, derivados que no sean de cobertura, actividades en la plataforma continental y los de fuente extranjera. Se actualizan igual que los generales; lo que cambia es contra qué se pueden usar.",
  },
  {
    q: "¿Y el ajuste por inflación impositivo? ¿No es lo mismo?",
    a: "No. El ajuste por inflación del Título VI corrige el resultado del ejercicio; esto corrige un saldo que viene de ejercicios anteriores. Son dos mecanismos distintos, con artículos distintos, y esta calculadora sólo hace el segundo.",
  },
  {
    q: "¿Desde cuándo rige el art. 190?",
    a: `La Ley 27.802 se publicó en el Boletín Oficial el ${BO_LEY_27802} y este artículo rige desde su publicación. Lo que tiene fecha propia es el universo alcanzado: los quebrantos de ejercicios iniciados desde el 1/1/2025.`,
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
          Leído solo, el art. 190 de la Ley 27.802 parece un cambio de índice: donde decía{" "}
          <strong>IPIM</strong> ahora dice <strong>IPC</strong>. Puesto al lado del texto anterior,
          aparece lo otro: la actualización de los quebrantos{" "}
          <strong>venía valiendo cero desde 1992</strong>, y lo que la destrabó no fue el índice
          nuevo sino una frase de descarte al final del párrafo.
        </p>
      </header>

      <RespuestaPrimero actualizado={QUEBRANTOS_FUENTES.consultadoEl}>
        <p>
          Un quebranto se actualiza por <strong>IPC nivel general del INDEC</strong>, entre el mes de
          cierre del ejercicio en que se originó y el del ejercicio que se liquida,{" "}
          <strong>
            sólo si su ejercicio de origen se inició el 1° de enero de 2025 o después
          </strong>
          . La condición se mide sobre el <strong>inicio</strong> del ejercicio, no sobre el cierre:
          un cierre de junio de 2025 corresponde a un ejercicio iniciado en julio de 2024 y{" "}
          <strong>no está alcanzado</strong>. Y el plazo no se movió: sigue siendo de{" "}
          {ANIOS_DE_VIDA} años.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tu quebranto</h2>
        <p className="text-sm text-zinc-600">
          Con la <strong>serie oficial del IPC del INDEC</strong> que ya vive en este sitio y se
          regenera todos los meses. La calculadora también resuelve las dos condiciones que deciden
          el caso: si el ejercicio de origen entra por la fecha de inicio, y si el quebranto todavía
          está dentro de los cinco años.
        </p>
        <CalculadoraQuebrantos />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">El párrafo, antes y después</h2>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Antes — art. 25, undécimo párrafo (texto hasta el 6/3/2026)
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">
            «{QUEBRANTOS_TEXTOS.parrafoAnterior}»
          </p>
        </blockquote>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Ahora — mismo párrafo, texto del art. 190 de la Ley 27.802
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
            Ley de Ganancias, art. 93 — primer párrafo
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
          Las dos piezas encajan en una sola conclusión: el art. 25 mandaba actualizar, el art. 93
          decía que las actualizaciones «previstas en esta ley» se practican como manda el art. 39 de
          la Ley 24.073, y ese artículo topea las tablas en {CONGELAMIENTO_24073}. El{" "}
          <strong>segundo</strong> párrafo del art. 93 salva de ese congelamiento a una lista corta
          de artículos —62 a 66, 71, 78, 87, 88, 98 y 99, para adquisiciones desde 2018—, y{" "}
          <strong>el art. 25 no está en esa lista</strong>. Por eso un quebranto llegaba a su quinto
          año licuado, y por eso la reforma tuvo que escribir la excepción a mano.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La fecha de corte se mide sobre el inicio del ejercicio
        </h2>
        <p className="text-sm text-zinc-600">
          El párrafo dice «los quebrantos generados en los ejercicios fiscales que{" "}
          <strong>se inicien</strong> a partir del 1° de enero de 2025». Para una persona humana el
          ejercicio es el año calendario y la distinción no se nota. Para una sociedad con cierre
          desplazado, decide el caso:
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
                ["31/12/2024", "1/1/2024 – 31/12/2024", false, "se inició en 2024"],
                ["30/6/2025", "1/7/2024 – 30/6/2025", false, "cierra en 2025, pero se inició en 2024"],
                ["31/12/2025", "1/1/2025 – 31/12/2025", true, "primer ejercicio alcanzado del cierre de diciembre"],
                ["30/6/2026", "1/7/2025 – 30/6/2026", true, "primer ejercicio alcanzado del cierre de junio"],
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
            Art. 25, décimo párrafo — los quebrantos específicos
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{QUEBRANTOS_TEXTOS.especificos}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Un quebranto específico se actualiza igual que uno general; lo que cambia es contra qué se
          puede computar el resultado. Los que el art. 25 declara específicos son:
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
          Los otros artículos de Ganancias que tocó la misma ley:{" "}
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
              </a>{" "}
              — {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página cita los textos oficiales publicados en InfoLEG — no un resumen de prensa. Es
          informativa y orientativa: no reemplaza el asesoramiento de un profesional ni una
          liquidación impositiva. Consultada el {QUEBRANTOS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
