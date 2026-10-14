import { definirCalculadora } from "@/motor/calculo";
import { aliquotaEfetiva, inssEmpregado, irrf, REQUISITOS_INSS, REQUISITOS_IRRF, valoresIrrf } from "../lib/folha";

export default definirCalculadora({
  id: "br.salario-liquido",
  mercado: "br",
  concepto: "sueldo-neto",
  slug: "salario-liquido",
  estado: "publicado",
  requiere: { ...REQUISITOS_INSS, ...REQUISITOS_IRRF },
  campos: [
    { id: "salarioBruto", tipo: "moneda", etiqueta: "Salário bruto mensal", min: 0, porDefecto: 3500 },
    { id: "dependentes", tipo: "entero", etiqueta: "Dependentes para o imposto de renda", min: 0, max: 20, porDefecto: 0 },
    { id: "pensao", tipo: "moneda", etiqueta: "Pensão alimentícia descontada em folha", min: 0, porDefecto: 0, ayuda: "Só a fixada por decisão judicial ou escritura pública." },
    { id: "outrosDescontos", tipo: "moneda", etiqueta: "Outros descontos (vale-transporte, plano de saúde...)", min: 0, porDefecto: 0, ayuda: "Esses descontos não reduzem o imposto de renda." },
  ],
  calcular(entrada, valores, { redondear }) {
    const bruto = entrada.salarioBruto;
    const inss = inssEmpregado(bruto, valores["br.inss-empregado"], valores["br.teto-inss"], redondear);
    const ir = irrf({ rendimento: bruto, inss, dependentes: entrada.dependentes, pensao: entrada.pensao, outrasDeducoes: 0 }, valoresIrrf(valores), redondear);
    const liquido = redondear(bruto - inss - ir.irrf - entrada.pensao - entrada.outrosDescontos);
    const observaciones: string[] = [];
    if (ir.reducao > 0 && ir.irrf === 0) observaciones.push("A redução criada pela Lei nº 15.270/2025 zera o seu imposto de renda na fonte.");
    else if (ir.reducao > 0) observaciones.push("Você tem direito a parte da redução do imposto de renda criada pela Lei nº 15.270/2025.");
    if (bruto > valores["br.teto-inss"]) observaciones.push("Seu salário passa do teto do INSS, então a contribuição fica no valor máximo.");
    if (liquido < 0) observaciones.push("Os descontos informados passam do salário. Confira os valores.");
    return {
      bruto,
      inss,
      deducao: ir.deducao,
      tipoDeducao: ir.simplificado ? "Desconto simplificado" : "Deduções legais (INSS, dependentes e pensão)",
      base: ir.base,
      impostoTabela: ir.impostoTabela,
      reducao: ir.reducao,
      irrf: ir.irrf,
      pensao: entrada.pensao,
      outros: entrada.outrosDescontos,
      liquido,
      aliquota: aliquotaEfetiva(inss + ir.irrf, bruto),
      observaciones,
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Salário bruto", formato: "moneda" },
    { clave: "inss", etiqueta: "Desconto do INSS", formato: "moneda" },
    { clave: "tipoDeducao", etiqueta: "Dedução usada no imposto", formato: "texto" },
    { clave: "deducao", etiqueta: "Valor deduzido da base", formato: "moneda" },
    { clave: "base", etiqueta: "Base de cálculo do IRRF", formato: "moneda" },
    { clave: "impostoTabela", etiqueta: "Imposto pela tabela", formato: "moneda", ocultarSiCero: true },
    { clave: "reducao", etiqueta: "Redução da Lei nº 15.270", formato: "moneda", ocultarSiCero: true },
    { clave: "irrf", etiqueta: "Imposto de renda retido (IRRF)", formato: "moneda" },
    { clave: "pensao", etiqueta: "Pensão alimentícia", formato: "moneda", ocultarSiCero: true },
    { clave: "outros", etiqueta: "Outros descontos", formato: "moneda", ocultarSiCero: true },
    { clave: "liquido", etiqueta: "Salário líquido", formato: "moneda", destacada: true },
    { clave: "aliquota", etiqueta: "INSS e IRRF sobre o bruto", formato: "porcentaje", decimales: 2 },
  ],
});
