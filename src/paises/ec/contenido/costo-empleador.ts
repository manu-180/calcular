import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.costo-empleador",
  h1: "Calculadora del costo de un trabajador para la empresa",
  title: "Costo de un empleado en Ecuador: IESS, décimos y fondos",
  description:
    "Calcula cuánto le cuesta un sueldo a tu empresa: aporte patronal al IESS de {{ec.aporte-patronal-iess}}, décimo tercero, décimo cuarto y fondos de reserva.",
  intro: [
    "Contratar a alguien cuesta más que su sueldo. Hay que sumar el aporte patronal al IESS, los dos décimos y, desde el segundo año, los fondos de reserva.",
    "Escribe el sueldo y te mostramos el costo por mes y por año.",
  ],
  comoSeCalcula: [
    "Aporte patronal al IESS: {{ec.aporte-patronal-iess}} del sueldo, según la tabla de tasas del IESS para el sector privado.",
    "Décimo tercero: la doceava parte del sueldo. Décimo cuarto: la doceava parte del salario básico unificado ({{ec.sbu}}).",
    "Fondos de reserva: {{ec.fondo-reserva}} del sueldo, desde que el trabajador cumple un año en la empresa.",
    "No incluimos las utilidades, porque dependen de lo que gane la empresa en el año.",
  ],
  ejemplo: ["Un sueldo de USD 1.000 con más de un año en la empresa cuesta USD 1.318,30 por mes y USD 15.819,60 por año."],
  faq: [
    {
      pregunta: "¿Cuánto paga el empleador al IESS?",
      respuesta: "El {{ec.aporte-patronal-iess}} del sueldo en el sector privado. El trabajador aporta aparte el suyo, que se le descuenta.",
    },
    {
      pregunta: "¿Los décimos se cuentan en el costo mensual?",
      respuesta: "Sí, aunque se paguen una vez al año. Repartirlos por mes muestra el costo real y ayuda a tener la plata lista cuando vencen.",
    },
    {
      pregunta: "¿Y las vacaciones?",
      respuesta: "No suman al costo mensual: se pagan con el sueldo normal mientras el trabajador descansa.",
    },
  ],
  glosario: [
    { termino: "IESS", definicion: "Instituto Ecuatoriano de Seguridad Social." },
    { termino: "Fondos de reserva", definicion: "Pago adicional desde el segundo año de trabajo, cada mes o depositado en el IESS." },
    { termino: "SBU", definicion: "Salario básico unificado." },
  ],
});
