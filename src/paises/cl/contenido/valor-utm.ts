import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.valor-utm",
  h1: "Valor de la UTM y la UTA",
  title: "Valor UTM y UTA del mes: {{cl.utm}}",
  description: "La UTM de este mes vale {{cl.utm}}. Convierte UTM o UTA a pesos y al revés, con el valor oficial que publica el SII.",
  intro: [
    "La UTM (Unidad Tributaria Mensual) es la unidad que usa el SII para impuestos, multas y tramos. Cambia una vez al mes.",
    "La UTA (Unidad Tributaria Anual) es la UTM del mes multiplicada por 12.",
  ],
  comoSeCalcula: [
    "Tomamos la UTM del mes desde la tabla oficial del SII.",
    "Para pasar a pesos, se multiplica el monto por la UTM (o por la UTA) y se redondea al peso.",
    "Para pasar de pesos a UTM, se divide el monto por el valor de la unidad.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto vale la UTM este mes?",
      respuesta: "Vale {{cl.utm}}, vigente desde el {{cl.utm#desde}}.",
    },
    {
      pregunta: "¿Para qué se usa la UTM?",
      respuesta: "Para los tramos del impuesto único a los sueldos, el monto de algunas multas y varios trámites del SII.",
    },
    {
      pregunta: "¿Cada cuánto cambia?",
      respuesta: "Una vez al mes. Se reajusta según la inflación (el IPC) y el SII publica el valor de cada mes.",
    },
    {
      pregunta: "¿Qué diferencia hay entre UTM y UTA?",
      respuesta: "La UTA es anual y equivale a 12 UTM del mes. Se usa en cálculos de impuestos que miran el año completo.",
    },
  ],
  glosario: [
    { termino: "UTM", definicion: "Unidad Tributaria Mensual. Valor en pesos que fija el SII cada mes." },
    { termino: "UTA", definicion: "Unidad Tributaria Anual. Doce veces la UTM del mes." },
  ],
});
