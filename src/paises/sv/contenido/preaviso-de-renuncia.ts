import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.preaviso-de-renuncia",
  h1: "Calculadora del preaviso de renuncia",
  title: "Preaviso de renuncia en El Salvador: hasta cuándo avisar",
  description: "Para cobrar la prestación por renuncia tiene que avisar con {{sv.renuncia-preaviso}} de anticipación ({{sv.renuncia-preaviso-jefaturas}} si es jefatura). Calcule la fecha.",
  intro: [
    "Para cobrar la prestación por renuncia voluntaria, la ley le pide un preaviso por escrito: {{sv.renuncia-preaviso}} antes de la fecha en que se va, o {{sv.renuncia-preaviso-jefaturas}} si es director, gerente, jefatura o trabajador especializado.",
    "Ponga la fecha en que quiere que la renuncia se haga efectiva y le decimos hasta cuándo puede avisar y hasta cuándo le tienen que pagar.",
  ],
  comoSeCalcula: [
    "Fecha límite del preaviso: la fecha efectiva de la renuncia menos {{sv.renuncia-preaviso}} (o {{sv.renuncia-preaviso-jefaturas}} en puestos de jefatura).",
    "Pago de la prestación: dentro de los {{sv.renuncia-plazo-pago}} siguientes a la fecha efectiva.",
  ],
  ejemplo: ["Si quiere irse el 31 de octubre de 2026, avise a más tardar el 16 de octubre. Le deben pagar hasta el 15 de noviembre."],
  faq: [
    {
      pregunta: "¿Qué es un trabajador especializado?",
      respuesta: "El que recibió capacitación especial pagada por el patrono para su puesto en los últimos doce meses. Ese trabajador avisa con {{sv.renuncia-preaviso-jefaturas}}.",
    },
    {
      pregunta: "¿El preaviso es lo mismo que la renuncia?",
      respuesta: "No. El preaviso es un aviso por escrito. La renuncia se firma aparte en las hojas del Ministerio de Trabajo o de un juzgado laboral, o en documento autenticado. Puede entregar las dos juntas.",
    },
    {
      pregunta: "¿Qué hago si mi patrono no quiere recibir el preaviso?",
      respuesta: "Está obligado a recibirlo y a darle constancia. Si se niega, presente el preaviso en el Ministerio de Trabajo.",
    },
    {
      pregunta: "¿Y si no pagan la prestación?",
      respuesta: "La negativa a pagarla se presume despido injusto. Puede reclamar en el Ministerio de Trabajo.",
    },
  ],
  glosario: [
    { termino: "Preaviso", definicion: "El aviso por escrito de que va a renunciar, con la anticipación que pide la ley." },
    { termino: "Prestación por renuncia voluntaria", definicion: "El pago que recibe quien renuncia después de un tiempo mínimo con el mismo patrono." },
  ],
});
