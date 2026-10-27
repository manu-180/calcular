import { definirCasos } from "@/motor/calculo";
import custoDoTrabalhador from "./custo-do-trabalhador";

export default definirCasos(custoDoTrabalhador, [
  {
    nombre: "30 000 MT com 2 000 MT de subsídios",
    origen: { tipo: "recalculado", url: "https://www.inss.gov.mz/taxa-contributiva-contribuinte/", detalle: "Remuneração 32 000. INSS da empresa 4 % = 1 280. Custo mensal 33 280; em 12 meses 399 360." },
    fecha: "2026-10-26",
    entrada: { salario: 30000, outros: 2000 },
    esperado: { inss: 1280, mensal: 33280, anual: 399360 },
  },
]);
