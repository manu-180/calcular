import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.jubilacion",
  h1: "Calculadora de jubilación en Bolivia",
  title: "Jubilación Bolivia: calcule cuándo puede jubilarse",
  description: "Calcule cuándo cumple la edad de jubilación ({{bo.jubilacion-edad}}, menos para madres), cuántos aportes le faltan y desde cuándo cobra la Renta Dignidad.",
  intro: [
    "La Ley de Pensiones fija la edad de jubilación en {{bo.jubilacion-edad}}. Las madres pueden jubilarse antes: un año menos por cada hijo, hasta {{bo.jubilacion-hijos-maximo}} hijos.",
    "Escriba su fecha de nacimiento, sus hijos y cuántos meses aportó.",
  ],
  comoSeCalcula: [
    "Edad general: {{bo.jubilacion-edad}}. La mujer resta un año por cada hijo nacido vivo, hasta {{bo.jubilacion-hijos-maximo}}.",
    "Si la mujer ya tiene {{bo.jubilacion-edad}} o más, en lugar de bajar la edad suma 12 aportes por cada hijo, hasta {{bo.jubilacion-hijos-maximo}} hijos.",
    "Para la Pensión Solidaria de Vejez hacen falta al menos {{bo.jubilacion-aportes-minimos}} de aportes.",
    "La Renta Dignidad se cobra desde los {{bo.renta-dignidad-edad}}, aunque nunca haya aportado.",
  ],
  faq: [
    {
      pregunta: "¿A qué edad se jubila uno en Bolivia?",
      respuesta: "A los {{bo.jubilacion-edad}}. Las madres pueden hacerlo antes, con un año menos por hijo, hasta {{bo.jubilacion-hijos-maximo}} hijos.",
    },
    {
      pregunta: "¿Cuántos aportes necesito?",
      respuesta: "Para la Pensión Solidaria de Vejez, al menos {{bo.jubilacion-aportes-minimos}} de aportes. Si su saldo en la Gestora alcanza para una pensión del 60 % de su promedio salarial, puede jubilarse a cualquier edad.",
    },
    {
      pregunta: "¿Cuánto voy a cobrar de jubilación?",
      respuesta: "Depende del saldo de su cuenta en la Gestora y, en la Pensión Solidaria, de sus años de aporte y su promedio de los últimos 24 sueldos. La Gestora le da el monto exacto.",
    },
  ],
  glosario: [
    { termino: "Pensión Solidaria de Vejez", definicion: "Pensión que suma su ahorro y una parte del fondo solidario, para quienes aportaron al menos 10 años." },
    { termino: "Renta Dignidad", definicion: "Pago universal a las personas mayores que viven en Bolivia, hayan aportado o no." },
  ],
});
