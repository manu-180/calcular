import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.revision-hipoteca-euribor",
  h1: "Revisión de la hipoteca con el euríbor",
  title: "Euríbor hoy: calcula la revisión de tu hipoteca",
  description:
    "Calcula tu nueva cuota con el último euríbor a un año del Banco de España y el diferencial de tu hipoteca variable. Mira cuánto te sube o te baja.",
  intro: [
    "Si tu hipoteca es variable, cada seis meses o cada año el banco revisa el tipo de interés: toma el euríbor de ese momento y le suma tu diferencial.",
    "Esta calculadora usa el euríbor a un año que publica el Banco de España como tipo de referencia oficial y recalcula tu cuota con el capital que te queda.",
  ],
  comoSeCalcula: [
    "Suma el euríbor y tu diferencial. Ese es el nuevo tipo de interés anual.",
    "Con el capital pendiente y los meses que faltan, se recalcula la cuota con el sistema francés, el habitual en España: todas las cuotas iguales hasta la próxima revisión.",
    "Si el tipo saliera negativo, se aplica un 0 %.",
  ],
  ejemplo: [
    "Con 150.000 euros pendientes a 20 años y un diferencial del 0,75 %, el euríbor de septiembre de 2026 (3,247 %) deja el tipo en el 3,997 % y la cuota en 908,73 euros al mes.",
  ],
  faq: [
    {
      pregunta: "¿Qué euríbor se usa en mi revisión?",
      respuesta: "El que diga tu escritura. Lo normal es el euríbor a un año publicado uno o dos meses antes de la fecha de revisión.",
    },
    {
      pregunta: "¿Dónde se publica el euríbor oficial?",
      respuesta: "El Banco de España publica cada mes el euríbor a un año como tipo de referencia oficial del mercado hipotecario, también en el BOE.",
    },
    {
      pregunta: "¿Puedo pasar mi hipoteca a tipo fijo?",
      respuesta: "Sí, negociándolo con tu banco (novación) o llevándola a otro banco (subrogación). Conviene comparar los gastos y el tipo fijo que te ofrecen.",
    },
  ],
  glosario: [
    { termino: "Euríbor", definicion: "Tipo de interés al que se prestan dinero los bancos de la zona euro. El de referencia para hipotecas es el de un año." },
    { termino: "Diferencial", definicion: "Porcentaje fijo que tu banco suma al euríbor durante toda la hipoteca." },
    { termino: "Sistema francés", definicion: "Forma de amortizar en la que todas las cuotas son iguales: al principio se pagan más intereses y al final más capital." },
  ],
});
