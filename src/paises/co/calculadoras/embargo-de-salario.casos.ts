import { definirCasos } from "@/motor/calculo";
import embargo from "./embargo-de-salario";

export default definirCasos(embargo, [
  {
    nombre: "Deuda común con salario de 3 millones",
    origen: { tipo: "recalculado", detalle: "CST arts. 154 y 155: (3.000.000 − 1.750.905) × 1/5 = 249.819." },
    fecha: "2026-10-15",
    entrada: { salario: 3000000, tipo: "excedente" },
    esperado: { base: 1249095, maximo: 249819, queda: 2750181 },
  },
  {
    nombre: "Cuota de alimentos",
    origen: { tipo: "recalculado", detalle: "CST art. 156: hasta el 50 % de todo el salario. 50 % de 3.000.000 = 1.500.000." },
    fecha: "2026-10-15",
    entrada: { salario: 3000000, tipo: "alimentos-cooperativas" },
    esperado: { maximo: 1500000 },
  },
  {
    nombre: "Salario mínimo y deuda común",
    origen: { tipo: "recalculado", detalle: "CST art. 154: el salario mínimo no es embargable." },
    fecha: "2026-10-15",
    entrada: { salario: 1750905, tipo: "excedente" },
    esperado: { maximo: 0 },
  },
]);
