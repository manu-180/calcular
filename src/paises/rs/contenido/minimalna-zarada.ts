import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.minimalna-zarada",
  h1: "Minimalna zarada {{anio}}: kalkulator minimalca",
  title: "Minimalac {{anio}}: minimalna zarada po mesecima i časovima",
  description: "Minimalna cena rada je {{rs.minimalna-cena-rada}} po času. Izračunajte minimalnu neto i bruto zaradu za broj radnih časova u vašem mesecu.",
  intro: [
    "Minimalna cena rada iznosi {{rs.minimalna-cena-rada}} po radnom času, bez poreza i doprinosa. Važi od {{rs.minimalna-cena-rada#desde}}.",
    "Zato minimalac nije isti svakog meseca: zavisi od broja radnih časova. Unesite koliko časova ima vaš mesec i dobićete neto iznos, bruto i ono što plaća poslodavac.",
  ],
  comoSeCalcula: [
    "Minimalna neto zarada = broj radnih časova puta minimalna cena rada.",
    "Bruto se dobija dodavanjem poreza od {{rs.porez-na-zarade}} iznad {{rs.neoporezivi-iznos}} i doprinosa zaposlenog.",
    "Poslodavac na bruto plaća još {{rs.pio-poslodavac}} za PIO i {{rs.zdravstvo}} za zdravstvo.",
  ],
  ejemplo: [
    "Mesec sa 174 radna časa: 174 puta 371 dinar daje 64.554 dinara neto, koliko navodi i Ministarstvo finansija. Bruto je oko 87.206,71 dinara, a trošak poslodavca oko 100.418 dinara.",
    "U mesecu sa 184 radna časa ista cena rada daje 68.264 dinara neto.",
  ],
  faq: [
    {
      pregunta: "Koliki će biti minimalac u 2027. godini?",
      respuesta: "Vlada je 20. avgusta 2026. usvojila odluku o 405 dinara po radnom času za period januar-decembar 2027. To je oko 70.470 dinara mesečno za 174 časa. Sa novom godinom kalkulator sam prelazi na taj iznos.",
    },
    {
      pregunta: "Ko određuje minimalnu cenu rada?",
      respuesta: "Socijalno-ekonomski savet. Ako ne donese odluku u roku od 15 dana od početka pregovora, odluku u narednih 15 dana donosi Vlada (Zakon o radu, čl. 112).",
    },
    {
      pregunta: "Da li uz minimalac idu i uvećanja?",
      respuesta: "Da. Zaposleni koji prima minimalnu zaradu ima pravo na uvećanu zaradu, naknadu troškova i druga primanja (Zakon o radu, čl. 111).",
    },
    {
      pregunta: "Da li poslodavac sme da isplati manje od minimalca zato što je mesec kraći?",
      respuesta: "Ne ispod cene rada po času. Važi odluka o minimalnoj ceni rada za mesec u kome se vrši isplata (čl. 111).",
    },
  ],
  glosario: [
    { termino: "Minimalna cena rada", definicion: "Neto iznos po radnom času koji se utvrđuje za kalendarsku godinu." },
    { termino: "Minimalna zarada", definicion: "Zarada za standardni učinak i vreme provedeno na radu, određena na osnovu minimalne cene rada." },
    { termino: "Minimalac", definicion: "Uobičajen naziv za minimalnu zaradu." },
  ],
});
