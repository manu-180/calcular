import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.pension-de-vejez",
  h1: "Calculadora de pensión de vejez en Colpensiones",
  title: "Pensión de vejez {{anio}}: requisitos y monto en Colpensiones",
  description:
    "Revisa si cumples edad y semanas para pensionarte en Colpensiones y estima tu mesada con la fórmula de la Ley 100. Incluye la rebaja de semanas para mujeres.",
  intro: [
    "Para la pensión de vejez en Colpensiones necesitas una edad mínima y un número de semanas cotizadas. Hoy son {{co.pension-edad[mujeres]}} años para las mujeres y {{co.pension-edad[hombres]}} para los hombres.",
    "En 2026 las mujeres necesitan {{co.pension-semanas[mujeres]}} semanas y los hombres {{co.pension-semanas[hombres]}}. La Corte Constitucional ordenó bajar las semanas de las mujeres de forma gradual.",
  ],
  comoSeCalcula: [
    "Se calcula cuántos salarios mínimos es tu ingreso base de liquidación (IBL).",
    "Porcentaje base: {{co.pension-monto[r-base]}} menos {{co.pension-monto[r-por-smmlv]}} por cada salario mínimo de tu IBL, entre {{co.pension-monto[r-minimo]}} y {{co.pension-monto[r-maximo]}}.",
    "Por cada 50 semanas por encima del mínimo se suma {{co.pension-monto[por-50-semanas]}}, hasta un tope de {{co.pension-monto[maximo]}}.",
    "La pensión nunca es menor al salario mínimo ({{co.smmlv}}).",
  ],
  ejemplo: [
    "Un hombre de 62 años con 1.500 semanas y un IBL de $3.000.000 recibe el 70,64 % de su IBL: una pensión de $2.119.299.",
  ],
  faq: [
    {
      pregunta: "¿Cuántas semanas necesito para pensionarme en 2026?",
      respuesta: "Los hombres, {{co.pension-semanas[hombres]}}. Las mujeres, {{co.pension-semanas[mujeres]}} desde el 1 de enero de 2026, por la Sentencia C-197 de 2023.",
    },
    {
      pregunta: "¿Qué es el IBL?",
      respuesta: "El ingreso base de liquidación: el promedio de lo que cotizaste en los últimos 10 años, actualizado con la inflación. Colpensiones lo calcula con tu historia laboral.",
    },
    {
      pregunta: "¿Sirve si estoy en un fondo privado?",
      respuesta: "No. En los fondos privados la pensión depende del ahorro de tu cuenta. Esta calculadora es para Colpensiones (régimen de prima media).",
    },
    {
      pregunta: "¿Cambia algo con la reforma pensional?",
      respuesta: "Sí. La reforma (Ley 2381 de 2024) entra en vigor el 1 de abril de 2027 y cambia las reglas. Hasta entonces rige lo que usa esta calculadora.",
    },
  ],
  glosario: [
    { termino: "Colpensiones", definicion: "El fondo público de pensiones, del régimen de prima media." },
    { termino: "Semanas cotizadas", definicion: "Las semanas en que se pagaron aportes a pensión a tu nombre." },
  ],
});
