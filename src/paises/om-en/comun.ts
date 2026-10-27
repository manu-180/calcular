// Campos y mensajes que comparten varias calculadoras de Omán (src/paises/om/lib).
export const NACIONALIDAD = { etiqueta: "Nationality", opciones: { omani: "Omani", expat: "Non-Omani" } } as const;

export const DIAS_MES = {
  etiqueta: "Days the monthly wage is divided by",
  ayuda: "The Labour Law does not say how to work out a day's pay. Enter what your contract says. If it says nothing, the calculator assumes 30 days.",
} as const;

export const INICIO = { etiqueta: "Start date of service" } as const;
export const FIN = { etiqueta: "End date of service" } as const;
export const SIN_GOCE = {
  etiqueta: "Days of special unpaid leave",
  ayuda: "They count as service but not towards the end-of-service gratuity (articles 80 and 83).",
} as const;

export const MENSAJES_SERVICIO = {
  "يجب أن يكون تاريخ انتهاء الخدمة بعد تاريخ بدايتها.": "The end date of service has to be after the start date.",
  "أيام الإجازة بدون أجر أكثر من مدة الخدمة.": "The unpaid leave days are more than the length of service.",
} as const;
