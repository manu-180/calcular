import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.preaviso",
  h1: "Calculadora de preaviso de renuncia en Venezuela",
  title: "Preaviso de renuncia en Venezuela: cuántos días",
  description:
    "Si renuncias, la LOTTT te pide avisar con anticipación: una semana, una quincena o un mes según tu tiempo de trabajo. Calcula tus días y tu último día.",
  intro: [
    "En Venezuela el preaviso lo da quien renuncia, no la empresa. Si te vas sin una causa justificada, tienes que avisar con anticipación según el tiempo que llevas trabajando.",
    "Escribe tu fecha de ingreso y el día en que entregas la renuncia. Te decimos cuántos días de preaviso te tocan y hasta cuándo trabajas.",
  ],
  comoSeCalcula: [
    "Contamos el tiempo trabajado hasta el día en que avisas.",
    "Después de un mes: {{ve.preaviso-dias-1-mes}} (una semana).",
    "Después de seis meses: {{ve.preaviso-dias-6-meses}} (una quincena).",
    "Después de un año: {{ve.preaviso-dias-1-anio}} (un mes).",
  ],
  ejemplo: ["Si entraste el 1 de marzo de 2024 y renuncias el 1 de octubre de 2026, te toca un mes: trabajas hasta el 31 de octubre."],
  faq: [
    {
      pregunta: "¿Cuántos días de preaviso tengo que dar si renuncio?",
      respuesta: "Una semana después de un mes de trabajo, una quincena después de seis meses y un mes después de un año.",
    },
    {
      pregunta: "¿La empresa me tiene que dar preaviso si me despide?",
      respuesta: "No. La LOTTT no tiene preaviso para el despido. Si te despiden sin causa, te deben una indemnización igual a tus prestaciones sociales.",
    },
    {
      pregunta: "¿Qué pasa si no doy el preaviso?",
      respuesta: "La empresa igual te tiene que pagar todo lo que ganaste hasta tu último día. La ley no fija un descuento por no avisar.",
    },
    {
      pregunta: "¿Tengo que dar preaviso si renuncio por una causa justificada?",
      respuesta: "No. Si te retiras por una causa del artículo 80 (por ejemplo, una reducción del salario o acoso laboral), puedes irte sin aviso y además te toca la indemnización.",
    },
  ],
  glosario: [
    { termino: "Preaviso", definicion: "Aviso anticipado de la renuncia (art. 81 de la LOTTT)." },
    { termino: "Retiro justificado", definicion: "Renuncia por una falta grave de la empresa, prevista en el artículo 80 de la LOTTT." },
  ],
});
