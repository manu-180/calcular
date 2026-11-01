import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.kurzova-kalkulacka",
  h1: "Kurzová kalkulačka podľa NBS",
  title: "Kurzová kalkulačka {{anio}}: kurzový lístok NBS na eurá",
  description: "Prepočítajte eurá na doláre, koruny, libry, forinty či zloté podľa kurzu NBS. Dnes je 1 euro {{sk.usd}}. Údaj má dátum a zdroj.",
  intro: [
    "Kalkulačka prepočítava eurá podľa kurzového lístka Národnej banky Slovenska. Posledný načítaný kurz: 1 euro je {{sk.usd}} a {{sk.czk}}.",
    "Kurz NBS je referenčný. Banka alebo zmenáreň vám ponúkne vlastný kurz s prirážkou, takže výsledok berte ako orientačný pre porovnanie ponúk.",
  ],
  comoSeCalcula: [
    "Z eur do inej meny sa suma vynásobí kurzom za jedno euro.",
    "Z inej meny na eurá sa suma vydelí tým istým kurzom.",
    "Kurzy sa dopĺňajú automaticky, ak ich NBS zverejní, a zobrazuje sa dátum posledného údaja.",
  ],
  ejemplo: ["Pri kurze 1,1172 dolára za euro je 100 eur spolu 111,72 dolára."],
  faq: [
    { pregunta: "Prečo sa na Slovensku počíta kurz za jedno euro?", respuesta: "Slovensko platí eurom, preto kurzový lístok uvádza, koľko jednotiek cudzej meny stojí jedno euro. Na opačný prepočet sa suma delí." },
    { pregunta: "Môžem kurz NBS použiť v účtovníctve?", respuesta: "Kalkulačka slúži na orientačný prepočet. Kurz na účtovné účely určuje zákon a váš účtovník." },
    { pregunta: "Odkiaľ sú kurzy?", respuesta: "Z kurzového lístka Národnej banky Slovenska, ktorý obsahuje referenčné kurzy eura." },
    { pregunta: "Prečo mi banka ponúka iný kurz?", respuesta: "Banky a zmenárne pridávajú k referenčnému kurzu vlastnú prirážku a poplatky." },
    { pregunta: "Zverejňuje NBS kurzy aj cez víkend?", respuesta: "Kalkulačka zobrazí posledný zverejnený kurz s jeho dátumom, cez víkend teda zvyčajne ten z piatka." },
  ],
  glosario: [
    { termino: "Referenčný kurz", definicion: "Kurz eura, ktorý zverejňuje centrálna banka." },
    { termino: "Kurzový lístok", definicion: "Prehľad kurzov mien k euru za daný deň." },
  ],
});
