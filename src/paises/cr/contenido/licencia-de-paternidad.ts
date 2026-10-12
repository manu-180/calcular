import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.licencia-de-paternidad",
  h1: "Licencia de paternidad en Costa Rica",
  title: "Licencia de paternidad Costa Rica: días y fechas",
  description:
    "Calcule su licencia de paternidad: {{cr.paternidad-dias-semana}} por semana durante las primeras {{cr.paternidad-semanas}} semanas desde el nacimiento. Vea las fechas exactas.",
  intro: [
    "Los padres que trabajan tienen licencia de paternidad pagada cuando nace su hijo o hija: {{cr.paternidad-dias-semana}} por semana durante las primeras {{cr.paternidad-semanas}} semanas.",
    "Escriba la fecha de nacimiento y le mostramos hasta cuándo puede usarla.",
  ],
  comoSeCalcula: [
    "La licencia empieza el día del nacimiento.",
    "Cada semana tiene derecho a {{cr.paternidad-dias-semana}} libres, durante {{cr.paternidad-semanas}} semanas.",
    "El total es la cantidad de días por semana por la cantidad de semanas.",
  ],
  ejemplo: ["Si su hijo nace el 12 de octubre de 2026, tiene 8 días de licencia, dos por semana, hasta el 8 de noviembre."],
  faq: [
    {
      pregunta: "¿Cuántos días de licencia de paternidad hay en Costa Rica?",
      respuesta: "Ocho días en total: {{cr.paternidad-dias-semana}} por semana durante las primeras {{cr.paternidad-semanas}} semanas desde el nacimiento.",
    },
    {
      pregunta: "¿El patrono me la puede negar?",
      respuesta: "No. Si no la respeta, comete una falta grave y, si el contrato termina por eso, debe sumar seis salarios a la indemnización.",
    },
    {
      pregunta: "¿Y si la madre muere en el parto?",
      respuesta: "El padre tiene una licencia especial pagada hasta que se cumplan tres meses del parto, si se hace cargo del bebé.",
    },
  ],
  glosario: [{ termino: "Licencia de paternidad", definicion: "Permiso pagado para que el padre acompañe al bebé en sus primeras semanas." }],
});
