import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.overtime",
  h1: "Calculadora de horas extras",
  title: "Calculadora de horas extras: pago a tiempo y medio",
  description: "Calcula tu pago de horas extras según la ley federal: tiempo y medio por cada hora sobre {{us.overtime-hours}} en la semana laboral, con el total de la semana.",
  intro: [
    "Según la Ley de Normas Justas de Trabajo, la mayoría de los trabajadores por hora gana al menos una vez y media su tarifa normal por las horas sobre {{us.overtime-hours}} en una semana laboral.",
    "Escribe tu tarifa por hora y las horas que trabajaste para ver tu pago de la semana.",
  ],
  comoSeCalcula: [
    "Las horas regulares son las primeras {{us.overtime-hours}} de la semana laboral, pagadas a tu tarifa normal.",
    "Cada hora después de esas se paga a tu tarifa por {{us.overtime-multiplier}}.",
    "La prima es la mitad adicional que ganas en cada hora extra. Es la parte cubierta por la deducción federal de horas extras que califican.",
  ],
  ejemplo: [
    "A $20 la hora y con 45 horas, ganas $800 por las primeras 40 horas y $150 por 5 horas extras a $30. La semana paga $950.",
  ],
  faq: [
    { pregunta: "¿Las horas extras se cuentan por día o por semana?", respuesta: "La ley federal cuenta por semana laboral, un período fijo de 168 horas. Algunos estados pagan también horas extras después de 8 horas en un día." },
    { pregunta: "¿Quién no recibe horas extras?", respuesta: "Los empleados exentos, sobre todo gerentes, administrativos y profesionales asalariados que cumplen las pruebas de salario y funciones del Departamento de Trabajo. Algunos empleos, como ciertos trabajos agrícolas y de transporte, siguen reglas especiales." },
    { pregunta: "¿Los bonos cambian mi tarifa de horas extras?", respuesta: "Muchas veces sí. Los bonos no discrecionales, como los de producción o asistencia, se suman a la tarifa normal antes de calcular las horas extras." },
    { pregunta: "¿Las horas extras pagan impuestos?", respuesta: "Sí, se retienen como el pago normal. De 2025 a 2028 puedes deducir la parte de la prima en tu declaración federal, hasta un tope anual." },
  ],
  glosario: [
    { termino: "Semana laboral", definicion: "Siete días seguidos de 24 horas que fija tu empleador. Las horas extras se cuentan dentro de cada semana laboral." },
    { termino: "Tarifa normal", definicion: "Tu pago por hora más ciertos bonos y diferenciales de turno, que se usa para calcular la tarifa de horas extras." },
  ],
});
