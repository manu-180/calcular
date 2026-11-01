import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "is.leigutekjur",
  h1: "Skattur af leigutekjum {{anio}}",
  title: "Skattur af leigutekjum {{anio}}: reiknaðu skattinn",
  description: "Af leigutekjum íbúða er skattur {{is.fjarmagnstekjuskattur}} af {{is.leigutekjur-stofn}} fjárhæðarinnar, án frádráttar. Sláðu inn ársleiguna og sjáðu skattinn.",
  intro: [
    "Skatturinn er {{is.fjarmagnstekjuskattur}} af {{is.leigutekjur-stofn}} leigutekna af íbúðarhúsnæði, án frádráttar, ef skilyrðin eru uppfyllt. Sláðu inn leigu ársins og sjáðu hvað stendur eftir.",
    "Skilyrðin eru meðal annars að ekki séu fleiri en tvær eignir taldar til fjármagnstekna. Þetta er regla helstu talna Skattsins fyrir {{is.leigutekjur-stofn#desde}} og síðar.",
  ],
  comoSeCalcula: [
    "Skattstofninn er {{is.leigutekjur-stofn}} af leigutekjum.",
    "Skatturinn er {{is.fjarmagnstekjuskattur}} af stofninum.",
    "Viðhald, fasteignagjöld og annar kostnaður dragast ekki frá í þessum útreikningi.",
  ],
  ejemplo: [
    "Leiga upp á 250.000 kr. á mánuði gerir 3.000.000 kr. á ári. Stofninn er 2.250.000 kr. og skatturinn 495.000 kr. Eftir standa 2.505.000 kr., eða 208.750 kr. á mánuði.",
  ],
  faq: [
    { pregunta: "Má draga kostnað frá leigunni?", respuesta: "Nei. Samkvæmt helstu tölum Skattsins er skatturinn lagður á {{is.leigutekjur-stofn}} leigutekna án frádráttar, ef skilyrðin eru uppfyllt." },
    { pregunta: "Af hverju er þetta öðruvísi en í fyrra?", respuesta: "Í forsendum álagningar fyrir tekjuárið 2025 var 50% frádráttur af leigutekjum. Helstu tölur Skattsins fyrir árið 2026 segja að skatturinn leggist á {{is.leigutekjur-stofn}} leigutekna." },
    { pregunta: "Hvað ef ég leigi út fleiri en tvær eignir?", respuesta: "Þá er skilyrðið um fjármagnstekjur ekki uppfyllt. Fáðu leiðbeiningar hjá Skattinum, því að aðrar reglur geta átt við." },
    { pregunta: "Gildir frítekjumarkið um leigu?", respuesta: "Skatturinn nefnir frítekjumarkið um vaxtatekjur, arð og söluhagnað af skráðum hlutabréfum, ekki leigu. Reiknivélin dregur því ekkert frítekjumark frá." },
  ],
  glosario: [
    { termino: "Leigutekjur", definicion: "Greiðslur sem leigusali fær fyrir afnot af íbúð." },
    { termino: "Skattstofn", definicion: "Sá hluti leigunnar sem skatturinn reiknast af." },
  ],
});
