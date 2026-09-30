import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraCasasParticulares } from "@/components/CalculadoraCasasParticulares";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  CASAS_PARTICULARES_FUENTES,
  ESCALAS_POR_MES,
  ESCALA_VIGENTE,
  SUMA_NO_REMUNERATIVA,
  HORAS_EXTRAS,
  JORNADA,
  SAC,
  VACACIONES,
  VIGENCIA,
  ZONA_DESFAVORABLE,
} from "@/data/casas-particulares";
import { escalaDe } from "@/data/casas-particulares";
import { formatARS } from "@/lib/formato";
import { PlanillaCTA } from "@/components/PlanillaCTA";

const NOVIEMBRE = ESCALAS_POR_MES.find((m) => m.id === "2026-11")!;
const GENERALES = ESCALA_VIGENTE.find((c) => c.id === "tareas-generales")!;

export const metadata: Metadata = {
  title: `Empleada doméstica: cuánto cobra por hora y por mes en ${VIGENCIA.vigenteEn}`,
  description: `La escala completa de las 5 categorías de casas particulares, con y sin retiro, por hora y por mes, según el anexo oficial de la ${VIGENCIA.resolucion}. Tareas generales con retiro: ${formatARS(GENERALES.horaConRetiro!, 2)} la hora y ${formatARS(GENERALES.mesConRetiro!, 0)} el mes. Calculá el sueldo por las horas reales, con extras y zona desfavorable.`,
  alternates: { canonical: "/empleada-domestica" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Empleada doméstica")}&s=${encodeURIComponent(`Escala oficial ${VIGENCIA.vigenteEn}: las 5 categorías`)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: `¿Cuánto cobra por hora una empleada doméstica en ${VIGENCIA.vigenteEn}?`,
    a: `Para la categoría más común —personal para tareas generales— el mínimo es de ${formatARS(GENERALES.horaConRetiro!, 2)} por hora con retiro y ${formatARS(GENERALES.horaSinRetiro, 2)} sin retiro, según el anexo de la ${VIGENCIA.resolucion} (${VIGENCIA.boletinOficial}), vigente desde ${VIGENCIA.desde}. Pero hay cinco categorías y cada una tiene su valor: supervisor/a, tareas específicas, caseros, asistencia y cuidado de personas y tareas generales. La categoría la define la tarea principal que se hace con habitualidad, no el nombre que le pongan al puesto.`,
  },
  {
    q: "¿Cuál es el sueldo mensual mínimo?",
    a: `Para tareas generales, ${formatARS(GENERALES.mesConRetiro!, 0)} con retiro y ${formatARS(GENERALES.mesSinRetiro, 0)} sin retiro, por la jornada completa de ${JORNADA.horasSemanales} horas semanales. Ese mínimo mensual y el valor hora son DOS pisos distintos que conviven: con jornada reducida se paga por hora, y con jornada completa no se puede pagar menos que el mínimo mensual, aunque multiplicar las horas por el valor hora diera menos.`,
  },
  {
    q: "¿Hasta cuándo sirve esta escala?",
    a: `La ${VIGENCIA.resolucion} (${VIGENCIA.boletinOficial}) publicó cinco anexos, uno por mes, de agosto a ${VIGENCIA.ultimoMesPublicado}. Esta página los tiene todos cargados y muestra el que corresponde al mes en curso, así que no hay que esperar a que alguien la actualice para ver el valor del mes siguiente. Después de ${VIGENCIA.ultimoMesPublicado} hace falta una resolución nueva: mientras no salga, la última escala publicada sigue siendo la vigente.`,
  },
  {
    q: "¿El aumento de septiembre es sólo el 1,8%?",
    a: `No, y es el error de cuenta más frecuente de esta resolución. El artículo 7 manda incorporar al básico de septiembre el 25% de la suma no remunerativa de $20.000 —o sea $5.000— ANTES de aplicar el aumento. Por eso el mínimo mensual de septiembre no es el de agosto más 1,8%: es (agosto + $5.000) × 1,018, que reproduce los nueve valores del anexo al centavo. Quien aplique el porcentaje sobre la escala de agosto queda $5.090 corto por mes, en todas las categorías. En octubre pasa lo mismo con el 50% ($10.000).`,
  },
  {
    q: "¿Y la suma no remunerativa de $20.000, quién la cobra?",
    a: `Todo el personal, con y sin retiro, y se pagó por única vez junto con ${SUMA_NO_REMUNERATIVA.pagaderaCon} (art. 6). El monto no depende de la categoría sino de las horas semanales: ${SUMA_NO_REMUNERATIVA.tramos.map((t) => `${formatARS(t.monto, 0)} para ${t.detalle}`).join("; ")}. No es parte del básico ni entra en aportes, pero se va incorporando al básico en tres tramos: ${SUMA_NO_REMUNERATIVA.incorporacion.map((i) => `${i.porcentaje}% en ${i.mes}`).join(", ")}.`,
  },
  {
    q: "¿Cuánto sube realmente en noviembre?",
    a: `Un ${NOVIEMBRE.incrementoDeclarado}%, sobre el básico de octubre más los ${formatARS(NOVIEMBRE.incorporaAlBasico, 0)} que se incorporan ese mes (el último tramo de la suma de $20.000). Ojo si viste otra cifra: la resolución original citó como anexo de noviembre un documento equivocado, cuyos importes salían con 1,7%. La Resolución 7/2026 de la Comisión (Boletín Oficial del 18/9/2026) corrigió los anexos de noviembre y diciembre, y los importes correctos son los que usa esta página. Diciembre suma otro ${ESCALAS_POR_MES.at(-1)!.incrementoDeclarado}% sobre noviembre.`,
  },
  {
    q: "¿Qué es el adicional por zona desfavorable y a quién le corresponde?",
    a: `Es un ${ZONA_DESFAVORABLE.porcentaje}% que se suma sobre el mínimo de cada categoría para quienes trabajan en ${ZONA_DESFAVORABLE.provincias.join(", ")} o en el partido de ${ZONA_DESFAVORABLE.partidoBonaerense}, en la provincia de Buenos Aires. Subió del 30% al ${ZONA_DESFAVORABLE.porcentaje}% desde el ${ZONA_DESFAVORABLE.desde} por el artículo 7 de la resolución, y es de los datos que más seguido quedan desactualizados en las tablas que circulan.`,
  },
  {
    q: "¿Cómo se pagan las horas extras?",
    a: `Con un recargo del ${HORAS_EXTRAS.comunes}% sobre el salario habitual en días comunes y del ${HORAS_EXTRAS.finDeSemanaYFeriados}% los sábados después de las 13, los domingos y los feriados (art. ${HORAS_EXTRAS.articulo.split("art. ")[1]}). Se cuentan como suplementarias las que exceden la jornada: ${JORNADA.horasDiarias} horas diarias o ${JORNADA.horasSemanales} semanales, con un tope de ${JORNADA.horasDiariasMaximoDesigual} horas cuando la distribución semanal es desigual.`,
  },
  {
    q: "¿Cómo se calcula el aguinaldo?",
    a: `Es el ${SAC.porcentaje}% de ${SAC.base} (art. 26 de la Ley 26.844) y se paga en dos cuotas: la última jornada laboral de junio y la última de diciembre. Ojo con un detalle: la base es la MAYOR remuneración del semestre, no el promedio ni el último sueldo, así que un mes con muchas horas extras levanta todo el aguinaldo.`,
  },
  {
    q: "¿Cuántos días de vacaciones le corresponden?",
    a: `Según la antigüedad al 31 de diciembre (art. 29): ${VACACIONES.map((v) => `${v.dias} días corridos con ${v.detalle}`).join("; ")}. Si todavía no llegó a los 6 meses de servicio, corresponde un día de descanso por cada 20 días efectivamente trabajados. En la modalidad sin retiro, la habitación y la comida que pone el empleador deben pagarse en dinero antes de que empiecen las vacaciones.`,
  },
  {
    q: "Trabaja en varias casas, ¿cómo se liquida?",
    a: `Cada empleo es una relación laboral independiente. Cada empleador paga su propio sueldo por las horas que le trabaja, su propio aguinaldo, sus propias vacaciones y hace su propio aporte. La jornada máxima y los mínimos se miran empleo por empleo, no sumando todo. Por eso la calculadora de arriba se completa una vez por cada casa.`,
  },
  {
    q: "¿El recibo puede seguir siendo de papel?",
    a: `No. La Ley 27.802 (B.O. 6/3/2026) sustituyó el artículo 20 de la Ley 26.844: el recibo debe instrumentarse de forma electrónica, emitido por el sistema que determine ARCA. Es un cambio reciente que muchas guías todavía no reflejan. El contenido mínimo del recibo sigue estando en el artículo 21, e incluye —para el trabajo por hora— el número de horas trabajadas y el período al que corresponden.`,
  },
  {
    q: "¿La licencia por maternidad es igual que en el resto de los trabajos?",
    a: `Casi, pero con una diferencia que sorprende: el artículo 39 de la Ley 26.844 prohíbe el trabajo 45 días antes y 45 después del parto, igual que la LCT, pero el piso al que se puede reducir el tramo anterior es de 30 días corridos, no de 10 como en el régimen general. El resto del período se acumula al descanso posterior.`,
  },
];

export default function EmpleadaDomesticaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        "@type": "WebApplication",
        name: "Calculadora de sueldo de empleada doméstica (casas particulares)",
        url: "https://calcular.ar/empleada-domestica",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
      articleSchema({
        titulo: `Empleada doméstica: cuánto cobra por hora y por mes en ${VIGENCIA.vigenteEn}`,
        descripcion:
          "Escala salarial completa del personal de casas particulares (Ley 26.844) con los cinco anexos de la Resolución CNTCP 6/2026: cinco categorías, con y sin retiro, por hora y por mes, mes a mes de agosto a diciembre de 2026, más la suma no remunerativa, zona desfavorable, horas extras, aguinaldo y vacaciones.",
        url: "/empleada-domestica",
        modificado: CASAS_PARTICULARES_FUENTES.consultadoEl,
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
          Empleada doméstica: la escala oficial de {VIGENCIA.vigenteEn}, con las cinco categorías
        </h1>
        <p className="text-zinc-600">
          Casi todas las notas publican una sola fila de la tabla —tareas generales— y se olvidan de
          las otras cuatro categorías, del adicional por zona y de que el valor hora y el mínimo
          mensual son <strong>dos pisos distintos</strong>. Acá está el anexo oficial completo, y una
          calculadora que hace la cuenta con las horas que se trabajan de verdad.
        </p>
      </header>

      <RespuestaPrimero actualizado={CASAS_PARTICULARES_FUENTES.consultadoEl}>
        <p>
          En {VIGENCIA.vigenteEn} el mínimo para <strong>personal para tareas generales</strong> es
          de <strong>{formatARS(GENERALES.horaConRetiro!, 2)} por hora</strong> y{" "}
          <strong>{formatARS(GENERALES.mesConRetiro!, 0)} por mes</strong> con retiro, y de{" "}
          {formatARS(GENERALES.horaSinRetiro, 2)} por hora y {formatARS(GENERALES.mesSinRetiro, 0)}{" "}
          por mes sin retiro. Son los valores del {VIGENCIA.anexo} de la {VIGENCIA.resolucion} (
          {VIGENCIA.boletinOficial}), que publicó <strong>una escala por mes hasta{" "}
          {VIGENCIA.ultimoMesPublicado}</strong> y las cinco están acá abajo. Ojo con la cuenta: el
          aumento de septiembre <strong>no es sólo el 1,8%</strong>, porque antes se le incorporan al
          básico $5.000 de la suma no remunerativa. En las provincias patagónicas y en el partido de{" "}
          {ZONA_DESFAVORABLE.partidoBonaerense} se suma un{" "}
          <strong>{ZONA_DESFAVORABLE.porcentaje}%</strong> por zona desfavorable.
        </p>
      </RespuestaPrimero>

      <CalculadoraCasasParticulares />

      <PlanillaCTA producto="planilla-casas-particulares" desde="empleada-domestica" />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          La escala completa · {VIGENCIA.vigenteEn}
        </h2>
        <p className="text-zinc-600">
          Los cinco casos del anexo oficial, sin recortes. La categoría la define la tarea principal
          que se desempeña con habitualidad: quien hace tareas de más de una queda comprendida en la
          que resulte principal.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Categoría</th>
                  <th className="px-4 py-2.5 font-semibold">Hora c/retiro</th>
                  <th className="px-4 py-2.5 font-semibold">Hora s/retiro</th>
                  <th className="px-4 py-2.5 font-semibold">Mes c/retiro</th>
                  <th className="px-4 py-2.5 font-semibold">Mes s/retiro</th>
                </tr>
              </thead>
              <tbody>
                {ESCALA_VIGENTE.map((c) => (
                  <tr
                    key={c.id}
                    className={`border-t border-zinc-100 ${c.id === "tareas-generales" ? "bg-emerald-50/50" : ""}`}
                  >
                    <td className="px-4 py-2.5 font-medium text-zinc-800">{c.nombre}</td>
                    <td className="px-4 py-2.5 text-zinc-900">
                      {c.horaConRetiro === null ? "—" : formatARS(c.horaConRetiro, 2)}
                    </td>
                    <td className="px-4 py-2.5 text-zinc-900">{formatARS(c.horaSinRetiro, 2)}</td>
                    <td className="px-4 py-2.5 text-zinc-900">
                      {c.mesConRetiro === null ? "—" : formatARS(c.mesConRetiro, 0)}
                    </td>
                    <td className="px-4 py-2.5 text-zinc-900">{formatARS(c.mesSinRetiro, 0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Los caseros aparecen con un guion en la columna «con retiro» porque la categoría existe
          sólo sin retiro: por definición, quien la ocupa vive en la vivienda que cuida.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Mes a mes, hasta {VIGENCIA.ultimoMesPublicado}
        </h2>
        <p className="text-zinc-600">
          La {VIGENCIA.resolucion} no fijó un aumento: fijó cinco, con un anexo propio cada uno. Esta
          tabla muestra el mínimo mensual con retiro de la categoría más común —personal para tareas
          generales— en cada mes publicado, para que se vea el escalón completo sin tener que abrir
          cinco PDF. El mes resaltado es el que se está liquidando.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[38rem] text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Mes</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Aumento</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Se incorpora al básico</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Mínimo mensual c/retiro</th>
                </tr>
              </thead>
              <tbody>
                {ESCALAS_POR_MES.map((m) => {
                  const generales = escalaDe(m.id).find((c) => c.id === "tareas-generales")!;
                  const discrepa = m.incrementoDeclarado !== m.incrementoDelAnexo;
                  return (
                    <tr
                      key={m.id}
                      className={`border-t border-zinc-100 ${
                        m.id === VIGENCIA.mesId ? "bg-emerald-50/60 font-semibold" : ""
                      }`}
                    >
                      <td className="px-4 py-2.5 text-zinc-800">
                        {m.etiqueta}
                        <span className="ml-2 text-xs font-normal text-zinc-500">{m.anexo}</span>
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                        {m.incrementoDelAnexo?.toLocaleString("es-AR", { maximumFractionDigits: 1 })}%
                        {discrepa ? (
                          <span className="ml-1.5 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800">
                            el art. {m.articulo.replace("art. ", "")} dice{" "}
                            {m.incrementoDeclarado?.toLocaleString("es-AR", { maximumFractionDigits: 1 })}%
                          </span>
                        ) : null}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-zinc-600">
                        {m.incorporaAlBasico === 0 ? "—" : formatARS(m.incorporaAlBasico, 0)}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-zinc-900">
                        {formatARS(generales.mesConRetiro!, 0)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          La columna del medio es la que rompe las cuentas ajenas: los artículos 7, 8 y 9 incorporan
          al básico el 25%, el 50% y el 25% de la suma no remunerativa de{" "}
          {formatARS(SUMA_NO_REMUNERATIVA.tramos[0].monto, 0)} <strong>antes</strong> de aplicar el
          aumento del mes. Por eso septiembre no es agosto más 1,8%, sino{" "}
          <strong>(agosto + {formatARS(5000, 0)}) × 1,018</strong>.
        </p>
        <div className="rounded-xl border-l-4 border-amber-300 bg-amber-50/50 p-4 text-sm text-zinc-700">
          <p className="font-semibold text-zinc-900">
            Noviembre y diciembre: los importes corregidos
          </p>
          <p className="mt-1">
            La resolución original citó para noviembre y diciembre dos anexos equivocados, y sus
            importes circularon con un 1,7% de aumento. La <strong>Resolución 7/2026</strong> de la
            Comisión (Boletín Oficial del 18/9/2026) los corrigió: noviembre sube{" "}
            {NOVIEMBRE.incrementoDeclarado}% sobre octubre más {formatARS(NOVIEMBRE.incorporaAlBasico, 0)}{" "}
            incorporados, y diciembre otro {NOVIEMBRE.incrementoDeclarado}%. Si liquidás con una tabla
            vieja de noviembre, vas a pagar unos $500 a $600 de más por mes.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Valor hora o mínimo mensual: cuál manda
        </h2>
        <p className="text-zinc-600">
          Es la confusión más común del régimen. El anexo publica los dos pisos y no son
          intercambiables: quien trabaja pocas horas por semana cobra <strong>por hora</strong>, y
          quien cumple la jornada de {JORNADA.horasSemanales} horas semanales no puede cobrar menos
          que el <strong>mínimo mensual</strong> de su categoría, aunque la cuenta de horas por valor
          hora diera un número más bajo. La calculadora de arriba muestra las dos cifras al mismo
          tiempo justamente para que se vea cuál se está aplicando.
        </p>
        <p className="text-sm text-zinc-500">
          Para pasar de horas semanales a horas del mes se multiplica por 52/12 ≈ 4,33, el promedio
          real de semanas por mes. Multiplicar por 4 subestima el sueldo casi un 8%.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Aguinaldo, vacaciones y horas extras</h2>
        <ul className="space-y-2 text-zinc-600">
          <li>
            <strong>Aguinaldo:</strong> {SAC.porcentaje}% de {SAC.base}, en dos cuotas (última
            jornada laboral de junio y de diciembre). Si querés la cuenta general del SAC, está la{" "}
            <Link href="/aguinaldo" className="font-medium text-emerald-700 hover:underline">
              calculadora de aguinaldo
            </Link>
            .
          </li>
          <li>
            <strong>Vacaciones:</strong>{" "}
            {VACACIONES.map((v) => `${v.dias} días (${v.detalle})`).join(" · ")}, medidas por la
            antigüedad al 31 de diciembre. Con menos de 6 meses de servicio: un día de descanso cada
            20 días trabajados.
          </li>
          <li>
            <strong>Horas extras:</strong> {HORAS_EXTRAS.comunes}% de recargo en días comunes y{" "}
            {HORAS_EXTRAS.finDeSemanaYFeriados}% los sábados después de las 13, domingos y feriados.
          </li>
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

      <section className="space-y-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500">
        <h2 className="text-base font-semibold text-zinc-700">Fuentes</h2>
        <ul className="space-y-1">
          {CASAS_PARTICULARES_FUENTES.lista.map((f) => (
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
          Los importes salen del anexo oficial de la resolución, no de tablas publicadas por medios.
          Esta página es informativa: los valores son mínimos legales y cada relación laboral puede
          pactar por encima. Consultada el {CASAS_PARTICULARES_FUENTES.consultadoEl}.
        </p>
      </section>
    </article>
  );
}
