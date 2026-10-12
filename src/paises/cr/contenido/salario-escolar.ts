import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.salario-escolar",
  h1: "Calculadora de salario escolar en el sector privado",
  title: "Salario escolar sector privado Costa Rica: cuánto recibe",
  description:
    "Calcule su salario escolar: un ahorro de entre {{cr.salario-escolar[minimo]}} y {{cr.salario-escolar[maximo]}} de su salario que recibe junto en enero, para la entrada a clases.",
  intro: [
    "En el sector privado el salario escolar es voluntario: usted elige ahorrar entre {{cr.salario-escolar[minimo]}} y {{cr.salario-escolar[maximo]}} de su salario cada mes.",
    "El patrono lo guarda y se lo entrega todo junto en los primeros quince días de enero. Escriba su salario y el porcentaje para ver cuánto recibe.",
  ],
  comoSeCalcula: [
    "Ahorro mensual: el porcentaje elegido sobre su salario bruto.",
    "Salario escolar: el ahorro mensual por los meses en que ahorró.",
  ],
  ejemplo: ["Si gana ₡600.000 y ahorra 8,33 % todo el año, recibe ₡599.760 de salario escolar."],
  faq: [
    {
      pregunta: "¿El salario escolar es obligatorio en la empresa privada?",
      respuesta: "No. El patrono tiene que ofrecerlo, pero usted decide si se acoge y qué porcentaje ahorra.",
    },
    {
      pregunta: "¿Qué pasa si renuncio antes de enero?",
      respuesta: "Si trabajó al menos un mes, lo ahorrado se le paga en la fecha oficial de pago del salario escolar.",
    },
    {
      pregunta: "¿Paga renta?",
      respuesta: "No. El impuesto y las cargas ya se rebajaron del salario bruto, así que el salario escolar no se vuelve a rebajar. Además es inembargable.",
    },
  ],
  glosario: [{ termino: "Salario escolar", definicion: "Un ahorro de la persona trabajadora que se entrega a inicios de año para gastos de estudio." }],
});
