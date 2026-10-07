import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraPlataformas } from "@/components/CalculadoraPlataformas";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  PLATAFORMAS_FUENTES,
  PLATAFORMAS_TEXTOS,
  QUE_DA_Y_QUE_NO,
  VIGENCIA_REGIMEN,
} from "@/data/plataformas";

export const metadata: Metadata = {
  title: "Repartidores y conductores de apps: cuánto te queda",
  description:
    "Desde la Ley 27.802 son prestadores independientes. Calculá tu categoría de monotributo, cuánto te queda limpio por mes y la diferencia con un empleado.",
  alternates: { canonical: "/repartidores-de-apps" },
  openGraph: {
    title: "Repartidores y conductores de apps: la cuenta que nadie publica",
    description:
      "El Título XII de la Ley 27.802 creó un régimen entero para las plataformas. Acá está el texto oficial y, sobre todo, el número: cuánto te queda por mes y cuánto vale lo que no cobrás.",
    url: "https://calcular.ar/repartidores-de-apps",
    images: [
      {
        url: "/og?t=Repartidores%20de%20apps&s=Cu%C3%A1nto%20te%20queda%20por%20mes%20con%20la%20Ley%2027.802",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Un repartidor de app es empleado en relación de dependencia?",
    a: `No, desde el ${VIGENCIA_REGIMEN}. El artículo 1º de la Ley 27.802 reescribió el artículo 2° de la Ley de Contrato de Trabajo y le sumó un inciso f): la LCT no se aplica «a los prestadores independientes de plataformas tecnológicas conforme la regulación específica». Esa regulación es el Título XII de la misma ley (artículos 119 a 128), que arma un régimen propio. Antes la respuesta dependía de cada caso y de los jueces; ahora la escribió la ley.`,
  },
  {
    q: "¿Tengo que estar inscripto en el monotributo para trabajar con la app?",
    a: "Sí, y no es un consejo contable: es una obligación del régimen. El artículo 125 inciso 2 dice que, para usar las plataformas, el prestador debe «estar inscripto debidamente ante las autoridades fiscales correspondientes y cumplir con todas sus obligaciones tributarias y de seguridad social», y agrega que deberá «hacer los pagos de los aportes respectivos a través de los cuales tendrán acceso a la Prestación Básica Universal (PBU), el retiro por invalidez o la pensión por fallecimiento, previstas en el artículo 17 de la ley 24.241 (…) y a las prestaciones del Sistema Nacional del Seguro de Salud». Por eso la cuota del monotributo se resta de lo que cobrás: es parte del costo de trabajar así.",
  },
  {
    q: "¿Qué categoría de monotributo me corresponde?",
    a: "La que corresponde a lo que facturaste en los últimos 12 meses, en la columna de servicios (repartir o llevar personas es un servicio, no venta de cosas). Si trabajás en varias apps, se suma todo: la categoría mira el total facturado, no cada plataforma por separado. La calculadora de esta página parte de tu promedio mensual y lo lleva al año. Para simular la recategorización con lo que cobraste cada mes, usá la calculadora de monotributo.",
  },
  {
    q: "¿Cobro aguinaldo?",
    a: "No. El aguinaldo está en el artículo 121 de la Ley de Contrato de Trabajo, y esa ley no se te aplica. La cuenta: un empleado cobra 13 pagos al año y vos 12. Encima está el plus de vacaciones, porque el artículo 155 inciso a) manda pagar cada día de vacaciones dividiendo el sueldo por 25 en lugar de por 30. Sumando las dos cosas, un empleado que se lleva lo mismo que vos por mes termina el año con alrededor de un 9% más.",
  },
  {
    q: "¿Las plataformas tienen que darme ART?",
    a: "No, y conviene tener clara la diferencia. Lo que el artículo 126 inciso 6 les exige es un seguro de accidentes personales cuya cobertura mínima contemple «el fallecimiento accidental, la incapacidad total y/o parcial permanente derivada de la prestación del servicio, los gastos médicos y farmacéuticos, así como los costos funerarios». No es una ART: no te paga mientras estás temporalmente incapacitado ni cubre la recalificación profesional. Además, el mismo inciso aclara que quién paga ese seguro «será objeto de libre acuerdo entre las partes involucradas», y que darlo no es indicio de relación laboral.",
  },
  {
    q: "¿Me pueden obligar a conectarme una cantidad mínima de horas?",
    a: "No. El artículo 121 dice que el prestador «será libre de conectarse a cualquiera de las plataformas (…) durante los horarios y en el tiempo que estime convenientes, pudiendo el prestador libremente aceptar y/o rechazar solicitudes». Y el artículo 126 lo baja a derechos concretos: rechazar pedidos sin dar explicaciones (inciso 1), conectarte «sin tener la exigibilidad de una periodicidad o frecuencia mínima» (inciso 8), registrarte sin que eso te obligue a conectarte (inciso 9) e interrumpir el uso de la aplicación sin aviso previo (inciso 10).",
  },
  {
    q: "¿Las propinas son mías?",
    a: "Enteras. El artículo 126 inciso 7 dice que el prestador tiene derecho «a percibir el cien por ciento (100%) del monto que los usuarios agreguen en concepto de gratificación, recompensa o propina». La plataforma puede sugerir un monto «a efectos ilustrativos», pero el usuario lo puede cambiar. Es una regla distinta de la de las propinas de los empleados, que desde 2026 tienen su propio artículo en la LCT.",
  },
  {
    q: "Si me bloquean la cuenta, ¿tengo derecho a una explicación?",
    a: "Sí. El artículo 126 inciso 2 te da derecho a «recibir una explicación de los motivos por los cuales la plataforma suspenda o imposibilite, parcial o totalmente, el acceso a la infraestructura digital», a hablar con operadores o recepcionistas y a responder. Del lado de la plataforma, el artículo 124 inciso 6 la obliga a tener esos canales de atención. También podés pedir la portabilidad de tus datos «en un formato estructurado, genérico y de uso común» (inciso 3).",
  },
  {
    q: "¿Si me despiden me corresponde indemnización?",
    a: "No hay despido, porque no hay contrato de trabajo. Hay una relación regida por este régimen y, para lo que no prevea, el artículo 128 remite al Código Civil y Comercial de la Nación (no a la Ley de Contrato de Trabajo). Eso deja afuera la indemnización del artículo 245, el preaviso y la integración del mes de despido.",
  },
  {
    q: "¿El régimen ya está vigente o falta reglamentarlo?",
    a: `Está vigente desde el ${VIGENCIA_REGIMEN}. El artículo 217 de la Ley 27.802 dice que «salvo disposición en contrario los artículos de la presente ley entrarán en vigencia a partir de su publicación en el Boletín Oficial», y la única disposición en contrario que trae la norma es la del Título II (Fondo de Asistencia Laboral), prorrogado al 1° de noviembre de 2026 por el artículo 27 del Decreto 408/2026. El Título XII no está prorrogado. Lo que sí falta es la reglamentación del artículo 127, que designa la autoridad de aplicación: eso no frena el régimen, solo define quién lo controla.`,
  },
];

export default function RepartidoresDeAppsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora para repartidores y conductores de apps",
        url: "https://calcular.ar/repartidores-de-apps",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "Repartidores y conductores de apps: cuánto te queda por mes con la Ley 27.802",
        descripcion:
          "El Título XII de la Ley 27.802 (arts. 119 a 128) creó el régimen de los servicios privados de movilidad y reparto por plataformas, vigente desde el 6/3/2026. Acá el texto oficial, la cuota de monotributo que el art. 125 vuelve obligatoria y la diferencia anual con un empleado.",
        url: "/repartidores-de-apps",
        modificado: PLATAFORMAS_FUENTES.consultadoEl,
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

  const da = QUE_DA_Y_QUE_NO.filter((i) => i.tiene);
  const noDa = QUE_DA_Y_QUE_NO.filter((i) => !i.tiene);

  return (
    <article className="space-y-10">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Repartidor o conductor de app: cuánto te queda por mes
        </h1>
        <p className="text-zinc-600">
          El {VIGENCIA_REGIMEN} apareció un régimen entero que antes no existía: el Título XII de la
          Ley 27.802, diez artículos que definen qué es un{" "}
          <strong>prestador independiente de plataformas</strong> y qué le corresponde. La parte
          legal se explicó en todos lados. El número, no: cuánto te queda limpio, cuánto te cuesta
          estar en regla y cuánto vale en pesos lo que dejaste de cobrar.
        </p>
      </header>

      <RespuestaPrimero actualizado={PLATAFORMAS_FUENTES.consultadoEl}>
        <p>
          Desde el {VIGENCIA_REGIMEN}, si repartís o llevás personas con una app sos un{" "}
          <strong>prestador independiente</strong> y la Ley de Contrato de Trabajo{" "}
          <strong>no se te aplica</strong> (art. 2° inc. f, que sumó el art. 1º de la Ley 27.802).
          Eso quiere decir que <strong>no hay aguinaldo, vacaciones pagas, indemnización ni
          ART</strong>, y que <strong>los aportes los pagás vos</strong>: el art. 125 inc. 2 pone la
          inscripción fiscal y el pago de los aportes como condición para usar la plataforma. A
          cambio, el art. 126 te garantiza el <strong>100% de las propinas</strong>, un{" "}
          <strong>seguro de accidentes personales</strong> a cargo de la plataforma, capacitación
          gratis, una explicación si te bloquean la cuenta y horarios totalmente libres. La cuenta:
          la cuota del monotributo es un monto fijo, así que{" "}
          <strong>pesa más cuanto menos facturás</strong> (puede pasar el 10% de lo que cobrás en
          las categorías de abajo y bajar al 4% en las de arriba). Y un empleado que se lleva lo
          mismo en mano por mes termina el año con <strong>un 9,1% más</strong>, solo por el
          aguinaldo y el plus vacacional.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Tu número</h2>
        <p className="text-sm text-zinc-600">
          Cargá lo que te transfieren por mes. La categoría sale de llevar esa cifra al año y
          compararla con la escala oficial de ARCA. La comparación con un empleado usa el aguinaldo
          (LCT arts. 121 y 122) y el plus vacacional del art. 155 inc. a). Si querés saber qué
          cubre la obra social de tu cuota, mirá{" "}
          <Link
            href="/obra-social-monotributo"
            className="font-medium text-emerald-700 hover:underline"
          >
            desde cuándo te cubre la obra social del monotributo
          </Link>
          .
        </p>
        <CalculadoraPlataformas />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué te da el régimen y qué no</h2>
        <p className="text-sm text-zinc-600">
          La columna de la izquierda sale del art. 126, que es la lista de derechos. La de la
          derecha no es una opinión: sale del art. 2° inc. f) de la LCT (que te deja afuera de la
          Ley de Contrato de Trabajo) y del art. 128, que para lo no previsto manda al Código Civil
          y Comercial.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
            <p className="text-sm font-semibold text-emerald-900">Lo que sí tenés</p>
            <ul className="mt-3 space-y-3">
              {da.map((i) => (
                <li key={i.concepto}>
                  <p className="text-sm font-medium text-zinc-800">
                    {i.concepto}{" "}
                    <span className="font-normal text-zinc-500">({i.fuente})</span>
                  </p>
                  <p className="text-sm text-zinc-600">{i.detalle}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-5">
            <p className="text-sm font-semibold text-rose-900">Lo que no tenés</p>
            <ul className="mt-3 space-y-3">
              {noDa.map((i) => (
                <li key={i.concepto}>
                  <p className="text-sm font-medium text-zinc-800">
                    {i.concepto} <span className="font-normal text-zinc-500">({i.fuente})</span>
                  </p>
                  <p className="text-sm text-zinc-600">{i.detalle}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El artículo que dejó a la LCT afuera, palabra por palabra
        </h2>
        <p className="text-sm text-zinc-600">
          Es un inciso de once palabras dentro del nuevo art. 2° de la Ley de Contrato de Trabajo, y
          cambia todo lo demás.
        </p>
        <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            LCT, art. 2°, inc. f) (texto que sumó el art. 1º de la Ley 27.802)
          </p>
          <p className="mt-1 text-sm italic text-zinc-700">«{PLATAFORMAS_TEXTOS.art2IncFLct}»</p>
          <p className="mt-2 text-xs text-zinc-500">
            «Conforme la regulación específica» remite al Título XII de la misma ley, que es todo lo
            que sigue en esta página. Sin ese Título, el inciso dejaría a estas personas sin ninguna
            norma. Con él, quedan bajo un régimen propio, y para lo que no prevea se aplica el
            Código Civil y Comercial (art. 128), no la LCT.
          </p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El Título XII completo (arts. 119 a 128), texto oficial
        </h2>
        <p className="text-sm text-zinc-600">
          Diez artículos, enteros y sin resumir. Están acá porque casi todos los cuentan con otras
          palabras, y las obligaciones concretas están en la letra: el art. 124 es lo que la
          plataforma te debe, el art. 125 lo que vos le debés al Estado, y el art. 126 la lista de
          derechos que podés exigir.
        </p>
        <div className="space-y-3">
          <Articulo n={119} titulo="Objeto" texto={PLATAFORMAS_TEXTOS.art119} />
          <Articulo n={120} titulo="Definiciones" texto={PLATAFORMAS_TEXTOS.art120} />
          <Articulo n={121} titulo="Libertad de conexión" texto={PLATAFORMAS_TEXTOS.art121} />
          <Articulo n={122} titulo="Ámbito de aplicación" texto={PLATAFORMAS_TEXTOS.art122} />
          <Articulo n={123} titulo="Libertad de formas" texto={PLATAFORMAS_TEXTOS.art123} />
          <Articulo
            n={124}
            titulo="Obligaciones de las plataformas"
            texto={PLATAFORMAS_TEXTOS.art124}
            destacado
          />
          <Articulo
            n={125}
            titulo="Obligaciones del prestador independiente"
            texto={PLATAFORMAS_TEXTOS.art125}
            destacado
          />
          <Articulo
            n={126}
            titulo="Derechos del prestador independiente"
            texto={PLATAFORMAS_TEXTOS.art126}
            destacado
          />
          <Articulo n={127} titulo="Autoridad de aplicación" texto={PLATAFORMAS_TEXTOS.art127} />
          <Articulo n={128} titulo="Aplicación supletoria" texto={PLATAFORMAS_TEXTOS.art128} />
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Desde cuándo rige, y por qué no está en duda</h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Ley 27.802, art. 217</p>
          <p className="mt-1 text-sm italic text-zinc-700">«{PLATAFORMAS_TEXTOS.art217Vigencia}»</p>
          <p className="mt-2 text-xs text-zinc-500">
            La ley se publicó en el Boletín Oficial el {VIGENCIA_REGIMEN}. La única «disposición en
            contrario» de toda la ley es la prórroga del Título II (el Fondo de Asistencia
            Laboral), llevado al 1° de noviembre de 2026 por el art. 27 del Decreto 408/2026. Esa
            prórroga no alcanza al Título XII. Falta, sí, la reglamentación que designe la autoridad
            de aplicación (art. 127): eso define quién controla el régimen, no cuándo empieza a
            regir.
          </p>
        </blockquote>
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
          Para la tabla completa de categorías y la recategorización está{" "}
          <Link href="/monotributo" className="font-medium text-emerald-700 hover:underline">
            la calculadora de monotributo
          </Link>
          . Si además sos empleado en relación de dependencia, lo que te queda en mano de ese sueldo
          se calcula en{" "}
          <Link href="/sueldo-neto" className="font-medium text-emerald-700 hover:underline">
            sueldo neto
          </Link>
          . Otras páginas de la misma reforma:{" "}
          <Link href="/propinas" className="font-medium text-emerald-700 hover:underline">
            propinas
          </Link>
          ,{" "}
          <Link href="/horas-extras" className="font-medium text-emerald-700 hover:underline">
            horas extras
          </Link>{" "}
          y{" "}
          <Link
            href="/descuentos-del-sueldo"
            className="font-medium text-emerald-700 hover:underline"
          >
            descuentos del sueldo
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {PLATAFORMAS_FUENTES.lista.map((f) => (
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
          Los artículos citados salen del texto oficial de la Ley 27.802 publicado en InfoLEG, no de
          un resumen de prensa, y la escala de monotributo es la que publica ARCA. Esta página es
          una guía informativa: no reemplaza el consejo de un contador ni de un abogado. Consultada
          el {PLATAFORMAS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}

function Articulo({
  n,
  titulo,
  texto,
  destacado = false,
}: {
  n: number;
  titulo: string;
  texto: string;
  destacado?: boolean;
}) {
  return (
    <details
      className={`ca-acordeon rounded-xl border p-4 ${
        destacado ? "border-emerald-300 bg-emerald-50/40" : "border-zinc-200 bg-white"
      }`}
      open={destacado}
    >
      <summary className="cursor-pointer text-sm font-semibold text-zinc-800">
        Art. {n}: {titulo}
      </summary>
      <p className="mt-2 text-sm italic leading-relaxed text-zinc-700">«{texto}»</p>
    </details>
  );
}
