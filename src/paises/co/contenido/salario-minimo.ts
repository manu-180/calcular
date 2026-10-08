import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "co.salario-minimo",
  h1: "Salario mínimo 2026 en Colombia: valor mensual, diario y por hora",
  title: "Salario mínimo 2026 en Colombia: {{co.smmlv}}",
  description:
    "El salario mínimo 2026 en Colombia es {{co.smmlv}} y el auxilio de transporte {{co.auxilio-transporte}}. Mira cuánto es por día, por hora y por los días que trabajaste.",
  intro: [
    "El salario mínimo en Colombia es {{co.smmlv}} al mes desde el {{co.smmlv#desde}} (Decreto 1469 de 2025). Si ganas el mínimo, también te toca el auxilio de transporte de {{co.auxilio-transporte}}.",
    "En 2026, salario y auxilio suman $2.000.000 antes de descuentos. Por día son $58.364 y la hora ordinaria vale $8.338 con la jornada de 42 horas.",
  ],
  comoSeCalcula: [
    "Salario diario: el mínimo mensual dividido por 30.",
    "Valor de la hora: el mínimo dividido por las horas del mes. Con la jornada de {{co.jornada-semanal}}, se toman las horas de la semana divididas por 6 días y multiplicadas por 30.",
    "Por días trabajados: salario diario por los días del mes que trabajaste. El auxilio de transporte se calcula igual.",
  ],
  ejemplo: [
    "Si trabajaste 15 días del mes, te toca la mitad del salario mínimo y la mitad del auxilio de transporte.",
  ],
  faq: [
    {
      pregunta: "¿Cuánto es el salario mínimo con auxilio de transporte?",
      respuesta: "El salario mínimo es {{co.smmlv}} y el auxilio {{co.auxilio-transporte}}: en 2026 suman $2.000.000. A eso se le descuentan salud y pensión.",
    },
    {
      pregunta: "¿Cuánto me queda del mínimo después de descuentos?",
      respuesta: "En 2026 te descuentan $70.036 de salud y $70.036 de pensión. Con el auxilio de transporte, recibes $1.859.928.",
    },
    {
      pregunta: "¿Es cierto que el decreto del salario mínimo estuvo suspendido?",
      respuesta:
        "Sí. En febrero de 2026 el Consejo de Estado lo suspendió de forma provisional y el Gobierno fijó el mismo valor con un decreto transitorio. En julio se levantó la suspensión. El juicio de fondo sigue y, si cambia el valor, lo actualizamos.",
    },
    {
      pregunta: "¿Cuándo cambia el salario mínimo?",
      respuesta: "Cada año. El Gobierno fija el del año siguiente a más tardar el 30 de diciembre, y rige desde el 1 de enero.",
    },
  ],
  glosario: [
    { termino: "SMMLV", definicion: "Salario mínimo mensual legal vigente. También se escribe SMLMV." },
    { termino: "Auxilio de transporte", definicion: "Pago mensual que la empresa suma al salario de quienes ganan menos, para ayudar con el transporte al trabajo." },
  ],
});
