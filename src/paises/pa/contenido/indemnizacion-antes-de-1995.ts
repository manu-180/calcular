import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.indemnizacion-antes-de-1995",
  h1: "Calculadora de indemnización para quienes empezaron antes de 1995",
  title: "Indemnización si empezaste antes de 1995 en Panamá",
  description:
    "Si empezaste a trabajar antes del 14 de agosto de 1995, tu indemnización por despido en Panamá sigue otra escala. Calcula las semanas y el monto que te tocan.",
  intro: [
    "La escala de indemnización que usan casi todas las calculadoras vale solo para relaciones que empezaron desde la Ley 44 de 1995. Si tu relación es anterior, se aplica la escala del acápite B del artículo 225, que se reparte por tramos.",
    "Escribe tu salario y tus fechas. Te mostramos las semanas de indemnización y el monto.",
  ],
  comoSeCalcula: [
    "Primer año: una semana de salario por cada {{pa.indemnizacion-escala-b[meses-por-semana-primer-anio]}} meses.",
    "Segundo año: una semana por cada {{pa.indemnizacion-escala-b[meses-por-semana-segundo-anio]}} meses.",
    "De dos a diez años: {{pa.indemnizacion-escala-b[semanas-anios-2-a-10]}} semanas por año.",
    "Después de diez años: {{pa.indemnizacion-escala-b[semanas-desde-anio-11]}} semana por año.",
    "Los años incompletos se pagan en proporción. Nunca menos de {{pa.indemnizacion-escala-b[minimo-semanas]}} semana.",
  ],
  ejemplo: [
    "Con 30 años de trabajo desde enero de 1995 y un salario de B/. 1,300 (B/. 300 por semana): 4 + 6 + 24 + 20 = 54 semanas. Indemnización B/. 16,200.",
  ],
  faq: [
    {
      pregunta: "¿Por qué mi indemnización es distinta si empecé antes de 1995?",
      respuesta: "Porque la Ley 44 de 1995 cambió la escala solo para las relaciones nuevas. Las anteriores siguen con la escala que regía antes.",
    },
    {
      pregunta: "¿Me conviene esta escala?",
      respuesta: "En los dos primeros años da más semanas que la escala nueva. A los diez años las dos llegan a 34 semanas y después las dos suman una semana por año.",
    },
    {
      pregunta: "¿Y si empecé antes de abril de 1972?",
      respuesta: "El tiempo anterior al 2 de abril de 1972 lleva otra escala, que no se combina. Esta calculadora no la cubre: pide el cálculo en el MITRADEL.",
    },
    {
      pregunta: "¿Además me toca la prima de antigüedad?",
      respuesta: "Sí. La prima se paga aparte, por todos los años trabajados.",
    },
  ],
  glosario: [
    { termino: "Ley 44 de 1995", definicion: "La reforma del Código de Trabajo que cambió la escala de indemnización desde el 14 de agosto de 1995." },
    { termino: "Escala combinada", definicion: "Se reparte el tiempo trabajado entre los tramos de la escala y se suman." },
  ],
});
