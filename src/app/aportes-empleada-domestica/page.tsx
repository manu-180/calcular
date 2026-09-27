import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraAportesCasas } from "@/components/CalculadoraAportesCasas";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  APORTES_FUENTES,
  CONDICIONES,
  RANGOS,
  REGLAS_APORTES,
  TABLA_APORTES,
  VIGENCIA_APORTES,
} from "@/data/aportes-casas-particulares";
import { formatARS } from "@/lib/formato";
import { PlanillaCTA } from "@/components/PlanillaCTA";

const ACTIVO = TABLA_APORTES["activo-mayor-18"];
const MENOS12 = ACTIVO.find((f) => f.rango === "menos-12")!;
const RANGO_12 = ACTIVO.find((f) => f.rango === "12-a-16")!;
const JORNADA_COMPLETA = ACTIVO.find((f) => f.rango === "16-o-mas")!;

const FALTA_OS_MENOS12 = JORNADA_COMPLETA.obraSocial! - MENOS12.obraSocial!;
const PROPORCION_ART_MENOS12 = Math.round((MENOS12.art / MENOS12.total) * 100);

export const metadata: Metadata = {
  title: `Aportes de empleada doméstica: cuánto paga el empleador en ${VIGENCIA_APORTES.mesDeVencimiento}`,
  description: `La tabla oficial de ARCA con el desglose completo: obra social, jubilación y cuota ART, por rango de horas y también para menores de 18 y jubilados. Menos de 12 horas semanales: ${formatARS(MENOS12.total, 2)} por mes. Jornada de 16 horas o más: ${formatARS(JORNADA_COMPLETA.total, 2)}. Calculá cuánto te toca y cuánto falta para que tenga obra social.`,
  alternates: { canonical: "/aportes-empleada-domestica" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Aportes de empleada doméstica")}&s=${encodeURIComponent(`Tabla oficial de ARCA · ${VIGENCIA_APORTES.mesVigente}`)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: `¿Cuánto hay que pagar de aportes por una empleada doméstica en ${VIGENCIA_APORTES.mesDeVencimiento}?`,
    a: `Depende de las horas semanales que trabaje para ese empleador. Por un trabajador activo mayor de 18 años: ${formatARS(MENOS12.total, 2)} por mes si trabaja menos de 12 horas semanales, ${formatARS(RANGO_12.total, 2)} de 12 a menos de 16 horas, y ${formatARS(JORNADA_COMPLETA.total, 2)} con 16 horas o más. Son los importes del PDF oficial de ARCA vigentes para ${VIGENCIA_APORTES.mesVigente}, que se ingresan en ${VIGENCIA_APORTES.mesDeVencimiento}. Ese pago es aparte del sueldo.`,
  },
  {
    q: "¿Qué incluye ese importe?",
    a: `Tres conceptos, y conviene ver el desglose porque sorprende: aportes con destino a la obra social, contribuciones al sistema jubilatorio (SIPA) y la cuota de la ART. En el rango de menos de 12 horas, la ART es ${PROPORCION_ART_MENOS12}% del total (${formatARS(MENOS12.art, 2)} de ${formatARS(MENOS12.total, 2)}): la parte más cara no es la jubilación ni la obra social, es el seguro por accidentes. Casi ninguna tabla publicada muestra esta separación.`,
  },
  {
    q: "Trabaja pocas horas y pago todo en regla, ¿tiene obra social?",
    a: `No necesariamente, y es el punto que más confunde. ARCA lo dice textual: «${REGLAS_APORTES.pisoObraSocial}». Con menos de 12 horas semanales el aporte de obra social es de ${formatARS(MENOS12.obraSocial!, 2)} contra los ${formatARS(JORNADA_COMPLETA.obraSocial!, 2)} de la categoría de 16 horas o más, así que faltan ${formatARS(FALTA_OS_MENOS12, 2)} por mes para llegar al piso. El empleador está en regla igual: la diferencia es voluntaria y la puede completar el trabajador (o el empleador, si quiere) para acceder a las prestaciones.`,
  },
  {
    q: "¿Y los aportes jubilatorios computan igual?",
    a: `Rige el mismo piso. ARCA: «${REGLAS_APORTES.pisoJubilacion}» Es decir que con jornada reducida el período puede no computar a los efectos jubilatorios si nadie paga la diferencia, que en el rango más bajo es de ${formatARS(JORNADA_COMPLETA.sipa! - MENOS12.sipa!, 2)} por mes. Es plata chica y consecuencias grandes: son los años de aportes que después se reclaman al jubilarse.`,
  },
  {
    q: "¿Cuándo se paga?",
    a: `${REGLAS_APORTES.cuandoSePaga} Por eso la tabla oficial dice «valores vigentes para ${VIGENCIA_APORTES.mesVigente}, con vencimiento en ${VIGENCIA_APORTES.mesDeVencimiento}»: lo que se paga este mes corresponde a lo trabajado el mes anterior, mientras la ART cubre el mes que está corriendo.`,
  },
  {
    q: "La persona tiene 17 años, ¿cambia algo?",
    a: `Sí: no se ingresan contribuciones al SIPA, porque el sistema jubilatorio no las admite antes de los 18 años. La obra social y la ART se pagan igual, así que el total baja de ${formatARS(MENOS12.total, 2)} a ${formatARS(TABLA_APORTES["activo-menor-18"].find((f) => f.rango === "menos-12")!.total, 2)} en el rango de menos de 12 horas. Ese período no suma antigüedad jubilatoria.`,
  },
  {
    q: "Es jubilada y trabaja unas horas, ¿qué corresponde?",
    a: `No se ingresan aportes de obra social —la cobertura la da el INSSJP (PAMI)— pero sí las contribuciones al SIPA y la cuota de ART, que es obligatoria para todo el personal sin excepción. En el rango de menos de 12 horas el total queda en ${formatARS(TABLA_APORTES.jubilado.find((f) => f.rango === "menos-12")!.total, 2)}.`,
  },
  {
    q: "Trabaja en tres casas, ¿los aportes se suman?",
    a: "No se suman: cada empleo es una relación laboral independiente y cada empleador ingresa su propio aporte por las horas que le trabaja. Lo que sí importa es el efecto conjunto: tres empleadores de 6 horas cada uno pagan tres veces el rango más bajo, y ninguno alcanza el piso de 16 horas, así que la persona puede terminar sin obra social aunque trabaje 18 horas por semana en total. Ahí es donde conviene mirar la diferencia que calcula esta página.",
  },
  {
    q: "¿La ART es obligatoria o se puede no contratarla?",
    a: "Es obligatoria. El artículo 14.1 inciso e) de la Ley 26.844 pone en cabeza del empleador la obligación de contratar un seguro por los riesgos del trabajo a favor del personal. Por eso la cuota de ART aparece en las tres tablas —activo, menor de 18 y jubilado— con el mismo importe: depende de las horas, no de la situación de la persona.",
  },
  {
    q: "¿Estos importes se actualizan?",
    a: `Sí, ARCA publica un PDF nuevo cuando cambian, y esta página se actualiza contra ese archivo, no contra lo que publica un medio. Los valores de acá son los del PDF de ${VIGENCIA_APORTES.mesVigente}, consultado el ${APORTES_FUENTES.consultadoEl}. Si ARCA subió una tabla nueva y todavía no la ves acá, el enlace al PDF oficial está al pie.`,
  },
];

export default function AportesEmpleadaDomesticaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de aportes y contribuciones de casas particulares",
        url: "https://calcular.ar/aportes-empleada-domestica",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: `Aportes de empleada doméstica: cuánto paga el empleador en ${VIGENCIA_APORTES.mesDeVencimiento}`,
        descripcion:
          "Tabla oficial de ARCA de aportes, contribuciones y ART del personal de casas particulares, con el desglose de los tres conceptos por rango de horas y las tablas de menores de 18 años y jubilados, más el cálculo de la diferencia que falta para acceder a la obra social y al cómputo jubilatorio.",
        url: "/aportes-empleada-domestica",
        modificado: APORTES_FUENTES.consultadoEl,
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
          Aportes de empleada doméstica: la tabla de ARCA de {VIGENCIA_APORTES.mesVigente}, con el
          desglose completo
        </h1>
        <p className="text-zinc-600">
          Tener empleada doméstica registrada son dos pagos por mes: el sueldo y el aporte a ARCA.
          Las notas publican el total de tres filas y se quedan ahí. Acá está la tabla oficial
          entera —también la de menores de 18 y la de jubilados—, qué parte es obra social, qué parte
          es jubilación y qué parte es ART, y algo que casi nadie dice:{" "}
          <strong>con jornada reducida el aporte no alcanza para que tenga obra social</strong>.
        </p>
      </header>

      <RespuestaPrimero actualizado={APORTES_FUENTES.consultadoEl}>
        <p>
          Por un trabajador activo mayor de 18 años, el empleador ingresa{" "}
          <strong>{formatARS(MENOS12.total, 2)}</strong> por mes si trabaja menos de 12 horas
          semanales, <strong>{formatARS(RANGO_12.total, 2)}</strong> de 12 a menos de 16 horas y{" "}
          <strong>{formatARS(JORNADA_COMPLETA.total, 2)}</strong> con 16 horas o más. Son los valores
          vigentes para {VIGENCIA_APORTES.mesVigente}, que vencen en{" "}
          {VIGENCIA_APORTES.mesDeVencimiento} (los aportes van a mes vencido; la ART, a mes en
          curso). El pago es <strong>por cada trabajador</strong> y es aparte del sueldo, que se
          calcula en{" "}
          <Link
            href="/empleada-domestica"
            className="font-medium text-emerald-700 hover:underline"
          >
            la escala de casas particulares
          </Link>
          .
        </p>
      </RespuestaPrimero>

      <CalculadoraAportesCasas />

      <PlanillaCTA producto="planilla-casas-particulares" desde="aportes-empleada-domestica" />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La tabla oficial completa · {VIGENCIA_APORTES.mesVigente}
        </h2>
        <p className="text-zinc-600">
          Las tres tablas del PDF de ARCA, con el desglose de cada concepto. Un guion significa que
          el concepto no corresponde para esa situación, no que sea cero por error.
        </p>

        {CONDICIONES.map((cond) => (
          <div key={cond.id} className="space-y-1.5">
            <h3 className="pt-2 font-semibold text-zinc-800">{cond.etiqueta}</h3>
            <p className="text-sm text-zinc-500">{cond.detalle}</p>
            <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-zinc-50 text-left text-zinc-700">
                      <th className="px-4 py-2.5 font-semibold">Horas semanales</th>
                      <th className="px-4 py-2.5 font-semibold">Total a pagar</th>
                      <th className="px-4 py-2.5 font-semibold">Obra social</th>
                      <th className="px-4 py-2.5 font-semibold">Jubilación (SIPA)</th>
                      <th className="px-4 py-2.5 font-semibold">Cuota ART</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABLA_APORTES[cond.id].map((f) => (
                      <tr
                        key={f.rango}
                        className={`border-t border-zinc-100 ${f.rango === "16-o-mas" ? "bg-emerald-50/50" : ""}`}
                      >
                        <td className="px-4 py-2.5 font-medium text-zinc-800">
                          {RANGOS.find((r) => r.id === f.rango)!.etiqueta.replace(
                            " horas semanales",
                            "",
                          )}
                        </td>
                        <td className="px-4 py-2.5 font-semibold text-zinc-900">
                          {formatARS(f.total, 2)}
                        </td>
                        <td className="px-4 py-2.5 text-zinc-900">
                          {f.obraSocial === null ? "—" : formatARS(f.obraSocial, 2)}
                        </td>
                        <td className="px-4 py-2.5 text-zinc-900">
                          {f.sipa === null ? "—" : formatARS(f.sipa, 2)}
                        </td>
                        <td className="px-4 py-2.5 text-zinc-900">{formatARS(f.art, 2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}

        <p className="text-sm text-zinc-500">
          La fila de 16 horas o más está resaltada porque no es sólo un rango más: es el piso que
          ARCA usa para medir los derechos, como se explica abajo.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El dato que cambia la decisión: 16 horas es el piso de derechos
        </h2>
        <p className="text-zinc-600">
          Se puede pagar todo en regla y que la persona igual no tenga obra social. La regla de ARCA
          es literal: «{REGLAS_APORTES.pisoObraSocial}» Y para la jubilación: «
          {REGLAS_APORTES.pisoJubilacion}»
        </p>
        <p className="text-zinc-600">
          En números, con menos de 12 horas semanales el aporte de obra social es de{" "}
          {formatARS(MENOS12.obraSocial!, 2)} y el piso son{" "}
          {formatARS(JORNADA_COMPLETA.obraSocial!, 2)}: faltan{" "}
          <strong>{formatARS(FALTA_OS_MENOS12, 2)}</strong> por mes. Eso explica el salto de la tabla
          entre el segundo rango y el tercero, que a primera vista parece un error de tipeo y no lo
          es: al llegar a 16 horas el aporte pasa a ser el de la cobertura plena. La obra social de
          la actividad es la del {REGLAS_APORTES.obraSocialDeLaActividad}, y el trabajador puede
          optar por otra una vez al año.
        </p>
        <p className="text-sm text-zinc-500">
          Ojo con el caso más común de todos: alguien que trabaja 6 horas en tres casas suma 18 horas
          semanales, pero cada empleador aporta por el rango más bajo y ninguno alcanza el piso. Los
          aportes no se suman entre empleos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Lo que casi nadie mira: la ART</h2>
        <p className="text-zinc-600">
          En el rango de menos de 12 horas semanales, la cuota de ART es{" "}
          {formatARS(MENOS12.art, 2)} de los {formatARS(MENOS12.total, 2)} totales: el{" "}
          <strong>{PROPORCION_ART_MENOS12}%</strong>. Es decir que la mayor parte de lo que se
          ingresa no va a la jubilación ni a la obra social, va al seguro por accidentes de trabajo.
          Es obligatoria por el artículo 14.1 inciso e) de la Ley 26.844 y su importe depende sólo de
          las horas: es idéntico para un trabajador activo, para uno de 17 años y para un jubilado.
        </p>
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

      <section className="space-y-2 rounded-xl bg-emerald-50/60 p-5 text-sm text-zinc-700">
        <h2 className="text-base font-semibold text-zinc-900">Lo que falta para cerrar el mes</h2>
        <p>
          Los aportes son una de las dos mitades. La otra es el sueldo: la escala oficial por
          categoría, con y sin retiro, está en{" "}
          <Link href="/empleada-domestica" className="font-medium text-emerald-700 hover:underline">
            la calculadora de empleada doméstica
          </Link>
          , y el aguinaldo del régimen (50% de la mayor remuneración del semestre) en{" "}
          <Link href="/aguinaldo" className="font-medium text-emerald-700 hover:underline">
            la de aguinaldo
          </Link>
          .
        </p>
      </section>

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {APORTES_FUENTES.lista.map((f) => (
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
          Todos los importes salen del PDF oficial de ARCA, leído con sus coordenadas para no
          confundir columnas, y verificados con una prueba aritmética: en las nueve filas, el total
          es exactamente la suma de obra social, SIPA y ART. Esta página es informativa. Consultada
          el {APORTES_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
