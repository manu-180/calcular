import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.trabajo-domestico",
  h1: "Calculadora de trabajo doméstico en Panamá",
  title: "Trabajo doméstico en Panamá: mínimo e indemnización",
  description:
    "Salario mínimo del trabajo doméstico en Panamá: {{pa.salario-minimo-domestico@region-1}} en la Región 1 y {{pa.salario-minimo-domestico@region-2}} en la Región 2. Calcula la indemnización y el feriado trabajado.",
  intro: [
    "El trabajo doméstico tiene reglas propias en el Código de Trabajo: su salario mínimo mensual, un recargo del {{pa.recargo-feriado-domestico}} por trabajar en feriado y una indemnización por tramos si el empleador termina la relación sin causa.",
    "Escribe la región, el salario y las fechas. Te mostramos el mínimo vigente, el valor del día y la indemnización que corresponde.",
  ],
  comoSeCalcula: [
    "Salario mínimo: {{pa.salario-minimo-domestico@region-1}} al mes en la Región 1 y {{pa.salario-minimo-domestico@region-2}} en la Región 2.",
    "Salario por día: el mensual por 12, entre 52 semanas y entre 6 días.",
    "Feriado trabajado: el día con un recargo del {{pa.recargo-feriado-domestico}}.",
    "Indemnización sin causa: de dos semanas a tres meses, {{pa.indemnizacion-domestico-semanas[hasta-3-meses]}} semana de salario; de tres meses a un año, {{pa.indemnizacion-domestico-semanas[hasta-1-anio]}} semanas; desde un año, de {{pa.indemnizacion-domestico-meses[1-a-2]}} a {{pa.indemnizacion-domestico-meses[20-o-mas]}} de salario según los años.",
  ],
  ejemplo: [
    "Con B/. 350 al mes en la Región 1 y cuatro años de trabajo, la indemnización sin causa es de tres meses: B/. 1,050. Un feriado trabajado se paga B/. 26.92.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el salario mínimo de una empleada doméstica en Panamá?",
      respuesta: "{{pa.salario-minimo-domestico@region-1}} al mes en la Región 1 y {{pa.salario-minimo-domestico@region-2}} en la Región 2, desde el {{pa.salario-minimo-domestico#desde}}.",
    },
    {
      pregunta: "¿Cuánto hay que pagar si se despide a la empleada doméstica?",
      respuesta: "Depende del tiempo trabajado: desde una semana de salario (de dos semanas a tres meses) hasta siete meses (veinte años o más). Además se da un aviso de {{pa.preaviso-domestico-dias}}.",
    },
    {
      pregunta: "¿La empleada doméstica tiene horario?",
      respuesta: "No tiene horario fijo por ley, pero tiene derecho a descansar de 9 p. m. a 6 a. m., a un día libre por semana, a vacaciones pagadas y a los feriados.",
    },
    {
      pregunta: "¿El salario incluye la comida y la habitación?",
      respuesta: "Sí, salvo que se pacte otra cosa. La comida debe ser sana y suficiente y la habitación, cómoda e higiénica.",
    },
  ],
  glosario: [
    { termino: "Trabajador doméstico", definicion: "Quien hace de forma habitual tareas de aseo, cuidado u otras propias de un hogar." },
    { termino: "Región 1", definicion: "Los distritos que nombra el decreto del salario mínimo, como Panamá, Colón, San Miguelito, David y Santiago." },
  ],
});
