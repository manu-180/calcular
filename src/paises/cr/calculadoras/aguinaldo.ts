import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.aguinaldo",
  mercado: "cr",
  concepto: "bono-semestral",
  slug: "aguinaldo",
  estado: "publicado",
  requiere: {},
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario bruto mensual",
      ayuda: "Sin rebajos. Si su salario cambió durante el año, use el promedio.",
      min: 0,
    },
    {
      id: "meses",
      tipo: "numero",
      etiqueta: "Meses trabajados entre el 1 de diciembre y el 30 de noviembre",
      ayuda: "Puede usar decimales: medio mes es 0,5.",
      min: 0,
      max: 12,
      porDefecto: 12,
    },
    {
      id: "extras",
      tipo: "moneda",
      etiqueta: "Horas extra, comisiones y bonos del mismo período",
      ayuda: "Si no tuvo, déjelo vacío.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, _valores, { redondear }) {
    if (entrada.meses > 12) throw new ErrorEntrada("El período del aguinaldo tiene 12 meses como máximo.", "meses");
    const extras = entrada.extras ?? 0;
    const devengado = redondear(entrada.salario * entrada.meses + extras);
    const corresponde = entrada.meses >= 1;
    const aguinaldo = corresponde ? redondear(devengado / 12) : 0;
    const observaciones: string[] = [];
    if (!corresponde) observaciones.push("Con menos de un mes trabajado en el período, la Ley 2412 no da derecho a aguinaldo.");
    observaciones.push("El aguinaldo no paga impuesto sobre la renta ni cuotas de la Caja, así que se recibe completo.");
    return { devengado, aguinaldo, observaciones };
  },
  resultado: [
    { clave: "devengado", etiqueta: "Total ganado en el período", formato: "moneda" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo a recibir", formato: "moneda", destacada: true },
  ],
});
