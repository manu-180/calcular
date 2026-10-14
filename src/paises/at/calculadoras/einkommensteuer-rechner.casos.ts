import { definirCasos } from "@/motor/calculo";
import einkommensteuerRechner from "./einkommensteuer-rechner";

const TARIF = "https://www.bmf.gv.at/themen/steuern/arbeitnehmerveranlagung/steuertarif-steuerabsetzbetraege/steuertarif-steuerabsetzbetraege.html";

export default definirCasos(einkommensteuerRechner, [
  {
    nombre: "50.000 Euro Einkommen, Arbeitnehmer",
    origen: { tipo: "recalculado", url: TARIF, detalle: "20 % × 8.453 = 1.690,60; 30 % × 14.466 = 4.339,80; 40 % × 13.542 = 5.416,80; Tarif 11.447,20; minus Verkehrsabsetzbetrag 496 = 10.951,20." },
    fecha: "2026-10-14",
    entrada: { einkommen: 50000, arbeitnehmer: true, avabKinder: 0 },
    esperado: { tarifsteuer: 11447.2, steuer: 10951.2, grenzsteuersatz: 40 },
  },
  {
    nombre: "Genau an der Grenze der ersten Tarifstufe",
    origen: { tipo: "recalculado", url: TARIF, detalle: "Bis 13.539 Euro gilt 0 %." },
    fecha: "2026-10-14",
    entrada: { einkommen: 13539, arbeitnehmer: false, avabKinder: 0 },
    esperado: { steuer: 0, grenzsteuersatz: 0 },
  },
  {
    nombre: "1,2 Millionen Euro, Spitzensteuersatz",
    origen: { tipo: "recalculado", url: TARIF, detalle: "1.690,60 + 4.339,80 + 13.562,80 + 16.557,12 + 447.570,50 + 55 % × 200.000 = 593.720,82." },
    fecha: "2026-10-14",
    entrada: { einkommen: 1200000, arbeitnehmer: false, avabKinder: 0 },
    esperado: { steuer: 593720.82, grenzsteuersatz: 55 },
  },
  {
    nombre: "30.000 Euro, Alleinerzieherin mit zwei Kindern",
    origen: { tipo: "recalculado", url: "https://www.bmf.gv.at/themen/steuern/arbeitnehmerveranlagung/steuertarif-steuerabsetzbetraege/uebersicht-steuerabsetzbetraege.html", detalle: "Tarif 1.690,60 + 30 % × 8.008 = 4.093,00; minus Verkehrsabsetzbetrag 496 und Alleinerzieherabsetzbetrag 828 = 2.769,00." },
    fecha: "2026-10-14",
    entrada: { einkommen: 30000, arbeitnehmer: true, avabKinder: 2 },
    esperado: { tarifsteuer: 4093, absetzbetraege: 1324, steuer: 2769 },
  },
]);
