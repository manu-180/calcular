import { definirCasos } from "@/motor/calculo";
import { URL_KEF_KERDI } from "../lib/fuentes-url";
import forosKefalaiouchikonKerdon from "./foros-kefalaiouchikon-kerdon";

export default definirCasos(forosKefalaiouchikonKerdon, [
  {
    nombre: "Κέρδος 90.000 € με γενική εξαίρεση",
    origen: { tipo: "recalculado", url: URL_KEF_KERDI, detalle: "300000 − 200000 − 10000 = 90000. Άρθρο 5(1): εξαίρεση 30000. Άρθρο 4: 60000 × 20% = 12000." },
    fecha: "2026-10-26",
    entrada: { timi: 300000, kostos: 200000, exoda: 10000, exairesi: "geniki", xrisimopoiimeni: 0 },
    esperado: { kerdos: 90000, exairesi: 30000, foros: 12000, ypoloipoExairesis: 0 },
  },
  {
    nombre: "Κύρια κατοικία με κέρδος 120.000 €: χωρίς φόρο",
    origen: { tipo: "recalculado", url: URL_KEF_KERDI, detalle: "Άρθρο 5(2): κέρδος μέχρι 150000 από κύρια κατοικία δεν φορολογείται." },
    fecha: "2026-10-26",
    entrada: { timi: 320000, kostos: 200000, exoda: 0, exairesi: "katoikia", xrisimopoiimeni: 0 },
    esperado: { foros: 0, exairesi: 120000 },
  },
  {
    nombre: "Εξαίρεση ήδη χρησιμοποιημένη κατά 20.000 €",
    origen: { tipo: "recalculado", url: URL_KEF_KERDI, detalle: "Κέρδος 50000, εξαίρεση 30000 − 20000 = 10000. Φόρος 40000 × 20% = 8000." },
    fecha: "2026-10-26",
    entrada: { timi: 150000, kostos: 100000, exoda: 0, exairesi: "geniki", xrisimopoiimeni: 20000 },
    esperado: { exairesi: 10000, foros: 8000 },
  },
]);
