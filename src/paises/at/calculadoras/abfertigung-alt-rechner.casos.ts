import { definirCasos } from "@/motor/calculo";
import abfertigungAltRechner from "./abfertigung-alt-rechner";

const USP = "https://www.usp.gv.at/themen/mitarbeiter-und-gesundheit/beendigung-des-arbeitsverhaeltnisses/abfertigung.html";

export default definirCasos(abfertigungAltRechner, [
  {
    nombre: "12 Dienstjahre: vier Monatsentgelte",
    origen: { tipo: "recalculado", url: USP, detalle: "Nach zehn Dienstjahren vier Monatsentgelte. 3.000 × 14 / 12 = 3.500; 4 × 3.500 = 14.000; 6 % Lohnsteuer 840." },
    fecha: "2026-10-14",
    entrada: { entgelt: 3000, sonderzahlungen: true, dienstjahre: 12 },
    esperado: { monate: 4, monatsentgelt: 3500, abfertigung: 14000, steuer: 840, netto: 13160 },
  },
  {
    nombre: "25 Dienstjahre: ein Jahresentgelt",
    origen: { tipo: "recalculado", url: USP, detalle: "Nach 25 Dienstjahren ein Jahresentgelt, also zwölf Monatsentgelte: 12 × 3.000 = 36.000." },
    fecha: "2026-10-14",
    entrada: { entgelt: 3000, sonderzahlungen: false, dienstjahre: 25 },
    esperado: { monate: 12, abfertigung: 36000 },
  },
  {
    nombre: "Zwei Dienstjahre: noch kein Anspruch",
    origen: { tipo: "recalculado", url: USP, detalle: "Das Arbeitsverhältnis muss mindestens drei Jahre gedauert haben." },
    fecha: "2026-10-14",
    entrada: { entgelt: 3000, sonderzahlungen: true, dienstjahre: 2 },
    esperado: { monate: 0, abfertigung: 0 },
  },
]);
