import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hn.isr-no-residentes",
  h1: "Retención del ISR a no residentes en Honduras",
  title: "ISR a no residentes en Honduras: tasas y retención",
  description: "Calcule cuánto ISR retener cuando paga a una persona o empresa no residente: {{hn.isr-no-residentes[salarios]}} por servicios, {{hn.isr-no-residentes[intereses]}} por intereses y más.",
  intro: [
    "Los ingresos de fuente hondureña que cobran personas o empresas no residentes pagan un impuesto con una tasa según el tipo de ingreso.",
    "Quien paga desde Honduras lo retiene. Elija el tipo de ingreso y le mostramos la tasa y el monto.",
  ],
  comoSeCalcula: [
    "Retención = monto pagado × tasa del tipo de ingreso.",
    "Tasas: {{hn.isr-no-residentes[alquileres]}} alquileres, {{hn.isr-no-residentes[salarios]}} servicios y salarios, {{hn.isr-no-residentes[dividendos]}} dividendos, {{hn.isr-no-residentes[intereses]}} intereses, {{hn.isr-no-residentes[regalias-patentes]}} regalías por marcas y patentes, {{hn.isr-no-residentes[otros]}} otros ingresos.",
  ],
  ejemplo: ["Una empresa paga L40,000 a un consultor que vive fuera de Honduras. Retiene L10,000 y le transfiere L30,000."],
  faq: [
    {
      pregunta: "¿Cuánto se retiene a un proveedor del exterior?",
      respuesta: "Depende del ingreso: {{hn.isr-no-residentes[salarios]}} por servicios, {{hn.isr-no-residentes[telecomunicaciones]}} por software y telecomunicaciones, {{hn.isr-no-residentes[otros]}} para otros ingresos no listados.",
    },
    {
      pregunta: "¿Quién paga este impuesto?",
      respuesta: "Lo retiene la persona o empresa que hace el pago y lo entera al SAR.",
    },
    {
      pregunta: "¿Un convenio tributario cambia la tasa?",
      respuesta: "Puede bajarla. Revise si Honduras tiene un convenio para evitar la doble tributación con el país del beneficiario.",
    },
  ],
  glosario: [
    { termino: "No residente", definicion: "Persona o empresa que no vive ni está domiciliada en Honduras." },
    { termino: "Fuente hondureña", definicion: "Ingresos que se generan por actividades, bienes o servicios usados en Honduras." },
  ],
});
