import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.sueldo-proporcional",
  h1: "Calculadora de sueldo proporcional",
  title: "Sueldo proporcional: calcula el pago por días trabajados",
  description: "Calcula tu sueldo proporcional si entraste a mitad de mes o tuviste días sin goce de sueldo. Valor día con el mes de 30 días que usan las liquidaciones.",
  intro: [
    "Si empezaste a trabajar a mitad de mes, o tuviste días sin goce de sueldo, ese mes te pagan solo la parte proporcional.",
    "Escribe tu sueldo mensual y los días trabajados. Te damos el valor de un día y el sueldo del mes.",
  ],
  comoSeCalcula: [
    "El sueldo mensual se divide por 30 para obtener el valor de un día, aunque el mes tenga 28 o 31 días.",
    "Ese valor se multiplica por los días trabajados.",
    "Sobre ese monto se aplican después los descuentos de AFP, salud e impuesto como en cualquier liquidación.",
  ],
  ejemplo: ["Con un sueldo de $900.000 y 15 días trabajados, el valor día es $30.000 y el sueldo proporcional es $450.000."],
  faq: [
    {
      pregunta: "¿Por qué se divide por 30 y no por los días del mes?",
      respuesta: "Porque el sueldo mensual se considera de 30 días. Así un día vale lo mismo en febrero que en marzo.",
    },
    {
      pregunta: "¿La gratificación también es proporcional?",
      respuesta: "Sí, si se paga mes a mes. Calcúlala sobre el sueldo proporcional con la calculadora de gratificación.",
    },
    {
      pregunta: "¿Las licencias médicas se descuentan así?",
      respuesta: "Sí. El empleador descuenta los días de licencia con este valor día, y esos días los paga el subsidio de Fonasa o tu Isapre.",
    },
  ],
  glosario: [
    { termino: "Valor día", definicion: "Sueldo mensual dividido por 30." },
    { termino: "Permiso sin goce de sueldo", definicion: "Días que no trabajas por acuerdo con tu empleador y que no se pagan." },
  ],
});
