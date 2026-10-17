import { definirCasos } from "@/motor/calculo";
import salarioMinimo from "./salario-minimo";

export default definirCasos(salarioMinimo, [
  {
    nombre: "Salário mínimo de 2026",
    origen: { tipo: "oficial", url: "https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/decreto/D12797.htm", detalle: "Decreto nº 12.797/2025: R$ 1.621,00 por mês, R$ 54,04 por dia e R$ 7,37 por hora." },
    fecha: "2026-01-01",
    entrada: { salario: null, quantidade: 1 },
    esperado: { mensal: 1621, diario: 54.04, hora: 7.37, anual: 21073, convertido: 1621, emMinimos: null },
  },
  {
    nombre: "Salário de R$ 4.863 em mínimos",
    origen: { tipo: "recalculado", detalle: "4863 / 1621 = 3. Dois mínimos e meio: 4052,50." },
    fecha: "2026-10-14",
    entrada: { salario: 4863, quantidade: 2.5 },
    esperado: { emMinimos: 3, convertido: 4052.5 },
  },
]);
