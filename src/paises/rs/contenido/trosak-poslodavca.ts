import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.trosak-poslodavca",
  h1: "Trošak poslodavca po zaposlenom {{anio}}",
  title: "Trošak poslodavca {{anio}}: šta firmu košta jedna plata",
  description: "Izračunajte ukupan trošak zarade: na bruto se dodaju {{rs.pio-poslodavac}} za PIO i {{rs.zdravstvo}} za zdravstvo. Vidite i koliko ide državi, a koliko zaposlenom.",
  intro: [
    "Na bruto zaradu poslodavac plaća još {{rs.pio-poslodavac}} za PIO i {{rs.zdravstvo}} za zdravstveno osiguranje, ukupno 15,15 odsto.",
    "Kalkulator pokazuje koliko firmu košta jedan zaposleni mesečno i godišnje i koji deo tog iznosa zaista stiže do zaposlenog.",
  ],
  comoSeCalcula: [
    "Osnovica je bruto zarada, ali ne niža od {{rs.najniza-osnovica}} i ne viša od {{rs.najvisa-osnovica}}.",
    "Doprinosi poslodavca su {{rs.pio-poslodavac}} i {{rs.zdravstvo}} te osnovice. Doprinos za nezaposlenost plaća samo zaposleni.",
    "Trošak poslodavca = bruto zarada + doprinosi poslodavca.",
    "Godišnji trošak je mesečni trošak puta 12 puta broj zaposlenih. Topli obrok, regres i druga primanja dodajte u bruto ako ih firma isplaćuje.",
  ],
  ejemplo: [
    "Za bruto od 100.000 dinara poslodavac plaća 10.000 dinara za PIO i 5.150 za zdravstvo. Ukupan trošak je 115.150 dinara, a zaposleni dobija 73.522,10 dinara.",
    "Državi od tog iznosa ide 41.627,90 dinara, što je malo više od 36 odsto ukupnog troška.",
  ],
  faq: [
    {
      pregunta: "Koje doprinose plaća poslodavac?",
      respuesta: "Za PIO {{rs.pio-poslodavac}} i za zdravstvo {{rs.zdravstvo}} (Zakon o doprinosima, čl. 44). Stopa za PIO na teret poslodavca je manja od one koju plaća zaposleni, {{rs.pio-zaposleni}}.",
    },
    {
      pregunta: "Šta ako je zarada niža od najniže osnovice?",
      respuesta: "Doprinosi se plaćaju na {{rs.najniza-osnovica}} (čl. 36 i 40), pa je trošak srazmerno veći pri nepunom radnom vremenu.",
    },
    {
      pregunta: "Da li postoje olakšice za novozaposlene?",
      respuesta: "Da, zakon u čl. 45 predviđa povraćaj dela poreza i doprinosa pod uslovima za novozaposlena lica, ali ih ovaj obračun ne uračunava. Proverite uslove kod Poreske uprave.",
    },
  ],
  glosario: [
    { termino: "Bruto 2", definicion: "Bruto zarada sa doprinosima poslodavca." },
    { termino: "Doprinosi na teret poslodavca", definicion: "Doprinosi koje firma plaća povrh bruto zarade." },
    { termino: "Najviša osnovica", definicion: "Granica iznad koje se doprinosi više ne plaćaju." },
  ],
});
