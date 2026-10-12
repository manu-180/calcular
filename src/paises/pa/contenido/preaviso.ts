import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.preaviso",
  h1: "Calculadora de aviso de renuncia en Panamá",
  title: "Aviso de renuncia en Panamá: cuántos días tienes que dar",
  description:
    "Para renunciar en Panamá tienes que avisar con {{pa.preaviso-renuncia-dias}} de anticipación ({{pa.preaviso-renuncia-tecnico-meses}} si eres técnico). Calcula tu último día y el descuento si no avisas.",
  intro: [
    "Si renuncias sin causa justificada, la ley te pide avisar por escrito con {{pa.preaviso-renuncia-dias}} de anticipación. Si eres trabajador técnico, el aviso es de {{pa.preaviso-renuncia-tecnico-meses}}.",
    "Escribe el día en que entregas el aviso y tu salario. Te decimos desde qué fecha puedes irte y cuánto te pueden descontar si no avisas.",
  ],
  comoSeCalcula: [
    "Fecha de salida: el día del aviso más {{pa.preaviso-renuncia-dias}} (o {{pa.preaviso-renuncia-tecnico-meses}} si eres técnico).",
    "Si no avisas, debes {{pa.penalidad-sin-preaviso-semanas}} semana de salario: el salario mensual por 12 y dividido entre 52.",
    "En el trabajo doméstico el aviso es de {{pa.preaviso-domestico-dias}} y vale para las dos partes.",
  ],
  ejemplo: [
    "Si avisas el 12 de octubre de 2026, puedes irte desde el 27 de octubre. Con un salario de B/. 1,300, si no avisas te pueden descontar B/. 300.",
  ],
  faq: [
    {
      pregunta: "¿Cuántos días de preaviso hay que dar al renunciar en Panamá?",
      respuesta: "{{pa.preaviso-renuncia-dias}}. Si eres trabajador técnico, {{pa.preaviso-renuncia-tecnico-meses}}.",
    },
    {
      pregunta: "¿Qué pasa si renuncio sin avisar?",
      respuesta: "Le debes al empleador {{pa.penalidad-sin-preaviso-semanas}} semana de salario. Te la puede descontar de la prima de antigüedad.",
    },
    {
      pregunta: "¿Cómo tiene que ser el aviso?",
      respuesta: "Por escrito. Conviene firmarlo ante una autoridad de trabajo: si no, el empleador no puede usarlo después contra ti.",
    },
    {
      pregunta: "¿Pierdo la prima de antigüedad si renuncio?",
      respuesta: "No. La prima se paga al terminar un contrato por tiempo indefinido por cualquier causa, también si renuncias.",
    },
  ],
  glosario: [
    { termino: "Preaviso", definicion: "El aviso que das antes de dejar el trabajo." },
    { termino: "Trabajador técnico", definicion: "Quien hace tareas que piden una preparación técnica especial." },
  ],
});
