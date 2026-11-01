import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "me.obracun-doprinosa",
  h1: "Doprinosi na zaradu {{anio}}: šta plaća radnik, a šta firma",
  title: "Doprinosi {{anio}}: PIO {{me.pio-zaposleni}}, nezaposlenost {{me.nezaposlenost-zaposleni}} i Fond rada",
  description: "Zaposleni plaća PIO {{me.pio-zaposleni}} i nezaposlenost {{me.nezaposlenost-zaposleni}}, poslodavac {{me.nezaposlenost-poslodavac}} i Fond rada {{me.fond-rada}}. Izračunajte iznose za svoju bruto zaradu.",
  intro: [
    "Poslije programa Evropa sad doprinosi su znatno manji. Radnik plaća {{me.pio-zaposleni}} za PIO i {{me.nezaposlenost-zaposleni}} za nezaposlenost. Poslodavac za PIO plaća {{me.pio-poslodavac}}, za nezaposlenost {{me.nezaposlenost-poslodavac}} i za Fond rada {{me.fond-rada}}.",
    "Unesite bruto zaradu da vidite svaki iznos posebno, onako kako stoji na obračunu.",
  ],
  comoSeCalcula: [
    "Osnovica je bruto zarada, sa uvećanjima i naknadama na koje se plaća porez (Zakon o doprinosima, čl. 3a).",
    "Doprinosi iz zarade odbijaju se zaposlenom, a doprinosi na zaradu idu povrh bruta.",
    "Osnovica ne može biti niža od najniže mjesečne osnovice iz opšteg kolektivnog ugovora (čl. 9). Kod punog radnog vremena i minimalne zarade to obično nije slučaj, ali kod malog obima rada može biti.",
  ],
  ejemplo: [
    "Na bruto 1.000 eura zaposleni plaća 100 eura za PIO i 5 eura za nezaposlenost. Poslodavac dodaje 5 eura za nezaposlenost i 2 eura za Fond rada. Ukupno državi ide 112 eura doprinosa.",
  ],
  faq: [
    {
      pregunta: "Kolika je stopa za penzijsko osiguranje?",
      respuesta: "Član 15 Zakona o doprinosima propisuje {{me.pio-zaposleni}} na teret osiguranika i {{me.pio-poslodavac}} na teret poslodavca. To su stope iz izmjene objavljene u „Službenom listu CG“ 94/24.",
    },
    {
      pregunta: "Plaća li se još doprinos za zdravstvo?",
      respuesta: "Ne. Član 2 istog zakona poznaje samo doprinos za penzijsko i invalidsko osiguranje i doprinos za nezaposlenost.",
    },
    {
      pregunta: "Koje primanje je oslobođeno doprinosa?",
      respuesta: "Član 18a kaže da se doprinosi ne plaćaju na otpremnine, solidarne i socijalne pomoći, naknadu za odvojeni život, naknadu za novorođeno dijete i jubilarne nagrade, kao ni na zimnicu do 70 odsto prosječne bruto zarade iz prethodne godine.",
    },
  ],
  glosario: [
    { termino: "Fond PIO", definicion: "Fond koji prima doprinos za penzijsko i invalidsko osiguranje." },
    { termino: "Zavod za zapošljavanje", definicion: "Ustanova kojoj pripada doprinos za nezaposlenost." },
    { termino: "Osnovica doprinosa", definicion: "Iznos na koji se primjenjuje stopa, po pravilu bruto zarada." },
  ],
});
