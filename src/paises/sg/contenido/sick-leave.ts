import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sg.sick-leave",
  h1: "Sick leave calculator for Singapore",
  title: "Sick leave entitlement Singapore: outpatient and hospital",
  description: "See your paid sick leave under the Employment Act: up to {{sg.licencia-ambulatoria[6]}} of outpatient sick leave and {{sg.licencia-hospitalizacion[6]}} of hospitalisation leave a year.",
  intro: [
    "Employees covered by the Employment Act get paid outpatient sick leave and paid hospitalisation leave once they have worked for their employer for {{sg.meses-minimos-licencias}}.",
    "Enter your months of service and the outpatient days you have already taken to see what is left this year.",
  ],
  comoSeCalcula: [
    "From 3 to 6 months of service, the entitlement is pro-rated: {{sg.licencia-ambulatoria[3]}} and {{sg.licencia-hospitalizacion[3]}} after 3 months, {{sg.licencia-ambulatoria[4]}} and {{sg.licencia-hospitalizacion[4]}} after 4 months, {{sg.licencia-ambulatoria[5]}} and {{sg.licencia-hospitalizacion[5]}} after 5 months.",
    "From 6 months, you get {{sg.licencia-ambulatoria[6]}} of outpatient sick leave and {{sg.licencia-hospitalizacion[6]}} of hospitalisation leave a year.",
    "The hospitalisation total includes outpatient sick leave, so each outpatient day you take also reduces it.",
  ],
  ejemplo: ["If you have taken 14 days of outpatient sick leave this year, you can still take 46 days of paid hospitalisation leave."],
  faq: [
    {
      pregunta: "What counts as hospitalisation leave?",
      respuesta: "Leave certified by a medical practitioner who can admit patients into hospital, for when you need hospital care or further rest or treatment after discharge.",
    },
    {
      pregunta: "Is hospitalisation leave on top of outpatient sick leave?",
      respuesta: "No. It is not an extension of outpatient leave. Both together are capped at the hospitalisation entitlement.",
    },
    {
      pregunta: "Do I get paid sick leave in my first 3 months?",
      respuesta: "Not under the Employment Act. You need at least {{sg.meses-minimos-licencias}} of service with your employer.",
    },
  ],
  glosario: [
    { termino: "Outpatient sick leave", definicion: "Paid leave when a doctor certifies you are unfit for work but you are not hospitalised." },
    { termino: "Hospitalisation leave", definicion: "Paid leave when a doctor who can admit patients certifies you need hospital care or rest after it." },
  ],
});
