import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { validarIngreso } from "../lib/impuestos";

export default definirCalculadora({
  id: "ca.canada-child-benefit",
  mercado: "ca",
  concepto: "propio",
  slug: "canada-child-benefit",
  estado: "publicado",
  // Los ejemplos oficiales de la CRA truncan la reducción al centavo (17.153 × 3,2 % = 548,896 → 548,89).
  redondeo: { decimales: 2, modo: "truncar" },
  requiere: {
    "ca.ccb-maximum": "mapa",
    "ca.ccb-thresholds": "mapa",
    "ca.ccb-rates-first": "mapa",
    "ca.ccb-rates-second": "mapa",
    "ca.ccb-base-reduction": "mapa",
  },
  campos: [
    { id: "menores6", tipo: "entero", etiqueta: "Children under 6", min: 0, max: 15, porDefecto: 1 },
    { id: "de6a17", tipo: "entero", etiqueta: "Children aged 6 to 17", min: 0, max: 15, porDefecto: 0 },
    { id: "ingreso", tipo: "moneda", etiqueta: "Adjusted family net income for 2025", min: 0, porDefecto: 60000, ayuda: "Line 23600 of your return plus your spouse's or partner's, if you have one." },
    { id: "compartida", tipo: "si-no", etiqueta: "You have shared custody", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    validarIngreso(entrada.ingreso, "ingreso");
    const hijos = entrada.menores6 + entrada.de6a17;
    if (hijos === 0) throw new ErrorEntrada("Enter at least one child.", "menores6");
    const max = v["ca.ccb-maximum"];
    const { first: primero, second: segundo } = v["ca.ccb-thresholds"];
    const clave = String(Math.min(hijos, 4));
    const maximo = entrada.menores6 * max["under-6"] + entrada.de6a17 * max["6-to-17"];
    let reduccion = 0;
    if (entrada.ingreso > segundo) reduccion = v["ca.ccb-base-reduction"][clave] + porcentaje(entrada.ingreso - segundo, v["ca.ccb-rates-second"][clave]);
    else if (entrada.ingreso > primero) reduccion = porcentaje(entrada.ingreso - primero, v["ca.ccb-rates-first"][clave]);
    reduccion = redondear(reduccion);
    const completo = Math.max(0, maximo - reduccion);
    const anual = redondear(entrada.compartida ? completo / 2 : completo);
    return {
      anual,
      mensual: redondear(anual / 12),
      maximo,
      reduccion,
      observaciones: entrada.compartida ? ["With shared custody each parent gets half of what they would get with full custody, based on their own family income."] : [],
    };
  },
  resultado: [
    { clave: "anual", etiqueta: "CCB for July 2026 to June 2027", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "About a month", formato: "moneda" },
    { clave: "maximo", etiqueta: "Maximum before the income reduction", formato: "moneda" },
    { clave: "reduccion", etiqueta: "Reduction for your income", formato: "moneda" },
  ],
});
