import { definirCasos } from "@/motor/calculo";
import custoDoTrabalhador from "./custo-do-trabalhador";

const DP = "https://portal.inss.gov.ao/wp-content/uploads/2021/10/227_18.pdf";

export default definirCasos(custoDoTrabalhador, [
  {
    nombre: "350 000 Kz sem subsídios",
    origen: {
      tipo: "recalculado",
      url: DP,
      detalle: "Mês: 350 000 + 8 % = 378 000. Férias 175 000 (fora da base do INSS, artigo 13.º). Natal 175 000 + 14 000 de INSS. Ano: 378 000 × 12 + 175 000 + 175 000 + 14 000 = 4 900 000.",
    },
    fecha: "2026-10-24",
    entrada: { salarioBase: 350000, subsidios: 0 },
    esperado: { custoMes: 378000, ferias: 175000, natal: 175000, inssNatal: 14000, anual: 4900000 },
  },
  {
    nombre: "Com subsídios mensais",
    origen: { tipo: "recalculado", url: DP, detalle: "Mês: (200 000 + 50 000) × 1,08 = 270 000. Férias e Natal sobre o base: 100 000 cada. Ano: 3 240 000 + 100 000 + 108 000 = 3 448 000." },
    fecha: "2026-10-24",
    entrada: { salarioBase: 200000, subsidios: 50000 },
    esperado: { custoMes: 270000, anual: 3448000 },
  },
]);
