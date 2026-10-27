import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.finiquito",
  h1: "Calculadora de finiquito {{anio}} por renuncia o despido",
  title: "Calculadora de finiquito {{anio}}: renuncia voluntaria",
  description:
    "Calcula tu finiquito {{anio}} con tus fechas de entrada y salida: días sin pagar, aguinaldo y vacaciones proporcionales, prima vacacional y de antigüedad. Gratis.",
  intro: [
    "El finiquito es todo lo que tu empresa te debe cuando termina tu trabajo, renuncies o te despidan: días sin pagar, aguinaldo y vacaciones proporcionales y prima vacacional.",
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
  ejemplo: [
    "Entraste el 1 de enero de 2024, ganas 12,000 pesos al mes y renuncias el 30 de junio de 2026. Tu salario diario es de 400 pesos.",
    "Te tocan 2,975.34 pesos de aguinaldo proporcional, 3,173.70 de vacaciones proporcionales y 793.43 de prima vacacional. Tu finiquito por renuncia voluntaria es de 6,942.47 pesos brutos.",
  ],
  faq: [
    {
      pregunta: "¿Qué me toca de finiquito si renuncio?",
      respuesta: "Los días trabajados sin pagar, el aguinaldo proporcional, las vacaciones que no tomaste y su prima vacacional. La prima de antigüedad solo si tienes {{mx.anios-prima-antiguedad-renuncia}} de servicio o más.",
    },
    {
      pregunta: "¿Cuál es la diferencia entre finiquito y liquidación?",
      respuesta: "El finiquito se paga siempre que termina el trabajo. La liquidación es el finiquito más la indemnización por despido injustificado.",
    },
    {
      pregunta: "¿Me toca finiquito si tengo menos de un año?",
      respuesta: "Sí. El aguinaldo, las vacaciones y la prima vacacional se pagan en proporción al tiempo que trabajaste, aunque sean pocos meses.",
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
