import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ba.doprinosi",
  h1: "Doprinosi na platu {{anio}}: PIO, zdravstvo, nezaposlenost",
  title: "Doprinosi na platu {{anio}}: stope u FBiH i RS",
  description: "Doprinosi iz plate su {{ba.doprinosi-ukupno@fbih}} u FBiH i {{ba.doprinosi-ukupno@rs}} u RS, ali različito podijeljeni. Upišite bruto i vidite iznos po osiguranju.",
  intro: [
    "Zbirna stopa doprinosa iz plate ista je u oba entiteta, {{ba.doprinosi-ukupno@fbih}}. Raspored nije isti: u FBiH za penzijsko ide {{ba.doprinosi[pio]@fbih}}, a u RS {{ba.doprinosi[pio]@rs}}, uz poseban doprinos za dječiju zaštitu od {{ba.doprinosi[djecija]@rs}}.",
    "U FBiH poslodavac uz to plaća {{ba.doprinosi-poslodavac-fbih-ukupno}} na bruto. U RS takvog dijela nema.",
  ],
  comoSeCalcula: [
    "FBiH, iz plate: penzijsko {{ba.doprinosi[pio]@fbih}}, zdravstveno {{ba.doprinosi[zdravstvo]@fbih}}, nezaposlenost {{ba.doprinosi[nezaposlenost]@fbih}}.",
    "FBiH, povrh bruta: penzijsko {{ba.doprinosi-poslodavac-fbih[pio]}}, zdravstveno {{ba.doprinosi-poslodavac-fbih[zdravstvo]}}, nezaposlenost {{ba.doprinosi-poslodavac-fbih[nezaposlenost]}}.",
    "RS, iz plate: penzijsko {{ba.doprinosi[pio]@rs}}, zdravstveno {{ba.doprinosi[zdravstvo]@rs}}, nezaposlenost {{ba.doprinosi[nezaposlenost]@rs}}, dječija zaštita {{ba.doprinosi[djecija]@rs}}.",
    "Svaki iznos je stopa puta bruto. Neoporezivi dio od {{ba.neoporezivo-rs}} u RS ne ulazi u osnovicu.",
  ],
  ejemplo: [
    "Za bruto 2.000 KM u oba entiteta ide 620 KM doprinosa. U FBiH to je 340 KM za PIO, 250 KM za zdravstvo i 30 KM za nezaposlenost, a poslodavac dodaje 100 KM.",
    "U RS je to 370 KM za PIO, 204 KM za zdravstvo, 12 KM za nezaposlenost i 34 KM za dječiju zaštitu.",
  ],
  faq: [
    {
      pregunta: "Odakle stope za FBiH?",
      respuesta: "Član 10 Zakona o doprinosima FBiH. Tačka 1 propisuje dio iz osnovice, a tačku 2 je izmijenio zakon iz „Službenih novina FBiH” 33/25, u primjeni od 1. jula 2025.",
    },
    {
      pregunta: "Odakle stope za RS?",
      respuesta: "Član 22 Zakona o doprinosima RS („Službeni glasnik RS” 114/17). Zakon iz 112/19 spustio je nezaposlenost na {{ba.doprinosi[nezaposlenost]@rs}}, a zakon iz 119/21 zdravstvo na {{ba.doprinosi[zdravstvo]@rs}}, od 1. januara 2022.",
    },
    {
      pregunta: "Da li doprinosi smanjuju porez?",
      respuesta: "U FBiH da: član 11 Zakona o porezu na dohodak ih tretira kao rashod. U RS ne: član 13, u tekstu iz 119/21, propisuje da je osnovica zbir bruto ličnih primanja.",
    },
  ],
  glosario: [
    { termino: "PIO", definicion: "Penzijsko i invalidsko osiguranje." },
    { termino: "Osnovica doprinosa", definicion: "Iznos na koji se računa stopa, obično bruto plata." },
    { termino: "Doprinos za dječiju zaštitu", definicion: "Doprinos koji se plaća samo u Republici Srpskoj." },
  ],
});
