import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gh.modified-taxation-scheme",
  mercado: "gh",
  concepto: "regimen-simplificado",
  slug: "modified-taxation-scheme",
  estado: "publicado",
  requiere: {
    "gh.mts-rate": "numero",
    "gh.mts-lower": "numero",
    "gh.mts-upper": "numero",
  },
  campos: [
    { id: "ventas", tipo: "moneda", etiqueta: "Yearly business turnover", min: 0, porDefecto: 300000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ventas <= 0) throw new ErrorEntrada("Enter your yearly turnover.", "ventas");
    const bajo = v["gh.mts-lower"];
    const alto = v["gh.mts-upper"];
    const aplica = entrada.ventas > bajo && entrada.ventas <= alto;
    const observaciones: string[] = [];
    if (entrada.ventas <= bajo) observaciones.push("Your turnover is at or below the lower limit of the scheme.");
    if (entrada.ventas > alto) observaciones.push("Your turnover is above the scheme's limit, so the presumptive tax does not apply.");
    const impuesto = aplica ? redondear(porcentaje(entrada.ventas, v["gh.mts-rate"])) : null;
    return { impuesto, trimestral: impuesto === null ? null : redondear(impuesto / 4), mensual: impuesto === null ? null : redondear(impuesto / 12), observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Presumptive tax for the year", formato: "moneda", destacada: true },
    { clave: "trimestral", etiqueta: "A quarter", formato: "moneda" },
    { clave: "mensual", etiqueta: "A month", formato: "moneda" },
  ],
});
