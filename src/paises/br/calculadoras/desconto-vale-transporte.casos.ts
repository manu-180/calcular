import { definirCasos } from "@/motor/calculo";
import valeTransporte from "./desconto-vale-transporte";

export default definirCasos(valeTransporte, [
  {
    nombre: "Custo maior que 6 % do salário",
    origen: { tipo: "recalculado", detalle: "Lei nº 7.418/1985, art. 4º: 10 × 22 = 220; 6 % de 2000 = 120. Desconto 120, empresa 100." },
    fecha: "2026-10-14",
    entrada: { salario: 2000, custoDia: 10, dias: 22 },
    esperado: { custo: 220, limite: 120, desconto: 120, empresa: 100 },
  },
  {
    nombre: "Custo menor que o limite",
    origen: { tipo: "recalculado", detalle: "8 × 20 = 160; 6 % de 5000 = 300. Desconto 160, empresa 0." },
    fecha: "2026-10-14",
    entrada: { salario: 5000, custoDia: 8, dias: 20 },
    esperado: { desconto: 160, empresa: 0 },
  },
]);
