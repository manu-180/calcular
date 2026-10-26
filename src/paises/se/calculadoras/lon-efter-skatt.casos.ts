import { definirCasos } from "@/motor/calculo";
import lonEfterSkatt from "./lon-efter-skatt";

const TABELLER = "https://www.skatteverket.se/download/18.1522bf3f19aea8075ba5af/1765287119989/allmanna-tabeller-manad.txt";
const SKV433 = "https://www.skatteverket.se/download/18.1522bf3f19aea8075ba55c/1766385913260/teknisk-beskrivning-skv-433-2026-utgava-36.pdf";

export default definirCasos(lonEfterSkatt, [
  {
    nombre: "Stockholm, 35 000 kr: tabell 31",
    origen: {
      tipo: "oficial",
      url: TABELLER,
      detalle: "Skattesats 30,55 + 0,07 = 30,62 %, alltså tabell 31. Månadstabellen 2026, tabell 31, 34 801 till 35 000 kr, kolumn 1: 6 709 kr.",
    },
    fecha: "2026-10-24",
    entrada: { manadslon: 35000, kommun: "stockholm", kyrkan: false, kyrkoavgift: null },
    esperado: { tabell: 31, skatteavdrag: 6709, nettolon: 28291 },
  },
  {
    nombre: "Arvika, 30 000 kr: tabell 34",
    origen: {
      tipo: "oficial",
      url: TABELLER,
      detalle: "Skattesats 34,03 + 0,292 = 34,322 %, tabell 34. Tabell 34, 29 801 till 30 000 kr, kolumn 1: 6 054 kr (samma som exemplet i SKV 433).",
    },
    fecha: "2026-10-24",
    entrada: { manadslon: 30000, kommun: "arvika", kyrkan: false, kyrkoavgift: null },
    esperado: { tabell: 34, skatteavdrag: 6054, nettolon: 23946 },
  },
  {
    nombre: "Uppsala, 50 000 kr utan kyrkoavgift: tabell 33",
    origen: {
      tipo: "oficial",
      url: TABELLER,
      detalle: "Skattesats 32,85 + 0,292 = 33,142 %, tabell 33. Tabell 33, 49 801 till 50 000 kr, kolumn 1: 11 702 kr.",
    },
    fecha: "2026-10-24",
    entrada: { manadslon: 50000, kommun: "uppsala", kyrkan: false, kyrkoavgift: null },
    esperado: { tabell: 33, skatteavdrag: 11702, nettolon: 38298 },
  },
  {
    nombre: "Uppsala, 80 000 kr med kyrkoavgift 1,24 %: tabell 34",
    origen: {
      tipo: "oficial",
      url: TABELLER,
      detalle: "Skattesats 33,142 + 1,24 = 34,382 %, tabell 34. Tabell 34, 79 801 till 80 000 kr, kolumn 1: 27 246 kr.",
    },
    fecha: "2026-10-24",
    entrada: { manadslon: 80000, kommun: "uppsala", kyrkan: true, kyrkoavgift: 1.24 },
    esperado: { tabell: 34, skatteavdrag: 27246, nettolon: 52754 },
  },
  {
    nombre: "Slutlig skatt för året, Arvika 30 000 kr",
    origen: {
      tipo: "recalculado",
      url: SKV433,
      detalle:
        "Årsinkomst 360 000. Grundavdrag 45 584 − 10 % × (360 000 − 184 112) = 27 995,20, uppåt 28 000. Beskattningsbar 332 000. Kommunalskatt 34,03 % = 112 979. Begravningsavgift 0,292 % = 969. Pensionsavgift 25 200, reduceras fullt. Jobbskatteavdrag (107 329,60 + 25,1 % × 168 192 − 28 000) × 34,03 % = 41 362. Förvärvsinkomstreduktion 1 500. Public service 1 184. Skatt 112 979 − 41 362 − 1 500 + 969 + 1 184 = 72 270.",
    },
    fecha: "2026-10-24",
    entrada: { manadslon: 30000, kommun: "arvika", kyrkan: false, kyrkoavgift: null },
    esperado: { grundavdrag: 28000, kommunalskatt: 112979, jobbskatteavdrag: 41362, skattAr: 72270, statligSkatt: 0 },
  },
  {
    nombre: "Ingen lön",
    origen: { tipo: "recalculado", url: SKV433, detalle: "Utan lön finns inget att räkna på." },
    fecha: "2026-10-24",
    entrada: { manadslon: 0, kommun: "stockholm", kyrkan: false, kyrkoavgift: null },
    esperaError: true,
  },
]);
