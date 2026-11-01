import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "lv.uzteikuma-termins",
  h1: "Uzteikuma termiņš {{anio}}: cik ilgi jāgaida",
  title: "Uzteikuma termiņš {{anio}}: darba devējam",
  description: "Noskaidrojiet darba devēja uzteikuma termiņu pēc uzteikuma pamata Darba likumā.",
  intro: ["Darba devēja uzteikuma termiņš atkarīgs no uzteikuma pamata. Izvēlieties pamatu, un kalkulators parādīs termiņu."],
  comoSeCalcula: ["Izvēlieties Darba likuma pamatu. Rezultāts ir likumā noteiktais termiņš, ja līgumā nav noteikts garāks."],
  faq: [],
  glosario: [],
});
