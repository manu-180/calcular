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

const TITULO = `Aportes casas particulares ${VIGENCIA_APORTES.mesVigente.replace(" de ", " ")}: tabla de ARCA`;

export const metadata: Metadata = {
  title: TITULO,
  description:
    "Cuánto paga el empleador por mes según las horas semanales: obra social, jubilación y ART con la tabla oficial de ARCA. Incluye menores y jubilados.",
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
    a: `Depende de las horas por semana que trabaje para vos. Por una persona activa mayor de 18 años: ${formatARS(MENOS12.total, 2)} por mes si trabaja menos de 12 horas semanales, ${formatARS(RANGO_12.total, 2)} de 12 a menos de 16 horas, y ${formatARS(JORNADA_COMPLETA.total, 2)} con 16 horas o más. Son los importes del PDF oficial de ARCA para ${VIGENCIA_APORTES.mesVigente}, que se pagan en ${VIGENCIA_APORTES.mesDeVencimiento}. Ese pago va aparte del sueldo.`,
  },
  {
    q: "¿Qué incluye ese importe?",
    a: `Tres cosas, y el desglose sorprende: aportes para la obra social, contribuciones a la jubilación (SIPA) y la cuota de la ART. Con menos de 12 horas, la ART es el ${PROPORCION_ART_MENOS12}% del total (${formatARS(MENOS12.art, 2)} de ${formatARS(MENOS12.total, 2)}). Lo más caro no es la jubilación ni la obra social: es el seguro por accidentes. Casi ninguna tabla publicada lo muestra separado.`,
  },
  {
    q: "Trabaja pocas horas y pago todo en regla, ¿tiene obra social?",
    a: `No necesariamente, y es lo que más confunde. ARCA lo dice así: «${REGLAS_APORTES.pisoObraSocial}». Con menos de 12 horas semanales, el aporte de obra social es de ${formatARS(MENOS12.obraSocial!, 2)}, contra ${formatARS(JORNADA_COMPLETA.obraSocial!, 2)} en la categoría de 16 horas o más. Faltan ${formatARS(FALTA_OS_MENOS12, 2)} por mes para llegar al piso. Vos estás en regla igual: la diferencia es voluntaria, y la puede completar la trabajadora (o vos, si querés) para tener la cobertura.`,
  },
  {
    q: "¿Y los aportes jubilatorios computan igual?",
    a: `Rige el mismo piso. Dice ARCA: «${REGLAS_APORTES.pisoJubilacion}» O sea que, con pocas horas, ese período puede no contar para la jubilación si nadie paga la diferencia. En el rango más bajo son ${formatARS(JORNADA_COMPLETA.sipa! - MENOS12.sipa!, 2)} por mes. Es poca plata, pero son años de aportes que después se reclaman al jubilarse.`,
  },
  {
    q: "¿Cuándo se paga?",
    a: `${REGLAS_APORTES.cuandoSePaga} Por eso la tabla oficial dice «valores vigentes para ${VIGENCIA_APORTES.mesVigente}, con vencimiento en ${VIGENCIA_APORTES.mesDeVencimiento}». Lo que pagás este mes es por lo trabajado el mes anterior, y la ART cubre el mes en curso.`,
  },
  {
    q: "La persona tiene 17 años, ¿cambia algo?",
    a: `Sí: no se pagan contribuciones al SIPA, porque la jubilación no las acepta antes de los 18 años. La obra social y la ART se pagan igual, así que el total baja de ${formatARS(MENOS12.total, 2)} a ${formatARS(TABLA_APORTES["activo-menor-18"].find((f) => f.rango === "menos-12")!.total, 2)} con menos de 12 horas. Ese período no suma años para la jubilación.`,
  },
  {
    q: "Es jubilada y trabaja unas horas, ¿qué corresponde?",
    a: `No se pagan aportes de obra social, porque la cobertura la da el INSSJP (PAMI). Sí se pagan las contribuciones al SIPA y la cuota de ART, que es obligatoria para todo el personal sin excepción. Con menos de 12 horas, el total queda en ${formatARS(TABLA_APORTES.jubilado.find((f) => f.rango === "menos-12")!.total, 2)}.`,
  },
  {
    q: "Trabaja en tres casas, ¿los aportes se suman?",
    a: "No. Cada empleo es una relación laboral aparte, y cada empleador paga su aporte por las horas que le trabaja. Lo que importa es el efecto de conjunto: tres empleadores de 6 horas pagan tres veces el rango más bajo, y ninguno llega al piso de 16 horas. Entonces la persona puede quedarse sin obra social aunque trabaje 18 horas por semana en total. Para eso sirve mirar la diferencia que calcula esta página.",
  },
  {
    q: "¿La ART es obligatoria o se puede no contratarla?",
    a: "Es obligatoria. El artículo 14.1 inciso e) de la Ley 26.844 obliga al empleador a contratar un seguro de riesgos del trabajo para su personal. Por eso la cuota de ART aparece con el mismo importe en las tres tablas (activo, menor de 18 y jubilado): depende de las horas, no de la situación de la persona.",
  },
  {
    q: "¿Estos importes se actualizan?",
    a: `Sí. ARCA publica un PDF nuevo cuando cambian, y esta página se actualiza con ese archivo, no con lo que publica un medio. Los valores de acá son los del PDF de ${VIGENCIA_APORTES.mesVigente}, consultado el ${APORTES_FUENTES.consultadoEl}. Si ARCA subió una tabla nueva y todavía no la ves acá, el enlace al PDF oficial está al pie.`,
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
        titulo: TITULO,
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
          Las notas publican el total de tres filas y nada más. Acá está la tabla oficial entera
          (también la de menores de 18 y la de jubilados), cuánto va a obra social, cuánto a
          jubilación y cuánto a ART. Y algo que casi nadie dice:{" "}
          <strong>con pocas horas, el aporte no alcanza para que tenga obra social</strong>.
        </p>
      </header>

      <RespuestaPrimero actualizado={APORTES_FUENTES.consultadoEl}>
        <p>
          Por una persona activa mayor de 18 años, el empleador paga{" "}
          <strong>{formatARS(MENOS12.total, 2)}</strong> por mes si trabaja menos de 12 horas
          semanales, <strong>{formatARS(RANGO_12.total, 2)}</strong> de 12 a menos de 16 horas y{" "}
          <strong>{formatARS(JORNADA_COMPLETA.total, 2)}</strong> con 16 horas o más. Son los valores
          de {VIGENCIA_APORTES.mesVigente}, que vencen en {VIGENCIA_APORTES.mesDeVencimiento} (los
          aportes van a mes vencido; la ART, a mes en curso). Se paga{" "}
          <strong>por cada trabajadora</strong> y va aparte del sueldo, que se calcula en{" "}
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
          Las tres tablas del PDF de ARCA, con el desglose de cada concepto. Una raya en la celda
          quiere decir que ese concepto no corresponde en esa situación, no que sea cero por error.
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
          La fila de 16 horas o más está resaltada porque no es un rango más: es el piso que usa
          ARCA para medir los derechos. Lo explicamos abajo.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El dato que cambia la decisión: 16 horas es el piso de derechos
        </h2>
        <p className="text-zinc-600">
          Podés pagar todo en regla y que la persona igual no tenga obra social. La regla de ARCA
          dice, textual: «{REGLAS_APORTES.pisoObraSocial}» Y para la jubilación: «
          {REGLAS_APORTES.pisoJubilacion}»
        </p>
        <p className="text-zinc-600">
          En números: con menos de 12 horas semanales, el aporte de obra social es de{" "}
          {formatARS(MENOS12.obraSocial!, 2)} y el piso es de{" "}
          {formatARS(JORNADA_COMPLETA.obraSocial!, 2)}. Faltan{" "}
          <strong>{formatARS(FALTA_OS_MENOS12, 2)}</strong> por mes. Por eso la tabla pega un salto
          entre el segundo rango y el tercero, que parece un error de tipeo y no lo es: a las 16
          horas, el aporte pasa a ser el de la cobertura completa. La obra social de la actividad es
          la del {REGLAS_APORTES.obraSocialDeLaActividad}, y la trabajadora puede cambiarse a otra
          una vez por año.
        </p>
        <p className="text-sm text-zinc-500">
          Ojo con el caso más común: alguien que trabaja 6 horas en tres casas suma 18 horas por
          semana, pero cada empleador aporta por el rango más bajo y ninguno llega al piso. Los
          aportes no se suman entre empleos.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Lo que casi nadie mira: la ART</h2>
        <p className="text-zinc-600">
          En el rango de menos de 12 horas semanales, la cuota de ART es{" "}
          {formatARS(MENOS12.art, 2)} de los {formatARS(MENOS12.total, 2)} totales: el{" "}
          <strong>{PROPORCION_ART_MENOS12}%</strong>. O sea que la mayor parte de lo que pagás no va a
          la jubilación ni a la obra social: va al seguro por accidentes de trabajo. Es obligatoria
          por el artículo 14.1 inciso e) de la Ley 26.844, y el importe depende solo de las horas.
          Es el mismo para una persona activa, para una de 17 años y para una jubilada. Qué cubre y
          sobre qué sueldo se liquida está en{" "}
          <Link href="/art-empleada-domestica" className="font-medium text-emerald-700 hover:underline">
            la ART de la empleada doméstica
          </Link>
          .
        </p>
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
              </a>
              : {f.detalle}
            </li>
          ))}
        </ul>
        <p className="pt-2">
          Todos los importes salen del PDF oficial de ARCA, leído con sus coordenadas para no
          confundir columnas. Además los verificamos con una suma: en las nueve filas, el total es
          exactamente obra social más SIPA más ART. Esta página es informativa. Consultada el{" "}
          {APORTES_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
