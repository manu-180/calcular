import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.salario-minimo",
  h1: "Salario mínimo 2026 en México",
  title: "Salario mínimo 2026: {{mx.salario-minimo@general}} diarios",
  description:
    "El salario mínimo 2026 es de {{mx.salario-minimo@general}} diarios y de {{mx.salario-minimo@frontera-norte}} en la frontera norte. Calcula cuánto es por semana, quincena y mes.",
  intro: [
    "Desde el {{mx.salario-minimo@general#desde}} el salario mínimo general es de {{mx.salario-minimo@general}} por día.",
    "En la Zona Libre de la Frontera Norte es de {{mx.salario-minimo@frontera-norte}} por día.",
  ],
  comoSeCalcula: [
    "El salario mínimo se fija por día de trabajo.",
    "Por semana se multiplica por 7 y por quincena por 15, porque se pagan también los días de descanso.",
    "Para el mes usamos 30.4 días, el mes promedio que usan el SAT y el IMSS.",
  ],
  faq: [
    {
      pregunta: "¿Qué municipios son de la Zona Libre de la Frontera Norte?",
      respuesta: "Los que hacen frontera con Estados Unidos en Baja California, Sonora, Chihuahua, Coahuila, Nuevo León y Tamaulipas, como Tijuana, Mexicali, Nogales, Juárez, Piedras Negras, Nuevo Laredo, Reynosa y Matamoros. La lista completa está en la resolución de la CONASAMI.",
    },
    {
      pregunta: "¿Cuándo cambia el salario mínimo?",
      respuesta: "Cada año. La CONASAMI fija el nuevo monto en diciembre y rige desde el 1 de enero.",
    },
    {
      pregunta: "¿Me pueden pagar menos del mínimo?",
      respuesta: "No por una jornada completa. Si te pagan menos, puedes pedir asesoría gratis en la PROFEDET.",
    },
    {
      pregunta: "¿El salario mínimo paga ISR?",
      respuesta: "No. A quien gana solo el salario mínimo no se le retiene ISR, y su empresa paga sus cuotas del IMSS.",
    },
  ],
  glosario: [
    { termino: "CONASAMI", definicion: "Comisión Nacional de los Salarios Mínimos. Fija el salario mínimo cada año." },
    { termino: "Zona Libre de la Frontera Norte", definicion: "Municipios de la frontera con Estados Unidos con salario mínimo propio." },
  ],
});
