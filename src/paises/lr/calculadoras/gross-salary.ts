import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { impuestoAnual } from "../lib/impuestos";

export default definirCalculadora({
  id: "lr.gross-salary",
  mercado: "lr",
  concepto: "propio",
  slug: "gross-salary",
  estado: "publicado",
  requiere: {
    "lr.pit-bands": "escala",
    "lr.nasscorp-employee": "numero",
  },
  campos: [{ id: "neto", tipo: "moneda", etiqueta: "Take-home pay you want a month", min: 0, porDefecto: 34358.33 }],
  calcular(entrada, v, { redondear }) {
    if (entrada.neto <= 0) throw new ErrorEntrada("Enter the take-home pay you want.", "neto");
    const netoDe = (bruto: number) =>
      bruto - porcentaje(bruto, v["lr.nasscorp-employee"]) - impuestoAnual(v["lr.pit-bands"], bruto * 12) / 12;
    // El neto crece con el bruto, así que una bisección encuentra el bruto exacto.
    let bajo = entrada.neto;
    let alto = entrada.neto * 2;
    for (let i = 0; i < 80; i++) {
      const medio = (bajo + alto) / 2;
      if (netoDe(medio) < entrada.neto) bajo = medio;
      else alto = medio;
    }
    const bruto = redondear(alto);
    const nasscorp = redondear(porcentaje(bruto, v["lr.nasscorp-employee"]));
    const pit = redondear(impuestoAnual(v["lr.pit-bands"], bruto * 12) / 12);
    return { bruto, nasscorp, pit, anual: redondear(bruto * 12) };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Gross salary a month", formato: "moneda", destacada: true },
    { clave: "nasscorp", etiqueta: "NASSCORP pension contribution", formato: "moneda" },
    { clave: "pit", etiqueta: "Personal income tax (PIT)", formato: "moneda" },
    { clave: "anual", etiqueta: "Gross salary a year", formato: "moneda" },
  ],
});
