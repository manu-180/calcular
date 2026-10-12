import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.idu",
  h1: "Calculadora del IDU (impuesto a los dividendos)",
  title: "IDU Paraguay: calculá el impuesto a los dividendos",
  description: "Calculá el IDU sobre dividendos y utilidades: {{py.idu-tasa[residente]}} si quien cobra vive en Paraguay y {{py.idu-tasa[no-residente]}} si no. Con lo que queda neto.",
  intro: [
    "El IDU es el impuesto que se paga cuando una empresa reparte dividendos o utilidades a sus dueños, socios o accionistas.",
    "La tasa es del {{py.idu-tasa[residente]}} para residentes en Paraguay y del {{py.idu-tasa[no-residente]}} para no residentes.",
  ],
  comoSeCalcula: [
    "Se toma el monto que se reparte.",
    "Se aplica la tasa según la residencia de quien cobra: {{py.idu-tasa[residente]}} o {{py.idu-tasa[no-residente]}}.",
    "La empresa retiene el impuesto y le paga el resto al socio.",
  ],
  ejemplo: ["Si una sociedad reparte Gs. 100.000.000 a un socio que vive en Paraguay, retiene Gs. 8.000.000 de IDU y le paga Gs. 92.000.000."],
  faq: [
    {
      pregunta: "¿Cuál es la tasa del IDU?",
      respuesta: "{{py.idu-tasa[residente]}} para residentes y {{py.idu-tasa[no-residente]}} para no residentes, incluida la casa matriz del exterior.",
    },
    {
      pregunta: "¿Cuándo se paga el IDU?",
      respuesta: "Cuando la asamblea decide repartir las utilidades o se pagan. En una unipersonal, se considera repartida en el cuarto mes después del cierre, salvo que se reinvierta.",
    },
    {
      pregunta: "¿Las utilidades que se reinvierten pagan IDU?",
      respuesta: "No, mientras se capitalicen o vayan a reservas. Pagan cuando se retira el capital.",
    },
  ],
  glosario: [
    { termino: "IDU", definicion: "Impuesto a los Dividendos y a las Utilidades (Ley 6380/2019)." },
    { termino: "Residente", definicion: "Persona o empresa que tiene su residencia fiscal en Paraguay." },
  ],
});
