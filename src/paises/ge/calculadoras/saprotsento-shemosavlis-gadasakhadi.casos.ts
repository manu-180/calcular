import { definirCasos } from "@/motor/calculo";
import saprotsentoShemosavlisGadasakhadi from "./saprotsento-shemosavlis-gadasakhadi";

const KOD = "https://infohub.rs.ge/ka/workspace/document/800cbef0-32bf-4f06-94fe-8afd2bf144a0";

export default definirCasos(saprotsentoShemosavlisGadasakhadi, [
  {
    nombre: "10 000 ლარი, 10%, ერთი წელი, კომპანია",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 131.1: 10 000 × 10% = 1000, 5% = 50, რჩება 950." },
    fecha: "2026-11-01",
    entrada: { tanxa: 10000, ganakveti: 10, tve: 12, gamcemi: "sxva" },
    esperado: { kheze: 950, protsenti: 1000, gadasakhadi: 50, mpr: 8.25 },
  },
  {
    nombre: "6000 ლარი, 12%, ექვსი თვე, კომპანია",
    origen: { tipo: "recalculado", url: KOD, detalle: "6000 × 12% × 6/12 = 360, 5% = 18, რჩება 342." },
    fecha: "2026-11-01",
    entrada: { tanxa: 6000, ganakveti: 12, tve: 6, gamcemi: "sxva" },
    esperado: { kheze: 342, gadasakhadi: 18 },
  },
  {
    nombre: "ლიცენზირებული ინსტიტუტი",
    origen: { tipo: "recalculado", url: KOD, detalle: "მუხლი 131.5: წყაროსთან არ იბეგრება." },
    fecha: "2026-11-01",
    entrada: { tanxa: 10000, ganakveti: 10, tve: 12, gamcemi: "licenzirebuli" },
    esperado: { kheze: 1000, gadasakhadi: 0 },
  },
]);
