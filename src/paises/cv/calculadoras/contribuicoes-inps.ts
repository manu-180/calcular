import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cv.contribuicoes-inps",
  mercado: "cv",
  concepto: "aportes-seguridad-social",
  slug: "contribuicoes-inps",
  estado: "publicado",
  requiere: {
    "cv.inps-trabalhador": "numero",
    "cv.inps-empregador": "numero",
  },
  campos: [{ id: "remuneracao", tipo: "moneda", etiqueta: "Remuneração ilíquida mensal", min: 0, porDefecto: 100000 }],
  calcular(entrada, valores, { redondear }) {
    const trabalhador = redondear(porcentaje(entrada.remuneracao, valores["cv.inps-trabalhador"]));
    const empregador = redondear(porcentaje(entrada.remuneracao, valores["cv.inps-empregador"]));
    return {
      total: redondear(trabalhador + empregador),
      trabalhador,
      empregador,
      taxaGlobal: valores["cv.inps-trabalhador"] + valores["cv.inps-empregador"],
      observaciones: [
        "A entidade empregadora desconta a quotização do trabalhador, soma a sua e paga tudo ao INPS até ao dia 15 do mês seguinte.",
        "Trabalhadores por conta própria e serviço doméstico têm taxas diferentes e não entram aqui.",
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total a pagar ao INPS no mês", formato: "moneda", destacada: true },
    { clave: "trabalhador", etiqueta: "Quotização do trabalhador", formato: "moneda" },
    { clave: "empregador", etiqueta: "Contribuição da entidade empregadora", formato: "moneda" },
    { clave: "taxaGlobal", etiqueta: "Taxa global", formato: "porcentaje", decimales: 1 },
  ],
});
