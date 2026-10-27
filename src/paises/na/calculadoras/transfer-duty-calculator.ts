import { aplicarEscalaMarginal, definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "na.transfer-duty-calculator",
  mercado: "na",
  concepto: "propio",
  slug: "transfer-duty-calculator",
  estado: "publicado",
  requiere: {
    "na.transfer-duty-natural": "escala",
    "na.transfer-duty-other": "numero",
    "na.stamp-duty-transfer": "mapa",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Purchase price or value of the property", min: 0, porDefecto: 1500000 },
    {
      id: "comprador",
      tipo: "opcion",
      etiqueta: "Buyer",
      opciones: [
        { valor: "natural", etiqueta: "A person (natural person)" },
        { valor: "other", etiqueta: "A company, close corporation or trust" },
      ],
      porDefecto: "natural",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.precio <= 0) throw new ErrorEntrada("Enter the price of the property.", "precio");
    const observaciones = ["Agricultural land has its own transfer duty rates, which this calculator does not cover."];
    if (e.comprador === "other") {
      const derecho = redondear(porcentaje(e.precio, v["na.transfer-duty-other"]));
      observaciones.push("Stamp duty on the transfer deed is not included for buyers that are not natural persons.");
      return { total: derecho, derecho, sellos: null, observaciones };
    }
    const derecho = redondear(aplicarEscalaMarginal(v["na.transfer-duty-natural"], e.precio));
    const sellosMapa = v["na.stamp-duty-transfer"];
    const exceso = Math.max(0, e.precio - enMapa(sellosMapa, "exempt-up-to"));
    const sellos = redondear(Math.ceil(exceso / 1000) * enMapa(sellosMapa, "per-1000"));
    return { total: redondear(derecho + sellos), derecho, sellos, observaciones };
  },
  resultado: [
    { clave: "total", etiqueta: "Transfer duty and stamp duty", formato: "moneda", destacada: true },
    { clave: "derecho", etiqueta: "Transfer duty", formato: "moneda" },
    { clave: "sellos", etiqueta: "Stamp duty on the transfer deed", formato: "moneda" },
  ],
});
