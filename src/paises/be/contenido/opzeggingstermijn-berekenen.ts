import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "be.opzeggingstermijn-berekenen",
  h1: "Opzeggingstermijn berekenen volgens het eenheidsstatuut",
  title: "Opzeggingstermijn berekenen {{anio}}: ontslag en zelf ontslag",
  description:
    "Bereken je opzeggingstermijn in weken bij ontslag door je werkgever, bij zelf ontslag of bij een tegenopzegging. Met de regels die sinds 1 augustus {{anio}} gelden.",
  intro: [
    "Sinds het eenheidsstatuut gelden voor arbeiders en bedienden dezelfde opzeggingstermijnen. De termijn hangt af van je anciënniteit en van wie de overeenkomst opzegt.",
    "Vul je datum van indiensttreding in en de datum waarop de opzegging ter kennis wordt gegeven. Je ziet de termijn in weken, wanneer hij start en wanneer hij eindigt.",
  ],
  comoSeCalcula: [
    "De opzeggingstermijn start op de maandag na de week waarin de opzegging ter kennis werd gegeven. De anciënniteit tellen we op die maandag.",
    "Ontslag door de werkgever: een vaste tabel tot 5 jaar anciënniteit, bijvoorbeeld {{be.opzegging-werkgever[m-24]}} weken vanaf 2 jaar. Daarna komen er per begonnen jaar weken bij.",
    "Zelf ontslag: korter, met een maximum van {{be.opzegging-werknemer[m-96]}} weken vanaf 8 jaar anciënniteit.",
    "Tegenopzegging: word je ontslagen en vind je een nieuwe job, dan kan je zelf met een kortere termijn vertrekken, maximaal {{be.opzegging-werknemer[t-12]}} weken.",
  ],
  ejemplo: [
    "Je werkt sinds 1 januari 2020 en je werkgever zegt op woensdag 14 oktober 2026 op. De termijn start op maandag 19 oktober. Met 6 jaar en 9 maanden anciënniteit is de termijn 21 weken.",
  ],
  faq: [
    {
      pregunta: "Wat veranderde er op 1 augustus 2026?",
      respuesta:
        "De opzeggingstermijnen in de eerste vijf jaar werden aangepast, zowel bij ontslag door de werkgever als bij zelf ontslag. Bij ontslag door de werkgever is de termijn in de eerste zes maanden nu {{be.opzegging-werkgever[m-0]}} week.",
    },
    {
      pregunta: "Is er een maximum op de opzeggingstermijn?",
      respuesta:
        "Voor contracten die starten vanaf 1 juni 2026 is de termijn bij ontslag door de werkgever {{be.opzegging-werkgever[plafond-nieuwe-contracten]}} weken vanaf 17 jaar anciënniteit, en groeit hij daarna niet meer aan. Voor oudere contracten blijft hij verder opbouwen.",
    },
    {
      pregunta: "Kan een cao andere termijnen vastleggen?",
      respuesta: "Nee. Van de opzeggingstermijnen in de wet kan een sectorale cao niet afwijken.",
    },
  ],
  glosario: [
    { termino: "Anciënniteit", definicion: "De periode waarin je ononderbroken bij dezelfde onderneming in dienst bent." },
    { termino: "Tegenopzegging", definicion: "Een kortere opzegging door een werknemer die ontslagen is en een andere job heeft gevonden." },
    { termino: "Eenheidsstatuut", definicion: "De regeling uit 2014 die de opzeggingstermijnen van arbeiders en bedienden gelijkschakelt." },
  ],
});
