import { definirCasos } from "@/motor/calculo";
import calculadora from "./indemnite-licenciement";

export default definirCasos(calculadora, [
  {
    nombre: "Despido individual, 12 años",
    origen: { tipo: "recalculado", detalle: "Art. 31 CCGT: 5 x 25 % + 5 x 30 % + 2 x 35 % = 3,45 sueldos. 3,45 x 30.000 = 103.500." },
    fecha: "2026-10-29",
    entrada: { motif: "individuel", salaire: 30000, annees: 12 },
    esperado: { indemnite: 103500, mois: 3.45, licenciement: 103500, pourcentage: null },
  },
  {
    nombre: "Despido colectivo, 12 años",
    origen: { tipo: "recalculado", detalle: "5 x 30 % + 5 x 40 % + 2 x 50 % = 4,5 sueldos = 135.000." },
    fecha: "2026-10-29",
    entrada: { motif: "collectif", salaire: 30000, annees: 12 },
    esperado: { indemnite: 135000, licenciement: 103500 },
  },
  {
    nombre: "Jubilación con 12 años",
    origen: { tipo: "recalculado", detalle: "Entre 10 y 20 años: 75 % de 103.500 = 77.625." },
    fecha: "2026-10-29",
    entrada: { motif: "retraite", salaire: 30000, annees: 12 },
    esperado: { indemnite: 77625, pourcentage: 75 },
  },
  {
    nombre: "Fracción de año: 2,5 años",
    origen: { tipo: "recalculado", detalle: "2,5 x 25 % = 0,625 x 20.000 = 12.500." },
    fecha: "2026-10-29",
    entrada: { motif: "individuel", salaire: 20000, annees: 2.5 },
    esperado: { indemnite: 12500 },
  },
  {
    nombre: "Menos de un año",
    origen: { tipo: "recalculado", detalle: "Sin derecho: antigüedad menor que el período de referencia de 12 meses." },
    fecha: "2026-10-29",
    entrada: { motif: "individuel", salaire: 20000, annees: 0.5 },
    esperado: { indemnite: 0 },
  },
  {
    nombre: "Sin sueldo",
    origen: { tipo: "recalculado", detalle: "Sueldo 0." },
    fecha: "2026-10-29",
    entrada: { motif: "individuel", salaire: 0, annees: 5 },
    esperaError: true,
  },
]);
