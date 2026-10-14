import { aplicarEscalaMarginal, definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import type { FilaEscala } from "@/motor/tipos";

// Artigo 17.º do CIMT: até ao escalão da taxa única o imposto é progressivo (a parte até ao limite do
// escalão anterior paga a taxa média e o excedente a marginal, que dá o mesmo que somar escalão a
// escalão); acima desse limite aplica-se uma taxa única a todo o valor.
function imtHabitacao(valor: number, marginais: readonly FilaEscala[], unica: readonly FilaEscala[]): number {
  if (valor > unica[0].desde) {
    let taxa = unica[0].tasa;
    for (const f of unica) if (valor > f.desde) taxa = f.tasa;
    return porcentaje(valor, taxa);
  }
  return aplicarEscalaMarginal(marginais, valor);
}

export default definirCalculadora({
  id: "pt.simulador-imt",
  mercado: "pt",
  concepto: "propio",
  slug: "simulador-imt",
  estado: "publicado",
  requiere: {
    "pt.imt-hpp": "escala",
    "pt.imt-hpp-jovem": "escala",
    "pt.imt-hpp-taxa-unica": "escala",
    "pt.imt-secundaria": "escala",
    "pt.imt-secundaria-taxa-unica": "escala",
    "pt.imt-outros": "mapa",
    "pt.imposto-selo": "mapa",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Valor da compra", min: 0, porDefecto: 250000, ayuda: "O maior entre o preço e o valor patrimonial tributário (VPT)." },
    {
      id: "finalidade",
      tipo: "opcion",
      etiqueta: "Finalidade do imóvel",
      opciones: [
        { valor: "hpp", etiqueta: "Habitação própria e permanente" },
        { valor: "jovem", etiqueta: "Primeira habitação própria e permanente, comprador até 35 anos" },
        { valor: "secundaria", etiqueta: "Outra habitação (secundária ou arrendamento)" },
        { valor: "urbano", etiqueta: "Outro prédio urbano (loja, escritório, terreno para construção)" },
        { valor: "rustico", etiqueta: "Prédio rústico" },
      ],
      porDefecto: "hpp",
    },
    { id: "credito", tipo: "moneda", etiqueta: "Valor do crédito à habitação", min: 0, requerido: false, ayuda: "Opcional. Para somar o Imposto do Selo do empréstimo (prazo de 5 anos ou mais)." },
  ],
  calcular(entrada, valores, { redondear }) {
    const v = entrada.valor;
    let imt: number;
    if (entrada.finalidade === "hpp") imt = imtHabitacao(v, valores["pt.imt-hpp"], valores["pt.imt-hpp-taxa-unica"]);
    else if (entrada.finalidade === "jovem") imt = imtHabitacao(v, valores["pt.imt-hpp-jovem"], valores["pt.imt-hpp-taxa-unica"]);
    else if (entrada.finalidade === "secundaria") imt = imtHabitacao(v, valores["pt.imt-secundaria"], valores["pt.imt-secundaria-taxa-unica"]);
    else imt = porcentaje(v, enMapa(valores["pt.imt-outros"], entrada.finalidade));
    const selo = valores["pt.imposto-selo"];
    const seloCompra = redondear(porcentaje(v, selo.aquisicao));
    const seloCredito = entrada.credito === null ? 0 : redondear(porcentaje(entrada.credito, selo["credito-5-anos"]));
    const imtR = redondear(imt);
    const observaciones = ["Taxas do artigo 17.º do Código do IMT. Não inclui escritura, registos nem comissões."];
    if (entrada.finalidade === "jovem") {
      observaciones.push("A isenção jovem exige que seja a primeira habitação, que o comprador não seja dependente para o IRS nem tenha tido casa nos três anos anteriores. O cálculo não aplica isenções do Imposto do Selo.");
    }
    return {
      total: redondear(imtR + seloCompra + seloCredito),
      imt: imtR,
      seloCompra,
      seloCredito,
      taxaMedia: v > 0 ? (imtR / v) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Impostos a pagar na compra", formato: "moneda", destacada: true },
    { clave: "imt", etiqueta: "IMT", formato: "moneda" },
    { clave: "seloCompra", etiqueta: "Imposto do Selo sobre a compra", formato: "moneda" },
    { clave: "seloCredito", etiqueta: "Imposto do Selo sobre o crédito", formato: "moneda", ocultarSiCero: true },
    { clave: "taxaMedia", etiqueta: "Taxa média de IMT", formato: "porcentaje", decimales: 2 },
  ],
});
