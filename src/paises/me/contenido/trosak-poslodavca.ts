import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "me.trosak-poslodavca",
  h1: "Trošak poslodavca {{anio}}: koliko firmu košta zaposleni",
  title: "Trošak poslodavca {{anio}}: bruto zarada plus doprinosi na platu",
  description: "Poslodavac na bruto plaća {{me.nezaposlenost-poslodavac}} za nezaposlenost i {{me.fond-rada}} za Fond rada, a PIO je {{me.pio-poslodavac}}. Izračunajte mjesečni i godišnji trošak za jednog ili više radnika.",
  intro: [
    "Poslije izmjene zakona iz 2024. doprinos za PIO na teret poslodavca iznosi {{me.pio-poslodavac}}. Na bruto zaradu firma danas dodaje samo {{me.nezaposlenost-poslodavac}} za nezaposlenost i {{me.fond-rada}} za Fond rada, ukupno 0,7 odsto.",
    "Upišite bruto i broj zaposlenih. Kalkulator pokazuje trošak po osobi, mjesečni zbir i godišnji iznos, pa je zgodan za plan budžeta.",
  ],
  comoSeCalcula: [
    "Osnovica je bruto zarada zaposlenog (Zakon o doprinosima, čl. 3a). Na nju se računaju doprinosi poslodavca.",
    "Trošak po zaposlenom = bruto + doprinos za nezaposlenost + doprinos Fondu rada.",
    "Godišnji iznos je mjesečni zbir pomnožen sa dvanaest. Regres, topli obrok i druga primanja iz kolektivnog ugovora tu nijesu uračunati.",
  ],
  ejemplo: [
    "Pet radnika sa bruto zaradom od 1.500 eura. Za svakog firma plaća još 7,50 eura za nezaposlenost i 3 eura za Fond rada, što je 1.510,50 eura po osobi. Mjesečno to izlazi 7.552,50 eura, a za godinu 90.630 eura.",
  ],
  faq: [
    {
      pregunta: "Plaća li poslodavac još doprinos za PIO?",
      respuesta: "Plaća ga po stopi od {{me.pio-poslodavac}}. Član 15 Zakona o doprinosima za obavezno socijalno osiguranje propisuje {{me.pio-poslodavac}} na teret poslodavca i {{me.pio-zaposleni}} na teret osiguranika. Izuzetak je dodatni doprinos za staž sa uvećanim trajanjem (čl. 16).",
    },
    {
      pregunta: "Koliki je doprinos za nezaposlenost?",
      respuesta: "Član 18 istog zakona propisuje {{me.nezaposlenost-poslodavac}} na teret poslodavca i isto toliko na teret zaposlenog.",
    },
    {
      pregunta: "Šta je Fond rada i ko ga plaća?",
      respuesta: "Fond rada se finansira doprinosom od {{me.fond-rada}} na teret poslodavca, na istu osnovicu kao doprinos za nezaposlenost, prema podacima samog Fonda na gov.me. Iz njega se isplaćuju potraživanja zaposlenih kod poslodavca u stečaju (Zakon o radu, čl. 112).",
    },
  ],
  glosario: [
    { termino: "Doprinosi na zaradu", definicion: "Obaveze koje poslodavac plaća iz svojih sredstava, povrh bruto zarade." },
    { termino: "Doprinosi iz zarade", definicion: "Obaveze koje se odbijaju od bruto zarade zaposlenog." },
    { termino: "Staž sa uvećanim trajanjem", definicion: "Radna mjesta za koja se plaća dodatni doprinos od 6 do 28 odsto." },
  ],
});
