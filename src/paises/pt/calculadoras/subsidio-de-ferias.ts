import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "pt.subsidio-de-ferias",
  mercado: "pt",
  concepto: "propio",
  slug: "subsidio-de-ferias",
  estado: "publicado",
  requiere: {
    "pt.ct-ferias-dias": "numero",
  },
  campos: [
    { id: "retribuicao", tipo: "moneda", etiqueta: "Retribuição base mensal", min: 0, porDefecto: 1200, ayuda: "Some as prestações pagas pelo modo específico de fazer o trabalho, como o subsídio de turno." },
    { id: "dias", tipo: "entero", etiqueta: "Dias úteis de férias a que tem direito", min: 1, max: 30, porDefecto: 22, ayuda: "22 num ano normal. No ano de admissão, 2 por mês de contrato, até 20." },
  ],
  calcular(entrada, valores, { redondear }) {
    const minimo = valores["pt.ct-ferias-dias"];
    if (entrada.dias < 1) throw new ErrorEntrada("Indique pelo menos um dia de férias.", "dias");
    const diasConta = Math.min(entrada.dias, minimo);
    const subsidio = redondear((entrada.retribuicao * diasConta) / minimo);
    const observaciones: string[] = [];
    if (entrada.dias > minimo) observaciones.push(`Pelo artigo 264.º do Código do Trabalho, o subsídio corresponde à duração mínima das férias (${minimo} dias). O cálculo usa esse número.`);
    return { subsidio, diasConta, observaciones };
  },
  resultado: [
    { clave: "subsidio", etiqueta: "Subsídio de férias (bruto)", formato: "moneda", destacada: true },
    { clave: "diasConta", etiqueta: "Dias considerados", formato: "dias" },
  ],
});
