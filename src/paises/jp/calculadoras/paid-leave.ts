import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "jp.paid-leave",
  mercado: "jp",
  concepto: "vacaciones",
  slug: "paid-leave",
  estado: "publicado",
  requiere: { "jp.paid-leave-days": "mapa" },
  campos: [
    {
      id: "antiguedad",
      tipo: "opcion",
      etiqueta: "雇い入れの日からの勤続期間",
      opciones: [
        { valor: "0", etiqueta: "6か月" },
        { valor: "1", etiqueta: "1年6か月" },
        { valor: "2", etiqueta: "2年6か月" },
        { valor: "3", etiqueta: "3年6か月" },
        { valor: "4", etiqueta: "4年6か月" },
        { valor: "5", etiqueta: "5年6か月" },
        { valor: "6", etiqueta: "6年6か月以上" },
      ],
      porDefecto: "0",
    },
    {
      id: "dias",
      tipo: "opcion",
      etiqueta: "週の所定労働日数",
      opciones: [
        { valor: "5", etiqueta: "週5日以上" },
        { valor: "4", etiqueta: "週4日" },
        { valor: "3", etiqueta: "週3日" },
        { valor: "2", etiqueta: "週2日" },
        { valor: "1", etiqueta: "週1日" },
      ],
      porDefecto: "5",
    },
    { id: "treinta", tipo: "si-no", etiqueta: "週の所定労働時間が30時間以上です", porDefecto: false },
  ],
  calcular(entrada, v) {
    const dias = entrada.treinta ? "5" : entrada.dias;
    const otorgados = enMapa(v["jp.paid-leave-days"], `d${dias}-${entrada.antiguedad}`);
    const observaciones = ["付与されるのは、直前の1年間（最初は6か月間）の全労働日の8割以上出勤した場合です。"];
    if (dias !== "5") observaciones.push("週の所定労働時間が30時間未満で週4日以下の場合は、日数に応じて比例付与されます。");
    return { otorgados, proporcional: dias !== "5" ? "比例付与（表2）" : "通常の付与（表1）", observaciones };
  },
  resultado: [
    { clave: "otorgados", etiqueta: "付与される年次有給休暇", formato: "dias", destacada: true },
    { clave: "proporcional", etiqueta: "適用される表", formato: "texto" },
  ],
});
