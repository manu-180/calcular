import { definirCasos } from "@/motor/calculo";
import lohnnebenkostenRechner from "./lohnnebenkosten-rechner";

const BMF_RECHNER = "https://onlinerechner.haude.at/BMF-Brutto-Netto-Rechner/";

export default definirCasos(lohnnebenkostenRechner, [
  {
    nombre: "3.500 Euro in Wien, ohne DZ",
    origen: { tipo: "oficial", url: BMF_RECHNER, detalle: "BMF-Brutto-Netto-Rechner 2026, Reiter Dienstgeber, Wien: SV 743,05, DB 129,50, KommSt 105,00, BV 53,55, Summe 1.031,10; Sonderzahlung 1.004,85; Jahr 14.382,90; Gesamtsumme 63.382,90." },
    fecha: "2026-10-14",
    entrada: { brutto: 3500, wien: true, dz: null, bv: true },
    esperado: { sv: 743.05, db: 129.5, kommunalsteuer: 105, bv: 53.55, dgMonat: 1031.1, kostenMonat: 4531.1, dgSonderzahlung: 1004.85, dgJahr: 14382.9, kostenJahr: 63382.9 },
  },
  {
    nombre: "2.300 Euro in Wien, ohne DZ",
    origen: { tipo: "oficial", url: BMF_RECHNER, detalle: "BMF-Brutto-Netto-Rechner 2026, Reiter Dienstgeber, Wien: SV 488,29, DB 85,10, KommSt 69,00, BV 35,19, Summe 677,58; Sonderzahlung 660,33; Jahr 9.451,62." },
    fecha: "2026-10-14",
    entrada: { brutto: 2300, wien: true, dz: null, bv: true },
    esperado: { sv: 488.29, dgMonat: 677.58, dgSonderzahlung: 660.33, dgJahr: 9451.62, kostenJahr: 41651.62 },
  },
  {
    nombre: "3.500 Euro außerhalb Wiens mit DZ 0,4 %",
    origen: { tipo: "recalculado", url: "https://www.sozialversicherung.at/cdscontent/load?contentid=10008.806858", detalle: "SV 3.500 × 20,98 % = 734,30; DB 129,50; DZ 14,00; KommSt 105,00; BV 53,55; zusammen 1.036,35." },
    fecha: "2026-10-14",
    entrada: { brutto: 3500, wien: false, dz: 0.4, bv: true },
    esperado: { sv: 734.3, dz: 14, dgMonat: 1036.35 },
  },
  {
    nombre: "DZ über dem höchsten Satz",
    origen: { tipo: "recalculado", url: "https://www.usp.gv.at/themen/steuern-finanzen/steuerliche-rechte-und-pflichten/weitere-informationen-zu-steuerlichen-rechten-und-pflichten-als-unternehmen/fristen-und-faelligkeiten.html", detalle: "Der DZ liegt zwischen 0,31 und 0,4 %." },
    fecha: "2026-10-14",
    entrada: { brutto: 3500, wien: false, dz: 1, bv: true },
    esperaError: true,
  },
]);
