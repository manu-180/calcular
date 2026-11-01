import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lr.presumptive-tax",
  mercado: "lr",
  concepto: "regimen-simplificado",
  slug: "presumptive-tax",
  estado: "publicado",
  requiere: {
    "lr.presumptive-rates": "mapa",
    "lr.small-turnover-limit": "numero",
  },
  campos: [
    { id: "ventas", tipo: "moneda", etiqueta: "Turnover in the quarter", min: 0, porDefecto: 500000 },
    { id: "anual", tipo: "moneda", etiqueta: "Expected turnover for the whole year", min: 0, porDefecto: 2000000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ventas <= 0) throw new ErrorEntrada("Enter your turnover for the quarter.", "ventas");
    if (entrada.anual < entrada.ventas) throw new ErrorEntrada("The yearly turnover cannot be lower than the quarter's.", "anual");
    const pequeno = entrada.anual < v["lr.small-turnover-limit"];
    const tasa = pequeno ? v["lr.presumptive-rates"].small : v["lr.presumptive-rates"]["medium-large"];
    const impuesto = redondear(porcentaje(entrada.ventas, tasa));
    return {
      impuesto,
      tasa,
      division: pequeno ? "Small Tax Division (presumptive tax)" : "Medium or Large Tax Division (advance tax)",
      anualEstimado: redondear(porcentaje(entrada.anual, tasa)),
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Tax to pay for the quarter", formato: "moneda", destacada: true },
    { clave: "division", etiqueta: "Your LRA division", formato: "texto" },
    { clave: "tasa", etiqueta: "Quarterly rate on turnover", formato: "porcentaje", decimales: 0 },
    { clave: "anualEstimado", etiqueta: "Estimated total for the year", formato: "moneda" },
  ],
});
