import { definirCasos } from "@/motor/calculo";
import calculadora from "./inheritance-tax";

export default definirCasos(calculadora, [
  {
    nombre: "妻と子2人、課税遺産総額1億5,200万円（国税庁の例）",
    origen: {
      tipo: "oficial",
      url: "https://www.nta.go.jp/taxes/shiraberu/taxanswer/sozoku/4155.htm",
      detalle: "国税庁の例：妻7,600万円×30%−700万円＝1,580万円、子3,800万円×20%−200万円＝560万円ずつ、相続税の総額2,700万円。正味の遺産額は1億5,200万円＋基礎控除4,800万円＝2億円。子が納める合計1,350万円（1人675万円）。",
    },
    fecha: "2026-10-17",
    entrada: { isan: 200000000, conyuge: true, hijos: 2 },
    esperado: { kiso: 48000000, kazei: 152000000, total: 27000000, conyugeAntes: 13500000, pagar: 13500000, porHijo: 6750000, herederos: 3 },
  },
  {
    nombre: "配偶者と子1人、遺産5,000万円",
    origen: { tipo: "recalculado", detalle: "基礎控除4,200万円、課税遺産総額800万円。400万円×10%＝40万円ずつで総額80万円。子が納めるのは40万円。" },
    fecha: "2026-10-17",
    entrada: { isan: 50000000, conyuge: true, hijos: 1 },
    esperado: { kiso: 42000000, kazei: 8000000, total: 800000, pagar: 400000, porHijo: 400000 },
  },
  {
    nombre: "子3人のみ、遺産1億円",
    origen: {
      tipo: "recalculado",
      detalle: "基礎控除4,800万円、課税遺産総額5,200万円。1人17,333,000円（千円未満切捨て）×15%−50万円＝2,099,950円。3人で6,299,850円、総額は100円未満切捨てで6,299,800円。",
    },
    fecha: "2026-10-17",
    entrada: { isan: 100000000, conyuge: false, hijos: 3 },
    esperado: { kiso: 48000000, kazei: 52000000, total: 6299800, pagar: 6299800, porHijo: 2099933 },
  },
  {
    nombre: "基礎控除以下",
    origen: { tipo: "recalculado", detalle: "配偶者と子2人の基礎控除4,800万円以下なので相続税はかかりません。" },
    fecha: "2026-10-17",
    entrada: { isan: 40000000, conyuge: true, hijos: 2 },
    esperado: { kazei: 0, total: 0, pagar: 0 },
  },
]);
