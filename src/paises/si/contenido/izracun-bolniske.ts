import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.izracun-bolniske",
  h1: "Izračun bolniške {{anio}}: nadomestilo plače",
  title: "Bolniška {{anio}}: izračun nadomestila plače",
  description: "Nadomestilo med bolniško: {{si.bolniska[bolezen-do90]}} osnove prvih 90 dni, nato {{si.bolniska[bolezen-nad90]}}. Izračunajte znesek po razlogu odsotnosti.",
  intro: [
    "Med bolezensko odsotnostjo dobite nadomestilo plače, ne celotne plače. Pri bolezni znaša {{si.bolniska[bolezen-do90]}} osnove prvih 90 dni in nato {{si.bolniska[bolezen-nad90]}}. Pri poškodbi pri delu je {{si.bolniska[poklicna]}}.",
    "Osnova je povprečna mesečna plača iz koledarskega leta pred nastankom odsotnosti (31. člen ZZVZZ). Nadomestilo ne more biti nižje od {{si.bolniska[najmanj]}} minimalne plače.",
  ],
  comoSeCalcula: [
    "Bolezen: {{si.bolniska[bolezen-do90]}} prvih 90 dni, nato {{si.bolniska[bolezen-nad90]}}.",
    "Poškodba zunaj dela: {{si.bolniska[poskodba-do90]}} prvih 90 dni, nato {{si.bolniska[poskodba-nad90]}}. Nega družinskega člana: {{si.bolniska[nega]}}. Poklicna bolezen ali poškodba pri delu: {{si.bolniska[poklicna]}}.",
    "Najnižje nadomestilo = minimalna plača {{si.minimalna-placa}} × {{si.bolniska[najmanj]}}. Znesek velja za polni mesec odsotnosti.",
  ],
  ejemplo: [
    "Osnova 2.000,00 € in bolezen prvih 90 dni: nadomestilo je 1.600,00 € bruto na mesec, torej 400,00 € manj od osnove.",
    "Najnižje nadomestilo znaša 889,13 €.",
  ],
  faq: [
    {
      pregunta: "Kdo plača bolniško?",
      respuesta: "Do 30 delovnih dni za posamezno odsotnost in največ 80 delovnih dni v letu delodajalec iz svojih sredstev. Pri daljši odsotnosti nadomestilo izplača v breme zdravstvenega zavarovanja (137. člen ZDR-1).",
    },
    {
      pregunta: "Kaj se zgodi po 90 dneh?",
      respuesta: "Pri bolezni se odstotek zviša z {{si.bolniska[bolezen-do90]}} na {{si.bolniska[bolezen-nad90]}}, pri poškodbi zunaj dela s {{si.bolniska[poskodba-do90]}} na {{si.bolniska[poskodba-nad90]}} (31. člen ZZVZZ).",
    },
    {
      pregunta: "Ali pri negi družinskega člana velja enako?",
      respuesta: "Pri negi družinskega člana nadomestilo znaša {{si.bolniska[nega]}} osnove ves čas, tudi po 90 dneh (31. člen ZZVZZ).",
    },
  ],
  glosario: [
    { termino: "Nadomestilo plače", definicion: "Plačilo za čas, ko delavec zaradi upravičenega razloga ne dela." },
    { termino: "ZZVZZ", definicion: "Zakon o zdravstvenem varstvu in zdravstvenem zavarovanju." },
  ],
});
