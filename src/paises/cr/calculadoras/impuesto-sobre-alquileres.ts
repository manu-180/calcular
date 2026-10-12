import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.impuesto-sobre-alquileres",
  mercado: "cr",
  concepto: "propio",
  slug: "impuesto-sobre-alquileres",
  estado: "publicado",
  requiere: {
    "cr.alquiler-deduccion": "numero",
    "cr.renta-capital": "mapa",
  },
  campos: [{ id: "alquiler", tipo: "moneda", etiqueta: "Alquiler cobrado en el mes", ayuda: "El total que paga el inquilino, sin depósitos de garantía.", min: 0 }],
  calcular(entrada, valores, { redondear }) {
    const deduccion = redondear(porcentaje(entrada.alquiler, valores["cr.alquiler-deduccion"]));
    const base = redondear(entrada.alquiler - deduccion);
    const tarifa = enMapa(valores["cr.renta-capital"], "general");
    const impuesto = redondear(porcentaje(base, tarifa));
    return {
      deduccion,
      base,
      impuesto,
      tasaEfectiva: entrada.alquiler > 0 ? redondear((impuesto / entrada.alquiler) * 100) : 0,
      neto: redondear(entrada.alquiler - impuesto),
      anual: redondear(impuesto * 12),
      observaciones: ["La deducción es automática: no hace falta presentar facturas, pero tampoco se puede restar ningún otro gasto."],
    };
  },
  resultado: [
    { clave: "deduccion", etiqueta: "Deducción sin prueba", formato: "moneda" },
    { clave: "base", etiqueta: "Renta imponible", formato: "moneda" },
    { clave: "impuesto", etiqueta: "Impuesto del mes", formato: "moneda", destacada: true },
    { clave: "tasaEfectiva", etiqueta: "Tasa efectiva sobre el alquiler", formato: "porcentaje" },
    { clave: "neto", etiqueta: "Alquiler después del impuesto", formato: "moneda" },
    { clave: "anual", etiqueta: "Impuesto en el año", formato: "moneda" },
  ],
});
