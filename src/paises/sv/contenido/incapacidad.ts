import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sv.incapacidad",
  h1: "Calculadora de incapacidad del ISSS",
  title: "Incapacidad del ISSS: cuánto le pagan por día en El Salvador",
  description: "Calcule el subsidio por incapacidad: el ISSS paga el {{sv.isss-subsidio-porcentaje}} de su salario desde el día {{sv.isss-subsidio-dia-comun}} por enfermedad común. También sin ISSS.",
  intro: [
    "Cuando el médico le da incapacidad, el ISSS le paga un subsidio del {{sv.isss-subsidio-porcentaje}} de su salario. Por enfermedad o accidente común lo paga desde el día {{sv.isss-subsidio-dia-comun}}; por accidente de trabajo, desde el día {{sv.isss-subsidio-dia-profesional}}.",
    "Si su patrono no lo tiene inscrito en el ISSS, el Código de Trabajo lo obliga a pagarle el {{sv.incapacidad-patrono-porcentaje}} de su salario por una cantidad de días que depende de su antigüedad.",
  ],
  comoSeCalcula: [
    "Con ISSS: el salario diario (hasta el techo de {{sv.isss-salario-maximo}} al mes) por el {{sv.isss-subsidio-porcentaje}}, por cada día pagado. Del subsidio se descuenta la AFP del {{sv.afp-trabajador}}.",
    "Por enfermedad o accidente común los primeros días no se pagan: el ISSS empieza el día {{sv.isss-subsidio-dia-comun}}.",
    "Sin ISSS: el patrono paga el {{sv.incapacidad-patrono-porcentaje}} del salario básico. Con un año o más, hasta {{sv.incapacidad-patrono-dias[un-anio]}} por año. De cinco meses a un año, {{sv.incapacidad-patrono-dias[cinco-meses]}}. De uno a cinco meses, {{sv.incapacidad-patrono-dias[un-mes]}}.",
  ],
  ejemplo: ["Con $600 de salario y diez días de incapacidad por enfermedad común, el ISSS paga siete días a $15: $105, menos $7.61 de AFP."],
  faq: [
    {
      pregunta: "¿Me pagan los primeros tres días de incapacidad?",
      respuesta: "El ISSS no los paga si la causa es una enfermedad o un accidente común: el subsidio empieza el día {{sv.isss-subsidio-dia-comun}}. Si es un accidente de trabajo, paga desde el día siguiente.",
    },
    {
      pregunta: "¿Con qué salario calcula el ISSS el subsidio?",
      respuesta: "Con el salario medio de los meses que cotizó antes de la incapacidad (los tres primeros de los últimos cuatro), hasta el techo de cotización.",
    },
    {
      pregunta: "¿Cuánto tiempo puede durar el subsidio?",
      respuesta: "Hasta 52 semanas por la misma enfermedad, según lo que decidan los médicos del ISSS.",
    },
    {
      pregunta: "¿Dónde cobro el subsidio?",
      respuesta: "Se tramita en la sección de subsidios del ISSS o en su clínica, con la incapacidad emitida por el médico del Seguro.",
    },
  ],
  glosario: [
    { termino: "Incapacidad", definicion: "El permiso médico que le impide trabajar por un tiempo." },
    { termino: "Subsidio", definicion: "El pago que recibe mientras está incapacitado, en lugar del salario." },
  ],
});
