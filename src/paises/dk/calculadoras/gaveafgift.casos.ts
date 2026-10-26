import { definirCasos } from "@/motor/calculo";
import gaveafgift from "./gaveafgift";

const BOA = "https://svmn.dk/tal-og-metode/satser/satser-og-beloebsgraenser-i-lovgivningen/boafgiftsloven";

export default definirCasos(gaveafgift, [
  {
    nombre: "100.000 kr. til et barn",
    origen: { tipo: "recalculado", url: BOA, detalle: "Bundfradrag 80.600; 15 % af 19.400 = 2.910." },
    fecha: "2026-10-24",
    entrada: { modtager: "afkom", gave: 100000, tidligere: 0 },
    esperado: { afgiftspligtig: 19400, afgift: 2910, tilbage: 0, netto: 97090 },
  },
  {
    nombre: "100.000 kr. til en bedsteforælder",
    origen: { tipo: "recalculado", url: BOA, detalle: "Bundfradrag 80.600; 36,25 % af 19.400 = 7.032,50." },
    fecha: "2026-10-24",
    entrada: { modtager: "bedsteforaeldre", gave: 100000, tidligere: 0 },
    esperado: { afgift: 7032.5 },
  },
  {
    nombre: "50.000 kr. til et svigerbarn",
    origen: { tipo: "recalculado", url: BOA, detalle: "Bundfradrag 28.200; 15 % af 21.800 = 3.270." },
    fecha: "2026-10-24",
    entrada: { modtager: "svigerboern", gave: 50000, tidligere: 0 },
    esperado: { afgift: 3270 },
  },
  {
    nombre: "Anden gave i samme år",
    origen: { tipo: "recalculado", url: BOA, detalle: "70.000 givet tidligere; ny gave 20.000: 9.400 over bundfradraget, 15 % = 1.410." },
    fecha: "2026-10-24",
    entrada: { modtager: "afkom", gave: 20000, tidligere: 70000 },
    esperado: { afgiftspligtig: 9400, afgift: 1410 },
  },
  {
    nombre: "2027: bundfradrag 83.000 kr.",
    origen: { tipo: "recalculado", url: BOA, detalle: "En gave på 83.000 til et barn er afgiftsfri i 2027." },
    fecha: "2027-01-02",
    entrada: { modtager: "afkom", gave: 83000, tidligere: 0 },
    esperado: { afgift: 0, tilbage: 0 },
  },
]);
