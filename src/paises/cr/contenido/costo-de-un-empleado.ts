import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.costo-de-un-empleado",
  h1: "Cuánto cuesta un empleado en Costa Rica",
  title: "Costo de un empleado en Costa Rica {{anio}}: salario y cargas",
  description:
    "Calcule cuánto le cuesta un trabajador al mes y al año: salario, cargas sociales patronales y la reserva del aguinaldo, con los porcentajes vigentes.",
  intro: [
    "Contratar a alguien cuesta más que su salario. El patrono paga cargas sociales encima del salario y, en diciembre, el aguinaldo.",
    "Escriba el salario bruto y le mostramos el costo real por mes y por año.",
  ],
  comoSeCalcula: [
    "Cargas sociales del patrono: {{cr.ccss-sem-patrono}} de salud, {{cr.ccss-ivm-patrono}} de IVM, {{cr.banco-popular-patrono}} de Banco Popular, {{cr.asignaciones-familiares}} de Fodesaf, {{cr.imas}} de IMAS, {{cr.ina}} de INA, {{cr.fcl}} de FCL y {{cr.rop-patrono}} de ROP.",
    "Aguinaldo: un doceavo del salario por cada mes, que se paga en diciembre.",
    "Costo mensual: salario más cargas más la reserva del aguinaldo.",
    "Costo anual: trece salarios (doce más el aguinaldo) y doce meses de cargas.",
  ],
  ejemplo: ["Un salario de ₡1.000.000 le cuesta a la empresa ₡1.351.633,33 por mes y ₡16.219.600 por año, sin la póliza del INS."],
  faq: [
    {
      pregunta: "¿Cuánto paga el patrono de cargas sociales?",
      respuesta: "En 2026, 26,83 % del salario si la empresa paga INA, o 25,33 % si tiene menos de cinco trabajadores permanentes.",
    },
    {
      pregunta: "¿El aguinaldo paga cargas sociales?",
      respuesta: "No. Por eso la calculadora lo suma aparte, sin cargas.",
    },
    {
      pregunta: "¿Qué otros costos no están incluidos?",
      respuesta: "La póliza de riesgos del trabajo del INS, que es obligatoria y depende de la actividad. Tampoco incluye uniformes, equipo ni otros beneficios que dé la empresa.",
    },
  ],
  glosario: [
    { termino: "Cargas sociales", definicion: "Aportes obligatorios que se calculan sobre el salario y van a la Caja y a otras instituciones." },
    { termino: "Reserva del aguinaldo", definicion: "La parte del aguinaldo que se acumula cada mes para pagarlo en diciembre." },
  ],
});
