import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "jp.overtime-pay",
  mercado: "jp",
  concepto: "horas-extra",
  slug: "overtime-pay",
  estado: "publicado",
  requiere: { "jp.overtime-premium": "mapa" },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "月給（通勤手当、家族手当などを除く）", min: 0, porDefecto: 300000 },
    { id: "horasMes", tipo: "numero", etiqueta: "1か月の平均所定労働時間", min: 1, max: 250, porDefecto: 160 },
    { id: "extra", tipo: "numero", etiqueta: "時間外労働の時間（法定労働時間を超えた分）", min: 0, max: 300, porDefecto: 20 },
    { id: "feriado", tipo: "numero", etiqueta: "法定休日に働いた時間", min: 0, max: 200, porDefecto: 0 },
    { id: "noche", tipo: "numero", etiqueta: "深夜（22時から5時）に働いた時間", min: 0, max: 200, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.sueldo <= 0) throw new ErrorEntrada("月給を入力してください。", "sueldo");
    const p = v["jp.overtime-premium"];
    const hora = redondear(entrada.sueldo / entrada.horasMes);
    const hasta60 = Math.min(entrada.extra, 60);
    const sobre60 = Math.max(entrada.extra - 60, 0);
    const pagoExtra = hora * (1 + p.overtime / 100) * hasta60 + hora * (1 + p["over-60"] / 100) * sobre60;
    const pagoFeriado = hora * (1 + p.holiday / 100) * entrada.feriado;
    const pagoNoche = hora * (p.night / 100) * entrada.noche;
    return {
      total: redondear(pagoExtra + pagoFeriado + pagoNoche),
      hora,
      pagoExtra: redondear(pagoExtra),
      pagoFeriado: redondear(pagoFeriado),
      pagoNoche: redondear(pagoNoche),
      sobre60,
    };
  },
  resultado: [
    { clave: "total", etiqueta: "残業代の合計（1か月）", formato: "moneda", destacada: true },
    { clave: "hora", etiqueta: "1時間あたりの賃金", formato: "moneda" },
    { clave: "pagoExtra", etiqueta: "時間外労働の賃金", formato: "moneda" },
    { clave: "pagoFeriado", etiqueta: "休日労働の賃金", formato: "moneda", ocultarSiCero: true },
    { clave: "pagoNoche", etiqueta: "深夜労働の割増分", formato: "moneda", ocultarSiCero: true },
    { clave: "sobre60", etiqueta: "月60時間を超えた時間外労働", formato: "horas", ocultarSiCero: true },
  ],
});
