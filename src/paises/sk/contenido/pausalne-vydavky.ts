import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.pausalne-vydavky",
  h1: "Paušálne výdavky {{anio}}",
  title: "Paušálne výdavky {{anio}}: {{sk.pausalne-percento}} a daň živnostníka",
  description: "Paušálne výdavky sú {{sk.pausalne-percento}} z príjmov, najviac {{sk.pausalne-max}}. Vypočítajte základ dane a daň {{sk.dan-znizena}} pre živnostníka.",
  intro: [
    "Živnostník si môže namiesto skutočných výdavkov uplatniť {{sk.pausalne-percento}} z príjmov, najviac {{sk.pausalne-max}} ročne. Povinné odvody sa k paušálu pripočítavajú zvlášť.",
    "Kalkulačka vypočíta základ dane, nezdaniteľnú časť a daň. Sadzba {{sk.dan-znizena}} platí pri zdaniteľných príjmoch do {{sk.hranica-zniz-dane}}, nad touto hranicou sa použijú pásma od {{sk.dan-z-prijmov[0].tasa}}.",
  ],
  comoSeCalcula: [
    "Paušál je {{sk.pausalne-percento}} z príjmov (§ 6 ods. 10 zákona o dani z príjmov), najviac {{sk.pausalne-max}} bez ohľadu na počet mesiacov podnikania.",
    "Základ dane sú príjmy mínus paušál a zaplatené odvody.",
    "Nezdaniteľná časť je {{sk.nezdanitelna-cast}}. Pri základe nad {{sk.nczd-hranica}} sa počíta ako {{sk.nczd-suma}} mínus tretina základu dane.",
    "Zo zvyšku sa vypočíta daň sadzbou {{sk.dan-znizena}} alebo v pásmach.",
  ],
  ejemplo: [
    "Pri príjmoch 60 000 eur a odvodoch 8 000 eur je paušál 20 000 eur a základ dane 32 000 eur. Nezdaniteľná časť klesne na 3 994,44 eura a daň vychádza 4 200,83 eura.",
  ],
  faq: [
    { pregunta: "Kto si môže uplatniť paušálne výdavky?", respuesta: "Podľa Finančnej správy daňovník, ktorý nie je platiteľom DPH, alebo je ním len časť roka. Registrácia podľa § 7 zákona o DPH nárok neberie." },
    { pregunta: "Musím viesť evidenciu aj pri paušále?", respuesta: "Áno. Povinná je evidencia príjmov v časovom slede a evidencia zásob a pohľadávok." },
    { pregunta: "Znižuje sa strop paušálu pri začatí podnikania počas roka?", respuesta: "Nie. Finančná správa uvádza, že suma {{sk.pausalne-max}} sa neurčuje podľa počtu mesiacov podnikania." },
  ],
  glosario: [
    { termino: "Paušálne výdavky", definicion: "Výdavky určené percentom z príjmov namiesto dokladov." },
    { termino: "Platiteľ DPH", definicion: "Podnikateľ registrovaný podľa § 4 zákona o DPH." },
  ],
});
