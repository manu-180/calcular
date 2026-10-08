import type { CSSProperties } from "react";
import { SesionLink } from "@/components/SesionLink";
import { rutaIntl } from "@/motor/seo";
import { Bandera } from "@/motor/ui/Bandera";
import type { ContextoSitio } from "@/motor/ui/contexto";
import { menuDelPais } from "@/motor/ui/menu";
import { opcionesConArgentina } from "./EncabezadoIntl";

// Mismo footer que calcular.ar (SiteFooter): mapa de calculadoras del país, países, cuenta y sitio.
// Van <a> y no <Link> por lo mismo que allá: son muchos links que casi nadie toca.
export function PieIntl({ ctx }: { ctx: ContextoSitio }) {
  const t = ctx.textos;
  const m = ctx.mercado;
  const enPais = m.codigo !== "global";
  const secciones = enPais ? menuDelPais(ctx).navegacion.secciones : [];
  const opciones = opcionesConArgentina(ctx);
  const nombre = t.marca.nombre;
  const corte = nombre.endsWith("Ya") ? nombre.length - 2 : nombre.length;
  const sitio = [
    ...(enPais
      ? [
          { href: rutaIntl(m.codigo, "fuentes"), label: t.footer.fuentes },
          { href: rutaIntl(m.codigo, "novedades"), label: t.footer.novedades },
        ]
      : []),
    { href: rutaIntl("global", "sobre"), label: t.footer.sobre },
    { href: rutaIntl("global", "contacto"), label: t.footer.contacto },
    { href: rutaIntl("global", "privacidad"), label: t.footer.privacidad },
    { href: rutaIntl("global", "terminos"), label: t.footer.terminos },
  ];

  return (
    <div className="ca-shell">
      <footer className="ca-pie">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-md">
              <a href={rutaIntl(enPais ? m.codigo : "global")} className="inline-flex items-center gap-2 rounded-lg text-lg font-bold tracking-tight text-zinc-900">
                <span aria-hidden className="ca-pie-marca">
                  <span />
                  <span />
                </span>
                <span>
                  {nombre.slice(0, corte)}
                  <span className="text-emerald-600">{nombre.slice(corte)}</span>
                </span>
              </a>
              <p className="mt-3 text-sm leading-relaxed text-pretty text-zinc-600">{t.shell.pie.bajada(enPais ? m.nombre : t.header.latinoamerica)}</p>
            </div>
            <p className="text-sm text-zinc-500">
              {t.shell.pie.escrito}{" "}
              <a href={rutaIntl("global", "sobre")} className="font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-2 hover:text-emerald-700">
                Manuel Navarro
              </a>
            </p>
          </div>

          {secciones.length ? (
            <nav aria-labelledby="ca-mapa-titulo" className="border-t border-zinc-200/70 py-8">
              <p id="ca-mapa-titulo" className="ca-pie-titulo">
                {t.shell.pie.todas}
              </p>
              <div className="ca-mapa" style={{ "--ca-mapa-cols": Math.max(3, secciones.length) } as CSSProperties}>
                {secciones.map((s) => (
                  <details key={s.id} className="ca-mapa-tema">
                    <summary>
                      <span>{s.titulo}</span>
                      <span className="ca-mapa-n">{s.paginas.length}</span>
                    </summary>
                    <ul>
                      {s.paginas.map((p) => (
                        <li key={p.href}>
                          <a href={p.href}>{p.corto}</a>
                        </li>
                      ))}
                    </ul>
                  </details>
                ))}
              </div>
            </nav>
          ) : null}

          <div className="grid gap-8 border-t border-zinc-200/70 py-8 sm:grid-cols-3">
            <nav aria-label={t.footer.paises}>
              <p className="ca-pie-titulo">{t.footer.paises}</p>
              <ul className="ca-pie-lista grid-cols-2 gap-x-4">
                {opciones.map((o) => (
                  <li key={o.codigo}>
                    <a href={o.href} aria-current={o.codigo === m.codigo ? "page" : undefined} className="gap-2 aria-[current=page]:font-medium aria-[current=page]:text-emerald-700">
                      <Bandera pais={o.pais} ancho={16} />
                      {o.nombre}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="ca-pie-titulo">{t.shell.pie.cuenta}</p>
              <ul className="ca-pie-lista">
                <li>
                  <SesionLink />
                </li>
              </ul>
              <p className="mt-2 max-w-60 text-xs leading-relaxed text-zinc-500">{t.shell.pie.cuentaNota}</p>
            </div>
            <div>
              <p className="ca-pie-titulo">{t.footer.sitio}</p>
              <ul className="ca-pie-lista">
                {sitio.map((l) => (
                  <li key={l.href}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-2 border-t border-zinc-200/70 py-6 text-xs leading-relaxed text-zinc-500">
            <p className="max-w-3xl text-pretty">{t.footer.descargo}</p>
            <p>
              {t.footer.derechos(Number(ctx.fecha.slice(0, 4)))} · {t.shell.pie.hecho}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
