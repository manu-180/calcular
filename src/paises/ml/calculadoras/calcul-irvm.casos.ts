import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-irvm";

export default definirCasos(calculadora, [
  {
    nombre: "Dividendes de 1 000 000 F",
    origen: { tipo: "recalculado", detalle: "10 % = 100 000 ; net 900 000." },
    fecha: "2026-10-27",
    entrada: {"montant": 1000000, "nature": "dividendes"},
    esperado: {"impot": 100000, "net": 900000, "taux": 10},
  },
  {
    nombre: "Intérêts d'un dépôt à terme",
    origen: { tipo: "recalculado", detalle: "9 % de 500 000 = 45 000." },
    fecha: "2026-10-27",
    entrada: {"montant": 500000, "nature": "depots"},
    esperado: {"impot": 45000, "taux": 9},
  },
  {
    nombre: "Obligations publiques de plus de 10 ans",
    origen: { tipo: "recalculado", detalle: "Taux ramené à 0 %." },
    fecha: "2026-10-27",
    entrada: {"montant": 500000, "nature": "obligations-publiques-plus-10"},
    esperado: {"impot": 0, "net": 500000},
  },
]);
