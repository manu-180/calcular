import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.inflacion",
  h1: "Calculadora de inflación con el IPC del DANE",
  title: "Calculadora de inflación Colombia: actualiza con el IPC",
  description:
    "Actualiza un monto en pesos con el IPC del DANE. Elige dos meses y ve la inflación acumulada, la mensual y la anual. Sirve para el reajuste del arriendo.",
  intro: [
    "Esta calculadora te dice cuánto vale hoy un monto del pasado. Usa el Índice de Precios al Consumidor (IPC) que publica el DANE cada mes.",
    "El último IPC cargado es {{co.ipc}}. Se actualiza solo cuando el DANE publica el mes nuevo, en los primeros días del mes siguiente.",
  ],
  comoSeCalcula: [
    "Se toma el IPC del mes inicial y el del mes final.",
    "El factor de actualización es el IPC final dividido entre el IPC inicial.",
    "El monto actualizado es tu monto por ese factor. La inflación acumulada es el factor menos uno, en porcentaje.",
    "La inflación anual compara el mes final con el mismo mes del año anterior. La mensual lo compara con el mes previo.",
  ],
  ejemplo: [
    "1.000.000 de pesos de agosto de 2025 equivalen a 1.062.454 pesos de agosto de 2026: el IPC pasó de 150,99 a 160,42, una inflación de 6,25 % en 12 meses.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto puede subir el arriendo?",
      respuesta:
        "En vivienda, la Ley 820 de 2003 (artículo 20) permite subirlo cada 12 meses hasta el IPC del año calendario anterior. Para un reajuste en 2026, pon como mes inicial diciembre de 2024 y como final diciembre de 2025.",
    },
    {
      pregunta: "¿Cuál es la inflación anual en Colombia?",
      respuesta: "Pon como mes final el último publicado: la fila «Inflación anual (12 meses)» compara ese mes con el mismo mes del año anterior, que es la cifra que reporta el DANE.",
    },
    {
      pregunta: "¿Por qué no aparece el mes actual?",
      respuesta: "Porque el DANE publica el IPC de un mes en los primeros días del mes siguiente. Si eliges una fecha posterior, el cálculo llega hasta el último mes publicado y te lo avisa.",
    },
    {
      pregunta: "¿Es lo mismo que la UVR?",
      respuesta: "No. La UVR es una unidad diaria que se ajusta con el IPC, y se usa en créditos de vivienda. Aquí se compara el IPC de dos meses.",
    },
  ],
  glosario: [
    { termino: "IPC", definicion: "Índice de Precios al Consumidor. Mide cómo cambian los precios que pagan los hogares. Lo calcula el DANE." },
    { termino: "Factor de actualización", definicion: "Cuántas veces creció el IPC entre dos meses. Multiplicado por un monto, lo lleva a precios del mes final." },
  ],
});
