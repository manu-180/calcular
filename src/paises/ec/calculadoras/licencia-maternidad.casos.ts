import { definirCasos } from "@/motor/calculo";
import licenciaMaternidad from "./licencia-maternidad";

export default definirCasos(licenciaMaternidad, [
  {
    nombre: "Parto el 1 de octubre de 2026",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 152 y 155 del Código del Trabajo: 12 semanas = 84 días desde el 1/10/2026, último día 23/12/2026, regreso 24/12/2026. Lactancia de 15 meses desde el regreso: hasta el 23/3/2028, con jornada de 6 horas.",
    },
    fecha: "2026-10-01",
    entrada: { inicio: "2026-10-01", multiple: false },
    esperado: { dias: 84, fin: "2026-12-23", regreso: "2026-12-24", jornadaLactancia: 6, finLactancia: "2028-03-23" },
  },
  {
    nombre: "Mellizos: diez días más",
    origen: { tipo: "recalculado", detalle: "84 + 10 = 94 días desde el 1/10/2026: último día 2/1/2027, regreso 3/1/2027, lactancia hasta el 2/4/2028." },
    fecha: "2026-10-01",
    entrada: { inicio: "2026-10-01", multiple: true },
    esperado: { dias: 94, fin: "2027-01-02", regreso: "2027-01-03", finLactancia: "2028-04-02" },
  },
]);
