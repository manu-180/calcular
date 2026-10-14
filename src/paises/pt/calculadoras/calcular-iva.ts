import { definirCalculadora, enMapa, porcentaje, porRegion } from "@/motor/calculo";

export default definirCalculadora({
  id: "pt.calcular-iva",
  mercado: "pt",
  concepto: "iva",
  slug: "calcular-iva",
  estado: "publicado",
  requiere: {
    "pt.iva-taxas": "mapa-por-region",
    "pt.iva-limite-isencao": "numero",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Valor", min: 0, porDefecto: 100 },
    {
      id: "operacao",
      tipo: "opcion",
      etiqueta: "O que pretende fazer",
      opciones: [
        { valor: "somar", etiqueta: "Acrescentar o IVA a um valor sem IVA" },
        { valor: "retirar", etiqueta: "Retirar o IVA de um valor com IVA incluído" },
      ],
      porDefecto: "somar",
    },
    {
      id: "taxa",
      tipo: "opcion",
      etiqueta: "Taxa de IVA",
      opciones: [
        { valor: "normal", etiqueta: "Taxa normal" },
        { valor: "intermedia", etiqueta: "Taxa intermédia" },
        { valor: "reduzida", etiqueta: "Taxa reduzida" },
      ],
      porDefecto: "normal",
    },
    { id: "regiao", tipo: "region", etiqueta: "Onde se realiza a operação", porDefecto: "continente" },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = enMapa(porRegion(valores["pt.iva-taxas"], entrada.regiao), entrada.taxa);
    const base = entrada.operacao === "somar" ? redondear(entrada.valor) : redondear(entrada.valor / (1 + tasa / 100));
    const imposto = entrada.operacao === "somar" ? redondear(porcentaje(base, tasa)) : redondear(entrada.valor - base);
    const total = entrada.operacao === "somar" ? redondear(base + imposto) : redondear(entrada.valor);
    return { base, imposto, total, tasa };
  },
  resultado: [
    { clave: "total", etiqueta: "Valor com IVA", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Valor sem IVA (base tributável)", formato: "moneda" },
    { clave: "imposto", etiqueta: "IVA", formato: "moneda" },
    { clave: "tasa", etiqueta: "Taxa aplicada", formato: "porcentaje" },
  ],
});
