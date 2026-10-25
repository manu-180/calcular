import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "dk.opsigelsesvarsel",
  h1: "Opsigelsesvarsel efter funktionærloven",
  title: "Opsigelsesvarsel: beregn dit varsel og din sidste dag",
  description:
    "Beregn opsigelsesvarslet efter funktionærloven, fra 1 til 6 måneder efter anciennitet. Se også din sidste dag i jobbet, hvis du selv siger op.",
  intro: [
    "Som funktionær har du et opsigelsesvarsel, der stiger med din anciennitet. Beregneren finder varslet og datoen for din fratræden.",
    "Vælg om arbejdsgiveren siger dig op, eller om du selv siger op. Skriv din ansættelsesdato og datoen for opsigelsen.",
  ],
  comoSeCalcula: [
    "I de første 6 måneder er arbejdsgiverens varsel {{dk.opsigelsesvarsel[foerste-6-maaneder]}}.",
    "Efter 6 måneder er varslet {{dk.opsigelsesvarsel[efter-6-maaneder]}}. Det stiger med {{dk.opsigelsesvarsel[tillaeg-hvert-3-aar]}} for hvert tredje ansættelsesår, højst til {{dk.opsigelsesvarsel[hoejst]}}.",
    "Ancienniteten regnes til fratrædelsesdagen. Derfor kan en opsigelse kort før 3, 6 eller 9 år give et længere varsel.",
    "Siger du selv op, er dit varsel {{dk.opsigelsesvarsel[funktionaer]}}.",
    "Varslet løber fra udgangen af den måned, hvor opsigelsen gives, og du fratræder ved en måneds udgang.",
  ],
  ejemplo: ["Er du ansat 1. januar 2023 og bliver opsagt 15. oktober 2025, giver 3 måneders varsel fratræden efter 3 år. Varslet bliver derfor 4 måneder, og din sidste dag er 28. februar 2026."],
  faq: [
    {
      pregunta: "Hvor langt er mit opsigelsesvarsel?",
      respuesta:
        "Det afhænger af, hvor længe du har været ansat. Typisk 1 måned i starten, 3 måneder efter 6 måneder og op til 6 måneder efter knap 9 år. Brug beregneren for din præcise dato.",
    },
    {
      pregunta: "Hvad er varslet under prøvetid?",
      respuesta: "Er du ansat på prøve i højst 3 måneder, kan arbejdsgiveren opsige dig med 14 dages varsel, når det er aftalt. Beregneren regner ikke med prøvetid.",
    },
    {
      pregunta: "Hvor lang tid skal jeg give, hvis jeg selv siger op?",
      respuesta: "Som funktionær skal du give {{dk.opsigelsesvarsel[funktionaer]}} varsel til fratræden ved en måneds udgang, medmindre din kontrakt siger andet.",
    },
    {
      pregunta: "Gælder reglerne, hvis jeg ikke er funktionær?",
      respuesta: "Beregneren bruger funktionærlovens regler. Er du ikke funktionær, så se dit varsel i din overenskomst eller kontrakt.",
    },
  ],
  glosario: [
    { termino: "Opsigelsesvarsel", definicion: "Tiden fra opsigelsen til den sidste dag i ansættelsen." },
    { termino: "Fratræden", definicion: "Den dag ansættelsen slutter." },
  ],
});
