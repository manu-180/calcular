import { definirCasos } from "@/motor/calculo";
import calc from "./slimibas-naudas-aprekins";

const VSAA = "https://www.vsaa.gov.lv/en/services/granting-and-disbursement-sickness-benefit";

export default definirCasos(calc, [
  {
    nombre: "14 dienas",
    origen: { tipo: "recalculado", url: VSAA, detalle: "2 dienas × 80 × 75% = 120. 6 dienas × 80 × 80% = 384. Darba devējs 504. 5 dienas × 55 × 80% = 220." },
    fecha: "2026-11-01",
    entrada: { izpelna: 80, iemaksuAlga: 55, dienas: 14 },
    esperado: { devejs: 504, vsaa: 220, kopa: 724 },
  },
  {
    nombre: "Viena diena netiek apmaksāta",
    origen: { tipo: "recalculado", url: VSAA, detalle: "Maksā no 2. dienas." },
    fecha: "2026-11-01",
    entrada: { izpelna: 80, iemaksuAlga: 55, dienas: 1 },
    esperado: { kopa: 0 },
  },
  {
    nombre: "9 dienas: vēl nav VSAA daļas",
    origen: { tipo: "recalculado", url: VSAA, detalle: "VSAA maksā no 10. dienas." },
    fecha: "2026-11-01",
    entrada: { izpelna: 100, iemaksuAlga: 55, dienas: 9 },
    esperado: { devejs: 630, vsaa: 0 },
  },
]);
