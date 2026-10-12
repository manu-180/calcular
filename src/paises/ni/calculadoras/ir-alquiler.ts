import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "ni.ir-alquiler",
  mercado: "ni",
  concepto: "propio",
  slug: "ir-alquiler",
  estado: "publicado",
  requiere: {
    "ni.ir-alquiler-deduccion": "numero",
    "ni.ir-rentas-capital": "numero",
  },
  campos: [{ id: "alquiler", tipo: "moneda", etiqueta: "Alquiler mensual cobrado", min: 0 }],
  calcular(entrada, valores, { redondear }) {
    const deduccion = redondear(porcentaje(entrada.alquiler, valores["ni.ir-alquiler-deduccion"]));
    const base = redondear(entrada.alquiler - deduccion);
    const ir = redondear(porcentaje(base, valores["ni.ir-rentas-capital"]));
    return {
      deduccion,
      base,
      ir,
      tasaEfectiva: entrada.alquiler > 0 ? redondear((ir / entrada.alquiler) * 100) : 0,
      neto: redondear(entrada.alquiler - ir),
      observaciones: [
        "Vale para quien alquila como persona, sin que el alquiler sea parte de un negocio. Si es una empresa o tu actividad económica, va por el IR de actividades económicas.",
        "Si quien te paga es agente retenedor, te retiene este IR. Si no, lo declarás y pagás vos hasta el quinto día del mes siguiente.",
        `La deducción del ${valores["ni.ir-alquiler-deduccion"]} % es única: no se pueden restar otros gastos.`,
      ],
    };
  },
  resultado: [
    { clave: "deduccion", etiqueta: "Deducción única", formato: "moneda" },
    { clave: "base", etiqueta: "Base imponible", formato: "moneda" },
    { clave: "ir", etiqueta: "IR del mes", formato: "moneda", destacada: true },
    { clave: "tasaEfectiva", etiqueta: "Tasa efectiva sobre el alquiler", formato: "porcentaje" },
    { clave: "neto", etiqueta: "Lo que te queda", formato: "moneda" },
  ],
});
