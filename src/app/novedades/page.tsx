import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { LineaDeTiempo } from "@/components/novedades/LineaDeTiempo";
import { IconoRss, PuntoVivo } from "@/components/novedades/piezas";
import { breadcrumbSchema } from "@/lib/archivo-mensual";
import { AUTOR, ORGANIZACION } from "@/lib/schema";
import {
  NOVEDADES,
  SITIO,
  fechaDe,
  fechaEnElSitio,
  fechaLargaNovedad,
  organismosVigilados,
  ultimoCambio,
} from "@/lib/novedades";

export const metadata: Metadata = {
  title: "Novedades: lo que cambió en los datos oficiales",
  description:
    "Cada dato oficial nuevo que llega a CalculAR, el día que llega: jubilaciones, asignaciones, inflación, canastas del INDEC y escalas salariales, con su vigencia y la fuente para chequearlo.",
  alternates: {
    canonical: "/novedades",
    types: { "application/rss+xml": [{ url: "/novedades/feed.xml", title: "Novedades de CalculAR" }] },
  },
};

const PASOS = [
  {
    t: "Un organismo publica",
    d: "ANSES saca una resolución, el INDEC publica la inflación, un gremio firma su escala.",
  },
  {
    t: "Lo revisamos antes de usarlo",
    d: "Las fuentes de ANSES, el INDEC, ARCA y la Corte se revisan solas tres veces por día. Las escalas de los gremios se cargan con la circular oficial en la mano. Si un número no cierra, no se publica.",
  },
  {
    t: "Las cuentas se actualizan",
    d: "Las calculadoras pasan a usar el dato nuevo y acá queda anotado, con la fuente para que lo puedas chequear.",
  },
];

function nombresDeOrganismos(lista: string[]): string {
  const principales = ["ANSES", "INDEC", "ARCA"].filter((o) => lista.includes(o));
  const resto = lista.length - principales.length;
  return resto > 0 ? `${principales.join(", ")} y ${resto} más` : principales.join(", ");
}

export default function NovedadesPage() {
  const ultimo = ultimoCambio();
  const organismos = organismosVigilados();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITIO}/novedades`,
        url: `${SITIO}/novedades`,
        name: "Novedades de CalculAR",
        description: metadata.description,
        inLanguage: "es-AR",
        ...(ultimo ? { dateModified: ultimo } : {}),
        author: AUTOR,
        publisher: ORGANIZACION,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: NOVEDADES.length,
          itemListOrder: "https://schema.org/ItemListOrderDescending",
          itemListElement: NOVEDADES.map((n, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "CreativeWork",
              "@id": `${SITIO}/novedades#${n.id}`,
              url: `${SITIO}/novedades#${n.id}`,
              name: n.titulo,
              description: n.detalle,
              datePublished: fechaEnElSitio(n),
              dateCreated: fechaDe(n),
              isBasedOn: n.fuente.url,
              about: n.rutas.map((r) => `${SITIO}${r}`),
            },
          })),
        },
      },
      breadcrumbSchema([
        { name: "Inicio", url: "/" },
        { name: "Novedades", url: "/novedades" },
      ]),
    ],
  };

  return (
    <div className="space-y-14 sm:space-y-16">
      <JsonLd data={jsonLd} />

      <header className="relative -mx-4 -mt-8 overflow-hidden px-4 pb-10 pt-10 sm:mx-0 sm:mt-0 sm:rounded-[2rem] sm:border sm:border-zinc-900/[0.06] sm:bg-white/35 sm:px-10 sm:pb-10 sm:pt-12">
        <div aria-hidden className="ca-cuadricula pointer-events-none absolute inset-0 -z-10" />

        <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-white/85 px-3 py-1 text-xs font-medium text-emerald-800">
          <PuntoVivo />
          Novedades
        </p>

        <h1 className="mt-5 max-w-2xl text-[clamp(2.1rem,1.5rem+2.6vw,3.25rem)] font-bold leading-[1.04] tracking-[-0.035em] text-zinc-950">
          Lo que cambió en los datos oficiales, <span className="text-emerald-700">el día que cambió</span>
        </h1>

        <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-pretty text-zinc-600 sm:text-[17px]">
          Cuando un organismo publica un dato nuevo, lo cargamos en las calculadoras y queda anotado acá: qué
          cambió, desde cuándo rige y de dónde salió. Así sabés con qué número se hace tu cuenta y desde cuándo.
        </p>

        <dl className="mt-8 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-zinc-900/[0.06] bg-zinc-900/[0.06] sm:grid-cols-3">
          {[
            { t: "Último dato cargado", v: ultimo ? fechaLargaNovedad(ultimo) : "Todavía ninguno" },
            { t: "Revisión de las fuentes", v: "Tres veces por día" },
            { t: "Fuentes que seguimos", v: nombresDeOrganismos(organismos) },
          ].map((x) => (
            <div key={x.t} className="bg-white/90 px-4 py-3.5">
              <dt className="text-xs text-zinc-500">{x.t}</dt>
              <dd className="mt-1 text-[15px] font-semibold tracking-tight text-zinc-900">{x.v}</dd>
            </div>
          ))}
        </dl>
      </header>

      <section aria-labelledby="como-titulo" className="space-y-6">
        <h2 id="como-titulo" className="text-titular font-bold text-zinc-900">
          Cómo se mantiene al día
        </h2>
        <ol className="grid gap-6 sm:grid-cols-3">
          {PASOS.map((p, i) => (
            <li key={p.t} className="border-t border-zinc-900/[0.1] pt-4">
              <p className="text-xs font-semibold tabular-nums text-emerald-700">0{i + 1}</p>
              <h3 className="mt-2 font-semibold text-zinc-900">{p.t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-pretty text-zinc-600">{p.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="registro-titulo" className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="registro-titulo" className="text-titular font-bold text-zinc-900">
            Registro de cambios
          </h2>
          <a
            href="/novedades/feed.xml"
            className="inline-flex items-center gap-1.5 self-start rounded-full border border-zinc-900/[0.08] bg-white/75 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:border-zinc-900/[0.16] hover:text-zinc-900 sm:self-auto"
          >
            <IconoRss className="size-3.5 text-emerald-600" />
            Seguilas por RSS
          </a>
        </div>
        <LineaDeTiempo novedades={NOVEDADES} />
      </section>

      <p className="rounded-2xl border border-zinc-900/[0.06] bg-white/70 p-5 text-sm leading-relaxed text-pretty text-zinc-600">
        ¿Salió un dato oficial que todavía no ves acá? Avisanos desde la{" "}
        <Link href="/contacto" className="font-medium text-emerald-700 underline decoration-emerald-200 underline-offset-2 hover:decoration-emerald-400">
          página de contacto
        </Link>{" "}
        y lo revisamos contra la fuente.
      </p>
    </div>
  );
}
