import { definirCasos } from "@/motor/calculo";
import salarioLiquido from "./salario-liquido";

const OGE = "https://tcontas.ao/wp-content/uploads/2026/09/Lei-14-25-de-30-de-Dezembro-OGE-2026.pdf";
const AGT_IRT = "https://portaldocontribuinte.minfin.gov.ao/impostos-e-taxas/imposto-sobre-rendimentos-do-trabalho";

export default definirCasos(salarioLiquido, [
  {
    nombre: "350 000 Kz sem subsídios",
    origen: { tipo: "recalculado", url: OGE, detalle: "INSS 3 % = 10 500. Colectável 339 500. IRT = 49 250 + 39 500 × 19 % = 56 755. Líquido = 350 000 − 10 500 − 56 755 = 282 745." },
    fecha: "2026-10-24",
    entrada: { salarioBase: 350000, alimentacao: 0, transporte: 0, outros: 0 },
    esperado: { inss: 10500, materia: 339500, irt: 56755, liquido: 282745 },
  },
  {
    nombre: "Subsídio de alimentação acima do limite",
    origen: { tipo: "recalculado", url: AGT_IRT, detalle: "Bruto 360 000, INSS 10 800. Não sujeito: 30 000 de alimentação + 20 000 de transporte. Colectável 299 200. IRT = 31 250 + 99 200 × 18 % = 49 106. Líquido 300 094." },
    fecha: "2026-10-24",
    entrada: { salarioBase: 300000, alimentacao: 40000, transporte: 20000, outros: 0 },
    esperado: { bruto: 360000, naoSujeito: 50000, materia: 299200, irt: 49106, liquido: 300094 },
  },
  {
    nombre: "Salário mínimo: só INSS",
    origen: { tipo: "recalculado", url: OGE, detalle: "100 000 − 3 % = 97 000, abaixo do limite isento de 150 000." },
    fecha: "2026-10-24",
    entrada: { salarioBase: 100000, alimentacao: 0, transporte: 0, outros: 0 },
    esperado: { irt: 0, liquido: 97000 },
  },
]);
