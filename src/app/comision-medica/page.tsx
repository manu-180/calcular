import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraComisionMedica } from "@/components/CalculadoraComisionMedica";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { SelloVerificado } from "@/components/SelloVerificado";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  CM_FUENTES,
  CM_TEXTOS,
  CM_VIGENCIA,
  DIAS_PAGO_HOMOLOGACION,
  ETAPAS,
  PLAZO_DICTAMEN_HABILES,
  REGLAS_CM,
} from "@/data/comision-medica";

export const metadata: Metadata = {
  title: "Comisión médica: los 60 días hábiles que te habilitan a ir al juzgado",
  description:
    "Antes de reclamarle a la ART hay que pasar por la comisión médica, y tiene un plazo perentorio: 60 días hábiles administrativos. Vencido, la vía judicial queda expedita sin esperar el dictamen. Calculá tu fecha exacta.",
  alternates: { canonical: "/comision-medica" },
  openGraph: {
    title: "Comisión médica: el plazo que te habilita a demandar a la ART",
    description:
      "60 días hábiles administrativos, perentorios. Vencidos, no hace falta esperar el dictamen. Tu fecha exacta, con feriados descontados.",
    url: "https://calcular.ar/comision-medica",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Comisión médica")}&s=${encodeURIComponent("Los 60 días hábiles del art. 3 de la Ley 27.348")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Es obligatorio pasar por la comisión médica antes de demandar a la ART?",
    a: "Sí, con una excepción. El art. 1° de la Ley 27.348 la define como instancia administrativa previa «de carácter obligatorio y excluyente de toda otra intervención». La excepción está en el mismo artículo: el trabajador de una relación no registrada cuyo empleador no tenía ART (el apartado 1 del art. 28 de la Ley 24.557) no está obligado y tiene la vía judicial expedita.",
  },
  {
    q: "¿Cuánto tiempo tiene la comisión médica para expedirse?",
    a: `${PLAZO_DICTAMEN_HABILES} días hábiles administrativos contados desde la primera presentación debidamente cumplimentada (art. 3°). El plazo es prorrogable, pero sólo por cuestiones de hecho relacionadas con la acreditación del accidente o la enfermedad, y debidamente fundadas.`,
  },
  {
    q: "¿Qué pasa si se vence el plazo y no hay dictamen?",
    a: "Queda expedita la vía judicial. El art. 3° cierra diciendo que «todos los plazos resultarán perentorios y su vencimiento dejará expedita la vía prevista en el artículo 2°». No hay que esperar la resolución: se puede recurrir al fuero laboral. Y el art. 15 dice lo mismo para la acción civil, que también se habilita «cuando se hubiere vencido el plazo legalmente establecido para su dictado».",
  },
  {
    q: "¿Tengo que pagarle al abogado?",
    a: "No. El patrocinio letrado es obligatorio, pero el último párrafo del art. 1° pone los honorarios y los demás gastos a cargo de la aseguradora. Además, «todas las medidas de prueba producidas en cualquier instancia serán gratuitas para el trabajador» (art. 2°). Y el pacto de cuota litis —el porcentaje sobre lo que cobre el trabajador— está prohibido por ley en estos procesos.",
  },
  {
    q: "¿Ante qué comisión médica tengo que presentarme?",
    a: "La elegís vos, entre tres: la del lugar de tu domicilio, la del lugar donde efectivamente prestabas servicios, o la del lugar donde habitualmente te reportás. El art. 1° dice expresamente «a opción del trabajador».",
  },
  {
    q: "Me ofrecen un acuerdo. ¿Puede ser por menos de lo que dice la ley?",
    a: "No. El art. 3° del Anexo I es terminante: «En ningún caso se homologará una propuesta de convenio que contenga un monto de reparación dineraria menor a la que surja de la estricta aplicación de la normativa de la ley 24.557». Por más sí se puede: el Anexo prevé expresamente que, si la disconformidad es sobre el importe, las partes acuerden un monto superior.",
  },
  {
    q: "Firmé la homologación. ¿Cuándo me pagan?",
    a: `Dentro de los ${DIAS_PAGO_HOMOLOGACION} días de notificado el acto, y en tu cuenta sueldo (art. 17 y Anexo I art. 4°). El acto homologatorio hace cosa juzgada administrativa en los términos del art. 15 de la LCT: cierra el reclamo por esa contingencia.`,
  },
  {
    q: "Si apelo, ¿me pagan mientras se discute?",
    a: "Por regla no: los recursos proceden en relación y con efecto suspensivo. Hay dos excepciones con efecto devolutivo, y en las dos el que apela es la ART: cuando lo hace ante la Comisión Médica Central en el supuesto del art. 6° ap. 2 pto. c) de la Ley 24.557, y cuando apela por reagravamiento del accidente o la enfermedad.",
  },
  {
    q: "¿Cuánto tiempo me puede pagar la ART el salario mientras estoy de baja?",
    a: "La incapacidad laboral temporaria cesa a los dos años desde la primera manifestación invalidante. Pero si te reincorporaste y volviste a estar de baja por la misma causa, el art. 7° ap. 3 cambia la medida: continúa «hasta completar dos (2) años efectivos de baja, sumándose todos los períodos». Con recaídas, el tope cae bastante más tarde en el calendario que la fecha de los dos años.",
  },
  {
    q: "Mi empleador dejó de pagarle a la ART. ¿Quedo sin cobertura?",
    a: "No de inmediato. La aseguradora puede extinguir el contrato por dos cuotas impagas, consecutivas o alternadas, pero aun extinguido debe otorgar prestaciones en especie por las contingencias ocurridas dentro de los tres meses posteriores, y después repetirle el costo al empleador. Desde la extinción, el empleador queda en la situación del apartado 1 del art. 28 de la Ley 24.557: no asegurado.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de plazos de la comisión médica (Ley 27.348)",
        url: "https://calcular.ar/comision-medica",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Comisión médica: el trámite obligatorio antes de reclamarle a la ART",
        descripcion:
          "Los 60 días hábiles administrativos del art. 3° de la Ley 27.348 son perentorios: vencidos, la vía judicial queda expedita sin esperar dictamen. Quién está exento, quién paga el abogado y por qué no se puede homologar por menos.",
        url: "/comision-medica",
        modificado: CM_FUENTES.consultadoEl,
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
          Comisión médica: el trámite obligatorio antes de reclamarle a la ART
        </h1>
        <p className="text-zinc-600">
          Nadie cobra una indemnización por accidente de trabajo sin pasar antes por acá. Pero la
          instancia <strong>tiene una puerta de salida y es un reloj</strong>: la comisión médica
          tiene {PLAZO_DICTAMEN_HABILES} días hábiles administrativos para expedirse, el plazo es{" "}
          <strong>perentorio</strong>, y vencido queda expedita la vía judicial sin esperar el
          dictamen. Esa fecha se calcula.
        </p>
      </header>

      <SelloVerificado
        verificadoEl={CM_FUENTES.consultadoEl}
        norma="Ley 27.348, arts. 1° a 3°, 10 a 17 y Anexo I · Ley 24.557, arts. 7°, 27, 28 y 46"
        fuente={CM_FUENTES.principal}
      />

      <RespuestaPrimero actualizado={CM_FUENTES.consultadoEl}>
        <p>
          <strong>
            {PLAZO_DICTAMEN_HABILES} días hábiles administrativos desde la primera presentación
            debidamente cumplimentada
          </strong>{" "}
          (Ley 27.348, art. 3°). Vencidos —y son perentorios— <strong>no hay que esperar</strong>:
          la vía del art. 2° queda expedita. El trámite es{" "}
          <strong>gratis para el trabajador</strong>: el abogado y los gastos los paga la ART, y la
          prueba también. Y quien trabajaba <strong>sin registrar</strong> para un empleador sin
          ART <strong>no está obligado</strong> a esta instancia.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tus fechas</h2>
        <p className="text-sm text-zinc-600">
          Cargá la fecha de la primera presentación. Sale cuándo vence el plazo de la comisión,
          desde qué día podés ir al fuero laboral, hasta cuándo corre tu incapacidad temporaria y
          —si ya hubo acuerdo— cuándo tiene que estar la plata.
        </p>
        <CalculadoraComisionMedica />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">El plazo, con las palabras de la ley</h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm font-semibold text-emerald-900">Ley 27.348, art. 3°</p>
          <p className="mt-1 text-sm text-zinc-700">«{CM_TEXTOS.plazo}»</p>
        </blockquote>
        <p className="text-zinc-600">
          La última oración es la que cambia un caso real y casi no se publica:{" "}
          <strong>los plazos son perentorios</strong>. Un trámite que se estiró más allá de los{" "}
          {PLAZO_DICTAMEN_HABILES} días hábiles no obliga a seguir esperando. Y el art. 15 de la
          misma ley extiende la salida a la acción civil:
        </p>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm text-zinc-700">«{CM_TEXTOS.accionCivil}»</p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Quién no está obligado a pasar por acá</h2>
        <p className="text-zinc-600">
          Es la excepción escrita en el mismo artículo que crea la obligación, y la que más falta
          en las notas: si la relación laboral no estaba registrada y el empleador no había
          contratado ART, no hay instancia previa que agotar.
        </p>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/70 p-4">
          <p className="text-sm font-semibold text-amber-900">Ley 27.348, art. 1°, párrafo 3</p>
          <p className="mt-1 text-sm text-zinc-700">«{CM_TEXTOS.noRegistrado}»</p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">El trámite, paso por paso</h2>
        <ol className="space-y-4">
          {ETAPAS.map((e) => (
            <li key={e.id} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
              <h3 className="font-semibold text-zinc-900">{e.titulo}</h3>
              <p className="mt-1 text-sm text-zinc-600">{e.texto}</p>
              <p className="mt-1 text-xs text-zinc-500">{e.norma}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">El trámite no lo pagás vos</h2>
        <p className="text-zinc-600">
          Tres cláusulas, en dos artículos. La primera pone el abogado y los gastos a cargo de la
          aseguradora:
        </p>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm text-zinc-700">«{CM_TEXTOS.honorarios}»</p>
        </blockquote>
        <p className="text-zinc-600">La segunda, la prueba:</p>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm text-zinc-700">«{CM_TEXTOS.pruebaGratuita}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Y la tercera es la que casi nunca se cuenta, porque prohíbe una práctica extendida:
        </p>
        <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/70 p-4">
          <p className="text-sm text-zinc-700">«{CM_TEXTOS.cuotaLitis}»</p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El acuerdo tiene piso, y el pago tiene plazo
        </h2>
        <p className="text-zinc-600">
          El Anexo I de la ley crea el Servicio de Homologación y le pone un límite que conviene
          conocer antes de sentarse a una audiencia:
        </p>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm font-semibold text-emerald-900">Ley 27.348, Anexo I, art. 3°</p>
          <p className="mt-1 text-sm text-zinc-700">«{CM_TEXTOS.pisoHomologacion}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Por menos de lo que manda la Ley 24.557 no se puede homologar; por más sí, y el propio
          Anexo lo prevé cuando la disconformidad es sobre el importe. Cuánto es ese piso en pesos
          se calcula en{" "}
          <Link href="/indemnizacion-art" className="text-emerald-700 hover:underline">
            indemnización por accidente de trabajo
          </Link>
          . Homologado el acuerdo, corre el reloj del pago:
        </p>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-700">Ley 27.348, Anexo I, art. 4°</p>
          <p className="mt-1 text-sm text-zinc-700">«{CM_TEXTOS.pagoHomologacion}»</p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El reloj que se cuenta mal: dos años, pero ¿de qué?
        </h2>
        <p className="text-zinc-600">
          Mientras dura la incapacidad temporaria la ART paga. El art. 10 de la Ley 27.348
          reescribió el art. 7° de la 24.557 y dejó <strong>dos topes distintos</strong>, no uno.
          Sin recaídas, la ILT cesa por el «transcurso de dos (2) años desde la primera
          manifestación invalidante»: es una fecha del almanaque. Con recaída, el apartado 3 cambia
          la unidad de medida:
        </p>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/70 p-4">
          <p className="text-sm font-semibold text-amber-900">
            Art. 7° ap. 3 de la Ley 24.557 (según el art. 10 de la 27.348)
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{CM_TEXTOS.iltEfectiva}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Dos años <strong>efectivos de baja</strong>, sumando períodos, no dos años de calendario.
          Para quien se reincorporó y recayó, ese tope cae bastante más tarde — y es plata que se
          sigue cobrando. La ILT también cesa antes por alta médica, por declaración de incapacidad
          permanente o por fallecimiento.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Las reglas que deciden un caso real</h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="divide-y divide-zinc-100">
            {REGLAS_CM.map((r) => (
              <div key={r.id} className="px-4 py-3">
                <h3 className="font-semibold text-zinc-900">{r.titulo}</h3>
                <p className="mt-1 text-sm text-zinc-600">{r.texto}</p>
                <p className="mt-1 text-xs text-zinc-500">{r.norma}</p>
              </div>
            ))}
          </div>
        </div>
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
          {CM_FUENTES.lista.map((f) => (
            <li key={f.url}>
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
          Los plazos que se publican acá son los que están en la <strong>ley y en su Anexo</strong>.
          El art. 3° además delega en la Superintendencia de Riesgos del Trabajo el dictado de las
          normas de procedimiento ante las comisiones médicas; los plazos internos de esa
          resolución no se publican en esta página porque no se pudo verificar cuál es su texto
          vigente contra fuente oficial, y una norma procedimental sustituida diría plazos que ya
          no corren. Esta página es informativa y no reemplaza el patrocinio letrado, que en este
          trámite es obligatorio y lo paga la ART. Base normativa: {CM_VIGENCIA.norma}. Consultada
          el {CM_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
