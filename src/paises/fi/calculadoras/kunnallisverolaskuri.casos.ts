import { definirCasos } from "@/motor/calculo";
import kunnallisverolaskuri from "./kunnallisverolaskuri";

const KUNNAT = "https://www.vero.fi/syventavat-vero-ohjeet/paatokset/47465/kuntien-ja-seurakuntien-tuloveroprosentit-vuonna-2026/";
const VERO = "https://www.vero.fi/henkiloasiakkaat/verokortti-ja-veroilmoitus/tulot/ansiotulot/palkan-el%C3%A4kkeen-ja-etuuden-veroprosentit/";

export default definirCasos(kunnallisverolaskuri, [
  {
    nombre: "Palkka 40 000 euroa: Helsinki ja Tampere, ev.lut.",
    origen: {
      tipo: "recalculado",
      url: KUNNAT,
      detalle:
        "Verotettava tulo 35 622 (Verohallinnon 40 000 euron esimerkki: verot Helsingissä 5 511,99). Helsinki 5,30 % = 1 887,97 ja kirkko 1,00 % = 356,22. Tampere 7,60 % = 2 707,27 ja kirkko 1,25 % = 445,28; verot 2 363,96 + 2 707,27 + 445,28 + 391,84 + 352 + 160 = 6 420,35. Erotus 908,36.",
    },
    fecha: "2026-10-24",
    entrada: { palkka: 40000, kunta: "helsinki", vertailu: "tampere", kirkko: "evl" },
    esperado: { kunnallisvero: 1887.97, kirkollisvero: 356.22, verotYhteensa: 5511.99, vertailuKunnallisvero: 2707.27, vertailuVerot: 6420.35, erotus: 908.36, prosentti: 5.3, vertailuProsentti: 7.6 },
  },
  {
    nombre: "Pieni palkka: työtulovähennys syö kunnallisveron",
    origen: { tipo: "oficial", url: VERO, detalle: "Palkka 16 000 euroa: veron määrä 2,50 euroa (vain Yle-vero), joten kunnallisvero on 0." },
    fecha: "2026-10-24",
    entrada: { palkka: 16000, kunta: "helsinki", vertailu: "helsinki", kirkko: "evl" },
    esperado: { kunnallisvero: 0, verotYhteensa: 2.5, erotus: 0 },
  },
]);
