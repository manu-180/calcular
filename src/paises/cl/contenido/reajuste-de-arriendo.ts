import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.reajuste-de-arriendo",
  h1: "Calculadora de reajuste de arriendo por IPC",
  title: "Reajuste de arriendo por IPC: calcula el nuevo monto",
  description: "Calcula el reajuste de tu arriendo según la variación del IPC del INE entre dos meses. Sirve para reajustes semestrales o anuales en pesos.",
  intro: [
    "Muchos contratos de arriendo en pesos dicen que el monto se reajusta cada seis o doce meses según la variación del IPC. Acá lo calculas con el índice oficial del INE.",
    "Elige el mes del IPC del último reajuste y el del último IPC publicado. Te damos el nuevo arriendo.",
  ],
  comoSeCalcula: [
    "Se divide el IPC del mes final por el IPC del mes inicial. Eso da el factor de reajuste.",
    "El arriendo actual se multiplica por ese factor.",
    "Si el mes final todavía no tiene IPC publicado, usamos el último disponible y te avisamos.",
  ],
  ejemplo: ["Un arriendo de $500.000 con reajuste semestral entre el IPC de marzo y el de septiembre de 2026 sube un 2,56 %: el nuevo arriendo es de $512.822."],
  faq: [
    {
      pregunta: "¿Qué meses de IPC uso?",
      respuesta: "Los que diga tu contrato. Lo más común es usar como inicio el mes del último reajuste y como final el último IPC publicado al momento de reajustar.",
    },
    {
      pregunta: "¿Cuándo se publica el IPC?",
      respuesta: "El INE lo publica una vez al mes, alrededor del día 8, con el dato del mes anterior.",
    },
    {
      pregunta: "¿Y si mi arriendo está en UF?",
      respuesta: "Entonces no se reajusta por IPC: el monto en UF se paga con el valor de la UF del día del pago. Usa la calculadora de UF.",
    },
    {
      pregunta: "¿El arrendador puede subir más que el IPC?",
      respuesta: "Durante el contrato, solo si el contrato lo permite. Al renovarlo, las partes pueden pactar un monto nuevo.",
    },
  ],
  glosario: [
    { termino: "IPC", definicion: "Índice de Precios al Consumidor. Mide la variación de los precios y lo publica el INE." },
    { termino: "Reajuste", definicion: "Actualización de un monto para que no pierda valor con la inflación." },
  ],
});
