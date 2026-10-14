import { definirCalculadora } from "@/motor/calculo";
import { REQUISITOS_RETENCAO, retencaoMensal } from "../lib/irs";

export default definirCalculadora({
  id: "pt.subsidio-de-desemprego",
  mercado: "pt",
  concepto: "propio",
  slug: "subsidio-de-desemprego",
  estado: "publicado",
  requiere: {
    ...REQUISITOS_RETENCAO,
    "pt.desemprego-percentagens": "mapa",
    "pt.desemprego-limites-ias": "mapa",
    "pt.ias": "numero",
    "pt.rmmg": "numero",
    "pt.ss-trabalhador": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salário bruto mensal nos últimos 12 meses", min: 0, porDefecto: 1500, ayuda: "A média, se variou." },
    { id: "subsidios", tipo: "si-no", etiqueta: "Recebeu os subsídios de férias e de Natal nesse período", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    const p = valores["pt.desemprego-percentagens"];
    const lim = valores["pt.desemprego-limites-ias"];
    const ias = valores["pt.ias"];
    const total = entrada.salario * (entrada.subsidios ? 14 : 12);
    const referencia = total / 12;
    const base = (referencia * p.montante) / 100;
    const irs = retencaoMensal(entrada.salario, "nao-casado", 0, valores, (n) => n, false).retencao;
    const taxaIrs = entrada.salario > 0 ? irs / entrada.salario : 0;
    const liquido = referencia * (1 - valores["pt.ss-trabalhador"] / 100 - taxaIrs);
    const observaciones: string[] = [];
    // Ordem do artigo 29.º: o teto de 75 % do líquido (n.º 2) cede ao mínimo de 1 IAS (n.º 1); depois
    // vêm o máximo de 2,5 IAS, a majoração até 1,15 IAS (n.º 5) e, por fim, o líquido inteiro (n.º 3).
    let mensal = Math.min(base, (liquido * p.liquido) / 100);
    mensal = Math.max(mensal, lim.minimo * ias);
    mensal = Math.min(mensal, lim.maximo * ias);
    if (referencia >= valores["pt.rmmg"]) mensal = Math.max(mensal, lim.majoracao * ias);
    mensal = Math.min(mensal, liquido);
    if (mensal >= lim.maximo * ias - 0.005) observaciones.push(`O subsídio chegou ao máximo de ${String(lim.maximo).replace(".", ",")} vezes o IAS.`);
    observaciones.push("A retenção de IRS da remuneração de referência foi estimada com a tabela I, sem dependentes.");
    observaciones.push("O número de dias de subsídio depende da idade e da carreira contributiva. O Decreto-Lei n.º 166/2026 altera essas regras com efeitos a 31 de dezembro de 2026.");
    return {
      mensal: redondear(mensal),
      diario: redondear(mensal / 30),
      referencia: redondear(referencia),
      base: redondear(base),
      liquido: redondear(liquido),
      observaciones,
    };
  },
  resultado: [
    { clave: "mensal", etiqueta: "Subsídio de desemprego por mês", formato: "moneda", destacada: true },
    { clave: "diario", etiqueta: "Valor diário", formato: "moneda" },
    { clave: "referencia", etiqueta: "Remuneração de referência mensal", formato: "moneda" },
    { clave: "base", etiqueta: "Percentagem legal da remuneração de referência", formato: "moneda" },
    { clave: "liquido", etiqueta: "Valor líquido da remuneração de referência", formato: "moneda" },
  ],
});
