import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "do.inflacion",
  h1: "Calculadora de inflación en República Dominicana",
  title: "Calculadora de inflación RD: actualiza con el IPC",
  description:
    "Actualiza un monto en pesos con el IPC del Banco Central. Elige dos meses y mira la inflación acumulada, la mensual y la interanual con datos oficiales.",
  intro: [
    "Con esta calculadora ves cuánto valen hoy unos pesos de otro mes, según el índice de precios al consumidor (IPC) que publica el Banco Central.",
    "Te sirve para actualizar una deuda, un alquiler o un presupuesto, y para saber cuánto subieron los precios entre dos meses.",
  ],
  comoSeCalcula: [
    "Se divide el IPC del mes final entre el IPC del mes de origen. Ese cociente es el factor de actualización.",
    "El monto actualizado es tu monto por ese factor. La inflación acumulada es el factor menos uno, en porcentaje.",
    "La inflación mensual compara el mes final con el mes anterior, y la interanual con el mismo mes del año anterior.",
    "El último IPC publicado es {{do.ipc}} (base octubre 2019 a septiembre 2020 = 100). La serie cargada empieza en enero de 2000.",
  ],
  ejemplo: ["RD$10,000 de agosto de 2025 equivalen a RD$10,512.58 en agosto de 2026: los precios subieron 5.13 % en ese año."],
  faq: [
    {
      pregunta: "¿Quién calcula el IPC en República Dominicana?",
      respuesta: "El Banco Central de la República Dominicana. Lo publica todos los meses con la inflación mensual, la acumulada del año y la interanual.",
    },
    {
      pregunta: "¿La inflación acumulada es la del año?",
      respuesta:
        "Aquí es la de los dos meses que elijas. Si eliges diciembre del año pasado como mes de origen, te da la misma acumulada del año que publica el Banco Central.",
    },
    {
      pregunta: "¿Cuándo sale el IPC de cada mes?",
      respuesta: "El Banco Central lo publica en los primeros días del mes siguiente. Lo sumamos a la calculadora en cuanto aparece.",
    },
    {
      pregunta: "¿Sirve para indexar un contrato?",
      respuesta: "Sirve como referencia. Si tu contrato dice cómo se ajusta, sigue esa regla y usa este resultado para comparar.",
    },
  ],
  glosario: [
    { termino: "IPC", definicion: "Índice de precios al consumidor: mide cómo cambian los precios que pagan los hogares." },
    { termino: "BCRD", definicion: "Banco Central de la República Dominicana." },
    { termino: "Inflación interanual", definicion: "Variación de precios entre un mes y el mismo mes del año anterior." },
  ],
});
