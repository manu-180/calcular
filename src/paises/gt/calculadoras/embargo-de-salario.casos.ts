import { definirCasos } from "@/motor/calculo";
import embargoDeSalario from "./embargo-de-salario";

export default definirCasos(embargoDeSalario, [
  {
    nombre: "Pensión alimenticia",
    origen: { tipo: "recalculado", detalle: "CT art. 97: hasta 50 % de 6000 = 3000." },
    fecha: "2026-10-12",
    entrada: { salario: 6000, tipo: "alimentos", region: "ce1", actividad: "no-agricola" },
    esperado: { maximo: 3000, libre: 3000 },
  },
  {
    nombre: "Otra deuda con salario mayor al mínimo",
    origen: { tipo: "recalculado", detalle: "CT art. 96 lit. e: 65 % inembargable; se puede embargar 35 % de 6000 = 2100." },
    fecha: "2026-10-12",
    entrada: { salario: 6000, tipo: "otras", region: "ce1", actividad: "no-agricola" },
    esperado: { maximo: 2100, libre: 3900, minimo: 4002.28 },
  },
  {
    nombre: "Otra deuda con salario mínimo",
    origen: { tipo: "recalculado", detalle: "CT art. 96 lit. a: el salario mínimo es inembargable." },
    fecha: "2026-10-12",
    entrada: { salario: 3816.9, tipo: "otras", region: "ce2", actividad: "no-agricola" },
    esperado: { maximo: 0 },
  },
]);
