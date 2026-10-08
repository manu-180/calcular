import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FormularioCompra } from "@/components/CompraDialogo";
import { productoPorSlug } from "@/lib/mp";

// La misma compra que el diálogo de las landings, como página: es el destino del botón cuando
// no hay JS (o el diálogo no está montado), y adonde vuelve el POST si el mail vino mal.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Comprar",
  robots: { index: false, follow: false },
};

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function ComprarPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const producto = productoPorSlug(typeof sp.p === "string" ? sp.p : null);
  if (!producto) notFound();

  return (
    <div className="mx-auto max-w-md py-4">
      <div data-oferta={producto.slug} className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
        <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">Estás comprando</p>
        <h1 className="mt-0.5 text-xl font-bold text-zinc-900">{producto.tituloCorto}</h1>
        <p className="mb-5 text-sm text-zinc-600">
          <span className="font-semibold text-zinc-900">${producto.precio.toLocaleString("es-AR")}</span> · pago
          único · {producto.entrega === "informe" ? "lo ves apenas pagás" : "Excel y Google Sheets"}
        </p>
        <FormularioCompra
          producto={{
            slug: producto.slug,
            tituloCorto: producto.tituloCorto,
            precio: producto.precio,
            entrega: producto.entrega,
          }}
          errorEmail={sp.error === "email"}
          autoFocus
          enPagina
        />
      </div>
      <p className="mt-4 text-center text-sm">
        <Link href={producto.rutaLanding} className="font-semibold text-emerald-700 underline">
          {producto.entrega === "informe" ? "Volver a ver el informe" : "Volver a ver la planilla"}
        </Link>
      </p>
    </div>
  );
}
