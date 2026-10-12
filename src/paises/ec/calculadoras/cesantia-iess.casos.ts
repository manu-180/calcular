import { definirCasos } from "@/motor/calculo";
import cesantiaIess from "./cesantia-iess";

export default definirCasos(cesantiaIess, [
  {
    nombre: "Sueldo de 1.000 por 36 meses",
    origen: {
      tipo: "oficial",
      url: "https://www.iess.gob.ec/documents/13718/54965/Tasasdeaportacion.pdf",
      detalle: "Seguro de cesantía: personal 2 % = 20, patronal 1 % = 10, total 30 al mes. 36 meses = 1.080.",
    },
    fecha: "2026-10-07",
    entrada: { sueldo: 1000, meses: 36 },
    esperado: { personal: 20, patronal: 10, mensual: 30, acumulado: 1080 },
  },
  {
    nombre: "Salario básico por un año",
    origen: { tipo: "recalculado", detalle: "482 × 2 % = 9,64; × 1 % = 4,82; total 14,46 × 12 = 173,52." },
    fecha: "2026-10-07",
    entrada: { sueldo: 482, meses: 12 },
    esperado: { personal: 9.64, patronal: 4.82, mensual: 14.46, acumulado: 173.52 },
  },
]);
