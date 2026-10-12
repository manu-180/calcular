import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.renta-primera",
  mercado: "pe",
  concepto: "propio",
  slug: "renta-de-primera-categoria",
  estado: "publicado",
  requiere: {
    "pe.tasa-renta-capital": "numero",
    "pe.deduccion-renta-capital": "numero",
  },
  campos: [
    { id: "alquiler", tipo: "moneda", etiqueta: "Alquiler mensual que cobras", ayuda: "Lo que te paga tu inquilino cada mes.", min: 0 },
    { id: "meses", tipo: "entero", etiqueta: "Meses alquilados en el año", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.meses < 1 || entrada.meses > 12) throw new ErrorEntrada("Un año tiene entre 1 y 12 meses de alquiler.", "meses");
    const deduccion = redondear(porcentaje(entrada.alquiler, valores["pe.deduccion-renta-capital"]));
    const rentaNeta = redondear(entrada.alquiler - deduccion);
    const mensual = redondear(porcentaje(rentaNeta, valores["pe.tasa-renta-capital"]));
    const anual = redondear(mensual * entrada.meses);
    return {
      deduccion,
      rentaNeta,
      mensual,
      anual,
      tasaEfectiva: entrada.alquiler > 0 ? (mensual / entrada.alquiler) * 100 : 0,
      observaciones: [
        "Lo pagas cada mes con el formulario 1683 (recibo por arrendamiento) en SUNAT Virtual, según tu cronograma.",
      ],
    };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Impuesto a pagar cada mes", formato: "moneda", destacada: true },
    { clave: "deduccion", etiqueta: "Deducción del alquiler", formato: "moneda" },
    { clave: "rentaNeta", etiqueta: "Renta neta mensual", formato: "moneda" },
    { clave: "anual", etiqueta: "Impuesto en el año", formato: "moneda" },
    { clave: "tasaEfectiva", etiqueta: "Lo que representa sobre el alquiler", formato: "porcentaje", decimales: 2 },
  ],
});
