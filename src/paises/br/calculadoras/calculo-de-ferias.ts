import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { inssEmpregado, irrf, limpo, REQUISITOS_INSS, REQUISITOS_IRRF, valoresIrrf } from "../lib/folha";

// CLT, art. 130: os dias de férias caem conforme as faltas injustificadas do período aquisitivo.
function diasPorFaltas(faltas: number, diasCheios: number): number | null {
  if (faltas <= 5) return diasCheios;
  if (faltas <= 14) return 24;
  if (faltas <= 23) return 18;
  if (faltas <= 32) return 12;
  return null;
}

export default definirCalculadora({
  id: "br.calculo-de-ferias",
  mercado: "br",
  concepto: "vacaciones",
  slug: "calculo-de-ferias",
  estado: "publicado",
  requiere: { ...REQUISITOS_INSS, ...REQUISITOS_IRRF, "br.ferias-dias": "numero" },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salário bruto mensal", min: 0, porDefecto: 3000 },
    { id: "mediaVariaveis", tipo: "moneda", etiqueta: "Média mensal de horas extras e adicionais", min: 0, porDefecto: 0 },
    { id: "faltas", tipo: "entero", etiqueta: "Faltas sem justificativa no período aquisitivo", min: 0, porDefecto: 0 },
    { id: "venderDias", tipo: "si-no", etiqueta: "Vender 1/3 das férias (abono pecuniário)", porDefecto: false },
    { id: "dependentes", tipo: "entero", etiqueta: "Dependentes para o imposto de renda", min: 0, max: 20, porDefecto: 0 },
  ],
  calcular(entrada, valores, contexto) {
    const redondear = (n: number) => contexto.redondear(limpo(n));
    const dias = diasPorFaltas(entrada.faltas, valores["br.ferias-dias"]);
    if (dias === null) throw new ErrorEntrada("Com mais de 32 faltas sem justificativa no período aquisitivo, a lei não garante férias desse período.", "faltas");
    const diasAbono = entrada.venderDias ? Math.floor(dias / 3) : 0;
    const diasGozo = dias - diasAbono;
    const diaria = (entrada.salario + entrada.mediaVariaveis) / 30;
    const ferias = redondear(diaria * diasGozo);
    const terco = redondear(ferias / 3);
    const abono = redondear(diaria * diasAbono);
    const tercoAbono = redondear(abono / 3);
    const tributavel = redondear(ferias + terco);
    const inss = inssEmpregado(tributavel, valores["br.inss-empregado"], valores["br.teto-inss"], redondear);
    const ir = irrf({ rendimento: tributavel, inss, dependentes: entrada.dependentes, pensao: 0, outrasDeducoes: 0 }, valoresIrrf(valores), redondear);
    const bruto = redondear(tributavel + abono + tercoAbono);
    const observaciones = [
      "As férias precisam ser pagas até 2 dias antes de começarem.",
      "INSS e imposto de renda são uma estimativa calculada só sobre as férias. Na folha, o INSS das férias se soma ao salário dos dias trabalhados no mesmo mês.",
    ];
    if (diasAbono > 0) observaciones.push("O abono pecuniário e o terço sobre ele não pagam INSS nem imposto de renda.");
    if (dias < valores["br.ferias-dias"]) observaciones.push(`Pelas faltas informadas, o período dá direito a ${dias} dias de férias.`);
    return {
      dias,
      diasGozo,
      diasAbono,
      ferias,
      terco,
      abono,
      tercoAbono,
      bruto,
      inss,
      irrf: ir.irrf,
      liquido: redondear(bruto - inss - ir.irrf),
      observaciones,
    };
  },
  resultado: [
    { clave: "dias", etiqueta: "Dias de férias do período", formato: "dias" },
    { clave: "diasGozo", etiqueta: "Dias de descanso", formato: "dias" },
    { clave: "ferias", etiqueta: "Férias", formato: "moneda" },
    { clave: "terco", etiqueta: "1/3 constitucional", formato: "moneda" },
    { clave: "diasAbono", etiqueta: "Dias vendidos", formato: "dias", ocultarSiCero: true },
    { clave: "abono", etiqueta: "Abono pecuniário", formato: "moneda", ocultarSiCero: true },
    { clave: "tercoAbono", etiqueta: "1/3 sobre o abono", formato: "moneda", ocultarSiCero: true },
    { clave: "bruto", etiqueta: "Total bruto", formato: "moneda" },
    { clave: "inss", etiqueta: "INSS estimado", formato: "moneda" },
    { clave: "irrf", etiqueta: "IRRF estimado", formato: "moneda", ocultarSiCero: true },
    { clave: "liquido", etiqueta: "Férias líquidas", formato: "moneda", destacada: true },
  ],
});
