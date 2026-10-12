import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { DIAS_MES } from "../prestaciones";

export default definirCalculadora({
  id: "ni.septimo-dia",
  mercado: "ni",
  concepto: "propio",
  slug: "septimo-dia",
  estado: "publicado",
  requiere: {
    "ni.recargo-horas-extra": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "dias", tipo: "entero", etiqueta: "Días de descanso que trabajaste", min: 1, max: 31, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const diario = redondear(entrada.salario / DIAS_MES);
    const porDia = redondear(diario + porcentaje(diario, valores["ni.recargo-horas-extra"]));
    return {
      diario,
      porDia,
      total: redondear(porDia * entrada.dias),
      observaciones: [
        "Es aparte de tu salario del mes, que ya incluye el séptimo día pagado.",
        "Si trabajaste solo unas horas, se pagan como horas extras: cada hora con el mismo recargo.",
        "Si el feriado cae en tu séptimo día y lo trabajás, también se paga como día extraordinario.",
      ],
    };
  },
  resultado: [
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "porDia", etiqueta: "Pago por cada día de descanso trabajado", formato: "moneda" },
    { clave: "total", etiqueta: "Total a cobrar", formato: "moneda", destacada: true },
  ],
});
