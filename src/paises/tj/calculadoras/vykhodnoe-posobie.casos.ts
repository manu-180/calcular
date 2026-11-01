import { definirCasos } from "@/motor/calculo";
import vykhodnoePosobie from "./vykhodnoe-posobie";

const TK = "https://ncz.tj/content/%D1%82%D1%80%D1%83%D0%B4%D0%BE%D0%B2%D0%BE%D0%B9-%D0%BA%D0%BE%D0%B4%D0%B5%D0%BA%D1%81-%D1%80%D0%B5%D1%81%D0%BF%D1%83%D0%B1%D0%BB%D0%B8%D0%BA%D0%B8-%D1%82%D0%B0%D0%B4%D0%B6%D0%B8%D0%BA%D0%B8%D1%81%D1%82%D0%B0%D0%BD";

export default definirCasos(vykhodnoePosobie, [
  {
    nombre: "Статья 51, заработок 5000 сомони",
    origen: { tipo: "recalculado", url: TK, detalle: "Ч. 2 ст. 51: 3 × 5000 = 15 000." },
    fecha: "2026-10-31",
    entrada: {"zarabotok": 5000, "osnovanie": "likvidatsiya"},
    esperado: {"posobie": 15000, "mesyatsev": 3},
  },
  {
    nombre: "Статья 169, заработок 5000 сомони",
    origen: { tipo: "recalculado", url: TK, detalle: "Ч. 1 ст. 169: 1 × 5000." },
    fecha: "2026-10-31",
    entrada: {"zarabotok": 5000, "osnovanie": "obychnoe"},
    esperado: {"posobie": 5000, "mesyatsev": 1},
  },
  {
    nombre: "Статья 51, заработок 1300 сомони",
    origen: { tipo: "recalculado", url: TK, detalle: "3 × 1300 = 3900." },
    fecha: "2026-10-31",
    entrada: {"zarabotok": 1300, "osnovanie": "likvidatsiya"},
    esperado: {"posobie": 3900},
  },
  {
    nombre: "Заработок ноль",
    origen: { tipo: "recalculado", url: TK, detalle: "Заработок должен быть больше нуля." },
    fecha: "2026-10-31",
    entrada: {"zarabotok": 0, "osnovanie": "obychnoe"},
    esperaError: true,
  },
]);
