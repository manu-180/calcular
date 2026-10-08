import { rutaIntl, serializarLd } from "../seo";
import { origenAR } from "../sitio";
import { AvisoPais } from "./AvisoPais";
import { Bandera } from "./Bandera";
import { destinosAviso, opcionesSelector, type ContextoSitio } from "./contexto";
import { Marca } from "./Iconos";
import { SelectorPais } from "./SelectorPais";

export function JsonLd({ datos }: { datos: Record<string, unknown> | readonly Record<string, unknown>[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializarLd(datos) }} />;
}

export function Encabezado({ ctx }: { ctx: ContextoSitio }) {
  const t = ctx.textos;
  const actual = ctx.mercado.codigo === "global" ? null : { codigo: ctx.mercado.codigo, nombre: ctx.mercado.nombre, pais: ctx.mercado.pais, href: rutaIntl(ctx.mercado.codigo) };
  return (
    <header className="cy-encabezado">
      <div className="cy-isla">
        <a href={rutaIntl(actual ? ctx.mercado.codigo : "global")} className="cy-isla-marca" aria-label={`${t.marca.nombre}, ${t.header.inicio}`}>
          <Marca nombre={t.marca.nombre} />
        </a>
        <SelectorPais
          actual={actual}
          opciones={opcionesSelector(ctx)}
          textos={{ elegir: t.header.elegirPais, latinoamerica: t.header.latinoamerica, todos: t.header.todos, hrefTodos: rutaIntl("global") }}
        />
      </div>
    </header>
  );
}

export function Pie({ ctx }: { ctx: ContextoSitio }) {
  const t = ctx.textos;
  const enPais = ctx.mercado.codigo !== "global";
  return (
    <footer className="cy-pie">
      <div className="cy-pie-interior">
        <div className="cy-pie-marca">
          <Marca nombre={t.marca.nombre} />
          <p>{t.marca.lema}</p>
        </div>
        {ctx.paises.length ? (
          <nav className="cy-pie-columna" aria-label={t.footer.paises}>
            <p className="cy-pie-titulo">{t.footer.paises}</p>
            <ul className="cy-pie-paises">
              {ctx.paises.map((m) => (
                <li key={m.codigo}>
                  <a href={rutaIntl(m.codigo)} aria-current={m.codigo === ctx.mercado.codigo ? "page" : undefined}>
                    <Bandera pais={m.pais} ancho={18} />
                    {m.nombre}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
        <nav className="cy-pie-columna" aria-label={t.footer.sitio}>
          <p className="cy-pie-titulo">{t.footer.sitio}</p>
          <ul>
            {enPais ? (
              <>
                <li>
                  <a href={rutaIntl(ctx.mercado.codigo, "fuentes")}>{t.footer.fuentes}</a>
                </li>
                <li>
                  <a href={rutaIntl(ctx.mercado.codigo, "novedades")}>{t.footer.novedades}</a>
                </li>
              </>
            ) : null}
            <li>
              <a href={rutaIntl("global", "sobre")}>{t.footer.sobre}</a>
            </li>
            <li>
              <a href={rutaIntl("global", "contacto")}>{t.footer.contacto}</a>
            </li>
            <li>
              <a href={rutaIntl("global", "privacidad")}>{t.footer.privacidad}</a>
            </li>
            <li>
              <a href={rutaIntl("global", "terminos")}>{t.footer.terminos}</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="cy-pie-base">
        <a href={origenAR()} className="cy-pie-ar">
          <Bandera pais="AR" ancho={18} />
          {t.footer.argentina}
        </a>
        <p>{t.footer.descargo}</p>
        <p>{t.footer.derechos(Number(ctx.fecha.slice(0, 4)))}</p>
      </div>
    </footer>
  );
}

export function AvisoDePais({ ctx, concepto }: { ctx: ContextoSitio; concepto?: string }) {
  const destinos = destinosAviso(ctx, concepto);
  if (!destinos.length) return null;
  return <AvisoPais paisActual={ctx.mercado.pais} destinos={destinos} cerrar={ctx.textos.avisoPais.cerrar} />;
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
