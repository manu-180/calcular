import { definirCasos } from "@/motor/calculo";
import veroprosenttilaskuri from "./veroprosenttilaskuri";

const VERO = "https://www.vero.fi/henkiloasiakkaat/verokortti-ja-veroilmoitus/tulot/ansiotulot/palkan-el%C3%A4kkeen-ja-etuuden-veroprosentit/";
const HKI = { kunta: "helsinki", kirkko: "evl", ika: "18-64", lapset: 0 } as const;
const hki = (tulolaji: "palkka" | "elake" | "etuus", vuositulot: number) => ({ tulolaji, vuositulot, ...HKI });

export default definirCasos(veroprosenttilaskuri, [
  {
    nombre: "Palkka 50 000 euroa (Verohallinnon esimerkki)",
    origen: { tipo: "oficial", url: VERO, detalle: "Veron määrä palkasta 9 361,96 euroa, veroprosentti 19,0 %." },
    fecha: "2026-10-24",
    entrada: hki("palkka", 50000),
    esperado: { verot: 9361.96, ennakonpidatys: 19 },
  },
  {
    nombre: "Eläke 16 000 euroa (Verohallinnon esimerkki)",
    origen: { tipo: "oficial", url: VERO, detalle: "Veron määrä eläkkeestä 784,06 euroa, veroprosentti 5,0 %." },
    fecha: "2026-10-24",
    entrada: hki("elake", 16000),
    esperado: { verot: 784.06, ennakonpidatys: 5 },
  },
  {
    nombre: "Eläke 20 000 euroa (Verohallinnon esimerkki)",
    origen: { tipo: "oficial", url: VERO, detalle: "Veron määrä eläkkeestä 2 340,15 euroa, veroprosentti 12,0 %." },
    fecha: "2026-10-24",
    entrada: hki("elake", 20000),
    esperado: { verot: 2340.15, ennakonpidatys: 12 },
  },
  {
    nombre: "Eläke 30 000 euroa (Verohallinnon esimerkki)",
    origen: { tipo: "oficial", url: VERO, detalle: "Veron määrä eläkkeestä 5 699,42 euroa, veroprosentti 19,0 %." },
    fecha: "2026-10-24",
    entrada: hki("elake", 30000),
    esperado: { verot: 5699.42, ennakonpidatys: 19 },
  },
  {
    nombre: "Eläke 50 000 euroa (Verohallinnon esimerkki)",
    origen: { tipo: "oficial", url: VERO, detalle: "Veron määrä eläkkeestä 14 410,30 euroa, veroprosentti 29,0 %." },
    fecha: "2026-10-24",
    entrada: hki("elake", 50000),
    esperado: { verot: 14410.3, ennakonpidatys: 29 },
  },
  {
    nombre: "Eläke 70 000 euroa ja lisävero (Verohallinnon esimerkki)",
    origen: { tipo: "oficial", url: VERO, detalle: "Veron määrä eläkkeestä 23 964,05 euroa, veroprosentti 34,5 %." },
    fecha: "2026-10-24",
    entrada: hki("elake", 70000),
    esperado: { verot: 23964.05, ennakonpidatys: 34.5 },
  },
  {
    nombre: "Etuus 10 000 euroa (Verohallinnon esimerkki)",
    origen: { tipo: "oficial", url: VERO, detalle: "Veron määrä etuudesta 1 382,56 euroa, veroprosentti 14,0 %." },
    fecha: "2026-10-24",
    entrada: hki("etuus", 10000),
    esperado: { verot: 1382.56, ennakonpidatys: 14 },
  },
  {
    nombre: "Etuus 30 000 euroa (Verohallinnon esimerkki)",
    origen: { tipo: "oficial", url: VERO, detalle: "Veron määrä etuudesta 6 797,80 euroa, veroprosentti 23,0 %." },
    fecha: "2026-10-24",
    entrada: hki("etuus", 30000),
    esperado: { verot: 6797.8, ennakonpidatys: 23 },
  },
  {
    nombre: "Etuus 70 000 euroa (Verohallinnon esimerkki)",
    origen: { tipo: "oficial", url: VERO, detalle: "Veron määrä etuudesta 23 379,05 euroa, veroprosentti 33,5 %." },
    fecha: "2026-10-24",
    entrada: hki("etuus", 70000),
    esperado: { verot: 23379.05, ennakonpidatys: 33.5 },
  },
]);
