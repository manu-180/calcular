import { definirCalculadora, porcentaje } from "@/motor/calculo";
import { DIAS_DEL_MES } from "../lib/laboral";

export default definirCalculadora({
  id: "bo.feriado-trabajado",
  mercado: "bo",
  concepto: "propio",
  slug: "feriado-trabajado",
  estado: "publicado",
  requiere: {
    "bo.recargo-feriado": "numero",
  },
  campos: [
    { id: "haberBasico", tipo: "moneda", etiqueta: "Haber básico mensual", min: 0 },
    { id: "feriados", tipo: "entero", etiqueta: "Feriados que trabajó", min: 1, max: 15, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const diario = entrada.haberBasico / DIAS_DEL_MES;
    const recargo = redondear(entrada.feriados * porcentaje(diario, valores["bo.recargo-feriado"]));
    return {
      diario: redondear(diario),
      recargo,
      observaciones: [
        "El día del feriado ya está pagado en su sueldo mensual: el recargo se suma a eso.",
        "En lugar de pagar el recargo, el empleador puede darle otro día de descanso en la semana.",
      ],
    };
  },
  resultado: [
    { clave: "diario", etiqueta: "Salario de un día", formato: "moneda" },
    { clave: "recargo", etiqueta: "Recargo por feriados trabajados", formato: "moneda", destacada: true },
  ],
});
