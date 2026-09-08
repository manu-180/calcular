import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraAportesObligatorios } from "@/components/CalculadoraAportesObligatorios";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { SelloVerificado } from "@/components/SelloVerificado";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  AFILIACION_FUENTES,
  AFILIACION_TEXTOS,
  EDAD_MINIMA,
  EXCEPCION_ANIOS,
  GRADO_PARENTESCO,
  VIGENCIA_AFILIACION,
} from "@/data/aportes-obligatorios";

export const metadata: Metadata = {
  title: "¿Tenés que aportar? El umbral es 100 dividido la cantidad de socios",
  description:
    "Quién está obligado a aportar al sistema previsional, quién puede entrar voluntariamente y quién queda exceptuado. El umbral del socio no es un porcentaje fijo: es cien dividido el número total de socios, y quedar fuera no es quedar exento.",
  alternates: { canonical: "/aportes-jubilatorios-obligatorios" },
  openGraph: {
    title: "Aportes jubilatorios: obligatorio, voluntario o exceptuado",
    description:
      "El umbral del socio es 100 ÷ cantidad de socios. Y quedar fuera de la relación de dependencia no es quedar exento: se aporta como autónomo.",
    url: "https://calcular.ar/aportes-jubilatorios-obligatorios",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Aportes obligatorios")}&s=${encodeURIComponent("Ley 24.241 arts. 2º, 3º y 4º · quién aporta y por qué inciso")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "Soy socio de una S.R.L. ¿Tengo que estar en relación de dependencia?",
    a: "Depende de un número que se calcula, no de una regla de dedo. El art. 2º inc. d) ap. 1.1 de la Ley 24.241 dice que NO se incluyen obligatoriamente como dependientes los socios «cuya participación en el capital sea igual o superior al porcentual que resulte de dividir el número cien (100) por el número total de socios». Con 4 socios el umbral es 25 %; con 3, 33,33 %; con 2, 50 %. Y como el texto dice «igual o superior», el que tiene exactamente el umbral queda afuera.",
  },
  {
    q: "Si supero el umbral, ¿dejo de aportar?",
    a: "No, y es el error más caro de este tema. El mismo inciso d) arranca su apartado 2 con «sin perjuicio de su inclusión en el inciso b)»: quedar fuera del inciso a) significa que no entrás obligatoriamente como trabajador en relación de dependencia, no que no aportes. Si dirigís, administrás o conducís la sociedad, el inciso b) te alcanza igual como autónomo.",
  },
  {
    q: "Dirijo una sociedad que no me da ninguna ganancia. ¿Igual aporto?",
    a: "Sí. El art. 2º inc. b) ap. 1 alcanza la dirección, administración o conducción de cualquier empresa o sociedad «aunque por esas actividades no obtengan retribución, utilidad o ingreso alguno». La frase está escrita con todas las letras en la ley y es la que más sorprende.",
  },
  {
    q: "Soy director de una S.A. y cobro un sueldo por tareas técnico-administrativas. ¿Qué me corresponde?",
    a: "Las dos cosas, por puertas distintas. Por el cargo de director aportás como autónomo, obligatoriamente (art. 2º inc. b ap. 1). Por las asignaciones que percibís en la misma sociedad por actividades especialmente remuneradas que configuren relación de dependencia, la incorporación es VOLUNTARIA: los directores de sociedades anónimas están en el art. 3º, el de los voluntarios, no en el de los obligados.",
  },
  {
    q: "Soy profesional y aporto a una caja provincial. ¿Puedo sumarme al sistema nacional?",
    a: "Podés, y es voluntario (art. 3º inc. b ap. 4). Pero no reemplaza a la caja: el mismo apartado cierra diciendo que «esta incorporación no modificará la obligatoriedad que dimana de los respectivos regímenes locales». Se aporta a las dos.",
  },
  {
    q: "Soy ama de casa. ¿Puedo aportar?",
    a: "Sí. El art. 3º inc. b) ap. 5 —que agregó la Ley 24.347 en 1994— dice que las amas de casa que decidan incorporarse voluntariamente «lo harán en la categoría mínima de aportes, pudiendo optar por cualquier otra categoría superior».",
  },
  {
    q: "Me contrataron en el exterior para trabajar en Argentina. ¿Aporto acá?",
    a: `Hay una excepción, y pide cuatro condiciones a la vez (art. 4º): ser profesional, investigador, científico o técnico contratado en el extranjero; un plazo no mayor de ${EXCEPCION_ANIOS} años y por una sola vez; no tener residencia permanente en el país; y estar amparado contra vejez, invalidez y muerte por las leyes del país de nacionalidad o residencia. Con tres de las cuatro no alcanza. Además la exención se pide: «deberá ser formulada ante la autoridad de aplicación por el interesado o su empleador».`,
  },
  {
    q: "Soy empleado de un municipio. ¿Entro al sistema nacional?",
    a: "Sólo si esa provincia o municipio adhirió. El art. 2º inc. a) ap. 4 alcanza a los empleados provinciales y municipales «a condición que previamente las autoridades respectivas adhieran al SIJP, mediante convenio con el Poder Ejecutivo Nacional». Sin convenio, manda la caja local.",
  },
  {
    q: "¿Por qué la ley habla del «SIJP» si hoy es el SIPA?",
    a: `Porque los artículos de afiliación nunca se reescribieron. El sistema nació como SIJP en 1993 y la ${VIGENCIA_AFILIACION.normaUnificacion} (${VIGENCIA_AFILIACION.boletinUnificacion}) lo unificó en el SIPA, de reparto, sin sustituir estos artículos. Las citas de esta página conservan el nombre viejo porque una cita corregida deja de ser una cita.`,
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Aportes jubilatorios: quién está obligado, quién puede entrar y quién queda afuera",
        descripcion:
          "Los arts. 2º, 3º y 4º de la Ley 24.241, con el umbral societario que se calcula (cien dividido el número de socios) y la trampa de leerlo como una exención.",
        url: "/aportes-jubilatorios-obligatorios",
        modificado: VIGENCIA_AFILIACION.consultadoEl,
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
          ¿Tenés que aportar? El umbral del socio no es un porcentaje fijo: se calcula
        </h1>
        <p className="text-zinc-600">
          La Ley 24.241 divide al mundo en tres: los que están{" "}
          <strong>obligatoriamente comprendidos</strong> (art. 2º), los que{" "}
          <strong>pueden entrar si quieren</strong> (art. 3º) y los que quedan{" "}
          <strong>exceptuados</strong> (art. 4º). El artículo que decide los casos difíciles es el
          inciso d) del art. 2º, y casi nadie lo publica entero.
        </p>
      </header>

      <SelloVerificado
        verificadoEl={VIGENCIA_AFILIACION.consultadoEl}
        norma={VIGENCIA_AFILIACION.norma}
        fuente={{ nombre: AFILIACION_FUENTES[0].nombre, url: AFILIACION_FUENTES[0].url }}
      />

      <RespuestaPrimero actualizado={VIGENCIA_AFILIACION.consultadoEl}>
        <p>
          Para un socio, el umbral es{" "}
          <strong>cien dividido el número total de socios</strong> — con 4 socios, 25 %; con 2, 50 %
          — y el que llega a ese porcentaje{" "}
          <strong>no se incluye obligatoriamente como trabajador en relación de dependencia</strong>.
          Pero eso <strong>no es una exención</strong>: el mismo inciso dice «sin perjuicio de su
          inclusión en el inciso b)», y quien dirige o administra aporta como{" "}
          <strong>autónomo</strong> igual, <strong>aunque no cobre nada</strong> por hacerlo.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Elegí tu situación</h2>
        <p className="text-sm text-zinc-600">
          El resultado sale por dos puertas separadas —dependiente y autónomo— porque muchas
          situaciones caen en las dos a la vez, con distinto régimen en cada una. Cada veredicto
          viene con el inciso exacto que lo decide.
        </p>
        <CalculadoraAportesObligatorios />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">El umbral, con las palabras de la ley</h2>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm font-semibold text-emerald-900">
            Ley 24.241, art. 2º inc. d) ap. 1.1
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{AFILIACION_TEXTOS.art2dUmbral}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Dos detalles que cambian el resultado. El primero: es una <strong>división</strong>, no un
          porcentaje fijo — con 20 socios el umbral es 5 %, con 2 es 50 %. El segundo:{" "}
          <strong>«igual o superior»</strong>. Dos socios al 50 % están exactamente en el umbral, y
          por esa palabra los dos quedan fuera del inciso a).
        </p>
        <p className="text-zinc-600">
          El apartado 1 tiene otros tres supuestos que sacan del inciso a) sin mirar el porcentaje:
        </p>
        <ul className="space-y-2">
          <li className="rounded-lg border border-zinc-200 bg-zinc-50/60 px-3 py-2 text-sm text-zinc-700">
            <strong>Ap. 1.2</strong> — «{AFILIACION_TEXTOS.art2dComanditado}»
          </li>
          <li className="rounded-lg border border-zinc-200 bg-zinc-50/60 px-3 py-2 text-sm text-zinc-700">
            <strong>Ap. 1.3</strong> — «{AFILIACION_TEXTOS.art2dIrregulares}»
          </li>
          <li className="rounded-lg border border-zinc-200 bg-zinc-50/60 px-3 py-2 text-sm text-zinc-700">
            <strong>Ap. 1.4</strong> — «{AFILIACION_TEXTOS.art2dParentesco}»
          </li>
        </ul>
        <p className="text-zinc-600">
          El ap. 1.4 es el que sorprende en las sociedades familiares: si <em>todos</em> los
          integrantes están ligados por parentesco de hasta el {GRADO_PARENTESCO}º grado, ninguno
          entra obligatoriamente como dependiente, tenga el porcentaje que tenga.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Quedar fuera del inciso a) no es quedar exento
        </h2>
        <blockquote className="rounded-xl border-l-4 border-rose-400 bg-rose-50/70 p-4">
          <p className="text-sm font-semibold text-rose-900">Ley 24.241, art. 2º inc. d) ap. 2</p>
          <p className="mt-1 text-sm text-zinc-700">«{AFILIACION_TEXTOS.art2dSinPerjuicio}…»</p>
        </blockquote>
        <p className="text-zinc-600">
          Esas cinco palabras iniciales son las que se pierden en las notas. El inciso d) sólo
          resuelve si hay o no <strong>relación de dependencia</strong>. La otra puerta sigue
          abierta:
        </p>
        <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
          <p className="text-sm font-semibold text-emerald-900">Ley 24.241, art. 2º inc. b) ap. 1</p>
          <p className="mt-1 text-sm text-zinc-700">«{AFILIACION_TEXTOS.art2bDireccion}»</p>
        </blockquote>
        <p className="text-zinc-600">
          <strong>«Aunque por esas actividades no obtengan retribución, utilidad o ingreso alguno.»</strong>{" "}
          Una sociedad que no reparte un peso no suspende la obligación del que la dirige.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los que pueden entrar y no están obligados
        </h2>
        <p className="text-zinc-600">
          El art. 3º abre la puerta —desde los {EDAD_MINIMA} años, igual que el art. 2º— a una lista
          que sorprende por quiénes están en ella:
        </p>
        <ul className="space-y-2">
          <li className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700">
            <strong>Directores de S.A.</strong> — «{AFILIACION_TEXTOS.art3Directores}»
          </li>
          <li className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700">
            <strong>Síndicos, fiduciarios y socios no gerentes</strong> — «
            {AFILIACION_TEXTOS.art3Sindicos}»
          </li>
          <li className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700">
            <strong>Condóminos y sucesiones indivisas</strong> — «{AFILIACION_TEXTOS.art3Condominos}»
          </li>
          <li className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700">
            <strong>Profesionales con caja provincial</strong> — «
            {AFILIACION_TEXTOS.art3CajaProvincial}»
          </li>
          <li className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700">
            <strong>Amas de casa</strong> — «{AFILIACION_TEXTOS.art3AmasDeCasa}»
          </li>
        </ul>
        <p className="text-zinc-600">
          El de la caja provincial tiene la trampa adentro: la incorporación al sistema nacional{" "}
          <strong>no reemplaza</strong> a la caja local, «no modificará la obligatoriedad que dimana
          de los respectivos regímenes locales». No se elige entre una y otra.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La única excepción, y sus cuatro condiciones
        </h2>
        <blockquote className="rounded-xl border-l-4 border-violet-400 bg-violet-50/70 p-4">
          <p className="text-sm font-semibold text-violet-900">Ley 24.241, art. 4º</p>
          <p className="mt-1 text-sm text-zinc-700">«{AFILIACION_TEXTOS.art4Excepcion}»</p>
          <p className="mt-2 text-sm text-zinc-700">«{AFILIACION_TEXTOS.art4Solicitud}»</p>
        </blockquote>
        <p className="text-zinc-600">
          Las cuatro condiciones son <strong>acumulativas</strong>: contrato de hasta{" "}
          {EXCEPCION_ANIOS} años, por una sola vez, sin residencia permanente en el país, y con
          cobertura de vejez, invalidez y muerte en el país de origen. Y el segundo párrafo agrega
          dos cosas que casi no se leen: la exención <strong>se solicita</strong>, no opera sola; y{" "}
          <strong>no impide afiliarse igual</strong> si las dos partes lo manifiestan expresamente.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <dl className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-zinc-200 bg-white p-4">
              <dt className="text-sm font-bold text-zinc-900">{f.q}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-zinc-700">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Fuentes</h2>
        <p className="text-sm text-zinc-600">
          Todas leídas en el texto <strong>actualizado</strong> de InfoLEG el{" "}
          {VIGENCIA_AFILIACION.consultadoEl}. Las citas conservan el nombre «
          {VIGENCIA_AFILIACION.nombreOriginal}» porque los artículos de afiliación nunca fueron
          sustituidos: la {VIGENCIA_AFILIACION.normaUnificacion} unificó el sistema en el{" "}
          {VIGENCIA_AFILIACION.nombreActual} sin tocarlos.
        </p>
        <ul className="space-y-3">
          {AFILIACION_FUENTES.map((f) => (
            <li key={f.url} className="rounded-xl border border-zinc-200 bg-white p-4">
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-emerald-700 hover:underline"
              >
                {f.nombre}
              </a>
              <p className="mt-1 text-sm text-zinc-600">{f.detalle}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm text-zinc-600">
          Si lo que buscás es cuánto te queda de jubilación con esos aportes, está en{" "}
          <Link href="/jubilacion" className="text-emerald-700 hover:underline">
            la calculadora de jubilación
          </Link>
          ; y si sos monotributista, tu aporte previsional va por{" "}
          <Link href="/monotributo" className="text-emerald-700 hover:underline">
            la cuota del monotributo
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
