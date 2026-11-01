import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.subsidio-al-empleo",
  h1: "Calculadora del subsidio para el empleo {{anio}}",
  title: "Subsidio para el empleo {{anio}}: cuánto te toca",
  description:
    "Mira si te toca el subsidio para el empleo y cuánto baja tu ISR por quincena, semana o mes, con el porcentaje de la UMA y el límite de ingreso de {{anio}}.",
  intro: [
    "El subsidio para el empleo baja el ISR que te retienen si ganas poco. En 2026 es el {{mx.subsidio-empleo}} de la UMA mensual y lo reciben quienes ganan hasta {{mx.subsidio-empleo-limite}} al mes.",
    "Ya no es una tabla por tramos: es un monto fijo para todos los que están debajo del límite.",
  ],
  comoSeCalcula: [
    "Lleva tu sueldo a un mes: si cobras por quincena, divide entre 15 y multiplica por 30.4.",
    "Si ese ingreso mensual no pasa de {{mx.subsidio-empleo-limite}}, te toca el subsidio.",
    "El subsidio mensual es {{mx.uma-mensual}} por {{mx.subsidio-empleo}}. Para periodos menores se divide entre 30.4 y se multiplica por los días del periodo.",
    "Se resta del ISR de tu recibo. Si tu ISR es menor, queda en cero y no te pagan la diferencia.",
  ],
  ejemplo: ["Con 5,000 pesos a la quincena tu ingreso mensual es de unos 10,133 pesos, debajo del límite: te toca un subsidio de 264.30 por quincena."],
  faq: [
    {
      pregunta: "¿Cuál es el límite para recibir el subsidio en 2026?",
      respuesta: "Un ingreso de hasta {{mx.subsidio-empleo-limite}} al mes. Si ganas un peso más, no te toca.",
    },
    {
      pregunta: "¿Me dan en efectivo el subsidio que sobra?",
      respuesta: "No. Desde mayo de 2024 el subsidio solo baja tu ISR hasta cero. Lo que sobra no se entrega.",
    },
    {
      pregunta: "¿Les toca a los asimilados a salarios?",
      respuesta: "No. Solo a quienes cobran sueldo por un trabajo subordinado y a servidores públicos.",
    },
    {
      pregunta: "¿Por qué en enero fue distinto?",
      respuesta: "En enero se calculó con la UMA de 2025 y un porcentaje de 15.59 %. Desde febrero se usa la UMA nueva con {{mx.subsidio-empleo}}.",
    },
  ],
  glosario: [{ termino: "Subsidio para el empleo", definicion: "Apoyo fiscal que reduce el ISR de quienes ganan salarios bajos." }],
});
