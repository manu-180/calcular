import { definirCasos } from "@/motor/calculo";
import calculadora from "./taxe-vehicules-a-moteur";

const F = "2026-10-27";
const CDI = "https://www.impots.mg/explorer?path=/legislation/Codes%20et%20Manuels/CDI-LFI%202026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Voiture essence de 7 CV âgée de 8 ans",
    origen: { tipo: "oficial", url: CDI, detalle: "Article 02.09.06, ligne 5 à 9 CV, essence, plus de cinq ans à dix ans : 55 000 Ar." },
    fecha: F,
    entrada: { puissance: "5-9", energie: "essence", age: "a10" },
    esperado: { taxe: 55000 },
  },
  {
    nombre: "4x4 diesel de 16 CV de plus de 20 ans",
    origen: { tipo: "oficial", url: CDI, detalle: "Supérieure à 15 CV, diesel, plus de vingt ans : 340 000 Ar." },
    fecha: F,
    entrada: { puissance: "16", energie: "diesel", age: "plus20" },
    esperado: { taxe: 340000 },
  },
  {
    nombre: "Scooter électrique neuf",
    origen: { tipo: "oficial", url: CDI, detalle: "1 à 4 CV, électrique, cinq ans au plus : 5 000 Ar." },
    fecha: F,
    entrada: { puissance: "1-4", energie: "electrique", age: "a5" },
    esperado: { taxe: 5000 },
  },
  {
    nombre: "Hybride de 13 à 15 CV entre 10 et 20 ans",
    origen: { tipo: "oficial", url: CDI, detalle: "13 à 15 CV, hybride, plus de dix ans à vingt ans : 135 000 Ar." },
    fecha: F,
    entrada: { puissance: "13-15", energie: "hybride", age: "a20" },
    esperado: { taxe: 135000 },
  },
]);
