import Link from "next/link";
import { PRODUCTOS } from "@/lib/mp";

// CTA hacia las planillas de audiencia masiva, para las calculadoras que ya tienen ese público.
// El precio y la garantía van a la vista (misma lección que PlanillaComercioCTA: un CTA sin
// precio manda a la landing gente que todavía no decidió nada).
//
// `desde` viaja como ?desde=… y termina en la referencia de MercadoPago: es la única forma de saber
// qué calculadora vende, porque con navegación SPA el referrer no cambia y Vercel Analytics está
// apagado. Query y no hash: con #desde= Next busca un ancla que no existe y deja la landing
// scrolleada debajo del header. La canonical de la landing consolida la URL para Google.
const COPY = {
  "planilla-casas-particulares": {
    titulo: "¿Le pagás el sueldo a alguien que trabaja en tu casa?",
    texto:
      "La planilla de Excel y Sheets hace esta cuenta todos los meses con la escala oficial ya cargada: sueldo, horas extras, aguinaldo, lo que le pagás a ARCA y un recibo para imprimir. Cuando cambia la escala, te llega actualizada sin costo.",
  },
  "planilla-monotributo": {
    titulo: "¿Cuánto más podés facturar sin saltar de categoría?",
    texto:
      "La planilla de Excel y Sheets lleva tu facturación mes a mes y te dice tu categoría por el mayor de los parámetros, el margen que te queda y la cuota que vas a pagar. Con las tablas nuevas de febrero y agosto incluidas.",
  },
} as const;

export function PlanillaCTA({ producto, desde }: { producto: keyof typeof COPY; desde: string }) {
  const p = PRODUCTOS[producto];
  const c = COPY[producto];
  return (
    <section data-oferta={producto} className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-emerald-900">{c.titulo}</p>
          <p className="mt-1 text-sm text-emerald-800">{c.texto}</p>
          <p className="mt-2 text-sm font-semibold text-emerald-900">
            ${p.precio.toLocaleString("es-AR")} pago único · devolución dentro de los 7 días
          </p>
        </div>
        <Link
          href={`${p.rutaLanding}?desde=${desde}`}
          data-evento="cta_compra"
          data-producto={producto}
          data-ubicacion="calculadora"
          className="shrink-0 rounded-lg bg-emerald-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-[background-color,transform] duration-200 hover:bg-emerald-700 active:translate-y-px"
        >
          Ver la planilla →
        </Link>
      </div>
    </section>
  );
}
