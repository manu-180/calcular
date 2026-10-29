import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.costo-de-un-empleado",
  h1: "Calculadora del costo de un empleado en Colombia",
  title: "Costo de un empleado {{anio}}: aportes y prestaciones",
  description:
    "Calcula cuánto le cuesta al empleador un salario en Colombia: salud, pensión, ARL, caja, SENA, ICBF, prima, cesantías, intereses y vacaciones.",
  intro: [
    "Un empleado cuesta más que su salario. Al salario se suman el auxilio de transporte, los aportes a seguridad social y parafiscales, y las prestaciones sociales que se causan cada mes.",
    "Las sociedades declarantes de renta, y las personas naturales con dos o más trabajadores, no pagan salud, SENA ni ICBF por quien gana menos de {{co.exoneracion-tope}}.",
  ],
  comoSeCalcula: [
    "Aportes sobre el ingreso base (nunca menos de un salario mínimo): salud {{co.salud-empleador}}, la parte de la pensión del empleador, ARL según la clase de riesgo y caja de compensación {{co.parafiscales[caja]}}.",
    "SENA ({{co.parafiscales[sena]}}) e ICBF ({{co.parafiscales[icbf]}}) solo si no aplica la exoneración.",
    "Prestaciones del mes: prima ({{co.prima-dias}} de salario por año) y cesantías (un mes por año), ambas con el auxilio de transporte; intereses a las cesantías ({{co.intereses-cesantias}} al año) y vacaciones ({{co.vacaciones-dias}} hábiles por año).",
    "La ARL usa el valor inicial de cada clase. Tu ARL te confirma la tarifa exacta de tu empresa.",
  ],
  ejemplo: [
    "Un salario de 3.000.000 de pesos en una sociedad, con riesgo I, cuesta 4.443.762 pesos al mes con auxilio de transporte, aportes y prestaciones.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto más que el salario cuesta un empleado?",
      respuesta: "Depende del salario, de la exoneración y del riesgo. La fila «Costo extra sobre el salario» te da el porcentaje exacto de tu caso.",
    },
    {
      pregunta: "¿Qué es la exoneración de aportes?",
      respuesta: "El artículo 114-1 del Estatuto Tributario libera a las sociedades declarantes de renta, y a las personas naturales con dos o más trabajadores, de pagar salud, SENA e ICBF por quienes ganan menos de {{co.exoneracion-tope}}. Pensión, ARL y caja se pagan siempre.",
    },
    {
      pregunta: "¿Cuál es mi clase de riesgo?",
      respuesta: "Depende de la actividad económica y del riesgo del puesto. Tu ARL la define al afiliar la empresa y te informa la tarifa.",
    },
    {
      pregunta: "¿Incluye la dotación?",
      respuesta: "No. Si le corresponde dotación de calzado y vestido, súmala aparte según lo que cueste.",
    },
  ],
  glosario: [
    { termino: "Parafiscales", definicion: "Aportes sobre la nómina para la caja de compensación, el SENA y el ICBF." },
    { termino: "IBC", definicion: "Ingreso base de cotización. Es el salario sobre el que se calculan los aportes; no baja de un salario mínimo." },
  ],
});
