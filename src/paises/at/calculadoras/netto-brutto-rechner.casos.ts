import { definirCasos } from "@/motor/calculo";
import nettoBruttoRechner from "./netto-brutto-rechner";

const BMF_RECHNER = "https://onlinerechner.haude.at/BMF-Brutto-Netto-Rechner/";

export default definirCasos(nettoBruttoRechner, [
  {
    nombre: "2.454,71 Euro netto in Wien ergeben 3.500 Euro brutto",
    origen: { tipo: "oficial", url: BMF_RECHNER, detalle: "BMF-Brutto-Netto-Rechner 2026: 3.500 Euro brutto in Wien ergeben 2.454,71 Euro netto; umgekehrt muss der Rechner 3.500 liefern." },
    fecha: "2026-10-14",
    entrada: { netto: 2454.71, wien: true, kinderUnter18: 0, kinderAb18: 0, faboHalb: false, avabKinder: 0 },
    esperado: { brutto: 3500, netto: 2454.71, lohnsteuer: 404.09, sv: 641.2 },
  },
  {
    nombre: "4.728,26 Euro netto in Wien: rund 8.000 Euro brutto",
    origen: { tipo: "oficial", url: BMF_RECHNER, detalle: "BMF-Brutto-Netto-Rechner 2026: 8.000 Euro brutto in Wien ergeben 4.728,26 Euro netto. Schon 7.999,99 Euro ergeben auf den Cent dasselbe Netto, das kleinste Brutto ist also 7.999,99." },
    fecha: "2026-10-14",
    entrada: { netto: 4728.26, wien: true, kinderUnter18: 0, kinderAb18: 0, faboHalb: false, avabKinder: 0 },
    esperado: { brutto: 7999.99, netto: 4728.26 },
  },
  {
    nombre: "Netto über dem Rahmen des Rechners",
    origen: { tipo: "recalculado", url: BMF_RECHNER, detalle: "40.000 Euro brutto ergeben weniger als 50.000 Euro netto." },
    fecha: "2026-10-14",
    entrada: { netto: 50000, wien: false, kinderUnter18: 0, kinderAb18: 0, faboHalb: false, avabKinder: 0 },
    esperaError: true,
  },
]);
