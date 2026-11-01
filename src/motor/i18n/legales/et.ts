import type { DiccionarioLegal } from "./tipos";

export const et: DiccionarioLegal = ({ actualizado, mail }) => ({
  base: {
    sobre: {
      title: "Meist | CalcularYa",
      description: "CalcularYa teeb iga riigi jaoks kalkulaatoreid töö, raha ja igapäevaelu tarbeks, ning numbrid tulevad ametlikest allikatest.",
      h1: "Meist",
      bajada: "Kalkulaatorid igale riigile, igaühes selle riigi ametlikud numbrid.",
      bloques: [
        {
          parrafos: [
            "CalcularYa on veebileht, mille kalkulaatoritega saad vastuse igapäevastele küsimustele: palk, laenud, maksud, kuupäevad ja palju muud.",
            "Lehte teeb Manuel Navarro, kes teeb ka lehte calcular.ar, kus on kalkulaatorid Argentina jaoks.",
          ],
        },
        {
          titulo: "Kuidas me töötame",
          parrafos: [
            "Kui arvutus sõltub mõnest reeglist (miinimumpalgast, maksemäärast või ülempiirist), võtame väärtuse riigi ametlikust allikast: õigusaktide kogust, ministeeriumist, keskpangast või maksuametist.",
            "Salvestame lingi ja kontrollimise kuupäeva ning näitame neid iga kalkulaatori juures.",
            "Kui väärtust ei saa ametlikust allikast kinnitada, siis seda kasutavat kalkulaatorit ei avaldata.",
            "Kui reegel muutub, muutub ka kalkulaator ning muudatus kantakse selle riigi muudatuste logisse.",
          ],
        },
        { titulo: "Tasuta", parrafos: ["Kalkulaatorid on tasuta ja töötavad ilma kontota."] },
      ],
    },
    contacto: {
      title: "Kontakt | CalcularYa",
      description: "Kirjuta meile, kui mõni väärtus on aegunud, tulemus ei klapi või sul on puudu mõni kalkulaator või riik.",
      h1: "Kontakt",
      bajada: `Meie e-posti aadress on ${mail}.`,
      bloques: [
        {
          parrafos: [
            "Anna meile teada, kui mõni väärtus on aegunud, tulemus erineb sinu ootustest või mõni kalkulaator või riik on puudu.",
            "Kui asi puudutab mõnda väärtust, kirjuta, millise riigiga on tegu ja millisel lehel sa seda nägid.",
            "Sinu kirjale vastab päris inimene. Vastus võib võtta paar päeva.",
          ],
        },
      ],
    },
    privacidad: {
      title: "Privaatsus | CalcularYa",
      description: "Milliseid andmeid CalcularYa kasutab: kalkulaatorisse sisestatud andmeid töödeldakse brauseris ja me ei salvesta neid.",
      h1: "Privaatsus",
      bajada: `Viimati uuendatud: ${actualizado}.`,
      bloques: [
        {
          titulo: "Mida sa kalkulaatorisse sisestad",
          parrafos: ["Arvutus tehakse sinu brauseris. Sisestatud väärtusi ei saadeta ühelegi serverile ja me ei salvesta neid."],
        },
        {
          titulo: "Külastuse riik",
          parrafos: [
            "Et pakkuda õige riigi kalkulaatoreid, vaatame, millisest riigist külastus tuleb. Meie teenusepakkuja tuletab selle IP-aadressist.",
            "Me ei salvesta IP-aadressi. See teave püsib brauseris külastuse ajaks.",
          ],
        },
        {
          titulo: "Mida brauser salvestab",
          parrafos: [
            "Brauseri seansisalvestus, mis tühjeneb vahekaardi sulgemisel, jätab meelde sinu külastuse riigi, selle, kas sulgesid riiki soovitava teate, ja jagatud lingi kaudu tulles ka lingi koodi.",
            "Kohalikku salvestusruumi, mis püsib seni, kuni selle brauserist tühjendad, jäävad sinu enda valitud riik, juhuslik number külastuste loendamiseks ja see, millist kujundustesti versiooni näed, et leht näeks iga kord ühesugune välja. Ükski neist ei ütle, kes sa oled.",
            "Me ei kasuta reklaami- ega jälgimisküpsiseid.",
          ],
        },
        {
          titulo: "Lehe majutus",
          parrafos: ["Leht töötab Verceli serverites. Nagu kõik serverid, salvestavad need iga külastuse kohta tehnilisi andmeid (IP-aadressi ja brauseri), et leht töötaks ja püsiks turvaline."],
        },
        {
          titulo: "Kuidas me külastusi loendame",
          parrafos: [
            "Mõõdame lehe kasutust oma tööriistaga: milliseid lehti avatakse ja kui palju neid kasutatakse, milliselt veebilehelt külastus tuleb, seadme tüüp ja riik. Brauserisse salvestatud juhuslik number eristab uut külastust korduvast. Me ei salvesta IP-aadressi ega midagi, mida sa kalkulaatorisse sisestad.",
            "Lehelt jagatud linkides on juhuslik kood, mis on iga jagamise korral uus. Selle abil loendame, mitu külastust iga link toob. Kood ei tuvasta kedagi.",
            "Kalkulaatorisse sisestatud summad ei lahku brauserist kunagi koos lingiga.",
          ],
        },
        {
          titulo: "Muudatused ja küsimused",
          parrafos: [
            "Kui siin midagi muutub (näiteks lisandub reklaam), anname sellest sellel lehel teada enne, kui muudatus jõustub.",
            `Isikuandmete küsimustes on meie e-posti aadress ${mail}.`,
          ],
        },
      ],
    },
    terminos: {
      title: "Kasutustingimused | CalcularYa",
      description: "CalcularYa kalkulaatorid annavad hinnangu kehtivate ametlike numbrite põhjal. Need on tööriist ega asenda nõustamist.",
      h1: "Kasutustingimused",
      bajada: `Viimati uuendatud: ${actualizado}.`,
      bloques: [
        {
          titulo: "Milleks kalkulaatorid on mõeldud",
          parrafos: [
            "Tulemused on hinnangud, mis põhinevad kehtivatel ametlikel numbritel. Need on suunda näitavad.",
            "Need ei asenda tööandja, raamatupidaja ega juristi arvutust ega asjaga tegeleva ametiasutuse seisukohta.",
          ],
        },
        {
          titulo: "Kust numbrid tulevad",
          parrafos: [
            "Iga kalkulaator näitab oma väärtuste ametlikku allikat ja päeva, mil me neid kontrollisime.",
            "Hoiame kõike nii ajakohasena, kui suudame, aga reegel võib muutuda enne, kui jõuame seda uuendada.",
          ],
        },
        {
          titulo: "Lehe kasutamine",
          parrafos: ["Leht on tasuta. Võid seda kasutada ja linke jagada. Sisu ei tohi suures mahus kopeerida ega CalcularYa nime all esineda."],
        },
        {
          titulo: "Vastutus",
          parrafos: ["Me ei vastuta otsuste eest, mis põhinevad ainult selle lehe tulemusel. Enne kui midagi allkirjastad, maksad või nõuad, kontrolli arvutust õige inimese või ametiasutuse juures."],
        },
        { titulo: "Kontakt", parrafos: [`Meie e-posti aadress on ${mail}.`] },
      ],
    },
  },
});
