import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pt.taxa-social-unica",
  mercado: "pt",
  concepto: "aportes-seguridad-social",
  slug: "taxa-social-unica",
  estado: "publicado",
  requiere: {
    "pt.ss-trabalhador": "numero",
    "pt.ss-empregador": "numero",
  },
  campos: [{ id: "remuneracao", tipo: "moneda", etiqueta: "Remuneração bruta", min: 0, porDefecto: 1500 }],
  calcular(entrada, valores, { redondear }) {
    const trabalhador = redondear(porcentaje(entrada.remuneracao, valores["pt.ss-trabalhador"]));
    const empresa = redondear(porcentaje(entrada.remuneracao, valores["pt.ss-empregador"]));
    return {
      trabalhador,
      empresa,
      total: redondear(trabalhador + empresa),
      taxaTotal: valores["pt.ss-trabalhador"] + valores["pt.ss-empregador"],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total para a Segurança Social", formato: "moneda", destacada: true },
    { clave: "trabalhador", etiqueta: "Desconto do trabalhador", formato: "moneda" },
    { clave: "empresa", etiqueta: "Contribuição da empresa", formato: "moneda" },
    { clave: "taxaTotal", etiqueta: "Taxa contributiva global", formato: "porcentaje", decimales: 2 },
  ],
});
