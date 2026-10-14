import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pt.trabalho-noturno",
  mercado: "pt",
  concepto: "propio",
  slug: "trabalho-noturno",
  estado: "publicado",
  requiere: {
    "pt.ct-trabalho-noturno": "numero",
  },
  campos: [
    { id: "retribuicao", tipo: "moneda", etiqueta: "Retribuição mensal", min: 0, porDefecto: 1200 },
    { id: "horasSemana", tipo: "numero", etiqueta: "Período normal de trabalho por semana (horas)", min: 1, max: 60, porDefecto: 40 },
    { id: "horasNoturnas", tipo: "numero", etiqueta: "Horas de trabalho noturno no mês", min: 0, porDefecto: 40, ayuda: "Sem outra regra na convenção coletiva, é noturno o trabalho entre as 22 horas e as 7 horas." },
  ],
  calcular(entrada, valores, { redondear }) {
    const valorHora = (entrada.retribuicao * 12) / (52 * entrada.horasSemana);
    const acrescimoHora = porcentaje(valorHora, valores["pt.ct-trabalho-noturno"]);
    return {
      valorHora: redondear(valorHora),
      acrescimoHora: redondear(acrescimoHora),
      acrescimo: redondear(acrescimoHora * entrada.horasNoturnas),
      observaciones: [
        "O acréscimo não se aplica, salvo convenção coletiva, a atividades feitas sobretudo de noite, a serviços abertos ao público à noite (restauração, farmácias, hotelaria) nem quando o salário já foi fixado a contar com o trabalho noturno.",
      ],
    };
  },
  resultado: [
    { clave: "acrescimo", etiqueta: "Acréscimo por trabalho noturno no mês", formato: "moneda", destacada: true },
    { clave: "acrescimoHora", etiqueta: "Acréscimo por hora", formato: "moneda" },
    { clave: "valorHora", etiqueta: "Valor da hora normal", formato: "moneda" },
  ],
});
