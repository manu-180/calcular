import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.muerte-del-trabajador",
  h1: "Calculadora de prestaciones por muerte del trabajador en Panamá",
  title: "Muerte del trabajador en Panamá: qué cobra la familia",
  description:
    "Si muere un trabajador en Panamá, su familia cobra salarios pendientes, vacaciones, décimo y prima de antigüedad. Calcula el monto y si pasa de {{pa.muerte-monto-sin-edicto}}.",
  intro: [
    "Cuando un trabajador fallece, el empleador le debe a su familia lo que el trabajador había ganado: salarios pendientes, vacaciones, décimo proporcional y la prima de antigüedad si el contrato era indefinido.",
    "Ese dinero se entrega por medio del juzgado de trabajo, sin juicio de sucesión. Escribe los datos y te mostramos el total y cómo se entrega.",
  ],
  comoSeCalcula: [
    "Prima de antigüedad: {{pa.prima-antiguedad-semanas}} semana de salario por año trabajado, porque se paga por cualquier causa de terminación.",
    "Vacaciones: salario por los meses pendientes, dividido entre {{pa.vacaciones-meses}}.",
    "Décimo proporcional: lo ganado desde el último corte, más las vacaciones, dividido entre {{pa.decimo-divisor}}.",
    "Si el total es de hasta {{pa.muerte-monto-sin-edicto}}, el juez lo entrega sin edicto. Si pasa, primero publica un edicto.",
  ],
  ejemplo: [
    "Con B/. 1,300 al mes, ocho años de servicio, 5 meses de vacaciones pendientes y B/. 400 de salarios sin pagar, la familia recibe B/. 3,645.99.",
  ],
  faq: [
    {
      pregunta: "¿Qué le pagan a la familia si muere un trabajador en Panamá?",
      respuesta: "Los salarios que se le debían, las vacaciones completas o proporcionales, el décimo proporcional y la prima de antigüedad si su contrato era indefinido.",
    },
    {
      pregunta: "¿Quién cobra?",
      respuesta: "Los hijos menores, por medio de quien los represente. Si no hay, el cónyuge o la pareja que vivía con el trabajador. Si tampoco hay, la madre o el padre.",
    },
    {
      pregunta: "¿Hace falta un juicio de sucesión?",
      respuesta: "No. Lo entrega el juez de trabajo. Si el monto pasa de {{pa.muerte-monto-sin-edicto}}, antes publica un edicto de cinco días.",
    },
    {
      pregunta: "¿Y el seguro de vida o la pensión?",
      respuesta: "Son aparte. La pensión de sobrevivientes la tramita la familia en la Caja de Seguro Social.",
    },
  ],
  glosario: [
    { termino: "Edicto", definicion: "Aviso público para que se presenten otras personas con derecho al dinero." },
    { termino: "Juicio de sucesión", definicion: "El proceso para repartir una herencia. Para estas prestaciones no hace falta." },
  ],
});
