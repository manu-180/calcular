import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gt.cuotas-igss",
  mercado: "gt",
  concepto: "aportes-seguridad-social",
  slug: "cuotas-igss",
  estado: "publicado",
  requiere: {
    "gt.igss-laboral-ivs": "numero",
    "gt.igss-laboral-ema": "numero",
    "gt.igss-patronal-ivs": "numero",
    "gt.igss-patronal-ema": "numero",
    "gt.irtra": "numero",
    "gt.intecap": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0, ayuda: "Con horas extra y comisiones, sin la bonificación incentivo." },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasaLaboral = valores["gt.igss-laboral-ivs"] + valores["gt.igss-laboral-ema"];
    const tasaPatronal = valores["gt.igss-patronal-ivs"] + valores["gt.igss-patronal-ema"];
    const laboral = redondear(porcentaje(entrada.salario, tasaLaboral));
    const patronal = redondear(porcentaje(entrada.salario, tasaPatronal));
    const irtra = redondear(porcentaje(entrada.salario, valores["gt.irtra"]));
    const intecap = redondear(porcentaje(entrada.salario, valores["gt.intecap"]));
    const totalPatrono = redondear(patronal + irtra + intecap);
    return {
      tasaLaboral,
      laboral,
      tasaPatronal,
      patronal,
      irtra,
      intecap,
      totalPatrono,
      total: redondear(laboral + totalPatrono),
      observaciones: [
        "La cuota laboral se la descuentan de su salario. Las cuotas patronales, el IRTRA y el INTECAP las paga el patrono aparte.",
        "La bonificación incentivo no paga IGSS.",
      ],
    };
  },
  resultado: [
    { clave: "tasaLaboral", etiqueta: "Tasa laboral", formato: "porcentaje" },
    { clave: "laboral", etiqueta: "Cuota laboral (se la descuentan)", formato: "moneda", destacada: true },
    { clave: "tasaPatronal", etiqueta: "Tasa patronal del IGSS", formato: "porcentaje" },
    { clave: "patronal", etiqueta: "Cuota patronal del IGSS", formato: "moneda" },
    { clave: "irtra", etiqueta: "IRTRA", formato: "moneda" },
    { clave: "intecap", etiqueta: "INTECAP", formato: "moneda" },
    { clave: "totalPatrono", etiqueta: "Total que paga el patrono", formato: "moneda" },
    { clave: "total", etiqueta: "Total que recibe el IGSS por usted", formato: "moneda" },
  ],
});
