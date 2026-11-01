import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.otkazni-rok",
  h1: "Otkazni rok: kalkulator datuma",
  title: "Otkazni rok {{anio}}: {{rs.otkazni-zaposleni-min}} do {{rs.otkazni-zaposleni-max}} dana, poslednji dan",
  description: "Izračunajte poslednji dan otkaznog roka: {{rs.otkazni-zaposleni-min}} do {{rs.otkazni-zaposleni-max}} dana kad otkazujete vi, {{rs.otkazni-poslodavac-min}} do {{rs.otkazni-poslodavac-max}} za rezultate rada.",
  intro: [
    "Kad otkazujete vi, otkaz dostavljate najmanje {{rs.otkazni-zaposleni-min}} dana unapred, a opšti akt ili ugovor mogu da odrede najviše {{rs.otkazni-zaposleni-max}} dana.",
    "Kad vam poslodavac otkazuje zbog rezultata rada ili nedostatka znanja i sposobnosti, rok je od {{rs.otkazni-poslodavac-min}} do {{rs.otkazni-poslodavac-max}} dana, zavisno od staža osiguranja. Za druge razloge otkaza ovaj rok ne važi.",
  ],
  comoSeCalcula: [
    "Unesite ko otkazuje i datum dostavljanja otkaza.",
    "Ako ugovor određuje drugi rok u zakonskim granicama, unesite ga. U suprotnom se uzima minimum.",
    "Rok počinje narednog dana od dostavljanja, a kalkulator računa kalendarske dane.",
  ],
  ejemplo: [
    "Otkaz dostavljate 1. novembra i ugovor ništa posebno ne određuje. Rok je 15 dana, pa je poslednji dan 16. novembar.",
    "Ako poslodavac dostavi rešenje 1. novembra, a rok je 30 dana, poslednji dan je 1. decembar.",
  ],
  faq: [
    {
      pregunta: "Koliki je otkazni rok kad zaposleni daje otkaz?",
      respuesta: "Najmanje {{rs.otkazni-zaposleni-min}} dana pre dana koji je naveden kao dan prestanka radnog odnosa, a opštim aktom ili ugovorom najviše {{rs.otkazni-zaposleni-max}} dana (Zakon o radu, čl. 178).",
    },
    {
      pregunta: "Da li poslodavac uvek mora da poštuje otkazni rok?",
      respuesta: "Zakon ga predviđa za otkaz zbog rezultata rada ili znanja i sposobnosti, čl. 179 st. 1 tač. 1 (čl. 189).",
    },
    {
      pregunta: "Mogu li da prestanem da radim pre isteka roka?",
      respuesta: "Da, u dogovoru sa poslodavcem. Tada za to vreme imate naknadu zarade u visini utvrđenoj opštim aktom i ugovorom (čl. 189).",
    },
  ],
  glosario: [
    { termino: "Otkazni rok", definicion: "Vreme od dostavljanja otkaza do prestanka radnog odnosa." },
    { termino: "Staž osiguranja", definicion: "Vreme provedeno u obaveznom osiguranju, od koga zavisi dužina roka kad otkazuje poslodavac." },
    { termino: "Rešenje o otkazu", definicion: "Pisani akt kojim poslodavac otkazuje ugovor o radu." },
  ],
});
