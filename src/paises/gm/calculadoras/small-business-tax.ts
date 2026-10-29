import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gm.small-business-tax",
  mercado: "gm",
  concepto: "regimen-simplificado",
  slug: "small-business-tax",
  estado: "publicado",
  requiere: {
    "gm.presumptive-turnover-limit": "numero",
    "gm.presumptive-rate": "numero",
    "gm.minimum-tax-turnover": "mapa",
  },
  campos: [
    { id: "ventas", tipo: "moneda", etiqueta: "Business turnover for the year", min: 0, porDefecto: 400000 },
    {
      id: "cuentas",
      tipo: "opcion",
      etiqueta: "Accounts (only matters above the turnover limit)",
      opciones: [
        { valor: "audited", etiqueta: "Audited" },
        { valor: "unaudited", etiqueta: "Not audited" },
      ],
      porDefecto: "unaudited",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ventas <= 0) throw new ErrorEntrada("Enter your turnover.", "ventas");
    const limite = v["gm.presumptive-turnover-limit"];
    if (entrada.ventas < limite) {
      const impuesto = redondear(porcentaje(entrada.ventas, v["gm.presumptive-rate"]));
      return {
        impuesto,
        trimestral: redondear(impuesto / 4),
        regimen: "Final turnover tax",
        observaciones: ["This is a final tax: you make quarterly declarations and payments, and you do not file an annual return."],
      };
    }
    const minimo = redondear(porcentaje(entrada.ventas, enMapa(v["gm.minimum-tax-turnover"], entrada.cuentas)));
    return {
      impuesto: minimo,
      trimestral: redondear(minimo / 4),
      regimen: "Minimum tax on turnover",
      observaciones: ["Your turnover is above the limit for the final turnover tax. You pay the higher of this minimum tax and personal income tax on your net profit, and you file an annual return."],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Tax for the year", formato: "moneda", destacada: true },
    { clave: "regimen", etiqueta: "How you are taxed", formato: "texto" },
    { clave: "trimestral", etiqueta: "Quarterly payment", formato: "moneda" },
  ],
});
