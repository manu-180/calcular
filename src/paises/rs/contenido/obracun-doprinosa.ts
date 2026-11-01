import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.obracun-doprinosa",
  h1: "Obračun doprinosa na zaradu {{anio}}",
  title: "Doprinosi na platu {{anio}}: PIO, zdravstvo, nezaposlenost",
  description: "Obračun doprinosa na zaradu: {{rs.pio-zaposleni}} za PIO, {{rs.zdravstvo}} za zdravstvo, {{rs.nezaposlenost}} za nezaposlenost, uz najnižu i najvišu osnovicu.",
  intro: [
    "Zaposleni plaća {{rs.pio-zaposleni}} za PIO, {{rs.zdravstvo}} za zdravstvo i {{rs.nezaposlenost}} za nezaposlenost. Poslodavac dodaje {{rs.pio-poslodavac}} za PIO i {{rs.zdravstvo}} za zdravstvo.",
    "Osnovica ne može biti niža od {{rs.najniza-osnovica}} niti viša od {{rs.najvisa-osnovica}} mesečno. Te dve granice objavljuje ministar finansija za svaku godinu.",
  ],
  comoSeCalcula: [
    "Odredite osnovicu: to je bruto zarada, ograničena najnižom i najvišom mesečnom osnovicom.",
    "Pomnožite osnovicu svakom stopom. Svaka stavka se računa posebno.",
    "Saberite doprinose zaposlenog (iz zarade) i poslodavca (povrh zarade).",
  ],
  ejemplo: [
    "Bruto 100.000 dinara: zaposleni plaća 14.000 za PIO, 5.150 za zdravstvo i 750 za nezaposlenost, ukupno 19.900 dinara.",
    "Poslodavac plaća 10.000 za PIO i 5.150 za zdravstvo, ukupno 15.150 dinara. Svi doprinosi zajedno su 35.050 dinara.",
  ],
  faq: [
    {
      pregunta: "Kako se određuje najniža osnovica?",
      respuesta: "Čini je 35 odsto prosečne mesečne zarade u prethodnih 12 meseci (Zakon o doprinosima, čl. 37). Važi iznos od {{rs.najniza-osnovica}}, a objavljen je u „Službenom glasniku RS“ 112/2025.",
    },
    {
      pregunta: "A najviša osnovica?",
      respuesta: "Pet prosečnih zarada za isti period (čl. 42). Važi iznos od {{rs.najvisa-osnovica}} mesečno.",
    },
    {
      pregunta: "Zašto zaposleni i poslodavac ne plaćaju isto za PIO?",
      respuesta: "Zakon je stopu za PIO od {{rs.pio-samostalni}} podelio tako da zaposleni plaća {{rs.pio-zaposleni}}, a poslodavac {{rs.pio-poslodavac}} (čl. 44).",
    },
    {
      pregunta: "Važi li najniža osnovica i na nepuno radno vreme?",
      respuesta: "Kod jednog poslodavca da: ako je zarada niža, osnovica je najniža mesečna osnovica (čl. 40).",
    },
  ],
  glosario: [
    { termino: "PIO", definicion: "Penzijsko i invalidsko osiguranje." },
    { termino: "Najniža mesečna osnovica", definicion: "Najmanji iznos na koji se plaćaju doprinosi." },
    { termino: "Najviša mesečna osnovica", definicion: "Najveći iznos na koji se plaćaju doprinosi." },
  ],
});
