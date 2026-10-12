import { definirCalculadora, enMapa } from "@/motor/calculo";
import { salarioDiario } from "../reglas";

const DIAS_SEMANA = 7;

export default definirCalculadora({
  id: "hn.despido-embarazada",
  mercado: "hn",
  concepto: "propio",
  slug: "despido-embarazada",
  estado: "publicado",
  requiere: {
    "hn.despido-embarazada-dias": "numero",
    "hn.maternidad-semanas": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario promedio mensual", min: 0 },
    { id: "tomoDescanso", tipo: "si-no", etiqueta: "Ya tomó el descanso pagado por maternidad", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const diario = salarioDiario(entrada.salario);
    const diasIndemnizacion = valores["hn.despido-embarazada-dias"];
    const semanas = valores["hn.maternidad-semanas"];
    const diasDescanso = entrada.tomoDescanso ? 0 : (enMapa(semanas, "antes") + enMapa(semanas, "despues")) * DIAS_SEMANA;
    const indemnizacion = redondear(diario * diasIndemnizacion);
    const descanso = redondear(diario * diasDescanso);
    return {
      indemnizacion,
      diasDescanso,
      descanso,
      total: redondear(indemnizacion + descanso),
      observaciones: [
        "Esto va aparte de las prestaciones normales del despido: preaviso, cesantía, vacaciones y décimos.",
        "Se presume que el despido fue por el embarazo si ocurre durante el embarazo o en los 3 meses después del parto sin autorización de la Inspección del Trabajo.",
      ],
    };
  },
  resultado: [
    { clave: "indemnizacion", etiqueta: "Indemnización especial", formato: "moneda" },
    { clave: "diasDescanso", etiqueta: "Días de descanso por maternidad que se le deben", formato: "dias", ocultarSiCero: true },
    { clave: "descanso", etiqueta: "Pago del descanso no tomado", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total adicional a sus prestaciones", formato: "moneda", destacada: true },
  ],
});
