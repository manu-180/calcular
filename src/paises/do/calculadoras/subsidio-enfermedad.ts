import { definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "do.subsidio-enfermedad",
  mercado: "do",
  concepto: "propio",
  slug: "subsidio-enfermedad",
  estado: "publicado",
  requiere: {
    "do.enfermedad-ambulatoria": "numero",
    "do.enfermedad-hospitalaria": "numero",
    "do.enfermedad-semanas": "numero",
    "do.tope-sfs": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario cotizable promedio de los últimos 6 meses",
      ayuda: "El que reporta tu empleador a la TSS.",
      min: 0,
    },
    {
      id: "atencion",
      tipo: "opcion",
      etiqueta: "Tipo de atención",
      opciones: [
        { valor: "ambulatoria", etiqueta: "Ambulatoria (reposo en casa)" },
        { valor: "hospitalaria", etiqueta: "Hospitalaria (internada o internado)" },
      ],
      porDefecto: "ambulatoria",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const tasa = entrada.atencion === "hospitalaria" ? valores["do.enfermedad-hospitalaria"] : valores["do.enfermedad-ambulatoria"];
    const base = Math.min(entrada.salario, valores["do.tope-sfs"]);
    const observaciones: string[] = [
      "Para cobrarlo hace falta una licencia médica de más de 3 días y haber cotizado los 12 meses seguidos anteriores.",
      `Se paga hasta ${valores["do.enfermedad-semanas"]} semanas. El empleador lo paga en la nómina y la SISALRIL se lo reembolsa.`,
      "Si la licencia es por menos de un mes, recibes la parte que corresponde a esos días.",
    ];
    if (entrada.salario > base) observaciones.push("Tu salario pasa el tope del Seguro Familiar de Salud: el subsidio se calcula sobre el tope.");
    return { tasa, base, mensual: redondear(porcentaje(base, tasa)), observaciones };
  },
  resultado: [
    { clave: "tasa", etiqueta: "Porcentaje del salario", formato: "porcentaje" },
    { clave: "base", etiqueta: "Salario que se toma", formato: "moneda" },
    { clave: "mensual", etiqueta: "Subsidio por cada mes de licencia", formato: "moneda", destacada: true },
  ],
});
