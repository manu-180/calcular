import { definirCasos } from "@/motor/calculo";
import calculadora from "./take-home-pay";

export default definirCasos(calculadora, [
  {
    nombre: "年収500万円、東京都、40歳未満",
    origen: {
      tipo: "recalculado",
      detalle:
        "月額416,667円は標準報酬月額410,000円。健保 410,000×9.85%÷2×12＝242,310、支援金 410,000×0.23%÷2×12＝5,658、厚年 410,000×18.3%÷2×12＝450,180、雇用 5,000,000×0.5%＝25,000、計723,148。給与所得控除 5,000,000×20%＋440,000＝1,440,000、給与所得3,560,000。所得税 (3,560,000−723,148−1,040,000)→1,796,000×5%＝89,800、復興1,885、計91,600。住民税 (3,560,000−723,148−430,000)→2,406,000×10%＝240,600−調整控除2,500＝238,100＋均等割5,000＝243,100。手取り3,942,152。",
    },
    fecha: "2026-10-17",
    entrada: { nenshu: 5000000, region: "tokyo", kaigo: false },
    esperado: { hyojun: 410000, kenpo: 242310, shien: 5658, nenkin: 450180, koyo: 25000, shakai: 723148, shotokuzei: 91600, juminzei: 243100, anual: 3942152, mensual: 328513 },
  },
  {
    nombre: "年収800万円、大阪府、介護保険あり",
    origen: {
      tipo: "recalculado",
      detalle:
        "月額666,667円は標準報酬月額680,000円、厚年は上限650,000円。健保 680,000×10.13%÷2×12＝413,304、介護 680,000×1.62%÷2×12＝66,096、支援金 9,384、厚年 650,000×18.3%÷2×12＝713,700、雇用 40,000、計1,242,484。給与所得 8,000,000−1,900,000＝6,100,000。合計所得489万円超655万円以下なので基礎控除670,000。所得税 4,187,000×20%−427,500＝409,900、復興8,607、計418,500。住民税 4,427,000×10%＝442,700−2,500＝440,200＋5,000＝445,200。手取り5,893,816。",
    },
    fecha: "2026-10-17",
    entrada: { nenshu: 8000000, region: "osaka", kaigo: true },
    esperado: { hyojun: 680000, kenpo: 413304, kaigo: 66096, nenkin: 713700, shakai: 1242484, shotokuzei: 418500, juminzei: 445200, anual: 5893816, marginal: 20 },
  },
  {
    nombre: "年収0円",
    origen: { tipo: "recalculado", detalle: "年収0円は入力として無効です。" },
    fecha: "2026-10-17",
    entrada: { nenshu: 0, region: "tokyo", kaigo: false },
    esperaError: true,
  },
]);
