import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.osetrovne",
  h1: "Ošetrovné (OČR) {{anio}}",
  title: "Ošetrovné OČR {{anio}}: kalkulačka dávky na 14 dní",
  description: "Vypočítajte ošetrovné pri OČR: {{sk.davky[osetrovne]}} denného vymeriavacieho základu, najviac 14 dní. Najviac 771,70 eura.",
  intro: [
    "Ošetrovné je {{sk.davky[osetrovne]}} denného vymeriavacieho základu. Sociálna poisťovňa ho vypláca najviac 14 dní, v roku 2026 teda najviac 771,70 eura.",
    "Kalkulačka je určená pre bežné ošetrovanie člena rodiny, ľudovo OČR. Dlhodobé ošetrovné môže trvať až 90 dní a má iné podmienky, preto počítajte s ním zvlášť.",
  ],
  comoSeCalcula: [
    "Denný vymeriavací základ je mesačná mzda krát 12 vydelená 365, najviac {{sk.max-dvz}}.",
    "Ošetrovné je {{sk.davky[osetrovne]}} z tohto základu krát počet kalendárnych dní, najviac 14.",
    "Suma sa zaokrúhli na 10 centov nahor.",
  ],
  ejemplo: ["Pri mzde 1 500 eur a desiatich dňoch OČR dostanete 271,30 eura."],
  faq: [
    { pregunta: "Dostanem ošetrovné pri chorobe dieťaťa?", respuesta: "Dávka je určená na osobné a celodenné ošetrovanie chorého člena rodiny alebo starostlivosť o dieťa. Podmienky nároku posudzuje Sociálna poisťovňa podľa potvrdenia od lekára." },
    { pregunta: "Znižuje sa ošetrovné pri vyššej mzde?", respuesta: "Dávka rastie so mzdou až po strop denného vymeriavacieho základu. Pri ďalšom raste mzdy sa už nemení." },
    { pregunta: "Aké je maximálne ošetrovné?", respuesta: "V roku 2026 je najvyššia denná suma 55,11 eura a za 14 dní 771,70 eura, ako uvádza Sociálna poisťovňa." },
    { pregunta: "Ako dlho sa vypláca ošetrovné?", respuesta: "Bežné ošetrovné najviac 14 dní. Dlhodobé ošetrovné možno po splnení podmienok vyplácať najviac 90 dní." },
    { pregunta: "Platí sa počas OČR aj mzda?", respuesta: "Nie, namiesto mzdy dostávate dávku od Sociálnej poisťovne za kalendárne dni." },
  ],
  glosario: [
    { termino: "OČR", definicion: "Ošetrovanie člena rodiny, bežné označenie ošetrovného." },
    { termino: "Dlhodobé ošetrovné", definicion: "Dávka pri dlhšej starostlivosti o blízku osobu po hospitalizácii." },
  ],
});
