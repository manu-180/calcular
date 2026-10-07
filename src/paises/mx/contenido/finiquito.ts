import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.finiquito",
  h1: "Calculadora de finiquito",
  title: "Calculadora de finiquito 2026: renuncia o despido",
  description:
    "Calcula tu finiquito: días sin pagar, aguinaldo y vacaciones proporcionales, prima vacacional y prima de antigüedad. Con la Ley Federal del Trabajo vigente.",
  intro: [
    "El finiquito es lo que tu empresa te debe cuando termina tu trabajo, sin importar el motivo: lo ganado y no pagado.",
    "Si te despidieron sin causa justificada, además te toca una indemnización. Eso es la liquidación, y tiene su propia calculadora.",
  ],
  comoSeCalcula: [
    "Días trabajados sin pagar: tu salario diario por esos días.",
    "Aguinaldo proporcional: {{mx.dias-aguinaldo}} (o los que dé tu empresa) por los días trabajados en el año, entre 365.",
    "Vacaciones: la parte proporcional desde tu último aniversario, más los días de años anteriores que no tomaste.",
    "Prima vacacional: al menos {{mx.prima-vacacional}} del pago de esas vacaciones.",
    "Prima de antigüedad: {{mx.dias-prima-antiguedad}} de salario por año. Si renuncias, solo se paga con {{mx.anios-prima-antiguedad-renuncia}} de servicio o más. Si te despiden, se paga siempre.",
    "Para la prima de antigüedad, el salario diario se topa en {{mx.tope-prima-antiguedad}} veces el salario mínimo de tu zona. Hoy el mínimo es {{mx.salario-minimo@general}} en el resto del país y {{mx.salario-minimo@frontera-norte}} en la frontera norte.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es la diferencia entre finiquito y liquidación?",
      respuesta: "El finiquito se paga siempre que termina el trabajo. La liquidación es el finiquito más la indemnización por despido injustificado.",
    },
    {
      pregunta: "¿Me toca prima de antigüedad si renuncio?",
      respuesta: "Solo si tienes {{mx.anios-prima-antiguedad-renuncia}} de servicio o más. Si te despiden, te toca sin importar los años.",
    },
    {
      pregunta: "¿Tengo que firmar el finiquito para que me paguen?",
      respuesta: "Revisa las cuentas antes de firmar. Si algo no te cuadra, la Procuraduría Federal de la Defensa del Trabajo (PROFEDET) te asesora gratis.",
    },
    {
      pregunta: "¿El finiquito paga impuestos?",
      respuesta: "Sí, en parte. El aguinaldo y la prima vacacional tienen montos exentos. Esta calculadora muestra los montos brutos.",
    },
  ],
  glosario: [
    { termino: "Finiquito", definicion: "Pago de todo lo que se te debe al terminar la relación de trabajo." },
    { termino: "Prima de antigüedad", definicion: "Pago de {{mx.dias-prima-antiguedad}} de salario por año de servicio (artículo 162 de la Ley Federal del Trabajo)." },
    { termino: "Aniversario", definicion: "La fecha en que cumples un año más en la empresa." },
  ],
});
