import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraRechazoArt } from "@/components/CalculadoraRechazoArt";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { SelloVerificado } from "@/components/SelloVerificado";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  CAUSALES_RECHAZO,
  PLAZO_PRESTADOR_HORAS,
  PLAZO_RECHAZO_HABILES,
  PRESCRIPCION_ANIOS,
  PRORROGA_HABILES,
  QUIEN_PUEDE_DENUNCIAR,
  RECHAZO_FUENTES,
  RECHAZO_TEXTOS,
  VIGENCIA_RECHAZO,
} from "@/data/rechazo-art";

export const metadata: Metadata = {
  title: "La ART rechazó el accidente: ¿el rechazo llegó en plazo?",
  description:
    "Calculá los 10 días hábiles administrativos del rechazo de la ART, verificá si la prórroga fue válida y sabé si corresponde comisión médica u otra autoridad.",
  alternates: { canonical: "/rechazo-art" },
  openGraph: {
    title: "Rechazo de la ART: plazo, silencio y vía de reclamo",
    description:
      "El plazo no es corrido, la prórroga no es automática y una de las tres causales no va a comisión médica.",
    url: "https://calcular.ar/rechazo-art",
    images: [
      {
        url:
          "/og?t=" +
          encodeURIComponent("Rechazo de la ART") +
          "&s=" +
          encodeURIComponent("10 días hábiles · silencio · vía de reclamo"),
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Los 10 días para rechazar son corridos o hábiles?",
    a: "Son días hábiles administrativos. El art. 36 bis del Decreto 717/96 dice que «a los fines del presente procedimiento todos los plazos expresados se consideran en días hábiles administrativos». El cómputo empieza el día siguiente a la recepción de la denuncia.",
  },
  {
    q: "¿La ART siempre tiene 20 días para decidir?",
    a: "No. Tiene 10 días hábiles y sólo puede sumar otros 10 si existen circunstancias objetivas que impiden conocer acabadamente la pretensión y notifica fehacientemente el uso de la prórroga al trabajador y al empleador dentro del primer plazo. Avisarla después no revive un plazo ya vencido.",
  },
  {
    q: "¿Qué pasa si la ART no rechaza a tiempo?",
    a: "El art. 6º establece que su silencio se entiende como aceptación de la pretensión si, vencido el plazo aplicable, no cursó la notificación fehaciente del rechazo al trabajador y al empleador.",
  },
  {
    q: "¿Todo rechazo se reclama ante la comisión médica?",
    a: "No. Los rechazos de los incisos b) y c) van a comisión médica. Si el empleador desconoce la relación laboral —inciso a)—, esa existencia debe resolverse previamente ante la autoridad competente y la comisión médica no le da curso.",
  },
  {
    q: "¿La ART puede negar la relación laboral si el empleador la reconoce?",
    a: "No. El art. 6º prohíbe rechazar la pretensión por inexistencia de una relación laboral reconocida por el empleador.",
  },
  {
    q: "¿Necesito abogado para presentarme ante la comisión médica?",
    a: "Sí. El art. 12 exige patrocinio letrado desde la primera presentación y durante todo el proceso, y el art. 36 ordena a la SRT garantizarlo en forma gratuita.",
  },
  {
    q: "¿Que la ART me atienda significa que aceptó el accidente?",
    a: "No. Debe otorgar las prestaciones en especie mientras la pretensión no sea rechazada, pero el art. 6º aclara que dar esas prestaciones antes de decidir nunca equivale por sí solo a aceptar la contingencia.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Rechazo de la ART: plazo, silencio y vía de reclamo",
        descripcion:
          "El cómputo en días hábiles administrativos del Decreto 717/96, la condición de la prórroga y la vía que abre cada causal de rechazo.",
        url: "/rechazo-art",
        modificado: VIGENCIA_RECHAZO.consultadoEl,
      }),
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
    ],
  };

  return (
    <article className="space-y-10">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          La ART rechazó el accidente: ¿el rechazo llegó en plazo?
        </h1>
        <p className="text-zinc-600">
          No alcanza con contar diez casilleros del calendario. El plazo corre en{" "}
          <strong>días hábiles administrativos</strong>, la prórroga tiene una condición y la causal
          invocada decide por dónde sigue el reclamo.
        </p>
      </header>

      <SelloVerificado
        verificadoEl={VIGENCIA_RECHAZO.consultadoEl}
        norma={VIGENCIA_RECHAZO.norma}
        fuente={{ nombre: RECHAZO_FUENTES.lista[0].nombre, url: RECHAZO_FUENTES.lista[0].url }}
      />

      <RespuestaPrimero actualizado={VIGENCIA_RECHAZO.consultadoEl}>
        <p>
          La ART tiene <strong>{PLAZO_RECHAZO_HABILES} días hábiles administrativos</strong> desde
          que recibió la denuncia. Puede sumar otros <strong>{PRORROGA_HABILES}</strong>, pero sólo
          si notificó la prórroga dentro del primer plazo. Sin rechazo fehaciente a tiempo, el art.
          6º dice que el silencio se entiende como <strong>aceptación de la pretensión</strong>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá el plazo y la vía</h2>
        <p className="text-sm text-zinc-600">
          Usá la fecha en que la ART recibió la denuncia y la fecha en que cursó cada notificación,
          no el día en que llegó el correo a tus manos.
        </p>
        <CalculadoraRechazoArt />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">El plazo que decide el resultado</h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm font-semibold text-emerald-900">Decreto 717/96, art. 6º</p>
          <p className="mt-1 text-sm text-zinc-700">«{RECHAZO_TEXTOS.art6Silencio}»</p>
        </blockquote>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/70 p-4">
          <p className="text-sm font-semibold text-amber-900">La condición de la prórroga</p>
          <p className="mt-1 text-sm text-zinc-700">«{RECHAZO_TEXTOS.art6Prorroga}»</p>
        </blockquote>
        <blockquote className="rounded-xl border-l-4 border-violet-400 bg-violet-50/70 p-4">
          <p className="text-sm font-semibold text-violet-900">Decreto 717/96, art. 36 bis</p>
          <p className="mt-1 text-sm text-zinc-700">«{RECHAZO_TEXTOS.art36bis}»</p>
        </blockquote>
        <p className="text-zinc-600">
          El décimo día hábil está adentro del plazo: una notificación cursada ese día llega a
          tiempo. El calendario contempla fines de semana y feriados nacionales conocidos; un
          asueto administrativo puntual puede correr el vencimiento, por eso la calculadora muestra
          la fecha más temprana posible.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Las únicas tres causales y su vía</h2>
        <div className="space-y-3">
          {CAUSALES_RECHAZO.map((causal) => (
            <div key={causal.id} className="rounded-xl border border-zinc-200 bg-white p-4">
              <p className="text-sm font-bold text-zinc-900">
                {causal.id}) {causal.titulo}
              </p>
              <p className="mt-1 text-sm text-zinc-700">{causal.texto}</p>
              <p className="mt-2 text-xs font-semibold text-emerald-700">
                {causal.vaA === "comision-medica"
                  ? "Va a comisión médica · el rechazo debe estar fundado"
                  : "Va primero a la autoridad competente · no a comisión médica"}
              </p>
            </div>
          ))}
        </div>
        <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/70 p-4">
          <p className="text-sm font-semibold text-rose-900">El límite del inciso a)</p>
          <p className="mt-1 text-sm text-zinc-700">«{RECHAZO_TEXTOS.art6RelacionReconocida}»</p>
        </blockquote>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-900">Decreto 717/96, art. 11</p>
          <p className="mt-1 text-sm text-zinc-700">«{RECHAZO_TEXTOS.art11}»</p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">La denuncia abre las prestaciones</h2>
        <p className="text-zinc-600">
          El empleador debe denunciar inmediatamente, pero no es el único que puede hacerlo. La
          denuncia también puede presentarse ante un prestador habilitado por la ART, que debe
          remitirla dentro de <strong>{PLAZO_PRESTADOR_HORAS} horas</strong>. Ni la Aseguradora ni el
          prestador pueden negarse a recibirla, y las prestaciones en especie deben comenzar de
          inmediato y continuar mientras la pretensión no sea rechazada.
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {QUIEN_PUEDE_DENUNCIAR.map((quien) => (
            <li
              key={quien}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700"
            >
              {quien}
            </li>
          ))}
        </ul>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm text-zinc-700">«{RECHAZO_TEXTOS.art1}»</p>
          <p className="mt-2 text-sm text-zinc-700">«{RECHAZO_TEXTOS.art2}»</p>
          <p className="mt-2 text-sm text-zinc-700">«{RECHAZO_TEXTOS.art6Recepcion}»</p>
        </blockquote>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/70 p-4">
          <p className="text-sm text-zinc-700">«{RECHAZO_TEXTOS.art6PrestacionesPrevias}»</p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Patrocinio, notificaciones y prescripción</h2>
        <blockquote className="rounded-xl border-l-4 border-violet-400 bg-violet-50/70 p-4">
          <p className="text-sm font-semibold text-violet-900">Decreto 717/96, art. 12</p>
          <p className="mt-1 text-sm text-zinc-700">«{RECHAZO_TEXTOS.art12}»</p>
        </blockquote>
        <p className="text-zinc-600">
          La SRT debe garantizar ese patrocinio en forma gratuita (art. 36). Las notificaciones a
          ART y empleadores se consideran fehacientes por la ventanilla electrónica de la SRT; para
          trabajadores, derechohabientes y empleadores de cinco personas o menos rigen los medios de
          la Ley 19.549 (art. 36 ter).
        </p>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-900">
            Ley 24.557, art. 44 ap. 1 · prescripción de {PRESCRIPCION_ANIOS} años
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{RECHAZO_TEXTOS.art44}»</p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <dl className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.q} className="rounded-xl border border-zinc-200 bg-white p-4">
              <dt className="text-sm font-bold text-zinc-900">{faq.q}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-zinc-700">{faq.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Fuentes</h2>
        <p className="text-sm text-zinc-600">
          Textos actualizados consultados el {RECHAZO_FUENTES.consultadoEl}. El Decreto 1475/2015
          está identificado en las sustituciones del Decreto 717/96; no se enlaza una URL propia
          porque el buscador local no la devolvió.
        </p>
        <ul className="space-y-3">
          {RECHAZO_FUENTES.lista.map((fuente) => (
            <li key={fuente.nombre} className="rounded-xl border border-zinc-200 bg-white p-4">
              {"url" in fuente ? (
                <a
                  href={fuente.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-emerald-700 hover:underline"
                >
                  {fuente.nombre}
                </a>
              ) : (
                <p className="text-sm font-semibold text-zinc-900">{fuente.nombre}</p>
              )}
              <p className="mt-1 text-sm text-zinc-600">{fuente.detalle}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-zinc-600">
          Si el rechazo encuadra en los incisos b) o c), seguí con los plazos de la{" "}
          <Link href="/comision-medica" className="text-emerald-700 hover:underline">
            comisión médica
          </Link>
          . Para calcular las prestaciones dinerarias, usá la{" "}
          <Link href="/indemnizacion-art" className="text-emerald-700 hover:underline">
            indemnización por accidente de trabajo
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
