import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.doprinosi-za-obrtnike",
  h1: "Doprinosi za obrtnike {{anio}}",
  title: "Doprinosi za obrtnike {{anio}}: mjesečni iznos",
  description: "Izračunajte mjesečne doprinose obrtnika i slobodnih zanimanja prema osnovici iz Naredbe. Odaberite vrstu djelatnosti.",
  intro: ["Osnovica ovisi o načinu oporezivanja, a odredila ju je Naredba za 2026. Odaberite vrstu djelatnosti."],
  comoSeCalcula: ["Doprinosi se računaju na mjesečnu osnovicu iz Naredbe."],
  faq: [],
  glosario: [{ termino: "Osnovica", definicion: "Iznos na koji se računaju doprinosi." }],
});
