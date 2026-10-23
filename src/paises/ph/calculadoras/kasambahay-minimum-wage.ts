import { definirCalculadora, porRegion } from "@/motor/calculo";

export default definirCalculadora({
  id: "ph.kasambahay-minimum-wage",
  mercado: "ph",
  concepto: "trabajo-domestico",
  slug: "kasambahay-minimum-wage",
  estado: "borrador",
  requiere: {
    "ph.kasambahay-wage-low": "numero-por-region",
    "ph.kasambahay-wage-high": "numero-por-region",
  },
  campos: [
    { id: "region", tipo: "region", etiqueta: "Region where the kasambahay works", porDefecto: "ncr" },
    { id: "sueldo", tipo: "moneda", etiqueta: "Monthly wage you pay (optional)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    const bajo = porRegion(v["ph.kasambahay-wage-low"], entrada.region);
    const alto = porRegion(v["ph.kasambahay-wage-high"], entrada.region);
    const observaciones: string[] = [];
    if (entrada.sueldo !== null && entrada.sueldo < bajo) observaciones.push("The wage you entered is below the minimum for domestic workers in this region.");
    if (bajo !== alto) observaciones.push("This region sets different minimums by area. Check the wage order for the city or municipality.");
    return {
      alto,
      bajo,
      anual: redondear(alto * 12),
      diferencia: entrada.sueldo === null ? null : redondear(entrada.sueldo - bajo),
      observaciones,
    };
  },
  resultado: [
    { clave: "alto", etiqueta: "Monthly minimum wage for a kasambahay", formato: "moneda", destacada: true },
    { clave: "bajo", etiqueta: "Lowest monthly minimum in the region", formato: "moneda" },
    { clave: "anual", etiqueta: "Twelve months at the minimum", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Your wage above the minimum", formato: "moneda" },
  ],
});
