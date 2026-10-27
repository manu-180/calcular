import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "md.polita-de-asigurare-medicala",
  h1: "Cât costă polița de asigurare medicală în {{anio}}",
  title: "Polița de asigurare medicală {{anio}}: {{md.prima-medicala-fixa}}",
  description: "Prima de asigurare obligatorie de asistență medicală în sumă fixă este {{md.prima-medicala-fixa}} în {{anio}}. Calculați suma pentru una sau mai multe persoane.",
  intro: [
    "Cine nu este asigurat prin salariu sau de stat poate cumpăra polița de asigurare obligatorie de asistență medicală, plătind prima în sumă fixă.",
    "Suma se stabilește în fiecare an prin legea fondurilor asigurării obligatorii de asistență medicală.",
  ],
  comoSeCalcula: [
    "Prima în sumă fixă pentru 2026 este {{md.prima-medicala-fixa}} pentru o persoană.",
    "Pentru persoanele de la pct. 1, 3 și 4 din anexa nr. 2 la Legea nr. 1593/2002 prima este {{md.prima-medicala-fixa-redusa}}, dacă nu fac parte și din alte categorii de plătitori.",
    "Calculatorul înmulțește prima cu numărul de persoane.",
  ],
  faq: [
    {
      pregunta: "Cât costă polița medicală în 2026?",
      respuesta: "{{md.prima-medicala-fixa}} pentru un an, conform art. 4 din Legea nr. 321/2025 a fondurilor asigurării obligatorii de asistență medicală pentru anul 2026.",
    },
    {
      pregunta: "Ce se întâmplă dacă am stat peste hotare mai mult de 183 de zile?",
      respuesta: "Cetățenii care dovedesc că au stat peste hotare mai mult de 183 de zile în anul bugetar devin asigurați după ce achită integral prima de {{md.prima-medicala-fixa}}.",
    },
    {
      pregunta: "Salariații trebuie să cumpere polița?",
      respuesta: "Nu. Pentru salariați se reține din salariu prima procentuală, iar ei sunt asigurați prin angajator.",
    },
  ],
  glosario: [
    { termino: "Prima în sumă fixă", definicion: "Suma anuală plătită de persoanele care se asigură singure în sistemul asigurării obligatorii de asistență medicală." },
    { termino: "CNAM", definicion: "Compania Națională de Asigurări în Medicină, care administrează fondurile asigurării medicale." },
  ],
});
