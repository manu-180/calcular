import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-revenus-fonciers";

export default definirCasos(calculadora, [
  {
    nombre: "Villa en dur louée 150 000 F toute l'année",
    origen: { tipo: "recalculado", detalle: "1 800 000 × 12 % = 216 000." },
    fecha: "2026-10-27",
    entrada: {"loyer": 150000, "mois": 12, "type": "dur", "chargesLocataire": 0, "chargesProprietaire": 0},
    esperado: {"brut": 1800000, "impot": 216000, "parMois": 18000},
  },
  {
    nombre: "Maison en banco louée 7 mois",
    origen: { tipo: "recalculado", detalle: "85 500 × 7 = 598 500, base arrondie 598 000 × 8 % = 47 840." },
    fecha: "2026-10-27",
    entrada: {"loyer": 85500, "mois": 7, "type": "banco", "chargesLocataire": 0, "chargesProprietaire": 0},
    esperado: {"base": 598000, "impot": 47840},
  },
]);
