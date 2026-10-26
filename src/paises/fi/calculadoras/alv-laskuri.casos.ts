import { definirCasos } from "@/motor/calculo";
import alvLaskuri from "./alv-laskuri";

const ALV = "https://www.vero.fi/en/businesses-and-corporations/taxes-and-charges/vat/rates-of-vat/";

export default definirCasos(alvLaskuri, [
  {
    nombre: "Yleinen verokanta: 100 euroa + alv",
    origen: { tipo: "recalculado", url: ALV, detalle: "100 × 25,5 % = 25,50; verollinen 125,50." },
    fecha: "2026-10-24",
    entrada: { suunta: "lisaa", summa: 100, verokanta: "yleinen" },
    esperado: { vero: 25.5, verollinen: 125.5, veroton: 100, kanta: 25.5 },
  },
  {
    nombre: "Alv pois verollisesta hinnasta",
    origen: { tipo: "recalculado", url: ALV, detalle: "125,50 / 1,255 = 100; vero 25,50." },
    fecha: "2026-10-24",
    entrada: { suunta: "poista", summa: 125.5, verokanta: "yleinen" },
    esperado: { veroton: 100, vero: 25.5, verollinen: 125.5 },
  },
  {
    nombre: "Elintarvikkeet 2026: 13,5 prosenttia",
    origen: { tipo: "recalculado", url: ALV, detalle: "100 × 13,5 % = 13,50; verollinen 113,50." },
    fecha: "2026-10-24",
    entrada: { suunta: "lisaa", summa: 100, verokanta: "alennettu" },
    esperado: { vero: 13.5, verollinen: 113.5 },
  },
  {
    nombre: "Elintarvikkeet 2025: vielä 14 prosenttia",
    origen: { tipo: "recalculado", url: ALV, detalle: "Alennettu verokanta oli 14 % 31.12.2025 asti: 100 → 114." },
    fecha: "2025-06-01",
    entrada: { suunta: "lisaa", summa: 100, verokanta: "alennettu" },
    esperado: { vero: 14, verollinen: 114 },
  },
  {
    nombre: "Lehdet: 10 prosenttia",
    origen: { tipo: "recalculado", url: ALV, detalle: "Sanoma- ja aikakauslehdet 10 %: 50 → 55." },
    fecha: "2026-10-24",
    entrada: { suunta: "lisaa", summa: 50, verokanta: "erityinen" },
    esperado: { vero: 5, verollinen: 55 },
  },
]);
