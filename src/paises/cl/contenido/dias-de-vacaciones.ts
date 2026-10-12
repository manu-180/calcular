import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.dias-de-vacaciones",
  h1: "Calculadora de días de vacaciones: cuándo vuelves",
  title: "Días de vacaciones: calcula tu fecha de regreso",
  description: "Calcula cuándo vuelves al trabajo según tus días hábiles de vacaciones. Los sábados y domingos no se descuentan del feriado de {{cl.feriado-anual}}.",
  intro: [
    "Las vacaciones en Chile se cuentan en días hábiles: los sábados, domingos y festivos no se descuentan. Por eso 15 días hábiles son tres semanas fuera del trabajo.",
    "Escribe el primer día de vacaciones y los días hábiles que vas a tomar. Te decimos tu último día y cuándo vuelves.",
  ],
  comoSeCalcula: [
    "Contamos de lunes a viernes desde tu primer día de vacaciones.",
    "Los sábados y domingos que caen en medio no se descuentan, pero sí estás fuera del trabajo.",
    "Si cae un festivo en día de semana, suma un día más a tu regreso.",
  ],
  ejemplo: ["Si empiezas el lunes 5 de octubre de 2026 y tomas 15 días hábiles, tu último día es el viernes 23 y vuelves el lunes 26 de octubre."],
  faq: [
    {
      pregunta: "¿Cuántos días de vacaciones me corresponden?",
      respuesta: "{{cl.feriado-anual}} hábiles por cada año trabajado. En Magallanes, Aysén y Palena son 20, y desde los 10 años de trabajo se suma el feriado progresivo.",
    },
    {
      pregunta: "¿El sábado cuenta como día de vacaciones?",
      respuesta: "No. Para las vacaciones el sábado es siempre inhábil, aunque trabajes ese día.",
    },
    {
      pregunta: "¿Puedo dividir mis vacaciones?",
      respuesta: "Sí, de común acuerdo con tu empleador, pero al menos 10 días hábiles tienen que ser seguidos.",
    },
    {
      pregunta: "¿Puedo acumular vacaciones?",
      respuesta: "Hasta dos períodos seguidos. Si tienes dos acumulados, tu empleador tiene que darte al menos el primero antes de que cumplas otro año.",
    },
  ],
  glosario: [
    { termino: "Feriado legal", definicion: "Vacaciones pagadas a las que tienes derecho cada año." },
    { termino: "Día hábil", definicion: "Para las vacaciones, de lunes a viernes sin festivos." },
  ],
});
