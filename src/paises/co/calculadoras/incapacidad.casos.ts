import { definirCasos } from "@/motor/calculo";
import incapacidad from "./incapacidad";

export default definirCasos(incapacidad, [
  {
    nombre: "Cinco días con salario de 3 millones",
    origen: {
      tipo: "recalculado",
      detalle: "CST art. 227: 66,67 % de 100.000 = 66.670 por día. Decreto 780 art. 3.2.1.10: 2 días a cargo de la empresa (133.340) y 3 de la EPS (200.010). Total 333.350; frente a 500.000 de salario, faltan 166.650.",
    },
    fecha: "2026-10-15",
    entrada: { salario: 3000000, dias: 5 },
    esperado: { empleador: 133340, eps: 200010, total: 333350, diferencia: 166650 },
  },
  {
    nombre: "Salario mínimo: se paga el mínimo diario",
    origen: { tipo: "recalculado", detalle: "66,67 % de 58.363,5 da 38.911, menos que el mínimo diario (Sentencia C-543 de 2007). Se paga 58.363,5 × 10 = 583.635." },
    fecha: "2026-10-15",
    entrada: { salario: 1750905, dias: 10 },
    esperado: { empleador: 116727, eps: 466908, total: 583635, diferencia: 0 },
  },
  {
    nombre: "Cien días: cambia al 50 % desde el día 91",
    origen: { tipo: "recalculado", detalle: "Día 200.000: 2 días × 133.340 = 266.680 (empresa); 88 × 133.340 + 10 × 100.000 = 12.733.920 (EPS). Total 13.000.600." },
    fecha: "2026-10-15",
    entrada: { salario: 6000000, dias: 100 },
    esperado: { empleador: 266680, eps: 12733920, total: 13000600, diferencia: 6999400 },
  },
  {
    nombre: "Más de 180 días",
    origen: { tipo: "recalculado", detalle: "El artículo 227 cubre hasta 180 días." },
    fecha: "2026-10-15",
    entrada: { salario: 3000000, dias: 200 },
    esperaError: true,
  },
]);
