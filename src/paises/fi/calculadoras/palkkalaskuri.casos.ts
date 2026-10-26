import { definirCasos } from "@/motor/calculo";
import palkkalaskuri from "./palkkalaskuri";

const VERO = "https://www.vero.fi/henkiloasiakkaat/verokortti-ja-veroilmoitus/tulot/ansiotulot/palkan-el%C3%A4kkeen-ja-etuuden-veroprosentit/";
const PAATOS =
  "https://www.vero.fi/syventavat-vero-ohjeet/paatokset/47363/verohallinnon-paatos-ennakonpidatysprosenttien-laskentaperusteista-palkkatuloa-varten-ja-ennakonkannossa-maarattavan-ennakkoveron-laskentaperusteista-vuodelle-2026/";
const HKI = { kunta: "helsinki", kirkko: "evl", ika: "18-64", lapset: 0, yksinhuoltaja: false } as const;

export default definirCasos(palkkalaskuri, [
  {
    nombre: "Verohallinnon esimerkki: palkka 30 000 euroa vuodessa Helsingissä",
    origen: { tipo: "oficial", url: VERO, detalle: "Veron määrä palkasta 2 530,49 euroa, veroprosentti 8,5 % (17-64-vuotias, Helsinki, ev.lut., ei lapsia)." },
    fecha: "2026-10-24",
    entrada: { kuukausipalkka: 2500, muutPalkat: 0, ...HKI },
    esperado: { verotVuosi: 2530.49, ennakonpidatys: 8.5, nettoVuosi: 25012.51, tyelKk: 182.5, tyottomyysKk: 22.25, nettoKk: 2084.38 },
  },
  {
    nombre: "Verohallinnon esimerkki: palkka 10 000 euroa vuodessa",
    origen: { tipo: "oficial", url: VERO, detalle: "Veron määrä palkasta 0,00 euroa, veroprosentti 0,0 %." },
    fecha: "2026-10-24",
    entrada: { kuukausipalkka: 800, muutPalkat: 400, ...HKI },
    esperado: { verotVuosi: 0, ennakonpidatys: 0 },
  },
  {
    nombre: "Verohallinnon esimerkki: palkka 16 000 euroa vuodessa",
    origen: { tipo: "oficial", url: VERO, detalle: "Veron määrä palkasta 2,50 euroa (vain Yle-veroa), veroprosentti 0,5 %." },
    fecha: "2026-10-24",
    entrada: { kuukausipalkka: 1000, muutPalkat: 4000, ...HKI },
    esperado: { verotVuosi: 2.5, ennakonpidatys: 0.5 },
  },
  {
    nombre: "Verohallinnon esimerkki: palkka 20 000 euroa vuodessa",
    origen: { tipo: "oficial", url: VERO, detalle: "Veron määrä palkasta 278,50 euroa, veroprosentti 1,5 %." },
    fecha: "2026-10-24",
    entrada: { kuukausipalkka: 1500, muutPalkat: 2000, ...HKI },
    esperado: { verotVuosi: 278.5, ennakonpidatys: 1.5 },
  },
  {
    nombre: "Verohallinnon esimerkki: palkka 40 000 euroa vuodessa",
    origen: { tipo: "oficial", url: VERO, detalle: "Veron määrä palkasta 5 511,99 euroa, veroprosentti 14,0 %." },
    fecha: "2026-10-24",
    entrada: { kuukausipalkka: 3000, muutPalkat: 4000, ...HKI },
    esperado: { verotVuosi: 5511.99, ennakonpidatys: 14 },
  },
  {
    nombre: "Verohallinnon esimerkki: palkka 50 000 euroa vuodessa",
    origen: { tipo: "oficial", url: VERO, detalle: "Veron määrä palkasta 9 361,96 euroa, veroprosentti 19,0 %." },
    fecha: "2026-10-24",
    entrada: { kuukausipalkka: 4000, muutPalkat: 2000, ...HKI },
    esperado: { verotVuosi: 9361.96, ennakonpidatys: 19 },
  },
  {
    nombre: "Verohallinnon esimerkki: palkka 60 000 euroa vuodessa",
    origen: { tipo: "oficial", url: VERO, detalle: "Veron määrä palkasta 13 244,84 euroa, veroprosentti 22,5 %." },
    fecha: "2026-10-24",
    entrada: { kuukausipalkka: 5000, muutPalkat: 0, ...HKI },
    esperado: { verotVuosi: 13244.84, ennakonpidatys: 22.5 },
  },
  {
    nombre: "Verohallinnon esimerkki: palkka 70 000 euroa vuodessa",
    origen: { tipo: "oficial", url: VERO, detalle: "Veron määrä palkasta 17 415,60 euroa, veroprosentti 25,0 %." },
    fecha: "2026-10-24",
    entrada: { kuukausipalkka: 5000, muutPalkat: 10000, ...HKI },
    esperado: { verotVuosi: 17415.6, ennakonpidatys: 25 },
  },
  {
    nombre: "Tampere, ei kirkkoon, kaksi lasta, 3 000 euroa kuukaudessa",
    origen: {
      tipo: "recalculado",
      url: PAATOS,
      detalle:
        "36 000 − 750 = 35 250; maksut 2 628 + 320,40 + 316,80 → 31 984,80. Valtio 2 780,80 + 19 % × 9 984,80 = 4 677,91. Työtulovähennys 3 430 + 2 × 105 = 3 640 − 2 % × 250 = 3 635. Kunta 7,60 % = 2 430,84, sairaanhoito 351,83, päiväraha 316,80, Yle 160. Yhteensä 4 302,38, prosentti 12,0.",
    },
    fecha: "2026-10-24",
    entrada: { kuukausipalkka: 3000, muutPalkat: 0, kunta: "tampere", kirkko: "ei", ika: "18-64", lapset: 2, yksinhuoltaja: false },
    esperado: { verotVuosi: 4302.38, ennakonpidatys: 12 },
  },
  {
    nombre: "Nollapalkka ei käy",
    origen: { tipo: "recalculado", url: PAATOS, detalle: "Bruttopalkan on oltava suurempi kuin nolla." },
    fecha: "2026-10-24",
    entrada: { kuukausipalkka: 0, muutPalkat: 0, ...HKI },
    esperaError: true,
  },
]);
