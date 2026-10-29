import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ws.provisional-tax-calculator",
  mercado: "ws",
  concepto: "propio",
  slug: "provisional-tax-calculator",
  estado: "publicado",
  requiere: {
    "ws.provisional-tax-instalments": "numero",
    "ws.provisional-tax-minimum": "numero",
  },
  campos: [
    { id: "impuestoAnterior", tipo: "moneda", etiqueta: "Income tax liability for last year", min: 0, porDefecto: 10000 },
    { id: "anio", tipo: "entero", etiqueta: "Tax year you are paying provisional tax for", min: 2013, max: 2100, porDefecto: 2026 },
  ],
  calcular(e, v, { redondear }) {
    if (e.impuestoAnterior < 0) throw new ErrorEntrada("Tax cannot be negative.", "impuestoAnterior");
    const n = v["ws.provisional-tax-instalments"];
    const unico = e.impuestoAnterior < v["ws.provisional-tax-minimum"];
    const cuota = redondear(e.impuestoAnterior / n);
    const primera = unico ? redondear(e.impuestoAnterior) : cuota;
    const segunda = unico ? 0 : cuota;
    const tercera = unico ? 0 : redondear(e.impuestoAnterior - 2 * cuota);
    return {
      primera,
      segunda,
      tercera,
      total: redondear(primera + segunda + tercera),
      fecha1: `31 March ${e.anio}`,
      fecha2: unico ? "Nothing due" : `31 July ${e.anio}`,
      fecha3: unico ? "Nothing due" : `31 October ${e.anio}`,
      observaciones: [
        "Provisional tax paid during the year is set against your income tax for that year, which is due by 31 March of the next year. Any balance is settled then.",
      ],
    };
  },
  resultado: [
    { clave: "primera", etiqueta: "First payment", formato: "moneda", destacada: true },
    { clave: "fecha1", etiqueta: "Due", formato: "texto" },
    { clave: "segunda", etiqueta: "Second payment", formato: "moneda" },
    { clave: "fecha2", etiqueta: "Due", formato: "texto" },
    { clave: "tercera", etiqueta: "Third payment", formato: "moneda" },
    { clave: "fecha3", etiqueta: "Due", formato: "texto" },
    { clave: "total", etiqueta: "Total provisional tax", formato: "moneda" },
  ],
});
