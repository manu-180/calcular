import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.gastos-deducibles",
  h1: "Calculadora de gastos deducibles (deducción de 3 UIT)",
  title: "Gastos deducibles {{anio}}: calcula tu devolución de impuestos",
  description:
    "Calcula cuánto te deduces por restaurantes ({{pe.gasto-deducible[restaurantes]}}), alquiler y médicos ({{pe.gasto-deducible[alquiler]}}) hasta 3 UIT, y cuánto impuesto ahorras o te devuelve SUNAT.",
  intro: [
    "Si ganas más de 7 UIT al año por tu trabajo, puedes restar de tus ingresos parte de lo que gastas en restaurantes, alquiler, médicos y otros servicios. Eso baja tu impuesto y muchas veces termina en devolución.",
    "Pon tus ingresos del año y tus gastos. Te decimos cuánto se deduce, hasta el tope de 3 UIT, y cuánto impuesto te ahorras.",
  ],
  comoSeCalcula: [
    "De cada gasto se deduce un porcentaje: {{pe.gasto-deducible[restaurantes]}} en restaurantes, bares y hoteles; {{pe.gasto-deducible[medicos]}} en médicos y odontólogos; {{pe.gasto-deducible[servicios]}} en otros profesionales con recibo por honorarios; {{pe.gasto-deducible[alquiler]}} del alquiler; y {{pe.gasto-deducible[essalud-hogar]}} del EsSalud de tu trabajadora del hogar.",
    "La suma no puede pasar de {{pe.tope-gastos-deducibles}}, que con la UIT de {{pe.uit}} son S/ 16,500.",
    "Esa deducción se resta de tus ingresos después de las {{pe.deduccion-renta-trabajo}} que todos restan, y el impuesto se calcula con la escala de 8 % a 30 %.",
  ],
  ejemplo: [
    "Ganas S/ 70,900 en el año, pagas S/ 12,000 de alquiler y gastas S/ 8,000 en restaurantes. Te deduces S/ 3,600 más S/ 1,200: tu impuesto baja de S/ 2,886 a S/ 2,214. Te ahorras S/ 672.",
  ],
  faq: [
    {
      pregunta: "¿Qué gastos puedo deducir en 2026?",
      respuesta: "Restaurantes, bares y hoteles; médicos y odontólogos; profesionales y oficios que emiten recibo por honorarios; el alquiler de tu vivienda; y el EsSalud de tu trabajadora del hogar.",
    },
    {
      pregunta: "¿Qué requisitos tienen que cumplir los comprobantes?",
      respuesta: "Tienen que ser electrónicos y llevar tu DNI o RUC en el campo correcto. Desde S/ 2,000 tienes que pagar con tarjeta, transferencia o depósito.",
    },
    {
      pregunta: "¿Cuándo me devuelven el impuesto?",
      respuesta: "Cuando presentas tu declaración anual de renta, según el cronograma de SUNAT del año siguiente. Si te retuvieron de más, SUNAT te devuelve la diferencia.",
    },
    {
      pregunta: "¿Puedo compartir la deducción del alquiler con mi pareja?",
      respuesta: "Puedes atribuir a tu cónyuge o conviviente hasta el 50 % del gasto de alquiler, aunque el comprobante esté a tu nombre.",
    },
  ],
  glosario: [
    { termino: "Deducción adicional de 3 UIT", definicion: "Monto que restas de tus ingresos por ciertos gastos personales, además de las 7 UIT fijas." },
    { termino: "Renta de trabajo", definicion: "La suma de tus ingresos de cuarta categoría (honorarios) y de quinta categoría (planilla)." },
  ],
});
