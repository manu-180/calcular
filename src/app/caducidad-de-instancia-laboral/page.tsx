import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraCaducidadInstancia } from "@/components/CalculadoraCaducidadInstancia";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  APLICACION,
  CAMBIOS_TITULO_III,
  FUENTES,
  INSTANCIAS,
  PUBLICACION,
  TEXTOS,
} from "@/data/caducidad-instancia";

export const metadata: Metadata = {
  title: "Caducidad de instancia en el juicio laboral: 6, 3 y 1 mes",
  description: `Hasta el 5 de marzo de 2026 el proceso laboral se impulsaba de oficio y un expediente parado no se caía. Desde el ${PUBLICACION} lo impulsan las partes y caduca sin intimación previa. Calculá la fecha según la instancia.`,
  alternates: { canonical: "/caducidad-de-instancia-laboral" },
  openGraph: {
    title: "El juicio laboral ya no se impulsa de oficio: ahora caduca",
    description:
      "El art. 82 de la Ley 27.802 dio vuelta el art. 46 de la Ley 18.345 — hasta el epígrafe cambió. Seis meses en primera instancia, tres en segunda y uno en el incidente de caducidad, sin intimación previa y aplicable a los procesos ya en trámite.",
    url: "https://calcular.ar/caducidad-de-instancia-laboral",
    images: [
      {
        url: "/og?t=Caducidad%20de%20instancia&s=El%20juicio%20laboral%20ya%20no%20se%20impulsa%20de%20oficio",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Existe la caducidad de instancia en el fuero laboral?",
    a: `Sí, desde el ${PUBLICACION}. Antes no: el artículo 46 de la Ley 18.345 se llamaba «Impulso de oficio» y decía que «el procedimiento será impulsado de oficio por los jueces», así que un expediente parado no se caía por el paso del tiempo. El artículo 82 de la Ley 27.802 lo sustituyó entero — hasta el epígrafe, que ahora es «Impulso del proceso» — y estableció que «el procedimiento será impulsado por las partes».`,
  },
  {
    q: "¿Cuáles son los plazos de caducidad?",
    a: "Tres, según el inciso: seis meses en primera o única instancia; tres meses en segunda instancia y en cualquier instancia del juicio sumarísimo, el ejecutivo, las ejecuciones especiales y los incidentes; y un mes en el incidente de caducidad de instancia.",
  },
  {
    q: "¿Hace falta que me intimen antes?",
    a: "No, y el artículo lo dice con esas palabras: la caducidad se produce cuando no se instare el curso del proceso dentro de los plazos «sin necesidad de intimación previa». Es la diferencia práctica más importante con el régimen anterior.",
  },
  {
    q: "¿Se aplica a los juicios que ya estaban en trámite?",
    a: `Sí. El artículo 93 de la Ley 27.802 dice que las modificaciones del Título «serán de aplicación a todos los procesos en trámite a partir del día siguiente al de la publicación», o sea desde el ${APLICACION}. La única excepción son los artículos 79 y 80 —competencia por materia y territorial—, que van por el artículo 94: rigen desde la misma fecha pero sólo en los procesos donde la competencia estuviera pendiente de resolución.`,
  },
  {
    q: "Si mi último movimiento fue antes de marzo de 2026, ¿desde cuándo se cuenta?",
    a: "La ley no lo dice, y conviene ser honesto con eso. El artículo 93 fija que el Título se aplica a los procesos en trámite, pero no establece el punto de partida del cómputo para actos anteriores a su entrada en vigencia. Las dos lecturas razonables —contar desde el último acto de impulso, o contar desde el 7 de marzo de 2026— dan fechas muy distintas justamente en los expedientes más viejos. Por eso la calculadora muestra las dos y no elige por vos.",
  },
  {
    q: "¿Cuándo se abre y cuándo termina la instancia?",
    a: "Lo define el propio artículo: «La instancia se abre con la promoción de la demanda aunque no hubiere sido notificada la resolución que dispone su traslado y termina con el dictado de la sentencia». Es decir que el plazo puede estar corriendo antes de que la demanda esté notificada.",
  },
  {
    q: "¿Qué más cambió en el procedimiento laboral?",
    a: "El Título III de la reforma tiene diecisiete artículos. Además de la caducidad: el Estado nacional sale del fuero laboral cuando es parte o tercero interesado; la demanda debe mencionar los medios de prueba; el demandado que no contesta es declarado rebelde con presunción de verdad de los hechos; casi todas las apelaciones anteriores a la sentencia quedan con efecto diferido; los criterios obligatorios sólo pueden fijarse por sentencia plenaria; los precedentes de la Corte Suprema pasan a ser obligatorios para los jueces laborales; y se aprueba el traspaso del fuero nacional del trabajo a la Justicia de la Ciudad de Buenos Aires.",
  },
  {
    q: "¿Es cierto que los jueces tienen que seguir los fallos de la Corte?",
    a: "Sí, y con una consecuencia escrita. El artículo 89 dice que los jueces que resuelvan causas laborales «deberán, de forma obligatoria, adecuar sus decisiones a los precedentes establecidos por la Corte Suprema de Justicia de la Nación en la materia», y que «el apartamiento infundado de los magistrados respecto de dichos criterios configurará una causal de mal desempeño en sus funciones».",
  },
  {
    q: "¿Qué pasa con los juicios laborales contra el Estado nacional?",
    a: "Salen del fuero laboral. El artículo 79 sustituyó el artículo 20 de la Ley 18.345: cuando el Estado nacional —Ejecutivo, Legislativo, Judicial, Ministerio Público, incluidos los entes del artículo 8° inciso a) de la Ley 24.156— es parte o tercero interesado, la competencia es del Contencioso Administrativo Federal de la CABA y, en el resto del país, de la Justicia Federal con competencia contencioso administrativa. El artículo lo cierra así: «En ningún caso la Justicia Nacional del Trabajo podrá expedirse en las causas aquí comprendidas».",
  },
  {
    q: "¿Esta página me dice si mi expediente caducó?",
    a: "No, y no puede. Calcula el vencimiento del plazo contado desde el acto que declarás, pero no conoce los actos interruptivos posteriores, las suspensiones, las ferias ni las particularidades del expediente — y la caducidad la declara el juez. Sirve para saber si hay que mirar la causa, no para darla por perdida.",
  },
];

export default function CaducidadInstanciaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de caducidad de instancia en el juicio laboral",
        url: "https://calcular.ar/caducidad-de-instancia-laboral",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo:
          "Caducidad de instancia en el juicio laboral: el art. 46 de la Ley 18.345 después de la reforma",
        descripcion:
          "Los tres plazos del artículo vigente, el texto anterior que decía exactamente lo contrario y el resto del Título III de la Ley 27.802, artículo por artículo.",
        url: "/caducidad-de-instancia-laboral",
        modificado: FUENTES.consultadoEl,
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
          Caducidad de instancia en el juicio laboral
        </h1>
        <p className="text-zinc-600">
          Hasta el 5 de marzo de 2026 el artículo 46 de la Ley 18.345 se llamaba{" "}
          <strong>«Impulso de oficio»</strong> y un expediente parado no se caía. Desde el{" "}
          {PUBLICACION} se llama <strong>«Impulso del proceso»</strong>, lo impulsan las partes y
          caduca solo, <strong>sin intimación previa</strong>.
        </p>
      </header>

      <RespuestaPrimero actualizado={FUENTES.consultadoEl}>
        <p>
          El art. 82 de la Ley 27.802 sustituyó el art. 46 de la Ley 18.345 e introdujo la{" "}
          <strong>caducidad de instancia</strong> en el fuero laboral nacional, con tres plazos:{" "}
          <strong>6 meses</strong> en primera o única instancia, <strong>3 meses</strong> en segunda
          instancia y en el sumarísimo, el ejecutivo, las ejecuciones especiales y los incidentes, y{" "}
          <strong>1 mes</strong> en el incidente de caducidad. Se produce «sin necesidad de
          intimación previa», la instancia se abre con la promoción de la demanda aunque no esté
          notificada, y por el art. 93 todo esto se aplica <strong>a los procesos ya en trámite</strong>{" "}
          desde el {APLICACION}.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá la fecha</h2>
        <p className="text-sm text-zinc-600">
          Elegí la instancia y la fecha del último acto que instó el curso del proceso. Si ese acto
          es anterior a la reforma, vas a ver dos fechas: la ley aplica el régimen a los procesos en
          trámite pero no dice desde cuándo se cuenta en esos casos, y esta página no lo inventa.
        </p>
        <CalculadoraCaducidadInstancia />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El artículo antes y después: la regla quedó invertida
        </h2>
        <p className="text-sm text-zinc-600">
          No es una reglamentación de plazos sobre una regla que ya existía. Es la regla contraria,
          escrita en el mismo lugar y con un epígrafe nuevo. Por eso conviene leer los dos textos
          uno al lado del otro antes que cualquier resumen.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Hasta el 5/3/2026
            </p>
            <p className="mt-2 text-sm italic text-zinc-600">«{TEXTOS.antes}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              Vigente
            </p>
            <p className="mt-2 text-sm italic text-zinc-700">«{TEXTOS.ahora}»</p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los tres plazos, por inciso</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[30rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left">
                <th className="py-2 pr-3 font-medium text-zinc-600">Instancia o proceso</th>
                <th className="py-2 px-3 font-medium text-zinc-600">Plazo</th>
                <th className="py-2 pl-3 font-medium text-zinc-600">Inciso</th>
              </tr>
            </thead>
            <tbody>
              {INSTANCIAS.map((i) => (
                <tr key={i.id} className="border-b border-zinc-200 align-top">
                  <td className="py-2 pr-3 text-zinc-800">
                    {i.etiqueta}
                    <span className="block text-xs text-zinc-500">{i.detalle}</span>
                  </td>
                  <td className="py-2 px-3 font-semibold text-zinc-900">
                    {i.meses} {i.meses === 1 ? "mes" : "meses"}
                  </td>
                  <td className="py-2 pl-3 text-zinc-600">{i.inciso})</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Se aplica a los expedientes que ya estaban andando
        </h2>
        <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Art. 93 de la Ley 27.802</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.aplicacion}»</p>
        </blockquote>
        <blockquote className="rounded-xl border-l-4 border-zinc-400 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Art. 94 — la excepción</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.aplicacionCompetencia}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Es lo que hace urgente el cambio: no rige sólo para las demandas nuevas. Un expediente
          iniciado bajo el régimen de impulso de oficio pasó a estar sujeto a caducidad desde el{" "}
          {APLICACION}. Lo que el artículo 93 no dice —y esta página tampoco— es desde qué día se
          cuenta el plazo cuando el último movimiento es anterior a esa fecha.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El Título III completo, artículo por artículo
        </h2>
        <p className="text-sm text-zinc-600">
          Diecisiete artículos, y la caducidad es sólo uno. Va la lista entera porque varios de los
          otros cambian cómo se litiga y ninguno tiene página propia todavía.
        </p>
        <div className="space-y-3">
          {CAMBIOS_TITULO_III.map((c) => (
            <details key={c.art} className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-zinc-800">
                Art. {c.art} — {c.titulo}
                <span className="ml-2 text-xs font-normal text-zinc-500">
                  (Ley 18.345, {c.toca})
                </span>
              </summary>
              <p className="mt-2 text-sm text-zinc-600">{c.detalle}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Dos artículos que cambian el peso de una sentencia
        </h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Art. 89 — precedentes de la Corte Suprema
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.precedentes}»</p>
        </blockquote>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Art. 88 — sólo por sentencia plenaria
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{TEXTOS.plenarios}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Los dos apuntan a lo mismo desde lados distintos: qué criterios obligan a un juez laboral.
          El 89 le da fuerza obligatoria a los precedentes de la Corte —con el apartamiento
          infundado como causal de mal desempeño— y el 88 cierra la puerta a que esos criterios se
          fijen por cualquier otro instrumento que no sea una sentencia plenaria.
        </p>
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
          Otras páginas sobre lo que la Ley 27.802 cambió en materia procesal y colectiva:{" "}
          <Link href="/temeridad-y-malicia" className="font-medium text-emerald-700 hover:underline">
            temeridad y malicia
          </Link>
          ,{" "}
          <Link
            href="/negociacion-de-buena-fe"
            className="font-medium text-emerald-700 hover:underline"
          >
            la multa por no negociar de buena fe
          </Link>{" "}
          y{" "}
          <Link
            href="/servicios-esenciales-huelga"
            className="font-medium text-emerald-700 hover:underline"
          >
            los servicios esenciales
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {FUENTES.lista.map((f) => (
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
          Esta página cita el texto oficial publicado en InfoLEG y lo contrasta contra la versión que
          rigió hasta el 5 de marzo de 2026 — no contra un resumen de prensa. Es informativa y
          orientativa: no reemplaza el asesoramiento de un profesional ni anticipa la decisión de un
          tribunal, que es quien declara la caducidad. Consultada el {FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
