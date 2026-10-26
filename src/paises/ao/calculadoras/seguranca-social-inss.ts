import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ao.seguranca-social-inss",
  mercado: "ao",
  concepto: "aportes-seguridad-social",
  slug: "seguranca-social-inss",
  estado: "publicado",
  requiere: {
    "ao.inss-trabalhador": "numero",
    "ao.inss-empregador": "numero",
    "ao.inss-reformado": "numero",
  },
  campos: [
    { id: "remuneracao", tipo: "moneda", etiqueta: "Remuneração ilíquida do mês", min: 0, porDefecto: 350000, ayuda: "Salário base mais subsídios e prémios. Sem o subsídio de férias, que não desconta." },
    { id: "reformado", tipo: "si-no", etiqueta: "O trabalhador já está reformado", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const taxaTrabalhador = entrada.reformado ? valores["ao.inss-reformado"] : valores["ao.inss-trabalhador"];
    const trabalhador = redondear(porcentaje(entrada.remuneracao, taxaTrabalhador));
    const empregador = redondear(porcentaje(entrada.remuneracao, valores["ao.inss-empregador"]));
    return {
      trabalhador,
      taxaTrabalhador,
      empregador,
      total: redondear(trabalhador + empregador),
      depois: redondear(entrada.remuneracao - trabalhador),
    };
  },
  resultado: [
    { clave: "trabalhador", etiqueta: "Desconto do trabalhador", formato: "moneda", destacada: true },
    { clave: "taxaTrabalhador", etiqueta: "Taxa do trabalhador", formato: "porcentaje" },
    { clave: "empregador", etiqueta: "Contribuição da entidade empregadora", formato: "moneda" },
    { clave: "total", etiqueta: "Total a entregar ao INSS", formato: "moneda" },
    { clave: "depois", etiqueta: "Remuneração depois do INSS", formato: "moneda" },
  ],
});
