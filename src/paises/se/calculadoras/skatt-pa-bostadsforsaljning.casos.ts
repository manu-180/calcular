import { definirCasos } from "@/motor/calculo";
import skattPaBostadsforsaljning from "./skatt-pa-bostadsforsaljning";

const SKV = "https://www.skatteverket.se/privat/fastigheterochbostad/forsaljningavbostad/raknautvinstforlustochskatt.4.233f91f71260075abe8800033595.html";

export default definirCasos(skattPaBostadsforsaljning, [
  {
    nombre: "Exemplet: 100 000 kr i vinst",
    origen: { tipo: "oficial", url: SKV, detalle: "Skatteverket: 100 000 kronor i vinst ger 22 000 kronor i skatt." },
    fecha: "2026-10-24",
    entrada: { forsaljningspris: 2100000, forsaljningsutgifter: 0, inkopspris: 2000000, forbattringar: 0 },
    esperado: { vinst: 100000, skatt: 22000 },
  },
  {
    nombre: "Exemplet: 100 000 kr i förlust",
    origen: { tipo: "oficial", url: SKV, detalle: "Skatteverket: förlust 100 000 kronor ger avdrag med 50 000 kronor. Skattereduktion 30 % av 50 000 = 15 000 kr." },
    fecha: "2026-10-24",
    entrada: { forsaljningspris: 1900000, forsaljningsutgifter: 0, inkopspris: 2000000, forbattringar: 0 },
    esperado: { forlust: 100000, avdrag: 50000, reduktion: 15000, skatt: 0 },
  },
  {
    nombre: "Villa med mäklararvode och renovering",
    origen: { tipo: "recalculado", url: SKV, detalle: "3 500 000 − 70 000 − 2 800 000 − 150 000 = 480 000 kr vinst. 22 % = 105 600 kr." },
    fecha: "2026-10-24",
    entrada: { forsaljningspris: 3500000, forsaljningsutgifter: 70000, inkopspris: 2800000, forbattringar: 150000 },
    esperado: { vinst: 480000, skatt: 105600 },
  },
  {
    nombre: "Inget pris",
    origen: { tipo: "recalculado", url: SKV, detalle: "Utan försäljningspris finns inget att räkna." },
    fecha: "2026-10-24",
    entrada: { forsaljningspris: 0, forsaljningsutgifter: 0, inkopspris: 0, forbattringar: 0 },
    esperaError: true,
  },
]);
