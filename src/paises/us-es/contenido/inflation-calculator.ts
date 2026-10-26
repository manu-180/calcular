import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.inflation-calculator",
  h1: "Calculadora de inflación",
  title: "Calculadora de inflación: valor del dólar con el CPI",
  description: "Mira cuánto vale hoy un monto de cualquier mes desde 1997 con el CPI-U oficial de la Oficina de Estadísticas Laborales (BLS). Inflación acumulada y anual.",
  intro: [
    "Los precios suben con el tiempo, así que un dólar compra menos cada año. Escribe un monto y elige dos meses para ver cuánto dinero necesitarías hoy para comprar lo mismo.",
    "La calculadora usa el Índice de Precios al Consumidor para Todos los Consumidores Urbanos (CPI-U), la medida de inflación que la BLS publica cada mes. El último valor es {{us.cpi-u}}.",
  ],
  comoSeCalcula: [
    "Se busca el CPI-U del primer mes y del segundo mes.",
    "Se divide el índice posterior entre el anterior. Eso es cuánto subieron los precios.",
    "Tu monto se multiplica por ese factor. La tasa anual promedio reparte el cambio en partes iguales entre los años del período.",
  ],
  ejemplo: [
    "$100 de enero de 2020 valen unos $123.14 en dólares de enero de 2025. Los precios subieron 23.1%, un promedio de alrededor de 4.25% al año.",
  ],
  faq: [
    { pregunta: "¿Qué CPI usa?", respuesta: "El CPI-U del promedio de ciudades de EE. UU., todos los artículos, sin ajuste estacional (serie CUUR0000SA0). Es el índice que más se usa para ajustar montos por inflación." },
    { pregunta: "¿Por qué no puedo elegir octubre de 2025?", respuesta: "La Oficina de Estadísticas Laborales no recopiló ni publicó datos del CPI de octubre de 2025 por el cierre del gobierno federal." },
    { pregunta: "¿Qué tan actualizados están los datos?", respuesta: "La BLS publica el CPI de cada mes alrededor de la mitad del mes siguiente. Si eliges un mes posterior, se usa el índice más reciente." },
  ],
  glosario: [
    { termino: "CPI-U", definicion: "Índice de Precios al Consumidor para Todos los Consumidores Urbanos. Sigue los precios que pagan por bienes y servicios las personas que viven en ciudades y pueblos." },
    { termino: "Inflación acumulada", definicion: "El aumento total de los precios entre dos fechas." },
  ],
});
