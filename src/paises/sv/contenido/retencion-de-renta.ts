import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.retencion-de-renta",
  h1: "Calculadora de retención de renta en El Salvador",
  title: "Tabla de retención de renta 2026 El Salvador: calculadora",
  description:
    "Calcule la retención de renta de su salario con la tabla vigente del Ministerio de Hacienda, mensual o quincenal. Resta la AFP del {{sv.afp-trabajador}} y el ISSS.",
  intro: [
    "Con la tabla de retención de renta vigente en El Salvador no se retiene nada si su salario sujeto a renta no pasa de {{sv.renta-exento-mensual}} al mes ({{sv.renta-exento-quincenal}} por quincena). Ese monto es el salario menos la AFP y el ISSS.",
    "Ponga su salario y el descuento del ISSS que ve en su boleta de pago. La calculadora resta la AFP, ubica su tramo y le dice cuánto le retienen.",
  ],
  comoSeCalcula: [
    "Al salario se le restan la cotización a la AFP ({{sv.afp-trabajador}}) y la del ISSS. Lo que queda es el salario sujeto a renta.",
    "Ese monto se busca en la tabla. Hasta {{sv.renta-exento-mensual}} al mes (tramo I) no hay retención. En los demás tramos se paga una cuota fija más un porcentaje sobre lo que pase el límite del tramo anterior, y el porcentaje sube con cada tramo.",
    "Si cobra por quincena se usa la tabla quincenal, que tiene los límites a la mitad.",
    "En junio y en diciembre el patrono recalcula con todo lo ganado en el año y ajusta la retención de ese mes.",
  ],
  ejemplo: [
    "Con un salario mensual de $800 y $24 de ISSS: la AFP es $58 y el salario sujeto a renta queda en $718. Está en el tramo II: (718 − 550) × 10 % + 17.67 = $34.47 de retención.",
  ],
  faq: [
    {
      pregunta: "¿Desde cuánto se paga renta en El Salvador?",
      respuesta: "Con la tabla vigente no hay retención si su salario sujeto a renta no pasa de {{sv.renta-exento-mensual}} al mes ({{sv.renta-exento-quincenal}} por quincena). Ese salario es el que queda después de restar la AFP y el ISSS.",
    },
    {
      pregunta: "¿Cómo se calcula la renta de mi salario?",
      respuesta: "Reste la AFP y el ISSS a su salario, busque el resultado en la tabla y aplique la cuota fija y el porcentaje de su tramo sobre el exceso. La calculadora lo hace en un paso.",
    },
    {
      pregunta: "¿Por qué tengo que poner el descuento del ISSS?",
      respuesta: "Porque se resta antes de aplicar la tabla. Lo encuentra en su boleta de pago. Si no cotiza al ISSS, ponga 0.",
    },
    {
      pregunta: "¿Qué es la deducción fija para salarios bajos?",
      respuesta: "Si en el año gana {{sv.limite-deduccion-fija-renta}} o menos, puede restar {{sv.deduccion-fija-renta}} de su renta anual. La tabla mensual no la incluye, por eso el decreto pide considerarla aparte y en los recálculos de junio y diciembre.",
    },
    {
      pregunta: "¿La retención es todo el impuesto que pago?",
      respuesta: "Es un anticipo. Si al final del año lo retenido no coincide con el impuesto que le toca, presenta la declaración y paga la diferencia o pide la devolución.",
    },
  ],
  glosario: [
    { termino: "Retención de renta", definicion: "La parte del salario que el patrono descuenta y entrega a Hacienda a cuenta del impuesto sobre la renta." },
    { termino: "Salario sujeto a renta", definicion: "El salario menos la AFP y el ISSS. Es el monto que se busca en la tabla." },
    { termino: "AFP", definicion: "Administradora de fondos de pensiones. Su cotización va a su cuenta para la jubilación." },
    { termino: "ISSS", definicion: "Instituto Salvadoreño del Seguro Social. Su cotización cubre la salud." },
  ],
});
