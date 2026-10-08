import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.horas-extras",
  h1: "Calculadora de horas extras y recargos 2026",
  title: "Calculadora de horas extras y recargos 2026 en Colombia",
  description:
    "Calcula horas extras, recargo nocturno, dominical y festivo con la jornada de {{co.jornada-semanal}} y el recargo dominical del {{co.recargo-dominical}} (Ley 2466). Pon tu salario y tus horas.",
  intro: [
    "La hora extra diurna se paga con un recargo del {{co.recargos[extra-diurna]}} y la nocturna del {{co.recargos[extra-nocturna]}}. El trabajo en domingo o festivo tiene hoy un recargo del {{co.recargo-dominical}}.",
    "El valor de tu hora sale de tu salario y de la jornada de {{co.jornada-semanal}}. Escribe tus horas del mes y te mostramos cuánto suma cada tipo.",
  ],
  comoSeCalcula: [
    "Valor de la hora: tu salario dividido por las horas del mes. Con la jornada de {{co.jornada-semanal}} a la semana, se toman las horas de la semana divididas por 6 días y multiplicadas por 30.",
    "Hora extra diurna: la hora más el {{co.recargos[extra-diurna]}}. Hora extra nocturna: la hora más el {{co.recargos[extra-nocturna]}}.",
    "Hora nocturna dentro de tu jornada: solo se paga el recargo del {{co.recargos[nocturno]}}, porque la hora ya está en tu salario.",
    "Domingo o festivo: la hora más el {{co.recargo-dominical}}. Si además es de noche o es extra, se suman los recargos.",
    "La noche va de las 7:00 p. m. a las 6:00 a. m.",
  ],
  ejemplo: [
    "Con un salario de $2.100.000 y la jornada de {{co.jornada-semanal}}, la hora vale $10.000. Una hora extra diurna se paga a $12.500 y una nocturna a $17.500.",
    "Con el salario mínimo de 2026, la hora ordinaria vale $8.338 y una hora extra diurna, $10.422.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calcula el valor de una hora extra?",
      respuesta: "Divide tu salario por las horas del mes para sacar el valor de tu hora. Luego súmale el recargo: {{co.recargos[extra-diurna]}} si es diurna y {{co.recargos[extra-nocturna]}} si es nocturna.",
    },
    {
      pregunta: "¿Cuánto es el recargo por trabajar un domingo?",
      respuesta: "Hoy es el {{co.recargo-dominical}}, vigente desde el {{co.recargo-dominical#desde}}. Sube al 100 % el 1 de julio de 2027.",
    },
    {
      pregunta: "¿Desde qué hora es trabajo nocturno?",
      respuesta: "Desde las 7:00 p. m. hasta las 6:00 a. m. Este horario rige desde el 25 de diciembre de 2025 (Ley 2466 de 2025, artículo 10).",
    },
    {
      pregunta: "¿Cuántas horas extras puedo trabajar?",
      respuesta: "Como máximo 2 horas extra al día y 12 a la semana (Ley 2466 de 2025, artículo 13).",
    },
    {
      pregunta: "¿Por qué cambió el valor de mi hora?",
      respuesta: "Porque la jornada máxima bajó. Desde el {{co.jornada-semanal#desde}} es de {{co.jornada-semanal}} a la semana, y tu salario se reparte entre menos horas.",
    },
  ],
  glosario: [
    { termino: "Recargo", definicion: "Porcentaje que se suma al valor de la hora por trabajar de noche, en domingo o festivo, o más allá de la jornada." },
    { termino: "Jornada máxima", definicion: "Las horas que se pueden trabajar a la semana sin que sean extra." },
    { termino: "Día de descanso obligatorio", definicion: "El domingo, salvo que pactes por escrito otro día. Los festivos tienen el mismo recargo." },
  ],
});
