import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "mu.salary-compensation-calculator",
  mercado: "mu",
  concepto: "propio",
  slug: "salary-compensation-calculator",
  estado: "publicado",
  requiere: {
    "mu.salary-compensation": "numero",
    "mu.salary-compensation-ceiling": "numero",
    "mu.salary-compensation-part-time-rate": "numero",
    "mu.salary-compensation-part-time-threshold": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Monthly basic wage before the 2026 compensation", min: 0, porDefecto: 25000 },
    {
      id: "jornada",
      tipo: "opcion",
      etiqueta: "You work",
      opciones: [
        { valor: "full", etiqueta: "Full time" },
        { valor: "part", etiqueta: "Part time" },
      ],
      porDefecto: "full",
    },
  ],
  calcular(e, v) {
    if (e.basico <= 0) throw new ErrorEntrada("Enter your monthly basic wage.", "basico");
    const fijo = v["mu.salary-compensation"];
    const tope = v["mu.salary-compensation-ceiling"];
    let compensacion = 0;
    if (e.basico <= tope) {
      compensacion =
        e.jornada === "part" && e.basico < v["mu.salary-compensation-part-time-threshold"]
          ? // El reglamento redondea al rupee siguiente; el margen evita que 333,0000000001 suba a 334.
            Math.ceil(porcentaje(e.basico, v["mu.salary-compensation-part-time-rate"]) - 1e-9)
          : fijo;
    }
    const observaciones: string[] = [];
    if (compensacion === 0) observaciones.push("Workers with a basic wage above the ceiling are not covered by the 2026 regulations. Your employer can still agree to an increase.");
    if (e.jornada === "part" && compensacion > 0 && compensacion < fijo) observaciones.push("Part-time workers below the threshold get a percentage of their wage, rounded up to the next rupee.");
    return {
      compensacion,
      nuevoBasico: e.basico + compensacion,
      anual: compensacion * 12,
      aumento: (compensacion / e.basico) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "compensacion", etiqueta: "Salary compensation a month from January 2026", formato: "moneda", destacada: true },
    { clave: "nuevoBasico", etiqueta: "Basic wage with the compensation", formato: "moneda" },
    { clave: "anual", etiqueta: "Over 12 months", formato: "moneda" },
    { clave: "aumento", etiqueta: "Increase on your wage", formato: "porcentaje", decimales: 2 },
  ],
});
