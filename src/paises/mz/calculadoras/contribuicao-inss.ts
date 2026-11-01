import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mz.contribuicao-inss",
  mercado: "mz",
  concepto: "aportes-seguridad-social",
  slug: "contribuicao-inss",
  estado: "publicado",
  requiere: {
    "mz.inss-trabalhador": "numero",
    "mz.inss-empregador": "numero",
    "mz.inss-tcp": "numero",
  },
  campos: [
    {
      id: "regime",
      tipo: "opcion",
      etiqueta: "Regime",
      opciones: [
        { valor: "tco", etiqueta: "Trabalhador por conta de outrem (TCO)" },
        { valor: "tcp", etiqueta: "Trabalhador por conta própria (TCP)" },
      ],
      porDefecto: "tco",
    },
    { id: "remuneracao", tipo: "moneda", etiqueta: "Remuneração ou rendimento mensal", min: 0, porDefecto: 30000 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.regime === "tcp") {
      const total = redondear(porcentaje(entrada.remuneracao, valores["mz.inss-tcp"]));
      return {
        total,
        trabalhador: total,
        empregador: null,
        taxa: valores["mz.inss-tcp"],
        observaciones: ["No regime por conta própria a contribuição é paga na totalidade pelo próprio trabalhador."],
      };
    }
    const trabalhador = redondear(porcentaje(entrada.remuneracao, valores["mz.inss-trabalhador"]));
    const empregador = redondear(porcentaje(entrada.remuneracao, valores["mz.inss-empregador"]));
    return {
      total: redondear(trabalhador + empregador),
      trabalhador,
      empregador,
      taxa: valores["mz.inss-trabalhador"] + valores["mz.inss-empregador"],
      observaciones: ["A entidade empregadora desconta a parte do trabalhador no salário e entrega as duas partes ao INSS todos os meses."],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total a entregar ao INSS", formato: "moneda", destacada: true },
    { clave: "trabalhador", etiqueta: "Parte do trabalhador", formato: "moneda" },
    { clave: "empregador", etiqueta: "Parte da entidade empregadora", formato: "moneda" },
    { clave: "taxa", etiqueta: "Taxa total", formato: "porcentaje" },
  ],
});
