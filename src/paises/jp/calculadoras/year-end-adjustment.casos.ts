import { definirCasos } from "@/motor/calculo";
import calculadora from "./year-end-adjustment";

export default definirCasos(calculadora, [
  {
    nombre: "給与500万円、源泉徴収12万円（還付）",
    origen: { tipo: "recalculado", detalle: "課税給与所得 3,560,000−720,000−1,040,000＝1,800,000。算出税額90,000×102.1%＝91,890→91,800。120,000−91,800＝28,200の還付。" },
    fecha: "2026-10-17",
    entrada: { kyuyo: 5000000, shakai: 720000, otros: 0, jutaku: 0, gensen: 120000 },
    esperado: { kazei: 1800000, nenzei: 91800, diferencia: 28200, resultado: "還付（戻ってくる）" },
  },
  {
    nombre: "住宅ローン控除5万円あり",
    origen: { tipo: "recalculado", detalle: "算出税額90,000−50,000＝40,000×102.1%＝40,840→40,800。120,000−40,800＝79,200の還付。" },
    fecha: "2026-10-17",
    entrada: { kyuyo: 5000000, shakai: 720000, otros: 0, jutaku: 50000, gensen: 120000 },
    esperado: { nenzei: 40800, diferencia: 79200 },
  },
  {
    nombre: "給与800万円、源泉徴収30万円（不足）",
    origen: {
      tipo: "recalculado",
      detalle: "給与所得6,100,000、基礎控除670,000。課税給与所得 6,100,000−1,200,000−670,000＝4,230,000×20%−427,500＝418,500×102.1%＝427,288→427,200。300,000−427,200＝−127,200。",
    },
    fecha: "2026-10-17",
    entrada: { kyuyo: 8000000, shakai: 1200000, otros: 0, jutaku: 0, gensen: 300000 },
    esperado: { kazei: 4230000, nenzei: 427200, diferencia: -127200, resultado: "不足（追加で徴収）" },
  },
  {
    nombre: "給与0円",
    origen: { tipo: "recalculado", detalle: "0円は入力として無効です。" },
    fecha: "2026-10-17",
    entrada: { kyuyo: 0, shakai: 0, otros: 0, jutaku: 0, gensen: 0 },
    esperaError: true,
  },
]);
