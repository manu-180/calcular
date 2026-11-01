import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.koondamishuvitis",
  h1: "Koondamishüvitise kalkulaator",
  title: "Koondamishüvitis {{anio}}: tööandja ja Töötukassa osa",
  description: "Arvuta koondamishüvitis: tööandja maksab {{ee.koondamine-tooandja}} keskmist töötasu, Töötukassa veel {{ee.koondamine-tootukassa[kuni10]}} või {{ee.koondamine-tootukassa[ule10]}} staaži järgi.",
  intro: [
    "Koondamisel maksab tööandja hüvitist ühe kuu keskmise töötasu ulatuses (töölepingu seadus, § 100). Kui töösuhe selle tööandjaga on kestnud vähemalt viis aastat, maksab lisaks ka Töötukassa.",
    "Töötukassa hüvitis on {{ee.koondamine-tootukassa[kuni10]}} keskmist töötasu viie kuni kümne aasta puhul ja {{ee.koondamine-tootukassa[ule10]}} üle kümne aasta puhul (töötuskindlustuse seadus, § 142).",
  ],
  comoSeCalcula: [
    "Tööandja osa on ühe kuu keskmine töötasu. See arvutatakse viimase kuue kuu tasudest.",
    "Töötukassa osa aluseks on üheksa kuu keskmine kalendripäeva tasu: viimasele kolmele töötamise kuule eelnenud üheksa kuu tasud jagatud arvuga 270.",
    "Sisesta siia oma keskmine kuutöötasu. Kuna kaks arvutust lähtuvad eri perioodidest, võib täpne summa veidi erineda.",
  ],
  ejemplo: [
    "Keskmine töötasu 2000 eurot ja 12 aastat sama tööandja juures: tööandja maksab 2000 eurot, Töötukassa 4000 eurot, kokku 6000 eurot bruto.",
    "Kuue aasta järel on summa 4000 eurot ja kolme aasta järel 2000 eurot, sest siis Töötukassa hüvitist ei maksa.",
  ],
  faq: [
    {
      pregunta: "Kes Töötukassalt hüvitist küsib?",
      respuesta: "Tööandja esitab avalduse viie kalendripäeva jooksul töösuhte lõppemisest. Kui ta seda ei tee, võid avalduse esitada ise (töötuskindlustuse seadus, § 143). Töötukassa teeb otsuse 14 kalendripäeva jooksul.",
    },
    {
      pregunta: "Mis saab, kui tööandja teatab koondamisest liiga hilja?",
      respuesta: "Töötajal on õigus keskmisele tööpäevatasule iga tööpäeva eest, mille võrra teatati vähem ette (töölepingu seadus, § 100 lõige 5). Tähtaja leiad etteteatamistähtaja kalkulaatorist.",
    },
    {
      pregunta: "Kas pensionär saab ka hüvitist?",
      respuesta: "Töötuskindlustuse seadus seab tingimuseks töösuhte kestuse ja koondamise, mitte vanuse. Kontrolli oma juhtum Töötukassast.",
    },
  ],
  glosario: [
    { termino: "Koondamine", definicion: "Töölepingu ülesütlemine töömahu vähenemise või töö ümberkorraldamise tõttu." },
    { termino: "Keskmine töötasu", definicion: "Määruse või seaduse järgi arvutatud kuu töötasu." },
  ],
});
