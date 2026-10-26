import { definirCasos } from "@/motor/calculo";
import ranteavdrag from "./ranteavdrag";

const SKV = "https://www.skatteverket.se/privat/deklaration/avdragforprivatpersoner/avdragforranteutgifter.106.1b39a64a1919eabb488b87.html";

export default definirCasos(ranteavdrag, [
  {
    nombre: "Exemplet med Anna: underskott 130 000 kr",
    origen: { tipo: "oficial", url: SKV, detalle: "Skatteverket: 30 % av 100 000 = 30 000 och 21 % av 30 000 = 6 300. Skatten minskar med 36 300 kr." },
    fecha: "2026-10-24",
    entrada: { ranteutgifter: 130000, kapitalinkomster: 0 },
    esperado: { underskott: 130000, reduktion: 36300 },
  },
  {
    nombre: "Exemplet med Lisa: överskott 150 000 kr",
    origen: { tipo: "oficial", url: SKV, detalle: "Skatteverket: vinst 200 000 och ränteutgifter 50 000 ger ett överskott på 150 000 kr med 30 % skatt, 45 000 kr." },
    fecha: "2026-10-24",
    entrada: { ranteutgifter: 50000, kapitalinkomster: 200000 },
    esperado: { overskott: 150000, skatt: 45000, reduktion: 0 },
  },
  {
    nombre: "Bolåneränta 60 000 kr",
    origen: { tipo: "recalculado", url: SKV, detalle: "30 % av 60 000 = 18 000 kr, 1 500 kr per månad." },
    fecha: "2026-10-24",
    entrada: { ranteutgifter: 60000, kapitalinkomster: 0 },
    esperado: { reduktion: 18000, perManad: 1500, kostnadEfterAvdrag: 42000 },
  },
  {
    nombre: "Inga belopp",
    origen: { tipo: "recalculado", url: SKV, detalle: "Utan räntor finns inget att räkna." },
    fecha: "2026-10-24",
    entrada: { ranteutgifter: 0, kapitalinkomster: 0 },
    esperaError: true,
  },
]);
