import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sg.hdb-loan",
  mercado: "sg",
  concepto: "propio",
  slug: "hdb-loan",
  estado: "publicado",
  requiere: {
    "sg.hdb-tasa-concesional": "numero",
  },
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "HDB loan amount", min: 0, porDefecto: 400000 },
    { id: "plazo", tipo: "entero", etiqueta: "Loan tenure in years", min: 1, max: 30, porDefecto: 25 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the loan amount.", "monto");
    if (entrada.plazo < 1) throw new ErrorEntrada("Enter a tenure of at least 1 year.", "plazo");
    const tasa = v["sg.hdb-tasa-concesional"];
    const r = tasa / 1200;
    const n = entrada.plazo * 12;
    const cuota = redondear(r === 0 ? entrada.monto / n : (entrada.monto * r) / (1 - Math.pow(1 + r, -n)));
    const total = redondear(cuota * n);
    return {
      cuota,
      intereses: redondear(total - entrada.monto),
      total,
      tasa,
      primerInteres: redondear(entrada.monto * r),
      observaciones: [
        "The HDB concessionary rate is pegged at 0.1% above the CPF Ordinary Account rate and is reviewed every quarter, so the instalment can change.",
        "Your final instalment can differ by a few cents because of rounding.",
      ],
    };
  },
  resultado: [
    { clave: "cuota", etiqueta: "Monthly instalment", formato: "moneda", destacada: true },
    { clave: "intereses", etiqueta: "Total interest over the loan", formato: "moneda" },
    { clave: "total", etiqueta: "Total repaid", formato: "moneda" },
    { clave: "tasa", etiqueta: "HDB concessionary interest rate", formato: "porcentaje", decimales: 2 },
    { clave: "primerInteres", etiqueta: "Interest in the first month", formato: "moneda" },
  ],
});
