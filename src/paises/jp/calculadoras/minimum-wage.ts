import { definirCalculadora, porRegion } from "@/motor/calculo";

export default definirCalculadora({
  id: "jp.minimum-wage",
  mercado: "jp",
  concepto: "salario-minimo",
  slug: "minimum-wage",
  estado: "publicado",
  requiere: { "jp.minimum-wage": "numero-por-region" },
  campos: [
    { id: "region", tipo: "region", etiqueta: "働いている都道府県", porDefecto: "tokyo" },
    { id: "horas", tipo: "numero", etiqueta: "1か月の労働時間", min: 1, max: 300, porDefecto: 160 },
    { id: "jikyu", tipo: "moneda", etiqueta: "いまの時給（確認したい場合）", min: 0, requerido: false },
  ],
  calcular(entrada, v, { redondear }) {
    const hora = porRegion(v["jp.minimum-wage"], entrada.region);
    const observaciones: string[] = [];
    let diferencia: number | null = null;
    if (entrada.jikyu !== null && entrada.jikyu > 0) {
      diferencia = entrada.jikyu - hora;
      observaciones.push(diferencia < 0 ? "入力した時給は最低賃金を下回っています。最寄りの労働基準監督署に相談できます。" : "入力した時給は最低賃金以上です。");
    }
    return {
      hora,
      mensual: redondear(hora * entrada.horas),
      anual: redondear(hora * entrada.horas * 12),
      diferencia,
      observaciones,
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "最低賃金（時間額）", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "最低賃金で働いた場合の月額", formato: "moneda" },
    { clave: "anual", etiqueta: "最低賃金で働いた場合の年額", formato: "moneda" },
    { clave: "diferencia", etiqueta: "いまの時給と最低賃金の差", formato: "moneda" },
  ],
});
