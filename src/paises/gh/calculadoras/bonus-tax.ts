import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { impuestoAnual } from "../lib/impuestos";

export default definirCalculadora({
  id: "gh.bonus-tax",
  mercado: "gh",
  concepto: "propio",
  slug: "bonus-tax",
  estado: "publicado",
  requiere: {
    "gh.paye-annual-bands": "escala",
    "gh.bonus-rate": "numero",
    "gh.bonus-limit": "numero",
  },
  campos: [
    { id: "basico", tipo: "moneda", etiqueta: "Annual basic salary", min: 0, porDefecto: 60000 },
    { id: "bono", tipo: "moneda", etiqueta: "Bonus for the year", min: 0, porDefecto: 12000 },
    { id: "gravable", tipo: "moneda", etiqueta: "Your chargeable income for the year without the bonus", min: 0, porDefecto: 60000 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.bono <= 0) throw new ErrorEntrada("Enter the bonus.", "bono");
    const limite = porcentaje(entrada.basico, v["gh.bonus-limit"]);
    const dentro = Math.min(entrada.bono, limite);
    const exceso = entrada.bono - dentro;
    const plano = redondear(porcentaje(dentro, v["gh.bonus-rate"]));
    const escala = v["gh.paye-annual-bands"];
    const graduado = redondear(impuestoAnual(escala, entrada.gravable + exceso) - impuestoAnual(escala, entrada.gravable));
    const impuesto = redondear(plano + graduado);
    return { impuesto, neto: redondear(entrada.bono - impuesto), plano, graduado, limite: redondear(limite), exceso: redondear(exceso) };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Tax on your bonus", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Bonus after tax", formato: "moneda" },
    { clave: "plano", etiqueta: "Flat tax on the bonus up to the limit", formato: "moneda" },
    { clave: "graduado", etiqueta: "Tax on the excess at graduated rates", formato: "moneda", ocultarSiCero: true },
    { clave: "limite", etiqueta: "Bonus limit for the flat rate", formato: "moneda" },
    { clave: "exceso", etiqueta: "Bonus above the limit", formato: "moneda", ocultarSiCero: true },
  ],
});
