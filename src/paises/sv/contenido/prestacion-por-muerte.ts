import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.prestacion-por-muerte",
  h1: "Calculadora de prestación por muerte del trabajador",
  title: "Muerte del trabajador en El Salvador: qué paga el patrono",
  description: "Si un trabajador fallece, su familia recibe {{sv.muerte-dias}} de salario para el sepelio y, con años de servicio, una prestación económica. Calcule cuánto.",
  intro: [
    "Cuando un trabajador fallece, el patrono debe entregar de inmediato {{sv.muerte-dias}} de salario básico a las personas que dependían de él, para el sepelio.",
    "Si tenía al menos {{sv.renuncia-anios-minimos}} de servicio, sus beneficiarios cobran también la prestación de la ley de renuncia voluntaria: {{sv.renuncia-dias-por-anio}} de salario por año.",
  ],
  comoSeCalcula: [
    "Ayuda para el sepelio: el salario diario (mensual entre 30) por {{sv.muerte-dias}}.",
    "Prestación económica: {{sv.renuncia-dias-por-anio}} de salario por cada año completo, si llegó a {{sv.renuncia-anios-minimos}}. El salario diario no puede pasar de {{sv.renuncia-tope}} veces el mínimo diario del sector.",
  ],
  ejemplo: ["Con $600 de salario y seis años de servicio: $1,200 para el sepelio y $1,800 de prestación. Total: $3,000."],
  faq: [
    {
      pregunta: "¿A quién le paga el patrono?",
      respuesta: "A las personas que el trabajador anotó en su contrato o en los registros de la empresa, en ese orden. Si no anotó a nadie, a sus parientes más cercanos. Si no tenía familia, el patrono paga los gastos del funeral.",
    },
    {
      pregunta: "¿Cuándo tiene que pagar?",
      respuesta: "La ayuda para el sepelio se entrega de inmediato. Los salarios, el aguinaldo y las vacaciones pendientes también se deben a los beneficiarios.",
    },
    {
      pregunta: "¿El ISSS o la AFP pagan algo?",
      respuesta: "Pueden corresponder un auxilio de sepelio del ISSS y una pensión de sobrevivencia de la AFP. Se tramitan aparte y no están en esta calculadora.",
    },
  ],
  glosario: [
    { termino: "Beneficiarios", definicion: "Las personas que reciben las prestaciones cuando el trabajador fallece." },
  ],
});
