import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lk.sscl-calculator",
  mercado: "lk",
  concepto: "propio",
  slug: "sscl-calculator",
  estado: "publicado",
  requiere: {
    "lk.sscl-rate": "numero",
    "lk.sscl-liable-share": "mapa",
    "lk.sscl-threshold-quarter": "numero",
    "lk.sscl-threshold-year": "numero",
  },
  campos: [
    { id: "actividad", tipo: "opcion-dato", dato: "lk.sscl-liable-share", etiqueta: "Your business activity", porDefecto: "trade" },
    { id: "facturacion", tipo: "moneda", etiqueta: "Turnover for the quarter", min: 0, porDefecto: 20000000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.facturacion <= 0) throw new ErrorEntrada("Enter your turnover for the quarter.", "facturacion");
    const parte = enMapa(v["lk.sscl-liable-share"], e.actividad);
    const sujeta = redondear(porcentaje(e.facturacion, parte));
    const sscl = redondear(porcentaje(sujeta, v["lk.sscl-rate"]));
    const observaciones: string[] = [];
    if (e.facturacion <= v["lk.sscl-threshold-quarter"]) {
      observaciones.push("This quarter is not above the quarterly threshold. You pay SSCL only if your turnover for four consecutive quarters is above the yearly threshold.");
    }
    return {
      sscl,
      parte,
      sujeta,
      porMes: redondear(sscl / 3),
      tasaEfectiva: (sscl / e.facturacion) * 100,
      observaciones,
    };
  },
  resultado: [
    { clave: "sscl", etiqueta: "SSCL for the quarter", formato: "moneda", destacada: true },
    { clave: "parte", etiqueta: "Share of turnover that is liable", formato: "porcentaje", decimales: 0 },
    { clave: "sujeta", etiqueta: "Liable turnover", formato: "moneda" },
    { clave: "porMes", etiqueta: "Average a month", formato: "moneda" },
    { clave: "tasaEfectiva", etiqueta: "SSCL as a share of total turnover", formato: "porcentaje", decimales: 3 },
  ],
});
