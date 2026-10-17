import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "in.capital-gains-tax-calculator",
  mercado: "in",
  concepto: "propio",
  slug: "capital-gains-tax-calculator",
  estado: "publicado",
  requiere: {
    "in.stcg-equity-rate": "numero",
    "in.ltcg-equity-rate": "numero",
    "in.ltcg-equity-exemption": "numero",
    "in.cess": "numero",
  },
  campos: [
    { id: "corto", tipo: "moneda", etiqueta: "Short-term gains on listed shares and equity funds", min: 0, porDefecto: 100000, ayuda: "Gains on units held for 12 months or less, sold with STT paid." },
    { id: "largo", tipo: "moneda", etiqueta: "Long-term gains on listed shares and equity funds", min: 0, porDefecto: 300000, ayuda: "Gains on units held for more than 12 months, with STT paid." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.corto < 0 || entrada.largo < 0) throw new ErrorEntrada("Enter gains as positive amounts. Set off losses first.", "corto");
    const impCorto = porcentaje(entrada.corto, v["in.stcg-equity-rate"]);
    const gravableLargo = Math.max(0, entrada.largo - v["in.ltcg-equity-exemption"]);
    const impLargo = porcentaje(gravableLargo, v["in.ltcg-equity-rate"]);
    const cess = porcentaje(impCorto + impLargo, v["in.cess"]);
    return {
      total: redondear(impCorto + impLargo + cess),
      impCorto: redondear(impCorto),
      impLargo: redondear(impLargo),
      gravableLargo: redondear(gravableLargo),
      exento: redondear(Math.min(entrada.largo, v["in.ltcg-equity-exemption"])),
      cess: redondear(cess),
      observaciones: [
        "Surcharge is not included. It applies only above ₹50 lakh of total income and is capped at 15% on these gains.",
        "If your other income is below the basic exemption limit, a resident can use the unused part against these gains, which lowers the tax.",
      ],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Total tax with cess", formato: "moneda", destacada: true },
    { clave: "impCorto", etiqueta: "Tax on short-term gains", formato: "moneda" },
    { clave: "impLargo", etiqueta: "Tax on long-term gains", formato: "moneda" },
    { clave: "exento", etiqueta: "Long-term gains not taxed", formato: "moneda" },
    { clave: "gravableLargo", etiqueta: "Long-term gains taxed", formato: "moneda" },
    { clave: "cess", etiqueta: "Health and Education Cess", formato: "moneda" },
  ],
});
