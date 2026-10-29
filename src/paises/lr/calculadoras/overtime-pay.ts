import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lr.overtime-pay",
  mercado: "lr",
  concepto: "horas-extra",
  slug: "overtime-pay",
  estado: "borrador",
  requiere: {
    "lr.overtime-premium": "numero",
    "lr.ordinary-hours": "numero",
  },
  campos: [
    { id: "tarifa", tipo: "moneda", etiqueta: "Normal pay for one hour", min: 0, porDefecto: 300 },
    { id: "horas", tipo: "numero", etiqueta: "Overtime hours worked", min: 0, porDefecto: 5 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.tarifa <= 0) throw new ErrorEntrada("Enter your normal pay for one hour.", "tarifa");
    if (entrada.horas <= 0) throw new ErrorEntrada("Enter the overtime hours.", "horas");
    const tarifaExtra = redondear(entrada.tarifa + porcentaje(entrada.tarifa, v["lr.overtime-premium"]));
    return {
      total: redondear(tarifaExtra * entrada.horas),
      tarifaExtra,
      adicional: redondear((tarifaExtra - entrada.tarifa) * entrada.horas),
      jornada: v["lr.ordinary-hours"],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Overtime pay", formato: "moneda", destacada: true },
    { clave: "tarifaExtra", etiqueta: "Overtime rate for one hour", formato: "moneda" },
    { clave: "adicional", etiqueta: "Extra above your normal pay", formato: "moneda" },
    { clave: "jornada", etiqueta: "Ordinary hours in a week", formato: "horas" },
  ],
});
