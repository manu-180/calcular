import { definirCasos } from "@/motor/calculo";
import odprawa from "./odprawa";

const ZWOL = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001195";

export default definirCasos(odprawa, [
  {
    nombre: "5 lat stażu: dwie pensje",
    origen: { tipo: "recalculado", url: ZWOL, detalle: "Art. 8 ust. 1 pkt 2: od 2 do 8 lat, 2 × 7000 = 14 000 zł." },
    fecha: "2026-10-24",
    entrada: { wynagrodzenie: 7000, staz: 5 },
    esperado: { pensje: 2, odprawa: 14000 },
  },
  {
    nombre: "Rok stażu: jedna pensja",
    origen: { tipo: "recalculado", url: ZWOL, detalle: "Art. 8 ust. 1 pkt 1: krócej niż 2 lata, 1 × 5000 zł." },
    fecha: "2026-10-24",
    entrada: { wynagrodzenie: 5000, staz: 1 },
    esperado: { pensje: 1, odprawa: 5000 },
  },
  {
    nombre: "Wysoka pensja: limit 15-krotności",
    origen: { tipo: "recalculado", url: ZWOL, detalle: "Art. 8 ust. 4: 3 × 30 000 = 90 000, limit 15 × 4806 = 72 090 zł." },
    fecha: "2026-10-24",
    entrada: { wynagrodzenie: 30000, staz: 10 },
    esperado: { pensje: 3, limit: 72090, odprawa: 72090, obcieta: 17910 },
  },
]);
