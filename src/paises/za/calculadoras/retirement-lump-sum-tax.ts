import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { impuestoLumpSum } from "../lib/impuestos";

export default definirCalculadora({
  id: "za.retirement-lump-sum-tax",
  mercado: "za",
  concepto: "propio",
  slug: "retirement-lump-sum-tax",
  estado: "publicado",
  requiere: {
    "za.lump-sum-withdrawal-table": "escala",
    "za.lump-sum-retirement-table": "escala",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Why you are taking the lump sum",
      opciones: [
        { valor: "retirement", etiqueta: "Retirement, death, retrenchment or severance" },
        { valor: "withdrawal", etiqueta: "Withdrawal from the fund before retirement" },
      ],
      porDefecto: "retirement",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Taxable lump sum", min: 0, porDefecto: 800000 },
    { id: "anteriores", tipo: "moneda", etiqueta: "Earlier lump sums that count for this table (optional)", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the lump sum.", "monto");
    const escala = entrada.tipo === "withdrawal" ? v["za.lump-sum-withdrawal-table"] : v["za.lump-sum-retirement-table"];
    const impuesto = redondear(impuestoLumpSum(escala, entrada.monto, entrada.anteriores ?? 0));
    return {
      impuesto,
      neto: redondear(entrada.monto - impuesto),
      efectiva: (impuesto / entrada.monto) * 100,
      libre: escala[0].hasta ?? 0,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Tax on the lump sum", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Lump sum after tax", formato: "moneda" },
    { clave: "efectiva", etiqueta: "Effective tax rate", formato: "porcentaje", decimales: 2 },
    { clave: "libre", etiqueta: "Tax-free part of the table", formato: "moneda" },
  ],
});
