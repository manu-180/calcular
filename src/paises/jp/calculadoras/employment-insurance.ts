import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "jp.employment-insurance",
  mercado: "jp",
  concepto: "propio",
  slug: "employment-insurance",
  estado: "publicado",
  requiere: {
    "jp.employment-insurance-worker": "mapa",
    "jp.employment-insurance-employer": "mapa",
  },
  campos: [
    { id: "chingin", tipo: "moneda", etiqueta: "賃金（通勤手当などを含む支給総額）", min: 0, porDefecto: 300000 },
    { id: "jigyo", tipo: "opcion-dato", dato: "jp.employment-insurance-worker", etiqueta: "事業の種類", porDefecto: "general" },
  ],
  calcular(entrada, v) {
    if (entrada.chingin <= 0) throw new ErrorEntrada("賃金を入力してください。", "chingin");
    const tasaHonin = enMapa(v["jp.employment-insurance-worker"], entrada.jigyo);
    const tasaJigyo = enMapa(v["jp.employment-insurance-employer"], entrada.jigyo);
    const honin = (entrada.chingin * tasaHonin) / 100;
    const jigyo = (entrada.chingin * tasaJigyo) / 100;
    return { honin, jigyo, total: honin + jigyo, tasaHonin, tasaJigyo };
  },
  resultado: [
    { clave: "honin", etiqueta: "本人負担の雇用保険料", formato: "moneda", destacada: true, decimales: 1 },
    { clave: "jigyo", etiqueta: "事業主負担の雇用保険料", formato: "moneda", decimales: 1 },
    { clave: "total", etiqueta: "雇用保険料の合計", formato: "moneda", decimales: 1 },
    { clave: "tasaHonin", etiqueta: "本人負担の料率", formato: "porcentaje", decimales: 2 },
    { clave: "tasaJigyo", etiqueta: "事業主負担の料率", formato: "porcentaje", decimales: 2 },
  ],
});
