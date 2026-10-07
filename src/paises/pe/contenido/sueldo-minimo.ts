import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pe.sueldo-minimo",
  h1: "Sueldo mínimo en el Perú",
  title: "Sueldo mínimo 2026 en Perú: RMV de {{pe.rmv}}",
  description:
    "La remuneración mínima vital es {{pe.rmv}} desde el {{pe.rmv#desde}}. Mira cuánto es por día, por hora y con asignación familiar.",
  intro: [
    "La remuneración mínima vital (RMV) es el sueldo más bajo que se puede pagar en el sector privado por una jornada completa de 8 horas.",
    "Desde el {{pe.rmv#desde}} es {{pe.rmv}}. El Gobierno anunció un segundo aumento para el primer semestre de 2027, que todavía necesita su decreto.",
    "Si tienes hijos menores de 18 años (o hasta los 24 si estudian), además cobras la asignación familiar: el {{pe.asignacion-familiar}} de la RMV.",
  ],
  comoSeCalcula: [
    "Por día: la RMV entre 30.",
    "Por hora: la RMV entre 30 y entre 8 horas.",
    "Con asignación familiar: la RMV más el {{pe.asignacion-familiar}} de la RMV.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el sueldo mínimo hoy?",
      respuesta: "{{pe.rmv}} al mes, vigente desde el {{pe.rmv#desde}} (Decreto Supremo 015-2026-TR).",
    },
    {
      pregunta: "¿A quién le corresponde la asignación familiar?",
      respuesta: "A quien trabaja en el sector privado y tiene uno o más hijos menores de 18 años. Si el hijo sigue estudios superiores, se mantiene hasta que termine, con un máximo de 6 años después de cumplir 18.",
    },
    {
      pregunta: "¿Qué cambia cuando sube el sueldo mínimo?",
      respuesta: "Sube la asignación familiar y, con ella, la gratificación, la CTS y las vacaciones de quienes la cobran. También cambia el mínimo para quienes ganan la RMV.",
    },
    {
      pregunta: "¿El sueldo mínimo es el mismo en todo el Perú?",
      respuesta: "Sí. La RMV es una sola para todos los trabajadores del régimen privado, sin diferencias por región.",
    },
  ],
  glosario: [
    { termino: "RMV", definicion: "Remuneración mínima vital: el sueldo mínimo legal del sector privado." },
    { termino: "Asignación familiar", definicion: "Pago mensual del {{pe.asignacion-familiar}} de la RMV para quien tiene hijos menores de 18 años o que estudian." },
  ],
});
