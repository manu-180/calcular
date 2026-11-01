import { definirCasos } from "@/motor/calculo";
import formuesskatt from "./formuesskatt";

const SATSER = "https://www.skatteetaten.no/rettskilder/type/uttalelser/uttalelser/forskuddsutskrivingen-2026/";

export default definirCasos(formuesskatt, [
  {
    nombre: "Bolig, aksjer og bank med gjeldsreduksjon",
    origen: {
      tipo: "recalculado",
      url: SATSER,
      detalle: "Primærbolig 8 mill × 25 % = 2 mill; aksjer 10 mill × 80 % = 8 mill; bank 2 mill: 12 mill. Gjeld 2 mill, 10/20 på aksjer redusert med 20 %: fradrag 1,8 mill. Netto 10,2 mill − 1,9 mill = 8,3 mill × (0,35 % + 0,65 %) = 83 000.",
    },
    fecha: "2026-10-24",
    entrada: { primaerbolig: 8000000, sekundaerbolig: 0, aksjer: 10000000, bank: 2000000, gjeld: 2000000, ektefeller: false },
    esperado: { formuesskatt: 83000, kommune: 29050, stat: 53950, nettoformue: 10200000, fradragGjeld: 1800000 },
  },
  {
    nombre: "Gjeld større enn formuesverdien",
    origen: { tipo: "recalculado", url: SATSER, detalle: "Formuesverdi 1,25 + 0,8 + 0,5 = 2,55 mill; gjeld etter reduksjon 2,91 mill: ingen formuesskatt." },
    fecha: "2026-10-24",
    entrada: { primaerbolig: 5000000, sekundaerbolig: 0, aksjer: 1000000, bank: 500000, gjeld: 3000000, ektefeller: false },
    esperado: { formuesskatt: 0, nettoformue: 0 },
  },
  {
    nombre: "Enslig med 30 mill i bank: trinn 2",
    origen: { tipo: "recalculado", url: SATSER, detalle: "Kommune 28,1 mill × 0,35 % = 98 350. Stat 19,6 mill × 0,65 % = 127 400 + 8,5 mill × 0,75 % = 63 750. Sum 289 500." },
    fecha: "2026-10-24",
    entrada: { primaerbolig: 0, sekundaerbolig: 0, aksjer: 0, bank: 30000000, gjeld: 0, ektefeller: false },
    esperado: { formuesskatt: 289500, stat: 191150 },
  },
  {
    nombre: "Ektefeller med 30 mill: dobbelt bunnfradrag",
    origen: { tipo: "recalculado", url: SATSER, detalle: "Bunnfradrag 3,8 mill, trinn 2 fra 43 mill. 26,2 mill × 1 % = 262 000." },
    fecha: "2026-10-24",
    entrada: { primaerbolig: 0, sekundaerbolig: 0, aksjer: 0, bank: 30000000, gjeld: 0, ektefeller: true },
    esperado: { formuesskatt: 262000, bunnfradrag: 3800000 },
  },
  {
    nombre: "Primærbolig over 10 mill",
    origen: { tipo: "recalculado", url: SATSER, detalle: "12 mill: 10 mill × 25 % + 2 mill × 70 % = 3,9 mill. (3,9 − 1,9) mill × 1 % = 20 000." },
    fecha: "2026-10-24",
    entrada: { primaerbolig: 12000000, sekundaerbolig: 0, aksjer: 0, bank: 0, gjeld: 0, ektefeller: false },
    esperado: { verdiPrimaerbolig: 3900000, formuesskatt: 20000 },
  },
  {
    nombre: "Ingen formue",
    origen: { tipo: "recalculado", url: SATSER, detalle: "Uten formue er det ingenting å regne på." },
    fecha: "2026-10-24",
    entrada: { primaerbolig: 0, sekundaerbolig: 0, aksjer: 0, bank: 0, gjeld: 0, ektefeller: false },
    esperaError: true,
  },
]);
