import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { escalaDe, ESCALAS, estadoValido, impuestoFederal, OPCIONES_ESTADO_CIVIL } from "../lib/impuestos";

export default definirCalculadora({
  id: "us.capital-gains-tax",
  mercado: "us",
  concepto: "propio",
  slug: "capital-gains-tax",
  estado: "publicado",
  requiere: {
    ...ESCALAS,
    "us.cg-zero-max": "mapa",
    "us.cg-15-max": "mapa",
    "us.niit-rate": "numero",
    "us.niit-threshold": "mapa",
  },
  campos: [
    { id: "estado", tipo: "opcion", etiqueta: "Filing status", opciones: OPCIONES_ESTADO_CIVIL, porDefecto: "single" },
    { id: "ganancia", tipo: "moneda", etiqueta: "Capital gain", min: 0, porDefecto: 20000, ayuda: "Sale price minus what you paid, including fees." },
    {
      id: "plazo",
      tipo: "opcion",
      etiqueta: "How long you held it",
      opciones: [
        { valor: "largo", etiqueta: "More than one year (long term)" },
        { valor: "corto", etiqueta: "One year or less (short term)" },
      ],
      porDefecto: "largo",
    },
    { id: "ordinario", tipo: "moneda", etiqueta: "Other taxable income", min: 0, porDefecto: 40000, ayuda: "Your taxable income for the year without this gain, after deductions." },
    { id: "magi", tipo: "moneda", etiqueta: "Modified AGI including the gain", min: 0, requerido: false, ayuda: "Optional. Used for the 3.8% net investment income tax." },
  ],
  calcular(entrada, valores, { redondear }) {
    const estado = estadoValido(entrada.estado);
    const g = entrada.ganancia;
    const ord = entrada.ordinario;
    const total = ord + g;
    let al0 = 0;
    let al15 = 0;
    let al20 = 0;
    let impuesto: number;
    if (entrada.plazo === "corto") {
      const escala = escalaDe(valores, estado);
      impuesto = redondear(impuestoFederal(escala, total) - impuestoFederal(escala, ord));
    } else if (entrada.plazo === "largo") {
      const tope0 = enMapa(valores["us.cg-zero-max"], estado);
      const tope15 = enMapa(valores["us.cg-15-max"], estado);
      al0 = Math.max(0, Math.min(total, tope0) - ord);
      al15 = Math.max(0, Math.min(total, tope15) - Math.max(ord, tope0));
      al20 = g - al0 - al15;
      impuesto = redondear(porcentaje(al15, 15) + porcentaje(al20, 20));
    } else {
      throw new ErrorEntrada({ codigo: "opcion-invalida" });
    }
    const niit =
      entrada.magi === null
        ? 0
        : redondear(porcentaje(Math.min(g, Math.max(0, entrada.magi - enMapa(valores["us.niit-threshold"], estado))), valores["us.niit-rate"]));
    const pagar = redondear(impuesto + niit);
    return {
      al0: redondear(al0),
      al15: redondear(al15),
      al20: redondear(al20),
      impuesto,
      niit,
      pagar,
      efectiva: g > 0 ? redondear((pagar / g) * 100) : 0,
      neto: redondear(g - pagar),
      observaciones: [
        entrada.plazo === "corto"
          ? "Short-term gains are taxed like wages, at your ordinary income tax rates."
          : "Long-term gains stack on top of your other income, so the 0%, 15% and 20% rates depend on both.",
        "State income tax on gains is not included. Collectibles and some real estate gains have other rates.",
      ],
    };
  },
  resultado: [
    { clave: "al0", etiqueta: "Gain taxed at 0%", formato: "moneda", ocultarSiCero: true },
    { clave: "al15", etiqueta: "Gain taxed at 15%", formato: "moneda", ocultarSiCero: true },
    { clave: "al20", etiqueta: "Gain taxed at 20%", formato: "moneda", ocultarSiCero: true },
    { clave: "impuesto", etiqueta: "Federal income tax on the gain", formato: "moneda" },
    { clave: "niit", etiqueta: "Net investment income tax", formato: "moneda", ocultarSiCero: true },
    { clave: "pagar", etiqueta: "Total federal tax on the gain", formato: "moneda", destacada: true },
    { clave: "efectiva", etiqueta: "Effective rate on the gain", formato: "porcentaje" },
    { clave: "neto", etiqueta: "Gain after federal tax", formato: "moneda" },
  ],
});
