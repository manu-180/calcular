import { definirCalculadora } from "@/motor/calculo";
import { diasEntre } from "@/motor/vigencia";
import { validarFechas } from "../reglas";

export default definirCalculadora({
  id: "pa.vacaciones-proporcionales",
  mercado: "pa",
  concepto: "propio",
  slug: "vacaciones-proporcionales",
  estado: "publicado",
  requiere: {
    "pa.vacaciones-dias-por-dia": "numero",
    "pa.vacaciones-dias": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    {
      id: "desde",
      tipo: "fecha",
      etiqueta: "Desde cuándo cuentas",
      ayuda: "El día en que empezaste a trabajar o el día siguiente al que se cumplió tu último período de vacaciones.",
    },
    { id: "hasta", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.desde, entrada.hasta);
    const trabajados = diasEntre(entrada.desde, entrada.hasta) + 1;
    const dias = trabajados / valores["pa.vacaciones-dias-por-dia"];
    return {
      trabajados,
      dias: redondear(dias),
      pago: redondear((entrada.salario * dias) / valores["pa.vacaciones-dias"]),
      observaciones: [
        "Cada día de vacaciones vale un treintavo de tu salario mensual. Al pago se le descuenta Seguro Social y seguro educativo.",
      ],
    };
  },
  resultado: [
    { clave: "trabajados", etiqueta: "Días trabajados", formato: "dias" },
    { clave: "dias", etiqueta: "Días de vacaciones que te tocan", formato: "dias", decimales: 2 },
    { clave: "pago", etiqueta: "Pago de las vacaciones (bruto)", formato: "moneda", destacada: true },
  ],
});
