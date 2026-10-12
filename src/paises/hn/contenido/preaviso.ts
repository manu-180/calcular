import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.preaviso",
  h1: "Calculadora del preaviso en Honduras",
  title: "Preaviso en Honduras: cuántos días y cuánto se paga",
  description: "Calcule los días de preaviso según su antigüedad y lo que se paga si el patrono o el trabajador no lo dan, con el Código del Trabajo.",
  intro: [
    "El preaviso es el aviso por escrito que da quien termina un contrato por tiempo indefinido. Su duración depende del tiempo trabajado.",
    "Si el patrono no lo da, le paga el salario de esos días. Si el que no lo da es el trabajador, debe la mitad.",
  ],
  comoSeCalcula: [
    "Se cuenta el tiempo trabajado hasta el día del aviso.",
    "Días de preaviso: {{hn.preaviso-dias[menos-de-3-meses]}} con menos de 3 meses, {{hn.preaviso-dias[3-a-6-meses]}} de 3 a 6 meses, {{hn.preaviso-dias[6-a-12-meses]}} de 6 meses a 1 año, {{hn.preaviso-dias[1-a-2-anios]}} de 1 a 2 años y {{hn.preaviso-dias[mas-de-2-anios]}} con más de 2 años.",
    "Salario del preaviso = salario promedio / 30 × días de preaviso.",
    "Si no se da: el patrono paga el {{hn.preaviso-omitido[patrono]}} de ese salario y el trabajador el {{hn.preaviso-omitido[trabajador]}}.",
  ],
  ejemplo: ["Gana L15,000 y lo despiden después de 6 años sin preaviso. Le corresponden 60 días: 500 × 60 = L30,000."],
  faq: [
    {
      pregunta: "¿Cuántos días de preaviso me corresponden?",
      respuesta: "Depende de su antigüedad: 24 horas con menos de 3 meses, una semana de 3 a 6 meses, dos semanas hasta el año, un mes de 1 a 2 años y dos meses con más de 2 años.",
    },
    {
      pregunta: "¿Tengo que dar preaviso si renuncio?",
      respuesta: "Sí, con los mismos plazos. Si no lo da, el patrono puede reclamarle la mitad del salario del preaviso.",
    },
    {
      pregunta: "¿Puedo faltar durante el preaviso para buscar trabajo?",
      respuesta: "Sí. Si lo están despidiendo, tiene derecho a un día pagado por semana para buscar otro empleo.",
    },
    {
      pregunta: "¿El preaviso se da de palabra?",
      respuesta: "Debe darse por escrito y en persona. Si el contrato es verbal, puede darse de palabra frente a dos testigos, diciendo la causa.",
    },
    {
      pregunta: "¿Hay preaviso en el período de prueba?",
      respuesta: "No. En el período de prueba cualquiera de las partes puede terminar el contrato sin preaviso ni indemnización.",
    },
  ],
  glosario: [
    { termino: "Preaviso", definicion: "El aviso anticipado que da quien termina un contrato por tiempo indefinido (artículo 116 del Código del Trabajo)." },
    { termino: "Salario promedio", definicion: "El promedio de lo que ganó en los últimos seis meses, o en menos tiempo si no llegó a seis." },
  ],
});
