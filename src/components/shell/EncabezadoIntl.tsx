import SiteHeader from "@/components/SiteHeader";
import { rutaIntl } from "@/motor/seo";
import { opcionesSelector, type ContextoSitio } from "@/motor/ui/contexto";
import { menuDelPais } from "@/motor/ui/menu";
import { SelectorPais, type OpcionPais } from "@/motor/ui/SelectorPais";
import { ARGENTINA } from "./argentina";
import { PaisesCajon } from "./PaisesCajon";

export function opcionesConArgentina(ctx: ContextoSitio): OpcionPais[] {
  const ar: OpcionPais = { codigo: ARGENTINA.codigo, nombre: ARGENTINA.nombre, pais: ARGENTINA.pais, href: ARGENTINA.href };
  return [...opcionesSelector(ctx), ar].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
}

export function EncabezadoIntl({ ctx }: { ctx: ContextoSitio }) {
  const t = ctx.textos;
  const m = ctx.mercado;
  const enPais = m.codigo !== "global";
  const menu = enPais ? menuDelPais(ctx) : null;
  const opciones = opcionesConArgentina(ctx);
  const nombre = t.marca.nombre;
  const corte = nombre.endsWith("Ya") ? nombre.length - 2 : nombre.length;
  const actual = enPais ? { codigo: m.codigo, nombre: m.nombre, pais: m.pais, href: rutaIntl(m.codigo) } : null;
  const masLinks = [
    ...(enPais
      ? [
          { href: rutaIntl(m.codigo, "novedades"), label: t.footer.novedades },
          { href: rutaIntl(m.codigo, "fuentes"), label: t.footer.fuentes },
        ]
      : []),
    { href: rutaIntl("global", "sobre"), label: t.footer.sobre },
    { href: rutaIntl("global", "contacto"), label: t.footer.contacto },
  ];

  return (
    <div className="ca-shell">
      <SiteHeader
        tabs={menu?.tabs ?? []}
        marca={{ prefijo: nombre.slice(0, corte), acento: nombre.slice(corte), etiqueta: `${nombre}, ${t.shell.irAlInicio}`, href: rutaIntl(enPais ? m.codigo : "global") }}
        navegacion={menu?.navegacion ?? { columnas: {}, secciones: [] }}
        masLinks={masLinks}
        textos={t.shell.encabezado}
        buscador={
          menu ? { paginas: menu.paginas, masUsadas: menu.masUsadas, opcionales: [m.nombre], todas: rutaIntl(m.codigo), textos: t.shell.buscador } : null
        }
        extra={
          <div className="ca-selector-pais">
            <SelectorPais
              actual={actual}
              opciones={opciones}
              textos={{ elegir: t.header.elegirPais, latinoamerica: t.header.latinoamerica, todos: t.header.todos, hrefTodos: rutaIntl("global") }}
            />
          </div>
        }
        extraCajon={<PaisesCajon actual={actual} opciones={opciones} abierto={!enPais} textos={{ elegir: t.header.elegirPais, cambiar: t.shell.paises.cambiar }} />}
        rutasInternas
      />
    </div>
  );
}
