import type { GrillaMundo } from "../mundo/tipos";
import { anioDeGrilla, NIVELES, NIVELES_DATOS, nivelesDe, RANKINGS, todosLosRankings, TRAMOS } from "./calculo";
import { IDS_RANKING, type IdRanking } from "./rutas";
import { hrefDe, nombrePais } from "./vista";

// Datos abiertos (CC BY 4.0) de los rankings: la grilla resumida por país en los niveles fijos de
// NIVELES_DATOS y los puestos de cada ranking. Nada que no esté ya en las páginas: la de «Tu sueldo en
// el mundo» manda al navegador los netos de los 56 brutos de la grilla; acá van 5, redondeados.
// Cambiar una clave rompe a quien ya consume el archivo: se agregan, no se renombran.

export const LICENCIA = { nombre: "CC BY 4.0", url: "https://creativecommons.org/licenses/by/4.0/" } as const;

export interface DatosAbiertos {
  name: string;
  description: string;
  license: { name: string; url: string };
  attribution: string;
  url: string;
  generated: string;
  year: number;
  currency: string;
  methodology: string;
  ppp: { source: string; indicator: string; url: string; checked: string; latestYear: number };
  levels: readonly number[];
  rankings: Record<IdRanking, { variants: Record<string, string>; order: "asc" | "desc"; measure: string }>;
  countries: {
    iso: string;
    name: string;
    edition: string;
    currency: string;
    pppPerIntlDollar: number;
    pppYear: number;
    paysPerYear: number;
    dataVerifiedOn: string;
    calculatorUrl: string;
    levels: { gross: number; net: number; effectiveRate: number; taxFreedomDay: number }[];
    ranks: Record<IdRanking, Record<string, number>>;
  }[];
}

const MEDIDAS: Record<IdRanking, string> = {
  rinde: "Average monthly take-home pay in international dollars at the same gross salary (higher ranks first).",
  libertad: "Tax freedom day: day of the year when income tax and employee contributions are paid off (earlier ranks first).",
  aumento: "Share of a raise kept after income tax and employee contributions, per 100 international dollars (higher ranks first).",
};

function variantes(id: IdRanking): Record<string, string> {
  return Object.fromEntries(
    RANKINGS[id].variantes.map((v) => {
      if (id === "aumento") {
        const [a, b] = TRAMOS[v as keyof typeof TRAMOS];
        return [v, `raise from ${NIVELES[a]} to ${NIVELES[b]} international dollars gross a year`];
      }
      return [v, `gross salary of ${NIVELES[v as keyof typeof NIVELES]} international dollars a year`];
    }),
  );
}

export function datosAbiertos(grilla: GrillaMundo, p: { origen: string; origenAR: string; urlPagina: string }): DatosAbiertos {
  const anio = anioDeGrilla(grilla);
  const resultados = todosLosRankings(grilla);
  const absoluta = (href: string) => (/^https?:\/\//.test(href) ? href : `${p.origen}${href}`);
  const countries = [...grilla.paises]
    .filter((x) => x.puntos.length > 1 && x.ppa > 0)
    .sort((a, b) => (a.iso < b.iso ? -1 : 1))
    .map((pais) => {
      const ranks = {} as Record<IdRanking, Record<string, number>>;
      for (const id of IDS_RANKING) {
        ranks[id] = {};
        for (const [v, r] of Object.entries(resultados[id])) {
          const fila = r.filas.find((f) => f.iso === pais.iso);
          if (fila) ranks[id][v] = fila.puesto;
        }
      }
      return {
        iso: pais.iso,
        name: nombrePais(pais, "en"),
        edition: pais.mercado,
        currency: pais.moneda,
        pppPerIntlDollar: Number(pais.ppa.toPrecision(6)),
        pppYear: pais.anioPpa,
        paysPerYear: pais.pagas,
        dataVerifiedOn: pais.datosVerificadosEl,
        calculatorUrl: absoluta(hrefDe(pais, p.origenAR)),
        levels: nivelesDe(pais, anio).map((n) => ({ gross: n.bruto, net: n.neto, effectiveRate: n.tasa, taxFreedomDay: n.dia })),
        ranks,
      };
    });
  const f = grilla.fuentePpa;
  return {
    name: "Take-home pay and tax by country (CalcularYa)",
    description:
      "Each country's official take-home pay calculator run on the same gross salaries, expressed in international dollars at purchasing power parity. Single person, no children, default values; income tax and employee contributions only.",
    license: { name: LICENCIA.nombre, url: LICENCIA.url },
    attribution: `CalcularYa, ${p.urlPagina}`,
    url: p.urlPagina,
    generated: grilla.generadoEl,
    year: anio,
    currency: "international dollars (PPP, private consumption)",
    methodology: `${p.urlPagina}#metodologia`,
    ppp: { source: f.organismo === "Banco Mundial" ? "World Bank" : f.organismo, indicator: f.indicador, url: f.url, checked: f.consultadoEl, latestYear: f.anio },
    levels: NIVELES_DATOS,
    rankings: Object.fromEntries(IDS_RANKING.map((id) => [id, { variants: variantes(id), order: RANKINGS[id].orden, measure: MEDIDAS[id] }])) as DatosAbiertos["rankings"],
    countries,
  };
}

// Una celda de texto que empieza con = + - @ la planilla la toma como fórmula (inyección CSV): el
// apóstrofo la deja como texto. Los números no se tocan: un -0,5 tiene que seguir siendo número.
const celda = (x: string | number) => {
  const s = typeof x === "string" && /^[=+\-@]/.test(x) ? `'${x}` : String(x);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

// CSV ancho, una fila por país, para abrirlo directo en una planilla. Separador coma y punto decimal.
export function csvDe(d: DatosAbiertos): string {
  const cabecera = [
    "iso",
    "country",
    "edition",
    "currency",
    "ppp_per_intl_dollar",
    "ppp_year",
    "pays_per_year",
    "data_verified_on",
    ...d.levels.flatMap((b) => [`net_at_${b}`, `effective_rate_at_${b}`, `tax_freedom_day_at_${b}`]),
    ...IDS_RANKING.flatMap((id) => Object.keys(d.rankings[id].variants).map((v) => `rank_${id}_${v}`)),
    "calculator_url",
  ];
  const filas = d.countries.map((c) => [
    c.iso,
    c.name,
    c.edition,
    c.currency,
    c.pppPerIntlDollar,
    c.pppYear,
    c.paysPerYear,
    c.dataVerifiedOn,
    ...c.levels.flatMap((n) => [n.net, n.effectiveRate, n.taxFreedomDay]),
    ...IDS_RANKING.flatMap((id) => Object.keys(d.rankings[id].variants).map((v) => c.ranks[id][v] ?? "")),
    c.calculatorUrl,
  ]);
  return [cabecera, ...filas].map((f) => f.map(celda).join(",")).join("\n") + "\n";
}
