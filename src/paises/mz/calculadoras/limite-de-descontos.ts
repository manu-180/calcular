import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mz.limite-de-descontos",
  mercado: "mz",
  concepto: "propio",
  slug: "limite-de-descontos",
  estado: "publicado",
  requiere: {
    "mz.limite-descontos": "numero",
    "mz.limite-especie": "numero",
  },
  campos: [
    { id: "remuneracao", tipo: "moneda", etiqueta: "Remuneração mensal", min: 0, porDefecto: 30000 },
    { id: "descontos", tipo: "moneda", etiqueta: "Descontos que já tem no salário", min: 0, porDefecto: 0, ayuda: "Por exemplo prestações de um empréstimo ou de compras autorizadas por escrito. Os descontos para o Estado e a segurança social também contam." },
  ],
  calcular(entrada, valores, { redondear }) {
    const maximo = redondear(entrada.remuneracao / valores["mz.limite-descontos"]);
    const margem = redondear(maximo - entrada.descontos);
    return {
      maximo,
      margem: Math.max(0, margem),
      especie: redondear(porcentaje(entrada.remuneracao, valores["mz.limite-especie"])),
      observaciones: margem < 0 ? ["Os descontos indicados já passam o limite de um terço da remuneração."] : ["Um adiantamento de salário pedido pelo trabalhador não conta como desconto."],
    };
  },
  resultado: [
    { clave: "maximo", etiqueta: "Máximo de descontos por mês (um terço)", formato: "moneda", destacada: true },
    { clave: "margem", etiqueta: "Margem ainda disponível", formato: "moneda" },
    { clave: "especie", etiqueta: "Máximo da remuneração paga em espécie", formato: "moneda" },
  ],
});
