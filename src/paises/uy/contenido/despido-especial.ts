import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.despido-especial",
  h1: "Calculadora de despido especial",
  title: "Despido especial: embarazo, enfermedad o accidente",
  description:
    "Calculá la indemnización especial por despido de una embarazada, durante una enfermedad, tras un accidente de trabajo, por acoso o después de la licencia paternal.",
  intro: [
    "Algunas personas tienen una protección extra contra el despido. Si las despiden igual, además de la indemnización común cobran una indemnización especial.",
    "Elegí tu situación y completá tus datos. Te mostramos la indemnización común, la especial y el total.",
  ],
  comoSeCalcula: [
    "Primero se calcula el despido común: un sueldo por año o fracción, con tope de {{uy.despido-tope-meses}}.",
    "Embarazo: se suman {{uy.despido-embarazo-meses}} de sueldo.",
    "Enfermedad (durante la certificación o en los 30 días del alta): la indemnización común se paga {{uy.despido-enfermedad-factor}} veces.",
    "Accidente de trabajo (si no te reintegran o te despiden antes de 180 días del reintegro): la común se paga {{uy.despido-accidente-factor}} veces.",
    "Acoso sexual, si te considerás despedida o despedido: se suman {{uy.despido-acoso-meses}} de sueldo. Licencia por paternidad o adopción: se suman {{uy.despido-paternidad-meses}}.",
  ],
  ejemplo: ["Una trabajadora embarazada con $ 50.000 de sueldo y 3 años y 7 meses en la empresa cobra $ 227.777,80 de despido común más $ 300.000 especiales: $ 527.777,80."],
  faq: [
    {
      pregunta: "¿Cuánto me corresponde si me despiden embarazada?",
      respuesta: "La indemnización común más {{uy.despido-embarazo-meses}} de sueldo.",
    },
    {
      pregunta: "¿Me pueden despedir estando certificado?",
      respuesta: "No. Si lo hacen, o si te despiden en los 30 días después del alta, la indemnización es {{uy.despido-enfermedad-factor}} veces la común, salvo que prueben notoria mala conducta o que el despido no tuvo que ver con la enfermedad.",
    },
    {
      pregunta: "¿Qué pasa si me despiden después de un accidente de trabajo?",
      respuesta: "La empresa tiene que reintegrarte y no puede despedirte en los 180 días siguientes. Si no te reintegra, la indemnización es {{uy.despido-accidente-factor}} veces la común.",
    },
    {
      pregunta: "¿Estas indemnizaciones pagan IRPF?",
      respuesta: "La indemnización por despido no paga IRPF hasta el mínimo legal. Si cobrás más que ese mínimo, la diferencia paga.",
    },
  ],
  glosario: [
    { termino: "Despido especial", definicion: "Una indemnización extra por despedir a alguien que la ley protege." },
    { termino: "Notoria mala conducta", definicion: "Falta grave que tiene que probar el empleador. Si la prueba, no hay indemnización." },
  ],
});
