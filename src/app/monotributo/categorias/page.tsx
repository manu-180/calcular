import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { CATEGORIAS, VIGENCIA } from "@/data/monotributo";
import { formatARS } from "@/lib/monotributo";
import { ORGANIZACION, articleSchema, datasetSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Categorías del Monotributo 2026: tabla completa y actualizada",
  description:
    "Tabla oficial de categorías del monotributo 2026 (A a K): topes de facturación, cuota mensual, superficie, energía y alquileres. Valores de ARCA vigentes desde febrero 2026.",
  alternates: { canonical: "/monotributo/categorias" },
};

export default function CategoriasPage() {
  const catA = CATEGORIAS[0];
  const catK = CATEGORIAS[CATEGORIAS.length - 1];
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZACION,
      articleSchema({
        titulo: "Categorías del monotributo 2026: tabla completa y actualizada",
        descripcion:
          "Topes de facturación, cuota mensual, superficie, energía y alquileres de las 11 categorías (A a K) del monotributo, con valores oficiales de ARCA.",
        url: "/monotributo/categorias",
        modificado: "2026-06-18",
      }),
      datasetSchema({
        nombre: "Categorías del monotributo 2026 (A a K)",
        descripcion:
          "Tabla oficial de las 11 categorías del monotributo argentino vigentes desde febrero 2026: tope de ingresos brutos anuales, cuota mensual total (servicios y venta), superficie, energía eléctrica y alquileres devengados.",
        url: "/monotributo/categorias",
        modificado: "2026-06-18",
        fuenteNombre: "ARCA — Categorías del monotributo",
        fuenteUrl: VIGENCIA.fuenteUrl,
      }),
    ],
  };

  return (
    <article className="space-y-8">
      <JsonLd data={jsonLd} />

      <header className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
          Categorías del monotributo 2026: tabla completa
        </h1>
        <p className="text-zinc-600">
          Todos los parámetros oficiales de las 11 categorías (A a K) vigentes desde el{" "}
          {VIGENCIA.desde}, publicados por ARCA: tope de facturación anual, cuota mensual según
          actividad, superficie, energía eléctrica y alquileres. ¿No sabés cuál te corresponde?{" "}
          <Link href="/monotributo" className="text-emerald-700 underline">
            Usá la calculadora
          </Link>{" "}
          y resolvelo en 10 segundos.
        </p>
      </header>

      <RespuestaPrimero actualizado={VIGENCIA.consultadoEl}>
        <p>
          El monotributo 2026 tiene <strong>11 categorías (A a K)</strong>, vigentes desde el{" "}
          {VIGENCIA.desde} por ARCA. La categoría se define por la facturación de los últimos 12
          meses (y, si tenés local, por superficie, energía y alquileres). La{" "}
          <strong>categoría A</strong> abarca ingresos anuales de hasta{" "}
          <strong>{formatARS(catA.ingresosBrutosMax)}</strong> con una cuota de{" "}
          <strong>{formatARS(catA.totalServicios)}/mes</strong>; la más alta, la{" "}
          <strong>categoría {catK.cat}</strong>, llega hasta{" "}
          <strong>{formatARS(catK.ingresosBrutosMax)}</strong> anuales. Si superás el tope de la K,
          quedás fuera del monotributo y pasás al régimen general. Los valores se actualizan por
          inflación dos veces al año.
        </p>
      </RespuestaPrimero>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Topes y cuota mensual total</h2>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
          <table className="w-full whitespace-nowrap text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="px-4 py-3">Cat.</th>
                <th className="px-4 py-3">Ingresos brutos anuales hasta</th>
                <th className="px-4 py-3">Total mensual servicios</th>
                <th className="px-4 py-3">Total mensual venta</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIAS.map((c) => (
                <tr key={c.cat} className="border-b border-zinc-100 last:border-0">
                  <td className="px-4 py-2.5 font-bold text-emerald-700">{c.cat}</td>
                  <td className="px-4 py-2.5">{formatARS(c.ingresosBrutosMax)}</td>
                  <td className="px-4 py-2.5">{formatARS(c.totalServicios)}</td>
                  <td className="px-4 py-2.5">{formatARS(c.totalVenta)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">Desglose de la cuota por componente</h2>
        <p className="text-sm text-zinc-600">
          La cuota total se compone de impuesto integrado (varía según actividad), aporte
          jubilatorio (SIPA) y obra social.
        </p>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
          <table className="w-full whitespace-nowrap text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="px-4 py-3">Cat.</th>
                <th className="px-4 py-3">Impuesto (servicios)</th>
                <th className="px-4 py-3">Impuesto (venta)</th>
                <th className="px-4 py-3">SIPA</th>
                <th className="px-4 py-3">Obra social</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIAS.map((c) => (
                <tr key={c.cat} className="border-b border-zinc-100 last:border-0">
                  <td className="px-4 py-2.5 font-bold text-emerald-700">{c.cat}</td>
                  <td className="px-4 py-2.5">{formatARS(c.impuestoServicios)}</td>
                  <td className="px-4 py-2.5">{formatARS(c.impuestoVenta)}</td>
                  <td className="px-4 py-2.5">{formatARS(c.sipa)}</td>
                  <td className="px-4 py-2.5">{formatARS(c.obraSocial)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-zinc-900">
          Parámetros físicos: superficie, energía y alquileres
        </h2>
        <p className="text-sm text-zinc-600">
          Estos parámetros aplican si tenés local u oficina afectados a la actividad. Si superás
          el valor de tu categoría según facturación, te corresponde la categoría mayor.
        </p>
        <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white">
          <table className="w-full whitespace-nowrap text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
                <th className="px-4 py-3">Cat.</th>
                <th className="px-4 py-3">Superficie hasta</th>
                <th className="px-4 py-3">Energía anual hasta</th>
                <th className="px-4 py-3">Alquileres anuales hasta</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIAS.map((c) => (
                <tr key={c.cat} className="border-b border-zinc-100 last:border-0">
                  <td className="px-4 py-2.5 font-bold text-emerald-700">{c.cat}</td>
                  <td className="px-4 py-2.5">{c.superficieM2} m²</td>
                  <td className="px-4 py-2.5">{c.energiaKw.toLocaleString("es-AR")} kW</td>
                  <td className="px-4 py-2.5">{formatARS(c.alquileresMax)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-600">
          Para venta de productos rige además un precio unitario máximo de{" "}
          {formatARS(CATEGORIAS[0].precioUnitarioMax)} por unidad.
        </p>
      </section>

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Para tener en cuenta</h2>
        <ul className="space-y-2 text-sm text-zinc-600">
          <li>
            • Las escalas se actualizan por inflación dos veces al año; estos valores rigen desde
            el {VIGENCIA.desde} y la próxima actualización está prevista para{" "}
            {VIGENCIA.proximaActualizacion}.
          </li>
          <li>
            • Si tu facturación de los últimos 12 meses cambió de escala, tenés que hacer la{" "}
            <Link href="/monotributo/recategorizacion" className="text-emerald-700 underline">
              recategorización
            </Link>{" "}
            (próxima ventana: hasta el 5 de agosto de 2026).
          </li>
          <li>
            • Fuente oficial:{" "}
            <a
              href={VIGENCIA.fuenteUrl}
              rel="nofollow noopener"
              target="_blank"
              className="text-emerald-700 underline"
            >
              ARCA — categorías del monotributo
            </a>
            . Última verificación: {VIGENCIA.consultadoEl}.
          </li>
        </ul>
      </section>
      <EmailCapture
        source="monotributo-categorias"
        headline="Avisame cuando cambien las escalas del monotributo"
        subtext="ARCA actualiza las categorías dos veces al año. Te aviso cuando salgan los nuevos topes y cuando abra la recategorización. Sin spam."
      />
    </article>
  );
}
