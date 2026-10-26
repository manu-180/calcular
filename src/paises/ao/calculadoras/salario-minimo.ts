import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { salarioHora } from "../lib/folha";

export default definirCalculadora({
  id: "ao.salario-minimo",
  mercado: "ao",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "publicado",
  requiere: {
    "ao.salario-minimo": "numero",
    "ao.salario-minimo-micro": "numero",
    "ao.inss-trabalhador": "numero",
    "ao.horas-semanais": "numero",
    "ao.semanas-ano": "numero",
  },
  campos: [
    {
      id: "empresa",
      tipo: "opcion",
      etiqueta: "Tipo de entidade empregadora",
      opciones: [
        { valor: "geral", etiqueta: "Empresas em geral" },
        { valor: "micro", etiqueta: "Micro-empresa ou empresa iniciante (startup)" },
      ],
      porDefecto: "geral",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const mensal = entrada.empresa === "micro" ? valores["ao.salario-minimo-micro"] : valores["ao.salario-minimo"];
    const inss = redondear(porcentaje(mensal, valores["ao.inss-trabalhador"]));
    return {
      mensal,
      hora: redondear(salarioHora(mensal, valores["ao.horas-semanais"], valores["ao.semanas-ano"])),
      inss,
      liquido: redondear(mensal - inss),
      observaciones: ["Uma convenção colectiva pode fixar um mínimo mais alto para o sector. Nesse caso vale o da convenção."],
    };
  },
  resultado: [
    { clave: "mensal", etiqueta: "Salário mínimo por mês", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "Valor por hora com o horário semanal máximo", formato: "moneda" },
    { clave: "inss", etiqueta: "Desconto para o INSS", formato: "moneda" },
    { clave: "liquido", etiqueta: "Líquido depois do INSS", formato: "moneda" },
  ],
});
