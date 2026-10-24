import { publicacionHoras } from "@/lib/horas/indice";
import { entradasDelMercado } from "@/motor/mapa";
import { urlMundo } from "@/motor/mundo/ui/seo";
import { calendarioPublicado, urlCalendario } from "@/motor/calendario/rutas";
import { rutaDatos } from "@/motor/rankings/rutas";
import { urlIndice } from "@/motor/rankings/urls";
import { urlHoras } from "@/motor/horas/ui/seo";
import { origenPublicoIntl, urlIntl } from "@/motor/seo";
import { intlActivo, modoPublicacion, NOMBRE_SITIO_INTL } from "@/motor/sitio";
import { hoyEn } from "@/motor/vigencia";
import { registro } from "@/paises";

// /llms.txt de calcularya, en inglés como la home global (llega por rewrite, ver RUTA_LLMS en src/motor/hosts.ts). El de public/
// describe calcular.ar y no puede salir en este dominio: check_routing_hosts.ts exige que este no
// nombre a calcular.ar ni lleve rayas.
const limpio = (s: string) => s.replace(/\s*—\s*/g, ", ").replace(/\s+/g, " ").trim();

export async function GET(_req: Request, { params }: { params: Promise<{ mercado: string }> }) {
  const { mercado } = await params;
  if (mercado !== "global" || !intlActivo()) return new Response("Not found", { status: 404 });
  const modo = modoPublicacion();
  // Horas de trabajo solo si su página se publica (la misma regla que el sitemap y el 404).
  const conHoras = publicacionHoras().inicial !== null;
  const secciones = registro
    .mercados(modo)
    .filter((m) => m.codigo !== "global")
    .sort((a, b) => a.nombre.localeCompare(b.nombre, "en"))
    .map((m) => {
      const fecha = hoyEn(m);
      const lastmod = new Map((entradasDelMercado(registro, m.codigo) ?? []).map((e) => [e.url, e.lastmod]));
      const lineas = registro.calculadorasPublicables(m.codigo, fecha, modo).flatMap((c) => {
        const p = registro.pagina(m.codigo, c.definicion.slug, fecha, modo);
        if (!p) return [];
        const url = urlIntl(m.codigo, c.definicion.slug);
        const al = lastmod.get(url);
        return [`- [${limpio(p.contenido.h1)}](${url}): ${limpio(p.contenido.description)}${al ? ` Data as of ${al}.` : ""}`];
      });
      return [
        `## ${m.nombre}`,
        "",
        `Currency: ${m.monedas[0]}. Language: ${m.locale}.`,
        "",
        `- [${m.nombre}: calculators](${urlIntl(m.codigo)}): every calculator for the country, grouped by topic.`,
        `- [${m.nombre}: salary around the world](${urlMundo(m)}): the day of the year you stop working for the government on a salary in this country, and what that salary would leave in hand in every country at the same purchasing power.`,
        `- [${m.nombre}: country rankings](${urlIndice(m)}): where the same salary goes furthest, Tax Freedom Day and how much of a raise is kept, with this country's rank in each, updated daily.`,
        ...(conHoras ? [`- [${m.nombre}: hours of work](${urlHoras(m)}): how many hours of minimum wage work an iPhone, a MacBook Air or Spotify Premium costs in this country and in every other one, from official store prices.`] : []),
        ...(calendarioPublicado(registro, m, modo) ? [`- [${m.nombre}: pay and tax calendar](${urlCalendario(m)}): upcoming dates that change pay (minimum wage, tax and contribution changes, payment deadlines), each from an official source, linked to its calculator and downloadable as .ics.`] : []),
        ...lineas,
        `- [${m.nombre}: official sources](${urlIntl(m.codigo, "fuentes")}): every value the calculators use, with its effective dates, a link to the rule and the date it was checked.`,
        `- [${m.nombre}: updates](${urlIntl(m.codigo, "novedades")}): rule changes that affect the calculators.`,
      ].join("\n");
    });
  const texto = `# ${NOMBRE_SITIO_INTL}

> Free calculators for work, money and everyday life in every country, with figures from each country's official sources. Every page shows the source and the date each figure was checked. The math runs in the browser and needs no sign-up.

If a value can't be confirmed in the official source, the calculator that uses it isn't published. Results are estimates. Each country's pages are written in that country's language.

- [Your salary around the world](${urlMundo({ codigo: "global", idioma: "en" })}): your personal Tax Freedom Day and what the same salary would leave in hand in every country, by purchasing power parity, run through each country's official take-home pay calculator.
- [Country rankings](${urlIndice({ codigo: "global", idioma: "en" })}): where the same salary goes furthest, Tax Freedom Day by country and how much of a raise is kept, ranked at three reference salaries and updated daily. Includes the methodology and every country's source.
- [Open data, JSON](${origenPublicoIntl()}${rutaDatos("json")}): the same figures country by country (take-home pay, effective rate and Tax Freedom Day at five gross salaries in international dollars, plus every rank). Licence CC BY 4.0, credit CalcularYa.
- [Open data, CSV](${origenPublicoIntl()}${rutaDatos("csv")}): the same file as a spreadsheet, one row per country.
${conHoras ? `- [How many hours of work does it cost?](${urlHoras({ codigo: "global", idioma: "en" })}): the official price of the same product in hours of minimum wage work, country by country, with the source and reading date of every price and wage.
` : ""}- [About us and how we work](${urlIntl("global", "sobre")})
- [Contact](${urlIntl("global", "contacto")})

${secciones.join("\n\n")}
`;
  return new Response(texto, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=0, s-maxage=3600" } });
}
