import { definirCasos } from "@/motor/calculo";
import calculadora from "./local-property-tax";

const LPT = "https://www.revenue.ie/en/property/local-property-tax/valuing-your-property/valuation-bands-rates.aspx";

export default definirCasos(calculadora, [
  {
    nombre: "€300,000 in Dublin City",
    origen: { tipo: "oficial", url: LPT, detalle: "Band 2 (€240,001 to €315,000) basic rate €235. Dublin City Council 0%." },
    fecha: "2026-10-14",
    entrada: { valor: 300000, consejo: "dublin-city" },
    esperado: { banda: 2, basico: 235, anual: 235 },
  },
  {
    nombre: "€300,000 in Carlow (+15%)",
    origen: { tipo: "recalculado", detalle: "235 × 1.15 = 270.25." },
    fecha: "2026-10-14",
    entrada: { valor: 300000, consejo: "carlow" },
    esperado: { anual: 270.25, ajuste: 15 },
  },
  {
    nombre: "€500,000 in Dún Laoghaire Rathdown (−15%)",
    origen: { tipo: "recalculado", detalle: "Band 4 basic €428 × 0.85 = 363.80." },
    fecha: "2026-10-14",
    entrada: { valor: 500000, consejo: "dun-laoghaire-rathdown" },
    esperado: { banda: 4, anual: 363.8 },
  },
  {
    nombre: "Band 1 edge at €240,000",
    origen: { tipo: "oficial", url: LPT, detalle: "Band 1 is €1 to €240,000, basic rate €95." },
    fecha: "2026-10-14",
    entrada: { valor: 240000, consejo: "dublin-city" },
    esperado: { banda: 1, basico: 95 },
  },
  {
    nombre: "€240,001 starts band 2",
    origen: { tipo: "oficial", url: LPT, detalle: "Band 2 starts at €240,001: €235." },
    fecha: "2026-10-14",
    entrada: { valor: 240001, consejo: "dublin-city" },
    esperado: { banda: 2, basico: 235 },
  },
  {
    nombre: "€2,500,000 in Dublin City",
    origen: {
      tipo: "recalculado",
      detalle: "0.0906% of 1,260,000 = 1,141.56 + 0.25% of 840,000 = 2,100 + 0.3% of 400,000 = 1,200. Total 4,441.56.",
    },
    fecha: "2026-10-14",
    entrada: { valor: 2500000, consejo: "dublin-city" },
    esperado: { basico: 4441.56, anual: 4441.56, banda: null },
  },
]);
