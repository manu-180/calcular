import { definirCasos } from "@/motor/calculo";
import calculadora from "./shiyongqi-gongzi";

export default definirCasos(calculadora, [
  {
    nombre: "三年合同，约定月薪1万元",
    origen: { tipo: "recalculado", detalle: "劳动合同法第十九条：三年以上试用期不得超过六个月；第二十条：10000×80%＝8000。" },
    fecha: "2026-10-29",
    entrada: { qixian: "chang", yueding: 10000, zuidi: null },
    esperado: { shangxian: 6, bashi: 8000, zuidiGongzi: 8000 },
  },
  {
    nombre: "一年合同，约定3000元，广州最低工资2680元",
    origen: { tipo: "recalculado", detalle: "试用期最多两个月；3000×80%＝2400，低于2680元最低工资，按2680元。" },
    fecha: "2026-10-29",
    entrada: { qixian: "zhong", yueding: 3000, zuidi: 2680 },
    esperado: { shangxian: 2, bashi: 2400, zuidiGongzi: 2680 },
  },
  {
    nombre: "半年合同",
    origen: { tipo: "recalculado", detalle: "三个月以上不满一年，试用期不得超过一个月。" },
    fecha: "2026-10-29",
    entrada: { qixian: "duan", yueding: 6000, zuidi: null },
    esperado: { shangxian: 1, zuidiGongzi: 4800 },
  },
  {
    nombre: "两个月的合同不能约定试用期",
    origen: { tipo: "recalculado", detalle: "劳动合同期限不满三个月的，不得约定试用期。" },
    fecha: "2026-10-29",
    entrada: { qixian: "wu", yueding: 6000, zuidi: null },
    esperado: { shangxian: 0 },
  },
]);
