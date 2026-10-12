import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "co.sancion-extemporaneidad",
  mercado: "co",
  concepto: "propio",
  slug: "sancion-extemporaneidad",
  estado: "publicado",
  requiere: {
    "co.uvt": "numero",
    "co.sancion-extemporaneidad": "mapa",
    "co.sancion-tope-uvt": "numero",
    "co.sancion-minima": "numero",
    "co.sancion-reduccion": "mapa",
  },
  campos: [
    { id: "impuesto", tipo: "moneda", etiqueta: "Impuesto a cargo de la declaración", ayuda: "Si la declaración no tiene impuesto a cargo, déjalo en 0.", min: 0, porDefecto: 0 },
    { id: "meses", tipo: "entero", etiqueta: "Meses de retraso", ayuda: "Cada mes o fracción de mes cuenta como uno.", min: 1, max: 240, porDefecto: 1 },
    { id: "ingresos", tipo: "moneda", etiqueta: "Ingresos brutos del año", ayuda: "Solo se usan si no hay impuesto a cargo.", min: 0, porDefecto: 0 },
    {
      id: "reduccion",
      tipo: "opcion",
      etiqueta: "¿Declaraste tarde en los últimos años?",
      ayuda: "Si la DIAN ya te envió un emplazamiento o un pliego de cargos, no hay reducción.",
      opciones: [
        { valor: "ninguna", etiqueta: "Sí, en el último año (sin reducción)" },
        { valor: "un-anio", etiqueta: "No en el último año, pero sí en el anterior (se paga el 75 %)" },
        { valor: "dos-anios", etiqueta: "No en los dos últimos años (se paga el 50 %)" },
      ],
      porDefecto: "ninguna",
    },
    { id: "saldoFavor", tipo: "moneda", etiqueta: "Saldo a favor de la declaración", ayuda: "Solo se usa si no hay impuesto a cargo.", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.meses < 1) throw new ErrorEntrada("El retraso es de al menos un mes.", "meses");
    const t = valores["co.sancion-extemporaneidad"];
    const uvt = valores["co.uvt"];
    let calculada: number;
    let tope: number;
    if (entrada.impuesto > 0) {
      calculada = porcentaje(entrada.impuesto, enMapa(t, "impuesto-mes") * entrada.meses);
      tope = porcentaje(entrada.impuesto, enMapa(t, "tope-impuesto"));
    } else {
      calculada = porcentaje(entrada.ingresos, enMapa(t, "ingresos-mes") * entrada.meses);
      const otroTope = entrada.saldoFavor > 0 ? 2 * entrada.saldoFavor : valores["co.sancion-tope-uvt"] * uvt;
      tope = Math.min(porcentaje(entrada.ingresos, enMapa(t, "tope-ingresos")), otroTope);
    }
    const minima = valores["co.sancion-minima"] * uvt;
    const factor = entrada.reduccion === "ninguna" ? 100 : enMapa(valores["co.sancion-reduccion"], entrada.reduccion);
    const conTope = porcentaje(Math.min(calculada, tope), factor);
    const sancion = redondear(Math.max(conTope, minima));
    const observaciones: string[] = [];
    if (conTope < minima) observaciones.push("La sanción calculada da menos que la sanción mínima, así que se paga la mínima.");
    return {
      calculada: redondear(calculada),
      tope: redondear(tope),
      minima,
      factor,
      sancion,
      observaciones,
    };
  },
  resultado: [
    { clave: "calculada", etiqueta: "Sanción por los meses de retraso", formato: "moneda", decimales: 0 },
    { clave: "tope", etiqueta: "Tope de la sanción", formato: "moneda", decimales: 0 },
    { clave: "factor", etiqueta: "Parte de la sanción que pagas", formato: "porcentaje" },
    { clave: "minima", etiqueta: "Sanción mínima", formato: "moneda", decimales: 0 },
    { clave: "sancion", etiqueta: "Sanción a pagar", formato: "moneda", decimales: 0, destacada: true },
  ],
});
