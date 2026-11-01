import { definirCasos } from "@/motor/calculo";
import momskalkylator from "./momskalkylator";

const SKV = "https://www.skatteverket.se/foretag/moms/saljavarorochtjanster/momssatserochundantagfranmoms.4.58d555751259e4d66168000409.html";
const BELOPP = "https://skatteverket.se/download/18.1522bf3f19aea8075ba3285/1767885159120/belopp-och-procentsatser-for-inkomstaret-2026.pdf";

export default definirCasos(momskalkylator, [
  {
    nombre: "Lägga på 25 % moms på 1 000 kr",
    origen: { tipo: "recalculado", url: SKV, detalle: "25 % av 1 000 = 250 kr. Pris med moms 1 250 kr." },
    fecha: "2026-10-24",
    entrada: { belopp: 1000, riktning: "lagg-till", sats: "generell" },
    esperado: { moms: 250, inkl: 1250 },
  },
  {
    nombre: "Momsen i ett pris med 25 % moms är 20 %",
    origen: { tipo: "oficial", url: BELOPP, detalle: "Skatteverket: 25 procent (20 procent av priset). 1 250 kr med moms innehåller 250 kr moms." },
    fecha: "2026-10-24",
    entrada: { belopp: 1250, riktning: "dra-av", sats: "generell" },
    esperado: { moms: 250, exkl: 1000, andelAvPris: 20 },
  },
  {
    nombre: "Livsmedel med 6 % moms",
    origen: { tipo: "recalculado", url: SKV, detalle: "Från 1 april 2026 är momsen på livsmedel 6 %. 6 % av 500 = 30 kr." },
    fecha: "2026-10-24",
    entrada: { belopp: 500, riktning: "lagg-till", sats: "livsmedel" },
    esperado: { moms: 30, inkl: 530 },
  },
  {
    nombre: "Restaurang: 12 % i ett pris på 448 kr",
    origen: { tipo: "recalculado", url: SKV, detalle: "448 / 1,12 = 400. Momsen är 48 kr." },
    fecha: "2026-10-24",
    entrada: { belopp: 448, riktning: "dra-av", sats: "restaurang" },
    esperado: { moms: 48, exkl: 400 },
  },
  {
    nombre: "Belopp noll",
    origen: { tipo: "recalculado", url: SKV, detalle: "Utan belopp finns ingen moms." },
    fecha: "2026-10-24",
    entrada: { belopp: 0, riktning: "lagg-till", sats: "generell" },
    esperaError: true,
  },
]);
