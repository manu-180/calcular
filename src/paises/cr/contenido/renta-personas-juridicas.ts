import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "cr.renta-personas-juridicas",
  h1: "Impuesto sobre la renta de personas jurídicas",
  title: "Renta de sociedades 2026 Costa Rica: pymes y {{cr.renta-personas-juridicas}}",
  description:
    "Calcule el impuesto sobre las utilidades de una sociedad: tramos reducidos para pymes con ingresos de hasta {{cr.renta-pyme-tope-bruto}} o la tarifa general.",
  intro: [
    "Las sociedades pagan renta sobre su utilidad del año. Si sus ingresos brutos no pasan de {{cr.renta-pyme-tope-bruto}}, usan tramos del 5 % al 20 %.",
    "Si los ingresos brutos son mayores, pagan la tarifa general de {{cr.renta-personas-juridicas}} sobre toda la renta neta.",
  ],
  comoSeCalcula: [
    "Se comparan los ingresos brutos con el tope de {{cr.renta-pyme-tope-bruto}}.",
    "Pyme: en 2026, 5 % sobre los primeros ₡5.621.000; 10 % hasta ₡8.433.000; 15 % hasta ₡11.243.000 y 20 % sobre el exceso.",
    "Empresa grande: {{cr.renta-personas-juridicas}} de la renta neta.",
  ],
  ejemplo: ["Una pyme con ingresos de ₡80.000.000 y utilidad de ₡15.000.000 paga ₡1.735.150 de renta."],
  faq: [
    {
      pregunta: "¿Qué cuenta como renta bruta para el tope?",
      respuesta: "Todos los ingresos del período fiscal, antes de restar costos y gastos.",
    },
    {
      pregunta: "¿Hay beneficios para empresas nuevas?",
      respuesta: "Sí. Las micro y pequeñas empresas inscritas en el MEIC o el MAG pagan 0 % los tres primeros años, 25 % del impuesto el cuarto y quinto, y 50 % el sexto.",
    },
    {
      pregunta: "¿Cuándo se declara?",
      respuesta: "El período fiscal va del 1 de enero al 31 de diciembre y se declara en los primeros meses del año siguiente.",
    },
  ],
  glosario: [
    { termino: "Persona jurídica", definicion: "Una sociedad o empresa con personería propia, distinta de sus dueños." },
    { termino: "Renta neta", definicion: "La utilidad: ingresos menos costos y gastos deducibles." },
  ],
});
