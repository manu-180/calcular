import { definirCasos } from "@/motor/calculo";
import calculadora from "./basic-pension";

export default definirCasos(calculadora, [
  {
    nombre: "40年間すべて納付（満額）",
    origen: { tipo: "oficial", url: "https://www.nenkin.go.jp/service/jukyu/seido/roureinenkin/jukyu-yoken/20150401-02.html", detalle: "令和8年4月分からの満額は年847,300円（昭和31年4月2日以後生まれ）。月額70,608円。" },
    fecha: "2026-10-17",
    entrada: { meses: 480 },
    esperado: { anual: 847300, mensual: 70608, faltan: 0 },
  },
  {
    nombre: "納付360か月",
    origen: { tipo: "recalculado", detalle: "847,300×360/480＝635,475。月額52,956。" },
    fecha: "2026-10-17",
    entrada: { meses: 360 },
    esperado: { anual: 635475, mensual: 52956, faltan: 120 },
  },
  {
    nombre: "納付100か月",
    origen: { tipo: "recalculado", detalle: "847,300×100/480＝176,520.8→176,521。受給資格期間の10年に足りない場合の注意を表示。" },
    fecha: "2026-10-17",
    entrada: { meses: 100 },
    esperado: { anual: 176521, faltan: 380 },
  },
]);
