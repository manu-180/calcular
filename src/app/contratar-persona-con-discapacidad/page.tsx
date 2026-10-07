import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraContratacionDiscapacidad } from "@/components/CalculadoraContratacionDiscapacidad";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  ALICUOTAS_ART19,
  DEDUCCION_GANANCIAS,
  DETRACCION_MENSUAL,
  DISCAPACIDAD_FUENTES,
  DISCAPACIDAD_TEXTOS,
  EXENCION_ANIOS,
  EXENCION_PORCENTAJE,
  FUERA_DEL_BENEFICIO,
  REQUISITOS,
} from "@/data/contratacion-discapacidad";
import { formatARS } from "@/lib/formato";

const PORCENTAJE = `${EXENCION_PORCENTAJE * 100}%`;
const DEDUCCION = `${DEDUCCION_GANANCIAS * 100}%`;

export const metadata: Metadata = {
  title: "Contratar personas con discapacidad: beneficio del 50%",
  description:
    "El art. 87 de la Ley 24.013 exime del 50% de las contribuciones patronales por 3 años desde el 22/9/2025. Calculá el ahorro y qué contribuciones alcanza.",
  alternates: { canonical: "/contratar-persona-con-discapacidad" },
  openGraph: {
    title: "Contratar a una persona con discapacidad: 50% de contribuciones por 3 años",
    description:
      "El artículo 17 de la Ley 27.793 reescribió el artículo 87 de la Ley 24.013: de un año de exención a tres, y del 50% de las contribuciones patronales. Con la cuenta y las fuentes.",
    url: "https://calcular.ar/contratar-persona-con-discapacidad",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Contratar a una persona con discapacidad")}&s=${encodeURIComponent("50% de contribuciones patronales por 3 años")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Qué beneficio tiene hoy un empleador que contrata a una persona con discapacidad?",
    a: `No paga el ${PORCENTAJE} de las contribuciones patronales que van a INSSJP, Fondo Nacional de Empleo, SIPA y Asignaciones Familiares, durante ${EXENCION_ANIOS} años, si el contrato es por tiempo indeterminado. Lo dice el artículo 87 de la Ley 24.013 con el texto que le dio el artículo 17 de la Ley 27.793 (B.O. 22/9/2025). Es un cambio grande y reciente: el texto anterior (el que todavía publica la mayoría de las notas) mandaba a la exención del artículo 46 y duraba un solo año.`,
  },
  {
    q: "¿La exención es del 50% de todo lo que paga el empleador?",
    a: "No, y es la confusión más cara. El artículo 87 nombra cuatro destinos: INSSJP (Ley 19.032), Cajas de Asignaciones y Subsidios Familiares (Ley 24.714), Fondo Nacional de Empleo (Ley 24.013) y las cajas de jubilaciones (SIPA, Ley 24.241). Son justo los cuatro del artículo 19 de la Ley 27.541, o sea el 20,40% o el 18% según el empleador. La contribución del 6% a la obra social (artículo 16 inciso a de la Ley 23.660), la cuota de la ART y el seguro de vida obligatorio quedan afuera y se pagan enteros.",
  },
  {
    q: "¿Qué alícuota me corresponde?",
    a: "El 20,40% si tu actividad principal es «Servicios» o «Comercio» según la Resolución SEPyME 220/2019 y tus ventas anuales pasan el límite de mediana empresa tramo 2. El 18% para todos los demás empleadores privados, y también para las entidades y organismos del artículo 1° de la Ley 22.016. La mayoría de las empresas está en el 18%.",
  },
  {
    q: "¿Por qué el Decreto 814/2001 dice 19,50% y acá figura 18% o 20,40%?",
    a: "Porque la Ley 27.541 no cambió el texto del decreto: fijó las alícuotas por su cuenta, en su propio artículo 19. El texto ordenado del Decreto 814/2001 sigue mostrando el 19,50% que le puso el artículo 165 de la Ley 27.430. Si lo leés sin cruzarlo con la ley posterior, te llevás un número que no se aplica. Es una trampa típica de los textos ordenados: no están mal, pero muestran menos de lo que rige.",
  },
  {
    q: "¿Cuánto se descuenta de la base imponible?",
    a: `La detracción del artículo 22 de la Ley 27.541: ${formatARS(DETRACCION_MENSUAL, 2)} por mes y por trabajador, y la mitad en la base de cada cuota del aguinaldo. Lo que casi nadie dice es que ese monto está congelado desde 2019. El artículo 4 del Decreto 814/2001 mandaba actualizarlo cada enero por el IPC; la Ley 27.541 lo cambió por una suma fija, y la inflación hizo el resto. Hoy, frente a cualquier sueldo real, casi no cambia nada.`,
  },
  {
    q: "¿El beneficio se puede acumular con la deducción de Ganancias?",
    a: `Sí, y lo dice la misma norma: el artículo 87 da la exención «independientemente de las establecidas en la ley 22.431». El artículo 23 de esa ley permite una deducción especial del ${DEDUCCION} de los sueldos del personal con discapacidad, a elección del contribuyente, en Ganancias o sobre los capitales, al cierre de cada período fiscal. Son dos beneficios distintos, sobre dos impuestos distintos: no tenés que elegir.`,
  },
  {
    q: "¿Sirve para un contrato a plazo fijo o eventual?",
    a: "No. El artículo 87 pide que el contrato sea «por tiempo indeterminado», y es una condición del texto, no una interpretación. Un contrato a plazo fijo, eventual o de temporada no da la exención.",
  },
  {
    q: "¿La Ley 27.793 está vigente o suspendida?",
    a: "Las dos cosas fueron ciertas, así que vale contar toda la historia. El Poder Ejecutivo la promulgó por el Decreto 681/2025 y, en el mismo acto, la suspendió por el artículo 5° de la Ley 24.629, porque el Congreso no había dicho de dónde salía la plata. El 12 de diciembre de 2025, el Juzgado Federal de Primera Instancia de Campana declaró inválido ese artículo 2° del decreto y ordenó aplicar la ley ya. El Estado apeló, y la apelación se concedió con efecto devolutivo (o sea, la sentencia se cumple mientras se discute); la queja para frenarla no fue resuelta. En ese contexto, el Ejecutivo dictó el Decreto 84/2026, que reglamenta la ley, y para el artículo 17 dice textual «Sin reglamentar»: el beneficio no depende de ningún reglamento pendiente. Antes de liquidar, confirmá cómo sigue la causa, que es lo único que puede cambiar.",
  },
  {
    q: "¿Con qué se acredita la discapacidad?",
    a: "Con el Certificado Único de Discapacidad (CUD) de la Ley 22.431 y sus modificaciones, que es el documento que usa el sistema para todos los derechos de esa ley. La Ley 27.793 también cambió cosas del certificado, así que mirá la fecha de emisión y la vigencia del CUD cuando vayas a usar el beneficio.",
  },
];

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora del beneficio por contratar a una persona con discapacidad",
        url: "https://calcular.ar/contratar-persona-con-discapacidad",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo:
          "Contratar a una persona con discapacidad: el 50% de las contribuciones patronales por tres años",
        descripcion:
          "El artículo 17 de la Ley 27.793 reescribió el artículo 87 de la Ley 24.013 el 22/9/2025: la exención pasó de un año a tres y es del 50% de las contribuciones con destino a INSSJP, FNE, SIPA y Asignaciones Familiares. Con la cuenta, lo que el beneficio no alcanza y el estado jurídico de la ley.",
        url: "/contratar-persona-con-discapacidad",
        modificado: DISCAPACIDAD_FUENTES.consultadoEl,
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
          Contratar a una persona con discapacidad: {PORCENTAJE} de las contribuciones patronales
          por {EXENCION_ANIOS} años
        </h1>
        <p className="text-zinc-600">
          El <strong>artículo 87 de la Ley 24.013</strong> se reescribió el 22 de septiembre de 2025
          y casi nadie lo contó. Donde antes había una exención de <strong>un año</strong>, ahora hay
          una del <strong>{PORCENTAJE} de las contribuciones patronales durante tres</strong>. Acá
          tenés la cuenta con los porcentajes vigentes, qué contribuciones alcanza (y cuáles no, que
          es donde se equivocan casi todas las notas) y cómo está hoy la ley que lo creó.
        </p>
      </header>

      <RespuestaPrimero actualizado={DISCAPACIDAD_FUENTES.consultadoEl}>
        <p>
          <strong>
            Si contratás a una persona con discapacidad por tiempo indeterminado, no pagás el{" "}
            {PORCENTAJE} de las contribuciones patronales durante {EXENCION_ANIOS} años.
          </strong>{" "}
          La exención alcanza a los cuatro destinos que nombra el artículo 87 (INSSJP, Fondo
          Nacional de Empleo, SIPA y Asignaciones Familiares), que son los mismos del artículo 19 de
          la Ley 27.541: el <strong>20,40%</strong> o el <strong>18%</strong> según el empleador.{" "}
          <strong>No</strong> alcanza a la obra social, a la ART ni al seguro de vida obligatorio.
          Y se suma a la deducción del {DEDUCCION} en Ganancias del artículo 23 de la Ley 22.431,
          porque el mismo artículo 87 dice que es independiente.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cuánto se ahorra</h2>
        <p className="text-sm text-zinc-600">
          Cargá el sueldo bruto del puesto y elegí la alícuota de la empresa. La calculadora aplica
          la detracción del artículo 22 y te muestra los tres años completos, con el aguinaldo
          incluido.
        </p>
        <CalculadoraContratacionDiscapacidad />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué cambió, exactamente</h2>
        <p className="text-zinc-600">
          El artículo 17 de la Ley 27.793 reemplazó entero el artículo 87 de la Ley 24.013. Si los
          ponés uno al lado del otro, se ve por qué importa: cambió el plazo, cambió el beneficio
          (antes mandaba a otro artículo, ahora tiene su propio porcentaje) y cambió el alcance, que
          ahora nombra los cuatro destinos.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Antes: texto original de 1991 (el que sigue circulando)
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{DISCAPACIDAD_TEXTOS.art87Anterior}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
            <p className="text-sm font-semibold text-emerald-900">
              Ahora: texto según el art. 17 de la Ley 27.793 (B.O. 22/9/2025)
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{DISCAPACIDAD_TEXTOS.art87Vigente}»</p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Sobre qué contribuciones se aplica</h2>
        <p className="text-zinc-600">
          Las dos alícuotas del artículo 19 de la Ley 27.541 van exactamente a los mismos destinos
          que nombra el artículo 87. Gracias a eso, el beneficio se puede calcular sin estimar
          nada.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Alícuota</th>
                  <th className="px-4 py-2.5 font-semibold">A qué empleador le corresponde</th>
                </tr>
              </thead>
              <tbody>
                {ALICUOTAS_ART19.map((a) => (
                  <tr key={a.id} className="border-t border-zinc-100">
                    <td className="whitespace-nowrap px-4 py-2.5 font-semibold text-zinc-900">
                      {a.titulo}
                    </td>
                    <td className="px-4 py-2.5 text-zinc-700">{a.quien}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">
            Ley 27.541, art. 19: el destino de las contribuciones alcanzadas
          </p>
          <p className="mt-1 text-sm text-zinc-700">«{DISCAPACIDAD_TEXTOS.art19Destino}»</p>
        </blockquote>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Lo que el beneficio no toca</h2>
        <p className="text-zinc-600">
          Si una nota dice «el 50% de las cargas sociales», está exagerando el beneficio. Esto se
          sigue pagando igual:
        </p>
        <ul className="space-y-2.5">
          {FUERA_DEL_BENEFICIO.map((f) => (
            <li key={f.que} className="rounded-xl border border-zinc-200 bg-white p-4 text-sm">
              <span className="font-semibold text-zinc-900">{f.que}</span>
              <span className="mt-1 block text-zinc-600">{f.detalle}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Requisitos que están escritos en la norma</h2>
        <ul className="list-disc space-y-1.5 pl-5 text-zinc-600">
          {REQUISITOS.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El estado jurídico de la ley, que también es parte del dato
        </h2>
        <p className="text-zinc-600">
          La Ley 27.793 se promulgó y, en el mismo acto, se suspendió. Un juzgado federal anuló esa
          suspensión y ordenó aplicarla. La apelación del Estado no frenó la sentencia (efecto
          devolutivo), y el Poder Ejecutivo terminó reglamentando la ley. Para el artículo que crea
          este beneficio, la reglamentación son dos palabras.
        </p>
        <div className="space-y-3">
          <blockquote className="rounded-xl border-l-4 border-amber-300 bg-amber-50/70 p-4">
            <p className="text-sm font-semibold text-amber-900">
              Decreto 681/2025: la promulgación que suspende
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{DISCAPACIDAD_TEXTOS.suspension}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
            <p className="text-sm font-semibold text-zinc-800">
              Decreto 84/2026, considerandos: la sentencia que ordena aplicarla
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{DISCAPACIDAD_TEXTOS.sentencia}»</p>
          </blockquote>
          <blockquote className="rounded-xl border-l-4 border-emerald-400 bg-emerald-50/70 p-4">
            <p className="text-sm font-semibold text-emerald-900">
              Decreto 84/2026, Anexo I: qué reglamentación necesita el artículo 17
            </p>
            <p className="mt-1 text-sm text-zinc-700">«{DISCAPACIDAD_TEXTOS.sinReglamentar}»</p>
          </blockquote>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">El segundo beneficio, en Ganancias</h2>
        <p className="text-zinc-600">
          El artículo 87 da la exención «independientemente de las establecidas en la ley 22.431».
          Esa otra ley tiene su propio incentivo y funciona sobre otro impuesto, así que se suman.
        </p>
        <blockquote className="rounded-xl border-l-4 border-zinc-300 bg-zinc-50 p-4">
          <p className="text-sm font-semibold text-zinc-800">Ley 22.431, art. 23</p>
          <p className="mt-1 text-sm text-zinc-700">«{DISCAPACIDAD_TEXTOS.art23Ganancias}»</p>
        </blockquote>
        <p className="text-sm text-zinc-600">
          La calculadora muestra el monto que podés deducir (el {DEDUCCION} de los sueldos del año),
          no el impuesto que te ahorrás. Eso depende de la alícuota de cada contribuyente, y
          estimarla sería inventar un número.
        </p>
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
          {DISCAPACIDAD_FUENTES.lista.map((f) => (
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
          Esta página es informativa y usa normas publicadas en el Boletín Oficial e InfoLEG. La
          liquidación concreta se hace ante ARCA con la nómina real. Para ver otra forma de bajar el
          costo de contratar, mirá el{" "}
          <Link href="/rifl" className="text-emerald-700 hover:underline">
            RIFL
          </Link>
          . Si la persona cobra una pensión por discapacidad, mirá{" "}
          <Link href="/pension-no-contributiva" className="text-emerald-700 hover:underline">
            cuánto puede ganar trabajando sin perder la pensión no contributiva
          </Link>
          . Para ver los aportes y contribuciones de un sueldo está la{" "}
          <Link href="/descuentos-del-sueldo" className="text-emerald-700 hover:underline">
            calculadora de descuentos del sueldo
          </Link>
          ; para el sueldo neto completo, la{" "}
          <Link href="/sueldo-neto" className="text-emerald-700 hover:underline">
            de sueldo neto
          </Link>
          . Consultada el {DISCAPACIDAD_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
