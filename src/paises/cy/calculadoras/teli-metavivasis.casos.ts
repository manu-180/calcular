import { definirCasos } from "@/motor/calculo";
import { URL_KTIMATOLOGIO } from "../lib/fuentes-url";
import teliMetavivasis from "./teli-metavivasis";

export default definirCasos(teliMetavivasis, [
  {
    nombre: "200.000 € χωρίς ΦΠΑ: μείωση 50%",
    origen: { tipo: "recalculado", url: URL_KTIMATOLOGIO, detalle: "Κεφάλαιο 17: 85000 × 3% = 2550, 85000 × 5% = 4250, 30000 × 8% = 2400. Σύνολο 9200. Άρθρο 10(2): μείωση 50%, πληρωτέα 4600." },
    fecha: "2026-10-26",
    entrada: { axia: 200000, fpa: false },
    esperado: { plira: 9200, plirotea: 4600 },
  },
  {
    nombre: "Με ΦΠΑ: χωρίς τέλη",
    origen: { tipo: "recalculado", url: URL_KTIMATOLOGIO, detalle: "Άρθρο 10(1): κανένα τέλος όταν επιβάλλεται ΦΠΑ." },
    fecha: "2026-10-26",
    entrada: { axia: 200000, fpa: true },
    esperado: { plirotea: 0 },
  },
  {
    nombre: "80.000 €: μόνο το πρώτο κλιμάκιο",
    origen: { tipo: "recalculado", url: URL_KTIMATOLOGIO, detalle: "80000 × 3% = 2400, μείον 50% = 1200." },
    fecha: "2026-10-26",
    entrada: { axia: 80000, fpa: false },
    esperado: { plirotea: 1200 },
  },
]);
