import { definirCasos } from "@/motor/calculo";
import ueberstundenRechner from "./ueberstunden-rechner";

const USP = "https://www.usp.gv.at/themen/mitarbeiter-und-gesundheit/urlaub-und-arbeitszeit/ueberstunden-und-hoechstarbeitszeit.html";
const BMF = "https://www.bmf.gv.at/rechtsnews/steuern-rechtsnews/neue-gesetze/2026/bundesgesetz,-mit-dem-das-einkommensteuergesetz-1988-geaendert-wird.html";

export default definirCasos(ueberstundenRechner, [
  {
    nombre: "3.000 Euro, 40 Stunden, 10 Überstunden",
    origen: { tipo: "recalculado", url: USP, detalle: "Grundlohn 3.000 / (40 × 52 / 12) = 17,31; Zuschlag 50 % = 8,65; 10 × 25,96 = 259,62; Zuschläge 86,54, alle steuerfrei; Zeitausgleich 15 Stunden." },
    fecha: "2026-10-14",
    entrada: { brutto: 3000, wochenstunden: 40, ueberstunden: 10, teiler: null },
    esperado: { grundlohn: 17.31, entgelt: 259.62, zuschlagGesamt: 86.54, steuerfrei: 86.54, zeitausgleich: 15 },
  },
  {
    nombre: "5.000 Euro, 20 Überstunden: steuerfreier Höchstbetrag",
    origen: { tipo: "recalculado", url: BMF, detalle: "Zuschlag je Stunde 14,42; 15 begünstigte Stunden ergäben 216,35, steuerfrei sind 2026 höchstens 170 Euro." },
    fecha: "2026-10-14",
    entrada: { brutto: 5000, wochenstunden: 40, ueberstunden: 20, teiler: null },
    esperado: { entgelt: 865.38, zuschlagGesamt: 288.46, steuerfrei: 170 },
  },
  {
    nombre: "Teiler 143 laut Kollektivvertrag",
    origen: { tipo: "recalculado", url: USP, detalle: "3.000 / 143 = 20,98; mit 50 % Zuschlag 31,47 je Stunde; 5 Stunden 157,34; Zuschläge 52,45." },
    fecha: "2026-10-14",
    entrada: { brutto: 3000, wochenstunden: 38.5, ueberstunden: 5, teiler: 143 },
    esperado: { grundlohn: 20.98, stundensatz: 31.47, entgelt: 157.34, steuerfrei: 52.45 },
  },
]);
