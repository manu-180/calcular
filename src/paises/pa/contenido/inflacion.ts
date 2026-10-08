import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.inflacion",
  h1: "Calculadora de inflación en Panamá",
  title: "Calculadora de inflación Panamá: actualiza con el IPC",
  description:
    "Actualiza un monto con el IPC nacional urbano del INEC. Elige dos meses y mira la inflación acumulada, la mensual y la interanual con datos oficiales.",
  intro: [
    "Con esta calculadora ves cuánto vale hoy un monto de otro mes, según el índice de precios al consumidor (IPC) nacional urbano del INEC.",
    "Te sirve para actualizar un presupuesto, comparar un salario de hace un año o saber cuánto subieron los precios entre dos meses.",
  ],
  comoSeCalcula: [
    "Se divide el IPC del mes final entre el IPC del mes de origen. Ese cociente es el factor de actualización.",
    "El monto actualizado es tu monto por ese factor. La inflación acumulada es el factor menos uno, en porcentaje.",
    "La inflación mensual compara el mes final con el mes anterior, y la interanual con el mismo mes del año anterior.",
    "El último IPC publicado es {{pa.ipc}} (base 2024 = 100). La serie empieza en enero de 2024, cuando arranca la base nueva del INEC.",
  ],
  ejemplo: ["B/. 500 de agosto de 2025 equivalen a B/. 511.01 en agosto de 2026: los precios subieron 2.20 % en ese año."],
  faq: [
    {
      pregunta: "¿Qué IPC usa la calculadora?",
      respuesta: "El índice de precios al consumidor nacional urbano que calcula el INEC de la Contraloría, con base 2024 = 100.",
    },
    {
      pregunta: "¿Por qué no puedo elegir meses antes de 2024?",
      respuesta:
        "Porque el INEC cambió la base del índice. La serie anterior (base 2013) no se puede mezclar con la nueva sin un enlace oficial, y por ahora solo cargamos la base 2024.",
    },
    {
      pregunta: "¿Cuándo sale el IPC de cada mes?",
      respuesta: "El INEC lo publica a mediados del mes siguiente. En cuanto aparece, lo sumamos a la calculadora.",
    },
    {
      pregunta: "¿Puede bajar el monto?",
      respuesta: "Sí. Si entre los dos meses los precios bajaron, el monto actualizado queda por debajo del original. Pasó en varios meses de 2025.",
    },
  ],
  glosario: [
    { termino: "IPC", definicion: "Índice de precios al consumidor: mide cómo cambian los precios que pagan los hogares." },
    { termino: "INEC", definicion: "Instituto Nacional de Estadística y Censo, de la Contraloría General de la República." },
    { termino: "Inflación interanual", definicion: "Variación de precios entre un mes y el mismo mes del año anterior." },
  ],
});
