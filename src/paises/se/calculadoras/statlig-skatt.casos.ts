import { definirCasos } from "@/motor/calculo";
import statligSkatt from "./statlig-skatt";

const SKV433 = "https://www.skatteverket.se/download/18.1522bf3f19aea8075ba55c/1766385913260/teknisk-beskrivning-skv-433-2026-utgava-36.pdf";
const BELOPP = "https://skatteverket.se/download/18.1522bf3f19aea8075ba3285/1767885159120/belopp-och-procentsatser-for-inkomstaret-2026.pdf";

export default definirCasos(statligSkatt, [
  {
    nombre: "Brytpunkten 2026 är 660 400 kr",
    origen: { tipo: "oficial", url: BELOPP, detalle: "Skatteverket: brytpunkt för statlig inkomstskatt för den som inte fyllt 66 år, 660 400 kronor." },
    fecha: "2026-10-24",
    entrada: { inkomst: 500000, period: "ar" },
    esperado: { brytpunktAr: 660400, statligAr: 0 },
  },
  {
    nombre: "Exemplet i SKV 433: 695 000 kr beskattningsbart",
    origen: {
      tipo: "oficial",
      url: SKV433,
      detalle: "Beskattningsbar förvärvsinkomst 695 000 kr: 20 % × (695 000 − 643 000) = 10 400 kr. Årsinkomst 712 400 kr med grundavdrag 17 400 kr ger samma underlag.",
    },
    fecha: "2026-10-24",
    entrada: { inkomst: 712400, period: "ar" },
    esperado: { grundavdrag: 17400, beskattningsbar: 695000, statligAr: 10400 },
  },
  {
    nombre: "80 000 kr i månaden",
    origen: {
      tipo: "recalculado",
      url: SKV433,
      detalle: "Årsinkomst 960 000, grundavdrag 0,293 × 59 200 = 17 345,60, uppåt 17 400. Beskattningsbar 942 600. Statlig skatt 20 % × 299 600 = 59 920 kr, 4 993,33 kr per månad.",
    },
    fecha: "2026-10-24",
    entrada: { inkomst: 80000, period: "manad" },
    esperado: { statligAr: 59920, statligManad: 4993.33, brytpunktManad: 55033.33 },
  },
  {
    nombre: "Mindre än 200 kr över skiktgränsen",
    origen: { tipo: "recalculado", url: SKV433, detalle: "Statlig skatt tas ut först när underlaget är minst 200 kr över skiktgränsen. 660 500 − 17 400 = 643 100, bara 100 kr över." },
    fecha: "2026-10-24",
    entrada: { inkomst: 660500, period: "ar" },
    esperado: { statligAr: 0, overSkiktgransen: 100 },
  },
  {
    nombre: "Ingen inkomst",
    origen: { tipo: "recalculado", url: SKV433, detalle: "Utan inkomst finns inget att räkna på." },
    fecha: "2026-10-24",
    entrada: { inkomst: 0, period: "manad" },
    esperaError: true,
  },
]);
