import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.salario-diario",
  h1: "Calculadora de salario diario en República Dominicana",
  title: "Salario diario en RD: cómo se calcula ({{do.divisor-salario-diario}})",
  description: "Pasa tu salario mensual, quincenal o semanal a salario diario y por hora con los divisores del Reglamento del Código de Trabajo: {{do.divisor-salario-diario}}, {{do.divisor-salario-quincenal}} y {{do.divisor-salario-semanal}}.",
  intro: [
    "En República Dominicana el salario diario no se saca dividiendo entre 30. El reglamento del Código de Trabajo fija un divisor para cada forma de pago.",
    "Ese salario diario es la base de las vacaciones, el preaviso, la cesantía, la bonificación y las horas extra.",
  ],
  comoSeCalcula: [
    "Si te pagan por mes, divides el salario entre {{do.divisor-salario-diario}}.",
    "Si te pagan por quincena, entre {{do.divisor-salario-quincenal}}.",
    "Si te pagan por semana, entre {{do.divisor-salario-semanal}}.",
    "El valor de la hora es el salario diario dividido entre las horas de tu jornada.",
  ],
  ejemplo: [
    "Con RD$30,000 al mes, tu salario diario es RD$1,258.92 y tu hora vale RD$157.36 con jornada de 8 horas.",
  ],
  faq: [
    { pregunta: "¿Por qué se divide entre {{do.divisor-salario-diario}} y no entre 30?", respuesta: "Porque se cuentan solo los días laborables del mes en promedio. Lo manda el artículo 32 del Reglamento 258-93." },
    { pregunta: "¿Cómo saco mi salario diario si cobro por quincena?", respuesta: "Divides lo que cobras en la quincena entre {{do.divisor-salario-quincenal}}." },
    { pregunta: "¿Las horas extra cuentan para el salario diario?", respuesta: "No. Solo se usa el salario de las horas ordinarias." },
  ],
  glosario: [
    { termino: "Salario diario", definicion: "Lo que vale un día de trabajo según el reglamento." },
    { termino: "Jornada", definicion: "Las horas de trabajo de un día. El máximo es {{do.jornada-diaria}}." },
  ],
});
