import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.aportes-a-la-gestora",
  h1: "Calculadora de aportes a la Gestora",
  title: "Aportes a la Gestora 2026: dependiente e independiente",
  description: "Calcule sus aportes a la Gestora (ex AFP): la parte del trabajador, la del empleador y el Aporte Nacional Solidario. También para independientes y consultores.",
  intro: [
    "Cada mes se aporta a la Gestora Pública de la Seguridad Social de Largo Plazo para la jubilación y los riesgos. El dependiente aporta una parte y su empleador otra; el independiente aporta solo.",
    "Elija cómo aporta y escriba su total ganado o el ingreso que declara.",
  ],
  comoSeCalcula: [
    "Dependiente: cotización {{bo.aportes-laborales[cotizacion]}}, riesgo común {{bo.aportes-laborales[riesgo-comun]}}, comisión {{bo.aportes-laborales[comision]}} y aporte solidario {{bo.aportes-laborales[solidario]}} sobre el total ganado.",
    "Empleador: aporte patronal solidario {{bo.aportes-patronales[solidario]}} y riesgo profesional {{bo.aportes-patronales[riesgo-profesional]}}.",
    "Independiente o consultor: cotización {{bo.aportes-independiente[cotizacion]}}, riesgo común {{bo.aportes-independiente[riesgo-comun]}}, riesgo laboral {{bo.aportes-independiente[riesgo-laboral]}}, aporte solidario {{bo.aportes-independiente[solidario]}} y comisión {{bo.aportes-independiente[comision]}}.",
    "El independiente aporta sobre un ingreso entre {{bo.ingreso-cotizable-independiente[minimo]}} y {{bo.ingreso-cotizable-independiente[maximo]}} salarios mínimos de {{bo.salario-minimo}}.",
    "Si el ingreso pasa de {{bo.ans-umbrales[tramo-1]}}, se suma el Aporte Nacional Solidario por tramos.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto se descuenta para la Gestora?",
      respuesta: "Al dependiente, la suma de cotización, riesgo común, comisión y aporte solidario sobre el total ganado. Si gana más de {{bo.ans-umbrales[tramo-1]}}, también el Aporte Nacional Solidario.",
    },
    {
      pregunta: "¿El aporte del independiente es obligatorio?",
      respuesta: "No. El independiente aporta de forma voluntaria y lo paga él mismo, porque no tiene un empleador que le retenga. Los consultores pueden tener retención del contratante.",
    },
    {
      pregunta: "¿La caja de salud es parte de la Gestora?",
      respuesta: "No. El aporte a la caja de salud lo paga solo el empleador y va a la Caja Nacional de Salud u otra caja, no a la Gestora.",
    },
  ],
  glosario: [
    { termino: "Gestora", definicion: "Gestora Pública de la Seguridad Social de Largo Plazo, que reemplazó a las AFP." },
    { termino: "Aporte Nacional Solidario", definicion: "Aporte extra sobre la parte del ingreso que pasa de ciertos montos, para el fondo solidario." },
    { termino: "Ingreso cotizable", definicion: "El ingreso sobre el que se calculan los aportes." },
  ],
});
