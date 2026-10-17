import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { limpo } from "../lib/folha";

export default definirCalculadora({
  id: "br.rendimento-poupanca",
  mercado: "br",
  concepto: "plazo-fijo",
  slug: "rendimento-da-poupanca",
  estado: "publicado",
  requiere: {
    "br.selic-meta": "serie",
    "br.tr": "serie",
    "br.poupanca-limite-selic": "numero",
    "br.poupanca-juros": "numero",
    "br.poupanca-fracao-selic": "numero",
  },
  campos: [
    { id: "inicial", tipo: "moneda", etiqueta: "Valor depositado hoje", min: 0, porDefecto: 10000 },
    { id: "aporte", tipo: "moneda", etiqueta: "Depósito por mês", min: 0, porDefecto: 0 },
    { id: "meses", tipo: "entero", etiqueta: "Por quantos meses", min: 1, max: 600, porDefecto: 12 },
  ],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    if (entrada.inicial + entrada.aporte <= 0) throw new ErrorEntrada("Informe um valor inicial ou um depósito mensal.", "inicial");
    const selic = valores["br.selic-meta"].valor;
    const tr = valores["br.tr"].valor;
    // Lei nº 8.177/1991, art. 12: com Selic acima do limite, 0,5 % ao mês; senão, 70 % da Selic anual
    // mensalizada. A TR se aplica junto, em forma composta, como no crédito do aniversário.
    const juros =
      selic > valores["br.poupanca-limite-selic"]
        ? valores["br.poupanca-juros"] / 100
        : Math.pow(1 + ((valores["br.poupanca-fracao-selic"] / 100) * selic) / 100, 1 / 12) - 1;
    const taxa = (1 + tr / 100) * (1 + juros) - 1;
    let saldo = entrada.inicial;
    for (let m = 0; m < entrada.meses; m++) saldo = saldo * (1 + taxa) + entrada.aporte;
    const depositado = entrada.inicial + entrada.aporte * entrada.meses;
    return {
      selic,
      regra: selic > valores["br.poupanca-limite-selic"] ? "0,5 % ao mês mais TR" : "70 % da Selic mais TR",
      tr,
      taxaMensal: taxa * 100,
      taxaAnual: (Math.pow(1 + taxa, 12) - 1) * 100,
      depositado: redondear(depositado),
      rendimento: redondear(saldo - depositado),
      saldo: redondear(saldo),
      observaciones: [
        "A simulação supõe a Selic e a TR de hoje constantes no período. O rendimento é creditado no aniversário de cada depósito.",
        "Para pessoa física, o rendimento da poupança não paga imposto de renda.",
      ],
    };
  },
  resultado: [
    { clave: "selic", etiqueta: "Meta Selic hoje", formato: "porcentaje", decimales: 2 },
    { clave: "regra", etiqueta: "Regra de rendimento", formato: "texto" },
    { clave: "tr", etiqueta: "TR do mês", formato: "porcentaje", decimales: 4 },
    { clave: "taxaMensal", etiqueta: "Rendimento ao mês", formato: "porcentaje", decimales: 4 },
    { clave: "taxaAnual", etiqueta: "Rendimento ao ano", formato: "porcentaje", decimales: 2 },
    { clave: "depositado", etiqueta: "Total depositado", formato: "moneda" },
    { clave: "rendimento", etiqueta: "Rendimento no período", formato: "moneda" },
    { clave: "saldo", etiqueta: "Saldo final", formato: "moneda", destacada: true },
  ],
});
