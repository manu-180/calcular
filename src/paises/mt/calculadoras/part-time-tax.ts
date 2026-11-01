import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { euros } from "../lib/malta";

export default definirCalculadora({
  id: "mt.part-time-tax",
  mercado: "mt",
  concepto: "propio",
  slug: "part-time-tax",
  estado: "publicado",
  requiere: {
    "mt.part-time-tax-rate": "numero",
    "mt.part-time-limits": "mapa",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Part-time income in the year", min: 0, porDefecto: 6000 },
    { id: "tipo", tipo: "opcion-dato", dato: "mt.part-time-limits", etiqueta: "The part-time work is", porDefecto: "employment" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso <= 0) throw new ErrorEntrada("Enter your part-time income.", "ingreso");
    const limite = enMapa(v["mt.part-time-limits"], entrada.tipo);
    const califica = Math.min(entrada.ingreso, limite);
    const impuesto = redondear(porcentaje(califica, v["mt.part-time-tax-rate"]));
    const exceso = redondear(entrada.ingreso - califica);
    const observaciones: string[] = [];
    if (exceso > 0) observaciones.push(`The ${euros(exceso)} above the limit is taxed with your other income at your normal rates.`);
    observaciones.push("The flat rate is for people who also have a full-time job, a taxable pension, or who study full-time or serve an apprenticeship.");
    return { impuesto, califica: redondear(califica), exceso, neto: redondear(entrada.ingreso - impuesto), observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Flat-rate tax on part-time income", formato: "moneda", destacada: true },
    { clave: "califica", etiqueta: "Income taxed at the flat rate", formato: "moneda" },
    { clave: "exceso", etiqueta: "Income taxed at normal rates", formato: "moneda" },
    { clave: "neto", etiqueta: "Left after the flat-rate tax", formato: "moneda" },
  ],
});
