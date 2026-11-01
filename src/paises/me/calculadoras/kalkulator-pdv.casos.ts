import { definirCasos } from "@/motor/calculo";
import kalkulatorPdv from "./kalkulator-pdv";

const PDV = "https://www.gov.me/clanak/porez-na-dodatu-vrijednost";

export default definirCasos(kalkulatorPdv, [
  {
    nombre: "Dodavanje 21 odsto na 100 eura",
    origen: { tipo: "recalculado", url: PDV, detalle: "100 x 21 % = 21; ukupno 121." },
    fecha: "2026-10-31",
    entrada: { iznos: 100, stopa: "s21", smjer: "bez" },
    esperado: { pdv: 21, ukupno: 121 },
  },
  {
    nombre: "Izdvajanje iz 121 eura",
    origen: { tipo: "recalculado", url: PDV, detalle: "121 / 1,21 = 100; PDV 21." },
    fecha: "2026-10-31",
    entrada: { iznos: 121, stopa: "s21", smjer: "sa" },
    esperado: { pdv: 21, osnovica: 100 },
  },
  {
    nombre: "Račun u restoranu, 15 odsto",
    origen: { tipo: "recalculado", url: "https://wapi.gov.me/download/bf337e64-f05c-4d08-9b56-73af2be7d65e?version=1.0", detalle: "115 / 1,15 = 100; PDV 15." },
    fecha: "2026-10-31",
    entrada: { iznos: 115, stopa: "s15", smjer: "sa" },
    esperado: { pdv: 15, osnovica: 100 },
  },
  {
    nombre: "Snižena stopa 7 odsto",
    origen: { tipo: "recalculado", url: PDV, detalle: "200 x 7 % = 14; ukupno 214." },
    fecha: "2026-10-31",
    entrada: { iznos: 200, stopa: "s7", smjer: "bez" },
    esperado: { pdv: 14, ukupno: 214 },
  },
  {
    nombre: "Iznos nula je greška",
    origen: { tipo: "recalculado", url: PDV, detalle: "Bez iznosa nema poreza." },
    fecha: "2026-10-31",
    entrada: { iznos: 0, stopa: "s21", smjer: "bez" },
    esperaError: true,
  },
]);
