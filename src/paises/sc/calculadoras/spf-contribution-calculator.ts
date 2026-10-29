import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "sc.spf-contribution-calculator",
  mercado: "sc",
  concepto: "aportes-seguridad-social",
  slug: "spf-contribution-calculator",
  estado: "publicado",
  requiere: { "sc.spf-employee-rate": "numero", "sc.spf-employer-rate": "numero", "sc.spf-self-employed-rate": "numero" },
  campos: [
    {
      id: "situacion",
      tipo: "opcion",
      etiqueta: "How you work",
      opciones: [
        { valor: "employee", etiqueta: "Employee" },
        { valor: "self", etiqueta: "Self-employed" },
      ],
      porDefecto: "employee",
    },
    { id: "bruto", tipo: "moneda", etiqueta: "Gross pay for the month", min: 0, porDefecto: 25000, ayuda: "For the self-employed, the gross income you declare to the SPF." },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Enter your gross pay for the month.", "bruto");
    if (e.situacion === "self") {
      const propio = redondear(porcentaje(e.bruto, v["sc.spf-self-employed-rate"]));
      return { empleado: 0, empleador: 0, propio, total: propio };
    }
    const empleado = redondear(porcentaje(e.bruto, v["sc.spf-employee-rate"]));
    const empleador = redondear(porcentaje(e.bruto, v["sc.spf-employer-rate"]));
    return { empleado, empleador, propio: 0, total: redondear(empleado + empleador) };
  },
  resultado: [
    { clave: "empleado", etiqueta: "Deducted from the employee", formato: "moneda", ocultarSiCero: true },
    { clave: "empleador", etiqueta: "Paid by the employer on top", formato: "moneda", ocultarSiCero: true },
    { clave: "propio", etiqueta: "Paid by the self-employed worker", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total paid to the SPF for the month", formato: "moneda", destacada: true },
  ],
});
