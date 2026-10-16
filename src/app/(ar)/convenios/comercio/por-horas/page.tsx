import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { SelloVerificado } from "@/components/SelloVerificado";
import {
  CATEGORIAS_COMERCIO,
  COMERCIO_FUENTES,
  COMERCIO_HOMOLOGACION,
  MESES_COMERCIO,
} from "@/data/convenios/comercio";
import { breadcrumbSchema } from "@/lib/archivo-mensual";
import { calcularComercio } from "@/lib/convenios";
import { formatARS } from "@/lib/formato";
import { periodoDeMes, vigenteEn } from "@/lib/hoy";
import { datasetSchema, ORGANIZACION } from "@/lib/schema";

// Página nacida de Search Console (2026-10-16): "cuánto cobra un empleado de comercio por 4/8
// horas" sumaba ~2.400 impresiones al mes en /convenios/comercio con 0,3-0,5% de CTR, porque esa
// página no muestra el número por jornada. Todos los montos salen de calcularComercio sobre el mes
// vigente: al rotar la escala, la página se actualiza sola.
const MES = vigenteEn(MESES_COMERCIO, periodoDeMes);
const MES_TXT = MES.etiqueta.toLowerCase();
const $ = (n: number) => formatARS(n, 0);

const JORNADAS = [
  { horas: 4, factor: 0.5, nombre: "4 horas" },
  { horas: 6, factor: 0.75, nombre: "6 horas" },
  { horas: 8, factor: 1, nombre: "8 horas" },
] as const;

function sueldo(categoriaId: string, factor: number) {
  return calcularComercio({
    mesId: MES.id,
    categoriaId,
    aniosAntiguedad: 0,
    jornadaFactor: factor,
    conPresentismo: true,
  })!;
}

const VB4 = sueldo("vendedor-b", 0.5);
const VB6 = sueldo("vendedor-b", 0.75);
const VB8 = sueldo("vendedor-b", 1);

const FILAS = CATEGORIAS_COMERCIO.map((c) => ({
  categoria: c,
  porJornada: JORNADAS.map((j) => sueldo(c.id, j.factor)),
}));

export const metadata: Metadata = {
  title: `Comercio por 4 horas: ${$(VB4.bruto)} en ${MES_TXT}`,
  description: `Cuánto cobra un empleado de comercio por 4, 6 y 8 horas en ${MES_TXT}, por categoría, en bruto y en mano. Escala oficial de FAECYS, proporcional a tu jornada.`,
  alternates: { canonical: "/convenios/comercio/por-horas" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent(`Comercio por 4, 6 y 8 horas`)}&s=${encodeURIComponent(`Escala FAECYS de ${MES_TXT}`)}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: `¿Cuánto cobra un empleado de comercio por 4 horas en ${MES_TXT}?`,
    a: `Cobra la mitad del sueldo de jornada completa. Un Vendedor B sin antigüedad y con presentismo cobra ${$(VB4.bruto)} brutos por 4 horas diarias. En mano le quedan unos ${$(VB4.neto)}, antes de la cuota sindical.`,
  },
  {
    q: `¿Y por 8 horas?`,
    a: `Las 8 horas son la jornada completa del sector. El mismo Vendedor B cobra ${$(VB8.bruto)} brutos y le quedan unos ${$(VB8.neto)} en mano.`,
  },
  {
    q: "¿Por 6 horas cobro el 75%?",
    a: `Sí. Con 6 horas cobrás el 75% del básico y también el 75% de las sumas no remunerativas. Para un Vendedor B son ${$(VB6.bruto)} brutos en ${MES_TXT}.`,
  },
  {
    q: "¿La suma no remunerativa también se reduce con media jornada?",
    a: `Sí, en la misma proporción que tus horas. Con jornada completa son ${$(MES.noRemunerativo)}. Con 4 horas cobrás ${$(MES.noRemunerativo * 0.5)}. Lo dice la cláusula cuarta del acuerdo 2026.`,
  },
  {
    q: "¿Puedo hacer horas extra si trabajo media jornada?",
    a: "Sí, desde el 6 de marzo de 2026, siempre que sea voluntario: no te las pueden imponer. La Ley 27.802 también eliminó el tope de dos tercios de la jornada, así que pasarte ya no te da derecho al sueldo completo. Cada hora extra se paga aparte.",
  },
];

export default function ComercioPorHorasPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      datasetSchema({
        nombre: `Sueldo de Comercio por 4, 6 y 8 horas en ${MES_TXT} (CCT 130/75)`,
        descripcion: `Sueldo bruto y en mano de cada categoría del CCT 130/75 en ${MES_TXT} para jornadas de 4, 6 y 8 horas, con presentismo y sin antigüedad, calculado sobre la escala oficial de FAECYS.`,
        url: "/convenios/comercio/por-horas",
        modificado: "2026-10-16",
      }),
      breadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Convenios", url: "/convenios" },
        { name: "Empleados de Comercio", url: "/convenios/comercio" },
        { name: "Por 4, 6 y 8 horas", url: "/convenios/comercio/por-horas" },
      ]),
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
        <p className="text-sm font-medium text-emerald-700">
          <Link href="/convenios/comercio" className="hover:underline">
            Empleados de Comercio
          </Link>{" "}
          · Por horas
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Cuánto cobra un empleado de comercio por 4, 6 y 8 horas en {MES_TXT}
        </h1>
        <p className="text-zinc-600">
          El sueldo de Comercio es proporcional a tus horas. Acá tenés el número de cada
          categoría para las tres jornadas más comunes, en bruto y en mano.
        </p>
      </header>

      <SelloVerificado
        verificadoEl={COMERCIO_FUENTES.consultadoEl}
        fuente={COMERCIO_FUENTES.escalas}
        norma={`CCT 130/75 · ${COMERCIO_HOMOLOGACION}`}
      />

      <RespuestaPrimero actualizado={COMERCIO_FUENTES.consultadoEl}>
        <p>
          Un Vendedor B (la categoría más común en locales) cobra en {MES_TXT}{" "}
          <strong>{$(VB4.bruto)} brutos por 4 horas</strong>,{" "}
          <strong>{$(VB6.bruto)} por 6 horas</strong> y{" "}
          <strong>{$(VB8.bruto)} por 8 horas</strong>. Son montos con presentismo y sin
          antigüedad. En mano le quedan unos {$(VB4.neto)}, {$(VB6.neto)} y {$(VB8.neto)}.
        </p>
        <p>
          La regla es simple: con 4 horas cobrás el 50% y con 6 horas el 75% del sueldo de
          jornada completa. La suma no remunerativa también se reduce en la misma proporción.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-zinc-900">
          Sueldo bruto por categoría y jornada ({MES_TXT})
        </h2>
        <p className="text-sm text-zinc-600">
          Con presentismo y sin antigüedad. Cada año de antigüedad suma un 1%. Para tu caso
          exacto, usá la{" "}
          <Link href="/convenios/comercio" className="text-emerald-700 underline">
            calculadora de Comercio
          </Link>
          .
        </p>
        <div className="overflow-x-auto rounded-xl border border-zinc-200">
          <table className="w-full text-xs sm:text-sm">
            <thead className="bg-zinc-50 text-left text-zinc-600">
              <tr>
                <th className="px-2 py-2 font-medium sm:px-3">Categoría</th>
                {JORNADAS.map((j) => (
                  <th key={j.horas} className="whitespace-nowrap px-2 py-2 text-right font-medium sm:px-3">
                    {j.nombre}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {FILAS.map(({ categoria, porJornada }) => (
                <tr key={categoria.id}>
                  <td className="px-2 py-2 text-zinc-900 sm:px-3">{categoria.nombre}</td>
                  {porJornada.map((r, i) => (
                    <td key={JORNADAS[i].horas} className="whitespace-nowrap px-2 py-2 text-right tabular-nums text-zinc-700 sm:px-3">
                      {$(r.bruto)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-2">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-xl border border-zinc-200 bg-white p-4">
              <summary className="cursor-pointer font-medium text-zinc-900">{f.q}</summary>
              <p className="mt-2 text-zinc-700">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-2 text-sm text-zinc-600">
        <p>
          También te puede servir:{" "}
          <Link href={`/convenios/comercio/${MES.id}`} className="text-emerald-700 underline">
            la escala completa de {MES_TXT}
          </Link>
          , el{" "}
          <Link href="/sueldo-neto/comercio" className="text-emerald-700 underline">
            sueldo neto de Comercio
          </Link>{" "}
          y la guía de{" "}
          <Link href="/tiempo-parcial" className="text-emerald-700 underline">
            media jornada
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
