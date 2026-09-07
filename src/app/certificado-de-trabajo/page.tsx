import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraCertificadoTrabajo } from "@/components/CalculadoraCertificadoTrabajo";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  CERTIFICADO_FUENTES,
  CERTIFICADO_TEXTOS,
  EN_TRABAJO_EN_BLANCO,
  FORMAS_DE_CUMPLIR,
  FORMULARIO,
  MULTIPLICADOR_MULTA,
  PLAZO_ENTREGA_DIAS_HABILES,
  SERVICIO_TRABAJADOR,
  SISTEMA_EMPLEADOR,
  VIGENCIA_BASES,
  VIGENCIA_REFORMA,
} from "@/data/certificado-trabajo";

export const metadata: Metadata = {
  title: "Certificado de trabajo (art. 80 LCT): plazo de 45 días y la multa que ya no existe",
  description: `Desde el ${VIGENCIA_REFORMA} el artículo 80 de la LCT da ${PLAZO_ENTREGA_DIAS_HABILES} días hábiles para entregar los certificados y ya no prevé la indemnización de ${MULTIPLICADOR_MULTA} sueldos. Calculá la fecha límite exacta y qué régimen se aplica según cuándo terminó tu contrato.`,
  alternates: { canonical: "/certificado-de-trabajo" },
  openGraph: {
    title: "Certificado de trabajo (art. 80 LCT): plazo, multa y qué cambió en 2026",
    description: `El artículo 80 fue sustituido: ahora fija un plazo de ${PLAZO_ENTREGA_DIAS_HABILES} días hábiles y no tiene multa tarifada. Calculá la fecha límite y el régimen que se aplica a tu caso.`,
    url: "https://calcular.ar/certificado-de-trabajo",
    images: [
      {
        url: "/og?t=Certificado%20de%20trabajo&s=Art.%2080%20LCT%20seg%C3%BAn%20la%20Ley%2027.802",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuánto tiempo tiene el empleador para darme el certificado de trabajo?",
    a: `${PLAZO_ENTREGA_DIAS_HABILES} días hábiles desde que se extinguió el contrato, por cualquier causa. Lo dice el artículo 80 de la Ley de Contrato de Trabajo con el texto que le dio el artículo 25 de la Ley 27.802 (B.O. ${VIGENCIA_REFORMA}). Es un plazo nuevo: hasta esa reforma la LCT no fijaba ninguno, y el único plazo que existía era el del artículo 3 del Decreto 146/2001, que no era para entregar sino para habilitar al trabajador a intimar (30 días corridos). La calculadora de arriba te da la fecha exacta descontando fines de semana y feriados nacionales.`,
  },
  {
    q: "¿Sigue existiendo la multa de tres sueldos del artículo 80?",
    a: `No en el texto vigente. Ese importe nunca estuvo en el artículo 80 original: lo agregó como último párrafo el artículo 45 de la Ley 25.345 en el año 2000. Ese artículo 45 fue derogado por el artículo 99 de la Ley 27.742 (vigente desde el ${VIGENCIA_BASES}) y, además, el artículo 80 entero fue sustituido el ${VIGENCIA_REFORMA} por un texto que no tiene indemnización tarifada. Buscando la frase «tres veces la mejor remuneración» en el texto actualizado completo de la Ley de Contrato de Trabajo no aparece en ningún artículo. Esto es exactamente lo contrario de lo que sigue publicando la mayoría de las notas, que reproducen el párrafo derogado.`,
  },
  {
    q: "Entonces, si no me lo entregan, ¿no puedo reclamar nada?",
    a: "La obligación sigue existiendo y sigue siendo exigible: lo que ya no hay es un importe fijado por la ley para ese incumplimiento. Un reclamo por los perjuicios concretos que la falta del certificado te haya causado —no poder acreditar antigüedad, quedar fuera de una búsqueda laboral, no poder iniciar un trámite previsional— queda regido por las reglas generales, sin tarifa, y el monto lo determina un juez sobre la prueba del caso. Es una diferencia grande respecto del régimen anterior, donde el importe estaba escrito y se calculaba solo. Para eso conviene asesorarse con un profesional: esta página informa qué dicen las normas, no reemplaza ese consejo.",
  },
  {
    q: "Mi contrato terminó antes de marzo de 2026, ¿qué régimen se aplica?",
    a: `Ninguna de estas normas es retroactiva, así que manda la fecha de extinción. Hasta el 8 de julio de 2024 regía plenamente el párrafo con la indemnización de ${MULTIPLICADOR_MULTA} veces la mejor remuneración mensual, normal y habitual, con dos requisitos: esperar 30 días corridos desde la extinción (Decreto 146/2001, artículo 3) y recién ahí mandar el requerimiento fehaciente, que le daba al empleador 2 días hábiles para cumplir. Entre el ${VIGENCIA_BASES} y el 5 de marzo de 2026 hay una zona gris: el artículo 80 todavía tenía ese párrafo, pero el artículo que lo había incorporado ya estaba derogado, y si eso lo borra o no se discute en tribunales con fallos en los dos sentidos. Desde el ${VIGENCIA_REFORMA} rige el texto nuevo. La calculadora te ubica en el régimen según la fecha que cargues.`,
  },
  {
    q: "¿Cómo se saca hoy el certificado de trabajo?",
    a: `Lo genera el empleador con el formulario ${FORMULARIO} «Certificado de Trabajo Artículo 80 - LCT» desde el sistema «${SISTEMA_EMPLEADOR}» del sitio de ARCA, entrando con Clave Fiscal nivel 2 o superior. Lo reglamentó la Resolución General ARCA 5848/2026 (B.O. 18/5/2026), que además abrogó la vieja RG 2.316. Puede emitirse en formato digital —y en ese caso no necesita firma digital: alcanza con la validación de identidad del ingreso con Clave Fiscal— o en papel por duplicado, firmado por empleador y trabajador, con el original para el trabajador. El trabajador lo ve en el servicio «${SERVICIO_TRABAJADOR}» del sitio de ARCA.`,
  },
  {
    q: "¿Qué datos tiene que contener?",
    a: "Según el artículo 80 vigente: los datos relativos a la relación laboral, la función desempeñada, las capacitaciones realizadas y la constancia del ingreso de los aportes y contribuciones al Sistema de Seguridad Social. La mención expresa a las capacitaciones es nueva del texto de 2026. Para armarlo, ARCA usa la información de sus propias bases: altas, bajas y modificaciones registradas, las liquidaciones de sueldos informadas y las declaraciones juradas de aportes y contribuciones. Si la certificación abarca períodos anteriores a julio de 1994, esos tramos se complementan con una constancia que confecciona el empleador según su libro de sueldos.",
  },
  {
    q: "¿Es lo mismo que el certificado de servicios y remuneraciones de ANSES?",
    a: "No, son dos documentos distintos que suelen pedirse juntos. El certificado de trabajo es el del artículo 80 de la LCT. El certificado de servicios y remuneraciones es el del inciso g) del artículo 12 de la Ley 24.241, se usa para trámites previsionales y se confecciona con el servicio informático de ANSES, al que hoy se accede desde el mismo sistema «Simplificación Registral» de ARCA (artículo 5 de la RG 5848/2026).",
  },
  {
    q: "¿El empleador tiene que mandármelo a mi casa?",
    a: "No. El artículo habla de «poner a disposición»: alcanza con tenerlo disponible en formato físico en la sede de la empresa, o en formato digital por cualquier sistema que permita acreditar la entrega de manera fehaciente. Y hay un tercer supuesto, el más novedoso: cuando la información que el artículo exige ya está disponible para el trabajador en el sitio del organismo de la seguridad social o en el sistema de ARCA, la obligación se considera cumplida respecto de los certificados alcanzados por esa información.",
  },
];

export default function CertificadoDeTrabajoPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora del certificado de trabajo (art. 80 LCT): plazo y régimen aplicable",
        url: "https://calcular.ar/certificado-de-trabajo",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Certificado de trabajo (art. 80 LCT): plazo de 45 días y la multa que ya no existe",
        descripcion:
          "El art. 80 de la LCT fue sustituido por la Ley 27.802: fija 45 días hábiles para entregar los certificados y no prevé indemnización tarifada. Reglamentado por la RG ARCA 5848/2026.",
        url: "/certificado-de-trabajo",
        modificado: CERTIFICADO_FUENTES.consultadoEl,
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
          Certificado de trabajo: {PLAZO_ENTREGA_DIAS_HABILES} días hábiles y una multa que dejó de
          existir
        </h1>
        <p className="text-zinc-600">
          Durante veinticinco años la respuesta a «no me dan el certificado de trabajo» fue un
          número: {MULTIPLICADOR_MULTA} veces la mejor remuneración. Ese número no está en la ley de
          hoy. El artículo 80 de la Ley de Contrato de Trabajo fue sustituido entero y ahora dice
          otra cosa: un plazo, tres formas de cumplirlo y ninguna indemnización tarifada. Acá está
          el texto vigente, la fecha exacta de tu caso y el detalle de qué régimen te toca.
        </p>
      </header>

      <RespuestaPrimero actualizado={CERTIFICADO_FUENTES.consultadoEl}>
        <p>
          <strong>
            El empleador tiene {PLAZO_ENTREGA_DIAS_HABILES} días hábiles desde la extinción del
            contrato
          </strong>{" "}
          para entregar o poner a disposición los certificados (art. 80 LCT, texto según el art. 25
          de la Ley 27.802, B.O. {VIGENCIA_REFORMA}).{" "}
          <strong>El texto vigente ya no prevé la indemnización de {MULTIPLICADOR_MULTA} sueldos</strong>
          : ese párrafo lo había agregado el art. 45 de la Ley 25.345, artículo derogado por el art.
          99 de la Ley 27.742 desde el {VIGENCIA_BASES}. Como ninguna de las dos normas es
          retroactiva, lo que decide qué se puede reclamar es{" "}
          <strong>la fecha en que terminó el contrato</strong>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Tu caso, con fechas</h2>
        <p className="text-sm text-zinc-600">
          Cargá cuándo terminó el contrato. La calculadora te dice qué régimen se aplica, la fecha
          límite exacta del plazo (descontando fines de semana y feriados nacionales, con la lista
          de días salteados) y, para los regímenes anteriores, el cronograma completo de la
          intimación.
        </p>
        <CalculadoraCertificadoTrabajo />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 80 — Entrega de certificados (texto vigente)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{CERTIFICADO_TEXTOS.art80Vigente}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">{CERTIFICADO_TEXTOS.art80Nota}</p>
            <p className="mt-1 text-xs text-zinc-500">{CERTIFICADO_TEXTOS.art80NotaArca}</p>
          </blockquote>

          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              El último párrafo que ya no está — la multa de {MULTIPLICADOR_MULTA} sueldos
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{CERTIFICADO_TEXTOS.parrafoDerogado}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">
              {CERTIFICADO_TEXTOS.parrafoDerogadoNota} El texto actualizado del art. 80 tampoco lo
              contiene: la Ley 27.802 sustituyó el artículo completo.
            </p>
          </blockquote>

          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Decreto 146/2001, art. 3 — los 30 días corridos antes de intimar
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{CERTIFICADO_TEXTOS.dec146art3}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Reglamentaba el párrafo derogado. Sigue importando para los reclamos por extinciones
              anteriores: una intimación cursada antes de esos 30 días se discutía como prematura.
            </p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Las tres formas de cumplir que enumera el artículo
        </h2>
        <p className="text-sm text-zinc-600">
          La obligación no es «entregar en mano»: el artículo dice «poner a disposición» y admite
          tres caminos. El tercero es la novedad de fondo de la reforma.
        </p>
        <ul className="grid gap-2 sm:grid-cols-3">
          {FORMAS_DE_CUMPLIR.map((f) => (
            <li
              key={f.clave}
              className="rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-600 shadow-sm"
            >
              <span className="block font-semibold text-zinc-900">{f.titulo}</span>
              <span className="mt-1 block">{f.detalle}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Cómo se emite hoy: {FORMULARIO} en {SISTEMA_EMPLEADOR}
        </h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">RG ARCA 5848/2026, art. 1</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{CERTIFICADO_TEXTOS.rg5848art1}»</p>
          <p className="mt-2 text-xs text-zinc-500">
            B.O. 18/5/2026. Abrogó la RG 2.316 —el sistema anterior— y derogó el Título III de la
            RG 5.250.
          </p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Del otro lado del mostrador, el trabajador entra al servicio «{SERVICIO_TRABAJADOR}» del
          sitio de ARCA con su CUIL y Clave Fiscal nivel 2 (o desde el home banking del banco donde
          cobra el sueldo, si está homologado) y ahí tiene:
        </p>
        <ul className="space-y-2">
          {EN_TRABAJO_EN_BLANCO.map((item) => (
            <li
              key={item}
              className="rounded-xl border border-zinc-200 bg-white p-3 text-sm text-zinc-600 shadow-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-zinc-800">{f.q}</summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-2 text-sm text-zinc-600">
        <h2 className="text-xl font-bold text-zinc-900">Si estás liquidando un despido</h2>
        <p>
          El certificado es uno de los tramos del final de la relación. Los otros están acá:{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            indemnización por despido
          </Link>
          ,{" "}
          <Link href="/vacaciones" className="font-medium text-emerald-700 hover:underline">
            vacaciones no gozadas
          </Link>
          ,{" "}
          <Link href="/aguinaldo" className="font-medium text-emerald-700 hover:underline">
            aguinaldo proporcional
          </Link>{" "}
          y{" "}
          <Link href="/desempleo" className="font-medium text-emerald-700 hover:underline">
            prestación por desempleo
          </Link>
          . Si lo que cambió en tu caso es la base de cálculo, mirá también{" "}
          <Link href="/propinas" className="font-medium text-emerald-700 hover:underline">
            qué pasó con las propinas
          </Link>
          , otro artículo que la misma reforma dio vuelta.
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {CERTIFICADO_FUENTES.lista.map((f) => (
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
          Esta página aplica los textos oficiales publicados en InfoLEG y en el Boletín Oficial, no
          un resumen de prensa. Es informativa y orientativa: no reemplaza el asesoramiento de un
          profesional. Consultada el {CERTIFICADO_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
