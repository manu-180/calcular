import { calculadorasDeProducto } from "@/lib/pagos/ofertas-servidor";
import type { ProductoIntl } from "@/lib/pagos/catalogo-intl";
import { formatearFecha } from "@/motor/formato";
import { rutaIntl } from "@/motor/seo";
import type { Fuente } from "@/motor/tipos";
import type { ContextoSitio } from "@/motor/ui/contexto";

// Para qué calculadoras sirve el producto y qué fuentes oficiales usa: lo que respalda cada número.
export function SeccionesProducto({ ctx, producto, textos }: { ctx: ContextoSitio; producto: ProductoIntl; textos: { calculadoras: string; fuentes: string } }) {
  const m = ctx.mercado;
  const paginas = calculadorasDeProducto(producto)
    .map((s) => ctx.registro.pagina(m.codigo, s, ctx.fecha, ctx.modo))
    .filter((p) => p !== null);
  if (!paginas.length) return null;
  const fuentes = new Map<string, Fuente>();
  for (const p of paginas) for (const f of p.sello.fuentes) if (!fuentes.has(f.url)) fuentes.set(f.url, f);
  return (
    <>
      <h2>{textos.calculadoras}</h2>
      <ul className="cy-producto-lista">
        {paginas.map((p) => (
          <li key={p.calculadora.slug}>
            <a href={rutaIntl(m.codigo, p.calculadora.slug)}>{p.contenido.h1}</a>
          </li>
        ))}
      </ul>
      {fuentes.size ? (
        <>
          <h2>{textos.fuentes}</h2>
          <ul className="cy-producto-lista">
            {[...fuentes.values()].map((f) => (
              <li key={f.url}>
                <a href={f.url} rel="noopener" target="_blank">
                  {f.organismo}
                </a>
                : {f.titulo} ({formatearFecha(f.verificadoEl, m.locale, "corta")})
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
}
