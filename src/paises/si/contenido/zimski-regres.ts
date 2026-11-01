import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.zimski-regres",
  h1: "Zimski regres {{anio}}: izračun zneska",
  title: "Zimski regres {{anio}}: koliko znaša in do kdaj",
  description: "Zimski regres je polovica minimalne plače {{si.minimalna-placa}}. Izračunajte znesek pri krajšem delovnem času ali krajši zaposlitvi.",
  intro: [
    "Zakon o pravici do zimskega regresa delavcu daje pravico do {{si.zimski-regres-delez}} minimalne plače. Pri minimalni plači {{si.minimalna-placa}} je polni znesek 740,94 €.",
    "Delodajalec ga mora izplačati v denarju, najpozneje 18 dni po preteku plačilnega obdobja za novembrsko plačo. FURS je kot datum izplačila objavil 18. december.",
  ],
  comoSeCalcula: [
    "Polni znesek = minimalna plača × {{si.zimski-regres-delez}}.",
    "Če je zaposlitev v letu krajša, pripada sorazmerni del po mesecih (drugi odstavek 2. člena ZPZR).",
    "Pri krajšem delovnem času pripada sorazmerni del, razen pri krajšem delovnem času po 67. ali 67.b členu ZDR-1.",
  ],
  ejemplo: [
    "Delavec z 50 odstotki delovnega časa je pri delodajalcu zaposlen šest mesecev. Znesek je 740,94 € × 0,5 × 6 / 12, torej 185,24 €.",
  ],
  faq: [
    {
      pregunta: "Ali se od zimskega regresa plača dohodnina?",
      respuesta: "Do zakonske višine se ne všteva v davčno osnovo, a skupaj s plačilom za poslovno uspešnost do meje iz 44. člena ZDoh-2 (4. člen ZPZR).",
    },
    {
      pregunta: "Ali se plačajo prispevki?",
      respuesta: "Do zakonske višine se ne všteva v osnovo za pokojninsko in invalidsko zavarovanje (5. člen ZPZR). Del nad to višino se šteje za drug prejemek iz delovnega razmerja.",
    },
    {
      pregunta: "Kaj če je podjetje nelikvidno?",
      respuesta: "Kolektivna pogodba dejavnosti lahko v tem primeru določi poznejši rok, a najpozneje do 31. marca naslednjega leta (3. člen ZPZR).",
    },
  ],
  glosario: [
    { termino: "Zimski regres", definicion: "Izplačilo delavcu ob koncu leta po ZPZR." },
    { termino: "ZPZR", definicion: "Zakon o pravici do zimskega regresa ter prenovi ugotavljanja davčne osnove z upoštevanjem normiranih odhodkov." },
  ],
});
