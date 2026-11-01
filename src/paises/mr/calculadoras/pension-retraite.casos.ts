import { definirCasos } from "@/motor/calculo";
import calculadora from "./pension-retraite";

export default definirCasos(calculadora, [
  {
    nombre: "25 años de seguro en el tope",
    origen: {
      tipo: "recalculado",
      detalle: "Ley 2021-007, art. 54: 20 % + 1,33 % x 10 períodos de 12 meses sobre 180 = 33,3 %. 33,3 % de 15.000 = 4.995. Mínimo: el menor entre 60 % del SMIG mensual (28,846 x 40 x 52 / 12 = 4.999,97; 60 % = 2.999,98) y 80 % de 15.000.",
    },
    fecha: "2026-10-29",
    entrada: { salaire: 15000, mois: 300, immatriculation: 25, recents: true },
    esperado: { pension: 4995, taux: 33.3, moyen: 15000, minimum: 2999.98, allocation: null },
  },
  {
    nombre: "Sueldo medio bajo: sube al mínimo",
    origen: { tipo: "recalculado", detalle: "200 meses: 21,33 % de 4.000 = 853,20. Mínimo = min(2.999,98; 3.200) = 2.999,98." },
    fecha: "2026-10-29",
    entrada: { salaire: 4000, mois: 200, immatriculation: 20, recents: true },
    esperado: { pension: 2999.98, taux: 21.33 },
  },
  {
    nombre: "Mínimo topado al 80 % del sueldo medio",
    origen: { tipo: "recalculado", detalle: "Sueldo medio 2.000: 20 % = 400; mínimo = min(2.999,98; 1.600) = 1.600." },
    fecha: "2026-10-29",
    entrada: { salaire: 2000, mois: 180, immatriculation: 22, recents: true },
    esperado: { pension: 1600 },
  },
  {
    nombre: "Sin condiciones de pensión: asignación única",
    origen: { tipo: "recalculado", detalle: "10 años inscrito, 100 meses: 8 períodos de 12 meses x 12.000 = 96.000 (art. 54, 6)." },
    fecha: "2026-10-29",
    entrada: { salaire: 12000, mois: 100, immatriculation: 10, recents: true },
    esperado: { allocation: 96000, pension: null },
  },
  {
    nombre: "Sueldo sobre el tope",
    origen: { tipo: "recalculado", detalle: "40.000 se toma como 15.000. 300 meses: 4.995." },
    fecha: "2026-10-29",
    entrada: { salaire: 40000, mois: 300, immatriculation: 30, recents: true },
    esperado: { pension: 4995, moyen: 15000 },
  },
  {
    nombre: "Menos de 12 meses",
    origen: { tipo: "recalculado", detalle: "Sin derecho." },
    fecha: "2026-10-29",
    entrada: { salaire: 12000, mois: 6, immatriculation: 1, recents: false },
    esperaError: true,
  },
]);
