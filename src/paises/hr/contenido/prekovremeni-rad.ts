import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "hr.prekovremeni-rad",
  h1: "Prekovremeni rad {{anio}}: izračun plaće po satu",
  title: "Prekovremeni rad {{anio}}: izračun i granica {{hr.prekovremeni-godisnje}}",
  description: "Izračunajte plaću za prekovremene sate prema svojem postotku povećanja i provjerite zakonske granice: {{hr.prekovremeni-tjedno}} tjedno i {{hr.prekovremeni-godisnje}} godišnje.",
  intro: [
    "Za prekovremeni rad radnik ima pravo na povećanu plaću (Zakon o radu, čl. 94.). Zakon ne određuje koliko, nego to uređuju kolektivni ugovor, pravilnik o radu ili ugovor o radu. Zato postotak unosite sami.",
    "Ukupno radno vrijeme s prekovremenim ne smije biti dulje od {{hr.prekovremeni-tjedno}} tjedno, a pojedinačni prekovremeni rad ne smije prijeći {{hr.prekovremeni-godisnje}} godišnje.",
  ],
  comoSeCalcula: [
    "Bruto satnica je mjesečna bruto plaća podijeljena s fondom sati. Unaprijed je upisano 174 sata, a možete upisati svoj fond.",
    "Osnovna plaća za te sate je satnica puta prekovremeni sati, a povećanje je vaš postotak te svote.",
    "Kalkulator javlja ako s novim satima prelazite godišnju granicu od {{hr.prekovremeni-godisnje}}.",
  ],
  ejemplo: [
    "Bruto 2.000 eura i fond od 174 sata daju satnicu od 11,49 eura. Deset prekovremenih sati vrijedi 114,94 eura, a povećanje od 50 % još 57,47 eura. Ukupno 172,41 euro bruto.",
    "Taj iznos ulazi u bruto plaću tog mjeseca, pa se na njega plaćaju doprinosi i porez.",
  ],
  faq: [
    {
      pregunta: "Koliki je zakonski postotak povećanja?",
      respuesta: "Zakon o radu postotak ne propisuje. Članak 94. daje pravo na povećanu plaću, a visinu određuju kolektivni ugovor, pravilnik o radu ili ugovor. Vrijednost od 50 % ovdje je samo početni primjer.",
    },
    {
      pregunta: "Koliko prekovremenih sati smijem raditi?",
      respuesta: "Do {{hr.prekovremeni-godisnje}} godišnje, odnosno do 250 sati ako to određuje kolektivni ugovor (čl. 65.). S prekovremenim ukupno ne više od {{hr.prekovremeni-tjedno}} tjedno.",
    },
    {
      pregunta: "Vrijedi li povećanje i za rad nedjeljom i noću?",
      respuesta: "Da, članak 94. pravo na povećanu plaću daje i za noćni rad, rad nedjeljom i blagdanom te za otežane uvjete. Za svaki sat rada nedjeljom povećanje ne može biti manje od 50 % (čl. 94. st. 1.), a ostale postotke određuje vaš ugovor.",
    },
  ],
  glosario: [
    { termino: "Prekovremeni rad", definicion: "Rad iznad punog radnog vremena." },
    { termino: "Fond sati", definicion: "Broj radnih sati u mjesecu." },
    { termino: "Bruto satnica", definicion: "Plaća za jedan sat prije doprinosa i poreza." },
  ],
});
