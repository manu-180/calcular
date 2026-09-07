import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { PlanillaComercioCTA } from "@/components/PlanillaComercioCTA";
import { articleSchema, ORGANIZACION } from "@/lib/schema";
import { DECRETO_407, RECIBO_SECCIONES, RECIBO_RUBROS_COSTO } from "@/data/recibo-sueldo";

export const metadata: Metadata = {
  title: "Nuevo recibo de sueldo 2026: qué cambió y cómo leerlo (Decreto 407/2026)",
  description:
    "Desde junio de 2026 el recibo de sueldo tiene formato nuevo (Decreto 407/2026): 4 secciones y el costo laboral del empleador a la vista. Qué cambió, qué NO cambia (tu sueldo neto sigue igual) y cómo leerlo, con la fuente oficial.",
  alternates: { canonical: "/blog/nuevo-recibo-de-sueldo-2026" },
  openGraph: {
    type: "article",
    images: [
      {
        url: `/og?t=${encodeURIComponent("Nuevo recibo de sueldo 2026")}&s=${encodeURIComponent("Qué cambió con el Decreto 407/2026 y cómo leerlo")}`,
        width: 1200,
        height: 630,
      },
    ],
  },
};

const PUBLICADO = "15 de junio de 2026";

const queMirar = [
  {
    titulo: "Tus datos personales",
    cuerpo:
      "CUIL, fecha de ingreso, antigüedad y categoría tienen que estar correctos: definen adicionales como la antigüedad y son la base de cualquier reclamo.",
  },
  {
    titulo: "El convenio y la categoría",
    cuerpo:
      "Determinan tu sueldo básico (el piso obligatorio del convenio). Si hacés tareas de una categoría superior, corresponde que te paguen como tal.",
  },
  {
    titulo: "Bruto, deducciones y neto",
    cuerpo:
      "El bruto con su determinación, las deducciones (aportes 11% + 3% + 3% = 17% sobre lo remunerativo) y el neto que cobrás. Es lo mismo que se descontaba antes: las alícuotas no cambiaron.",
  },
  {
    titulo: "El resumen del costo laboral (lo nuevo)",
    cuerpo:
      "El cuadro con lo que paga el empleador por encima de tu sueldo, discriminado por rubro. No te lo descuentan a vos: es información de transparencia sobre cuánto cuesta el puesto.",
  },
];

const faqs = [
  {
    q: "¿Desde cuándo rige el nuevo recibo de sueldo?",
    a: "Desde el 1 de junio de 2026, fecha de publicación del Decreto 407/2026 en el Boletín Oficial. Los recibos emitidos a partir de ese día deben adaptarse al nuevo modelo del artículo 140 de la LCT.",
  },
  {
    q: "¿El nuevo recibo me cambia el sueldo que cobro?",
    a: "No. La mayoría de los trabajadores no verá cambios en cuánto cobra: tampoco cambian los aportes ni los descuentos. El cambio es de formato y transparencia — el recibo ahora muestra también el costo laboral total que asume el empleador, pero tu neto se calcula igual que antes.",
  },
  {
    q: "¿Qué es el «costo laboral» que ahora aparece en el recibo?",
    a: "Es el resumen de lo que paga el empleador por encima de tu sueldo: contribuciones patronales (jubilación, obra social, PAMI/INSSJP, ART), aporte sindical, cámaras empresariales y otros conceptos. No es un descuento sobre tu sueldo: es información para visibilizar cuánto cuesta sostener el puesto de trabajo.",
  },
  {
    q: "¿Cuáles son las 4 secciones del nuevo recibo?",
    a: "Según el Decreto 407/2026: (a) datos del empleador (CUIT) y del trabajador (CUIL, fecha de ingreso, antigüedad y categoría); (b) las contribuciones a cargo del empleador; (c) la remuneración bruta con su determinación y las deducciones; y (d) la remuneración neta. Además, un cuadro resumen del costo laboral total.",
  },
  {
    q: "¿Qué hago si mi recibo no tiene el formato nuevo?",
    a: "Desde el 1/6/2026 el formato es obligación del empleador. Si tu recibo no lo refleja, podés pedírselo a tu empleador o consultar al sindicato de tu actividad. El recibo es además tu comprobante para cualquier reclamo de diferencias salariales (prescriben a los 2 años, art. 256 LCT).",
  },
];

export default function Post() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Nuevo recibo de sueldo 2026: qué cambió y cómo leerlo (Decreto 407/2026)",
        descripcion:
          "El nuevo modelo del recibo de haberes (art. 140 LCT) según el Decreto 407/2026: 4 secciones, el resumen del costo laboral del empleador, desde cuándo rige y qué mirar. Tu sueldo neto no cambia.",
        url: "/blog/nuevo-recibo-de-sueldo-2026",
        modificado: "2026-06-15",
        publicado: "2026-06-15",
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
          Guías · {PUBLICADO} · datos verificados al {PUBLICADO}
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Nuevo recibo de sueldo 2026: qué cambió y cómo leerlo
        </h1>
        <p className="text-zinc-600">
          El 1 de junio de 2026 cambió el modelo del recibo de sueldo en Argentina. Acá tenés qué
          cambió, qué <strong>no</strong> te cambia (spoiler: tu sueldo neto sigue igual) y cómo
          leer el recibo nuevo — con el texto del Decreto 407/2026 verificado en la fuente oficial,
          no en notas sueltas.
        </p>
      </header>

      <RespuestaPrimero actualizado={PUBLICADO}>
        <p>
          Desde el <strong>1 de junio de 2026</strong>, el <strong>Decreto 407/2026</strong>{" "}
          (reglamenta la Ley 27.802 de Modernización Laboral) cambió el formato del recibo de sueldo.
          Ahora se estructura en <strong>4 secciones</strong> —datos del empleador y trabajador, las
          contribuciones a cargo del empleador, el bruto con sus deducciones, y el neto— y suma un{" "}
          <strong>resumen del costo laboral total</strong> que paga la empresa por encima del sueldo.
          Lo importante: <strong>no cambia cuánto cobrás</strong> ni tus aportes; es un cambio de
          transparencia, no de plata. El neto se calcula igual que antes.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué cambió (y qué no te cambia)</h2>
        <div className="space-y-3 text-zinc-600">
          <p>
            El{" "}
            <a
              href={DECRETO_407.texto}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              Decreto 407/2026
            </a>{" "}
            (B.O. 1/6/2026) reglamentó la Ley 27.802 y redefinió el modelo del recibo de haberes del
            artículo 140 de la LCT. La premisa es <strong>visibilizar el costo total</strong> que
            asume la empresa para sostener cada puesto: el recibo dejó de mostrar solo lo que cobra
            el trabajador y ahora también detalla lo que paga el empleador por encima del sueldo.
          </p>
          <p className="rounded-xl bg-emerald-50 p-4 font-medium text-emerald-900">
            Lo que NO cambia: tu sueldo neto, tus aportes (11% + 3% + 3%) y tus descuentos siguen
            exactamente igual. Es un cambio de formato y transparencia, no de cuánto cobrás.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-zinc-900">Las 4 secciones del nuevo recibo</h2>
        <ol className="space-y-3">
          {RECIBO_SECCIONES.map((s) => (
            <li key={s.letra} className="flex gap-4">
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                {s.letra}
              </div>
              <div>
                <p className="font-semibold text-zinc-900">{s.titulo}</p>
                <p className="mt-0.5 text-sm text-zinc-600">{s.cuerpo}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">El resumen del costo laboral</h2>
        <p className="text-zinc-600">
          La novedad más visible. El recibo ahora incluye un cuadro con lo que paga el empleador por
          encima de tu sueldo, discriminado —como mínimo— en estos rubros:
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {RECIBO_RUBROS_COSTO.map((rubro) => (
            <li
              key={rubro}
              className="flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-700"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              {rubro}
            </li>
          ))}
        </ul>
        <p className="text-xs text-zinc-400">
          Estos importes los paga la empresa, no se descuentan de tu sueldo. Las alícuotas dependen
          del Decreto 814/2001 y de la actividad, por eso el monto exacto lo determina cada
          empleador o su contador.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Qué mirar en tu recibo</h2>
        <div className="space-y-3">
          {queMirar.map((m) => (
            <div key={m.titulo} className="rounded-xl border border-zinc-200 bg-white p-4">
              <p className="font-semibold text-zinc-900">{m.titulo}</p>
              <p className="mt-1 text-sm text-zinc-600">{m.cuerpo}</p>
            </div>
          ))}
        </div>
        <p className="text-zinc-600">
          ¿Querés controlar que el neto de tu recibo esté bien? Pasá tu bruto por la{" "}
          <Link href="/sueldo-neto" className="text-emerald-700 underline">
            calculadora de sueldo neto
          </Link>
          . Si estás en Comercio, mirá el{" "}
          <Link
            href="/blog/modelo-recibo-de-sueldo-empleado-de-comercio"
            className="text-emerald-700 underline"
          >
            modelo de recibo de Comercio con números reales
          </Link>{" "}
          o usá la{" "}
          <Link href="/convenios/comercio" className="text-emerald-700 underline">
            calculadora del CCT 130/75
          </Link>
          .
        </p>
      </section>

      {/* CTA al producto pago, enmarcado para empleadores que liquidan */}
      <PlanillaComercioCTA />

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
          <li>
            •{" "}
            <a
              href={DECRETO_407.texto}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              {DECRETO_407.nombre} — texto oficial
            </a>
          </li>
          <li>
            •{" "}
            <a
              href={DECRETO_407.bo}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              Decreto 407/2026 — Boletín Oficial ({DECRETO_407.publicacion})
            </a>
          </li>
        </ul>
        <p className="text-xs text-zinc-400">
          Última verificación: {DECRETO_407.consultadoEl}. Controlá tu sueldo en la{" "}
          <Link href="/sueldo-neto" className="text-emerald-700 underline">
            calculadora de sueldo neto
          </Link>{" "}
          o mirá las{" "}
          <Link href="/convenios" className="text-emerald-700 underline">
            escalas de convenio
          </Link>
          .
        </p>
      </section>
    </article>
  );
}
