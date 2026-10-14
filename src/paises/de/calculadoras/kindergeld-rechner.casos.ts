import { definirCasos } from "@/motor/calculo";
import kindergeldRechner from "./kindergeld-rechner";

export default definirCasos(kindergeldRechner, [
  {
    nombre: "Zwei Kinder, hohes Einkommen: Freibeträge günstiger",
    origen: {
      tipo: "recalculado",
      url: "https://www.gesetze-im-internet.de/estg/__66.html",
      detalle: "Kindergeld 2 × 259 = 518 im Monat, 6216 im Jahr. Freibeträge 2 × 9756 = 19512; Splitting: ESt(150000) − ESt(130488) = 8122 > 6216.",
    },
    fecha: "2026-10-14",
    entrada: { kinder: 2, zvE: 150000, veranlagung: "zusammen" },
    esperado: { monat: 518, jahr: 6216, ersparnis: 8122, besser: "Kinderfreibeträge" },
  },
  {
    nombre: "Ein Kind, mittleres Einkommen: Kindergeld günstiger",
    origen: { tipo: "recalculado", url: "https://www.gesetze-im-internet.de/estg/__32.html", detalle: "Splitting: ESt(60000) − ESt(50244) = 2668 < 3108 Kindergeld im Jahr." },
    fecha: "2026-10-14",
    entrada: { kinder: 1, zvE: 60000, veranlagung: "zusammen" },
    esperado: { jahr: 3108, ersparnis: 2668, besser: "Kindergeld" },
  },
  {
    nombre: "Nur Kindergeld ohne Einkommen",
    origen: { tipo: "recalculado", url: "https://www.gesetze-im-internet.de/estg/__66.html", detalle: "3 × 259 = 777 im Monat." },
    fecha: "2026-10-14",
    entrada: { kinder: 3, zvE: null, veranlagung: "zusammen" },
    esperado: { monat: 777, jahr: 9324, ersparnis: null },
  },
]);
