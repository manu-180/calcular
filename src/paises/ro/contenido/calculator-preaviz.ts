import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ro.calculator-preaviz",
  h1: "Calculator preaviz: demisie și concediere",
  title: "Calculator preaviz demisie 2026: ultima zi de lucru",
  description:
    "Aflați durata preavizului la demisie sau la concediere și ultima zi estimată de lucru, în zile lucrătoare de la data comunicării.",
  intro: [
    "Preavizul este perioada dintre comunicarea demisiei sau a concedierii și încetarea contractului de muncă.",
    "Calculatorul arată durata în zile lucrătoare și data estimată la care se încheie.",
  ],
  comoSeCalcula: [
    "Durata depinde de situație: concediere {{ro.preaviz[concediere]}} lucrătoare, demisie {{ro.preaviz[demisie]}} lucrătoare, demisie dintr-o funcție de conducere {{ro.preaviz[demisie-conducere]}} lucrătoare.",
    "Termenul începe în ziua de după comunicare și se numără doar zilele de luni până vineri.",
  ],
  faq: [
    {
      pregunta: "Cât este preavizul la demisie?",
      respuesta: "Cel mult {{ro.preaviz[demisie]}} lucrătoare pentru funcțiile de execuție și cel mult {{ro.preaviz[demisie-conducere]}} lucrătoare pentru funcțiile de conducere.",
    },
  ],
  glosario: [
    { termino: "Preaviz", definicion: "Perioada în care contractul continuă după ce o parte a anunțat încetarea lui." },
  ],
});
