import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "pa.prestamo-personal",
  h1: "Calculadora de préstamo personal en Panamá",
  title: "Préstamo personal en Panamá: calcula tu cuota con FECI",
  description:
    "Calcula la cuota mensual de un préstamo en Panamá con el {{pa.feci}} del FECI, que pagan los préstamos personales y comerciales de más de {{pa.feci-monto-minimo}}.",
  intro: [
    "En Panamá, los préstamos personales y comerciales de más de {{pa.feci-monto-minimo}} pagan además el FECI: un {{pa.feci}} anual que se suma a la tasa de interés del banco.",
    "Escribe el monto, la tasa del banco y el plazo. Te mostramos la cuota mensual, cuánto pagas de FECI y el total del préstamo.",
  ],
  comoSeCalcula: [
    "Tasa total: la tasa anual del banco más el {{pa.feci}} del FECI, si el préstamo pasa de {{pa.feci-monto-minimo}}.",
    "Cuota fija mensual: monto por la tasa mensual, dividido entre uno menos (1 + tasa mensual) elevado a menos el plazo.",
    "FECI total: la diferencia entre la cuota con FECI y la cuota sin FECI, por la cantidad de cuotas.",
  ],
  ejemplo: [
    "Un préstamo de B/. 10,000 al 10% anual por 60 meses paga FECI. Con 11% de tasa total, la cuota es B/. 217.42. Sin FECI sería B/. 212.47.",
  ],
  faq: [
    {
      pregunta: "¿Qué es el FECI?",
      respuesta: "El Fondo Especial de Compensación de Intereses. Los bancos retienen un {{pa.feci}} anual en los préstamos para financiar intereses preferenciales al sector agropecuario.",
    },
    {
      pregunta: "¿Qué préstamos pagan FECI?",
      respuesta: "Los personales y comerciales locales de más de {{pa.feci-monto-minimo}}. No lo pagan, por ejemplo, los garantizados con depósitos bancarios ni los préstamos a cooperativas.",
    },
    {
      pregunta: "¿La cuota incluye seguros?",
      respuesta: "No. Los bancos suelen sumar seguro de vida, de desempleo o comisiones. Pide la tabla de amortización completa.",
    },
    {
      pregunta: "¿Los jubilados pagan FECI?",
      respuesta: "Algunas leyes especiales los eximen en ciertos préstamos. Confírmalo con tu banco y, si no aplica, marca que el préstamo no paga FECI.",
    },
  ],
  glosario: [
    { termino: "Tasa nominal anual", definicion: "La tasa de interés por año que anuncia el banco, sin seguros ni comisiones." },
    { termino: "Tabla de amortización", definicion: "El detalle de cada cuota: cuánto va a capital, a intereses y a FECI." },
  ],
});
