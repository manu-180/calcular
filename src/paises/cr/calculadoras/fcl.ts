import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.fcl",
  mercado: "cr",
  concepto: "fondo-cesantia",
  slug: "fcl",
  estado: "publicado",
  requiere: {
    "cr.fcl": "numero",
    "cr.fcl-anios-retiro": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario bruto mensual promedio", min: 0 },
    {
      id: "meses",
      tipo: "entero",
      etiqueta: "Meses trabajados desde su último retiro del FCL",
      ayuda: "Si nunca lo retiró, los meses desde que entró a la empresa.",
      min: 1,
      max: 600,
      porDefecto: 60,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const aporte = redondear(porcentaje(entrada.salario, valores["cr.fcl"]));
    const mesesRetiro = valores["cr.fcl-anios-retiro"] * 12;
    return {
      aporte,
      acumulado: redondear(aporte * entrada.meses),
      mesesParaRetiro: Math.max(0, mesesRetiro - entrada.meses),
      observaciones: [
        "No incluye los rendimientos que paga la operadora de pensiones, así que su saldo real suele ser algo mayor.",
        "Puede retirarlo cada cinco años con el mismo patrono, o completo cuando termina la relación laboral por cualquier causa.",
      ],
    };
  },
  resultado: [
    { clave: "aporte", etiqueta: "Aporte mensual del patrono", formato: "moneda" },
    { clave: "acumulado", etiqueta: "FCL acumulado (sin rendimientos)", formato: "moneda", destacada: true },
    { clave: "mesesParaRetiro", etiqueta: "Meses que faltan para el retiro de los cinco años", formato: "meses" },
  ],
});
