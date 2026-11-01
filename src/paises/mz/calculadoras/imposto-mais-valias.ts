import { aplicarEscalaMarginal, definirCalculadora } from "@/motor/calculo";

// Borrador: o artigo 54-A só traz as taxas, sem a parcela a abater da tabela geral do IRPS. Falta
// confirmar se a taxa se aplica por escalões (como aqui) ou ao ganho inteiro.
export default definirCalculadora({
  id: "mz.imposto-mais-valias",
  mercado: "mz",
  concepto: "propio",
  slug: "imposto-mais-valias",
  estado: "borrador",
  requiere: {
    "mz.irps-mais-valias": "escala",
  },
  campos: [
    { id: "venda", tipo: "moneda", etiqueta: "Valor de venda", min: 0, porDefecto: 1500000 },
    { id: "aquisicao", tipo: "moneda", etiqueta: "Valor de aquisição", min: 0, porDefecto: 1000000 },
  ],
  calcular(entrada, valores, { redondear }) {
    const ganho = Math.max(0, entrada.venda - entrada.aquisicao);
    const imposto = redondear(aplicarEscalaMarginal(valores["mz.irps-mais-valias"], ganho));
    return { imposto, ganho: redondear(ganho), efectiva: ganho > 0 ? (imposto / ganho) * 100 : 0 };
  },
  resultado: [
    { clave: "imposto", etiqueta: "IRPS sobre a mais-valia", formato: "moneda", destacada: true },
    { clave: "ganho", etiqueta: "Mais-valia", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Taxa efectiva", formato: "porcentaje", decimales: 2 },
  ],
});
