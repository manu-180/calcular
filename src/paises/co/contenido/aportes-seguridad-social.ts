import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.aportes-seguridad-social",
  h1: "Calculadora de aportes a seguridad social",
  title: "Aportes a seguridad social 2026: salud, pensión y ARL",
  description:
    "Calcula los aportes de un salario: lo que se descuenta al trabajador y lo que paga la empresa en salud, pensión, ARL, caja, SENA e ICBF.",
  intro: [
    "Cada mes, sobre el salario se pagan aportes a salud, pensión y riesgos laborales, más los parafiscales. Una parte se descuenta del salario y otra la pone la empresa.",
    "Escribe el salario y la clase de riesgo. Te mostramos cuánto aporta cada uno y el total que se paga en la planilla (PILA).",
  ],
  comoSeCalcula: [
    "Base (IBC): el salario, con un piso de un salario mínimo ({{co.smmlv}}) y un tope de {{co.tope-ibc}}.",
    "Salud: {{co.salud-trabajador}} el trabajador y {{co.salud-empleador}} la empresa.",
    "Pensión: la cotización es del {{co.pension-cotizacion}}; el trabajador paga el {{co.pension-parte-trabajador}} de ese total y la empresa el resto.",
    "ARL: la paga toda la empresa, según la clase de riesgo.",
    "Caja de compensación ({{co.parafiscales[caja]}}), SENA ({{co.parafiscales[sena]}}) e ICBF ({{co.parafiscales[icbf]}}): los paga la empresa.",
    "Exoneración: si la empresa es una sociedad declarante de renta y el salario es menor a {{co.exoneracion-tope}}, no paga su parte de salud ni el SENA y el ICBF.",
  ],
  ejemplo: [
    "Con un salario de $3.000.000 en una sociedad, el trabajador aporta $240.000 y la empresa $495.660 (pensión, ARL de riesgo I y caja). En total son $735.660 al mes.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto me descuentan de seguridad social?",
      respuesta: "El {{co.salud-trabajador}} para salud y el {{co.pension-parte-trabajador}} de la cotización de pensión. Si ganas 4 salarios mínimos o más, se suma el Fondo de Solidaridad Pensional.",
    },
    {
      pregunta: "¿Quién paga la ARL?",
      respuesta: "La empresa, completa. El porcentaje depende de la clase de riesgo de tu trabajo, de I a V.",
    },
    {
      pregunta: "¿Qué es la exoneración de aportes?",
      respuesta: "Las sociedades que declaran renta no pagan su parte de salud ni el SENA y el ICBF por quienes ganan menos de {{co.exoneracion-tope}}. La caja de compensación sí se paga siempre.",
    },
    {
      pregunta: "¿Sobre qué valor se calculan los aportes?",
      respuesta: "Sobre el salario, sin el auxilio de transporte. Nunca sobre menos de un salario mínimo ni sobre más de {{co.tope-ibc}}.",
    },
  ],
  glosario: [
    { termino: "IBC", definicion: "Ingreso base de cotización: el valor sobre el que se calculan los aportes." },
    { termino: "PILA", definicion: "La planilla en la que se pagan todos los aportes del mes." },
    { termino: "Parafiscales", definicion: "Los aportes a la caja de compensación, el SENA y el ICBF." },
  ],
});
