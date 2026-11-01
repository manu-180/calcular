import { definirCasos } from "@/motor/calculo";
import gyedKalkulator from "./gyed-kalkulator";

const EBTV = "https://njt.jog.gov.hu/jogszabaly/1997-83-00-00";

export default definirCasos(gyedKalkulator, [
  {
    nombre: "500 000 Ft átlagkereset",
    origen: { tipo: "recalculado", url: EBTV, detalle: "42/D. § (1): 70% = 350 000; nyugdíjjárulék 10% = 35 000 (Tbj. 37. § (1)); nettó 315 000." },
    fecha: "2026-10-24",
    entrada: { havi: 500000 },
    esperado: { brutto: 350000, nyugdijjarulek: 35000, netto: 315000, maximum: 451920 },
  },
  {
    nombre: "800 000 Ft: a felső határ érvényes",
    origen: { tipo: "recalculado", url: EBTV, detalle: "70% = 560 000, de legfeljebb 2 × 322 800 × 70% = 451 920; nettó 451 920 − 45 192 = 406 728." },
    fecha: "2026-10-24",
    entrada: { havi: 800000 },
    esperado: { brutto: 451920, netto: 406728 },
  },
]);
