import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tr.damga-vergisi-hesaplama",
  mercado: "tr",
  concepto: "propio",
  slug: "damga-vergisi-hesaplama",
  estado: "publicado",
  requiere: {
    "tr.damga-oranlari": "mapa",
    "tr.damga-ust-sinir": "numero",
  },
  campos: [
    { id: "tur", tipo: "opcion-dato", dato: "tr.damga-oranlari", etiqueta: "Kağıdın türü", porDefecto: "mukavele" },
    { id: "tutar", tipo: "moneda", etiqueta: "Sözleşme bedeli ya da aylık kira", min: 0, porDefecto: 1000000, ayuda: "Kira sözleşmesinde aylık kirayı yazın; vergi sözleşme süresinin toplam kirası üzerinden hesaplanır." },
    { id: "ay", tipo: "entero", etiqueta: "Kira sözleşmesinin süresi (ay)", min: 1, max: 600, porDefecto: 12, visibleSi: { tur: ["kira"] } },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.tutar <= 0) throw new ErrorEntrada("Tutarı girin.", "tutar");
    const oran = enMapa(valores["tr.damga-oranlari"], entrada.tur);
    const matrah = entrada.tur === "kira" ? redondear(entrada.tutar * (entrada.ay ?? 12)) : entrada.tutar;
    const hesaplanan = redondear(porcentaje(matrah, oran));
    const ustSinir = valores["tr.damga-ust-sinir"];
    const observaciones: string[] = [];
    if (hesaplanan > ustSinir) observaciones.push("Hesaplanan vergi bir kağıt için uygulanan üst sınırı aştığı için üst sınır alındı.");
    return { damga: Math.min(hesaplanan, ustSinir), matrah, oranBinde: oran * 10, observaciones };
  },
  resultado: [
    { clave: "damga", etiqueta: "Damga vergisi", formato: "moneda", destacada: true },
    { clave: "matrah", etiqueta: "Vergiye esas tutar", formato: "moneda" },
    { clave: "oranBinde", etiqueta: "Oran (binde)", formato: "numero", decimales: 2 },
  ],
});
