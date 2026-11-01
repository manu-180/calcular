import { definirCasos } from "@/motor/calculo";
import calc from "./maternitates-pabalsts";

const VSAA = "https://www.vsaa.gov.lv/en/services/granting-and-disbursement-maternity-benefit";

export default definirCasos(calc, [
  {
    nombre: "18 250 eiro gadā, 112 dienas",
    origen: { tipo: "recalculado", url: VSAA, detalle: "Vd = 18 250 / 365 = 50. 50 × 112 × 80% = 4480." },
    fecha: "2026-11-01",
    entrada: { alga12: 18250, dienas12: 365, dienas: 112 },
    esperado: { diena: 50, pabalsts: 4480 },
  },
  {
    nombre: "Ilgākais periods 140 dienas",
    origen: { tipo: "recalculado", url: VSAA, detalle: "50 × 140 × 80% = 5600." },
    fecha: "2026-11-01",
    entrada: { alga12: 18250, dienas12: 365, dienas: 140 },
    esperado: { pabalsts: 5600 },
  },
]);
