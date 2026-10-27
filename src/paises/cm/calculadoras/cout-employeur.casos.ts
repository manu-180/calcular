import { definirCasos } from "@/motor/calculo";
import calculadora from "./cout-employeur";

const F = "2026-10-26";

export default definirCasos(calculadora, [
  {
    nombre: "300 000 F, régime général, groupe A",
    origen: { tipo: "recalculado", detalle: "CNPS employeur 12 600 + 21 000 + 5 250 = 38 850 ; Crédit foncier 1,5 % = 4 500 ; FNE 1 % = 3 000. Charges 46 350, coût 346 350." },
    fecha: F,
    entrada: { brut: 300000, regime: "general", groupe: "a", exonere: false },
    esperado: { cnps: 38850, cfc: 4500, fne: 3000, charges: 46350, cout: 346350, tauxCharges: 15.45 },
  },
  {
    nombre: "Base du Crédit foncier arrondie au millier",
    origen: { tipo: "recalculado", detalle: "250 750 F : base 250 000, Crédit foncier 3 750, FNE 2 500." },
    fecha: F,
    entrada: { brut: 250750, regime: "general", groupe: "a", exonere: false },
    esperado: { cfc: 3750, fne: 2500 },
  },
  {
    nombre: "Employeur exonéré",
    origen: { tipo: "recalculado", detalle: "Sans Crédit foncier ni FNE : charges = CNPS 38 850." },
    fecha: F,
    entrada: { brut: 300000, regime: "general", groupe: "a", exonere: true },
    esperado: { cfc: 0, fne: 0, charges: 38850 },
  },
]);
