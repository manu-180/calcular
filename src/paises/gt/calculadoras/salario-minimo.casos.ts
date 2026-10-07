import { definirCasos } from "@/motor/calculo";
import salarioMinimo from "./salario-minimo";

const ACUERDO = "https://mintrabajo.gob.gt/wp-content/uploads/2026/06/Acuerdo-Gubernativo-Numero-256-2025-Salario-Minino.pdf";

export default definirCasos(salarioMinimo, [
  {
    nombre: "No agrícola en el departamento de Guatemala",
    origen: { tipo: "oficial", url: ACUERDO, detalle: "Acuerdo Gubernativo 256-2025, art. 3: Q131.58 diarios, Q4,002.28 mensuales." },
    fecha: "2026-10-07",
    entrada: { region: "ce1", actividad: "no-agricola", sueldo: null },
    esperado: { diario: 131.58, mensual: 4002.28, diferencia: null },
  },
  {
    nombre: "Agrícola en el resto del país, con un salario por debajo",
    origen: { tipo: "oficial", url: ACUERDO, detalle: "Art. 5: Q119.21 diarios, Q3,625.89 mensuales. Por hora en jornada diurna de 8 horas: 14.90. 3500 menos 3625.89 = menos 125.89." },
    fecha: "2026-01-01",
    entrada: { region: "ce2", actividad: "agricola", sueldo: 3500 },
    esperado: { diario: 119.21, mensual: 3625.89, hora: 14.9, diferencia: -125.89 },
  },
  {
    nombre: "Exportadora y de maquila en las dos circunscripciones",
    origen: { tipo: "oficial", url: ACUERDO, detalle: "Arts. 4 y 7: CE1 Q112.10 y Q3,409.73; CE2 Q105.90 y Q3,221.10. Se prueba la CE1." },
    fecha: "2026-06-15",
    entrada: { region: "ce1", actividad: "exportadora-maquila", sueldo: null },
    esperado: { diario: 112.1, mensual: 3409.73 },
  },
  {
    nombre: "Exportadora y de maquila, circunscripción 2",
    origen: { tipo: "oficial", url: ACUERDO, detalle: "Art. 7: Q105.90 diarios, Q3,221.10 mensuales." },
    fecha: "2026-06-15",
    entrada: { region: "ce2", actividad: "exportadora-maquila", sueldo: 3221.1 },
    esperado: { diario: 105.9, mensual: 3221.1, diferencia: 0 },
  },
]);
