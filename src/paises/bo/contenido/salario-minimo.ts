import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "bo.salario-minimo",
  h1: "Salario mínimo en Bolivia {{anio}}",
  title: "Salario mínimo Bolivia {{anio}}: {{bo.salario-minimo}}, por día y en dólares",
  description: "El Salario Mínimo Nacional {{anio}} en Bolivia es {{bo.salario-minimo}} por mes desde el {{bo.salario-minimo#desde}}. Vea cuánto es por día, por hora y en dólares al cambio de hoy.",
  intro: [
    "El salario mínimo en Bolivia es {{bo.salario-minimo}} por mes. Es el Salario Mínimo Nacional y rige desde el {{bo.salario-minimo#desde}} para el sector público y el privado.",
    "Si escribe su haber básico, le decimos si alcanza el mínimo.",
  ],
  comoSeCalcula: [
    "El monto lo fija un decreto supremo. Para la gestión 2026 es el Decreto Supremo N° 5516, que lo subió 20 % con efecto desde el 1 de enero.",
    "El salario por día es el mensual dividido 30. La hora es el día dividido 8, porque la jornada es de 8 horas.",
    "El valor en dólares usa el Tipo de Cambio Oficial del BCB de hoy ({{bo.dolar}}). Es solo una referencia: el sueldo se paga en bolivianos.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el salario mínimo en Bolivia en 2026?",
      respuesta: "{{bo.salario-minimo}} por mes, desde el {{bo.salario-minimo#desde}}.",
    },
    {
      pregunta: "¿Cuánto es el salario mínimo por día y por hora?",
      respuesta: "Por día, el mensual dividido 30. Por hora, el valor del día dividido 8, porque la jornada es de 8 horas. La calculadora le muestra los dos montos.",
    },
    {
      pregunta: "¿Cuánto es el salario mínimo en dólares?",
      respuesta: "Depende del tipo de cambio oficial del día ({{bo.dolar}} hoy). La calculadora le muestra el equivalente, pero es solo una referencia: el sueldo se paga en bolivianos.",
    },
    {
      pregunta: "¿El aumento del salario mínimo es retroactivo?",
      respuesta: "Sí. El decreto de 2026 se aprobó el 13 de enero, pero rige desde el 1 de enero. El empleador tiene que pagar la diferencia de esos días.",
    },
    {
      pregunta: "¿Todos los sueldos subieron en 2026?",
      respuesta: "No. En 2026 el decreto solo obliga a subir hasta el mínimo los haberes básicos que estaban por debajo. Los sueldos más altos se negocian entre empleador y trabajador.",
    },
    {
      pregunta: "¿Qué más cambia cuando sube el salario mínimo?",
      respuesta: "El bono de antigüedad, que se calcula sobre el salario mínimo, y los montos del RC-IVA, que se miden en salarios mínimos.",
    },
  ],
  glosario: [
    { termino: "Salario Mínimo Nacional (SMN)", definicion: "El menor haber básico que se puede pagar por una jornada completa de trabajo." },
    { termino: "Haber básico", definicion: "El sueldo fijo del mes, sin bonos ni horas extras." },
    { termino: "Gestión", definicion: "El año, de enero a diciembre." },
  ],
});
