import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.cotizaciones-previsionales",
  h1: "Calculadora de cotizaciones previsionales {{anio}}",
  title: "Cotizaciones previsionales {{anio}}: AFP, salud y cesantía",
  description:
    "Calcula las cotizaciones de un sueldo: AFP ({{cl.cotizacion-afp}} más comisión), salud ({{cl.salud}}), seguro de cesantía y lo que paga el empleador con la reforma ({{cl.cotizacion-empleador-pensiones}}).",
  intro: [
    "Cada mes, de tu sueldo imponible salen cotizaciones para tu pensión, tu salud y el seguro de cesantía. El empleador paga otras cotizaciones aparte, que no salen de tu sueldo.",
    "Acá ves las dos partes por separado, con las tasas vigentes y el tope imponible del día.",
  ],
  comoSeCalcula: [
    "Tu parte: {{cl.cotizacion-afp}} para tu cuenta en la AFP, más la comisión de tu AFP; {{cl.salud}} para salud; y {{cl.cesantia-trabajador}} de seguro de cesantía si tu contrato es indefinido.",
    "La parte del empleador: seguro de cesantía ({{cl.cesantia-empleador[indefinido]}} con contrato indefinido o {{cl.cesantia-empleador[plazo-fijo]}} a plazo fijo), la cotización de la reforma de pensiones ({{cl.cotizacion-empleador-pensiones}}) y el seguro de accidentes ({{cl.accidentes-basica}} más {{cl.sanna}} de la Ley SANNA).",
    "AFP, salud y accidentes se calculan hasta {{cl.tope-imponible}}. El seguro de cesantía, hasta {{cl.tope-imponible-cesantia}}.",
  ],
  ejemplo: [
    "Con $1.500.000 imponible, AFP Uno y contrato indefinido, en octubre de 2026 te descuentan $270.900 y tu empleador paga $102.450 aparte.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto se descuenta de cotizaciones en Chile?",
      respuesta: "Cerca de un 18 % a 19 % del sueldo imponible: 10 % de AFP más la comisión, 7 % de salud y 0,6 % de seguro de cesantía si tu contrato es indefinido.",
    },
    {
      pregunta: "¿La cotización de la reforma de pensiones sale de mi sueldo?",
      respuesta: "No. La paga el empleador por encima de tu sueldo y sube cada agosto.",
    },
    {
      pregunta: "¿Qué pasa si mi plan de Isapre cuesta más del 7 %?",
      respuesta: "Pagas la diferencia, pero acá mostramos solo la cotización legal. Para ver tu líquido con el plan completo, usa la calculadora de sueldo líquido.",
    },
    {
      pregunta: "¿La tasa de accidentes es la misma para todas las empresas?",
      respuesta: "La básica sí. Además existe una cotización adicional que depende del riesgo de la actividad; esa no la incluimos.",
    },
  ],
  glosario: [
    { termino: "Cotización", definicion: "Porcentaje del sueldo que va a la AFP, a salud o al seguro de cesantía." },
    { termino: "SIS", definicion: "Seguro de invalidez y sobrevivencia. Desde agosto de 2026 se paga dentro de la cotización del empleador de la reforma." },
    { termino: "Ley SANNA", definicion: "Seguro para padres y madres de hijos con enfermedades graves. Lo paga el empleador." },
  ],
});
