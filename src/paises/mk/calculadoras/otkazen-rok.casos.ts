import { definirCasos } from "@/motor/calculo";
import otkazenRok from "./otkazen-rok";

const ZRO = "https://portal.mdt.gov.mk/post-body-files/zakoni-met-file-LaRm.pdf";

export default definirCasos(otkazenRok, [
  {
    nombre: "Отказ од работник на 15 јануари",
    origen: { tipo: "recalculado", url: ZRO, detalle: "Член 89: рокот тече од 16 јануари; член 88: еден месец, до 15 февруари." },
    fecha: "2026-11-01",
    entrada: { koj: "rabotnik", dogovoreni: 1, vrachen: "2026-01-15" },
    esperado: { pocetok: "2026-01-16", posleden: "2026-02-15", traenje: "1 месец" },
  },
  {
    nombre: "Договорени три месеци",
    origen: { tipo: "recalculado", url: ZRO, detalle: "Член 88, став 1: до три месеци; од 2 ноември до 1 февруари." },
    fecha: "2026-11-01",
    entrada: { koj: "rabotnik", dogovoreni: 3, vrachen: "2026-11-01" },
    esperado: { posleden: "2027-02-01", traenje: "3 месеци" },
  },
  {
    nombre: "Колективно отпуштање",
    origen: { tipo: "recalculado", url: ZRO, detalle: "Член 88, став 2: два месеца; од 11 март до 10 мај." },
    fecha: "2026-11-01",
    entrada: { koj: "kolektivno", dogovoreni: null, vrachen: "2026-03-10" },
    esperado: { posleden: "2026-05-10", traenje: "2 месеци" },
  },
  {
    nombre: "Сезонска работа, отказ во петок",
    origen: { tipo: "recalculado", url: ZRO, detalle: "Член 88, став 3: 7 работни дена. Отказ во петок 6.11.2026; се бројат 9, 10, 11, 12, 13, 16 и 17 ноември." },
    fecha: "2026-11-01",
    entrada: { koj: "sezonski", dogovoreni: null, vrachen: "2026-11-06" },
    esperado: { pocetok: "2026-11-07", posleden: "2026-11-17", traenje: "7 работни денови" },
  },
]);
