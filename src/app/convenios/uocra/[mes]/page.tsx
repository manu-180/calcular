import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { PlanillaUocraCTA } from "@/components/PlanillaUocraCTA";
import { ORGANIZACION, datasetSchema } from "@/lib/schema";
import {
  breadcrumbSchema,
  compararConIpc,
  pctConSigno,
  puntosConSigno,
  periodoISO,
  variacionPct,
  vecinos,
} from "@/lib/archivo-mensual";
import { calcularUocra, textoProximaParitaria } from "@/lib/convenios";
import {
  CATEGORIAS_UOCRA,
  MESES_UOCRA,
  UOCRA_FUENTES,
  UOCRA_HOMOLOGACIONES,
  UOCRA_HORAS_MES_PROMEDIO,
  UOCRA_PROXIMA_PARITARIA,
  ZONAS_UOCRA,
  type CategoriaUocraId,
} from "@/data/convenios/uocra";
import { formatARS } from "@/lib/formato";

export const dynamicParams = false;

export function generateStaticParams() {
  return MESES_UOCRA.map((m) => ({ mes: m.id }));
}

// El acuerdo del 31/3/2026 fijó abril-mayo (tramo 1); el del 19/5/2026 fijó junio-agosto
// (tramo 2); el del 21/9/2026, septiembre-noviembre (tramo 3). MESES_UOCRA no guarda a qué tramo pertenece cada mes: se deriva acá, no se
// duplica en el dato — si un mes nuevo entra en un tramo 3, este mapa se extiende una línea.
const TRAMO_POR_MES: Record<string, { fuente: typeof UOCRA_FUENTES.acuerdoTramo1; homologacion: string }> = {
  "abril-2026": { fuente: UOCRA_FUENTES.acuerdoTramo1, homologacion: UOCRA_HOMOLOGACIONES.tramo1 },
  "mayo-2026": { fuente: UOCRA_FUENTES.acuerdoTramo1, homologacion: UOCRA_HOMOLOGACIONES.tramo1 },
  "junio-2026": { fuente: UOCRA_FUENTES.acuerdoTramo2, homologacion: UOCRA_HOMOLOGACIONES.tramo2 },
  "julio-2026": { fuente: UOCRA_FUENTES.acuerdoTramo2, homologacion: UOCRA_HOMOLOGACIONES.tramo2 },
  "agosto-2026": { fuente: UOCRA_FUENTES.acuerdoTramo2, homologacion: UOCRA_HOMOLOGACIONES.tramo2 },
  "septiembre-2026": { fuente: UOCRA_FUENTES.acuerdoTramo3, homologacion: UOCRA_HOMOLOGACIONES.tramo3 },
  "octubre-2026": { fuente: UOCRA_FUENTES.acuerdoTramo3, homologacion: UOCRA_HOMOLOGACIONES.tramo3 },
  "noviembre-2026": { fuente: UOCRA_FUENTES.acuerdoTramo3, homologacion: UOCRA_HOMOLOGACIONES.tramo3 },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ mes: string }>;
}): Promise<Metadata> {
  const { mes: mesId } = await params;
  const idx = MESES_UOCRA.findIndex((m) => m.id === mesId);
  if (idx === -1) return {};
  const mes = MESES_UOCRA[idx];
  const nombre = mes.etiqueta.toLowerCase();
  const jornalOficialA = mes.jornales["oficial"]["a"];
  const variacion =
    idx > 0 ? variacionPct(jornalOficialA, MESES_UOCRA[idx - 1].jornales["oficial"]["a"]) : null;

  return {
    title: `Sueldos UOCRA ${nombre}: jornal Oficial ${formatARS(jornalOficialA, 0)}/hora (CCT 76/75)`,
    description: `Los jornales oficiales de la construcción en ${nombre}: Oficial en Zona A a ${formatARS(jornalOficialA, 0)} la hora${variacion !== null ? ` (${pctConSigno(variacion)} contra el mes anterior)` : ""}, el resto de las categorías y zonas, y la suma no remunerativa del mes. Verificados contra el acuerdo firmado UOCRA-CAMARCO.`,
    alternates: { canonical: `/convenios/uocra/${mes.id}` },
    openGraph: {
      images: [
        {
          url: `/og?t=${encodeURIComponent(`UOCRA ${nombre}`)}&s=${encodeURIComponent("Jornales oficiales por zona — CCT 76/75")}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function UocraMesPage({
  params,
}: {
  params: Promise<{ mes: string }>;
}) {
  const { mes: mesId } = await params;
  const idx = MESES_UOCRA.findIndex((m) => m.id === mesId);
  if (idx === -1) notFound();

  const mes = MESES_UOCRA[idx];
  const { anterior, siguiente } = vecinos(MESES_UOCRA, idx);
  const nombre = mes.etiqueta.toLowerCase();
  const catsJornal = CATEGORIAS_UOCRA.filter((c) => !c.mensual);
  const sereno = CATEGORIAS_UOCRA.find((c) => c.mensual)!;
  const tramo = TRAMO_POR_MES[mes.id];
  const esUltimoMes = siguiente === null;

  // Referencia del answer-first y de las variaciones: jornal del Oficial en Zona A.
  const jornalOficialA = mes.jornales["oficial"]["a"];
  const jornalAnteriorA = anterior ? anterior.jornales["oficial"]["a"] : null;
  const variacionMensual = jornalAnteriorA !== null ? variacionPct(jornalOficialA, jornalAnteriorA) : null;
  const periodo = periodoISO(mes.anio, mes.mes);
  const comparacionIpc = compararConIpc(variacionMensual, periodo);
  const primerMes = MESES_UOCRA[0];
  const acumulado =
    idx > 0 ? variacionPct(jornalOficialA, primerMes.jornales["oficial"]["a"]) : null;

  // Hay meses sin suma no remunerativa (el acuerdo la absorbe al básico: agosto 2026). En esos
  // no se muestra una tabla de ceros — se explica por qué no hay.
  const tieneSnr = CATEGORIAS_UOCRA.some((c) =>
    ZONAS_UOCRA.some((z) => mes.snr[c.id][z.id] > 0),
  );

  // "Qué significa para vos": dos categorías reales del mes, con el mismo motor que la
  // calculadora (jornada completa, asistencia perfecta, sin aporte solidario de no afiliado).
  const ejemploOficial = calcularUocra({
    mesId: mes.id,
    categoriaId: "oficial",
    zonaId: "a",
    horasMes: UOCRA_HORAS_MES_PROMEDIO,
    conAsistencia: true,
    conAporteSindical: false,
  })!;
  const ejemploAyudante = calcularUocra({
    mesId: mes.id,
    categoriaId: "ayudante",
    zonaId: "a",
    horasMes: UOCRA_HORAS_MES_PROMEDIO,
    conAsistencia: true,
    conAporteSindical: false,
  })!;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      {
        ...datasetSchema({
          nombre: `Jornales de la construcción UOCRA — ${mes.etiqueta} (CCT 76/75)`,
          descripcion: `Jornales básicos por hora y categoría (oficial especializado, oficial, medio oficial, ayudante, sereno) del CCT 76/75 vigentes en ${nombre}, por zona${tieneSnr ? ", con la suma no remunerativa del mes" : " (este mes sin suma no remunerativa: fue absorbida al básico)"}. Verificados contra el acuerdo firmado UOCRA-CAMARCO.`,
          url: `/convenios/uocra/${mes.id}`,
          modificado: `${mes.anio}-${String(mes.mes).padStart(2, "0")}-01`,
          fuenteNombre: tramo.fuente.nombre,
          fuenteUrl: tramo.fuente.url,
        }),
        // Cobertura temporal del dataset: ISO 8601 YYYY-MM, el mes exacto que documenta la página.
        temporalCoverage: periodo,
      },
      breadcrumbSchema([
        { name: "Convenios", url: "/convenios" },
        { name: "UOCRA", url: "/convenios/uocra" },
        { name: mes.etiqueta, url: `/convenios/uocra/${mes.id}` },
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
          <Link href="/convenios/uocra" className="hover:underline">
            UOCRA
          </Link>{" "}
          · {mes.etiqueta}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Sueldos de UOCRA en {nombre}: jornales por zona
        </h1>
        <p className="text-zinc-600">{mes.cambios}</p>
      </header>

      <RespuestaPrimero actualizado={UOCRA_FUENTES.consultadoEl}>
        <p>
          En {nombre}, el jornal básico de un Oficial de la construcción (UOCRA, CCT 76/75) en Zona A
          es de <strong>{formatARS(jornalOficialA, 0)} por hora</strong>
          {variacionMensual !== null ? (
            <>
              {" "}({pctConSigno(variacionMensual)} contra {anterior!.etiqueta.toLowerCase()})
            </>
          ) : null}
          {tieneSnr
            ? ", más la suma no remunerativa del mes. La tabla completa de jornales por categoría y zona (más la SNR) está abajo,"
            : ", y este mes no hay suma no remunerativa: el acuerdo la absorbió al básico. La tabla completa de jornales por categoría y zona está abajo,"}{" "}
          verificada contra el acuerdo firmado UOCRA-CAMARCO. Pasá del jornal a tu sueldo mensual en
          la <Link href="/convenios/uocra">calculadora de sueldo UOCRA</Link>.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Jornales básicos de {nombre}</h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Categoría</th>
                  {ZONAS_UOCRA.map((z) => (
                    <th key={z.id} className="px-4 py-2.5 text-right font-semibold">
                      {z.nombre}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {catsJornal.map((cat) => (
                  <tr key={cat.id} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 text-zinc-600">{cat.nombre} (por hora)</td>
                    {ZONAS_UOCRA.map((z) => (
                      <td key={z.id} className="px-4 py-2.5 text-right text-zinc-900">
                        {formatARS(
                          mes.jornales[cat.id as Exclude<CategoriaUocraId, "sereno">][z.id],
                          0
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-zinc-100 bg-zinc-50/50">
                  <td className="px-4 py-2.5 text-zinc-600">{sereno.nombre} (mensual)</td>
                  {ZONAS_UOCRA.map((z) => (
                    <td
                      key={z.id}
                      className="px-4 py-2.5 text-right font-medium text-zinc-900"
                    >
                      {formatARS(mes.serenoMensual[z.id], 0)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          El adicional por zona desfavorable ya está incluido. Mes de jornada completa: 190,67
          hs (44 hs semanales).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Cómo se movió el jornal en {nombre}</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Vs. mes anterior
            </p>
            <p className="mt-1 text-2xl font-bold text-zinc-900">
              {variacionMensual === null ? "—" : pctConSigno(variacionMensual)}
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              {anterior ? `Oficial Zona A, contra ${anterior.etiqueta.toLowerCase()}` : "Primer mes de esta serie"}
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
            En {nombre} el jornal de Oficial en Zona A{" "}
            {comparacionIpc.diferenciaPuntos > 0.05 ? (
              <>
                le ganó a la inflación por <strong>{puntosConSigno(comparacionIpc.diferenciaPuntos)}</strong> puntos:
                subió más que el IPC del mes.
              </>
            ) : comparacionIpc.diferenciaPuntos < -0.05 ? (
              <>
                perdió contra la inflación: subió {pctConSigno(comparacionIpc.variacionSalario)} mientras el
                IPC subió {pctConSigno(comparacionIpc.variacionIpc)} ({puntosConSigno(comparacionIpc.diferenciaPuntos)}{" "}
                puntos de diferencia).
              </>
            ) : (
              <>se movió prácticamente igual que la inflación general del mes.</>
            )}
          </p>
        ) : null}
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Suma no remunerativa (SNR) de {nombre}
        </h2>
        {!tieneSnr ? (
          <div className="space-y-3 text-zinc-600">
            <p>
              En {nombre} <strong>no hay suma no remunerativa</strong>: el acuerdo la incorporó
              al jornal básico. Por eso el salto del jornal es más grande que el porcentaje del
              tramo, y todo el sueldo pasa a ser remunerativo.
            </p>
            <p>
              Eso te conviene para lo que se calcula sobre el remunerativo:{" "}
              <Link href="/aguinaldo" className="font-medium text-emerald-700 hover:underline">
                aguinaldo
              </Link>
              ,{" "}
              <Link href="/vacaciones" className="font-medium text-emerald-700 hover:underline">
                vacaciones
              </Link>{" "}
              e{" "}
              <Link
                href="/indemnizacion"
                className="font-medium text-emerald-700 hover:underline"
              >
                indemnización
              </Link>{" "}
              — y también sube el aporte jubilatorio, porque ahora descuenta el 17% completo y
              no el 3% de obra social.
            </p>
          </div>
        ) : (
          <>
        <div className="space-y-3 text-zinc-600">
          <p>
            Monto mensual por categoría y zona: se paga el 50% con cada quincena y solo
            descuenta el aporte a la obra social (3%).
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Categoría</th>
                  {ZONAS_UOCRA.map((z) => (
                    <th key={z.id} className="px-4 py-2.5 text-right font-semibold">
                      {z.nombre}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CATEGORIAS_UOCRA.map((cat) => (
                  <tr key={cat.id} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 text-zinc-600">{cat.nombre}</td>
                    {ZONAS_UOCRA.map((z) => (
                      <td key={z.id} className="px-4 py-2.5 text-right text-zinc-900">
                        {formatARS(mes.snr[cat.id][z.id], 0)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
          </>
        )}
        <p className="text-sm text-zinc-500">
          Pasá del jornal a tu sueldo mensual —con asistencia perfecta y descuentos— en la{" "}
          <Link
            href="/convenios/uocra"
            className="font-medium text-emerald-700 hover:underline"
          >
            calculadora de sueldo UOCRA
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué significa en tu bolsillo</h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Categoría (Zona A, jornada completa)</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Bruto</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Neto estimado</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">Oficial, con asistencia perfecta</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">{formatARS(ejemploOficial.bruto, 0)}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatARS(ejemploOficial.neto, 0)}
                  </td>
                </tr>
                <tr className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 text-zinc-600">Ayudante, con asistencia perfecta</td>
                  <td className="px-4 py-2.5 text-right text-zinc-900">{formatARS(ejemploAyudante.bruto, 0)}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-zinc-900">
                    {formatARS(ejemploAyudante.neto, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          Neto estimado con 190,67 hs del mes, asistencia perfecta y sin cuota sindical. Con tu
          zona, tus horas reales y la cuota sindical si te afiliaste, usá la{" "}
          <Link href="/convenios/uocra" className="font-medium text-emerald-700 hover:underline">
            calculadora de sueldo UOCRA
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas sobre {nombre}</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-zinc-900">
              ¿Cuánto subió el jornal de Oficial en Zona A en {nombre}?
            </h3>
            <p className="mt-1 text-zinc-600">
              {variacionMensual === null ? (
                <>
                  {mes.etiqueta} es el primer mes de nuestra serie para UOCRA: todavía no tenemos un mes
                  anterior con el que compararlo.
                </>
              ) : (
                <>
                  {pctConSigno(variacionMensual)} contra {anterior!.etiqueta.toLowerCase()}: de{" "}
                  {formatARS(jornalAnteriorA!, 0)} a {formatARS(jornalOficialA, 0)} la hora.
                </>
              )}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900">¿{mes.etiqueta} tiene suma no remunerativa?</h3>
            <p className="mt-1 text-zinc-600">
              {tieneSnr
                ? "Sí: se paga aparte del jornal, 50% por quincena, y solo descuenta el 3% de obra social."
                : "No: el acuerdo la absorbió al jornal básico este mes, así que todo el sueldo pasa a ser remunerativo."}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900">¿Qué acuerdo fija estos valores?</h3>
            <p className="mt-1 text-zinc-600">
              El{" "}
              <a
                href={tramo.fuente.url}
                rel="nofollow noopener"
                target="_blank"
                className="font-medium text-emerald-700 hover:underline"
              >
                {tramo.fuente.nombre}
              </a>
              , homologado por la {tramo.homologacion}.
            </p>
          </div>
          {esUltimoMes ? (
            <div>
              <h3 className="font-semibold text-zinc-900">¿Cuándo se define el próximo tramo?</h3>
              <p className="mt-1 text-zinc-600">{textoProximaParitaria(UOCRA_PROXIMA_PARITARIA, new Date().toISOString().slice(0, 10))}</p>
            </div>
          ) : null}
        </div>
      </section>

      <nav className="flex items-center justify-between text-sm font-medium">
        {anterior ? (
          <Link
            href={`/convenios/uocra/${anterior.id}`}
            className="text-emerald-700 hover:underline"
          >
            ← {anterior.etiqueta}
          </Link>
        ) : (
          <span />
        )}
        {siguiente ? (
          <Link
            href={`/convenios/uocra/${siguiente.id}`}
            className="text-emerald-700 hover:underline"
          >
            {siguiente.etiqueta} →
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <PlanillaUocraCTA />

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Fuentes oficiales</h2>
        <ul className="space-y-1.5 text-sm text-zinc-600">
          {[UOCRA_FUENTES.acuerdoTramo2, UOCRA_FUENTES.acuerdoTramo1].map((f) => (
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
          Última verificación: {UOCRA_FUENTES.consultadoEl}. Mirá también cuánto te queda de{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            aguinaldo
          </Link>{" "}
          con tu mejor mes del semestre.
        </p>
      </section>
    </article>
  );
}
