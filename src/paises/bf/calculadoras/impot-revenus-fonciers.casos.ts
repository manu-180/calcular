import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-revenus-fonciers";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Loyer de 300 000 F par mois",
    origen: { tipo: "recalculado", detalle: "Abattement 50 % : net 150 000. 18 % × 100 000 = 18 000 ; 25 % × 50 000 = 12 500. Impôt 30 500." },
    fecha: F,
    entrada: { loyer: 300000 },
    esperado: { net: 150000, impot: 30500, impotAnnuel: 366000 },
  },
  {
    nombre: "Loyer de 100 000 F par mois",
    origen: { tipo: "recalculado", detalle: "Net 50 000, dans la première tranche : 18 % = 9 000." },
    fecha: F,
    entrada: { loyer: 100000 },
    esperado: { net: 50000, impot: 9000 },
  },
]);
