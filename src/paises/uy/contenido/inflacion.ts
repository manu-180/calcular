import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.inflacion",
  h1: "Calculadora de inflación: actualizá un monto por IPC",
  title: "Calculadora de IPC: actualizá un monto por inflación",
  description:
    "Llevá un monto de un mes a otro con el IPC del INE. Te mostramos la inflación entre los dos meses, la del mes, la del año y la de los últimos 12 meses.",
  intro: [
    "Escribí un monto, el mes en que lo tenías y el mes al que lo querés llevar. Te decimos cuánto vale hoy ese dinero según el Índice de los Precios del Consumo (IPC) que publica el INE.",
    "Sirve para actualizar un alquiler, una deuda entre particulares, un presupuesto viejo o para saber cuánto perdió tu sueldo frente a los precios.",
  ],
  comoSeCalcula: [
    "Tomamos el IPC del mes de origen y el del mes de destino. El IPC es un número que sigue los precios de una canasta de consumo; el INE lo publica todos los meses.",
    "El monto actualizado es el monto original multiplicado por el IPC de destino y dividido por el IPC de origen.",
    "La inflación entre los dos meses es cuánto creció el IPC en ese tiempo, en porcentaje.",
    "Si elegís un mes que el INE todavía no publicó, usamos el último disponible y te avisamos.",
  ],
  ejemplo: [
    "$ 10.000 de setiembre de 2025 equivalen a $ 10.467,60 en setiembre de 2026: el IPC subió 4,68 % en esos 12 meses.",
  ],
  faq: [
    {
      pregunta: "¿Cuál es el último IPC publicado?",
      respuesta: "El índice del último mes publicado es {{uy.ipc}}, con base octubre 2022 = 100. El INE lo publica en los primeros días de cada mes.",
    },
    {
      pregunta: "¿Sirve para ajustar el alquiler?",
      respuesta:
        "Sirve como referencia si tu contrato se ajusta por IPC. Muchos contratos usan otra cosa (la UR, la UI o el coeficiente de reajuste de alquileres que fija el Poder Ejecutivo), así que fijate qué dice el tuyo antes.",
    },
    {
      pregunta: "¿Por qué no coincide con la UI?",
      respuesta: "La UI también sigue al IPC, pero con valores diarios y un mes de desfase. Para comparar meses enteros, el IPC es el dato directo.",
    },
    {
      pregunta: "¿Desde cuándo puedo calcular?",
      respuesta: "Desde enero de 2000. El INE tiene la serie desde 1937 y la empalmó con la base de octubre de 2022, la que usamos acá.",
    },
    {
      pregunta: "¿Qué es la inflación acumulada en el año?",
      respuesta: "Es cuánto subieron los precios desde diciembre del año anterior hasta el mes que elegiste como destino.",
    },
  ],
  glosario: [
    { termino: "IPC", definicion: "Índice de los Precios del Consumo. Mide cómo cambian los precios de lo que compran los hogares. Lo publica el INE." },
    { termino: "Inflación interanual", definicion: "Variación del IPC en los últimos 12 meses." },
    { termino: "INE", definicion: "Instituto Nacional de Estadística." },
  ],
});
