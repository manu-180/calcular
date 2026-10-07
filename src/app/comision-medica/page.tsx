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
  title: "Comisión médica ART: plazo de 60 días hábiles",
  description:
    "Antes de reclamarle a la ART hay que pasar por la comisión médica, que tiene 60 días hábiles. Vencido el plazo, podés ir a juicio. Calculá tu fecha.",
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
    a: "Sí, con una excepción. El art. 1° de la Ley 27.348 la define como un paso administrativo previo «de carácter obligatorio y excluyente de toda otra intervención». La excepción está en el mismo artículo: si trabajabas en negro y tu empleador no tenía ART (el apartado 1 del art. 28 de la Ley 24.557), no estás obligado y podés ir directo a juicio.",
  },
  {
    q: "¿Cuánto tiempo tiene la comisión médica para expedirse?",
    a: `${PLAZO_DICTAMEN_HABILES} días hábiles administrativos desde la primera presentación completa (art. 3°). Se puede extender, pero solo por cuestiones de hecho para probar el accidente o la enfermedad, y con fundamento.`,
  },
  {
    q: "¿Qué pasa si se vence el plazo y no hay dictamen?",
    a: "Podés ir a juicio. El art. 3° termina diciendo que «todos los plazos resultarán perentorios y su vencimiento dejará expedita la vía prevista en el artículo 2°». No hace falta esperar la resolución: podés ir al fuero laboral. Y el art. 15 dice lo mismo para la acción civil, que también se abre «cuando se hubiere vencido el plazo legalmente establecido para su dictado».",
  },
  {
    q: "¿Tengo que pagarle al abogado?",
    a: "No. Tener abogado es obligatorio, pero el último párrafo del art. 1° pone los honorarios y los demás gastos a cargo de la aseguradora. Además, «todas las medidas de prueba producidas en cualquier instancia serán gratuitas para el trabajador» (art. 2°). Y en estos trámites la ley prohíbe el pacto de cuota litis (el porcentaje sobre lo que cobres).",
  },
  {
    q: "¿Ante qué comisión médica tengo que presentarme?",
    a: "La elegís vos, entre tres: la de tu domicilio, la del lugar donde trabajabas, o la del lugar donde te reportás habitualmente. El art. 1° dice expresamente «a opción del trabajador».",
  },
  {
    q: "Me ofrecen un acuerdo. ¿Puede ser por menos de lo que dice la ley?",
    a: "No. El art. 3° del Anexo I es claro: «En ningún caso se homologará una propuesta de convenio que contenga un monto de reparación dineraria menor a la que surja de la estricta aplicación de la normativa de la ley 24.557». Por más, sí: el Anexo prevé que, si el desacuerdo es por el monto, las partes acuerden uno mayor.",
  },
  {
    q: "Firmé la homologación. ¿Cuándo me pagan?",
    a: `Dentro de los ${DIAS_PAGO_HOMOLOGACION} días de notificado, y en tu cuenta sueldo (art. 17 y Anexo I art. 4°). La homologación hace cosa juzgada administrativa en los términos del art. 15 de la LCT: cierra el reclamo por ese accidente o enfermedad.`,
  },
  {
    q: "Si apelo, ¿me pagan mientras se discute?",
    a: "Por regla, no: la apelación frena el pago (efecto suspensivo). Hay dos excepciones en las que no lo frena (efecto devolutivo), y en las dos el que apela es la ART: cuando lo hace ante la Comisión Médica Central en el caso del art. 6° ap. 2 pto. c) de la Ley 24.557, y cuando apela por un empeoramiento del accidente o la enfermedad.",
  },
  {
    q: "¿Cuánto tiempo me puede pagar la ART el salario mientras estoy de baja?",
    a: "La incapacidad laboral temporaria termina a los dos años desde la primera manifestación invalidante. Pero si volviste a trabajar y después te diste de baja otra vez por la misma causa, el art. 7° ap. 3 cambia la cuenta: sigue «hasta completar dos (2) años efectivos de baja, sumándose todos los períodos». Con recaídas, el tope llega bastante más tarde que la fecha de los dos años.",
  },
  {
    q: "Mi empleador dejó de pagarle a la ART. ¿Quedo sin cobertura?",
    a: "No de un día para el otro. La aseguradora puede cortar el contrato por dos cuotas sin pagar, seguidas o salteadas. Pero aunque lo corte, tiene que dar las prestaciones en especie por lo que pase en los tres meses siguientes, y después cobrárselo al empleador. Desde el corte, el empleador queda en la situación del apartado 1 del art. 28 de la Ley 24.557: sin seguro.",
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
          "Los 60 días hábiles administrativos del art. 3° de la Ley 27.348 no se estiran: vencidos, podés ir a juicio sin esperar el dictamen. Quién no tiene que pasar por la comisión, quién paga el abogado y por qué no se puede homologar por menos.",
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
          Nadie cobra una indemnización por accidente de trabajo sin pasar antes por acá. Pero este
          paso <strong>tiene un límite de tiempo</strong>: la comisión médica tiene{" "}
          {PLAZO_DICTAMEN_HABILES} días hábiles administrativos para resolver, el plazo{" "}
          <strong>no se estira</strong>, y cuando vence podés ir a juicio sin esperar el dictamen.
          Esa fecha se puede calcular.
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
            completa
          </strong>{" "}
          (Ley 27.348, art. 3°). Ese plazo no se estira: cuando vence,{" "}
          <strong>no tenés que seguir esperando</strong> y podés ir a juicio por la vía del art. 2°.
          El trámite es <strong>gratis para el trabajador</strong>: el abogado, los gastos y la
          prueba los paga la ART. Y si trabajabas <strong>sin registrar</strong> para un empleador
          sin ART, <strong>no estás obligado</strong> a pasar por la comisión.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tus fechas</h2>
        <p className="text-sm text-zinc-600">
          Cargá la fecha de la primera presentación. Vas a ver cuándo vence el plazo de la
          comisión, desde qué día podés ir al fuero laboral, hasta cuándo corre tu incapacidad
          temporaria y, si ya hubo acuerdo, cuándo tiene que estar la plata.
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
          La última oración es la que cambia un caso real, y casi no se publica:{" "}
          <strong>los plazos son perentorios</strong> (no se estiran). Si el trámite pasó los{" "}
          {PLAZO_DICTAMEN_HABILES} días hábiles, no tenés que seguir esperando. Y el art. 15 de la
          misma ley abre la misma salida para la acción civil:
        </p>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm text-zinc-700">«{CM_TEXTOS.accionCivil}»</p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Quién no está obligado a pasar por acá</h2>
        <p className="text-zinc-600">
          Es la excepción que está en el mismo artículo que crea la obligación, y la que más falta
          en las notas: si trabajabas sin registrar y el empleador no había contratado ART, no
          tenés que pasar antes por la comisión. Si la ART te rechazó el caso, mirá{" "}
          <Link href="/rechazo-art" className="text-emerald-700 hover:underline">
            qué hacer cuando la ART rechaza el accidente
          </Link>
          .
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
          Son tres cláusulas, en dos artículos. La primera pone el abogado y los gastos a cargo de
          la aseguradora:
        </p>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm text-zinc-700">«{CM_TEXTOS.honorarios}»</p>
        </blockquote>
        <p className="text-zinc-600">La segunda, la prueba:</p>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm text-zinc-700">«{CM_TEXTOS.pruebaGratuita}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Y la tercera casi nunca se cuenta, porque prohíbe algo muy común:
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
          El Anexo I de la ley crea el Servicio de Homologación y le pone un límite que te conviene
          conocer antes de ir a una audiencia:
        </p>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm font-semibold text-emerald-900">Ley 27.348, Anexo I, art. 3°</p>
          <p className="mt-1 text-sm text-zinc-700">«{CM_TEXTOS.pisoHomologacion}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Por menos de lo que manda la Ley 24.557 no se puede homologar. Por más sí, y el mismo
          Anexo lo prevé cuando el desacuerdo es por el monto. Cuánto es ese piso en pesos lo
          calculás en{" "}
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
          Mientras dura la incapacidad temporaria (ILT), la ART paga. El art. 10 de la Ley 27.348
          reescribió el art. 7° de la 24.557 y dejó <strong>dos topes distintos</strong>, no uno.
          Sin recaídas, la ILT termina por el «transcurso de dos (2) años desde la primera
          manifestación invalidante»: es una fecha del almanaque. Con recaída, el apartado 3 cambia
          la forma de contar:
        </p>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/70 p-4">
          <p className="text-sm font-semibold text-amber-900">
            Art. 7° ap. 3 de la Ley 24.557 (según el art. 10 de la 27.348)
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{CM_TEXTOS.iltEfectiva}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Dos años <strong>efectivos de baja</strong>, sumando períodos, no dos años de calendario.
          Si volviste a trabajar y recaíste, ese tope llega bastante más tarde, y es plata que
          seguís cobrando. La ILT también termina antes por alta médica, por declaración de
          incapacidad permanente o por fallecimiento.
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
              </a>
              : {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Los plazos de esta página son los que están en la <strong>ley y en su Anexo</strong>. El
          art. 3° además le encarga a la Superintendencia de Riesgos del Trabajo las normas de
          procedimiento ante las comisiones médicas. Los plazos internos de esa resolución no los
          publicamos, porque no pudimos verificar su texto vigente contra una fuente oficial, y una
          norma reemplazada diría plazos que ya no corren. Esta página es informativa y no
          reemplaza al abogado, que en este trámite es obligatorio y lo paga la ART. Base
          normativa: {CM_VIGENCIA.norma}. Consultada el {CM_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
