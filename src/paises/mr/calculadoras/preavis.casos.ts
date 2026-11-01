import { definirCasos } from "@/motor/calculo";
import calculadora from "./preavis";

export default definirCasos(calculadora, [
  {
    nombre: "Cuadro sin preaviso",
    origen: { tipo: "recalculado", detalle: "Art. 27 CCGT: ingenieros y cuadros, 3 meses = 90 días. Indemnización art. 28: 3 sueldos = 3 x 60.000 = 180.000." },
    fecha: "2026-10-29",
    entrada: { categorie: "cadre", salaire: 60000, effectues: 0, conge: false },
    esperado: { indemnite: 180000, mois: 3, jours: 90, restants: 90 },
  },
  {
    nombre: "Peón con 5 días cumplidos",
    origen: { tipo: "recalculado", detalle: "15 días; faltan 10. 10 x 9.000 / 30 = 3.000." },
    fecha: "2026-10-29",
    entrada: { categorie: "manoeuvre", salaire: 9000, effectues: 5, conge: false },
    esperado: { indemnite: 3000, jours: 15, restants: 10, mois: null },
  },
  {
    nombre: "Empleado despedido durante las vacaciones",
    origen: { tipo: "recalculado", detalle: "Un mes = 30.000, doblado por el art. 50 del Code du travail = 60.000." },
    fecha: "2026-10-29",
    entrada: { categorie: "ouvrier", salaire: 30000, effectues: 0, conge: true },
    esperado: { indemnite: 60000 },
  },
  {
    nombre: "Días cumplidos de más",
    origen: { tipo: "recalculado", detalle: "20 días para un preaviso de 15." },
    fecha: "2026-10-29",
    entrada: { categorie: "manoeuvre", salaire: 9000, effectues: 20, conge: false },
    esperaError: true,
  },
]);
