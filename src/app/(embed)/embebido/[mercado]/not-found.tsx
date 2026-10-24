import { textosEmbed } from "@/motor/i18n/embed";
import { urlIntl } from "@/motor/seo";
import { registro } from "@/paises";

const global = registro.pais("global")?.mercado;

// not-found no recibe params: el texto sale del diccionario de global, igual que el 404 intl.
export default function NoDisponibleEmbed() {
  if (!global) return null;
  const t = textosEmbed(global.idioma, global.trato, global.locale);
  return (
    <main className="cye-raiz" data-embed="1">
      <article className="cye-tarjeta">
        <h1 className="cye-titulo">{t.noDisponible.titulo}</h1>
        <p>{t.noDisponible.texto}</p>
        <footer className="cye-pie">
          <a className="cye-marca" href={urlIntl("global")} target="_blank" rel="noopener">
            <span>{t.marca}</span>
            <span className="cye-solo-lector">{t.marcaNuevaPestana}</span>
          </a>
        </footer>
      </article>
    </main>
  );
}
