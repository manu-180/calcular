import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.antiguedad-laboral",
  h1: "Calculadora de antigüedad laboral",
  title: "Antigüedad laboral: calcula tus años, días y vacaciones",
  description:
    "Calcula tu antigüedad en el trabajo en años y días, los días de vacaciones que te tocan según la LFT y los días de prima de antigüedad que llevas acumulados.",
  intro: [
    "Tu antigüedad define cuántos días de vacaciones te tocan, si tienes derecho a prima de antigüedad al renunciar y cuánto cobras en un finiquito o una liquidación.",
    "Escribe la fecha en que entraste y la fecha de corte (hoy o tu último día).",
  ],
  comoSeCalcula: [
    "Contamos los años completos por aniversario, y los días desde el último aniversario.",
    "Las vacaciones salen de la tabla de vacaciones dignas: {{mx.vacaciones-primer-anio}} el primer año y más días con cada aniversario.",
    "La prima de antigüedad se acumula a razón de {{mx.dias-prima-antiguedad}} de salario por año, con la fracción del último año.",
  ],
  ejemplo: ["Si entraste el 1 de marzo de 2020, al 12 de octubre de 2026 llevas 6 años y 226 días: te tocan 22 días de vacaciones y llevas unos 79 días de salario de prima de antigüedad."],
  faq: [
    {
      pregunta: "¿Cómo se cuenta la antigüedad laboral?",
      respuesta: "Desde el día en que empezaste a trabajar para tu patrón hasta la fecha de corte. Los años se cumplen en cada aniversario de tu ingreso.",
    },
    {
      pregunta: "¿Cuántos años necesito para la prima de antigüedad?",
      respuesta: "Si te despiden, ninguno: se paga siempre. Si renuncias, necesitas {{mx.anios-prima-antiguedad-renuncia}} de servicio o más.",
    },
    {
      pregunta: "¿Pierdo mi antigüedad si cambian de razón social a mi empresa?",
      respuesta: "No. La sustitución de patrón no afecta las relaciones de trabajo (Ley Federal del Trabajo, artículo 41), así que tu antigüedad se conserva.",
    },
  ],
  glosario: [{ termino: "Antigüedad", definicion: "Tiempo que llevas trabajando para el mismo patrón." }],
});
