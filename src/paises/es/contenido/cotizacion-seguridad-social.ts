import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.cotizacion-seguridad-social",
  h1: "Calculadora de cotización a la Seguridad Social {{anio}}",
  title: "Cotización a la Seguridad Social {{anio}}: trabajador y empresa",
  description:
    "Calcula cuánto se cotiza a la Seguridad Social por tu sueldo en {{anio}}: lo que te descuentan a ti y lo que paga la empresa, con MEI y cotización de solidaridad.",
  intro: [
    "Cada mes, de tu sueldo sale una cotización a la Seguridad Social y tu empresa paga otra, bastante más alta. Las dos se calculan sobre la misma base.",
    "Aquí ves el desglose por conceptos con los tipos de la orden de cotización de 2026.",
  ],
  comoSeCalcula: [
    "La base de cotización es tu sueldo mensual con la parte proporcional de las pagas extra, con un tope de {{es.base-maxima-cotizacion}}.",
    "Tú pagas {{es.cotizacion-trabajador[contingencias-comunes]}} de contingencias comunes, {{es.cotizacion-trabajador[desempleo-indefinido]}} de desempleo (o {{es.cotizacion-trabajador[desempleo-temporal]}} con contrato temporal), {{es.cotizacion-trabajador[formacion]}} de formación y {{es.cotizacion-trabajador[mei]}} de MEI.",
    "La empresa paga {{es.cotizacion-empresa[contingencias-comunes]}} de contingencias comunes, {{es.cotizacion-empresa[desempleo-indefinido]}} de desempleo en indefinidos, {{es.cotizacion-empresa[fogasa]}} de FOGASA, {{es.cotizacion-empresa[formacion]}} de formación, {{es.cotizacion-empresa[mei]}} de MEI y el tipo de accidentes de su actividad.",
    "Si tu sueldo pasa de la base máxima, por lo que la supera se paga además la cotización de solidaridad, repartida entre los dos.",
  ],
  ejemplo: [
    "Con 2.000 euros al mes y contrato indefinido, a ti te descuentan 130 euros. La empresa paga 643 euros si su tipo de accidentes es del 1,5 %.",
  ],
  faq: [
    {
      pregunta: "¿Qué porcentaje del sueldo se paga a la Seguridad Social?",
      respuesta: "Con contrato indefinido, el 6,50 % lo pagas tú y algo más del 30 % lo paga la empresa, según su tipo de accidentes de trabajo.",
    },
    {
      pregunta: "¿Qué es el MEI que aparece en la nómina?",
      respuesta: "El Mecanismo de Equidad Intergeneracional. Es una cotización que se destina al fondo de reserva de las pensiones y sube un poco cada año.",
    },
    {
      pregunta: "¿Qué es la cotización de solidaridad?",
      respuesta: "Desde 2025, quien gana más que la base máxima cotiza también por la parte del sueldo que la supera, en tres tramos. Antes esa parte no cotizaba.",
    },
    {
      pregunta: "¿Por qué el contrato temporal cotiza más?",
      respuesta: "Porque el tipo de desempleo es más alto en los contratos de duración determinada, tanto para ti como para la empresa.",
    },
  ],
  glosario: [
    { termino: "Contingencias comunes", definicion: "Cubren la jubilación, la baja por enfermedad común y otras prestaciones que no vienen del trabajo." },
    { termino: "FOGASA", definicion: "Fondo de Garantía Salarial. Paga salarios e indemnizaciones si la empresa no puede hacerlo." },
    { termino: "Tarifa de primas", definicion: "Tabla que fija el tipo de accidentes de trabajo y enfermedades profesionales según la actividad de la empresa." },
  ],
});
