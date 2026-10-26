import { definirCasos } from "@/motor/calculo";
import minimalberKalkulator from "./minimalber-kalkulator";

const RENDELET = "https://njt.jog.gov.hu/jogszabaly/2025-426-20-22";

export default definirCasos(minimalberKalkulator, [
  {
    nombre: "Minimálbér teljes munkaidőben",
    origen: { tipo: "oficial", url: RENDELET, detalle: "2. § (1): havi 322 800, heti 74 210, napi 14 850, órabér 1856 Ft. Nettó 322 800 × 66,5% = 214 662." },
    fecha: "2026-10-24",
    entrada: { fajta: "minimalber", hetiOra: 40 },
    esperado: { havi: 322800, heti: 74210, napi: 14850, orai: 1856, netto: 214662, eves: 3873600, munkaltatoiKoltseg: 364764 },
  },
  {
    nombre: "Garantált bérminimum teljes munkaidőben",
    origen: { tipo: "oficial", url: RENDELET, detalle: "2. § (2): havi 373 200 Ft. TB 69 042, SZJA 55 980, nettó 248 178." },
    fecha: "2026-10-24",
    entrada: { fajta: "garantalt", hetiOra: 40 },
    esperado: { havi: 373200, orai: 2145, netto: 248178, munkaltatoiKoltseg: 421716 },
  },
  {
    nombre: "Minimálbér heti 20 órában",
    origen: { tipo: "recalculado", url: RENDELET, detalle: "322 800 / 2 = 161 400; TB 29 859, SZJA 24 210, nettó 107 331." },
    fecha: "2026-10-24",
    entrada: { fajta: "minimalber", hetiOra: 20 },
    esperado: { havi: 161400, heti: 37105, napi: 7425, netto: 107331 },
  },
  {
    nombre: "Negyvennél több heti óra",
    origen: { tipo: "recalculado", url: RENDELET, detalle: "A kalkulátor legfeljebb heti 40 órával számol." },
    fecha: "2026-10-24",
    entrada: { fajta: "minimalber", hetiOra: 48 },
    esperaError: true,
  },
]);
