import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "zm.nhima-calculator",
  mercado: "zm",
  concepto: "propio",
  slug: "nhima-calculator",
  estado: "publicado",
  requiere: {
    "zm.nhima-rate": "numero",
  },
  campos: [{ id: "basico", tipo: "moneda", etiqueta: "Basic pay for the month", min: 0, porDefecto: 10000 }],
  calcular(e, v, { redondear }) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter your basic pay for the month.", "basico");
    const empleado = redondear(porcentaje(e.basico, v["zm.nhima-rate"]));
    return { empleado, empleador: empleado, total: redondear(empleado * 2), anual: redondear(empleado * 12) };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Your NHIMA contribution", formato: "moneda", destacada: true },
    { clave: "empleador", etiqueta: "Your employer's contribution", formato: "moneda" },
    { clave: "total", etiqueta: "Total paid to NHIMA", formato: "moneda" },
    { clave: "anual", etiqueta: "Your contribution over 12 months", formato: "moneda" },
  ],
});
