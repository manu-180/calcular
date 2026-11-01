import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.etteteatamistahtaeg",
  h1: "Etteteatamistähtaja kalkulaator",
  title: "Etteteatamistähtaeg {{anio}}: {{ee.etteteatamine[alla1]}} kuni {{ee.etteteatamine[ule10]}}",
  description: "Arvuta töölepingu etteteatamistähtaeg: tööandjal {{ee.etteteatamine[alla1]}} kuni {{ee.etteteatamine[ule10]}} staaži järgi, töötajal {{ee.etteteatamine-tootaja}}. Leia ka kuupäev.",
  intro: [
    "Tööandja etteteatamistähtaeg sõltub sellest, kui kaua töösuhe on kestnud: {{ee.etteteatamine[alla1]}} alla ühe tööaasta, {{ee.etteteatamine[kuni5]}} ühe kuni viie, {{ee.etteteatamine[kuni10]}} viie kuni kümne ja {{ee.etteteatamine[ule10]}} kümne ja enama aasta korral (töölepingu seadus, § 97).",
    "Töötaja peab korralisel ülesütlemisel ette teatama vähemalt {{ee.etteteatamine-tootaja}}, töösuhte kestusest olenemata (§ 98). Kollektiivlepinguga võib tööandja tähtajad kokku leppida teisiti.",
  ],
  comoSeCalcula: [
    "Vali, kes lepingu üles ütleb, ja sisesta töösuhte kestus aastates.",
    "Tähtaeg loetakse kalendripäevades, nädalavahetused ja pühad kaasa arvatud.",
    "Kui sisestad teatamise kuupäeva, liidame selle juurde tähtaja päevad.",
  ],
  ejemplo: [
    "Kolme aasta pikkune töösuhe ja tööandja teatab 1. novembril: tähtaeg on 30 kalendripäeva ja lõpeb 1. detsembril.",
    "Sama töötaja ise lahkudes teatab samuti 30 päeva ette. Kaheteist aasta pikkuse töösuhte korral peab tööandja teatama 90 päeva ette, töötajal jääb see 30 päevaks.",
  ],
  faq: [
    {
      pregunta: "Mis saab, kui tööandja teatab liiga hilja?",
      respuesta: "Töötajal on õigus saada keskmist tööpäevatasu iga tööpäeva eest, mille võrra teatati vähem ette. Sama õigus on tööandjal, kui töötaja teatab liiga hilja (§ 100 lõige 5).",
    },
    {
      pregunta: "Millal ei pea ette teatama?",
      respuesta: "Erakorralisel ülesütlemisel juhul, kui asjaolusid ja mõlema poole huvi arvestades ei saa mõistlikult nõuda lepingu jätkamist tähtaja lõpuni (§ 97 lõige 3 ja § 98 lõige 2).",
    },
    {
      pregunta: "Kas ülesütlemisavaldus peab olema kirjalik?",
      respuesta: "See peab olema vormis, mis võimaldab kirjalikku taasesitamist (näiteks e-kiri). Vorminõuet rikkudes on avaldus tühine (§ 95).",
    },
    {
      pregunta: "Kas tähtaega võib kollektiivlepinguga muuta?",
      respuesta: "Jah, töölepingu seaduse § 97 lõike 4 järgi võib kollektiivlepinguga ette näha teistsugused tööandja etteteatamistähtajad.",
    },
  ],
  glosario: [
    { termino: "Korraline ülesütlemine", definicion: "Töötaja ütleb tähtajatu lepingu üles ilma mõjuva põhjuseta." },
    { termino: "Erakorraline ülesütlemine", definicion: "Lepingu lõpetamine seaduses nimetatud mõjuval põhjusel." },
  ],
});
