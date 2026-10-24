import { definirCasos } from "@/motor/calculo";
import calculadora from "./furusato-nozei";

export default definirCasos(calculadora, [
  {
    nombre: "給与収入500万円、社会保険料72万円",
    origen: {
      tipo: "recalculado",
      detalle: "住民税の課税所得2,410,000、所得割238,500。2,410,000−50,000＝2,360,000は195万円超330万円以下で控除割合79.79％（横浜市の表）。238,500×20%÷79.79%＝59,781＋2,000＝61,781。",
    },
    fecha: "2026-10-17",
    entrada: { kyuyo: 5000000, shakai: 720000, otros: 0 },
    esperado: { shotokuwari: 238500, tasaRenta: 10, proporcion: 79.79, limite: 61781 },
  },
  {
    nombre: "給与収入1,000万円、社会保険料145万円",
    origen: {
      tipo: "recalculado",
      detalle: "給与所得 10,000,000−1,950,000＝8,050,000。住民税の課税所得 8,050,000−1,450,000−430,000＝6,170,000×10%＝617,000−2,500＝614,500。6,120,000は330万円超695万円以下で69.58％。614,500×20%÷69.58%＝176,631＋2,000＝178,631。",
    },
    fecha: "2026-10-17",
    entrada: { kyuyo: 10000000, shakai: 1450000, otros: 0 },
    esperado: { shotokuwari: 614500, tasaRenta: 20, limite: 178631 },
  },
  {
    nombre: "給与収入0円",
    origen: { tipo: "recalculado", detalle: "0円は入力として無効です。" },
    fecha: "2026-10-17",
    entrada: { kyuyo: 0, shakai: 0, otros: 0 },
    esperaError: true,
  },
]);
