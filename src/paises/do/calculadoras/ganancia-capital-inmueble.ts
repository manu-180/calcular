import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.ganancia-capital-inmueble",
  mercado: "do",
  concepto: "propio",
  slug: "ganancia-capital-inmueble",
  estado: "publicado",
  requiere: {
    "do.ganancia-capital-inmuebles": "numero",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Precio de venta del inmueble", min: 0 },
    {
      id: "costo",
      tipo: "moneda",
      etiqueta: "Costo de compra ajustado por inflación",
      ayuda: "Lo que pagaste, más las mejoras, multiplicado por el factor de ajuste por inflación que publica la DGII para el año de compra.",
      min: 0,
    },
    {
      id: "reinversion",
      tipo: "moneda",
      etiqueta: "Monto reinvertido en tu nueva vivienda habitual",
      ayuda: "Solo si vendes tu vivienda habitual y compras otra en los 6 meses siguientes. Si no, deja 0.",
      min: 0,
      porDefecto: 0,
    },
    { id: "mayor65", tipo: "si-no", etiqueta: "Tienes 65 años o más y vendes tu vivienda habitual", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.reinversion > entrada.precio) throw new ErrorEntrada("Lo reinvertido no puede pasar del precio de venta.", "reinversion");
    const ganancia = redondear(Math.max(0, entrada.precio - entrada.costo));
    const exenta = entrada.mayor65 ? ganancia : entrada.precio > 0 ? redondear((ganancia * entrada.reinversion) / entrada.precio) : 0;
    const gravada = redondear(ganancia - exenta);
    const impuesto = redondear(porcentaje(gravada, valores["do.ganancia-capital-inmuebles"]));
    const observaciones: string[] = ["Es un pago único y definitivo. Se liquida dentro de los 6 meses desde que se perfecciona la venta."];
    if (ganancia === 0) observaciones.push("No hay ganancia: el costo ajustado es igual o mayor que el precio de venta.");
    if (entrada.mayor65) observaciones.push("La venta de la vivienda habitual de una persona de 65 años o más está exenta.");
    else if (entrada.reinversion > 0) observaciones.push("La exención es proporcional a lo que reinviertes del precio de venta.");
    return { ganancia, exenta, gravada, impuesto, observaciones };
  },
  resultado: [
    { clave: "ganancia", etiqueta: "Ganancia de capital", formato: "moneda" },
    { clave: "exenta", etiqueta: "Parte exenta", formato: "moneda", ocultarSiCero: true },
    { clave: "gravada", etiqueta: "Ganancia que paga impuesto", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Impuesto a pagar", formato: "moneda", destacada: true },
  ],
});
