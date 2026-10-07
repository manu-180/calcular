import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.aguinaldo",
  mercado: "uy",
  concepto: "bono-semestral",
  slug: "aguinaldo",
  estado: "publicado",
  requiere: {},
  campos: [
    {
      id: "cuota",
      tipo: "opcion",
      etiqueta: "Qué aguinaldo querés calcular",
      opciones: [
        { valor: "junio", etiqueta: "Junio (lo generado de diciembre a mayo)" },
        { valor: "diciembre", etiqueta: "Diciembre (lo generado de junio a noviembre)" },
        { valor: "egreso", etiqueta: "Al dejar el trabajo (proporcional)" },
      ],
      porDefecto: "diciembre",
    },
    {
      id: "sueldo",
      tipo: "moneda",
      etiqueta: "Sueldo nominal mensual",
      ayuda: "Si tu sueldo cambió en el período, poné el promedio.",
      min: 0,
    },
    {
      id: "meses",
      tipo: "numero",
      etiqueta: "Meses trabajados en el período",
      ayuda: "Hasta 6. Se aceptan fracciones: medio mes es 0,5.",
      min: 0,
      max: 6,
      porDefecto: 6,
    },
    {
      id: "variables",
      tipo: "moneda",
      etiqueta: "Otros cobros en dinero del período",
      ayuda: "Suma de horas extra, comisiones y primas que cobraste en esos meses. Si no tuviste, dejá 0.",
      min: 0,
      porDefecto: 0,
    },
  ],
  calcular(entrada, _valores, { redondear }) {
    if (entrada.meses > 6) throw new ErrorEntrada("Cada cuota de aguinaldo cubre 6 meses como máximo.", "meses");
    const totalPeriodo = redondear(entrada.sueldo * entrada.meses + entrada.variables);
    const aguinaldo = redondear(totalPeriodo / 12);
    const observaciones: string[] = [];
    if (entrada.cuota === "egreso") observaciones.push("Al terminar la relación se cobra la parte generada desde el último aguinaldo, salvo despido por notoria mala conducta.");
    observaciones.push("El monto es nominal. Sobre el aguinaldo se descuentan aportes e IRPF.");
    return { totalPeriodo, aguinaldo, observaciones };
  },
  resultado: [
    { clave: "totalPeriodo", etiqueta: "Total cobrado en el período", formato: "moneda" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo nominal", formato: "moneda", destacada: true },
  ],
});
