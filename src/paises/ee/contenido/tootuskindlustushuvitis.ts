import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.tootuskindlustushuvitis",
  h1: "Töötuskindlustushüvitise kalkulaator",
  title: "Töötuskindlustushüvitis {{anio}}: {{ee.tkh-maar-algus}} ja {{ee.tkh-maar-hiljem}} palgast",
  description: "Arvuta töötuskindlustushüvitis: {{ee.tkh-maar-algus}} esimesel 100 päeval, siis {{ee.tkh-maar-hiljem}}. Baasmäär {{ee.tkh-baasmaar}} päevas, ülempiir {{ee.tkh-max-algus}}.",
  intro: [
    "Töötuks jäädes on kaks hüvitise liiki. Sissetulekupõhine hüvitis on {{ee.tkh-maar-algus}} keskmisest kalendripäeva töötasust esimesel 100 päeval ja {{ee.tkh-maar-hiljem}} alates 101. päevast. Baasmääras hüvitis on {{ee.tkh-baasmaar}} kalendripäevas.",
    "Sissetulekupõhiseks hüvitiseks on vaja vähemalt {{ee.tkh-staaz}} staaži viimase 36 kuu jooksul ja töösuhe ei tohi olla lõppenud sinu enda algatusel. Baasmääraks piisab {{ee.tkh-baasstaaz}} staažist (töötuskindlustuse seadus, § 6 ja § 61).",
  ],
  comoSeCalcula: [
    "Võta viimasele kolmele töötamise kuule eelnenud üheksa kuu tasud, millelt on kinni peetud töötuskindlustusmakse.",
    "Jaga summa arvuga 270. See on keskmine kalendripäeva töötasu (§ 9).",
    "Korruta see {{ee.tkh-maar-algus}} ja hiljem {{ee.tkh-maar-hiljem}}. Ülempiir on {{ee.tkh-max-algus}} ja {{ee.tkh-max-hiljem}} kalendripäevas, miinimum {{ee.tkh-baasmaar}}.",
    "Periood oleneb kindlustusstaažist: {{ee.tkh-paevad[alla5]}} alla viie aasta, {{ee.tkh-paevad[kuni10]}} viis kuni kümme aastat ja {{ee.tkh-paevad[ule10]}} kümme aastat või enam (§ 8).",
  ],
  ejemplo: [
    "Töötukassa näide: keskmine kalendripäeva töötasu 50 eurot. Esimesel 100 päeval saad 30 eurot päevas, seejärel 20 eurot päevas. 180 päeva eest teeb see 4600 eurot bruto.",
    "Üheksa kuu tasu 18 000 eurot ja kuue aasta staaž: keskmine on 66,67 eurot, hüvitis 40 ja 26,67 eurot päevas, periood 210 päeva ja kokku 6933,33 eurot bruto. Kui lahkusid omal soovil, saad baasmäära: 2658,60 eurot 180 päeva eest.",
  ],
  faq: [
    {
      pregunta: "Kui suur on maksimaalne töötuskindlustushüvitis?",
      respuesta: "2026. aastal {{ee.tkh-max-algus}} kalendripäevas esimesel 100 päeval ja {{ee.tkh-max-hiljem}} alates 101. päevast. Ülempiir tuleneb Eesti keskmisest töötasust (Töötukassa).",
    },
    {
      pregunta: "Kas omal soovil lahkudes saab hüvitist?",
      respuesta: "Sissetulekupõhist hüvitist üldjuhul mitte, kuid erandid on seaduses (§ 6). Baasmääras hüvitist {{ee.tkh-baasmaar}} päevas saab {{ee.tkh-baaspaevad}} jooksul, kui staažinõue on täidetud.",
    },
    {
      pregunta: "Kas periood võib pikeneda?",
      respuesta: "Jah. Keerulisel tööturul võib see pikeneda vähemalt viieaastase staažiga inimestel 60 päeva võrra (§ 8). Kalkulaator näitab tavalist perioodi. Pikenemist kontrollib Töötukassa.",
    },
  ],
  glosario: [
    { termino: "Kindlustusstaaž", definicion: "Aeg, mille eest on tasutud töötuskindlustusmakset." },
    { termino: "Baasmäär", definicion: "Kindel päevasumma, mis ei sõltu sinu palgast." },
    { termino: "Töötukassa", definicion: "Asutus, kes maksab töötuskindlustuse hüvitisi ja aitab tööd leida." },
  ],
});
