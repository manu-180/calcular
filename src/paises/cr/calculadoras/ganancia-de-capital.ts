import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.ganancia-de-capital",
  mercado: "cr",
  concepto: "propio",
  slug: "ganancia-de-capital",
  estado: "publicado",
  requiere: {
    "cr.ganancia-capital": "mapa",
  },
  campos: [
    { id: "precioVenta", tipo: "moneda", etiqueta: "Precio de venta", min: 0 },
    {
      id: "costo",
      tipo: "moneda",
      etiqueta: "Lo que le costó (compra más mejoras)",
      ayuda: "Precio de compra más las mejoras que pueda demostrar.",
      min: 0,
    },
    { id: "viviendaHabitual", tipo: "si-no", etiqueta: "Es la casa donde vive (vivienda habitual)", porDefecto: false },
    {
      id: "anterior2019",
      tipo: "si-no",
      etiqueta: "Lo compró antes del 1 de julio de 2019 y es la primera vez que lo vende",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.costo > entrada.precioVenta && !entrada.viviendaHabitual) {
      return { ganancia: redondear(entrada.precioVenta - entrada.costo), impuestoGanancia: 0, impuestoOpcion: null, impuesto: 0, observaciones: ["Vendió con pérdida: no hay ganancia de capital que pagar."] };
    }
    if (entrada.precioVenta <= 0) throw new ErrorEntrada("Escriba el precio de venta.", "precioVenta");
    const ganancia = redondear(entrada.precioVenta - entrada.costo);
    if (entrada.viviendaHabitual) {
      return { ganancia, impuestoGanancia: 0, impuestoOpcion: null, impuesto: 0, observaciones: ["La venta de su vivienda habitual está exenta del impuesto sobre las ganancias de capital."] };
    }
    const tasas = valores["cr.ganancia-capital"];
    const impuestoGanancia = redondear(porcentaje(Math.max(0, ganancia), enMapa(tasas, "general")));
    const impuestoOpcion = entrada.anterior2019 ? redondear(porcentaje(entrada.precioVenta, enMapa(tasas, "primera-venta"))) : null;
    const impuesto = impuestoOpcion === null ? impuestoGanancia : Math.min(impuestoGanancia, impuestoOpcion);
    const observaciones: string[] = [];
    if (impuestoOpcion !== null) {
      observaciones.push(impuestoOpcion < impuestoGanancia ? "Le conviene la opción sobre el precio de venta." : "Le conviene pagar sobre la ganancia.");
    }
    return { ganancia, impuestoGanancia, impuestoOpcion, impuesto, observaciones };
  },
  resultado: [
    { clave: "ganancia", etiqueta: "Ganancia de capital", formato: "moneda" },
    { clave: "impuestoGanancia", etiqueta: "Impuesto sobre la ganancia", formato: "moneda" },
    { clave: "impuestoOpcion", etiqueta: "Impuesto con la opción sobre el precio de venta", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Impuesto a pagar", formato: "moneda", destacada: true },
  ],
});
