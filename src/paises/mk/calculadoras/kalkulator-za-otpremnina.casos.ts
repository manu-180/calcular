import { definirCasos } from "@/motor/calculo";
import kalkulatorZaOtpremnina from "./kalkulator-za-otpremnina";

const ZRO = "https://portal.mdt.gov.mk/post-body-files/zakoni-met-file-LaRm.pdf";

export default definirCasos(kalkulatorZaOtpremnina, [
  {
    nombre: "8 години и 40.000 денари",
    origen: { tipo: "recalculado", url: ZRO, detalle: "Член 97: од 5 до 10 години = 2,5 нето-плати; 2,5 × 40.000 = 100.000." },
    fecha: "2026-11-01",
    entrada: { plata: 40000, godini: 8, sezonski: false },
    esperado: { iznos: 100000, plati: 2.5, osnovica: 40000, minimum: 24367 },
  },
  {
    nombre: "Точно 5 години, плата под минимумот",
    origen: { tipo: "recalculado", url: ZRO, detalle: "Најниска основица 50 % од 48.733 = 24.366,5; 2,5 × 24.366,5 = 60.916,25." },
    fecha: "2026-11-01",
    entrada: { plata: 20000, godini: 5, sezonski: false },
    esperado: { iznos: 60916, plati: 2.5, osnovica: 24367 },
  },
  {
    nombre: "Над 25 години",
    origen: { tipo: "recalculado", url: ZRO, detalle: "Член 97: над 25 години = 7 нето-плати; 7 × 50.000 = 350.000." },
    fecha: "2026-11-01",
    entrada: { plata: 50000, godini: 26, sezonski: false },
    esperado: { iznos: 350000, plati: 7 },
  },
  {
    nombre: "Сезонска работа",
    origen: { tipo: "recalculado", url: ZRO, detalle: "Член 97, став 6: без испратнина." },
    fecha: "2026-11-01",
    entrada: { plata: 40000, godini: 1, sezonski: true },
    esperado: { iznos: 0 },
  },
]);
