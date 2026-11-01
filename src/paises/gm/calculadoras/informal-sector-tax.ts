import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "gm.informal-sector-tax",
  mercado: "gm",
  concepto: "propio",
  slug: "informal-sector-tax",
  estado: "publicado",
  requiere: {
    "gm.informal-sector-tax": "mapa",
  },
  campos: [
    { id: "oficio", tipo: "opcion-dato", etiqueta: "Your trade", dato: "gm.informal-sector-tax", porDefecto: "barbers" },
    { id: "cuotas", tipo: "entero", etiqueta: "Instalments you would like to pay in", min: 1, max: 12, porDefecto: 1, ayuda: "The GRA expects one payment a year but may accept instalments on request." },
  ],
  calcular(entrada, v, { redondear }) {
    const anual = enMapa(v["gm.informal-sector-tax"], entrada.oficio);
    return { anual, cuota: redondear(anual / entrada.cuotas), mensual: redondear(anual / 12) };
  },
  resultado: [
    { clave: "anual", etiqueta: "Informal sector income tax for the year", formato: "moneda", destacada: true },
    { clave: "cuota", etiqueta: "Each instalment", formato: "moneda" },
    { clave: "mensual", etiqueta: "Equivalent a month", formato: "moneda" },
  ],
});
