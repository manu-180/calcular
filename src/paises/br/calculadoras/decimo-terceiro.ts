import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { inssEmpregado, irrf, limpo, REQUISITOS_INSS, REQUISITOS_IRRF, valoresIrrf } from "../lib/folha";

export default definirCalculadora({
  id: "br.decimo-terceiro",
  mercado: "br",
  concepto: "bono-semestral",
  slug: "decimo-terceiro",
  estado: "publicado",
  requiere: { ...REQUISITOS_INSS, ...REQUISITOS_IRRF, "br.fracao-mes": "numero" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salário bruto mensal", min: 0, porDefecto: 3000 },
    { id: "meses", tipo: "entero", etiqueta: "Meses trabalhados no ano", min: 1, max: 12, porDefecto: 12, ayuda: "Conte como mês inteiro cada mês em que você trabalhou 15 dias ou mais." },
    { id: "mediaVariaveis", tipo: "moneda", etiqueta: "Média mensal de horas extras, comissões e adicionais", min: 0, porDefecto: 0 },
    { id: "dependentes", tipo: "entero", etiqueta: "Dependentes para o imposto de renda", min: 0, max: 20, porDefecto: 0 },
  ],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    if (entrada.meses > 12) throw new ErrorEntrada("O ano tem 12 meses no máximo.", "meses");
    const bruto = redondear(((entrada.salario + entrada.mediaVariaveis) * entrada.meses) / 12);
    const primeira = redondear(bruto / 2);
    const inss = inssEmpregado(bruto, valores["br.inss-empregado"], valores["br.teto-inss"], redondear);
    const ir = irrf({ rendimento: bruto, inss, dependentes: entrada.dependentes, pensao: 0, outrasDeducoes: 0 }, valoresIrrf(valores), redondear);
    const segunda = redondear(bruto - primeira - inss - ir.irrf);
    const observaciones = [
      "A primeira parcela é paga entre fevereiro e 30 de novembro, sem descontos. A segunda sai até 20 de dezembro, já com o INSS e o imposto de renda do 13º inteiro.",
      "O INSS e o IRRF do 13º são calculados à parte, sem somar ao salário de dezembro.",
    ];
    if (ir.reducao > 0) observaciones.push("A redução da Lei nº 15.270/2025 também vale para o imposto do 13º.");
    return {
      bruto,
      primeira,
      inss,
      base: ir.base,
      irrf: ir.irrf,
      segunda,
      liquido: redondear(bruto - inss - ir.irrf),
      observaciones,
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "13º salário bruto", formato: "moneda" },
    { clave: "primeira", etiqueta: "Primeira parcela (até 30 de novembro)", formato: "moneda" },
    { clave: "inss", etiqueta: "INSS sobre o 13º", formato: "moneda" },
    { clave: "base", etiqueta: "Base do imposto de renda", formato: "moneda" },
    { clave: "irrf", etiqueta: "IRRF sobre o 13º", formato: "moneda" },
    { clave: "segunda", etiqueta: "Segunda parcela (até 20 de dezembro)", formato: "moneda" },
    { clave: "liquido", etiqueta: "13º líquido (as duas parcelas)", formato: "moneda", destacada: true },
  ],
});
