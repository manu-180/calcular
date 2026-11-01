import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.odvody-szco",
  h1: "Odvody SZČO {{anio}}",
  title: "Odvody SZČO {{anio}}: kalkulačka pre živnostníkov",
  description: "Vypočítajte odvody živnostníka: minimálny základ {{sk.min-vz-szco}}, zdravotné {{sk.zdravotne-odvody[szco]}} a minimálny preddavok {{sk.min-preddavok-szco}}.",
  intro: [
    "Minimálny vymeriavací základ SZČO je {{sk.min-vz-szco}}, čo znamená 303,11 eura do Sociálnej poisťovne mesačne. Do zdravotnej poisťovne je minimálny preddavok {{sk.min-preddavok-szco}}.",
    "Od januára 2026 sa zmenila definícia SZČO: povinnosť sa už neviaže na príjem, ale na oprávnenie podnikať. Pri nízkom príjme platí osobitný základ {{sk.osobitny-vz-szco}}.",
  ],
  comoSeCalcula: [
    "Ak bol príjem vyšší ako {{sk.hranica-prijmu-szco}}, vymeriavací základ je dvanástina základu dane vydelená koeficientom {{sk.koeficient-szco}}, najmenej {{sk.min-vz-szco}} a najviac {{sk.max-vymeriavaci-zaklad}}.",
    "Ak bol príjem do tejto hranice, sociálne poistenie sa platí z osobitného základu {{sk.osobitny-vz-szco}}.",
    "Sociálne poistenie tvorí nemocenské {{sk.odvody-szco[nemocenske]}}, starobné {{sk.odvody-szco[starobne]}}, invalidné {{sk.odvody-szco[invalidne]}} a rezervný fond {{sk.odvody-szco[rezervny]}}.",
    "Zdravotné poistenie je {{sk.zdravotne-odvody[szco]}} zo základu po rovnakom delení, najmenej {{sk.min-preddavok-szco}}.",
  ],
  ejemplo: [
    "Pri príjme 40 000 eur a základe dane 30 000 eur je vymeriavací základ 1 682,36 eura. Do Sociálnej poisťovne pôjde 557,69 eura, do zdravotnej poisťovne 269,17 eura, spolu 826,86 eura mesačne.",
  ],
  faq: [
    { pregunta: "Aké sú minimálne odvody živnostníka v roku {{anio}}?", respuesta: "Sociálne poistenie 303,11 eura zo základu {{sk.min-vz-szco}} a zdravotné {{sk.min-preddavok-szco}}, spolu 425,03 eura mesačne. Uvádza to Sociálna poisťovňa a VšZP." },
    { pregunta: "Čo je osobitný vymeriavací základ?", respuesta: "Je to 26 % priemernej mesačnej mzdy spred dvoch rokov, teda {{sk.osobitny-vz-szco}}. Platí pri príjme do {{sk.hranica-prijmu-szco}} a v prvých mesiacoch povinného poistenia novej SZČO." },
    { pregunta: "Kedy sa mení výška odvodov?", respuesta: "Vymeriavací základ podľa daňového priznania sa používa od 1. júla do 30. júna nasledujúceho roka, pri predĺženej lehote od 1. októbra do 30. septembra." },
  ],
  glosario: [
    { termino: "SZČO", definicion: "Samostatne zárobkovo činná osoba, napríklad živnostník." },
    { termino: "Odvodové prázdniny", definicion: "Obdobie na začiatku podnikania bez povinného sociálneho poistenia." },
  ],
});
