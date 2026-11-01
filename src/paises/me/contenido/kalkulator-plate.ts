import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "me.kalkulator-plate",
  h1: "Kalkulator plate {{anio}}: neto zarada iz bruto iznosa",
  title: "Kalkulator plate {{anio}}: bruto u neto, sa prirezom opštine",
  description: "Pretvorite bruto zaradu u neto: PIO {{me.pio-zaposleni}}, nezaposlenost {{me.nezaposlenost-zaposleni}}, porez {{me.porez-zarada[1].tasa}} i {{me.porez-zarada[2].tasa}} iznad 700 eura, plus prirez vaše opštine.",
  intro: [
    "U Crnoj Gori zaposleni iz bruto zarade plaća {{me.pio-zaposleni}} za penzijsko osiguranje i {{me.nezaposlenost-zaposleni}} za nezaposlenost. Do {{me.porez-zarada[0].hasta}} mjesečno porez se ne plaća, između {{me.porez-zarada[1].desde}} i {{me.porez-zarada[1].hasta}} stopa je {{me.porez-zarada[1].tasa}}, a iznad toga {{me.porez-zarada[2].tasa}}.",
    "Upišite bruto iznos iz ugovora i stopu prireza svoje opštine. Dobićete platu koja stiže na račun i tačan pregled svakog odbitka.",
    "Zdravstveni doprinos je ukinut, pa ga na obračunskoj listi više nema.",
  ],
  comoSeCalcula: [
    "Doprinosi se računaju na cijelu bruto zaradu: PIO {{me.pio-zaposleni}} i nezaposlenost {{me.nezaposlenost-zaposleni}}, ukupno 10,5 odsto.",
    "Porez se računa takođe na bruto, jer doprinosi ne umanjuju osnovicu. Svaki dio zarade plaća stopu svog razreda, pa dio do 700 eura ostaje oslobođen i kod većih plata.",
    "Prirez je procenat na obračunati porez. Stopu određuje opština u kojoj živite.",
    "Neto zarada = bruto, minus doprinosi, minus porez, minus prirez.",
  ],
  ejemplo: [
    "Uzmimo bruto 1.245 eura, koliko je prema MONSTAT-u iznosila prosječna zarada za septembar 2026, uz prirez od 13 odsto. Doprinosi su 130,73 eura. Porez je 63,75 eura: 27 eura na dio od 700 do 1.000 i 36,75 eura na ostatak. Prirez je 8,29 eura, a na račun stiže 1.042,23 eura.",
    "MONSTAT je za isti mjesec objavio prosječnu neto zaradu od 1.043 eura, što se dobro slaže sa ovim obračunom.",
  ],
  faq: [
    {
      pregunta: "Od kog iznosa se plaća porez na zaradu?",
      respuesta: "Od dijela koji prelazi {{me.porez-zarada[0].hasta}} mjesečno. Član 10 Zakona o porezu na dohodak fizičkih lica, u tekstu iz „Službenog lista CG“ 160/25, propisuje 0 odsto do tog iznosa, {{me.porez-zarada[1].tasa}} do {{me.porez-zarada[1].hasta}} i {{me.porez-zarada[2].tasa}} preko toga.",
    },
    {
      pregunta: "Da li se plaća doprinos za zdravstvo?",
      respuesta: "Ne. Član 2 Zakona o doprinosima za obavezno socijalno osiguranje navodi samo dva doprinosa: za penzijsko i invalidsko osiguranje i za osiguranje od nezaposlenosti.",
    },
    {
      pregunta: "Koliku stopu prireza da unesem?",
      respuesta: "Stopu svoje opštine. Uputstvo o obračunu poreza i doprinosa (čl. 6) kaže da stopu propisuje jedinica lokalne samouprave i da je osnovica obračunati porez. Ako je zarada do 700 eura, poreza nema, pa nema ni prireza.",
    },
    {
      pregunta: "Važi li gornja granica za doprinose kod visokih plata?",
      respuesta: "Član 14 Zakona o doprinosima predviđa najvišu godišnju osnovicu za PIO, koju svake godine utvrđuje ministarstvo finansija. Akt za ovu godinu nismo našli, pa kalkulator tu granicu ne primjenjuje. Kod veoma visokih zarada neto može biti nešto veći.",
    },
  ],
  glosario: [
    { termino: "Bruto zarada", definicion: "Iznos koji uključuje neto zaradu, porez i doprinose koje plaća zaposleni." },
    { termino: "Prirez", definicion: "Dodatak na porez na dohodak koji pripada opštini." },
    { termino: "PIO", definicion: "Penzijsko i invalidsko osiguranje, čija sredstva idu Fondu PIO." },
    { termino: "Neto zarada", definicion: "Ono što zaposleni primi na račun poslije svih odbitaka." },
  ],
});
