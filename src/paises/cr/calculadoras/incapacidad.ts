import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.incapacidad",
  mercado: "cr",
  concepto: "propio",
  slug: "incapacidad",
  estado: "publicado",
  requiere: {
    "cr.dias-mes-planilla": "numero",
    "cr.ccss-sem-trabajador": "numero",
    "cr.ccss-sem-patrono": "numero",
    "cr.ccss-sem-estado": "numero",
    "cr.subsidio-veces-aporte": "numero",
    "cr.subsidio-dia-inicio": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario promedio de los últimos 12 meses",
      ayuda: "Bruto, como lo reporta el patrono a la Caja. Deje afuera los meses con incapacidades o licencias.",
      min: 0,
    },
    { id: "dias", tipo: "entero", etiqueta: "Días de incapacidad", min: 1, max: 365, porDefecto: 7 },
    {
      id: "prorroga",
      tipo: "si-no",
      etiqueta: "Es una prórroga de otra incapacidad que terminó hace 30 días o menos",
      porDefecto: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    // El subsidio es de hasta cuatro veces el aporte total al Seguro de Salud (art. 36 del reglamento).
    const porcentajeSubsidio =
      valores["cr.subsidio-veces-aporte"] * (valores["cr.ccss-sem-trabajador"] + valores["cr.ccss-sem-patrono"] + valores["cr.ccss-sem-estado"]);
    const diario = entrada.salario / valores["cr.dias-mes-planilla"];
    const subsidioDiario = redondear((diario * porcentajeSubsidio) / 100);
    const sinSubsidio = entrada.prorroga ? 0 : Math.min(entrada.dias, valores["cr.subsidio-dia-inicio"] - 1);
    const diasPagados = entrada.dias - sinSubsidio;
    const observaciones = [
      "Para cobrar el subsidio tiene que haber cotizado el mes anterior y 6 cuotas en los últimos 12 meses.",
      "La Caja divide cada mes entre sus días reales. Usamos 30 días por mes, así que el monto puede variar unos colones.",
    ];
    if (sinSubsidio > 0) observaciones.push(`La Caja no paga los primeros ${sinSubsidio === 1 ? "día" : `${sinSubsidio} días`}. Consulte con su patrono cómo se cubren.`);
    return {
      porcentaje: redondear(porcentajeSubsidio),
      subsidioDiario,
      diasSinSubsidio: sinSubsidio,
      diasPagados,
      subsidio: redondear(subsidioDiario * diasPagados),
      observaciones,
    };
  },
  resultado: [
    { clave: "porcentaje", etiqueta: "Porcentaje del salario que paga la Caja", formato: "porcentaje" },
    { clave: "subsidioDiario", etiqueta: "Subsidio por día", formato: "moneda" },
    { clave: "diasSinSubsidio", etiqueta: "Días que no paga la Caja", formato: "dias", ocultarSiCero: true },
    { clave: "diasPagados", etiqueta: "Días con subsidio", formato: "dias" },
    { clave: "subsidio", etiqueta: "Subsidio total de la CCSS", formato: "moneda", destacada: true },
  ],
});
