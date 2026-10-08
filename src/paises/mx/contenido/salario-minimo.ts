import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "mx.salario-minimo",
  h1: "Salario mínimo 2026 en México: diario, quincenal y mensual",
  title: "Salario mínimo 2026 en México: {{mx.salario-minimo@general}} diarios",
  description:
    "El salario mínimo 2026 es de {{mx.salario-minimo@general}} diarios y de {{mx.salario-minimo@frontera-norte}} en la frontera norte. Mira cuánto es por semana, quincena y mes.",
  intro: [
    "El salario mínimo en México es de {{mx.salario-minimo@general}} por día desde el {{mx.salario-minimo@general#desde}}. En la Zona Libre de la Frontera Norte es de {{mx.salario-minimo@frontera-norte}} por día.",
    "En 2026, al mes son 9,577.22 pesos en el resto del país y 13,402.45 pesos en la frontera norte, con el mes promedio de 30.4 días.",
  ],
  comoSeCalcula: [
    "El salario mínimo se fija por día de trabajo.",
    "Por semana se multiplica por 7 y por quincena por 15, porque se pagan también los días de descanso.",
    "Para el mes usamos 30.4 días, el mes promedio que usan el SAT y el IMSS.",
  ],
  ejemplo: [
    "En 2026, con el salario mínimo general cobras 2,205.28 pesos por semana y 4,725.60 por quincena. En la frontera norte son 3,086.09 por semana y 6,613.05 por quincena.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el salario mínimo mensual 2026?",
      respuesta: "9,577.22 pesos en la zona general y 13,402.45 pesos en la frontera norte. Sale de multiplicar el salario diario por 30.4 días.",
    },
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
