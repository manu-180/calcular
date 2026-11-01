import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { apitMensual } from "../lib/nomina";

export default definirCalculadora({
  id: "lk.gross-salary-calculator",
  mercado: "lk",
  concepto: "propio",
  slug: "gross-salary-calculator",
  estado: "publicado",
  requiere: {
    "lk.apit-table-1": "escala",
    "lk.epf-employee": "numero",
  },
  campos: [{ id: "neto", tipo: "moneda", etiqueta: "Take-home pay you want each month", min: 0, porDefecto: 250000 }],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Enter the take-home pay you want.", "neto");
    const tabla = v["lk.apit-table-1"];
    const tasaEpf = v["lk.epf-employee"];
    const netoDe = (bruto: number) => bruto - porcentaje(bruto, tasaEpf) - apitMensual(bruto, tabla);
    // El neto sube con el bruto (la tasa marginal más alta, 36 % más EPF, queda por debajo del 100 %):
    // se busca el bruto por bisección.
    let bajo = e.neto;
    let alto = e.neto * 3;
    for (let i = 0; i < 100; i++) {
      const medio = (bajo + alto) / 2;
      if (netoDe(medio) < e.neto) bajo = medio;
      else alto = medio;
    }
    const bruto = redondear(alto);
    const epf = redondear(porcentaje(bruto, tasaEpf));
    const apit = redondear(apitMensual(bruto, tabla));
    return { bruto, epf, apit, neto: redondear(bruto - epf - apit) };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Gross salary to ask for", formato: "moneda", destacada: true },
    { clave: "epf", etiqueta: "EPF, your share", formato: "moneda" },
    { clave: "apit", etiqueta: "APIT", formato: "moneda" },
    { clave: "neto", etiqueta: "Take-home pay", formato: "moneda" },
  ],
});
