import { definirCasos } from "@/motor/calculo";
import calculadora from "./paid-leave";

export default definirCasos(calculadora, [
  {
    nombre: "通常の労働者、6か月",
    origen: { tipo: "oficial", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/faq/kijyunhou_6_00001.html", detalle: "表1：6か月で10労働日。" },
    fecha: "2026-10-17",
    entrada: { antiguedad: "0", dias: "5", treinta: false },
    esperado: { otorgados: 10 },
  },
  {
    nombre: "通常の労働者、6年6か月以上",
    origen: { tipo: "oficial", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/faq/kijyunhou_6_00001.html", detalle: "表1：6年6か月以上で20労働日。" },
    fecha: "2026-10-17",
    entrada: { antiguedad: "6", dias: "5", treinta: false },
    esperado: { otorgados: 20 },
  },
  {
    nombre: "週3日のパート、3年6か月",
    origen: { tipo: "oficial", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/faq/kijyunhou_6_00001.html", detalle: "表2：週3日、3.5年で8日。" },
    fecha: "2026-10-17",
    entrada: { antiguedad: "3", dias: "3", treinta: false },
    esperado: { otorgados: 8 },
  },
  {
    nombre: "週4日でも週30時間以上なら表1",
    origen: { tipo: "oficial", url: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/faq/kijyunhou_6_00001.html", detalle: "週所定労働時間30時間以上は表1。1年6か月で11労働日。" },
    fecha: "2026-10-17",
    entrada: { antiguedad: "1", dias: "4", treinta: true },
    esperado: { otorgados: 11 },
  },
]);
