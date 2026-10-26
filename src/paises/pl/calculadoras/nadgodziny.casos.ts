import { definirCasos } from "@/motor/calculo";
import nadgodziny from "./nadgodziny";

const KP = "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20260001245";

export default definirCasos(nadgodziny, [
  {
    nombre: "10 nadgodzin w październiku 2026 r. przy 6000 zł",
    origen: { tipo: "recalculado", url: KP, detalle: "Wymiar 176 h; stawka 6000 / 176 = 34,09; normalne 340,91; dodatek 50 % = 170,45; razem 511,36 (art. 151¹ § 1 pkt 2)." },
    fecha: "2026-10-24",
    entrada: { wynagrodzenie: 6000, data: "2026-10-01", godziny50: 10, godziny100: 0 },
    esperado: { wymiar: 176, stawka: 34.09, normalne: 340.91, dodatek50: 170.45, razem: 511.36 },
  },
  {
    nombre: "4 nadgodziny w niedzielę w styczniu 2026 r.",
    origen: { tipo: "recalculado", url: KP, detalle: "Wymiar 160 h; stawka 8000 / 160 = 50; normalne 200; dodatek 100 % = 200; razem 400 (art. 151¹ § 1 pkt 1)." },
    fecha: "2026-10-24",
    entrada: { wynagrodzenie: 8000, data: "2026-01-20", godziny50: 0, godziny100: 4 },
    esperado: { wymiar: 160, normalne: 200, dodatek100: 200, razem: 400 },
  },
]);
