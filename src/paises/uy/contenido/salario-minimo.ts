import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.salario-minimo",
  h1: "Salario mínimo en Uruguay {{anio}}",
  title: "Salario mínimo Uruguay {{anio}}: {{uy.smn}}, por día y por hora",
  description:
    "El salario mínimo en Uruguay es {{uy.smn}} por mes desde el {{uy.smn#desde}}. Mirá el jornal y la hora mínima, y calculá el mínimo para tus horas.",
  intro: [
    "El salario mínimo en Uruguay es de {{uy.smn}} nominales por mes desde el {{uy.smn#desde}}. Es el piso de sueldo para todo el país y lo fija el Poder Ejecutivo por decreto. En 2026 subió en enero y en julio.",
    "Te mostramos el mínimo mensual vigente, el jornal y la hora. Si trabajás menos horas, calculamos el mínimo para esas horas.",
  ],
  comoSeCalcula: [
    "Desde el {{uy.smn#desde}} el mínimo es de {{uy.smn}} por mes.",
    "El jornal mínimo sale de dividir ese monto entre {{uy.smn-divisor-jornal}}, y la hora mínima, entre {{uy.smn-divisor-hora}}. Así lo dice el decreto.",
    "Para tus horas, multiplicamos la hora mínima por las horas que trabajás en el mes.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el salario mínimo en Uruguay en 2026?",
      respuesta: "{{uy.smn}} nominales por mes, desde el {{uy.smn#desde}}.",
    },
    {
      pregunta: "¿Cuánto es el salario mínimo por hora?",
      respuesta: "Sale de dividir el mínimo mensual entre {{uy.smn-divisor-hora}}, como dice el decreto. La calculadora te muestra el monto exacto y el de tus horas.",
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
