import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "sk.dan-z-prijmov",
  h1: "Daň z príjmov {{anio}}",
  title: "Daň z príjmov {{anio}}: sadzby {{sk.dan-znizena}} až {{sk.dan-z-prijmov[-1].tasa}}",
  description: "Vypočítajte daň z príjmov fyzickej osoby: {{sk.dan-znizena}} pre živnostníkov, pásma {{sk.dan-z-prijmov[0].tasa}} až {{sk.dan-z-prijmov[-1].tasa}} a nezdaniteľná časť.",
  intro: [
    "Od {{sk.dan-z-prijmov#desde}} má daň z príjmov fyzických osôb štyri pásma: {{sk.dan-z-prijmov[0].tasa}}, {{sk.dan-z-prijmov[1].tasa}}, {{sk.dan-z-prijmov[2].tasa}} a {{sk.dan-z-prijmov[3].tasa}}. Živnostník s príjmami do {{sk.hranica-zniz-dane}} platí {{sk.dan-znizena}}.",
    "Staršie prehľady s pásmami 15, 19 a 25 % už pre rok 2026 neplatia v celom rozsahu. Pásmo 25 % sa znížilo a pribudli dve vyššie sadzby.",
  ],
  comoSeCalcula: [
    "Od základu dane sa odpočíta nezdaniteľná časť {{sk.nezdanitelna-cast}}, čo je 21-násobok životného minima {{sk.zivotne-minimum}}.",
    "Pri základe nad {{sk.nczd-hranica}} sa nezdaniteľná časť počíta ako {{sk.nczd-suma}} mínus tretina základu dane.",
    "Pásma sú do {{sk.dan-z-prijmov[1].desde}}, do {{sk.dan-z-prijmov[2].desde}}, do {{sk.dan-z-prijmov[3].desde}} a nad touto sumou.",
    "Pri podnikaní s príjmami do {{sk.hranica-zniz-dane}} sa celý základ zdaní sadzbou {{sk.dan-znizena}}.",
  ],
  ejemplo: [
    "Živnostník so základom dane 27 500 eur má nezdaniteľnú časť 5 494,44 eura. Zo sumy 22 005,56 eura zaplatí pri sadzbe 15 % daň 3 300,83 eura.",
  ],
  faq: [
    { pregunta: "Aké sú sadzby dane z príjmov v roku {{anio}}?", respuesta: "Podľa § 15 zákona o dani z príjmov {{sk.dan-z-prijmov[0].tasa}} do {{sk.dan-z-prijmov[1].desde}}, {{sk.dan-z-prijmov[1].tasa}} do {{sk.dan-z-prijmov[2].desde}}, {{sk.dan-z-prijmov[2].tasa}} do {{sk.dan-z-prijmov[3].desde}} a {{sk.dan-z-prijmov[3].tasa}} nad touto sumou." },
    { pregunta: "Komu patrí sadzba {{sk.dan-znizena}}?", respuesta: "Daňovníkovi s príjmami z podnikania alebo inej samostatnej zárobkovej činnosti do {{sk.hranica-zniz-dane}} za rok. Príjmy zo zamestnania sa ňou nezdaňujú." },
    { pregunta: "Má každý nárok na nezdaniteľnú časť?", respuesta: "Nie. Pri základe nad zákonnou hranicou sa znižuje a môže klesnúť na nulu. Dôchodca má nárok len vtedy, ak jeho dôchodok nepresiahne túto sumu (§ 11 ods. 6)." },
  ],
  glosario: [
    { termino: "Základ dane", definicion: "Príjmy znížené o výdavky alebo o povinné odvody." },
    { termino: "Životné minimum", definicion: "Suma, z ktorej zákon odvodzuje nezdaniteľnú časť aj pásma dane." },
  ],
});
