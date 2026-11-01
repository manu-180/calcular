import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "me.prekovremeni-rad",
  h1: "Prekovremeni rad {{anio}}: obračun bruto iznosa",
  title: "Prekovremeni rad {{anio}}: obračun uvećanja",
  description: "Izračunajte bruto iznos za prekovremene časove. Procenat uvećanja provjerite u kolektivnom ugovoru ili ugovoru o radu koji se kod vas primjenjuje.",
  intro: [
    "Zakon o radu visinu uvećanja ostavlja kolektivnom ugovoru i ugovoru o radu. Provjerite koji se akt kod vas primjenjuje.",
    "Ako vaš ugovor daje više, unesite taj procenat. Kalkulator računa cijenu časa i bruto za te časove.",
  ],
  comoSeCalcula: [
    "Cijena časa je osnovna bruto zarada podijeljena sa brojem radnih časova u mjesecu.",
    "Na časove po toj cijeni dodaje se uvećanje. Ako je rad i noću ili na praznik, procenti se sabiraju.",
    "Puno radno vrijeme je {{me.puno-radno-vrijeme}} sedmično. Sa prekovremenim radom ne smije biti u prosjeku duže od {{me.prekovremeni-prosjek}} u periodu od četiri mjeseca, ni duže od {{me.prekovremeni-sedmicno}} u jednoj sedmici.",
  ],
  ejemplo: [
    "Bruto 1.000 eura i 173 radna časa daju 5,78 eura po času. Deset prekovremenih časova vrijedi 57,80 eura po osnovnoj cijeni, a na to se dodaje uvećanje iz ugovora.",
  ],
  faq: [
    {
      pregunta: "Kako se uvodi prekovremeni rad?",
      respuesta: "Pisanom odlukom poslodavca prije početka rada, a kod hitnosti usmeno, uz odluku najkasnije tri radna dana poslije. Poslodavac o tome u roku od tri dana obavještava inspektora rada (Zakon o radu, čl. 64).",
    },
    {
      pregunta: "Ko ne smije da radi prekovremeno?",
      respuesta: "Zaposleni mlađi od 18 godina, trudnica i žena sa djetetom mlađim od tri godine (Zakon o radu, čl. 125). Samohrani roditelj djeteta do sedam godina može samo uz pisani pristanak.",
    },
    {
      pregunta: "Koliko se plaća rad nedjeljom?",
      respuesta: "Provjerite svoj granski ugovor. Opšti kolektivni ugovor je produžen do 30. aprila 2026, pa se za kasniji period oslonite na akt koji se kod vas primjenjuje.",
    },
  ],
  glosario: [
    { termino: "Prekovremeni rad", definicion: "Rad duži od ugovorenog radnog vremena, u slučajevima koje navodi zakon." },
    { termino: "Noćni rad", definicion: "Rad od 22 časa do šest časova narednog dana." },
    { termino: "Preraspodjela", definicion: "Raspored radnog vremena koji se ne smatra prekovremenim radom." },
  ],
});
