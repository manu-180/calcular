import { definirCalculadora, porcentaje } from "@/motor/calculo";

const DIAS_DEL_MES = 30;

// Art. 175: trabajar el día de descanso da derecho al salario de ese día, a un 50 % más por las horas
// trabajadas y a otro día de descanso pagado (art. 176). Con salario mensual el descanso ya viene
// pagado (art. 174), así que lo que se suma es el pago de las horas con su recargo.
export default definirCalculadora({
  id: "sv.descanso-semanal",
  mercado: "sv",
  concepto: "propio",
  slug: "descanso-semanal",
  estado: "publicado",
  requiere: {
    "sv.recargo-descanso-semanal": "numero",
    "sv.jornada-diurna": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "horas", tipo: "numero", etiqueta: "Horas trabajadas en su día de descanso", min: 0, porDefecto: 8 },
    { id: "veces", tipo: "entero", etiqueta: "Cuántos días de descanso trabajó", min: 1, max: 31, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const hora = entrada.salario / DIAS_DEL_MES / valores["sv.jornada-diurna"];
    const pagoHoras = hora * entrada.horas * entrada.veces;
    const recargo = porcentaje(pagoHoras, valores["sv.recargo-descanso-semanal"]);
    return {
      hora: redondear(hora),
      pagoHoras: redondear(pagoHoras),
      recargo: redondear(recargo),
      total: redondear(pagoHoras + recargo),
      compensatorios: entrada.veces,
      observaciones: ["Además le deben un día de descanso compensatorio pagado por cada día de descanso trabajado, en la misma semana o en la siguiente."],
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Valor de su hora", formato: "moneda" },
    { clave: "pagoHoras", etiqueta: "Pago de las horas trabajadas", formato: "moneda" },
    { clave: "recargo", etiqueta: "Recargo", formato: "moneda" },
    { clave: "total", etiqueta: "Total a cobrar", formato: "moneda", destacada: true },
    { clave: "compensatorios", etiqueta: "Días compensatorios pagados", formato: "dias" },
  ],
});
