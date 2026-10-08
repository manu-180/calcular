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
  title: "Certificado de trabajo (art. 80 LCT): plazo de 45 días",
  description: `Desde el 6/3/2026 el empleador tiene ${PLAZO_ENTREGA_DIAS_HABILES} días hábiles para entregar los certificados y ya no existe la multa de ${MULTIPLICADOR_MULTA} sueldos. Calculá tu fecha límite.`,
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
    a: `${PLAZO_ENTREGA_DIAS_HABILES} días hábiles desde que terminó el contrato, por la causa que sea. Lo dice el artículo 80 de la Ley de Contrato de Trabajo, con el texto que le dio el artículo 25 de la Ley 27.802 (B.O. ${VIGENCIA_REFORMA}). Es un plazo nuevo: hasta esa reforma la LCT no fijaba ninguno. El único plazo que había era el del artículo 3 del Decreto 146/2001, que no era para entregar sino para que el trabajador pudiera intimar (30 días corridos). La calculadora de arriba te da la fecha exacta, sin contar fines de semana ni feriados nacionales.`,
  },
  {
    q: "¿Sigue existiendo la multa de tres sueldos del artículo 80?",
    a: `No en el texto vigente. Ese monto nunca estuvo en el artículo 80 original: lo agregó como último párrafo el artículo 45 de la Ley 25.345, en el año 2000. Ese artículo 45 lo derogó el artículo 99 de la Ley 27.742 (vigente desde el ${VIGENCIA_BASES}). Además, el ${VIGENCIA_REFORMA} se reemplazó el artículo 80 entero por un texto sin indemnización fija. Si buscás «tres veces la mejor remuneración» en el texto actualizado completo de la Ley de Contrato de Trabajo, no aparece en ningún artículo. Es justo lo contrario de lo que sigue publicando la mayoría de las notas, que copian el párrafo derogado.`,
  },
  {
    q: "Entonces, si no me lo entregan, ¿no puedo reclamar nada?",
    a: "Podés: la obligación sigue y se puede exigir. Lo que ya no hay es un monto fijado por ley para ese incumplimiento. Si la falta del certificado te causó un daño concreto (no poder probar tu antigüedad, quedar afuera de una búsqueda laboral, no poder iniciar un trámite previsional), lo reclamás por las reglas generales, sin tarifa, y el monto lo define un juez según la prueba. Es un cambio grande frente al régimen anterior, donde el monto estaba escrito y se calculaba solo. Para eso conviene que te asesore un profesional: esta página te cuenta qué dicen las normas, no reemplaza ese consejo.",
  },
  {
    q: "Mi contrato terminó antes de marzo de 2026, ¿qué régimen se aplica?",
    a: `Ninguna de estas normas es retroactiva, así que manda la fecha en que terminó el contrato. Hasta el 8 de julio de 2024 regía de lleno el párrafo con la indemnización de ${MULTIPLICADOR_MULTA} veces la mejor remuneración mensual, normal y habitual. Tenía dos requisitos: esperar 30 días corridos desde el final del contrato (Decreto 146/2001, artículo 3) y recién ahí intimar de forma fehaciente, lo que le daba al empleador 2 días hábiles para cumplir. Entre el ${VIGENCIA_BASES} y el 5 de marzo de 2026 hay una zona gris: el artículo 80 todavía tenía ese párrafo, pero el artículo que lo había agregado ya estaba derogado. Si eso lo borra o no, se discute en los tribunales, con fallos para los dos lados. Desde el ${VIGENCIA_REFORMA} rige el texto nuevo. La calculadora te dice qué régimen te toca según la fecha que cargues.`,
  },
  {
    q: "¿Cómo se saca hoy el certificado de trabajo?",
    a: `Lo genera el empleador con el formulario ${FORMULARIO} «Certificado de Trabajo Artículo 80 - LCT», desde el sistema «${SISTEMA_EMPLEADOR}» del sitio de ARCA, con Clave Fiscal nivel 2 o superior. Lo reglamentó la Resolución General ARCA 5848/2026 (B.O. 18/5/2026), que además dejó sin efecto la vieja RG 2.316. Se puede emitir en formato digital (y ahí no necesita firma digital: alcanza con haber entrado con Clave Fiscal) o en papel por duplicado, firmado por empleador y trabajador, con el original para el trabajador. El trabajador lo ve en el servicio «${SERVICIO_TRABAJADOR}» del sitio de ARCA.`,
  },
  {
    q: "¿Qué datos tiene que contener?",
    a: "Según el artículo 80 vigente: los datos de la relación laboral, la función que cumplías, las capacitaciones que hiciste y la constancia de que se pagaron los aportes y contribuciones a la Seguridad Social. Lo de las capacitaciones es nuevo del texto de 2026. Para armarlo, ARCA usa sus propios datos: altas, bajas y cambios registrados, las liquidaciones de sueldos informadas y las declaraciones juradas de aportes y contribuciones. Si el certificado incluye períodos anteriores a julio de 1994, esos tramos se completan con una constancia que hace el empleador según su libro de sueldos.",
  },
  {
    q: "¿Es lo mismo que el certificado de servicios y remuneraciones de ANSES?",
    a: "No. Son dos documentos distintos que suelen pedirse juntos. El certificado de trabajo es el del artículo 80 de la LCT. El certificado de servicios y remuneraciones es el del inciso g) del artículo 12 de la Ley 24.241: se usa para trámites jubilatorios y se arma con el sistema de ANSES, al que hoy se entra desde el mismo sistema «Simplificación Registral» de ARCA (artículo 5 de la RG 5848/2026).",
  },
  {
    q: "¿El empleador tiene que mandármelo a mi casa?",
    a: "No. El artículo habla de «poner a disposición»: alcanza con tenerlo en papel en la empresa, o en digital por cualquier sistema que deje constancia segura de la entrega. Y hay una tercera opción, la más nueva: si la información que pide el artículo ya está disponible para el trabajador en el sitio de la seguridad social o en el sistema de ARCA, la obligación se da por cumplida para los certificados que cubre esa información.",
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
        titulo: "Certificado de trabajo (art. 80 LCT): plazo de 45 días",
        descripcion:
          "La Ley 27.802 reemplazó el art. 80 de la LCT: da 45 días hábiles para entregar los certificados y ya no tiene indemnización fija. Lo reglamentó la RG ARCA 5848/2026.",
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
          Durante veinticinco años, la respuesta a «no me dan el certificado de trabajo» fue un
          número: {MULTIPLICADOR_MULTA} veces la mejor remuneración. Ese número no está en la ley de
          hoy. El artículo 80 de la Ley de Contrato de Trabajo se reemplazó entero y ahora dice otra
          cosa: un plazo, tres formas de cumplirlo y ninguna indemnización fija. Acá tenés el texto
          vigente, la fecha exacta de tu caso y qué régimen te toca.
        </p>
      </header>

      <RespuestaPrimero actualizado={CERTIFICADO_FUENTES.consultadoEl}>
        <p>
          <strong>
            El empleador tiene {PLAZO_ENTREGA_DIAS_HABILES} días hábiles desde que termina el
            contrato
          </strong>{" "}
          para entregar o poner a disposición los certificados (art. 80 LCT, texto según el art. 25
          de la Ley 27.802, B.O. {VIGENCIA_REFORMA}).{" "}
          <strong>El texto vigente ya no tiene la indemnización de {MULTIPLICADOR_MULTA} sueldos</strong>
          . Ese párrafo lo había agregado el art. 45 de la Ley 25.345, que derogó el art. 99 de la
          Ley 27.742 desde el {VIGENCIA_BASES}. Como ninguna de las dos normas es retroactiva, lo que
          decide qué podés reclamar es <strong>la fecha en que terminó el contrato</strong>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Tu caso, con fechas</h2>
        <p className="text-sm text-zinc-600">
          Cargá cuándo terminó el contrato. La calculadora te dice qué régimen se aplica y la fecha
          límite exacta (sin contar fines de semana ni feriados nacionales, con la lista de días que
          saltea). Para los regímenes anteriores, te da también el cronograma completo de la
          intimación.
        </p>
        <CalculadoraCertificadoTrabajo />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué dice exactamente la norma</h2>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              LCT, art. 80: entrega de certificados (texto vigente)
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">
              «{CERTIFICADO_TEXTOS.art80Vigente}»
            </p>
            <p className="mt-2 text-xs text-zinc-500">{CERTIFICADO_TEXTOS.art80Nota}</p>
            <p className="mt-1 text-xs text-zinc-500">{CERTIFICADO_TEXTOS.art80NotaArca}</p>
          </blockquote>

          <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              El último párrafo que ya no está: la multa de {MULTIPLICADOR_MULTA} sueldos
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
              Decreto 146/2001, art. 3: los 30 días corridos antes de intimar
            </p>
            <p className="mt-1 text-sm italic text-zinc-700">«{CERTIFICADO_TEXTOS.dec146art3}»</p>
            <p className="mt-2 text-xs text-zinc-500">
              Reglamentaba el párrafo derogado. Sigue importando para los reclamos por contratos que
              terminaron antes: una intimación enviada antes de esos 30 días se discutía por
              apurada.
            </p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Las tres formas de cumplir que enumera el artículo
        </h2>
        <p className="text-sm text-zinc-600">
          La obligación no es «entregar en mano»: el artículo dice «poner a disposición» y acepta
          tres caminos. El tercero es lo realmente nuevo de la reforma.
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
            B.O. 18/5/2026. Dejó sin efecto la RG 2.316 (el sistema anterior) y derogó el Título III de la
            RG 5.250.
          </p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          Del lado del trabajador: entrás al servicio «{SERVICIO_TRABAJADOR}» del sitio de ARCA con
          tu CUIL y Clave Fiscal nivel 2 (o desde el home banking del banco donde cobrás el sueldo,
          si está habilitado) y ahí tenés:
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
            <details key={f.q} className="ca-acordeon rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <summary className="cursor-pointer font-semibold text-zinc-800">{f.q}</summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-2 text-sm text-zinc-600">
        <h2 className="text-xl font-bold text-zinc-900">Si estás liquidando un despido</h2>
        <p>
          El certificado es una de las cosas que hay que resolver cuando termina el trabajo. Las
          otras están acá:{" "}
          <Link href="/indemnizacion" className="font-medium text-emerald-700 hover:underline">
            indemnización por despido
          </Link>
          ,{" "}
          <Link href="/renuncia" className="font-medium text-emerald-700 hover:underline">
            liquidación final por renuncia
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
          , otro artículo que la misma reforma dio vuelta. Y guardá tus recibos: mirá{" "}
          <Link href="/conservacion-de-recibos" className="font-medium text-emerald-700 hover:underline">
            cuánto tiempo hay que guardar los recibos de sueldo
          </Link>
          .
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
              </a>
              : {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Esta página usa los textos oficiales publicados en InfoLEG y en el Boletín Oficial, no un
          resumen de prensa. Es informativa: no reemplaza el consejo de un profesional. Consultada el{" "}
          {CERTIFICADO_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
