import { definirCasos } from "@/motor/calculo";
import calculadora from "./conges-payes";

export default definirCasos(calculadora, [
  {
    nombre: "Un año, adulto, 3 años de antigüedad",
    origen: { tipo: "recalculado", detalle: "Art. 180 Code du travail: 12 x 1,5 = 18 días hábiles. Art. 188: asignación = 1/12 de lo cobrado en el período = 20.000 x 12 / 12 = 20.000. Por día 1.111,11." },
    fecha: "2026-10-29",
    entrada: { categorie: "adulte", mois: 12, salaire: 20000, anciennete: 3, enfants: 0 },
    esperado: { jours: 18, base: 18, anciennete: 0, mere: 0, allocation: 20000, parJour: 1111.11 },
  },
  {
    nombre: "Madre con 2 hijos y 16 años de antigüedad",
    origen: { tipo: "recalculado", detalle: "18 + 2 (art. 181, 15 a 20 años) + 2 (art. 182, un día por hijo menor de 14) = 22 días. Asignación 30.000." },
    fecha: "2026-10-29",
    entrada: { categorie: "adulte", mois: 12, salaire: 30000, anciennete: 16, enfants: 2 },
    esperado: { jours: 22, anciennete: 2, mere: 2, allocation: 30000 },
  },
  {
    nombre: "Menor de 18, seis meses",
    origen: { tipo: "recalculado", detalle: "6 x 2 = 12 días. Asignación 9.000 x 6 / 12 = 4.500." },
    fecha: "2026-10-29",
    entrada: { categorie: "mineur", mois: 6, salaire: 9000, anciennete: 0, enfants: 0 },
    esperado: { jours: 12, allocation: 4500 },
  },
  {
    nombre: "No residente, 12 meses, más de 20 años",
    origen: { tipo: "recalculado", detalle: "12 x 3 = 36 + 3 (más de 20 años) = 39 días." },
    fecha: "2026-10-29",
    entrada: { categorie: "non-resident", mois: 12, salaire: 50000, anciennete: 21, enfants: 0 },
    esperado: { jours: 39 },
  },
  {
    nombre: "Sin sueldo",
    origen: { tipo: "recalculado", detalle: "Sueldo 0." },
    fecha: "2026-10-29",
    entrada: { categorie: "adulte", mois: 12, salaire: 0, anciennete: 0, enfants: 0 },
    esperaError: true,
  },
]);
