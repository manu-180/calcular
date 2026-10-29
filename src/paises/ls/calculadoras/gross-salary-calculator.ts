import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { payeMensual } from "../lib/comun";

export default definirCalculadora({
  id: "ls.gross-salary-calculator",
  mercado: "ls",
  concepto: "propio",
  slug: "gross-salary-calculator",
  estado: "publicado",
  requiere: {
    "ls.income-tax-bands": "escala",
    "ls.tax-credit": "numero",
  },
  campos: [{ id: "neto", tipo: "moneda", etiqueta: "Take-home pay you want a month", min: 0, porDefecto: 10000 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.neto <= 0) throw new ErrorEntrada("Enter the take-home pay you want.", "neto");
    const bandas = v["ls.income-tax-bands"];
    const credito = v["ls.tax-credit"];
    // El neto crece siempre con el bruto (la tasa más alta es menor que 100 %): se busca por bisección
    // y se toma el bruto redondeado más chico que llega al neto pedido.
    let bajo = entrada.neto;
    let alto = entrada.neto * 2 + credito;
    for (let i = 0; i < 200; i++) {
      const medio = (bajo + alto) / 2;
      if (medio - payeMensual(bandas, credito, medio) < entrada.neto) bajo = medio;
      else alto = medio;
    }
    const bruto = redondear(alto);
    const paye = redondear(payeMensual(bandas, credito, bruto));
    return { bruto, paye, neto: redondear(bruto - paye), anual: redondear(bruto * 12) };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Gross salary a month", formato: "moneda", destacada: true },
    { clave: "paye", etiqueta: "PAYE a month", formato: "moneda" },
    { clave: "neto", etiqueta: "Take-home pay a month", formato: "moneda" },
    { clave: "anual", etiqueta: "Gross salary a year", formato: "moneda" },
  ],
});
