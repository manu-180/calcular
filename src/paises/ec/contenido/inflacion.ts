import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ec.inflacion",
  h1: "Calculadora de inflación: actualiza un monto con el IPC",
  title: "Calculadora de inflación en Ecuador con el IPC del INEC",
  description:
    "Actualiza un monto en dólares de un mes a otro con el IPC del INEC. Mira la inflación entre los dos meses, la mensual, la acumulada y la anual.",
  intro: [
    "Escribe un monto, el mes en que lo tenías y el mes al que lo quieres llevar. Te mostramos cuánto vale ese dinero según el Índice de Precios al Consumidor (IPC) que publica el INEC.",
    "Sirve para actualizar un arriendo, una deuda entre particulares, un presupuesto o para saber cuánto poder de compra perdió tu sueldo.",
  ],
  comoSeCalcula: [
    "Tomamos el IPC del mes de origen y el del mes de destino. El IPC sigue los precios de una canasta de bienes y servicios que compran los hogares.",
    "El monto actualizado es el monto original multiplicado por el IPC de destino y dividido por el IPC de origen.",
    "Usamos la serie empalmada del INEC: desde julio de 2026 el IPC tiene base nueva (julio 2025 a junio 2026 = 100) y el INEC llevó los meses anteriores a esa misma base, así se pueden comparar.",
    "Si eliges un mes que el INEC todavía no publica, usamos el último disponible y te avisamos.",
  ],
  ejemplo: ["USD 1.000 de agosto de 2025 equivalen a USD 1.011,20 en agosto de 2026: el IPC subió 1,12 % en esos 12 meses."],
  faq: [
    {
      pregunta: "¿Cuál es el último IPC publicado?",
      respuesta: "El índice del último mes publicado es {{ec.ipc}}, con base julio 2025 a junio 2026 = 100. El INEC lo publica en los primeros días de cada mes.",
    },
    {
      pregunta: "¿Por qué cambió el número del IPC en 2026?",
      respuesta:
        "Porque el INEC renovó la canasta y la base del índice desde julio de 2026. Cambia el número, pero no la inflación: la serie empalmada mantiene las mismas variaciones de antes.",
    },
    {
      pregunta: "¿Desde qué mes puedo calcular?",
      respuesta: "Desde enero de 2000, el año en que el país adoptó el dólar.",
    },
    {
      pregunta: "¿Qué diferencia hay entre inflación anual y acumulada?",
      respuesta: "La anual compara el mes con el mismo mes del año anterior. La acumulada compara el mes con diciembre del año anterior.",
    },
    {
      pregunta: "¿Sirve para subir el arriendo?",
      respuesta: "Sirve como referencia. El aumento que corresponde depende de lo que diga tu contrato, así que revísalo antes de aplicar un porcentaje.",
    },
  ],
  glosario: [
    { termino: "IPC", definicion: "Índice de Precios al Consumidor. Mide cómo cambian los precios de lo que compran los hogares." },
    { termino: "INEC", definicion: "Instituto Nacional de Estadística y Censos." },
    { termino: "Serie empalmada", definicion: "Serie histórica llevada a la base nueva para que se pueda comparar con los meses recientes." },
  ],
});
