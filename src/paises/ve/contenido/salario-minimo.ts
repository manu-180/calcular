import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.salario-minimo",
  h1: "Salario mínimo en Venezuela",
  title: "Salario mínimo en Venezuela: {{ve.salario-minimo}} al mes",
  description:
    "El salario mínimo es {{ve.salario-minimo}} al mes desde el {{ve.salario-minimo#desde}}. Míralo por día y en dólares a la tasa oficial del BCV.",
  intro: [
    "El salario mínimo mensual es {{ve.salario-minimo}}, fijado por el Decreto 4.653 de marzo de 2022. Para adolescentes aprendices es {{ve.salario-minimo-aprendiz}}.",
    "Desde entonces los aumentos se hicieron con bonos (cestaticket y bono de guerra económica), no con el salario. Por eso el ingreso mínimo que anuncia el Gobierno es mucho mayor que el salario mínimo.",
  ],
  comoSeCalcula: [
    "Salario diario: el mensual entre {{ve.dias-mes-salario}}, como dice el decreto.",
    "Equivalente en dólares: el salario dividido entre la tasa oficial del BCV vigente, hoy {{ve.tasa-bcv-usd}}.",
  ],
  faq: [
    {
      pregunta: "¿Por qué el salario mínimo es tan bajo?",
      respuesta:
        "Porque no se ajusta desde 2022 y el bolívar se devaluó mucho. El Gobierno sube el ingreso con bonos que no son salario. Esos bonos no cuentan para prestaciones, utilidades ni vacaciones.",
    },
    {
      pregunta: "¿Qué es el ingreso mínimo integral?",
      respuesta:
        "Es la suma del salario mínimo, el cestaticket y el bono de guerra económica. Su monto se anuncia, pero no encontramos el decreto publicado en Gaceta Oficial, así que no lo mostramos.",
    },
    {
      pregunta: "¿Se paga en efectivo?",
      respuesta: "Sí. El decreto dice que el salario mínimo se paga en dinero y no puede incluir pagos en especie.",
    },
    {
      pregunta: "¿Qué tasa usan para pasarlo a dólares?",
      respuesta: "Solo la tasa oficial del Banco Central de Venezuela, que se actualiza sola cada día hábil.",
    },
  ],
  glosario: [
    { termino: "Salario mínimo", definicion: "Lo mínimo que se puede pagar como salario por una jornada completa, en el sector público y en el privado." },
    { termino: "Ingreso mínimo integral", definicion: "Salario mínimo más cestaticket más bono de guerra económica." },
    { termino: "Tasa BCV", definicion: "El tipo de cambio oficial que publica el Banco Central de Venezuela." },
  ],
});
