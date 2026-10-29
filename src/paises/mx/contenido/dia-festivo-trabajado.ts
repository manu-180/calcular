import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.dia-festivo-trabajado",
  h1: "¿Cuánto me pagan por trabajar un día festivo?",
  title: "Día festivo trabajado {{anio}}: cuánto te deben pagar",
  description:
    "Calcula el pago por trabajar un día festivo oficial o tu día de descanso: salario doble además de tu salario normal, según la Ley Federal del Trabajo.",
  intro: [
    "Si trabajas un día de descanso obligatorio o tu día de descanso semanal, tu empresa te debe pagar un salario doble por ese día, además del salario que ya te corresponde. En la práctica cobras ese día al triple.",
    "Escribe tu sueldo y cuántos días trabajaste para ver el pago extra.",
  ],
  comoSeCalcula: [
    "Saca tu salario diario: sueldo mensual entre 30, quincenal entre 15 o semanal entre 7.",
    "El pago extra por cada día es tu salario diario por {{mx.pago-descanso-trabajado}}.",
    "Ese extra se suma a tu sueldo normal, que ya incluye el pago del día de descanso.",
  ],
  ejemplo: ["Con 15,000 pesos al mes tu salario diario es de 500. Si trabajas el 16 de septiembre te deben 1,000 pesos extra: ese día cobras 1,500 en total."],
  faq: [
    {
      pregunta: "¿Cuáles son los días de descanso obligatorio en México?",
      respuesta:
        "El 1 de enero, el primer lunes de febrero, el tercer lunes de marzo, el 1 de mayo, el 16 de septiembre, el tercer lunes de noviembre, el 25 de diciembre, el 1 de octubre cada seis años cuando cambia el Ejecutivo Federal y los días de elecciones que fijen las leyes electorales.",
    },
    {
      pregunta: "¿Me pueden obligar a trabajar un día festivo?",
      respuesta: "Tu empresa y los trabajadores acuerdan cuántas personas trabajan ese día. Si te toca, estás obligado a ir, pero con el pago doble aparte.",
    },
    {
      pregunta: "¿Pueden darme otro día libre en lugar de pagarme?",
      respuesta: "No es lo que dice la ley: el trabajo en un día de descanso obligatorio se paga con salario doble además del salario normal.",
    },
    {
      pregunta: "¿Y si el festivo cae en domingo?",
      respuesta: "Además del pago doble te toca la prima dominical por trabajar en domingo.",
    },
  ],
  glosario: [
    { termino: "Día de descanso obligatorio", definicion: "Los días festivos que fija la Ley Federal del Trabajo en su artículo 74." },
    { termino: "Salario doble", definicion: "Pago adicional de dos veces el salario diario por trabajar un día de descanso (artículos 73 y 75)." },
  ],
});
