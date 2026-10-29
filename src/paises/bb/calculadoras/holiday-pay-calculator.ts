import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bb.holiday-pay-calculator",
  mercado: "bb",
  concepto: "vacaciones",
  slug: "holiday-pay-calculator",
  estado: "publicado",
  requiere: {
    "bb.holiday-weeks-under-5": "numero",
    "bb.holiday-weeks-5-plus": "numero",
  },
  campos: [
    { id: "semanal", tipo: "moneda", etiqueta: "Your normal weekly pay", min: 0, porDefecto: 900 },
    { id: "anios", tipo: "entero", etiqueta: "Years of continuous service", min: 0, max: 60, porDefecto: 3 },
  ],
  calcular(e, v, { redondear }) {
    if (e.semanal <= 0) throw new ErrorEntrada("Enter your normal weekly pay.", "semanal");
    const semanas = e.anios >= 5 ? v["bb.holiday-weeks-5-plus"] : v["bb.holiday-weeks-under-5"];
    const faltan = e.anios >= 5 ? 0 : 5 - e.anios;
    const observaciones: string[] = [];
    if (faltan > 0) observaciones.push(`Your holiday grows to ${v["bb.holiday-weeks-5-plus"]} weeks after ${faltan} more year${faltan === 1 ? "" : "s"} of service.`);
    return { semanas, pago: redondear(semanas * e.semanal), diaria: redondear(e.semanal / 5), observaciones };
  },
  resultado: [
    { clave: "semanas", etiqueta: "Paid holiday a year (weeks)", formato: "numero", decimales: 0, destacada: true },
    { clave: "pago", etiqueta: "Holiday pay", formato: "moneda", destacada: true },
    { clave: "diaria", etiqueta: "Pay for one working day (5 day week)", formato: "moneda" },
  ],
});
