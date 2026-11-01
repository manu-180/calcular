import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.pausal-kalkulator",
  h1: "Paušal kalkulator za preduzetnike {{anio}}",
  title: "Paušal kalkulator {{anio}}: porez i doprinosi preduzetnika",
  description: "Izračunajte mesečni porez i doprinose paušalca iz rešenja: porez {{rs.porez-samostalna-delatnost}}, PIO {{rs.pio-samostalni}}, zdravstvo {{rs.zdravstvo-samostalni}}, nezaposlenost {{rs.nezaposlenost}}.",
  intro: [
    "Preduzetnik paušalac plaća porez od {{rs.porez-samostalna-delatnost}} i doprinose: {{rs.pio-samostalni}} za PIO, {{rs.zdravstvo-samostalni}} za zdravstvo i {{rs.nezaposlenost}} za nezaposlenost. Sve se računa na paušalni prihod iz rešenja Poreske uprave.",
    "Taj prihod zavisi od delatnosti, opštine i drugih elemenata, pa ga ovaj kalkulator ne procenjuje. Unesite iznos iz vašeg rešenja i proverite mesečnu obavezu i granicu prometa od {{rs.pausal-limit-prometa}}.",
  ],
  comoSeCalcula: [
    "Porez = paušalni prihod puta {{rs.porez-samostalna-delatnost}}.",
    "Osnovica doprinosa je paušalni prihod, ali ne niža od {{rs.najniza-osnovica}} i ne viša od {{rs.najvisa-osnovica}}.",
    "Doprinosi su {{rs.pio-samostalni}}, {{rs.zdravstvo-samostalni}} i {{rs.nezaposlenost}} te osnovice.",
    "Mesečna obaveza je zbir poreza i doprinosa.",
  ],
  ejemplo: [
    "Paušalni prihod od 100.000 dinara: porez 10.000, PIO 24.000, zdravstvo 10.300 i nezaposlenost 750 dinara. Mesečno 45.050 dinara, godišnje 540.600 dinara.",
    "Ako je prihod 40.000 dinara, doprinosi se računaju na najnižu osnovicu, pa je obaveza oko 21.979,60 dinara.",
  ],
  faq: [
    {
      pregunta: "Do kog prometa mogu da budem paušalac?",
      respuesta: "Pravo se ne može priznati ako je promet u prethodnoj godini veći od {{rs.pausal-limit-prometa}} (Zakon o porezu na dohodak građana, čl. 40).",
    },
    {
      pregunta: "Kada moram u PDV sistem?",
      respuesta: "Mali obveznik je onaj čiji promet u prethodnih 12 meseci nije veći od {{rs.pdv-limit-prometa}} (Zakon o PDV, čl. 33). Evidentiran obveznik PDV ne može biti paušalac (čl. 40).",
    },
    {
      pregunta: "Do kada se podnosi zahtev za paušal?",
      respuesta: "Do 31. oktobra tekuće godine za narednu godinu, elektronski preko portala Poreske uprave. Nov preduzetnik podnosi zahtev pri registraciji (čl. 42).",
    },
    {
      pregunta: "Ko ne može biti paušalac?",
      respuesta: "Između ostalih, delatnosti reklamiranja i istraživanja tržišta, trgovina, hoteli i restorani, finansijsko posredovanje i poslovanje sa nekretninama, uz izuzetke iz zakona (čl. 40).",
    },
  ],
  glosario: [
    { termino: "Paušalac", definicion: "Preduzetnik koji plaća porez na paušalno utvrđen prihod." },
    { termino: "Paušalni prihod", definicion: "Osnovica koju utvrđuje Poreska uprava po kriterijumima zakona." },
    { termino: "Knjiga prometa", definicion: "Jedina poslovna knjiga koju paušalac mora da vodi (čl. 43)." },
  ],
});
