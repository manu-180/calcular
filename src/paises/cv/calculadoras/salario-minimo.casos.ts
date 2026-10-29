import { definirCasos } from "@/motor/calculo";
import salarioMinimo from "./salario-minimo";

const OE2025 = "https://boe.incv.cv/Bulletins/Download/6150";

export default definirCasos(salarioMinimo, [
  {
    nombre: "Salário de 20 000$00 contra o mínimo",
    origen: { tipo: "recalculado", url: OE2025, detalle: "Mínimo 17 000. Diferença 20 000 − 17 000 = 3 000. Hora do mínimo = 17 000 × 12 / (52 × 44) = 89,16. Líquido 17 000 − 1 445 = 15 555. Custo 17 000 + 2 720 = 19 720." },
    fecha: "2026-10-29",
    entrada: { salario: 20000 },
    esperado: { minimo: 17000, diferenca: 3000, hora: 89.16, liquido: 15555, custo: 19720 },
  },
  {
    nombre: "Salário abaixo do mínimo",
    origen: { tipo: "recalculado", url: OE2025, detalle: "15 000 − 17 000 = −2 000, ou 88,2 % do mínimo." },
    fecha: "2026-10-29",
    entrada: { salario: 15000 },
    esperado: { diferenca: -2000, percentagem: 88.235294 },
    tolerancia: 0.001,
  },
]);
