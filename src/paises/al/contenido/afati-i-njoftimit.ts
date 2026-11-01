import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "al.afati-i-njoftimit",
  h1: "Afati i njoftimit {{anio}}",
  title: "Afati i njoftimit {{anio}}: sa kohë para largimit",
  description: "Llogaritni afatin e njoftimit për zgjidhjen e kontratës sipas vjetërsisë në punë. Vendosni muajt e punës.",
  intro: ["Kontrata me kohë të pacaktuar zgjidhet me një afat njoftimi që rritet me vjetërsinë. Vendosni muajt e punës."],
  comoSeCalcula: ["Afati varet nga sa ka zgjatur marrëdhënia e punës, sipas Kodit të Punës."],
  ejemplo: ["Sa më e gjatë marrëdhënia e punës, aq më i gjatë afati."],
  faq: [],
  glosario: [{ termino: "Afati i njoftimit", definicion: "Koha midis njoftimit dhe fundit të kontratës." }],
});
