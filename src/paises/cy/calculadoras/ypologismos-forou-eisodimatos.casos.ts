import { definirCasos } from "@/motor/calculo";
import { URL_NOMOS_FOROU } from "../lib/fuentes-url";
import ypologismosForouEisodimatos from "./ypologismos-forou-eisodimatos";

const BASE = { eisfores: 0, tekna: 0, monogoneas: false, stegasi: 0, energeia: 0, asfalisi: 0, kritiria: true };

export default definirCasos(ypologismosForouEisodimatos, [
  {
    nombre: "40.000 € χωρίς εκπτώσεις",
    origen: { tipo: "recalculado", url: URL_NOMOS_FOROU, detalle: "Άρθρο 33: 10000 × 20% + 8000 × 25% = 2000 + 2000 = 4000." },
    fecha: "2026-10-26",
    entrada: { ...BASE, eisodima: 40000 },
    esperado: { foros: 4000, forologiteo: 40000, mesos: 10, orikos: 25, kathara: 36000 },
  },
  {
    nombre: "22.000 €: ακριβώς το αφορολόγητο",
    origen: { tipo: "recalculado", url: URL_NOMOS_FOROU, detalle: "Μέχρι 22000 ο συντελεστής είναι 0%." },
    fecha: "2026-10-26",
    entrada: { ...BASE, eisodima: 22000 },
    esperado: { foros: 0 },
  },
  {
    nombre: "50.000 € με εισφορές, ενοίκιο και δύο τέκνα",
    origen: {
      tipo: "recalculado",
      url: URL_NOMOS_FOROU,
      detalle: "Εισφορές 5725 (κάτω από το 1/5 των 10000). Τέκνα 2250. Ενοίκιο 6000, έκπτωση 2000. Σύνολο 9975. Φορολογητέο 40025. Φόρος 2000 + 8025 × 25% = 4006,25.",
    },
    fecha: "2026-10-26",
    entrada: { ...BASE, eisodima: 50000, eisfores: 5725, tekna: 2, stegasi: 6000 },
    esperado: { ekptoseis: 9975, forologiteo: 40025, foros: 4006.25 },
  },
  {
    nombre: "Εκτός κριτηρίων: μόνο η έκπτωση ασφάλισης κατοικίας",
    origen: { tipo: "recalculado", url: URL_NOMOS_FOROU, detalle: "Χωρίς τέκνα και στέγαση. Ασφάλιστρα 800, έκπτωση 500. Φορολογητέο 119500. Φόρος 2000 + 2500 + 9000 + 47500 × 35% = 30125." },
    fecha: "2026-10-26",
    entrada: { ...BASE, eisodima: 120000, tekna: 2, stegasi: 3000, asfalisi: 800, kritiria: false },
    esperado: { ekptoseis: 500, foros: 30125, orikos: 35 },
  },
]);
