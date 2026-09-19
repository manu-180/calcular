import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { FirmaAutor } from "@/components/FirmaAutor";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { PlanillaComercioCTA } from "@/components/PlanillaComercioCTA";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import {
  CATEGORIAS_COMERCIO,
  COMERCIO_FUENTES,
  COMERCIO_INCORPORACION,
  COMERCIO_TRAMOS_ACUERDO_2026,
  MESES_COMERCIO,
} from "@/data/convenios/comercio";
import { calcularComercio } from "@/lib/convenios";
import { formatARS } from "@/lib/formato";

const PUBLICADO = "30 de julio de 2026";
const SLUG = "/blog/aumento-comercio-agosto-2026";

const $ = (n: number) => formatARS(n, 0);
const pct = (n: number) =>
  n.toLocaleString("es-AR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

// ── Todo lo numérico sale de la escala oficial, nunca escrito a mano ────────────
const JUNIO = MESES_COMERCIO.find((m) => m.id === "junio-2026")!;
const JULIO = MESES_COMERCIO.find((m) => m.id === "julio-2026")!;
const AGOSTO = MESES_COMERCIO.find((m) => m.id === "agosto-2026")!;
const SEPTIEMBRE = MESES_COMERCIO.find((m) => m.id === "septiembre-2026")!;

const CAT_REF = "vendedor-b" as const;
const CAT_REF_NOMBRE = CATEGORIAS_COMERCIO.find((c) => c.id === CAT_REF)!.nombre;

const totalJunio = JUNIO.basicos[CAT_REF] + JUNIO.noRemunerativo;

// Ejemplo de referencia: jornada completa, sin antigüedad, con presentismo.
const agostoRef = calcularComercio({
  mesId: AGOSTO.id,
  categoriaId: CAT_REF,
  aniosAntiguedad: 0,
  jornadaFactor: 1,
  conPresentismo: true,
})!;

// Tabla de tramos: qué total de convenio deja cada mes para la categoría de referencia.
const tramos = COMERCIO_TRAMOS_ACUERDO_2026.map((t) => {
  const mes = MESES_COMERCIO.find((m) => m.id === t.mesId)!;
  const total = mes.basicos[CAT_REF] + mes.noRemunerativo;
  return {
    etiqueta: mes.etiqueta,
    porcentaje: t.porcentaje,
    basico: mes.basicos[CAT_REF],
    noRem: mes.noRemunerativo,
    asignacion: mes.asignacionExtraordinaria ?? 0,
    total,
    subaDesdeJunio: total - totalJunio,
  };
});

// El interés compuesto que NO se aplica: si los tres 1,9% se acumularan, septiembre
// terminaría más arriba. Sirve para mostrar por qué "1,9% + 1,9% + 1,9%" ≠ 5,7%.
const acumuladoTeorico = (Math.pow(1.019, 3) - 1) * 100;
const totalSeptiembre = SEPTIEMBRE.basicos[CAT_REF] + SEPTIEMBRE.noRemunerativo;
const totalSiFueraAcumulativo = totalJunio * Math.pow(1.019, 3);
const diferenciaAcumulativo = totalSiFueraAcumulativo - totalSeptiembre;

const bonoTotal = MESES_COMERCIO.reduce((a, m) => a + (m.asignacionExtraordinaria ?? 0), 0);

// Escala completa de agosto por categoría (jornada completa, sin antigüedad).
const escalaAgosto = CATEGORIAS_COMERCIO.map((cat) => ({
  nombre: cat.nombre,
  basico: AGOSTO.basicos[cat.id],
  total: AGOSTO.basicos[cat.id] + AGOSTO.noRemunerativo + (AGOSTO.asignacionExtraordinaria ?? 0),
}));

export const metadata: Metadata = {
  title: "Aumento de comercio agosto 2026: escala, bono de $50.000 y cuánto cobrás",
  description: `El acuerdo del 22/7/2026 da +${pct(COMERCIO_TRAMOS_ACUERDO_2026[2].porcentaje)}% en tres tramos que NO se acumulan, más un bono de ${$(bonoTotal)} en dos cuotas. La escala oficial de agosto por categoría, verificada contra la circular de FAECYS.`,
  alternates: { canonical: SLUG },
  openGraph: {
    type: "article",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Aumento de Comercio: agosto 2026")}&s=${encodeURIComponent("Escala oficial + el bono de $50.000, explicado")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const faqs = [
  {
    q: "¿De cuánto es el aumento de comercio en agosto de 2026?",
    a: `El acuerdo del 22/7/2026 entre FAECYS y las cámaras (CAC, CAME y UDECA) fija un ${pct(COMERCIO_TRAMOS_ACUERDO_2026[2].porcentaje)}% para el trimestre, repartido en tres tramos que se calculan sobre el mismo total de junio y NO se acumulan entre sí: +${pct(COMERCIO_TRAMOS_ACUERDO_2026[0].porcentaje)}% en julio, +${pct(COMERCIO_TRAMOS_ACUERDO_2026[1].porcentaje)}% en agosto y +${pct(COMERCIO_TRAMOS_ACUERDO_2026[2].porcentaje)}% en septiembre. Para un ${CAT_REF_NOMBRE}, el total de convenio pasa de ${$(totalJunio)} en junio a ${$(tramos[1].total)} en agosto.`,
  },
  {
    q: "¿Cuándo se cobra el bono de $50.000 de comercio?",
    a: `En dos cuotas de ${$(JULIO.asignacionExtraordinaria ?? 0)}: una con el sueldo de julio y otra con el de agosto de 2026. En la escala oficial figura como «asignación extraordinaria por única vez». Es no remunerativa y la circular la excluye expresamente de la antigüedad y del presentismo, así que se suma plana al recibo: no la multiplica ningún adicional. Tampoco entra en la base del aguinaldo.`,
  },
  {
    q: "¿El aumento del 1,9% de julio, agosto y septiembre se acumula?",
    a: `No, y es el error más repetido. Los tres tramos se calculan siempre sobre la MISMA base (el total de junio de 2026), así que el efecto final es ${pct(COMERCIO_TRAMOS_ACUERDO_2026[2].porcentaje)}%, no ${pct(acumuladoTeorico)}%. Se ve en la propia escala de FAECYS: si fueran acumulativos, en septiembre un ${CAT_REF_NOMBRE} tendría que cobrar ${$(Math.round(totalSiFueraAcumulativo))} y la tabla oficial dice ${$(totalSeptiembre)} — ${$(Math.round(diferenciaAcumulativo))} de diferencia.`,
  },
  {
    q: "¿Los $120.000 no remunerativos se incorporaron al básico en julio?",
    a: `No. El acuerdo anterior (26/3/2026) preveía incorporarlos de golpe en julio, pero el acuerdo del 22/7/2026 corrió esa absorción: los $120.000 siguen como suma no remunerativa hasta noviembre y recién pasan al básico de a $20.000 por mes, entre diciembre de 2026 y mayo de 2027. Si tu recibo de julio muestra el básico sin las sumas no remunerativas, está mal armado.`,
  },
  {
    q: "¿Cuánto cobra un empleado de comercio en agosto de 2026?",
    a: `Un ${CAT_REF_NOMBRE} de jornada completa, sin antigüedad y cobrando presentismo tiene ${$(agostoRef.bruto)} de bruto en agosto (incluye el básico de ${$(AGOSTO.basicos[CAT_REF])}, los ${$(AGOSTO.noRemunerativo)} no remunerativos, el presentismo y la cuota de ${$(AGOSTO.asignacionExtraordinaria ?? 0)} del bono) y le quedan aproximadamente ${$(agostoRef.neto)} en mano, antes de cuota sindical y Ganancias. El número exacto para tu categoría, antigüedad y jornada lo da la calculadora de comercio.`,
  },
  {
    q: "¿La escala de septiembre vale también para octubre y noviembre?",
    a: "Sí: la circular publica una sola fila para «SEPT.-NOV./2026», así que los tres meses tienen los mismos valores. El movimiento siguiente es en diciembre y no cambia cuánto cobrás: cambia la composición, porque $20.000 pasan del no remunerativo al básico.",
  },
  {
    q: "¿De dónde salen estos números?",
    a: `De la circular oficial «ACUERDO 07/2026» que FAECYS publicó el 28 de julio de 2026, con las escalas de julio de 2026 a mayo de 2027. Verificamos las 21 categorías contra la escala de junio (que venía de la circular anterior): los tres tramos reproducen +${pct(COMERCIO_TRAMOS_ACUERDO_2026[0].porcentaje)}%, +${pct(COMERCIO_TRAMOS_ACUERDO_2026[1].porcentaje)}% y +${pct(COMERCIO_TRAMOS_ACUERDO_2026[2].porcentaje)}% exactos en todas. No usamos versiones publicadas en medios.`,
  },
];

export default function Post() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Aumento de comercio agosto 2026: escala, bono de $50.000 y cuánto cobrás",
        descripcion:
          "El acuerdo paritario del 22/7/2026 de Empleados de Comercio (CCT 130/75): los tres tramos no acumulativos, el bono de $50.000 en dos cuotas, la escala oficial de agosto por categoría y el nuevo cronograma de incorporación de los $120.000 al básico.",
        url: SLUG,
        modificado: "2026-07-30",
        publicado: "2026-07-30",
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
    <article className="space-y-8">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <p className="text-xs text-zinc-400">
          Guías · <FirmaAutor prefijo="por" /> · {PUBLICADO} · datos verificados al {COMERCIO_FUENTES.consultadoEl}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Aumento de comercio en agosto 2026: la escala, el bono de $50.000 y cuánto cobrás
        </h1>
        <p className="text-zinc-600">
          FAECYS publicó el 28 de julio la circular con las escalas del acuerdo paritario del 22
          de julio. Trae tres cosas que conviene separar bien: un aumento en tramos que{" "}
          <strong>no se acumulan</strong>, un bono de {$(bonoTotal)} en dos cuotas, y un cambio
          en el cronograma de los $120.000 no remunerativos que muchos todavía dan por
          incorporados al básico.
        </p>
      </header>

      <RespuestaPrimero actualizado={COMERCIO_FUENTES.consultadoEl}>
        <p>
          El acuerdo da un{" "}
          <strong>{pct(COMERCIO_TRAMOS_ACUERDO_2026[2].porcentaje)}% para el trimestre</strong>{" "}
          en tres tramos que se calculan sobre el <strong>mismo total de junio</strong> y no se
          acumulan: +{pct(COMERCIO_TRAMOS_ACUERDO_2026[0].porcentaje)}% en julio, +
          {pct(COMERCIO_TRAMOS_ACUERDO_2026[1].porcentaje)}% en agosto y +
          {pct(COMERCIO_TRAMOS_ACUERDO_2026[2].porcentaje)}% de septiembre a noviembre. Más un{" "}
          <strong>bono de {$(bonoTotal)}</strong> en dos cuotas de{" "}
          {$(JULIO.asignacionExtraordinaria ?? 0)}, con los sueldos de julio y agosto. En agosto,
          un {CAT_REF_NOMBRE} de jornada completa, sin antigüedad y con presentismo cobra{" "}
          <strong>{$(agostoRef.bruto)} brutos</strong> y le quedan{" "}
          <strong>≈ {$(agostoRef.neto)} en mano</strong>. Los $120.000 no remunerativos{" "}
          <strong>no se incorporaron al básico en julio</strong>: recién se absorben entre
          diciembre de 2026 y mayo de 2027.
        </p>
      </RespuestaPrimero>

      <p className="text-zinc-600">
        ¿Querés tu número exacto, con tu categoría, tu antigüedad y tu jornada? Está en la{" "}
        <Link href="/convenios/comercio" className="text-emerald-700 underline">
          calculadora de sueldo de comercio
        </Link>
        , y el neto en mano en{" "}
        <Link href="/sueldo-neto/comercio" className="text-emerald-700 underline">
          sueldo neto de comercio
        </Link>
        . Abajo está de dónde sale cada peso.
      </p>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los tres tramos, mes por mes (y por qué no se suman)
        </h2>
        <p className="text-zinc-600">
          Casi todas las notas cuentan el aumento como «tres subas del{" "}
          {pct(COMERCIO_TRAMOS_ACUERDO_2026[0].porcentaje)}%». Es cierto de dónde sale, pero
          induce al error de multiplicarlas. En la escala oficial, cada tramo se aplica sobre el{" "}
          <strong>total de junio de 2026</strong> (básico + los {$(JUNIO.noRemunerativo)} no
          remunerativos), no sobre el mes anterior. Por eso el efecto acumulado del trimestre es{" "}
          {pct(COMERCIO_TRAMOS_ACUERDO_2026[2].porcentaje)}% y no{" "}
          {pct(acumuladoTeorico)}%.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="border-b border-zinc-200 px-4 py-2.5 text-left text-xs text-zinc-500">
                {CAT_REF_NOMBRE}, jornada completa, sin antigüedad ni presentismo
              </caption>
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Mes</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Sobre junio</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Básico</th>
                  <th className="px-4 py-2.5 text-right font-semibold">No rem.</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Bono</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Total de convenio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr className="text-zinc-500">
                  <td className="px-4 py-2">{JUNIO.etiqueta} (base)</td>
                  <td className="px-4 py-2 text-right">—</td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {$(JUNIO.basicos[CAT_REF])}
                  </td>
                  <td className="px-4 py-2 text-right tabular-nums">{$(JUNIO.noRemunerativo)}</td>
                  <td className="px-4 py-2 text-right">—</td>
                  <td className="px-4 py-2 text-right tabular-nums">{$(totalJunio)}</td>
                </tr>
                {tramos.map((t) => (
                  <tr key={t.etiqueta}>
                    <td className="px-4 py-2 font-medium text-zinc-800">{t.etiqueta}</td>
                    <td className="px-4 py-2 text-right font-medium text-emerald-700">
                      +{pct(t.porcentaje)}%
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-700">
                      {$(t.basico)}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-700">
                      {$(t.noRem)}
                    </td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-700">
                      {t.asignacion > 0 ? $(t.asignacion) : "—"}
                    </td>
                    <td className="px-4 py-2 text-right font-semibold tabular-nums text-zinc-900">
                      {$(t.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
          <strong>La prueba de que no se acumulan:</strong> si los tres{" "}
          {pct(COMERCIO_TRAMOS_ACUERDO_2026[0].porcentaje)}% se aplicaran uno sobre otro, en
          septiembre un {CAT_REF_NOMBRE} tendría que cobrar{" "}
          {$(Math.round(totalSiFueraAcumulativo))} de convenio. La tabla oficial de FAECYS dice{" "}
          {$(totalSeptiembre)}: {$(Math.round(diferenciaAcumulativo))} menos. La columna «sobre
          junio» de arriba sale de dividir cada total por el de junio, categoría por categoría —
          da {pct(tramos[0].porcentaje)}%, {pct(tramos[1].porcentaje)}% y{" "}
          {pct(tramos[2].porcentaje)}% exactos en las 21.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          El bono de {$(bonoTotal)}: cómo se cobra y qué no arrastra
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            En la escala figura como <strong>«asignación extraordinaria por única vez»</strong> y
            se paga en dos cuotas de {$(JULIO.asignacionExtraordinaria ?? 0)}: una con el sueldo
            de julio y otra con el de agosto. Es no remunerativa, así que solo descuenta el 3% de
            obra social en vez del 17% completo.
          </p>
          <p>
            El detalle que más plata mueve está al pie de cada tabla de la circular:{" "}
            <strong>
              la asignación queda expresamente afuera de la antigüedad y del presentismo
            </strong>
            . O sea, no se multiplica por nada. Un empleado con 20 años de antigüedad cobra los
            mismos {$(JULIO.asignacionExtraordinaria ?? 0)} que uno que entró el mes pasado. Por
            la misma razón no integra la base del aguinaldo de diciembre.
          </p>
          <p>
            Si trabajás jornada reducida, sí se prorratea: la escala de 6 horas de la propia
            circular la muestra en {$((JULIO.asignacionExtraordinaria ?? 0) * 0.75)}, el 75%.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Escala completa de {AGOSTO.etiqueta.toLowerCase()}, por categoría
        </h2>
        <p className="text-zinc-600">
          Jornada completa, sin antigüedad. El total incluye el básico, los{" "}
          {$(AGOSTO.noRemunerativo)} no remunerativos y la cuota de{" "}
          {$(AGOSTO.asignacionExtraordinaria ?? 0)} del bono. Falta sumarle tu antigüedad (1% por
          año) y el presentismo (8,33%) si los cobrás.
        </p>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-50 text-left text-zinc-700">
                  <th className="px-4 py-2.5 font-semibold">Categoría</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Básico</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Total con no rem. y bono</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {escalaAgosto.map((c) => (
                  <tr key={c.nombre}>
                    <td className="px-4 py-2 text-zinc-700">{c.nombre}</td>
                    <td className="px-4 py-2 text-right tabular-nums text-zinc-700">
                      {$(c.basico)}
                    </td>
                    <td className="px-4 py-2 text-right font-medium tabular-nums text-zinc-900">
                      {$(c.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-zinc-400">
          Mes por mes:{" "}
          <Link href="/convenios/comercio/julio-2026" className="text-emerald-700 underline">
            julio
          </Link>
          ,{" "}
          <Link href="/convenios/comercio/agosto-2026" className="text-emerald-700 underline">
            agosto
          </Link>{" "}
          y{" "}
          <Link href="/convenios/comercio/septiembre-2026" className="text-emerald-700 underline">
            septiembre
          </Link>{" "}
          de 2026.
        </p>
      </section>

      <PlanillaComercioCTA />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Los $120.000 no se incorporaron en julio: el cronograma real
        </h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            Este es el punto que más recibos mal armados va a generar. El acuerdo de marzo de
            2026 decía que los {$(JUNIO.noRemunerativo)} no remunerativos pasaban al básico en
            julio. El acuerdo del 22 de julio <strong>cambió eso</strong>: siguen como suma no
            remunerativa hasta noviembre, y se absorben de a $20.000 por mes desde diciembre.
          </p>
          <p>
            Mientras dura la absorción, <strong>el total del mes no se mueve</strong>. Lo que
            cambia es cuánto de ese total es remunerativo — y eso sí te afecta: cada tramo que
            pasa al básico descuenta 17% en vez de 3% (menos plata en mano), pero también sube tu
            base de jubilación, de indemnización, de vacaciones y de horas extra.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-zinc-100">
              {COMERCIO_INCORPORACION.map((tramo) => (
                <tr key={tramo.etiqueta}>
                  <td className="px-4 py-2 text-zinc-700">{tramo.etiqueta}</td>
                  <td className="px-4 py-2 text-right tabular-nums text-zinc-900">
                    {$(tramo.noRemunerativo)} no remunerativos
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

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
          {[COMERCIO_FUENTES.escalas, COMERCIO_FUENTES.acuerdo, COMERCIO_FUENTES.cct].map((f) => (
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
          Última verificación: {COMERCIO_FUENTES.consultadoEl}. Seguí con{" "}
          <Link href="/convenios/comercio" className="text-emerald-700 underline">
            la calculadora de comercio
          </Link>
          , el{" "}
          <Link
            href="/blog/como-calcular-aguinaldo-empleado-de-comercio"
            className="text-emerald-700 underline"
          >
            aguinaldo paso a paso
          </Link>{" "}
          o{" "}
          <Link
            href="/blog/modelo-recibo-de-sueldo-empleado-de-comercio"
            className="text-emerald-700 underline"
          >
            cómo se lee tu recibo
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
