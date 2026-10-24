import type { CSSProperties } from "react";
import { textosMundo } from "../../i18n/mundo";
import { rutaIntl } from "../../seo";
import type { Mercado } from "../../tipos";
import { IconoFlecha } from "../../ui/Iconos";
import { SLUG_MUNDO } from "../rutas";
import "./estilos-mundo.css";

// Tarjeta de la home de cada edición que lleva a «Tu sueldo en el mundo». Los puntos dibujan un año
// con un tramo «para el Estado»: es decoración, la cifra real está en la página.
export function DestacadoMundo({ mercado }: { mercado: Mercado }) {
  const t = textosMundo(mercado.idioma, mercado.trato, mercado.locale).destacado;
  return (
    <a className="cy-mundo-destacado" href={rutaIntl(mercado.codigo, SLUG_MUNDO[mercado.idioma])}>
      <span className="cy-mundo-destacado-texto">
        <span className="cy-mundo-destacado-ceja">{t.ceja}</span>
        <span className="cy-mundo-destacado-titulo">{t.titulo}</span>
        <span className="cy-mundo-destacado-bajada">{t.texto}</span>
        <span className="cy-mundo-destacado-ir">
          {t.ir}
          <span className="cy-boton-icono">
            <IconoFlecha />
          </span>
        </span>
      </span>
      <span className="cy-mundo-destacado-puntos" aria-hidden="true">
        {Array.from({ length: 84 }, (_, i) => (
          <i key={i} data-d={i < 31 ? "e" : i === 31 ? "x" : "l"} style={{ "--n": i } as CSSProperties} />
        ))}
      </span>
    </a>
  );
}
