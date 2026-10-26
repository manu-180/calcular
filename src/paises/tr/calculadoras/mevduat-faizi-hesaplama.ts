import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tr.mevduat-faizi-hesaplama",
  mercado: "tr",
  concepto: "plazo-fijo",
  slug: "mevduat-faizi-hesaplama",
  estado: "publicado",
  requiere: { "tr.mevduat-stopaj": "mapa" },
  campos: [
    { id: "anapara", tipo: "moneda", etiqueta: "Yatırılacak tutar (anapara)", min: 0, porDefecto: 100000 },
    { id: "faiz", tipo: "porcentaje", etiqueta: "Bankanın yıllık brüt faiz oranı", min: 0, max: 200, porDefecto: 40, ayuda: "Bankanın ilan ettiği yıllık oran. Bu oran bankaya ve vadeye göre değişir." },
    { id: "gun", tipo: "entero", etiqueta: "Vade (gün)", min: 1, max: 3650, porDefecto: 32 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.anapara <= 0) throw new ErrorEntrada("Yatırılacak tutarı girin.", "anapara");
    if (entrada.gun < 1) throw new ErrorEntrada("Vadeyi gün olarak girin.", "gun");
    // 6 ay ve 1 yıl sınırları gün olarak: 6 aya kadar 183 gün, 1 yıla kadar 366 gün.
    const grup = entrada.gun <= 183 ? "alti-ay" : entrada.gun <= 366 ? "bir-yil" : "bir-yil-ustu";
    const stopajOrani = enMapa(valores["tr.mevduat-stopaj"], grup);
    const brutFaiz = redondear((entrada.anapara * entrada.faiz * entrada.gun) / 36500);
    const stopaj = redondear(porcentaje(brutFaiz, stopajOrani));
    const netFaiz = redondear(brutFaiz - stopaj);
    return {
      netFaiz,
      brutFaiz,
      stopaj,
      stopajOrani,
      vadeSonu: redondear(entrada.anapara + netFaiz),
      netYillik: (netFaiz / entrada.anapara) * (36500 / entrada.gun),
    };
  },
  resultado: [
    { clave: "netFaiz", etiqueta: "Net faiz getirisi", formato: "moneda", destacada: true },
    { clave: "brutFaiz", etiqueta: "Brüt faiz", formato: "moneda" },
    { clave: "stopaj", etiqueta: "Stopaj (gelir vergisi kesintisi)", formato: "moneda" },
    { clave: "stopajOrani", etiqueta: "Stopaj oranı", formato: "porcentaje", decimales: 1 },
    { clave: "vadeSonu", etiqueta: "Vade sonunda hesaptaki tutar", formato: "moneda" },
    { clave: "netYillik", etiqueta: "Yıllık net faiz oranı", formato: "porcentaje", decimales: 2 },
  ],
});
