import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "py.costo-empleador",
  h1: "Calculadora del costo de un empleado para la empresa",
  title: "Costo de un empleado en Paraguay: IPS, aguinaldo y más",
  description:
    "Calculá cuánto le cuesta a tu empresa un salario: aporte patronal al IPS del {{py.ips-empleador}}, aguinaldo y bonificación familiar, por mes y por año.",
  intro: [
    "El salario no es todo lo que paga la empresa. Encima va el aporte patronal al IPS, el aguinaldo de fin de año y, si corresponde, la bonificación familiar.",
    "Escribí el salario y te mostramos el costo real por mes y por año.",
  ],
  comoSeCalcula: [
    "Aporte patronal al IPS: {{py.ips-empleador}} del salario. Si el salario está debajo del mínimo ({{py.salario-minimo}}), se calcula sobre el mínimo.",
    "Aguinaldo: la doceava parte del salario, repartida por mes para que lo vayas apartando.",
    "Bonificación familiar: {{py.bonificacion-familiar}} del salario mínimo por cada hijo, si el salario no pasa el {{py.bonificacion-familiar-tope}} del mínimo.",
    "No sumamos las vacaciones: se pagan con el salario de siempre mientras la persona descansa.",
  ],
  ejemplo: ["Un salario de Gs. 4.000.000 sin hijos le cuesta a la empresa Gs. 4.993.333 por mes: Gs. 660.000 de IPS y Gs. 333.333 de aguinaldo."],
  faq: [
    {
      pregunta: "¿Cuánto aporta el empleador al IPS?",
      respuesta: "El {{py.ips-empleador}} del salario, además del {{py.ips-trabajador}} que se descuenta al trabajador.",
    },
    {
      pregunta: "¿El aguinaldo paga IPS?",
      respuesta: "No. Según la Carta Orgánica del IPS, el aguinaldo no forma parte del salario sobre el que se aporta.",
    },
    {
      pregunta: "¿Cuándo se paga la bonificación familiar?",
      respuesta: "Cada mes junto con el salario, por cada hijo con derecho, a los trabajadores que no pasan el tope.",
    },
  ],
  glosario: [
    { termino: "IPS", definicion: "Instituto de Previsión Social." },
    { termino: "Aporte patronal", definicion: "Lo que paga la empresa a la seguridad social, aparte del descuento al trabajador." },
    { termino: "Bonificación familiar", definicion: "Pago mensual por hijo para trabajadores con salarios bajos." },
  ],
});
