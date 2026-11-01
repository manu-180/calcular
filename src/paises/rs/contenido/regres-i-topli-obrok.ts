import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.regres-i-topli-obrok",
  h1: "Regres i topli obrok: bruto i trošak",
  title: "Topli obrok i regres {{anio}}: neto, bruto i trošak firme",
  description: "Topli obrok i regres oporezuju se kao zarada: porez {{rs.porez-na-zarade}} i doprinosi {{rs.pio-zaposleni}}, {{rs.zdravstvo}}, {{rs.nezaposlenost}}. Izračunajte bruto i trošak.",
  intro: [
    "Topli obrok i regres su deo zarade: na njih se plaća porez od {{rs.porez-na-zarade}} i doprinosi kao i na osnovnu platu. Neoporezivi iznos od {{rs.neoporezivi-iznos}} se ne koristi dva puta.",
    "Zakon ne određuje njihovu visinu. Pravo postoji u skladu sa opštim aktom i ugovorom o radu, pa unesite iznos koji važi kod vas i videćete šta to znači za firmu.",
  ],
  comoSeCalcula: [
    "Prvo se računa neto zarada iz osnovne bruto plate.",
    "Na taj neto se dodaje topli obrok, odnosno regres, pa se traži novi bruto iznos.",
    "Razlika između novog i osnovnog bruta je bruto vrednost dodatka. Poslodavac na nju plaća još {{rs.pio-poslodavac}} i {{rs.zdravstvo}}.",
    "Godišnji trošak je obrok za 12 meseci plus jedan regres.",
  ],
  ejemplo: [
    "Uz bruto od 100.000 dinara, 7.010 dinara neto za topli obrok traži 10.000 dinara bruto i firmu košta 11.515 dinara mesečno.",
    "Regres od 14.020 dinara neto traži 20.000 dinara bruto i košta 23.030 dinara. Za godinu to je ukupno 161.210 dinara.",
  ],
  faq: [
    {
      pregunta: "Da li je poslodavac dužan da plaća topli obrok i regres?",
      respuesta: "Zaposleni ima pravo na naknadu troškova za ishranu u toku rada i regres u skladu sa opštim aktom i ugovorom o radu, a iznos ishrane mora biti izražen u novcu (Zakon o radu, čl. 118).",
    },
    {
      pregunta: "Da li se na njih plaća porez?",
      respuesta: "Da. Zakon o radu u čl. 105 izuzima iz zarade samo primanja iz čl. 118 tač. 1 do 4 (prevoz, službeni put, teren), a ishrana i regres su tač. 5 i 6, pa ulaze u zaradu.",
    },
    {
      pregunta: "A prevoz do posla?",
      respuesta: "Prevoz nije deo zarade. Bez poreza je do 5.782 dinara mesečno, uz dokumentovane troškove (Zakon o porezu na dohodak građana, čl. 18).",
    },
  ],
  glosario: [
    { termino: "Topli obrok", definicion: "Naknada za ishranu u toku rada." },
    { termino: "Regres", definicion: "Naknada za korišćenje godišnjeg odmora." },
    { termino: "Opšti akt", definicion: "Kolektivni ugovor ili pravilnik o radu." },
  ],
});
