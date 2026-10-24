import Link from "next/link";
import { FirmaAutor } from "@/components/FirmaAutor";
import { SesionLink } from "@/components/SesionLink";
import { UltimoCambio } from "@/components/novedades/UltimoCambio";
import { GRUPOS_DE_CALCULADORAS, grupo, paginasDelGrupo } from "@/data/navegacion";
import { urlIntl } from "@/motor/seo";

const SITIO = [
  { href: "/novedades", label: "Novedades" },
  { href: "/blog", label: "Guías" },
  { href: "/sobre", label: "Sobre CalculAR" },
  { href: "/contacto", label: "Contacto" },
  { href: "/privacidad", label: "Privacidad" },
  { href: "/terminos", label: "Términos de uso" },
];

// El mapa de todas las calculadoras va en el footer de cada página, en el HTML: es el enlace
// interno que antes daba el cajón mobile (hoy se carga al abrirlo). Van <a> y no <Link> a
// propósito: ~90 <Link> se hidratarían en cada página para links que casi nadie toca.
export default function SiteFooter() {
  const temas = GRUPOS_DE_CALCULADORAS.map((id) => ({ g: grupo(id), paginas: paginasDelGrupo(id) }));
  const planillas = paginasDelGrupo("planillas");

  return (
    <footer className="ca-pie">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-2 rounded-lg text-lg font-bold tracking-tight text-zinc-900">
              <span aria-hidden className="ca-pie-marca">
                <span />
                <span />
              </span>
              <span>
                Calcul<span className="text-emerald-600">AR</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-pretty text-zinc-600">
              Calculadoras claras para la Argentina. Cada número sale del documento oficial que lo fija,
              con la fecha en que se verificó.
            </p>
            <UltimoCambio className="mt-4" />
          </div>
          <p className="text-sm text-zinc-500">
            <FirmaAutor prefijo="Escrito y verificado por" />
          </p>
        </div>

        <nav aria-labelledby="ca-mapa-titulo" className="border-t border-zinc-200/70 py-8">
          <p id="ca-mapa-titulo" className="ca-pie-titulo">
            Todas las calculadoras
          </p>
          <div className="ca-mapa">
            {temas.map(({ g, paginas }) => (
              <details key={g.id} className="ca-mapa-tema">
                <summary>
                  <span>{g.corto ?? g.titulo}</span>
                  <span className="ca-mapa-n">{paginas.length}</span>
                </summary>
                <ul>
                  {paginas.map((p) => (
                    <li key={p.href}>
                      <a href={p.href}>{g.id === "monotributo" ? p.titulo : (p.corto ?? p.titulo)}</a>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </nav>

        <div className="grid gap-8 border-t border-zinc-200/70 py-8 sm:grid-cols-3">
          <div>
            <p className="ca-pie-titulo">Planillas en Excel</p>
            <ul className="ca-pie-lista">
              {planillas.map((p) => (
                <li key={p.href}>
                  <a href={p.href}>{p.titulo}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="ca-pie-titulo">Tu cuenta</p>
            <ul className="ca-pie-lista">
              <li>
                <SesionLink />
              </li>
            </ul>
            <p className="mt-2 max-w-60 text-xs leading-relaxed text-zinc-500">
              Es opcional: sirve para guardar cálculos y tener tus planillas siempre a mano.
            </p>
          </div>
          <div>
            <p className="ca-pie-titulo">CalculAR</p>
            <ul className="ca-pie-lista">
              {SITIO.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} prefetch={false}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={urlIntl("global")}>CalcularYa: calculadoras para otros países</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-2 border-t border-zinc-200/70 py-6 text-xs leading-relaxed text-zinc-500">
          <p className="max-w-3xl text-pretty">
            Los cálculos de este sitio son orientativos y se basan en fuentes oficiales (ARCA, BCRA, INDEC y
            la legislación vigente). No constituyen asesoramiento impositivo, contable, legal ni financiero:
            ante una decisión importante, consultá con un profesional matriculado.
          </p>
          <p>© 2026 CalculAR · Hecho en Argentina</p>
        </div>
      </div>
    </footer>
  );
}
