import { formatearFecha } from "../../formato";
import { textosMundo } from "../../i18n/mundo";
import { grafo, ldFaq, ldPagina, ldWebApplication } from "../../seo";
import { origenAR } from "../../sitio";
import type { ContextoSitio } from "../../ui/contexto";
import { IconoExterno } from "../../ui/Iconos";
import { JsonLd } from "../../ui/Sitio";
import type { FechaISO } from "../../tipos";
import type { CargaCompartida, GrillaMundo } from "../tipos";
import { compactar } from "./compacta";
import { MundoCliente } from "./MundoCliente";
import { urlMundo } from "./seo";
import { textosCliente } from "./textos-cliente";
import "./estilos-mundo.css";

// País de origen inicial: el de la edición (ca-fr usa la fila de Canadá). Global no tiene país: arranca
// en Estados Unidos si está, y si no en el primero de la grilla.
export function origenDe(grilla: GrillaMundo, ctx: ContextoSitio): string {
  const m = ctx.mercado;
  const propio = grilla.paises.find((p) => p.mercado === m.codigo) ?? grilla.paises.find((p) => p.iso === m.pais);
  return (propio ?? grilla.paises.find((p) => p.iso === "US") ?? grilla.paises[0]).mercado;
}

export function nombreMundo(ctx: ContextoSitio): string {
  return textosMundo(ctx.mercado.idioma, ctx.mercado.trato, ctx.mercado.locale).nombre;
}

// La grilla trae fechas como texto; el contrato no las tipa como FechaISO.
const iso = (s: string) => s as FechaISO;

function mesesDe(locale: string, anio: number): string[] {
  const f = new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" });
  return Array.from({ length: 12 }, (_, m) => f.format(new Date(Date.UTC(anio, m, 15))).replace(/\.$/, ""));
}

export function PaginaMundo({ ctx, grilla, carga }: { ctx: ContextoSitio; grilla: GrillaMundo; carga: CargaCompartida | null }) {
  const m = ctx.mercado;
  const t = textosMundo(m.idioma, m.trato, m.locale);
  const anio = Number(ctx.fecha.slice(0, 4));
  const cliente = compactar(grilla, m.locale, origenAR());
  const n = cliente.paises.length;
  const url = urlMundo(m);
  const faq = t.faq(n);
  const fuente = grilla.fuentePpa;
  const anioPpa = Math.max(...grilla.paises.map((p) => p.anioPpa));
  const masVieja = [...grilla.paises.map((p) => p.datosVerificadosEl)].sort()[0];
  const organismo = fuente.organismo === "Banco Mundial" ? t.metodo.bancoMundial : fuente.organismo;
  const fuentes = [...cliente.paises].sort((a, b) => a.nombre.localeCompare(b.nombre, m.locale));

  return (
    <article className="cy-pagina cy-mundo">
      <JsonLd
        datos={grafo([
          ldPagina({
            url,
            nombre: t.h1,
            descripcion: m.codigo === "global" ? t.seo.descripcionGlobal(n) : t.seo.descripcion(m.nombre, n),
            locale: m.locale,
            actualizado: grilla.generadoEl ? iso(grilla.generadoEl) : undefined,
            principal: ldWebApplication({ nombre: t.nombre, url, mercado: m, actualizado: grilla.generadoEl ? iso(grilla.generadoEl) : undefined }),
          }),
          ldFaq(faq),
        ])}
      />
      <header className="cy-mundo-cabeza" data-duelo={carga ? "" : undefined}>
        <p className="cy-mundo-ceja">
          <span className="cy-punto-vivo" aria-hidden="true" />
          {t.ceja}
        </p>
        <h1 className="cy-mundo-h1">{t.h1}</h1>
        <p className="cy-mundo-intro">{t.bajada(n)}</p>
      </header>

      <MundoCliente
        grilla={cliente}
        textos={textosCliente(t, cliente.paises)}
        locale={m.locale}
        anio={anio}
        origenInicial={origenDe(grilla, ctx)}
        meses={mesesDe(m.locale, anio)}
        base={url}
        carga={carga}
      />

      <section className="cy-mundo-metodo" aria-labelledby="cy-mundo-metodo-titulo">
        <div className="cy-mundo-seccion-cabeza">
          <h2 id="cy-mundo-metodo-titulo" className="cy-mundo-h2">
            {t.metodo.titulo}
          </h2>
          <p className="cy-mundo-bajada">{t.metodo.estimacion}</p>
        </div>
        <ul className="cy-mundo-supuestos">
          {t.metodo.supuestos.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <div className="cy-mundo-fuentes">
          <div className="cy-mundo-ppa">
            <p className="cy-mundo-ppa-titulo">{t.metodo.ppaTitulo}</p>
            <p>{t.metodo.ppa(organismo, fuente.indicador, String(anioPpa))}</p>
            <p className="cy-mundo-ppa-fecha">{t.metodo.consultado(formatearFecha(iso(fuente.consultadoEl), m.locale))}</p>
            {fuente.url.startsWith("https://") ? (
              <a className="cy-mundo-enlace-fuente" href={fuente.url} rel="noopener" target="_blank">
                {t.metodo.verFuente}
                <IconoExterno />
              </a>
            ) : null}
          </div>
          <details className="ca-acordeon cy-mundo-paises-fuente">
            <summary>{t.metodo.fuentesTitulo}</summary>
            <p>{t.metodo.fuentesBajada}</p>
            <ul>
              {fuentes.map((p) => (
                <li key={p.mercado}>
                  <a href={p.href}>
                    <img className="cy-bandera" src={`/banderas/${p.iso.toLowerCase()}.svg`} width={18} height={12} alt="" loading="lazy" decoding="async" />
                    <span>{p.nombre}</span>
                  </a>
                  <time dateTime={p.verificadoEl}>{t.metodo.verificado(formatearFecha(iso(p.verificadoEl), m.locale))}</time>
                </li>
              ))}
            </ul>
          </details>
        </div>
        {masVieja ? (
          <p className="cy-mundo-sello">
            <span className="cy-punto-vivo" aria-hidden="true" />
            {t.metodo.sello(formatearFecha(iso(masVieja), m.locale))}
          </p>
        ) : null}
      </section>

      <section className="cy-seccion cy-preguntas cy-mundo-faq" aria-labelledby="cy-mundo-faq">
        <h2 id="cy-mundo-faq" className="cy-mundo-h2">
          {t.faqTitulo}
        </h2>
        <div className="cy-preguntas-lista">
          {faq.map((q) => (
            <details key={q.pregunta} className="ca-acordeon">
              <summary>{q.pregunta}</summary>
              <p>{q.respuesta}</p>
            </details>
          ))}
        </div>
      </section>
    </article>
  );
}
