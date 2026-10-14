import { Fragment, type ReactNode } from "react";
import { formatearFecha } from "../formato";
import { frescuraDeUsados } from "../frescura";
import type { TextosSitio } from "../i18n";
import type { DatoUsado, Sello as DatosSello } from "../registro";
import { idiomaDeLocale } from "../i18n/resolver";
import type { Fuente, Trato } from "../tipos";
import { FechaViva } from "./FechaViva";
import { IconoExterno, IconoFlecha } from "./Iconos";
import { textosInicio } from "./textos-inicio";

const MARCA = "\u0000";
const MARCA_FECHA = "\u0001";

// Mete nodos (el link al organismo y la fecha en un <time>) en el lugar de los marcadores de un texto
// del diccionario, así la oración se arma en el idioma del mercado y cada nodo queda donde va. El
// <time datetime> es la fecha de actualización que leen los buscadores.
function conNodos(texto: string, nodos: Record<string, ReactNode>): ReactNode {
  return texto.split(/([\u0000\u0001])/).map((parte, i) => <Fragment key={i}>{parte === MARCA || parte === MARCA_FECHA ? nodos[parte] : parte}</Fragment>);
}

function enlaceFuente(f: Fuente, contenido: ReactNode) {
  return f.url.startsWith("https://") ? (
    <a href={f.url} rel="noopener" target="_blank">
      {contenido}
    </a>
  ) : (
    contenido
  );
}

// El sello de cada calculadora: la revisión más reciente de los tramos que usa, el último dato de sus
// series (con "hoy"/"ayer" resuelto en el navegador, ver FechaViva) y la lista de documentos.
// no cambia: la arma PaginaCalculadora, que no se toca desde este frente.
export function Sello({ sello, usados, locale, trato, textos, hrefFuentes }: { sello: DatosSello; usados: readonly DatoUsado[]; locale: string; trato: Trato; textos: TextosSitio; hrefFuentes: string }) {
  const t = textos.sello;
  const ti = textosInicio(idiomaDeLocale(locale) ?? "es", trato);
  const f = frescuraDeUsados(usados);
  const fuentes = f.fuentes.length ? f.fuentes : sello.fuentes;
  return (
    <section className="cy-sello cy-sello-vivo" aria-labelledby="cy-sello-titulo">
      <p className="cy-sello-titulo" id="cy-sello-titulo">
        <span className="cy-punto-vivo" aria-hidden="true" />
        {t.titulo}
      </p>
      {f.verificadoEl ? (
        <p className="cy-sello-linea cy-sello-principal">
          {conNodos(ti.sello.verificado(MARCA_FECHA), {
            [MARCA_FECHA]: <time dateTime={f.verificadoEl}>{formatearFecha(f.verificadoEl, locale)}</time>,
          })}
        </p>
      ) : null}
      {f.series.map((s) => {
        const fuente = fuentes.find((x) => x.organismo === s.organismo);
        return (
          <p key={s.id} className="cy-sello-linea cy-sello-serie">
            {conNodos(ti.sello.serie(s.nombre, MARCA_FECHA, MARCA), {
              [MARCA]: fuente ? enlaceFuente(fuente, s.organismo) : s.organismo,
              [MARCA_FECHA]: <FechaViva fecha={s.fecha} absoluta={ti.vivo.elDia(formatearFecha(s.fecha, locale))} hoy={ti.vivo.hoy} ayer={ti.vivo.ayer} />,
            })}
          </p>
        );
      })}
      <p className="cy-sello-diario">{ti.sello.diario}</p>
      <ul className="cy-sello-fuentes" id="cy-sello-fuentes">
        {fuentes.map((x) => (
          <li key={x.url}>
            {enlaceFuente(
              x,
              <>
                <span>{x.organismo}</span>
                <span className="cy-sello-documento">{x.titulo}</span>
                <IconoExterno />
              </>,
            )}
          </li>
        ))}
      </ul>
      <a className="cy-enlace-flecha" href={hrefFuentes}>
        {t.verTodas}
        <IconoFlecha />
      </a>
    </section>
  );
}
