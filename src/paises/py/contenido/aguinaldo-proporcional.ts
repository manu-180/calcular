import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.aguinaldo-proporcional",
  h1: "Calculadora de aguinaldo proporcional",
  title: "Aguinaldo proporcional Paraguay 2026: por renuncia o despido",
  description: "Calculá el aguinaldo proporcional que te toca si dejás el trabajo antes de diciembre o si entraste a mitad de año. Con tus fechas exactas.",
  intro: [
    "Si dejás el trabajo antes de fin de año, por renuncia o por despido, te pagan la parte del aguinaldo que ganaste hasta ese día. Lo mismo si entraste a mitad de año.",
    "Poné tu salario y las fechas. Contamos los días trabajados desde el 1 de enero, o desde tu ingreso si fue después.",
  ],
  comoSeCalcula: [
    "Se cuentan los días trabajados en el año, desde el 1 de enero o desde tu ingreso hasta tu último día.",
    "Lo ganado es tu salario mensual por esos días dividido {{py.divisor-salario-diario}}, más horas extra, comisiones y premios.",
    "El aguinaldo proporcional es lo ganado dividido 12.",
  ],
  ejemplo: [
    "Si ganás Gs. 3.000.000 y renunciás el 31 de julio, trabajaste 212 días del año. Ganaste Gs. 21.200.000 y tu aguinaldo proporcional es Gs. 1.766.667.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto me corresponde de aguinaldo por 5 meses de trabajo?",
      respuesta: "Cinco doceavos de tu salario, más la doceava parte de lo que cobraste aparte (horas extra, comisiones). Con Gs. 3.000.000 por mes son Gs. 1.250.000.",
    },
    {
      pregunta: "¿Si renuncio me pagan el aguinaldo?",
      respuesta: "Sí. El Código del Trabajo te da la parte proporcional al terminar la relación, sea por renuncia o por despido.",
    },
    {
      pregunta: "¿Cuándo me lo tienen que pagar?",
      respuesta: "Junto con la liquidación, al terminar el trabajo. Si seguís trabajando, el aguinaldo completo se paga antes del 31 de diciembre.",
    },
    {
      pregunta: "¿El aguinaldo proporcional paga IPS?",
      respuesta: "No. El aguinaldo no paga aporte al IPS y no se puede embargar.",
    },
  ],
  glosario: [
    { termino: "Aguinaldo", definicion: "La doceava parte de todo lo ganado en el año (artículo 243 del Código del Trabajo)." },
    { termino: "Proporcional", definicion: "La parte que corresponde a los días trabajados cuando no se completa el año." },
  ],
});
