import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd } from "@/components/JsonLd";
import { FirmaAutor } from "@/components/FirmaAutor";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { formatARS } from "@/lib/formato";

const PUBLICADO = "24 de junio de 2026";
const PUBLICADO_ISO = "2026-06-24";

const titulo =
  "¿El monotributista cobra aguinaldo? Qué dice la ley en 2026";
const descripcion =
  "No: el monotributista no cobra aguinaldo, porque el SAC es solo para trabajadores en relación de dependencia. La excepción del pluriempleo, por qué la ley lo deja afuera y cómo armarte tu propio aguinaldo apartando una parte de lo que facturás.";

export const metadata: Metadata = {
  title: titulo,
  description: descripcion,
  alternates: { canonical: "/blog/aguinaldo-monotributista" },
  openGraph: {
    type: "article",
    images: [
      {
        url: `/og?t=${encodeURIComponent("¿El monotributista cobra aguinaldo?")}&s=${encodeURIComponent("Qué dice la ley en 2026")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

// "Propio aguinaldo": apartando 1/12 de lo facturado cada mes, a fin de semestre
// juntás ~medio mes de facturación (el equivalente al SAC). Arithmética pura, sin
// datos que vencen — es solo un ejemplo ilustrativo que el lector reemplaza por lo suyo.
const PROPORCION = 1 / 12; // 8,33% mensual
const escenariosAhorro = [600_000, 900_000, 1_500_000].map((facturaMensual) => ({
  facturaMensual,
  apartarMensual: facturaMensual * PROPORCION,
  juntadoSemestre: facturaMensual * PROPORCION * 6,
}));

const faqs = [
  {
    q: "¿El monotributista cobra aguinaldo?",
    a: "No. El aguinaldo (Sueldo Anual Complementario) es un derecho de los trabajadores en relación de dependencia, regulado por la Ley 23.041 y la Ley de Contrato de Trabajo. El monotributista es un trabajador independiente: su ingreso surge de lo que factura por sus servicios o productos, no de un sueldo, así que no le corresponde SAC.",
  },
  {
    q: "Soy monotributista pero además tengo un empleo en blanco. ¿Cobro aguinaldo?",
    a: "Sí, pero solo por el empleo registrado. Si además de monotributista estás en relación de dependencia (pluriempleo), tu empleador te paga el SAC calculado sobre ese sueldo. La parte que facturás como monotributista no genera aguinaldo. Son dos relaciones distintas: una en blanco con aguinaldo, otra autónoma sin aguinaldo.",
  },
  {
    q: "¿Por qué la ley no le da aguinaldo al monotributista?",
    a: "Porque el aguinaldo es propio del contrato de trabajo en relación de dependencia: lo paga el empleador como parte de la remuneración. El monotributista no tiene empleador ni sueldo, factura por su cuenta. Por eso tampoco tiene vacaciones pagas, indemnización ni licencias: esos derechos vienen del vínculo laboral en relación de dependencia que el monotributista no tiene.",
  },
  {
    q: "¿Y el monotributista social o el trabajador de casas particulares?",
    a: "El trabajador de casas particulares (servicio doméstico) SÍ cobra aguinaldo, porque está en relación de dependencia aunque su régimen sea especial. El monotributista social es un régimen tributario para actividades independientes, así que tampoco genera SAC. La clave siempre es la misma: ¿hay relación de dependencia? Si la hay, hay aguinaldo.",
  },
  {
    q: "¿Cómo me armo mi propio aguinaldo siendo monotributista?",
    a: "Apartando todos los meses una parte de lo que facturás. Si guardás alrededor de 1/12 (el 8,33%) de tu facturación mensual, a mitad y a fin de año vas a tener juntado el equivalente a medio mes de ingresos, que es justo lo que cobra como SAC quien está en relación de dependencia. Es una costumbre de ahorro, no una obligación legal.",
  },
];

export default function Post() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo,
        descripcion,
        url: "/blog/aguinaldo-monotributista",
        modificado: PUBLICADO_ISO,
        publicado: PUBLICADO_ISO,
      }),
    ],
  };

  return (
    <article className="space-y-8">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <p className="text-xs text-zinc-400">
          Guías · <FirmaAutor prefijo="por" /> · {PUBLICADO} · Ley 23.041 y LCT 20.744 (art. 121)
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          ¿El monotributista cobra aguinaldo? Qué dice la ley
        </h1>
        <p className="text-zinc-600">
          Cada junio y diciembre vuelve la misma duda: si trabajás por tu cuenta y pagás el
          monotributo, ¿te toca aguinaldo? La respuesta corta es no — y acá está el porqué, la
          única excepción que sí te lo da, y una forma simple de armarte tu propio aguinaldo.
        </p>
      </header>

      <RespuestaPrimero actualizado={PUBLICADO}>
        <p>
          <strong>No, el monotributista no cobra aguinaldo.</strong> El Sueldo Anual Complementario
          (SAC) es un derecho de los trabajadores <strong>en relación de dependencia</strong>: lo
          paga el empleador. El monotributista es un trabajador independiente, su ingreso es lo que
          factura, así que la ley no le reconoce aguinaldo (ni vacaciones pagas, ni indemnización).
        </p>
        <p className="mt-2">
          <strong>La única excepción:</strong> si además de monotributista tenés un{" "}
          <strong>empleo en blanco</strong> (pluriempleo), por <em>ese</em> empleo sí cobrás SAC,
          calculado sobre el sueldo registrado. Lo que facturás como monotributo sigue sin generar
          aguinaldo.
        </p>
      </RespuestaPrimero>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Por qué la ley lo deja afuera</h2>
        <p className="text-zinc-600">
          El aguinaldo nace del <strong>contrato de trabajo en relación de dependencia</strong>: es
          medio sueldo extra que el empleador paga dos veces al año (Ley 23.041; LCT art. 121). La
          lógica es que forma parte de la remuneración del trabajador dependiente.
        </p>
        <p className="text-zinc-600">
          El monotributo, en cambio, es un <strong>régimen tributario para trabajadores
          independientes</strong>: no hay empleador, no hay sueldo, hay facturación. Por eso el
          monotributista no tiene SAC — y por la misma razón tampoco le corresponden vacaciones
          pagas, preaviso ni indemnización por despido. Esos derechos vienen del vínculo laboral que
          el monotributista, por definición, no tiene.
        </p>
      </section>

      <section className="space-y-4 rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
        <h2 className="text-lg font-bold text-amber-900">
          La excepción: monotributista <em>y</em> empleado en blanco
        </h2>
        <p className="text-sm text-amber-800">
          Muchos monotributistas también tienen un empleo registrado (un trabajo en relación de
          dependencia por la mañana, monotributo por la tarde, por ejemplo). En ese caso{" "}
          <strong>sí cobrás aguinaldo, pero solo por el empleo en blanco</strong>: el empleador te
          paga el SAC calculado sobre tu mejor sueldo del semestre. La facturación del monotributo no
          entra en esa cuenta. Son dos mundos separados: el sueldo genera aguinaldo, la factura no.
        </p>
        <p className="text-sm text-amber-800">
          Si ese es tu caso, podés calcular cuánto te toca de aguinaldo por tu sueldo registrado:
        </p>
        <div>
          <Link
            href="/aguinaldo/neto"
            className="inline-block rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            Calcular el aguinaldo de mi empleo en blanco →
          </Link>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Armate tu propio aguinaldo</h2>
        <p className="text-zinc-600">
          Que la ley no te dé aguinaldo no significa que no puedas tener uno. La forma más simple es{" "}
          <strong>apartar todos los meses una parte de lo que facturás</strong>. Si guardás alrededor
          de <strong>1/12 (el 8,33%)</strong> de tu facturación mensual, a fin de cada semestre vas a
          tener juntado el equivalente a medio mes de ingresos — justo lo que cobra de SAC quien está
          en relación de dependencia.
        </p>
        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full text-sm">
            <thead className="bg-zinc-50 text-xs text-zinc-500">
              <tr>
                <th className="px-3 py-2.5 text-left font-medium">Si facturás por mes…</th>
                <th className="px-3 py-2.5 text-right font-medium">Apartás 8,33%</th>
                <th className="px-3 py-2.5 text-right font-medium text-emerald-700">
                  En 6 meses juntás
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {escenariosAhorro.map((e) => (
                <tr key={e.facturaMensual} className="bg-white hover:bg-zinc-50">
                  <td className="px-3 py-2.5 text-zinc-700">
                    {formatARS(e.facturaMensual, 0)}
                  </td>
                  <td className="px-3 py-2.5 text-right text-zinc-600">
                    {formatARS(e.apartarMensual, 0)} /mes
                  </td>
                  <td className="px-3 py-2.5 text-right font-semibold text-emerald-700">
                    {formatARS(e.juntadoSemestre, 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zinc-400">
          Ejemplo ilustrativo: 1/12 de la facturación mensual, guardado seis meses, equivale a medio
          mes de ingresos. Reemplazá los montos por los tuyos. No es una obligación legal, es una
          costumbre de ahorro para no llegar a fin de año sin colchón.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">
          Lo que sí pagás todos los meses como monotributista
        </h2>
        <p className="text-zinc-600">
          El monotributista no cobra aguinaldo, pero sí aporta cada mes: la cuota del monotributo
          incluye impuesto integrado, aporte jubilatorio (SIPA) y obra social. Esa obra social y esos
          aportes jubilatorios son, en parte, lo que el sistema te reconoce a cambio de no tener los
          derechos del trabajo en relación de dependencia.
        </p>
        <p className="text-sm text-zinc-600">
          Mirá el desglose de{" "}
          <Link href="/blog/que-incluye-la-cuota-del-monotributo" className="text-emerald-700 underline">
            qué incluye la cuota del monotributo
          </Link>{" "}
          categoría por categoría, y revisá{" "}
          <Link href="/monotributo/categorias" className="text-emerald-700 underline">
            en qué categoría estás según lo que facturás
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="ca-acordeon group rounded-xl border border-zinc-200 bg-white p-4 open:shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-zinc-800 group-open:text-emerald-700">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <EmailCapture
        source="blog-aguinaldo-monotributista"
        headline="Avisame cuando cambien los datos del monotributo"
        subtext="Las escalas, los topes y la cuota del monotributo se actualizan varias veces al año. Cuando cambie algo que te afecta, te aviso. Sin spam."
      />

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Fuentes oficiales</h2>
        <ul className="space-y-1.5 text-sm text-zinc-600">
          <li>
            •{" "}
            <a
              href="https://www.argentina.gob.ar/normativa/nacional/ley-23041-1983-28165"
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              Ley 23.041 — Sueldo Anual Complementario
            </a>
          </li>
          <li>
            •{" "}
            <a
              href="https://servicios.infoleg.gob.ar/infolegInternet/anexos/25000-29999/25552/texact.htm"
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              Ley de Contrato de Trabajo 20.744, art. 121
            </a>
          </li>
          <li>
            •{" "}
            <a
              href="https://www.afip.gob.ar/monotributo/"
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              ARCA — Monotributo (régimen para trabajadores independientes)
            </a>
          </li>
        </ul>
        <p className="text-xs text-zinc-400">
          Esta guía es informativa. Si tenés una situación mixta (monotributo + empleo en blanco) o
          dudas sobre tu encuadre, consultá con un contador o con tu sindicato.
        </p>
        <p className="text-sm text-zinc-600">
          ¿Estás en relación de dependencia y querés saber cuánto cobrás de aguinaldo? Mirá{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            todo sobre el aguinaldo
          </Link>{" "}
          o{" "}
          <Link
            href="/blog/aguinaldo-proporcional-como-se-calcula"
            className="text-emerald-700 underline"
          >
            cómo se calcula el aguinaldo proporcional
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
