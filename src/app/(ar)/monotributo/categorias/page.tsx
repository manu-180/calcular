import type { Metadata } from "next";
import Link from "next/link";
import { EmailCapture } from "@/components/EmailCapture";
import { JsonLd } from "@/components/JsonLd";
import { RespuestaPrimero } from "@/components/RespuestaPrimero";
import { CATEGORIAS, VIGENCIA } from "@/data/monotributo";
import { formatARS } from "@/lib/monotributo";
import { ORGANIZACION, articleSchema, datasetSchema } from "@/lib/schema";
import { OfertaMonotributo } from "@/components/oferta/OfertaMonotributo";
import { datosOferta } from "@/lib/oferta";

export const metadata: Metadata = {
  title: "Categorías del monotributo 2026: tabla de ARCA",
  description:
    "Tabla oficial de categorías del monotributo 2026, de la A a la K: topes de facturación, cuota mensual, superficie, energía y alquileres vigentes.",
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
        titulo: "Categorías del monotributo 2026: tabla de ARCA",
        descripcion:
          "Topes de facturación, cuota mensual, superficie, energía y alquileres de las 11 categorías (A a K) del monotributo, con los valores oficiales de ARCA.",
        url: "/monotributo/categorias",
        modificado: "2026-06-18",
      }),
      datasetSchema({
        nombre: "Categorías del monotributo 2026 (A a K)",
        descripcion:
          "Tabla oficial de las 11 categorías del monotributo argentino vigentes desde febrero 2026: tope de ingresos brutos anuales, cuota mensual total (servicios y venta), superficie, energía eléctrica y alquileres devengados.",
        url: "/monotributo/categorias",
        modificado: "2026-06-18",
        fuenteNombre: "ARCA: categorías del monotributo",
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
          Todos los datos oficiales de las 11 categorías (A a K) que publicó ARCA, vigentes desde el{" "}
          {VIGENCIA.desde}: tope de facturación anual, cuota mensual según actividad, superficie,
          energía y alquileres. ¿No sabés cuál te toca?{" "}
          <Link href="/monotributo" className="text-emerald-700 underline">
            Usá la calculadora
          </Link>{" "}
          y lo sabés en 10 segundos.
        </p>
      </header>

      <RespuestaPrimero actualizado={VIGENCIA.consultadoEl}>
        <p>
          El monotributo 2026 tiene <strong>11 categorías (A a K)</strong>, vigentes desde el{" "}
          {VIGENCIA.desde}. Tu categoría sale de lo que facturaste en los últimos 12 meses (y, si
          tenés local, también de la superficie, la luz y el alquiler). La{" "}
          <strong>categoría A</strong> llega hasta{" "}
          <strong>{formatARS(catA.ingresosBrutosMax)}</strong> por año, con una cuota de{" "}
          <strong>{formatARS(catA.totalServicios)}/mes</strong>. La más alta, la{" "}
          <strong>categoría {catK.cat}</strong>, llega hasta{" "}
          <strong>{formatARS(catK.ingresosBrutosMax)}</strong> por año. Si pasás el tope de la K,
          quedás afuera del monotributo y pasás al régimen general. Los valores se actualizan por
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
          La cuota total suma tres cosas: el impuesto integrado (cambia según la actividad), el
          aporte jubilatorio (SIPA) y la obra social. Si querés el detalle de qué cubre cada parte,
          leé{" "}
          <Link
            href="/blog/que-incluye-la-cuota-del-monotributo"
            className="text-emerald-700 underline"
          >
            qué incluye la cuota del monotributo
          </Link>
          .
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
          Cuentan si tenés un local u oficina para tu actividad. Si pasás el valor de la categoría
          que te da la facturación, te toca la categoría más alta.
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
          Si vendés productos, además hay un precio máximo de{" "}
          {formatARS(CATEGORIAS[0].precioUnitarioMax)} por unidad.
        </p>
      </section>

      <section className="space-y-3 rounded-xl bg-white p-5 shadow-sm">
        <h2 className="text-base font-semibold text-zinc-900">Para tener en cuenta</h2>
        <ul className="space-y-2 text-sm text-zinc-600">
          <li>
            • Las escalas se actualizan por inflación dos veces al año. Estos valores rigen desde
            el {VIGENCIA.desde} y la próxima actualización está prevista para{" "}
            {VIGENCIA.proximaActualizacion}.
          </li>
          <li>
            • Si lo que facturaste en los últimos 12 meses te cambió de escala, tenés que hacer la{" "}
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
              ARCA, categorías del monotributo
            </a>
            . Última verificación: {VIGENCIA.consultadoEl}.
          </li>
        </ul>
      </section>
      <OfertaMonotributo oferta={datosOferta("planilla-monotributo")} desde="monotributo-categorias" />

      <EmailCapture
        source="monotributo-categorias"
        headline="Avisame cuando cambien las escalas del monotributo"
        subtext="ARCA actualiza las categorías dos veces al año. Te aviso cuando salgan los topes nuevos y cuando abra la recategorización. Sin spam."
      />
    </article>
  );
}
