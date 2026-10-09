import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.inflacion",
  h1: "Calculadora de inflación: actualice un monto por el IPC",
  title: "Calculadora de inflación en Bolivia con el IPC del INE",
  description:
    "Actualice un monto en bolivianos de un mes a otro con el IPC del INE. Vea la inflación entre los dos meses, la del mes, la acumulada del año y la de 12 meses.",
  intro: [
    "Escriba un monto, el mes en que lo tenía y el mes al que lo quiere llevar. Le mostramos cuánto vale ese dinero según el Índice de Precios al Consumidor (IPC) que publica el Instituto Nacional de Estadística.",
    "Sirve para actualizar un precio, una deuda entre particulares, un alquiler o para ver cuánto poder de compra perdió un sueldo.",
  ],
  comoSeCalcula: [
    "Tomamos el IPC del mes de origen y el del mes de destino. El IPC sigue los precios de una canasta de bienes y servicios que compran los hogares.",
    "El monto actualizado es el monto original multiplicado por el IPC de destino y dividido por el IPC de origen.",
    "La inflación entre los dos meses es cuánto subió el IPC en ese tiempo, en porcentaje.",
    "Si elige un mes que el INE todavía no publicó, usamos el último disponible y se lo indicamos.",
  ],
  ejemplo: ["Bs 10.000 de septiembre de 2025 equivalen a Bs 10.569,91 en septiembre de 2026: el IPC subió 5,70 % en esos 12 meses."],
  faq: [
    {
      pregunta: "¿Cuál es el último IPC publicado?",
      respuesta: "El índice del último mes publicado es {{bo.ipc}}, con base 2016 = 100. El INE lo publica en los primeros días de cada mes y el BCB lo repite en su tabla de indicadores de inflación.",
    },
    {
      pregunta: "¿Es lo mismo que actualizar con la UFV?",
      respuesta:
        "Se parecen, porque la UFV también sigue al IPC. Para deudas tributarias y montos que la norma expresa en UFV, use la UFV. Para comparar meses completos, el IPC es el dato directo.",
    },
    {
      pregunta: "¿Desde qué mes puedo calcular?",
      respuesta: "Desde enero de 2018, con la serie del IPC en base 2016 que publica el INE.",
    },
    {
      pregunta: "¿Qué es la inflación acumulada?",
      respuesta: "Es cuánto subieron los precios desde diciembre del año anterior hasta el mes de destino.",
    },
    {
      pregunta: "¿Qué es la inflación a 12 meses?",
      respuesta: "Es la variación del IPC entre el mes de destino y el mismo mes del año anterior. Es la cifra que más se cita en las noticias.",
    },
  ],
  glosario: [
    { termino: "IPC", definicion: "Índice de Precios al Consumidor. Mide cómo cambian los precios de lo que compran los hogares." },
    { termino: "INE", definicion: "Instituto Nacional de Estadística de Bolivia." },
    { termino: "BCB", definicion: "Banco Central de Bolivia." },
  ],
});
