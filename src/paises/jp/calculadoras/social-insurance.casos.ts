import { definirCasos } from "@/motor/calculo";
import calculadora from "./social-insurance";

export default definirCasos(calculadora, [
  {
    nombre: "東京都、報酬月額30万円、40歳未満",
    origen: {
      tipo: "oficial",
      url: "https://www.kyoukaikenpo.or.jp/assets/R8_13tokyo.pdf",
      detalle: "協会けんぽ東京支部の保険料額表：報酬月額290,000円以上310,000円未満は標準報酬月額300,000円、健康保険の折半額14,775円、厚生年金の折半額27,450円。支援金 300,000×0.23%÷2＝345。雇用保険 300,000×0.5%＝1,500。合計44,070。会社負担は雇用保険0.85%で2,550、計45,120。",
    },
    fecha: "2026-10-17",
    entrada: { sueldo: 300000, region: "tokyo", kaigo: false },
    esperado: { hyojun: 300000, kenpo: 14775, shien: 345, nenkin: 27450, koyo: 1500, total: 44070, empresa: 45120, anual: 528840 },
  },
  {
    nombre: "東京都、報酬月額30万円、介護保険あり",
    origen: {
      tipo: "oficial",
      url: "https://www.kyoukaikenpo.or.jp/assets/R8_13tokyo.pdf",
      detalle: "保険料額表の介護保険第2号被保険者に該当する場合の折半額17,205円（9.85%＋1.62%＝11.47%）。介護保険分は300,000×1.62%÷2＝2,430。",
    },
    fecha: "2026-10-17",
    entrada: { sueldo: 300000, region: "tokyo", kaigo: true },
    esperado: { kenpo: 14775, kaigo: 2430, total: 46500 },
  },
  {
    nombre: "報酬月額80万円（厚生年金は上限）",
    origen: {
      tipo: "recalculado",
      detalle: "報酬月額770,000円以上810,000円未満は標準報酬月額790,000円。厚生年金は上限650,000円で 650,000×18.3%÷2＝59,475。",
    },
    fecha: "2026-10-17",
    entrada: { sueldo: 800000, region: "tokyo", kaigo: false },
    esperado: { hyojun: 790000, hyojunNenkin: 650000, nenkin: 59475 },
  },
  {
    nombre: "報酬月額0円",
    origen: { tipo: "recalculado", detalle: "0円は入力として無効です。" },
    fecha: "2026-10-17",
    entrada: { sueldo: 0, region: "tokyo", kaigo: false },
    esperaError: true,
  },
]);
