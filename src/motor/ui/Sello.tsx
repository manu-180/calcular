import { Fragment, type ReactNode } from "react";
import { formatearFecha } from "../formato";
import type { TextosSitio } from "../i18n";
import type { DatoUsado, Sello as DatosSello } from "../registro";
import type { FechaISO, Fuente } from "../tipos";
import { IconoExterno, IconoFlecha, IconoSello } from "./Iconos";

const MARCA = "\u0000";
const MARCA_FECHA = "\u0001";

// Mete nodos (los links a cada organismo y la fecha en un <time>) en el lugar de los marcadores de
// un texto del diccionario, así la oración se arma en el idioma del mercado y cada nodo queda donde
// va. El <time datetime> es la fecha de actualización que leen los buscadores.
function conNodos(texto: string, nodos: Record<string, ReactNode>): ReactNode {
  return texto.split(/([\u0000\u0001])/).map((parte, i) => <Fragment key={i}>{parte === MARCA || parte === MARCA_FECHA ? nodos[parte] : parte}</Fragment>);
}

function Fecha({ fecha, locale }: { fecha: FechaISO; locale: string }) {
  return <time dateTime={fecha}>{formatearFecha(fecha, locale)}</time>;
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

function listaDeOrganismos(fuentes: readonly Fuente[], locale: string): ReactNode {
  const porOrganismo = new Map<string, Fuente>();
  for (const f of fuentes) if (!porOrganismo.has(f.organismo)) porOrganismo.set(f.organismo, f);
  const nombres = [...porOrganismo.keys()];
  const partes = new Intl.ListFormat(locale, { type: "conjunction" }).formatToParts(nombres);
  return partes.map((p, i) => (p.type === "element" ? <span key={i}>{enlaceFuente(porOrganismo.get(p.value)!, p.value)}</span> : <span key={i}>{p.value}</span>));
}

export function Sello({ sello, usados, locale, textos, hrefFuentes }: { sello: DatosSello; usados: readonly DatoUsado[]; locale: string; textos: TextosSitio; hrefFuentes: string }) {
  const t = textos.sello;
  const fuentesDatos = usados.filter((u) => u.clase === "dato").map((u) => u.fuente);
  return (
    <section className="cy-sello" aria-labelledby="cy-sello-titulo">
      <p className="cy-sello-titulo" id="cy-sello-titulo">
        <IconoSello />
        {t.titulo}
      </p>
      {sello.verificadoMasViejo ? (
        <p className="cy-sello-linea">
          {conNodos(t.verificado(MARCA, MARCA_FECHA), {
            [MARCA]: listaDeOrganismos(fuentesDatos, locale),
            [MARCA_FECHA]: <Fecha fecha={sello.verificadoMasViejo} locale={locale} />,
          })}
        </p>
      ) : null}
      {sello.series.map((s) => {
        const fuente = sello.fuentes.find((f) => f.organismo === s.organismo);
        return (
          <p key={s.id} className="cy-sello-linea">
            {conNodos(t.serie(s.nombre, MARCA, MARCA_FECHA), {
              [MARCA]: fuente ? enlaceFuente(fuente, s.organismo) : s.organismo,
              [MARCA_FECHA]: <Fecha fecha={s.fecha} locale={locale} />,
            })}
          </p>
        );
      })}
      <ul className="cy-sello-fuentes">
        {sello.fuentes.map((f) => (
          <li key={f.url}>
            {enlaceFuente(
              f,
              <>
                <span>{f.organismo}</span>
                <span className="cy-sello-documento">{f.titulo}</span>
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
