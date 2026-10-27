import { definirCasos } from "@/motor/calculo";
import calculadora from "./taxes-sur-salaires";

export default definirCasos(calculadora, [
  {
    nombre: "Entreprise à l'IS, masse de 5 000 500 F",
    origen: { tipo: "recalculado", detalle: "Base arrondie 5 000 000 : CFE 175 000, TFP 100 000, TEJ 100 000 ; taxe logement 1 % de 5 000 500 = 50 005. Total 425 005." },
    fecha: "2026-10-27",
    entrada: {"masse": 5000500, "assujetti": true},
    esperado: {"cfe": 175000, "tfp": 100000, "tej": 100000, "logement": 50005, "total": 425005},
  },
  {
    nombre: "Employeur non soumis à l'IS ou à l'IBIC",
    origen: { tipo: "recalculado", detalle: "Seule la taxe logement : 50 005." },
    fecha: "2026-10-27",
    entrada: {"masse": 5000500, "assujetti": false},
    esperado: {"cfe": 0, "logement": 50005, "total": 50005},
  },
]);
