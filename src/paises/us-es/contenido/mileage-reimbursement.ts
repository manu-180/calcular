import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "us-es.mileage-reimbursement",
  h1: "Calculadora de millaje del IRS",
  title: "Calculadora de millaje 2026: tarifa del IRS por milla",
  description: "Convierta millas en dólares con las tarifas estándar del IRS para 2026: {{us.mileage-business}} por milla de negocios hoy, más las tarifas médica y de caridad.",
  intro: [
    "El IRS fija tarifas estándar por milla que los empleadores usan para reembolsar el manejo y que los trabajadores por cuenta propia usan para deducirlo.",
    "En 2026 el IRS subió las tarifas de negocios y médica desde el 1 de julio por los precios del combustible, así que la fecha de sus viajes importa.",
  ],
  comoSeCalcula: [
    "Elija el motivo y la fecha de los viajes para obtener la tarifa correcta.",
    "Cada milla de negocios vale hoy {{us.mileage-business}}. Las millas médicas y de mudanza militar valen {{us.mileage-medical}}. Las millas de caridad valen {{us.mileage-charity}}, una tarifa fijada por ley.",
    "Multiplique las millas por la tarifa.",
  ],
  ejemplo: [
    "1,000 millas de negocios manejadas en marzo de 2026 valen $725. Las mismas millas en agosto de 2026 valen $760.",
  ],
  faq: [
    { pregunta: "¿Cuál es la tarifa de millaje del IRS para 2026?", respuesta: "Desde el {{us.mileage-business#desde}} es de {{us.mileage-business}} por milla de negocios y {{us.mileage-medical}} por milla médica o de mudanza. Las dos tarifas eran más bajas en la primera mitad del año. La de caridad sigue en {{us.mileage-charity}}." },
    { pregunta: "¿Mi empleador tiene que pagar la tarifa del IRS?", respuesta: "La ley federal no lo exige. Muchos empleadores la usan igual porque los reembolsos hasta esa tarifa bajo un plan responsable no pagan impuestos. Algunos estados tienen sus propias reglas de reembolso." },
    { pregunta: "¿Puedo deducir las millas de ida y vuelta al trabajo?", respuesta: "No. Manejar entre su casa y su lugar de trabajo habitual es traslado personal, no viaje de negocios." },
  ],
  glosario: [
    { termino: "Tarifa estándar por milla", definicion: "Un monto fijo por milla que cubre gasolina, desgaste, seguro y depreciación." },
    { termino: "Plan responsable (accountable plan)", definicion: "Un plan de reembolso del empleador que exige documentar las millas y devolver lo que sobre." },
  ],
});
