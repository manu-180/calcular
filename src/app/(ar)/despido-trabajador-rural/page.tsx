import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraTrabajoAgrario } from "@/components/CalculadoraTrabajoAgrario";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  AGRARIO_FUENTES,
  AGRARIO_TEXTOS,
  ARTICULOS_REFORMA,
  MESES_PERIODO_PRUEBA_AGRARIO,
  MESES_PERIODO_PRUEBA_LCT,
  MESES_PISO_ART22,
  VIGENCIA_REFORMA,
} from "@/data/trabajo-agrario";

export const metadata: Metadata = {
  title: "Despido de trabajador rural: liquidación 2026",
  description: `El período de prueba rural pasó a ${MESES_PERIODO_PRUEBA_AGRARIO} meses y desapareció el permanente discontinuo. Calculá la liquidación del peón rural con el régimen agrario vigente.`,
  alternates: { canonical: "/despido-trabajador-rural" },
  openGraph: {
    title: "Trabajo rural: el período de prueba pasó de cero a ocho meses",
    description: `El art. ${ARTICULOS_REFORMA.art16} de la Ley 27.802 fijó el período de prueba agrario en ${MESES_PERIODO_PRUEBA_AGRARIO} meses y el art. ${ARTICULOS_REFORMA.derogatorio} derogó la figura del trabajador permanente discontinuo. Lo que quedó intacto: el piso de ${MESES_PISO_ART22} meses del art. 22.`,
    url: "https://calcular.ar/despido-trabajador-rural",
    images: [
      {
        url: "/og?t=Despido%20del%20trabajador%20rural&s=8%20meses%20de%20prueba%20y%20un%20piso%20de%202%20sueldos",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuánto dura el período de prueba de un trabajador rural?",
    a: `Ocho meses. El art. 16 de la Ley 26.727, con el texto que le dio el art. ${ARTICULOS_REFORMA.art16} de la Ley 27.802 el ${VIGENCIA_REFORMA}, dice: «Para los trabajadores de esta modalidad, el período de prueba será de ocho (8) meses». No es el art. 92 bis de la LCT, que fija ${MESES_PERIODO_PRUEBA_LCT} meses para el trabajo en la ciudad. Es un plazo propio del régimen agrario, que sale de la ley y no necesita convenio colectivo.`,
  },
  {
    q: "¿Es cierto que el trabajo rural no tenía período de prueba?",
    a: `Sí, durante doce años. El texto original de la Ley 26.727, aprobada en diciembre de 2011, decía que el contrato agrario permanente «no podrá ser celebrado a prueba por período alguno». Eso cambió en julio de 2024, cuando el art. 98 de la Ley 27.742 lo cambió por el período de prueba del art. 92 bis de la LCT. Y volvió a cambiar en marzo de 2026, cuando la Ley 27.802 fijó los ocho meses. En quince años el régimen pasó de cero al período de prueba más largo del sistema.`,
  },
  {
    q: "Trabajé siete meses en el campo y me despidieron. ¿Cobro indemnización?",
    a: `Por el despido, no. Con siete meses estás dentro de los ${MESES_PERIODO_PRUEBA_AGRARIO} meses del art. 16, así que no te corresponde indemnización por antigüedad, ni preaviso, ni integración del mes. Es justo el hueco que abrió la reforma: en un trabajo en la ciudad, con siete meses ya habrías pasado el período de prueba de ${MESES_PERIODO_PRUEBA_LCT} meses y cobrarías las tres cosas. Lo que sí te corresponde siempre es la liquidación final: aguinaldo y vacaciones proporcionales.`,
  },
  {
    q: "¿Qué es el piso de dos meses del artículo 22?",
    a: `Es el número propio del régimen rural que la reforma NO tocó. El art. 22 de la Ley 26.727 dice que el trabajador permanente «en ningún caso podrá percibir como indemnización por antigüedad o despido un importe inferior a dos (2) meses de sueldo, tomando como base la mejor remuneración mensual, normal y habitual». Es el doble del piso que da el art. 245 de la LCT al resto de los trabajadores, que es un mes. Y el artículo no nombra el tope de convenio: manda calcular sobre el mejor sueldo real.`,
  },
  {
    q: "Vuelvo todos los años con el mismo patrón. ¿Soy permanente discontinuo?",
    a: `Ya no. El art. 18 de la Ley 26.727 decía que el temporario contratado por el mismo empleador «en más de una ocasión de manera consecutiva» era «a todos sus efectos» un trabajador permanente discontinuo, y que sumaba antigüedad «a partir de su primera contratación». El art. ${ARTICULOS_REFORMA.derogatorio} de la Ley 27.802 lo derogó. Y por si quedaba duda, el art. ${ARTICULOS_REFORMA.art17} le agregó al art. 17 una oración nueva: los contratos temporarios seguidos, «cualquiera sea el número de contrataciones, no modificará[n] la naturaleza temporaria del vínculo». Borraron la figura y además escribieron que no existe.`,
  },
  {
    q: "¿Y la indemnización por despido en plena temporada?",
    a: `El art. 21, que la regulaba, también lo derogó el art. ${ARTICULOS_REFORMA.derogatorio}. Le daba al permanente discontinuo despedido con el ciclo sin terminar las indemnizaciones del Título XII de la LCT «además de (…) daños y perjuicios provenientes del derecho común». Y decía que «la antigüedad se computará en función de los períodos efectivamente trabajados». Esa oración era la que hacía que las temporadas se sumaran. Hoy no está.`,
  },
  {
    q: "¿Qué cobra un trabajador temporario al terminar la cosecha?",
    a: "El aguinaldo proporcional y el 10% del art. 20: «una indemnización sustitutiva de sus vacaciones equivalente al diez por ciento (10%) del total de las remuneraciones devengadas». Ese artículo quedó igual. Lo que no hay es indemnización por antigüedad: el contrato temporario termina cuando termina el ciclo, no por despido.",
  },
  {
    q: "¿El dueño del campo responde por lo que me debe el contratista?",
    a: `Depende de qué puso. El art. 12, con el texto del art. ${ARTICULOS_REFORMA.art12} de la Ley 27.802, dice que «aquellos propietarios que den en arrendamiento maquinarias, equipamiento o las tierras de su titularidad, en ningún caso serán considerados responsables solidarios por las obligaciones emergentes de la relación laboral entre los trabajadores y aquellos que los hubieran registrado, resultando ajenos a dicho vínculo». La empresa que usa trabajadores que le manda un tercero sí responde junto con él, pero «exclusivamente respecto de aquellas [obligaciones] devengadas durante el tiempo de efectiva prestación» para ella.`,
  },
  {
    q: "¿Un temporario cobra asignaciones familiares?",
    a: `Sí, y la reforma lo escribió con todas las letras. El art. ${ARTICULOS_REFORMA.art34bis} de la Ley 27.802 sumó el art. 34 bis a la Ley 26.727: los temporarios «tendrán derecho a percibir las asignaciones familiares contributivas establecidas en la ley 24.714». Y cuando termina la relación, «accederán automáticamente al régimen de asignaciones familiares no contributivas correspondiente, garantizándose la continuidad en la percepción del beneficio». Es de las pocas cosas que la reforma sumó a favor del trabajador rural.`,
  },
  {
    q: "Me despidieron antes de marzo de 2026. ¿Qué texto se aplica?",
    a: `El anterior. Las notas de los artículos dicen que rigen «a partir de su publicación en el Boletín Oficial», que fue el ${VIGENCIA_REFORMA}. Si te despidieron antes, el período de prueba rural era el del art. 92 bis de la LCT, y el permanente discontinuo seguía existiendo, con la antigüedad sumada por los períodos trabajados. Esta página publica los textos completos, el viejo y el nuevo, para que veas cuál te toca.`,
  },
];

export default function DespidoTrabajadorRuralPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de despido del trabajador rural (Ley 26.727)",
        url: "https://calcular.ar/despido-trabajador-rural",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo:
          "Despido del trabajador rural: el Régimen de Trabajo Agrario después de la Ley 27.802",
        descripcion:
          "El Título XI de la Ley 27.802 fijó el período de prueba del trabajador rural permanente en ocho meses y su art. 206 derogó la figura del trabajador permanente discontinuo. Quedaron intactos el piso de dos meses del art. 22 y el 10% de vacaciones del temporario del art. 20.",
        url: "/despido-trabajador-rural",
        modificado: AGRARIO_FUENTES.consultadoEl,
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
          Despido del trabajador rural: cuánto te corresponde hoy
        </h1>
        <p className="text-zinc-600">
          El campo tiene su propia ley laboral (la 26.727), y en marzo de 2026 la reforma la
          reescribió. Cambiaron las dos cosas que deciden la plata:{" "}
          <strong>el período de prueba pasó a {MESES_PERIODO_PRUEBA_AGRARIO} meses</strong> y{" "}
          <strong>la figura del trabajador permanente discontinuo desapareció</strong>. En cambio,
          el piso de {MESES_PISO_ART22} meses de indemnización quedó intacto, y casi nadie lo
          publica.
        </p>
      </header>

      <RespuestaPrimero actualizado={AGRARIO_FUENTES.consultadoEl}>
        <p>
          <strong>
            Desde el {VIGENCIA_REFORMA}, el período de prueba del trabajador rural permanente es de{" "}
            {MESES_PERIODO_PRUEBA_AGRARIO} meses
          </strong>
          . Son dos más que los {MESES_PERIODO_PRUEBA_LCT} del art. 92 bis de la LCT, y no hace falta
          convenio colectivo. Lo dice el art. 16 de la Ley 26.727 con el texto del art.{" "}
          {ARTICULOS_REFORMA.art16} de la Ley 27.802. En paralelo, el art.{" "}
          {ARTICULOS_REFORMA.derogatorio} derogó los arts. 18 y 21, que convertían al trabajador de
          temporada en <strong>permanente discontinuo</strong> y le sumaban la antigüedad de todas
          las campañas. Lo que <em>no</em> cambió es el número que más favorece al trabajador: el art. 22
          sigue diciendo que el permanente «en ningún caso» puede cobrar por antigüedad menos de{" "}
          <strong>{MESES_PISO_ART22} meses de sueldo</strong>, el doble del piso de la LCT.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tu caso</h2>
        <p className="text-sm text-zinc-600">
          Elegí la modalidad y cargá las fechas. El artículo 245 sale de la misma cuenta que{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            la calculadora de despido sin causa
          </Link>
          : lo que cambia son el período de prueba y el piso.
        </p>
        <CalculadoraTrabajoAgrario />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El período de prueba rural: de cero a ocho meses en quince años
        </h2>
        <p className="text-sm text-zinc-600">
          Los tres textos del mismo artículo 16, en orden. Esto explica por qué casi todo lo que vas
          a leer sobre el tema está viejo: cada nota se escribió con el texto que regía cuando la
          publicaron.
        </p>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 16, texto original (2011 a julio de 2024): sin período de prueba
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{AGRARIO_TEXTOS.art16Original}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              La oración que decidía todo: «{AGRARIO_TEXTOS.oracionQueSeFueEn2024}».
            </p>
          </blockquote>

          <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 16, texto de la Ley 27.742 (julio de 2024 a marzo de 2026): los{" "}
              {MESES_PERIODO_PRUEBA_LCT} meses de la LCT
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{AGRARIO_TEXTOS.art16Intermedio}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              El art. 98 de la Ley 27.742 borró la prohibición y mandó al art. 92 bis de la LCT:{" "}
              <em>«{AGRARIO_TEXTOS.art92bisPrimeraOracion}»</em>
            </p>
          </blockquote>

          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Art. 16, texto vigente desde el {VIGENCIA_REFORMA}: ocho meses propios
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{AGRARIO_TEXTOS.art16Vigente}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              La oración que entró: «{AGRARIO_TEXTOS.oracionQueEntroEn2026}». Ya no manda a la LCT:
              el régimen agrario fija su propio plazo, y más largo.
            </p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El trabajador permanente discontinuo ya no existe
        </h2>
        <p className="text-sm text-zinc-600">
          Es el cambio que más plata saca de toda la reforma agraria, y el que más se sigue
          publicando al revés. La Ley 27.802 lo hizo con dos pasos el mismo día.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-rose-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-rose-700">
              1 · Derogó la figura (art. 18)
            </p>
            <p className="mt-2 text-sm italic text-zinc-700">«{AGRARIO_TEXTOS.art18Derogado}»</p>
            <p className="mt-2 text-xs text-zinc-600">
              Hoy, en el texto actualizado de InfoLEG, el artículo 18 dice solamente: «Artículo
              derogado por art. {ARTICULOS_REFORMA.derogatorio} de la Ley N° 27.802».
            </p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
              2 · Escribió que no existe (art. 17)
            </p>
            <p className="mt-2 text-sm italic text-zinc-700">
              «{AGRARIO_TEXTOS.oracionAgregadaAlArt17}»
            </p>
            <p className="mt-2 text-xs text-zinc-600">
              Esta oración no estaba: hasta el {VIGENCIA_REFORMA}, el artículo 17 terminaba en
              «tareas ocasionales, accidentales o supletorias». La agregó el art.{" "}
              {ARTICULOS_REFORMA.art17} de la Ley 27.802.
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Y con la figura se fue su indemnización (art. 21, también derogado)
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{AGRARIO_TEXTOS.art21Derogado}»</p>
          <p className="mt-2 text-xs text-zinc-600">
            La oración que decidía la plata era la última:{" "}
            <em>«{AGRARIO_TEXTOS.oracionDelComputo}»</em> Era lo que hacía que diez campañas de tres
            meses valieran treinta meses de antigüedad. Sin ella, cada temporada empieza de cero.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los dos números que quedaron intactos</h2>
        <p className="text-sm text-zinc-600">
          La reforma tocó ocho artículos y derogó tres, pero no tocó los dos que le dan al régimen
          rural sus montos propios. Son los que usa la calculadora.
        </p>
        <div className="space-y-3">
          {[
            {
              art: `Art. 22: piso de ${MESES_PISO_ART22} meses de sueldo`,
              texto: AGRARIO_TEXTOS.art22,
              porQue: `Es el doble del piso del art. 245 de la LCT, que garantiza un mes. Y se calcula «tomando como base la mejor remuneración mensual, normal y habitual». El artículo no nombra el tope de convenio, así que el piso se calcula sobre el sueldo real aunque el art. 245 tenga tope.`,
            },
            {
              art: "Art. 20: el 10% del trabajador temporario",
              texto: AGRARIO_TEXTOS.art20,
              porQue:
                "El temporario no llega a tomarse vacaciones porque el ciclo termina antes. La ley se las paga como un porcentaje de todo lo que cobró en la temporada, además del aguinaldo proporcional.",
            },
            {
              art: "Art. 50: las licencias salen de la LCT",
              texto: AGRARIO_TEXTOS.art50,
              porQue:
                "Por eso el aguinaldo y las vacaciones proporcionales del permanente se calculan con los arts. 123 y 156 de la LCT, igual que en cualquier otro trabajo.",
            },
          ].map((a) => (
            <details
              key={a.art}
              className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-zinc-800">{a.art}</summary>
              <p className="mt-2 text-sm italic text-zinc-600">«{a.texto}»</p>
              <p className="mt-2 text-sm text-zinc-700">{a.porQue}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Lo demás que cambió el Título XI</h2>
        <p className="text-sm text-zinc-600">
          Los otros cuatro artículos que la reforma reescribió o sumó. No entran en la cuenta de la
          liquidación, pero cambian el panorama.
        </p>
        <div className="space-y-3">
          {[
            {
              art: `Art. 12 (por el art. ${ARTICULOS_REFORMA.art12}): el que alquila ya no responde`,
              texto: AGRARIO_TEXTOS.art12Vigente,
              porQue:
                "Quien alquila las tierras o la maquinaria queda «ajeno a dicho vínculo». La empresa que usa a los trabajadores sí responde, pero solo por lo que se generó mientras trabajaron para ella.",
            },
            {
              art: `Art. 34 bis (por el art. ${ARTICULOS_REFORMA.art34bis}): asignaciones familiares del temporario`,
              texto: AGRARIO_TEXTOS.art34bis,
              porQue:
                "Al terminar la temporada, el pase de las asignaciones contributivas a las no contributivas ahora es automático. Es de lo poco que la reforma sumó a favor del trabajador rural.",
            },
            {
              art: `Art. 32 (por el art. ${ARTICULOS_REFORMA.art32}): cómo se fijan los sueldos`,
              texto: AGRARIO_TEXTOS.art32,
              porQue:
                "El piso es el salario mínimo, vital y móvil, y se negocia en la Comisión Nacional de Trabajo Agrario. Por eso el sueldo que cargás en la calculadora sale de tu recibo, no de una escala única.",
            },
            {
              art: `Art. 106 (por el art. ${ARTICULOS_REFORMA.art106}): intereses de las deudas laborales rurales`,
              texto: AGRARIO_TEXTOS.art106,
              porQue:
                "Las deudas laborales del campo ahora se actualizan igual que las del resto del sistema, por el art. 276 de la LCT.",
            },
          ].map((a) => (
            <details
              key={a.art}
              className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-zinc-800">{a.art}</summary>
              <p className="mt-2 text-sm italic text-zinc-600">«{a.texto}»</p>
              <p className="mt-2 text-sm text-zinc-700">{a.porQue}</p>
            </details>
          ))}
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
        <p className="text-sm text-zinc-500">
          Otros regímenes especiales que la misma reforma tocó:{" "}
          <Link
            href="/despido-empleada-domestica"
            className="font-medium text-emerald-700 hover:underline"
          >
            casas particulares
          </Link>
          ,{" "}
          <Link
            href="/repartidores-de-apps"
            className="font-medium text-emerald-700 hover:underline"
          >
            plataformas de reparto
          </Link>{" "}
          y{" "}
          <Link
            href="/despido-plazo-fijo"
            className="font-medium text-emerald-700 hover:underline"
          >
            el contrato a plazo fijo
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {AGRARIO_FUENTES.lista.map((f) => (
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
          Esta página cita el texto oficial de la Ley 26.727 publicado en InfoLEG y los textos
          derogados, sacados de capturas de esa misma página de antes de la reforma. No es un resumen
          de prensa. Es informativa y orientativa: no reemplaza el asesoramiento de un profesional
          ni una liquidación. Consultada el {AGRARIO_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
