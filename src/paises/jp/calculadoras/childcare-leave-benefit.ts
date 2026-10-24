import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "jp.childcare-leave-benefit",
  mercado: "jp",
  concepto: "propio",
  slug: "childcare-leave-benefit",
  estado: "publicado",
  requiere: {
    "jp.childcare-benefit-rate": "mapa",
    "jp.childcare-benefit-wage": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "休業開始前6か月の賃金の月平均（賞与を除く）", min: 0, porDefecto: 300000 },
    { id: "meses", tipo: "entero", etiqueta: "育児休業の期間（月数）", min: 1, max: 24, porDefecto: 12 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.salario <= 0) throw new ErrorEntrada("賃金の月平均を入力してください。", "salario");
    const t = v["jp.childcare-benefit-rate"];
    const l = v["jp.childcare-benefit-wage"];
    const base = Math.min(l.max, Math.max(l.min, entrada.salario));
    const primero = redondear((base * t.first) / 100);
    const despues = redondear((base * t.after) / 100);
    const mesesPrimero = Math.min(entrada.meses, 6);
    const mesesDespues = Math.max(entrada.meses - 6, 0);
    const observaciones: string[] = [];
    if (entrada.salario > l.max) observaciones.push("休業開始時の賃金月額が上限額を超えているので、上限額で計算しています。");
    return { primero, despues, total: primero * mesesPrimero + despues * mesesDespues, base, observaciones };
  },
  resultado: [
    { clave: "primero", etiqueta: "休業開始から180日までの月額（67％）", formato: "moneda", destacada: true },
    { clave: "despues", etiqueta: "181日目以降の月額（50％）", formato: "moneda" },
    { clave: "total", etiqueta: "休業期間全体の合計（目安）", formato: "moneda" },
    { clave: "base", etiqueta: "計算に使う休業開始時の賃金月額", formato: "moneda" },
  ],
});
