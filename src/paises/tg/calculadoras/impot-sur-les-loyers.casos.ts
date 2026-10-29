import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-sur-les-loyers";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "6 000 000 F de loyers par an",
    origen: {
      tipo: "recalculado",
      detalle: "Net 6 000 000 − 50 % = 3 000 000 ; (3 000 000 − 900 000) × 3 % = 63 000. Retenue 8,75 % = 525 000, dont 5 % = 300 000 sur l'IRPP.",
    },
    fecha: F,
    entrada: { loyers: 6000000, taxeFonciere: 0 },
    esperado: { revenuNet: 3000000, irpp: 63000, retenue: 525000, imputable: 300000, solde: 0 },
  },
  {
    nombre: "24 000 000 F de loyers et 450 000 F de taxe foncière",
    origen: {
      tipo: "recalculado",
      detalle:
        "Net 12 000 000 − 450 000 = 11 550 000 ; 63 000 + 300 000 + 450 000 + 20 % × 2 550 000 = 1 323 000. Imputable 1 200 000 ; reste 123 000.",
    },
    fecha: F,
    entrada: { loyers: 24000000, taxeFonciere: 450000 },
    esperado: { revenuNet: 11550000, irpp: 1323000, imputable: 1200000, solde: 123000 },
  },
]);
