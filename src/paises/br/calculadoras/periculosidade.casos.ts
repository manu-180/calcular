import { definirCasos } from "@/motor/calculo";
import periculosidade from "./periculosidade";

export default definirCasos(periculosidade, [
  {
    nombre: "Salário-base de R$ 3.000",
    origen: { tipo: "recalculado", detalle: "CLT art. 193, § 1º: 30 % de 3000 = 900; total 3900." },
    fecha: "2026-10-14",
    entrada: { salario: 3000 },
    esperado: { adicional: 900, total: 3900 },
  },
]);
