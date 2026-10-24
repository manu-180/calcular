import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "jp.basic-pension",
  mercado: "jp",
  concepto: "jubilacion",
  slug: "basic-pension",
  estado: "publicado",
  requiere: {
    "jp.basic-pension-full": "numero",
    "jp.basic-pension-months": "numero",
  },
  campos: [
    { id: "meses", tipo: "entero", etiqueta: "20歳から60歳までに保険料を納めた月数（厚生年金の期間を含む）", min: 0, max: 480, porDefecto: 480 },
  ],
  calcular(entrada, v, { redondear }) {
    const total = v["jp.basic-pension-months"];
    const anual = redondear((v["jp.basic-pension-full"] * Math.min(entrada.meses, total)) / total);
    const observaciones: string[] = [];
    if (entrada.meses < 120) observaciones.push("老齢基礎年金を受け取るには、保険料納付済期間と免除期間などを合わせた受給資格期間が10年以上必要です。");
    return { anual, mensual: redondear(anual / 12), faltan: Math.max(0, total - entrada.meses), completo: v["jp.basic-pension-full"], observaciones };
  },
  resultado: [
    { clave: "anual", etiqueta: "老齢基礎年金（年額）", formato: "moneda", destacada: true },
    { clave: "mensual", etiqueta: "1か月あたり", formato: "moneda" },
    { clave: "completo", etiqueta: "満額（年額）", formato: "moneda" },
    { clave: "faltan", etiqueta: "満額までに足りない月数", formato: "meses" },
  ],
});
