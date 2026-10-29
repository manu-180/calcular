import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mw.pension-calculator",
  mercado: "mw",
  concepto: "aportes-seguridad-social",
  slug: "pension-calculator",
  estado: "publicado",
  requiere: {
    "mw.pension-employee": "numero",
    "mw.pension-employer": "numero",
  },
  campos: [
    {
      id: "pensionable",
      tipo: "moneda",
      etiqueta: "Pensionable pay for the month",
      min: 0,
      porDefecto: 500000,
      ayuda: "Guaranteed wages and other earnings. Leave out a house or car your employer provides.",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.pensionable <= 0) throw new ErrorEntrada("Enter your pensionable pay for the month.", "pensionable");
    const empleado = redondear(porcentaje(e.pensionable, v["mw.pension-employee"]));
    const empleador = redondear(porcentaje(e.pensionable, v["mw.pension-employer"]));
    const total = redondear(empleado + empleador);
    return { total, empleado, empleador, anual: redondear(total * 12) };
  },
  resultado: [
    { clave: "total", etiqueta: "Total going into your pension each month", formato: "moneda", destacada: true },
    { clave: "empleado", etiqueta: "Your contribution", formato: "moneda" },
    { clave: "empleador", etiqueta: "Your employer's contribution", formato: "moneda" },
    { clave: "anual", etiqueta: "Total over 12 months", formato: "moneda" },
  ],
});
