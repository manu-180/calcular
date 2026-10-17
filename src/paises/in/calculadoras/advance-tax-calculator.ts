import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { rupias } from "../lib/impuestos";

export default definirCalculadora({
  id: "in.advance-tax-calculator",
  mercado: "in",
  concepto: "propio",
  slug: "advance-tax-calculator",
  estado: "publicado",
  requiere: {
    "in.advance-tax-threshold": "numero",
    "in.advance-tax-instalments": "mapa",
  },
  campos: [
    { id: "impuesto", tipo: "moneda", etiqueta: "Estimated income tax for the year (with cess)", min: 0, porDefecto: 200000, ayuda: "Use the income tax calculator if you need this figure." },
    { id: "tds", tipo: "moneda", etiqueta: "TDS and TCS you expect for the year", min: 0, porDefecto: 50000 },
    { id: "senior", tipo: "si-no", etiqueta: "Resident aged 60 or more with no business or professional income", porDefecto: false },
    { id: "presuntivo", tipo: "si-no", etiqueta: "You declare business income on a presumptive basis", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.tds > entrada.impuesto) throw new ErrorEntrada("TDS is higher than your tax, so you have no advance tax to pay.", "tds");
    const neto = entrada.impuesto - entrada.tds;
    const umbral = v["in.advance-tax-threshold"];
    const m = v["in.advance-tax-instalments"];
    const vacio = { total: 0, junio: 0, septiembre: 0, diciembre: 0, marzo: 0 };
    if (entrada.senior) return { ...vacio, observaciones: ["Resident senior citizens without business or professional income do not pay advance tax."] };
    if (neto < umbral) return { ...vacio, observaciones: [`Advance tax is due only when the tax left after TDS is ${rupias(umbral)} or more.`] };
    if (entrada.presuntivo) {
      return { ...vacio, total: redondear(neto), marzo: redondear(neto), observaciones: ["On presumptive income the whole advance tax is due by 15 March."] };
    }
    const acum = (clave: string) => porcentaje(neto, enMapa(m, clave));
    const junio = acum("jun15");
    const septiembre = acum("sep15") - junio;
    const diciembre = acum("dec15") - acum("sep15");
    const marzo = acum("mar15") - acum("dec15");
    return {
      total: redondear(neto),
      junio: redondear(junio),
      septiembre: redondear(septiembre),
      diciembre: redondear(diciembre),
      marzo: redondear(marzo),
      observaciones: [`By 15 June ${enMapa(m, "jun15")}%, by 15 September ${enMapa(m, "sep15")}%, by 15 December ${enMapa(m, "dec15")}% and by 15 March all of it.`],
    };
  },
  resultado: [
    { clave: "total", etiqueta: "Advance tax for the year", formato: "moneda", destacada: true },
    { clave: "junio", etiqueta: "Pay by 15 June", formato: "moneda" },
    { clave: "septiembre", etiqueta: "Pay by 15 September", formato: "moneda" },
    { clave: "diciembre", etiqueta: "Pay by 15 December", formato: "moneda" },
    { clave: "marzo", etiqueta: "Pay by 15 March", formato: "moneda" },
  ],
});
