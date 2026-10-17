import { serializarLd } from "../seo";
import { AvisoPais } from "./AvisoPais";
import { plantillasAviso, type ContextoSitio } from "./contexto";

export function JsonLd({ datos }: { datos: Record<string, unknown> | readonly Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializarLd(datos) }} />;
}

export function AvisoDePais({ ctx, concepto }: { ctx: ContextoSitio; concepto?: string }) {
  if (ctx.paises.length < 2) return null;
  return (
    <AvisoPais
      mercado={ctx.mercado.codigo}
      paisActual={ctx.mercado.pais}
      idioma={ctx.mercado.idioma}
      trato={ctx.mercado.trato}
      locale={ctx.mercado.locale}
      {...(concepto ? { concepto } : {})}
      plantillas={plantillasAviso(ctx)}
      cerrar={ctx.textos.avisoPais.cerrar}
    />
  );
}

export function Migas({ items, etiqueta }: { items: readonly { nombre: string; href?: string }[]; etiqueta: string }) {
  return (
    <nav className="cy-migas" aria-label={etiqueta}>
      <ol>
        {items.map((it, i) => (
          <li key={`${i}-${it.nombre}`}>{it.href ? <a href={it.href}>{it.nombre}</a> : <span aria-current="page">{it.nombre}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}
