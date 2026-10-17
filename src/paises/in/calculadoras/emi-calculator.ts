import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import type { TablaResultado } from "@/motor/tipos";

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
    const filas: (readonly number[])[] = [];
    for (let anio = 1, m = 0; m < n; anio++) {
      let interesAnio = 0;
      let capitalAnio = 0;
      for (const fin = Math.min(n, m + 12); m < fin; m++) {
        const interes = saldo * r;
        const capital = Math.min(saldo, emi - interes);
        interesAnio += interes;
        capitalAnio += capital;
        saldo -= capital;
      }
      if (anio === 1) interesAnio1 = interesAnio;
      filas.push([anio, redondear(interesAnio), redondear(capitalAnio), redondear(Math.max(0, saldo))]);
    }
    const anual: TablaResultado = {
      tipo: "tabla",
      columnas: [
        { clave: "anio", etiqueta: "Year", formato: "numero" },
        { clave: "intereses", etiqueta: "Interest paid", formato: "moneda" },
        { clave: "capital", etiqueta: "Principal repaid", formato: "moneda" },
        { clave: "saldo", etiqueta: "Outstanding at year end", formato: "moneda" },
      ],
      filas,
    };
    return {
      emi: redondear(emi),
      interes: redondear(total - entrada.monto),
      total: redondear(total),
      interesAnio1: redondear(interesAnio1),
      meses: n,
      anual,
    };
  },
  resultado: [
    { clave: "emi", etiqueta: "Monthly EMI", formato: "moneda", destacada: true },
    { clave: "interes", etiqueta: "Total interest", formato: "moneda" },
    { clave: "total", etiqueta: "Total amount paid", formato: "moneda" },
    { clave: "interesAnio1", etiqueta: "Interest in the first 12 EMIs", formato: "moneda" },
    { clave: "meses", etiqueta: "Number of EMIs", formato: "numero", decimales: 0 },
  ],
  tablas: [{ clave: "anual", titulo: "Year by year", filasVisibles: 12 }],
});
