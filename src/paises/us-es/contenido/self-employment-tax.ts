import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.self-employment-tax",
  h1: "Calculadora del impuesto sobre el trabajo por cuenta propia",
  title: "Impuesto sobre el trabajo por cuenta propia 2026 (Anexo SE)",
  description: "Calcule su impuesto de 2026 sobre el trabajo por cuenta propia para el Seguro Social y Medicare, la deducción de la mitad y lo que debe apartar cada trimestre. Para trabajadores 1099.",
  intro: [
    "Si trabaja como independiente, maneja para una app o tiene un negocio propio, usted paga las dos mitades del Seguro Social y de Medicare. Ese es el impuesto sobre el trabajo por cuenta propia.",
    "Indique su ganancia neta para ver el impuesto, la deducción que recibe por la mitad y un monto trimestral para apartar.",
  ],
  comoSeCalcula: [
    "Solo se grava el {{us.se-earnings-factor}} de su ganancia neta. Si ese monto es menor que {{us.se-minimum}}, no debe nada.",
    "El Seguro Social toma dos veces {{us.social-security-rate}} sobre el ingreso neto hasta {{us.social-security-wage-base}}, menos los salarios W-2 que ya ganó este año.",
    "Medicare toma dos veces {{us.medicare-rate}} sobre todo el ingreso neto. Por encima de {{us.additional-medicare-threshold[single]}} ({{us.additional-medicare-threshold[mfj]}} en una declaración conjunta) se aplica también el impuesto adicional de Medicare de {{us.additional-medicare-rate}}.",
    "La mitad del impuesto se deduce de su ingreso para el impuesto sobre el ingreso.",
  ],
  ejemplo: [
    "Con $50,000 de ganancia se gravan $46,175. El impuesto es de $7,064.78 y usted deduce $3,532.39 al calcular su impuesto sobre el ingreso.",
  ],
  faq: [
    { pregunta: "¿Cuál es la tasa del impuesto sobre el trabajo por cuenta propia?", respuesta: "15.3% del ingreso neto: 12.4% para el Seguro Social hasta la base salarial y 2.9% para Medicare sin límite." },
    { pregunta: "¿Por qué solo se grava una parte de mi ganancia?", respuesta: "Al FICA de un empleado no se le cobra la mitad del empleador. El factor de {{us.se-earnings-factor}} le da a usted el mismo beneficio." },
    { pregunta: "¿Tengo que pagarlo cada trimestre?", respuesta: "Por lo general sí. Si no tiene retención de un cheque que lo cubra, el IRS espera pagos estimados en abril, junio, septiembre y enero. Nuestra calculadora de impuestos estimados trimestrales muestra el monto seguro." },
  ],
  glosario: [
    { termino: "Ingreso neto del trabajo por cuenta propia", definicion: "Su ganancia neta multiplicada por {{us.se-earnings-factor}}." },
    { termino: "Anexo SE (Schedule SE)", definicion: "El formulario del IRS donde se calcula este impuesto. Se presenta con el Formulario 1040." },
  ],
});
