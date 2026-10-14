import { definirCasos } from "@/motor/calculo";
import kleinunternehmerRechner from "./kleinunternehmer-rechner";

const KLU = "https://www.usp.gv.at/themen/steuern-finanzen/umsatzsteuer-ueberblick/weitere-informationen-zur-umsatzsteuer/weitere-steuertatbestaende-und-befreiungen/kleinunternehmen.html";

export default definirCasos(kleinunternehmerRechner, [
  {
    nombre: "Unter der Grenze",
    origen: { tipo: "recalculado", url: KLU, detalle: "Weder im Vorjahr noch im laufenden Jahr über 55.000 Euro: befreit; Spielraum 10.000." },
    fecha: "2026-10-14",
    entrada: { vorjahr: 40000, laufend: 45000 },
    esperado: { status: "Kleinunternehmer: Ihre Umsätze sind von der Umsatzsteuer befreit.", spielraum: 10000, toleranzGrenze: 60500 },
  },
  {
    nombre: "Innerhalb der Toleranz von 10 %",
    origen: { tipo: "recalculado", url: KLU, detalle: "58.000 Euro liegen über 55.000, aber unter 60.500: Befreiung bis Jahresende." },
    fecha: "2026-10-14",
    entrada: { vorjahr: 50000, laufend: 58000 },
    esperado: { status: "Für dieses Jahr noch Kleinunternehmer: Die Grenze ist um höchstens 10 % überschritten.", spielraum: 0 },
  },
  {
    nombre: "Mehr als 10 % überschritten",
    origen: { tipo: "recalculado", url: KLU, detalle: "65.000 Euro liegen über 60.500: Die Befreiung fällt weg." },
    fecha: "2026-10-14",
    entrada: { vorjahr: 50000, laufend: 65000 },
    esperado: { status: "Befreiung entfällt: Ab dem Umsatz, mit dem Sie die Grenze um mehr als 10 % überschreiten, wird Umsatzsteuer fällig." },
  },
  {
    nombre: "Vorjahr über der Grenze",
    origen: { tipo: "recalculado", url: KLU, detalle: "Die Grenze darf auch im vorangegangenen Jahr nicht überschritten worden sein." },
    fecha: "2026-10-14",
    entrada: { vorjahr: 56000, laufend: 30000 },
    esperado: { status: "Keine Kleinunternehmerregelung: Der Umsatz im Vorjahr liegt über der Grenze." },
  },
]);
