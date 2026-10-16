import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "in.emi-calculator",
  mercado: "in",
  concepto: "prestamo",
  slug: "emi-calculator",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Loan amount", min: 0, porDefecto: 1000000 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Interest rate a year", min: 0, max: 50, porDefecto: 9 },
    { id: "anios", tipo: "entero", etiqueta: "Tenure in years", min: 0, max: 40, porDefecto: 5 },
    { id: "meses", tipo: "entero", etiqueta: "Extra months", min: 0, max: 11, porDefecto: 0 },
  ],
  calcular(entrada, _v, { redondear }) {
    const n = entrada.anios * 12 + entrada.meses;
    if (n <= 0) throw new ErrorEntrada("Enter a tenure of at least one month.", "anios");
    if (entrada.monto <= 0) throw new ErrorEntrada("Enter the loan amount.", "monto");
    const r = entrada.tasa / 1200;
    const emi = r === 0 ? entrada.monto / n : (entrada.monto * r * (1 + r) ** n) / ((1 + r) ** n - 1);
    const total = emi * n;
    let saldo = entrada.monto;
    let interesAnio1 = 0;
    for (let m = 0; m < Math.min(12, n); m++) {
      const interes = saldo * r;
      interesAnio1 += interes;
      saldo -= emi - interes;
    }
    return {
      emi: redondear(emi),
      interes: redondear(total - entrada.monto),
      total: redondear(total),
      interesAnio1: redondear(interesAnio1),
      meses: n,
    };
  },
  resultado: [
    { clave: "emi", etiqueta: "Monthly EMI", formato: "moneda", destacada: true },
    { clave: "interes", etiqueta: "Total interest", formato: "moneda" },
    { clave: "total", etiqueta: "Total amount paid", formato: "moneda" },
    { clave: "interesAnio1", etiqueta: "Interest in the first 12 EMIs", formato: "moneda" },
    { clave: "meses", etiqueta: "Number of EMIs", formato: "numero", decimales: 0 },
  ],
});
