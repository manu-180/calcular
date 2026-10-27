import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Borrador: las tasas solo se vieron en el formulario TD01 de BURS (2020), no en la Transfer Duty Act.
const EXENTO_CIUDADANOS = 1000000;

export default definirCalculadora({
  id: "bw.transfer-duty",
  mercado: "bw",
  concepto: "propio",
  slug: "transfer-duty",
  estado: "borrador",
  requiere: {
    "bw.transfer-duty": "mapa",
  },
  campos: [
    { id: "valor", tipo: "moneda", etiqueta: "Price or value of the property", min: 0, porDefecto: 1500000 },
    { id: "ciudadano", tipo: "si-no", etiqueta: "The buyer is a citizen of Botswana", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.valor <= 0) throw new ErrorEntrada("Enter the price of the property.", "valor");
    const base = entrada.ciudadano ? Math.max(0, entrada.valor - EXENTO_CIUDADANOS) : entrada.valor;
    const tasa = enMapa(v["bw.transfer-duty"], entrada.ciudadano ? "citizen" : "non-citizen");
    const derecho = redondear(porcentaje(base, tasa));
    return { derecho, base: redondear(base), tasa, total: redondear(entrada.valor + derecho) };
  },
  resultado: [
    { clave: "derecho", etiqueta: "Transfer duty", formato: "moneda", destacada: true },
    { clave: "base", etiqueta: "Value the duty is charged on", formato: "moneda" },
    { clave: "tasa", etiqueta: "Rate", formato: "porcentaje", decimales: 0 },
    { clave: "total", etiqueta: "Price plus transfer duty", formato: "moneda" },
  ],
});
