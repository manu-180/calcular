import { aplicarEscala, definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "rw.trading-licence-calculator",
  mercado: "rw",
  concepto: "propio",
  slug: "trading-licence-calculator",
  estado: "publicado",
  requiere: {
    "rw.trading-licence": "escala",
    "rw.trading-licence-other": "mapa",
  },
  campos: [
    {
      id: "actividad",
      tipo: "opcion",
      etiqueta: "Business",
      opciones: [
        { valor: "turnover", etiqueta: "Registered for income tax, turnover of RWF 12 million or more" },
        { valor: "urban", etiqueta: "Not registered for income tax, urban area" },
        { valor: "rural", etiqueta: "Not registered for income tax, rural area" },
        { valor: "vehicle", etiqueta: "Transport by vehicle" },
        { valor: "boat", etiqueta: "Transport by boat" },
        { valor: "motorcycle", etiqueta: "Transport by motorcycle" },
      ],
      porDefecto: "turnover",
    },
    { id: "facturacion", tipo: "moneda", etiqueta: "Turnover last year", min: 0, porDefecto: 50000000, visibleSi: { actividad: ["turnover"] } },
  ],
  calcular(e, v) {
    let anual: number;
    if (e.actividad === "turnover") {
      const facturacion = e.facturacion ?? 0;
      const minimo = v["rw.trading-licence"][0].desde;
      if (facturacion < minimo) throw new ErrorEntrada("The turnover bands start at RWF 12 million. Below that, choose the option that fits your business.", "facturacion");
      anual = aplicarEscala(v["rw.trading-licence"], facturacion);
    } else {
      anual = enMapa(v["rw.trading-licence-other"], e.actividad);
    }
    return {
      anual,
      // La tabla de la RRA da 40.000 por trimestre para vehículos, igual que el anual: no se reparte.
      trimestral: e.actividad === "vehicle" ? null : anual / 4,
      observaciones: ["Micro and small enterprises are exempt in their first two years of operation."],
    };
  },
  resultado: [
    { clave: "anual", etiqueta: "Trading licence for the year", formato: "moneda", destacada: true },
    { clave: "trimestral", etiqueta: "If paid each quarter", formato: "moneda" },
  ],
});
