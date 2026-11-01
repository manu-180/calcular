import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cv.calcular-iva",
  mercado: "cv",
  concepto: "iva",
  slug: "calcular-iva",
  estado: "publicado",
  requiere: {
    "cv.iva-taxa-normal": "numero",
    "cv.iva-eletricidade-agua": "numero",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Valor", min: 0, porDefecto: 10000 },
    {
      id: "operacao",
      tipo: "opcion",
      etiqueta: "O valor indicado",
      porDefecto: "sem-iva",
      opciones: [
        { valor: "sem-iva", etiqueta: "Não inclui IVA (acrescentar)" },
        { valor: "com-iva", etiqueta: "Já inclui IVA (retirar)" },
      ],
    },
    {
      id: "taxa",
      tipo: "opcion",
      etiqueta: "Taxa aplicável",
      porDefecto: "normal",
      opciones: [
        { valor: "normal", etiqueta: "Taxa normal" },
        { valor: "eletricidade-agua", etiqueta: "Eletricidade e água para consumo final" },
      ],
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const taxa = enMapa({ normal: valores["cv.iva-taxa-normal"], "eletricidade-agua": valores["cv.iva-eletricidade-agua"] }, entrada.taxa);
    const comIva = entrada.operacao === "com-iva";
    const base = comIva ? redondear((entrada.valor * 100) / (100 + taxa)) : redondear(entrada.valor);
    const iva = comIva ? redondear(entrada.valor - base) : redondear(porcentaje(entrada.valor, taxa));
    return {
      base,
      iva,
      total: redondear(base + iva),
      taxa,
      observaciones: ["A isenção e a taxa zero dependem do bem ou serviço. A lista de bens isentos está anexa ao Código do IVA."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Valor com IVA", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Valor sem IVA", formato: "moneda" },
    { clave: "iva", etiqueta: "IVA", formato: "moneda" },
    { clave: "taxa", etiqueta: "Taxa aplicada", formato: "porcentaje", decimales: 1 },
  ],
});
