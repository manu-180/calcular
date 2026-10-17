import { definirCasos } from "@/motor/calculo";
import ahvRentenrechner from "./ahv-rentenrechner";

const MB301 = "https://www.ahv-iv.ch/p/3.01.d";
const AHVG = "https://www.fedlex.admin.ch/eli/cc/63/837_843_843/de#art_34";

export default definirCasos(ahvRentenrechner, [
  {
    nombre: "Beispiel Ehepaar aus Merkblatt 3.01",
    origen: {
      tipo: "oficial",
      url: MB301,
      detalle: "Mann 36 990 + 9278 = 46 268, aufgerundet 46 872: 1935 Franken. Frau 35 219 + 9494 = 44 713, aufgerundet 45 360: 1915 Franken. Plafonierung auf 3780: Mann 1900, Frau 1880 (ohne Zuschlag der Übergangsgeneration).",
    },
    fecha: "2026-10-14",
    entrada: { einkommen: 46268, verheiratet: true, einkommenPartner: 44713 },
    esperado: { ungekuerzt: 1935, tabellenwert: 46872, rente: 1900, partner: 1880, summe: 3780, dreizehnte: 1900, jahr: 24700 },
  },
  {
    nombre: "Tabellenwerte der Skala 44",
    origen: { tipo: "oficial", url: MB301, detalle: "Tabelle Skala 44: 61 992 Franken ergeben 2137 Franken." },
    fecha: "2026-10-14",
    entrada: { einkommen: 61992, verheiratet: false, einkommenPartner: null },
    esperado: { rente: 2137, jahr: 27781 },
  },
  {
    nombre: "Minimalrente",
    origen: { tipo: "oficial", url: MB301, detalle: "Bis 15 120 Franken: 1260 Franken." },
    fecha: "2026-10-14",
    entrada: { einkommen: 10000, verheiratet: false, einkommenPartner: null },
    esperado: { rente: 1260, tabellenwert: 15120 },
  },
  {
    nombre: "Maximalrente",
    origen: { tipo: "oficial", url: MB301, detalle: "Ab 90 720 Franken: 2520 Franken." },
    fecha: "2026-10-14",
    entrada: { einkommen: 150000, verheiratet: false, einkommenPartner: null },
    esperado: { rente: 2520, tabellenwert: 90720 },
  },
  {
    nombre: "Renten ab 2027",
    origen: {
      tipo: "recalculado",
      url: AHVG,
      detalle: "Minimalrente 1280. 60 000 aufgerundet auf 15 360 + 30 × 1536 = 61 440. 104/100 × 1280 + 8/600 × 61 440 = 1331,20 + 819,20 = 2150,40, gerundet 2150.",
    },
    fecha: "2027-01-15",
    entrada: { einkommen: 60000, verheiratet: false, einkommenPartner: null },
    esperado: { rente: 2150, tabellenwert: 61440 },
  },
  {
    nombre: "Verheiratet ohne Einkommen des Ehegatten",
    origen: { tipo: "recalculado", detalle: "Das zweite Einkommen fehlt." },
    fecha: "2026-10-14",
    entrada: { einkommen: 50000, verheiratet: true, einkommenPartner: null },
    esperaError: true,
  },
]);
