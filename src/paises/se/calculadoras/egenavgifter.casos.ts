import { definirCasos } from "@/motor/calculo";
import egenavgifter from "./egenavgifter";

const SKV = "https://www.skatteverket.se/foretag/drivaforetag/foretagsformer/enskildnaringsverksamhet/egenavgifterochsarskildloneskatt.4.361dc8c15312eff6fd1f678.html";
const LAG = "https://data.riksdagen.se/dokument/sfs-2023-748.text";

export default definirCasos(egenavgifter, [
  {
    nombre: "500 000 kr i överskott: nedsättningen når taket",
    origen: {
      tipo: "recalculado",
      url: LAG,
      detalle: "Schablonavdrag 25 % = 125 000, underlag 375 000. 28,97 % = 108 637. Nedsättning 7,5 % = 28 125, högst 15 000. Egenavgifter 93 637 kr.",
    },
    fecha: "2026-10-24",
    entrada: { overskott: 500000, grupp: "full" },
    esperado: { schablonavdrag: 125000, underlag: 375000, nedsattning: 15000, egenavgifter: 93637 },
  },
  {
    nombre: "200 000 kr i överskott",
    origen: {
      tipo: "recalculado",
      url: SKV,
      detalle: "Underlag 150 000. 28,97 % = 43 455. Nedsättning 7,5 % = 11 250. Egenavgifter 32 205 kr.",
    },
    fecha: "2026-10-24",
    entrada: { overskott: 200000, grupp: "full" },
    esperado: { underlag: 150000, nedsattning: 11250, egenavgifter: 32205 },
  },
  {
    nombre: "Litet överskott: ingen nedsättning under 40 000 kr",
    origen: { tipo: "recalculado", url: LAG, detalle: "Underlag 37 500 är inte över 40 000. 28,97 % av 37 500 = 10 863 kr." },
    fecha: "2026-10-24",
    entrada: { overskott: 50000, grupp: "full" },
    esperado: { nedsattning: 0, egenavgifter: 10863 },
  },
  {
    nombre: "Fyllt 67 år: bara ålderspensionsavgift",
    origen: { tipo: "recalculado", url: SKV, detalle: "Schablonavdrag 10 % = 30 000, underlag 270 000. 10,21 % = 27 567 kr. Ingen nedsättning." },
    fecha: "2026-10-24",
    entrada: { overskott: 300000, grupp: "aldre" },
    esperado: { schablonavdrag: 30000, egenavgifter: 27567, nedsattning: 0 },
  },
  {
    nombre: "Underlag under 1 000 kr",
    origen: { tipo: "recalculado", url: SKV, detalle: "Egenavgifter betalas inte när avgiftsunderlaget understiger 1 000 kronor." },
    fecha: "2026-10-24",
    entrada: { overskott: 1200, grupp: "full" },
    esperado: { egenavgifter: 0 },
  },
]);
