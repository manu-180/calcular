import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.embargo-de-salario",
  h1: "Calculadora de embargo de salario en Costa Rica",
  title: "Embargo de salario {{anio}} en Costa Rica: cuánto rebajan",
  description:
    "Calcule cuánto le pueden embargar del salario por una deuda o por pensión alimentaria, con el mínimo inembargable vigente y el artículo 172.",
  intro: [
    "En Costa Rica una parte del salario no se puede embargar: el mínimo inembargable. Sobre lo que pasa de ese mínimo, el embargo tiene un tope.",
    "Escriba su salario líquido y le mostramos cuánto es lo máximo que le pueden rebajar por mes.",
  ],
  comoSeCalcula: [
    "Mínimo inembargable: el menor salario mínimo mensual del decreto de salarios mínimos. Hoy es el de trabajo doméstico, {{cr.salario-minimo-mes[trabajo-domestico]}}.",
    "De lo que pasa del mínimo y hasta {{cr.embargo-multiplo}} veces ese mínimo, se embarga {{cr.embargo-proporciones[hasta-tres-minimos]}}.",
    "De lo que pasa de {{cr.embargo-multiplo}} veces el mínimo, se embarga {{cr.embargo-proporciones[resto]}}.",
    "Por pensión alimentaria se puede embargar hasta {{cr.embargo-proporciones[pension-alimentaria]}} de todo el salario.",
  ],
  ejemplo: ["Con un salario líquido de ₡1.000.000, por una deuda común le pueden embargar hasta ₡115.634,35 al mes."],
  faq: [
    {
      pregunta: "¿Cuánto es el salario inembargable en 2026?",
      respuesta: "{{cr.salario-minimo-mes[trabajo-domestico]}} al mes, el menor salario mínimo mensual del decreto vigente.",
    },
    {
      pregunta: "¿El embargo se calcula sobre el salario bruto?",
      respuesta: "No. Se calcula sobre el salario líquido: lo que queda después de las cuotas de la Caja, el Banco Popular y la renta.",
    },
    {
      pregunta: "¿Pueden embargarme dos veces el mismo salario?",
      respuesta: "Pueden existir varios embargos, pero entre todos no pueden pasar del monto embargable. Lo que sobra queda libre.",
    },
    {
      pregunta: "¿Por pensión alimentaria me pueden dejar menos del mínimo?",
      respuesta: "Sí. La pensión alimentaria es la excepción: puede llegar hasta la mitad del salario, sin respetar el mínimo inembargable.",
    },
  ],
  glosario: [
    { termino: "Salario líquido", definicion: "El salario después de rebajar las cuotas obligatorias de ley." },
    { termino: "Inembargable", definicion: "La parte del salario que ningún acreedor puede tocar, salvo la pensión alimentaria." },
  ],
});
