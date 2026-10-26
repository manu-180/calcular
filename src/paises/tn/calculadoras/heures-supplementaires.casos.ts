import { definirCasos } from "@/motor/calculo";
import calculadora from "./heures-supplementaires";

export default definirCasos(calculadora, [
  {
    nombre: "Régime de 48 heures, 4 heures à 4 DT",
    origen: { tipo: "recalculado", detalle: "16 + 75 % = 28." },
    fecha: "2026-10-24",
    entrada: { horaire: 4, regime: "48h", normales: null, heures: 4 },
    esperado: { base: 16, majoration: 12, total: 28 },
  },
  {
    nombre: "Semaine de 40 heures, 10 heures supplémentaires",
    origen: { tipo: "recalculado", detalle: "8 h jusqu'à 48 h : 32 + 25 % = 40 ; 2 h au delà : 8 + 50 % = 12 ; total 52." },
    fecha: "2026-10-24",
    entrada: { horaire: 4, regime: "reduit", normales: 40, heures: 10 },
    esperado: { base: 40, majoration: 12, total: 52 },
  },
  {
    nombre: "Temps partiel, 3 heures",
    origen: { tipo: "recalculado", detalle: "12 + 50 % = 18." },
    fecha: "2026-10-24",
    entrada: { horaire: 4, regime: "partiel", normales: null, heures: 3 },
    esperado: { total: 18 },
  },
]);
