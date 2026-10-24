import { definirCasos } from "@/motor/calculo";
import calculadora from "./usd-to-krw";

export default definirCasos(calculadora, [
  {
    nombre: "100달러를 원화로",
    origen: { tipo: "recalculado", detalle: "2026년 10월 23일 매매기준율 1,324.6원(한국은행 ECOS 731Y001). 100×1,324.6 = 132,460." },
    fecha: "2026-10-24",
    entrada: { banghyang: "usd-krw", geumaek: 100 },
    esperado: { resultado: 132460, tasa: 1324.6, fecha: "2026-10-23" },
  },
  {
    nombre: "100만원을 달러로",
    origen: { tipo: "recalculado", detalle: "1,000,000÷1,324.6 = 754.94." },
    fecha: "2026-10-24",
    entrada: { banghyang: "krw-usd", geumaek: 1000000 },
    esperado: { resultado: 754.94 },
    tolerancia: 0.01,
  },
  {
    nombre: "0원은 오류",
    origen: { tipo: "recalculado", detalle: "금액은 0보다 커야 해요." },
    fecha: "2026-10-24",
    entrada: { banghyang: "usd-krw", geumaek: 0 },
    esperaError: true,
  },
]);
