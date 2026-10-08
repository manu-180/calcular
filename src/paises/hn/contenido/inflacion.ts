import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.inflacion",
  h1: "Calculadora de inflación en Honduras",
  title: "Calculadora de inflación Honduras: actualice lempiras",
  description: "Actualice un monto en lempiras con la inflación oficial del Banco Central de Honduras. Vea cuánto subieron los precios entre dos meses, mes a mes y en el año.",
  intro: [
    "Con esta calculadora sabe cuánto vale hoy un monto en lempiras del pasado, o cuánto subieron los precios entre dos meses. Usa la inflación que publica el Banco Central de Honduras (BCH) cada mes.",
    "Sirve para revisar un alquiler, comparar un salario con el costo de vida o poner al día una deuda pactada hace años.",
  ],
  comoSeCalcula: [
    "Se toma el índice de precios del mes del monto original y el del mes al que lo quiere llevar.",
    "El monto se multiplica por el índice de destino y se divide entre el índice de origen. Esa proporción es el factor de actualización.",
    "La inflación entre los dos meses es el factor menos uno, expresada en porcentaje. También se muestra la inflación mensual y la interanual del mes de destino.",
    "Si el BCH todavía no publicó el mes de destino, se usa el último dato disponible y se lo indica debajo del resultado.",
  ],
  ejemplo: [
    "Si la inflación acumulada de enero a agosto fue 4.78 %, L1,000 de diciembre del año anterior equivalen a L1,047.80 en agosto.",
  ],
  faq: [
    {
      pregunta: "¿De dónde salen los datos?",
      respuesta: "De la inflación acumulada de cada mes que publica el Banco Central de Honduras. Con esos porcentajes se arma un índice con diciembre de 2020 igual a 100, que se actualiza solo cuando el BCH publica un mes nuevo.",
    },
    {
      pregunta: "¿Por qué el índice no es el mismo que el del BCH?",
      respuesta: "Porque el nivel oficial del índice no está publicado en un formato abierto. Al dividir dos meses la base no importa: el resultado es la misma inflación. Por el redondeo de los porcentajes publicados, puede haber una diferencia de una o dos centésimas.",
    },
    {
      pregunta: "¿Cada cuánto se publica la inflación?",
      respuesta: "Una vez por mes, alrededor del día 10 del mes siguiente. Hasta que sale, la calculadora usa el último mes publicado.",
    },
    {
      pregunta: "¿Qué diferencia hay entre inflación mensual, acumulada e interanual?",
      respuesta: "La mensual compara un mes con el anterior. La interanual compara con el mismo mes del año anterior. La que se ve como inflación entre los dos meses es la acumulada en el período que usted eligió.",
    },
    {
      pregunta: "¿Desde qué mes puedo calcular?",
      respuesta: "Desde diciembre de 2020, que es la base del índice.",
    },
  ],
  glosario: [
    { termino: "IPC", definicion: "Índice de Precios al Consumidor. Mide cómo cambian los precios de una canasta de bienes y servicios que compran los hogares." },
    { termino: "BCH", definicion: "Banco Central de Honduras." },
    { termino: "Factor de actualización", definicion: "Índice del mes de destino dividido entre el índice del mes de origen." },
  ],
});
