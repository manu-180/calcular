import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.seguridad-social-independientes",
  h1: "Calculadora de seguridad social para independientes",
  title: "Seguridad social de independientes {{anio}}: PILA",
  description:
    "Calcula cuánto pagas de salud, pensión y ARL como independiente o contratista: se cotiza sobre el {{co.ibc-independientes}} de tus ingresos.",
  intro: [
    "Si trabajas por prestación de servicios o por tu cuenta, pagas tú mismo la seguridad social en la planilla PILA. Se paga mes vencido.",
    "La base es el {{co.ibc-independientes}} de lo que ganas al mes, sin IVA. Esa base no puede ser menor a un salario mínimo ni mayor a {{co.tope-ibc}}.",
  ],
  comoSeCalcula: [
    "Base de cotización (IBC): el {{co.ibc-independientes}} del valor mensual del contrato, sin IVA.",
    "Salud: {{co.salud-cotizacion}} de la base.",
    "Pensión: {{co.pension-cotizacion}} de la base. Si la base es de 4 salarios mínimos o más, se suma el Fondo de Solidaridad Pensional.",
    "ARL: el porcentaje de tu clase de riesgo. En riesgo IV y V la paga quien te contrata.",
  ],
  ejemplo: [
    "Con un contrato de $5.000.000 al mes y riesgo I, la base es $2.000.000. Pagas $250.000 de salud, $320.000 de pensión y $10.440 de ARL: $580.440 en total.",
  ],
  faq: [
    {
      pregunta: "¿Sobre cuánto cotiza un independiente?",
      respuesta: "Sobre el {{co.ibc-independientes}} de sus ingresos mensuales, sin IVA. Lo dice el artículo 89 de la Ley 2277 de 2022.",
    },
    {
      pregunta: "¿Qué pasa si el 40 % da menos que el salario mínimo?",
      respuesta: "Se cotiza sobre un salario mínimo, que es la base más baja permitida.",
    },
    {
      pregunta: "Si tengo varios contratos, ¿cómo pago?",
      respuesta: "Cotizas por cada contrato, sobre el {{co.ibc-independientes}} de cada uno. Todo junto no puede pasar de {{co.tope-ibc}}.",
    },
    {
      pregunta: "¿Puedo restar costos si trabajo por mi cuenta?",
      respuesta: "Si trabajas por cuenta propia y tienes costos con soporte, puedes restarlos antes de calcular la base. Los contratos de prestación de servicios personales no restan costos.",
    },
  ],
  glosario: [
    { termino: "Independiente", definicion: "Quien trabaja sin contrato laboral: por prestación de servicios o por cuenta propia." },
    { termino: "PILA", definicion: "Planilla Integrada de Liquidación de Aportes, donde pagas salud, pensión y ARL." },
  ],
});
