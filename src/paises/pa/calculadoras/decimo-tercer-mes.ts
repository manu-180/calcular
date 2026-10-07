import { definirCalculadora, porcentaje } from "@/motor/calculo";

const PERIODOS = {
  abril: "Del 16 de diciembre al 15 de abril (se paga el 15 de abril)",
  agosto: "Del 16 de abril al 15 de agosto (se paga el 15 de agosto)",
  diciembre: "Del 16 de agosto al 15 de diciembre (se paga el 15 de diciembre)",
} as const;

export default definirCalculadora({
  id: "pa.decimo-tercer-mes",
  mercado: "pa",
  concepto: "bono-semestral",
  slug: "decimo-tercer-mes",
  estado: "publicado",
  requiere: {
    "pa.decimo-divisor": "numero",
    "pa.css-decimo-trabajador": "numero",
  },
  campos: [
    {
      id: "partida",
      tipo: "opcion",
      etiqueta: "Qué partida quieres calcular",
      opciones: [
        { valor: "abril", etiqueta: "Primera partida (15 de abril)" },
        { valor: "agosto", etiqueta: "Segunda partida (15 de agosto)" },
        { valor: "diciembre", etiqueta: "Tercera partida (15 de diciembre)" },
      ],
      porDefecto: "diciembre",
    },
    {
      id: "totalPeriodo",
      tipo: "moneda",
      etiqueta: "Total ganado en esos cuatro meses",
      ayuda: "Salario, horas extra, comisiones y vacaciones del período. Con salario fijo y el período completo, son cuatro salarios.",
      min: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const bruto = redondear(entrada.totalPeriodo / valores["pa.decimo-divisor"]);
    const css = redondear(porcentaje(bruto, valores["pa.css-decimo-trabajador"]));
    return {
      periodo: PERIODOS[entrada.partida],
      bruto,
      css,
      neto: redondear(bruto - css),
      observaciones: [
        "El décimo también paga impuesto sobre la renta si tu salario anual supera el mínimo exento. No lleva seguro educativo.",
      ],
    };
  },
  resultado: [
    { clave: "periodo", etiqueta: "Período que se paga", formato: "texto" },
    { clave: "bruto", etiqueta: "Décimo tercer mes (bruto)", formato: "moneda" },
    { clave: "css", etiqueta: "Descuento de Seguro Social sobre el décimo", formato: "moneda" },
    { clave: "neto", etiqueta: "Décimo a recibir (antes del impuesto sobre la renta)", formato: "moneda", destacada: true },
  ],
});
