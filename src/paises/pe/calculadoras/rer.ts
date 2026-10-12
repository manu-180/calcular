import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "pe.rer",
  mercado: "pe",
  concepto: "propio",
  slug: "rer",
  estado: "publicado",
  requiere: {
    "pe.tasa-rer": "numero",
    "pe.limite-rer": "numero",
  },
  campos: [
    { id: "ingresos", tipo: "moneda", etiqueta: "Ingresos netos del mes", ayuda: "Tus ventas del mes sin IGV, menos devoluciones y descuentos.", min: 0 },
    { id: "acumulado", tipo: "moneda", etiqueta: "Ingresos netos acumulados en el año (con este mes)", min: 0, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const cuota = redondear(porcentaje(entrada.ingresos, valores["pe.tasa-rer"]));
    const observaciones: string[] = [];
    if (entrada.acumulado !== null && entrada.acumulado > valores["pe.limite-rer"]) {
      observaciones.push("Tus ingresos del año superan el límite del RER: tienes que pasar al Régimen MYPE Tributario o al régimen general.");
    }
    observaciones.push("La cuota es cancelatoria: con ella pagas tu impuesto a la renta del mes. El IGV se paga aparte.");
    return { cuota, limite: valores["pe.limite-rer"], observaciones };
  },
  resultado: [
    { clave: "cuota", etiqueta: "Cuota mensual de renta", formato: "moneda", destacada: true },
    { clave: "limite", etiqueta: "Límite de ingresos anuales del RER", formato: "moneda" },
  ],
});
