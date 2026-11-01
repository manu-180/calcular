import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.vypocet-cistej-mzdy",
  h1: "Výpočet čistej mzdy {{anio}}",
  title: "Výpočet čistej mzdy {{anio}}: kalkulačka z hrubej mzdy",
  description: "Vypočítajte si čistú mzdu z hrubej: odvody, nezdaniteľná časť {{sk.nezdanitelna-cast}}, daň od {{sk.dan-z-prijmov[0].tasa}} a daňový bonus na deti.",
  intro: [
    "Zdravotné poistenie zamestnanca je {{sk.zdravotne-odvody[zamestnanec]}} a sociálne spolu 9,4 %. Daň z príjmov začína na {{sk.dan-z-prijmov[0].tasa}} a pri vysokých mzdách stúpa až na {{sk.dan-z-prijmov[-1].tasa}}.",
    "Kalkulačka vám ukáže, koľko dostanete na účet, koľko odvedie zamestnávateľ a aká je celková cena práce. Pracuje s pravidlami konsolidácie platnými od {{sk.dan-z-prijmov#desde}}.",
  ],
  comoSeCalcula: [
    "Z hrubej mzdy sa odpočíta sociálne poistenie zamestnanca: nemocenské {{sk.odvody-zamestnanec[nemocenske]}}, starobné {{sk.odvody-zamestnanec[starobne]}}, invalidné {{sk.odvody-zamestnanec[invalidne]}} a v nezamestnanosti {{sk.odvody-zamestnanec[nezamestnanost]}}, najviac z {{sk.max-vymeriavaci-zaklad}} mesačne.",
    "Potom sa odpočíta zdravotné poistenie {{sk.zdravotne-odvody[zamestnanec]}}. Tento odvod strop nemá.",
    "Zo zvyšku sa odráta dvanástina nezdaniteľnej časti {{sk.nezdanitelna-cast}}, ak ste podpísali vyhlásenie.",
    "Preddavok na daň je {{sk.dan-z-prijmov[0].tasa}} do dvanástiny sumy {{sk.dan-z-prijmov[1].desde}} a vyššie sadzby {{sk.dan-z-prijmov[1].tasa}}, {{sk.dan-z-prijmov[2].tasa}} a {{sk.dan-z-prijmov[3].tasa}} z častí nad ňou.",
    "Nakoniec sa pripočíta daňový bonus: {{sk.danovy-bonus[do15]}} mesačne na dieťa do 15 rokov a {{sk.danovy-bonus[od15]}} na dieťa od 15 do 18 rokov.",
  ],
  ejemplo: [
    "Pri hrubej mzde 1 800 eur bez detí zaplatíte 169,20 eura na sociálne a 90 eur na zdravotné poistenie. Základ dane po odpočítaní nezdaniteľnej časti je 1 043,57 eura, preddavok 198,28 eura. Čistá mzda vychádza 1 342,52 eura.",
  ],
  faq: [
    { pregunta: "Koľko je čistá mzda z 1 800 eur v hrubom?", respuesta: "S uplatnenou nezdaniteľnou časťou a bez detí 1 342,52 eura. Pre iné údaje vyplňte kalkulačku." },
    { pregunta: "Aké sú sadzby dane z príjmov zamestnanca v roku {{anio}}?", respuesta: "Podľa § 15 zákona o dani z príjmov je to {{sk.dan-z-prijmov[0].tasa}} do {{sk.dan-z-prijmov[1].desde}} ročne, {{sk.dan-z-prijmov[1].tasa}} do {{sk.dan-z-prijmov[2].desde}}, {{sk.dan-z-prijmov[2].tasa}} do {{sk.dan-z-prijmov[3].desde}} a nad touto sumou {{sk.dan-z-prijmov[3].tasa}}." },
    { pregunta: "Aká je nezdaniteľná časť základu dane?", respuesta: "{{sk.nezdanitelna-cast}} ročne, teda 21-násobok životného minima {{sk.zivotne-minimum}}. Pri ročnom základe dane nad {{sk.nczd-hranica}} sa znižuje (§ 11 zákona o dani z príjmov)." },
    { pregunta: "Prečo stúplo zdravotné poistenie zamestnanca?", respuesta: "Od roku 2026 do konca roka 2027 je sadzba zamestnanca {{sk.zdravotne-odvody[zamestnanec]}} a zamestnávateľa {{sk.zdravotne-odvody[zamestnavatel]}}. Určuje to zákon o zdravotnom poistení ako súčasť konsolidácie." },
    { pregunta: "Znižuje sa daňový bonus pri vyššej mzde?", respuesta: "Áno. Nad ročným základom dane {{sk.bonus-hranica}} sa bonus na každé dieťa znižuje o desatinu rozdielu. Najviac môže dosiahnuť percentuálny limit zo základu dane podľa § 33." },
  ],
  glosario: [
    { termino: "Hrubá mzda", definicion: "Mzda pred odpočítaním odvodov a dane." },
    { termino: "Čiastkový základ dane", definicion: "Hrubá mzda znížená o odvody zamestnanca." },
    { termino: "Celková cena práce", definicion: "Hrubá mzda spolu s odvodmi zamestnávateľa." },
  ],
});
