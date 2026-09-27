import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraArtCasas } from "@/components/CalculadoraArtCasas";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { SelloVerificado } from "@/components/SelloVerificado";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ART_CASAS_FUENTES,
  ART_CASAS_TEXTOS,
  ART_CASAS_VIGENCIA,
  REGLAS_ART_CASAS,
} from "@/data/art-casas-particulares";
import { VIGENCIA } from "@/data/casas-particulares";
import { VIGENCIA_APORTES } from "@/data/aportes-casas-particulares";
import { PlanillaCTA } from "@/components/PlanillaCTA";

export const metadata: Metadata = {
  title: "ART de la empleada doméstica: sobre qué sueldo se liquida (no es el que cobra)",
  description:
    "La cobertura de riesgos del trabajo del personal de casas particulares es obligatoria, la paga el empleador y se liquida sobre el mínimo de la categoría, no sobre el sueldo real. Calculá la cuota y la indemnización con la escala vigente.",
  alternates: { canonical: "/art-empleada-domestica" },
  openGraph: {
    title: "ART de la empleada doméstica: la base no es el sueldo que cobra",
    description:
      "El reglamento liquida sobre el mínimo de la categoría. Por eso, casi siempre, lo que se cobra es el piso de la SRT y no la fórmula.",
    url: "https://calcular.ar/art-empleada-domestica",
    images: [
      {
        url: `/og?t=${encodeURIComponent("ART de casas particulares")}&s=${encodeURIComponent("La base es el mínimo de la categoría, no el sueldo")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿La empleada doméstica tiene ART?",
    a: "Sí. El art. 74 de la Ley 26.844 incorporó al personal de casas particulares al régimen de las leyes 24.557 y 26.773, y el Decreto 467/2014 lo reglamentó. Hoy la cuota de ART figura en la tabla mensual de aportes y contribuciones que publica ARCA, en las nueve filas del régimen: es un concepto obligatorio, no opcional.",
  },
  {
    q: "¿Quién paga la ART, el empleador o la trabajadora?",
    a: "El empleador. La cuota «integra y se adiciona a los aportes y contribuciones obligatorios» del art. 21 de la Ley 25.239, que ingresa la parte empleadora. No es un descuento del sueldo. En la boleta mensual del régimen suele ser el concepto más caro de los tres.",
  },
  {
    q: "¿Sobre qué sueldo se calcula la indemnización?",
    a: "Sobre el mínimo de la categoría, no sobre lo que la persona cobra. El inciso d) del art. 74 del Decreto 467/2014 manda tomar «la remuneración mensual mínima» fijada para el personal de casas particulares «para la categoría correspondiente», tanto para la prestación por incapacidad temporaria como para el Valor Mensual del Ingreso Base del art. 12 de la Ley 24.557. Es la diferencia más importante con cualquier otro trabajador, donde el ingreso base es el promedio de los salarios del año actualizado por RIPTE.",
  },
  {
    q: "Entonces, ¿cobra menos que otro trabajador?",
    a: "En la fórmula sí, pero ahí entra el piso. Como la base es baja, el resultado de la fórmula (53 × ingreso base × porcentaje de incapacidad × 65/edad) queda por debajo del piso que la SRT actualiza por RIPTE cada seis meses, y se cobra el mayor de los dos. El piso no depende de la categoría ni del sueldo: es el mismo para todos, así que protege más a quien menos base tiene. Desde los 19 años el piso manda en todas las categorías y modalidades, sin excepción. Por debajo de esa edad la fórmula puede ganar, y sólo en las categorías de base más alta: la edad de corte crece con el mínimo de cada categoría, desde los 16 años en tareas generales hasta los 19 en supervisor/a.",
  },
  {
    q: "¿Puede una ART negarse a asegurar a un empleador de casa particular?",
    a: "No. El inciso a) es expreso: «La ASEGURADORA DE RIESGOS DEL TRABAJO (ART) no podrá rechazar la afiliación de ningún empleador incluido en su ámbito de actuación». La aseguradora la elige libremente el empleador, entre las autorizadas a operar en la jurisdicción de su domicilio.",
  },
  {
    q: "Vengo pagando la cuota pero nunca elegí una ART. ¿Estoy cubierto?",
    a: "Desde que se notifique la asignación de oficio, no desde el primer pago. El inciso b) prevé que al empleador que registra pagos sin haber contratado aseguradora se le asigne una «en forma sistemática», y aclara que «tendrá cobertura de riesgos del trabajo, a partir de la fecha en que se notifique a la Aseguradora la asignación de oficio realizada». Además, la asignación no procede si el empleador figura en el registro de contratos extinguidos por falta de pago.",
  },
  {
    q: "¿La cuota de ART se paga a mes vencido, como el resto?",
    a: "No, y es el único concepto del régimen que no. El inciso c) le da «carácter de pago anticipado»: se declara e ingresa durante el mes en que se prestan los servicios, aunque con el mismo formulario, plazos y condiciones que los demás aportes, que sí van a mes vencido.",
  },
  {
    q: "¿Cómo se reclama cuando hay un accidente?",
    a: "Por el mismo camino que cualquier trabajador del sistema: la incorporación del art. 74 es al régimen de las leyes 24.557 y 26.773 sin un procedimiento propio. Rige la instancia administrativa previa y obligatoria ante las comisiones médicas de la Ley 27.348, con patrocinio letrado a cargo de la aseguradora y un plazo perentorio de 60 días hábiles administrativos.",
  },
  {
    q: "¿Y si el accidente pasó yendo al trabajo?",
    a: "El accidente in itinere está cubierto, pero queda afuera del 20% adicional del art. 3 de la Ley 26.773, que sólo corre cuando el daño ocurre en el lugar de trabajo o mientras la persona está a disposición del empleador.",
  },
  {
    q: "¿Vale para el personal contratado por una empresa de limpieza?",
    a: "No. El art. 3 de la Ley 26.844 excluye del régimen a las personas contratadas por personas jurídicas para hacer estas tareas, entre otros supuestos. Ese caso se rige por la LCT y por el convenio que corresponda, con el régimen general de riesgos del trabajo.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de ART del personal de casas particulares",
        url: "https://calcular.ar/art-empleada-domestica",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: "ART de la empleada doméstica: quién la paga y sobre qué sueldo se liquida",
        descripcion:
          "El art. 74 de la Ley 26.844 delegó todo en la reglamentación, y el Decreto 467/2014 lo escribió entero: la base de cálculo es el mínimo de la categoría, la ART no puede rechazar afiliaciones y el que paga sin elegir aseguradora no está cubierto desde el pago.",
        url: "/art-empleada-domestica",
        modificado: ART_CASAS_FUENTES.consultadoEl,
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
          ART de la empleada doméstica: quién la paga y sobre qué sueldo se liquida
        </h1>
        <p className="text-zinc-600">
          El art. 74 de la Ley 26.844 tiene once renglones y no dice nada liquidable: incorpora al
          personal de casas particulares al régimen de riesgos del trabajo{" "}
          <strong>«en el modo y condiciones que se establezcan por vía reglamentaria»</strong>. Todo
          lo que decide un caso real está en el reglamento — y el hallazgo más grande es que{" "}
          <strong>la prestación no se liquida sobre el sueldo que cobra</strong>, sino sobre el
          mínimo de su categoría.
        </p>
      </header>

      <SelloVerificado
        verificadoEl={ART_CASAS_FUENTES.consultadoEl}
        norma="Ley 26.844 art. 74 · Decreto 467/2014, reglamentación del art. 74, incs. a) a e)"
        fuente={ART_CASAS_FUENTES.principal}
      />

      <RespuestaPrimero actualizado={ART_CASAS_FUENTES.consultadoEl}>
        <p>
          <strong>La ART es obligatoria y la paga el empleador</strong> (la cuota se adiciona a los
          aportes del art. 21 de la Ley 25.239, y es el único concepto del régimen que se paga{" "}
          <strong>por adelantado</strong>). Pero la prestación{" "}
          <strong>no se calcula sobre el sueldo real</strong>: el inciso d) manda tomar «la
          remuneración mensual mínima» de la categoría. Como esa base es baja, en la práctica lo que
          se cobra es <strong>el piso que la SRT actualiza por RIPTE</strong>, no el resultado de la
          fórmula — y el piso es el mismo para todos.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Calculá la cuota y la indemnización</h2>
        <p className="text-sm text-zinc-600">
          La base sale sola de la categoría y la modalidad: es la escala de la {VIGENCIA.resolucion},
          vigente desde {VIGENCIA.desde}. La cuota sale de la tabla de ARCA de{" "}
          {VIGENCIA_APORTES.mesVigente}. Ninguno de los dos números se carga a mano.
        </p>
        <CalculadoraArtCasas />
      </section>

      <PlanillaCTA producto="planilla-casas-particulares" desde="art-empleada-domestica" />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Lo que la ley delegó, con sus palabras</h2>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-700">Ley 26.844, art. 74</p>
          <p className="mt-1 text-sm text-zinc-700">«{ART_CASAS_TEXTOS.ley74}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Es el patrón que en este sitio ya pagó varias veces: cuando un artículo remite a una
          reglamentación, el reglamento no aclara la regla — <strong>la escribe entera</strong>. Acá
          son cinco incisos, y cada uno decide un caso.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El inciso que cambia el número: la base no es el sueldo
        </h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm font-semibold text-emerald-900">
            Decreto 467/2014, reglamentación del art. 74, inc. d)
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{ART_CASAS_TEXTOS.baseDeCalculo}»</p>
        </blockquote>
        <p className="text-zinc-600">
          En cualquier otro trabajador el ingreso base del art. 12 de la Ley 24.557 es el promedio
          de los salarios del año anterior actualizados mes a mes por RIPTE. Acá no: es el{" "}
          <strong>mínimo mensual de la categoría</strong>. Quien cobra por encima del mínimo, cobra
          la prestación como si cobrara el mínimo — y la calculadora de arriba muestra exactamente
          cuánto queda afuera.
        </p>
        <p className="text-zinc-600">
          La consecuencia aritmética es la que casi nunca se publica:{" "}
          <strong>con esa base, el que gana es el piso de la SRT</strong>. La fórmula del art. 14
          ap. 2 multiplica 53 por el ingreso base, por el porcentaje de incapacidad y por 65/edad;
          con un mínimo de categoría no llega al piso ni en los casos más graves, y el piso no
          depende del sueldo. Barriendo la escala entera —5 categorías, las dos modalidades,
          de los 16 a los 70 años— el límite es nítido: <strong>desde los 19 años manda el piso
          siempre</strong>. Por debajo de esa edad la fórmula puede ganar, y sólo en las categorías
          de base más alta, porque ahí el coeficiente 65/edad es máximo: la edad de corte crece con
          el mínimo de cada categoría, desde los 16 años en tareas generales hasta los 19 en
          supervisor/a. Y cuál de los dos gana{" "}
          <strong>no depende del porcentaje de incapacidad</strong>, porque los dos lados de la
          comparación se multiplican por él. Cómo se llega a ese número, paso por paso,
          está en{" "}
          <Link href="/indemnizacion-art" className="text-emerald-700 hover:underline">
            indemnización por accidente de trabajo
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Pagar la cuota no es lo mismo que estar cubierto
        </h2>
        <blockquote className="rounded-xl border-l-4 border-amber-400 bg-amber-50/70 p-4">
          <p className="text-sm font-semibold text-amber-900">
            Decreto 467/2014, reglamentación del art. 74, inc. b)
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{ART_CASAS_TEXTOS.asignacionDeOficio}»</p>
        </blockquote>
        <p className="text-zinc-600">
          El empleador que paga la cuota en el formulario mensual pero nunca eligió aseguradora no
          queda cubierto por el hecho de pagar: la cobertura arranca cuando se le notifica a la ART
          la asignación de oficio. Y si el empleador está en el registro de contratos extinguidos
          por falta de pago, la asignación directamente no procede. Elegir una ART es un acto
          propio, y ninguna puede negarse:
        </p>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm text-zinc-700">«{ART_CASAS_TEXTOS.noRechazo}»</p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El único concepto del régimen que se paga por adelantado
        </h2>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-700">
            Decreto 467/2014, reglamentación del art. 74, inc. c)
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{ART_CASAS_TEXTOS.pagoAnticipado}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Los aportes y contribuciones de casas particulares van a mes vencido. La ART, no: es un{" "}
          <strong>pago anticipado</strong>, por el mes en que se están prestando los servicios,
          aunque viaje en el mismo formulario. El desglose completo de la boleta mensual está en{" "}
          <Link href="/aportes-empleada-domestica" className="text-emerald-700 hover:underline">
            aportes de la empleada doméstica
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Las reglas que deciden un caso real</h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="divide-y divide-zinc-100">
            {REGLAS_ART_CASAS.map((r) => (
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
          {ART_CASAS_FUENTES.lista.map((f) => (
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
          Esta página es informativa: el porcentaje de incapacidad lo determina la comisión médica y
          el monto final lo liquida la aseguradora. El trámite para reclamar tiene sus propios
          plazos:{" "}
          <Link href="/comision-medica" className="text-emerald-700 hover:underline">
            la instancia previa obligatoria
          </Link>
          . Y el resto del cluster de casas particulares —escala, aportes, deducción y despido—
          arranca en{" "}
          <Link href="/empleada-domestica" className="text-emerald-700 hover:underline">
            sueldo de la empleada doméstica
          </Link>
          . Base normativa: {ART_CASAS_VIGENCIA.norma}. Consultada el{" "}
          {ART_CASAS_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
