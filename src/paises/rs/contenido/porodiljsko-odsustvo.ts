import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.porodiljsko-odsustvo",
  h1: "Porodiljsko odsustvo: obračun naknade",
  title: "Porodiljsko odsustvo {{anio}}: naknada zarade",
  description: "Izračunajte naknadu zarade za porodiljsko odsustvo iz zbira osnovica za poslednjih 18 meseci.",
  intro: ["Osnovica se određuje iz zbira mesečnih osnovica za poslednjih 18 meseci pre početka odsustva."],
  comoSeCalcula: ["Zbir mesečnih osnovica podelite sa 18."],
  faq: [],
  glosario: [],
});
