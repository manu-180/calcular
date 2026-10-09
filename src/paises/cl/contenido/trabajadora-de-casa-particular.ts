import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cl.trabajadora-de-casa-particular",
  h1: "Calculadora de sueldo y cotizaciones de trabajadora de casa particular",
  title: "Trabajadora de casa particular: sueldo y cotizaciones",
  description:
    "Calcula el sueldo líquido de una trabajadora de casa particular y cuánto pagas tú en cotizaciones: cesantía, indemnización, pensiones y accidentes.",
  intro: [
    "Si contratas a una trabajadora de casa particular (asesora del hogar), aquí ves cuánto recibe en mano y cuánto te cuesta en total cada mes.",
    "Con jornada completa el sueldo no puede ser menor que el ingreso mínimo mensual: {{cl.imm}}. La comida y la habitación corren por tu cuenta y no se descuentan del sueldo.",
  ],
  comoSeCalcula: [
    "A ella se le descuenta la AFP ({{cl.cotizacion-afp}} más la comisión de su AFP) y la salud ({{cl.salud}}). Si el sueldo es alto, también el impuesto único.",
    "No se le descuenta seguro de cesantía: en casa particular lo pagas tú completo, {{cl.cesantia-empleador[casa-particular]}} del sueldo imponible.",
    "Además pagas {{cl.indemnizacion-casa-particular}} para la indemnización a todo evento, que ella cobra al terminar el contrato por cualquier motivo. Se paga durante 11 años.",
    "También pagas la cotización del empleador de la reforma de pensiones ({{cl.cotizacion-empleador-pensiones}}, que ya incluye el seguro de invalidez) y el seguro de accidentes del trabajo: {{cl.accidentes-basica}} más {{cl.sanna}} de la Ley SANNA.",
    "Todo se calcula hasta el tope imponible del mes. Se declara y se paga en Previred.",
  ],
  ejemplo: [
    "Con un sueldo de 600.000 pesos y AFP Modelo, ella recibe 494.520 pesos líquidos. Tú pagas 51.240 pesos en aportes, así que el costo total es de 651.240 pesos al mes.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el sueldo mínimo de una trabajadora de casa particular?",
      respuesta: "El mismo ingreso mínimo mensual que rige para todos: {{cl.imm}} con jornada completa. Si trabaja menos horas, el mínimo es proporcional.",
    },
    {
      pregunta: "¿Quién paga el seguro de cesantía?",
      respuesta: "Tú, completo. Desde la Ley 21.269 la trabajadora de casa particular no aporta nada a ese seguro. Tú pagas {{cl.cesantia-empleador[casa-particular]}} sin importar si el contrato es indefinido o a plazo.",
    },
    {
      pregunta: "¿Qué es la indemnización a todo evento?",
      respuesta:
        "Es un ahorro que vas haciendo cada mes en la AFP de la trabajadora ({{cl.indemnizacion-casa-particular}} del sueldo). Lo cobra cuando termina el contrato, sea por renuncia, despido o cualquier otra causa. El aporte dura 11 años.",
    },
    {
      pregunta: "¿Tengo que pagar la cotización de la reforma de pensiones?",
      respuesta: "Sí. Rige para todo empleador, también en casas particulares. Desde agosto de 2026 es {{cl.cotizacion-empleador-pensiones}} del sueldo imponible y sube cada agosto.",
    },
    {
      pregunta: "¿Y si tiene Isapre?",
      respuesta: "Se descuenta igual la cotización legal de {{cl.salud}}. Si su plan cuesta más, la diferencia también se le descuenta, pero eso no cambia lo que pagas tú.",
    },
  ],
  glosario: [
    { termino: "Sueldo imponible", definicion: "La parte del sueldo sobre la que se pagan cotizaciones. Tiene un tope mensual en UF." },
    { termino: "Previred", definicion: "El sitio donde se declaran y pagan las cotizaciones de cada mes." },
    { termino: "Ley SANNA", definicion: "Seguro para madres y padres de niños con una enfermedad grave. Lo paga el empleador." },
  ],
});
