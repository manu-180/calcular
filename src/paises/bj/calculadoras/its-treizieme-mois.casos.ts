import { definirCasos } from "@/motor/calculo";
import calculadora from "./its-treizieme-mois";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "300 000 F de salaire et un treizième mois de 300 000 F",
    origen: {
      tipo: "recalculado",
      detalle:
        "Art. 126 : salaire moyen (11 × 300 000 + 600 000) / 12 = 325 000 ; ITS moyen 9 000 + 15 000 + 14 250 = 38 250 ; × 600 000 / 325 000 = 70 615. ITS ordinaire 33 500 ; supplément 37 115. Sans atténuation : 101 500.",
    },
    fecha: F,
    entrada: { salaire: 300000, prime: 300000 },
    esperado: { its: 70615, supplement: 37115, moyen: 325000, impotMoyen: 38250, sansAttenuation: 101500, economie: 30885, netPrime: 262885 },
  },
  {
    nombre: "Petit salaire sous la première tranche",
    origen: { tipo: "recalculado", detalle: "Salaire 50 000 et prime 50 000 : moyenne 54 167, sous 60 000 donc ITS moyen nul et ITS du mois nul." },
    fecha: F,
    entrada: { salaire: 50000, prime: 50000 },
    esperado: { its: 0, supplement: 0 },
  },
]);
