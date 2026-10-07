import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.aguinaldo",
  h1: "Calculadora de aguinaldo",
  title: "Aguinaldo en Paraguay: calculá cuánto te toca",
  description: "Calculá tu aguinaldo con los meses que trabajaste y lo que cobraste de extra. Es la doceava parte de todo lo que ganaste en el año, según el Código del Trabajo.",
  intro: [
    "El aguinaldo es un salario extra por año. Equivale a la doceava parte de todo lo que cobraste entre enero y diciembre.",
    "Poné tu salario, los meses que trabajaste y lo que cobraste aparte (horas extra o comisiones). Si entraste en el año, te sale el proporcional.",
  ],
  comoSeCalcula: [
    "Se suma todo lo que cobraste en el año: salario, horas extra, comisiones y otros pagos.",
    "Ese total se divide entre 12.",
    "Si trabajaste el año completo con el mismo salario, tu aguinaldo es un salario entero.",
    "Si dejás el trabajo antes de diciembre, cobrás la parte proporcional, sea por renuncia o por despido.",
  ],
  ejemplo: ["Si ganás Gs. 3.600.000 por mes y trabajaste 5 meses, tu aguinaldo es 3.600.000 × 5 / 12 = Gs. 1.500.000."],
  faq: [
    {
      pregunta: "¿Hasta cuándo me tienen que pagar el aguinaldo?",
      respuesta: "Antes del 31 de diciembre. Si la relación laboral termina antes, se paga en ese momento.",
    },
    {
      pregunta: "¿Cuánto me corresponde de aguinaldo por 5 meses de trabajo?",
      respuesta: "La doceava parte de lo que cobraste en esos 5 meses. Con salario fijo, es tu salario por 5 y dividido 12.",
    },
    {
      pregunta: "¿Si renuncio cobro aguinaldo?",
      respuesta: "Sí. Al dejar el trabajo, por renuncia o por despido, cobrás el aguinaldo proporcional a lo que ganaste en el año.",
    },
    {
      pregunta: "¿Al aguinaldo le descuentan IPS?",
      respuesta: "No. Además, el aguinaldo no se puede embargar.",
    },
  ],
  glosario: [
    { termino: "Aguinaldo", definicion: "Remuneración anual complementaria. La crea el artículo 243 del Código del Trabajo." },
    { termino: "Proporcional", definicion: "La parte que te toca según el tiempo que trabajaste en el año." },
  ],
});
