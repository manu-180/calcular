import { aplicarEscalaMarginal, definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ie.stamp-duty-calculator",
  mercado: "ie",
  concepto: "propio",
  slug: "stamp-duty-calculator",
  estado: "publicado",
  requiere: {
    "ie.stamp-duty-residential": "escala",
    "ie.stamp-duty-non-residential": "numero",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Price of the property", min: 0, porDefecto: 400000 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Type of property",
      opciones: [
        { valor: "residential", etiqueta: "Residential (a home)" },
        { valor: "non-residential", etiqueta: "Non-residential (commercial property or land)" },
      ],
      porDefecto: "residential",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.precio <= 0) throw new ErrorEntrada("Enter the price of the property.", "precio");
    const residencial = entrada.tipo === "residential";
    const impuesto = redondear(
      residencial ? aplicarEscalaMarginal(v["ie.stamp-duty-residential"], entrada.precio) : (entrada.precio * v["ie.stamp-duty-non-residential"]) / 100,
    );
    const observaciones: string[] = [];
    if (residencial) {
      observaciones.push("A higher rate of 15% applies if you buy ten or more houses (not apartments) in 12 months. Three or more apartments in the same block do not pay the 6% band.");
    }
    return { impuesto, efectiva: (impuesto / entrada.precio) * 100, total: redondear(entrada.precio + impuesto), observaciones };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Stamp Duty", formato: "moneda", destacada: true },
    { clave: "efectiva", etiqueta: "Share of the price", formato: "porcentaje", decimales: 2 },
    { clave: "total", etiqueta: "Price plus Stamp Duty", formato: "moneda" },
  ],
});
