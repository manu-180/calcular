import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.dias-de-licencia",
  h1: "Calculadora de días de licencia",
  title: "Días de licencia en Uruguay: cuántos te corresponden",
  description:
    "Calculá cuántos días de licencia anual te tocan: {{uy.licencia-dias}} por año, más días por antigüedad desde los 5 años y la parte proporcional si entraste en el año.",
  intro: [
    "Todo trabajador de la actividad privada tiene al menos {{uy.licencia-dias}} de licencia por año trabajado. Con la antigüedad se suman días.",
    "Si entraste a mitad de año, te corresponde la parte proporcional. Poné tus años en la empresa y los meses trabajados y te lo calculamos.",
  ],
  comoSeCalcula: [
    "La base es de {{uy.licencia-dias}} por año civil trabajado.",
    "Al cumplir 5 años se suma un día. Después, un día más cada 4 años: 22 días a los 8 años y 23 a los 12.",
    "Si no trabajaste el año entero, se toman los días del año completo por los meses trabajados y se divide entre 12.",
    "Cada día de licencia se paga como un día de sueldo: el sueldo mensual dividido entre 30.",
  ],
  ejemplo: ["Con 8 años en la empresa te tocan 22 días. Si ganás $ 45.000, cada día vale $ 1.500 y la licencia, $ 33.000."],
  faq: [
    {
      pregunta: "¿Cuántos días de licencia me corresponden?",
      respuesta: "{{uy.licencia-dias}} por año trabajado, más uno al cumplir 5 años y otro cada 4 años más. Si trabajaste menos de un año, la parte proporcional.",
    },
    {
      pregunta: "¿Qué pasa si no trabajé el año entero?",
      respuesta: "Te corresponden los días proporcionales al tiempo trabajado hasta el 31 de diciembre. Por ejemplo, con seis meses, la mitad de los días.",
    },
    {
      pregunta: "¿La licencia se gana por año civil o por aniversario?",
      respuesta: "Por año civil: lo que trabajás de enero a diciembre genera la licencia que te tomás al año siguiente. Algunos sectores tienen otro período por decreto.",
    },
    {
      pregunta: "¿Qué pasa con la licencia que no me tomé si me voy?",
      respuesta: "Se paga en la liquidación por egreso, junto con el salario vacacional. No pierde valor.",
    },
  ],
  glosario: [
    { termino: "Licencia", definicion: "Las vacaciones pagas. En Uruguay se dice licencia." },
    { termino: "Salario vacacional", definicion: "Un pago extra que se cobra antes de salir de licencia." },
  ],
});
