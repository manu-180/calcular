import type { Metadata } from "next";
import { FirmaAutor } from "@/components/FirmaAutor";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { TEXTOS as TEXTOS_PERIODISTA } from "@/data/periodistas";
import { DEROGACION_TEXTO, TEXTOS as TEXTOS_VIAJANTE } from "@/data/viajantes";

export const metadata: Metadata = {
  title: "Estatutos laborales que se derogan en 2027 (Ley 27.802)",
  description:
    "Periodistas, viajantes, teletrabajo, peluqueros y choferes: los regímenes que caen el 1/1/2027 y los que ya no rigen desde marzo de 2026.",
  alternates: { canonical: "/blog/estatutos-laborales-derogados-2027" },
  openGraph: {
    type: "article",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Estatutos derogados en 2027")}&s=${encodeURIComponent("El Título XXVI de la Ley 27.802, ley por ley")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const PUBLICADO = "23 de agosto de 2026";
const PUBLICADO_ISO = "2026-08-23";

const INFOLEG = "https://servicios.infoleg.gob.ar/infolegInternet/verNorma.do?id=";

const DESDE_2027 = [
  {
    articulo: "197",
    ley: "Ley 12.908",
    titulo: "Estatuto del Periodista Profesional",
    id: "43608",
    nota: "Tres indemnizaciones por despido, una de ellas de seis meses de sueldo sin equivalente en la LCT.",
  },
  {
    articulo: "198",
    ley: "Ley 14.546",
    titulo: "Estatuto de trabajo del viajante de comercio",
    id: "96295",
    nota: "La indemnización por clientela: el 25% de lo que correspondería por un despido, cualquiera sea el motivo del cese.",
  },
  {
    articulo: "199",
    ley: "Ley 27.555",
    titulo: "Régimen Legal del Contrato de Teletrabajo",
    id: "341093",
    nota: "Desconexión digital, voluntariedad, reversibilidad, tareas de cuidado y compensación de gastos.",
  },
  {
    articulo: "200",
    ley: "Ley 23.947",
    titulo: "Estatuto del Peluquero",
    id: "347",
    nota: "Alcanza al personal en relación de dependencia de peluquerías, institutos de belleza, academias y escuelas.",
  },
  {
    articulo: "201",
    ley: "Ley 23.472",
    titulo: "Fondo de Garantía de Créditos Laborales",
    id: "21976",
    nota: "Fondo integrado con aportes de los empleadores para garantizar créditos laborales.",
  },
  {
    articulo: "205",
    ley: "Ley 12.867",
    titulo: "Estatuto de Choferes",
    id: "43592",
    nota: "Régimen de trabajo de los choferes particulares.",
  },
];

const YA_VIGENTES: Array<{
  articulo: string;
  norma: string;
  titulo: string;
  /** Id de la ficha de InfoLEG. Sólo va cuando se abrió y se verificó: sin id, no hay link. */
  id?: string;
  detalle: string;
}> = [
  {
    articulo: "202",
    norma: "Ley 23.759",
    titulo: "Licencia para votar en elecciones del país de origen",
    id: "160",
    detalle:
      "Daba cuatro días de licencia a trabajadores de países limítrofes para votar en su país.",
  },
  {
    articulo: "203",
    norma: "Ley 24.493",
    titulo: "Mano de obra nacional",
    id: "22535",
    detalle:
      "Reservaba el trabajo a argentinos y extranjeros habilitados, y ponía condiciones a la autorización laboral de residentes temporarios.",
  },
  {
    articulo: "204",
    norma: "Ley 20.657",
    titulo: "Promoción comercial (régimen de supermercados)",
    id: "190553",
    detalle:
      "Ya había sido derogada por el art. 12 del Decreto 70/2023: la Ley 27.802 la deroga por segunda vez.",
  },
  {
    articulo: "206",
    norma: "Ley 26.727",
    titulo: "Régimen de Trabajo Agrario: arts. 13, 18 y 21",
    id: "192152",
    detalle: "Derogación parcial: tres artículos del régimen agrario, no la ley entera.",
  },
  {
    articulo: "207",
    norma: "Ley 20.744",
    titulo: "Contrato de Trabajo: arts. 28, 54, 61, 113, 174, 175, 176, 216 y 275",
    id: "25552",
    detalle:
      "Nueve artículos de la LCT derogados de una vez. Entre ellos, el art. 113, el de las propinas.",
  },
  {
    articulo: "208",
    norma: "Ley 11.544",
    titulo: "Jornada de trabajo: art. 6°",
    id: "63368",
    detalle: "Derogación parcial de la ley de jornada.",
  },
  {
    articulo: "209",
    norma: "Ley 24.467",
    titulo: "Pequeña y mediana empresa: arts. 86 y 87",
    id: "15932",
    detalle: "Derogación parcial del régimen PyME.",
  },
  {
    articulo: "210",
    norma: "Ley 12.713",
    titulo: "Trabajo a domicilio: art. 17 inc. c)",
    id: "48991",
    detalle: "Derogación de un inciso.",
  },
  {
    articulo: "211",
    norma: "Ley 14.250",
    titulo: "Convenciones colectivas de trabajo: arts. 10, 16 y 21",
    id: "46379",
    detalle: "Derogación parcial del régimen de convenios colectivos.",
  },
];

const faqs = [
  {
    q: "¿Cuándo se derogan los estatutos laborales?",
    a: "Depende del artículo. La Ley 27.802 se publicó en el Boletín Oficial el 6 de marzo de 2026, y su art. 217 dice que «salvo disposición en contrario los artículos de la presente ley entrarán en vigencia a partir de su publicación». Las derogaciones de los arts. 202 a 204, 206 a 211 y 216 no tienen fecha propia: rigen desde ese día. Las de los arts. 197 a 201, 205, 212 y 213 dicen «a partir del 1º de enero de 2027». Y los arts. 214 y 215 corren hasta el 1º de enero de 2028.",
  },
  {
    q: "¿Es un proyecto o ya está aprobado?",
    a: "Está aprobado y publicado. La Ley 27.802 de Modernización Laboral se publicó el 6 de marzo de 2026, y muchas de sus derogaciones ya rigen. Muchas notas que circulan se escribieron cuando el texto tenía media sanción y todavía dicen «propone derogar». Fijate la fecha de lo que leés.",
  },
  {
    q: "¿Qué pasa con el teletrabajo?",
    a: "El art. 199 deroga la Ley 27.555 (el Régimen Legal del Contrato de Teletrabajo) desde el 1/1/2027. Hay un detalle que casi nadie cuenta: el art. 2 de esa ley había sumado a la Ley de Contrato de Trabajo un capítulo nuevo con el art. 102 bis, y la Ley 27.802 no nombra el art. 102 bis en ninguna parte. O sea, la derogación alcanza a la ley especial. Qué queda del artículo que ya estaba en la LCT (que además manda a «una ley especial» que va a dejar de existir) es una discusión que la norma no resuelve.",
  },
  {
    q: "¿Los convenios colectivos también se caen?",
    a: "No. Lo que se deroga son leyes. Los convenios colectivos son otra fuente de derechos y siguen sus propias reglas. Desde el 1/1/2027 pasan a pesar mucho más, porque lo que antes garantizaba el estatuto pasa a depender del convenio de la actividad y del contrato individual.",
  },
  {
    q: "¿Y lo que ya se devengó antes de la derogación?",
    a: "Cada indemnización nace cuando pasa el hecho que la genera. La indemnización por clientela del viajante, por ejemplo, nace «en el caso de disolución del contrato individual de trabajo» (art. 14 de la Ley 14.546): si el contrato terminó con la ley vigente, el derecho nació con ella. Cómo se resuelve cada caso lo decide la Justicia, no una calculadora. Por eso, si el contrato termina cerca del 31 de diciembre de 2026, es justo el momento de consultar a un abogado laboralista.",
  },
  {
    q: "¿Qué artículos de la Ley de Contrato de Trabajo se derogaron?",
    a: "El art. 207 de la Ley 27.802 deroga los arts. 28, 54, 61, 113, 174, 175, 176, 216 y 275 de la LCT, sin fecha diferida: están derogados desde el 6 de marzo de 2026. El más conocido es el art. 113, el de las propinas, que se reemplazó por una regla escrita al revés en el art. 104.",
  },
];

export default function EstatutosDerogados2027Post() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Estatutos laborales que se derogan en 2027 (Ley 27.802)",
        descripcion:
          "La lista completa de derogaciones del Título XXVI de la Ley 27.802, con sus tres fechas de vigencia, el título oficial de cada norma y el texto de los artículos derogatorios.",
        url: "/blog/estatutos-laborales-derogados-2027",
        modificado: PUBLICADO_ISO,
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
        <p className="text-sm text-zinc-500">
          Guía · <FirmaAutor prefijo="por" /> · {PUBLICADO}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Los estatutos laborales que se derogan el 1 de enero de 2027
        </h1>
        <p className="text-zinc-600">
          El Título XXVI de la Ley 27.802 hace algo distinto del resto de la reforma: no cambia
          artículos, <strong>deroga leyes enteras</strong>. Seis regímenes completos caen el{" "}
          {DEROGACION_TEXTO}, otros nueve ya están derogados desde marzo de 2026 y dos más caen en
          2028. Acá tenés la lista completa, con el título oficial de cada norma y el texto del
          artículo que la deroga.
        </p>
      </header>

      <RespuestaPrimero actualizado={PUBLICADO}>
        <p>
          La <strong>Ley 27.802</strong> (B.O. 6/3/2026) deroga, <strong>desde el 1/1/2027</strong>:
          el <strong>Estatuto del Periodista Profesional</strong> (Ley 12.908), el{" "}
          <strong>Estatuto del viajante de comercio</strong> (Ley 14.546), el{" "}
          <strong>Régimen Legal del Contrato de Teletrabajo</strong> (Ley 27.555), el{" "}
          <strong>Estatuto del Peluquero</strong> (Ley 23.947), el{" "}
          <strong>Fondo de Garantía de Créditos Laborales</strong> (Ley 23.472) y el{" "}
          <strong>Estatuto de Choferes</strong> (Ley 12.867). Otras derogaciones{" "}
          <strong>ya rigen desde el 6/3/2026</strong>, porque no tienen fecha propia: entre ellas,{" "}
          <strong>nueve artículos de la Ley de Contrato de Trabajo</strong> (arts. 28, 54, 61, 113,
          174, 175, 176, 216 y 275). No es un proyecto: es texto publicado.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Tres fechas, no una</h2>
        <p className="text-sm text-zinc-600">
          Lo primero que hay que mirar de cada derogación es si trae fecha o no. El art. 217 de la
          ley lo resuelve en una línea: «Salvo disposición en contrario los artículos de la presente
          ley entrarán en vigencia a partir de su publicación en el Boletín Oficial». Entonces:
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-amber-300 bg-amber-50/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
              Ya rigen: 6/3/2026
            </p>
            <p className="mt-1 text-sm text-zinc-700">
              Arts. 202, 203, 204, 206 a 211 y 216: derogaciones sin fecha propia. Están vigentes
              desde el día de la publicación.
            </p>
          </div>
          <div className="rounded-xl border border-emerald-300 bg-emerald-50/60 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              1/1/2027
            </p>
            <p className="mt-1 text-sm text-zinc-700">
              Arts. 197 a 201, 205, 212 y 213: los seis estatutos completos y dos decretos-leyes de
              1946.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-300 bg-zinc-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">1/1/2028</p>
            <p className="mt-1 text-sm text-zinc-700">
              Arts. 214 y 215: el financiamiento del INCAA (Ley 17.741) y dos incisos de la Ley
              26.522. No son normas laborales.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Lo que se deroga el {DEROGACION_TEXTO}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="py-2 pr-3">Art.</th>
                <th className="py-2 pr-3">Norma</th>
                <th className="py-2 pr-3">Título oficial</th>
                <th className="py-2">Qué se pierde</th>
              </tr>
            </thead>
            <tbody>
              {DESDE_2027.map((d) => (
                <tr key={d.ley} className="border-b border-zinc-200 align-top">
                  <td className="py-3 pr-3 font-semibold text-zinc-800">{d.articulo}</td>
                  <td className="py-3 pr-3">
                    <a
                      href={`${INFOLEG}${d.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-emerald-700 hover:underline"
                    >
                      {d.ley}
                    </a>
                  </td>
                  <td className="py-3 pr-3 font-medium text-zinc-700">{d.titulo}</td>
                  <td className="py-3 text-zinc-600">{d.nota}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-500">
          Cada título es el que figura en la ficha oficial de InfoLEG, abierta norma por norma. No
          publicamos el nombre de una ley deducido de su número.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El viajante de comercio: el 25% que desaparece
        </h2>
        <p className="text-zinc-600">
          El art. 198 dice, completo: «{TEXTOS_VIAJANTE.art198Ley27802}». Lo que se va con la Ley
          14.546 es, sobre todo, el <strong>art. 14</strong>: la indemnización por clientela,
          equivalente al «veinticinco por ciento de lo que le hubiere correspondido en caso de
          despido intempestivo e injustificado», con más de un año de contrato y (esto casi nadie
          lo publica) <strong>cualquiera sea el motivo de la disolución</strong>. También si el
          viajante renuncia.
        </p>
        <p className="text-zinc-600">
          Pero no es lo único: con el estatuto se van la <strong>comisión indirecta</strong> del art.
          6 (las ventas a clientes de su zona hechas sin su intervención se le pagan igual, y «la
          tasa o por ciento de la comisión indirecta será igual a la directa»), la{" "}
          <strong>aceptación tácita</strong> de la nota de venta a los 15 o 30 días (art. 5 inc. b),
          la <strong>conformidad expresa</strong> para cambiarlo de zona con garantía del mismo
          volumen de remuneraciones (art. 9), el libro especial del art. 10 con la{" "}
          <strong>carga de la prueba en cabeza del empleador</strong> (art. 11) y el día y medio de
          descanso por semana de gira (art. 13).
        </p>
        <p className="text-sm">
          <Link
            href="/indemnizacion-por-clientela"
            className="font-medium text-emerald-700 hover:underline"
          >
            Calculadora de indemnización por clientela →
          </Link>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El periodista: los seis meses que no tienen equivalente
        </h2>
        <p className="text-zinc-600">
          El art. 197 dice: «{TEXTOS_PERIODISTA.art197Ley27802}». El artículo que más pesa del
          Estatuto del Periodista es el <strong>43</strong>, con el texto que le dio la Ley 16.792
          en 1965 (sesenta años sin cambios). Paga <strong>tres indemnizaciones</strong>, no una: la
          antigüedad (un mes por año, nunca menos de dos meses, sin tope de convenio),
          la sustitutiva del preaviso (dos o cuatro meses según se superen o no los tres años de
          antigüedad) y una <strong>indemnización especial de seis meses de sueldo</strong> que se
          paga «haya o no mediado preaviso» y que la Ley de Contrato de Trabajo no tiene.
        </p>
        <p className="text-zinc-600">
          Con él se van además la jornada de <strong>36 horas semanales</strong> con las extras al
          100% (art. 34), las vacaciones contadas en <strong>días hábiles</strong> (15, 20 o 30
          según la antigüedad, art. 35, mientras la LCT las cuenta en días corridos) y el período
          de prueba de <strong>30 días</strong> del art. 25, contra los seis meses del art. 92 bis.
        </p>
        <p className="text-sm">
          <Link
            href="/indemnizacion-periodista"
            className="font-medium text-emerald-700 hover:underline"
          >
            Calculadora de indemnización del periodista →
          </Link>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El teletrabajo: el caso con un detalle que casi nadie mira
        </h2>
        <p className="text-zinc-600">
          El art. 199 deroga la Ley 27.555 desde el {DEROGACION_TEXTO}. Esa ley es la que trajo el{" "}
          <strong>derecho a la desconexión digital</strong> (art. 5: no ser contactado fuera de la
          jornada ni durante las licencias, sin poder ser sancionado por ejercerlo), la{" "}
          <strong>voluntariedad</strong> del pase a la modalidad remota (art. 7), la{" "}
          <strong>reversibilidad</strong> (art. 8), el derecho de quienes tienen a cargo el cuidado
          de menores de trece años, personas con discapacidad o adultas mayores a coordinar horarios
          e interrupciones (art. 6) y la obligación del empleador de proveer{" "}
          <strong>equipamiento y compensar gastos</strong> (art. 9).
        </p>
        <p className="text-zinc-600">
          El detalle: el <strong>art. 2 de la Ley 27.555</strong> no creó una ley suelta, sino que
          incorporó a la Ley de Contrato de Trabajo un capítulo nuevo, con el{" "}
          <strong>art. 102 bis</strong>. Y la Ley 27.802 <strong>no menciona el art. 102 bis</strong>{" "}
          en ninguna parte de su texto. La derogación alcanza a la ley especial. Qué queda del
          artículo que ya estaba en la LCT (que justamente manda a «una ley especial» que va a
          dejar de existir) es una discusión abierta que la norma no resuelve. Cualquier nota que
          diga que desde el 1/1/2027 «no hay más regulación del teletrabajo», o lo contrario, está
          diciendo más de lo que dice el texto.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Las derogaciones que ya rigen (y de las que casi no se habló)
        </h2>
        <p className="text-sm text-zinc-600">
          Estas no esperan a 2027: no tienen fecha propia, así que están vigentes desde el 6 de marzo
          de 2026.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[44rem] text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="py-2 pr-3">Art.</th>
                <th className="py-2 pr-3">Norma</th>
                <th className="py-2 pr-3">Qué es</th>
                <th className="py-2">Detalle</th>
              </tr>
            </thead>
            <tbody>
              {YA_VIGENTES.map((d) => (
                <tr key={d.articulo} className="border-b border-zinc-200 align-top">
                  <td className="py-3 pr-3 font-semibold text-zinc-800">{d.articulo}</td>
                  <td className="py-3 pr-3">
                    {d.id ? (
                      <a
                        href={`${INFOLEG}${d.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-emerald-700 hover:underline"
                      >
                        {d.norma}
                      </a>
                    ) : (
                      <span className="font-medium text-zinc-700">{d.norma}</span>
                    )}
                  </td>
                  <td className="py-3 pr-3 font-medium text-zinc-700">{d.titulo}</td>
                  <td className="py-3 text-zinc-600">{d.detalle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-600">
          El art. 207 es el que más lejos llega: deroga <strong>nueve artículos</strong> de la Ley de
          Contrato de Trabajo de una vez. Uno de ellos, el <strong>art. 113</strong>, era el de las
          propinas, y su derogación no dejó un vacío: dejó una regla escrita al revés en el art. 104.
          Lo explicamos en{" "}
          <Link href="/propinas" className="font-medium text-emerald-700 hover:underline">
            qué cambió con las propinas
          </Link>
          . Los otros ocho todavía no los revisamos: cuando lo hagamos, van a tener páginas propias.
        </p>
        <p className="text-xs text-zinc-500">
          Los arts. 212 y 213 derogan además, desde el 1/1/2027, los decretos-leyes 13.839/46 y
          14.954/46 «y toda otra norma que se oponga o colisione con alguna de las disposiciones de
          la presente ley». Esos dos todavía no los abrimos: los nombramos por su número y nada más.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué conviene hacer con esto</h2>
        <ul className="space-y-2 text-zinc-600">
          <li>
            <strong>Si estás bajo uno de esos estatutos</strong>, mirá qué dice el convenio colectivo
            de tu actividad: desde el 1/1/2027 pasa a ser la fuente principal de lo que el estatuto
            garantizaba por ley. Y si ese convenio está vencido, mirá{" "}
            <Link href="/convenio-vencido" className="font-medium text-emerald-700 hover:underline">
              qué sigue valiendo de un convenio vencido
            </Link>
            .
          </li>
          <li>
            <strong>Si tu vínculo termina cerca de fin de 2026</strong>, la fecha exacta del cese
            cambia la liquidación. Es el caso típico para consultar antes, no después.
          </li>
          <li>
            <strong>Si estás leyendo una nota sobre el tema</strong>, fijate en la fecha: casi todo
            lo publicado antes de marzo de 2026 habla de un proyecto, y buena parte de lo posterior
            repite ese encuadre.
          </li>
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
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          <li>
            <a
              href={`${INFOLEG}423680`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:underline"
            >
              Ley 27.802 de Modernización Laboral, Título XXVI, arts. 197 a 218 (InfoLEG)
            </a>
            : el texto de cada derogación y el art. 217 de vigencia.
          </li>
          <li>
            Las fichas oficiales de InfoLEG de cada norma derogada, enlazadas en las tablas de esta
            guía.
          </li>
        </ul>
        <p className="pt-2">
          Guía informativa: no reemplaza el consejo de un abogado laboralista.
          Verificada contra el texto oficial el {PUBLICADO}.
        </p>
      </section>
    </article>
  );
}
