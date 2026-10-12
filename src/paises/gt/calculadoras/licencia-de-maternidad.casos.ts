import { definirCasos } from "@/motor/calculo";
import licenciaDeMaternidad from "./licencia-de-maternidad";

export default definirCasos(licenciaDeMaternidad, [
  {
    nombre: "Parto previsto el 15 de diciembre de 2026",
    origen: {
      tipo: "recalculado",
      detalle: "CT art. 152: 30 días antes (incluido el día del parto, Acuerdo 468 art. 34) desde el 16/11/2026 y 54 después hasta el 07/02/2027. Diario 4000 × 12 / 365 = 131.51 × 84 = 11046.84.",
    },
    fecha: "2026-10-12",
    entrada: { parto: "2026-12-15", salario: 4000 },
    esperado: { inicio: "2026-11-16", fin: "2027-02-07", regreso: "2027-02-08", dias: 84, diario: 131.51, total: 11046.84 },
  },
  {
    nombre: "Parto en marzo de un año bisiesto",
    origen: { tipo: "recalculado", detalle: "Parto 01/03/2028: inicio 01/02/2028 (29 días antes en febrero bisiesto), fin 24/04/2028." },
    fecha: "2026-10-12",
    entrada: { parto: "2028-03-01", salario: 3650 },
    esperado: { inicio: "2028-02-01", fin: "2028-04-24", diario: 120, total: 10080 },
  },
]);
