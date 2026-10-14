import SiteHeader from "@/components/SiteHeader";
import { productosDeMercado } from "@/lib/pagos/catalogo-intl";
import { rutaIntl } from "@/motor/seo";
import type { ContextoSitio } from "@/motor/ui/contexto";
import { menuDelPais } from "@/motor/ui/menu";
import type { OpcionPais } from "@/motor/ui/paises";
import { SelectorPais } from "@/motor/ui/SelectorPais";
import { ARGENTINA } from "./argentina";
import { PaisesCajon } from "./PaisesCajon";

// Países de otro sitio que el selector y el cajón listan junto a los mercados (ProveedorPaises, en
// el layout intl): Argentina vive en calcular.ar.
export const EXTERNOS: readonly OpcionPais[] = [{ codigo: ARGENTINA.codigo, nombre: ARGENTINA.nombre, pais: ARGENTINA.pais, href: ARGENTINA.href }];

export function EncabezadoIntl({ ctx }: { ctx: ContextoSitio }) {
  const t = ctx.textos;
  const m = ctx.mercado;
  const enPais = m.codigo !== "global";
  const menu = enPais ? menuDelPais(ctx) : null;
  const planillas = enPais && productosDeMercado(m.codigo).length > 0 ? rutaIntl(m.codigo, "planillas") : null;
  const tabs = menu?.tabs ?? [];
  // Mismo orden que en calcular.ar: Planillas antes de Novedades, el último link de la barra.
  const conPlanillas = planillas
    ? [...tabs.filter((x) => x.key !== "novedades"), { key: "planillas", label: t.shell.menu.planillas, type: "link" as const, href: planillas, match: [planillas] }, ...tabs.filter((x) => x.key === "novedades")]
    : tabs;
  const nombre = t.marca.nombre;
  const corte = nombre.endsWith("Ya") ? nombre.length - 2 : nombre.length;
  const actual = enPais ? { codigo: m.codigo, nombre: m.nombre, pais: m.pais, href: rutaIntl(m.codigo) } : null;
  const masLinks = [
    ...(enPais
      ? [
          ...(planillas ? [{ href: planillas, label: t.shell.menu.planillas }] : []),
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
        tabs={conPlanillas}
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
              idioma={m.idioma}
              trato={m.trato}
              textos={{ elegir: t.header.elegirPais, latinoamerica: t.header.latinoamerica, todos: t.header.todos, hrefTodos: rutaIntl("global") }}
            />
          </div>
        }
        extraCajon={<PaisesCajon actual={actual} abierto={!enPais} textos={{ elegir: t.header.elegirPais, cambiar: t.shell.paises.cambiar }} />}
        rutasInternas
      />
    </div>
  );
}
