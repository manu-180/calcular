import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gm.corporate-income-tax",
  mercado: "gm",
  concepto: "propio",
  slug: "corporate-income-tax",
  estado: "publicado",
  requiere: {
    "gm.corporate-tax-rate": "numero",
    "gm.minimum-tax-turnover": "mapa",
  },
  campos: [
    { id: "ventas", tipo: "moneda", etiqueta: "Turnover for the year", min: 0, porDefecto: 5000000 },
    { id: "utilidad", tipo: "moneda", etiqueta: "Net profit for the year", porDefecto: 800000, ayuda: "Enter a loss as a negative number." },
    {
      id: "cuentas",
      tipo: "opcion",
      etiqueta: "Accounts",
      opciones: [
        { valor: "audited", etiqueta: "Audited" },
        { valor: "unaudited", etiqueta: "Not audited" },
      ],
      porDefecto: "audited",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ventas <= 0) throw new ErrorEntrada("Enter the turnover.", "ventas");
    const sobreUtilidad = porcentaje(Math.max(0, entrada.utilidad), v["gm.corporate-tax-rate"]);
    const minimo = porcentaje(entrada.ventas, enMapa(v["gm.minimum-tax-turnover"], entrada.cuentas));
    const impuesto = Math.max(sobreUtilidad, minimo);
    const observaciones = minimo > sobreUtilidad ? ["The minimum tax on turnover is higher than the tax on profit, so the minimum tax is due."] : [];
    return {
      impuesto: redondear(impuesto),
      sobreUtilidad: redondear(sobreUtilidad),
      minimo: redondear(minimo),
      trimestral: redondear(impuesto / 4),
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Corporation income tax", formato: "moneda", destacada: true },
    { clave: "sobreUtilidad", etiqueta: "Tax on net profit", formato: "moneda" },
    { clave: "minimo", etiqueta: "Minimum tax on turnover", formato: "moneda" },
    { clave: "trimestral", etiqueta: "Quarterly instalment", formato: "moneda" },
  ],
});
