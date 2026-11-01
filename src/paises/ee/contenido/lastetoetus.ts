import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "ee.lastetoetus",
  h1: "Lastetoetuse kalkulaator",
  title: "Lastetoetus {{anio}}: {{ee.lapsetoetus-esimesed}} lapse kohta ja lasterikka pere toetus",
  description: "Arvuta lastetoetus: {{ee.lapsetoetus-esimesed}} kahele esimesele, {{ee.lapsetoetus-jargmised}} järgmistele lastele. Lasterikka pere toetus {{ee.lasterikas-kuni6}} või {{ee.lasterikas-7}}.",
  intro: [
    "Lapsetoetus on {{ee.lapsetoetus-esimesed}} kuus pere esimese ja teise lapse kohta ning {{ee.lapsetoetus-jargmised}} kolmanda ja iga järgmise lapse kohta (perehüvitiste seadus, § 17). Õigus on igal lapsel sünnist kuni 19-aastaseks saamiseni.",
    "Kolme kuni kuue lapsega pere saab peale selle lasterikka pere toetust {{ee.lasterikas-kuni6}} kuus ja seitsme või enama lapsega pere {{ee.lasterikas-7}} kuus. Lapse sünni puhul makstakse ühekordselt sünnitoetust.",
  ],
  comoSeCalcula: [
    "Kaks esimest last korrutatakse summaga {{ee.lapsetoetus-esimesed}}.",
    "Iga järgmine laps korrutatakse summaga {{ee.lapsetoetus-jargmised}}.",
    "Kui lapsi on vähemalt kolm, lisandub lasterikka pere toetus (§ 21).",
    "Sünnitoetus on {{ee.sunnitoetus}} lapse kohta. Kolmikute või suurema arvu mitmike puhul on see {{ee.sunnitoetus-mitmikud}} lapse kohta (§ 22).",
  ],
  ejemplo: [
    "Kolm last: 80 + 80 + 100 = 260 eurot lapsetoetust ja 450 eurot lasterikka pere toetust, kokku 710 eurot kuus ehk 8520 eurot aastas.",
    "Seitse last: 160 + 500 = 660 eurot lapsetoetust ja 650 eurot lasterikka pere toetust, kokku 1310 eurot kuus.",
  ],
  faq: [
    {
      pregunta: "Kui kaua lapsetoetust makstakse?",
      respuesta: "Sünnist kuni 19-aastaseks saamiseni. Keskhariduseta noorel, kes õpib põhikoolis, gümnaasiumis või kutseõppes, kestab õigus jooksva õppeaasta lõpuni (§ 17).",
    },
    {
      pregunta: "Kuidas lapsi lasterikka pere toetuse juures loetakse?",
      respuesta: "Arvesse lähevad peres koos kasvavad lapsed, kellel on õigus lapsetoetusele. Õpingute tõttu ajutiselt eemal olev laps kuulub ka nende hulka (§ 21 ja § 26). Toetus on {{ee.lasterikas-kuni6}} või {{ee.lasterikas-7}} pere kohta.",
    },
    {
      pregunta: "Kui suur on sünnitoetus?",
      respuesta: "{{ee.sunnitoetus}} iga sündinud lapse kohta ja {{ee.sunnitoetus-mitmikud}} lapse kohta kolmikute või suurema arvu mitmike puhul. Õigus tekib lapse sündimise päeval.",
    },
  ],
  glosario: [
    { termino: "Lapsetoetus", definicion: "Riigi igakuine peretoetus lapse kohta." },
    { termino: "Lasterikka pere toetus", definicion: "Igakuine toetus perele, kus kasvab vähemalt kolm last." },
  ],
});
