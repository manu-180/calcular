import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CATEGORIAS_COMERCIO,
  COMERCIO_ASIGNACION_EXTRAORDINARIA_TOTAL,
  COMERCIO_FUENTES,
  MESES_COMERCIO,
} from "@/data/convenios/comercio";
import { formatARS } from "@/lib/formato";
import { PlanillaComercioCTA } from "@/components/PlanillaComercioCTA";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { ORGANIZACION, datasetSchema } from "@/lib/schema";
import { calcularComercio } from "@/lib/convenios";
import {
  breadcrumbSchema,
  compararConIpc,
  pctConSigno,
  puntosConSigno,
  periodoISO,
  variacionPct,
  vecinos,
} from "@/lib/archivo-mensual";

export const dynamicParams = false;

export function generateStaticParams() {
  return MESES_COMERCIO.map((m) => ({ mes: m.id }));
}

/** Total de bolsillo (básico + no remunerativo) de una categoría en un mes: la referencia de variación. */
function totalMes(mes: (typeof MESES_COMERCIO)[number], catId: string) {
  return mes.basicos[catId as keyof typeof mes.basicos] + mes.noRemunerativo;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mes: string }>;
}): Promise<Metadata> {
  const { mes: mesId } = await params;
  const idx = MESES_COMERCIO.findIndex((m) => m.id === mesId);
  if (idx === -1) return {};
  const mes = MESES_COMERCIO[idx];
  const nombre = mes.etiqueta.toLowerCase();
  const baseBasico = mes.basicos["maestranza-a"];
  const variacion =
    idx > 0 ? variacionPct(totalMes(mes, "maestranza-a"), totalMes(MESES_COMERCIO[idx - 1], "maestranza-a")) : null;

  return {
    title: `Sueldo empleados de comercio ${nombre}: Maestranza A ${formatARS(baseBasico, 0)} (CCT 130/75)`,
    description:
      mes.noRemunerativo > 0
        ? `La escala oficial de empleados de comercio de ${nombre}: básicos por categoría + ${formatARS(mes.noRemunerativo, 0)} no remunerativos${variacion !== null ? ` (total ${pctConSigno(variacion)} contra el mes anterior)` : ""}. Verificada contra la circular de FAECYS.`
        : `La escala oficial de empleados de comercio de ${nombre}: básicos por categoría con las sumas no remunerativas ya incorporadas${variacion !== null ? ` (${pctConSigno(variacion)} contra el mes anterior)` : ""}. Verificada contra la circular de FAECYS.`,
    alternates: { canonical: `/convenios/comercio/${mes.id}` },
    openGraph: {
      images: [
        {
          url: `/og?t=${encodeURIComponent(`Comercio ${nombre}`)}&s=${encodeURIComponent("Escala oficial CCT 130/75, verificada")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function ComercioMesPage({
  params,
}: {
  params: Promise<{ mes: string }>;
}) {
  const { mes: mesId } = await params;
  const idx = MESES_COMERCIO.findIndex((m) => m.id === mesId);
  if (idx === -1) notFound();

  const mes = MESES_COMERCIO[idx];
  const { anterior, siguiente } = vecinos(MESES_COMERCIO, idx);
  const nombre = mes.etiqueta.toLowerCase();

  // Categoría base (Maestranza A) como referencia del answer-first y de las variaciones.
  const baseBasico = mes.basicos["maestranza-a"];
  const baseTotal = totalMes(mes, "maestranza-a");
  const baseTotalAnterior = anterior ? totalMes(anterior, "maestranza-a") : null;
  const variacionMensual = baseTotalAnterior !== null ? variacionPct(baseTotal, baseTotalAnterior) : null;
  const periodo = periodoISO(mes.anio, mes.mes);
  const comparacionIpc = compararConIpc(variacionMensual, periodo);
  const primerMes = MESES_COMERCIO[0];
  const acumulado = idx > 0 ? variacionPct(baseTotal, totalMes(primerMes, "maestranza-a")) : null;
  const noRemAnterior = anterior ? anterior.noRemunerativo : null;
  const cambioComposicion =
    noRemAnterior !== null && noRemAnterior !== mes.noRemunerativo && baseTotalAnterior !== null &&
    Math.abs(baseTotal - baseTotalAnterior) < 1;
  const modificadoISO = `${mes.anio}-${String(mes.mes).padStart(2, "0")}-01`;

  // "Qué significa para vos": Maestranza A recién ingresado vs. con 5 años de antigüedad —
  // muestra el efecto real de la antigüedad + presentismo con el mismo motor de la calculadora.
  const sinAntiguedad = calcularComercio({
    mesId: mes.id,
    categoriaId: "maestranza-a",
    aniosAntiguedad: 0,
    jornadaFactor: 1,
    conPresentismo: true,
  })!;
  const conAntiguedad = calcularComercio({
    mesId: mes.id,
    categoriaId: "maestranza-a",
    aniosAntiguedad: 5,
    jornadaFactor: 1,
    conPresentismo: true,
  })!;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        ...datasetSchema({
          nombre: `Escala salarial de empleados de comercio — ${mes.etiqueta} (CCT 130/75)`,
          descripcion: `Básicos por categoría del CCT 130/75 (empleados de comercio) vigentes en ${nombre}${mes.noRemunerativo > 0 ? `, con ${formatARS(mes.noRemunerativo, 0)} de sumas no remunerativas` : ""}. Verificada contra la circular oficial de FAECYS.`,
          url: `/convenios/comercio/${mes.id}`,
          modificado: modificadoISO,
          fuenteNombre: COMERCIO_FUENTES.escalas.nombre,
          fuenteUrl: COMERCIO_FUENTES.escalas.url,
        }),
        temporalCoverage: periodo,
      },
      breadcrumbSchema([
        { name: "Convenios", url: "/convenios" },
        { name: "Empleados de Comercio", url: "/convenios/comercio" },
        { name: mes.etiqueta, url: `/convenios/comercio/${mes.id}` },
      ]),
    ],
  };

  return (
    <article className="space-y-10">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <p className="text-sm font-medium text-emerald-700">
          <Link href="/convenios" className="hover:underline">
            Convenios
          </Link>{" "}
          ·{" "}
          <Link href="/convenios/comercio" className="hover:underline">
            Empleados de Comercio
          </Link>{" "}
          · {mes.etiqueta}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Sueldo de empleados de comercio en {nombre}
        </h1>
        <p className="text-zinc-600">{mes.cambios}</p>
        {mes.advertencia && (
          <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">{mes.advertencia}</p>
        )}
      </header>

      <RespuestaPrimero actualizado={COMERCIO_FUENTES.consultadoEl}>
        <p>
          En {nombre}, el básico de un empleado de comercio de la categoría inicial (Maestranza A,
          jornada completa) es de <strong>{formatARS(baseBasico, 0)}</strong>
          {mes.noRemunerativo > 0 ? (
            <>
              {" "}más <strong>{formatARS(mes.noRemunerativo, 0)}</strong> de sumas no remunerativas
              = <strong>{formatARS(baseTotal, 0)}</strong> total
            </>
          ) : null}
          {variacionMensual !== null ? (
            <> ({pctConSigno(variacionMensual)} contra {anterior!.etiqueta.toLowerCase()})</>
          ) : null}
          , según el CCT 130/75 verificado contra la circular de FAECYS. A esto se le suma la
          antigüedad (1% por año) y el presentismo (8,33%)
          {mes.asignacionExtraordinaria ? (
            <>
              , y este mes se paga además una{" "}
              <strong>
                asignación extraordinaria de {formatARS(mes.asignacionExtraordinaria, 0)}
              </strong>{" "}
              por única vez, que no suma antigüedad ni presentismo
            </>
          ) : null}
          . Mirá la escala completa por categoría abajo o calculá tu neto en la{" "}
          <Link href="/convenios/comercio">calculadora de sueldo de comercio</Link>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Escala salarial de {nombre} (jornada completa)
        </h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Categoría</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Básico</th>
                  <th className="px-4 py-2.5 text-right font-semibold">No remunerativo</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Total</th>
                </tr>
              </thead>
              <tbody>
                {CATEGORIAS_COMERCIO.map((cat) => (
                  <tr key={cat.id} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 text-zinc-600">{cat.nombre}</td>
                    <td className="px-4 py-2.5 text-right text-zinc-600">
                      {formatARS(mes.basicos[cat.id], 0)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-zinc-600">
                      {mes.noRemunerativo > 0 ? formatARS(mes.noRemunerativo, 0) : "—"}
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                      {formatARS(mes.basicos[cat.id] + mes.noRemunerativo, 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          A estos valores se les suma la <strong>antigüedad</strong> (1% por año, también
          sobre lo no remunerativo) y el <strong>presentismo</strong> (8,33%). Calculá tu caso
          exacto —con jornada parcial incluida— en la{" "}
          <Link
            href="/convenios/comercio"
            className="font-medium text-emerald-700 hover:underline"
          >
            calculadora de sueldo de comercio
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cómo se movió el total en {nombre}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Vs. mes anterior
            </p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">
              {variacionMensual === null ? "—" : pctConSigno(variacionMensual)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {anterior ? `Maestranza A, total, contra ${anterior.etiqueta.toLowerCase()}` : "Primer mes de esta serie"}
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Inflación del mes (IPC)
            </p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">
              {comparacionIpc === null ? "—" : pctConSigno(comparacionIpc.variacionIpc)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">INDEC, nivel general</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Acumulado desde {primerMes.etiqueta.toLowerCase()}
            </p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">
              {acumulado === null ? "—" : pctConSigno(acumulado)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">inicio de esta serie</p>
          </div>
        </div>
        {cambioComposicion ? (
          <p className="text-sm text-zinc-600">
            En {nombre} el <strong>total no cambió</strong> respecto de {anterior!.etiqueta.toLowerCase()}:
            lo que se movió fue la composición entre básico y no remunerativo (de{" "}
            {formatARS(noRemAnterior!, 0)} a {formatARS(mes.noRemunerativo, 0)} de no remunerativo). Más
            básico y menos no remunerativo significa más base para antigüedad, presentismo, aguinaldo,
            vacaciones e indemnización.
          </p>
        ) : comparacionIpc !== null ? (
          <p className="text-sm text-zinc-600">
            En {nombre} el total de Maestranza A{" "}
            {comparacionIpc.diferenciaPuntos > 0.05 ? (
              <>
                le ganó a la inflación por <strong>{puntosConSigno(comparacionIpc.diferenciaPuntos)}</strong> puntos.
              </>
            ) : comparacionIpc.diferenciaPuntos < -0.05 ? (
              <>
                perdió contra la inflación: subió {pctConSigno(comparacionIpc.variacionSalario)} mientras el
                IPC subió {pctConSigno(comparacionIpc.variacionIpc)}.
              </>
            ) : (
              <>se movió prácticamente igual que la inflación general del mes.</>
            )}
          </p>
        ) : null}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué significa en tu bolsillo</h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Maestranza A, jornada completa</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Bruto</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Neto estimado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">Recién ingresado (sin antigüedad)</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">{formatARS(sinAntiguedad.bruto, 0)}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatARS(sinAntiguedad.neto, 0)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">Con 5 años de antigüedad</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">{formatARS(conAntiguedad.bruto, 0)}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatARS(conAntiguedad.neto, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Los 5 años de antigüedad suman {formatARS(conAntiguedad.neto - sinAntiguedad.neto, 0)} de
          neto extra al mes (con presentismo, sin ausencias). Con tu categoría real y tu jornada,
          usá la{" "}
          <Link href="/convenios/comercio" className="font-medium text-emerald-700 hover:underline">
            calculadora de sueldo de comercio
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas sobre {nombre}</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-zinc-900">
              ¿Cuánto subió el sueldo de Maestranza A en {nombre}?
            </h3>
            <p className="mt-1 text-zinc-600">
              {variacionMensual === null ? (
                <>
                  {mes.etiqueta} es el primer mes de nuestra serie para Comercio: todavía no tenemos un
                  mes anterior con el que compararlo.
                </>
              ) : (
                <>
                  El total (básico + no remunerativo) se movió {pctConSigno(variacionMensual)} contra{" "}
                  {anterior!.etiqueta.toLowerCase()}: de {formatARS(baseTotalAnterior!, 0)} a{" "}
                  {formatARS(baseTotal, 0)}.
                </>
              )}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900">¿Hay asignación extraordinaria en {nombre}?</h3>
            <p className="mt-1 text-zinc-600">
              {mes.asignacionExtraordinaria ? (
                <>
                  Sí: {formatARS(mes.asignacionExtraordinaria, 0)} por única vez, parte del bono de{" "}
                  {formatARS(COMERCIO_ASIGNACION_EXTRAORDINARIA_TOTAL, 0)} del acuerdo del 22/7/2026 (se paga
                  en julio y agosto de 2026). No suma antigüedad, presentismo ni aguinaldo.
                </>
              ) : (
                <>
                  No. La asignación extraordinaria de {formatARS(COMERCIO_ASIGNACION_EXTRAORDINARIA_TOTAL, 0)}{" "}
                  del acuerdo del 22/7/2026 se pagó solo en julio y agosto de 2026, por única vez.
                </>
              )}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900">
              ¿Cambiaron los no remunerativos en {nombre}?
            </h3>
            <p className="mt-1 text-zinc-600">
              {noRemAnterior === null ? (
                <>{mes.etiqueta} es el primer mes de la serie: no hay un no remunerativo anterior para comparar.</>
              ) : mes.noRemunerativo === noRemAnterior ? (
                <>
                  No: siguen en {formatARS(mes.noRemunerativo, 0)}, igual que en{" "}
                  {anterior!.etiqueta.toLowerCase()}.
                </>
              ) : (
                <>
                  Sí: pasaron de {formatARS(noRemAnterior, 0)} a {formatARS(mes.noRemunerativo, 0)}. Es la
                  incorporación gradual al básico que arrancó el acuerdo del 22/7/2026: de a $20.000 por mes
                  hasta llegar a cero en mayo de 2027.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      <nav className="flex items-center justify-between text-sm font-medium">
        {anterior ? (
          <Link
            href={`/convenios/comercio/${anterior.id}`}
            className="text-emerald-700 hover:underline"
          >
            ← {anterior.etiqueta}
          </Link>
        ) : (
          <span />
        )}
        {siguiente ? (
          <Link
            href={`/convenios/comercio/${siguiente.id}`}
            className="text-emerald-700 hover:underline"
          >
            {siguiente.etiqueta} →
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <PlanillaComercioCTA />

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Fuentes oficiales</h2>
        <ul className="space-y-1.5 text-sm text-zinc-600">
          {[COMERCIO_FUENTES.escalas, COMERCIO_FUENTES.acuerdo].map((f) => (
            <li key={f.url}>
              •{" "}
              <a
                href={f.url}
                rel="nofollow noopener"
                target="_blank"
                className="text-emerald-700 underline"
              >
                {f.nombre}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-xs text-zinc-400">
          Última verificación: {COMERCIO_FUENTES.consultadoEl}. Mirá también{" "}
          <Link
            href="/blog/como-calcular-aguinaldo-empleado-de-comercio"
            className="text-emerald-700 underline"
          >
            cómo se calcula el aguinaldo de comercio
          </Link>{" "}
          o cuánto te queda de{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            aguinaldo
          </Link>{" "}
          con este sueldo.
        </p>
      </section>
    </article>
  );
}
