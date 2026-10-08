import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { CalculadoraCamioneros } from "@/components/CalculadoraCamioneros";
import { datosOferta } from "@/lib/oferta";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import {
  CAMIONEROS_FUENTES,
  CATEGORIAS_CAMIONEROS,
  MESES_CAMIONEROS,
} from "@/data/convenios/camioneros";
import { calcularCamioneros } from "@/lib/convenios";
import { formatARS } from "@/lib/formato";
import { ORGANIZACION, articleSchema, datasetSchema } from "@/lib/schema";

import { fechaLarga, periodoDeMes, vigenteEn } from "@/lib/hoy";
const MES = vigenteEn(MESES_CAMIONEROS, periodoDeMes);
const MES_ID = MES.id;
const MES_TXT = MES.etiqueta.toLowerCase();
const ACTUALIZADO_EL = fechaLarga(CAMIONEROS_FUENTES.verificacion.consultadoEl);
const CP_REF = calcularCamioneros({ mesId: MES_ID, categoriaId: "chofer-primera", aniosAntiguedad: 0 })!;
const redondeo = (n: number) => Math.round(n / 1_000) * 1_000;

const faqs = [
  {
    q: "¿Cuánto cobra un camionero en mano en 2026?",
    a: `Depende de la categoría. Un Chofer de Primera (CCT 40/89), con la escala de ${MES_TXT} y sin antigüedad, tiene un básico de alrededor de ${formatARS(redondeo(CP_REF.totalRemunerativo), 0)} y le quedan en mano cerca de ${formatARS(redondeo(CP_REF.neto), 0)}: el 83% del bruto. A diferencia de Comercio, en el convenio de Camioneros casi todo el sueldo es remunerativo, así que el neto es directamente el 83% de siempre.`,
  },
  {
    q: "¿Qué descuentos incluye el neto estimado?",
    a: "Los aportes obligatorios: 11% de jubilación (SIPA), 3% de PAMI y 3% de obra social. En total, 17% sobre el sueldo remunerativo. No incluye la cuota sindical de la Federación de Camioneros ni Ganancias de 4ta categoría, que aparece en los sueldos más altos del convenio.",
  },
  {
    q: "¿Cómo cambia el neto con la antigüedad?",
    a: "La antigüedad suma 1% del básico por cada año trabajado, según el CCT 40/89. Con 10 años, el bruto sube un 10% y el neto sube en la misma proporción. Usá la calculadora de arriba para cargar tus años y ver el detalle exacto.",
  },
  {
    q: "¿Por qué hay distintas categorías de chofer?",
    a: "El CCT 40/89 separa Chofer de Primera, de Segunda y de Tercera según el tipo de vehículo y la responsabilidad, y además tiene Encargado, Peón, Ayudante y las categorías de Taller. Cada una tiene su propio básico. La de básico más alto es Oficial de Primera de taller.",
  },
  {
    q: "¿De dónde salen estos valores?",
    a: `De las planillas salariales firmadas que publica FADEEAC cada mes para el CCT 40/89, según el acuerdo del 13/3/2026 homologado por la Disposición DNRyRT 455/2026. No sacamos los básicos aplicando un porcentaje: cada mes sale de su planilla. El básico es el mismo en todo el país; los coeficientes 1,20 y 1,40 del sur se aplican a viáticos y recargos por zona, no al básico.`,
  },
];

export const metadata: Metadata = {
  title: "Sueldo neto de camioneros 2026 por categoría",
  description:
    "Cuánto cobra en mano un camionero según la escala del CCT 40/89: chofer de 1ª, 2ª y 3ª, peón y taller, con bruto, descuentos y neto.",
  alternates: { canonical: "/sueldo-neto/camioneros" },
};

export default function SueldoNetoCamionerosPage() {
  const mesEtiqueta = MES.etiqueta;

  const grupos = [...new Set(CATEGORIAS_CAMIONEROS.map((c) => c.grupo))];
  const filas = CATEGORIAS_CAMIONEROS.map((cat) => ({
    cat,
    r: calcularCamioneros({
      mesId: MES_ID,
      categoriaId: cat.id,
      aniosAntiguedad: 0,
    }),
  }));

  const cp = filas.find((x) => x.cat.id === "chofer-primera")?.r;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Sueldo Neto Camioneros 2026",
        descripcion:
          `Cuánto queda en mano según la escala CCT 40/89 por categoría. Bruto, aportes (17%) y neto estimado, ${MES_TXT}.`,
        url: "/sueldo-neto/camioneros",
        modificado: "2026-09-28",
      }),
      datasetSchema({
        nombre: `Tabla neto por categoría: Camioneros CCT 40/89 ${MES_TXT}`,
        descripcion:
          "Bruto, descuentos y neto estimado para las categorías del CCT 40/89. Sin antigüedad, escala nacional única.",
        url: "/sueldo-neto/camioneros",
        modificado: "2026-09-28",
        fuenteNombre: CAMIONEROS_FUENTES.circular.nombre,
        fuenteUrl: CAMIONEROS_FUENTES.circular.url,
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
        <nav className="text-sm text-zinc-500">
          <Link href="/sueldo-neto" className="hover:text-emerald-600">
            Sueldo Neto
          </Link>{" "}
          →{" "}
          <Link href="/convenios/camioneros" className="hover:text-emerald-600">
            Camioneros
          </Link>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Sueldo Neto Camioneros 2026
        </h1>
        <p className="text-zinc-600">
          Cuánto te queda en mano según la escala oficial del{" "}
          <strong>CCT 40/89</strong> (Transporte de Cargas). Por categoría, con los aportes de ley
          y la antigüedad. La escala completa mes a mes está en{" "}
          <Link href="/convenios/camioneros" className="text-emerald-700 hover:underline">
            la escala de Camioneros
          </Link>
          .
        </p>
      </header>

      {cp && (
        <RespuestaPrimero actualizado={ACTUALIZADO_EL}>
          <p>
            Un <strong>Chofer de Primera</strong> sin antigüedad tiene{" "}
            <strong>{formatARS(cp.totalRemunerativo, 0)}</strong> de bruto en {MES_TXT} y le
            quedan en mano <strong>{formatARS(cp.neto, 0)}</strong>: el 83% del bruto. En
            Camioneros casi todo el sueldo es remunerativo, así que el neto es{" "}
            <strong>directamente bruto × 0,83</strong> (los aportes son 11% de jubilación + 3% de
            PAMI + 3% de obra social). La antigüedad suma 1% del básico por año.
          </p>
        </RespuestaPrimero>
      )}

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tu sueldo en mano</h2>
        <p className="text-sm text-zinc-600">
          Elegí tu categoría, el mes y tu antigüedad para ver el detalle exacto de bruto, aportes y
          neto.
        </p>
        <CalculadoraCamioneros oferta={datosOferta("planilla-camioneros")} />
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold text-zinc-900">Neto por categoría: {mesEtiqueta}</h2>
        <p className="text-sm text-zinc-500">
          Sin antigüedad · escala nacional única · sin cuota sindical ni Ganancias.
        </p>

        {grupos.map((grupo) => {
          const cats = filas.filter((x) => x.cat.grupo === grupo && x.r !== null);
          return (
            <div key={grupo}>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-zinc-500">
                {grupo}
              </h3>
              <div className="overflow-x-auto rounded-xl border border-zinc-200">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-50 text-xs text-zinc-500">
                    <tr>
                      <th className="px-4 py-2.5 text-left font-medium">Categoría</th>
                      <th className="px-4 py-2.5 text-right font-medium">Bruto</th>
                      <th className="px-4 py-2.5 text-right font-medium">Descuentos</th>
                      <th className="px-4 py-2.5 text-right font-medium text-emerald-700">
                        En mano
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {cats.map(({ cat, r }) =>
                      r ? (
                        <tr key={cat.id} className="bg-white hover:bg-zinc-50">
                          <td className="px-4 py-2.5 text-zinc-800">{cat.nombre}</td>
                          <td className="px-4 py-2.5 text-right text-zinc-700">
                            {formatARS(r.totalRemunerativo, 0)}
                          </td>
                          <td className="px-4 py-2.5 text-right text-rose-600">
                            −{formatARS(r.descuentos, 0)}
                          </td>
                          <td className="px-4 py-2.5 text-right font-semibold text-emerald-700">
                            {formatARS(r.neto, 0)}
                          </td>
                        </tr>
                      ) : null
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        <p className="text-xs text-zinc-400">
          Descuentos: 17% de aportes (11% jubilación + 3% PAMI + 3% obra social) sobre el sueldo
          remunerativo. No incluye cuota sindical ni Ganancias 4ta categoría.
        </p>
      </section>

      <section className="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <h2 className="font-bold text-emerald-900">¿Por qué en Camioneros el neto sí es bruto × 0,83?</h2>
        <p className="text-sm text-emerald-800">
          En Comercio una parte del sueldo es <strong>no remunerativa</strong> y descuenta menos.
          En la escala de Camioneros, en cambio, el básico y la antigüedad son remunerativos. Sobre
          todo eso se aplica el 17% de aportes, así que el neto queda en el{" "}
          <strong>83% de siempre</strong>.
        </p>
        {cp && (
          <p className="text-sm text-emerald-800">
            Ejemplo Chofer de Primera {MES_TXT}: bruto {formatARS(cp.totalRemunerativo, 0)} − 17% (
            {formatARS(cp.descuentos, 0)}) = <strong>{formatARS(cp.neto, 0)}</strong> en mano.
          </p>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <dl className="space-y-6">
          {faqs.map((f) => (
            <div key={f.q}>
              <dt className="font-semibold text-zinc-900">{f.q}</dt>
              <dd className="mt-1 text-zinc-600">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <EmailCapture
        source="sueldo-neto-camioneros"
        headline="Avisame cuando se actualice la escala de Camioneros"
        subtext="Cuando se publiquen los nuevos básicos del convenio o cambien los aportes, te aviso. Sin spam."
      />

      <footer className="space-y-2 border-t border-zinc-100 pt-4 text-sm text-zinc-500">
        <p>
          Fuente:{" "}
          <a
            href={CAMIONEROS_FUENTES.circular.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-600"
          >
            {CAMIONEROS_FUENTES.circular.nombre}
          </a>
          . Consultado el {CAMIONEROS_FUENTES.circular.consultadoEl}.
        </p>
        <nav className="flex flex-wrap gap-x-4 gap-y-1">
          <Link href="/convenios/camioneros" className="underline hover:text-emerald-600">
            Calculadora completa Camioneros
          </Link>
          <Link href="/sueldo-neto" className="underline hover:text-emerald-600">
            Calculadora sueldo neto
          </Link>
          <Link href="/sueldo-neto/comercio" className="underline hover:text-emerald-600">
            Neto Comercio
          </Link>
          <Link href="/aguinaldo" className="underline hover:text-emerald-600">
            Aguinaldo
          </Link>
        </nav>
      </footer>
    </article>
  );
}
