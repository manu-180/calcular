import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.trabajo-domestico",
  h1: "Calculadora para trabajadoras del hogar en República Dominicana",
  title: "Trabajo doméstico en RD: salario mínimo y regalía {{anio}}",
  description: "Revisa si el salario de una trabajadora del hogar llega al mínimo de {{do.salario-minimo-hogar}} y calcula su salario de Navidad del año.",
  intro: [
    "Las trabajadoras del hogar tienen un salario mínimo propio de {{do.salario-minimo-hogar}} al mes, sin importar el tamaño de la casa.",
    "También tienen derecho al salario de Navidad, a dos semanas de vacaciones pagadas por año y a descanso semanal.",
  ],
  comoSeCalcula: [
    "El salario en efectivo no puede ser menor que {{do.salario-minimo-hogar}}.",
    "El salario de Navidad es lo pagado en efectivo en el año dividido entre 12.",
    "La comida y el alojamiento se consideran parte de la retribución: la ley los estima en la mitad del salario en efectivo.",
  ],
  ejemplo: [
    "Con RD$15,000 al mes y un cálculo al 15 de diciembre de 2026, el salario de Navidad del año es RD$14,375.",
  ],
  faq: [
    { pregunta: "¿Cuál es el salario mínimo de una trabajadora doméstica en 2026?", respuesta: "{{do.salario-minimo-hogar}} al mes, desde el {{do.salario-minimo-hogar#desde}}." },
    { pregunta: "¿Las trabajadoras del hogar cobran regalía?", respuesta: "Sí. El salario de Navidad es la doceava parte de lo que se le pagó en dinero en el año." },
    { pregunta: "¿Cuántas vacaciones tienen?", respuesta: "Dos semanas pagadas cada vez que cumplen un año de servicio." },
    { pregunta: "¿Se puede descontar la comida del salario?", respuesta: "No. La comida y el alojamiento son parte de la retribución, no un descuento." },
  ],
  glosario: [
    { termino: "Trabajadora del hogar", definicion: "Quien hace tareas de cocina, limpieza o cuidado en una casa, sin fines de lucro para el empleador." },
    { termino: "Salario en especie", definicion: "Lo que se da en comida y alojamiento." },
  ],
});
