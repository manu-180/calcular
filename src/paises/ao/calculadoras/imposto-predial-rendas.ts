import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ao.imposto-predial-rendas",
  mercado: "ao",
  concepto: "propio",
  slug: "imposto-predial-rendas",
  estado: "publicado",
  requiere: {
    "ao.ip-renda": "numero",
    "ao.ip-renda-deducao": "numero",
  },
  campos: [{ id: "renda", tipo: "moneda", etiqueta: "Renda recebida", min: 0, porDefecto: 500000, ayuda: "A renda de um mês ou de todo o ano: o imposto segue o mesmo período." }],
  calcular(entrada, valores, { redondear }) {
    const deducao = redondear(porcentaje(entrada.renda, valores["ao.ip-renda-deducao"]));
    const colectavel = redondear(entrada.renda - deducao);
    const imposto = redondear(porcentaje(colectavel, valores["ao.ip-renda"]));
    return {
      imposto,
      deducao,
      colectavel,
      liquido: redondear(entrada.renda - imposto),
      efectiva: entrada.renda > 0 ? (imposto / entrada.renda) * 100 : 0,
    };
  },
  resultado: [
    { clave: "imposto", etiqueta: "Imposto Predial sobre a renda", formato: "moneda", destacada: true },
    { clave: "deducao", etiqueta: "Dedução para conservação e manutenção", formato: "moneda" },
    { clave: "colectavel", etiqueta: "Rendimento colectável", formato: "moneda" },
    { clave: "liquido", etiqueta: "Renda depois do imposto", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Taxa efectiva sobre a renda", formato: "porcentaje", decimales: 1 },
  ],
});
