import type { Metadata } from "next";
import Link from "next/link";
import { CalculadoraUocra } from "@/components/CalculadoraUocra";
import { JsonLd } from "@/components/JsonLd";
import {
  CATEGORIAS_UOCRA,
  MESES_UOCRA,
  UOCRA_FUENTES,
  UOCRA_HOMOLOGACIONES,
  UOCRA_PROXIMA_PARITARIA,
  ZONAS_UOCRA,
} from "@/data/convenios/uocra";
import { formatARS } from "@/lib/formato";
import { textoProximaParitaria } from "@/lib/convenios";
import { datasetSchema, ORGANIZACION } from "@/lib/schema";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { SelloVerificado } from "@/components/SelloVerificado";
import { EmailCapture } from "@/components/EmailCapture";
import { PlanillaUocraCTA } from "@/components/PlanillaUocraCTA";
import { calcularUocra } from "@/lib/convenios";

export const metadata: Metadata = {
  title: "Sueldos UOCRA 2026: calculadora y escala por zona (CCT 76/75)",
  description:
    "Cuánto cobra un trabajador de la construcción en 2026: jornales oficiales UOCRA por categoría y zona, calculadora de jornal a sueldo mensual con asistencia perfecta y suma no remunerativa. Verificado contra los acuerdos firmados.",
  alternates: { canonical: "/convenios/uocra" },
  openGraph: {
    images: [
      {
        url: `/og?t=${encodeURIComponent("Sueldos UOCRA 2026")}&s=${encodeURIComponent("Jornales por zona y categoría — CCT 76/75")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿Cuánto cobra un oficial de la construcción en junio de 2026?",
    a: "El jornal oficial de un Oficial en Zona A (CABA, Buenos Aires y la mayoría de las provincias) es de $5.703 la hora. En un mes de jornada completa (44 hs semanales ≈ 190,67 hs) son unos $1.087.372 de básico; con asistencia perfecta (+20%) sube a $1.304.846, y con la suma no remunerativa de junio ($58.300) el bruto ronda $1.363.146 — en mano quedan aproximadamente $1.113.477.",
  },
  {
    q: "¿Cómo paso del jornal por hora al sueldo mensual?",
    a: "Multiplicás el jornal por las horas trabajadas en el mes. La jornada completa del convenio es de 44 horas semanales (máximo 9 por día), que en un mes promedio son 190,67 horas (44 × 52 semanas ÷ 12 meses). En la práctica el pago es quincenal.",
  },
  {
    q: "¿Qué zona me corresponde?",
    a: "La que corresponde al lugar donde trabajás: Zona A abarca CABA y la mayoría de las provincias; Zona B es La Pampa, Neuquén, Río Negro y Chubut; Zona C es Santa Cruz; y Zona C Austral es Tierra del Fuego, Antártida e Islas del Atlántico Sur. Las zonas B, C y C Austral cobran un adicional por zona desfavorable que ya está incluido en los jornales que publicamos.",
  },
  {
    q: "¿Qué es la asistencia perfecta del 20%?",
    a: "Un adicional del art. 52 del CCT 76/75: si en la quincena tenés asistencia perfecta, cobrás un 20% más sobre el salario básico de tu categoría. No la perdés por vacaciones, licencias especiales, feriados ni suspensiones por lluvia u otras causas ajenas.",
  },
  {
    q: "¿Qué es la suma no remunerativa (SNR) que figura en los acuerdos?",
    a: "Un monto fijo por categoría y zona que acompaña a los aumentos de 2026: se paga el 50% con cada quincena y solo descuenta el aporte a la obra social (3%). Es transitoria: el acuerdo vigente la absorbe al básico en agosto de 2026.",
  },
  {
    q: "¿En la construcción se cobra antigüedad?",
    a: "No como porcentaje del sueldo: el régimen de la construcción (Ley 22.250) no tiene el adicional por antigüedad típico de otros convenios. La antigüedad sí mejora tus vacaciones, y en lugar de indemnización por despido existe el fondo de cese laboral.",
  },
  {
    q: "¿Qué es el fondo de cese laboral?",
    a: "El reemplazo de la indemnización por despido en la construcción: el empleador deposita todos los meses un 12% de tu remuneración durante el primer año (8% después del año) en una cuenta a tu nombre, y ese fondo lo cobrás cuando termina la relación laboral, sin importar la causa. No es un descuento sobre tu sueldo.",
  },
  {
    q: "¿Cuándo es el próximo aumento de UOCRA?",
    a: "El último tramo del acuerdo del 19/5/2026 ya está cargado y verificado: agosto 2026 sube +1,9% sobre los básicos de julio y además absorbe al jornal toda la suma no remunerativa, así que el jornal salta un 9,1% de una vez y el mes queda sin SNR (un Oficial en Zona A pasa de $5.817 a $6.348 la hora). De septiembre en adelante todavía no hay escala: el acuerdo la deja en manos de la Comisión Especial, que se reunió el 20 de julio de 2026 — cuando se firme y publique la tabla, la cargamos acá.",
  },
  {
    q: "¿El sereno cómo cobra?",
    a: "Es la única categoría con sueldo mensual fijo del convenio (en junio 2026: $881.193 en Zona A), porque su jornada de vigilancia es de 12 horas corridas (art. 12 del CCT). Su suma no remunerativa es igual a la del ayudante.",
  },
  {
    q: "¿Cuánto queda en mano de un sueldo de UOCRA?",
    a: "De lo remunerativo (básico + asistencia perfecta) se descuenta el 17% de aportes de ley (11% jubilación + 3% PAMI + 3% obra social) más el aporte solidario del 2% que fijaron los acuerdos 2026 (a los afiliados se lo absorbe la cuota sindical del 2,5%). La SNR solo descuenta el 3% de obra social. Ganancias aplica recién en sueldos altos.",
  },
  {
    q: "¿Los trabajadores de la construcción cobran aguinaldo?",
    a: "Sí: el SAC es igual que en cualquier empleo — 50% del mejor sueldo del semestre, pagadero el 30 de junio y el 18 de diciembre. Con sueldos que varían por horas trabajadas, conviene identificar el mejor mes del semestre: calculalo con nuestra calculadora de aguinaldo.",
  },
];

export default function UocraPage() {
  const junio = MESES_UOCRA.find((m) => m.id === "junio-2026")!;
  const catsJornal = CATEGORIAS_UOCRA.filter((c) => !c.mensual);
  const sereno = CATEGORIAS_UOCRA.find((c) => c.mensual)!;
  // Caso computado (regla 2-2): Oficial, Zona A, jornada completa (190,67 hs), con asistencia.
  const oficialA = calcularUocra({
    mesId: "junio-2026",
    categoriaId: "oficial",
    zonaId: "a",
    horasMes: 190.67,
    conAsistencia: true,
    conAporteSindical: false,
  })!;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      datasetSchema({
        nombre: "Escala salarial UOCRA 2026 (CCT 76/75)",
        descripcion:
          "Jornales por categoría y zona del CCT 76/75 (construcción), de abril a julio de 2026, con asistencia perfecta y suma no remunerativa, verificados contra los acuerdos firmados UOCRA-CAMARCO homologados.",
        url: "/convenios/uocra",
        modificado: "2026-06-13",
        fuenteNombre: UOCRA_HOMOLOGACIONES.tramo2,
      }),
      {
        "@type": "WebApplication",
        name: "Calculadora de sueldo UOCRA 2026",
        url: "https://calcular.ar/convenios/uocra",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        image: "https://calcular.ar/og",
        offers: { "@type": "Offer", price: "0", priceCurrency: "ARS" },
        inLanguage: "es-AR",
      },
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
          <Link href="/convenios" className="hover:underline">
            Convenios
          </Link>{" "}
          · UOCRA
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Sueldos de UOCRA 2026: jornales por categoría y zona (CCT 76/75)
        </h1>
        <p className="text-zinc-600">
          Elegí tu categoría y tu zona y pasá del <strong>jornal por hora</strong> al{" "}
          <strong>sueldo mensual</strong>, con la asistencia perfecta del 20% y la suma no
          remunerativa del mes. Valores tomados de los{" "}
          <strong>acuerdos firmados por UOCRA y CAMARCO</strong> — los documentos oficiales,
          no blogs.
        </p>
      </header>

      <SelloVerificado
        verificadoEl={UOCRA_FUENTES.consultadoEl}
        fuente={UOCRA_FUENTES.acuerdoTramo2}
        norma={`CCT 76/75 · ${UOCRA_HOMOLOGACIONES.tramo2}`}
      />

      <RespuestaPrimero actualizado={UOCRA_FUENTES.consultadoEl}>
        <p>
          Un <strong>Oficial</strong> de la construcción (UOCRA, CCT 76/75) en Zona A cobra en
          junio 2026 un jornal de <strong>{formatARS(junio.jornales.oficial.a, 0)}/hora</strong>.
          Una jornada completa (190,67 hs/mes) con asistencia perfecta (+20%) y la suma no
          remunerativa del mes da <strong>≈ {formatARS(oficialA.bruto, 0)} brutos</strong> y{" "}
          <strong>≈ {formatARS(oficialA.neto, 0)} en mano</strong>. Los jornales varían por zona
          (A a C Austral) y salen de los acuerdos UOCRA-CAMARCO homologados. En la construcción no
          hay antigüedad como % del sueldo: rige el fondo de cese laboral (Ley 22.250).
        </p>
      </RespuestaPrimero>

      <CalculadoraUocra />

      <PlanillaUocraCTA />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Jornales de junio 2026, por categoría y zona
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Jornal horario en pesos (el adicional por zona desfavorable ya está incluido). El
            sereno cobra mensual:
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
                {catsJornal.map((cat) => (
                  <tr key={cat.id} className="border-t border-zinc-100">
                    <td className="px-4 py-2.5 text-zinc-600">{cat.nombre}</td>
                    {ZONAS_UOCRA.map((z) => (
                      <td key={z.id} className="px-4 py-2.5 text-right text-zinc-900">
                        {formatARS(
                          junio.jornales[cat.id as Exclude<typeof cat.id, "sereno">][z.id],
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
                      {formatARS(junio.serenoMensual[z.id], 0)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-sm text-zinc-500">
          A esto se suma la <strong>SNR de junio</strong> (de{" "}
          {formatARS(junio.snr.ayudante.a, 0)} a {formatARS(junio.snr["oficial-especializado"]["c-austral"], 0)}{" "}
          según categoría y zona). La escala de cada mes:{" "}
          {MESES_UOCRA.map((m, i) => (
            <span key={m.id}>
              {i > 0 && " · "}
              <Link
                href={`/convenios/uocra/${m.id}`}
                className="font-medium text-emerald-700 hover:underline"
              >
                {m.etiqueta.toLowerCase()}
              </Link>
            </span>
          ))}
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Las zonas del convenio</h2>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-zinc-50 text-left text-zinc-700">
                <th className="px-4 py-2.5 font-semibold">Zona</th>
                <th className="px-4 py-2.5 font-semibold">Provincias</th>
              </tr>
            </thead>
            <tbody>
              {ZONAS_UOCRA.map((z) => (
                <tr key={z.id} className="border-t border-zinc-100">
                  <td className="px-4 py-2.5 font-semibold text-zinc-900">{z.nombre}</td>
                  <td className="px-4 py-2.5 text-zinc-600">{z.provincias}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-500">
          Los valores por zona salen de las tablas firmadas (oficiales); la composición
          provincial se basa en el CCT 76/75 y sus acuerdos modificatorios.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Los acuerdos 2026, en corto</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            La paritaria 2026 de la construcción avanza por tramos cortos. El acuerdo del
            31/3/2026 dio +2% en marzo, +1,9% en abril y +1,8% en mayo; el del 19/5/2026 suma{" "}
            <strong>+2,1% en junio, +2% en julio y +1,9% en agosto</strong>, siempre
            acumulativos y acompañados por una SNR mensual que en agosto se absorbe al básico.
            Ambos están homologados ({UOCRA_HOMOLOGACIONES.tramo1}; {UOCRA_HOMOLOGACIONES.tramo2}).
          </p>
          <p className="rounded-xl bg-white p-4 font-medium text-zinc-800 shadow-sm">
            Sueldo mensual ≈ jornal × horas del mes (190,67 hs la jornada completa) + 20% de
            asistencia perfecta + SNR del mes.
          </p>
          <p>
            {textoProximaParitaria(UOCRA_PROXIMA_PARITARIA, new Date().toISOString().slice(0, 10))} Cuando salga, la
            escala se actualiza acá desde el documento firmado.
          </p>
        </div>
      </section>

      <EmailCapture
        source="convenio-uocra"
        headline="Avisame cuando UOCRA firme la próxima paritaria"
        subtext="Los jornales cambian varias veces al año y esta página se actualiza el mismo día que sale el acuerdo con CAMARCO. Te mando un mail cuando pase, así no liquidás con la escala vieja. Sin spam."
      />

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Preguntas frecuentes</h2>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-zinc-200 bg-white p-4 open:shadow-sm"
            >
              <summary className="cursor-pointer font-semibold text-zinc-800 group-open:text-emerald-700">
                {f.q}
              </summary>
              <p className="mt-2 text-sm text-zinc-600">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Fuentes oficiales</h2>
        <ul className="space-y-1.5 text-sm text-zinc-600">
          {[
            UOCRA_FUENTES.acuerdoTramo2,
            UOCRA_FUENTES.acuerdoTramo1,
            UOCRA_FUENTES.cct,
            UOCRA_FUENTES.ley22250,
          ].map((f) => (
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
          Última verificación: {UOCRA_FUENTES.consultadoEl}. Mirá{" "}
          <Link href="/sueldo-neto/construccion" className="text-emerald-700 underline">
            cuánto te queda en mano por categoría
          </Link>
          , calculá tu{" "}
          <Link href="/aguinaldo" className="text-emerald-700 underline">
            aguinaldo
          </Link>{" "}
          y tus{" "}
          <Link href="/vacaciones" className="text-emerald-700 underline">
            vacaciones
          </Link>
          , o mirá si tu paritaria le gana a la{" "}
          <Link href="/inflacion" className="text-emerald-700 underline">
            inflación
          </Link>
          .
        </p>
        <p className="text-xs text-zinc-400">
          Desde junio de 2026 el recibo de sueldo tiene un{" "}
          <Link
            href="/blog/nuevo-recibo-de-sueldo-2026"
            className="text-emerald-700 underline"
          >
            formato nuevo (Decreto 407/2026)
          </Link>
          : cuatro secciones y el costo laboral del empleador a la vista. Tu sueldo en mano no
          cambia.
        </p>
      </section>
    </article>
  );
}
