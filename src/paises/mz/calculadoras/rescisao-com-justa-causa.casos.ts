import { definirCasos } from "@/motor/calculo";
import rescisaoComJustaCausa from "./rescisao-com-justa-causa";

const LT = "https://www.inss.gov.mz/wp-content/uploads/2025/09/NOVA-LEI-DO-TRABALHO-DE-25-DE-AGOSTO-DE-2023.pdf";

export default definirCasos(rescisaoComJustaCausa, [
  {
    nombre: "Três anos e meio com aviso",
    origen: { tipo: "recalculado", url: LT, detalle: "Artigo 139, n.º 2: 45 dias por ano, fracção rateada. 3,5 × 45 × 1 000 = 157 500." },
    fecha: "2026-10-26",
    entrada: { salario: 30000, admissao: "2023-01-02", cessacao: "2026-07-02", avisou: true },
    esperado: { anos: 3.5, indemnizacao: 157500, multa: 0 },
  },
  {
    nombre: "Sem os sete dias de aviso",
    origen: { tipo: "recalculado", url: LT, detalle: "Artigo 139, n.º 4: multa de 7 dias de salário (7 000) deduzida: 150 500." },
    fecha: "2026-10-26",
    entrada: { salario: 30000, admissao: "2023-01-02", cessacao: "2026-07-02", avisou: false },
    esperado: { multa: 7000, indemnizacao: 150500 },
  },
]);
