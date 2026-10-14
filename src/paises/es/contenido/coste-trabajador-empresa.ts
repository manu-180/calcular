import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.coste-trabajador",
  h1: "Calculadora del coste de un trabajador para la empresa",
  title: "Coste de un trabajador para la empresa en 2026",
  description:
    "Calcula cuánto le cuesta a la empresa un trabajador en 2026: sueldo bruto más la Seguridad Social a cargo de la empresa, al mes y al año.",
  intro: [
    "Contratar a alguien cuesta bastante más que su sueldo bruto. Encima de lo que cobra el trabajador, la empresa paga su propia cotización a la Seguridad Social.",
    "Esta calculadora suma las dos cosas con los tipos de 2026 para que sepas el coste real de un puesto.",
  ],
  comoSeCalcula: [
    "El sueldo bruto anual se divide entre 12 para tener la base de cotización, con un tope de {{es.base-maxima-cotizacion}} al mes.",
    "Sobre esa base la empresa paga {{es.cotizacion-empresa[contingencias-comunes]}} de contingencias comunes, {{es.cotizacion-empresa[desempleo-indefinido]}} de desempleo ({{es.cotizacion-empresa[desempleo-temporal]}} si el contrato es temporal), {{es.cotizacion-empresa[fogasa]}} de FOGASA, {{es.cotizacion-empresa[formacion]}} de formación y {{es.cotizacion-empresa[mei]}} de MEI.",
    "Se suma el tipo de accidentes de trabajo de la actividad y, si el sueldo pasa de la base máxima, la parte de la empresa de la cotización de solidaridad.",
    "El coste anual es el sueldo bruto más doce cuotas mensuales de la empresa.",
  ],
  ejemplo: [
    "Un trabajador indefinido con 24.000 euros brutos al año le cuesta a la empresa 643 euros al mes de Seguridad Social (con accidentes al 1,5 %).",
    "En total son 31.716 euros al año, un 32,15 % más que su sueldo bruto.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto cuesta un trabajador con un sueldo de 2.000 euros?",
      respuesta: "Si son 2.000 euros al mes en 12 pagas (24.000 al año), unos 2.643 euros al mes para la empresa con contrato indefinido.",
    },
    {
      pregunta: "¿El coste incluye las pagas extra?",
      respuesta: "Sí. Partimos del bruto anual, que ya las incluye, y la cotización se calcula con las pagas prorrateadas.",
    },
    {
      pregunta: "¿Qué no está incluido?",
      respuesta: "Las bonificaciones por contratación, los costes de prevención, formación, vestuario o seguros que fije tu convenio, y las indemnizaciones si el contrato termina.",
    },
  ],
  glosario: [
    { termino: "Coste empresa", definicion: "Sueldo bruto más todas las cotizaciones que paga la empresa por ese trabajador." },
    { termino: "Base máxima", definicion: "Tope mensual de la base de cotización. Por encima solo se paga la cotización de solidaridad." },
  ],
});
