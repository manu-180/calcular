import type { ComponentType } from "react";
import { textosEmbed } from "../i18n/embed";
import type { PaginaResuelta } from "../registro";
import { urlIntl } from "../seo";
import type { PropsCalculadora } from "../tipos";
import type { ContextoSitio } from "../ui/contexto";
import { IconoExterno } from "../ui/Iconos";
import { MarcaCalcularYa } from "./marca";
import { ProveedorEmbed } from "./proveedor";

export const ID_RAIZ_EMBED = "cye-raiz";

// La misma calculadora de la página, sin lo que la rodea: título, campos, resultado y una línea de
// marca. Sin ofertas (ProveedorEmbed las apaga), sin avisos de país ni JSON-LD, sin fuentes: todo eso
// vive en la página completa a la que lleva el link del pie.
export function VistaEmbed({ ctx, pagina, Cliente }: { ctx: ContextoSitio; pagina: PaginaResuelta; Cliente: ComponentType<PropsCalculadora> }) {
  const m = ctx.mercado;
  const t = textosEmbed(m.idioma, m.trato, m.locale);
  // utm_source=embed lo recoge el rastreador de la página completa: las visitas que vuelven desde
  // un widget quedan separadas del resto sin tocar el sistema de vistas.
  const href = `${urlIntl(m.codigo, pagina.calculadora.slug)}?utm_source=embed&utm_medium=widget`;
  return (
    <ProveedorEmbed idRaiz={ID_RAIZ_EMBED}>
      <main id={ID_RAIZ_EMBED} className="cye-raiz" data-embed="1">
        <article className="cye-tarjeta">
          <h1 className="cye-titulo">{pagina.contenido.h1}</h1>
          <Cliente {...pagina.props} />
          <footer className="cye-pie">
            <a className="cye-marca" href={href} target="_blank" rel="noopener">
              <MarcaCalcularYa />
              <span>{t.marca}</span>
              <IconoExterno className="cye-externo" />
              <span className="cye-solo-lector">{t.marcaNuevaPestana}</span>
            </a>
          </footer>
        </article>
      </main>
    </ProveedorEmbed>
  );
}
