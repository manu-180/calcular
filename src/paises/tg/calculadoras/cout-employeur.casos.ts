import { definirCasos } from "@/motor/calculo";
import calculadora from "./cout-employeur";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "200 000 F bruts",
    origen: { tipo: "recalculado", detalle: "Charges 25 000 + 6 000 + 4 000 + 10 000 = 45 000 (22,5 %). Coût 245 000, soit 2 940 000 sur 12 mois." },
    fecha: F,
    entrada: { brut: 200000, nonSoumis: 0 },
    esperado: { charges: 45000, cnss: 35000, amu: 10000, cout: 245000, coutAnnuel: 2940000, pourcentage: 22.5 },
  },
  {
    nombre: "1 000 000 F bruts et 50 000 F de frais remboursés",
    origen: { tipo: "recalculado", detalle: "Charges 125 000 + 30 000 + 20 000 + 50 000 = 225 000. Coût 1 000 000 + 225 000 + 50 000 = 1 275 000." },
    fecha: F,
    entrada: { brut: 1000000, nonSoumis: 50000 },
    esperado: { charges: 225000, cout: 1275000 },
  },
]);
