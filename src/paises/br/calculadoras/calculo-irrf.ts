import { definirCalculadora } from "@/motor/calculo";
import { aliquotaEfetiva, inssEmpregado, irrf, limpo, REQUISITOS_INSS, REQUISITOS_IRRF, valoresIrrf } from "../lib/folha";

export default definirCalculadora({
  id: "br.calculo-irrf",
  mercado: "br",
  concepto: "impuesto-renta",
  slug: "calculo-irrf",
  estado: "publicado",
  requiere: { ...REQUISITOS_INSS, ...REQUISITOS_IRRF },
  campos: [
    { id: "rendimento", tipo: "moneda", etiqueta: "Rendimento tributável do mês", min: 0, porDefecto: 6000, ayuda: "Salário bruto mais horas extras, adicionais e comissões do mês." },
    { id: "inss", tipo: "moneda", etiqueta: "Contribuição ao INSS", min: 0, requerido: false, ayuda: "Deixe em branco para calcular pela tabela de 2026." },
    { id: "dependentes", tipo: "entero", etiqueta: "Dependentes", min: 0, max: 20, porDefecto: 0 },
    { id: "pensao", tipo: "moneda", etiqueta: "Pensão alimentícia judicial", min: 0, porDefecto: 0 },
    { id: "outrasDeducoes", tipo: "moneda", etiqueta: "Previdência privada e outras deduções legais", min: 0, porDefecto: 0, ayuda: "Por exemplo, contribuição a PGBL ou a fundo de previdência do empregador." },
  ],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    const inss = entrada.inss ?? inssEmpregado(entrada.rendimento, valores["br.inss-empregado"], valores["br.teto-inss"], redondear);
    const r = irrf(
      { rendimento: entrada.rendimento, inss, dependentes: entrada.dependentes, pensao: entrada.pensao, outrasDeducoes: entrada.outrasDeducoes },
      valoresIrrf(valores),
      redondear,
    );
    const observaciones: string[] = [];
    if (entrada.inss === null) observaciones.push("O INSS foi calculado pela tabela progressiva de 2026.");
    if (r.simplificado) observaciones.push("O desconto simplificado foi maior que as deduções legais, então ele entrou no lugar delas.");
    if (r.reducao > 0) observaciones.push("A redução da Lei nº 15.270/2025 usa o rendimento tributável bruto, não a base de cálculo.");
    return {
      inss,
      deducoesLegais: r.deducoesLegais,
      tipoDeducao: r.simplificado ? "Desconto simplificado" : "Deduções legais",
      deducao: r.deducao,
      base: r.base,
      impostoTabela: r.impostoTabela,
      reducao: r.reducao,
      irrf: r.irrf,
      aliquota: aliquotaEfetiva(r.irrf, entrada.rendimento),
      observaciones,
    };
  },
  resultado: [
    { clave: "inss", etiqueta: "INSS", formato: "moneda" },
    { clave: "deducoesLegais", etiqueta: "Total das deduções legais", formato: "moneda" },
    { clave: "tipoDeducao", etiqueta: "Dedução usada", formato: "texto" },
    { clave: "deducao", etiqueta: "Valor deduzido", formato: "moneda" },
    { clave: "base", etiqueta: "Base de cálculo", formato: "moneda" },
    { clave: "impostoTabela", etiqueta: "Imposto pela tabela mensal", formato: "moneda" },
    { clave: "reducao", etiqueta: "Redução da Lei nº 15.270", formato: "moneda", ocultarSiCero: true },
    { clave: "irrf", etiqueta: "IRRF a reter", formato: "moneda", destacada: true },
    { clave: "aliquota", etiqueta: "Alíquota efetiva", formato: "porcentaje", decimales: 2 },
  ],
});
