import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.costo-empleador",
  h1: "Calculadora de costo de un empleado en El Salvador",
  title: "Costo de un empleado en El Salvador {{anio}}: calculadora",
  description: "Sepa cuánto le cuesta un trabajador por mes: ISSS patronal del {{sv.isss-patrono}}, AFP del {{sv.afp-patrono}}, aguinaldo, vacaciones y Quincena 25.",
  intro: [
    "Un trabajador le cuesta más que su salario. Como patrono paga el {{sv.isss-patrono}} al ISSS, el {{sv.afp-patrono}} a la AFP y, una vez al año, aguinaldo, vacaciones con recargo y la Quincena 25.",
    "Ponga el salario y la antigüedad. La calculadora reparte los pagos anuales en doce meses para que vea el costo real de cada mes.",
  ],
  comoSeCalcula: [
    "ISSS patronal: {{sv.isss-patrono}} del salario, hasta un salario de {{sv.isss-salario-maximo}}.",
    "AFP patronal: {{sv.afp-patrono}} de todo el salario.",
    "Aguinaldo: {{sv.aguinaldo-dias[uno-a-tres]}}, {{sv.aguinaldo-dias[tres-a-diez]}} o {{sv.aguinaldo-dias[diez-o-mas]}} de salario según la antigüedad, dividido en doce meses.",
    "Vacaciones: {{sv.vacaciones-dias}} de salario más el {{sv.vacaciones-recargo}} de recargo, divididos en doce meses.",
    "Quincena 25: el {{sv.quincena25-porcentaje}} del salario si gana hasta {{sv.quincena25-salario-maximo}}, dividido en doce meses.",
  ],
  ejemplo: ["Un salario de $600 con menos de 3 años le cuesta $780 por mes: $45 de ISSS, $52.50 de AFP y $82.50 de prestaciones anuales repartidas."],
  faq: [
    {
      pregunta: "¿Cuánto paga el patrono de ISSS y AFP?",
      respuesta: "El {{sv.isss-patrono}} del salario al ISSS (con techo de {{sv.isss-salario-maximo}}) y el {{sv.afp-patrono}} a la AFP, sin techo. Esto se paga aparte del salario y no se descuenta al trabajador.",
    },
    {
      pregunta: "¿La Quincena 25 es obligatoria para mi empresa?",
      respuesta: "En 2026 fue voluntaria para las empresas privadas. Desde enero de 2027 es obligatoria para todos los trabajadores que ganan hasta {{sv.quincena25-salario-maximo}}.",
    },
    {
      pregunta: "¿Qué no incluye este cálculo?",
      respuesta: "No incluye el aporte a INSAFORP de las empresas con diez o más trabajadores, ni horas extra, indemnizaciones o beneficios que la empresa dé por su cuenta.",
    },
  ],
  glosario: [
    { termino: "Patrono", definicion: "La persona o empresa que contrata y paga el salario." },
    { termino: "Prestaciones", definicion: "Pagos que manda la ley además del salario: aguinaldo, vacaciones, Quincena 25." },
  ],
});
