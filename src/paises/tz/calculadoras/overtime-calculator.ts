import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tz.overtime-calculator",
  mercado: "tz",
  concepto: "horas-extra",
  slug: "overtime-calculator",
  estado: "publicado",
  requiere: {
    "tz.overtime-factor": "numero",
    "tz.night-premium": "numero",
    "tz.ordinary-week-hours": "numero",
  },
  campos: [
    { id: "hora", tipo: "moneda", etiqueta: "Your basic wage for one hour", min: 0, porDefecto: 3000 },
    { id: "horas", tipo: "numero", etiqueta: "Overtime hours worked", min: 0, porDefecto: 10 },
    { id: "nocturnas", tipo: "numero", etiqueta: "Of those, hours worked at night (8 pm to 6 am)", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.hora <= 0) throw new ErrorEntrada("Enter your basic wage for one hour.", "hora");
    if (e.nocturnas > e.horas) throw new ErrorEntrada("Night hours cannot be more than the overtime hours.", "nocturnas");
    const tarifa = e.hora * v["tz.overtime-factor"];
    const extra = redondear(tarifa * e.horas);
    const nocturno = redondear(porcentaje(tarifa, v["tz.night-premium"]) * e.nocturnas);
    return { total: redondear(extra + nocturno), extra, nocturno, tarifa: redondear(tarifa) };
  },
  resultado: [
    { clave: "total", etiqueta: "Overtime pay", formato: "moneda", destacada: true },
    { clave: "extra", etiqueta: "Overtime at the overtime rate", formato: "moneda" },
    { clave: "nocturno", etiqueta: "Night work premium", formato: "moneda", ocultarSiCero: true },
    { clave: "tarifa", etiqueta: "Overtime rate for one hour", formato: "moneda" },
  ],
});
