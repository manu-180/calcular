import type { Metadata } from "next";
import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { ORGANIZACION, datasetSchema } from "@/lib/schema";
import {
  CAMIONEROS_ANTIGUEDAD_POR_ANIO,
  CAMIONEROS_BASE_MAYO,
  CAMIONEROS_FUENTES,
  CAMIONEROS_HOMOLOGACION,
  CATEGORIAS_CAMIONEROS,
  MESES_CAMIONEROS,
  basicoCamioneros,
} from "@/data/convenios/camioneros";
import { formatARS } from "@/lib/formato";
import { calcularCamioneros } from "@/lib/convenios";
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
  return MESES_CAMIONEROS.map((m) => ({ mes: m.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mes: string }>;
}): Promise<Metadata> {
  const { mes: mesId } = await params;
  const idx = MESES_CAMIONEROS.findIndex((m) => m.id === mesId);
  if (idx === -1) return {};
  const mes = MESES_CAMIONEROS[idx];

  const chofer1 = basicoCamioneros(mes.id, "chofer-primera")!;
  const variacion =
    idx > 0
      ? variacionPct(chofer1, basicoCamioneros(MESES_CAMIONEROS[idx - 1].id, "chofer-primera")!)
      : null;

  return {
    title: `Escala de camioneros ${mes.etiqueta}: Chofer de Primera ${formatARS(chofer1, 0)} (CCT 40/89)`,
    description: `Tabla salarial de camioneros en ${mes.etiqueta}: básicos por categoría según CCT 40/89. Chofer de Primera: ${formatARS(chofer1, 0)}${variacion !== null ? ` (${pctConSigno(variacion)} contra el mes anterior)` : ""}. Homologado por ${CAMIONEROS_HOMOLOGACION}.`,
    alternates: { canonical: `/convenios/camioneros/${mes.id}` },
  };
}

export default async function CamionerosMesPage({
  params,
}: {
  params: Promise<{ mes: string }>;
}) {
  const { mes: mesId } = await params;
  const idx = MESES_CAMIONEROS.findIndex((m) => m.id === mesId);
  if (idx === -1) notFound();
  const mes = MESES_CAMIONEROS[idx];
  const { anterior, siguiente } = vecinos(MESES_CAMIONEROS, idx);

  const grupos = Array.from(new Set(CATEGORIAS_CAMIONEROS.map((c) => c.grupo)));
  const chofer1 = basicoCamioneros(mes.id, "chofer-primera")!;
  const chofer1Anterior = anterior ? basicoCamioneros(anterior.id, "chofer-primera")! : null;
  const variacionMensual = chofer1Anterior !== null ? variacionPct(chofer1, chofer1Anterior) : null;
  const periodo = periodoISO(mes.anio, mes.mes);
  const comparacionIpc = compararConIpc(variacionMensual, periodo);
  const primerMes = MESES_CAMIONEROS[0];
  const chofer1Primero = basicoCamioneros(primerMes.id, "chofer-primera")!;
  const acumulado = idx > 0 ? variacionPct(chofer1, chofer1Primero) : null;

  // "Qué significa para vos": Chofer de Primera sin antigüedad vs. con 10 años, mismo motor
  // que la calculadora — muestra el peso real del 1% anual (art. no diferenciado por categoría).
  const sinAntiguedad = calcularCamioneros({
    mesId: mes.id,
    categoriaId: "chofer-primera",
    aniosAntiguedad: 0,
  })!;
  const conAntiguedad = calcularCamioneros({
    mesId: mes.id,
    categoriaId: "chofer-primera",
    aniosAntiguedad: 10,
  })!;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        ...datasetSchema({
          nombre: `Escala salarial de camioneros — ${mes.etiqueta} (CCT 40/89)`,
          descripcion: `Básicos por categoría del CCT 40/89 (camioneros) vigentes en ${mes.etiqueta}. Chofer de Primera: ${formatARS(chofer1, 0)}. Homologado por ${CAMIONEROS_HOMOLOGACION}.`,
          url: `/convenios/camioneros/${mes.id}`,
          modificado: `${mes.anio}-${String(mes.mes).padStart(2, "0")}-01`,
          fuenteNombre: CAMIONEROS_FUENTES.circular.nombre,
          fuenteUrl: CAMIONEROS_FUENTES.circular.url,
        }),
        temporalCoverage: periodo,
      },
      breadcrumbSchema([
        { name: "Convenios", url: "/convenios" },
        { name: "Camioneros", url: "/convenios/camioneros" },
        { name: mes.etiqueta, url: `/convenios/camioneros/${mes.id}` },
      ]),
    ],
  };

  return (
    <article className="space-y-8">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <nav className="text-sm text-zinc-500">
          <Link href="/convenios" className="hover:text-emerald-700">
            Convenios
          </Link>{" "}
          /{" "}
          <Link href="/convenios/camioneros" className="hover:text-emerald-700">
            Camioneros
          </Link>{" "}
          /
        </nav>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Escala de camioneros — {mes.etiqueta}
        </h1>
        <p className="text-zinc-600">
          {mes.cambios} Básico de Chofer de Primera:{" "}
          <strong className="text-zinc-900">{formatARS(chofer1, 0)}</strong>.
          Homologado por la{" "}
          <strong>{CAMIONEROS_HOMOLOGACION}</strong>.
        </p>
      </header>

      <RespuestaPrimero actualizado={CAMIONEROS_FUENTES.circular.consultadoEl}>
        <p>
          En {mes.etiqueta}, el básico de un Chofer de Primera de camioneros (CCT 40/89) es de{" "}
          <strong>{formatARS(chofer1, 0)}</strong>
          {variacionMensual !== null ? (
            <> ({pctConSigno(variacionMensual)} contra {anterior!.etiqueta.toLowerCase()})</>
          ) : null}
          , homologado por la {CAMIONEROS_HOMOLOGACION}. La
          escala completa por categoría (choferes, peones, taller) está abajo. A esto se le suma la
          antigüedad y los adicionales del convenio: calculá tu sueldo exacto en la{" "}
          <Link href="/convenios/camioneros">calculadora de sueldo de camioneros</Link>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Básicos de {mes.etiqueta}
        </h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Categoría</th>
                  <th className="px-4 py-2.5 text-right font-semibold">
                    Básico {mes.etiqueta}
                  </th>
                </tr>
              </thead>
              <tbody>
                {grupos.map((grupo) => (
                  <Fragment key={grupo}>
                    <tr className="border-t border-zinc-100">
                      <td
                        colSpan={2}
                        className="bg-zinc-50/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-400"
                      >
                        {grupo}
                      </td>
                    </tr>
                    {CATEGORIAS_CAMIONEROS.filter((c) => c.grupo === grupo).map((cat) => (
                      <tr key={cat.id} className="border-t border-zinc-100">
                        <td className="px-4 py-2.5 text-zinc-600">{cat.nombre}</td>
                        <td className="px-4 py-2.5 text-right font-medium text-zinc-900">
                          {formatARS(
                            basicoCamioneros(mes.id, cat.id)!,
                            0
                          )}
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Calculá tu sueldo exacto con antigüedad y descuentos en la{" "}
          <Link
            href="/convenios/camioneros"
            className="font-medium text-emerald-700 hover:underline"
          >
            calculadora de sueldo Camioneros
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cómo se movió el básico en {mes.etiqueta.toLowerCase()}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Vs. mes anterior
            </p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">
              {variacionMensual === null ? "—" : pctConSigno(variacionMensual)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {anterior ? `Chofer de Primera, contra ${anterior.etiqueta.toLowerCase()}` : "Primer mes de esta serie"}
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
        {comparacionIpc !== null ? (
          <p className="text-sm text-zinc-600">
            En {mes.etiqueta.toLowerCase()} el básico de Chofer de Primera{" "}
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
                  <th className="px-4 py-2.5 font-semibold">Chofer de Primera</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Bruto</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Neto estimado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">Recién ingresado (sin antigüedad)</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">{formatARS(sinAntiguedad.totalRemunerativo, 0)}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatARS(sinAntiguedad.neto, 0)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">Con 10 años de antigüedad</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">{formatARS(conAntiguedad.totalRemunerativo, 0)}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatARS(conAntiguedad.neto, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Antigüedad: {pctConSigno(CAMIONEROS_ANTIGUEDAD_POR_ANIO * 100, 0)} por año sobre el básico. Con tu
          categoría y tus años reales, usá la{" "}
          <Link
            href="/convenios/camioneros"
            className="font-medium text-emerald-700 hover:underline"
          >
            calculadora de sueldo de camioneros
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas sobre {mes.etiqueta.toLowerCase()}</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-zinc-900">
              ¿Cuánto subió el básico de Chofer de Primera en {mes.etiqueta.toLowerCase()}?
            </h3>
            <p className="mt-1 text-zinc-600">
              {variacionMensual === null ? (
                <>
                  {mes.etiqueta} es el primer mes de nuestra serie para Camioneros: todavía no tenemos un
                  mes anterior con el que compararlo.
                </>
              ) : (
                <>
                  {pctConSigno(variacionMensual)} contra {anterior!.etiqueta.toLowerCase()}: de{" "}
                  {formatARS(chofer1Anterior!, 0)} a {formatARS(chofer1, 0)}.
                </>
              )}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900">¿Qué homologó este aumento?</h3>
            <p className="mt-1 text-zinc-600">
              La{" "}
              <a
                href={CAMIONEROS_FUENTES.circular.url}
                rel="nofollow noopener"
                target="_blank"
                className="font-medium text-emerald-700 hover:underline"
              >
                {CAMIONEROS_FUENTES.circular.nombre}
              </a>
              , que fija los tramos mensuales de marzo a agosto de 2026 para toda la escala nacional.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900">
              ¿Cómo sigue la escala después de {mes.etiqueta.toLowerCase()}?
            </h3>
            <p className="mt-1 text-zinc-600">
              {siguiente ? (
                <>
                  {siguiente.cambios} Mirá{" "}
                  <Link href={`/convenios/camioneros/${siguiente.id}`} className="font-medium text-emerald-700 hover:underline">
                    la escala de {siguiente.etiqueta.toLowerCase()}
                  </Link>
                  .
                </>
              ) : (
                <>
                  {mes.etiqueta} es el último mes que homologó la{" "}
                  {CAMIONEROS_HOMOLOGACION}: todavía no hay un tramo publicado después de este.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      <nav className="flex items-center justify-between text-sm font-medium">
        {anterior ? (
          <Link
            href={`/convenios/camioneros/${anterior.id}`}
            className="text-emerald-700 hover:underline"
          >
            ← {anterior.etiqueta}
          </Link>
        ) : (
          <span />
        )}
        {siguiente ? (
          <Link
            href={`/convenios/camioneros/${siguiente.id}`}
            className="text-emerald-700 hover:underline"
          >
            {siguiente.etiqueta} →
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Fuentes oficiales</h2>
        <ul className="space-y-1.5 text-sm text-zinc-600">
          <li>
            •{" "}
            <a
              href={CAMIONEROS_FUENTES.circular.url}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              {CAMIONEROS_FUENTES.circular.nombre}
            </a>
          </li>
        </ul>
        <p className="text-xs text-zinc-400">
          Última verificación: {CAMIONEROS_FUENTES.circular.consultadoEl}. Mirá también
          cuánto te queda de{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            aguinaldo
          </Link>{" "}
          con tu mejor mes del semestre.
        </p>
      </section>
    </article>
  );
}
