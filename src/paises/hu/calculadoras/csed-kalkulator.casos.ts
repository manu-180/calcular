import { definirCasos } from "@/motor/calculo";
import csedKalkulator from "./csed-kalkulator";

const EBTV = "https://njt.jog.gov.hu/jogszabaly/1997-83-00-00";

export default definirCasos(csedKalkulator, [
  {
    nombre: "500 000 Ft átlagkereset, 168 nap",
    origen: { tipo: "recalculado", url: EBTV, detalle: "42. § (1) a): a napi alap 100%-a; 500 000 / 30 = 16 667 naponta; × 168 = 2 800 056." },
    fecha: "2026-10-24",
    entrada: { havi: 500000, napok: 168 },
    esperado: { napi: 16667, osszes: 2800056, havi: 500010 },
  },
  {
    nombre: "168 napnál több nem jár",
    origen: { tipo: "recalculado", url: EBTV, detalle: "40. § (3): legfeljebb 168 nap; 13 333 × 168 = 2 239 944." },
    fecha: "2026-10-24",
    entrada: { havi: 400000, napok: 200 },
    esperado: { napok: 168, osszes: 2239944 },
  },
]);
