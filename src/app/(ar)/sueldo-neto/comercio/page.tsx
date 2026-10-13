import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { datosOferta } from "@/lib/oferta";
import { CalculadoraComercio } from "@/components/CalculadoraComercio";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { CATEGORIAS_COMERCIO, COMERCIO_FUENTES, MESES_COMERCIO } from "@/data/convenios/comercio";
import { calcularComercio } from "@/lib/convenios";
import { formatARS } from "@/lib/formato";
import { ORGANIZACION, articleSchema, datasetSchema } from "@/lib/schema";
import { periodoDeMes, vigenteEn } from "@/lib/hoy";

const MES = vigenteEn(MESES_COMERCIO, periodoDeMes);
const MES_ID = MES.id;
const MES_TXT = MES.etiqueta.toLowerCase();
const ACTUALIZADO_EL = COMERCIO_FUENTES.consultadoEl;

const faqs = [
  {
    q: "¿Por qué el neto de comercio no es el 83% del bruto?",
    a: "Porque en 2026 el CCT 130/75 tiene $120.000 de sumas no remunerativas que solo descuentan el 3% de obra social, no el 17% del sueldo básico. Así, el neto real es mayor que el que da la fórmula del 83%. Esa ventaja se va achicando entre diciembre de 2026 y mayo de 2027, cuando los $120.000 pasen al básico de a $20.000 por mes.",
  },
  {
    q: "¿Qué descuentos incluye el neto estimado?",
    a: "Incluye los aportes obligatorios: 11% de jubilación (SIPA), 3% de PAMI y 3% de obra social sobre el básico, la antigüedad y el presentismo, y además 3% de obra social sobre los $120.000 no remunerativos. No incluye la cuota sindical (FAECYS, cerca del 1%), Ganancias de 4ta categoría ni otras retenciones voluntarias.",
  },
  {
    q: "¿El presentismo siempre está incluido en la tabla de referencia?",
    a: "Sí. La tabla muestra el caso típico, sin faltas (presentismo = 8,33% del sueldo del mes). Se pierde con más de una falta injustificada; las ausencias por enfermedad, vacaciones o licencias legales no lo afectan. Usá la calculadora de arriba para ver el neto sin presentismo.",
  },
  {
    q: "¿Cuánto cambia el neto con la antigüedad?",
    a: "La antigüedad suma 1% del sueldo por cada año trabajado (art. 24 CCT 130/75), y se aplica tanto sobre el básico como sobre los $120.000 no remunerativos. Con 10 años de antigüedad el bruto sube un 10% y el neto sube en la misma proporción.",
  },
  {
    q: "¿Qué pasa con el neto cuando se incorporen los $120.000 al básico?",
    a: "El acuerdo del 22/7/2026 los pasa al básico de a $20.000 por mes entre diciembre de 2026 y mayo de 2027 (no de golpe en julio, como decía el acuerdo anterior). Cada tramo que pasa al básico descuenta 17% en vez de 3%, así que el neto se va acercando al 83% del bruto, y en mayo de 2027, con el no remunerativo en cero, llega. A cambio sube la base para tu jubilación, indemnización y vacaciones.",
  },
  {
    q: "¿Dónde figura mi categoría en el recibo?",
    a: "En el recibo de sueldo aparece la categoría del CCT 130/75: 'Vendedor A', 'Administrativo C', etc. La más común en locales de venta al público es Vendedor B. Si no la encontrás, tu empleador te la tiene que informar según el convenio.",
  },
];

export const metadata: Metadata = {
  title: "Sueldo neto de Comercio 2026: cuánto queda en mano",
  description:
    "Neto por categoría del CCT 130/75. Los no remunerativos solo pagan obra social, así que el neto real es mayor que el bruto por 0,83. Calculadora y tabla.",
  alternates: { canonical: "/sueldo-neto/comercio" },
};

export default function SueldoNetoComercioPage() {
  const mesEtiqueta = MES.etiqueta;

  const grupos = [...new Set(CATEGORIAS_COMERCIO.map((c) => c.grupo))];
  const filas = CATEGORIAS_COMERCIO.map((cat) => ({
    cat,
    r: calcularComercio({
      mesId: MES_ID,
      categoriaId: cat.id,
      aniosAntiguedad: 0,
      jornadaFactor: 1,
      conPresentismo: true,
    }),
  }));

  const vb = filas.find((x) => x.cat.id === "vendedor-b")?.r;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Sueldo Neto Empleados de Comercio 2026",
        descripcion:
          "Cuánto queda en mano según la escala del CCT 130/75 por categoría. Con la cuenta correcta de los $120.000 no remunerativos (3% de obra social, no 17%).",
        url: "/sueldo-neto/comercio",
        modificado: "2026-06-15",
      }),
      datasetSchema({
        nombre: "Tabla neto por categoría: Empleados de Comercio CCT 130/75 agosto 2026",
        descripcion:
          "Bruto, descuentos y neto estimado para las 21 categorías del CCT 130/75. Sin antigüedad, con presentismo, jornada completa.",
        url: "/sueldo-neto/comercio",
        modificado: "2026-06-15",
        fuenteNombre: COMERCIO_FUENTES.escalas.nombre,
        fuenteUrl: COMERCIO_FUENTES.escalas.url,
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
          <Link href="/convenios/comercio" className="hover:text-emerald-600">
            Empleados de Comercio
          </Link>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Sueldo Neto Empleados de Comercio 2026
        </h1>
        <p className="text-zinc-600">
          Cuánto te queda en mano según la escala oficial del <strong>CCT 130/75</strong>. Con la
          cuenta correcta de los <strong>$120.000 no remunerativos</strong>: solo pagan el 3% de obra
          social, no el 17%.
        </p>
      </header>

      {vb && (
        <RespuestaPrimero actualizado={ACTUALIZADO_EL}>
          <p>
            Un <strong>Vendedor B</strong> (la categoría más común en locales) con jornada
            completa, sin antigüedad y con presentismo tiene{" "}
            <strong>{formatARS(vb.bruto, 0)}</strong> de bruto en {MES_TXT} y le quedan en
            mano <strong>{formatARS(vb.neto, 0)}</strong> (el{" "}
            {((vb.neto / vb.bruto) * 100).toLocaleString("es-AR", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })}
            % del bruto). <strong>Es más que el 83% de siempre</strong> porque los{" "}
            {formatARS(MES.noRemunerativo, 0)} no remunerativos
            {MES.asignacionExtraordinaria
              ? ` y la asignación extraordinaria de ${formatARS(MES.asignacionExtraordinaria, 0)}`
              : ""}{" "}
            solo descuentan el{" "}
            <strong>3% de obra social</strong>. Esa ventaja se achica cuando los $120.000 pasen
            al básico, entre diciembre de 2026 y mayo de 2027. Si liquidás sueldos, la cuenta
            completa paso a paso está en{" "}
            <Link
              href="/blog/como-liquidar-sueldo-empleado-de-comercio"
              className="text-emerald-700 hover:underline"
            >
              cómo liquidar el sueldo de un empleado de comercio
            </Link>
            .
          </p>
        </RespuestaPrimero>
      )}

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Calculá tu sueldo en mano</h2>
        <p className="text-sm text-zinc-600">
          Elegí tu categoría, el mes y tu antigüedad para ver el detalle exacto de bruto, aportes y
          neto.
        </p>
        <CalculadoraComercio oferta={datosOferta("planilla-comercio")} />
      </section>

      <section className="space-y-5">
        <h2 className="text-xl font-bold text-zinc-900">
          Neto por categoría: {mesEtiqueta}
        </h2>
        <p className="text-sm text-zinc-500">
          Jornada completa · sin antigüedad · con presentismo · sin cuota sindical ni Ganancias.
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
                            {formatARS(r.bruto, 0)}
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
          Descuentos: 17% de aportes sobre el remunerativo y 3% de obra social sobre los $120.000
          no remunerativos. No incluye cuota sindical ni Ganancias 4ta categoría.
        </p>
      </section>

      <section className="space-y-3 rounded-xl border border-amber-200 bg-amber-50 p-5">
        <h2 className="font-bold text-amber-900">¿Por qué el neto no es bruto × 0,83?</h2>
        <p className="text-sm text-amber-800">
          La fórmula del 83% supone que todo el bruto descuenta el 17% de aportes. Pero en 2026 el
          CCT 130/75 tiene <strong>$120.000 de sumas no remunerativas</strong> que, por el mismo
          acuerdo, solo aportan a la obra social (<strong>3%</strong>).
        </p>
        {vb && (
          <p className="text-sm text-amber-800">
            Ejemplo Vendedor B {MES_TXT}: los {formatARS(vb.totalRemunerativo, 0)} remunerativos
            descuentan el 17% ({formatARS(vb.totalRemunerativo * 0.17, 0)}) y los{" "}
            {formatARS(vb.totalNoRemunerativo, 0)} no remunerativos solo el 3% (
            {formatARS(vb.totalNoRemunerativo * 0.03, 0)}). Descuento real:{" "}
            <strong>{formatARS(vb.descuentos, 0)}</strong>, no los{" "}
            {formatARS(vb.bruto * 0.17, 0)} del 17% parejo. La diferencia es{" "}
            <strong>{formatARS(vb.bruto * 0.17 - vb.descuentos, 0)} a tu favor</strong>.
          </p>
        )}
        <p className="text-sm text-amber-800">
          <strong>Desde diciembre de 2026</strong>, los $120.000 empiezan a pasar al básico de a
          $20.000 por mes. Cada tramo pasa a descontar 17% en vez de 3%, y en mayo de 2027 el neto
          vuelve al 83% del bruto.
        </p>
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
        source="sueldo-neto-comercio"
        headline="Avisame cuando se actualice la escala de Comercio"
        subtext="Cuando FAECYS publique los nuevos básicos del CCT 130/75 o cambien los aportes, te aviso. Sin spam."
      />

      <footer className="space-y-2 border-t border-zinc-100 pt-4 text-sm text-zinc-500">
        <p>
          Fuente:{" "}
          <a
            href={COMERCIO_FUENTES.escalas.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-emerald-600"
          >
            {COMERCIO_FUENTES.escalas.nombre}
          </a>
          . Consultado el {COMERCIO_FUENTES.consultadoEl}.
        </p>
        <nav className="flex flex-wrap gap-x-4 gap-y-1">
          <Link href="/convenios/comercio" className="underline hover:text-emerald-600">
            Calculadora completa Comercio
          </Link>
          <Link href="/sueldo-neto" className="underline hover:text-emerald-600">
            Calculadora sueldo neto
          </Link>
          <Link href="/aguinaldo" className="underline hover:text-emerald-600">
            Aguinaldo
          </Link>
          <Link href="/ganancias" className="underline hover:text-emerald-600">
            Ganancias 4ta
          </Link>
        </nav>
      </footer>
    </article>
  );
}
