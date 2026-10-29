import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ch-it.saeule-3a-rechner",
  h1: "Pilastro 3a: importo massimo e risparmio d'imposta",
  title: "Calcolo pilastro 3a {{anio}}: massimo e risparmio d'imposta",
  description: "Pilastro 3a {{anio}}: fino a {{ch.saeule-3a-mit-pk}} con cassa pensioni, fino a {{ch.saeule-3a-ohne-pk}} senza. Massimo e risparmio sull'imposta federale diretta.",
  intro: [
    "I versamenti nel pilastro 3a si deducono dal reddito imponibile, per la Confederazione, il cantone e il comune. Chi è affiliato a una cassa pensioni può versare {{ch.saeule-3a-mit-pk}} all'anno.",
    "Senza cassa pensioni il limite è il {{ch.saeule-3a-ohne-pk-satz}} del reddito da attività lucrativa, al massimo {{ch.saeule-3a-ohne-pk}}. Il calcolatore mostra il tuo massimo e il risparmio sull'imposta federale diretta.",
  ],
  comoSeCalcula: [
    "Con cassa pensioni: l'8 % del limite superiore LPP, arrotondato a {{ch.saeule-3a-mit-pk}}.",
    "Senza cassa pensioni: il {{ch.saeule-3a-ohne-pk-satz}} del reddito da attività lucrativa, al massimo il 40 % del limite superiore LPP, cioè {{ch.saeule-3a-ohne-pk}}.",
    "Risparmio: imposta federale sul reddito imponibile meno imposta federale sul reddito dopo la deduzione del versamento, con le tariffe in vigore.",
  ],
  ejemplo: [
    "Una persona sola affiliata a una cassa pensioni, con 80’000 franchi di reddito imponibile, versa il massimo. La sua imposta federale diretta scende di circa 330 franchi. Il risparmio su cantone e comune si aggiunge.",
  ],
  faq: [
    { pregunta: "Quanto posso versare nel pilastro 3a nel 2026?", respuesta: "Con cassa pensioni {{ch.saeule-3a-mit-pk}}. Senza cassa pensioni il {{ch.saeule-3a-ohne-pk-satz}} del reddito da attività lucrativa, al massimo {{ch.saeule-3a-ohne-pk}}. Dal 2027 gli importi salgono a 7373 e 36’864 franchi." },
    { pregunta: "Posso recuperare gli anni mancati?", respuesta: "Sì, a determinate condizioni. Puoi colmare le lacune degli ultimi dieci anni se nell'anno del riscatto hai versato tutto il contributo ordinario e negli anni interessati avevi diritto di versare. Il riscatto annuo è limitato al piccolo importo massimo." },
    { pregunta: "Fino a quando posso versare?", respuesta: "Al massimo fino a cinque anni dopo l'età di riferimento, finché eserciti un'attività lucrativa. Nell'anno in cui smetti di lavorare puoi ancora versare il contributo intero." },
    { pregunta: "Possono versare entrambi i coniugi?", respuesta: "Sì. Se entrambi esercitano un'attività lucrativa, ciascuno può versare e dedurre fino al proprio massimo." },
  ],
  glosario: [
    { termino: "Pilastro 3a", definicion: "Previdenza individuale vincolata. Il versamento è possibile al più presto cinque anni prima dell'età di riferimento, prima solo nei casi previsti dalla legge, come l'acquisto di un'abitazione ad uso proprio." },
    { termino: "Limite superiore LPP", definicion: "Il salario annuo più alto assicurato nella previdenza professionale obbligatoria: {{ch.bvg-obere-grenze}}." },
  ],
});
