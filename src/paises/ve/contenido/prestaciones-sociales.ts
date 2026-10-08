import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ve.prestaciones-sociales",
  h1: "Calculadora de prestaciones sociales en Venezuela",
  title: "Prestaciones sociales en Venezuela 2026: calcula las tuyas",
  description:
    "Calcula tus prestaciones sociales con la LOTTT: garantía de {{ve.prestaciones-garantia-dias}} por trimestre o {{ve.prestaciones-retroactivo-dias}} por año, lo que sea mayor. En bolívares o en dólares.",
  intro: [
    "En Venezuela cobras como prestaciones sociales el mayor de dos montos: la garantía ({{ve.prestaciones-garantia-dias}} de salario por trimestre) o el retroactivo ({{ve.prestaciones-retroactivo-dias}} por año con tu último salario integral).",
    "Son el ahorro que la empresa acumula a tu nombre mientras trabajas, y te las pagan al terminar la relación de trabajo, por cualquier motivo. Se calculan solo con tu salario: los bonos que no son salario no cuentan.",
  ],
  comoSeCalcula: [
    "Salario integral diario: tu salario mensual entre {{ve.dias-mes-salario}}, más la parte diaria de las utilidades y del bono vacacional (sus días entre 360).",
    "Garantía: {{ve.prestaciones-garantia-dias}} de salario por cada trimestre empezado. Desde el segundo año se suman {{ve.prestaciones-dias-adicionales}} adicionales por año, que crecen cada año hasta {{ve.prestaciones-dias-adicionales-tope}}.",
    "Cálculo retroactivo: {{ve.prestaciones-retroactivo-dias}} de tu último salario integral por cada año trabajado. Una fracción de más de seis meses cuenta como año.",
    "Cobras el mayor de los dos. Si trabajaste menos de tres meses, te tocan {{ve.prestaciones-dias-por-mes-menos-3-meses}} de salario por mes o fracción.",
  ],
  ejemplo: [
    "Con $300 al mes y tres años justos, el salario integral diario da $11,33. La garantía suma 186 días ($2.107,38) y el retroactivo 90 días ($1.019,70). Si tu salario nunca cambió, cobras la garantía.",
  ],
  faq: [
    {
      pregunta: "¿Cómo se calculan las prestaciones sociales en Venezuela?",
      respuesta:
        "Se hacen dos cuentas y cobras la mayor. La garantía suma {{ve.prestaciones-garantia-dias}} de salario por trimestre, más los días adicionales desde el segundo año. El retroactivo da {{ve.prestaciones-retroactivo-dias}} por año con tu último salario integral.",
    },
    {
      pregunta: "¿Qué salario uso si cobro una parte en bonos?",
      respuesta:
        "Solo la parte salarial. El cestaticket y el bono de guerra económica no son salario y no cuentan. Si tu empresa te paga en dólares y en bolívares, suma lo que es salario y elige la moneda en la que lo escribes.",
    },
    {
      pregunta: "¿Dónde veo cuánto tengo de garantía?",
      respuesta:
        "En el estado de cuenta del fideicomiso o del fondo, o en el informe que la empresa te tiene que dar cada trimestre. Si la empresa la lleva en su contabilidad, pídele ese detalle por escrito.",
    },
    {
      pregunta: "¿Por qué la garantía estimada me da más que el retroactivo?",
      respuesta:
        "Porque la estimamos con tu último salario, como si siempre hubieras ganado lo mismo. Si tu salario subió con los años, la garantía real es menor y puede ganar el retroactivo. Con el monto de tu fideicomiso el resultado es exacto.",
    },
    {
      pregunta: "¿Cuándo me tienen que pagar?",
      respuesta: "Dentro de los cinco días siguientes al fin de la relación de trabajo. Si se atrasan, deben intereses de mora a la tasa activa del Banco Central de Venezuela.",
    },
    {
      pregunta: "¿Puedo pedir un adelanto?",
      respuesta: "Sí. Puedes pedir hasta el 75 % de la garantía depositada para comprar, construir o reparar tu vivienda, liberar una hipoteca, pagar educación o gastos médicos tuyos o de tu familia.",
    },
  ],
  glosario: [
    { termino: "LOTTT", definicion: "Ley Orgánica del Trabajo, los Trabajadores y las Trabajadoras, de 2012. Las prestaciones están en el artículo 142." },
    { termino: "Salario integral", definicion: "Tu salario normal más la parte diaria de las utilidades y del bono vacacional." },
    { termino: "Garantía", definicion: "Lo que la empresa deposita cada trimestre en un fideicomiso o fondo a tu nombre." },
    { termino: "Retroactivo", definicion: "El cálculo final: 30 días por año con tu último salario." },
  ],
});
