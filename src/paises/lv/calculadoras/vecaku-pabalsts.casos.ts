import { definirCasos } from "@/motor/calculo";
import calc from "./vecaku-pabalsts";

const VSAA = "https://www.vsaa.gov.lv/en/services/granting-and-disbursement-parental-benefit";

export default definirCasos(calc, [
  {
    nombre: "13 mēneši, 1500 eiro",
    origen: { tipo: "recalculado", url: VSAA, detalle: "1500 × 60% = 900. 9 + 4 mēneši: 900 × 13 = 11 700." },
    fecha: "2026-11-01",
    entrada: { alga: 1500, variants: "m13", ienakumi: false },
    esperado: { pabalsts: 900, kopa: 11700 },
  },
  {
    nombre: "19 mēneši, 1500 eiro",
    origen: { tipo: "recalculado", url: VSAA, detalle: "1500 × 43,75% = 656,25. 656,25 × 19 = 12 468,75." },
    fecha: "2026-11-01",
    entrada: { alga: 1500, variants: "m19", ienakumi: false },
    esperado: { pabalsts: 656.25, kopa: 12468.75 },
  },
  {
    nombre: "Strādājot: 75% no pamata daļas",
    origen: { tipo: "recalculado", url: VSAA, detalle: "900 × 75% = 675. 675 × 9 + 900 × 4 = 9675." },
    fecha: "2026-11-01",
    entrada: { alga: 1500, variants: "m13", ienakumi: true },
    esperado: { pabalsts: 675, pilns: 900, kopa: 9675 },
  },
]);
