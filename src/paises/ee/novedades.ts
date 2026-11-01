import type { FuenteVerificada, Novedad } from "@/motor/tipos";

const fuente = (organismo: string, titulo: string, url: `https://${string}`): FuenteVerificada => ({ organismo, titulo, url, tipo: "primaria", verificadoEl: "2026-11-01" });

export const novedades: readonly Novedad[] = [
  {
    id: "ee.miinimumpalk-aprill-2026",
    fecha: "2026-11-01",
    titulo: "Töötasu alammäär tõusis 946 euroni",
    texto: "Alates 1. aprillist 2026 on kuutasu alammäär täistööajaga 946 eurot ja tunnitasu alammäär 5,67 eurot. Sellega arvutavad miinimumpalga ja vanemahüvitise kalkulaator.",
    vigenteDesde: "2026-04-01",
    calculadoras: ["ee.miinimumpalk", "ee.vanemahuvitis"],
    fuente: fuente("Riigi Teataja", "Töötasu alammäära kehtestamine, VV määrus nr 36", "https://www.riigiteataja.ee/akt/124032026005"),
  },
  {
    id: "ee.maksuvaba-tulu-2026",
    fecha: "2026-11-01",
    titulo: "Maksuvaba tulu on kõigile 700 eurot kuus",
    texto: "Alates 1. jaanuarist 2026 on üldine maksuvaba tulu 700 eurot kuus ehk 8400 eurot aastas ja see ei sõltu enam sissetuleku suurusest. Tulumaksu määr jäi 22 protsendile.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ee.palgakalkulaator", "ee.brutopalga-kalkulaator", "ee.tulumaksu-kalkulaator", "ee.fie-maksud"],
    fuente: fuente("Maksu- ja Tolliamet", "Maksumuudatused 2026. aastal", "https://emta.ee/uudised/maksumuudatused-2026"),
  },
  {
    id: "ee.haigushuvitise-ulempiir-2026",
    fecha: "2026-11-01",
    titulo: "Tervisekassa hüvitisel on nüüd päevane ülempiir",
    texto: "Alates 1. jaanuarist 2026 maksab Tervisekassa haigus- ja hooldushüvitist kuni 126,87 eurot kalendripäevas. Tööandja makstavale osale ülempiir ei kehti.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ee.haigushuvitis"],
    fuente: fuente("Tervisekassa", "Sickness benefit", "https://tervisekassa.ee/en/people/benefits-provided-health-insurance-fund/sickness-benefit"),
  },
  {
    id: "ee.vanemahuvitise-ulempiir-2026",
    fecha: "2026-11-01",
    titulo: "Vanemahüvitise ülempiir langes",
    texto: "2026. aastal sündinud laste puhul on vanemahüvitise ülempiir 3806,10 eurot kuus. Varem oli see kolmekordne keskmine tulu, nüüd kahekordne.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ee.vanemahuvitis"],
    fuente: fuente("Sotsiaalkindlustusamet", "Vanemahüvitise ülempiir ja selle muudatused 2026. aastal", "https://sotsiaalkindlustusamet.ee/uudised/vanemahuvitise-ulempiir-ja-selle-muudatused-2026-aastal"),
  },
  {
    id: "ee.tootushuvitised-2026",
    fecha: "2026-11-01",
    titulo: "Töötuskindlustushüvitisel on nüüd baasmäär",
    texto: "2026. aastast asendas töötutoetuse baasmääras töötuskindlustushüvitis: 14,77 eurot kalendripäevas kuni 180 päeva. Ka töötaja, kes lahkub omal soovil, võib selle saada.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ee.tootuskindlustushuvitis"],
    fuente: fuente("Eesti Töötukassa", "Töötuskindlustushüvitise suurus ja selle arvutamine", "https://www.tootukassa.ee/et/teenused/tootuskindlustushuvitis/tootuskindlustushuvitise-suurus-ja-selle-arvutamine"),
  },
  {
    id: "ee.pensionitous-2026",
    fecha: "2026-11-01",
    titulo: "Pensionid tõusid aprillis",
    texto: "Alates 1. aprillist 2026 on pensioni baasosa 399,24 eurot ja aastahinne 10,477 eurot. Rahvapension on 414,10 eurot.",
    vigenteDesde: "2026-04-01",
    calculadoras: ["ee.pensionikalkulaator"],
    fuente: fuente("Sotsiaalkindlustusamet", "Pension Calculation", "https://sotsiaalkindlustusamet.ee/en/pension-and-benefits/pension-amount/pension-calculation"),
  },
];
