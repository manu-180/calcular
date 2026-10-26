import { definirCasos } from "@/motor/calculo";
import perintoverolaskuri from "./perintoverolaskuri";

const PERINTO = "https://www.vero.fi/en/individuals/property/inheritance/inheritance-tax-calculator/";

export default definirCasos(perintoverolaskuri, [
  {
    nombre: "Verohallinnon esimerkki: 45 000 euroa äidiltä",
    origen: { tipo: "oficial", url: PERINTO, detalle: "Vero 40 000 eurosta 800, ylimenevästä 5 000 eurosta 10 % = 500. Yhteensä 1 300 euroa." },
    fecha: "2026-10-24",
    entrada: { osuus: 45000, luokka: "1" },
    esperado: { vero: 1300 },
  },
  {
    nombre: "Verohallinnon esimerkki: 35 000 euroa enolta",
    origen: { tipo: "oficial", url: PERINTO, detalle: "Vero 30 000 eurosta 100, ylimenevästä 5 000 eurosta 19 % = 950. Yhteensä 1 050 euroa." },
    fecha: "2026-10-24",
    entrada: { osuus: 35000, luokka: "2" },
    esperado: { vero: 1050 },
  },
  {
    nombre: "Alle 30 000 euroa on verovapaa",
    origen: { tipo: "oficial", url: PERINTO, detalle: "Alle 30 000 euron perintöosuudesta ei makseta veroa." },
    fecha: "2026-10-24",
    entrada: { osuus: 29999, luokka: "1" },
    esperado: { vero: 0 },
  },
  {
    nombre: "Veroluokka II: 25 000 euroa on verovapaa",
    origen: { tipo: "recalculado", url: PERINTO, detalle: "1.1.2026 alkaen alle 30 000 euron perintöosuus on verovapaa myös veroluokassa II." },
    fecha: "2026-10-24",
    entrada: { osuus: 25000, luokka: "2" },
    esperado: { vero: 0 },
  },
]);
