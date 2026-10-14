import { definirCasos } from "@/motor/calculo";
import urlaubsanspruchRechner from "./urlaubsanspruch-rechner";

const USP = "https://www.usp.gv.at/themen/mitarbeiter-und-gesundheit/urlaub-und-arbeitszeit/urlaub.html";

export default definirCasos(urlaubsanspruchRechner, [
  {
    nombre: "Fünftagewoche: 25 Arbeitstage",
    origen: { tipo: "oficial", url: USP, detalle: "30 Werktage bei einer Sechstagewoche bzw. 25 Arbeitstage bei einer Fünftagewoche, insgesamt fünf Wochen." },
    fecha: "2026-10-14",
    entrada: { arbeitstage: 5, dienstjahre: 3, monate: null },
    esperado: { arbeitstage: 25, wochen: 5, werktage: 30 },
  },
  {
    nombre: "Nach 25 Dienstjahren: 30 Arbeitstage",
    origen: { tipo: "oficial", url: USP, detalle: "Mehr als 25 Dienstjahre: 36 Werktage bzw. 30 Arbeitstage bei einer Fünftagewoche, sechs Wochen." },
    fecha: "2026-10-14",
    entrada: { arbeitstage: 5, dienstjahre: 25, monate: null },
    esperado: { arbeitstage: 30, wochen: 6, werktage: 36 },
  },
  {
    nombre: "Viertagewoche",
    origen: { tipo: "recalculado", url: USP, detalle: "30 Werktage × 4 / 6 = 20 Arbeitstage." },
    fecha: "2026-10-14",
    entrada: { arbeitstage: 4, dienstjahre: 1, monate: null },
    esperado: { arbeitstage: 20 },
  },
  {
    nombre: "Erstes Arbeitsjahr nach drei Monaten",
    origen: { tipo: "recalculado", url: USP, detalle: "Anteilig: 30 × 3 / 12 = 7,5 Werktage, bei fünf Arbeitstagen 6,25 Tage." },
    fecha: "2026-10-14",
    entrada: { arbeitstage: 5, dienstjahre: 0, monate: 3 },
    esperado: { werktage: 7.5, arbeitstage: 6.25 },
  },
]);
