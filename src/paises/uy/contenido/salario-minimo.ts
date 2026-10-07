import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.salario-minimo",
  h1: "Salario Mínimo Nacional en Uruguay",
  title: "Salario mínimo 2026 en Uruguay: mensual, jornal y hora",
  description:
    "El Salario Mínimo Nacional es {{uy.smn}} por mes desde {{uy.smn#desde}}. Mirá el jornal y la hora mínima, y calculá el mínimo para tus horas.",
  intro: [
    "El Salario Mínimo Nacional es el piso de sueldo para todo el país. Lo fija el Poder Ejecutivo por decreto. En 2026 subió en enero y en julio.",
    "Te mostramos el mínimo mensual vigente, el jornal y la hora. Si trabajás menos horas, calculamos el mínimo para esas horas.",
  ],
  comoSeCalcula: [
    "Desde {{uy.smn#desde}} el mínimo es de {{uy.smn}} por mes.",
    "El jornal mínimo sale de dividir ese monto entre {{uy.smn-divisor-jornal}}, y la hora mínima, entre {{uy.smn-divisor-hora}}. Así lo dice el decreto.",
    "Para tus horas, multiplicamos la hora mínima por las horas que trabajás en el mes.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el salario mínimo hoy?",
      respuesta: "{{uy.smn}} por mes, desde {{uy.smn#desde}}.",
    },
    {
      pregunta: "¿Cuándo vuelve a subir?",
      respuesta: "En general en enero. El monto lo fija un decreto de fin de año, y cuando se publica lo actualizamos.",
    },
    {
      pregunta: "¿Mi sueldo puede ser menor si mi laudo es más bajo?",
      respuesta: "No. Ningún sueldo puede quedar por debajo del mínimo nacional. Muchos laudos de los Consejos de Salarios son más altos.",
    },
    {
      pregunta: "¿El mínimo es nominal o líquido?",
      respuesta: "Nominal. A ese monto se le descuentan los aportes, igual que a cualquier sueldo.",
    },
  ],
  glosario: [
    { termino: "Laudo", definicion: "Sueldo mínimo de cada categoría que fija el Consejo de Salarios de cada sector." },
    { termino: "Jornal", definicion: "Lo que se cobra por un día de trabajo." },
  ],
});
