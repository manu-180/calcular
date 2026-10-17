import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ng.treasury-bill-calculator",
  mercado: "ng",
  concepto: "propio",
  slug: "treasury-bill-calculator",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "nominal", tipo: "moneda", etiqueta: "Face value you want at maturity", min: 0, porDefecto: 1000000 },
    { id: "descuento", tipo: "porcentaje", etiqueta: "Discount rate (stop rate) a year", min: 0, max: 60, porDefecto: 18 },
    {
      id: "dias",
      tipo: "opcion",
      etiqueta: "Tenor",
      opciones: [
        { valor: "91", etiqueta: "91 days" },
        { valor: "182", etiqueta: "182 days" },
        { valor: "364", etiqueta: "364 days" },
      ],
      porDefecto: "364",
    },
  ],
  calcular(entrada, _v, { redondear }) {
    const dias = Number(entrada.dias);
    const factor = (entrada.descuento / 100) * (dias / 365);
    if (factor >= 1) throw new ErrorEntrada("That discount rate is too high for this tenor.", "descuento");
    if (entrada.nominal <= 0) throw new ErrorEntrada("Enter the face value.", "nominal");
    const precio = entrada.nominal * (1 - factor);
    return {
      precio: redondear(precio),
      descuento: redondear(entrada.nominal - precio),
      rendimiento: (entrada.descuento / (1 - factor)),
    };
  },
  resultado: [
    { clave: "precio", etiqueta: "You pay today", formato: "moneda", destacada: true },
    { clave: "descuento", etiqueta: "Your earnings at maturity", formato: "moneda" },
    { clave: "rendimiento", etiqueta: "True yield a year", formato: "porcentaje", decimales: 2 },
  ],
});
