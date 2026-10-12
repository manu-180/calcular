import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gt.isr-rentas-de-capital",
  mercado: "gt",
  concepto: "propio",
  slug: "isr-rentas-de-capital",
  estado: "publicado",
  requiere: {
    "gt.isr-rentas-capital": "numero",
    "gt.isr-dividendos": "numero",
    "gt.isr-gastos-arrendamiento": "numero",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Qué tipo de ingreso es",
      opciones: [
        { valor: "alquiler", etiqueta: "Alquiler de un inmueble" },
        { valor: "intereses", etiqueta: "Intereses (depósitos, préstamos, bonos)" },
        { valor: "dividendos", etiqueta: "Dividendos o utilidades de una empresa" },
        { valor: "ganancia", etiqueta: "Ganancia por vender un bien" },
      ],
      porDefecto: "alquiler",
    },
    { id: "monto", tipo: "moneda", etiqueta: "Monto recibido", min: 0, ayuda: "En la venta de un bien, la ganancia: precio de venta menos su costo." },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = entrada.tipo === "dividendos" ? valores["gt.isr-dividendos"] : valores["gt.isr-rentas-capital"];
    const base =
      entrada.tipo === "alquiler" ? redondear(entrada.monto - porcentaje(entrada.monto, valores["gt.isr-gastos-arrendamiento"])) : entrada.monto;
    const isr = redondear(porcentaje(base, tasa));
    const observaciones: string[] = [];
    if (entrada.tipo === "alquiler") observaciones.push("En los alquileres se resta un porcentaje de gastos sin tener que comprobarlos.");
    observaciones.push("Si quien le paga es agente de retención, le descuenta el ISR al pagar y usted no hace nada más.");
    return { base, tasa, isr, neto: redondear(entrada.monto - isr), observaciones };
  },
  resultado: [
    { clave: "base", etiqueta: "Base del impuesto", formato: "moneda" },
    { clave: "tasa", etiqueta: "Tipo impositivo", formato: "porcentaje" },
    { clave: "isr", etiqueta: "ISR", formato: "moneda", destacada: true },
    { clave: "neto", etiqueta: "Le queda", formato: "moneda" },
  ],
});
