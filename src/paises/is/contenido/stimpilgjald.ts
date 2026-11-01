import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.stimpilgjald",
  h1: "Stimpilgjald {{anio}}: reiknaðu gjaldið við íbúðakaup",
  title: "Stimpilgjald {{anio}}: reiknaðu gjald við íbúðakaup",
  description: "Stimpilgjald er {{is.stimpilgjald[einstaklingur]}} af fasteignamati, {{is.stimpilgjald[fyrstu]}} við fyrstu kaup og {{is.stimpilgjald[logadili]}} hjá lögaðila.",
  intro: [
    "Stimpilgjald er {{is.stimpilgjald[einstaklingur]}} af fasteignamati ef kaupandi er einstaklingur og {{is.stimpilgjald[logadili]}} ef kaupandi er lögaðili. Við fyrstu kaup einstaklings á íbúðarhúsnæði er það {{is.stimpilgjald[fyrstu]}}.",
    "Gjaldið reiknast af fasteignamati, ekki kaupverði. Þinglýsingargjald er {{is.thinglysingargjald}} á hvert skjal, samkvæmt gjaldskrá sýslumanna.",
  ],
  comoSeCalcula: [
    "Matsverðið í fasteignaskrá við útgáfu skjals er margfaldað með hlutfallinu sem á við kaupandann.",
    "Við bætist {{is.thinglysingargjald}} fyrir hvert skjal sem þú þinglýsir.",
    "Við fyrstu kaup þarf yfirlýsing um fyrstu kaup að fylgja skjalinu, annars reiknast fullt gjald.",
  ],
  ejemplo: [
    "Íbúð með fasteignamat upp á 60.000.000 kr.: einstaklingur greiðir 480.000 kr., við fyrstu kaup 240.000 kr. og lögaðili 960.000 kr. Með einu skjali bætast 3.800 kr. við.",
  ],
  faq: [
    { pregunta: "Hvað ræður matsverðinu?", respuesta: "Á Ísland.is stendur að miðað sé við matsverð í fasteignaskrá við útgáfu skjals, og að byggingarstig eignar við afhendingu skipti líka máli. Athugaðu skráninguna áður en þú treystir tölunni." },
    { pregunta: "Af hverju fasteignamat en ekki kaupverð?", respuesta: "Á Ísland.is stendur að stimpilgjald reiknist af matsverði eignar eins og það er skráð í fasteignaskrá við útgáfu skjals." },
    { pregunta: "Hverjir fá hálft stimpilgjald?", respuesta: "Einstaklingar við fyrstu kaup á íbúðarhúsnæði, gegn yfirlýsingu um fyrstu kaup með skjalinu." },
    { pregunta: "Hvað kostar þinglýsing?", respuesta: "{{is.thinglysingargjald}} á hvert skjal, samkvæmt gjaldskrá sýslumanna." },
  ],
  glosario: [
    { termino: "Fasteignamat", definicion: "Opinbert mat á verðgildi fasteignar." },
    { termino: "Þinglýsing", definicion: "Skráning skjals hjá sýslumanni svo að það öðlist réttaráhrif." },
  ],
});
