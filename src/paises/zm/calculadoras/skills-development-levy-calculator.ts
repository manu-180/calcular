import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "zm.skills-development-levy-calculator",
  mercado: "zm",
  concepto: "propio",
  slug: "skills-development-levy-calculator",
  estado: "publicado",
  requiere: {
    "zm.sdl-rate": "numero",
  },
  campos: [
    {
      id: "total",
      tipo: "moneda",
      etiqueta: "Total payroll for the month",
      min: 0,
      porDefecto: 100000,
      ayuda: "Basic pay, allowances, leave pay and every other emolument.",
    },
    { id: "excluido", tipo: "moneda", etiqueta: "Gratuities and redundancy packages included above", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.total <= 0) throw new ErrorEntrada("Enter the total payroll for the month.", "total");
    if (e.excluido > e.total) throw new ErrorEntrada("Gratuities and redundancy packages cannot be more than the total payroll.", "excluido");
    const base = redondear(e.total - e.excluido);
    return { levy: redondear(porcentaje(base, v["zm.sdl-rate"])), base };
  },
  resultado: [
    { clave: "levy", etiqueta: "Skills Development Levy for the month", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Chargeable emoluments", formato: "moneda" },
  ],
});
