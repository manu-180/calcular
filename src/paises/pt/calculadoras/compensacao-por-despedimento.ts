import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { compensacao, REQUISITOS_COMPENSACAO } from "../lib/compensacao";

export default definirCalculadora({
  id: "pt.compensacao-por-despedimento",
  mercado: "pt",
  concepto: "indemnizacion-despido",
  slug: "compensacao-por-despedimento",
  estado: "publicado",
  requiere: REQUISITOS_COMPENSACAO,
  campos: [
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Motivo da cessação",
      opciones: [
        { valor: "despedimento", etiqueta: "Despedimento coletivo, extinção do posto de trabalho ou inadaptação" },
        { valor: "termo", etiqueta: "Fim de contrato a termo certo por iniciativa do empregador" },
      ],
      porDefecto: "despedimento",
    },
    { id: "retribuicao", tipo: "moneda", etiqueta: "Retribuição base mensal e diuturnidades", min: 0, porDefecto: 1500 },
    { id: "inicio", tipo: "fecha", etiqueta: "Data de início do contrato" },
    { id: "fim", tipo: "fecha", etiqueta: "Data de cessação", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fim < entrada.inicio) throw new ErrorEntrada("A data de cessação tem de ser posterior ao início do contrato.", "fim");
    const c = compensacao(entrada.motivo, entrada.retribuicao, entrada.inicio, entrada.fim, valores, redondear);
    const observaciones = [
      "Aplica a regra atual a toda a antiguidade. Em contratos antigos, os anos anteriores às alterações da lei podem ter regras de transição próprias.",
    ];
    if (c.limitada) observaciones.push("A compensação chegou ao limite máximo do artigo 366.º.");
    if (c.retribuicaoConsiderada < entrada.retribuicao) observaciones.push("A retribuição considerada ficou limitada a 20 vezes o salário mínimo nacional.");
    return {
      compensacao: c.compensacao,
      antiguidade: c.fracao,
      diasPorAno: c.diasPorAno,
      valorDiario: c.valorDiario,
      retribuicaoConsiderada: c.retribuicaoConsiderada,
      limite: c.limite,
      observaciones,
    };
  },
  resultado: [
    { clave: "compensacao", etiqueta: "Compensação", formato: "moneda", destacada: true },
    { clave: "antiguidade", etiqueta: "Antiguidade", formato: "anios", decimales: 2 },
    { clave: "diasPorAno", etiqueta: "Dias de retribuição por ano", formato: "dias" },
    { clave: "valorDiario", etiqueta: "Valor diário (retribuição a dividir por 30)", formato: "moneda" },
    { clave: "retribuicaoConsiderada", etiqueta: "Retribuição considerada", formato: "moneda" },
    { clave: "limite", etiqueta: "Limite máximo da compensação", formato: "moneda" },
  ],
});
