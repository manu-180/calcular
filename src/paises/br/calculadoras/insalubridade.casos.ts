import { definirCasos } from "@/motor/calculo";
import insalubridade from "./insalubridade";

export default definirCasos(insalubridade, [
  {
    nombre: "Grau médio",
    origen: { tipo: "recalculado", detalle: "CLT art. 192: 20 % de R$ 1.621 = 324,20. Com salário de 2500, total 2824,20." },
    fecha: "2026-10-14",
    entrada: { grau: "medio", salario: 2500 },
    esperado: { percentual: 20, adicional: 324.2, total: 2824.2 },
  },
  {
    nombre: "Grau máximo",
    origen: { tipo: "recalculado", detalle: "40 % de 1621 = 648,40." },
    fecha: "2026-10-14",
    entrada: { grau: "maximo", salario: null },
    esperado: { adicional: 648.4, total: null },
  },
  {
    nombre: "Grau mínimo",
    origen: { tipo: "recalculado", detalle: "10 % de 1621 = 162,10." },
    fecha: "2026-10-14",
    entrada: { grau: "minimo", salario: null },
    esperado: { adicional: 162.1 },
  },
]);
