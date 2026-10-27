import { definirCasos } from "@/motor/calculo";
import calculadora from "./pitzuyei-piturim";

export default definirCasos(calculadora, [
  {
    nombre: "5 años y 6 meses con 12.000",
    origen: { tipo: "recalculado", detalle: "Art. 12: 12.000 x 5,5 = 66.000. Exento hasta 13.750 x 5,5 = 75.625: todo exento." },
    fecha: "2026-10-24",
    entrada: { sachar: 12000, shanim: 5, chodashim: 6 },
    esperado: { pitzuyim: 66000, ptor: 66000, chayav: 0, vetek: 5.5 },
  },
  {
    nombre: "Sueldo por encima del tope exento",
    origen: { tipo: "recalculado", detalle: "20.000 x 10 = 200.000; exento 13.750 x 10 = 137.500; gravado 62.500." },
    fecha: "2026-10-24",
    entrada: { sachar: 20000, shanim: 10, chodashim: 0 },
    esperado: { pitzuyim: 200000, ptor: 137500, chayav: 62500 },
  },
  {
    nombre: "Menos de un año",
    origen: { tipo: "recalculado", detalle: "Art. 1: hace falta un año seguido. 8 meses: 0." },
    fecha: "2026-10-24",
    entrada: { sachar: 10000, shanim: 0, chodashim: 8 },
    esperado: { pitzuyim: 0 },
  },
  {
    nombre: "Sin sueldo",
    origen: { tipo: "recalculado", detalle: "Sueldo 0." },
    fecha: "2026-10-24",
    entrada: { sachar: 0, shanim: 3, chodashim: 0 },
    esperaError: true,
  },
]);
