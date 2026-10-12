import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "uy.licencias-especiales",
  h1: "Licencias especiales: estudio, duelo, matrimonio y más",
  title: "Licencias especiales en Uruguay: cuántos días te tocan",
  description:
    "Calculá tus días de licencia especial con goce de sueldo: estudio, duelo, matrimonio, nacimiento de un hijo y cuidado de un familiar con discapacidad.",
  intro: [
    "Además de la licencia anual, la ley te da días pagos por estudio, duelo, matrimonio, nacimiento de un hijo y cuidado de familiares con discapacidad.",
    "Elegí el motivo y, si querés, poné tu sueldo. Te decimos cuántos días te corresponden y cuánto valen.",
  ],
  comoSeCalcula: [
    "Estudio: {{uy.licencias-especiales[estudio-36]}} por año si trabajás hasta 36 horas por semana, {{uy.licencias-especiales[estudio-47]}} si trabajás más de 36 y menos de 48, y {{uy.licencias-especiales[estudio-48]}} con 48 horas.",
    "Duelo: {{uy.licencias-especiales[duelo]}} hábiles. Matrimonio: {{uy.licencias-especiales[matrimonio]}}. Nacimiento de un hijo: {{uy.licencias-especiales[paternidad]}}.",
    "Controles médicos de un hijo con discapacidad: hasta {{uy.licencias-especiales[hijo-discapacidad]}} por año.",
    "Cuidado de un familiar con discapacidad o enfermedad terminal: {{uy.licencia-familiar-discapacidad[total]}} por año, de las que el empleador paga {{uy.licencia-familiar-discapacidad[empleador]}}.",
    "Cada día se paga como un día de trabajo: el sueldo mensual dividido entre 30.",
  ],
  ejemplo: ["Si ganás $ 45.000 y fallece un familiar directo, tenés 3 días hábiles pagos: $ 4.500."],
  faq: [
    {
      pregunta: "¿Cuántos días de licencia por duelo me corresponden?",
      respuesta: "{{uy.licencias-especiales[duelo]}} hábiles por el fallecimiento de padre, madre, hijos, cónyuge, concubino o hermanos. Tu convenio puede darte más o sumar a otros familiares.",
    },
    {
      pregunta: "¿Cuántos días de licencia por estudio tengo?",
      respuesta: "Entre {{uy.licencias-especiales[estudio-36]}} y {{uy.licencias-especiales[estudio-48]}} por año según tus horas semanales. Necesitás más de 6 meses en la empresa y presentar la constancia del examen.",
    },
    {
      pregunta: "¿Cuántos días me dan por casamiento?",
      respuesta: "{{uy.licencias-especiales[matrimonio]}}, y uno tiene que ser el día de la boda. Avisá con 30 días de anticipación.",
    },
    {
      pregunta: "¿Se descuentan de la licencia anual?",
      respuesta: "No. Son derechos aparte y no se pueden cambiar por plata.",
    },
  ],
  glosario: [
    { termino: "Con goce de sueldo", definicion: "Días que no trabajás pero cobrás igual." },
    { termino: "Ley 18.345", definicion: "La ley de licencias especiales de la actividad privada." },
  ],
});
