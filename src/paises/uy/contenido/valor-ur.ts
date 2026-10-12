import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.valor-ur",
  h1: "Valor de la UR hoy y conversor de UR a pesos",
  title: "Valor de la UR hoy: Unidad Reajustable en pesos",
  description:
    "La UR vale {{uy.ur}} este mes. Convertí Unidades Reajustables a pesos uruguayos, o al revés, para cuotas de vivienda, préstamos hipotecarios y multas.",
  intro: [
    "La Unidad Reajustable (UR) vale este mes {{uy.ur}}. Se usa en préstamos hipotecarios, cuotas del BHU y de cooperativas, y en algunas multas.",
    "Escribí el monto y te lo pasamos a pesos, o al revés.",
  ],
  comoSeCalcula: [
    "Tomamos el valor de la UR del mes que publica el BPS, que sigue al Índice Medio de Salarios.",
    "Para pasar a pesos se multiplica el monto en UR por el valor del mes.",
    "Para pasar de pesos a UR se divide el monto por ese valor.",
  ],
  ejemplo: ["Si tu cuota es de 20 UR y la UR vale $ 1.946,95, este mes pagás $ 38.939."],
  faq: [
    {
      pregunta: "¿Cuánto vale la UR hoy?",
      respuesta: "{{uy.ur}} en este mes, según los valores que publica el BPS.",
    },
    {
      pregunta: "¿Cada cuánto cambia la UR?",
      respuesta: "Una vez por mes. Sube con los salarios, no con los precios como la UI.",
    },
    {
      pregunta: "¿Qué diferencia hay entre la UR y la UI?",
      respuesta: "La UR sigue a los salarios y cambia cada mes. La UI sigue a la inflación y cambia todos los días.",
    },
  ],
  glosario: [
    { termino: "UR", definicion: "Unidad Reajustable. Se ajusta por el Índice Medio de Salarios." },
    { termino: "BHU", definicion: "Banco Hipotecario del Uruguay. Muchas de sus cuotas están en UR." },
  ],
});
