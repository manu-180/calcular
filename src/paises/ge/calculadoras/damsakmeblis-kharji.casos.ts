import { definirCasos } from "@/motor/calculo";
import damsakmeblisKharji from "./damsakmeblis-kharji";

const KANONI = "https://site-api.pensions.ge/uploads/docs/legislation/funded-pension-law-2026.pdf";

export default definirCasos(damsakmeblisKharji, [
  {
    nombre: "1000 ლარი, ერთი დასაქმებული",
    origen: { tipo: "recalculado", url: KANONI, detalle: "მუხლი 3.6 „ა“: 1000 × 2% = 20; ხარჯი 1020; წელიწადში 12 240; გადასახადი 196 + შენატანები 20 + 20 = 236." },
    fecha: "2026-11-01",
    entrada: { bruto: 1000, monatsile: true, dasaqmebuli: 1 },
    esperado: { tvis: 1020, shenatani: 20, tslis: 12240, neto: 784, budgeti: 236 },
  },
  {
    nombre: "სქემის გარეშე, სამი დასაქმებული",
    origen: { tipo: "recalculado", url: KANONI, detalle: "1000 × 3 = 3000, შენატანის გარეშე; გადასახადი 200 × 3 = 600." },
    fecha: "2026-11-01",
    entrada: { bruto: 1000, monatsile: false, dasaqmebuli: 3 },
    esperado: { tvis: 3000, shenatani: 0, budgeti: 600 },
  },
]);
