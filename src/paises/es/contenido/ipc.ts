import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "es.ipc",
  h1: "Calculadora del IPC",
  title: "Calculadora del IPC: actualiza un importe con la inflación",
  description:
    "Actualiza cualquier importe con el IPC del INE entre dos meses: variación acumulada, anual y mensual, con el índice oficial desde 2002.",
  intro: [
    "El IPC (Índice de Precios de Consumo) mide cuánto suben los precios. Con él puedes saber cuánto vale hoy un importe de hace unos años o cuánto ha perdido tu sueldo frente a la inflación.",
    "Esta calculadora usa el índice general nacional que publica el INE y se actualiza con cada dato definitivo.",
  ],
  comoSeCalcula: [
    "Busca el IPC del mes de origen y el del mes final.",
    "Divide el índice final entre el inicial. Ese es el factor de actualización.",
    "Multiplica tu importe por el factor. La variación acumulada es el factor menos 1, en porcentaje.",
  ],
  ejemplo: [
    "Entre agosto de 2025 y agosto de 2026 el IPC pasó de 100,345 a 104,638: una subida del 4,3 %. 1.000 euros de entonces equivalen a unos 1.042,78 euros de ahora.",
  ],
  faq: [
    {
      pregunta: "¿Puedo usar esta calculadora para subir el alquiler?",
      respuesta: "Solo si tu contrato dice que se actualiza con el IPC. En los contratos de vivienda firmados después de la Ley de Vivienda de 2023, la actualización usa otro índice de referencia que publica el INE.",
    },
    {
      pregunta: "¿Por qué el IPC está en base 2025?",
      respuesta: "El INE cambió la base en enero de 2026. Los índices anteriores se recalcularon en la nueva base, así que las variaciones entre meses no cambian.",
    },
    {
      pregunta: "¿Cuándo se publica el IPC de cada mes?",
      respuesta: "El INE da un dato adelantado a final de mes y el definitivo a mediados del mes siguiente. Aquí se usa el definitivo.",
    },
  ],
  glosario: [
    { termino: "IPC", definicion: "Índice de Precios de Consumo, que elabora el Instituto Nacional de Estadística (INE)." },
    { termino: "Inflación", definicion: "Subida general de los precios a lo largo del tiempo." },
    { termino: "Variación interanual", definicion: "Cuánto subió el IPC respecto al mismo mes del año anterior." },
  ],
});
