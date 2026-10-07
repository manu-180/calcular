import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.horas-extra",
  h1: "Calculadora de horas extra con la jornada de 40 horas",
  title: "Horas extra 2026: dobles, triples y jornada de 40 horas",
  description:
    "Calcula tus horas extra dobles y triples con el límite de {{mx.horas-extra-semana}} por semana de este año, según la reforma de la jornada de 40 horas.",
  intro: [
    "Las horas extra se pagan al doble hasta un límite por semana. Las que pasan ese límite se pagan al triple.",
    "Con la reforma de la jornada de 40 horas, ese límite cambia cada año. Hoy es de {{mx.horas-extra-semana}} por semana y la jornada máxima es de {{mx.jornada-semanal}}.",
  ],
  comoSeCalcula: [
    "Valor de tu hora: tu salario diario entre las horas de tu jornada ({{mx.horas-jornada[diurna]}} la diurna, {{mx.horas-jornada[nocturna]}} la nocturna, {{mx.horas-jornada[mixta]}} la mixta).",
    "Hasta {{mx.horas-extra-semana}} por semana, cada hora extra se paga con {{mx.recargo-hora-doble}} más: es decir, doble.",
    "Las que pasan el límite, hasta {{mx.horas-triples-semana}} más por semana, se pagan con {{mx.recargo-hora-triple}} más: es decir, triple.",
    "La jornada normal más las horas extra nunca pueden pasar de {{mx.maximo-horas-dia}} en un día.",
  ],
  ejemplo: [
    "Con un salario diario de 400 pesos y jornada diurna, tu hora vale 50 pesos. Si trabajas 10 horas extra en una semana de 2026, nueve se pagan dobles (900 pesos) y una triple (150 pesos).",
  ],
  faq: [
    {
      pregunta: "¿Cuándo llega la jornada de 40 horas?",
      respuesta: "La reforma ya está vigente, pero baja por escalones cada 1 de enero hasta llegar a 40 horas en 2030. Este año la jornada máxima es de {{mx.jornada-semanal}}.",
    },
    {
      pregunta: "¿Me pueden obligar a trabajar horas extra?",
      respuesta: "No por encima de lo que permite la ley. Las horas extra son para circunstancias extraordinarias y tienen límites por día y por semana.",
    },
    {
      pregunta: "¿Las horas extra pagan ISR?",
      respuesta: "En parte. Si ganas el salario mínimo, las dobles dentro del límite no pagan ISR. Si ganas más, la mitad de las dobles está exenta, con un tope semanal.",
    },
    {
      pregunta: "¿Qué cambia en 2027?",
      respuesta: "Baja otra vez la jornada máxima y empieza el registro electrónico obligatorio de la jornada en cada empresa.",
    },
  ],
  glosario: [
    { termino: "Hora extra doble", definicion: "Hora extra dentro del límite semanal. Se paga con {{mx.recargo-hora-doble}} más que una hora normal." },
    { termino: "Hora extra triple", definicion: "Hora extra que pasa el límite semanal. Se paga con {{mx.recargo-hora-triple}} más." },
    { termino: "Jornada mixta", definicion: "La que tiene horas de día y de noche, con menos de tres horas y media de noche." },
  ],
});
