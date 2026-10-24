import type { RegionMundo } from "../../i18n/mundo";

// Región de cada país para el filtro del ranking. Un país que no está acá solo aparece en «Todos»:
// sumar uno nuevo es agregar su ISO a la lista de su región.
const LISTAS: Record<RegionMundo, string> = {
  americas: "AR AG BB BO BR BS BZ CA CL CO CR CU DM DO EC GD GT GY HN HT JM KN LC MX NI PA PE PR PY SR SV TT US UY VC VE",
  europa: "AD AL AT BA BE BG BY CH CY CZ DE DK EE ES FI FR GB GR HR HU IE IS IT LI LT LU LV MC MD ME MK MT NL NO PL PT RO RS SE SI SK SM UA XK",
  asia: "AU BD BN BT CN FJ HK ID IN JP KG KH KR KZ LA LK MM MN MO MV MY NP NZ PG PH PK SG TH TJ TL TM TW UZ VN WS TO",
  africa: "AE AO BF BH BI BJ BW CD CF CG CI CM CV DJ DZ EG ER ET GA GH GM GN GQ GW IL IQ IR JO KE KM KW LB LR LS LY MA MG ML MR MU MW MZ NA NE NG OM PS QA RW SA SC SD SL SN SO SS ST SY SZ TD TG TN TR TZ UG YE ZA ZM ZW",
};

const DE: ReadonlyMap<string, RegionMundo> = new Map(
  (Object.entries(LISTAS) as [RegionMundo, string][]).flatMap(([region, isos]) => isos.split(" ").map((iso) => [iso, region] as const)),
);

export const ORDEN_REGIONES: readonly RegionMundo[] = ["americas", "europa", "asia", "africa"];

export function regionDe(iso: string): RegionMundo | null {
  return DE.get(iso) ?? null;
}
