import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "zm.leave-days-calculator",
  mercado: "zm",
  concepto: "vacaciones",
  slug: "leave-days-calculator",
  estado: "publicado",
  requiere: {
    "zm.leave-days-per-month": "numero",
    "zm.leave-pay-divisor": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Full pay for the month", min: 0, porDefecto: 5200 },
    { id: "meses", tipo: "numero", etiqueta: "Months worked that earn leave", min: 0, porDefecto: 12 },
    { id: "tomados", tipo: "numero", etiqueta: "Leave days already taken", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.sueldo <= 0) throw new ErrorEntrada("Enter your full pay for the month.", "sueldo");
    const ganados = e.meses * v["zm.leave-days-per-month"];
    if (e.tomados > ganados) throw new ErrorEntrada("You cannot have taken more days than you earned.", "tomados");
    const dias = ganados - e.tomados;
    const diario = e.sueldo / v["zm.leave-pay-divisor"];
    return { pago: redondear(diario * dias), dias, ganados, diario: redondear(diario) };
  },
  resultado: [
    { clave: "pago", etiqueta: "Leave pay for the days due", formato: "moneda", destacada: true },
    { clave: "dias", etiqueta: "Leave days due", formato: "dias" },
    { clave: "ganados", etiqueta: "Leave days earned", formato: "dias" },
    { clave: "diario", etiqueta: "Pay for one leave day", formato: "moneda" },
  ],
});
