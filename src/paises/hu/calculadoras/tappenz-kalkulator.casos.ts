import { definirCasos } from "@/motor/calculo";
import tappenzKalkulator from "./tappenz-kalkulator";

const EBTV = "https://njt.jog.gov.hu/jogszabaly/1997-83-00-00";

export default definirCasos(tappenzKalkulator, [
  {
    nombre: "600 000 Ft átlagkereset, 30 nap",
    origen: { tipo: "recalculado", url: EBTV, detalle: "48. § (7) a): napi alap 20 000 × 60% = 12 000; 30 nap = 360 000; SZJA 15% = 54 000." },
    fecha: "2026-10-24",
    entrada: { havi: 600000, napok: 30, biztositas: true, korhaz: false },
    esperado: { napi: 12000, brutto: 360000, szja: 54000, netto: 306000, maximum: 21520 },
  },
  {
    nombre: "Magas kereset: napi felső határ",
    origen: { tipo: "recalculado", url: EBTV, detalle: "1 500 000 / 30 × 60% = 30 000, de legfeljebb 2 × 322 800 / 30 = 21 520; 10 nap = 215 200." },
    fecha: "2026-10-24",
    entrada: { havi: 1500000, napok: 10, biztositas: true, korhaz: false },
    esperado: { napi: 21520, brutto: 215200 },
  },
  {
    nombre: "Kórházi ápolás",
    origen: { tipo: "recalculado", url: EBTV, detalle: "48. § (7) c): 50%; 20 000 × 50% = 10 000; 10 nap = 100 000." },
    fecha: "2026-10-24",
    entrada: { havi: 600000, napok: 10, biztositas: true, korhaz: true },
    esperado: { szazalek: 50, brutto: 100000 },
  },
  {
    nombre: "Rövid biztosítási idő",
    origen: { tipo: "recalculado", url: EBTV, detalle: "48. § (7) b): 15 000 × 50% = 7500; 30 nap = 225 000." },
    fecha: "2026-10-24",
    entrada: { havi: 450000, napok: 30, biztositas: false, korhaz: false },
    esperado: { napi: 7500, brutto: 225000 },
  },
]);
